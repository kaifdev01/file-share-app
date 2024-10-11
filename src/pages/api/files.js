import File from '../../app/models/File';
import { getSession } from 'next-auth/react';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    const session = await getSession({ req });
    let usersEmail = null;


    if (session) {
        usersEmail = session.user.email;
        console.log("Session exists:", usersEmail);
    } else {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: 'Unauthorized: No authorization header' });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        try {

            const decoded = jwt.verify(token, "1254poiuytr789");
            usersEmail = decoded.email;
            console.log(usersEmail)
            console.log("Token exists:", token);

            if (!usersEmail) {
                return res.status(400).json({ message: 'Invalid token: No email found' });
            }
        } catch (error) {
            return res.status(401).json({ message: 'Invalid or expired token', error: error.message });
        }
    }

    try {

        const { email } = req.query;
        const searchEmail = email || usersEmail;

        const files = await File.find({ userEmail: searchEmail });

        if (!files || files.length === 0) {
            return res.status(404).json({ message: 'No files found for this user' });
        }

        res.status(200).json(files);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching files', error: error.message });
    }
}

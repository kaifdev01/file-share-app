
import File from '../../../app/models/File';
import { getSession } from 'next-auth/react';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    const session = await getSession({ req });
    let usersEmail = null;

    if (session) {
        usersEmail = session.user.email;
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

            if (!usersEmail) {
                return res.status(400).json({ message: 'Invalid token: No email found' });
            }
        } catch (error) {
            return res.status(401).json({ message: 'Invalid or expired token', error: error.message });
        }
    }

    const { id } = req.query;

    if (req.method === 'DELETE') {
        try {
            const file = await File.findById(id);

            // Check if the file exists and belongs to the user
            if (!file || file.userEmail !== usersEmail) {
                return res.status(404).json({ message: 'File not found or not authorized to delete' });
            }

            await File.findByIdAndDelete(id);
            return res.status(200).json({ message: 'File deleted successfully' });
        } catch (error) {
            return res.status(500).json({ message: 'Error deleting file', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

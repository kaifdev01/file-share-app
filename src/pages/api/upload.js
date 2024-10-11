import multer from 'multer';
import File from '../../app/models/File';
import connectDB from '../../app/db';
import { getSession } from 'next-auth/react';
import jwt from 'jsonwebtoken';

connectDB();

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
  }),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // First, check if there's an active session
      const session = await getSession({ req });
      let usersEmail = null;

      if (session) {
        // If session exists, use the session email
        usersEmail = session.user.email;
        console.log("Session exists:", usersEmail);
      } else {
        // If no session, fall back to token-based authentication
        const authHeader = req.headers.authorization;

        // Ensure the auth header is formatted correctly and has the Bearer token
        const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

        if (!token) {
          return res.status(401).json({ message: 'Unauthorized: No token or session' });
        }

        try {
          // Verify the token
          const decoded = jwt.verify(token, "1254poiuytr789");
          usersEmail = decoded.email || decoded.username; // Extract email/username from token
          console.log("Token exists:", usersEmail);
        } catch (error) {
          return res.status(401).json({ message: 'Invalid or expired token', error: error.message });
        }
      }

      if (!usersEmail) {
        return res.status(401).json({ message: 'Unauthorized: No valid session or token' });
      }

      // Run multer middleware
      await runMiddleware(req, res, upload.single('file'));

      const { originalname, mimetype, size } = req.file;
      const filepath = `/uploads/${req.file.filename}`; // Relative path for storing in MongoDB

      // Save file metadata in MongoDB
      const newFile = new File({
        filename: originalname,
        filetype: mimetype,
        filepath: filepath,
        size,
        uploadDate: new Date(),
        userEmail: usersEmail, // Use email from session or token
      });

      await newFile.save();

      res.status(200).json({ message: 'File uploaded successfully', file: newFile });
    } catch (error) {
      res.status(500).json({ message: 'File upload failed', error: error.message });
    }
  } else {
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}

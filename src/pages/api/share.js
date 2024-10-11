import File from '../../app/models/File'; // Adjust this import path as needed
import { getSession } from 'next-auth/react';
import nodemailer from 'nodemailer';
import path from 'path';

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'kaifm9096@gmail.com', // Your email
        pass: 'vhyoaapjkweiuhqn', // Your email password or app password
    },
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { fileId, recipientEmail } = req.body;

        try {
            const file = await File.findById(fileId);
            if (!file) {
                return res.status(404).json({ message: 'File not found' });
            }
            const uploadsDir = path.join(process.cwd(), 'uploads'); // Use process.cwd() to get the current working directory

            // Construct the URL without double slashes
            const baseUrl = 'http://localhost:3000/uploads';
            const filePath = path.join(uploadsDir, file.filename); // Construct the full file path
            // const filePath = file.filepath.replace(/^\/uploads\//, ''); // Remove any leading `/uploads/`
            const fileUrl = `${baseUrl}/${encodeURIComponent(filePath)}`.replace(/\/+/g, '/');

            // Create the HTML link
            const link = `<a href="${fileUrl}" target="_blank" >A file has been shared with you: ${file.filename}</a>`;
            console.log(file.filename)
            console.log(fileUrl)
            // Compose the email
            const mailOptions = {
                from: 'kaifm9096@gmail.com', // Sender address
                to: recipientEmail, // List of recipients
                subject: 'File Shared with You', // Subject line
                html: link, // HTML body
                attachments: [{
                    filename: "hello.jpg",
                    path: "D:/kaif/demo/public/uploads/1728130636973-Screenshot (19)"
                }]

            };

            // Send the email
            await transporter.sendMail(mailOptions);

            return res.status(200).json({ message: 'File shared successfully' });
        } catch (error) {
            console.error('Error sharing file:', error);
            return res.status(500).json({ message: 'Error sharing file', error: error.message });
        }
    } else {
        return res.status(405).json({ message: 'Method Not Allowed' }); // Explicitly handle other methods
    }
}

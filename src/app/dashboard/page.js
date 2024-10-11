"use client"
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { decode } from 'jwt-js-decode';
import { useRouter } from 'next/navigation';
import { useAuth } from '../components/AuthProvider/AuthProvider';


const Dashboard = () => {
    const [files, setFiles] = useState([]);
    const session = useSession();
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    const { isAuthenticated } = useAuth()
    const router = useRouter()
    if (session.status === "unauthenticated" && !isAuthenticated) {
        router.push("/login")
    }

    const decodeTokenEmail = (token) => {
        try {
            const decoded = decode(token);
            console.log("Decoded token:", decoded.payload.email);
            return decoded?.payload.email
        } catch (error) {
            console.error("Error decoding token:", error);
            return null;
        }
    };

    const getFiles = async (email) => {
        try {
            const response = await fetch(`/api/files?email=${email}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setFiles(data);
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };

    const deleteFile = async (fileId) => {
        try {
            const response = await fetch(`/api/files/${fileId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const result = await response.json();
            if (response.ok) {
                setFiles(files.filter(file => file._id !== fileId));
                alert(result.message);
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };

    useEffect(() => {
        if (session.status === 'authenticated') {

            getFiles(session.data.user.email);
        } else if (token) {
            const emailFromToken = decodeTokenEmail(token);
            console.log("Email from token:", emailFromToken);
            if (emailFromToken) {
                getFiles(emailFromToken);
            } else {
                console.error('No valid email found in session or token');
            }
        }
    }, [session, token]);

    return (
        <div>
            <h2>Uploaded Files</h2>
            {files.length > 0 ? (
                <ul>
                    {files.map((file) => (
                        <li key={file._id}>
                            <p><strong>Filename:</strong> {file.filename}</p>
                            <p><strong>Size:</strong> {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            <p><strong>Uploaded on:</strong> {new Date(file.uploadDate).toLocaleString()}</p>
                            {/* Image preview */}
                            {file.filetype.startsWith('image/') && (
                                <img
                                    src={file.filepath}
                                    alt={file.filename}
                                    className="mt-2"
                                    width={150}
                                    height={150}
                                />
                            )}

                            {/* Video preview */}
                            {file.filetype.startsWith('video/') && (
                                <video
                                    width={150}
                                    height={150}
                                    controls
                                    className="mt-2"
                                >
                                    <source src={file.filepath} type={file.filetype} />
                                    Your browser does not support the video tag.
                                </video>
                            )}

                            {/* PDF preview */}
                            {file.filetype.startsWith('application/pdf') && (
                                <img src="https://canto-wp-media.s3.amazonaws.com/app/uploads/2018/09/19195505/document-file-types-5.jpg"
                                    width={150}
                                    height={150}
                                />
                            )}
                            {/* Zip preview */}
                            {file.filetype.startsWith('application/x-zip-compressed') && (
                                <img src="https://img.lovepik.com/element/40148/7170.png_1200.png"
                                    width={150}
                                    height={150}
                                />
                            )}

                            {/* Download link */}
                            <a href={file.filepath} download={file.filename} className="text-blue-500 hover:underline">
                                Download
                            </a>
                            <button
                                onClick={() => deleteFile(file._id)}
                                className="text-red-500 hover:underline ml-4"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No files uploaded yet.</p>
            )}
        </div>
    );
}

export default Dashboard;

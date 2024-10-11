'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, CheckCircle, AlertCircle } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useAuth } from '../components/AuthProvider/AuthProvider'
import Link from 'next/link'

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const session = useSession()
  const { isAuthenticated } = useAuth()

  // Redirect if not authenticated
  if (session.status === 'unauthenticated' && !isAuthenticated) {
    router.push('/login')
    return null
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.size > 25 * 1024 * 1024) { // 5MB limit
        setErrorMessage('File size exceeds 25MB limit')
        return
      }
      setFile(selectedFile)
      setErrorMessage(null)
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => setPreview(e.target?.result as string)
        reader.readAsDataURL(selectedFile)
      } else {
        setPreview(null)
      }
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploadStatus('uploading');
    setUploadProgress(0);
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        setUploadStatus('success');
        fileInputRef.current!.value = '';
        setFile(null);
        setPreview(null);
      } else {
        const errorText = await response.text();
        setUploadStatus('error');
        setErrorMessage(`File upload failed: ${errorText}`);
      }
    } catch (error) {
      setUploadStatus('error');
      setErrorMessage('File upload failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-blue-600 to-cyan-500 flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-xl  shadow-lg p-6 w-full max-w-[50%] flex gap-10 text-center items-center justify-center">
        <div className='ml-10' >
          <h1 className="text-2xl font-bold text-center mb-6 ">Upload Your File To Share</h1>

          <div
            className="border-2 border-dashed border-gray-400 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileSelect}
            />
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">Click to select a file to upload</p>
          </div>

          {errorMessage && (
            <div className="mt-4 p-2 bg-red-100 text-red-700 rounded-md flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              {errorMessage}
            </div>
          )}

          {uploadStatus === 'uploading' && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">Uploading... {uploadProgress}%</p>
            </div>
          )}

          {uploadStatus === 'success' && (
            <div className="mt-4 p-2 bg-green-100 text-green-700 rounded-md flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              File uploaded successfully!
            </div>
          )}

          <button
            className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ease-in-out text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleUpload}
            disabled={!file || uploadStatus === 'uploading' || uploadStatus === 'success'}
          >
            {uploadStatus === 'uploading' ? 'Uploading...' : 'Upload'}
          </button>
          <p className='text-sm mt-4 text-gray-500'>Go to <Link className='underline' href="/dashboard"> Dashboard </Link> to see your uploaded files.</p>
        </div>

        <div>
          {file && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">File Preview</h2>
              <div className="bg-gray-100 rounded-md p-4">
                {preview ? (
                  <img src={preview} alt="Preview" className="max-h-40 mx-auto" />
                ) : (
                  <div className="h-40 flex items-center justify-center text-gray-500">
                    {/* No preview available */}
                    <img src="https://img.lovepik.com/element/40148/7170.png_1200.png" alt="Preview" className="max-h-40 mx-auto" />
                  </div>
                )}
                <p className="mt-2 text-sm text-gray-600">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {file.type} - {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

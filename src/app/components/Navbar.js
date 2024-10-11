import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useAuth } from './AuthProvider/AuthProvider'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const session = useSession()
    const router = useRouter()
    const { isAuthenticated, logout } = useAuth();


    const auth = session.status === "authenticated"

    const signHandle = () => {

        if (session.status === "authenticated") {
            signOut("google");
            router.push("/login");
        }

    }


    return (
        <nav className="bg-gradient-to-tr from-purple-700 via-blue-600 to-cyan-500  bg-opacity-100 backdrop-blur-lg shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0">
                            <svg className="h-8 w-8 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                        </Link>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link href="/" className="text-white hover:bg-blue-300 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                                {isAuthenticated ? (
                                    <>
                                        <Link href="/fileupload" className="text-white hover:bg-blue-300 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Upload</Link>
                                        <Link href="/dashboard" className="text-white hover:bg-blue-300 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
                                    </>
                                ) : (
                                    <Link href="/login">{auth ? <>
                                        <Link href="/fileupload" className="text-white hover:bg-blue-300 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Upload</Link>
                                        <Link href="/dashboard" className="text-white hover:bg-blue-300 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
                                    </> : ""} </Link>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" >
                            {isAuthenticated ? (
                                <>
                                    <button onClick={logout} className="">Sign Out</button>
                                </>
                            ) : (
                                <>
                                    {auth ? <button onClick={signHandle}>Sign out</button> : <Link href="/login">Sign In</Link>}
                                </>
                            )}


                        </button>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <svg className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu, show/hide based on menu state */}
            <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <a href="#" className="text-white hover:bg-blue-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</a>
                    <a href="#" className="text-white hover:bg-blue-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Features</a>
                    <a href="#" className="text-white hover:bg-blue-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Pricing</a>
                    <a href="#" className="text-white hover:bg-blue-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Contact</a>
                </div>
                <div className="pt-4 pb-3 border-t border-gray-700">
                    <div className="flex items-center px-5">
                        <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" >
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
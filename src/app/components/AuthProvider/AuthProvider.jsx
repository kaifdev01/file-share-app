"use client"
import React, { useEffect } from 'react'
import { SessionProvider } from 'next-auth/react'
import { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {

        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);

    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        router.push("/login")

    };

    return (
        <SessionProvider>
            <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
                {children}
            </AuthContext.Provider>
        </SessionProvider>
    )
}

export default AuthProvider
export const useAuth = () => useContext(AuthContext);
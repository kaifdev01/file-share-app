"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useAuth } from '../components/AuthProvider/AuthProvider';
import { signIn, useSession } from 'next-auth/react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const router = useRouter();
    const { data: status } = useSession();

    if (status === "authenticated") {
        router.push("/dashboard");

    }


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth?action=login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem("email", data.email);
                router.push("/pages/dashboard");
                alert('Login successful');
                login(data.token);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred during login.');
        }
    };

    return (
        <div className="h-[90.9vh] flex items-center justify-center bg-gradient-to-br from-purple-700 via-blue-600 to-cyan-500 p-4">
            <div className="w-full max-w-md p-8 bg-white bg-opacity-80 backdrop-blur-lg rounded-2xl shadow-xl relative overflow-hidden">
                {/* Form content */}
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h2>
                    <form className="space-y-4" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                id="email"
                                type="email"
                                placeholder="Enter your Email"
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                                focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="relative mt-1">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                                    focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                                >
                                    {/* Eye icon */}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
                        >
                            Log In
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        <button className="text-sm bg-gray-200 px-[7rem] py-2 flex items-center justify-center" onClick={() => signIn("google")}>
                            <FaGoogle /> Continue With Google
                        </button>
                        <div className='flex text-center mt-2 items-center justify-center text-gray-800'>
                            <p>Dont have an account?  </p><p className='underline cursor-pointer' onClick={() => router.push("/pages/signup")}>  Signup Now</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

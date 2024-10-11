// src/pages/index.js
"use client"
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { FaGoogle } from "react-icons/fa";
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';



export default function Home() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({ username: '', password: '' });

  const session = useSession();
  const navigate = useRouter();
  const router = useRouter()


  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/");
    }
  }, [session, router]);


  const updatePasswordStrength = useCallback((newPassword) => {
    setPassword(newPassword)
    let strength = 0
    if (newPassword.length > 7) strength += 25
    if (newPassword.match(/[a-z]/) && newPassword.match(/[A-Z]/)) strength += 25
    if (newPassword.match(/\d/)) strength += 25
    if (newPassword.match(/[^a-zA-Z\d]/)) strength += 25
    setPasswordStrength(strength)
  }, [])

  const getStrengthColor = useCallback(() => {
    if (passwordStrength <= 25) return 'bg-red-500'
    if (passwordStrength <= 50) return 'bg-orange-500'
    if (passwordStrength <= 75) return 'bg-yellow-500'
    return 'bg-green-500'
  }, [passwordStrength])


  const validateForm = () => {
    let isValid = true;
    let newErrors = { username: '', password: '' };

    if (username.length < 4) {
      newErrors.username = 'Username must be at least 4 characters long.';
      toast.error("Username must be at least 4 characters long.", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",

      });
      isValid = false;
    }
    if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
      toast.error("Password must be at least 8 characters long.", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",

      });
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    const response = await fetch('/api/auth?action=register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();
    console.log(data)
    toast.error(data.message, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",

    });
    // alert(data.message);
    if (response.ok) {

      navigate.push("/pages/login")
    }
  };
  console.log(session)
  if (session.status === "authenticated") {
    router.push("/");
  }


  return (
    <div>
      <ToastContainer />
      <div>
        <div className="h-[90.9vh] flex items-center justify-center bg-gradient-to-br from-purple-700 via-blue-600 to-cyan-500 p-4">
          <div className="w-full max-w-md p-8 bg-white bg-opacity-80 backdrop-blur-lg rounded-2xl shadow-xl relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <svg className="absolute top-4 left-4 text-blue-200 w-16 h-16 opacity-50 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
              <svg className="absolute bottom-4 right-4 text-purple-200 w-12 h-12 opacity-50 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-300 rounded-full opacity-10"></div>
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-300 rounded-full opacity-10"></div>
            </div>

            {/* Form content */}
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Sign Up</h2>
              <form className="space-y-4" onSubmit={handleRegister}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                          focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                {/* {errors.username && <p className="text-red-500 text-sm -mt-5">{errors.username}</p>} */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
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
                      onChange={(e) => updatePasswordStrength(e.target.value)}
                      className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                            focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-10"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {showPassword ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        )}
                      </svg>
                    </button>
                  </div>
                  <div className="mt-2 h-2 bg-gray-200 rounded-full">
                    <div
                      className={`h-full rounded-full ${getStrengthColor()} transition-all duration-300 ease-in-out`}
                      style={{ width: `${passwordStrength}%` }}
                    ></div>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Password strength: {passwordStrength <= 25 ? 'Weak' : passwordStrength <= 50 ? 'Fair' : passwordStrength <= 75 ? 'Good' : 'Strong'}
                  </p>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
                >
                  Sign Up Now
                </button>

              </form>
              <div className="mt-4 text-center">
                <a className="text-sm text-blue-600 hover:text-blue-800 flex items-center justify-center">
                  OR
                </a>
              </div>
              <div className="mt-4 text-center">
                <button className="text-sm bg-gray-200 px-[7rem] py-2 flex items-center justify-center" onClick={() => signIn("google")}>
                  <FaGoogle /> &nbsp; Continue With Google
                </button>
                <div className='flex text-center mt-2 items-center justify-center text-gray-800'>
                  <p>Already Registered? &nbsp;</p><p className='underline cursor-pointer' onClick={() => router.push("/pages/login")}>  Login Here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

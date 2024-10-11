'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

import { FileIcon, SmartphoneIcon, CloudIcon, LaptopIcon, TabletIcon, HardDriveIcon, WifiIcon, LockIcon } from 'lucide-react'

import { useSession } from 'next-auth/react'

import { useAuth } from './components/AuthProvider/AuthProvider'


export default function Hero() {
  const router = useRouter()
  const session = useSession();

  const { isAuthenticated } = useAuth()
  console.log(isAuthenticated)

  const loginHandle = () => {

    if (session.status === "unauthenticated" && !isAuthenticated) {
      router.push("/signup")
    }
    if (session.status === "authenticated" || isAuthenticated) {
      router.push("/fileupload")
    }
  }


  return (
    <>

      <div className="relative h-[90.9vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-700 via-blue-600 to-cyan-500">
        <div className="absolute inset-0 overflow-hidden">
          <AnimatedBackground />
        </div>
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Fast, Secure, Unlimited
          </motion.h1>
          <motion.p
            className="mt-6 text-xl sm:text-2xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Upload files of any size and share instantly with anyone.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button onClick={loginHandle} className="px-8 py-3  bg-white text-purple-700 rounded-full font-semibold text-lg shadow-lg hover:bg-gray-100 transition duration-300">
              Get Started
            </button>
            <a href="https://www.google.com" className="text-white underline text-lg hover:text-gray-200 transition duration-300">
              Learn More
            </a>

          </motion.div>

        </div>
      </div>
    </>

  )
}

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        className="absolute"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <FileIcon size={64} className="text-white opacity-10" />
      </motion.div>
      <motion.div
        className="absolute left-1/4 top-1/4"
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <SmartphoneIcon size={48} className="text-white opacity-10" />
      </motion.div>
      <motion.div
        className="absolute right-1/4 bottom-1/4"
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <CloudIcon size={56} className="text-white opacity-10" />
      </motion.div>
      <motion.div
        className="absolute left-1/3 bottom-1/3"
        animate={{
          x: [0, 150, 0],
          y: [0, 150, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <LaptopIcon size={52} className="text-white opacity-10" />
      </motion.div>
      <motion.div
        className="absolute right-1/3 top-1/3"
        animate={{
          x: [0, -120, 0],
          y: [0, -120, 0],
        }}
        transition={{
          duration: 19,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <TabletIcon size={44} className="text-white opacity-10" />
      </motion.div>
      <motion.div
        className="absolute left-10 top-1/2"
        animate={{
          x: [0, 80, 0],
          y: [0, -60, 0],
        }}
        transition={{
          duration: 17,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <HardDriveIcon size={40} className="text-white opacity-10" />
      </motion.div>
      <motion.div
        className="absolute right-10 bottom-1/2"
        animate={{
          x: [0, -70, 0],
          y: [0, 90, 0],
        }}
        transition={{
          duration: 21,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <WifiIcon size={36} className="text-white opacity-10" />
      </motion.div>
      <motion.div
        className="absolute left-1/2 top-10"
        animate={{
          x: [0, -40, 0],
          y: [0, 60, 0],
          rotate: [0, 360],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <LockIcon size={32} className="text-white opacity-10" />
      </motion.div>
    </div>
  )
}

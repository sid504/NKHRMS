'use client'

import Link from 'next/link'
import { FileQuestion, ArrowLeft, Home, Search } from 'lucide-react'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-50 via-white to-indigo-50 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-50" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full text-center z-10"
      >
        <div className="relative inline-block mb-8">
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 10, 0],
              y: [0, -10, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 5,
              ease: "easeInOut" 
            }}
            className="bg-white p-8 rounded-3xl shadow-2xl text-blue-600 relative z-10 border border-white/50 backdrop-blur-sm"
          >
            <FileQuestion className="h-24 w-24" />
          </motion.div>
          <div className="absolute inset-0 bg-blue-600 blur-2xl opacity-20 rounded-full" />
        </div>

        <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-800 tracking-tighter mb-4">
          404
        </h1>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Lost in the Cloud?</h2>
        
        <p className="text-lg text-gray-600 max-w-md mx-auto mb-10">
          The page you're looking for seems to have vanished into thin air. Let's get you back on track with your HR tasks.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="group flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <Home className="h-5 w-5 mr-2 group-hover:animate-pulse" />
            Go Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center px-8 py-4 bg-white text-gray-700 font-bold rounded-2xl shadow-lg border border-gray-100 hover:bg-gray-50 transition-all duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Go Back
          </button>
        </div>

        {/* Search Suggestion */}
        <div className="mt-12 pt-12 border-t border-gray-200/50">
          <p className="text-sm text-gray-500 mb-4">Or try searching for what you need:</p>
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search employees, payroll, reports..." 
              className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-inner focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 bg-blue-400 rounded-full"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%" 
            }}
            animate={{ 
              y: [null, Math.random() * -100 - 50],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
    </div>
  )
}

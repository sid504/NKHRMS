'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Clock, 
  ArrowLeft, 
  Plus, 
  Calendar, 
  Users, 
  Search,
  Settings,
  Shield,
  Zap,
  BarChart3
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function ShiftManagementPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/attendance" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Shift Management</h1>
            <p className="text-gray-600">Configure and manage employee work shifts</p>
          </div>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center shadow-lg shadow-blue-200 transition-all">
          <Plus className="h-4 w-4 mr-2" />
          Create New Shift
        </button>
      </div>

      {/* Feature Under Development / Placeholder UI */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="p-12 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center p-6 bg-blue-50 rounded-3xl text-blue-600 mb-6">
            <Clock className="h-16 w-16 animate-pulse" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Advanced Roster Management</h2>
          <p className="text-lg text-gray-600 mb-8">
            We're building a sophisticated shift scheduling engine with AI-powered optimization. 
            This module will allow you to create recurring rotations, manage night shifts, and handle automatic overtime calculations.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            {[
              { icon: Calendar, title: "Dynamic Rotations", desc: "Set up complex 4-on-4-off or custom weekly cycles." },
              { icon: Shield, title: "Compliance Guard", desc: "Automatically detect break violations and labor law risks." },
              { icon: Zap, title: "Auto-Assignment", desc: "AI identifies the best employees based on availability and skills." },
              { icon: BarChart3, title: "Shift Analytics", desc: "Track coverage levels and peak-hour staffing needs." }
            ].map((feature, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-start space-x-4">
                <div className="p-2 bg-white rounded-lg text-blue-600 shadow-sm">
                  <feature.icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex items-center justify-center space-x-4">
            <div className="h-2 w-24 bg-blue-100 rounded-full overflow-hidden">
              <motion.div 
                animate={{ x: [-100, 100] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="h-full w-12 bg-blue-600 rounded-full"
              />
            </div>
            <span className="text-sm font-medium text-gray-500 italic">Coming in Version 2.0</span>
            <div className="h-2 w-24 bg-blue-100 rounded-full overflow-hidden">
              <motion.div 
                animate={{ x: [-100, 100] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="h-full w-12 bg-blue-600 rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Mock background of what the UI will look like (blurry/faded) */}
        <div className="h-64 bg-gray-50 border-t border-gray-100 relative opacity-40 grayscale blur-[2px] pointer-events-none">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-4xl px-8">
               <div className="grid grid-cols-7 gap-2">
                 {[...Array(21)].map((_, i) => (
                   <div key={i} className="h-12 bg-white rounded-lg shadow-sm border border-gray-200" />
                 ))}
               </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
        </div>
      </motion.div>
    </div>
  )
}

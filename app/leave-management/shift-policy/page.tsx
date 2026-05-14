'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Clock, 
  ArrowLeft, 
  Plus, 
  Calendar, 
  Users, 
  RotateCcw,
  Shield,
  Briefcase,
  Zap
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function ShiftPolicyPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/leave-management" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Shift Policies</h1>
            <p className="text-gray-600">Rotation rules, night shift allowances, and split shifts</p>
          </div>
        </div>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center shadow-lg shadow-purple-100">
          <Plus className="h-4 w-4 mr-2" />
          Define Shift
        </button>
      </div>

      {/* Placeholder UI */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="p-12 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center p-6 bg-purple-50 rounded-3xl text-purple-600 mb-8">
            <RotateCcw className="h-16 w-16" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Flexible Shift Scheduling</h2>
          <p className="text-lg text-gray-600 mb-10">
            Manage 24/7 operations with ease. Define recurring shift rotations, handle night shift allowances automatically, 
            and set up break durations that ensure full coverage across all departments.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {[
              { icon: Clock, title: "24/7 Rosters", desc: "Support for continuous operations with 3-shift or 4-shift models." },
              { icon: Zap, title: "Shift Allowances", desc: "Automatically calculate extra pay for night or weekend shifts." },
              { icon: Calendar, title: "Rotation Cycles", desc: "Set up 4-on-4-off, morning-evening-night, or custom cycles." },
              { icon: Shield, title: "Minimum Rest", desc: "Enforce mandatory rest periods between shifts for safety." }
            ].map((feature, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="p-2 bg-white rounded-lg text-purple-600 shadow-sm w-fit mb-3">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1 text-sm">{feature.title}</h4>
                <p className="text-xs text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 inline-block">
             <div className="flex items-center space-x-2 text-sm font-medium text-purple-600 bg-purple-50 px-4 py-2 rounded-full">
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
               </span>
               <span>Finalizing API integration...</span>
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

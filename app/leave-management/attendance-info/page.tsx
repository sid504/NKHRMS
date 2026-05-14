'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Info, 
  ArrowLeft, 
  Search, 
  Filter, 
  RefreshCw,
  Database,
  Cpu,
  Fingerprint,
  Smartphone
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function AttendanceInfoPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/leave-management" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Attendance Information</h1>
            <p className="text-gray-600">Raw swipe logs, device integration, and sync status</p>
          </div>
        </div>
        <button className="bg-white text-gray-700 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center shadow-sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Sync Devices
        </button>
      </div>

      {/* Placeholder UI */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="p-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-6 bg-indigo-50 rounded-3xl text-indigo-600 mb-8">
            <Database className="h-16 w-16" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Device Integration Hub</h2>
          <p className="text-lg text-gray-600 mb-10">
            This module manages the raw data streams from biometric devices, mobile apps, and web portals. 
            We are currently building the unified API gateway to aggregate these sources.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Fingerprint, title: "Biometric Sync", desc: "Real-time sync with ZKTeco and other hardware providers." },
              { icon: Smartphone, title: "Geo-Fencing", desc: "Track mobile check-ins with precise GPS coordinates." },
              { icon: Cpu, title: "Processing Engine", desc: "Convert raw swipes into meaningful attendance records." }
            ].map((feature, i) => (
              <div key={i} className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-left">
                <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Abstract Data Viz */}
        <div className="h-32 bg-slate-900 relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(90deg, #4f46e5 1px, transparent 1px), linear-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <motion.div 
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="flex space-x-1"
          >
            {[...Array(20)].map((_, i) => (
              <div key={i} className="w-1 bg-indigo-500" style={{ height: `${Math.random() * 100}%` }} />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

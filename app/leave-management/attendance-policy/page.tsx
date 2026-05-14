'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Zap, 
  ArrowLeft, 
  Settings, 
  Clock, 
  Calendar, 
  AlertTriangle,
  UserCheck,
  Shield,
  FileText
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function AttendancePolicyPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/leave-management" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Attendance Policies</h1>
            <p className="text-gray-600">Late markers, grace periods, and overtime rules</p>
          </div>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center shadow-lg shadow-indigo-100">
          <Settings className="h-4 w-4 mr-2" />
          Configure Defaults
        </button>
      </div>

      {/* Placeholder UI */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="p-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-6 bg-amber-50 rounded-3xl text-amber-600 mb-8">
            <Zap className="h-16 w-16" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Rule-Based Time Tracking</h2>
          <p className="text-lg text-gray-600 mb-10">
            Configure how the system interprets every minute of the workday. 
            From 15-minute grace periods to complex double-OT calculations on holidays, this engine handles it all.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 text-left">
               <Clock className="h-8 w-8 text-amber-600 mb-4" />
               <h4 className="font-bold text-amber-900 mb-2">Grace Periods</h4>
               <p className="text-sm text-amber-700">Define allowable late arrivals before half-day or full-day deductions are triggered.</p>
             </div>
             <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 text-left">
               <AlertTriangle className="h-8 w-8 text-blue-600 mb-4" />
               <h4 className="font-bold text-blue-900 mb-2">Overtime Rules</h4>
               <p className="text-sm text-blue-700">Set daily and weekly thresholds for OT 1.0x, 1.5x, and 2.0x multipliers.</p>
             </div>
          </div>

          <div className="mt-12 flex items-center justify-center space-x-2">
            <div className="h-1 w-8 bg-amber-200 rounded-full" />
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Under Construction</span>
            <div className="h-1 w-8 bg-amber-200 rounded-full" />
          </div>
        </div>

        {/* Blueprint background */}
        <div className="h-48 bg-slate-50 relative overflow-hidden flex items-end justify-center">
          <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          <div className="w-full max-w-md bg-white border border-gray-200 rounded-t-2xl shadow-lg p-6 translate-y-8">
             <div className="h-4 bg-gray-100 rounded w-1/2 mb-4" />
             <div className="space-y-2">
               <div className="h-2 bg-gray-50 rounded w-full" />
               <div className="h-2 bg-gray-50 rounded w-3/4" />
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

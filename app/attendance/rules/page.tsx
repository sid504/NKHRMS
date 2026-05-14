'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Settings, 
  ArrowLeft, 
  Shield, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  FileText,
  Zap,
  Lock,
  Search
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function AttendanceRulesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/attendance" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Attendance Rules & Policies</h1>
            <p className="text-gray-600">Configure late-in, early-out, and overtime calculation rules</p>
          </div>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center shadow-lg shadow-blue-200">
          <Settings className="h-4 w-4 mr-2" />
          Global Settings
        </button>
      </div>

      {/* Feature Under Development / Placeholder UI */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="p-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-6 bg-indigo-50 rounded-3xl text-indigo-600 mb-8">
            <Lock className="h-16 w-16" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Policy Configuration Engine</h2>
          <p className="text-lg text-gray-600 mb-10">
            Define how the system calculates hours, handles grace periods, and triggers disciplinary alerts. 
            This module provides the legal and operational framework for your entire workforce's time tracking.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Clock, title: "Grace Periods", desc: "Define allowable late arrivals (e.g., 15 mins) before marking as 'Late'." },
              { icon: Zap, title: "OT Thresholds", desc: "Configure when overtime kicks in (daily vs weekly) and multiplier rates." },
              { icon: AlertTriangle, title: "Automatic Penalties", desc: "Set up deduction rules for unexcused absences or early departures." }
            ].map((rule, i) => (
              <div key={i} className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-left">
                <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 mb-4">
                  <rule.icon className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{rule.title}</h4>
                <p className="text-sm text-gray-500">{rule.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-amber-50 rounded-2xl border border-amber-100 flex items-center space-x-4 text-left">
            <div className="p-3 bg-amber-100 rounded-xl text-amber-700">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h5 className="font-bold text-amber-900">Legal Compliance Notice</h5>
              <p className="text-sm text-amber-700">
                Attendance rules are being mapped to local labor laws. This module will launch once the compliance verification engine is finalized.
              </p>
            </div>
          </div>
        </div>

        {/* Blueprint background */}
        <div className="h-48 bg-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #4f46e5 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="flex space-x-8">
               {[...Array(4)].map((_, i) => (
                 <div key={i} className="w-32 h-2 bg-indigo-500/30 rounded-full" />
               ))}
             </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
        </div>
      </motion.div>
    </div>
  )
}

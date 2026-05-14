'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  BarChart3, 
  ArrowLeft, 
  FileText, 
  Search, 
  Filter, 
  Download,
  Calendar,
  Clock,
  Shield,
  Zap
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function AttendanceMusterPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/leave-management" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Attendance Muster</h1>
            <p className="text-gray-600">Daily attendance register and compliance reporting</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center shadow-lg shadow-blue-100">
            <Download className="h-4 w-4 mr-2" />
            Download Muster
          </button>
        </div>
      </div>

      {/* Placeholder UI */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="p-12 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center p-6 bg-orange-50 rounded-3xl text-orange-600 mb-6">
            <FileText className="h-16 w-16" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Muster Report Engine</h2>
          <p className="text-lg text-gray-600 mb-8">
            The Attendance Muster provides a legal-standard daily register of every employee's presence, 
            absence, and overtime. We are currently finalizing the PDF generation engine for this module.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            {[
              { icon: Shield, title: "Statutory Compliance", desc: "Form 12 and other legal attendance formats." },
              { icon: Zap, title: "Instant Generation", desc: "Generate muster reports for up to 5,000 employees in seconds." },
              { icon: Clock, title: "Historical Archives", desc: "Access muster data for any date in the last 10 years." },
              { icon: BarChart3, title: "Discrepancy Alerts", desc: "Flag mismatches between swipes and manual entries." }
            ].map((feature, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-start space-x-4">
                <div className="p-2 bg-white rounded-lg text-orange-600 shadow-sm">
                  <feature.icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Faded Table Background */}
        <div className="h-48 bg-gray-50 border-t border-gray-100 opacity-20 grayscale blur-[1px] pointer-events-none">
          <div className="p-8">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex space-x-4">
                  <div className="h-4 bg-gray-300 rounded w-1/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

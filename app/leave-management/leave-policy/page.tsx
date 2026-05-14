'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Shield, 
  ArrowLeft, 
  Plus, 
  Search, 
  Settings,
  CheckCircle,
  FileText,
  Lock,
  Zap,
  Globe
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function LeavePolicyPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/leave-management" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Leave Policies</h1>
            <p className="text-gray-600">Configure entitlement, accrual, and carry-forward rules</p>
          </div>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center shadow-lg shadow-blue-100">
          <Plus className="h-4 w-4 mr-2" />
          Create New Policy
        </button>
      </div>

      {/* Placeholder UI */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="p-12 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center p-6 bg-blue-50 rounded-3xl text-blue-600 mb-8">
            <Shield className="h-16 w-16" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Enterprise Policy Engine</h2>
          <p className="text-lg text-gray-600 mb-10">
            Define complex leave rules based on seniority, department, or geography. 
            Our policy engine supports automatic accruals, prorated balances, and sophisticated carry-forward logic.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {[
              { icon: Globe, title: "Global Configurations", desc: "Manage different leave calendars for multiple branches and countries." },
              { icon: Zap, title: "Automated Accruals", desc: "System automatically adds leave credits on a monthly, quarterly, or annual basis." },
              { icon: Lock, title: "Approval Hierarchies", desc: "Set up multi-level approval workflows for different types of leaves." },
              { icon: CheckCircle, title: "Compliance Guard", desc: "Ensure your policies meet local labor laws and holiday requirements." }
            ].map((feature, i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex items-start space-x-4">
                <div className="p-3 bg-white rounded-xl text-blue-600 shadow-sm">
                  <feature.icon className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 border-2 border-dashed border-gray-200 rounded-3xl">
             <p className="text-sm font-medium text-gray-500">Previewing the Policy Designer...</p>
             <div className="mt-4 flex space-x-2 justify-center">
               {[...Array(3)].map((_, i) => (
                 <div key={i} className="h-8 bg-gray-100 rounded-full w-24" />
               ))}
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

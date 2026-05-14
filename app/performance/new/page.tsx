'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Target, 
  ArrowLeft, 
  User, 
  Star, 
  Calendar, 
  FileText,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Brain
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function NewPerformanceReviewPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/performance" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">New Performance Review</h1>
            <p className="text-gray-600">Start a new evaluation for an employee</p>
          </div>
        </div>
      </div>

      {/* Feature Under Development / Placeholder UI */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="p-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-6 bg-purple-50 rounded-3xl text-purple-600 mb-8">
            <Brain className="h-16 w-16" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">AI-Assisted Appraisals</h2>
          <p className="text-lg text-gray-600 mb-10">
            We're building a groundbreaking performance review system that uses AI to analyze KPIs, 
            attendance, and peer feedback to help managers write fairer and more constructive reviews.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl text-white text-left shadow-lg">
              <Star className="h-8 w-8 mb-4 opacity-80" />
              <h4 className="text-xl font-bold mb-2">360° Feedback</h4>
              <p className="text-sm text-purple-100">Collect multi-dimensional feedback from peers, subordinates, and managers automatically.</p>
            </div>
            <div className="p-6 bg-white border border-gray-200 rounded-2xl text-left hover:border-purple-300 transition-colors">
              <TrendingUp className="h-8 w-8 mb-4 text-purple-600" />
              <h4 className="text-xl font-bold text-gray-900 mb-2">KPI Integration</h4>
              <p className="text-sm text-gray-500">Live data synchronization with project management tools to track actual objective completion.</p>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center">
             <div className="flex -space-x-2 mb-4">
               {[...Array(5)].map((_, i) => (
                 <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-gray-200" />
               ))}
               <div className="h-10 w-10 rounded-full border-2 border-white bg-purple-100 flex items-center justify-center text-purple-600 text-xs font-bold">+12</div>
             </div>
             <p className="text-sm font-medium text-gray-500">Currently in Beta Testing with select HR Partners</p>
          </div>
        </div>
        
        {/* Placeholder form elements */}
        <div className="p-8 bg-gray-50 border-t border-gray-100 opacity-30 pointer-events-none select-none">
          <div className="max-w-xl mx-auto space-y-4">
            <div className="h-10 bg-white rounded-lg border border-gray-200 w-full" />
            <div className="h-32 bg-white rounded-lg border border-gray-200 w-full" />
            <div className="h-10 bg-blue-600 rounded-lg w-32 ml-auto" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

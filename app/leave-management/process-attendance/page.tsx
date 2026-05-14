'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  BarChart3, 
  ArrowLeft, 
  Play, 
  Calendar, 
  Users, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  Settings,
  ChevronRight,
  Shield,
  Clock
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProcessAttendancePage() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [department, setDepartment] = useState('all')
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleProcess = async () => {
    if (!startDate || !endDate) {
      setError('Please select both start and end dates.')
      return
    }

    setIsProcessing(true)
    setProgress(0)
    setResult(null)
    setError(null)

    // Simulate progress while the backend works
    const interval = setInterval(() => {
      setProgress(prev => (prev < 90 ? prev + 10 : prev))
    }, 500)

    try {
      const res = await fetch('/api/attendance/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ startDate, endDate, department })
      })

      const data = await res.json()

      if (res.ok) {
        setProgress(100)
        setResult(data)
      } else {
        setError(data.error || 'Something went wrong')
      }
    } catch (err) {
      setError('Failed to connect to processing engine.')
    } finally {
      clearInterval(interval)
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/leave-management" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Process Attendance</h1>
            <p className="text-gray-600">Calculate and finalize attendance records for a specific period</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <Settings className="h-5 w-5 mr-2 text-blue-600" />
              Processing Parameters
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
                <input 
                  type="date" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">End Date</label>
                <input 
                  type="date" 
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                <select 
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="all">All Departments</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="HR">HR</option>
                </select>
              </div>

              <div className="pt-4">
                <button 
                  onClick={handleProcess}
                  disabled={isProcessing}
                  className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-lg transition-all ${
                    isProcessing 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98] shadow-blue-200'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Processing Engine Running...</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-5 w-5 fill-current" />
                      <span>Start Processing</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Guidelines */}
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
            <h4 className="font-bold text-blue-900 mb-2 flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              Processing Guidelines
            </h4>
            <ul className="text-sm text-blue-800 space-y-2 opacity-80">
              <li>• Records will be created only for missing days.</li>
              <li>• System automatically detects weekend overrides.</li>
              <li>• Shifts are calculated based on employee policy.</li>
              <li>• Overtime is calculated for hours exceeding 8.</li>
            </ul>
          </div>
        </div>

        {/* Status and Results */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 h-full flex flex-col overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Execution Console</h3>
              <div className="flex space-x-2">
                 <div className="h-2 w-2 rounded-full bg-red-400 animate-pulse" />
                 <div className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
                 <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>

            <div className="flex-1 p-8 flex flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                {isProcessing ? (
                  <motion.div 
                    key="processing"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="w-full max-w-md text-center"
                  >
                    <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden mb-6">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="absolute inset-y-0 left-0 bg-blue-600 rounded-full"
                      />
                    </div>
                    <p className="text-gray-600 font-medium animate-pulse">
                      Analyzing swipe patterns for {department} team...
                    </p>
                    <p className="text-xs text-gray-400 mt-2">Days {startDate} to {endDate}</p>
                  </motion.div>
                ) : result ? (
                  <motion.div 
                    key="result"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                  >
                    <div className="inline-flex items-center justify-center p-4 bg-green-100 text-green-600 rounded-full mb-6">
                      <CheckCircle className="h-12 w-12" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Processing Complete!</h2>
                    <p className="text-gray-600 mb-8">{result.message}</p>
                    
                    <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
                      <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">Records Created</p>
                        <p className="text-2xl font-black text-gray-900">{result.count}</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">Errors</p>
                        <p className="text-2xl font-black text-gray-900">0</p>
                      </div>
                    </div>
                  </motion.div>
                ) : error ? (
                  <motion.div 
                    key="error"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-red-600"
                  >
                    <AlertCircle className="h-16 w-16 mx-auto mb-4" />
                    <h3 className="text-xl font-bold">Processing Failed</h3>
                    <p className="opacity-80 mt-2">{error}</p>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-gray-400"
                  >
                    <BarChart3 className="h-24 w-24 mx-auto mb-6 opacity-10" />
                    <p className="text-lg">Waiting for parameters...</p>
                    <p className="text-sm mt-2">Select a date range to begin attendance calculation.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
               <p className="text-[10px] text-gray-400 font-mono">NKHRMS AT-ENGINE v4.2 // STATUS: READY</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

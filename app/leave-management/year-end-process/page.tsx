'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  RotateCcw, 
  Zap, 
  Shield, 
  Calendar, 
  CheckCircle, 
  AlertCircle,
  Download,
  Play,
  Loader2,
  ChevronRight
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function YearEndProcessPage() {
  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [complete, setComplete] = useState(false)

  const handleStartProcess = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setComplete(true)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/leave-management" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Year End Process</h1>
            <p className="text-gray-600">Lapse, carry forward, or encash leave balances for the fiscal year</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Step Guide */}
        <div className="lg:col-span-1 space-y-4">
          {[
            { id: 1, title: 'Validate Balances', desc: 'Verify current leave data' },
            { id: 2, title: 'Apply Policies', desc: 'Calculate carry-forwards' },
            { id: 3, title: 'Finalize & Post', desc: 'Update employee records' }
          ].map((s) => (
            <div 
              key={s.id}
              className={`p-6 rounded-3xl border transition-all ${
                step === s.id ? 'bg-blue-600 text-white border-blue-600 shadow-xl' : 'bg-white text-gray-400 border-gray-100'
              }`}
            >
              <p className="text-[10px] font-black uppercase tracking-widest mb-1">Step 0{s.id}</p>
              <h4 className="font-bold">{s.title}</h4>
              <p className={`text-xs mt-1 ${step === s.id ? 'text-blue-100' : 'text-gray-400'}`}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Main Console */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden min-h-[500px] flex flex-col">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Fiscal Year 2023-2024</h3>
              <div className="px-4 py-1 bg-green-50 text-green-600 rounded-full text-xs font-bold border border-green-100">
                Data Validated
              </div>
            </div>

            <div className="flex-1 p-12 flex flex-col items-center justify-center text-center">
              <AnimatePresence mode="wait">
                {isProcessing ? (
                  <motion.div 
                    key="processing"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6"
                  >
                    <div className="relative h-24 w-24 mx-auto">
                       <Loader2 className="h-24 w-24 text-blue-600 animate-spin" />
                       <RotateCcw className="absolute inset-0 h-12 w-12 m-auto text-blue-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Calculating Leave Accruals</h2>
                      <p className="text-gray-500 mt-2">Applying carry-forward caps and encashment logic for 452 employees...</p>
                    </div>
                  </motion.div>
                ) : complete ? (
                  <motion.div 
                    key="complete"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                  >
                    <div className="h-24 w-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                       <CheckCircle className="h-12 w-12" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-gray-900">Year End Complete!</h2>
                      <p className="text-gray-500 mt-2 max-w-md mx-auto text-lg">
                        Fiscal year 2023-2024 has been closed. All employee balances have been migrated to the new cycle.
                      </p>
                    </div>
                    <div className="flex justify-center space-x-4">
                       <button className="px-8 py-4 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200 transition-all flex items-center">
                         <Download className="h-5 w-5 mr-2" />
                         Download Summary
                       </button>
                       <Link href="/leave-management" className="px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg hover:bg-blue-700 shadow-blue-100 transition-all">
                         Return to Dashboard
                       </Link>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-10"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                       <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                          <p className="text-2xl font-black text-gray-900">452</p>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Employees</p>
                       </div>
                       <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                          <p className="text-2xl font-black text-gray-900">1,240</p>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Carry Forward Days</p>
                       </div>
                       <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                          <p className="text-2xl font-black text-gray-900">$12.4k</p>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Est. Encashment</p>
                       </div>
                    </div>
                    
                    <div>
                       <button 
                         onClick={handleStartProcess}
                         className="px-12 py-6 bg-blue-600 text-white text-xl font-black rounded-[2rem] shadow-2xl shadow-blue-200 hover:scale-105 active:scale-95 transition-all flex items-center mx-auto"
                       >
                         <Play className="h-6 w-6 mr-3 fill-current" />
                         Start Year End Migration
                       </button>
                       <p className="mt-6 text-gray-400 text-sm flex items-center justify-center">
                         <Shield className="h-4 w-4 mr-2" />
                         This action is permanent and will lock previous fiscal year data.
                       </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

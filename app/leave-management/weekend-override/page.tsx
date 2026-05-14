'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Settings, 
  Shield, 
  Calendar, 
  CheckCircle, 
  AlertTriangle,
  Info,
  Clock,
  Save,
  Loader2
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function WeekendOverridePage() {
  const [isSaving, setIsSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  
  const [policies, setPolicies] = useState([
    { department: 'Engineering', weekends: ['Saturday', 'Sunday'], override: false },
    { department: 'Marketing', weekends: ['Saturday', 'Sunday'], override: false },
    { department: 'Support', weekends: ['Tuesday', 'Wednesday'], override: true },
    { department: 'Sales', weekends: ['Sunday'], override: true }
  ])

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  const toggleDay = (deptIndex: number, day: string) => {
    const newPolicies = [...policies]
    const currentWeekends = newPolicies[deptIndex].weekends
    if (currentWeekends.includes(day)) {
      newPolicies[deptIndex].weekends = currentWeekends.filter(d => d !== day)
    } else {
      newPolicies[deptIndex].weekends = [...currentWeekends, day]
    }
    newPolicies[deptIndex].override = true
    setPolicies(newPolicies)
  }

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/leave-management" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Weekend Override</h1>
            <p className="text-gray-600">Configure custom weekend schedules per department</p>
          </div>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all flex items-center"
        >
          {isSaving ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Save className="h-5 w-5 mr-2" />}
          {success ? 'Policies Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {policies.map((policy, idx) => (
            <motion.div 
              key={policy.department}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{policy.department}</h3>
                  <p className="text-sm text-gray-500">Currently: {policy.weekends.join(', ')}</p>
                </div>
                {policy.override && (
                  <span className="bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-amber-100">
                    Custom Schedule
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {days.map(day => {
                  const isSelected = policy.weekends.includes(day)
                  return (
                    <button
                      key={day}
                      onClick={() => toggleDay(idx, day)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                        isSelected 
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-105' 
                          : 'bg-white text-gray-500 border-gray-100 hover:border-blue-200'
                      }`}
                    >
                      {day.substring(0, 3)}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
             <div className="flex items-center space-x-3 text-blue-600 mb-4">
               <Info className="h-5 w-5" />
               <h4 className="font-bold">What is this?</h4>
             </div>
             <p className="text-sm text-blue-800 leading-relaxed opacity-80">
               Use this screen to define non-standard working weeks. For example, if your Support team works 
               Tuesday to Saturday, you can set Sunday and Monday as their "Weekends". 
               <br/><br/>
               This directly affects leave deductions and attendance calculations for those specific employees.
             </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
             <h4 className="font-black text-gray-400 text-[10px] uppercase tracking-widest mb-4">Conflict Alerts</h4>
             <div className="flex items-center space-x-3 text-sm text-gray-400">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>No scheduling conflicts detected.</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}

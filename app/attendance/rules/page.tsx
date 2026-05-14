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
  Search,
  Save,
  Loader2,
  Info
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function AttendanceRulesPage() {
  const [isSaving, setIsSaving] = useState(false)
  const [success, setSuccess] = useState(false)

  const [rules, setRules] = useState({
    lateInGrace: 15,
    earlyOutThreshold: 30,
    minHoursForFullDay: 8,
    minHoursForHalfDay: 4,
    otCalculation: 'Daily',
    autoDeduction: true,
    restrictIp: false
  })

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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/attendance" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Attendance Rules</h1>
            <p className="text-gray-600">Global logic for hour calculations and discipline</p>
          </div>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all flex items-center"
        >
          {isSaving ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Save className="h-5 w-5 mr-2" />}
          {success ? 'Policies Updated' : 'Update Policies'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Work Hour Rules */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100"
          >
             <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-blue-600" />
                Work Hour Definitions
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Late-In Grace (Mins)</label>
                   <input 
                     type="number" 
                     value={rules.lateInGrace}
                     onChange={e => setRules({...rules, lateInGrace: parseInt(e.target.value)})}
                     className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                   />
                </div>
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Early-Out Allowed (Mins)</label>
                   <input 
                     type="number" 
                     value={rules.earlyOutThreshold}
                     onChange={e => setRules({...rules, earlyOutThreshold: parseInt(e.target.value)})}
                     className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                   />
                </div>
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Min. Hours for Full Day</label>
                   <input 
                     type="number" 
                     value={rules.minHoursForFullDay}
                     onChange={e => setRules({...rules, minHoursForFullDay: parseInt(e.target.value)})}
                     className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                   />
                </div>
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Min. Hours for Half Day</label>
                   <input 
                     type="number" 
                     value={rules.minHoursForHalfDay}
                     onChange={e => setRules({...rules, minHoursForHalfDay: parseInt(e.target.value)})}
                     className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                   />
                </div>
             </div>
          </motion.div>

          {/* Overtime & Penalties */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100"
          >
             <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <Zap className="h-5 w-5 mr-2 text-amber-500" />
                Overtime & Compliance
             </h3>
             <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                   <div>
                      <p className="font-bold text-gray-900">Automatic Unexcused Deduction</p>
                      <p className="text-xs text-gray-500">Deduct half-day pay for unauthorized absences.</p>
                   </div>
                   <button 
                     onClick={() => setRules({...rules, autoDeduction: !rules.autoDeduction})}
                     className={`w-14 h-8 rounded-full relative transition-all ${rules.autoDeduction ? 'bg-blue-600' : 'bg-gray-200'}`}
                   >
                      <div className={`absolute top-1 h-6 w-6 bg-white rounded-full transition-all ${rules.autoDeduction ? 'right-1' : 'left-1'}`} />
                   </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                   <div>
                      <p className="font-bold text-gray-900">IP-Based Clocking</p>
                      <p className="text-xs text-gray-500">Only allow check-ins from registered company IPs.</p>
                   </div>
                   <button 
                     onClick={() => setRules({...rules, restrictIp: !rules.restrictIp})}
                     className={`w-14 h-8 rounded-full relative transition-all ${rules.restrictIp ? 'bg-blue-600' : 'bg-gray-200'}`}
                   >
                      <div className={`absolute top-1 h-6 w-6 bg-white rounded-full transition-all ${rules.restrictIp ? 'right-1' : 'left-1'}`} />
                   </button>
                </div>
             </div>
          </motion.div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
           <div className="bg-indigo-600 p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
              <Shield className="absolute -right-4 -bottom-4 h-32 w-32 opacity-10" />
              <h4 className="text-xl font-bold mb-4">Compliance Guard</h4>
              <p className="text-indigo-100 text-sm leading-relaxed mb-6">
                 Changes to these policies will trigger a notification to all department heads and update the calculation engine for the next processing cycle.
              </p>
              <div className="flex items-center space-x-2 text-xs font-mono bg-white/10 p-2 rounded">
                 <Info className="h-3 w-3" />
                 <span>Last updated: May 12, 2024</span>
              </div>
           </div>

           <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
              <h4 className="font-black text-gray-400 text-[10px] uppercase tracking-widest mb-6">Simulation Engine</h4>
              <p className="text-sm text-gray-600 mb-6 italic">"With current rules, 92% of employees met attendance targets last month."</p>
              <button className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold hover:bg-gray-50 transition-all">
                 Run Policy Simulation
              </button>
           </div>
        </div>
      </div>
    </div>
  )
}

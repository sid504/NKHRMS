'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Edit, 
  ArrowLeft, 
  Search, 
  User, 
  Clock, 
  Calendar, 
  CheckCircle, 
  AlertCircle,
  AlertTriangle,
  Save,
  Loader2,
  Filter,
  History
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function ManualOverridePage() {
  const [isSaving, setIsSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const [overrideData, setOverrideData] = useState({
    employeeId: '',
    date: new Date().toISOString().split('T')[0],
    checkIn: '09:00',
    checkOut: '18:00',
    reason: 'Forgot to clock in',
    approvedBy: 'Admin'
  })

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
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
            <h1 className="text-2xl font-bold text-gray-900">Manual Override</h1>
            <p className="text-gray-600">Manually adjust attendance logs for employees</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Override Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSave} className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-10 space-y-8">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="col-span-full">
                   <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-3">Employee Search</label>
                   <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input 
                        required
                        type="text" 
                        placeholder="Type employee name or ID..."
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 outline-none transition-all font-bold"
                      />
                   </div>
                </div>

                <div>
                   <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-3">Correction Date</label>
                   <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input 
                        required
                        type="date" 
                        value={overrideData.date}
                        onChange={e => setOverrideData({...overrideData, date: e.target.value})}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 outline-none transition-all font-bold"
                      />
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">New In</label>
                      <input 
                        type="time" 
                        value={overrideData.checkIn}
                        onChange={e => setOverrideData({...overrideData, checkIn: e.target.value})}
                        className="w-full px-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 outline-none transition-all font-bold"
                      />
                   </div>
                   <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">New Out</label>
                      <input 
                        type="time" 
                        value={overrideData.checkOut}
                        onChange={e => setOverrideData({...overrideData, checkOut: e.target.value})}
                        className="w-full px-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 outline-none transition-all font-bold"
                      />
                   </div>
                </div>

                <div className="col-span-full">
                   <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-3">Adjustment Reason</label>
                   <select 
                     value={overrideData.reason}
                     onChange={e => setOverrideData({...overrideData, reason: e.target.value})}
                     className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 outline-none transition-all font-bold"
                   >
                      <option>Forgot to clock in</option>
                      <option>Biometric device failure</option>
                      <option>Offsite meeting / Field work</option>
                      <option>Correction of previous error</option>
                   </select>
                </div>
             </div>

             <button 
               type="submit"
               disabled={isSaving}
               className="w-full py-5 bg-blue-600 text-white font-black text-lg rounded-[2rem] shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center space-x-3"
             >
                {isSaving ? <Loader2 className="h-6 w-6 animate-spin" /> : <Save className="h-6 w-6" />}
                <span>{success ? 'Adjustment Posted!' : 'Apply Manual Override'}</span>
             </button>
          </form>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
           <div className="bg-amber-600 p-10 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
              <AlertTriangle className="absolute -right-4 -bottom-4 h-32 w-32 opacity-10" />
              <h4 className="text-xl font-bold mb-4 flex items-center">
                 <Shield className="h-5 w-5 mr-2" />
                 Audit Notice
              </h4>
              <p className="text-amber-100 text-sm leading-relaxed mb-8 font-medium">
                 Manual overrides are flagged for secondary audit. Please ensure you have documented proof (email, manager note) for this correction.
              </p>
              <div className="flex items-center space-x-2 text-xs font-mono bg-black/10 p-3 rounded-xl">
                 <History className="h-4 w-4" />
                 <span>ALL OVERRIDES ARE LOGGED</span>
              </div>
           </div>

           <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
              <h4 className="font-black text-gray-400 text-[10px] uppercase tracking-widest mb-6">Recent Adjustments</h4>
              <div className="space-y-4">
                 {[
                   { name: 'Sarah J.', date: 'Today', change: '+2.5 hrs' },
                   { name: 'David L.', date: 'Yesterday', change: 'Fix Out-Time' }
                 ].map((adj, i) => (
                   <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                      <p className="text-sm font-bold text-gray-700">{adj.name}</p>
                      <p className="text-xs text-blue-600 font-bold">{adj.change}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}

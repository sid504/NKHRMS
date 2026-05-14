'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Clock, 
  ArrowLeft, 
  Plus, 
  Calendar, 
  Users, 
  Search,
  Settings,
  Shield,
  Zap,
  CheckCircle,
  X,
  Edit,
  Trash2,
  Moon,
  Sun,
  Coffee
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ShiftManagementPage() {
  const [shifts, setShifts] = useState([
    { id: '1', name: 'General Shift', start: '09:00', end: '18:00', grace: '15', type: 'Day', color: 'bg-blue-50 text-blue-600' },
    { id: '2', name: 'Morning Shift', start: '06:00', end: '14:00', grace: '10', type: 'Day', color: 'bg-orange-50 text-orange-600' },
    { id: '3', name: 'Night Shift', start: '22:00', end: '06:00', grace: '30', type: 'Night', color: 'bg-indigo-50 text-indigo-600' }
  ])
  
  const [showAddModal, setShowAddModal] = useState(false)
  const [newShift, setNewShift] = useState({ name: '', start: '09:00', end: '18:00', grace: '15', type: 'Day' })

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    setShifts([...shifts, { ...newShift, id: Date.now().toString(), color: 'bg-purple-50 text-purple-600' }])
    setShowAddModal(false)
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
            <h1 className="text-2xl font-bold text-gray-900">Shift Management</h1>
            <p className="text-gray-600">Define work timings, grace periods, and shift types</p>
          </div>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center shadow-lg shadow-blue-100 transition-all"
        >
          <Plus className="h-4 w-4 mr-2" />
          Define New Shift
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shifts.map((shift) => (
          <motion.div 
            key={shift.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 relative group"
          >
             <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl ${shift.color}`}>
                   {shift.type === 'Day' ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
                </div>
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Edit className="h-4 w-4" />
                   </button>
                   <button 
                    onClick={() => setShifts(shifts.filter(s => s.id !== shift.id))}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                   >
                      <Trash2 className="h-4 w-4" />
                   </button>
                </div>
             </div>

             <h3 className="text-xl font-bold text-gray-900 mb-2">{shift.name}</h3>
             <div className="flex items-center text-2xl font-black text-gray-900 mb-6">
                <Clock className="h-5 w-5 mr-2 text-gray-400" />
                {shift.start} — {shift.end}
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-xl">
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Grace Period</p>
                   <p className="text-sm font-bold text-gray-700">{shift.grace} Mins</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Break Time</p>
                   <p className="text-sm font-bold text-gray-700">60 Mins</p>
                </div>
             </div>
          </motion.div>
        ))}
      </div>

      {/* Add Shift Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6 bg-blue-600 text-white flex justify-between items-center">
                <h2 className="text-xl font-bold">Configure Shift</h2>
                <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleAdd} className="p-8 space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Shift Name</label>
                  <input 
                    required
                    type="text" 
                    value={newShift.name}
                    onChange={e => setNewShift({...newShift, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="e.g. Evening Roster"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Start Time</label>
                    <input 
                      type="time" 
                      value={newShift.start}
                      onChange={e => setNewShift({...newShift, start: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">End Time</label>
                    <input 
                      type="time" 
                      value={newShift.end}
                      onChange={e => setNewShift({...newShift, end: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Grace Period (Minutes)</label>
                  <input 
                    type="number" 
                    value={newShift.grace}
                    onChange={e => setNewShift({...newShift, grace: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg hover:bg-blue-700 transition-all"
                >
                  Create Shift
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

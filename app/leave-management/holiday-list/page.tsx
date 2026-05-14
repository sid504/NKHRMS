'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import Link from 'next/link'
import {
  ArrowLeft,
  Calendar,
  Search,
  Download,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  Star,
  Flag,
  Gift,
  Heart,
  Loader2,
  X
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function HolidayListPage() {
  const { user } = useAuth()
  const [holidays, setHolidays] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString())
  const [showAddModal, setShowAddModal] = useState(false)
  
  // New holiday form state
  const [newHoliday, setNewHoliday] = useState({
    name: '',
    date: '',
    type: 'Public Holiday',
    description: '',
    isOptional: false,
    country: 'All',
    region: 'Global'
  })

  const fetchHolidays = async () => {
    try {
      const res = await fetch(`/api/holidays?year=${selectedYear}`)
      if (res.ok) {
        const data = await res.json()
        setHolidays(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch holidays:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHolidays()
  }, [selectedYear])

  const handleAddHoliday = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/holidays', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newHoliday)
      })

      if (res.ok) {
        setShowAddModal(false)
        fetchHolidays()
        setNewHoliday({
          name: '',
          date: '',
          type: 'Public Holiday',
          description: '',
          isOptional: false,
          country: 'All',
          region: 'Global'
        })
      }
    } catch (error) {
      console.error('Failed to add holiday:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this holiday?')) return
    try {
      const res = await fetch(`/api/holidays/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setHolidays(prev => prev.filter(h => h.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete holiday:', error)
    }
  }

  const filteredHolidays = holidays.filter(h => 
    h.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const holidayTypes = [
    { name: 'Public Holiday', color: 'text-red-600', bgColor: 'bg-red-50' },
    { name: 'National Holiday', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { name: 'Optional Holiday', color: 'text-green-600', bgColor: 'bg-green-50' },
    { name: 'Company Holiday', color: 'text-purple-600', bgColor: 'bg-purple-50' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/leave-management" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Holiday List Management</h1>
            <p className="text-gray-600">Configure and manage corporate and regional holidays</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center shadow-lg shadow-blue-100 transition-all"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Holiday
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search holiday name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
        </div>
      </div>

      {/* Holiday Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Holiday</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Type</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto" />
                    <p className="mt-2 text-gray-500">Syncing with calendar...</p>
                  </td>
                </tr>
              ) : filteredHolidays.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    No holidays found for {selectedYear}.
                  </td>
                </tr>
              ) : (
                filteredHolidays.map((holiday) => (
                  <tr key={holiday.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mr-3">
                          <Flag className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900">{holiday.name}</div>
                          <div className="text-xs text-gray-500">{holiday.region} • {holiday.country}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        {new Date(holiday.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        holidayTypes.find(t => t.name === holiday.type)?.bgColor || 'bg-gray-50'
                      } ${
                        holidayTypes.find(t => t.name === holiday.type)?.color || 'text-gray-600'
                      }`}>
                        {holiday.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleDelete(holiday.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Holiday Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-blue-600 text-white">
                <h3 className="text-xl font-bold">Add New Holiday</h3>
                <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <form onSubmit={handleAddHoliday} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Holiday Name</label>
                  <input 
                    required
                    type="text" 
                    value={newHoliday.name}
                    onChange={e => setNewHoliday({...newHoliday, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="e.g. Christmas Day"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Date</label>
                    <input 
                      required
                      type="date" 
                      value={newHoliday.date}
                      onChange={e => setNewHoliday({...newHoliday, date: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Type</label>
                    <select 
                      value={newHoliday.type}
                      onChange={e => setNewHoliday({...newHoliday, type: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      {holidayTypes.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                  <textarea 
                    value={newHoliday.description}
                    onChange={e => setNewHoliday({...newHoliday, description: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-20"
                    placeholder="Brief details about the holiday..."
                  />
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <input 
                    type="checkbox" 
                    id="isOptional" 
                    checked={newHoliday.isOptional}
                    onChange={e => setNewHoliday({...newHoliday, isOptional: e.target.checked})}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300"
                  />
                  <label htmlFor="isOptional" className="text-sm text-gray-600">This is an Optional Holiday</label>
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg hover:bg-blue-700 transition-all shadow-blue-100"
                >
                  Create Holiday
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
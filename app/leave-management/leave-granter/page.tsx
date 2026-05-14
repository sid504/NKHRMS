'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import Link from 'next/link'
import {
  ArrowLeft,
  Calendar,
  User,
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  FileText,
  Shield,
  MessageSquare,
  Loader2
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LeaveGranterPage() {
  const { user } = useAuth()
  const [requests, setRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [processingId, setProcessingId] = useState<string | null>(null)

  const fetchRequests = async () => {
    try {
      const res = await fetch('/api/leave-requests')
      if (res.ok) {
        const data = await res.json()
        setRequests(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch requests:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  const handleAction = async (id: string, status: 'APPROVED' | 'REJECTED') => {
    setProcessingId(id)
    try {
      const res = await fetch(`/api/leave-requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, approvedBy: user?.name || 'Admin' })
      })

      if (res.ok) {
        // Optimistically update the UI or re-fetch
        setRequests(prev => prev.map(req => 
          req.id === id ? { ...req, status } : req
        ))
      }
    } catch (error) {
      console.error('Action failed:', error)
    } finally {
      setProcessingId(null)
    }
  }

  const filteredRequests = requests.filter(req => {
    const matchesSearch = 
      req.employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.employee.employeeId.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || req.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED': return 'text-green-600 bg-green-50'
      case 'PENDING': return 'text-yellow-600 bg-yellow-50'
      case 'REJECTED': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
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
            <h1 className="text-2xl font-bold text-gray-900">Leave Granter</h1>
            <p className="text-gray-600">Admin-level leave approval and management system</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center shadow-lg shadow-blue-100 transition-all">
            <Shield className="h-4 w-4 mr-2" />
            Bulk Actions
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search employee name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="all">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Employee</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Leave Details</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <AnimatePresence>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center">
                      <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto" />
                      <p className="mt-2 text-gray-500">Loading requests...</p>
                    </td>
                  </tr>
                ) : filteredRequests.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                      No leave requests found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map((req) => (
                    <motion.tr 
                      key={req.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                            {req.employee.firstName[0]}{req.employee.lastName[0]}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-bold text-gray-900">{req.employee.firstName} {req.employee.lastName}</div>
                            <div className="text-xs text-gray-500">{req.employee.employeeId} • {req.employee.department}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-gray-900">{req.leaveType}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(req.startDate).toLocaleDateString()} - {new Date(req.endDate).toLocaleDateString()}
                        </div>
                        <div className="text-xs italic text-gray-400 mt-1">"{req.reason}"</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(req.status)}`}>
                          {req.status === 'PENDING' && <Clock className="h-3 w-3 mr-1" />}
                          {req.status === 'APPROVED' && <CheckCircle className="h-3 w-3 mr-1" />}
                          {req.status === 'REJECTED' && <XCircle className="h-3 w-3 mr-1" />}
                          {req.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {req.status === 'PENDING' ? (
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleAction(req.id, 'APPROVED')}
                              disabled={processingId === req.id}
                              className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                              title="Approve"
                            >
                              {processingId === req.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
                            </button>
                            <button 
                              onClick={() => handleAction(req.id, 'REJECTED')}
                              disabled={processingId === req.id}
                              className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                              title="Reject"
                            >
                              {processingId === req.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4" />}
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">Processed by {req.approvedBy || 'Admin'}</span>
                        )}
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Guidelines Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
            Policy Reminders
          </h3>
          <ul className="text-sm text-gray-600 space-y-3">
             <li className="flex items-start">
               <div className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-1.5 mr-2 flex-shrink-0" />
               Annual leaves exceeding 10 days require director-level approval.
             </li>
             <li className="flex items-start">
               <div className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-1.5 mr-2 flex-shrink-0" />
               Sick leaves for more than 3 days must have a medical certificate attached.
             </li>
             <li className="flex items-start">
               <div className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-1.5 mr-2 flex-shrink-0" />
               Leave encashment rules apply to all rejected earned leaves.
             </li>
          </ul>
        </div>
        
        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-8 rounded-2xl text-white shadow-lg relative overflow-hidden">
          <Shield className="absolute -right-4 -bottom-4 h-32 w-32 opacity-10" />
          <h3 className="text-xl font-bold mb-2">Audit Trail Active</h3>
          <p className="text-indigo-100 text-sm mb-6">
            Every approval or rejection is logged with a timestamp and the administrator's ID for regulatory compliance.
          </p>
          <div className="flex items-center space-x-2 text-xs font-mono bg-white/10 px-3 py-1 rounded w-fit">
            <Activity className="h-3 w-3" />
            <span>SECURE SESSION: ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  )
}
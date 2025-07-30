'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../contexts/AuthContext'
import { 
  Calendar, 
  Plus, 
  Search, 
  Filter,
  Check,
  X,
  Clock,
  User,
  CalendarDays
} from 'lucide-react'

export default function LeaveRequestsPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedType, setSelectedType] = useState('all')

  // Mock leave requests data
  const leaveRequests = [
    {
      id: 1,
      employeeName: 'John Doe',
      employeeId: 'EMP001',
      leaveType: 'Vacation',
      startDate: '2024-01-15',
      endDate: '2024-01-20',
      days: 6,
      reason: 'Family vacation',
      status: 'Pending',
      submittedDate: '2024-01-10'
    },
    {
      id: 2,
      employeeName: 'Sarah Wilson',
      employeeId: 'EMP002',
      leaveType: 'Sick Leave',
      startDate: '2024-01-12',
      endDate: '2024-01-14',
      days: 3,
      reason: 'Medical appointment',
      status: 'Approved',
      submittedDate: '2024-01-11'
    },
    {
      id: 3,
      employeeName: 'Mike Johnson',
      employeeId: 'EMP003',
      leaveType: 'Personal Leave',
      startDate: '2024-01-25',
      endDate: '2024-01-26',
      days: 2,
      reason: 'Personal matters',
      status: 'Rejected',
      submittedDate: '2024-01-15'
    },
    {
      id: 4,
      employeeName: 'Alice Brown',
      employeeId: 'EMP004',
      leaveType: 'Maternity Leave',
      startDate: '2024-02-01',
      endDate: '2024-05-01',
      days: 90,
      reason: 'Maternity leave',
      status: 'Approved',
      submittedDate: '2024-01-20'
    }
  ]

  const leaveTypes = ['Vacation', 'Sick Leave', 'Personal Leave', 'Maternity Leave', 'Paternity Leave', 'Bereavement']
  const statuses = ['Pending', 'Approved', 'Rejected', 'Cancelled']

  const filteredRequests = leaveRequests.filter(request => {
    const matchesSearch = request.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || request.status === selectedStatus
    const matchesType = selectedType === 'all' || request.leaveType === selectedType
    
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'Rejected':
        return 'bg-red-100 text-red-800'
      case 'Cancelled':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getLeaveTypeColor = (type: string) => {
    switch (type) {
      case 'Vacation':
        return 'bg-blue-100 text-blue-800'
      case 'Sick Leave':
        return 'bg-red-100 text-red-800'
      case 'Personal Leave':
        return 'bg-purple-100 text-purple-800'
      case 'Maternity Leave':
        return 'bg-pink-100 text-pink-800'
      case 'Paternity Leave':
        return 'bg-indigo-100 text-indigo-800'
      case 'Bereavement':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const stats = [
    {
      title: 'Total Requests',
      value: leaveRequests.length.toString(),
      icon: Calendar,
      color: 'bg-blue-500'
    },
    {
      title: 'Pending',
      value: leaveRequests.filter(r => r.status === 'Pending').length.toString(),
      icon: Clock,
      color: 'bg-yellow-500'
    },
    {
      title: 'Approved',
      value: leaveRequests.filter(r => r.status === 'Approved').length.toString(),
      icon: Check,
      color: 'bg-green-500'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {user?.role === 'admin' ? 'Team Leave Requests' : 'Leave Management'}
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            {user?.role === 'admin' 
              ? 'Review and approve leave requests from all teams'
              : user?.role === 'manager'
              ? 'Manage leave requests and approvals for your team members'
              : 'View and submit leave requests'
            }
          </p>
          {user?.role === 'manager' && (
            <p className="mt-1 text-xs text-blue-600">
              Manager: You can approve or reject leave requests from your team members
            </p>
          )}
        </div>
        <div className="flex space-x-3">
          <Link
            href="/leave-requests/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Request
          </Link>
          {user?.role === 'admin' && (
            <Link
              href="/leave-balances"
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center"
            >
              <CalendarDays className="h-4 w-4 mr-2" />
              HR Management
            </Link>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Requests
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="by employee name or ID..."
                />
              </div>
            </div>

            {/* Status filter */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                id="status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            {/* Leave type filter */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                Leave Type
              </label>
              <select
                id="type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                {leaveTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Leave requests table */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            {user?.role === 'admin' 
              ? `All Leave Requests (${filteredRequests.length} requests)`
              : user?.role === 'manager'
              ? `Team Leave Requests (${filteredRequests.length} requests)`
              : `Leave Requests (${filteredRequests.length} requests)`
            }
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Leave Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                          <span className="text-white font-medium">
                            {request.employeeName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {request.employeeName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {request.employeeId}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLeaveTypeColor(request.leaveType)}`}>
                      {request.leaveType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()} ({request.days} days)
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      {/* Show approve/reject buttons for pending requests based on role */}
                      {request.status === 'Pending' && (
                        <>
                          {(user?.role === 'admin' || user?.role === 'manager') && (
                            <>
                              <button 
                                className="text-green-600 hover:text-green-900"
                                title="Approve Request"
                              >
                                <Check className="h-4 w-4" />
                              </button>
                              <button 
                                className="text-red-600 hover:text-red-900"
                                title="Reject Request"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </>
                          )}
                        </>
                      )}
                      
                      {/* Show view details button for all users */}
                      <button 
                        className="text-blue-600 hover:text-blue-900"
                        title="View Details"
                      >
                        <CalendarDays className="h-4 w-4" />
                      </button>
                      
                      {/* Show additional admin actions */}
                      {user?.role === 'admin' && (
                        <button 
                          className="text-purple-600 hover:text-purple-900"
                          title="Manage Leave Balance"
                        >
                          <User className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRequests.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No leave requests found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 
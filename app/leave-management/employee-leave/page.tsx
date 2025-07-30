'use client'

import { useState } from 'react'
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
  CalendarDays,
  FileText,
  Briefcase,
  Building,
  Users,
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown
} from 'lucide-react'

export default function EmployeeLeavePage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  // Mock data for employee leave records
  const employeeLeaves = [
    {
      id: 1,
      employeeName: 'John Smith',
      employeeId: 'EMP001',
      department: 'Engineering',
      leaveType: 'Annual Leave',
      startDate: '2024-01-15',
      endDate: '2024-01-19',
      days: 5,
      status: 'Approved',
      reason: 'Family vacation',
      appliedDate: '2024-01-10',
      approvedBy: 'Sarah Johnson',
      approvedDate: '2024-01-11'
    },
    {
      id: 2,
      employeeName: 'Emily Davis',
      employeeId: 'EMP002',
      department: 'Marketing',
      leaveType: 'Sick Leave',
      startDate: '2024-01-20',
      endDate: '2024-01-22',
      days: 3,
      status: 'Pending',
      reason: 'Medical appointment',
      appliedDate: '2024-01-18',
      approvedBy: '-',
      approvedDate: '-'
    },
    {
      id: 3,
      employeeName: 'Mike Wilson',
      employeeId: 'EMP003',
      department: 'Sales',
      leaveType: 'Maternity Leave',
      startDate: '2024-02-01',
      endDate: '2024-05-01',
      days: 90,
      status: 'Approved',
      reason: 'Maternity leave',
      appliedDate: '2024-01-15',
      approvedBy: 'David Brown',
      approvedDate: '2024-01-16'
    },
    {
      id: 4,
      employeeName: 'Sarah Johnson',
      employeeId: 'EMP004',
      department: 'HR',
      leaveType: 'Personal Leave',
      startDate: '2024-01-25',
      endDate: '2024-01-26',
      days: 2,
      status: 'Rejected',
      reason: 'Personal emergency',
      appliedDate: '2024-01-23',
      approvedBy: 'John Manager',
      approvedDate: '2024-01-24'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'text-green-600 bg-green-50'
      case 'Pending': return 'text-yellow-600 bg-yellow-50'
      case 'Rejected': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return <CheckCircle className="h-4 w-4" />
      case 'Pending': return <Clock className="h-4 w-4" />
      case 'Rejected': return <XCircle className="h-4 w-4" />
      default: return <AlertTriangle className="h-4 w-4" />
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
            <h1 className="text-2xl font-bold text-gray-900">Employee Leave Management</h1>
            <p className="text-gray-600">Manage and track employee leave applications and approvals</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            New Leave Application
          </button>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search Employee</label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Departments</option>
              <option value="engineering">Engineering</option>
              <option value="marketing">Marketing</option>
              <option value="sales">Sales</option>
              <option value="hr">HR</option>
              <option value="finance">Finance</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">+12%</span>
            <span className="text-gray-500 ml-1">vs last month</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-green-600">124</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-gray-500">79.5% approval rate</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">18</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-gray-500">11.5% pending</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-red-600">14</p>
            </div>
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-gray-500">9% rejection rate</span>
          </div>
        </div>
      </div>

      {/* Employee Leave Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Employee Leave Applications</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approved By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employeeLeaves.map((leave) => (
                <tr key={leave.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {leave.employeeName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{leave.employeeName}</div>
                        <div className="text-sm text-gray-500">{leave.employeeId} • {leave.department}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{leave.leaveType}</div>
                    <div className="text-sm text-gray-500">{leave.reason}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">{leave.days} days</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(leave.status)}`}>
                      {getStatusIcon(leave.status)}
                      <span className="ml-1">{leave.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(leave.appliedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{leave.approvedBy}</div>
                    {leave.approvedDate !== '-' && (
                      <div className="text-sm text-gray-500">{new Date(leave.approvedDate).toLocaleDateString()}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900" title="View Details">
                        <Eye className="h-4 w-4" />
                      </button>
                      {leave.status === 'Pending' && (
                        <>
                          <button className="text-green-600 hover:text-green-900" title="Approve">
                            <CheckCircle className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900" title="Reject">
                            <XCircle className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      <button className="text-gray-600 hover:text-gray-900" title="Edit">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900" title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 
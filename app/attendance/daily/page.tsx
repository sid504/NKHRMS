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
  TrendingUp,
  TrendingDown,
  Shield,
  Zap,
  Award,
  Target,
  Activity,
  Settings,
  UserCheck,
  UserX,
  MessageSquare,
  MapPin,
  Wifi,
  Smartphone,
  Monitor,
  Phone,
  Mail,
  LogIn,
  LogOut,
  RefreshCw
} from 'lucide-react'

export default function DailyAttendancePage() {
  const { user } = useAuth()
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  // Mock data for daily attendance
  const dailyAttendance = [
    {
      id: 1,
      employeeName: 'John Smith',
      employeeId: 'EMP001',
      department: 'Engineering',
      position: 'Senior Developer',
      checkInTime: '09:15 AM',
      checkOutTime: '06:30 PM',
      totalHours: '8h 15m',
      status: 'Present',
      location: 'Office',
      device: 'Biometric',
      lateBy: '15 min',
      overtime: '0h 15m',
      avatar: 'JS'
    },
    {
      id: 2,
      employeeName: 'Emily Davis',
      employeeId: 'EMP002',
      department: 'Marketing',
      position: 'Marketing Manager',
      checkInTime: '09:00 AM',
      checkOutTime: '06:00 PM',
      totalHours: '8h 0m',
      status: 'WFH',
      location: 'Remote',
      device: 'Mobile App',
      lateBy: '0 min',
      overtime: '0h 0m',
      avatar: 'ED'
    },
    {
      id: 3,
      employeeName: 'Mike Wilson',
      employeeId: 'EMP003',
      department: 'Sales',
      position: 'Sales Executive',
      checkInTime: '09:45 AM',
      checkOutTime: '07:00 PM',
      totalHours: '8h 15m',
      status: 'Late',
      location: 'Office',
      device: 'Biometric',
      lateBy: '45 min',
      overtime: '1h 0m',
      avatar: 'MW'
    },
    {
      id: 4,
      employeeName: 'Sarah Johnson',
      employeeId: 'EMP004',
      department: 'HR',
      position: 'HR Manager',
      checkInTime: '-',
      checkOutTime: '-',
      totalHours: '0h 0m',
      status: 'On Leave',
      location: '-',
      device: '-',
      lateBy: '-',
      overtime: '0h 0m',
      avatar: 'SJ'
    },
    {
      id: 5,
      employeeName: 'David Brown',
      employeeId: 'EMP005',
      department: 'Finance',
      position: 'Financial Analyst',
      checkInTime: '08:30 AM',
      checkOutTime: '06:30 PM',
      totalHours: '9h 0m',
      status: 'Present',
      location: 'Office',
      device: 'Biometric',
      lateBy: '0 min',
      overtime: '1h 0m',
      avatar: 'DB'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present': return 'text-green-600 bg-green-50'
      case 'WFH': return 'text-purple-600 bg-purple-50'
      case 'Late': return 'text-yellow-600 bg-yellow-50'
      case 'On Leave': return 'text-red-600 bg-red-50'
      case 'Absent': return 'text-gray-600 bg-gray-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Present': return <UserCheck className="h-4 w-4" />
      case 'WFH': return <Monitor className="h-4 w-4" />
      case 'Late': return <Clock className="h-4 w-4" />
      case 'On Leave': return <Calendar className="h-4 w-4" />
      case 'Absent': return <UserX className="h-4 w-4" />
      default: return <User className="h-4 w-4" />
    }
  }

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'Biometric': return <Shield className="h-4 w-4" />
      case 'Mobile App': return <Smartphone className="h-4 w-4" />
      case 'Web Portal': return <Monitor className="h-4 w-4" />
      default: return <User className="h-4 w-4" />
    }
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
            <h1 className="text-2xl font-bold text-gray-900">Daily Attendance</h1>
            <p className="text-gray-600">View and manage daily attendance records</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
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
              <option value="present">Present</option>
              <option value="wfh">WFH</option>
              <option value="late">Late</option>
              <option value="on-leave">On Leave</option>
              <option value="absent">Absent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">200</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-gray-500">Company wide</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Present Today</p>
              <p className="text-2xl font-bold text-green-600">142</p>
            </div>
            <UserCheck className="h-8 w-8 text-green-600" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-gray-500">71% attendance</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Late Arrivals</p>
              <p className="text-2xl font-bold text-yellow-600">12</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-gray-500">6% late rate</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">On Leave</p>
              <p className="text-2xl font-bold text-red-600">15</p>
            </div>
            <Calendar className="h-8 w-8 text-red-600" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-gray-500">7.5% absent</span>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Daily Attendance Records</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dailyAttendance.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">{record.avatar}</span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{record.employeeName}</div>
                        <div className="text-sm text-gray-500">{record.employeeId} • {record.department}</div>
                        <div className="text-xs text-gray-400">{record.position}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                      {getStatusIcon(record.status)}
                      <span className="ml-1">{record.status}</span>
                    </span>
                    {record.lateBy !== '-' && record.lateBy !== '0 min' && (
                      <div className="text-xs text-yellow-600 mt-1">Late by {record.lateBy}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{record.checkInTime}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{record.checkOutTime}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{record.totalHours}</div>
                    {record.overtime !== '0h 0m' && (
                      <div className="text-xs text-blue-600">OT: {record.overtime}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-900">{record.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getDeviceIcon(record.device)}
                      <span className="ml-1 text-sm text-gray-900">{record.device}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900" title="View Details">
                        <Eye className="h-4 w-4" />
                      </button>
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

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="flex items-center">
              <Plus className="h-6 w-6 text-blue-600 mr-3" />
              <div>
                <div className="font-medium text-gray-900">Manual Entry</div>
                <div className="text-sm text-gray-500">Add attendance manually</div>
              </div>
            </div>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="flex items-center">
              <Download className="h-6 w-6 text-green-600 mr-3" />
              <div>
                <div className="font-medium text-gray-900">Export Data</div>
                <div className="text-sm text-gray-500">Download attendance report</div>
              </div>
            </div>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="flex items-center">
              <Settings className="h-6 w-6 text-purple-600 mr-3" />
              <div>
                <div className="font-medium text-gray-900">Settings</div>
                <div className="text-sm text-gray-500">Configure attendance rules</div>
              </div>
            </div>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="flex items-center">
              <BarChart3 className="h-6 w-6 text-orange-600 mr-3" />
              <div>
                <div className="font-medium text-gray-900">Analytics</div>
                <div className="text-sm text-gray-500">View attendance trends</div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
} 
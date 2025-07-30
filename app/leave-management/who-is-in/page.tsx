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
  RefreshCw
} from 'lucide-react'

export default function WhoIsInPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  // Mock data for employees present today
  const employeesPresent = [
    {
      id: 1,
      name: 'John Smith',
      employeeId: 'EMP001',
      department: 'Engineering',
      position: 'Senior Developer',
      status: 'Present',
      checkInTime: '09:15 AM',
      checkOutTime: '-',
      location: 'Office',
      device: 'Biometric',
      contact: '+1-555-0123',
      email: 'john.smith@company.com',
      avatar: 'JS',
      lastActivity: '2 minutes ago',
      isOnline: true
    },
    {
      id: 2,
      name: 'Emily Davis',
      employeeId: 'EMP002',
      department: 'Marketing',
      position: 'Marketing Manager',
      status: 'WFH',
      checkInTime: '09:00 AM',
      checkOutTime: '-',
      location: 'Remote',
      device: 'Mobile App',
      contact: '+1-555-0124',
      email: 'emily.davis@company.com',
      avatar: 'ED',
      lastActivity: '5 minutes ago',
      isOnline: true
    },
    {
      id: 3,
      name: 'Mike Wilson',
      employeeId: 'EMP003',
      department: 'Sales',
      position: 'Sales Executive',
      status: 'Late',
      checkInTime: '09:45 AM',
      checkOutTime: '-',
      location: 'Office',
      device: 'Biometric',
      contact: '+1-555-0125',
      email: 'mike.wilson@company.com',
      avatar: 'MW',
      lastActivity: '1 minute ago',
      isOnline: true
    },
    {
      id: 4,
      name: 'Sarah Johnson',
      employeeId: 'EMP004',
      department: 'HR',
      position: 'HR Manager',
      status: 'On Leave',
      checkInTime: '-',
      checkOutTime: '-',
      location: '-',
      device: '-',
      contact: '+1-555-0126',
      email: 'sarah.johnson@company.com',
      avatar: 'SJ',
      lastActivity: 'Yesterday',
      isOnline: false
    },
    {
      id: 5,
      name: 'David Brown',
      employeeId: 'EMP005',
      department: 'Finance',
      position: 'Financial Analyst',
      status: 'Present',
      checkInTime: '08:30 AM',
      checkOutTime: '-',
      location: 'Office',
      device: 'Biometric',
      contact: '+1-555-0127',
      email: 'david.brown@company.com',
      avatar: 'DB',
      lastActivity: 'Just now',
      isOnline: true
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
          <Link href="/leave-management" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Who is In Today</h1>
            <p className="text-gray-600">Real-time view of employees present and their current status</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export Report
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
              <option value="present">Present</option>
              <option value="wfh">WFH</option>
              <option value="late">Late</option>
              <option value="on-leave">On Leave</option>
              <option value="absent">Absent</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              defaultValue={new Date().toISOString().split('T')[0]}
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
              <p className="text-sm text-gray-600">Working Remotely</p>
              <p className="text-2xl font-bold text-purple-600">23</p>
            </div>
            <Monitor className="h-8 w-8 text-purple-600" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-gray-500">11.5% WFH</span>
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

      {/* Employee List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Employee Status Today</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employeesPresent.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">{employee.avatar}</span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.employeeId} • {employee.department}</div>
                        <div className="text-xs text-gray-400">{employee.position}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
                      {getStatusIcon(employee.status)}
                      <span className="ml-1">{employee.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{employee.checkInTime}</div>
                    {employee.checkOutTime !== '-' && (
                      <div className="text-sm text-gray-500">Out: {employee.checkOutTime}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-900">{employee.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getDeviceIcon(employee.device)}
                      <span className="ml-1 text-sm text-gray-900">{employee.device}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${employee.isOnline ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                      <span className="text-sm text-gray-900">{employee.lastActivity}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <a href={`tel:${employee.contact}`} className="text-blue-600 hover:text-blue-900" title="Call">
                        <Phone className="h-4 w-4" />
                      </a>
                      <a href={`mailto:${employee.email}`} className="text-blue-600 hover:text-blue-900" title="Email">
                        <Mail className="h-4 w-4" />
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900" title="View Details">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900" title="Send Message">
                        <MessageSquare className="h-4 w-4" />
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="flex items-center">
              <UserCheck className="h-6 w-6 text-green-600 mr-3" />
              <div>
                <div className="font-medium text-gray-900">Mark Attendance</div>
                <div className="text-sm text-gray-500">Record your attendance</div>
              </div>
            </div>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="flex items-center">
              <MessageSquare className="h-6 w-6 text-blue-600 mr-3" />
              <div>
                <div className="font-medium text-gray-900">Send Message</div>
                <div className="text-sm text-gray-500">Contact team members</div>
              </div>
            </div>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="flex items-center">
              <Download className="h-6 w-6 text-purple-600 mr-3" />
              <div>
                <div className="font-medium text-gray-900">Export Report</div>
                <div className="text-sm text-gray-500">Download attendance data</div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
} 
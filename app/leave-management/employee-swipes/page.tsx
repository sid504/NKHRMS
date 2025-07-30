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
  LogOut
} from 'lucide-react'

export default function EmployeeSwipesPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  // Mock data for employee swipes
  const employeeSwipes = [
    {
      id: 1,
      employeeName: 'John Smith',
      employeeId: 'EMP001',
      department: 'Engineering',
      swipeType: 'Check In',
      swipeTime: '09:15 AM',
      swipeDate: '2024-01-20',
      device: 'Biometric',
      location: 'Main Gate',
      ipAddress: '192.168.1.100',
      status: 'Valid',
      lateBy: '15 min',
      avatar: 'JS'
    },
    {
      id: 2,
      employeeName: 'Emily Davis',
      employeeId: 'EMP002',
      department: 'Marketing',
      swipeType: 'Check In',
      swipeTime: '09:00 AM',
      swipeDate: '2024-01-20',
      device: 'Mobile App',
      location: 'Remote',
      ipAddress: '203.45.67.89',
      status: 'Valid',
      lateBy: '0 min',
      avatar: 'ED'
    },
    {
      id: 3,
      employeeName: 'Mike Wilson',
      employeeId: 'EMP003',
      department: 'Sales',
      swipeType: 'Check In',
      swipeTime: '09:45 AM',
      swipeDate: '2024-01-20',
      device: 'Biometric',
      location: 'Main Gate',
      ipAddress: '192.168.1.101',
      status: 'Valid',
      lateBy: '45 min',
      avatar: 'MW'
    },
    {
      id: 4,
      employeeName: 'John Smith',
      employeeId: 'EMP001',
      department: 'Engineering',
      swipeType: 'Check Out',
      swipeTime: '06:30 PM',
      swipeDate: '2024-01-20',
      device: 'Biometric',
      location: 'Main Gate',
      ipAddress: '192.168.1.100',
      status: 'Valid',
      lateBy: '-',
      avatar: 'JS'
    },
    {
      id: 5,
      employeeName: 'David Brown',
      employeeId: 'EMP005',
      department: 'Finance',
      swipeType: 'Check In',
      swipeTime: '08:30 AM',
      swipeDate: '2024-01-20',
      device: 'Biometric',
      location: 'Main Gate',
      ipAddress: '192.168.1.102',
      status: 'Valid',
      lateBy: '0 min',
      avatar: 'DB'
    }
  ]

  const getSwipeTypeColor = (type: string) => {
    switch (type) {
      case 'Check In': return 'text-green-600 bg-green-50'
      case 'Check Out': return 'text-blue-600 bg-blue-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getSwipeTypeIcon = (type: string) => {
    switch (type) {
      case 'Check In': return <LogIn className="h-4 w-4" />
      case 'Check Out': return <LogOut className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Valid': return 'text-green-600'
      case 'Invalid': return 'text-red-600'
      case 'Pending': return 'text-yellow-600'
      default: return 'text-gray-600'
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
            <h1 className="text-2xl font-bold text-gray-900">Employee Swipes</h1>
            <p className="text-gray-600">Track employee check-in and check-out swipes</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Manual Entry
          </button>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export Data
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Swipe Type</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">All Types</option>
              <option value="check-in">Check In</option>
              <option value="check-out">Check Out</option>
            </select>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Swipes</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
            <Activity className="h-8 w-8 text-blue-600" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-gray-500">Today</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Check Ins</p>
              <p className="text-2xl font-bold text-green-600">142</p>
            </div>
            <LogIn className="h-8 w-8 text-green-600" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-gray-500">91% success rate</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Check Outs</p>
              <p className="text-2xl font-bold text-blue-600">134</p>
            </div>
            <LogOut className="h-8 w-8 text-blue-600" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-gray-500">86% success rate</span>
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
            <span className="text-gray-500">8.5% late rate</span>
          </div>
        </div>
      </div>

      {/* Swipes Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Employee Swipe Records</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Swipe Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employeeSwipes.map((swipe) => (
                <tr key={swipe.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">{swipe.avatar}</span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{swipe.employeeName}</div>
                        <div className="text-sm text-gray-500">{swipe.employeeId} • {swipe.department}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSwipeTypeColor(swipe.swipeType)}`}>
                      {getSwipeTypeIcon(swipe.swipeType)}
                      <span className="ml-1">{swipe.swipeType}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{swipe.swipeTime}</div>
                    <div className="text-sm text-gray-500">{new Date(swipe.swipeDate).toLocaleDateString()}</div>
                    {swipe.lateBy !== '-' && (
                      <div className="text-xs text-yellow-600">Late by {swipe.lateBy}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getDeviceIcon(swipe.device)}
                      <span className="ml-1 text-sm text-gray-900">{swipe.device}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-900">{swipe.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {swipe.ipAddress}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${getStatusColor(swipe.status)}`}>
                      {swipe.status}
                    </span>
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

      {/* Swipe Guidelines */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Swipe Management Guidelines</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="text-sm font-medium text-gray-900 mb-2">Swipe Types</h5>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><strong>Check In:</strong> Employee arrival swipe at the beginning of the day</li>
              <li><strong>Check Out:</strong> Employee departure swipe at the end of the day</li>
              <li><strong>Break In/Out:</strong> Swipes for lunch and break periods</li>
            </ul>
          </div>
          <div>
            <h5 className="text-sm font-medium text-gray-900 mb-2">Device Types</h5>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><strong>Biometric:</strong> Fingerprint or card-based swipes</li>
              <li><strong>Mobile App:</strong> GPS-enabled mobile application</li>
              <li><strong>Web Portal:</strong> Browser-based attendance marking</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 
'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import Link from 'next/link'
import {
  BarChart3,
  Calendar,
  Clock,
  Users,
  UserCheck,
  UserX,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Download,
  RefreshCw,
  ArrowLeft,
  Eye,
  MoreHorizontal,
  MapPin,
  Wifi,
  Smartphone,
  Monitor,
  Building,
  User,
  CalendarDays,
  Activity,
  Target,
  Award,
  Zap,
  Shield,
  Settings,
  Briefcase
} from 'lucide-react'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts'

export default function AttendanceOverviewPage() {
  const { user } = useAuth()
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [timeFilter, setTimeFilter] = useState('today')

  // Mock data for attendance analytics
  const attendanceData = [
    { name: 'Present', value: 142, color: '#10B981' },
    { name: 'Absent', value: 8, color: '#EF4444' },
    { name: 'Late', value: 12, color: '#F59E0B' },
    { name: 'On Leave', value: 15, color: '#3B82F6' },
    { name: 'WFH', value: 23, color: '#8B5CF6' }
  ]

  const weeklyTrend = [
    { day: 'Mon', present: 145, absent: 5, late: 8, wfh: 22 },
    { day: 'Tue', present: 148, absent: 2, late: 6, wfh: 24 },
    { day: 'Wed', present: 142, absent: 8, late: 12, wfh: 18 },
    { day: 'Thu', present: 150, absent: 0, late: 4, wfh: 26 },
    { day: 'Fri', present: 138, absent: 12, late: 15, wfh: 35 }
  ]

  const monthlyAttendance = [
    { month: 'Jan', attendance: 92, target: 95 },
    { month: 'Feb', attendance: 94, target: 95 },
    { month: 'Mar', attendance: 91, target: 95 },
    { month: 'Apr', attendance: 93, target: 95 },
    { month: 'May', attendance: 96, target: 95 },
    { month: 'Jun', attendance: 94, target: 95 }
  ]

  const employeeAttendance = [
    {
      id: 1,
      name: 'John Smith',
      employeeId: 'EMP001',
      department: 'Engineering',
      status: 'Present',
      checkIn: '09:15 AM',
      checkOut: '06:30 PM',
      location: 'Office',
      device: 'Biometric',
      lateBy: '15 min',
      totalHours: '9h 15m',
      avatar: 'JS'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      employeeId: 'EMP002',
      department: 'Marketing',
      status: 'WFH',
      checkIn: '09:00 AM',
      checkOut: '06:00 PM',
      location: 'Remote',
      device: 'Mobile App',
      lateBy: '0 min',
      totalHours: '9h 0m',
      avatar: 'SJ'
    },
    {
      id: 3,
      name: 'Mike Wilson',
      employeeId: 'EMP003',
      department: 'Sales',
      status: 'Late',
      checkIn: '09:45 AM',
      checkOut: '06:15 PM',
      location: 'Office',
      device: 'Biometric',
      lateBy: '45 min',
      totalHours: '8h 30m',
      avatar: 'MW'
    },
    {
      id: 4,
      name: 'Emily Davis',
      employeeId: 'EMP004',
      department: 'HR',
      status: 'On Leave',
      checkIn: '-',
      checkOut: '-',
      location: '-',
      device: '-',
      lateBy: '-',
      totalHours: '-',
      avatar: 'ED'
    },
    {
      id: 5,
      name: 'David Brown',
      employeeId: 'EMP005',
      department: 'Finance',
      status: 'Absent',
      checkIn: '-',
      checkOut: '-',
      location: '-',
      device: '-',
      lateBy: '-',
      totalHours: '-',
      avatar: 'DB'
    }
  ]

  const departmentStats = [
    { name: 'Engineering', present: 45, absent: 2, late: 4, wfh: 8 },
    { name: 'Marketing', present: 28, absent: 1, late: 2, wfh: 5 },
    { name: 'Sales', present: 35, absent: 3, late: 3, wfh: 4 },
    { name: 'HR', present: 12, absent: 1, late: 1, wfh: 2 },
    { name: 'Finance', present: 22, absent: 1, late: 2, wfh: 4 }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present': return 'text-green-600 bg-green-50'
      case 'Absent': return 'text-red-600 bg-red-50'
      case 'Late': return 'text-yellow-600 bg-yellow-50'
      case 'On Leave': return 'text-blue-600 bg-blue-50'
      case 'WFH': return 'text-purple-600 bg-purple-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Present': return <CheckCircle className="h-4 w-4" />
      case 'Absent': return <XCircle className="h-4 w-4" />
      case 'Late': return <Clock className="h-4 w-4" />
      case 'On Leave': return <Calendar className="h-4 w-4" />
      case 'WFH': return <Monitor className="h-4 w-4" />
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
            <h1 className="text-2xl font-bold text-gray-900">Attendance Overview</h1>
            <p className="text-gray-600">Monitor employee attendance, track patterns, and manage workforce</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Time Filter</label>
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
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
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">200</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">+2.5%</span>
            <span className="text-gray-500 ml-1">vs last month</span>
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
            <span className="text-gray-500">71% attendance rate</span>
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
            <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">-15%</span>
            <span className="text-gray-500 ml-1">vs yesterday</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Absent</p>
              <p className="text-2xl font-bold text-red-600">8</p>
            </div>
            <UserX className="h-8 w-8 text-red-600" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-gray-500">4% absence rate</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">WFH</p>
              <p className="text-2xl font-bold text-purple-600">23</p>
            </div>
            <Monitor className="h-8 w-8 text-purple-600" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-gray-500">11.5% remote work</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Distribution */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attendanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {attendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Trend */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Attendance Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="present" fill="#10B981" name="Present" />
                <Bar dataKey="absent" fill="#EF4444" name="Absent" />
                <Bar dataKey="late" fill="#F59E0B" name="Late" />
                <Bar dataKey="wfh" fill="#8B5CF6" name="WFH" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Monthly Performance */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Attendance Performance</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyAttendance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="attendance" stackId="1" stroke="#3B82F6" fill="#3B82F6" name="Actual" />
              <Area type="monotone" dataKey="target" stackId="2" stroke="#10B981" fill="#10B981" name="Target" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Department-wise Stats */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Department-wise Attendance</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Present</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Absent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Late</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">WFH</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance %</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {departmentStats.map((dept) => {
                const total = dept.present + dept.absent + dept.late + dept.wfh
                const attendancePercent = ((dept.present + dept.wfh) / total * 100).toFixed(1)
                return (
                  <tr key={dept.name} className="hover:bg-gray-50">
                                      <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">{dept.name}</span>
                    </div>
                  </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">{dept.present}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">{dept.absent}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600 font-medium">{dept.late}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600 font-medium">{dept.wfh}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${attendancePercent}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-900">{attendancePercent}%</span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Employee Attendance List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Employee Attendance Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Late By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employeeAttendance.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">{employee.avatar}</span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.employeeId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-900">{employee.department}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
                      {getStatusIcon(employee.status)}
                      <span className="ml-1">{employee.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.checkIn}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.checkOut}</td>
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.lateBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.totalHours}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
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
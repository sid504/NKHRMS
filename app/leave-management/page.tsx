'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import Link from 'next/link'
import { 
  Calendar, 
  Users,
  BarChart3,
  PieChart,
  Clock,
  UserCheck,
  UserX,
  ChevronLeft,
  ChevronRight,
  Filter,
  Download,
  Plus,
  Settings,
  Info,
  Shield,
  Building,
  CheckCircle,
  AlertTriangle,
  Lock,
  Edit,
  RotateCcw,
  FileText,
  Globe,
  Calculator
} from 'lucide-react'
import { BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'

export default function LeaveManagementPage() {
  const { user } = useAuth()
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [timeFilter, setTimeFilter] = useState('current-week')
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data for charts
  const monthlyLeaveData = [
    { month: 'Jan', leaves: 45, vacation: 20, sick: 15, personal: 10 },
    { month: 'Feb', leaves: 38, vacation: 18, sick: 12, personal: 8 },
    { month: 'Mar', leaves: 52, vacation: 25, sick: 18, personal: 9 },
    { month: 'Apr', leaves: 41, vacation: 22, sick: 14, personal: 5 },
    { month: 'May', leaves: 48, vacation: 28, sick: 12, personal: 8 },
    { month: 'Jun', leaves: 35, vacation: 20, sick: 10, personal: 5 },
    { month: 'Jul', leaves: 42, vacation: 24, sick: 13, personal: 5 },
    { month: 'Aug', leaves: 39, vacation: 22, sick: 11, personal: 6 },
    { month: 'Sep', leaves: 44, vacation: 26, sick: 12, personal: 6 },
    { month: 'Oct', leaves: 47, vacation: 28, sick: 14, personal: 5 },
    { month: 'Nov', leaves: 40, vacation: 23, sick: 12, personal: 5 },
    { month: 'Dec', leaves: 36, vacation: 21, sick: 10, personal: 5 }
  ]

  const leaveTypeData = [
    { name: 'Vacation', value: 287, color: '#3B82F6' },
    { name: 'Sick Leave', value: 161, color: '#EF4444' },
    { name: 'Personal', value: 82, color: '#8B5CF6' },
    { name: 'Maternity', value: 12, color: '#EC4899' },
    { name: 'Paternity', value: 8, color: '#06B6D4' },
    { name: 'Bereavement', value: 6, color: '#6B7280' }
  ]

  const employeesOnLeave = [
    {
      id: 'EMP001',
      name: 'John Doe',
      department: 'Engineering',
      leaveType: 'Vacation',
      startDate: '2024-01-15',
      endDate: '2024-01-20',
      days: 6,
      status: 'Approved'
    },
    {
      id: 'EMP002',
      name: 'Sarah Wilson',
      department: 'Engineering',
      leaveType: 'Sick Leave',
      startDate: '2024-01-12',
      endDate: '2024-01-14',
      days: 3,
      status: 'Approved'
    },
    {
      id: 'EMP003',
      name: 'Mike Johnson',
      department: 'Sales',
      leaveType: 'Personal Leave',
      startDate: '2024-01-16',
      endDate: '2024-01-17',
      days: 2,
      status: 'Pending'
    },
    {
      id: 'EMP004',
      name: 'Alice Brown',
      department: 'Marketing',
      leaveType: 'Maternity Leave',
      startDate: '2024-02-01',
      endDate: '2024-05-01',
      days: 90,
      status: 'Approved'
    }
  ]

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const timeFilters = [
    { value: 'current-day', label: 'Current Day' },
    { value: 'current-week', label: 'Current Week' },
    { value: 'current-month', label: 'Current Month' },
    { value: 'last-week', label: 'Last Week' },
    { value: 'last-month', label: 'Last Month' }
  ]

  const getCurrentMonthData = () => {
    return monthlyLeaveData[selectedMonth]
  }

  const getFilteredEmployees = () => {
    // Mock filtering logic based on timeFilter
    return employeesOnLeave.filter(emp => {
      const startDate = new Date(emp.startDate)
      const today = new Date()
      
      switch (timeFilter) {
        case 'current-day':
          return startDate.toDateString() === today.toDateString()
        case 'current-week':
          const weekStart = new Date(today.setDate(today.getDate() - today.getDay()))
          const weekEnd = new Date(today.setDate(today.getDate() - today.getDay() + 6))
          return startDate >= weekStart && startDate <= weekEnd
        case 'current-month':
          return startDate.getMonth() === today.getMonth() && startDate.getFullYear() === today.getFullYear()
        default:
          return true
      }
    })
  }

  return (
    <div className="space-y-6">
      {/* Header with Sub-menu */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Leave Management</h1>
                <p className="text-gray-600">Comprehensive leave tracking and management system</p>
              </div>
              <div className="flex space-x-3">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  New Request
                </button>
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Sub-menu Navigation */}
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Calendar className="h-4 w-4 inline mr-2" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('main')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'main'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <BarChart3 className="h-4 w-4 inline mr-2" />
              Main
            </button>
            <button
              onClick={() => setActiveTab('information')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'information'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Info className="h-4 w-4 inline mr-2" />
              Information
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'admin'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Shield className="h-4 w-4 inline mr-2" />
              Admin
            </button>
            <button
              onClick={() => setActiveTab('setup')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'setup'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Settings className="h-4 w-4 inline mr-2" />
              Setup
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Month Selector */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setSelectedMonth(prev => prev === 0 ? 11 : prev - 1)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <div className="flex items-center space-x-2">
                    <select
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                      className="text-lg font-semibold border-none bg-transparent"
                    >
                      {months.map((month, index) => (
                        <option key={month} value={index}>{month}</option>
                      ))}
                    </select>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                      className="text-lg font-semibold border-none bg-transparent"
                    >
                      {[2023, 2024, 2025].map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => setSelectedMonth(prev => prev === 11 ? 0 : prev + 1)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
                <div className="text-sm text-gray-500">
                  {getCurrentMonthData()?.leaves} total leaves taken this month
                </div>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Leave Trend */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Leave Trend</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyLeaveData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="leaves" fill="#3B82F6" name="Total Leaves" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Leave Type Distribution */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave Type Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={leaveTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {leaveTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Employees on Leave Section */}
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Employees on Leave</h3>
                    <div className="flex items-center space-x-4">
                      <select
                        value={timeFilter}
                        onChange={(e) => setTimeFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {timeFilters.map(filter => (
                          <option key={filter.value} value={filter.value}>{filter.label}</option>
                        ))}
                      </select>
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <Filter className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Employee
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Department
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
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {getFilteredEmployees().map((employee) => (
                        <tr key={employee.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                                <span className="text-white font-medium">
                                  {employee.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                                <div className="text-sm text-gray-500">{employee.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {employee.department}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                              {employee.leaveType}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(employee.startDate).toLocaleDateString()} - {new Date(employee.endDate).toLocaleDateString()} ({employee.days} days)
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              employee.status === 'Approved' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {employee.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'main' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Main Operations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link href="/leave-management/attendance-overview" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <BarChart3 className="h-8 w-8 text-blue-600 mb-2" />
                  <h4 className="font-medium">Attendance Overview</h4>
                  <p className="text-sm text-gray-600">Comprehensive attendance dashboard and analytics</p>
                </Link>
                <Link href="/leave-management/leave-calendar" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Calendar className="h-8 w-8 text-green-600 mb-2" />
                  <h4 className="font-medium">Leave Calendar</h4>
                  <p className="text-sm text-gray-600">Visual calendar view of all leave schedules</p>
                </Link>
                <Link href="/leave-management/who-is-in" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <UserCheck className="h-8 w-8 text-purple-600 mb-2" />
                  <h4 className="font-medium">Who is In</h4>
                  <p className="text-sm text-gray-600">Real-time view of employees present today</p>
                </Link>
              </div>
            </div>
          )}

          {activeTab === 'information' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Information Management</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link href="/leave-management/employee-leave" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Users className="h-8 w-8 text-blue-600 mb-2" />
                  <h4 className="font-medium">Employee Leave</h4>
                  <p className="text-sm text-gray-600">View individual employee leave records</p>
                </Link>
                <Link href="/leave-management/shift-roster" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Clock className="h-8 w-8 text-green-600 mb-2" />
                  <h4 className="font-medium">Shift Roster</h4>
                  <p className="text-sm text-gray-600">Manage employee shift schedules</p>
                </Link>
                <Link href="/leave-management/employee-swipes" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <UserCheck className="h-8 w-8 text-purple-600 mb-2" />
                  <h4 className="font-medium">Employee Swipes</h4>
                  <p className="text-sm text-gray-600">Track attendance swipes</p>
                </Link>
                <Link href="/leave-management/attendance-muster" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <BarChart3 className="h-8 w-8 text-orange-600 mb-2" />
                  <h4 className="font-medium">Attendance Muster</h4>
                  <p className="text-sm text-gray-600">Daily attendance reports</p>
                </Link>
                <Link href="/leave-management/attendance-info" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Info className="h-8 w-8 text-indigo-600 mb-2" />
                  <h4 className="font-medium">Attendance Info</h4>
                  <p className="text-sm text-gray-600">Detailed attendance information</p>
                </Link>
              </div>
            </div>
          )}

          {activeTab === 'admin' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Administrative Functions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link href="/leave-management/leave-granter" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Shield className="h-8 w-8 text-blue-600 mb-2" />
                  <h4 className="font-medium">Leave Granter</h4>
                  <p className="text-sm text-gray-600">Approve/reject leave requests</p>
                </Link>
                <Link href="/leave-management/year-end-process" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Calendar className="h-8 w-8 text-green-600 mb-2" />
                  <h4 className="font-medium">Year End Process</h4>
                  <p className="text-sm text-gray-600">Process year-end leave balances</p>
                </Link>
                <Link href="/leave-management/assign-attendance-scheme" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Settings className="h-8 w-8 text-purple-600 mb-2" />
                  <h4 className="font-medium">Assign Attendance Scheme</h4>
                  <p className="text-sm text-gray-600">Configure attendance policies</p>
                </Link>
                <Link href="/leave-management/process-attendance" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <BarChart3 className="h-8 w-8 text-orange-600 mb-2" />
                  <h4 className="font-medium">Process Attendance</h4>
                  <p className="text-sm text-gray-600">Process attendance data</p>
                </Link>
                <Link href="/leave-management/attendance-period-finalisation" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <CheckCircle className="h-8 w-8 text-indigo-600 mb-2" />
                  <h4 className="font-medium">Attendance Period Finalisation</h4>
                  <p className="text-sm text-gray-600">Finalize attendance periods</p>
                </Link>
                <Link href="/leave-management/attendance-exception" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <AlertTriangle className="h-8 w-8 text-red-600 mb-2" />
                  <h4 className="font-medium">Attendance Exception</h4>
                  <p className="text-sm text-gray-600">Handle attendance exceptions</p>
                </Link>
                <Link href="/leave-management/lock-configuration" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Lock className="h-8 w-8 text-gray-600 mb-2" />
                  <h4 className="font-medium">Lock Configuration</h4>
                  <p className="text-sm text-gray-600">Configure system locks</p>
                </Link>
                <Link href="/leave-management/manual-override" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Edit className="h-8 w-8 text-yellow-600 mb-2" />
                  <h4 className="font-medium">Manual Override</h4>
                  <p className="text-sm text-gray-600">Manual attendance overrides</p>
                </Link>
                <Link href="/leave-management/shift-override" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Clock className="h-8 w-8 text-cyan-600 mb-2" />
                  <h4 className="font-medium">Shift Override</h4>
                  <p className="text-sm text-gray-600">Override shift schedules</p>
                </Link>
                <Link href="/leave-management/leave-recalculator" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Calculator className="h-8 w-8 text-pink-600 mb-2" />
                  <h4 className="font-medium">Leave Recalculator</h4>
                  <p className="text-sm text-gray-600">Recalculate leave balances</p>
                </Link>
              </div>
            </div>
          )}

          {activeTab === 'setup' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">System Setup</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link href="/leave-management/holiday-list" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Calendar className="h-8 w-8 text-blue-600 mb-2" />
                  <h4 className="font-medium">Holiday List</h4>
                  <p className="text-sm text-gray-600">Configure company holidays</p>
                </Link>
                <Link href="/leave-management/weekend-override" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Settings className="h-8 w-8 text-green-600 mb-2" />
                  <h4 className="font-medium">Weekend Override</h4>
                  <p className="text-sm text-gray-600">Configure weekend policies</p>
                </Link>
                <Link href="/leave-management/swipe-management" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <UserCheck className="h-8 w-8 text-purple-600 mb-2" />
                  <h4 className="font-medium">Swipe Management</h4>
                  <p className="text-sm text-gray-600">Manage swipe devices</p>
                </Link>
                <Link href="/leave-management/shift-rotation-calendar" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <RotateCcw className="h-8 w-8 text-orange-600 mb-2" />
                  <h4 className="font-medium">Shift Rotation Calendar</h4>
                  <p className="text-sm text-gray-600">Configure shift rotations</p>
                </Link>
                <Link href="/leave-management/employee-week-days" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Users className="h-8 w-8 text-indigo-600 mb-2" />
                  <h4 className="font-medium">Employee Week Days</h4>
                  <p className="text-sm text-gray-600">Set employee working days</p>
                </Link>
                <Link href="/leave-management/leave-type-reviewer" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <FileText className="h-8 w-8 text-red-600 mb-2" />
                  <h4 className="font-medium">Leave Type Reviewer</h4>
                  <p className="text-sm text-gray-600">Configure leave type approvals</p>
                </Link>
                <Link href="/leave-management/ip-address-mapping" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Globe className="h-8 w-8 text-gray-600 mb-2" />
                  <h4 className="font-medium">IP Address Mapping</h4>
                  <p className="text-sm text-gray-600">Configure IP-based access</p>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 
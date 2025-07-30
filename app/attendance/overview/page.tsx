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
  PieChart,
  LineChart,
  BarChart
} from 'lucide-react'
import { PieChart as RechartsPieChart, Pie, Cell, LineChart as RechartsLineChart, Line, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function AttendanceOverviewPage() {
  const { user } = useAuth()
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedDepartment, setSelectedDepartment] = useState('all')

  // Mock data for attendance analytics
  const attendanceData = {
    totalEmployees: 200,
    presentToday: 142,
    absentToday: 15,
    lateToday: 12,
    wfhToday: 23,
    onLeaveToday: 8
  }

  const weeklyTrendData = [
    { day: 'Mon', present: 185, absent: 15, late: 8 },
    { day: 'Tue', present: 190, absent: 10, late: 5 },
    { day: 'Wed', present: 188, absent: 12, late: 7 },
    { day: 'Thu', present: 192, absent: 8, late: 4 },
    { day: 'Fri', present: 180, absent: 20, late: 10 },
    { day: 'Sat', present: 95, absent: 105, late: 2 },
    { day: 'Sun', present: 45, absent: 155, late: 1 }
  ]

  const departmentAttendance = [
    { department: 'Engineering', present: 45, absent: 5, late: 3 },
    { department: 'Marketing', present: 28, absent: 2, late: 1 },
    { department: 'Sales', present: 35, absent: 3, late: 2 },
    { department: 'HR', present: 12, absent: 1, late: 0 },
    { department: 'Finance', present: 22, absent: 4, late: 1 }
  ]

  const pieChartData = [
    { name: 'Present', value: 142, color: '#10B981' },
    { name: 'WFH', value: 23, color: '#8B5CF6' },
    { name: 'Late', value: 12, color: '#F59E0B' },
    { name: 'Absent', value: 15, color: '#EF4444' },
    { name: 'On Leave', value: 8, color: '#6B7280' }
  ]

  const recentActivities = [
    {
      id: 1,
      employeeName: 'John Smith',
      action: 'Check In',
      time: '09:15 AM',
      location: 'Main Gate',
      status: 'On Time'
    },
    {
      id: 2,
      employeeName: 'Emily Davis',
      action: 'Check In',
      time: '09:00 AM',
      location: 'Remote',
      status: 'WFH'
    },
    {
      id: 3,
      employeeName: 'Mike Wilson',
      action: 'Check In',
      time: '09:45 AM',
      location: 'Main Gate',
      status: 'Late'
    },
    {
      id: 4,
      employeeName: 'Sarah Johnson',
      action: 'Check Out',
      time: '06:30 PM',
      location: 'Main Gate',
      status: 'Normal'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/attendance" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Attendance Overview</h1>
            <p className="text-gray-600">Comprehensive attendance analytics and insights</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <label className="block text-sm font-medium text-gray-700 mb-1">View</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">{attendanceData.totalEmployees}</p>
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
              <p className="text-2xl font-bold text-green-600">{attendanceData.presentToday}</p>
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
              <p className="text-2xl font-bold text-purple-600">{attendanceData.wfhToday}</p>
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
              <p className="text-sm text-gray-600">Late Arrivals</p>
              <p className="text-2xl font-bold text-yellow-600">{attendanceData.lateToday}</p>
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
              <p className="text-sm text-gray-600">Absent</p>
              <p className="text-2xl font-bold text-red-600">{attendanceData.absentToday}</p>
            </div>
            <UserX className="h-8 w-8 text-red-600" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-gray-500">7.5% absent</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">On Leave</p>
              <p className="text-2xl font-bold text-gray-600">{attendanceData.onLeaveToday}</p>
            </div>
            <Calendar className="h-8 w-8 text-gray-600" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-gray-500">4% on leave</span>
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
              <RechartsPieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Trend */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Attendance Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={weeklyTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="present" stroke="#10B981" strokeWidth={2} />
                <Line type="monotone" dataKey="absent" stroke="#EF4444" strokeWidth={2} />
                <Line type="monotone" dataKey="late" stroke="#F59E0B" strokeWidth={2} />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Department-wise Attendance */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Department-wise Attendance</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={departmentAttendance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="present" fill="#10B981" />
              <Bar dataKey="absent" fill="#EF4444" />
              <Bar dataKey="late" fill="#F59E0B" />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{activity.employeeName}</div>
                    <div className="text-sm text-gray-500">{activity.action} • {activity.location}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{activity.time}</div>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    activity.status === 'On Time' ? 'bg-green-100 text-green-800' :
                    activity.status === 'Late' ? 'bg-yellow-100 text-yellow-800' :
                    activity.status === 'WFH' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {activity.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link href="/attendance/daily" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="flex items-center">
              <Calendar className="h-6 w-6 text-blue-600 mr-3" />
              <div>
                <div className="font-medium text-gray-900">Daily Attendance</div>
                <div className="text-sm text-gray-500">View today's attendance</div>
              </div>
            </div>
          </Link>
          <Link href="/attendance/time-tracking" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="flex items-center">
              <Clock className="h-6 w-6 text-green-600 mr-3" />
              <div>
                <div className="font-medium text-gray-900">Time Tracking</div>
                <div className="text-sm text-gray-500">Monitor work hours</div>
              </div>
            </div>
          </Link>
          <Link href="/attendance/overtime" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="flex items-center">
              <Activity className="h-6 w-6 text-purple-600 mr-3" />
              <div>
                <div className="font-medium text-gray-900">Overtime</div>
                <div className="text-sm text-gray-500">Manage overtime</div>
              </div>
            </div>
          </Link>
          <Link href="/attendance/reports" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="flex items-center">
              <BarChart3 className="h-6 w-6 text-orange-600 mr-3" />
              <div>
                <div className="font-medium text-gray-900">Reports</div>
                <div className="text-sm text-gray-500">Generate reports</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
} 
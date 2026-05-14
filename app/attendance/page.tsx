'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import Link from 'next/link'
import {
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
  BarChart,
  RefreshCw,
  Target as TargetIcon,
  Timer,
  Calendar as CalendarIcon,
  Settings as SettingsIcon,
  Shield as ShieldIcon,
  MapPin as MapPinIcon,
  Clock as ClockIcon
} from 'lucide-react'
import { PieChart as RechartsPieChart, Pie, Cell, LineChart as RechartsLineChart, Line, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function AttendancePage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')

  // Dynamic data for attendance analytics
  const [attendanceData, setAttendanceData] = useState({
    totalEmployees: 0,
    presentToday: 0,
    absentToday: 0,
    lateToday: 0,
    wfhToday: 0,
    onLeaveToday: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await fetch('/api/dashboard/stats')
        if (res.ok) {
          const data = await res.json()
          setAttendanceData({
            totalEmployees: data.data.totalEmployees || 0,
            presentToday: data.data.todayAttendance || 0,
            absentToday: (data.data.totalEmployees || 0) - (data.data.todayAttendance || 0) - (data.data.pendingLeaves || 0),
            lateToday: 0, // Currently no field for this
            wfhToday: 0, // Currently no field for this
            onLeaveToday: data.data.pendingLeaves || 0
          })
        }
      } catch (error) {
        console.error('Failed to fetch attendance data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchAttendance()
  }, [])

  const weeklyTrendData = [
    { day: 'Mon', present: 185, absent: 15, late: 8 },
    { day: 'Tue', present: 190, absent: 10, late: 5 },
    { day: 'Wed', present: 188, absent: 12, late: 7 },
    { day: 'Thu', present: 192, absent: 8, late: 4 },
    { day: 'Fri', present: 180, absent: 20, late: 10 },
    { day: 'Sat', present: 95, absent: 105, late: 2 },
    { day: 'Sun', present: 45, absent: 155, late: 1 }
  ]

  const pieChartData = [
    { name: 'Present', value: 142, color: '#10B981' },
    { name: 'WFH', value: 23, color: '#8B5CF6' },
    { name: 'Late', value: 12, color: '#F59E0B' },
    { name: 'Absent', value: 15, color: '#EF4444' },
    { name: 'On Leave', value: 8, color: '#6B7280' }
  ]

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'daily', name: 'Daily Attendance', icon: Calendar },
    { id: 'monthly', name: 'Monthly Report', icon: CalendarDays },
    { id: 'time-tracking', name: 'Time Tracking', icon: Timer },
    { id: 'overtime', name: 'Overtime Management', icon: Clock },
    { id: 'rules', name: 'Attendance Rules', icon: ShieldIcon },
    { id: 'shifts', name: 'Shift Management', icon: ClockIcon },
    { id: 'geofencing', name: 'Geofencing', icon: MapPinIcon }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Employees</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {loading ? '...' : attendanceData.totalEmployees}
                    </p>
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
                    <p className="text-2xl font-bold text-green-600">
                      {loading ? '...' : attendanceData.presentToday}
                    </p>
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
                    <p className="text-2xl font-bold text-purple-600">
                      {loading ? '...' : attendanceData.wfhToday}
                    </p>
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
                    <p className="text-2xl font-bold text-yellow-600">
                      {loading ? '...' : attendanceData.lateToday}
                    </p>
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
                    <p className="text-2xl font-bold text-red-600">
                      {loading ? '...' : attendanceData.absentToday}
                    </p>
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
                    <p className="text-2xl font-bold text-gray-600">
                      {loading ? '...' : attendanceData.onLeaveToday}
                    </p>
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
          </div>
        )
      case 'daily':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Attendance Records</h3>
              <p className="text-gray-600">View and manage daily attendance records for all employees.</p>
              <div className="mt-4">
                <Link href="/attendance/daily" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  View Daily Attendance
                </Link>
              </div>
            </div>
          </div>
        )
      case 'monthly':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Attendance Report</h3>
              <p className="text-gray-600">Generate and view monthly attendance reports with detailed analytics.</p>
              <div className="mt-4">
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                  Generate Monthly Report
                </button>
              </div>
            </div>
          </div>
        )
      case 'time-tracking':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Time Tracking</h3>
              <p className="text-gray-600">Monitor employee work hours, breaks, and time tracking data.</p>
              <div className="mt-4">
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                  View Time Tracking
                </button>
              </div>
            </div>
          </div>
        )
      case 'overtime':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Overtime Management</h3>
              <p className="text-gray-600">Manage and approve overtime requests and track overtime hours.</p>
              <div className="mt-4">
                <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700">
                  Manage Overtime
                </button>
              </div>
            </div>
          </div>
        )
      case 'rules':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Rules</h3>
              <p className="text-gray-600">Configure attendance policies, working hours, and rules.</p>
              <div className="mt-4">
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                  Configure Rules
                </button>
              </div>
            </div>
          </div>
        )
      case 'shifts':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Shift Management</h3>
              <p className="text-gray-600">Manage employee shifts, schedules, and shift rotations.</p>
              <div className="mt-4">
                <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">
                  Manage Shifts
                </button>
              </div>
            </div>
          </div>
        )
      case 'geofencing':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Geofencing</h3>
              <p className="text-gray-600">Set up location-based attendance tracking and geofencing rules.</p>
              <div className="mt-4">
                <button className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700">
                  Configure Geofencing
                </button>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance Management</h1>
          <p className="text-gray-600">Comprehensive attendance tracking and management system</p>
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

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  )
} 
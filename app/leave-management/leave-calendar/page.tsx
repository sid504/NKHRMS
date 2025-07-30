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
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

export default function LeaveCalendarPage() {
  const { user } = useAuth()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  // Mock data for leave calendar
  const leaveEvents = [
    {
      id: 1,
      employeeName: 'John Smith',
      employeeId: 'EMP001',
      department: 'Engineering',
      leaveType: 'Annual Leave',
      startDate: '2024-01-15',
      endDate: '2024-01-19',
      status: 'Approved',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      employeeName: 'Emily Davis',
      employeeId: 'EMP002',
      department: 'Marketing',
      leaveType: 'Sick Leave',
      startDate: '2024-01-20',
      endDate: '2024-01-22',
      status: 'Approved',
      color: 'bg-red-500'
    },
    {
      id: 3,
      employeeName: 'Mike Wilson',
      employeeId: 'EMP003',
      department: 'Sales',
      leaveType: 'Maternity Leave',
      startDate: '2024-02-01',
      endDate: '2024-05-01',
      status: 'Approved',
      color: 'bg-purple-500'
    },
    {
      id: 4,
      employeeName: 'Sarah Johnson',
      employeeId: 'EMP004',
      department: 'HR',
      leaveType: 'Personal Leave',
      startDate: '2024-01-25',
      endDate: '2024-01-26',
      status: 'Pending',
      color: 'bg-yellow-500'
    }
  ]

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const getMonthName = (month: number) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
    return months[month]
  }

  const getLeaveEventsForDate = (date: number) => {
    const currentDateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`
    return leaveEvents.filter(event => {
      const eventStart = new Date(event.startDate)
      const eventEnd = new Date(event.endDate)
      const currentDate = new Date(currentDateStr)
      return currentDate >= eventStart && currentDate <= eventEnd
    })
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth)
    const firstDay = getFirstDayOfMonth(selectedYear, selectedMonth)
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 bg-gray-50"></div>)
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const eventsForDay = getLeaveEventsForDate(day)
      const isToday = day === new Date().getDate() && selectedMonth === new Date().getMonth() && selectedYear === new Date().getFullYear()
      
      days.push(
        <div key={day} className={`h-24 border border-gray-200 p-1 ${isToday ? 'bg-blue-50' : 'bg-white'}`}>
          <div className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
            {day}
          </div>
          <div className="space-y-1 mt-1">
            {eventsForDay.map(event => (
              <div
                key={event.id}
                className={`text-xs p-1 rounded ${event.color} text-white truncate cursor-pointer hover:opacity-80`}
                title={`${event.employeeName} - ${event.leaveType}`}
              >
                {event.employeeName.split(' ')[0]} - {event.leaveType}
              </div>
            ))}
          </div>
        </div>
      )
    }

    return days
  }

  const goToPreviousMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11)
      setSelectedYear(selectedYear - 1)
    } else {
      setSelectedMonth(selectedMonth - 1)
    }
  }

  const goToNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0)
      setSelectedYear(selectedYear + 1)
    } else {
      setSelectedMonth(selectedMonth + 1)
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
            <h1 className="text-2xl font-bold text-gray-900">Leave Calendar</h1>
            <p className="text-gray-600">Visual calendar view of all employee leave schedules</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add Leave Event
          </button>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export Calendar
          </button>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={goToPreviousMonth}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h2 className="text-xl font-semibold text-gray-900">
            {getMonthName(selectedMonth)} {selectedYear}
          </h2>
          <button
            onClick={goToNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {/* Day headers */}
          <div className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-900">Sun</div>
          <div className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-900">Mon</div>
          <div className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-900">Tue</div>
          <div className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-900">Wed</div>
          <div className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-900">Thu</div>
          <div className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-900">Fri</div>
          <div className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-900">Sat</div>

          {/* Calendar days */}
          {renderCalendar()}
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave Type Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-700">Annual Leave</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-sm text-gray-700">Sick Leave</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-purple-500 rounded"></div>
            <span className="text-sm text-gray-700">Maternity Leave</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span className="text-sm text-gray-700">Personal Leave</span>
          </div>
        </div>
      </div>

      {/* Upcoming Leaves */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Leave Events</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {leaveEvents
              .filter(event => new Date(event.startDate) > new Date())
              .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
              .slice(0, 5)
              .map(event => (
                <div key={event.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 ${event.color} rounded-full`}></div>
                    <div>
                      <div className="font-medium text-gray-900">{event.employeeName}</div>
                      <div className="text-sm text-gray-500">{event.department} • {event.leaveType}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {Math.ceil((new Date(event.endDate).getTime() - new Date(event.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
} 
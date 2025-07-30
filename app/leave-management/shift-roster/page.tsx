'use client'

import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import Link from 'next/link'
import {
  ArrowLeft,
  Calendar,
  Clock,
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
  AlertTriangle,
  CalendarDays,
  FileText,
  Briefcase,
  Building,
  Users,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Sun,
  Moon,
  RotateCcw,
  Settings,
  MapPin
} from 'lucide-react'

export default function ShiftRosterPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedShift, setSelectedShift] = useState('all')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  // Mock data for shift roster
  const shiftRoster = [
    {
      id: 1,
      employeeName: 'John Smith',
      employeeId: 'EMP001',
      department: 'Engineering',
      shiftType: 'Day Shift',
      startTime: '09:00 AM',
      endTime: '06:00 PM',
      breakTime: '01:00 PM - 02:00 PM',
      location: 'Office',
      status: 'Active',
      assignedDate: '2024-01-20',
      manager: 'Sarah Johnson'
    },
    {
      id: 2,
      employeeName: 'Emily Davis',
      employeeId: 'EMP002',
      department: 'Marketing',
      shiftType: 'Flexible',
      startTime: '10:00 AM',
      endTime: '07:00 PM',
      breakTime: '01:30 PM - 02:30 PM',
      location: 'Hybrid',
      status: 'Active',
      assignedDate: '2024-01-20',
      manager: 'Mike Wilson'
    },
    {
      id: 3,
      employeeName: 'Mike Wilson',
      employeeId: 'EMP003',
      department: 'Sales',
      shiftType: 'Night Shift',
      startTime: '06:00 PM',
      endTime: '03:00 AM',
      breakTime: '10:00 PM - 11:00 PM',
      location: 'Office',
      status: 'Active',
      assignedDate: '2024-01-20',
      manager: 'David Brown'
    },
    {
      id: 4,
      employeeName: 'Sarah Johnson',
      employeeId: 'EMP004',
      department: 'HR',
      shiftType: 'Day Shift',
      startTime: '08:30 AM',
      endTime: '05:30 PM',
      breakTime: '12:30 PM - 01:30 PM',
      location: 'Office',
      status: 'On Leave',
      assignedDate: '2024-01-20',
      manager: 'John Manager'
    }
  ]

  const shiftTypes = [
    { name: 'Day Shift', icon: Sun, color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
    { name: 'Night Shift', icon: Moon, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { name: 'Flexible', icon: RotateCcw, color: 'text-green-600', bgColor: 'bg-green-50' },
    { name: 'Part-time', icon: Clock, color: 'text-purple-600', bgColor: 'bg-purple-50' }
  ]

  const getShiftTypeInfo = (shiftType: string) => {
    return shiftTypes.find(shift => shift.name === shiftType) || shiftTypes[0]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-50'
      case 'On Leave': return 'text-red-600 bg-red-50'
      case 'Sick': return 'text-orange-600 bg-orange-50'
      default: return 'text-gray-600 bg-gray-50'
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
            <h1 className="text-2xl font-bold text-gray-900">Shift Roster Management</h1>
            <p className="text-gray-600">Manage employee work schedules, shifts, and roster assignments</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Create Roster
          </button>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export Roster
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Shift Type</label>
            <select
              value={selectedShift}
              onChange={(e) => setSelectedShift(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Shifts</option>
              <option value="day">Day Shift</option>
              <option value="night">Night Shift</option>
              <option value="flexible">Flexible</option>
              <option value="part-time">Part-time</option>
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
            <span className="text-gray-500">Scheduled today</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Day Shift</p>
              <p className="text-2xl font-bold text-yellow-600">142</p>
            </div>
            <Sun className="h-8 w-8 text-yellow-600" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-gray-500">71% of workforce</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Night Shift</p>
              <p className="text-2xl font-bold text-blue-600">35</p>
            </div>
            <Moon className="h-8 w-8 text-blue-600" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-gray-500">17.5% of workforce</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">On Leave</p>
              <p className="text-2xl font-bold text-red-600">23</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-gray-500">11.5% unavailable</span>
          </div>
        </div>
      </div>

      {/* Shift Roster Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Employee Shift Roster</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shift Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Break Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manager</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {shiftRoster.map((roster) => {
                const shiftInfo = getShiftTypeInfo(roster.shiftType)
                const ShiftIcon = shiftInfo.icon
                return (
                  <tr key={roster.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">
                            {roster.employeeName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{roster.employeeName}</div>
                          <div className="text-sm text-gray-500">{roster.employeeId} • {roster.department}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${shiftInfo.bgColor} ${shiftInfo.color}`}>
                        <ShiftIcon className="h-3 w-3 mr-1" />
                        {roster.shiftType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{roster.startTime} - {roster.endTime}</div>
                      <div className="text-sm text-gray-500">{new Date(roster.assignedDate).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {roster.breakTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-900">{roster.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(roster.status)}`}>
                        {roster.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {roster.manager}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-900" title="View Details">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900" title="Edit Roster">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900" title="Delete">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Shift Type Legend */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Shift Type Legend</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {shiftTypes.map((shift) => {
            const ShiftIcon = shift.icon
            return (
              <div key={shift.name} className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${shift.bgColor} ${shift.color}`}>
                  <ShiftIcon className="h-3 w-3 mr-1" />
                  {shift.name}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
} 
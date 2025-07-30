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
  Star,
  Flag,
  Gift,
  Heart
} from 'lucide-react'

export default function HolidayListPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedYear, setSelectedYear] = useState('2024')
  const [selectedType, setSelectedType] = useState('all')

  // Mock data for holiday list
  const holidays = [
    {
      id: 1,
      name: 'New Year\'s Day',
      date: '2024-01-01',
      type: 'Public Holiday',
      description: 'Celebration of the new year',
      isOptional: false,
      isObserved: true,
      observedDate: '2024-01-01',
      country: 'All',
      region: 'Global',
      icon: Star
    },
    {
      id: 2,
      name: 'Republic Day',
      date: '2024-01-26',
      type: 'National Holiday',
      description: 'Celebration of India\'s Republic Day',
      isOptional: false,
      isObserved: true,
      observedDate: '2024-01-26',
      country: 'India',
      region: 'National',
      icon: Flag
    },
    {
      id: 3,
      name: 'Valentine\'s Day',
      date: '2024-02-14',
      type: 'Optional Holiday',
      description: 'Day of love and romance',
      isOptional: true,
      isObserved: false,
      observedDate: '2024-02-14',
      country: 'All',
      region: 'Global',
      icon: Heart
    },
    {
      id: 4,
      name: 'Holi',
      date: '2024-03-25',
      type: 'Public Holiday',
      description: 'Festival of colors',
      isOptional: false,
      isObserved: true,
      observedDate: '2024-03-25',
      country: 'India',
      region: 'National',
      icon: Gift
    },
    {
      id: 5,
      name: 'Good Friday',
      date: '2024-03-29',
      type: 'Public Holiday',
      description: 'Christian religious holiday',
      isOptional: false,
      isObserved: true,
      observedDate: '2024-03-29',
      country: 'All',
      region: 'Global',
      icon: Calendar
    },
    {
      id: 6,
      name: 'Independence Day',
      date: '2024-08-15',
      type: 'National Holiday',
      description: 'India\'s Independence Day',
      isOptional: false,
      isObserved: true,
      observedDate: '2024-08-15',
      country: 'India',
      region: 'National',
      icon: Flag
    },
    {
      id: 7,
      name: 'Christmas Day',
      date: '2024-12-25',
      type: 'Public Holiday',
      description: 'Celebration of Christmas',
      isOptional: false,
      isObserved: true,
      observedDate: '2024-12-25',
      country: 'All',
      region: 'Global',
      icon: Gift
    }
  ]

  const holidayTypes = [
    { name: 'Public Holiday', color: 'text-red-600', bgColor: 'bg-red-50' },
    { name: 'National Holiday', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { name: 'Optional Holiday', color: 'text-green-600', bgColor: 'bg-green-50' },
    { name: 'Company Holiday', color: 'text-purple-600', bgColor: 'bg-purple-50' }
  ]

  const getHolidayTypeInfo = (type: string) => {
    return holidayTypes.find(holidayType => holidayType.name === type) || holidayTypes[0]
  }

  const getMonthName = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'long' })
  }

  const isUpcoming = (dateString: string) => {
    const holidayDate = new Date(dateString)
    const today = new Date()
    return holidayDate > today
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
            <h1 className="text-2xl font-bold text-gray-900">Holiday List Management</h1>
            <p className="text-gray-600">Manage company holidays, public holidays, and optional holidays</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add Holiday
          </button>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export Calendar
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search Holiday</label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by holiday name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Holiday Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="public">Public Holiday</option>
              <option value="national">National Holiday</option>
              <option value="optional">Optional Holiday</option>
              <option value="company">Company Holiday</option>
            </select>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Holidays</p>
              <p className="text-2xl font-bold text-gray-900">15</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-gray-500">In {selectedYear}</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Public Holidays</p>
              <p className="text-2xl font-bold text-red-600">8</p>
            </div>
            <Flag className="h-8 w-8 text-red-600" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-gray-500">Mandatory holidays</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Optional Holidays</p>
              <p className="text-2xl font-bold text-green-600">4</p>
            </div>
            <Star className="h-8 w-8 text-green-600" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-gray-500">Employee choice</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Upcoming</p>
              <p className="text-2xl font-bold text-purple-600">3</p>
            </div>
            <Clock className="h-8 w-8 text-purple-600" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-gray-500">Next 30 days</span>
          </div>
        </div>
      </div>

      {/* Holiday List Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Holiday Calendar {selectedYear}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Holiday</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {holidays.map((holiday) => {
                const HolidayIcon = holiday.icon
                const holidayTypeInfo = getHolidayTypeInfo(holiday.type)
                const upcoming = isUpcoming(holiday.date)
                return (
                  <tr key={holiday.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <HolidayIcon className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{holiday.name}</div>
                          <div className="text-sm text-gray-500">{holiday.country}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{new Date(holiday.date).toLocaleDateString()}</div>
                      <div className="text-sm text-gray-500">{getMonthName(holiday.date)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${holidayTypeInfo.bgColor} ${holidayTypeInfo.color}`}>
                        {holiday.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{holiday.description}</div>
                      {holiday.isOptional && (
                        <div className="text-xs text-green-600">Optional for employees</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {upcoming ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-600">
                          <Clock className="h-3 w-3 mr-1" />
                          Upcoming
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-50 text-gray-600">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Passed
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{holiday.region}</div>
                      <div className="text-sm text-gray-500">{holiday.country}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-900" title="View Details">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900" title="Edit Holiday">
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

      {/* Holiday Type Legend */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Holiday Type Legend</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {holidayTypes.map((type) => (
            <div key={type.name} className="flex items-center space-x-2">
              <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${type.bgColor} ${type.color}`}>
                {type.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Holiday Guidelines */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Holiday Management Guidelines</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="text-sm font-medium text-gray-900 mb-2">Holiday Types</h5>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><strong>Public Holiday:</strong> Government declared holidays, mandatory for all</li>
              <li><strong>National Holiday:</strong> Country-specific important days</li>
              <li><strong>Optional Holiday:</strong> Employees can choose to take or work</li>
              <li><strong>Company Holiday:</strong> Organization-specific holidays</li>
            </ul>
          </div>
          <div>
            <h5 className="text-sm font-medium text-gray-900 mb-2">Management Rules</h5>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Public holidays are automatically applied to all employees</li>
              <li>• Optional holidays require employee consent</li>
              <li>• Company holidays can be department-specific</li>
              <li>• Holiday calendar is published annually</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 
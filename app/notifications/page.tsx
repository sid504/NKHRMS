'use client'

import { useState } from 'react'
import { 
  Bell,
  Check,
  X,
  Filter,
  Search,
  Clock,
  AlertCircle,
  CheckCircle,
  Info,
  Star,
  Trash2,
  Archive,
  Settings,
  Mail,
  Calendar,
  User,
  DollarSign,
  TrendingUp
} from 'lucide-react'

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: 'Leave Request Approved',
      message: 'Your leave request for January 15-19 has been approved by Sarah Wilson.',
      type: 'success',
      category: 'Leave',
      timestamp: '2024-01-15T10:30:00Z',
      isRead: false,
      isStarred: false,
      priority: 'normal',
      sender: 'Sarah Wilson',
      action: 'view-details'
    },
    {
      id: 2,
      title: 'Performance Review Due',
      message: 'Your annual performance review is due in 5 days. Please complete it by January 20.',
      type: 'warning',
      category: 'Performance',
      timestamp: '2024-01-15T09:15:00Z',
      isRead: false,
      isStarred: true,
      priority: 'high',
      sender: 'System',
      action: 'complete-review'
    },
    {
      id: 3,
      title: 'Payroll Processed',
      message: 'Your payroll for January has been processed. You will receive payment on January 31.',
      type: 'info',
      category: 'Payroll',
      timestamp: '2024-01-15T08:45:00Z',
      isRead: true,
      isStarred: false,
      priority: 'normal',
      sender: 'Finance Team',
      action: 'view-payslip'
    },
    {
      id: 4,
      title: 'Training Session Reminder',
      message: 'Reminder: Leadership training session starts in 30 minutes. Please join the meeting.',
      type: 'info',
      category: 'Training',
      timestamp: '2024-01-15T08:00:00Z',
      isRead: true,
      isStarred: false,
      priority: 'normal',
      sender: 'Training Team',
      action: 'join-meeting'
    },
    {
      id: 5,
      title: 'System Maintenance',
      message: 'Scheduled system maintenance will occur tonight from 10 PM to 2 AM. Some features may be unavailable.',
      type: 'warning',
      category: 'System',
      timestamp: '2024-01-15T07:30:00Z',
      isRead: true,
      isStarred: false,
      priority: 'normal',
      sender: 'IT Team',
      action: 'view-details'
    },
    {
      id: 6,
      title: 'New Employee Welcome',
      message: 'Welcome to the team! Please complete your onboarding tasks within the next 7 days.',
      type: 'success',
      category: 'Onboarding',
      timestamp: '2024-01-14T16:20:00Z',
      isRead: true,
      isStarred: false,
      priority: 'normal',
      sender: 'HR Team',
      action: 'start-onboarding'
    },
    {
      id: 7,
      title: 'Benefits Enrollment Deadline',
      message: 'Benefits enrollment period ends in 3 days. Please review and update your selections.',
      type: 'warning',
      category: 'Benefits',
      timestamp: '2024-01-14T14:15:00Z',
      isRead: false,
      isStarred: true,
      priority: 'high',
      sender: 'Benefits Team',
      action: 'enroll-benefits'
    },
    {
      id: 8,
      title: 'Attendance Alert',
      message: 'You have been marked as late for 3 consecutive days. Please review your schedule.',
      type: 'error',
      category: 'Attendance',
      timestamp: '2024-01-14T12:00:00Z',
      isRead: false,
      isStarred: false,
      priority: 'high',
      sender: 'HR Team',
      action: 'view-attendance'
    }
  ]

  const categories = ['all', 'Leave', 'Performance', 'Payroll', 'Training', 'System', 'Onboarding', 'Benefits', 'Attendance']

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedType === 'all' || notification.category === selectedType
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'unread' && !notification.isRead) ||
                      (activeTab === 'starred' && notification.isStarred) ||
                      (activeTab === 'high-priority' && notification.priority === 'high')
    return matchesSearch && matchesCategory && matchesTab
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-800'
      case 'warning':
        return 'bg-yellow-100 text-yellow-800'
      case 'error':
        return 'bg-red-100 text-red-800'
      case 'info':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'normal':
        return 'bg-gray-100 text-gray-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) {
      return 'Just now'
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  const markAsRead = (id: number) => {
    // Handle mark as read
    console.log('Mark as read:', id)
  }

  const toggleStar = (id: number) => {
    // Handle toggle star
    console.log('Toggle star:', id)
  }

  const deleteNotification = (id: number) => {
    // Handle delete notification
    console.log('Delete notification:', id)
  }

  const getUnreadCount = () => notifications.filter(n => !n.isRead).length
  const getStarredCount = () => notifications.filter(n => n.isStarred).length
  const getHighPriorityCount = () => notifications.filter(n => n.priority === 'high').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-sm text-gray-600">Manage your notifications and alerts</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center">
            <Archive className="h-4 w-4 mr-2" />
            Mark All Read
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </button>
        </div>
      </div>

      {/* Notification Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-500 text-white">
              <Bell className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Notifications</p>
              <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-red-500 text-white">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Unread</p>
              <p className="text-2xl font-bold text-gray-900">{getUnreadCount()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-yellow-500 text-white">
              <Star className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Starred</p>
              <p className="text-2xl font-bold text-gray-900">{getStarredCount()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-orange-500 text-white">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">High Priority</p>
              <p className="text-2xl font-bold text-gray-900">{getHighPriorityCount()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Filter className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('all')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'all'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Bell className="h-4 w-4 mr-2" />
              All
            </button>
            <button
              onClick={() => setActiveTab('unread')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'unread'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <AlertCircle className="h-4 w-4 mr-2" />
              Unread ({getUnreadCount()})
            </button>
            <button
              onClick={() => setActiveTab('starred')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'starred'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Star className="h-4 w-4 mr-2" />
              Starred ({getStarredCount()})
            </button>
            <button
              onClick={() => setActiveTab('high-priority')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'high-priority'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              High Priority ({getHighPriorityCount()})
            </button>
          </nav>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-6 hover:bg-gray-50 transition-colors ${
                !notification.isRead ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {getTypeIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-sm font-medium text-gray-900">{notification.title}</h3>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(notification.type)}`}>
                          {notification.category}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(notification.priority)}`}>
                          {notification.priority}
                        </span>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatTimestamp(notification.timestamp)}
                        </span>
                        <span className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {notification.sender}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleStar(notification.id)}
                        className={`p-1 rounded ${
                          notification.isStarred ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                        }`}
                      >
                        <Star className="h-4 w-4" />
                      </button>
                      {!notification.isRead && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-1 text-gray-400 hover:text-green-600 rounded"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-1 text-gray-400 hover:text-red-600 rounded"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 
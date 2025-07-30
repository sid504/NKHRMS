'use client'

import { useState } from 'react'
import { 
  User,
  Calendar,
  Clock,
  DollarSign,
  FileText,
  Heart,
  GraduationCap,
  Bell,
  Settings,
  LogOut,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Clock as ClockIcon,
  Calendar as CalendarIcon,
  Award,
  BookOpen,
  Shield,
  Mail,
  Phone
} from 'lucide-react'

export default function EmployeePortalPage() {
  // Mock employee data
  const employee = {
    id: 'EMP001',
    name: 'John Doe',
    email: 'john.doe@nkhr.com',
    phone: '+1 (555) 123-4567',
    position: 'Senior Software Engineer',
    department: 'Engineering',
    manager: 'Sarah Wilson',
    hireDate: '2022-01-15',
    salary: '$85,000',
    avatar: null,
    role: 'employee',
    permissions: ['profile', 'attendance', 'leave', 'payroll', 'benefits', 'training', 'documents']
  }

  // Mock employee data
  const employeeData = {
    attendance: {
      present: 18,
      absent: 1,
      late: 2,
      totalDays: 20,
      thisMonth: 95
    },
    leave: {
      used: 12,
      remaining: 13,
      total: 25,
      pending: 1
    },
    payroll: {
      currentSalary: '$85,000',
      lastPayslip: 'January 2024',
      nextPayday: 'January 31, 2024',
      ytdEarnings: '$85,000'
    },
    performance: {
      rating: 4.5,
      lastReview: 'December 2023',
      nextReview: 'June 2024',
      goals: ['Complete React training', 'Lead 2 projects', 'Mentor junior developers']
    },
    benefits: {
      healthInsurance: 'Active',
      retirementPlan: '6% contribution',
      lifeInsurance: '2x salary',
      dentalPlan: 'Active'
    },
    training: {
      completed: 8,
      inProgress: 2,
      required: 3,
      certificates: ['React Advanced', 'Leadership Fundamentals']
    }
  }

  const quickActions = [
    {
      title: 'Request Leave',
      icon: Calendar,
      color: 'bg-blue-500',
      href: '/employee-portal/leave'
    },
    {
      title: 'View Payslip',
      icon: DollarSign,
      color: 'bg-green-500',
      href: '/employee-portal/payroll'
    },
    {
      title: 'Update Profile',
      icon: User,
      color: 'bg-purple-500',
      href: '/employee-portal/profile'
    },
    {
      title: 'Training Courses',
      icon: GraduationCap,
      color: 'bg-orange-500',
      href: '/employee-portal/training'
    }
  ]

  const recentActivities = [
    {
      id: 1,
      type: 'leave',
      title: 'Leave request approved',
      description: 'Your leave request for Jan 15-19 has been approved',
      timestamp: '2 hours ago',
      status: 'approved'
    },
    {
      id: 2,
      type: 'payroll',
      title: 'Payslip available',
      description: 'Your January 2024 payslip is now available',
      timestamp: '1 day ago',
      status: 'completed'
    },
    {
      id: 3,
      type: 'training',
      title: 'Training completed',
      description: 'You completed "React Advanced" training',
      timestamp: '3 days ago',
      status: 'completed'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
      case 'completed':
        return 'text-green-600'
      case 'pending':
        return 'text-yellow-600'
      case 'rejected':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Welcome back, {employee.name}!</h2>
            <p className="text-blue-100 mt-1">{employee.position} • {employee.department}</p>
            <p className="text-blue-100 text-sm mt-2">Employee ID: {employee.id}</p>
          </div>
          <div className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold">
              {employee.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <button
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col items-center space-y-2">
              <div className={`p-3 rounded-lg ${action.color} text-white`}>
                <action.icon className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium text-gray-900">{action.title}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-500 text-white">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Attendance</p>
              <p className="text-2xl font-bold text-gray-900">{employeeData.attendance.thisMonth}%</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-500 text-white">
              <Calendar className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Leave Remaining</p>
              <p className="text-2xl font-bold text-gray-900">{employeeData.leave.remaining} days</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-500 text-white">
              <Award className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Performance</p>
              <p className="text-2xl font-bold text-gray-900">{employeeData.performance.rating}/5.0</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-orange-500 text-white">
              <BookOpen className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Training</p>
              <p className="text-2xl font-bold text-gray-900">{employeeData.training.completed}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
                <p className="text-sm text-gray-600">{activity.description}</p>
              </div>
              <div className="text-right">
                <span className={`text-xs font-medium ${getStatusColor(activity.status)}`}>
                  {activity.status}
                </span>
                <p className="text-xs text-gray-500">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 
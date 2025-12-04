'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { 
  Users, 
  Calendar, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Briefcase,
  Bell,
  Search,
  Menu,
  X,
  Brain,
  Target,
  Award,
  Zap,
  BarChart3,
  TrendingDown,
  UserPlus,
  CheckCircle,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

const Charts = dynamic(() => import('./charts.client'), { ssr: false })

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Advanced analytics data
  const employeeGrowthData = useMemo(() => [
    { month: 'Jan', employees: 1200, target: 1250 },
    { month: 'Feb', employees: 1250, target: 1300 },
    { month: 'Mar', employees: 1280, target: 1350 },
    { month: 'Apr', employees: 1320, target: 1400 },
    { month: 'May', employees: 1350, target: 1450 },
    { month: 'Jun', employees: 1380, target: 1500 },
  ], [])

  const performanceData = useMemo(() => [
    { name: 'Excellent', value: 35, color: '#10B981' },
    { name: 'Good', value: 45, color: '#3B82F6' },
    { name: 'Average', value: 15, color: '#F59E0B' },
    { name: 'Needs Improvement', value: 5, color: '#EF4444' },
  ], [])

  const departmentData = useMemo(() => [
    { name: 'Engineering', employees: 450, budget: 8500000 },
    { name: 'Sales', employees: 320, budget: 5200000 },
    { name: 'Marketing', employees: 180, budget: 2800000 },
    { name: 'HR', employees: 85, budget: 1200000 },
    { name: 'Finance', employees: 95, budget: 1400000 },
    { name: 'Operations', employees: 104, budget: 1600000 },
  ], [])

  const aiInsights = useMemo(() => [
    {
      type: 'success',
      title: 'High Performance Alert',
      message: 'Sarah Wilson shows exceptional performance. Consider promotion.',
      icon: Award,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      type: 'warning',
      title: 'Attendance Trend',
      message: 'Engineering team shows 15% increase in late arrivals.',
      icon: AlertTriangle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      type: 'info',
      title: 'Recruitment Success',
      message: 'AI identified 3 high-potential candidates for Senior Developer role.',
      icon: Brain,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    }
  ], [])

  const stats = useMemo(() => [
    {
      title: 'Total Employees',
      value: '1,234',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      trend: 'up'
    },
    {
      title: 'AI-Powered Insights',
      value: '47',
      change: '+23%',
      changeType: 'positive',
      icon: Brain,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      trend: 'up'
    },
    {
      title: 'Active Projects',
      value: '89',
      change: '+8%',
      changeType: 'positive',
      icon: Briefcase,
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      trend: 'up'
    },
    {
      title: 'Revenue Growth',
      value: '$2.4M',
      change: '+18%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'bg-gradient-to-r from-orange-500 to-orange-600',
      trend: 'up'
    }
  ], [])

  const quickActions = useMemo(() => [
    {
      title: 'Add Employee',
      description: 'Create new employee profile',
      icon: UserPlus,
      color: 'bg-blue-500',
      href: '/employees/new'
    },
    {
      title: 'View Reports',
      description: 'Generate HR analytics',
      icon: BarChart3,
      color: 'bg-green-500',
      href: '/reports'
    },
    {
      title: 'AI Insights',
      description: 'Get AI-powered recommendations',
      icon: Brain,
      color: 'bg-purple-500',
      href: '/ai-insights'
    },
    {
      title: 'Quick Actions',
      description: 'Common HR tasks',
      icon: Zap,
      color: 'bg-orange-500',
      href: '/dashboard'
    }
  ], [])

  const recentActivities = [
    {
      id: 1,
      type: 'employee',
      title: 'New Employee Added',
      description: 'John Doe joined Engineering team',
      timestamp: '2 hours ago',
      status: 'completed'
    },
    {
      id: 2,
      type: 'leave',
      title: 'Leave Request Approved',
      description: 'Sarah Wilson\'s vacation request approved',
      timestamp: '4 hours ago',
      status: 'completed'
    },
    {
      id: 3,
      type: 'performance',
      title: 'Performance Review Due',
      description: 'Monthly reviews for 15 employees due',
      timestamp: '1 day ago',
      status: 'pending'
    },
    {
      id: 4,
      type: 'recruitment',
      title: 'New Job Posting',
      description: 'Senior Developer position posted',
      timestamp: '2 days ago',
      status: 'active'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600'
      case 'pending':
        return 'text-yellow-600'
      case 'active':
        return 'text-blue-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-600">Welcome to NKHR - AI-Powered HR Management</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <Brain className="h-4 w-4 mr-2" />
            AI Assistant
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">from last month</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section (code-split) */}
      <Charts employeeGrowthData={employeeGrowthData} performanceData={performanceData} />

      {/* AI Insights and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Insights */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Brain className="h-5 w-5 mr-2 text-purple-600" />
            AI-Powered Insights
          </h3>
          <div className="space-y-4">
            {aiInsights.map((insight, index) => (
              <div key={index} className={`p-4 rounded-lg ${insight.bgColor} border border-gray-200`}>
                <div className="flex items-start">
                  <div className={`p-2 rounded-lg ${insight.color} bg-white`}>
                    <insight.icon className="h-4 w-4" />
                  </div>
                  <div className="ml-3 flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{insight.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{insight.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className={`p-2 rounded-lg ${action.color} text-white`}>
                  <action.icon className="h-4 w-4" />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">{action.title}</h4>
                  <p className="text-xs text-gray-600">{action.description}</p>
                </div>
              </Link>
            ))}
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
                <CheckCircle className="h-4 w-4 text-blue-600" />
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
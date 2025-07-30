'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../contexts/AuthContext'
import { 
  User,
  Calendar,
  Clock,
  DollarSign,
  FileText,
  Heart,
  GraduationCap,
  Bell,
  LogOut,
  TrendingUp,
  Settings
} from 'lucide-react'

export default function EmployeePortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const router = useRouter()
  const { user, logout, isLoading } = useAuth()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login')
    }
  }, [user, isLoading, router])

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render if not authenticated
  if (!user) {
    return null
  }

  const employeeNavigation = [
    { id: 'dashboard', name: 'Dashboard', icon: TrendingUp, href: '/employee-portal' },
    { id: 'profile', name: 'Profile', icon: User, href: '/employee-portal/profile' },
    { id: 'attendance', name: 'Attendance', icon: Clock, href: '/employee-portal/attendance' },
    { id: 'leave', name: 'Leave', icon: Calendar, href: '/employee-portal/leave' },
    { id: 'payroll', name: 'Payroll', icon: DollarSign, href: '/employee-portal/payroll' },
    { id: 'benefits', name: 'Benefits', icon: Heart, href: '/employee-portal/benefits' },
    { id: 'training', name: 'Training', icon: GraduationCap, href: '/employee-portal/training' },
    { id: 'documents', name: 'Documents', icon: FileText, href: '/employee-portal/documents' },
  ]

  const handleLogout = () => {
    logout()
    setShowLogoutConfirm(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Employee Portal</h1>
              <p className="text-sm text-gray-600">Welcome, {user.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-600">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
              <Settings className="h-4 w-4" />
              <span className="text-sm">Settings</span>
            </button>
            <button 
              onClick={() => setShowLogoutConfirm(true)}
              className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
          <nav className="p-4 space-y-2">
            {employeeNavigation.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {children}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <LogOut className="h-6 w-6 text-red-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900">Confirm Logout</h3>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to logout? You will need to sign in again to access your portal.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 
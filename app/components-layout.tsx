'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from './contexts/AuthContext'
import LoadingSpinner from './components/LoadingSpinner'
import {
  TrendingUp,
  Users,
  Calendar,
  CalendarDays,
  Clock,
  DollarSign,
  Briefcase,
  Search,
  Bell,
  Menu,
  X,
  Settings,
  User,
  Brain,
  Target,
  BarChart3,
  GraduationCap,
  Heart,
  FileText,
  HelpCircle,
  Shield,
  LogOut
} from 'lucide-react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement | null>(null)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout, isLoading } = useAuth()

  // Check if we're on auth pages or employee portal
  const isAuthPage = pathname?.startsWith('/auth')
  const isEmployeePortal = pathname?.startsWith('/employee-portal')

  // Redirect to login if not authenticated (only for non-auth pages)
  useEffect(() => {
    if (!isAuthPage && !isEmployeePortal && !isLoading && !user) {
      router.push('/auth/login')
    }
  }, [user, isLoading, router, isAuthPage, isEmployeePortal])

  const navigation = useMemo((): Array<{ name: string; href: string; icon: any }> => {
    const base = [
      { name: 'Dashboard', href: '/dashboard', icon: TrendingUp },
      { name: 'Employees', href: '/employees', icon: Users },
      { name: 'User Management', href: '/user-management', icon: Shield },
    ]
    const leaveByRole = user?.role === 'admin'
      ? [
          { name: 'Leave Management', href: '/leave-management', icon: CalendarDays },
          { name: 'Leave Balances', href: '/leave-balances', icon: Calendar },
          { name: 'Team Leave Requests', href: '/leave-requests', icon: Calendar }
        ]
      : [
          { name: 'Leave Management', href: '/leave-management', icon: Calendar }
        ]
    const tail = [
      { name: 'Attendance', href: '/attendance', icon: Clock },
      { name: 'Payroll', href: '/payroll', icon: DollarSign },
      { name: 'Performance', href: '/performance', icon: Target },
      { name: 'Recruitment', href: '/recruitment', icon: Briefcase },
      { name: 'Training', href: '/training', icon: GraduationCap },
      { name: 'Benefits', href: '/benefits', icon: Heart },
      { name: 'Calendar', href: '/calendar', icon: Calendar },
      { name: 'Documents', href: '/documents', icon: FileText },
      { name: 'Reports', href: '/reports', icon: BarChart3 },
      { name: 'AI Insights', href: '/ai-insights', icon: Brain },
      { name: 'Notifications', href: '/notifications', icon: Bell },
      { name: 'Help & Support', href: '/help', icon: HelpCircle },
      { name: 'Settings', href: '/settings', icon: Settings },
    ]
    return [...base, ...leaveByRole, ...tail]
  }, [user?.role])

  const breadcrumbs = useMemo(() => {
    const path = pathname || ''
    const segments = path.split('/').filter(Boolean)
    return segments.map((segment, index) => ({
      name: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
      href: '/' + segments.slice(0, index + 1).join('/')
    }))
  }, [pathname])

  // If on auth pages or employee portal, don't show the admin layout
  if (isAuthPage || isEmployeePortal) {
    return <>{children}</>
  }

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    )
  }

  // Don't render if not authenticated
  if (!user) {
    return null
  }

  const handleLogout = () => {
    // Close modal first to avoid state update on unmounted component during route change
    setShowLogoutConfirm(false)
    logout()
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-white border-r border-gray-200">
            {/* Logo */}
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gradient-to-r from-blue-600 to-indigo-600">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <div className="ml-3">
                  <h1 className="text-xl font-bold text-white">NKHR</h1>
                  <p className="text-xs text-blue-100">AI-Powered HR Platform</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2 py-4 space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link prefetch={false}
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                        isActive
                          ? 'bg-blue-100 text-blue-700 border border-blue-200'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <item.icon
                        className={`mr-3 h-5 w-5 ${
                          isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                        }`}
                      />
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
            </div>

            {/* User Profile */}
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div className="flex items-center w-full">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-700">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.position}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <button className="flex-shrink-0 p-1 rounded-md text-gray-400 hover:text-gray-500">
                    <Settings className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => setShowLogoutConfirm(true)}
                    className="flex-shrink-0 p-1 rounded-md text-gray-400 hover:text-red-500 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

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
              Are you sure you want to logout? You will need to sign in again to access the system.
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

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Top navigation */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              {/* Breadcrumbs */}
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-4">
                  <li>
                    <div>
                      <Link prefetch={false} href="/dashboard" className="text-gray-400 hover:text-gray-500">
                        NKHR
                      </Link>
                    </div>
                  </li>
                  {breadcrumbs.map((breadcrumb, index) => (
                    <li key={breadcrumb.name}>
                      <div className="flex items-center">
                        <span className="text-gray-400 mx-2">/</span>
                        <Link prefetch={false}
                          href={breadcrumb.href}
                          className={`text-sm font-medium ${
                            index === breadcrumbs.length - 1
                              ? 'text-gray-900'
                              : 'text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          {breadcrumb.name}
                        </Link>
                      </div>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>

            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              {/* Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search anything..."
                  ref={searchInputRef}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-gray-500">
                <Bell className="h-6 w-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile dropdown */}
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="hidden md:block">
                  <div className="text-sm font-medium text-gray-700">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.position}</div>
                </div>
                <button 
                  onClick={() => setShowLogoutConfirm(true)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  Clock, 
  DollarSign, 
  Briefcase,
  Search,
  Bell,
  Menu,
  X,
  Settings,
  LogOut,
  User,
  BarChart3,
  Brain,
  Zap,
  Target,
  Award
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface LayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: TrendingUp },
  { name: 'Employees', href: '/employees', icon: Users },
  { name: 'Leave Management', href: '/leave-requests', icon: Calendar },
  { name: 'Attendance', href: '/attendance', icon: Clock },
  { name: 'Payroll', href: '/payroll', icon: DollarSign },
  { name: 'Performance', href: '/performance', icon: Target },
  { name: 'Recruitment', href: '/recruitment', icon: Briefcase },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'AI Insights', href: '/ai-insights', icon: Brain },
]

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="absolute inset-0 bg-gray-600 bg-opacity-75" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-2xl lg:translate-x-0 lg:static lg:inset-0 flex-shrink-0 border-r border-gray-200`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-600">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-white rounded-lg shadow-lg">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">NKHR</h1>
                <p className="text-xs text-blue-100">AI-Powered HR Platform</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white hover:text-blue-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                  }`}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${
                    isActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-500'
                  }`} />
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute right-2 w-2 h-2 bg-white rounded-full"
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">HR Manager</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="lg:pl-80 flex-1">
        {/* Top navigation */}
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700 mr-4"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              {/* Breadcrumb */}
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-4">
                  <li>
                    <div className="flex items-center">
                      <span className="text-gray-400">NKHR</span>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <span className="text-gray-400">/</span>
                      <span className="ml-4 text-sm font-medium text-gray-900 capitalize">
                        {pathname.split('/')[1] || 'Dashboard'}
                      </span>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:block relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Search anything..."
                  type="search"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* AI Assistant */}
              <button className="relative p-2 text-gray-400 hover:text-gray-600">
                <Brain className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              </button>

              {/* User menu */}
              <div className="flex items-center space-x-3">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-gray-900">John Doe</p>
                  <p className="text-xs text-gray-500">HR Manager</p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 
'use client'

import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Building,
  Shield,
  ArrowRight,
  AlertCircle,
  CheckCircle
} from 'lucide-react'

export default function LoginPage() {
  const [loginType, setLoginType] = useState('admin')
  const [email, setEmail] = useState('admin@nkhr.com')
  const [password, setPassword] = useState('admin123')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { login, isLoading } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!email || !password) {
      setError('Please enter valid credentials')
      return
    }

    console.log('Attempting login with:', { email, password, loginType })

    try {
      const success = await login(email, password, loginType)
      
      if (!success) {
        setError('Invalid credentials. Please check your email and password.')
        console.log('Login failed for:', { email, password, loginType })
      } else {
        console.log('Login successful for:', { email, loginType })
        setSuccess('Login successful! Redirecting...')
        // The navigation will be handled by the AuthContext
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('An error occurred during login. Please try again.')
    }
  }

  const loginTypes = [
    {
      id: 'employee',
      title: 'Employee Login',
      description: 'Access your personal portal',
      icon: User,
      color: 'bg-blue-500'
    },
    {
      id: 'admin',
      title: 'Admin Login',
      description: 'HR management system',
      icon: Shield,
      color: 'bg-purple-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mb-4">
            <Building className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome to NKHR</h2>
          <p className="mt-2 text-sm text-gray-600">
            Next-Generation AI-Powered HR Platform
          </p>
        </div>

        {/* Login Type Selector */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="space-y-4">
            {loginTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setLoginType(type.id)}
                className={`w-full p-4 rounded-lg border-2 transition-all duration-200 ${
                  loginType === type.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${type.color} text-white`}>
                    <type.icon className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">{type.title}</h3>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </div>
                  <ArrowRight className={`h-5 w-5 ml-auto ${
                    loginType === type.id ? 'text-blue-500' : 'text-gray-400'
                  }`} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <span className="text-sm text-red-700">{error}</span>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-green-700">{success}</span>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <button type="button" className="text-sm text-blue-600 hover:text-blue-500">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Demo Credentials */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Demo Credentials</h4>
          <div className="space-y-1 text-xs text-blue-700">
            <p><strong>Admin:</strong> admin@nkhr.com / admin123</p>
            <p><strong>Employee:</strong> john.doe@nkhr.com / employee123</p>
            <p><strong>Manager:</strong> sarah.wilson@nkhr.com / manager123</p>
          </div>
          <div className="mt-2 text-xs text-blue-600">
            <p><strong>Note:</strong> Select the correct login type (Admin/Employee) before signing in.</p>
            <p><strong>Current:</strong> {loginType} login selected</p>
          </div>
        </div>
      </div>
    </div>
  )
} 
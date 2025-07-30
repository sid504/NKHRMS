'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from './contexts/AuthContext'
import LoadingSpinner from './components/LoadingSpinner'

export default function HomePage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    // Only redirect if not loading and user state is determined
    if (!isLoading) {
      if (!user) {
        router.replace('/auth/login')
      } else {
        // User is logged in, redirect based on role
        if (user.role === 'admin') {
          router.replace('/dashboard')
        } else {
          router.replace('/employee-portal')
        }
      }
    }
  }, [user, isLoading, router])

  // Show minimal loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <LoadingSpinner size="md" text="Loading..." />
      </div>
    )
  }

  // Show minimal loading while redirecting
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
      <LoadingSpinner size="md" text="Redirecting..." />
    </div>
  )
} 
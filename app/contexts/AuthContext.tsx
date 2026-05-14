'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'employee' | 'manager'
  department?: string
  position?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for existing session on app load - optimized for speed
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser)
          setUser(parsedUser)
        } catch (error) {
          localStorage.removeItem('user')
        }
      }
    }
    // Set loading to false immediately after checking
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, role: string): Promise<boolean> => {
    setIsLoading(true)
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        setIsLoading(false)
        return false
      }

      const data = await res.json()
      const authUser = data.data

      // Role check
      if (role === 'admin' && authUser.role === 'admin') {
        setUser(authUser)
        localStorage.setItem('user', JSON.stringify(authUser))
        localStorage.setItem('token', 'real-jwt-token') // Future: actual JWT
        setIsLoading(false)
        router.push('/dashboard')
        return true
      } else if (role === 'employee' && (authUser.role === 'employee' || authUser.role === 'manager' || authUser.role === 'hr_manager')) {
        setUser(authUser)
        localStorage.setItem('user', JSON.stringify(authUser))
        localStorage.setItem('token', 'real-jwt-token')
        setIsLoading(false)
        router.push('/employee-portal')
        return true
      }
      
      setIsLoading(false)
      return false
    } catch (error) {
      console.error('Login error:', error)
      setIsLoading(false)
      return false
    }
  }

  const logout = () => {
    // Guard for client side APIs
    try {
      setUser(null)
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        sessionStorage.clear()
      }
    } catch (_) {
      // no-op
    }
    // Use replace to avoid user returning to protected page via back button
    router.replace('/auth/login')
  }

  const value = {
    user,
    login,
    logout,
    isLoading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 
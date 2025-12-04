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

  // Mock user data for demo with passwords
  const mockUsers = {
    'admin@nkhr.com': {
      id: 'ADM001',
      name: 'Admin User',
      email: 'admin@nkhr.com',
      role: 'admin' as const,
      department: 'Human Resources',
      position: 'HR Manager',
      password: 'admin123'
    },
    'john.doe@nkhr.com': {
      id: 'EMP001',
      name: 'John Doe',
      email: 'john.doe@nkhr.com',
      role: 'employee' as const,
      department: 'Engineering',
      position: 'Senior Software Engineer',
      password: 'employee123'
    },
    'sarah.wilson@nkhr.com': {
      id: 'MGR001',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@nkhr.com',
      role: 'manager' as const,
      department: 'Engineering',
      position: 'Engineering Manager',
      password: 'manager123'
    }
  }

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
    
    // Reduced delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300))

    // Mock authentication logic
    const mockUser = mockUsers[email as keyof typeof mockUsers]
    
    if (mockUser && mockUser.password === password) {
      // Check if role matches
      if (role === 'admin' && mockUser.role === 'admin') {
        // Remove password from user object before storing
        const { password: _, ...userWithoutPassword } = mockUser
        setUser(userWithoutPassword)
        localStorage.setItem('user', JSON.stringify(userWithoutPassword))
        localStorage.setItem('token', 'mock-jwt-token')
        setIsLoading(false)
        // Navigate to dashboard after successful admin login
        router.push('/dashboard')
        return true
      } else if (role === 'employee' && (mockUser.role === 'employee' || mockUser.role === 'manager')) {
        // Remove password from user object before storing
        const { password: _, ...userWithoutPassword } = mockUser
        setUser(userWithoutPassword)
        localStorage.setItem('user', JSON.stringify(userWithoutPassword))
        localStorage.setItem('token', 'mock-jwt-token')
        setIsLoading(false)
        // Navigate to employee portal after successful employee login
        router.push('/employee-portal')
        return true
      }
    }
    
    setIsLoading(false)
    return false
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
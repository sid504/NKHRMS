'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useSession, signIn, signOut, SessionProvider } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AuthContextInner>{children}</AuthContextInner>
    </SessionProvider>
  )
}

function AuthContextInner({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  const login = async (email: string, password: string, role: string): Promise<boolean> => {
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
    
    if (res?.error) {
      console.error(res.error)
      return false
    }
    return true
  }

  const logout = async () => {
    await signOut({ redirect: false })
    router.push('/login')
  }

  const user = session?.user ? {
    id: (session.user as any).id || '',
    name: session.user.name || '',
    email: session.user.email || '',
    role: (session.user as any).role || 'EMPLOYEE'
  } : null

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading: status === 'loading' }}>
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
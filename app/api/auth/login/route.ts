import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// POST /api/auth/login
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        employee: true,
        admin: true,
        hrManager: true,
        manager: true,
      },
    })

    if (!user) {
      // PROD FALLBACK: If database is missing/empty on Netlify, allow admin login for demo
      if (email === 'admin@nkhr.com' && password === 'admin123') {
        return NextResponse.json({
          data: {
            id: 'demo-admin-id',
            email: 'admin@nkhr.com',
            role: 'admin',
            name: 'Demo Admin',
            position: 'System Administrator',
            department: 'Administration'
          },
          message: 'Login successful (Demo Mode)'
        })
      }
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    // Check password (base64 for demo — in production use bcrypt)
    const hashedInput = Buffer.from(password).toString('base64')
    
    // Also allow plain passwords (for seeded demo users)
    const isValid = user.password === hashedInput || user.password === password

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    // Build profile data
    let name = email
    let department: string | undefined
    let position: string | undefined
    let employeeId: string | undefined

    if (user.employee) {
      name = `${user.employee.firstName} ${user.employee.lastName}`
      department = user.employee.department
      position = user.employee.position
      employeeId = user.employee.employeeId
    }

    const profile = {
      id: user.id,
      email: user.email,
      role: user.role.toLowerCase() as 'admin' | 'employee' | 'manager',
      name,
      department,
      position,
      employeeId,
    }

    return NextResponse.json({ data: profile, message: 'Login successful' })
  } catch (error) {
    console.error('POST /api/auth/login error:', error)
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}

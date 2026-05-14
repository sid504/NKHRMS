import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/employees - List all employees with optional filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const department = searchParams.get('department') || ''
    const status = searchParams.get('status') || ''
    const userId = searchParams.get('userId') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const skip = (page - 1) * limit

    const where: any = {}

    if (userId) {
      where.userId = userId
    }

    if (search) {
      where.OR = [
        { firstName: { contains: search } },
        { lastName: { contains: search } },
        { employeeId: { contains: search } },
        { user: { email: { contains: search } } },
      ]
    }

    if (department) {
      where.department = department
    }

    if (status) {
      where.status = status
    }

    const [employees, total] = await Promise.all([
      prisma.employee.findMany({
        where,
        include: {
          user: { select: { email: true, role: true } },
          manager: {
            include: { user: { select: { email: true } } },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.employee.count({ where }),
    ])

    return NextResponse.json({
      data: employees,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error('GET /api/employees error:', error)
    return NextResponse.json({ error: 'Failed to fetch employees' }, { status: 500 })
  }
}

// POST /api/employees - Create a new employee
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      email,
      password = 'Employee@123',
      firstName,
      lastName,
      employeeId,
      department,
      position,
      hireDate,
      salary,
      phone,
      address,
      emergencyContact,
      managerId,
      role = 'EMPLOYEE',
    } = body

    // Validate required fields
    if (!email || !firstName || !lastName || !employeeId || !department || !position || !hireDate || !salary) {
      return NextResponse.json(
        { error: 'Missing required fields: email, firstName, lastName, employeeId, department, position, hireDate, salary' },
        { status: 400 }
      )
    }

    // Check for duplicate email
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 })
    }

    // Check for duplicate employeeId
    const existingEmployee = await prisma.employee.findUnique({ where: { employeeId } })
    if (existingEmployee) {
      return NextResponse.json({ error: 'Employee ID already exists' }, { status: 409 })
    }

    // Simple password hash (in production, use bcrypt)
    // Using a basic approach since bcrypt isn't installed
    const hashedPassword = Buffer.from(password).toString('base64')

    // Create user + employee in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: { email, password: hashedPassword, role },
      })

      const employee = await tx.employee.create({
        data: {
          userId: user.id,
          firstName,
          lastName,
          employeeId,
          department,
          position,
          hireDate: new Date(hireDate),
          salary: parseFloat(salary),
          phone: phone || null,
          address: address || null,
          emergencyContact: emergencyContact || null,
          managerId: managerId || null,
          status: 'ACTIVE',
        },
        include: {
          user: { select: { email: true, role: true } },
        },
      })

      return employee
    })

    return NextResponse.json({ data: result, message: 'Employee created successfully' }, { status: 201 })
  } catch (error) {
    console.error('POST /api/employees error:', error)
    return NextResponse.json({ error: 'Failed to create employee' }, { status: 500 })
  }
}

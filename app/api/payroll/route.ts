import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/payroll
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const employeeId = searchParams.get('employeeId') || ''
    const month = searchParams.get('month') || ''
    const year = searchParams.get('year') || ''
    const status = searchParams.get('status') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const skip = (page - 1) * limit

    const where: any = {}
    if (employeeId) where.employeeId = employeeId
    if (month) where.month = parseInt(month)
    if (year) where.year = parseInt(year)
    if (status) where.status = status

    const [payrolls, total] = await Promise.all([
      prisma.payroll.findMany({
        where,
        include: {
          employee: {
            select: { firstName: true, lastName: true, employeeId: true, department: true, position: true },
          },
        },
        skip,
        take: limit,
        orderBy: [{ year: 'desc' }, { month: 'desc' }],
      }),
      prisma.payroll.count({ where }),
    ])

    return NextResponse.json({
      data: payrolls,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error('GET /api/payroll error:', error)
    return NextResponse.json({ error: 'Failed to fetch payroll records' }, { status: 500 })
  }
}

// POST /api/payroll — process payroll for an employee/month
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { employeeId, month, year, overtime, deductions, bonuses } = body

    if (!employeeId || !month || !year) {
      return NextResponse.json({ error: 'Missing required fields: employeeId, month, year' }, { status: 400 })
    }

    const employee = await prisma.employee.findUnique({
      where: { id: employeeId },
      include: { user: true },
    })
    if (!employee) {
      return NextResponse.json({ error: 'Employee not found' }, { status: 404 })
    }

    // Check if payroll already processed for this month
    const existing = await prisma.payroll.findFirst({
      where: { employeeId, month: parseInt(month), year: parseInt(year) },
    })
    if (existing) {
      return NextResponse.json({ error: 'Payroll already processed for this month' }, { status: 409 })
    }

    const baseSalary = employee.salary / 12 // Monthly
    const overtimeAmount = parseFloat(overtime || '0')
    const deductionsAmount = parseFloat(deductions || '0')
    const bonusesAmount = parseFloat(bonuses || '0')
    const netSalary = baseSalary + overtimeAmount + bonusesAmount - deductionsAmount

    const payroll = await prisma.payroll.create({
      data: {
        employeeId,
        userId: employee.userId,
        month: parseInt(month),
        year: parseInt(year),
        baseSalary,
        overtime: overtimeAmount,
        deductions: deductionsAmount,
        bonuses: bonusesAmount,
        netSalary,
        status: 'PENDING',
      },
      include: {
        employee: {
          select: { firstName: true, lastName: true, employeeId: true, department: true },
        },
      },
    })

    return NextResponse.json({ data: payroll, message: 'Payroll processed successfully' }, { status: 201 })
  } catch (error) {
    console.error('POST /api/payroll error:', error)
    return NextResponse.json({ error: 'Failed to process payroll' }, { status: 500 })
  }
}

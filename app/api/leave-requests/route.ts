import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/leave-requests
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || ''
    const employeeId = searchParams.get('employeeId') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = (page - 1) * limit

    const where: any = {}
    if (status) where.status = status
    if (employeeId) where.employeeId = employeeId

    const [requests, total] = await Promise.all([
      prisma.leaveRequest.findMany({
        where,
        include: {
          employee: {
            select: {
              firstName: true,
              lastName: true,
              employeeId: true,
              department: true,
              position: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.leaveRequest.count({ where }),
    ])

    return NextResponse.json({
      data: requests,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error('GET /api/leave-requests error:', error)
    return NextResponse.json({ error: 'Failed to fetch leave requests' }, { status: 500 })
  }
}

// POST /api/leave-requests
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { employeeId, leaveType, startDate, endDate, reason } = body

    if (!employeeId || !leaveType || !startDate || !endDate || !reason) {
      return NextResponse.json(
        { error: 'Missing required fields: employeeId, leaveType, startDate, endDate, reason' },
        { status: 400 }
      )
    }

    const employee = await prisma.employee.findUnique({ where: { id: employeeId } })
    if (!employee) {
      return NextResponse.json({ error: 'Employee not found' }, { status: 404 })
    }

    const start = new Date(startDate)
    const end = new Date(endDate)
    if (start > end) {
      return NextResponse.json({ error: 'Start date must be before end date' }, { status: 400 })
    }

    const leaveRequest = await prisma.leaveRequest.create({
      data: {
        employeeId,
        leaveType,
        startDate: start,
        endDate: end,
        reason,
        status: 'PENDING',
      },
      include: {
        employee: {
          select: { firstName: true, lastName: true, employeeId: true, department: true },
        },
      },
    })

    return NextResponse.json({ data: leaveRequest, message: 'Leave request submitted successfully' }, { status: 201 })
  } catch (error) {
    console.error('POST /api/leave-requests error:', error)
    return NextResponse.json({ error: 'Failed to submit leave request' }, { status: 500 })
  }
}

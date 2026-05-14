import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/attendance
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const employeeId = searchParams.get('employeeId') || ''
    const dateFrom = searchParams.get('dateFrom') || ''
    const dateTo = searchParams.get('dateTo') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const skip = (page - 1) * limit

    const where: any = {}
    if (employeeId) where.employeeId = employeeId
    if (dateFrom || dateTo) {
      where.date = {}
      if (dateFrom) where.date.gte = new Date(dateFrom)
      if (dateTo) where.date.lte = new Date(dateTo)
    }

    const [records, total] = await Promise.all([
      prisma.attendance.findMany({
        where,
        include: {
          employee: {
            select: { firstName: true, lastName: true, employeeId: true, department: true },
          },
        },
        skip,
        take: limit,
        orderBy: { date: 'desc' },
      }),
      prisma.attendance.count({ where }),
    ])

    return NextResponse.json({
      data: records,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error('GET /api/attendance error:', error)
    return NextResponse.json({ error: 'Failed to fetch attendance records' }, { status: 500 })
  }
}

// POST /api/attendance — check-in
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { employeeId, type } = body // type: 'checkin' | 'checkout'

    if (!employeeId || !type) {
      return NextResponse.json({ error: 'Missing required fields: employeeId, type' }, { status: 400 })
    }

    const employee = await prisma.employee.findUnique({ where: { id: employeeId } })
    if (!employee) {
      return NextResponse.json({ error: 'Employee not found' }, { status: 404 })
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    let attendance = await prisma.attendance.findFirst({
      where: {
        employeeId,
        date: { gte: today, lt: tomorrow },
      },
    })

    if (type === 'checkin') {
      if (attendance && attendance.checkIn) {
        return NextResponse.json({ error: 'Already checked in today' }, { status: 400 })
      }
      if (!attendance) {
        attendance = await prisma.attendance.create({
          data: {
            employeeId,
            userId: employee.userId,
            date: new Date(),
            checkIn: new Date(),
          },
        })
      } else {
        attendance = await prisma.attendance.update({
          where: { id: attendance.id },
          data: { checkIn: new Date() },
        })
      }
    } else if (type === 'checkout') {
      if (!attendance || !attendance.checkIn) {
        return NextResponse.json({ error: 'No check-in record for today' }, { status: 400 })
      }
      if (attendance.checkOut) {
        return NextResponse.json({ error: 'Already checked out today' }, { status: 400 })
      }
      const checkOut = new Date()
      const checkIn = new Date(attendance.checkIn)
      const totalHours = (checkOut.getTime() - checkIn.getTime()) / 3600000
      const overtime = Math.max(0, totalHours - 8)

      attendance = await prisma.attendance.update({
        where: { id: attendance.id },
        data: {
          checkOut,
          totalHours: parseFloat(totalHours.toFixed(2)),
          overtime: parseFloat(overtime.toFixed(2)),
        },
      })
    }

    return NextResponse.json({ data: attendance, message: `${type === 'checkin' ? 'Checked in' : 'Checked out'} successfully` })
  } catch (error) {
    console.error('POST /api/attendance error:', error)
    return NextResponse.json({ error: 'Failed to record attendance' }, { status: 500 })
  }
}

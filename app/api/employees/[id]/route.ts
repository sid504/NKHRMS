import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/employees/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const employee = await prisma.employee.findUnique({
      where: { id: params.id },
      include: {
        user: { select: { email: true, role: true } },
        manager: {
          include: { user: { select: { email: true } } },
        },
        leaveRequests: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
        attendance: {
          orderBy: { date: 'desc' },
          take: 10,
        },
        performanceReviews: {
          orderBy: { reviewDate: 'desc' },
          take: 3,
        },
        payroll: {
          orderBy: [{ year: 'desc' }, { month: 'desc' }],
          take: 6,
        },
      },
    })

    if (!employee) {
      return NextResponse.json({ error: 'Employee not found' }, { status: 404 })
    }

    return NextResponse.json({ data: employee })
  } catch (error) {
    console.error('GET /api/employees/[id] error:', error)
    return NextResponse.json({ error: 'Failed to fetch employee' }, { status: 500 })
  }
}

// PUT /api/employees/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const {
      firstName,
      lastName,
      department,
      position,
      salary,
      phone,
      address,
      emergencyContact,
      managerId,
      status,
    } = body

    const employee = await prisma.employee.findUnique({ where: { id: params.id } })
    if (!employee) {
      return NextResponse.json({ error: 'Employee not found' }, { status: 404 })
    }

    const updated = await prisma.employee.update({
      where: { id: params.id },
      data: {
        firstName: firstName ?? employee.firstName,
        lastName: lastName ?? employee.lastName,
        department: department ?? employee.department,
        position: position ?? employee.position,
        salary: salary !== undefined ? parseFloat(salary) : employee.salary,
        phone: phone !== undefined ? phone : employee.phone,
        address: address !== undefined ? address : employee.address,
        emergencyContact: emergencyContact !== undefined ? emergencyContact : employee.emergencyContact,
        managerId: managerId !== undefined ? managerId : employee.managerId,
        status: status ?? employee.status,
      },
      include: {
        user: { select: { email: true, role: true } },
      },
    })

    return NextResponse.json({ data: updated, message: 'Employee updated successfully' })
  } catch (error) {
    console.error('PUT /api/employees/[id] error:', error)
    return NextResponse.json({ error: 'Failed to update employee' }, { status: 500 })
  }
}

// DELETE /api/employees/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const employee = await prisma.employee.findUnique({
      where: { id: params.id },
      include: { user: true },
    })

    if (!employee) {
      return NextResponse.json({ error: 'Employee not found' }, { status: 404 })
    }

    // Cascade delete via user (employee and all related records deleted)
    await prisma.user.delete({ where: { id: employee.userId } })

    return NextResponse.json({ message: 'Employee deleted successfully' })
  } catch (error) {
    console.error('DELETE /api/employees/[id] error:', error)
    return NextResponse.json({ error: 'Failed to delete employee' }, { status: 500 })
  }
}

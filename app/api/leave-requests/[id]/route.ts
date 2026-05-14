import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// PATCH /api/leave-requests/[id] — approve or reject
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { status, approvedBy } = body

    if (!['APPROVED', 'REJECTED'].includes(status)) {
      return NextResponse.json({ error: 'Status must be APPROVED or REJECTED' }, { status: 400 })
    }

    const leaveRequest = await prisma.leaveRequest.findUnique({ where: { id: params.id } })
    if (!leaveRequest) {
      return NextResponse.json({ error: 'Leave request not found' }, { status: 404 })
    }

    if (leaveRequest.status !== 'PENDING') {
      return NextResponse.json({ error: 'Only pending requests can be approved or rejected' }, { status: 400 })
    }

    const updated = await prisma.leaveRequest.update({
      where: { id: params.id },
      data: { status, approvedBy: approvedBy || null },
      include: {
        employee: {
          select: { firstName: true, lastName: true, employeeId: true },
        },
      },
    })

    return NextResponse.json({ data: updated, message: `Leave request ${status.toLowerCase()} successfully` })
  } catch (error) {
    console.error('PATCH /api/leave-requests/[id] error:', error)
    return NextResponse.json({ error: 'Failed to update leave request' }, { status: 500 })
  }
}

// DELETE /api/leave-requests/[id] — cancel pending request
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const leaveRequest = await prisma.leaveRequest.findUnique({ where: { id: params.id } })
    if (!leaveRequest) {
      return NextResponse.json({ error: 'Leave request not found' }, { status: 404 })
    }

    if (leaveRequest.status !== 'PENDING') {
      return NextResponse.json({ error: 'Only pending requests can be cancelled' }, { status: 400 })
    }

    await prisma.leaveRequest.delete({ where: { id: params.id } })
    return NextResponse.json({ message: 'Leave request cancelled successfully' })
  } catch (error) {
    console.error('DELETE /api/leave-requests/[id] error:', error)
    return NextResponse.json({ error: 'Failed to cancel leave request' }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const tickets = await prisma.supportTicket.findMany({
      include: { employee: true },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json({ data: tickets })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const ticket = await prisma.supportTicket.create({
      data: {
        employeeId: body.employeeId,
        subject: body.subject,
        description: body.description,
        category: body.category,
        priority: body.priority || 'MEDIUM'
      }
    })
    return NextResponse.json({ data: ticket }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

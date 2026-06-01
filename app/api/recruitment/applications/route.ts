import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const applications = await prisma.jobApplication.findMany({
      include: { job: true },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json({ data: applications })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const app = await prisma.jobApplication.create({
      data: {
        jobId: body.jobId,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        resume: body.resume,
        coverLetter: body.coverLetter,
        status: 'PENDING'
      }
    })
    return NextResponse.json({ data: app }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

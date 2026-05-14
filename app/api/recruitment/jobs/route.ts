import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const jobs = await prisma.jobPosting.findMany({
      include: {
        _count: {
          select: { applications: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json({ data: jobs })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch job postings' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { title, department, description, requirements, salary, location, type } = body

    const job = await prisma.jobPosting.create({
      data: {
        title,
        department,
        description,
        requirements,
        salary: parseFloat(salary) || 0,
        location,
        type,
        status: 'ACTIVE'
      }
    })

    return NextResponse.json({ data: job, message: 'Job posting created successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create job posting' }, { status: 500 })
  }
}

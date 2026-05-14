import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/recruitment
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || ''
    const department = searchParams.get('department') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = (page - 1) * limit

    const where: any = {}
    if (status) where.status = status
    if (department) where.department = department

    const [postings, total] = await Promise.all([
      prisma.jobPosting.findMany({
        where,
        include: {
          applications: { select: { id: true, status: true } },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.jobPosting.count({ where }),
    ])

    return NextResponse.json({ data: postings, total, page, limit, totalPages: Math.ceil(total / limit) })
  } catch (error) {
    console.error('GET /api/recruitment error:', error)
    return NextResponse.json({ error: 'Failed to fetch job postings' }, { status: 500 })
  }
}

// POST /api/recruitment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, department, description, requirements, salary, location, type } = body

    if (!title || !department || !description || !requirements || !type) {
      return NextResponse.json({ error: 'Missing required fields: title, department, description, requirements, type' }, { status: 400 })
    }

    const posting = await prisma.jobPosting.create({
      data: {
        title,
        department,
        description,
        requirements,
        salary: salary ? parseFloat(salary) : null,
        location: location || null,
        type,
        status: 'ACTIVE',
      },
    })

    return NextResponse.json({ data: posting, message: 'Job posting created successfully' }, { status: 201 })
  } catch (error) {
    console.error('POST /api/recruitment error:', error)
    return NextResponse.json({ error: 'Failed to create job posting' }, { status: 500 })
  }
}

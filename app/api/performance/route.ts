import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/performance
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const employeeId = searchParams.get('employeeId') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = (page - 1) * limit

    const where: any = {}
    if (employeeId) where.employeeId = employeeId

    const [reviews, total] = await Promise.all([
      prisma.performanceReview.findMany({
        where,
        include: {
          employee: {
            select: { firstName: true, lastName: true, employeeId: true, department: true, position: true },
          },
        },
        skip,
        take: limit,
        orderBy: { reviewDate: 'desc' },
      }),
      prisma.performanceReview.count({ where }),
    ])

    return NextResponse.json({ data: reviews, total, page, limit, totalPages: Math.ceil(total / limit) })
  } catch (error) {
    console.error('GET /api/performance error:', error)
    return NextResponse.json({ error: 'Failed to fetch performance reviews' }, { status: 500 })
  }
}

// POST /api/performance
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { employeeId, reviewerId, reviewDate, rating, comments, goals, nextReviewDate } = body

    if (!employeeId || !reviewerId || !reviewDate || !rating || !comments) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 })
    }

    const review = await prisma.performanceReview.create({
      data: {
        employeeId,
        reviewerId,
        reviewDate: new Date(reviewDate),
        rating: parseInt(rating),
        comments,
        goals: goals || null,
        nextReviewDate: nextReviewDate ? new Date(nextReviewDate) : null,
      },
      include: {
        employee: { select: { firstName: true, lastName: true, employeeId: true } },
      },
    })

    return NextResponse.json({ data: review, message: 'Performance review created successfully' }, { status: 201 })
  } catch (error) {
    console.error('POST /api/performance error:', error)
    return NextResponse.json({ error: 'Failed to create performance review' }, { status: 500 })
  }
}

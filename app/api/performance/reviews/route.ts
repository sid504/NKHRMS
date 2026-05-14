import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const employeeId = searchParams.get('employeeId')

    const reviews = await prisma.performanceReview.findMany({
      where: employeeId ? { employeeId } : {},
      include: {
        employee: {
          select: { firstName: true, lastName: true, employeeId: true, department: true }
        }
      },
      orderBy: { reviewDate: 'desc' }
    })
    return NextResponse.json({ data: reviews })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch performance reviews' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { employeeId, reviewerId, reviewDate, rating, comments, goals, nextReviewDate } = body

    const review = await prisma.performanceReview.create({
      data: {
        employeeId,
        reviewerId,
        reviewDate: new Date(reviewDate),
        rating: parseInt(rating),
        comments,
        goals,
        nextReviewDate: nextReviewDate ? new Date(nextReviewDate) : null
      }
    })

    return NextResponse.json({ data: review, message: 'Performance review submitted successfully' })
  } catch (error) {
    console.error('POST /api/performance/reviews error:', error)
    return NextResponse.json({ error: 'Failed to submit performance review' }, { status: 500 })
  }
}

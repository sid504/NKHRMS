import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const courses = await prisma.trainingCourse.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json({ data: courses })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const year = searchParams.get('year')

    const where: any = {}
    if (year) {
      where.date = {
        gte: new Date(`${year}-01-01`),
        lte: new Date(`${year}-12-31`)
      }
    }

    const holidays = await prisma.holiday.findMany({
      where,
      orderBy: { date: 'asc' }
    })

    return NextResponse.json({ data: holidays })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch holidays' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, date, type, description, isOptional, country, region } = body

    const holiday = await prisma.holiday.create({
      data: {
        name,
        date: new Date(date),
        type,
        description,
        isOptional: isOptional || false,
        country: country || 'All',
        region: region || 'Global'
      }
    })

    return NextResponse.json({ data: holiday, message: 'Holiday created successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create holiday' }, { status: 500 })
  }
}

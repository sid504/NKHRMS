import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const benefits = await prisma.benefitPlan.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json({ data: benefits })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

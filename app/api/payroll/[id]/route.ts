import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const payroll = await prisma.payroll.findUnique({
      where: { id: params.id },
      include: { employee: true }
    })
    
    if (!payroll) {
      return NextResponse.json({ error: 'Payroll not found' }, { status: 404 })
    }

    return NextResponse.json({ data: payroll })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

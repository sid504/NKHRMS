import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { startDate, endDate, department } = await req.json()

    if (!startDate || !endDate) {
      return NextResponse.json({ error: 'Start and end dates are required' }, { status: 400 })
    }

    // 1. Fetch employees to process
    const employees = await prisma.employee.findMany({
      where: department && department !== 'all' ? { department } : {},
      include: { user: true }
    })

    const start = new Date(startDate)
    const end = new Date(endDate)
    const processedRecords = []

    // 2. Loop through each day in the range
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const currentDate = new Date(d)
      
      // For each employee, simulate a check-in/out if they don't have one
      for (const employee of employees) {
        // Skip weekends for simulation (Saturday=6, Sunday=0)
        if (currentDate.getDay() === 0 || currentDate.getDay() === 6) continue

        // Check if record already exists
        const existing = await prisma.attendance.findFirst({
          where: {
            employeeId: employee.id,
            date: {
              gte: new Date(currentDate.setHours(0, 0, 0, 0)),
              lt: new Date(currentDate.setHours(23, 59, 59, 999))
            }
          }
        })

        if (!existing) {
          // Simulate random check-in around 9:00 AM
          const checkInTime = new Date(currentDate)
          checkInTime.setHours(9, Math.floor(Math.random() * 15), 0)

          // Simulate random check-out around 6:00 PM
          const checkOutTime = new Date(currentDate)
          checkOutTime.setHours(18, Math.floor(Math.random() * 30), 0)

          const totalHours = (checkOutTime.getTime() - checkInTime.getTime()) / (1000 * 60 * 60)
          const overtime = Math.max(0, totalHours - 8)

          const newRecord = await prisma.attendance.create({
            data: {
              employeeId: employee.id,
              userId: employee.userId,
              date: new Date(currentDate),
              checkIn: checkInTime,
              checkOut: checkOutTime,
              totalHours: parseFloat(totalHours.toFixed(2)),
              overtime: parseFloat(overtime.toFixed(2))
            }
          })
          processedRecords.push(newRecord)
        }
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Processed ${processedRecords.length} new attendance records across ${employees.length} employees.`,
      count: processedRecords.length 
    })

  } catch (error: any) {
    console.error('Attendance processing error:', error)
    return NextResponse.json({ error: error.message || 'Failed to process attendance' }, { status: 500 })
  }
}

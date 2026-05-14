const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Clean existing data
  await prisma.payroll.deleteMany()
  await prisma.performanceReview.deleteMany()
  await prisma.attendance.deleteMany()
  await prisma.leaveRequest.deleteMany()
  await prisma.jobApplication.deleteMany()
  await prisma.jobPosting.deleteMany()
  await prisma.employee.deleteMany()
  await prisma.admin.deleteMany()
  await prisma.hRManager.deleteMany()
  await prisma.manager.deleteMany()
  await prisma.user.deleteMany()

  console.log('🗑️  Cleaned existing data')

  // Create Admin user
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@nkhr.com',
      password: 'admin123', // plain for demo
      role: 'ADMIN',
      admin: { create: {} },
    },
  })
  console.log('✅ Admin user created:', adminUser.email)

  // Create HR Manager user + employee
  const hrUser = await prisma.user.create({
    data: {
      email: 'hr@nkhr.com',
      password: 'hr123',
      role: 'HR_MANAGER',
      hrManager: { create: {} },
      employee: {
        create: {
          firstName: 'Alice',
          lastName: 'Brown',
          employeeId: 'HR001',
          department: 'Human Resources',
          position: 'HR Manager',
          hireDate: new Date('2020-03-01'),
          salary: 90000,
          phone: '+1-555-0101',
          status: 'ACTIVE',
        },
      },
    },
    include: { employee: true },
  })
  console.log('✅ HR Manager created:', hrUser.email)

  // Create Manager user + employee
  const managerUser = await prisma.user.create({
    data: {
      email: 'sarah.wilson@nkhr.com',
      password: 'manager123',
      role: 'MANAGER',
      employee: {
        create: {
          firstName: 'Sarah',
          lastName: 'Wilson',
          employeeId: 'MGR001',
          department: 'Engineering',
          position: 'Engineering Manager',
          hireDate: new Date('2019-06-15'),
          salary: 120000,
          phone: '+1-555-0102',
          status: 'ACTIVE',
        },
      },
    },
    include: { employee: true },
  })

  // Create manager record
  await prisma.manager.create({
    data: {
      userId: managerUser.id,
      department: 'Engineering',
    },
  })
  console.log('✅ Manager created:', managerUser.email)

  // Create Employee users
  const employees = [
    {
      email: 'john.doe@nkhr.com',
      password: 'employee123',
      firstName: 'John',
      lastName: 'Doe',
      employeeId: 'EMP001',
      department: 'Engineering',
      position: 'Senior Software Engineer',
      hireDate: new Date('2022-01-15'),
      salary: 95000,
      phone: '+1-555-0103',
    },
    {
      email: 'mike.johnson@nkhr.com',
      password: 'employee123',
      firstName: 'Mike',
      lastName: 'Johnson',
      employeeId: 'EMP002',
      department: 'Sales',
      position: 'Sales Representative',
      hireDate: new Date('2023-03-10'),
      salary: 65000,
      phone: '+1-555-0104',
    },
    {
      email: 'david.lee@nkhr.com',
      password: 'employee123',
      firstName: 'David',
      lastName: 'Lee',
      employeeId: 'EMP003',
      department: 'Engineering',
      position: 'Frontend Developer',
      hireDate: new Date('2023-06-15'),
      salary: 80000,
      phone: '+1-555-0105',
    },
    {
      email: 'priya.patel@nkhr.com',
      password: 'employee123',
      firstName: 'Priya',
      lastName: 'Patel',
      employeeId: 'EMP004',
      department: 'Marketing',
      position: 'Digital Marketing Specialist',
      hireDate: new Date('2021-09-20'),
      salary: 72000,
      phone: '+1-555-0106',
    },
    {
      email: 'james.carter@nkhr.com',
      password: 'employee123',
      firstName: 'James',
      lastName: 'Carter',
      employeeId: 'EMP005',
      department: 'Finance',
      position: 'Financial Analyst',
      hireDate: new Date('2022-04-01'),
      salary: 88000,
      phone: '+1-555-0107',
    },
  ]

  const createdEmployees = []
  for (const emp of employees) {
    const { email, password, ...empData } = emp
    const user = await prisma.user.create({
      data: {
        email,
        password,
        role: 'EMPLOYEE',
        employee: {
          create: { ...empData, status: 'ACTIVE' },
        },
      },
      include: { employee: true },
    })
    createdEmployees.push(user.employee)
    console.log('✅ Employee created:', email)
  }

  // Add leave requests
  const emp1 = createdEmployees[0] // John Doe
  const emp2 = createdEmployees[1] // Mike Johnson
  const emp3 = createdEmployees[2] // David Lee

  await prisma.leaveRequest.createMany({
    data: [
      {
        employeeId: emp1.id,
        leaveType: 'VACATION',
        startDate: new Date('2026-05-20'),
        endDate: new Date('2026-05-25'),
        reason: 'Family vacation',
        status: 'PENDING',
      },
      {
        employeeId: emp2.id,
        leaveType: 'SICK',
        startDate: new Date('2026-05-15'),
        endDate: new Date('2026-05-16'),
        reason: 'Medical appointment',
        status: 'APPROVED',
        approvedBy: adminUser.id,
      },
      {
        employeeId: emp3.id,
        leaveType: 'PERSONAL',
        startDate: new Date('2026-05-18'),
        endDate: new Date('2026-05-18'),
        reason: 'Personal errand',
        status: 'PENDING',
      },
    ],
  })
  console.log('✅ Leave requests seeded')

  // Add payroll records
  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear()
  for (const emp of createdEmployees) {
    const baseSalary = emp.salary / 12
    const netSalary = baseSalary - baseSalary * 0.1 // 10% deductions
    await prisma.payroll.create({
      data: {
        employeeId: emp.id,
        userId: (await prisma.employee.findUnique({ where: { id: emp.id } })).userId,
        month: currentMonth - 1 || 12,
        year: currentMonth === 1 ? currentYear - 1 : currentYear,
        baseSalary,
        overtime: 0,
        deductions: baseSalary * 0.1,
        bonuses: 0,
        netSalary,
        status: 'PAID',
      },
    })
  }
  console.log('✅ Payroll records seeded')

  // Add job postings
  await prisma.jobPosting.createMany({
    data: [
      {
        title: 'Senior Backend Engineer',
        department: 'Engineering',
        description: 'We are looking for an experienced backend engineer to join our team.',
        requirements: '5+ years experience with Node.js, Python, or Go. Experience with distributed systems.',
        salary: 130000,
        location: 'New York, NY (Hybrid)',
        type: 'FULL_TIME',
        status: 'ACTIVE',
      },
      {
        title: 'Product Manager',
        department: 'Product',
        description: 'Drive product strategy and roadmap for our core platform.',
        requirements: '3+ years as a PM, strong analytical skills, experience with Agile.',
        salary: 115000,
        location: 'San Francisco, CA',
        type: 'FULL_TIME',
        status: 'ACTIVE',
      },
      {
        title: 'UX Designer',
        department: 'Design',
        description: 'Create beautiful, user-centered designs for our HR platform.',
        requirements: '2+ years UX design experience, proficiency in Figma.',
        salary: 85000,
        location: 'Remote',
        type: 'FULL_TIME',
        status: 'ACTIVE',
      },
    ],
  })
  console.log('✅ Job postings seeded')

  // Add attendance for today
  const today = new Date()
  today.setHours(9, 0, 0, 0)
  const checkout = new Date()
  checkout.setHours(18, 0, 0, 0)

  for (const emp of createdEmployees.slice(0, 3)) {
    await prisma.attendance.create({
      data: {
        employeeId: emp.id,
        userId: (await prisma.employee.findUnique({ where: { id: emp.id } })).userId,
        date: new Date(),
        checkIn: today,
        checkOut: checkout,
        totalHours: 9,
        overtime: 1,
      },
    })
  }
  console.log('✅ Attendance records seeded')

  console.log('\n🎉 Seeding complete!')
  console.log('\n📝 Demo Login Credentials:')
  console.log('  Admin:    admin@nkhr.com / admin123')
  console.log('  HR:       hr@nkhr.com / hr123')
  console.log('  Manager:  sarah.wilson@nkhr.com / manager123')
  console.log('  Employee: john.doe@nkhr.com / employee123')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

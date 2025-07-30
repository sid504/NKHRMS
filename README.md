# HR Management System

A comprehensive HR management services website built with Next.js, TypeScript, and Tailwind CSS.

## Features

### 🏢 Employee Management
- Employee registration and profiles
- Employee directory with search and filtering
- Employee status tracking (active, inactive, on leave)
- Department and position management

### 📅 Leave Management
- Leave request submission and approval workflow
- Leave calendar view
- Leave balance tracking
- Multiple leave types (sick, vacation, personal, etc.)

### ⏰ Attendance Management
- Real-time attendance tracking
- Check-in/check-out functionality
- Overtime calculation
- Attendance reports and analytics

### 💰 Payroll Management
- Automated salary calculation
- Tax deductions and benefits
- Payroll processing
- Salary reports

### 📊 Performance Management
- Performance reviews and 360-degree feedback
- Goal setting and tracking
- Performance analytics
- Review scheduling

### 🎯 Recruitment Management
- Job posting and management
- Candidate tracking
- Interview scheduling
- Onboarding process

### 🔐 User Authentication & Authorization
- Role-based access control (Admin, HR, Manager, Employee)
- Secure login/logout
- Password management
- Session management

### 📈 Dashboard & Analytics
- HR metrics dashboard
- Employee statistics
- Reports and analytics
- Data visualization

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Prisma ORM with SQLite
- **Authentication**: NextAuth.js
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form with Zod validation
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hr-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard pages
│   ├── employees/         # Employee management
│   ├── leave-requests/    # Leave management
│   ├── attendance/        # Attendance tracking
│   ├── payroll/          # Payroll management
│   ├── performance/      # Performance reviews
│   ├── recruitment/      # Recruitment system
│   ├── login/            # Authentication
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/           # Reusable components
├── lib/                  # Utility functions
├── prisma/              # Database schema
├── public/              # Static assets
└── types/               # TypeScript types
```

## Database Schema

The application uses Prisma ORM with the following main models:

- **User**: Authentication and role management
- **Employee**: Employee profiles and information
- **LeaveRequest**: Leave management
- **Attendance**: Time tracking
- **PerformanceReview**: Performance management
- **Payroll**: Salary and compensation
- **JobPosting**: Recruitment
- **JobApplication**: Job applications

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository. 
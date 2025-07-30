'use client'

import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import Link from 'next/link'
import {
  ArrowLeft,
  Calendar,
  User,
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  CalendarDays,
  FileText,
  Briefcase,
  Building,
  Users,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Shield,
  Zap,
  Award,
  Target,
  Activity,
  Settings,
  UserCheck,
  UserX,
  MessageSquare,
  MapPin,
  Wifi,
  Smartphone,
  Monitor,
  Phone,
  Mail,
  DollarSign,
  CreditCard,
  PieChart,
  LineChart,
  BarChart,
  Calculator,
  Receipt,
  Banknote,
  TrendingUp as TrendingUpIcon
} from 'lucide-react'
import { PieChart as RechartsPieChart, Pie, Cell, LineChart as RechartsLineChart, Line, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function PayrollOverviewPage() {
  const { user } = useAuth()
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().split('T')[0].substring(0, 7))
  const [selectedDepartment, setSelectedDepartment] = useState('all')

  // Mock data for payroll analytics
  const payrollData = {
    totalEmployees: 200,
    totalPayroll: 1250000,
    averageSalary: 6250,
    totalBenefits: 187500,
    totalTaxes: 312500,
    totalDeductions: 75000
  }

  const monthlyTrendData = [
    { month: 'Jan', payroll: 1200000, benefits: 180000, taxes: 300000 },
    { month: 'Feb', payroll: 1220000, benefits: 183000, taxes: 305000 },
    { month: 'Mar', payroll: 1240000, benefits: 186000, taxes: 310000 },
    { month: 'Apr', payroll: 1230000, benefits: 184500, taxes: 307500 },
    { month: 'May', payroll: 1250000, benefits: 187500, taxes: 312500 },
    { month: 'Jun', payroll: 1260000, benefits: 189000, taxes: 315000 }
  ]

  const departmentPayroll = [
    { department: 'Engineering', payroll: 450000, employees: 45, avgSalary: 10000 },
    { department: 'Marketing', payroll: 280000, employees: 28, avgSalary: 10000 },
    { department: 'Sales', payroll: 350000, employees: 35, avgSalary: 10000 },
    { department: 'HR', payroll: 120000, employees: 12, avgSalary: 10000 },
    { department: 'Finance', payroll: 220000, employees: 22, avgSalary: 10000 }
  ]

  const pieChartData = [
    { name: 'Basic Salary', value: 1000000, color: '#10B981' },
    { name: 'Benefits', value: 187500, color: '#8B5CF6' },
    { name: 'Taxes', value: 312500, color: '#EF4444' },
    { name: 'Deductions', value: 75000, color: '#F59E0B' }
  ]

  const recentPayrollActivities = [
    {
      id: 1,
      employeeName: 'John Smith',
      action: 'Payroll Processed',
      amount: 8500,
      date: '2024-01-20',
      status: 'Completed'
    },
    {
      id: 2,
      employeeName: 'Emily Davis',
      action: 'Bonus Added',
      amount: 2000,
      date: '2024-01-19',
      status: 'Pending'
    },
    {
      id: 3,
      employeeName: 'Mike Wilson',
      action: 'Deduction Applied',
      amount: -500,
      date: '2024-01-18',
      status: 'Completed'
    },
    {
      id: 4,
      employeeName: 'Sarah Johnson',
      action: 'Reimbursement',
      amount: 750,
      date: '2024-01-17',
      status: 'Completed'
    }
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/payroll" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payroll Overview</h1>
            <p className="text-gray-600">Comprehensive payroll analytics and financial insights</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center">
            <Calculator className="h-4 w-4 mr-2" />
            Process Payroll
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payroll Month</label>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Departments</option>
              <option value="engineering">Engineering</option>
              <option value="marketing">Marketing</option>
              <option value="sales">Sales</option>
              <option value="hr">HR</option>
              <option value="finance">Finance</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">View</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="current">Current Month</option>
              <option value="previous">Previous Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Payroll</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(payrollData.totalPayroll)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <TrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">+2.5% from last month</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Salary</p>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(payrollData.averageSalary)}</p>
            </div>
            <Calculator className="h-8 w-8 text-blue-600" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-gray-500">Per employee</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Benefits</p>
              <p className="text-2xl font-bold text-purple-600">{formatCurrency(payrollData.totalBenefits)}</p>
            </div>
            <Award className="h-8 w-8 text-purple-600" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-gray-500">15% of payroll</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Taxes</p>
              <p className="text-2xl font-bold text-red-600">{formatCurrency(payrollData.totalTaxes)}</p>
            </div>
            <Shield className="h-8 w-8 text-red-600" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-gray-500">25% of payroll</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Deductions</p>
              <p className="text-2xl font-bold text-yellow-600">{formatCurrency(payrollData.totalDeductions)}</p>
            </div>
            <Receipt className="h-8 w-8 text-yellow-600" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-gray-500">6% of payroll</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Net Pay</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(payrollData.totalPayroll - payrollData.totalTaxes - payrollData.totalDeductions)}</p>
            </div>
            <Banknote className="h-8 w-8 text-green-600" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-gray-500">After deductions</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payroll Distribution */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payroll Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Payroll Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={monthlyTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => formatCurrency(value)} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
                <Line type="monotone" dataKey="payroll" stroke="#10B981" strokeWidth={2} name="Payroll" />
                <Line type="monotone" dataKey="benefits" stroke="#8B5CF6" strokeWidth={2} name="Benefits" />
                <Line type="monotone" dataKey="taxes" stroke="#EF4444" strokeWidth={2} name="Taxes" />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Department-wise Payroll */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Department-wise Payroll</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={departmentPayroll}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend />
              <Bar dataKey="payroll" fill="#10B981" name="Payroll" />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Payroll Activities */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Payroll Activities</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentPayrollActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <DollarSign className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{activity.employeeName}</div>
                    <div className="text-sm text-gray-500">{activity.action} • {activity.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${activity.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {activity.amount >= 0 ? '+' : ''}{formatCurrency(activity.amount)}
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    activity.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    activity.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {activity.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link href="/payroll/processing" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="flex items-center">
              <Calculator className="h-6 w-6 text-blue-600 mr-3" />
              <div>
                <div className="font-medium text-gray-900">Process Payroll</div>
                <div className="text-sm text-gray-500">Run payroll for current month</div>
              </div>
            </div>
          </Link>
          <Link href="/payroll/payslips" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="flex items-center">
              <Receipt className="h-6 w-6 text-green-600 mr-3" />
              <div>
                <div className="font-medium text-gray-900">Payslips</div>
                <div className="text-sm text-gray-500">View and manage payslips</div>
              </div>
            </div>
          </Link>
          <Link href="/payroll/tax" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="flex items-center">
              <Shield className="h-6 w-6 text-purple-600 mr-3" />
              <div>
                <div className="font-medium text-gray-900">Tax Management</div>
                <div className="text-sm text-gray-500">Handle tax calculations</div>
              </div>
            </div>
          </Link>
          <Link href="/payroll/reports" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="flex items-center">
              <BarChart3 className="h-6 w-6 text-orange-600 mr-3" />
              <div>
                <div className="font-medium text-gray-900">Reports</div>
                <div className="text-sm text-gray-500">Generate payroll reports</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
} 
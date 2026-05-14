'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import Link from 'next/link'
import {
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
  TrendingUp as TrendingUpIcon,
  Target as TargetIcon,
  Timer,
  Calendar as CalendarIcon,
  Settings as SettingsIcon,
  Shield as ShieldIcon,
  MapPin as MapPinIcon,
  Clock as ClockIcon,
  FileText as FileTextIcon,
  CreditCard as CreditCardIcon,
  Calculator as CalculatorIcon
} from 'lucide-react'
import { PieChart as RechartsPieChart, Pie, Cell, LineChart as RechartsLineChart, Line, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function PayrollPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')

  // Dynamic data for payroll analytics
  const [payrollData, setPayrollData] = useState({
    totalEmployees: 0,
    totalPayroll: 0,
    averageSalary: 0,
    totalBenefits: 0,
    totalTaxes: 0,
    totalDeductions: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPayroll = async () => {
      try {
        const res = await fetch('/api/payroll?limit=100')
        if (res.ok) {
          const data = await res.json()
          const records = data.data || []
          
          let totalPay = 0
          let totalDeduct = 0
          let totalBene = 0 // Using bonuses as benefits for now
          
          records.forEach((record: any) => {
            totalPay += record.baseSalary + record.overtime + record.bonuses
            totalDeduct += record.deductions
            totalBene += record.bonuses
          })
          
          setPayrollData({
            totalEmployees: records.length,
            totalPayroll: totalPay,
            averageSalary: records.length ? totalPay / records.length : 0,
            totalBenefits: totalBene,
            totalTaxes: totalDeduct * 0.7, // Mock split for tax/deductions
            totalDeductions: totalDeduct * 0.3
          })
        }
      } catch (error) {
        console.error('Failed to fetch payroll data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPayroll()
  }, [])

  const monthlyTrendData = [
    { month: 'Jan', payroll: 1200000, benefits: 180000, taxes: 300000 },
    { month: 'Feb', payroll: 1220000, benefits: 183000, taxes: 305000 },
    { month: 'Mar', payroll: 1240000, benefits: 186000, taxes: 310000 },
    { month: 'Apr', payroll: 1230000, benefits: 184500, taxes: 307500 },
    { month: 'May', payroll: 1250000, benefits: 187500, taxes: 312500 },
    { month: 'Jun', payroll: 1260000, benefits: 189000, taxes: 315000 }
  ]

  const pieChartData = [
    { name: 'Basic Salary', value: 1000000, color: '#10B981' },
    { name: 'Benefits', value: 187500, color: '#8B5CF6' },
    { name: 'Taxes', value: 312500, color: '#EF4444' },
    { name: 'Deductions', value: 75000, color: '#F59E0B' }
  ]

  const tabs = [
    { id: 'overview', name: 'Payroll Overview', icon: BarChart3 },
    { id: 'salary-structure', name: 'Salary Structure', icon: TargetIcon },
    { id: 'processing', name: 'Payroll Processing', icon: Calculator },
    { id: 'tax', name: 'Tax Management', icon: ShieldIcon },
    { id: 'benefits', name: 'Benefits & Deductions', icon: Award },
    { id: 'payslips', name: 'Payslips', icon: Receipt },
    { id: 'reimbursements', name: 'Reimbursements', icon: CreditCardIcon },
    { id: 'reports', name: 'Payroll Reports', icon: FileTextIcon },
    { id: 'year-end', name: 'Year End Processing', icon: CalendarIcon }
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Payroll</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {loading ? '...' : formatCurrency(payrollData.totalPayroll)}
                    </p>
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
                    <p className="text-2xl font-bold text-blue-600">
                      {loading ? '...' : formatCurrency(payrollData.averageSalary)}
                    </p>
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
                    <p className="text-2xl font-bold text-purple-600">
                      {loading ? '...' : formatCurrency(payrollData.totalBenefits)}
                    </p>
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
                    <p className="text-2xl font-bold text-red-600">
                      {loading ? '...' : formatCurrency(payrollData.totalTaxes)}
                    </p>
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
                    <p className="text-2xl font-bold text-yellow-600">
                      {loading ? '...' : formatCurrency(payrollData.totalDeductions)}
                    </p>
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
                    <p className="text-2xl font-bold text-green-600">
                      {loading ? '...' : formatCurrency(payrollData.totalPayroll - payrollData.totalTaxes - payrollData.totalDeductions)}
                    </p>
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
          </div>
        )
      case 'salary-structure':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Salary Structure Management</h3>
              <p className="text-gray-600">Configure and manage employee salary structures, pay grades, and compensation plans.</p>
              <div className="mt-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Manage Salary Structure
                </button>
              </div>
            </div>
          </div>
        )
      case 'processing':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payroll Processing</h3>
              <p className="text-gray-600">Process payroll for current month, calculate salaries, taxes, and generate payslips.</p>
              <div className="mt-4">
                <Link href="/payroll/process" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 inline-block">
                  Process Payroll
                </Link>
              </div>
            </div>
          </div>
        )
      case 'tax':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax Management</h3>
              <p className="text-gray-600">Handle tax calculations, deductions, and compliance for all employees.</p>
              <div className="mt-4">
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                  Manage Taxes
                </button>
              </div>
            </div>
          </div>
        )
      case 'benefits':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Benefits & Deductions</h3>
              <p className="text-gray-600">Manage employee benefits, insurance, and salary deductions.</p>
              <div className="mt-4">
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                  Manage Benefits
                </button>
              </div>
            </div>
          </div>
        )
      case 'payslips':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payslips</h3>
              <p className="text-gray-600">View, generate, and manage employee payslips and salary statements.</p>
              <div className="mt-4">
                <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">
                  View Payslips
                </button>
              </div>
            </div>
          </div>
        )
      case 'reimbursements':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Reimbursements</h3>
              <p className="text-gray-600">Process and manage employee expense reimbursements and claims.</p>
              <div className="mt-4">
                <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700">
                  Manage Reimbursements
                </button>
              </div>
            </div>
          </div>
        )
      case 'reports':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payroll Reports</h3>
              <p className="text-gray-600">Generate comprehensive payroll reports and analytics.</p>
              <div className="mt-4">
                <button className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700">
                  Generate Reports
                </button>
              </div>
            </div>
          </div>
        )
      case 'year-end':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Year End Processing</h3>
              <p className="text-gray-600">Handle year-end payroll processing, tax filings, and annual reports.</p>
              <div className="mt-4">
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                  Year End Processing
                </button>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payroll Management</h1>
          <p className="text-gray-600">Comprehensive payroll processing and financial management system</p>
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

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  )
} 
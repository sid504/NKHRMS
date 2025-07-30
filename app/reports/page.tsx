'use client'

import { useState } from 'react'
import { 
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Eye,
  FileText,
  PieChart,
  Activity,
  Target,
  Award
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts'

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [selectedDepartment, setSelectedDepartment] = useState('all')

  // Mock data for charts
  const employeeGrowthData = [
    { month: 'Jan', employees: 120, newHires: 8, terminations: 2 },
    { month: 'Feb', employees: 125, newHires: 6, terminations: 1 },
    { month: 'Mar', employees: 132, newHires: 10, terminations: 3 },
    { month: 'Apr', employees: 138, newHires: 9, terminations: 3 },
    { month: 'May', employees: 145, newHires: 12, terminations: 5 },
    { month: 'Jun', employees: 150, newHires: 8, terminations: 3 },
    { month: 'Jul', employees: 155, newHires: 7, terminations: 2 },
    { month: 'Aug', employees: 160, newHires: 9, terminations: 4 },
    { month: 'Sep', employees: 165, newHires: 8, terminations: 3 },
    { month: 'Oct', employees: 170, newHires: 10, terminations: 5 },
    { month: 'Nov', employees: 175, newHires: 7, terminations: 2 },
    { month: 'Dec', employees: 180, newHires: 8, terminations: 3 }
  ]

  const departmentData = [
    { name: 'Engineering', employees: 45, budget: 2500000, turnover: 8 },
    { name: 'Sales', employees: 35, budget: 1800000, turnover: 12 },
    { name: 'Marketing', employees: 25, budget: 1200000, turnover: 6 },
    { name: 'HR', employees: 15, budget: 800000, turnover: 4 },
    { name: 'Finance', employees: 20, budget: 1000000, turnover: 5 },
    { name: 'Operations', employees: 30, budget: 1500000, turnover: 10 },
    { name: 'Design', employees: 10, budget: 600000, turnover: 3 }
  ]

  const performanceData = [
    { rating: '5 - Excellent', count: 25, percentage: 15 },
    { rating: '4 - Good', count: 85, percentage: 50 },
    { rating: '3 - Average', count: 45, percentage: 27 },
    { rating: '2 - Below Average', count: 10, percentage: 6 },
    { rating: '1 - Poor', count: 5, percentage: 2 }
  ]

  const attendanceData = [
    { month: 'Jan', present: 95, absent: 3, late: 2 },
    { month: 'Feb', present: 94, absent: 4, late: 2 },
    { month: 'Mar', present: 96, absent: 2, late: 2 },
    { month: 'Apr', present: 93, absent: 5, late: 2 },
    { month: 'May', present: 95, absent: 3, late: 2 },
    { month: 'Jun', present: 97, absent: 1, late: 2 }
  ]

  const salaryData = [
    { range: '30-50k', count: 25 },
    { range: '50-70k', count: 45 },
    { range: '70-90k', count: 35 },
    { range: '90-110k', count: 20 },
    { range: '110k+', count: 15 }
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

  const reports = [
    {
      id: 1,
      name: 'Employee Turnover Report',
      type: 'Monthly',
      lastGenerated: '2024-01-15',
      status: 'Ready',
      size: '2.3 MB'
    },
    {
      id: 2,
      name: 'Payroll Summary Report',
      type: 'Monthly',
      lastGenerated: '2024-01-10',
      status: 'Ready',
      size: '1.8 MB'
    },
    {
      id: 3,
      name: 'Performance Review Summary',
      type: 'Quarterly',
      lastGenerated: '2024-01-01',
      status: 'Ready',
      size: '3.1 MB'
    },
    {
      id: 4,
      name: 'Recruitment Pipeline Report',
      type: 'Weekly',
      lastGenerated: '2024-01-14',
      status: 'Processing',
      size: '1.2 MB'
    },
    {
      id: 5,
      name: 'Training Completion Report',
      type: 'Monthly',
      lastGenerated: '2024-01-12',
      status: 'Ready',
      size: '0.9 MB'
    }
  ]

  const metrics = [
    {
      title: 'Total Employees',
      value: '180',
      change: '+5',
      changeType: 'positive',
      icon: Users
    },
    {
      title: 'Average Salary',
      value: '$75,000',
      change: '+2.5%',
      changeType: 'positive',
      icon: DollarSign
    },
    {
      title: 'Turnover Rate',
      value: '8.2%',
      change: '-1.3%',
      changeType: 'positive',
      icon: TrendingUp
    },
    {
      title: 'Attendance Rate',
      value: '95.2%',
      change: '+0.8%',
      changeType: 'positive',
      icon: Calendar
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-sm text-gray-600">Comprehensive HR insights and metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Departments</option>
            <option value="engineering">Engineering</option>
            <option value="sales">Sales</option>
            <option value="marketing">Marketing</option>
            <option value="hr">HR</option>
            <option value="finance">Finance</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <p className={`text-sm font-medium ${
                  metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change} from last period
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <metric.icon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Employee Growth */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Employee Growth</h3>
            <button className="text-blue-600 hover:text-blue-800">
              <Download className="h-4 w-4" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={employeeGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="employees" stackId="1" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Department Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Department Distribution</h3>
            <button className="text-blue-600 hover:text-blue-800">
              <Download className="h-4 w-4" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name} ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="employees"
              >
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Performance Distribution</h3>
            <button className="text-blue-600 hover:text-blue-800">
              <Download className="h-4 w-4" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="rating" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Attendance Trends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Attendance Trends</h3>
            <button className="text-blue-600 hover:text-blue-800">
              <Download className="h-4 w-4" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="present" stroke="#8884d8" strokeWidth={2} />
              <Line type="monotone" dataKey="absent" stroke="#ff7300" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Department Performance Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Department Performance</h3>
          <button className="text-blue-600 hover:text-blue-800">
            <Download className="h-4 w-4" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employees
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Budget
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Turnover Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {departmentData.map((dept, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                      <span className="ml-3 text-sm font-medium text-gray-900">{dept.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {dept.employees}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${(dept.budget / 1000000).toFixed(1)}M
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      dept.turnover < 5 ? 'bg-green-100 text-green-800' :
                      dept.turnover < 10 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {dept.turnover}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-blue-600 hover:text-blue-900">
                      <Download className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generated Reports */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Generated Reports</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Generate New Report
          </button>
        </div>
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{report.name}</h4>
                  <p className="text-sm text-gray-500">
                    {report.type} • Last generated: {report.lastGenerated} • {report.size}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  report.status === 'Ready' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {report.status}
                </span>
                <button className="text-blue-600 hover:text-blue-800">
                  <Download className="h-4 w-4" />
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 
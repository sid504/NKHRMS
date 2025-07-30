'use client'

import { useState } from 'react'
import { 
  Heart,
  Plus,
  Search,
  Filter,
  Shield,
  DollarSign,
  Calendar,
  Users,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  FileText,
  Download,
  Edit,
  Trash2,
  Eye,
  Star,
  Clock
} from 'lucide-react'

export default function BenefitsPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Mock benefits data
  const benefits = [
    {
      id: 1,
      name: 'Health Insurance - Premium Plan',
      category: 'Health',
      provider: 'Blue Cross Blue Shield',
      type: 'Insurance',
      cost: '$450/month',
      employeeContribution: '$50/month',
      companyContribution: '$400/month',
      coverage: 'Family',
      status: 'active',
      enrollmentPeriod: 'Open',
      description: 'Comprehensive health insurance covering medical, dental, and vision for employees and their families.',
      features: [
        'Medical coverage up to $1M',
        'Dental coverage',
        'Vision coverage',
        'Prescription drug coverage',
        'Mental health services'
      ],
      participants: 145,
      maxParticipants: 200
    },
    {
      id: 2,
      name: '401(k) Retirement Plan',
      category: 'Retirement',
      provider: 'Fidelity Investments',
      type: 'Retirement',
      cost: '6% match',
      employeeContribution: '3-6% of salary',
      companyContribution: 'Up to 6% match',
      coverage: 'Individual',
      status: 'active',
      enrollmentPeriod: 'Always Open',
      description: '401(k) retirement plan with company matching up to 6% of employee contributions.',
      features: [
        'Traditional 401(k)',
        'Roth 401(k) option',
        'Company match up to 6%',
        'Vesting after 3 years',
        'Investment options'
      ],
      participants: 180,
      maxParticipants: 200
    },
    {
      id: 3,
      name: 'Life Insurance',
      category: 'Insurance',
      provider: 'MetLife',
      type: 'Insurance',
      cost: '$25/month',
      employeeContribution: '$0/month',
      companyContribution: '$25/month',
      coverage: '2x Annual Salary',
      status: 'active',
      enrollmentPeriod: 'Open',
      description: 'Basic life insurance coverage equal to 2x annual salary, fully paid by the company.',
      features: [
        '2x annual salary coverage',
        'Accidental death benefit',
        'Disability coverage',
        'Family coverage option'
      ],
      participants: 180,
      maxParticipants: 200
    },
    {
      id: 4,
      name: 'Flexible Spending Account (FSA)',
      category: 'Health',
      provider: 'WageWorks',
      type: 'Account',
      cost: 'Pre-tax deduction',
      employeeContribution: 'Up to $2,750/year',
      companyContribution: '$0',
      coverage: 'Individual',
      status: 'active',
      enrollmentPeriod: 'Annual',
      description: 'Pre-tax flexible spending account for healthcare and dependent care expenses.',
      features: [
        'Pre-tax contributions',
        'Healthcare FSA',
        'Dependent care FSA',
        'Use-it-or-lose-it policy',
        'Online account management'
      ],
      participants: 89,
      maxParticipants: 200
    }
  ]

  const enrollments = [
    {
      id: 1,
      employeeName: 'John Doe',
      benefitName: 'Health Insurance - Premium Plan',
      enrollmentDate: '2024-01-15',
      status: 'Active',
      coverage: 'Family',
      monthlyCost: '$50',
      nextReview: '2024-12-15'
    },
    {
      id: 2,
      employeeName: 'Sarah Wilson',
      benefitName: '401(k) Retirement Plan',
      enrollmentDate: '2024-01-20',
      status: 'Active',
      coverage: 'Individual',
      monthlyCost: '$300',
      nextReview: '2024-12-20'
    },
    {
      id: 3,
      employeeName: 'Mike Johnson',
      benefitName: 'Life Insurance',
      enrollmentDate: '2024-01-25',
      status: 'Active',
      coverage: '2x Annual Salary',
      monthlyCost: '$0',
      nextReview: '2024-12-25'
    }
  ]

  const categories = ['all', 'Health', 'Retirement', 'Insurance', 'Wellness', 'Other']

  const filteredBenefits = benefits.filter(benefit => {
    const matchesSearch = benefit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         benefit.provider.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || benefit.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800'
      case 'Inactive':
        return 'bg-gray-100 text-gray-800'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Health':
        return 'bg-blue-100 text-blue-800'
      case 'Retirement':
        return 'bg-green-100 text-green-800'
      case 'Insurance':
        return 'bg-purple-100 text-purple-800'
      case 'Wellness':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Benefits Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-500 text-white">
              <Heart className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Benefits</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-500 text-white">
              <Users className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Enrolled Employees</p>
              <p className="text-2xl font-bold text-gray-900">180</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-500 text-white">
              <DollarSign className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Monthly Cost</p>
              <p className="text-2xl font-bold text-gray-900">$45K</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-orange-500 text-white">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Enrollment Rate</p>
              <p className="text-2xl font-bold text-gray-900">90%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBenefits.map((benefit) => (
          <div key={benefit.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(benefit.category)}`}>
                      {benefit.category}
                    </span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(benefit.status)}`}>
                      {benefit.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{benefit.description}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Provider:</span>
                  <span className="text-sm font-medium text-gray-900">{benefit.provider}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Cost:</span>
                  <span className="text-sm font-medium text-gray-900">{benefit.cost}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Coverage:</span>
                  <span className="text-sm font-medium text-gray-900">{benefit.coverage}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Participants:</span>
                  <span className="text-sm font-medium text-gray-900">{benefit.participants}/{benefit.maxParticipants}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center mr-2">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderEnrollments = () => (
    <div className="space-y-6">
      {/* Enrollment Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Benefit Enrollments</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Benefit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Coverage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Monthly Cost
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Review
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {enrollments.map((enrollment) => (
                <tr key={enrollment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{enrollment.employeeName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{enrollment.benefitName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(enrollment.status)}`}>
                      {enrollment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {enrollment.coverage}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {enrollment.monthlyCost}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(enrollment.nextReview).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderReports = () => (
    <div className="space-y-6">
      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-lg bg-blue-100">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Benefits Summary</h3>
              <p className="text-sm text-gray-600">Monthly benefits report</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Last Generated:</span>
              <span className="text-sm font-medium text-gray-900">Jan 15, 2024</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Size:</span>
              <span className="text-sm font-medium text-gray-900">2.3 MB</span>
            </div>
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center">
              <Download className="h-4 w-4 mr-2" />
              Download
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-lg bg-green-100">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Enrollment Report</h3>
              <p className="text-sm text-gray-600">Employee enrollment status</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Last Generated:</span>
              <span className="text-sm font-medium text-gray-900">Jan 20, 2024</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Size:</span>
              <span className="text-sm font-medium text-gray-900">1.8 MB</span>
            </div>
            <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center">
              <Download className="h-4 w-4 mr-2" />
              Download
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-lg bg-purple-100">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Cost Analysis</h3>
              <p className="text-sm text-gray-600">Benefits cost breakdown</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Last Generated:</span>
              <span className="text-sm font-medium text-gray-900">Jan 25, 2024</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Size:</span>
              <span className="text-sm font-medium text-gray-900">3.1 MB</span>
            </div>
            <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center justify-center">
              <Download className="h-4 w-4 mr-2" />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Benefits Management</h1>
          <p className="text-sm text-gray-600">Manage employee benefits and insurance plans</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Add Benefit
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search benefits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Filter className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Heart className="h-4 w-4 mr-2" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('enrollments')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'enrollments'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Users className="h-4 w-4 mr-2" />
              Enrollments
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'reports'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FileText className="h-4 w-4 mr-2" />
              Reports
            </button>
          </nav>
        </div>
        <div className="p-6">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'enrollments' && renderEnrollments()}
          {activeTab === 'reports' && renderReports()}
        </div>
      </div>
    </div>
  )
} 
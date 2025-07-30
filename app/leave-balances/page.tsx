'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../contexts/AuthContext'
import { 
  Calendar, 
  Plus, 
  Search, 
  Filter,
  Check,
  X,
  Clock,
  User,
  CalendarDays,
  Edit,
  Trash2,
  AlertCircle,
  Info,
  Baby,
  Heart,
  GraduationCap,
  Briefcase
} from 'lucide-react'

export default function LeaveBalancesPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [showAddBalanceModal, setShowAddBalanceModal] = useState(false)
  const [showSpecialLeaveModal, setShowSpecialLeaveModal] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null)

  // Mock employee leave balances data
  const employeeBalances = [
    {
      id: 'EMP001',
      name: 'John Doe',
      email: 'john.doe@nkhr.com',
      department: 'Engineering',
      position: 'Senior Software Engineer',
      manager: 'Sarah Wilson',
      balances: {
        vacation: { total: 25, used: 12, remaining: 13, expiry: '2024-12-31' },
        sick: { total: 15, used: 3, remaining: 12, expiry: '2024-12-31' },
        personal: { total: 10, used: 2, remaining: 8, expiry: '2024-12-31' },
        maternity: { total: 0, used: 0, remaining: 0, expiry: null },
        paternity: { total: 0, used: 0, remaining: 0, expiry: null },
        bereavement: { total: 5, used: 0, remaining: 5, expiry: '2024-12-31' }
      },
      specialLeaves: []
    },
    {
      id: 'EMP002',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@nkhr.com',
      department: 'Engineering',
      position: 'Engineering Manager',
      manager: 'Admin User',
      balances: {
        vacation: { total: 30, used: 8, remaining: 22, expiry: '2024-12-31' },
        sick: { total: 20, used: 1, remaining: 19, expiry: '2024-12-31' },
        personal: { total: 15, used: 3, remaining: 12, expiry: '2024-12-31' },
        maternity: { total: 0, used: 0, remaining: 0, expiry: null },
        paternity: { total: 0, used: 0, remaining: 0, expiry: null },
        bereavement: { total: 5, used: 0, remaining: 5, expiry: '2024-12-31' }
      },
      specialLeaves: []
    },
    {
      id: 'EMP003',
      name: 'Mike Johnson',
      email: 'mike.johnson@nkhr.com',
      department: 'Sales',
      position: 'Sales Representative',
      manager: 'Admin User',
      balances: {
        vacation: { total: 20, used: 15, remaining: 5, expiry: '2024-12-31' },
        sick: { total: 15, used: 5, remaining: 10, expiry: '2024-12-31' },
        personal: { total: 10, used: 8, remaining: 2, expiry: '2024-12-31' },
        maternity: { total: 0, used: 0, remaining: 0, expiry: null },
        paternity: { total: 0, used: 0, remaining: 0, expiry: null },
        bereavement: { total: 5, used: 0, remaining: 5, expiry: '2024-12-31' }
      },
      specialLeaves: []
    },
    {
      id: 'EMP004',
      name: 'Alice Brown',
      email: 'alice.brown@nkhr.com',
      department: 'Marketing',
      position: 'Marketing Specialist',
      manager: 'Admin User',
      balances: {
        vacation: { total: 25, used: 5, remaining: 20, expiry: '2024-12-31' },
        sick: { total: 15, used: 2, remaining: 13, expiry: '2024-12-31' },
        personal: { total: 10, used: 1, remaining: 9, expiry: '2024-12-31' },
        maternity: { total: 90, used: 0, remaining: 90, expiry: '2025-06-30' },
        paternity: { total: 0, used: 0, remaining: 0, expiry: null },
        bereavement: { total: 5, used: 0, remaining: 5, expiry: '2024-12-31' }
      },
      specialLeaves: [
        {
          type: 'Maternity Leave',
          days: 90,
          startDate: '2025-01-01',
          endDate: '2025-06-30',
          reason: 'Pregnancy and childbirth',
          status: 'Approved'
        }
      ]
    }
  ]

  const leaveTypes = [
    { key: 'vacation', name: 'Vacation', icon: Calendar, color: 'bg-blue-100 text-blue-800' },
    { key: 'sick', name: 'Sick Leave', icon: Heart, color: 'bg-red-100 text-red-800' },
    { key: 'personal', name: 'Personal Leave', icon: User, color: 'bg-purple-100 text-purple-800' },
    { key: 'maternity', name: 'Maternity Leave', icon: Baby, color: 'bg-pink-100 text-pink-800' },
    { key: 'paternity', name: 'Paternity Leave', icon: Baby, color: 'bg-indigo-100 text-indigo-800' },
    { key: 'bereavement', name: 'Bereavement', icon: Heart, color: 'bg-gray-100 text-gray-800' }
  ]

  const departments = ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations']

  const filteredEmployees = employeeBalances.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment
    
    return matchesSearch && matchesDepartment
  })

  const getBalanceStatus = (remaining: number, total: number) => {
    const percentage = (remaining / total) * 100
    if (percentage <= 20) return 'bg-red-100 text-red-800'
    if (percentage <= 50) return 'bg-yellow-100 text-yellow-800'
    return 'bg-green-100 text-green-800'
  }

  const handleAddBalance = (employeeId: string, leaveType: string, days: number, expiryDate: string) => {
    // Mock function - in real app, this would update the database
    console.log('Adding balance:', { employeeId, leaveType, days, expiryDate })
    setShowAddBalanceModal(false)
  }

  const handleAssignSpecialLeave = (employeeId: string, leaveType: string, days: number, startDate: string, endDate: string, reason: string) => {
    // Mock function - in real app, this would update the database
    console.log('Assigning special leave:', { employeeId, leaveType, days, startDate, endDate, reason })
    setShowSpecialLeaveModal(false)
  }

  // Only show this page for admin users
  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">Only administrators can access leave balance management.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leave Management</h1>
          <p className="text-gray-600">HR Management: Manage employee leave balances, assign special leaves, and oversee leave policies</p>
        </div>
        <div className="flex space-x-3">
          <Link
            href="/leave-requests"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
          >
            <Calendar className="h-4 w-4 mr-2" />
            View Team Requests
          </Link>
          <button
            onClick={() => setShowSpecialLeaveModal(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Assign Special Leave
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">{employeeBalances.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Balances</p>
              <p className="text-2xl font-bold text-gray-900">
                {employeeBalances.reduce((acc, emp) => acc + Object.values(emp.balances).filter(b => b.remaining > 0).length, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
              <p className="text-2xl font-bold text-gray-900">
                {employeeBalances.reduce((acc, emp) => {
                  const expiring = Object.values(emp.balances).filter(b => 
                    b.expiry && new Date(b.expiry) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                  ).length
                  return acc + expiring
                }, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Baby className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Special Leaves</p>
              <p className="text-2xl font-bold text-gray-900">
                {employeeBalances.reduce((acc, emp) => acc + emp.specialLeaves.length, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="md:w-48">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Employee Balances Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Employee Leave Balances ({filteredEmployees.length} employees)
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vacation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sick Leave
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Personal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Special Leaves
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                        <span className="text-sm font-medium text-white">
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{employee.department}</div>
                    <div className="text-sm text-gray-500">{employee.position}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getBalanceStatus(employee.balances.vacation.remaining, employee.balances.vacation.total)}`}>
                      {employee.balances.vacation.remaining}/{employee.balances.vacation.total}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getBalanceStatus(employee.balances.sick.remaining, employee.balances.sick.total)}`}>
                      {employee.balances.sick.remaining}/{employee.balances.sick.total}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getBalanceStatus(employee.balances.personal.remaining, employee.balances.personal.total)}`}>
                      {employee.balances.personal.remaining}/{employee.balances.personal.total}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {employee.specialLeaves.length > 0 ? (
                        <div className="space-y-1">
                          {employee.specialLeaves.map((leave, index) => (
                            <div key={index} className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                              {leave.type}: {leave.days} days
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-500">None</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedEmployee(employee)
                          setShowAddBalanceModal(true)
                        }}
                        className="text-blue-600 hover:text-blue-900"
                        title="Add Balance"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedEmployee(employee)
                          setShowSpecialLeaveModal(true)
                        }}
                        className="text-purple-600 hover:text-purple-900"
                        title="Assign Special Leave"
                      >
                        <Baby className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Balance Modal */}
      {showAddBalanceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add Leave Balance</h3>
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              handleAddBalance(
                selectedEmployee.id,
                formData.get('leaveType') as string,
                parseInt(formData.get('days') as string),
                formData.get('expiryDate') as string
              )
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employee
                  </label>
                  <input
                    type="text"
                    value={selectedEmployee?.name || ''}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Leave Type
                  </label>
                  <select
                    name="leaveType"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {leaveTypes.map(type => (
                      <option key={type.key} value={type.key}>{type.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Days to Add
                  </label>
                  <input
                    type="number"
                    name="days"
                    min="1"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    name="expiryDate"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddBalanceModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Balance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign Special Leave Modal */}
      {showSpecialLeaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Assign Special Leave</h3>
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              handleAssignSpecialLeave(
                selectedEmployee?.id || '',
                formData.get('leaveType') as string,
                parseInt(formData.get('days') as string),
                formData.get('startDate') as string,
                formData.get('endDate') as string,
                formData.get('reason') as string
              )
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employee
                  </label>
                  <input
                    type="text"
                    value={selectedEmployee?.name || ''}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Leave Type
                  </label>
                  <select
                    name="leaveType"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Maternity Leave">Maternity Leave</option>
                    <option value="Paternity Leave">Paternity Leave</option>
                    <option value="Study Leave">Study Leave</option>
                    <option value="Sabbatical">Sabbatical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Days
                  </label>
                  <input
                    type="number"
                    name="days"
                    min="1"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reason
                  </label>
                  <textarea
                    name="reason"
                    rows={3}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter the reason for this special leave..."
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowSpecialLeaveModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Assign Leave
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
} 
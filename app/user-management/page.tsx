'use client'

import { useState } from 'react'
import { 
  Users,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Shield,
  User,
  Lock,
  Unlock,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  AlertCircle,
  MoreVertical,
  Key,
  Settings
} from 'lucide-react'

export default function UserManagementPage() {
  const [activeTab, setActiveTab] = useState('users')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  // Mock users data
  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@nkhr.com',
      phone: '+1 (555) 123-4567',
      role: 'employee',
      department: 'Engineering',
      position: 'Senior Software Engineer',
      status: 'active',
      lastLogin: '2024-01-15T10:30:00Z',
      createdAt: '2022-01-15',
      permissions: ['profile', 'attendance', 'leave', 'payroll', 'benefits', 'training', 'documents'],
      avatar: null
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@nkhr.com',
      phone: '+1 (555) 234-5678',
      role: 'manager',
      department: 'Engineering',
      position: 'Engineering Manager',
      status: 'active',
      lastLogin: '2024-01-15T09:15:00Z',
      createdAt: '2021-03-20',
      permissions: ['profile', 'attendance', 'leave', 'payroll', 'benefits', 'training', 'documents', 'team_management', 'performance_reviews'],
      avatar: null
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@nkhr.com',
      phone: '+1 (555) 345-6789',
      role: 'admin',
      department: 'Human Resources',
      position: 'HR Manager',
      status: 'active',
      lastLogin: '2024-01-15T08:45:00Z',
      createdAt: '2020-06-10',
      permissions: ['all'],
      avatar: null
    },
    {
      id: 4,
      name: 'Lisa Rodriguez',
      email: 'lisa.rodriguez@nkhr.com',
      phone: '+1 (555) 456-7890',
      role: 'employee',
      department: 'Marketing',
      position: 'Marketing Specialist',
      status: 'inactive',
      lastLogin: '2024-01-10T16:20:00Z',
      createdAt: '2023-02-15',
      permissions: ['profile', 'attendance', 'leave', 'payroll', 'benefits'],
      avatar: null
    },
    {
      id: 5,
      name: 'David Lee',
      email: 'david.lee@nkhr.com',
      phone: '+1 (555) 567-8901',
      role: 'manager',
      department: 'Sales',
      position: 'Sales Manager',
      status: 'active',
      lastLogin: '2024-01-15T11:00:00Z',
      createdAt: '2021-08-05',
      permissions: ['profile', 'attendance', 'leave', 'payroll', 'benefits', 'training', 'documents', 'team_management', 'performance_reviews', 'reports'],
      avatar: null
    }
  ]

  // Mock roles data
  const roles = [
    {
      id: 'employee',
      name: 'Employee',
      description: 'Basic employee access to personal information and limited modules',
      permissions: ['profile', 'attendance', 'leave', 'payroll', 'benefits', 'training', 'documents'],
      userCount: 45
    },
    {
      id: 'manager',
      name: 'Manager',
      description: 'Team management access with additional reporting and approval capabilities',
      permissions: ['profile', 'attendance', 'leave', 'payroll', 'benefits', 'training', 'documents', 'team_management', 'performance_reviews', 'reports'],
      userCount: 12
    },
    {
      id: 'admin',
      name: 'Administrator',
      description: 'Full system access with user management and configuration capabilities',
      permissions: ['all'],
      userCount: 3
    },
    {
      id: 'hr_specialist',
      name: 'HR Specialist',
      description: 'HR-specific access for managing employee records and processes',
      permissions: ['profile', 'attendance', 'leave', 'payroll', 'benefits', 'training', 'documents', 'employee_management', 'reports'],
      userCount: 5
    }
  ]

  const permissions = [
    { id: 'profile', name: 'Profile Management', description: 'View and edit personal profile' },
    { id: 'attendance', name: 'Attendance', description: 'View attendance records and time tracking' },
    { id: 'leave', name: 'Leave Management', description: 'Request and manage leave applications' },
    { id: 'payroll', name: 'Payroll', description: 'View payslips and salary information' },
    { id: 'benefits', name: 'Benefits', description: 'Access benefits information and enrollment' },
    { id: 'training', name: 'Training', description: 'Access training courses and materials' },
    { id: 'documents', name: 'Documents', description: 'Access and manage documents' },
    { id: 'team_management', name: 'Team Management', description: 'Manage team members and assignments' },
    { id: 'performance_reviews', name: 'Performance Reviews', description: 'Conduct and manage performance reviews' },
    { id: 'reports', name: 'Reports', description: 'Generate and view reports' },
    { id: 'employee_management', name: 'Employee Management', description: 'Manage employee records and information' },
    { id: 'user_management', name: 'User Management', description: 'Manage user accounts and permissions' },
    { id: 'system_settings', name: 'System Settings', description: 'Configure system settings and preferences' }
  ]

  const rolesList = ['all', 'employee', 'manager', 'admin', 'hr_specialist']
  const statusList = ['all', 'active', 'inactive']

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === 'all' || user.role === selectedRole
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      case 'suspended':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800'
      case 'manager':
        return 'bg-purple-100 text-purple-800'
      case 'hr_specialist':
        return 'bg-blue-100 text-blue-800'
      case 'employee':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatLastLogin = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) {
      return 'Just now'
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  const renderUsers = () => (
    <div className="space-y-6">
      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                        <span className="text-white font-medium">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                        <div className="text-sm text-gray-500">{user.position}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatLastLogin(user.lastLogin)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="h-4 w-4" />
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

  const renderRoles = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <div key={role.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">{role.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{role.userCount} users</span>
                  <span>{role.permissions.length} permissions</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-900">Permissions:</h4>
              <div className="flex flex-wrap gap-2">
                {role.permissions.slice(0, 5).map((permission) => (
                  <span
                    key={permission}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {permission}
                  </span>
                ))}
                {role.permissions.length > 5 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{role.permissions.length - 5} more
                  </span>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center mr-2">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Role
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderPermissions = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">System Permissions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {permissions.map((permission) => (
            <div key={permission.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">{permission.name}</h4>
                  <p className="text-sm text-gray-600">{permission.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-sm text-gray-600">Manage user accounts, roles, and permissions</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Add User
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
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {rolesList.map(role => (
                <option key={role} value={role}>
                  {role === 'all' ? 'All Roles' : role.charAt(0).toUpperCase() + role.slice(1)}
                </option>
              ))}
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statusList.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
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
              onClick={() => setActiveTab('users')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Users className="h-4 w-4 mr-2" />
              Users
            </button>
            <button
              onClick={() => setActiveTab('roles')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'roles'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Shield className="h-4 w-4 mr-2" />
              Roles
            </button>
            <button
              onClick={() => setActiveTab('permissions')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'permissions'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Key className="h-4 w-4 mr-2" />
              Permissions
            </button>
          </nav>
        </div>
        <div className="p-6">
          {activeTab === 'users' && renderUsers()}
          {activeTab === 'roles' && renderRoles()}
          {activeTab === 'permissions' && renderPermissions()}
        </div>
      </div>
    </div>
  )
} 
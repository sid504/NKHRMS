'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Briefcase, 
  Search, 
  Filter,
  Plus,
  Eye,
  Calendar,
  Users,
  TrendingUp,
  MapPin
} from 'lucide-react'

export default function RecruitmentPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  // Mock job postings data
  const jobPostings = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'New York, NY',
      type: 'Full-time',
      experience: '5+ years',
      salary: '$120,000 - $150,000',
      applications: 45,
      status: 'Active',
      postedDate: '2024-01-10',
      deadline: '2024-02-10'
    },
    {
      id: 2,
      title: 'Marketing Manager',
      department: 'Marketing',
      location: 'San Francisco, CA',
      type: 'Full-time',
      experience: '3+ years',
      salary: '$90,000 - $110,000',
      applications: 32,
      status: 'Active',
      postedDate: '2024-01-15',
      deadline: '2024-02-15'
    },
    {
      id: 3,
      title: 'Sales Representative',
      department: 'Sales',
      location: 'Chicago, IL',
      type: 'Full-time',
      experience: '2+ years',
      salary: '$60,000 - $80,000',
      applications: 28,
      status: 'Active',
      postedDate: '2024-01-20',
      deadline: '2024-02-20'
    },
    {
      id: 4,
      title: 'HR Specialist',
      department: 'Human Resources',
      location: 'Remote',
      type: 'Full-time',
      experience: '3+ years',
      salary: '$70,000 - $85,000',
      applications: 18,
      status: 'Active',
      postedDate: '2024-01-25',
      deadline: '2024-02-25'
    },
    {
      id: 5,
      title: 'Product Designer',
      department: 'Design',
      location: 'Austin, TX',
      type: 'Full-time',
      experience: '4+ years',
      salary: '$100,000 - $130,000',
      applications: 22,
      status: 'Active',
      postedDate: '2024-02-01',
      deadline: '2024-03-01'
    }
  ]

  // Mock recent applications data
  const recentApplications = [
    {
      id: 1,
      candidateName: 'Alex Johnson',
      position: 'Senior Software Engineer',
      appliedDate: '2024-01-28',
      status: 'Under Review',
      experience: '6 years',
      location: 'New York, NY'
    },
    {
      id: 2,
      candidateName: 'Maria Garcia',
      position: 'Marketing Manager',
      appliedDate: '2024-01-27',
      status: 'Interview Scheduled',
      experience: '4 years',
      location: 'San Francisco, CA'
    },
    {
      id: 3,
      candidateName: 'David Chen',
      position: 'Sales Representative',
      appliedDate: '2024-01-26',
      status: 'Rejected',
      experience: '1 year',
      location: 'Chicago, IL'
    },
    {
      id: 4,
      candidateName: 'Sarah Williams',
      position: 'HR Specialist',
      appliedDate: '2024-01-25',
      status: 'Under Review',
      experience: '3 years',
      location: 'Remote'
    }
  ]

  const departments = ['Engineering', 'Marketing', 'Sales', 'Human Resources', 'Design', 'Finance']
  const statuses = ['Active', 'Paused', 'Closed', 'Draft']

  const filteredJobs = jobPostings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment
    const matchesStatus = selectedStatus === 'all' || job.status === selectedStatus
    
    return matchesSearch && matchesDepartment && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800'
      case 'Paused':
        return 'bg-yellow-100 text-yellow-800'
      case 'Closed':
        return 'bg-red-100 text-red-800'
      case 'Draft':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getApplicationStatusColor = (status: string) => {
    switch (status) {
      case 'Under Review':
        return 'bg-blue-100 text-blue-800'
      case 'Interview Scheduled':
        return 'bg-green-100 text-green-800'
      case 'Rejected':
        return 'bg-red-100 text-red-800'
      case 'Hired':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const stats = [
    {
      title: 'Active Jobs',
      value: jobPostings.filter(j => j.status === 'Active').length.toString(),
      icon: Briefcase,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Applications',
      value: jobPostings.reduce((sum, j) => sum + j.applications, 0).toString(),
      icon: Users,
      color: 'bg-green-500'
    },
    {
      title: 'Interviews This Week',
      value: '8',
      icon: Calendar,
      color: 'bg-yellow-500'
    },
    {
      title: 'Hiring Rate',
      value: '85%',
      icon: TrendingUp,
      color: 'bg-purple-500'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Recruitment</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage job postings and candidate applications
          </p>
        </div>
        <Link
          href="/recruitment/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Post New Job
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Jobs
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="by title or department..."
                />
              </div>
            </div>

            {/* Department filter */}
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <select
                id="department"
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

            {/* Status filter */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                id="status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Job postings table */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Job Postings ({filteredJobs.length} jobs)
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applications
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Posted Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {job.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {job.type} • {job.experience} • {job.salary}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {job.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                      {job.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-400 mr-1" />
                      {job.applications} applications
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(job.postedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(job.status)}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Users className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No job postings found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>

      {/* Recent applications */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Recent Applications ({recentApplications.length} applications)
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Candidate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applied Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Experience
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentApplications.map((application) => (
                <tr key={application.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                          <span className="text-white font-medium">
                            {application.candidateName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {application.candidateName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {application.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(application.appliedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.experience}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getApplicationStatusColor(application.status)}`}>
                      {application.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Calendar className="h-4 w-4" />
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
} 
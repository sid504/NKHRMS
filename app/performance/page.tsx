'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Target, 
  Search, 
  Filter,
  Star,
  TrendingUp,
  Calendar,
  User,
  Eye,
  Edit
} from 'lucide-react'

export default function PerformancePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRating, setSelectedRating] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  // Mock performance data
  const performanceReviews = [
    {
      id: 1,
      employeeName: 'John Doe',
      employeeId: 'EMP001',
      reviewer: 'Sarah Manager',
      rating: 4.5,
      reviewDate: '2024-01-15',
      nextReview: '2024-07-15',
      goals: 'Improve team collaboration and lead 2 new projects',
      status: 'Completed'
    },
    {
      id: 2,
      employeeName: 'Sarah Wilson',
      employeeId: 'EMP002',
      reviewer: 'Mike Director',
      rating: 4.8,
      reviewDate: '2024-01-20',
      nextReview: '2024-07-20',
      goals: 'Increase sales by 20% and mentor junior team members',
      status: 'Completed'
    },
    {
      id: 3,
      employeeName: 'Mike Johnson',
      employeeId: 'EMP003',
      reviewer: 'Alice HR',
      rating: 3.2,
      reviewDate: '2024-01-25',
      nextReview: '2024-04-25',
      goals: 'Improve attendance and complete required training',
      status: 'In Progress'
    },
    {
      id: 4,
      employeeName: 'Alice Brown',
      employeeId: 'EMP004',
      reviewer: 'David Manager',
      rating: 4.2,
      reviewDate: '2024-02-01',
      nextReview: '2024-08-01',
      goals: 'Streamline HR processes and implement new policies',
      status: 'Completed'
    },
    {
      id: 5,
      employeeName: 'David Lee',
      employeeId: 'EMP005',
      reviewer: 'John Director',
      rating: 4.6,
      reviewDate: '2024-02-05',
      nextReview: '2024-08-05',
      goals: 'Lead technical initiatives and improve code quality',
      status: 'Completed'
    }
  ]

  const ratings = ['5.0', '4.5', '4.0', '3.5', '3.0', '2.5', '2.0']
  const statuses = ['Completed', 'In Progress', 'Pending', 'Overdue']

  const filteredReviews = performanceReviews.filter(review => {
    const matchesSearch = review.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRating = selectedRating === 'all' || review.rating >= parseFloat(selectedRating)
    const matchesStatus = selectedStatus === 'all' || review.status === selectedStatus
    
    return matchesSearch && matchesRating && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800'
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800'
      case 'Pending':
        return 'bg-blue-100 text-blue-800'
      case 'Overdue':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600'
    if (rating >= 4.0) return 'text-blue-600'
    if (rating >= 3.5) return 'text-yellow-600'
    return 'text-red-600'
  }

  const stats = [
    {
      title: 'Average Rating',
      value: (performanceReviews.reduce((sum, r) => sum + r.rating, 0) / performanceReviews.length).toFixed(1),
      icon: Star,
      color: 'bg-yellow-500'
    },
    {
      title: 'Completed Reviews',
      value: performanceReviews.filter(r => r.status === 'Completed').length.toString(),
      icon: Target,
      color: 'bg-green-500'
    },
    {
      title: 'Pending Reviews',
      value: performanceReviews.filter(r => r.status === 'Pending').length.toString(),
      icon: Calendar,
      color: 'bg-blue-500'
    },
    {
      title: 'High Performers',
      value: performanceReviews.filter(r => r.rating >= 4.5).length.toString(),
      icon: TrendingUp,
      color: 'bg-purple-500'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Performance Management</h1>
          <p className="mt-1 text-sm text-gray-600">
            Track employee performance reviews and goals
          </p>
        </div>
        <Link
          href="/performance/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Target className="h-4 w-4 mr-2" />
          New Review
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                <stat.icon className="h-6 h-6" />
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
                Search Employees
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="by name or ID..."
                />
              </div>
            </div>

            {/* Rating filter */}
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Rating
              </label>
              <select
                id="rating"
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Ratings</option>
                {ratings.map(rating => (
                  <option key={rating} value={rating}>{rating}+ Stars</option>
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

      {/* Performance reviews table */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Performance Reviews ({filteredReviews.length} reviews)
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
                  Reviewer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Review Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Review
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
              {filteredReviews.map((review) => (
                <tr key={review.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                          <span className="text-white font-medium">
                            {review.employeeName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {review.employeeName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {review.employeeId}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {review.reviewer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`text-lg font-semibold ${getRatingColor(review.rating)}`}>
                        {review.rating}
                      </span>
                      <div className="ml-2 flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= review.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(review.reviewDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(review.nextReview).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(review.status)}`}>
                      {review.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <Target className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No performance reviews found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 
'use client'

import { useState } from 'react'
import { 
  GraduationCap,
  Plus,
  Search,
  Filter,
  Play,
  Clock,
  Users,
  Award,
  BookOpen,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Calendar,
  Star,
  Download,
  Edit,
  Trash2,
  Eye
} from 'lucide-react'

export default function TrainingPage() {
  const [activeTab, setActiveTab] = useState('courses')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Mock training data
  const courses = [
    {
      id: 1,
      title: 'Leadership Fundamentals',
      category: 'Leadership',
      instructor: 'Dr. Sarah Johnson',
      duration: '8 hours',
      level: 'Intermediate',
      rating: 4.8,
      enrolled: 45,
      maxCapacity: 50,
      price: '$299',
      status: 'active',
      description: 'Learn essential leadership skills including communication, decision-making, and team management.',
      modules: [
        { title: 'Introduction to Leadership', duration: '1 hour', completed: true },
        { title: 'Communication Skills', duration: '2 hours', completed: true },
        { title: 'Decision Making', duration: '2 hours', completed: false },
        { title: 'Team Management', duration: '3 hours', completed: false }
      ],
      startDate: '2024-02-01',
      endDate: '2024-02-28'
    },
    {
      id: 2,
      title: 'Advanced React Development',
      category: 'Technical',
      instructor: 'Mike Chen',
      duration: '12 hours',
      level: 'Advanced',
      rating: 4.9,
      enrolled: 38,
      maxCapacity: 40,
      price: '$399',
      status: 'active',
      description: 'Master advanced React concepts including hooks, context, and performance optimization.',
      modules: [
        { title: 'React Hooks Deep Dive', duration: '3 hours', completed: true },
        { title: 'Context API', duration: '2 hours', completed: true },
        { title: 'Performance Optimization', duration: '4 hours', completed: false },
        { title: 'Testing with Jest', duration: '3 hours', completed: false }
      ],
      startDate: '2024-02-15',
      endDate: '2024-03-15'
    },
    {
      id: 3,
      title: 'Project Management Essentials',
      category: 'Management',
      instructor: 'Lisa Rodriguez',
      duration: '6 hours',
      level: 'Beginner',
      rating: 4.6,
      enrolled: 52,
      maxCapacity: 60,
      price: '$199',
      status: 'active',
      description: 'Essential project management skills for successful project delivery.',
      modules: [
        { title: 'Project Planning', duration: '2 hours', completed: true },
        { title: 'Risk Management', duration: '2 hours', completed: false },
        { title: 'Stakeholder Communication', duration: '2 hours', completed: false }
      ],
      startDate: '2024-02-10',
      endDate: '2024-03-10'
    }
  ]

  const enrollments = [
    {
      id: 1,
      employeeName: 'John Doe',
      courseTitle: 'Leadership Fundamentals',
      enrollmentDate: '2024-01-15',
      progress: 75,
      status: 'in-progress',
      completionDate: null,
      certificate: null
    },
    {
      id: 2,
      employeeName: 'Sarah Wilson',
      courseTitle: 'Advanced React Development',
      enrollmentDate: '2024-01-20',
      progress: 100,
      status: 'completed',
      completionDate: '2024-02-10',
      certificate: 'CERT-001'
    },
    {
      id: 3,
      employeeName: 'Mike Johnson',
      courseTitle: 'Project Management Essentials',
      enrollmentDate: '2024-01-25',
      progress: 25,
      status: 'in-progress',
      completionDate: null,
      certificate: null
    }
  ]

  const categories = ['all', 'Leadership', 'Technical', 'Management', 'Soft Skills', 'Compliance']

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800'
      case 'not-started':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800'
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800'
      case 'Advanced':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const renderCourses = () => (
    <div className="space-y-6">
      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {course.enrolled}/{course.maxCapacity}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </span>
                    <span className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-500" />
                      {course.rating}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Instructor:</span>
                  <span className="text-sm font-medium text-gray-900">{course.instructor}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Category:</span>
                  <span className="text-sm font-medium text-gray-900">{course.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Level:</span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Price:</span>
                  <span className="text-lg font-bold text-blue-600">{course.price}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center mr-2">
                    <Play className="h-4 w-4 mr-2" />
                    Enroll
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
      {/* Enrollment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-500 text-white">
              <Users className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Enrollments</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-500 text-white">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">89</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-yellow-500 text-white">
              <Clock className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">45</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-500 text-white">
              <Award className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Certificates</p>
              <p className="text-2xl font-bold text-gray-900">67</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enrollment Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Enrollments</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Enrollment Date
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
                    <div className="text-sm text-gray-900">{enrollment.courseTitle}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${enrollment.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{enrollment.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(enrollment.status)}`}>
                      {enrollment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      {enrollment.certificate && (
                        <button className="text-green-600 hover:text-green-900">
                          <Download className="h-4 w-4" />
                        </button>
                      )}
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

  const renderCertificates = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Certificates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrollments
            .filter(e => e.certificate)
            .map((enrollment) => (
              <div key={enrollment.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Award className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-xs text-gray-500">{enrollment.certificate}</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">{enrollment.courseTitle}</h4>
                <p className="text-sm text-gray-600 mb-3">{enrollment.employeeName}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Completed: {new Date(enrollment.completionDate!).toLocaleDateString()}
                  </span>
                  <button className="text-blue-600 hover:text-blue-800">
                    <Download className="h-4 w-4" />
                  </button>
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
          <h1 className="text-2xl font-bold text-gray-900">Training Management</h1>
          <p className="text-sm text-gray-600">Manage courses, enrollments, and certifications</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Add Course
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
                placeholder="Search courses..."
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
              onClick={() => setActiveTab('courses')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'courses'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Courses
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
              onClick={() => setActiveTab('certificates')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'certificates'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Award className="h-4 w-4 mr-2" />
              Certificates
            </button>
          </nav>
        </div>
        <div className="p-6">
          {activeTab === 'courses' && renderCourses()}
          {activeTab === 'enrollments' && renderEnrollments()}
          {activeTab === 'certificates' && renderCertificates()}
        </div>
      </div>
    </div>
  )
} 
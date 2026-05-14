'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { 
  ArrowLeft,
  Edit,
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  Briefcase,
  GraduationCap,
  Award,
  FileText,
  Clock,
  DollarSign,
  TrendingUp,
  Star,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react'

export default function EmployeeDetailsPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState('overview')

  const [employee, setEmployee] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await fetch(`/api/employees/${params.id}`)
        if (res.ok) {
          const data = await res.json()
          setEmployee(data.data)
        }
      } catch (error) {
        console.error('Failed to fetch employee details:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchEmployee()
  }, [params.id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!employee) {
    notFound()
  }

  // Map backend stats if necessary or use defaults
  const skills = ['JavaScript', 'React', 'Node.js', 'TypeScript', 'Python'] // Mock for now
  const education = [
    { degree: 'Bachelor of Science in Computer Science', institution: 'MIT', year: '2020' }
  ]
  const experience = [
    { company: 'Tech Corp', position: 'Software Developer', duration: '2020-2022' }
  ]
  const performance = {
    rating: 4.5, lastReview: '2024-01-15', nextReview: '2024-07-15', goals: ['Improve team collaboration', 'Lead 2 new projects']
  }
  const attendance = { present: 95, absent: 3, late: 2, totalDays: 100 }
  const leave = { used: 15, remaining: 10, total: 25 }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'attendance', label: 'Attendance', icon: Clock },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'history', label: 'History', icon: Calendar }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800'
      case 'Inactive':
        return 'bg-gray-100 text-gray-800'
      case 'On Leave':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Full Name</label>
              <p className="text-gray-900">{employee.firstName} {employee.lastName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-gray-400 mr-2" />
                <p className="text-gray-900">{employee.user?.email || 'N/A'}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Phone</label>
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-gray-400 mr-2" />
                <p className="text-gray-900">{employee.phone || 'N/A'}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Location</label>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                <p className="text-gray-900">{employee.address || 'N/A'}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Position</label>
              <div className="flex items-center">
                <Briefcase className="h-4 w-4 text-gray-400 mr-2" />
                <p className="text-gray-900">{employee.position}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Department</label>
              <p className="text-gray-900">{employee.department}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Hire Date</label>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                <p className="text-gray-900">{new Date(employee.hireDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Manager</label>
              <p className="text-gray-900">{employee.manager?.firstName} {employee.manager?.lastName} {employee.manager ? '' : 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <GraduationCap className="h-5 w-5 mr-2" />
          Education
        </h3>
        <div className="space-y-4">
          {education.map((edu, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-medium text-gray-900">{edu.degree}</h4>
              <p className="text-gray-600">{edu.institution}</p>
              <p className="text-sm text-gray-500">{edu.year}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Award className="h-5 w-5 mr-2" />
          Work Experience
        </h3>
        <div className="space-y-4">
          {experience.map((exp, index) => (
            <div key={index} className="border-l-4 border-green-500 pl-4">
              <h4 className="font-medium text-gray-900">{exp.position}</h4>
              <p className="text-gray-600">{exp.company}</p>
              <p className="text-sm text-gray-500">{exp.duration}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderPerformance = () => (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-yellow-500 text-white">
              <Star className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Current Rating</p>
              <p className="text-2xl font-bold text-gray-900">{performance.rating}/5.0</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-500 text-white">
              <Calendar className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Last Review</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Date(performance.lastReview).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-500 text-white">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Next Review</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Date(performance.nextReview).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Goals */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Goals</h3>
        <div className="space-y-3">
          {performance.goals.map((goal, index) => (
            <div key={index} className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
              <span className="text-gray-700">{goal}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderAttendance = () => (
    <div className="space-y-6">
      {/* Attendance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-500 text-white">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Present Days</p>
              <p className="text-2xl font-bold text-gray-900">{attendance.present}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-red-500 text-white">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Absent Days</p>
              <p className="text-2xl font-bold text-gray-900">{attendance.absent}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-yellow-500 text-white">
              <Clock className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Late Days</p>
              <p className="text-2xl font-bold text-gray-900">{attendance.late}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-500 text-white">
              <Calendar className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Days</p>
              <p className="text-2xl font-bold text-gray-900">{attendance.totalDays}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Leave Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{leave.used}</p>
            <p className="text-sm text-gray-600">Days Used</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{leave.remaining}</p>
            <p className="text-sm text-gray-600">Days Remaining</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{leave.total}</p>
            <p className="text-sm text-gray-600">Total Days</p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderDocuments = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="font-medium text-gray-900">Employment Contract</p>
              <p className="text-sm text-gray-500">PDF • 2.3 MB</p>
            </div>
          </div>
          <button className="text-blue-600 hover:text-blue-800">
            <Download className="h-5 w-5" />
          </button>
        </div>
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="font-medium text-gray-900">Performance Review</p>
              <p className="text-sm text-gray-500">PDF • 1.8 MB</p>
            </div>
          </div>
          <button className="text-blue-600 hover:text-blue-800">
            <Download className="h-5 w-5" />
          </button>
        </div>
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-purple-500 mr-3" />
            <div>
              <p className="font-medium text-gray-900">Training Certificates</p>
              <p className="text-sm text-gray-500">PDF • 3.1 MB</p>
            </div>
          </div>
          <button className="text-blue-600 hover:text-blue-800">
            <Download className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )

  const renderHistory = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Employment History</h3>
      <div className="space-y-4">
        <div className="border-l-4 border-blue-500 pl-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Hired as Senior Software Engineer</p>
              <p className="text-sm text-gray-500">January 15, 2022</p>
            </div>
            <span className="text-sm text-blue-600 font-medium">Current</span>
          </div>
        </div>
        <div className="border-l-4 border-gray-300 pl-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Performance Review Completed</p>
              <p className="text-sm text-gray-500">January 15, 2024</p>
            </div>
            <span className="text-sm text-green-600 font-medium">Completed</span>
          </div>
        </div>
        <div className="border-l-4 border-gray-300 pl-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Training Completed - React Advanced</p>
              <p className="text-sm text-gray-500">December 10, 2023</p>
            </div>
            <span className="text-sm text-green-600 font-medium">Completed</span>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/employees"
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Employees
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{employee.firstName} {employee.lastName}</h1>
            <p className="text-sm text-gray-600">{employee.position} • {employee.department}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <Edit className="h-4 w-4 mr-2" />
            Edit Employee
          </button>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Employee Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-6">
          <div className="h-20 w-20 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">
              {employee.firstName[0]}{employee.lastName[0]}
            </span>
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-4 mb-2">
              <h2 className="text-xl font-bold text-gray-900">{employee.firstName} {employee.lastName}</h2>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(employee.status)}`}>
                {employee.status}
              </span>
            </div>
            <p className="text-gray-600 mb-2">{employee.position} at {employee.department}</p>
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <span>Employee ID: {employee.employeeId}</span>
              <span>Hired: {new Date(employee.hireDate).toLocaleDateString()}</span>
              <span>Manager: {employee.manager ? `${employee.manager.firstName} ${employee.manager.lastName}` : 'N/A'}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">${employee.salary.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Annual Salary</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-6">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'performance' && renderPerformance()}
          {activeTab === 'attendance' && renderAttendance()}
          {activeTab === 'documents' && renderDocuments()}
          {activeTab === 'history' && renderHistory()}
        </div>
      </div>
    </div>
  )
} 
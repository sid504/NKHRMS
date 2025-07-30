'use client'

import { useState } from 'react'
import { 
  FileText,
  Plus,
  Search,
  Filter,
  Upload,
  Download,
  Eye,
  Edit,
  Trash2,
  Folder,
  File,
  Calendar,
  User,
  Tag,
  Share2,
  Lock,
  Star,
  MoreVertical
} from 'lucide-react'

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState('grid')

  // Mock documents data
  const documents = [
    {
      id: 1,
      name: 'Employee Handbook 2024',
      type: 'PDF',
      category: 'Policies',
      size: '2.3 MB',
      uploadedBy: 'Sarah Wilson',
      uploadDate: '2024-01-15',
      lastModified: '2024-01-15',
      tags: ['handbook', 'policies', '2024'],
      description: 'Comprehensive employee handbook covering company policies and procedures.',
      isPublic: true,
      isStarred: true,
      downloads: 45,
      views: 89
    },
    {
      id: 2,
      name: 'Employment Contract Template',
      type: 'DOCX',
      category: 'Contracts',
      size: '1.8 MB',
      uploadedBy: 'John Doe',
      uploadDate: '2024-01-10',
      lastModified: '2024-01-12',
      tags: ['contract', 'template', 'employment'],
      description: 'Standard employment contract template for new hires.',
      isPublic: false,
      isStarred: false,
      downloads: 23,
      views: 67
    },
    {
      id: 3,
      name: 'Performance Review Form',
      type: 'PDF',
      category: 'Forms',
      size: '0.9 MB',
      uploadedBy: 'Mike Johnson',
      uploadDate: '2024-01-08',
      lastModified: '2024-01-08',
      tags: ['performance', 'review', 'form'],
      description: 'Standard performance review form for annual evaluations.',
      isPublic: true,
      isStarred: false,
      downloads: 34,
      views: 78
    },
    {
      id: 4,
      name: 'Benefits Enrollment Guide',
      type: 'PDF',
      category: 'Benefits',
      size: '3.1 MB',
      uploadedBy: 'Lisa Rodriguez',
      uploadDate: '2024-01-05',
      lastModified: '2024-01-05',
      tags: ['benefits', 'enrollment', 'guide'],
      description: 'Complete guide for employee benefits enrollment process.',
      isPublic: true,
      isStarred: true,
      downloads: 56,
      views: 123
    },
    {
      id: 5,
      name: 'Training Materials - Leadership',
      type: 'PPTX',
      category: 'Training',
      size: '5.2 MB',
      uploadedBy: 'David Lee',
      uploadDate: '2024-01-03',
      lastModified: '2024-01-03',
      tags: ['training', 'leadership', 'materials'],
      description: 'Leadership training materials and presentations.',
      isPublic: true,
      isStarred: false,
      downloads: 28,
      views: 45
    },
    {
      id: 6,
      name: 'Payroll Processing Guide',
      type: 'PDF',
      category: 'Payroll',
      size: '1.5 MB',
      uploadedBy: 'Alice Brown',
      uploadDate: '2024-01-01',
      lastModified: '2024-01-01',
      tags: ['payroll', 'processing', 'guide'],
      description: 'Step-by-step guide for payroll processing procedures.',
      isPublic: false,
      isStarred: false,
      downloads: 12,
      views: 34
    }
  ]

  const categories = ['all', 'Policies', 'Contracts', 'Forms', 'Benefits', 'Training', 'Payroll', 'Reports']

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'starred' && doc.isStarred) ||
                      (activeTab === 'recent' && new Date(doc.uploadDate) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
    return matchesSearch && matchesCategory && matchesTab
  })

  const getFileTypeIcon = (type: string) => {
    switch (type) {
      case 'PDF':
        return <FileText className="h-8 w-8 text-red-500" />
      case 'DOCX':
        return <FileText className="h-8 w-8 text-blue-500" />
      case 'PPTX':
        return <FileText className="h-8 w-8 text-orange-500" />
      case 'XLSX':
        return <FileText className="h-8 w-8 text-green-500" />
      default:
        return <File className="h-8 w-8 text-gray-500" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Policies':
        return 'bg-blue-100 text-blue-800'
      case 'Contracts':
        return 'bg-green-100 text-green-800'
      case 'Forms':
        return 'bg-purple-100 text-purple-800'
      case 'Benefits':
        return 'bg-orange-100 text-orange-800'
      case 'Training':
        return 'bg-yellow-100 text-yellow-800'
      case 'Payroll':
        return 'bg-red-100 text-red-800'
      case 'Reports':
        return 'bg-indigo-100 text-indigo-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredDocuments.map((doc) => (
        <div key={doc.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(doc.category)}`}>
                    {doc.category}
                  </span>
                  {doc.isPublic ? (
                    <span className="text-green-600">
                      <Eye className="h-4 w-4" />
                    </span>
                  ) : (
                    <span className="text-gray-600">
                      <Lock className="h-4 w-4" />
                    </span>
                  )}
                  {doc.isStarred && (
                    <span className="text-yellow-500">
                      <Star className="h-4 w-4" />
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{doc.name}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{doc.description}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Size:</span>
                <span className="text-sm font-medium text-gray-900">{doc.size}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Uploaded by:</span>
                <span className="text-sm font-medium text-gray-900">{doc.uploadedBy}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Upload date:</span>
                <span className="text-sm font-medium text-gray-900">
                  {new Date(doc.uploadDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Downloads:</span>
                <span className="text-sm font-medium text-gray-900">{doc.downloads}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center mr-2">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Eye className="h-4 w-4" />
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
  )

  const renderListView = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Document
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Size
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Uploaded By
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Upload Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Downloads
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDocuments.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getFileTypeIcon(doc.type)}
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                      <div className="text-sm text-gray-500">{doc.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(doc.category)}`}>
                    {doc.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {doc.size}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {doc.uploadedBy}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(doc.uploadDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {doc.downloads}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Download className="h-4 w-4" />
                    </button>
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Document Management</h1>
          <p className="text-sm text-gray-600">Manage HR documents, policies, and employee files</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            New Folder
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search documents..."
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

      {/* Tabs and View Toggle */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex items-center justify-between px-6">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('all')}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === 'all'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FileText className="h-4 w-4 mr-2" />
                All Documents
              </button>
              <button
                onClick={() => setActiveTab('starred')}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === 'starred'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Star className="h-4 w-4 mr-2" />
                Starred
              </button>
              <button
                onClick={() => setActiveTab('recent')}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === 'recent'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Recent
              </button>
            </nav>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${
                  viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <div className="grid grid-cols-2 gap-1">
                  <div className="w-2 h-2 bg-current"></div>
                  <div className="w-2 h-2 bg-current"></div>
                  <div className="w-2 h-2 bg-current"></div>
                  <div className="w-2 h-2 bg-current"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${
                  viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <div className="space-y-1">
                  <div className="w-4 h-1 bg-current"></div>
                  <div className="w-4 h-1 bg-current"></div>
                  <div className="w-4 h-1 bg-current"></div>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          {viewMode === 'grid' ? renderGridView() : renderListView()}
        </div>
      </div>
    </div>
  )
} 
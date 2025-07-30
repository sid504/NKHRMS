'use client'

import { useState } from 'react'
import { 
  HelpCircle,
  Search,
  Plus,
  MessageCircle,
  FileText,
  BookOpen,
  Video,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Star,
  ThumbsUp,
  ThumbsDown,
  Send,
  Filter,
  Tag
} from 'lucide-react'

export default function HelpPage() {
  const [activeTab, setActiveTab] = useState('faq')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  // Mock FAQ data
  const faqs = [
    {
      id: 1,
      question: 'How do I request time off?',
      answer: 'To request time off, navigate to the Leave Management section and click "Request Leave". Fill out the form with your start date, end date, and reason for leave. Your request will be sent to your manager for approval.',
      category: 'Leave Management',
      tags: ['leave', 'time-off', 'request'],
      helpful: 45,
      notHelpful: 2
    },
    {
      id: 2,
      question: 'How do I update my personal information?',
      answer: 'You can update your personal information by going to Settings > Profile. Here you can modify your contact details, address, emergency contacts, and other personal information. Changes are saved automatically.',
      category: 'Profile',
      tags: ['profile', 'personal-info', 'update'],
      helpful: 38,
      notHelpful: 1
    },
    {
      id: 3,
      question: 'How do I access my payslip?',
      answer: 'Your payslips are available in the Payroll section. Click on "View Payslips" to see all your previous payslips. You can download them as PDF files for your records.',
      category: 'Payroll',
      tags: ['payslip', 'salary', 'download'],
      helpful: 52,
      notHelpful: 3
    },
    {
      id: 4,
      question: 'How do I enroll in benefits?',
      answer: 'Benefits enrollment is available in the Benefits Management section. During open enrollment periods, you can review available plans and make your selections. Contact HR if you have questions about specific benefits.',
      category: 'Benefits',
      tags: ['benefits', 'enrollment', 'insurance'],
      helpful: 29,
      notHelpful: 4
    },
    {
      id: 5,
      question: 'How do I submit a performance review?',
      answer: 'Performance reviews can be submitted through the Performance Management section. Click on "Submit Review" and fill out the required forms. Make sure to include specific examples and achievements.',
      category: 'Performance',
      tags: ['performance', 'review', 'submit'],
      helpful: 41,
      notHelpful: 2
    }
  ]

  // Mock support tickets
  const tickets = [
    {
      id: 1,
      title: 'Cannot access payroll information',
      description: 'I am unable to view my payslip for the current month. Getting an error message.',
      category: 'Technical',
      priority: 'high',
      status: 'open',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T14:20:00Z',
      assignedTo: 'IT Support',
      responses: [
        {
          id: 1,
          message: 'We are investigating this issue. Please try clearing your browser cache and cookies.',
          sender: 'IT Support',
          timestamp: '2024-01-15T11:00:00Z'
        }
      ]
    },
    {
      id: 2,
      title: 'Leave request not showing approved status',
      description: 'I submitted a leave request last week but it still shows as pending.',
      category: 'Leave Management',
      priority: 'medium',
      status: 'in-progress',
      createdAt: '2024-01-14T09:15:00Z',
      updatedAt: '2024-01-15T16:45:00Z',
      assignedTo: 'HR Team',
      responses: [
        {
          id: 1,
          message: 'Your request has been approved. The status should update shortly.',
          sender: 'HR Team',
          timestamp: '2024-01-15T16:45:00Z'
        }
      ]
    }
  ]

  // Mock knowledge base articles
  const articles = [
    {
      id: 1,
      title: 'Getting Started with NKHR',
      category: 'Getting Started',
      description: 'Learn the basics of using the NKHR platform for your daily HR tasks.',
      readTime: '5 min',
      lastUpdated: '2024-01-10',
      views: 156,
      rating: 4.8
    },
    {
      id: 2,
      title: 'Complete Guide to Leave Management',
      category: 'Leave Management',
      description: 'Everything you need to know about requesting and managing leave.',
      readTime: '8 min',
      lastUpdated: '2024-01-08',
      views: 234,
      rating: 4.9
    },
    {
      id: 3,
      title: 'Understanding Your Benefits Package',
      category: 'Benefits',
      description: 'Detailed explanation of your benefits package and enrollment process.',
      readTime: '12 min',
      lastUpdated: '2024-01-05',
      views: 189,
      rating: 4.7
    }
  ]

  const categories = ['all', 'Leave Management', 'Profile', 'Payroll', 'Benefits', 'Performance', 'Technical', 'Getting Started']

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id)
  }

  const renderFAQ = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {filteredFaqs.map((faq) => (
            <div key={faq.id} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50"
              >
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">{faq.question}</h4>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-xs text-gray-500">{faq.category}</span>
                    <div className="flex items-center space-x-2">
                      <ThumbsUp className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-gray-500">{faq.helpful}</span>
                    </div>
                  </div>
                </div>
                {expandedFaq === faq.id ? (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {expandedFaq === faq.id && (
                <div className="px-6 pb-4">
                  <p className="text-sm text-gray-600 mb-4">{faq.answer}</p>
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-xs text-gray-500 hover:text-green-600">
                      <ThumbsUp className="h-3 w-3" />
                      <span>Helpful</span>
                    </button>
                    <button className="flex items-center space-x-1 text-xs text-gray-500 hover:text-red-600">
                      <ThumbsDown className="h-3 w-3" />
                      <span>Not Helpful</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderTickets = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Support Tickets</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            New Ticket
          </button>
        </div>
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="text-sm font-medium text-gray-900">{ticket.title}</h4>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      ticket.priority === 'high' ? 'bg-red-100 text-red-800' :
                      ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {ticket.priority}
                    </span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      ticket.status === 'open' ? 'bg-blue-100 text-blue-800' :
                      ticket.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{ticket.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>Assigned to: {ticket.assignedTo}</span>
                    <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
                    <span>Responses: {ticket.responses.length}</span>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-800">
                  <MessageCircle className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderKnowledgeBase = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div key={article.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <span className="text-xs text-gray-500">{article.category}</span>
              </div>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">{article.title}</h4>
            <p className="text-sm text-gray-600 mb-4">{article.description}</p>
            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              <span>{article.readTime} read</span>
              <span>{article.views} views</span>
              <div className="flex items-center">
                <Star className="h-3 w-3 text-yellow-500 mr-1" />
                <span>{article.rating}</span>
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Read Article
            </button>
          </div>
        ))}
      </div>
    </div>
  )

  const renderContact = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="p-3 bg-blue-100 rounded-lg inline-block mb-4">
            <Mail className="h-8 w-8 text-blue-600" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h4>
          <p className="text-sm text-gray-600 mb-4">Get help via email within 24 hours</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Send Email
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="p-3 bg-green-100 rounded-lg inline-block mb-4">
            <Phone className="h-8 w-8 text-green-600" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Phone Support</h4>
          <p className="text-sm text-gray-600 mb-4">Call us for immediate assistance</p>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Call Now
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="p-3 bg-purple-100 rounded-lg inline-block mb-4">
            <MessageCircle className="h-8 w-8 text-purple-600" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h4>
          <p className="text-sm text-gray-600 mb-4">Chat with our support team</p>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
            Start Chat
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
          <p className="text-sm text-gray-600">Find answers and get help when you need it</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search for help articles, FAQs, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              onClick={() => setActiveTab('faq')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'faq'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              FAQ
            </button>
            <button
              onClick={() => setActiveTab('knowledge')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'knowledge'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Knowledge Base
            </button>
            <button
              onClick={() => setActiveTab('tickets')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'tickets'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Support Tickets
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'contact'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Phone className="h-4 w-4 mr-2" />
              Contact Support
            </button>
          </nav>
        </div>
        <div className="p-6">
          {activeTab === 'faq' && renderFAQ()}
          {activeTab === 'knowledge' && renderKnowledgeBase()}
          {activeTab === 'tickets' && renderTickets()}
          {activeTab === 'contact' && renderContact()}
        </div>
      </div>
    </div>
  )
} 
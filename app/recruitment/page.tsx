'use client'

import { useState, useEffect } from 'react'
import { 
  Briefcase, 
  Plus, 
  Search, 
  Filter, 
  Users, 
  Clock, 
  MapPin, 
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  Loader2,
  X,
  FileText,
  DollarSign
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function RecruitmentPage() {
  const [activeTab, setActiveTab] = useState('jobs')
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newJob, setNewJob] = useState({
    title: '',
    department: 'Engineering',
    description: '',
    requirements: '',
    salary: '',
    location: 'Remote',
    type: 'Full-time'
  })

  const fetchJobs = async () => {
    try {
      const res = await fetch('/api/recruitment/jobs')
      if (res.ok) {
        const data = await res.json()
        setJobs(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  const handleAddJob = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/recruitment/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newJob)
      })

      if (res.ok) {
        setShowAddModal(false)
        fetchJobs()
        setNewJob({
          title: '',
          department: 'Engineering',
          description: '',
          requirements: '',
          salary: '',
          location: 'Remote',
          type: 'Full-time'
        })
      }
    } catch (error) {
      console.error('Failed to add job:', error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Recruitment Management</h1>
          <p className="text-gray-600">Track job openings, manage applications, and hire talent</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center shadow-lg shadow-blue-100 transition-all"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Job Posting
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 p-1 bg-gray-100 rounded-xl w-fit">
        <button 
          onClick={() => setActiveTab('jobs')}
          className={`px-6 py-2 rounded-lg font-bold transition-all ${activeTab === 'jobs' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Active Openings
        </button>
        <button 
          onClick={() => setActiveTab('applications')}
          className={`px-6 py-2 rounded-lg font-bold transition-all ${activeTab === 'applications' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Applications
        </button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-20 flex flex-col items-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            <p className="mt-4 text-gray-500">Connecting to Talent Engine...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-gray-200">
             <Briefcase className="h-16 w-16 text-gray-200 mx-auto mb-4" />
             <p className="text-gray-500">No active job postings. Start by creating one!</p>
          </div>
        ) : (
          jobs.map((job) => (
            <motion.div 
              key={job.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all group"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${job.status === 'ACTIVE' ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-600'}`}>
                    {job.status}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{job.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{job.department} • {job.type}</p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 opacity-50" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2 opacity-50" />
                    {job._count?.applications || 0} Applicants
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2 opacity-50" />
                    Posted {new Date(job.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 py-2 bg-blue-50 text-blue-600 rounded-lg font-bold hover:bg-blue-100 transition-colors">
                    View Details
                  </button>
                  <button className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50">
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Add Job Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden"
            >
              <div className="p-6 bg-blue-600 text-white flex justify-between items-center">
                <h2 className="text-xl font-bold">New Talent Acquisition</h2>
                <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleAddJob} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-full">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Job Title</label>
                    <input 
                      required
                      type="text" 
                      value={newJob.title}
                      onChange={e => setNewJob({...newJob, title: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="e.g. Senior Frontend Engineer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Department</label>
                    <select 
                      value={newJob.department}
                      onChange={e => setNewJob({...newJob, department: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option>Engineering</option>
                      <option>Marketing</option>
                      <option>Sales</option>
                      <option>HR</option>
                      <option>Finance</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Job Type</label>
                    <select 
                      value={newJob.type}
                      onChange={e => setNewJob({...newJob, type: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Contract</option>
                      <option>Internship</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
                    <input 
                      type="text" 
                      value={newJob.location}
                      onChange={e => setNewJob({...newJob, location: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="e.g. Remote / New York"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Monthly Salary (USD)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input 
                        type="number" 
                        value={newJob.salary}
                        onChange={e => setNewJob({...newJob, salary: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="5000"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Job Description</label>
                  <textarea 
                    required
                    value={newJob.description}
                    onChange={e => setNewJob({...newJob, description: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-32"
                    placeholder="Describe the role and responsibilities..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Key Requirements</label>
                  <textarea 
                    required
                    value={newJob.requirements}
                    onChange={e => setNewJob({...newJob, requirements: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-32"
                    placeholder="List required skills and experience (one per line)..."
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-4 border border-gray-200 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-2 px-12 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg hover:bg-blue-700 shadow-blue-100 transition-all"
                  >
                    Publish Job Posting
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
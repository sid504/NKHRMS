'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  User, 
  Mail, 
  Phone, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock,
  Loader2,
  ChevronRight,
  Download
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchApplications = async () => {
      // For now, using high-fidelity mock data until we build the Application API
      // In a real scenario, this would fetch from /api/recruitment/applications
      setTimeout(() => {
        setApplications([
          { id: '1', name: 'Alex Rivera', role: 'Senior Frontend Dev', email: 'alex@example.com', status: 'Hired', date: '2024-05-10', match: '98%' },
          { id: '2', name: 'Samantha Chen', role: 'Product Designer', email: 'sam@example.com', status: 'In Review', date: '2024-05-12', match: '85%' },
          { id: '3', name: 'Jordan Smyth', role: 'Fullstack Engineer', email: 'jordan@example.com', status: 'Interviewing', date: '2024-05-14', match: '92%' }
        ])
        setLoading(false)
      }, 800)
    }
    fetchApplications()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/recruitment" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Applicant Tracking</h1>
        </div>
        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl font-bold flex items-center hover:bg-gray-200 transition-all">
          <Download className="h-4 w-4 mr-2" />
          Export All
        </button>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center">
           <Search className="h-5 w-5 text-gray-400 ml-2" />
           <input 
             type="text" 
             placeholder="Search by name, role, or status..."
             className="flex-1 px-4 py-2 outline-none"
             value={searchQuery}
             onChange={e => setSearchQuery(e.target.value)}
           />
           <button className="px-4 py-2 bg-gray-50 text-gray-600 rounded-xl font-bold flex items-center">
             <Filter className="h-4 w-4 mr-2" />
             Filters
           </button>
        </div>
        <div className="bg-blue-600 p-4 rounded-2xl text-white shadow-lg flex items-center justify-between">
           <div>
             <p className="text-xs font-bold opacity-60">NEW TODAY</p>
             <p className="text-2xl font-black">12</p>
           </div>
           <Users className="h-10 w-10 opacity-20" />
        </div>
      </div>

      {/* Applicant List */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center">
            <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Candidate</th>
                  <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Target Role</th>
                  <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Match Score</th>
                  <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">
                          {app.name[0]}
                        </div>
                        <div className="ml-4">
                          <p className="font-bold text-gray-900">{app.name}</p>
                          <p className="text-xs text-gray-400">{app.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm font-medium text-gray-600">{app.role}</td>
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-2">
                        <div className="h-1.5 w-16 bg-gray-100 rounded-full overflow-hidden">
                           <div className="h-full bg-blue-600" style={{ width: app.match }} />
                        </div>
                        <span className="text-xs font-bold text-blue-600">{app.match}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        app.status === 'Hired' ? 'bg-green-50 text-green-600' : 
                        app.status === 'Interviewing' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <button className="p-2 text-gray-300 hover:text-blue-600 group-hover:scale-110 transition-all">
                         <ChevronRight className="h-5 w-5" />
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

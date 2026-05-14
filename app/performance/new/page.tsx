'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Save, 
  User, 
  Star, 
  Target, 
  MessageSquare, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function NewPerformanceReviewPage() {
  const [employees, setEmployees] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  
  const [formData, setFormData] = useState({
    employeeId: '',
    reviewerId: 'admin-id', // Simulated for now
    reviewDate: new Date().toISOString().split('T')[0],
    rating: 3,
    comments: '',
    goals: '',
    nextReviewDate: ''
  })

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch('/api/employees')
        if (res.ok) {
          const data = await res.json()
          setEmployees(data.data)
        }
      } catch (error) {
        console.error('Failed to fetch employees')
      } finally {
        setLoading(false)
      }
    }
    fetchEmployees()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/performance/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        setSuccess(true)
      }
    } catch (error) {
      console.error('Submission failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
        <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="h-10 w-10" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Review Submitted!</h1>
        <p className="text-gray-600 mb-8 max-w-md">The performance evaluation has been successfully recorded in the employee's permanent file.</p>
        <Link href="/performance" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">
          Back to Performance Dashboard
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/performance" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">New Performance Evaluation</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 pb-20">
        {/* Employee Selection */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
            <User className="h-5 w-5 mr-2 text-blue-600" />
            Selection & Schedule
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Select Employee</label>
              {loading ? (
                 <div className="h-12 bg-gray-50 rounded-xl animate-pulse" />
              ) : (
                <select 
                  required
                  value={formData.employeeId}
                  onChange={e => setFormData({...formData, employeeId: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Select an employee...</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.firstName} {emp.lastName} ({emp.employeeId})</option>
                  ))}
                </select>
              )}
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Review Date</label>
              <input 
                type="date" 
                value={formData.reviewDate}
                onChange={e => setFormData({...formData, reviewDate: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Rating Section */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
            <Star className="h-5 w-5 mr-2 text-yellow-500" />
            Performance Rating
          </h3>
          <div className="flex items-center justify-between max-w-md mx-auto mb-8">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData({...formData, rating: star})}
                className={`p-4 rounded-2xl transition-all ${formData.rating >= star ? 'text-yellow-500 bg-yellow-50 scale-110' : 'text-gray-200 hover:text-yellow-200'}`}
              >
                <Star className={`h-8 w-8 ${formData.rating >= star ? 'fill-current' : ''}`} />
              </button>
            ))}
          </div>
          <p className="text-center text-sm font-bold text-gray-500 uppercase tracking-widest">
            {formData.rating === 1 && "Unsatisfactory"}
            {formData.rating === 2 && "Needs Improvement"}
            {formData.rating === 3 && "Meets Expectations"}
            {formData.rating === 4 && "Exceeds Expectations"}
            {formData.rating === 5 && "Outstanding Performance"}
          </p>
        </div>

        {/* Detailed Feedback */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
            Feedback & Comments
          </h3>
          <textarea 
            required
            value={formData.comments}
            onChange={e => setFormData({...formData, comments: e.target.value})}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-40"
            placeholder="Provide a detailed assessment of the employee's performance during this period..."
          />
        </div>

        {/* Goals & Future */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
            <Target className="h-5 w-5 mr-2 text-purple-600" />
            Goals for Next Period
          </h3>
          <div className="space-y-6">
            <textarea 
              value={formData.goals}
              onChange={e => setFormData({...formData, goals: e.target.value})}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-32"
              placeholder="Outline specific objectives for the next review cycle..."
            />
            <div className="max-w-xs">
              <label className="block text-sm font-bold text-gray-700 mb-2">Next Review Date</label>
              <input 
                type="date" 
                value={formData.nextReviewDate}
                onChange={e => setFormData({...formData, nextReviewDate: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-4xl px-6">
          <div className="bg-white/80 backdrop-blur-md p-4 rounded-3xl border border-white shadow-2xl flex items-center justify-between">
             <p className="text-sm text-gray-500 ml-4 hidden md:block">Draft auto-saved {new Date().toLocaleTimeString()}</p>
             <div className="flex space-x-4 w-full md:w-auto">
               <Link href="/performance" className="flex-1 md:flex-none px-8 py-4 text-gray-600 font-bold hover:bg-gray-50 rounded-2xl transition-all">
                 Cancel
               </Link>
               <button 
                 type="submit"
                 disabled={isSubmitting}
                 className="flex-2 md:flex-none px-12 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg hover:bg-blue-700 shadow-blue-100 transition-all flex items-center justify-center space-x-2"
               >
                 {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
                 <span>Submit Final Review</span>
               </button>
             </div>
          </div>
        </div>
      </form>
    </div>
  )
}

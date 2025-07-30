'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../contexts/AuthContext'
import Link from 'next/link'
import { 
  Calendar, 
  ArrowLeft,
  User,
  CalendarDays,
  FileText,
  AlertCircle,
  CheckCircle
} from 'lucide-react'

export default function NewLeaveRequestPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
    emergencyContact: '',
    handoverTo: ''
  })

  const leaveTypes = [
    { value: 'vacation', label: 'Vacation Leave', description: 'Annual vacation time' },
    { value: 'sick', label: 'Sick Leave', description: 'Medical appointments or illness' },
    { value: 'personal', label: 'Personal Leave', description: 'Personal matters' },
    { value: 'maternity', label: 'Maternity Leave', description: 'Pregnancy and childbirth' },
    { value: 'paternity', label: 'Paternity Leave', description: 'New father leave' },
    { value: 'bereavement', label: 'Bereavement Leave', description: 'Family member passing' },
    { value: 'study', label: 'Study Leave', description: 'Educational purposes' }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const calculateDays = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate)
      const end = new Date(formData.endDate)
      const diffTime = Math.abs(end.getTime() - start.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
      return diffDays
    }
    return 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    // Validate form
    if (!formData.leaveType || !formData.startDate || !formData.endDate || !formData.reason) {
      setError('Please fill in all required fields')
      setIsSubmitting(false)
      return
    }

    if (new Date(formData.startDate) < new Date()) {
      setError('Start date cannot be in the past')
      setIsSubmitting(false)
      return
    }

    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      setError('End date must be after start date')
      setIsSubmitting(false)
      return
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Mock successful submission
      setSuccess(true)
      setTimeout(() => {
        router.push('/leave-requests')
      }, 2000)
    } catch (error) {
      setError('Failed to submit request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Your leave request has been submitted successfully and is pending approval.
          </p>
          <div className="text-sm text-gray-500">
            <p>Request ID: LR-{Date.now().toString().slice(-6)}</p>
            <p>Submitted by: {user?.name}</p>
            <p>Date: {new Date().toLocaleDateString()}</p>
          </div>
          <div className="mt-6">
            <p className="text-sm text-blue-600">Redirecting to leave requests...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/leave-requests"
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Leave Requests
          </Link>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">New Leave Request</h1>
          <p className="text-gray-600">Submit a new leave request for approval</p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <span className="text-sm text-red-700">{error}</span>
              </div>
            )}

            {/* Employee Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2" />
                Employee Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employee Name
                  </label>
                  <input
                    type="text"
                    value={user?.name || ''}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    value={user?.id || ''}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={user?.department || ''}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position
                  </label>
                  <input
                    type="text"
                    value={user?.position || ''}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>
              </div>
            </div>

            {/* Leave Details */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <CalendarDays className="h-5 w-5 mr-2" />
                Leave Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Leave Type *
                  </label>
                  <select
                    name="leaveType"
                    value={formData.leaveType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select leave type</option>
                    {leaveTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  {formData.leaveType && (
                    <p className="mt-1 text-sm text-gray-500">
                      {leaveTypes.find(t => t.value === formData.leaveType)?.description}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Days
                  </label>
                  <input
                    type="text"
                    value={calculateDays() > 0 ? `${calculateDays()} day(s)` : ''}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                    placeholder="Calculated automatically"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date *
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    required
                    min={formData.startDate || new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Additional Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Leave *
                  </label>
                  <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Please provide a detailed reason for your leave request..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Contact
                    </label>
                    <input
                      type="text"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Name and phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Handover To
                    </label>
                    <input
                      type="text"
                      name="handoverTo"
                      value={formData.handoverTo}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Colleague name for handover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <Link
                href="/leave-requests"
                className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Calendar className="h-4 w-4 mr-2" />
                    Submit Request
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 
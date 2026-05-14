'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft, 
  ShieldCheck, 
  Heart, 
  Activity, 
  DollarSign, 
  Plane, 
  GraduationCap,
  ChevronRight,
  CheckCircle,
  FileText,
  Clock,
  Shield
} from 'lucide-react'
import { motion } from 'framer-motion'

const benefitData: Record<string, any> = {
  'health': {
    title: 'Executive Health Insurance',
    provider: 'BlueShield Global',
    status: 'Active',
    coverage: '$1,000,000',
    deductible: '$500',
    icon: Heart,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    description: 'Comprehensive medical coverage including dental, vision, and mental health support with global access.'
  },
  'retirement': {
    title: '401(k) Retirement Plan',
    provider: 'Fidelity Investments',
    status: 'Active',
    contribution: '5% matching',
    balance: '$42,500',
    icon: DollarSign,
    color: 'text-green-600',
    bg: 'bg-green-50',
    description: 'Employer-matched retirement savings plan with a wide range of investment options and wealth management tools.'
  },
  'life': {
    title: 'Life & Disability Insurance',
    provider: 'MetLife',
    status: 'Active',
    payout: '4x Annual Salary',
    premium: '$0 (Employer Paid)',
    icon: ShieldCheck,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    description: 'Financial security for your family including long-term and short-term disability coverage.'
  }
}

export default function BenefitDetailPage() {
  const params = useParams()
  const id = params.id as string
  const benefit = benefitData[id] || benefitData['health']

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <nav className="flex mb-8" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-4">
          <li>
            <Link href="/benefits" className="text-gray-500 hover:text-gray-700 transition-colors">
              Benefits Dashboard
            </Link>
          </li>
          <li className="flex items-center">
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="ml-4 text-blue-600 font-semibold">{benefit.title}</span>
          </li>
        </ol>
      </nav>

      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden"
          >
            <benefit.icon className={`absolute -right-8 -top-8 h-48 w-48 opacity-5 ${benefit.color}`} />
            
            <div className="flex items-center space-x-4 mb-8">
              <div className={`p-4 rounded-2xl ${benefit.bg} ${benefit.color}`}>
                <benefit.icon className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">{benefit.title}</h1>
                <p className="text-gray-500 font-medium">Provider: {benefit.provider}</p>
              </div>
            </div>

            <p className="text-xl text-gray-600 leading-relaxed mb-10">
              {benefit.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Status', value: benefit.status, icon: CheckCircle },
                { label: 'Coverage', value: benefit.coverage || benefit.contribution, icon: Shield },
                { label: 'Premium', value: benefit.premium || '$0.00', icon: DollarSign },
                { label: 'Renewal', value: 'Dec 2024', icon: Clock }
              ].map((stat, i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <stat.icon className="h-4 w-4 text-gray-400 mb-2" />
                  <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest">{stat.label}</p>
                  <p className="text-sm font-bold text-gray-900">{stat.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Documentation */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-600" />
              Benefit Documents
            </h3>
            <div className="space-y-3">
              {[
                'Summary of Benefits and Coverage (SBC).pdf',
                'Provider Network Directory 2024.pdf',
                'Claims Submission Guide.pdf'
              ].map((doc, i) => (
                <button key={i} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl border border-gray-100 transition-all text-left">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mr-4">
                       <FileText className="h-5 w-5" />
                    </div>
                    <span className="font-bold text-gray-700">{doc}</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-300" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
            <Activity className="absolute -right-4 -bottom-4 h-32 w-32 opacity-10" />
            <h3 className="text-xl font-bold mb-4">Benefit Assistance</h3>
            <p className="text-blue-100 mb-8 leading-relaxed">
              Have questions about your coverage or need to file a claim? Our concierge team is available 24/7.
            </p>
            <button className="w-full py-4 bg-white text-blue-600 font-black rounded-2xl hover:bg-blue-50 transition-all">
              Chat with Concierge
            </button>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h4 className="font-black text-gray-400 text-[10px] uppercase tracking-widest mb-4">Coverage Timeline</h4>
            <div className="space-y-6">
               {[
                 { date: 'Jan 01, 2024', event: 'Coverage Initialized', done: true },
                 { date: 'Jun 15, 2024', event: 'Mid-year Review', done: true },
                 { date: 'Dec 01, 2024', event: 'Open Enrollment', done: false }
               ].map((step, i) => (
                 <div key={i} className="flex items-start">
                   <div className={`mt-1.5 h-3 w-3 rounded-full border-2 mr-4 ${step.done ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-200'}`} />
                   <div>
                     <p className="text-sm font-bold text-gray-900">{step.event}</p>
                     <p className="text-xs text-gray-400">{step.date}</p>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

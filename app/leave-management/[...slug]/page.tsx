'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Settings, 
  Cpu, 
  Zap, 
  Shield, 
  Activity,
  ChevronRight,
  Brain
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function LeaveManagementCatchAll() {
  const pathname = usePathname()
  
  // Extract the feature name from the URL for a personalized message
  const segments = pathname.split('/')
  const featureSlug = segments[segments.length - 1]
  const featureName = featureSlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return (
    <div className="min-h-[80vh] flex flex-col">
      {/* Breadcrumbs */}
      <nav className="flex mb-8" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-4">
          <li>
            <Link href="/leave-management" className="text-gray-500 hover:text-gray-700 transition-colors">
              Leave Management
            </Link>
          </li>
          <li className="flex items-center">
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="ml-4 text-blue-600 font-semibold">{featureName}</span>
          </li>
        </ol>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl w-full bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
        >
          <div className="p-12 text-center">
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-blue-600 blur-3xl opacity-10 rounded-full animate-pulse" />
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl relative z-10 border border-white">
                <Settings className="h-16 w-16 text-blue-600 animate-spin-slow" />
              </div>
            </div>

            <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">
              {featureName}
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-xl mx-auto">
              This advanced administrative module is currently being integrated into the NKHR core engine. 
              Our engineers are mapping the logic for <span className="text-blue-600 font-bold">{featureName}</span> to ensure enterprise-grade reliability.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-12">
               {[
                 { icon: Cpu, title: "Engine Check", status: "In Progress" },
                 { icon: Shield, title: "Policy Validation", status: "Pending" },
                 { icon: Brain, title: "AI Optimization", status: "Queued" }
               ].map((item, i) => (
                 <div key={i} className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                    <item.icon className="h-6 w-6 text-blue-600 mb-3" />
                    <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{item.status}</p>
                 </div>
               ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/leave-management"
                className="flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Link>
              
              <button
                className="flex items-center justify-center px-8 py-4 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200 transition-all"
              >
                Notify When Ready
              </button>
            </div>
          </div>

          {/* Decorative Progress Bar */}
          <div className="h-2 bg-gray-100 w-full relative overflow-hidden">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent w-1/2"
            />
          </div>
        </motion.div>
      </div>
      
      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  )
}

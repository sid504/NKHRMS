'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Play, 
  BookOpen, 
  Clock, 
  Award, 
  ChevronRight,
  CheckCircle,
  FileText,
  Users,
  Video,
  Star,
  Zap
} from 'lucide-react'
import { motion } from 'framer-motion'

const trainingData: Record<string, any> = {
  'cybersecurity': {
    title: 'Cybersecurity Awareness 2024',
    provider: 'NKHR Security Team',
    duration: '45 mins',
    rating: 4.8,
    category: 'Compliance',
    students: 1240,
    icon: Shield,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    description: 'Essential training for all employees on identifying phishing, protecting company data, and following secure protocols.',
    modules: [
      { title: 'Identifying Phishing Attacks', duration: '15m', type: 'Video' },
      { title: 'Password Security Protocols', duration: '10m', type: 'Reading' },
      { title: 'Data Privacy & GDPR', duration: '20m', type: 'Quiz' }
    ]
  },
  'leadership': {
    title: 'Modern Leadership & Management',
    provider: 'Executive Coaches Inc.',
    duration: '6 hours',
    rating: 4.9,
    category: 'Soft Skills',
    students: 85,
    icon: Award,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    description: 'Transformative leadership course focused on emotional intelligence, conflict resolution, and remote team management.',
    modules: [
      { title: 'Emotional Intelligence at Work', duration: '1h', type: 'Video' },
      { title: 'Building High-Performance Teams', duration: '2h', type: 'Workshop' },
      { title: 'Feedback & Growth Mindset', duration: '1h', type: 'Reading' }
    ]
  }
}

export default function TrainingDetailPage() {
  const params = useParams()
  const id = params.id as string
  const course = trainingData[id] || trainingData['cybersecurity']

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Link href="/training" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
             <span>Courses</span>
             <ChevronRight className="h-4 w-4" />
             <span className="text-blue-600 font-bold">{course.category}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Hero */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
               <div className={`p-4 rounded-3xl ${course.bg} ${course.color} w-fit mb-4 md:mb-0`}>
                  <BookOpen className="h-8 w-8" />
               </div>
               <div className="flex space-x-2">
                  <span className="px-3 py-1 bg-gray-50 text-gray-500 rounded-full text-xs font-bold border border-gray-100 flex items-center">
                    <Star className="h-3 w-3 mr-1 text-yellow-500 fill-current" />
                    {course.rating} Rating
                  </span>
                  <span className="px-3 py-1 bg-gray-50 text-gray-500 rounded-full text-xs font-bold border border-gray-100 flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    {course.students} Enrolled
                  </span>
               </div>
            </div>

            <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-4">{course.title}</h1>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
               {course.description}
            </p>

            <div className="flex flex-wrap gap-4">
               <div className="flex items-center space-x-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                  <Clock className="h-4 w-4 opacity-50" />
                  <span className="text-sm font-bold">{course.duration}</span>
               </div>
               <div className="flex items-center space-x-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                  <Award className="h-4 w-4 opacity-50" />
                  <span className="text-sm font-bold">Certificate Included</span>
               </div>
            </div>
          </motion.div>

          {/* Curriculum */}
          <div className="space-y-4">
             <h3 className="text-2xl font-bold text-gray-900 ml-2">Course Curriculum</h3>
             <div className="space-y-3">
               {course.modules.map((mod: any, i: number) => (
                 <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center justify-between group hover:border-blue-200 transition-all">
                    <div className="flex items-center">
                       <div className="h-10 w-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center mr-4 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                          {mod.type === 'Video' ? <Video className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                       </div>
                       <div>
                          <p className="font-bold text-gray-900">{mod.title}</p>
                          <p className="text-xs text-gray-400">{mod.type} • {mod.duration}</p>
                       </div>
                    </div>
                    <button className="h-8 w-8 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center group-hover:bg-green-50 group-hover:text-green-600 transition-all">
                       <CheckCircle className="h-5 w-5" />
                    </button>
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* Sidebar Enrollment */}
        <div className="space-y-6">
           <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl sticky top-8">
              <div className="relative h-48 bg-slate-800 rounded-3xl mb-8 overflow-hidden flex items-center justify-center group">
                 <div className="absolute inset-0 bg-blue-600/20 group-hover:bg-blue-600/30 transition-all" />
                 <div className="h-16 w-16 bg-white text-blue-600 rounded-full flex items-center justify-center shadow-xl relative z-10 scale-110 group-hover:scale-125 transition-all">
                    <Play className="h-8 w-8 fill-current ml-1" />
                 </div>
              </div>

              <h4 className="text-2xl font-bold mb-2">Ready to Start?</h4>
              <p className="text-slate-400 text-sm mb-8">Begin your learning journey today and earn your accreditation.</p>
              
              <button className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-lg shadow-blue-900/20 hover:bg-blue-700 transition-all flex items-center justify-center space-x-2 mb-4">
                 <Zap className="h-5 w-5 fill-current" />
                 <span>Enroll Now</span>
              </button>
              
              <p className="text-[10px] text-center text-slate-500 uppercase tracking-widest">
                 Enrollment expires in 30 days
              </p>
           </div>
        </div>
      </div>
    </div>
  )
}

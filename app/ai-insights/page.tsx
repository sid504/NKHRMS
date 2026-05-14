'use client'

import { useState } from 'react'
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Users, 
  Target, 
  DollarSign,
  Clock,
  Award,
  Zap,
  BarChart3,
  Lightbulb,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { motion } from 'framer-motion'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function AIInsightsPage() {
  const [selectedInsight, setSelectedInsight] = useState(0)
  const [prompt, setPrompt] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateInsights = async () => {
    setIsGenerating(true)
    setError(null)
    setAiResponse('')

    try {
      const response = await fetch('/api/ai/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt || 'Analyze our HR efficiency and provide 3 key recommendations for improving retention in Engineering.',
          context: { departmentEfficiency, performanceTrends }
        })
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to generate insights')
      
      setAiResponse(data.result)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsGenerating(false)
    }
  }

  const aiPredictions = [
    {
      title: 'Employee Turnover Risk',
      prediction: 'High Risk',
      confidence: 87,
      trend: 'up',
      change: '+15%',
      description: '3 employees in Engineering team show high turnover risk',
      recommendations: [
        'Schedule 1-on-1 meetings with at-risk employees',
        'Review compensation packages for Engineering team',
        'Implement retention bonus program'
      ]
    },
    {
      title: 'Performance Optimization',
      prediction: 'Opportunity',
      confidence: 92,
      trend: 'up',
      change: '+23%',
      description: 'AI identified 12 employees ready for promotion',
      recommendations: [
        'Create career development plans for high performers',
        'Consider role expansion for senior developers',
        'Implement mentorship programs'
      ]
    },
    {
      title: 'Recruitment Success Rate',
      prediction: 'Improving',
      confidence: 78,
      trend: 'up',
      change: '+8%',
      description: 'New AI screening process shows 25% better candidate quality',
      recommendations: [
        'Expand AI screening to all departments',
        'Refine interview questions based on AI insights',
        'Track candidate success metrics'
      ]
    }
  ]

  const performanceTrends = [
    { month: 'Jan', actual: 85, predicted: 87, target: 90 },
    { month: 'Feb', actual: 87, predicted: 88, target: 90 },
    { month: 'Mar', actual: 89, predicted: 89, target: 90 },
    { month: 'Apr', actual: 91, predicted: 90, target: 90 },
    { month: 'May', actual: 92, predicted: 91, target: 90 },
    { month: 'Jun', actual: 94, predicted: 92, target: 90 },
  ]

  const departmentEfficiency = [
    { name: 'Engineering', efficiency: 94, satisfaction: 87, retention: 92 },
    { name: 'Sales', efficiency: 89, satisfaction: 82, retention: 88 },
    { name: 'Marketing', efficiency: 91, satisfaction: 85, retention: 90 },
    { name: 'HR', efficiency: 96, satisfaction: 90, retention: 95 },
    { name: 'Finance', efficiency: 88, satisfaction: 80, retention: 85 },
  ]

  const aiRecommendations = [
    {
      category: 'Talent Management',
      recommendations: [
        {
          title: 'Implement AI-driven career paths',
          impact: 'High',
          effort: 'Medium',
          description: 'Use AI to suggest personalized career development paths'
        },
        {
          title: 'Predictive retention modeling',
          impact: 'High',
          effort: 'High',
          description: 'Identify employees at risk of leaving before they do'
        }
      ]
    },
    {
      category: 'Performance Optimization',
      recommendations: [
        {
          title: 'Real-time performance monitoring',
          impact: 'Medium',
          effort: 'Low',
          description: 'Track performance metrics in real-time with AI alerts'
        },
        {
          title: 'Automated feedback system',
          impact: 'Medium',
          effort: 'Medium',
          description: 'AI-powered 360-degree feedback collection and analysis'
        }
      ]
    },
    {
      category: 'Recruitment Enhancement',
      recommendations: [
        {
          title: 'AI candidate matching',
          impact: 'High',
          effort: 'Medium',
          description: 'Match candidates to roles using AI algorithms'
        },
        {
          title: 'Predictive hiring success',
          impact: 'High',
          effort: 'High',
          description: 'Predict candidate success before hiring'
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AI Insights & Analytics</h1>
            <p className="mt-2 text-gray-600">
              Advanced AI-powered predictions and recommendations for your HR operations
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-purple-50 px-4 py-2 rounded-full">
              <Brain className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">AI Active</span>
            </div>
            <button 
              onClick={generateInsights}
              disabled={isGenerating}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 flex items-center"
            >
              <Zap className={`w-4 h-4 mr-2 ${isGenerating ? 'animate-pulse' : ''}`} />
              {isGenerating ? 'Generating...' : 'Generate AI Report'}
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic AI Chat / Response Area */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Ask NKHR AI Assistant</label>
          <div className="flex gap-4">
            <input 
              type="text" 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. How can we improve satisfaction in the Finance department?"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              onKeyDown={(e) => e.key === 'Enter' && generateInsights()}
            />
          </div>
        </div>
        
        {error && (
          <div className="p-4 mb-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        {aiResponse && (
          <div className="p-6 bg-purple-50 rounded-xl border border-purple-100 mt-4">
            <div className="flex items-center mb-4">
              <Brain className="w-6 h-6 text-purple-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Gemini AI Analysis</h3>
            </div>
            <div className="prose prose-purple max-w-none whitespace-pre-wrap text-gray-700">
              {aiResponse}
            </div>
          </div>
        )}
      </div>

      {/* AI Predictions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {aiPredictions.map((prediction, index) => (
          <motion.div
            key={prediction.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{prediction.title}</h3>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                prediction.prediction === 'High Risk' ? 'bg-red-100 text-red-700' :
                prediction.prediction === 'Opportunity' ? 'bg-green-100 text-green-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {prediction.prediction}
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Confidence</span>
                <span className="text-sm font-medium text-gray-900">{prediction.confidence}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full" 
                  style={{ width: `${prediction.confidence}%` }}
                ></div>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">{prediction.description}</p>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-900">Recommendations:</h4>
              <ul className="space-y-1">
                {prediction.recommendations.map((rec, idx) => (
                  <li key={idx} className="text-xs text-gray-600 flex items-start">
                    <CheckCircle className="w-3 h-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Performance Trends Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Performance Trends & Predictions</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Actual</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Predicted</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <span className="text-sm text-gray-600">Target</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={performanceTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="actual" stroke="#3B82F6" strokeWidth={3} name="Actual Performance" />
            <Line type="monotone" dataKey="predicted" stroke="#8B5CF6" strokeWidth={3} strokeDasharray="5 5" name="AI Prediction" />
            <Line type="monotone" dataKey="target" stroke="#9CA3AF" strokeWidth={2} name="Target" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Department Efficiency & AI Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Department Efficiency */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Department Efficiency Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentEfficiency}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="efficiency" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Efficiency %" />
              <Bar dataKey="satisfaction" fill="#10B981" radius={[4, 4, 0, 0]} name="Satisfaction %" />
              <Bar dataKey="retention" fill="#F59E0B" radius={[4, 4, 0, 0]} name="Retention %" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* AI Recommendations */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">AI Recommendations</h3>
            <Lightbulb className="w-5 h-5 text-yellow-500" />
          </div>
          
          <div className="space-y-6">
            {aiRecommendations.map((category, index) => (
              <div key={category.category}>
                <h4 className="font-medium text-gray-900 mb-3">{category.category}</h4>
                <div className="space-y-3">
                  {category.recommendations.map((rec, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="font-medium text-gray-900 text-sm">{rec.title}</h5>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            rec.impact === 'High' ? 'bg-red-100 text-red-700' :
                            rec.impact === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {rec.impact} Impact
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            rec.effort === 'High' ? 'bg-red-100 text-red-700' :
                            rec.effort === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {rec.effort} Effort
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{rec.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
} 
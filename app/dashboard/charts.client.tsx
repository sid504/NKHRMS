'use client'

import { memo } from 'react'
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Area, PieChart, Pie, Cell } from 'recharts'

type EmployeeGrowthPoint = { month: string; employees: number; target: number }
type PerformanceSlice = { name: string; value: number; color: string }

interface ChartsProps {
  employeeGrowthData: EmployeeGrowthPoint[]
  performanceData: PerformanceSlice[]
}

function ChartsImpl({ employeeGrowthData, performanceData }: ChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Employee Growth</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={employeeGrowthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="employees" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
            <Area type="monotone" dataKey="target" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={performanceData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {performanceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default memo(ChartsImpl)




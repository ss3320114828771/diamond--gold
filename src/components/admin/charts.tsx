// components/admin/charts.tsx
'use client'

import { useState } from 'react'

type RevenueChartProps = {
  data?: number[]
  labels?: string[]
}

type CategoryData = {
  name: string
  count: number
  color?: string
}

type CategoryChartProps = {
  data: CategoryData[]
}

// Simple Revenue Chart Component
export function RevenueChart({ data = [45000, 52000, 48000, 61000, 55000, 67000, 72000], 
                               labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }: RevenueChartProps) {
  const maxValue = Math.max(...data)

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold mb-4">Revenue Overview</h3>
      <div className="h-64 flex items-end justify-between gap-2">
        {data.map((value, index) => (
          <div key={index} className="flex-1 flex flex-col items-center group">
            <div className="relative w-full">
              <div 
                className="w-full bg-yellow-500 rounded-t group-hover:bg-yellow-600 transition-all"
                style={{ height: `${(value / maxValue) * 180}px` }}
              >
                {/* Tooltip on hover */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                  ${value.toLocaleString()}
                </div>
              </div>
            </div>
            <span className="text-xs mt-2 text-gray-600">{labels[index]}</span>
          </div>
        ))}
      </div>
      
      {/* Summary */}
      <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-xl font-bold text-green-600">
            ${data.reduce((a, b) => a + b, 0).toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Average</p>
          <p className="text-xl font-bold text-blue-600">
            ${Math.round(data.reduce((a, b) => a + b, 0) / data.length).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  )
}

// Simple Category Chart Component (Progress Bars)
export function CategoryChart({ data }: CategoryChartProps) {
  const maxCount = Math.max(...data.map(d => d.count))
  
  const colors = [
    'bg-yellow-500',
    'bg-blue-500', 
    'bg-green-500',
    'bg-purple-500',
    'bg-red-500',
    'bg-indigo-500',
    'bg-pink-500'
  ]

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold mb-4">Orders by Category</h3>
      
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={item.name}>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-gray-700">{item.name}</span>
              <span className="font-bold text-gray-900">{item.count}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`${item.color || colors[index % colors.length]} h-2.5 rounded-full transition-all duration-500`}
                style={{ width: `${(item.count / maxCount) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-4 pt-4 border-t flex justify-between">
        <span className="font-bold text-gray-700">Total Orders</span>
        <span className="font-bold text-yellow-600">
          {data.reduce((sum, item) => sum + item.count, 0)}
        </span>
      </div>
    </div>
  )
}

// Simple Pie Chart Alternative (Donut Style)
export function PieChart({ data }: CategoryChartProps) {
  const total = data.reduce((sum, item) => sum + item.count, 0)
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold mb-4">Category Distribution</h3>
      
      <div className="flex flex-col items-center">
        {/* Simple Donut Representation */}
        <div className="relative w-40 h-40 mb-4">
          <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>
          <div className="absolute inset-0 rounded-full border-8 border-yellow-500" 
               style={{ 
                 clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)',
                 transform: 'rotate(45deg)'
               }}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold">{total}</span>
          </div>
        </div>

        {/* Legend */}
        <div className="w-full space-y-2">
          {data.map((item, index) => {
            const percentage = Math.round((item.count / total) * 100)
            const colors = ['text-yellow-600', 'text-blue-600', 'text-green-600', 'text-purple-600']
            
            return (
              <div key={item.name} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${colors[index % colors.length].replace('text', 'bg')}`}></span>
                  <span className="text-sm text-gray-700">{item.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold">{item.count}</span>
                  <span className="text-xs text-gray-500 w-12">{percentage}%</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Simple Line Chart Alternative
export function LineChart({ data = [65, 75, 85, 95, 105, 115, 125], 
                            labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'] }: RevenueChartProps) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100
    const y = 100 - ((value - min) / range) * 80
    return `${x},${y}`
  }).join(' ')

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold mb-4">Growth Trend</h3>
      
      <div className="h-48 relative">
        {/* SVG Line Chart */}
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline
            points={points}
            fill="none"
            stroke="#eab308"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          {/* Area under line */}
          <polygon
            points={`0,100 ${points} 100,100`}
            fill="rgba(234, 179, 8, 0.1)"
          />
        </svg>

        {/* Data points */}
        <div className="absolute inset-0 flex justify-between">
          {data.map((value, index) => (
            <div key={index} className="relative group">
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Labels */}
      <div className="flex justify-between mt-4 text-xs text-gray-600">
        {labels.map((label, index) => (
          <span key={index}>{label}</span>
        ))}
      </div>
    </div>
  )
}

// Main Charts Component that combines all
export default function Charts() {
  const [activeChart, setActiveChart] = useState('revenue')

  const categoryData = [
    { name: 'Necklaces', count: 45, color: 'bg-yellow-500' },
    { name: 'Earrings', count: 38, color: 'bg-blue-500' },
    { name: 'Rings', count: 27, color: 'bg-green-500' },
    { name: 'Bangles', count: 23, color: 'bg-purple-500' },
    { name: 'Chains', count: 15, color: 'bg-red-500' },
  ]

  return (
    <div className="space-y-6">
      {/* Chart Type Selector */}
      <div className="bg-white rounded-lg shadow p-2 inline-flex">
        <button
          onClick={() => setActiveChart('revenue')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            activeChart === 'revenue' ? 'bg-yellow-500 text-white' : 'hover:bg-gray-100'
          }`}
        >
          Revenue
        </button>
        <button
          onClick={() => setActiveChart('categories')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            activeChart === 'categories' ? 'bg-yellow-500 text-white' : 'hover:bg-gray-100'
          }`}
        >
          Categories
        </button>
        <button
          onClick={() => setActiveChart('growth')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            activeChart === 'growth' ? 'bg-yellow-500 text-white' : 'hover:bg-gray-100'
          }`}
        >
          Growth
        </button>
      </div>

      {/* Active Chart */}
      <div className="grid md:grid-cols-2 gap-6">
        {activeChart === 'revenue' && (
          <>
            <RevenueChart />
            <PieChart data={categoryData} />
          </>
        )}
        
        {activeChart === 'categories' && (
          <>
            <CategoryChart data={categoryData} />
            <PieChart data={categoryData} />
          </>
        )}
        
        {activeChart === 'growth' && (
          <>
            <LineChart />
            <RevenueChart />
          </>
        )}
      </div>
    </div>
  )
}
// app/admin/dashboard/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type Stats = {
  totalOrders: number
  totalRevenue: number
  totalProducts: number
  totalCustomers: number
  pendingOrders: number
  lowStock: number
}

type RecentOrder = {
  id: string
  customer: string
  amount: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  date: string
}

type TopProduct = {
  id: string
  name: string
  sales: number
  revenue: number
  image: string
}

export default function AdminDashboard() {
  const [dateRange, setDateRange] = useState('today')

  // Sample stats data
  const stats: Stats = {
    totalOrders: 156,
    totalRevenue: 289450,
    totalProducts: 89,
    totalCustomers: 234,
    pendingOrders: 12,
    lowStock: 5
  }

  // Sample recent orders
  const recentOrders: RecentOrder[] = [
    { id: 'ORD-001', customer: 'Ahmed Khan', amount: 12999, status: 'delivered', date: '2024-03-15' },
    { id: 'ORD-002', customer: 'Fatima Ali', amount: 8999, status: 'shipped', date: '2024-03-14' },
    { id: 'ORD-003', customer: 'Yusuf Mohammed', amount: 3499, status: 'processing', date: '2024-03-14' },
    { id: 'ORD-004', customer: 'Aisha Syed', amount: 5999, status: 'pending', date: '2024-03-13' },
    { id: 'ORD-005', customer: 'Omar Hassan', amount: 4499, status: 'delivered', date: '2024-03-12' }
  ]

  // Sample top products
  const topProducts: TopProduct[] = [
    { id: '1', name: '24K Gold Necklace', sales: 45, revenue: 584955, image: '/images/n1.jpeg' },
    { id: '2', name: '22K Gold Earrings', sales: 38, revenue: 132962, image: '/images/n2.jpeg' },
    { id: '3', name: 'Diamond Ring', sales: 27, revenue: 161973, image: '/images/n3.jpeg' },
    { id: '4', name: 'Gold Bangles', sales: 23, revenue: 206977, image: '/images/n4.jpeg' }
  ]

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'shipped': return 'bg-purple-100 text-purple-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Bismillah */}
      <div className="bg-gradient-to-r from-amber-700 to-yellow-700 text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-2xl mb-2">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
              <h1 className="text-3xl md:text-4xl font-bold">Admin Dashboard</h1>
              <p className="text-amber-100 mt-2">Welcome back, Hafiz Sajid Syed</p>
            </div>
            
            {/* Date Range Selector */}
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 bg-white/20 text-white border border-white/30 rounded-lg focus:outline-none focus:bg-white/30"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500 mb-1">Total Orders</p>
            <p className="text-2xl font-bold text-gray-800">{stats.totalOrders}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500 mb-1">Revenue</p>
            <p className="text-2xl font-bold text-green-600">${stats.totalRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500 mb-1">Products</p>
            <p className="text-2xl font-bold text-gray-800">{stats.totalProducts}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500 mb-1">Customers</p>
            <p className="text-2xl font-bold text-gray-800">{stats.totalCustomers}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500 mb-1">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.pendingOrders}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500 mb-1">Low Stock</p>
            <p className="text-2xl font-bold text-red-600">{stats.lowStock}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold mb-4">Revenue Overview</h3>
            <div className="h-64 flex items-end justify-between gap-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                <div key={day} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-yellow-500 rounded-t"
                    style={{ height: `${Math.random() * 150 + 50}px` }}
                  ></div>
                  <span className="text-xs mt-2 text-gray-600">{day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Orders by Category */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold mb-4">Orders by Category</h3>
            <div className="space-y-4">
              {[
                { cat: 'Necklaces', count: 45, color: 'bg-yellow-500' },
                { cat: 'Earrings', count: 38, color: 'bg-blue-500' },
                { cat: 'Rings', count: 27, color: 'bg-green-500' },
                { cat: 'Bangles', count: 23, color: 'bg-purple-500' },
                { cat: 'Chains', count: 15, color: 'bg-red-500' }
              ].map(item => (
                <div key={item.cat}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.cat}</span>
                    <span className="font-bold">{item.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${item.color} h-2 rounded-full`} 
                      style={{ width: `${(item.count / 45) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders and Top Products */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Recent Orders</h3>
              <Link href="/admin/orders" className="text-sm text-yellow-600 hover:underline">
                View All
              </Link>
            </div>
            
            <div className="space-y-3">
              {recentOrders.map(order => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-bold text-gray-800">{order.customer}</p>
                    <p className="text-sm text-gray-500">{order.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${order.amount.toLocaleString()}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Top Products</h3>
              <Link href="/admin/products" className="text-sm text-yellow-600 hover:underline">
                View All
              </Link>
            </div>
            
            <div className="space-y-3">
              {topProducts.map(product => (
                <div key={product.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                  <div className="relative w-12 h-12">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.sales} sales</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">${product.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/admin/products/add"
              className="p-4 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition"
            >
              <div className="text-3xl mb-2">➕</div>
              <span className="text-sm font-medium">Add Product</span>
            </Link>
            <Link
              href="/admin/orders"
              className="p-4 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition"
            >
              <div className="text-3xl mb-2">📦</div>
              <span className="text-sm font-medium">View Orders</span>
            </Link>
            <Link
              href="/admin/users"
              className="p-4 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition"
            >
              <div className="text-3xl mb-2">👥</div>
              <span className="text-sm font-medium">Manage Users</span>
            </Link>
            <Link
              href="/admin/settings"
              className="p-4 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition"
            >
              <div className="text-3xl mb-2">⚙️</div>
              <span className="text-sm font-medium">Settings</span>
            </Link>
          </div>
        </div>

        {/* Admin Info */}
        <div className="mt-8 bg-gray-100 py-4 text-center text-sm rounded">
          <p>Hafiz Sajid Syed | sajid.syed@gmail.com | +1 (234) 567-890</p>
        </div>
      </div>
    </div>
  )
}
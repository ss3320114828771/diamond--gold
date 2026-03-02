// app/admin/orders/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

type Order = {
  id: string
  customer: string
  date: string
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentStatus: 'paid' | 'unpaid' | 'refunded'
  items: number
}

export default function AdminOrdersPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')

  // Sample orders data
  const orders: Order[] = [
    {
      id: 'ORD-001',
      customer: 'Ahmed Khan',
      date: '2024-03-15',
      total: 12999,
      status: 'delivered',
      paymentStatus: 'paid',
      items: 2
    },
    {
      id: 'ORD-002',
      customer: 'Fatima Ali',
      date: '2024-03-14',
      total: 8999,
      status: 'shipped',
      paymentStatus: 'paid',
      items: 1
    },
    {
      id: 'ORD-003',
      customer: 'Yusuf Mohammed',
      date: '2024-03-14',
      total: 3499,
      status: 'processing',
      paymentStatus: 'paid',
      items: 3
    },
    {
      id: 'ORD-004',
      customer: 'Aisha Syed',
      date: '2024-03-13',
      total: 5999,
      status: 'pending',
      paymentStatus: 'unpaid',
      items: 1
    },
    {
      id: 'ORD-005',
      customer: 'Omar Hassan',
      date: '2024-03-12',
      total: 4499,
      status: 'delivered',
      paymentStatus: 'paid',
      items: 2
    },
    {
      id: 'ORD-006',
      customer: 'Zainab Ahmed',
      date: '2024-03-11',
      total: 18999,
      status: 'cancelled',
      paymentStatus: 'refunded',
      items: 3
    },
    {
      id: 'ORD-007',
      customer: 'Bilal Khan',
      date: '2024-03-10',
      total: 7999,
      status: 'processing',
      paymentStatus: 'paid',
      items: 2
    },
    {
      id: 'ORD-008',
      customer: 'Mariam Ali',
      date: '2024-03-09',
      total: 2499,
      status: 'delivered',
      paymentStatus: 'paid',
      items: 1
    }
  ]

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'shipped': return 'bg-purple-100 text-purple-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch(status) {
      case 'paid': return 'bg-green-100 text-green-800'
      case 'unpaid': return 'bg-yellow-100 text-yellow-800'
      case 'refunded': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Filter orders
  const filteredOrders = orders
    .filter(order => 
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase())
    )
    .filter(order => statusFilter === 'all' || order.status === statusFilter)
    .filter(order => {
      if (dateFilter === 'all') return true
      const days = {
        'today': 0,
        'week': 7,
        'month': 30
      }
      const orderDate = new Date(order.date)
      const now = new Date()
      const diffDays = Math.floor((now.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24))
      return diffDays <= days[dateFilter as keyof typeof days]
    })

  // Calculate stats
  const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.total, 0)
  const pendingOrders = filteredOrders.filter(o => o.status === 'pending').length
  const processingOrders = filteredOrders.filter(o => o.status === 'processing').length
  const shippedOrders = filteredOrders.filter(o => o.status === 'shipped').length
  const deliveredOrders = filteredOrders.filter(o => o.status === 'delivered').length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Bismillah */}
      <div className="bg-gradient-to-r from-amber-700 to-yellow-700 text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-2xl mb-2">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          <h1 className="text-3xl md:text-4xl font-bold">Manage Orders</h1>
          <p className="text-amber-100 mt-2">View and manage all customer orders</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-2xl font-bold">{filteredOrders.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500">Revenue</p>
            <p className="text-2xl font-bold text-green-600">${totalRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{pendingOrders}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500">Processing</p>
            <p className="text-2xl font-bold text-blue-600">{processingOrders}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500">Shipped</p>
            <p className="text-2xl font-bold text-purple-600">{shippedOrders}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            {/* Search */}
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Search by order ID or customer..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>

            {/* Date Filter */}
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>

            {/* Export Button */}
            <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">
              Export CSV
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-gray-900">{order.id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.customer}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(order.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{order.items}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">
                        ${order.total.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="text-yellow-600 hover:text-yellow-900 mr-3"
                      >
                        View
                      </Link>
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No orders found matching your filters</p>
            </div>
          )}

          {/* Pagination */}
          <div className="bg-white px-4 py-3 border-t flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="px-4 py-2 border rounded text-sm">Previous</button>
              <button className="px-4 py-2 border rounded text-sm">Next</button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredOrders.length}</span> of{' '}
                  <span className="font-medium">{filteredOrders.length}</span> results
                </p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 border rounded bg-yellow-500 text-white">1</button>
                <button className="px-3 py-1 border rounded hover:bg-gray-50">2</button>
                <button className="px-3 py-1 border rounded hover:bg-gray-50">3</button>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Info */}
        <div className="mt-8 bg-gray-100 py-4 text-center text-sm rounded">
          <p>Hafiz Sajid Syed | sajid.syed@gmail.com</p>
        </div>
      </div>
    </div>
  )
}
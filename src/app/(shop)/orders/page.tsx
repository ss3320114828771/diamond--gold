// app/(shop)/orders/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type Order = {
  id: string
  date: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  items: number
  image: string
}

export default function OrdersPage() {
  const [filter, setFilter] = useState('all')

  // Sample orders data
  const orders: Order[] = [
    {
      id: 'ORD-001',
      date: '2024-03-15',
      status: 'delivered',
      total: 12999,
      items: 2,
      image: '/images/n1.jpeg'
    },
    {
      id: 'ORD-002',
      date: '2024-03-10',
      status: 'shipped',
      total: 8999,
      items: 1,
      image: '/images/n3.jpeg'
    },
    {
      id: 'ORD-003',
      date: '2024-03-05',
      status: 'processing',
      total: 3499,
      items: 3,
      image: '/images/n2.jpeg'
    },
    {
      id: 'ORD-004',
      date: '2024-02-28',
      status: 'pending',
      total: 5999,
      items: 1,
      image: '/images/n4.jpeg'
    },
    {
      id: 'ORD-005',
      date: '2024-02-20',
      status: 'cancelled',
      total: 4499,
      items: 2,
      image: '/images/n5.jpeg'
    },
    {
      id: 'ORD-006',
      date: '2024-02-15',
      status: 'delivered',
      total: 18999,
      items: 3,
      image: '/images/n6.jpeg'
    }
  ]

  const getStatusColor = (status: Order['status']) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'shipped': return 'bg-purple-100 text-purple-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Bismillah */}
      <div className="bg-gradient-to-r from-amber-700 to-yellow-700 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-2xl mb-2">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          <h1 className="text-3xl md:text-4xl font-bold">My Orders</h1>
          <p className="text-amber-100 mt-2">Track and manage your orders</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition
                  ${filter === status 
                    ? 'bg-yellow-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No orders found</h3>
            <p className="text-gray-600 mb-6">You haven't placed any {filter !== 'all' ? filter : ''} orders yet.</p>
            <Link 
              href="/products"
              className="inline-block px-6 py-3 bg-yellow-500 text-white rounded-lg font-bold hover:bg-yellow-600 transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <Link
                key={order.id}
                href={`/orders/${order.id}`}
                className="block bg-white rounded-lg shadow hover:shadow-md transition"
              >
                <div className="p-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Order #{order.id}</p>
                      <p className="text-sm text-gray-500">Placed on {new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={order.image}
                        alt={`Order ${order.id}`}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-600">
                        {order.items} {order.items === 1 ? 'item' : 'items'}
                      </p>
                      <p className="text-xl font-bold text-gray-800">${order.total.toLocaleString()}</p>
                    </div>
                    <div className="text-yellow-500">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Summary Stats */}
        {filteredOrders.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-gray-800">{orders.length}</p>
              <p className="text-sm text-gray-600">Total Orders</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-green-600">
                ${orders.reduce((sum, o) => sum + o.total, 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Total Spent</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {orders.filter(o => o.status === 'delivered').length}
              </p>
              <p className="text-sm text-gray-600">Delivered</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">
                {orders.filter(o => o.status === 'shipped' || o.status === 'processing').length}
              </p>
              <p className="text-sm text-gray-600">Active</p>
            </div>
          </div>
        )}

        {/* Need Help Section */}
        <div className="mt-8 bg-amber-50 rounded-lg p-6 text-center">
          <h3 className="text-lg font-bold mb-2">Need help with an order?</h3>
          <p className="text-gray-600 mb-4">Contact our customer support for assistance</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="flex items-center gap-1">📞 +1 (234) 567-890</span>
            <span className="flex items-center gap-1">✉️ support@hsgold.com</span>
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
// components/admin/recent-orders.tsx
'use client'

import Link from 'next/link'

type Order = {
  id: string
  customer: string
  amount: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  date: string
  items?: number
}

type RecentOrdersProps = {
  orders: Order[]
  title?: string
  showViewAll?: boolean
  maxItems?: number
}

export default function RecentOrders({ 
  orders, 
  title = 'Recent Orders', 
  showViewAll = true,
  maxItems = 5
}: RecentOrdersProps) {
  
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

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'delivered': return '✅'
      case 'shipped': return '📦'
      case 'processing': return '⚙️'
      case 'pending': return '⏳'
      case 'cancelled': return '❌'
      default: return '📝'
    }
  }

  // Take only the most recent orders
  const recentOrders = orders.slice(0, maxItems)

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="px-6 py-4 border-b flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        {showViewAll && orders.length > maxItems && (
          <Link 
            href="/admin/orders" 
            className="text-sm text-yellow-600 hover:text-yellow-700 font-medium"
          >
            View All →
          </Link>
        )}
      </div>

      {/* Orders List */}
      <div className="divide-y divide-gray-100">
        {recentOrders.map((order) => (
          <div key={order.id} className="px-6 py-4 hover:bg-gray-50 transition">
            <div className="flex items-center justify-between">
              {/* Left side - Order info */}
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{getStatusIcon(order.status)}</span>
                  <div>
                    <Link 
                      href={`/admin/orders/${order.id}`}
                      className="font-medium text-gray-900 hover:text-yellow-600 transition"
                    >
                      {order.id}
                    </Link>
                    <p className="text-sm text-gray-500">{order.customer}</p>
                  </div>
                </div>
              </div>

              {/* Right side - Amount and Status */}
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-bold text-gray-900">${order.amount.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                </div>
                <span className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusColor(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>

            {/* Optional: Items count */}
            {order.items && (
              <div className="mt-2 text-xs text-gray-500">
                {order.items} {order.items === 1 ? 'item' : 'items'}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {recentOrders.length === 0 && (
        <div className="px-6 py-12 text-center">
          <p className="text-gray-500">No recent orders</p>
        </div>
      )}

      {/* Mobile View All Button (if not in header) */}
      {showViewAll && orders.length > maxItems && (
        <div className="px-6 py-3 border-t md:hidden">
          <Link 
            href="/admin/orders" 
            className="block w-full text-center text-sm text-yellow-600 hover:text-yellow-700 font-medium py-2"
          >
            View All Orders →
          </Link>
        </div>
      )}
    </div>
  )
}
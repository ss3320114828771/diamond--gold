// components/admin/stats-cards.tsx
'use client'

type StatsData = {
  totalOrders: number
  totalRevenue: number
  totalProducts: number
  totalCustomers: number
  pendingOrders?: number
  lowStock?: number
  averageOrder?: number
  conversionRate?: number
}

type StatsCardsProps = {
  data: StatsData
  title?: string
  showDetailed?: boolean
}

export default function StatsCards({ data, title = 'Dashboard Overview', showDetailed = false }: StatsCardsProps) {
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  // Calculate average order value if not provided
  const averageOrder = data.averageOrder || 
    (data.totalOrders > 0 ? Math.round(data.totalRevenue / data.totalOrders) : 0)

  return (
    <div className="space-y-4">
      {/* Title */}
      {title && (
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <select className="px-3 py-1 border rounded-lg text-sm focus:outline-none focus:border-yellow-500">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
          </select>
        </div>
      )}

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Orders */}
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">📦</span>
            </div>
            <span className="text-xs text-gray-400">+12.5%</span>
          </div>
          <p className="text-sm text-gray-500 mb-1">Total Orders</p>
          <p className="text-2xl font-bold text-gray-800">{data.totalOrders.toLocaleString()}</p>
          <div className="mt-2 text-xs text-green-600">↑ 8% from last month</div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">💰</span>
            </div>
            <span className="text-xs text-gray-400">+8.2%</span>
          </div>
          <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
          <p className="text-2xl font-bold text-green-600">{formatCurrency(data.totalRevenue)}</p>
          <div className="mt-2 text-xs text-green-600">↑ 15% from last month</div>
        </div>

        {/* Total Products */}
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">💎</span>
            </div>
            <span className="text-xs text-gray-400">+5.3%</span>
          </div>
          <p className="text-sm text-gray-500 mb-1">Total Products</p>
          <p className="text-2xl font-bold text-gray-800">{data.totalProducts.toLocaleString()}</p>
          <div className="mt-2 text-xs text-blue-600">{data.lowStock || 0} low in stock</div>
        </div>

        {/* Total Customers */}
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">👥</span>
            </div>
            <span className="text-xs text-gray-400">+18.7%</span>
          </div>
          <p className="text-sm text-gray-500 mb-1">Total Customers</p>
          <p className="text-2xl font-bold text-gray-800">{data.totalCustomers.toLocaleString()}</p>
          <div className="mt-2 text-xs text-green-600">↑ 22 new this month</div>
        </div>
      </div>

      {/* Detailed Stats - Optional second row */}
      {showDetailed && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {/* Average Order Value */}
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-xs text-gray-500 mb-1">Average Order</p>
            <p className="text-lg font-bold text-gray-800">{formatCurrency(averageOrder)}</p>
            <div className="mt-1 text-xs text-green-600">↑ 5%</div>
          </div>

          {/* Pending Orders */}
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-xs text-gray-500 mb-1">Pending Orders</p>
            <p className="text-lg font-bold text-yellow-600">{data.pendingOrders || 0}</p>
            <div className="mt-1 text-xs text-gray-500">Need attention</div>
          </div>

          {/* Low Stock Alert */}
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-xs text-gray-500 mb-1">Low Stock Items</p>
            <p className="text-lg font-bold text-orange-600">{data.lowStock || 0}</p>
            <div className="mt-1 text-xs text-red-600">Reorder soon</div>
          </div>

          {/* Conversion Rate */}
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-xs text-gray-500 mb-1">Conversion Rate</p>
            <p className="text-lg font-bold text-blue-600">{data.conversionRate || '3.2'}%</p>
            <div className="mt-1 text-xs text-green-600">↑ 0.5%</div>
          </div>
        </div>
      )}
    </div>
  )
}
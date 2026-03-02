// app/admin/orders/[id]/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'

type OrderItem = {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  purity?: string
  weight?: number
}

type Order = {
  id: string
  date: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentStatus: 'paid' | 'unpaid' | 'refunded'
  paymentMethod: string
  subtotal: number
  shipping: number
  tax: number
  total: number
  items: OrderItem[]
  customer: {
    id: string
    name: string
    email: string
    phone: string
  }
  shippingAddress: {
    address: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  trackingNumber?: string
  notes?: string
}

export default function AdminOrderDetailPage() {
  const params = useParams()
  const orderId = params.id as string
  
  const [order, setOrder] = useState<Order>({
    id: orderId,
    date: '2024-03-15',
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: 'Credit Card',
    subtotal: 17498,
    shipping: 25,
    tax: 1449.99,
    total: 18972.99,
    items: [
      {
        id: '1',
        name: '24K Gold Kundan Necklace',
        price: 12999,
        quantity: 1,
        image: '/images/n1.jpeg',
        purity: '24K',
        weight: 45.5
      },
      {
        id: '2',
        name: '22K Gold Jhumka Earrings',
        price: 3499,
        quantity: 2,
        image: '/images/n2.jpeg',
        purity: '22K',
        weight: 12.8
      }
    ],
    customer: {
      id: 'CUST-001',
      name: 'Ahmed Khan',
      email: 'ahmed.khan@email.com',
      phone: '+1 234 567 8900'
    },
    shippingAddress: {
      address: '123 Jewelry Street, Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    trackingNumber: 'TRK123456789',
    notes: 'Customer requested gift wrapping. Please include a note card.'
  })

  const [isEditing, setIsEditing] = useState(false)
  const [status, setStatus] = useState(order.status)
  const [tracking, setTracking] = useState(order.trackingNumber || '')
  const [notes, setNotes] = useState(order.notes || '')

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

  const handleSave = () => {
    // Save changes logic
    setOrder(prev => ({
      ...prev,
      status: status as Order['status'],
      trackingNumber: tracking,
      notes: notes
    }))
    setIsEditing(false)
    alert('Order updated successfully')
  }

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus as Order['status'])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Bismillah */}
      <div className="bg-gradient-to-r from-amber-700 to-yellow-700 text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-2xl mb-2">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
              <h1 className="text-3xl md:text-4xl font-bold">Order Details</h1>
              <p className="text-amber-100 mt-2">Order #{orderId}</p>
            </div>
            
            <div className="flex gap-2">
              <Link
                href="/admin/orders"
                className="px-4 py-2 bg-white/20 text-white rounded hover:bg-white/30 transition"
              >
                Back to Orders
              </Link>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                >
                  Edit Order
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                >
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Order Status Bar */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <p className="text-sm text-gray-500">Order Date</p>
                <p className="font-bold">{new Date(order.date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                {isEditing ? (
                  <select
                    value={status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="px-3 py-1 border rounded focus:outline-none focus:border-yellow-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                ) : (
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment</p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${getPaymentStatusColor(order.paymentStatus)}`}>
                  {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-xl font-bold text-yellow-600">${order.total.toFixed(2)}</p>
              </div>
            </div>
            
            {order.trackingNumber && (
              <div className="bg-blue-50 px-4 py-2 rounded">
                <p className="text-sm text-blue-800">Tracking: {order.trackingNumber}</p>
              </div>
            )}
          </div>

          {/* Tracking Input (when editing) */}
          {isEditing && (
            <div className="mt-4 pt-4 border-t">
              <label className="block text-sm font-medium mb-2">Tracking Number</label>
              <input
                type="text"
                value={tracking}
                onChange={(e) => setTracking(e.target.value)}
                placeholder="Enter tracking number"
                className="w-full md:w-96 px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
              />
            </div>
          )}
        </div>

        {/* Order Items and Customer Info */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Order Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Items */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Order Items</h2>
              
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4 py-4 border-b last:border-0">
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-bold">{item.name}</h3>
                          <div className="flex gap-2 mt-1 text-sm text-gray-600">
                            {item.purity && <span>Purity: {item.purity}</span>}
                            {item.weight && <span>Weight: {item.weight}g</span>}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">${item.price.toLocaleString()}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="mt-4 pt-4 border-t">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${order.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>${order.shipping}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>${order.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span className="text-yellow-600">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Order Notes</h2>
              {isEditing ? (
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                  placeholder="Add order notes..."
                />
              ) : (
                <p className="text-gray-700">{order.notes || 'No notes for this order'}</p>
              )}
            </div>
          </div>

          {/* Right Column - Customer Info */}
          <div className="space-y-6">
            {/* Customer Details */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Customer Details</h2>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-bold">{order.customer.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-blue-600">{order.customer.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p>{order.customer.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Customer ID</p>
                  <p className="text-sm">{order.customer.id}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <Link
                  href={`/admin/users/${order.customer.id}`}
                  className="text-yellow-600 hover:underline text-sm"
                >
                  View Customer Profile →
                </Link>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
              
              <div className="space-y-1">
                <p className="font-bold">{order.customer.name}</p>
                <p>{order.shippingAddress.address}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                <p>{order.shippingAddress.country}</p>
              </div>

              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="font-bold">{order.paymentMethod}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Actions</h2>
              
              <div className="space-y-3">
                <button className="w-full py-2 bg-yellow-500 text-white rounded font-bold hover:bg-yellow-600 transition">
                  Send Invoice
                </button>
                <button className="w-full py-2 bg-blue-500 text-white rounded font-bold hover:bg-blue-600 transition">
                  Contact Customer
                </button>
                <button className="w-full py-2 bg-red-500 text-white rounded font-bold hover:bg-red-600 transition">
                  Cancel Order
                </button>
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
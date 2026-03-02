// app/(shop)/orders/[id]/page.tsx
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
  total: number
  subtotal: number
  shipping: number
  tax: number
  paymentMethod: string
  trackingNumber?: string
  estimatedDelivery?: string
  items: OrderItem[]
  shippingAddress: {
    name: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
    phone: string
  }
}

export default function OrderDetailPage() {
  const params = useParams()
  const orderId = params.id as string

  // Sample order data - in real app, fetch from API
  const [order] = useState<Order>({
    id: orderId,
    date: '2024-03-15',
    status: 'shipped',
    total: 18972.99,
    subtotal: 17498,
    shipping: 25,
    tax: 1449.99,
    paymentMethod: 'Credit Card',
    trackingNumber: 'TRK123456789',
    estimatedDelivery: '2024-03-20',
    items: [
      {
        id: '1',
        name: '24K Gold Necklace',
        price: 12999,
        quantity: 1,
        image: '/images/n1.jpeg',
        purity: '24K',
        weight: 45.5
      },
      {
        id: '2',
        name: '22K Gold Earrings',
        price: 3499,
        quantity: 2,
        image: '/images/n2.jpeg',
        purity: '22K',
        weight: 12.8
      }
    ],
    shippingAddress: {
      name: 'Ahmed Khan',
      address: '123 Jewelry Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
      phone: '+1 234 567 8900'
    }
  })

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Bismillah */}
      <div className="bg-gradient-to-r from-amber-700 to-yellow-700 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-2xl mb-2">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          <h1 className="text-3xl md:text-4xl font-bold">Order Details</h1>
          <p className="text-amber-100 mt-2">Order #{orderId.slice(0, 8)}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          href="/orders" 
          className="inline-flex items-center text-gray-600 hover:text-yellow-600 mb-6"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Orders
        </Link>

        {/* Order Status Bar */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500">Order Placed</p>
              <p className="font-bold">{new Date(order.date).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total</p>
              <p className="font-bold text-xl">${order.total.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(order.status)}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
            {order.trackingNumber && (
              <div>
                <p className="text-sm text-gray-500">Tracking #</p>
                <p className="font-mono text-sm">{order.trackingNumber}</p>
              </div>
            )}
          </div>

          {/* Progress Bar for Shipped Orders */}
          {order.status === 'shipped' && order.estimatedDelivery && (
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Shipped</span>
                <span>Estimated Delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full w-2/3"></div>
              </div>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Items Ordered</h2>
              
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

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
              <div className="text-gray-700">
                <p className="font-bold">{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.address}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                <p>{order.shippingAddress.country}</p>
                <p className="mt-2">Phone: {order.shippingAddress.phone}</p>
              </div>
            </div>
          </div>

          {/* Right Column - Summary & Actions */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
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

              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-gray-600">Payment Method</p>
                <p className="font-bold">{order.paymentMethod}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Actions</h2>
              
              <div className="space-y-3">
                {order.status !== 'delivered' && order.status !== 'cancelled' && (
                  <button className="w-full py-2 bg-yellow-500 text-white rounded font-bold hover:bg-yellow-600 transition">
                    Track Order
                  </button>
                )}
                
                <button className="w-full py-2 bg-gray-100 text-gray-700 rounded font-bold hover:bg-gray-200 transition">
                  View Invoice
                </button>
                
                <button className="w-full py-2 bg-gray-100 text-gray-700 rounded font-bold hover:bg-gray-200 transition">
                  Need Help?
                </button>

                {order.status === 'delivered' && (
                  <button className="w-full py-2 bg-green-500 text-white rounded font-bold hover:bg-green-600 transition">
                    Buy Again
                  </button>
                )}
              </div>
            </div>

            {/* Support Contact */}
            <div className="bg-amber-50 rounded-lg p-6">
              <h3 className="font-bold mb-2">Need Assistance?</h3>
              <p className="text-sm text-gray-600 mb-3">
                Contact our support team for any questions about your order.
              </p>
              <div className="space-y-1 text-sm">
                <p>📞 +1 (234) 567-890</p>
                <p>✉️ support@hsgold.com</p>
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
// components/checkout/order-summary.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'

type OrderItem = {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  purity?: string
  weight?: number
}

type OrderSummaryProps = {
  items: OrderItem[]
  subtotal: number
  shipping?: number
  tax?: number
  discount?: number
  total?: number
  showItems?: boolean
  className?: string
}

export default function OrderSummary({
  items,
  subtotal,
  shipping = 25,
  tax = subtotal * 0.08,
  discount = 0,
  total = subtotal + shipping + tax - discount,
  showItems = true,
  className = ''
}: OrderSummaryProps) {
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(price)
  }

  return (
    <div className={`bg-white rounded-lg shadow ${className}`}>
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="text-lg font-bold text-gray-800">Order Summary</h2>
      </div>

      {/* Items List */}
      {showItems && (
        <div className="p-4 border-b max-h-96 overflow-y-auto">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3">
                {/* Item Image */}
                <Link href={`/products/${item.id}`} className="flex-shrink-0">
                  <div className="relative w-16 h-16 bg-gray-100 rounded overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover hover:scale-110 transition duration-300"
                    />
                  </div>
                </Link>

                {/* Item Details */}
                <div className="flex-1 min-w-0">
                  <Link 
                    href={`/products/${item.id}`}
                    className="text-sm font-medium text-gray-800 hover:text-yellow-600 transition line-clamp-1"
                  >
                    {item.name}
                  </Link>
                  
                  <div className="flex items-center gap-2 mt-1">
                    {item.purity && (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded">
                        {item.purity}
                      </span>
                    )}
                    {item.weight && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                        {item.weight}g
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                    <span className="text-sm font-bold text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Price Breakdown */}
      <div className="p-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-gray-900">{formatPrice(subtotal)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Discount</span>
            <span className="font-medium text-green-600">-{formatPrice(discount)}</span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium text-gray-900">
            {shipping === 0 ? 'Free' : formatPrice(shipping)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium text-gray-900">{formatPrice(tax)}</span>
        </div>

        <div className="flex justify-between text-base font-bold pt-3 border-t">
          <span>Total</span>
          <span className="text-yellow-600">{formatPrice(total)}</span>
        </div>
      </div>

      {/* Promo Code Note */}
      <div className="px-4 pb-4">
        <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-700">
          <p className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Have a promo code? Enter it on the cart page.
          </p>
        </div>
      </div>

      {/* Guarantee Badge */}
      <div className="px-4 pb-4 text-center">
        <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>Secure transaction • 30-day returns</span>
        </div>
      </div>
    </div>
  )
}
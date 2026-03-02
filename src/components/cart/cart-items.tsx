// components/cart/cart-items.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  purity?: string
  weight?: number
  maxQuantity?: number
}

type CartItemsProps = {
  items: CartItem[]
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemoveItem: (id: string) => void
  readOnly?: boolean
}

export default function CartItems({ 
  items, 
  onUpdateQuantity, 
  onRemoveItem,
  readOnly = false 
}: CartItemsProps) {
  const [removingId, setRemovingId] = useState<string | null>(null)

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    onUpdateQuantity(id, newQuantity)
  }

  const handleRemove = (id: string) => {
    setRemovingId(id)
    // Add small delay for animation
    setTimeout(() => {
      onRemoveItem(id)
      setRemovingId(null)
    }, 300)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg">
        <p className="text-gray-500">Your cart is empty</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className={`
            bg-white rounded-lg shadow p-4 transition-all duration-300
            ${removingId === item.id ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
          `}
        >
          <div className="flex gap-4">
            {/* Product Image */}
            <Link href={`/products/${item.id}`} className="flex-shrink-0">
              <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover hover:scale-110 transition duration-300"
                />
              </div>
            </Link>

            {/* Product Details */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div>
                  <Link 
                    href={`/products/${item.id}`}
                    className="text-lg font-bold text-gray-800 hover:text-yellow-600 transition line-clamp-1"
                  >
                    {item.name}
                  </Link>
                  
                  {/* Product Attributes */}
                  <div className="flex flex-wrap gap-2 mt-1">
                    {item.purity && (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                        {item.purity}
                      </span>
                    )}
                    {item.weight && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {item.weight}g
                      </span>
                    )}
                  </div>
                </div>

                {/* Price */}
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatPrice(item.price)} each
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between mt-4 pt-2 border-t">
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">Qty:</label>
                  
                  {readOnly ? (
                    <span className="font-bold px-4 py-2">{item.quantity}</span>
                  ) : (
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-l-lg disabled:opacity-50 disabled:hover:bg-transparent"
                      >
                        −
                      </button>
                      <span className="w-10 text-center font-bold">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        disabled={item.maxQuantity ? item.quantity >= item.maxQuantity : false}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-lg disabled:opacity-50 disabled:hover:bg-transparent"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>

                {!readOnly && (
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1 transition"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
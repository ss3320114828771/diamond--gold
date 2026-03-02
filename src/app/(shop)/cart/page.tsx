// app/(shop)/cart/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  purity?: string
  weight?: number
  inStock: boolean
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: '24K Gold Diamond Ring',
      price: 4999.99,
      quantity: 1,
      image: '/images/n1.jpeg',
      purity: '24K',
      weight: 15.5,
      inStock: true
    },
    {
      id: '2',
      name: '18K Gold Necklace',
      price: 2999.99,
      quantity: 2,
      image: '/images/n3.jpeg',
      purity: '18K',
      weight: 25.0,
      inStock: true
    },
    {
      id: '3',
      name: 'Platinum Diamond Bracelet',
      price: 6999.99,
      quantity: 1,
      image: '/images/n5.jpeg',
      purity: '950',
      weight: 20.0,
      inStock: false
    }
  ])

  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError, setPromoError] = useState('')
  const [shippingMethod, setShippingMethod] = useState('standard')

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'GOLD2024') {
      setPromoApplied(true)
      setPromoError('')
    } else {
      setPromoError('Invalid promo code')
    }
  }

  // Calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const shipping = subtotal > 10000 ? 0 : shippingMethod === 'express' ? 50 : 25
  const discount = promoApplied ? subtotal * 0.1 : 0 // 10% discount
  const tax = (subtotal - discount) * 0.08 // 8% tax
  const total = subtotal - discount + shipping + tax

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-3xl p-12 shadow-2xl">
            <div className="w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full 
                          flex items-center justify-center mx-auto mb-6 animate-bounce">
              <span className="text-5xl">🛒</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any jewelry to your cart yet.
            </p>
            <Link
              href="/products"
              className="inline-block px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 
                       text-white font-bold rounded-xl text-lg
                       hover:from-yellow-500 hover:to-orange-600
                       transform hover:scale-105 transition duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-purple-50 to-pink-50">
      {/* Header */}
      <section className="relative h-[30vh] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-pink-800/90 to-orange-800/90 z-10"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/n2.jpeg')" }}
          ></div>
        </div>

        <div className="relative z-20 h-full flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-3xl md:text-4xl text-yellow-300 font-arabic mb-4 animate-pulse">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Your Cart</h1>
            <p className="text-xl md:text-2xl text-gray-200">
              {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition duration-300
                            ${!item.inStock ? 'opacity-75' : ''}`}
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Product Image */}
                    <div className="relative w-32 h-32 flex-shrink-0">
                      <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 to-orange-500 
                                    rounded-2xl blur opacity-50"></div>
                      <div className="relative w-full h-full rounded-2xl overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            {item.purity && (
                              <span className="flex items-center gap-1">
                                <span className="text-yellow-500">✨</span> Purity: {item.purity}
                              </span>
                            )}
                            {item.weight && (
                              <span className="flex items-center gap-1">
                                <span className="text-yellow-500">⚖️</span> Weight: {item.weight}g
                              </span>
                            )}
                          </div>
                          {!item.inStock && (
                            <p className="text-red-500 text-sm mt-2 font-bold">
                              ⚠️ Out of Stock - Will be backordered
                            </p>
                          )}
                        </div>

                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-800">
                            ${(item.price * item.quantity).toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            ${item.price.toLocaleString()} each
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-2">
                          <label className="text-sm text-gray-600">Qty:</label>
                          <div className="flex items-center border-2 border-gray-200 rounded-xl">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-10 h-10 flex items-center justify-center text-gray-600 
                                       hover:bg-gray-100 transition rounded-l-xl"
                              disabled={item.quantity <= 1}
                            >
                              −
                            </button>
                            <span className="w-12 text-center font-bold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-10 h-10 flex items-center justify-center text-gray-600 
                                       hover:bg-gray-100 transition rounded-r-xl"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 font-medium 
                                   flex items-center gap-1 transition"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue Shopping Link */}
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-yellow-600 
                         transition mt-4"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl p-6 shadow-xl sticky top-24">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

                {/* Promo Code */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl
                               focus:border-yellow-400 focus:outline-none transition"
                      disabled={promoApplied}
                    />
                    <button
                      onClick={applyPromoCode}
                      disabled={promoApplied}
                      className="px-4 py-3 bg-gray-900 text-white font-bold rounded-xl
                               hover:bg-gray-800 transition disabled:opacity-50"
                    >
                      Apply
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="text-green-500 text-sm mt-2">✓ Promo code applied (10% off)</p>
                  )}
                  {promoError && (
                    <p className="text-red-500 text-sm mt-2">{promoError}</p>
                  )}
                </div>

                {/* Shipping Method */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Shipping Method
                  </label>
                  <select
                    value={shippingMethod}
                    onChange={(e) => setShippingMethod(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl
                             focus:border-yellow-400 focus:outline-none transition"
                  >
                    <option value="standard">Standard Shipping ($25) - 5-7 days</option>
                    <option value="express">Express Shipping ($50) - 2-3 days</option>
                  </select>
                  {subtotal > 10000 && (
                    <p className="text-green-500 text-sm mt-2">
                      ✓ Free shipping on orders over $10,000
                    </p>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 py-4 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-bold">${subtotal.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount (10%)</span>
                      <span>-${discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-bold">
                      {shipping === 0 ? 'Free' : `$${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (8%)</span>
                    <span className="font-bold">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200">
                    <span>Total</span>
                    <span className="text-2xl text-yellow-600">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link
                  href="/checkout"
                  className="block w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 
                           text-white font-bold rounded-xl text-center text-lg
                           hover:from-yellow-500 hover:to-orange-600
                           transform hover:scale-105 transition duration-300
                           mb-3"
                >
                  Proceed to Checkout
                </Link>

                {/* Payment Methods */}
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-2">We accept:</p>
                  <div className="flex justify-center gap-3 text-2xl">
                    <span className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center">
                      V
                    </span>
                    <span className="w-10 h-10 bg-red-600 text-white rounded-lg flex items-center justify-center">
                      MC
                    </span>
                    <span className="w-10 h-10 bg-blue-400 text-white rounded-lg flex items-center justify-center">
                      PP
                    </span>
                    <span className="w-10 h-10 bg-gray-800 text-white rounded-lg flex items-center justify-center">
                      AP
                    </span>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="mt-4 text-center text-xs text-gray-500 flex items-center justify-center gap-1">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Secure Checkout
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Items */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-900 to-pink-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            You May Also <span className="text-yellow-300">Like</span>
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative mb-4 overflow-hidden rounded-2xl">
                  <Image
                    src={`/images/n${i}.jpeg`}
                    alt={`Related Product ${i}`}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent 
                                opacity-0 group-hover:opacity-100 transition duration-500"></div>
                  <button className="absolute bottom-4 left-4 right-4 bg-white text-gray-900 
                                   py-2 rounded-xl opacity-0 group-hover:opacity-100 
                                   transform translate-y-4 group-hover:translate-y-0 
                                   transition-all duration-500 font-bold">
                    Quick View
                  </button>
                </div>
                <h3 className="text-white font-bold">Diamond Pendant</h3>
                <p className="text-yellow-300">$2,999</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admin Info */}
      <section className="py-8 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          <p className="text-sm">
            Need help with your order? Contact our administrator:
          </p>
          <p className="font-bold text-gray-800 mt-2">
            Hafiz Sajid Syed | sajid.syed@gmail.com | +1 (234) 567-890
          </p>
        </div>
      </section>
    </div>
  )
}
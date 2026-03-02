// components/cart/cart-summary.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

type CartSummaryProps = {
  subtotal: number
  shipping?: number
  tax?: number
  discount?: number
  total?: number
  showCheckoutButton?: boolean
  checkoutLink?: string
  onCheckout?: () => void
  promoCode?: boolean
}

export default function CartSummary({
  subtotal,
  shipping = 25,
  tax = subtotal * 0.08,
  discount = 0,
  total = subtotal + shipping + tax - discount,
  showCheckoutButton = true,
  checkoutLink = '/checkout',
  onCheckout,
  promoCode = true
}: CartSummaryProps) {
  const [promoInput, setPromoInput] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError, setPromoError] = useState('')

  const handleApplyPromo = () => {
    if (promoInput.toUpperCase() === 'GOLD2024') {
      setPromoApplied(true)
      setPromoError('')
      // In real app, you'd update the discount
    } else {
      setPromoError('Invalid promo code')
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(price)
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 sticky top-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-bold">{formatPrice(subtotal)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-bold">
            {shipping === 0 ? 'Free' : formatPrice(shipping)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span className="font-bold">{formatPrice(tax)}</span>
        </div>

        <div className="flex justify-between text-lg font-bold pt-3 border-t">
          <span>Total</span>
          <span className="text-yellow-600">{formatPrice(total)}</span>
        </div>
      </div>

      {/* Promo Code */}
      {promoCode && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Promo Code
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              placeholder="Enter code"
              disabled={promoApplied}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 disabled:bg-gray-100"
            />
            <button
              onClick={handleApplyPromo}
              disabled={promoApplied}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg font-bold hover:bg-gray-800 transition disabled:opacity-50 disabled:hover:bg-gray-900"
            >
              Apply
            </button>
          </div>
          {promoApplied && (
            <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Promo code applied (10% off)
            </p>
          )}
          {promoError && (
            <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {promoError}
            </p>
          )}
        </div>
      )}

      {/* Free Shipping Message */}
      {subtotal >= 5000 && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd" />
          </svg>
          Congratulations! You've got free shipping!
        </div>
      )}

      {/* Checkout Button */}
      {showCheckoutButton && (
        <Link
          href={checkoutLink}
          onClick={onCheckout}
          className="block w-full py-4 bg-yellow-500 text-white text-center rounded-lg font-bold hover:bg-yellow-600 transition transform hover:scale-105 mb-3"
        >
          Proceed to Checkout
        </Link>
      )}

      {/* Payment Methods */}
      <div className="text-center">
        <p className="text-xs text-gray-500 mb-2">We accept:</p>
        <div className="flex justify-center gap-2">
          <span className="w-10 h-6 bg-blue-600 text-white text-xs rounded flex items-center justify-center font-bold">VISA</span>
          <span className="w-10 h-6 bg-red-600 text-white text-xs rounded flex items-center justify-center font-bold">MC</span>
          <span className="w-10 h-6 bg-blue-400 text-white text-xs rounded flex items-center justify-center font-bold">PP</span>
          <span className="w-10 h-6 bg-gray-800 text-white text-xs rounded flex items-center justify-center font-bold">AMEX</span>
        </div>
      </div>

      {/* Security Badge */}
      <div className="mt-4 text-xs text-gray-500 flex items-center justify-center gap-1">
        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        Secure Checkout
      </div>

      {/* Need Help Link */}
      <div className="mt-4 text-center">
        <Link href="/contact" className="text-sm text-gray-500 hover:text-yellow-600">
          Need help? Contact us
        </Link>
      </div>
    </div>
  )
}
// components/cart/cart-icon.tsx
'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

type CartIconProps = {
  itemCount?: number
  link?: string
  showBadge?: boolean
  className?: string
  iconSize?: number
}

export default function CartIcon({ 
  itemCount: propItemCount, 
  link = '/cart',
  showBadge = true,
  className = '',
  iconSize = 24
}: CartIconProps) {
  const [itemCount, setItemCount] = useState(propItemCount || 0)
  const [isAnimating, setIsAnimating] = useState(false)

  // In a real app, you'd get this from your cart context
  useEffect(() => {
    if (propItemCount !== undefined) {
      setItemCount(propItemCount)
    } else {
      // Example: Get from localStorage or context
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        const cart = JSON.parse(savedCart)
        const count = cart.reduce((sum: number, item: any) => sum + item.quantity, 0)
        setItemCount(count)
      }
    }
  }, [propItemCount])

  // Animate when count changes
  useEffect(() => {
    if (itemCount > 0) {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 300)
      return () => clearTimeout(timer)
    }
  }, [itemCount])

  return (
    <Link 
      href={link} 
      className={`relative inline-flex items-center justify-center ${className}`}
      aria-label="Shopping cart"
    >
      {/* Cart Icon */}
      <svg 
        width={iconSize} 
        height={iconSize} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="text-gray-700 hover:text-yellow-600 transition-colors"
      >
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>

      {/* Item Count Badge */}
      {showBadge && itemCount > 0 && (
        <span 
          className={`
            absolute -top-2 -right-2 min-w-[20px] h-5 
            bg-yellow-500 text-white text-xs font-bold 
            rounded-full flex items-center justify-center
            px-1 transition-all duration-300
            ${isAnimating ? 'scale-125' : 'scale-100'}
          `}
        >
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Link>
  )
}
// hooks/use-cart.ts
'use client'

import { useState, useEffect, useCallback } from 'react'

export type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  purity?: string
  weight?: number
  maxQuantity?: number
}

type CartState = {
  items: CartItem[]
  totalItems: number
  subtotal: number
  tax: number
  shipping: number
  total: number
  discount: number
  couponCode?: string
}

type UseCartReturn = {
  // State
  items: CartItem[]
  totalItems: number
  subtotal: number
  tax: number
  shipping: number
  total: number
  discount: number
  couponCode?: string
  isLoading: boolean
  error: string | null

  // Actions
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  incrementQuantity: (id: string) => void
  decrementQuantity: (id: string) => void
  clearCart: () => void
  applyCoupon: (code: string) => Promise<boolean>
  removeCoupon: () => void
  loadCart: () => void
  saveCart: () => void
}

const TAX_RATE = 0.08 // 8%
const SHIPPING_RATE = 25 // $25
const FREE_SHIPPING_THRESHOLD = 5000 // $5000

export function useCart(): UseCartReturn {
  const [items, setItems] = useState<CartItem[]>([])
  const [couponCode, setCouponCode] = useState<string>()
  const [discount, setDiscount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load cart from localStorage on mount
  useEffect(() => {
    loadCart()
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (items.length > 0 || localStorage.getItem('cart')) {
      saveCart()
    }
  }, [items])

  // Calculate totals
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const shipping = subtotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_RATE
  const tax = (subtotal - discount) * TAX_RATE
  const total = subtotal - discount + shipping + tax

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  // Load cart from localStorage
  const loadCart = useCallback(() => {
    setIsLoading(true)
    setError(null)

    try {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        const parsed = JSON.parse(savedCart)
        setItems(parsed.items || [])
        setCouponCode(parsed.couponCode)
        setDiscount(parsed.discount || 0)
      }
    } catch (err) {
      setError('Failed to load cart')
      console.error('Error loading cart:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Save cart to localStorage
  const saveCart = useCallback(() => {
    try {
      const cartData = {
        items,
        couponCode,
        discount,
        lastUpdated: new Date().toISOString()
      }
      localStorage.setItem('cart', JSON.stringify(cartData))
    } catch (err) {
      console.error('Error saving cart:', err)
    }
  }, [items, couponCode, discount])

  // Add item to cart
  const addItem = useCallback((
    newItem: Omit<CartItem, 'quantity'>,
    quantity: number = 1
  ) => {
    setIsLoading(true)
    setError(null)

    try {
      setItems(prevItems => {
        const existingItem = prevItems.find(item => item.id === newItem.id)

        if (existingItem) {
          // Update existing item quantity
          return prevItems.map(item =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        } else {
          // Add new item
          return [...prevItems, { ...newItem, quantity }]
        }
      })
    } catch (err) {
      setError('Failed to add item to cart')
      console.error('Error adding item:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Remove item from cart
  const removeItem = useCallback((id: string) => {
    setIsLoading(true)
    setError(null)

    try {
      setItems(prevItems => prevItems.filter(item => item.id !== id))
    } catch (err) {
      setError('Failed to remove item from cart')
      console.error('Error removing item:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Update item quantity
  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 0) return

    setIsLoading(true)
    setError(null)

    try {
      setItems(prevItems =>
        prevItems.map(item => {
          if (item.id !== id) return item

          // Check max quantity
          if (item.maxQuantity && quantity > item.maxQuantity) {
            quantity = item.maxQuantity
          }

          return { ...item, quantity }
        })
      )
    } catch (err) {
      setError('Failed to update quantity')
      console.error('Error updating quantity:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Increment quantity
  const incrementQuantity = useCallback((id: string) => {
    const item = items.find(i => i.id === id)
    if (item) {
      updateQuantity(id, item.quantity + 1)
    }
  }, [items, updateQuantity])

  // Decrement quantity
  const decrementQuantity = useCallback((id: string) => {
    const item = items.find(i => i.id === id)
    if (item && item.quantity > 1) {
      updateQuantity(id, item.quantity - 1)
    } else if (item && item.quantity === 1) {
      removeItem(id)
    }
  }, [items, updateQuantity, removeItem])

  // Clear cart
  const clearCart = useCallback(() => {
    setIsLoading(true)
    setError(null)

    try {
      setItems([])
      setCouponCode(undefined)
      setDiscount(0)
      localStorage.removeItem('cart')
    } catch (err) {
      setError('Failed to clear cart')
      console.error('Error clearing cart:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Apply coupon
  const applyCoupon = useCallback(async (code: string): Promise<boolean> => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call to validate coupon
      await new Promise(resolve => setTimeout(resolve, 500))

      // Mock coupon validation
      const validCoupons: Record<string, number> = {
        'GOLD10': 10, // 10% off
        'DIAMOND20': 20, // 20% off
        'FREESHIP': 0 // Free shipping (handled separately)
      }

      if (code.toUpperCase() in validCoupons) {
        const discountPercent = validCoupons[code.toUpperCase()]
        
        if (code.toUpperCase() === 'FREESHIP') {
          // Handle free shipping separately
          setDiscount(0)
        } else {
          // Apply percentage discount
          const discountAmount = (subtotal * discountPercent) / 100
          setDiscount(discountAmount)
        }

        setCouponCode(code.toUpperCase())
        setIsLoading(false)
        return true
      } else {
        throw new Error('Invalid coupon code')
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to apply coupon'
      setError(message)
      setIsLoading(false)
      return false
    }
  }, [subtotal])

  // Remove coupon
  const removeCoupon = useCallback(() => {
    setCouponCode(undefined)
    setDiscount(0)
    setError(null)
  }, [])

  return {
    // State
    items,
    totalItems,
    subtotal,
    tax,
    shipping,
    total,
    discount,
    couponCode,
    isLoading,
    error,

    // Actions
    addItem,
    removeItem,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
    loadCart,
    saveCart
  }
}
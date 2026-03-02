// lib/actions/cart.ts
'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

// Types
export type CartItem = {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image: string
  purity?: string
  weight?: number
  maxQuantity?: number
}

export type Cart = {
  items: CartItem[]
  couponCode?: string
  discount: number
  createdAt: string
  updatedAt: string
}

export type CartResponse = {
  success: boolean
  cart?: Cart
  error?: string
}

// Mock database (in real app, this would be in your database)
let carts = new Map<string, Cart>()

// Coupon codes
const validCoupons: Record<string, number> = {
  'GOLD10': 10, // 10% off
  'DIAMOND20': 20, // 20% off
  'FREESHIP': 0, // Free shipping (handled separately)
  'WELCOME15': 15, // 15% off for new users
  'SAVE25': 25 // 25% off
}

// Helper to get cart ID from session or create new
async function getCartId(): Promise<string> {
  const cookieStore = await cookies()
  let cartId = cookieStore.get('cartId')?.value

  if (!cartId) {
    cartId = `cart_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
    cookieStore.set('cartId', cartId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/'
    })

    // Initialize empty cart
    carts.set(cartId, {
      items: [],
      discount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })
  }

  return cartId
}

// Get current cart
export async function getCart(): Promise<Cart | null> {
  try {
    const cartId = await getCartId()
    const cart = carts.get(cartId)
    
    if (!cart) {
      return null
    }

    return cart
  } catch (error) {
    console.error('Error getting cart:', error)
    return null
  }
}

// Add item to cart
export async function addToCart(
  product: {
    id: string
    name: string
    price: number
    image: string
    purity?: string
    weight?: number
    maxQuantity?: number
  },
  quantity: number = 1
): Promise<CartResponse> {
  try {
    if (quantity < 1) {
      return {
        success: false,
        error: 'Quantity must be at least 1'
      }
    }

    const cartId = await getCartId()
    const cart = carts.get(cartId)

    if (!cart) {
      return {
        success: false,
        error: 'Cart not found'
      }
    }

    // Check if item already exists
    const existingItemIndex = cart.items.findIndex(
      item => item.productId === product.id
    )

    if (existingItemIndex >= 0) {
      // Update existing item
      const existingItem = cart.items[existingItemIndex]
      const newQuantity = existingItem.quantity + quantity

      // Check max quantity
      if (product.maxQuantity && newQuantity > product.maxQuantity) {
        return {
          success: false,
          error: `Maximum quantity for this item is ${product.maxQuantity}`
        }
      }

      cart.items[existingItemIndex] = {
        ...existingItem,
        quantity: newQuantity
      }
    } else {
      // Add new item
      const newItem: CartItem = {
        id: `item_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image,
        purity: product.purity,
        weight: product.weight,
        maxQuantity: product.maxQuantity
      }

      cart.items.push(newItem)
    }

    cart.updatedAt = new Date().toISOString()
    carts.set(cartId, cart)

    revalidatePath('/cart')
    revalidatePath('/checkout')

    return {
      success: true,
      cart
    }
  } catch (error) {
    console.error('Error adding to cart:', error)
    return {
      success: false,
      error: 'Failed to add item to cart'
    }
  }
}

// Remove item from cart
export async function removeFromCart(itemId: string): Promise<CartResponse> {
  try {
    const cartId = await getCartId()
    const cart = carts.get(cartId)

    if (!cart) {
      return {
        success: false,
        error: 'Cart not found'
      }
    }

    cart.items = cart.items.filter(item => item.id !== itemId)
    cart.updatedAt = new Date().toISOString()
    carts.set(cartId, cart)

    revalidatePath('/cart')
    revalidatePath('/checkout')

    return {
      success: true,
      cart
    }
  } catch (error) {
    console.error('Error removing from cart:', error)
    return {
      success: false,
      error: 'Failed to remove item from cart'
    }
  }
}

// Update item quantity
export async function updateCartItemQuantity(
  itemId: string,
  quantity: number
): Promise<CartResponse> {
  try {
    if (quantity < 0) {
      return {
        success: false,
        error: 'Quantity cannot be negative'
      }
    }

    if (quantity === 0) {
      return removeFromCart(itemId)
    }

    const cartId = await getCartId()
    const cart = carts.get(cartId)

    if (!cart) {
      return {
        success: false,
        error: 'Cart not found'
      }
    }

    const itemIndex = cart.items.findIndex(item => item.id === itemId)

    if (itemIndex === -1) {
      return {
        success: false,
        error: 'Item not found in cart'
      }
    }

    // Check max quantity
    const item = cart.items[itemIndex]
    if (item.maxQuantity && quantity > item.maxQuantity) {
      return {
        success: false,
        error: `Maximum quantity for this item is ${item.maxQuantity}`
      }
    }

    cart.items[itemIndex].quantity = quantity
    cart.updatedAt = new Date().toISOString()
    carts.set(cartId, cart)

    revalidatePath('/cart')
    revalidatePath('/checkout')

    return {
      success: true,
      cart
    }
  } catch (error) {
    console.error('Error updating cart item:', error)
    return {
      success: false,
      error: 'Failed to update item quantity'
    }
  }
}

// Clear cart
export async function clearCart(): Promise<CartResponse> {
  try {
    const cartId = await getCartId()
    const cart = carts.get(cartId)

    if (!cart) {
      return {
        success: false,
        error: 'Cart not found'
      }
    }

    cart.items = []
    cart.couponCode = undefined
    cart.discount = 0
    cart.updatedAt = new Date().toISOString()
    carts.set(cartId, cart)

    revalidatePath('/cart')
    revalidatePath('/checkout')

    return {
      success: true,
      cart
    }
  } catch (error) {
    console.error('Error clearing cart:', error)
    return {
      success: false,
      error: 'Failed to clear cart'
    }
  }
}

// Apply coupon
export async function applyCoupon(couponCode: string): Promise<CartResponse> {
  try {
    if (!couponCode) {
      return {
        success: false,
        error: 'Coupon code is required'
      }
    }

    const cartId = await getCartId()
    const cart = carts.get(cartId)

    if (!cart) {
      return {
        success: false,
        error: 'Cart not found'
      }
    }

    const normalizedCode = couponCode.toUpperCase().trim()
    const discountPercent = validCoupons[normalizedCode]

    if (discountPercent === undefined) {
      return {
        success: false,
        error: 'Invalid coupon code'
      }
    }

    // Calculate subtotal
    const subtotal = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )

    // Apply discount
    const discount = (subtotal * discountPercent) / 100

    cart.couponCode = normalizedCode
    cart.discount = discount
    cart.updatedAt = new Date().toISOString()
    carts.set(cartId, cart)

    revalidatePath('/cart')
    revalidatePath('/checkout')

    return {
      success: true,
      cart
    }
  } catch (error) {
    console.error('Error applying coupon:', error)
    return {
      success: false,
      error: 'Failed to apply coupon'
    }
  }
}

// Remove coupon
export async function removeCoupon(): Promise<CartResponse> {
  try {
    const cartId = await getCartId()
    const cart = carts.get(cartId)

    if (!cart) {
      return {
        success: false,
        error: 'Cart not found'
      }
    }

    cart.couponCode = undefined
    cart.discount = 0
    cart.updatedAt = new Date().toISOString()
    carts.set(cartId, cart)

    revalidatePath('/cart')
    revalidatePath('/checkout')

    return {
      success: true,
      cart
    }
  } catch (error) {
    console.error('Error removing coupon:', error)
    return {
      success: false,
      error: 'Failed to remove coupon'
    }
  }
}

// Get cart totals
export async function getCartTotals() {
  try {
    const cart = await getCart()

    if (!cart) {
      return {
        subtotal: 0,
        shipping: 0,
        tax: 0,
        discount: 0,
        total: 0,
        itemCount: 0
      }
    }

    const subtotal = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )

    const itemCount = cart.items.reduce(
      (count, item) => count + item.quantity,
      0
    )

    const shipping = subtotal > 5000 ? 0 : 25
    const tax = (subtotal - cart.discount) * 0.08
    const total = subtotal - cart.discount + shipping + tax

    return {
      subtotal,
      shipping,
      tax,
      discount: cart.discount,
      total,
      itemCount
    }
  } catch (error) {
    console.error('Error getting cart totals:', error)
    return {
      subtotal: 0,
      shipping: 0,
      tax: 0,
      discount: 0,
      total: 0,
      itemCount: 0
    }
  }
}

// Merge guest cart with user cart (after login)
export async function mergeCarts(guestCartId: string, userCartId: string): Promise<CartResponse> {
  try {
    const guestCart = carts.get(guestCartId)
    const userCart = carts.get(userCartId)

    if (!guestCart || !userCart) {
      return {
        success: false,
        error: 'One or both carts not found'
      }
    }

    // Merge items (avoid duplicates)
    for (const guestItem of guestCart.items) {
      const existingItem = userCart.items.find(
        item => item.productId === guestItem.productId
      )

      if (existingItem) {
        // Sum quantities
        existingItem.quantity += guestItem.quantity
      } else {
        // Add new item
        userCart.items.push(guestItem)
      }
    }

    // Keep the better coupon/discount
    if (guestCart.discount > userCart.discount) {
      userCart.couponCode = guestCart.couponCode
      userCart.discount = guestCart.discount
    }

    userCart.updatedAt = new Date().toISOString()
    carts.set(userCartId, userCart)

    // Delete guest cart
    carts.delete(guestCartId)

    // Update cookie to use user cart
    const cookieStore = await cookies()
    cookieStore.set('cartId', userCartId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60,
      path: '/'
    })

    revalidatePath('/cart')
    revalidatePath('/checkout')

    return {
      success: true,
      cart: userCart
    }
  } catch (error) {
    console.error('Error merging carts:', error)
    return {
      success: false,
      error: 'Failed to merge carts'
    }
  }
}

// Validate cart items (check prices, availability)
export async function validateCart(): Promise<{
  valid: boolean
  invalidItems?: CartItem[]
  message?: string
}> {
  try {
    const cart = await getCart()

    if (!cart || cart.items.length === 0) {
      return { valid: true }
    }

    const invalidItems: CartItem[] = []

    // In real app: Check against database for price changes and availability
    for (const item of cart.items) {
      // Mock validation
      const isValid = item.price > 0 // Simple check
      
      if (!isValid) {
        invalidItems.push(item)
      }
    }

    if (invalidItems.length > 0) {
      return {
        valid: false,
        invalidItems,
        message: 'Some items in your cart are no longer available'
      }
    }

    return { valid: true }
  } catch (error) {
    console.error('Error validating cart:', error)
    return {
      valid: false,
      message: 'Failed to validate cart'
    }
  }
}
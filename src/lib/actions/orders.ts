// lib/actions/orders.ts
'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// Types
export type OrderItem = {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image: string
  purity?: string
  weight?: number
}

export type ShippingAddress = {
  name: string
  address: string
  apartment?: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
  email: string
}

export type Order = {
  id: string
  orderNumber: string
  userId?: string // For logged-in users
  guestId?: string // For guest checkout
  items: OrderItem[]
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentStatus: 'paid' | 'unpaid' | 'refunded'
  paymentMethod: string
  shippingAddress: ShippingAddress
  subtotal: number
  shipping: number
  tax: number
  discount: number
  total: number
  couponCode?: string
  trackingNumber?: string
  estimatedDelivery?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export type CreateOrderData = {
  items: OrderItem[]
  shippingAddress: ShippingAddress
  paymentMethod: string
  subtotal: number
  shipping: number
  tax: number
  discount: number
  total: number
  couponCode?: string
  notes?: string
}

export type OrderResponse = {
  success: boolean
  order?: Order
  error?: string
  redirectTo?: string
}

// Mock database (in real app, this would be in your database)
let orders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    userId: '2', // Ahmed Khan
    items: [
      {
        id: 'item1',
        productId: '1',
        name: '24K Gold Kundan Necklace',
        price: 12999,
        quantity: 1,
        image: '/images/n1.jpeg',
        purity: '24K',
        weight: 45.5
      }
    ],
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'Credit Card',
    shippingAddress: {
      name: 'Ahmed Khan',
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
      phone: '+1 234 567 890',
      email: 'ahmed@example.com'
    },
    subtotal: 12999,
    shipping: 0,
    tax: 1040,
    discount: 0,
    total: 14039,
    trackingNumber: 'TRK123456789',
    estimatedDelivery: '2024-03-20',
    createdAt: '2024-03-15T10:30:00Z',
    updatedAt: '2024-03-20T14:20:00Z'
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    userId: '3', // Fatima Ali
    items: [
      {
        id: 'item2',
        productId: '2',
        name: '22K Gold Jhumka Earrings',
        price: 3499,
        quantity: 2,
        image: '/images/n2.jpeg',
        purity: '22K',
        weight: 12.8
      }
    ],
    status: 'shipped',
    paymentStatus: 'paid',
    paymentMethod: 'PayPal',
    shippingAddress: {
      name: 'Fatima Ali',
      address: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      country: 'USA',
      phone: '+1 234 567 891',
      email: 'fatima@example.com'
    },
    subtotal: 6998,
    shipping: 25,
    tax: 560,
    discount: 0,
    total: 7583,
    trackingNumber: 'TRK987654321',
    estimatedDelivery: '2024-03-18',
    createdAt: '2024-03-14T15:45:00Z',
    updatedAt: '2024-03-15T09:30:00Z'
  }
]

// Helper to generate order number
function generateOrderNumber(): string {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  
  return `ORD-${year}-${month}${day}-${random}`
}

// Helper to get user ID from session (if logged in)
async function getUserId(): Promise<string | undefined> {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('session')?.value
  
  // In real app: Look up user ID from session
  // For demo, return mock user ID
  if (sessionToken) {
    return '2' // Mock: Ahmed Khan
  }
  
  return undefined
}

// Helper to get or create guest ID
async function getGuestId(): Promise<string> {
  const cookieStore = await cookies()
  let guestId = cookieStore.get('guestId')?.value

  if (!guestId) {
    guestId = `guest_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
    cookieStore.set('guestId', guestId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/'
    })
  }

  return guestId
}

// Get user's orders
export async function getUserOrders(): Promise<Order[]> {
  const userId = await getUserId()
  const guestId = await getGuestId()

  if (userId) {
    return orders.filter(order => order.userId === userId)
  } else {
    return orders.filter(order => order.guestId === guestId)
  }
}

// Get order by ID
export async function getOrderById(id: string): Promise<Order | null> {
  const order = orders.find(o => o.id === id)
  
  if (!order) {
    return null
  }

  // Check if user has permission to view this order
  const userId = await getUserId()
  const guestId = await getGuestId()

  if (userId && order.userId !== userId) {
    return null // Not authorized
  }

  if (!userId && order.guestId !== guestId) {
    return null // Not authorized
  }

  return order
}

// Get order by order number
export async function getOrderByNumber(orderNumber: string): Promise<Order | null> {
  const order = orders.find(o => o.orderNumber === orderNumber)
  
  if (!order) {
    return null
  }

  // Check if user has permission to view this order
  const userId = await getUserId()
  const guestId = await getGuestId()

  if (userId && order.userId !== userId) {
    return null // Not authorized
  }

  if (!userId && order.guestId !== guestId) {
    return null // Not authorized
  }

  return order
}

// Create new order
export async function createOrder(data: CreateOrderData): Promise<OrderResponse> {
  try {
    // Validate required fields
    if (!data.items || data.items.length === 0) {
      return {
        success: false,
        error: 'Order must contain at least one item'
      }
    }

    if (!data.shippingAddress) {
      return {
        success: false,
        error: 'Shipping address is required'
      }
    }

    if (!data.paymentMethod) {
      return {
        success: false,
        error: 'Payment method is required'
      }
    }

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Get user/guest ID
    const userId = await getUserId()
    const guestId = await getGuestId()

    // Create new order
    const now = new Date().toISOString()
    const newOrder: Order = {
      id: (orders.length + 1).toString(),
      orderNumber: generateOrderNumber(),
      userId,
      guestId: userId ? undefined : guestId,
      items: data.items,
      status: 'pending',
      paymentStatus: 'paid', // Assume payment successful
      paymentMethod: data.paymentMethod,
      shippingAddress: data.shippingAddress,
      subtotal: data.subtotal,
      shipping: data.shipping,
      tax: data.tax,
      discount: data.discount || 0,
      total: data.total,
      couponCode: data.couponCode,
      notes: data.notes,
      createdAt: now,
      updatedAt: now
    }

    // Add to database
    orders.push(newOrder)

    // Clear cart after successful order
    const cartId = (await cookies()).get('cartId')?.value
    if (cartId) {
      // In real app: Clear cart from database
      // For demo, just log
      console.log(`Clearing cart: ${cartId}`)
    }

    revalidatePath('/orders')
    revalidatePath('/admin/orders')

    return {
      success: true,
      order: newOrder,
      redirectTo: `/orders/${newOrder.id}/confirmation`
    }
  } catch (error) {
    console.error('Error creating order:', error)
    return {
      success: false,
      error: 'Failed to create order'
    }
  }
}

// Update order status (admin only)
export async function updateOrderStatus(
  orderId: string,
  status: Order['status'],
  trackingNumber?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const order = orders.find(o => o.id === orderId)

    if (!order) {
      return {
        success: false,
        error: 'Order not found'
      }
    }

    order.status = status
    if (trackingNumber) {
      order.trackingNumber = trackingNumber
    }
    order.updatedAt = new Date().toISOString()

    // Calculate estimated delivery based on status
    if (status === 'shipped') {
      const deliveryDate = new Date()
      deliveryDate.setDate(deliveryDate.getDate() + 5) // 5 days for shipping
      order.estimatedDelivery = deliveryDate.toISOString().split('T')[0]
    }

    revalidatePath('/admin/orders')
    revalidatePath(`/admin/orders/${orderId}`)
    revalidatePath(`/orders/${orderId}`)

    return { success: true }
  } catch (error) {
    console.error('Error updating order status:', error)
    return {
      success: false,
      error: 'Failed to update order status'
    }
  }
}

// Cancel order
export async function cancelOrder(orderId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const order = orders.find(o => o.id === orderId)

    if (!order) {
      return {
        success: false,
        error: 'Order not found'
      }
    }

    // Check if order can be cancelled
    if (order.status === 'shipped' || order.status === 'delivered') {
      return {
        success: false,
        error: 'Cannot cancel order that has already been shipped'
      }
    }

    if (order.status === 'cancelled') {
      return {
        success: false,
        error: 'Order is already cancelled'
      }
    }

    order.status = 'cancelled'
    order.updatedAt = new Date().toISOString()

    revalidatePath('/orders')
    revalidatePath(`/orders/${orderId}`)
    revalidatePath('/admin/orders')

    return { success: true }
  } catch (error) {
    console.error('Error cancelling order:', error)
    return {
      success: false,
      error: 'Failed to cancel order'
    }
  }
}

// Track order
export async function trackOrder(orderId: string): Promise<{
  success: boolean
  trackingNumber?: string
  estimatedDelivery?: string
  status?: Order['status']
  error?: string
}> {
  try {
    const order = orders.find(o => o.id === orderId)

    if (!order) {
      return {
        success: false,
        error: 'Order not found'
      }
    }

    return {
      success: true,
      trackingNumber: order.trackingNumber,
      estimatedDelivery: order.estimatedDelivery,
      status: order.status
    }
  } catch (error) {
    console.error('Error tracking order:', error)
    return {
      success: false,
      error: 'Failed to track order'
    }
  }
}

// Get all orders (admin only)
export async function getAllOrders(): Promise<Order[]> {
  // In real app: Check if user is admin
  return orders
}

// Get order statistics (admin only)
export async function getOrderStats() {
  const allOrders = await getAllOrders()

  const totalOrders = allOrders.length
  const totalRevenue = allOrders.reduce((sum, order) => sum + order.total, 0)
  const pendingOrders = allOrders.filter(o => o.status === 'pending').length
  const processingOrders = allOrders.filter(o => o.status === 'processing').length
  const shippedOrders = allOrders.filter(o => o.status === 'shipped').length
  const deliveredOrders = allOrders.filter(o => o.status === 'delivered').length
  const cancelledOrders = allOrders.filter(o => o.status === 'cancelled').length

  // Orders by month (last 6 months)
  const months: { [key: string]: number } = {}
  const now = new Date()
  for (let i = 0; i < 6; i++) {
    const date = new Date(now)
    date.setMonth(date.getMonth() - i)
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    months[key] = 0
  }

  allOrders.forEach(order => {
    const date = new Date(order.createdAt)
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    if (months[key] !== undefined) {
      months[key]++
    }
  })

  return {
    totalOrders,
    totalRevenue,
    pendingOrders,
    processingOrders,
    shippedOrders,
    deliveredOrders,
    cancelledOrders,
    monthlyOrders: Object.entries(months).map(([month, count]) => ({ month, count }))
  }
}

// Request order cancellation (customer)
export async function requestCancellation(orderId: string, reason?: string): Promise<{ success: boolean; error?: string }> {
  try {
    const order = orders.find(o => o.id === orderId)

    if (!order) {
      return {
        success: false,
        error: 'Order not found'
      }
    }

    // Check if order can be cancelled
    if (order.status !== 'pending' && order.status !== 'processing') {
      return {
        success: false,
        error: 'This order cannot be cancelled at this time'
      }
    }

    // In real app: Send cancellation request to admin
    console.log(`Cancellation requested for order ${orderId}: ${reason || 'No reason provided'}`)

    return { success: true }
  } catch (error) {
    console.error('Error requesting cancellation:', error)
    return {
      success: false,
      error: 'Failed to request cancellation'
    }
  }
}

// Reorder previous order
export async function reorder(orderId: string): Promise<{ success: boolean; error?: string; redirectTo?: string }> {
  try {
    const originalOrder = orders.find(o => o.id === orderId)

    if (!originalOrder) {
      return {
        success: false,
        error: 'Order not found'
      }
    }

    // Check if user has permission
    const userId = await getUserId()
    const guestId = await getGuestId()

    if (userId && originalOrder.userId !== userId) {
      return {
        success: false,
        error: 'Not authorized'
      }
    }

    if (!userId && originalOrder.guestId !== guestId) {
      return {
        success: false,
        error: 'Not authorized'
      }
    }

    // In real app: Add items to cart
    // For demo, redirect to cart
    return {
      success: true,
      redirectTo: '/cart'
    }
  } catch (error) {
    console.error('Error reordering:', error)
    return {
      success: false,
      error: 'Failed to reorder'
    }
  }
}
// types/order.ts
import { Product } from './product'
import { User } from './user'

// Order Item Types
export type OrderItem = {
  id: string
  orderId: string
  productId: string
  product?: Product
  name: string
  price: number
  quantity: number
  image: string
  purity?: string
  weight?: number
  createdAt: string
  updatedAt: string
}

// Shipping Address Types
export type ShippingAddress = {
  id?: string
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

// Payment Types
export type PaymentMethod = 'card' | 'paypal' | 'apple-pay' | 'google-pay' | 'bank-transfer'

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'

export type Payment = {
  id?: string
  method: PaymentMethod
  status: PaymentStatus
  amount: number
  transactionId?: string
  cardLast4?: string
  cardBrand?: string
  paidAt?: string
  refundedAt?: string
}

// Order Status Types
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'

export type OrderStatusHistory = {
  status: OrderStatus
  date: string
  note?: string
  location?: string
}

// Main Order Type
export type Order = {
  id: string
  orderNumber: string
  userId?: string
  guestId?: string
  user?: User
  items: OrderItem[]
  status: OrderStatus
  statusHistory: OrderStatusHistory[]
  payment: Payment
  shippingAddress: ShippingAddress
  billingAddress?: ShippingAddress
  subtotal: number
  shipping: number
  tax: number
  discount: number
  total: number
  couponCode?: string
  trackingNumber?: string
  estimatedDelivery?: string
  deliveredAt?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

// Order Summary Type (for lists)
export type OrderSummary = {
  id: string
  orderNumber: string
  status: OrderStatus
  paymentStatus: PaymentStatus
  total: number
  itemCount: number
  createdAt: string
  estimatedDelivery?: string
}

// Create Order Types
export type CreateOrderInput = {
  items: {
    productId: string
    quantity: number
  }[]
  shippingAddress: ShippingAddress
  billingAddress?: ShippingAddress
  paymentMethod: PaymentMethod
  paymentToken?: string
  couponCode?: string
  notes?: string
  saveAddress?: boolean
}

export type CreateOrderResponse = {
  success: boolean
  order?: Order
  error?: string
  redirectUrl?: string
}

// Update Order Types
export type UpdateOrderInput = {
  status?: OrderStatus
  trackingNumber?: string
  estimatedDelivery?: string
  notes?: string
}

// Cancel Order Types
export type CancelOrderInput = {
  reason: string
}

export type CancelOrderResponse = {
  success: boolean
  order?: Order
  error?: string
}

// Track Order Types
export type TrackOrderResponse = {
  success: boolean
  orderNumber?: string
  status?: OrderStatus
  trackingNumber?: string
  estimatedDelivery?: string
  history?: OrderStatusHistory[]
  error?: string
}

// Order Filter Types
export type OrderFilter = {
  status?: OrderStatus | 'all'
  dateFrom?: string
  dateTo?: string
  minAmount?: number
  maxAmount?: number
  search?: string
  page?: number
  limit?: number
  sortBy?: 'date' | 'total' | 'status'
  sortOrder?: 'asc' | 'desc'
}

// Order Statistics Types
export type OrderStats = {
  totalOrders: number
  totalRevenue: number
  averageOrderValue: number
  pendingOrders: number
  processingOrders: number
  shippedOrders: number
  deliveredOrders: number
  cancelledOrders: number
  refundedOrders: number
  dailyStats: {
    date: string
    orders: number
    revenue: number
  }[]
  monthlyStats: {
    month: string
    orders: number
    revenue: number
  }[]
}

// Return/Refund Types
export type ReturnRequest = {
  orderId: string
  items: {
    orderItemId: string
    quantity: number
    reason: string
  }[]
  reason: string
  comments?: string
}

export type ReturnResponse = {
  success: boolean
  returnId?: string
  status?: 'pending' | 'approved' | 'rejected'
  error?: string
}

// Invoice Types
export type Invoice = {
  id: string
  orderId: string
  invoiceNumber: string
  issuedAt: string
  dueAt: string
  paidAt?: string
  items: {
    description: string
    quantity: number
    unitPrice: number
    total: number
  }[]
  subtotal: number
  tax: number
  discount: number
  total: number
  pdfUrl?: string
}

// Helper functions for order status
export const ORDER_STATUS_CONFIG: Record<OrderStatus, {
  label: string
  color: string
  icon: string
  nextStatus?: OrderStatus[]
}> = {
  pending: {
    label: 'Pending',
    color: 'bg-yellow-100 text-yellow-800',
    icon: '⏳',
    nextStatus: ['processing', 'cancelled'],
  },
  processing: {
    label: 'Processing',
    color: 'bg-blue-100 text-blue-800',
    icon: '⚙️',
    nextStatus: ['shipped', 'cancelled'],
  },
  shipped: {
    label: 'Shipped',
    color: 'bg-purple-100 text-purple-800',
    icon: '📦',
    nextStatus: ['delivered', 'cancelled'],
  },
  delivered: {
    label: 'Delivered',
    color: 'bg-green-100 text-green-800',
    icon: '✅',
    nextStatus: [],
  },
  cancelled: {
    label: 'Cancelled',
    color: 'bg-red-100 text-red-800',
    icon: '❌',
    nextStatus: [],
  },
  refunded: {
    label: 'Refunded',
    color: 'bg-gray-100 text-gray-800',
    icon: '↩️',
    nextStatus: [],
  },
}

// Helper functions for payment status
export const PAYMENT_STATUS_CONFIG: Record<PaymentStatus, {
  label: string
  color: string
  icon: string
}> = {
  pending: {
    label: 'Pending',
    color: 'bg-yellow-100 text-yellow-800',
    icon: '⏳',
  },
  paid: {
    label: 'Paid',
    color: 'bg-green-100 text-green-800',
    icon: '💰',
  },
  failed: {
    label: 'Failed',
    color: 'bg-red-100 text-red-800',
    icon: '❌',
  },
  refunded: {
    label: 'Refunded',
    color: 'bg-gray-100 text-gray-800',
    icon: '↩️',
  },
}

// Order validation rules
export const ORDER_VALIDATION = {
  minItems: 1,
  maxItems: 50,
  minQuantity: 1,
  maxQuantity: 99,
  minAmount: 0,
  maxAmount: 1000000,
  allowedPaymentMethods: ['card', 'paypal', 'apple-pay', 'google-pay', 'bank-transfer'],
  allowedStatuses: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
} as const

// Order messages
export const ORDER_MESSAGES = {
  created: 'Order placed successfully!',
  updated: 'Order updated successfully',
  cancelled: 'Order cancelled successfully',
  refunded: 'Order refunded successfully',
  trackingAdded: 'Tracking number added successfully',
  notFound: 'Order not found',
  cannotCancel: 'This order cannot be cancelled',
  invalidStatus: 'Invalid order status',
  paymentFailed: 'Payment failed. Please try again.',
} as const

// Helper function to generate order number
export function generateOrderNumber(): string {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  return `ORD-${year}${month}${day}-${random}`
}

// Helper function to calculate order totals
export function calculateOrderTotals(
  items: { price: number; quantity: number }[],
  shipping: number = 0,
  taxRate: number = 0.08,
  discount: number = 0
): {
  subtotal: number
  shipping: number
  tax: number
  discount: number
  total: number
} {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = (subtotal - discount) * taxRate
  const total = subtotal + shipping + tax - discount

  return {
    subtotal,
    shipping,
    tax,
    discount,
    total,
  }
}

// Helper function to format order number for display
export function formatOrderNumber(orderNumber: string): string {
  return orderNumber.replace(/-/g, ' ')
}

// Helper function to parse order number
export function parseOrderNumber(orderNumber: string): {
  prefix: string
  date: string
  random: string
} | null {
  const match = orderNumber.match(/^([A-Z]+)-(\d{8})-(\d{4})$/)
  if (!match) return null
  
  return {
    prefix: match[1],
    date: match[2],
    random: match[3],
  }
}

// Helper function to get order progress percentage
export function getOrderProgress(status: OrderStatus): number {
  const progressMap: Record<OrderStatus, number> = {
    pending: 0,
    processing: 25,
    shipped: 75,
    delivered: 100,
    cancelled: 0,
    refunded: 0,
  }
  return progressMap[status] || 0
}

// Helper function to check if order can be cancelled
export function canCancelOrder(status: OrderStatus): boolean {
  return ['pending', 'processing'].includes(status)
}

// Helper function to check if order can be refunded
export function canRefundOrder(status: OrderStatus, paymentStatus: PaymentStatus): boolean {
  return status === 'delivered' && paymentStatus === 'paid'
}

// Helper function to get estimated delivery date
export function getEstimatedDeliveryDate(shippedAt?: string): string | undefined {
  if (!shippedAt) return undefined
  
  const date = new Date(shippedAt)
  date.setDate(date.getDate() + 5) // Add 5 days for shipping
  return date.toISOString().split('T')[0]
}
// lib/validations/order.ts
import { z } from 'zod'

// Shipping address validation schema
export const shippingAddressSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  address: z.string().min(1, 'Address is required'),
  apartment: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(1, 'ZIP code is required'),
  country: z.string().min(1, 'Country is required'),
})

export type ShippingAddressInput = z.infer<typeof shippingAddressSchema>

// Order item validation schema
export const orderItemSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  name: z.string().min(1, 'Product name is required'),
  price: z.number().positive('Price must be positive'),
  quantity: z.number().int().positive('Quantity must be positive'),
  image: z.string().url('Invalid image URL'),
  purity: z.string().optional(),
  weight: z.number().positive().optional(),
})

export type OrderItemInput = z.infer<typeof orderItemSchema>

// Payment validation schema
export const paymentSchema = z.object({
  method: z.enum(['card', 'paypal']),
  cardNumber: z.string().optional(),
  cardName: z.string().optional(),
  expiry: z.string().optional(),
  cvv: z.string().optional(),
  saveCard: z.boolean().optional(),
})

export type PaymentInput = z.infer<typeof paymentSchema>

// Create order validation schema
export const createOrderSchema = z.object({
  items: z.array(orderItemSchema).min(1, 'Order must contain at least one item'),
  shippingAddress: shippingAddressSchema,
  payment: paymentSchema,
  subtotal: z.number().positive(),
  shipping: z.number().min(0),
  tax: z.number().min(0),
  discount: z.number().min(0).default(0),
  total: z.number().positive(),
  couponCode: z.string().optional(),
  notes: z.string().max(500).optional(),
  agreeTerms: z.boolean().refine((val) => val === true, 'You must agree to the terms'),
})

export type CreateOrderInput = z.infer<typeof createOrderSchema>

// Update order status validation schema
export const updateOrderStatusSchema = z.object({
  status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
  trackingNumber: z.string().optional(),
  notes: z.string().max(500).optional(),
})

export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>

// Cancel order validation schema
export const cancelOrderSchema = z.object({
  reason: z.string().min(1, 'Reason is required').max(500),
})

export type CancelOrderInput = z.infer<typeof cancelOrderSchema>

// Track order validation schema
export const trackOrderSchema = z.object({
  orderNumber: z.string().min(1, 'Order number is required'),
  email: z.string().email('Invalid email address'),
})

export type TrackOrderInput = z.infer<typeof trackOrderSchema>

// Order filter validation schema
export const orderFilterSchema = z.object({
  status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'all']).default('all'),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  minAmount: z.number().min(0).optional(),
  maxAmount: z.number().min(0).optional(),
  search: z.string().optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
})

export type OrderFilterInput = z.infer<typeof orderFilterSchema>

// Export all schemas
export const orderValidations = {
  shippingAddress: shippingAddressSchema,
  orderItem: orderItemSchema,
  payment: paymentSchema,
  createOrder: createOrderSchema,
  updateStatus: updateOrderStatusSchema,
  cancelOrder: cancelOrderSchema,
  trackOrder: trackOrderSchema,
  filter: orderFilterSchema,
}
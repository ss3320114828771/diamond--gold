// hooks/use-orders.ts
'use client'

import { useState, useCallback, useEffect } from 'react'

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

export type Order = {
  id: string
  orderNumber: string
  date: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentStatus: 'paid' | 'unpaid' | 'refunded'
  paymentMethod: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  tax: number
  discount: number
  total: number
  shippingAddress: {
    name: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
    phone: string
  }
  trackingNumber?: string
  estimatedDelivery?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

type OrdersState = {
  orders: Order[]
  currentOrder: Order | null
  isLoading: boolean
  error: string | null
  totalCount: number
  currentPage: number
  totalPages: number
}

type UseOrdersReturn = {
  // State
  orders: Order[]
  currentOrder: Order | null
  isLoading: boolean
  error: string | null
  totalCount: number
  currentPage: number
  totalPages: number

  // Actions
  fetchOrders: (page?: number, limit?: number, filters?: any) => Promise<void>
  fetchOrder: (id: string) => Promise<void>
  createOrder: (orderData: Partial<Order>) => Promise<{ success: boolean; order?: Order }>
  updateOrderStatus: (id: string, status: Order['status']) => Promise<boolean>
  cancelOrder: (id: string) => Promise<boolean>
  trackOrder: (id: string) => Promise<{ trackingNumber?: string; estimatedDelivery?: string }>
  clearCurrentOrder: () => void
  clearError: () => void
}

// Mock orders data
const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    date: '2024-03-15',
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'Credit Card',
    items: [
      {
        id: '1',
        productId: '1',
        name: '24K Gold Kundan Necklace',
        price: 12999,
        quantity: 1,
        image: '/images/n1.jpeg',
        purity: '24K',
        weight: 45.5
      }
    ],
    subtotal: 12999,
    shipping: 0,
    tax: 1040,
    discount: 0,
    total: 14039,
    shippingAddress: {
      name: 'Ahmed Khan',
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
      phone: '+1 234 567 890'
    },
    trackingNumber: 'TRK123456789',
    estimatedDelivery: '2024-03-20',
    createdAt: '2024-03-15T10:30:00Z',
    updatedAt: '2024-03-20T14:20:00Z'
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    date: '2024-03-14',
    status: 'shipped',
    paymentStatus: 'paid',
    paymentMethod: 'PayPal',
    items: [
      {
        id: '2',
        productId: '2',
        name: '22K Gold Jhumka Earrings',
        price: 3499,
        quantity: 2,
        image: '/images/n2.jpeg',
        purity: '22K',
        weight: 12.8
      }
    ],
    subtotal: 6998,
    shipping: 25,
    tax: 560,
    discount: 0,
    total: 7583,
    shippingAddress: {
      name: 'Fatima Ali',
      address: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      country: 'USA',
      phone: '+1 234 567 891'
    },
    trackingNumber: 'TRK987654321',
    estimatedDelivery: '2024-03-18',
    createdAt: '2024-03-14T15:45:00Z',
    updatedAt: '2024-03-15T09:30:00Z'
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    date: '2024-03-13',
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: 'Credit Card',
    items: [
      {
        id: '3',
        productId: '3',
        name: '18K Gold Diamond Ring',
        price: 5999,
        quantity: 1,
        image: '/images/n3.jpeg',
        purity: '18K',
        weight: 8.5
      }
    ],
    subtotal: 5999,
    shipping: 25,
    tax: 480,
    discount: 0,
    total: 6504,
    shippingAddress: {
      name: 'Yusuf Mohammed',
      address: '789 Pine St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA',
      phone: '+1 234 567 892'
    },
    createdAt: '2024-03-13T11:20:00Z',
    updatedAt: '2024-03-13T11:20:00Z'
  }
]

export function useOrders(): UseOrdersReturn {
  const [state, setState] = useState<OrdersState>({
    orders: [],
    currentOrder: null,
    isLoading: false,
    error: null,
    totalCount: 0,
    currentPage: 1,
    totalPages: 1
  })

  // Fetch orders with pagination and filters
  const fetchOrders = useCallback(async (page: number = 1, limit: number = 10, filters?: any) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))

      // Apply filters (mock implementation)
      let filteredOrders = [...mockOrders]

      if (filters?.status) {
        filteredOrders = filteredOrders.filter(o => o.status === filters.status)
      }

      if (filters?.dateRange) {
        // Filter by date range logic here
      }

      // Calculate pagination
      const totalCount = filteredOrders.length
      const totalPages = Math.ceil(totalCount / limit)
      const start = (page - 1) * limit
      const paginatedOrders = filteredOrders.slice(start, start + limit)

      setState({
        orders: paginatedOrders,
        currentOrder: null,
        isLoading: false,
        error: null,
        totalCount,
        currentPage: page,
        totalPages
      })
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch orders'
      }))
    }
  }, [])

  // Fetch single order
  const fetchOrder = useCallback(async (id: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 600))

      const order = mockOrders.find(o => o.id === id)

      if (!order) {
        throw new Error('Order not found')
      }

      setState(prev => ({
        ...prev,
        currentOrder: order,
        isLoading: false,
        error: null
      }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch order'
      }))
    }
  }, [])

  // Create new order
  const createOrder = useCallback(async (orderData: Partial<Order>) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Generate new order
      const newOrder: Order = {
        id: (mockOrders.length + 1).toString(),
        orderNumber: `ORD-${new Date().getFullYear()}-${String(mockOrders.length + 1).padStart(3, '0')}`,
        date: new Date().toISOString().split('T')[0],
        status: 'pending',
        paymentStatus: 'unpaid',
        paymentMethod: orderData.paymentMethod || 'Credit Card',
        items: orderData.items || [],
        subtotal: orderData.subtotal || 0,
        shipping: orderData.shipping || 0,
        tax: orderData.tax || 0,
        discount: orderData.discount || 0,
        total: orderData.total || 0,
        shippingAddress: orderData.shippingAddress || {
          name: '',
          address: '',
          city: '',
          state: '',
          zipCode: '',
          country: '',
          phone: ''
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      // In a real app, you'd save to database here
      // mockOrders.push(newOrder) // Uncomment if you want to add to mock data

      setState(prev => ({
        ...prev,
        isLoading: false,
        error: null
      }))

      return { success: true, order: newOrder }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to create order'
      }))
      return { success: false }
    }
  }, [])

  // Update order status
  const updateOrderStatus = useCallback(async (id: string, status: Order['status']) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))

      // Update in mock data
      const orderIndex = mockOrders.findIndex(o => o.id === id)
      if (orderIndex === -1) {
        throw new Error('Order not found')
      }

      mockOrders[orderIndex] = {
        ...mockOrders[orderIndex],
        status,
        updatedAt: new Date().toISOString()
      }

      // Update current order if it's the one being viewed
      setState(prev => ({
        ...prev,
        currentOrder: prev.currentOrder?.id === id
          ? { ...prev.currentOrder, status, updatedAt: new Date().toISOString() }
          : prev.currentOrder,
        isLoading: false,
        error: null
      }))

      return true
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to update order status'
      }))
      return false
    }
  }, [])

  // Cancel order
  const cancelOrder = useCallback(async (id: string) => {
    return updateOrderStatus(id, 'cancelled')
  }, [updateOrderStatus])

  // Track order
  const trackOrder = useCallback(async (id: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))

      const order = mockOrders.find(o => o.id === id)

      if (!order) {
        throw new Error('Order not found')
      }

      setState(prev => ({ ...prev, isLoading: false }))

      return {
        trackingNumber: order.trackingNumber,
        estimatedDelivery: order.estimatedDelivery
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to track order'
      }))
      return {}
    }
  }, [])

  // Clear current order
  const clearCurrentOrder = useCallback(() => {
    setState(prev => ({ ...prev, currentOrder: null }))
  }, [])

  // Clear error
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }))
  }, [])

  // Load initial orders
  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  return {
    // State
    orders: state.orders,
    currentOrder: state.currentOrder,
    isLoading: state.isLoading,
    error: state.error,
    totalCount: state.totalCount,
    currentPage: state.currentPage,
    totalPages: state.totalPages,

    // Actions
    fetchOrders,
    fetchOrder,
    createOrder,
    updateOrderStatus,
    cancelOrder,
    trackOrder,
    clearCurrentOrder,
    clearError
  }
}
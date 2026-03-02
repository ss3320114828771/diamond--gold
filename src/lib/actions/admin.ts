// lib/actions/admin.ts
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// Types
export type DashboardStats = {
  totalOrders: number
  totalRevenue: number
  totalProducts: number
  totalCustomers: number
  pendingOrders: number
  lowStock: number
  recentOrders: RecentOrder[]
  topProducts: TopProduct[]
  chartData: ChartData
}

export type RecentOrder = {
  id: string
  orderNumber: string
  customer: string
  amount: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  date: string
}

export type TopProduct = {
  id: string
  name: string
  sales: number
  revenue: number
  image: string
}

export type ChartData = {
  daily: number[]
  categories: { name: string; count: number }[]
}

export type Product = {
  id: string
  name: string
  description: string
  price: number
  purity: string
  weight: number
  type: string
  style: string
  gender: string
  occasion: string
  stock: number
  images: string[]
  inStock: boolean
  featured: boolean
  handmade: boolean
  certification: string
  createdAt: string
}

export type User = {
  id: string
  name: string
  email: string
  role: 'admin' | 'customer'
  orders: number
  spent: number
  joined: string
  status: 'active' | 'blocked'
}

// Mock data (in real app, this would come from database)
const mockStats: DashboardStats = {
  totalOrders: 156,
  totalRevenue: 289450,
  totalProducts: 89,
  totalCustomers: 234,
  pendingOrders: 12,
  lowStock: 5,
  recentOrders: [
    { id: '1', orderNumber: 'ORD-001', customer: 'Ahmed Khan', amount: 12999, status: 'delivered', date: '2024-03-15' },
    { id: '2', orderNumber: 'ORD-002', customer: 'Fatima Ali', amount: 8999, status: 'shipped', date: '2024-03-14' },
    { id: '3', orderNumber: 'ORD-003', customer: 'Yusuf Mohammed', amount: 3499, status: 'processing', date: '2024-03-14' },
    { id: '4', orderNumber: 'ORD-004', customer: 'Aisha Syed', amount: 5999, status: 'pending', date: '2024-03-13' },
    { id: '5', orderNumber: 'ORD-005', customer: 'Omar Hassan', amount: 4499, status: 'delivered', date: '2024-03-12' }
  ],
  topProducts: [
    { id: '1', name: '24K Gold Necklace', sales: 45, revenue: 584955, image: '/images/n1.jpeg' },
    { id: '2', name: '22K Gold Earrings', sales: 38, revenue: 132962, image: '/images/n2.jpeg' },
    { id: '3', name: 'Diamond Ring', sales: 27, revenue: 161973, image: '/images/n3.jpeg' },
    { id: '4', name: 'Gold Bangles', sales: 23, revenue: 206977, image: '/images/n4.jpeg' }
  ],
  chartData: {
    daily: [45000, 52000, 48000, 61000, 55000, 67000, 72000],
    categories: [
      { name: 'Necklaces', count: 45 },
      { name: 'Earrings', count: 38 },
      { name: 'Rings', count: 27 },
      { name: 'Bangles', count: 23 },
      { name: 'Chains', count: 15 }
    ]
  }
}

let mockProducts: Product[] = [
  {
    id: '1',
    name: '24K Gold Kundan Necklace',
    description: 'Exquisite traditional Kundan necklace with intricate design, perfect for weddings',
    price: 12999,
    purity: '24K',
    weight: 45.5,
    type: 'Necklace',
    style: 'Traditional',
    gender: 'Women',
    occasion: 'Wedding',
    stock: 10,
    images: ['/images/n1.jpeg', '/images/n2.jpeg'],
    inStock: true,
    featured: true,
    handmade: true,
    certification: 'BIS Hallmarked',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: '22K Gold Jhumka Earrings',
    description: 'Classic Jhumka earrings with peacock design',
    price: 3499,
    purity: '22K',
    weight: 12.8,
    type: 'Earrings',
    style: 'Traditional',
    gender: 'Women',
    occasion: 'Festive',
    stock: 15,
    images: ['/images/n2.jpeg'],
    inStock: true,
    featured: true,
    handmade: true,
    certification: 'BIS Hallmarked',
    createdAt: '2024-01-20'
  }
]

let mockUsers: User[] = [
  {
    id: '1',
    name: 'Ahmed Khan',
    email: 'ahmed.khan@email.com',
    role: 'customer',
    orders: 12,
    spent: 45670,
    joined: '2024-01-15',
    status: 'active'
  },
  {
    id: '2',
    name: 'Hafiz Sajid Syed',
    email: 'sajid.syed@gmail.com',
    role: 'admin',
    orders: 0,
    spent: 0,
    joined: '2024-01-01',
    status: 'active'
  }
]

// Dashboard Actions
export async function getDashboardStats(range: string = 'month'): Promise<DashboardStats> {
  // In real app: Fetch from database
  return mockStats
}

export async function refreshDashboardData(): Promise<DashboardStats> {
  // In real app: Refresh data from database
  revalidatePath('/admin/dashboard')
  return mockStats
}

// Product Actions
export async function getProducts(filters?: {
  search?: string
  purity?: string
  type?: string
  inStock?: boolean
  featured?: boolean
}) {
  // In real app: Query database with filters
  let products = [...mockProducts]

  if (filters?.search) {
    const searchLower = filters.search.toLowerCase()
    products = products.filter(p => 
      p.name.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower)
    )
  }

  if (filters?.purity) {
    products = products.filter(p => p.purity === filters.purity)
  }

  if (filters?.type) {
    products = products.filter(p => p.type === filters.type)
  }

  if (filters?.inStock !== undefined) {
    products = products.filter(p => p.inStock === filters.inStock)
  }

  if (filters?.featured !== undefined) {
    products = products.filter(p => p.featured === filters.featured)
  }

  return products
}

export async function getProductById(id: string): Promise<Product | null> {
  const product = mockProducts.find(p => p.id === id)
  return product || null
}

export async function createProduct(data: Omit<Product, 'id' | 'createdAt'>) {
  // In real app: Insert into database
  const newProduct: Product = {
    id: (mockProducts.length + 1).toString(),
    ...data,
    createdAt: new Date().toISOString().split('T')[0]
  }

  mockProducts.push(newProduct)
  revalidatePath('/admin/products')
  
  return { success: true, product: newProduct }
}

export async function updateProduct(id: string, data: Partial<Product>) {
  // In real app: Update in database
  const index = mockProducts.findIndex(p => p.id === id)
  
  if (index === -1) {
    return { success: false, error: 'Product not found' }
  }

  mockProducts[index] = { ...mockProducts[index], ...data }
  revalidatePath('/admin/products')
  revalidatePath(`/admin/products/${id}`)
  
  return { success: true, product: mockProducts[index] }
}

export async function deleteProduct(id: string) {
  // In real app: Delete from database
  mockProducts = mockProducts.filter(p => p.id !== id)
  revalidatePath('/admin/products')
  
  return { success: true }
}

export async function bulkDeleteProducts(ids: string[]) {
  // In real app: Bulk delete from database
  mockProducts = mockProducts.filter(p => !ids.includes(p.id))
  revalidatePath('/admin/products')
  
  return { success: true, deletedCount: ids.length }
}

export async function bulkUpdateProducts(ids: string[], updates: Partial<Product>) {
  // In real app: Bulk update in database
  mockProducts = mockProducts.map(p => 
    ids.includes(p.id) ? { ...p, ...updates } : p
  )
  
  revalidatePath('/admin/products')
  return { success: true, updatedCount: ids.length }
}

// Order Actions
export async function getOrders(filters?: {
  status?: string
  customer?: string
  dateFrom?: string
  dateTo?: string
}) {
  // In real app: Query database with filters
  return mockStats.recentOrders
}

export async function getOrderById(id: string) {
  const order = mockStats.recentOrders.find(o => o.id === id)
  return order || null
}

export async function updateOrderStatus(id: string, status: string) {
  // In real app: Update in database
  const order = mockStats.recentOrders.find(o => o.id === id)
  if (order) {
    order.status = status as any
  }
  
  revalidatePath('/admin/orders')
  revalidatePath(`/admin/orders/${id}`)
  
  return { success: true }
}

// User Actions
export async function getUsers(filters?: {
  role?: string
  status?: string
  search?: string
}) {
  // In real app: Query database with filters
  let users = [...mockUsers]

  if (filters?.role) {
    users = users.filter(u => u.role === filters.role)
  }

  if (filters?.status) {
    users = users.filter(u => u.status === filters.status)
  }

  if (filters?.search) {
    const searchLower = filters.search.toLowerCase()
    users = users.filter(u => 
      u.name.toLowerCase().includes(searchLower) ||
      u.email.toLowerCase().includes(searchLower)
    )
  }

  return users
}

export async function getUserById(id: string): Promise<User | null> {
  const user = mockUsers.find(u => u.id === id)
  return user || null
}

export async function updateUser(id: string, data: Partial<User>) {
  // In real app: Update in database
  const index = mockUsers.findIndex(u => u.id === id)
  
  if (index === -1) {
    return { success: false, error: 'User not found' }
  }

  mockUsers[index] = { ...mockUsers[index], ...data }
  revalidatePath('/admin/users')
  revalidatePath(`/admin/users/${id}`)
  
  return { success: true, user: mockUsers[index] }
}

export async function deleteUser(id: string) {
  // In real app: Delete from database
  mockUsers = mockUsers.filter(u => u.id !== id)
  revalidatePath('/admin/users')
  
  return { success: true }
}

export async function bulkUpdateUsers(ids: string[], action: 'block' | 'unblock' | 'delete') {
  // In real app: Bulk update in database
  if (action === 'delete') {
    mockUsers = mockUsers.filter(u => !ids.includes(u.id))
  } else {
    mockUsers = mockUsers.map(u => 
      ids.includes(u.id) ? { ...u, status: action === 'block' ? 'blocked' : 'active' } : u
    )
  }
  
  revalidatePath('/admin/users')
  return { success: true, updatedCount: ids.length }
}

// Settings Actions
export async function getSettings() {
  // In real app: Fetch from database
  return {
    storeName: 'HS Gold & Diamonds',
    storeEmail: 'info@hsgold.com',
    storePhone: '+1 234 567 890',
    currency: 'USD',
    taxRate: 8,
    freeShippingThreshold: 5000,
    standardShipping: 25,
    expressShipping: 50
  }
}

export async function updateSettings(data: any) {
  // In real app: Update in database
  revalidatePath('/admin/settings')
  return { success: true }
}

// Auth Actions (simplified)
export async function adminLogin(email: string, password: string) {
  // In real app: Verify against database
  if (email === 'sajid.syed@gmail.com' && password === 'admin123') {
    return { success: true, user: mockUsers[1] }
  }
  return { success: false, error: 'Invalid credentials' }
}

export async function adminLogout() {
  // In real app: Clear session
  redirect('/login')
}
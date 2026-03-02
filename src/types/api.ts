// types/api.ts
import { User } from './user'
import { Product } from './product'
import { Order } from './order'

// API Response Types
export type ApiResponse<T = any> = {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export type PaginatedResponse<T> = {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export type ApiError = {
  code: string
  message: string
  details?: Record<string, any>
}

// API Request Types
export type PaginatedRequest = {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export type SearchRequest = PaginatedRequest & {
  query?: string
}

// Auth API Types
export type LoginRequest = {
  email: string
  password: string
  rememberMe?: boolean
}

export type LoginResponse = ApiResponse<{
  user: User
  token: string
  expiresIn: number
}>

export type RegisterRequest = {
  name: string
  email: string
  password: string
  phone?: string
}

export type RegisterResponse = ApiResponse<{
  user: User
  token: string
}>

export type ForgotPasswordRequest = {
  email: string
}

export type ResetPasswordRequest = {
  token: string
  password: string
}

export type VerifyEmailRequest = {
  token: string
}

// Products API Types
export type GetProductsRequest = PaginatedRequest & {
  category?: string
  purity?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  featured?: boolean
  search?: string
  tags?: string[]
}

export type GetProductsResponse = ApiResponse<{
  products: Product[]
  total: number
  page: number
  totalPages: number
}>

export type GetProductResponse = ApiResponse<{
  product: Product
}>

export type CreateProductRequest = {
  name: string
  description: string
  price: number
  comparePrice?: number
  purity?: string
  weight?: number
  images: string[]
  category?: string
  inStock?: boolean
  featured?: boolean
  sku: string
  tags?: string[]
}

export type UpdateProductRequest = Partial<CreateProductRequest>

export type DeleteProductResponse = ApiResponse

export type BulkProductActionRequest = {
  productIds: string[]
  action: 'delete' | 'updateStock' | 'updatePrice' | 'toggleFeatured'
  stock?: number
  price?: number
  featured?: boolean
}

// Cart API Types
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
  subtotal: number
  shipping: number
  tax: number
  discount: number
  total: number
  itemCount: number
  couponCode?: string
}

export type GetCartResponse = ApiResponse<{
  cart: Cart
}>

export type AddToCartRequest = {
  productId: string
  quantity?: number
}

export type UpdateCartItemRequest = {
  itemId: string
  quantity: number
}

export type ApplyCouponRequest = {
  couponCode: string
}

export type ApplyCouponResponse = ApiResponse<{
  cart: Cart
  discount: number
}>

// Orders API Types
export type CreateOrderRequest = {
  items: {
    productId: string
    quantity: number
  }[]
  shippingAddress: {
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
  paymentMethod: string
  notes?: string
}

export type CreateOrderResponse = ApiResponse<{
  order: Order
  redirectUrl?: string
}>

export type GetOrdersRequest = PaginatedRequest & {
  status?: string
  dateFrom?: string
  dateTo?: string
}

export type GetOrdersResponse = ApiResponse<{
  orders: Order[]
  total: number
  page: number
  totalPages: number
}>

export type GetOrderResponse = ApiResponse<{
  order: Order
}>

export type UpdateOrderStatusRequest = {
  status: string
  trackingNumber?: string
  notes?: string
}

export type TrackOrderResponse = ApiResponse<{
  status: string
  trackingNumber?: string
  estimatedDelivery?: string
  history: {
    status: string
    date: string
    location?: string
  }[]
}>

// Wishlist API Types
export type WishlistItem = {
  id: string
  productId: string
  name: string
  price: number
  image: string
  purity?: string
  weight?: number
  addedAt: string
}

export type GetWishlistResponse = ApiResponse<{
  items: WishlistItem[]
  total: number
}>

export type AddToWishlistRequest = {
  productId: string
}

export type MoveToCartRequest = {
  itemId: string
}

// User API Types
export type UpdateProfileRequest = {
  name?: string
  email?: string
  phone?: string
  avatar?: string
}

export type ChangePasswordRequest = {
  currentPassword: string
  newPassword: string
}

export type GetUserResponse = ApiResponse<{
  user: User
}>

export type GetAddressesResponse = ApiResponse<{
  addresses: User['addresses']
}>

export type CreateAddressRequest = {
  type?: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault?: boolean
}

export type UpdateAddressRequest = Partial<CreateAddressRequest>

// Admin API Types
export type AdminDashboardResponse = ApiResponse<{
  stats: {
    totalOrders: number
    totalRevenue: number
    totalProducts: number
    totalCustomers: number
    pendingOrders: number
    lowStock: number
  }
  recentOrders: Order[]
  topProducts: {
    id: string
    name: string
    sales: number
    revenue: number
    image: string
  }[]
  chartData: {
    daily: number[]
    categories: { name: string; count: number }[]
  }
}>

export type AdminGetUsersRequest = PaginatedRequest & {
  role?: string
  status?: string
  search?: string
}

export type AdminGetUsersResponse = ApiResponse<{
  users: User[]
  total: number
  page: number
  totalPages: number
}>

export type AdminUpdateUserRequest = {
  name?: string
  email?: string
  role?: 'admin' | 'customer'
  status?: 'active' | 'blocked'
}

export type AdminBulkUserActionRequest = {
  userIds: string[]
  action: 'block' | 'unblock' | 'delete'
}

export type AdminGetOrdersRequest = PaginatedRequest & {
  status?: string
  customer?: string
  dateFrom?: string
  dateTo?: string
  minAmount?: number
  maxAmount?: number
}

export type AdminUpdateOrderRequest = {
  status?: string
  trackingNumber?: string
  notes?: string
}

export type AdminBulkOrderActionRequest = {
  orderIds: string[]
  action: 'updateStatus' | 'cancel' | 'delete'
  status?: string
}

// Upload API Types
export type UploadImageRequest = FormData

export type UploadImageResponse = ApiResponse<{
  url: string
  filename: string
}>

export type UploadImagesResponse = ApiResponse<{
  urls: string[]
  filenames: string[]
}>

// Webhook Types
export type StripeWebhookEvent = {
  id: string
  type: string
  data: {
    object: any
  }
}

export type PayPalWebhookEvent = {
  id: string
  event_type: string
  resource: any
}

// API Error Codes
export const API_ERROR_CODES = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  BAD_REQUEST: 'BAD_REQUEST',
  CONFLICT: 'CONFLICT',
  TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
} as const

export type ApiErrorCode = keyof typeof API_ERROR_CODES

// API Endpoints
export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
    forgotPassword: '/api/auth/forgot-password',
    resetPassword: '/api/auth/reset-password',
    verifyEmail: '/api/auth/verify-email',
  },
  products: {
    list: '/api/products',
    detail: (id: string) => `/api/products/${id}`,
    related: (id: string) => `/api/products/${id}/related`,
    search: '/api/products/search',
    categories: '/api/products/categories',
  },
  cart: {
    get: '/api/cart',
    add: '/api/cart/add',
    update: '/api/cart/update',
    remove: '/api/cart/remove',
    clear: '/api/cart/clear',
    coupon: '/api/cart/coupon',
  },
  orders: {
    list: '/api/orders',
    create: '/api/orders',
    detail: (id: string) => `/api/orders/${id}`,
    track: (id: string) => `/api/orders/${id}/track`,
    cancel: (id: string) => `/api/orders/${id}/cancel`,
  },
  wishlist: {
    get: '/api/wishlist',
    add: '/api/wishlist/add',
    remove: (id: string) => `/api/wishlist/${id}`,
    moveToCart: (id: string) => `/api/wishlist/${id}/move-to-cart`,
  },
  user: {
    profile: '/api/user/profile',
    addresses: '/api/user/addresses',
    address: (id: string) => `/api/user/addresses/${id}`,
    changePassword: '/api/user/change-password',
  },
  admin: {
    dashboard: '/api/admin/dashboard',
    users: '/api/admin/users',
    user: (id: string) => `/api/admin/users/${id}`,
    orders: '/api/admin/orders',
    order: (id: string) => `/api/admin/orders/${id}`,
    products: '/api/admin/products',
    product: (id: string) => `/api/admin/products/${id}`,
    stats: '/api/admin/stats',
  },
  upload: {
    image: '/api/upload/image',
    images: '/api/upload/images',
  },
} as const
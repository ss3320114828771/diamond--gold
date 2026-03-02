// types/user.ts
import { Order } from './order'
import { Product } from './product'

// User Role Types
export type UserRole = 'admin' | 'customer'

// User Status Types
export type UserStatus = 'active' | 'inactive' | 'blocked'

// Address Types
export type Address = {
  id: string
  userId: string
  type?: 'home' | 'work' | 'other'
  name: string
  address: string
  apartment?: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

// Payment Method Types
export type PaymentMethod = {
  id: string
  userId: string
  type: 'card' | 'paypal'
  cardLast4?: string
  cardBrand?: string
  expiryMonth?: number
  expiryYear?: number
  isDefault: boolean
  createdAt: string
}

// Wishlist Item Types
export type WishlistItem = {
  id: string
  userId: string
  productId: string
  product?: Product
  addedAt: string
}

// User Preferences Types
export type UserPreferences = {
  emailNotifications: boolean
  smsNotifications: boolean
  pushNotifications: boolean
  marketingEmails: boolean
  language: string
  currency: string
  theme: 'light' | 'dark' | 'system'
}

// Main User Type
export type User = {
  id: string
  name: string
  email: string
  password?: string // Never returned in API responses
  role: UserRole
  status: UserStatus
  avatar?: string
  phone?: string
  emailVerified: boolean
  phoneVerified: boolean
  lastLogin?: string
  loginCount: number
  preferences: UserPreferences
  addresses?: Address[]
  paymentMethods?: PaymentMethod[]
  wishlist?: WishlistItem[]
  orders?: Order[]
  createdAt: string
  updatedAt: string
}

// User Summary Type (for lists)
export type UserSummary = {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  avatar?: string
  ordersCount: number
  totalSpent: number
  lastLogin?: string
  createdAt: string
}

// Create User Types
export type CreateUserInput = {
  name: string
  email: string
  password: string
  role?: UserRole
  phone?: string
}

export type CreateUserResponse = {
  success: boolean
  user?: User
  error?: string
}

// Update User Types
export type UpdateUserInput = {
  name?: string
  email?: string
  phone?: string
  avatar?: string
  preferences?: Partial<UserPreferences>
}

export type UpdateUserResponse = {
  success: boolean
  user?: User
  error?: string
}

// Login Types
export type LoginInput = {
  email: string
  password: string
  rememberMe?: boolean
}

export type LoginResponse = {
  success: boolean
  user?: User
  token?: string
  error?: string
}

// Register Types
export type RegisterInput = {
  name: string
  email: string
  password: string
  phone?: string
}

export type RegisterResponse = {
  success: boolean
  user?: User
  token?: string
  error?: string
}

// Change Password Types
export type ChangePasswordInput = {
  currentPassword: string
  newPassword: string
}

export type ChangePasswordResponse = {
  success: boolean
  error?: string
}

// Reset Password Types
export type ResetPasswordInput = {
  token: string
  password: string
}

export type ResetPasswordResponse = {
  success: boolean
  error?: string
}

// Email Verification Types
export type VerifyEmailInput = {
  token: string
}

export type VerifyEmailResponse = {
  success: boolean
  error?: string
}

// Address Types
export type CreateAddressInput = {
  type?: 'home' | 'work' | 'other'
  name: string
  address: string
  apartment?: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
  isDefault?: boolean
}

export type UpdateAddressInput = Partial<CreateAddressInput>

export type AddressResponse = {
  success: boolean
  address?: Address
  error?: string
}

// Payment Method Types
export type CreatePaymentMethodInput = {
  type: 'card' | 'paypal'
  token: string
  isDefault?: boolean
}

export type PaymentMethodResponse = {
  success: boolean
  paymentMethod?: PaymentMethod
  error?: string
}

// Wishlist Types
export type AddToWishlistInput = {
  productId: string
}

export type WishlistResponse = {
  success: boolean
  item?: WishlistItem
  error?: string
}

// Admin User Management Types
export type AdminUpdateUserInput = {
  role?: UserRole
  status?: UserStatus
  emailVerified?: boolean
  phoneVerified?: boolean
}

export type AdminBulkUserActionInput = {
  userIds: string[]
  action: 'block' | 'unblock' | 'delete' | 'markAsVerified'
}

export type AdminBulkUserResponse = {
  success: boolean
  updatedCount: number
  error?: string
}

// User Filter Types
export type UserFilter = {
  role?: UserRole | 'all'
  status?: UserStatus | 'all'
  search?: string
  dateFrom?: string
  dateTo?: string
  minOrders?: number
  minSpent?: number
  page?: number
  limit?: number
  sortBy?: 'name' | 'email' | 'createdAt' | 'lastLogin' | 'ordersCount' | 'totalSpent'
  sortOrder?: 'asc' | 'desc'
}

// User Statistics Types
export type UserStats = {
  totalUsers: number
  activeUsers: number
  newUsersToday: number
  newUsersThisWeek: number
  newUsersThisMonth: number
  customers: number
  admins: number
  verifiedUsers: number
  unverifiedUsers: number
  blockedUsers: number
  averageOrdersPerUser: number
  averageSpentPerUser: number
  totalRevenue: number
  topCustomers: UserSummary[]
}

// Session Types
export type Session = {
  id: string
  userId: string
  token: string
  expiresAt: string
  createdAt: string
  lastActivity?: string
  ipAddress?: string
  userAgent?: string
}

// Helper functions for user roles
export const USER_ROLE_CONFIG: Record<UserRole, {
  label: string
  color: string
  icon: string
  permissions: string[]
}> = {
  admin: {
    label: 'Admin',
    color: 'bg-purple-100 text-purple-800',
    icon: '👑',
    permissions: ['all'],
  },
  customer: {
    label: 'Customer',
    color: 'bg-blue-100 text-blue-800',
    icon: '👤',
    permissions: ['view_products', 'purchase', 'manage_profile', 'view_orders'],
  },
}

// Helper functions for user status
export const USER_STATUS_CONFIG: Record<UserStatus, {
  label: string
  color: string
  icon: string
}> = {
  active: {
    label: 'Active',
    color: 'bg-green-100 text-green-800',
    icon: '✅',
  },
  inactive: {
    label: 'Inactive',
    color: 'bg-gray-100 text-gray-800',
    icon: '💤',
  },
  blocked: {
    label: 'Blocked',
    color: 'bg-red-100 text-red-800',
    icon: '🚫',
  },
}

// User validation rules
export const USER_VALIDATION = {
  name: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s]+$/,
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    minLength: 6,
    maxLength: 50,
  },
  phone: {
    pattern: /^\+?[1-9]\d{1,14}$/,
  },
} as const

// User messages
export const USER_MESSAGES = {
  loginSuccess: 'Logged in successfully',
  loginFailed: 'Invalid email or password',
  registerSuccess: 'Account created successfully',
  registerFailed: 'Failed to create account',
  logoutSuccess: 'Logged out successfully',
  profileUpdated: 'Profile updated successfully',
  passwordChanged: 'Password changed successfully',
  emailVerified: 'Email verified successfully',
  addressAdded: 'Address added successfully',
  addressUpdated: 'Address updated successfully',
  addressDeleted: 'Address deleted successfully',
  paymentMethodAdded: 'Payment method added successfully',
  paymentMethodDeleted: 'Payment method deleted successfully',
  wishlistAdded: 'Added to wishlist',
  wishlistRemoved: 'Removed from wishlist',
  userNotFound: 'User not found',
  emailExists: 'Email already exists',
  invalidToken: 'Invalid or expired token',
} as const

// Helper function to check if user has permission
export function userHasPermission(user: User, permission: string): boolean {
  const roleConfig = USER_ROLE_CONFIG[user.role]
  return roleConfig.permissions.includes('all') || roleConfig.permissions.includes(permission)
}

// Helper function to get user display name
export function getUserDisplayName(user: User): string {
  return user.name || user.email.split('@')[0]
}

// Helper function to get user initials
export function getUserInitials(user: User): string {
  return user.name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Helper function to check if user is active
export function isUserActive(user: User): boolean {
  return user.status === 'active'
}

// Helper function to check if user is verified
export function isUserVerified(user: User): boolean {
  return user.emailVerified
}

// Helper function to format last login
export function formatLastLogin(lastLogin?: string): string {
  if (!lastLogin) return 'Never'
  
  const date = new Date(lastLogin)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  
  return date.toLocaleDateString()
}

// Helper function to calculate user statistics
export function calculateUserStats(users: User[]): UserStats {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const thisWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const activeUsers = users.filter(u => u.status === 'active')
  const customers = users.filter(u => u.role === 'customer')
  const admins = users.filter(u => u.role === 'admin')
  const verifiedUsers = users.filter(u => u.emailVerified)
  const blockedUsers = users.filter(u => u.status === 'blocked')

  const totalOrders = users.reduce((sum, u) => sum + (u.orders?.length || 0), 0)
  const totalSpent = users.reduce((sum, u) => {
    return sum + (u.orders?.reduce((orderSum, o) => orderSum + o.total, 0) || 0)
  }, 0)

  return {
    totalUsers: users.length,
    activeUsers: activeUsers.length,
    newUsersToday: users.filter(u => new Date(u.createdAt) >= today).length,
    newUsersThisWeek: users.filter(u => new Date(u.createdAt) >= thisWeek).length,
    newUsersThisMonth: users.filter(u => new Date(u.createdAt) >= thisMonth).length,
    customers: customers.length,
    admins: admins.length,
    verifiedUsers: verifiedUsers.length,
    unverifiedUsers: users.length - verifiedUsers.length,
    blockedUsers: blockedUsers.length,
    averageOrdersPerUser: users.length ? totalOrders / users.length : 0,
    averageSpentPerUser: users.length ? totalSpent / users.length : 0,
    totalRevenue: totalSpent,
    topCustomers: [],
  }
}
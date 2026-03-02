// utils/constants.ts

// App Information
export const APP_NAME = 'HS Gold & Diamonds'
export const APP_DESCRIPTION = 'Premium gold and diamond jewelry since 1999. Handcrafted excellence with certified quality.'
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://hsgold.com'
export const APP_EMAIL = 'info@hsgold.com'
export const APP_PHONE = '+1 (234) 567-890'
export const APP_ADDRESS = '123 Jewelry Street, New York, NY 10001, USA'

// Admin Information
export const ADMIN_NAME = 'Hafiz Sajid Syed'
export const ADMIN_EMAIL = 'sajid.syed@gmail.com'
export const ADMIN_PHONE = '+1 (234) 567-890'
export const ADMIN_ROLE = 'Administrator'

// Currency
export const CURRENCY = {
  code: 'USD',
  symbol: '$',
  name: 'US Dollar',
}

// Tax & Shipping
export const TAX_RATE = 0.08 // 8%
export const FREE_SHIPPING_THRESHOLD = 5000 // $5000
export const STANDARD_SHIPPING = 25 // $25
export const EXPRESS_SHIPPING = 50 // $50

// Pagination
export const DEFAULT_PAGE_SIZE = 12
export const PAGE_SIZE_OPTIONS = [12, 24, 48, 96]

// Image Settings
export const IMAGE = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
  placeholder: '/images/placeholder.jpg',
  productPlaceholder: '/images/product-placeholder.jpg',
  avatarPlaceholder: '/images/avatar-placeholder.jpg',
}

// Date Formats
export const DATE_FORMAT = {
  short: 'MMM DD, YYYY',
  long: 'MMMM DD, YYYY',
  iso: 'YYYY-MM-DD',
  time: 'HH:mm A',
  dateTime: 'MMM DD, YYYY HH:mm A',
}

// Order Status
export const ORDER_STATUS = {
  pending: {
    label: 'Pending',
    color: 'bg-yellow-100 text-yellow-800',
    icon: '⏳',
  },
  processing: {
    label: 'Processing',
    color: 'bg-blue-100 text-blue-800',
    icon: '⚙️',
  },
  shipped: {
    label: 'Shipped',
    color: 'bg-purple-100 text-purple-800',
    icon: '📦',
  },
  delivered: {
    label: 'Delivered',
    color: 'bg-green-100 text-green-800',
    icon: '✅',
  },
  cancelled: {
    label: 'Cancelled',
    color: 'bg-red-100 text-red-800',
    icon: '❌',
  },
} as const

// Payment Status
export const PAYMENT_STATUS = {
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
} as const

// User Roles
export const USER_ROLES = {
  admin: {
    label: 'Admin',
    color: 'bg-purple-100 text-purple-800',
    icon: '👑',
  },
  customer: {
    label: 'Customer',
    color: 'bg-blue-100 text-blue-800',
    icon: '👤',
  },
} as const

// User Status
export const USER_STATUS = {
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
} as const

// Product Categories
export const PRODUCT_CATEGORIES = {
  necklaces: { label: 'Necklaces', icon: '📿' },
  earrings: { label: 'Earrings', icon: '🔔' },
  rings: { label: 'Rings', icon: '💍' },
  bangles: { label: 'Bangles', icon: '🔄' },
  chains: { label: 'Chains', icon: '🔗' },
  pendants: { label: 'Pendants', icon: '📿' },
  bracelets: { label: 'Bracelets', icon: '🔗' },
  'nose-pins': { label: 'Nose Pins', icon: '🔘' },
  'toe-rings': { label: 'Toe Rings', icon: '🦶' },
  anklets: { label: 'Anklets', icon: '🔗' },
} as const

// Gold Purity
export const GOLD_PURITY = {
  '24K': { label: '24K (99.9%)', color: 'text-yellow-600' },
  '22K': { label: '22K (91.6%)', color: 'text-yellow-500' },
  '18K': { label: '18K (75%)', color: 'text-yellow-400' },
  '14K': { label: '14K (58.5%)', color: 'text-yellow-300' },
} as const

// Product Genders
export const PRODUCT_GENDERS = {
  men: { label: 'Men', icon: '👨' },
  women: { label: 'Women', icon: '👩' },
  unisex: { label: 'Unisex', icon: '👥' },
  kids: { label: 'Kids', icon: '🧒' },
} as const

// Product Styles
export const PRODUCT_STYLES = {
  traditional: { label: 'Traditional', icon: '🏛️' },
  contemporary: { label: 'Contemporary', icon: '✨' },
  antique: { label: 'Antique', icon: '🏺' },
  fusion: { label: 'Fusion', icon: '🔄' },
  modern: { label: 'Modern', icon: '⭐' },
} as const

// Product Occasions
export const PRODUCT_OCCASIONS = {
  wedding: { label: 'Wedding', icon: '💒' },
  engagement: { label: 'Engagement', icon: '💍' },
  festive: { label: 'Festive', icon: '🎉' },
  party: { label: 'Party', icon: '🎊' },
  'daily-wear': { label: 'Daily Wear', icon: '⭐' },
  birthday: { label: 'Birthday', icon: '🎂' },
  anniversary: { label: 'Anniversary', icon: '💑' },
} as const

// Sort Options
export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
  { value: 'newest', label: 'Newest First' },
  { value: 'rating', label: 'Top Rated' },
] as const

// Navigation Links
export const NAVIGATION_LINKS = [
  { name: 'Home', href: '/', icon: '🏠' },
  { name: 'Products', href: '/products', icon: '💎' },
  { name: 'Gold', href: '/categories/gold', icon: '✨' },
  { name: 'Diamonds', href: '/categories/diamonds', icon: '💎' },
  { name: 'About', href: '/about', icon: 'ℹ️' },
  { name: 'Contact', href: '/contact', icon: '📞' },
  { name: 'Directions', href: '/directions', icon: '📍' },
] as const

// Footer Links
export const FOOTER_LINKS = {
  shop: [
    { name: 'All Products', href: '/products' },
    { name: 'New Arrivals', href: '/collections/new-arrivals' },
    { name: 'Best Sellers', href: '/collections/best-sellers' },
    { name: 'Gift Guide', href: '/collections/gift-guide' },
  ],
  gold: [
    { name: 'Gold Necklaces', href: '/categories/gold/necklaces' },
    { name: 'Gold Earrings', href: '/categories/gold/earrings' },
    { name: 'Gold Rings', href: '/categories/gold/rings' },
    { name: 'Gold Bangles', href: '/categories/gold/bangles' },
  ],
  diamonds: [
    { name: 'Diamond Rings', href: '/categories/diamonds/rings' },
    { name: 'Diamond Necklaces', href: '/categories/diamonds/necklaces' },
    { name: 'Diamond Earrings', href: '/categories/diamonds/earrings' },
    { name: 'Diamond Bracelets', href: '/categories/diamonds/bracelets' },
  ],
  customer: [
    { name: 'My Account', href: '/account' },
    { name: 'My Orders', href: '/orders' },
    { name: 'Wishlist', href: '/wishlist' },
    { name: 'Track Order', href: '/track-order' },
  ],
  info: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Directions', href: '/directions' },
    { name: 'FAQs', href: '/faqs' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Shipping Policy', href: '/shipping' },
    { name: 'Return Policy', href: '/returns' },
  ],
} as const

// Social Media Links
export const SOCIAL_LINKS = [
  { name: 'Facebook', url: 'https://facebook.com/hsgold', icon: '📘', color: 'bg-blue-600' },
  { name: 'Instagram', url: 'https://instagram.com/hsgold', icon: '📷', color: 'bg-pink-600' },
  { name: 'Twitter', url: 'https://twitter.com/hsgold', icon: '🐦', color: 'bg-blue-400' },
  { name: 'WhatsApp', url: 'https://wa.me/1234567890', icon: '📱', color: 'bg-green-600' },
  { name: 'YouTube', url: 'https://youtube.com/hsgold', icon: '▶️', color: 'bg-red-600' },
  { name: 'Pinterest', url: 'https://pinterest.com/hsgold', icon: '📌', color: 'bg-red-700' },
] as const

// Payment Methods
export const PAYMENT_METHODS = [
  { name: 'Visa', icon: '💳', color: 'bg-blue-600' },
  { name: 'MasterCard', icon: '💳', color: 'bg-red-600' },
  { name: 'American Express', icon: '💳', color: 'bg-blue-400' },
  { name: 'PayPal', icon: '📱', color: 'bg-gray-800' },
  { name: 'Apple Pay', icon: '🍎', color: 'bg-black' },
  { name: 'Google Pay', icon: 'G', color: 'bg-blue-500' },
] as const

// Local Storage Keys
export const STORAGE_KEYS = {
  cart: 'hsgold_cart',
  wishlist: 'hsgold_wishlist',
  user: 'hsgold_user',
  token: 'hsgold_token',
  preferences: 'hsgold_preferences',
  recentSearches: 'hsgold_recent_searches',
} as const

// Cache Keys
export const CACHE_KEYS = {
  products: 'products',
  product: (id: string) => `product-${id}`,
  categories: 'categories',
  cart: 'cart',
  orders: 'orders',
  user: 'user',
} as const

// API Endpoints
export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
    forgotPassword: '/api/auth/forgot-password',
    resetPassword: '/api/auth/reset-password',
  },
  products: {
    list: '/api/products',
    detail: (id: string) => `/api/products/${id}`,
    search: '/api/products/search',
  },
  cart: {
    get: '/api/cart',
    add: '/api/cart/add',
    update: '/api/cart/update',
    remove: '/api/cart/remove',
  },
  orders: {
    list: '/api/orders',
    create: '/api/orders',
    detail: (id: string) => `/api/orders/${id}`,
  },
} as const

// Validation Rules
export const VALIDATION = {
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
  zipCode: {
    pattern: /^\d{5}(-\d{4})?$/,
  },
} as const

// Error Messages
export const ERROR_MESSAGES = {
  required: 'This field is required',
  invalidEmail: 'Please enter a valid email address',
  invalidPhone: 'Please enter a valid phone number',
  invalidZipCode: 'Please enter a valid ZIP code',
  passwordTooShort: 'Password must be at least 6 characters',
  passwordTooLong: 'Password must be less than 50 characters',
  passwordsDoNotMatch: 'Passwords do not match',
  invalidCredentials: 'Invalid email or password',
  emailExists: 'Email already exists',
  networkError: 'Network error. Please try again.',
  serverError: 'Server error. Please try again later.',
  unauthorized: 'You are not authorized to perform this action',
  notFound: 'Resource not found',
} as const

// Success Messages
export const SUCCESS_MESSAGES = {
  login: 'Logged in successfully',
  logout: 'Logged out successfully',
  register: 'Account created successfully',
  profileUpdated: 'Profile updated successfully',
  passwordChanged: 'Password changed successfully',
  orderPlaced: 'Order placed successfully',
  cartUpdated: 'Cart updated successfully',
  wishlistUpdated: 'Wishlist updated successfully',
  addressAdded: 'Address added successfully',
  addressUpdated: 'Address updated successfully',
  addressDeleted: 'Address deleted successfully',
} as const
// lib/constants/index.ts

// Export all constants from categories
export * from './categories'

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

// SEO Defaults
export const DEFAULT_META = {
  title: 'HS Gold & Diamonds - Premium Gold and Diamond Jewelry',
  description: 'Shop the finest gold and diamond jewelry at HS Gold. Traditional and modern designs, certified quality, exceptional craftsmanship.',
  keywords: 'gold jewelry, diamond jewelry, gold necklace, diamond ring, wedding jewelry, engagement rings, gold earrings, diamond earrings',
  author: 'Hafiz Sajid Syed',
  robots: 'index, follow'
}

// Social Media Links
export const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    url: 'https://facebook.com/hsgold',
    icon: '📘',
    color: 'bg-blue-600'
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/hsgold',
    icon: '📷',
    color: 'bg-pink-600'
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/hsgold',
    icon: '🐦',
    color: 'bg-blue-400'
  },
  {
    name: 'WhatsApp',
    url: 'https://wa.me/1234567890',
    icon: '📱',
    color: 'bg-green-600'
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/hsgold',
    icon: '▶️',
    color: 'bg-red-600'
  },
  {
    name: 'Pinterest',
    url: 'https://pinterest.com/hsgold',
    icon: '📌',
    color: 'bg-red-700'
  }
]

// Payment Methods
export const PAYMENT_METHODS = [
  {
    id: 'visa',
    name: 'Visa',
    icon: '💳',
    color: 'bg-blue-600'
  },
  {
    id: 'mastercard',
    name: 'MasterCard',
    icon: '💳',
    color: 'bg-red-600'
  },
  {
    id: 'amex',
    name: 'American Express',
    icon: '💳',
    color: 'bg-blue-400'
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: '📱',
    color: 'bg-gray-800'
  },
  {
    id: 'apple-pay',
    name: 'Apple Pay',
    icon: '🍎',
    color: 'bg-black'
  },
  {
    id: 'google-pay',
    name: 'Google Pay',
    icon: 'G',
    color: 'bg-blue-500'
  }
]

// Shipping Methods
export const SHIPPING_METHODS = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    description: '5-7 business days',
    price: 25,
    freeThreshold: 5000
  },
  {
    id: 'express',
    name: 'Express Shipping',
    description: '2-3 business days',
    price: 50,
    freeThreshold: null
  },
  {
    id: 'next-day',
    name: 'Next Day Delivery',
    description: 'Order before 2PM',
    price: 75,
    freeThreshold: null
  }
]

// Tax Rates
export const TAX_RATE = 0.08 // 8%

// Currency
export const CURRENCY = {
  code: 'USD',
  symbol: '$',
  name: 'US Dollar'
}

// Order Status
export const ORDER_STATUS = {
  pending: {
    label: 'Pending',
    color: 'bg-yellow-100 text-yellow-800',
    icon: '⏳'
  },
  processing: {
    label: 'Processing',
    color: 'bg-blue-100 text-blue-800',
    icon: '⚙️'
  },
  shipped: {
    label: 'Shipped',
    color: 'bg-purple-100 text-purple-800',
    icon: '📦'
  },
  delivered: {
    label: 'Delivered',
    color: 'bg-green-100 text-green-800',
    icon: '✅'
  },
  cancelled: {
    label: 'Cancelled',
    color: 'bg-red-100 text-red-800',
    icon: '❌'
  }
}

// Payment Status
export const PAYMENT_STATUS = {
  paid: {
    label: 'Paid',
    color: 'bg-green-100 text-green-800',
    icon: '💰'
  },
  unpaid: {
    label: 'Unpaid',
    color: 'bg-yellow-100 text-yellow-800',
    icon: '⏰'
  },
  refunded: {
    label: 'Refunded',
    color: 'bg-red-100 text-red-800',
    icon: '↩️'
  }
}

// Product Purity Options
export const PURITY_OPTIONS = [
  { value: '24K', label: '24K (99.9%)', color: 'text-yellow-600' },
  { value: '22K', label: '22K (91.6%)', color: 'text-yellow-500' },
  { value: '18K', label: '18K (75%)', color: 'text-yellow-400' },
  { value: '14K', label: '14K (58.5%)', color: 'text-yellow-300' }
]

// Product Types
export const PRODUCT_TYPES = [
  { value: 'necklace', label: 'Necklace' },
  { value: 'earrings', label: 'Earrings' },
  { value: 'ring', label: 'Ring' },
  { value: 'bangles', label: 'Bangles' },
  { value: 'chain', label: 'Chain' },
  { value: 'pendant', label: 'Pendant' },
  { value: 'bracelet', label: 'Bracelet' },
  { value: 'nose-pin', label: 'Nose Pin' },
  { value: 'toe-ring', label: 'Toe Ring' },
  { value: 'anklet', label: 'Anklet' }
]

// Gender Options
export const GENDER_OPTIONS = [
  { value: 'men', label: 'Men' },
  { value: 'women', label: 'Women' },
  { value: 'unisex', label: 'Unisex' },
  { value: 'kids', label: 'Kids' }
]

// Occasion Options
export const OCCASION_OPTIONS = [
  { value: 'wedding', label: 'Wedding' },
  { value: 'engagement', label: 'Engagement' },
  { value: 'festive', label: 'Festive' },
  { value: 'party', label: 'Party' },
  { value: 'daily-wear', label: 'Daily Wear' },
  { value: 'birthday', label: 'Birthday' },
  { value: 'anniversary', label: 'Anniversary' }
]

// Style Options
export const STYLE_OPTIONS = [
  { value: 'traditional', label: 'Traditional' },
  { value: 'contemporary', label: 'Contemporary' },
  { value: 'antique', label: 'Antique' },
  { value: 'fusion', label: 'Fusion' },
  { value: 'modern', label: 'Modern' }
]

// Sort Options
export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
  { value: 'newest', label: 'Newest First' },
  { value: 'rating', label: 'Top Rated' }
]

// Navigation Items
export const NAVIGATION_ITEMS = [
  { name: 'Home', href: '/', icon: '🏠' },
  { name: 'Products', href: '/products', icon: '💎' },
  { name: 'Gold', href: '/categories/gold', icon: '✨' },
  { name: 'Diamonds', href: '/categories/diamonds', icon: '💎' },
  { name: 'About', href: '/about', icon: 'ℹ️' },
  { name: 'Contact', href: '/contact', icon: '📞' },
  { name: 'Directions', href: '/directions', icon: '📍' }
]

// Footer Quick Links
export const QUICK_LINKS = [
  { name: 'About Us', href: '/about' },
  { name: 'Contact Us', href: '/contact' },
  { name: 'Directions', href: '/directions' },
  { name: 'Health Benefits', href: '/health-benefits' },
  { name: 'FAQs', href: '/faqs' },
  { name: 'Shipping & Returns', href: '/shipping' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' }
]

// Customer Service Links
export const CUSTOMER_SERVICE_LINKS = [
  { name: 'My Account', href: '/account' },
  { name: 'Order Status', href: '/orders' },
  { name: 'Wishlist', href: '/wishlist' },
  { name: 'Track Order', href: '/track-order' },
  { name: 'Returns', href: '/returns' },
  { name: 'Help Center', href: '/help' }
]

// Company Info
export const COMPANY_INFO = {
  name: APP_NAME,
  description: APP_DESCRIPTION,
  email: APP_EMAIL,
  phone: APP_PHONE,
  address: APP_ADDRESS,
  workingHours: 'Mon-Sat: 10:00 AM - 8:00 PM',
  established: 1999,
  license: 'BIS Hallmarked',
  certification: 'GIA & IGI Certified'
}

// Admin Info
export const ADMIN_INFO = {
  name: ADMIN_NAME,
  email: ADMIN_EMAIL,
  phone: ADMIN_PHONE,
  role: ADMIN_ROLE
}

// Validation Rules
export const VALIDATION = {
  password: {
    minLength: 6,
    requireNumber: true,
    requireSpecial: false
  },
  phone: {
    pattern: /^\+?[1-9]\d{1,14}$/,
    placeholder: '+1 234 567 890'
  },
  zipCode: {
    pattern: /^\d{5}(-\d{4})?$/,
    placeholder: '12345'
  }
}

// Pagination
export const PAGINATION = {
  defaultPageSize: 12,
  pageSizeOptions: [12, 24, 48, 96]
}

// Cache Keys
export const CACHE_KEYS = {
  products: 'products',
  categories: 'categories',
  cart: 'cart',
  wishlist: 'wishlist',
  user: 'user',
  orders: 'orders'
}

// Local Storage Keys
export const STORAGE_KEYS = {
  cart: 'hsgold_cart',
  wishlist: 'hsgold_wishlist',
  user: 'hsgold_user',
  preferences: 'hsgold_preferences',
  recentSearches: 'hsgold_recent_searches'
}

// API Endpoints
export const API_ENDPOINTS = {
  products: '/api/products',
  categories: '/api/categories',
  cart: '/api/cart',
  orders: '/api/orders',
  auth: '/api/auth',
  admin: '/api/admin'
}

// Routes
export const ROUTES = {
  home: '/',
  products: '/products',
  product: (id: string) => `/products/${id}`,
  categories: '/categories',
  category: (slug: string) => `/categories/${slug}`,
  cart: '/cart',
  checkout: '/checkout',
  orders: '/orders',
  order: (id: string) => `/orders/${id}`,
  wishlist: '/wishlist',
  account: '/account',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  about: '/about',
  contact: '/contact',
  directions: '/directions',
  healthBenefits: '/health-benefits',
  admin: {
    dashboard: '/admin/dashboard',
    products: '/admin/products',
    orders: '/admin/orders',
    users: '/admin/users',
    settings: '/admin/settings'
  }
}
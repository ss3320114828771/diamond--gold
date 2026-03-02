// lib/constants/routes.ts

// Route types
export type RouteParams = {
  [key: string]: string | number
}

// Public Routes
export const PUBLIC_ROUTES = {
  // Home
  home: '/',
  
  // Products
  products: '/products',
  product: (id: string | number) => `/products/${id}`,
  
  // Categories
  categories: '/categories',
  category: (slug: string) => `/categories/${slug}`,
  gold: '/categories/gold',
  diamonds: '/categories/diamonds',
  platinum: '/categories/platinum',
  silver: '/categories/silver',
  
  // Collections
  collections: '/collections',
  collection: (slug: string) => `/collections/${slug}`,
  newArrivals: '/collections/new-arrivals',
  bestSellers: '/collections/best-sellers',
  wedding: '/collections/wedding',
  engagement: '/collections/engagement',
  giftGuide: '/collections/gift-guide',
  
  // Info Pages
  about: '/about',
  contact: '/contact',
  directions: '/directions',
  healthBenefits: '/health-benefits',
  faqs: '/faqs',
  shipping: '/shipping',
  returns: '/returns',
  privacy: '/privacy',
  terms: '/terms',
  
  // Blog
  blog: '/blog',
  blogPost: (slug: string) => `/blog/${slug}`,
  
  // Search
  search: '/search',
  searchWithQuery: (query: string) => `/search?q=${encodeURIComponent(query)}`,
}

// Auth Routes
export const AUTH_ROUTES = {
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  resetPassword: (token: string) => `/reset-password/${token}`,
  verifyEmail: (token: string) => `/verify-email/${token}`,
  logout: '/api/auth/logout',
}

// User Routes (Protected)
export const USER_ROUTES = {
  dashboard: '/account',
  profile: '/account/profile',
  orders: '/orders',
  order: (id: string | number) => `/orders/${id}`,
  orderConfirmation: (id: string | number) => `/orders/${id}/confirmation`,
  wishlist: '/wishlist',
  cart: '/cart',
  checkout: '/checkout',
  checkoutSuccess: '/checkout/success',
  checkoutCancel: '/checkout/cancel',
  addresses: '/account/addresses',
  addressNew: '/account/addresses/new',
  addressEdit: (id: string | number) => `/account/addresses/${id}/edit`,
  payments: '/account/payments',
  paymentMethods: '/account/payment-methods',
  reviews: '/account/reviews',
  settings: '/account/settings',
  notifications: '/account/notifications',
}

// Admin Routes (Protected + Admin Only)
export const ADMIN_ROUTES = {
  dashboard: '/admin/dashboard',
  
  // Products
  products: '/admin/products',
  productNew: '/admin/products/new',
  productEdit: (id: string | number) => `/admin/products/${id}/edit`,
  productView: (id: string | number) => `/admin/products/${id}`,
  productInventory: '/admin/products/inventory',
  productCategories: '/admin/products/categories',
  
  // Orders
  orders: '/admin/orders',
  orderView: (id: string | number) => `/admin/orders/${id}`,
  orderEdit: (id: string | number) => `/admin/orders/${id}/edit`,
  orderRefunds: '/admin/orders/refunds',
  
  // Users
  users: '/admin/users',
  userView: (id: string | number) => `/admin/users/${id}`,
  userEdit: (id: string | number) => `/admin/users/${id}/edit`,
  userRoles: '/admin/users/roles',
  
  // Customers
  customers: '/admin/customers',
  customerView: (id: string | number) => `/admin/customers/${id}`,
  
  // Reviews
  reviews: '/admin/reviews',
  reviewModeration: '/admin/reviews/moderation',
  
  // Marketing
  marketing: '/admin/marketing',
  coupons: '/admin/marketing/coupons',
  couponNew: '/admin/marketing/coupons/new',
  couponEdit: (id: string | number) => `/admin/marketing/coupons/${id}/edit`,
  newsletters: '/admin/marketing/newsletters',
  newsletterNew: '/admin/marketing/newsletters/new',
  
  // Analytics
  analytics: '/admin/analytics',
  reports: '/admin/analytics/reports',
  sales: '/admin/analytics/sales',
  inventory: '/admin/analytics/inventory',
  
  // Settings
  settings: '/admin/settings',
  settingsGeneral: '/admin/settings/general',
  settingsPayments: '/admin/settings/payments',
  settingsShipping: '/admin/settings/shipping',
  settingsTaxes: '/admin/settings/taxes',
  settingsEmail: '/admin/settings/email',
  settingsSEO: '/admin/settings/seo',
  settingsTeam: '/admin/settings/team',
}

// API Routes
export const API_ROUTES = {
  // Auth
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
    refresh: '/api/auth/refresh',
    verify: '/api/auth/verify',
    resetPassword: '/api/auth/reset-password',
    changePassword: '/api/auth/change-password',
  },
  
  // Products
  products: {
    list: '/api/products',
    detail: (id: string | number) => `/api/products/${id}`,
    related: (id: string | number) => `/api/products/${id}/related`,
    search: '/api/products/search',
    categories: '/api/products/categories',
    reviews: (id: string | number) => `/api/products/${id}/reviews`,
  },
  
  // Cart
  cart: {
    get: '/api/cart',
    add: '/api/cart/add',
    update: '/api/cart/update',
    remove: '/api/cart/remove',
    clear: '/api/cart/clear',
    applyCoupon: '/api/cart/coupon',
    removeCoupon: '/api/cart/coupon/remove',
  },
  
  // Orders
  orders: {
    list: '/api/orders',
    create: '/api/orders',
    detail: (id: string | number) => `/api/orders/${id}`,
    track: (id: string | number) => `/api/orders/${id}/track`,
    cancel: (id: string | number) => `/api/orders/${id}/cancel`,
  },
  
  // Wishlist
  wishlist: {
    get: '/api/wishlist',
    add: '/api/wishlist/add',
    remove: '/api/wishlist/remove',
    clear: '/api/wishlist/clear',
    moveToCart: (id: string | number) => `/api/wishlist/${id}/move-to-cart`,
  },
  
  // User
  user: {
    profile: '/api/user/profile',
    update: '/api/user/update',
    addresses: '/api/user/addresses',
    addressDetail: (id: string | number) => `/api/user/addresses/${id}`,
    payments: '/api/user/payments',
    reviews: '/api/user/reviews',
  },
  
  // Admin
  admin: {
    dashboard: '/api/admin/dashboard',
    
    // Products
    products: '/api/admin/products',
    productDetail: (id: string | number) => `/api/admin/products/${id}`,
    productBulk: '/api/admin/products/bulk',
    
    // Orders
    orders: '/api/admin/orders',
    orderDetail: (id: string | number) => `/api/admin/orders/${id}`,
    orderStatus: (id: string | number) => `/api/admin/orders/${id}/status`,
    
    // Users
    users: '/api/admin/users',
    userDetail: (id: string | number) => `/api/admin/users/${id}`,
    userBulk: '/api/admin/users/bulk',
    
    // Analytics
    analytics: '/api/admin/analytics',
    reports: '/api/admin/reports',
    export: '/api/admin/export',
  },
  
  // Webhooks
  webhooks: {
    stripe: '/api/webhooks/stripe',
    paypal: '/api/webhooks/paypal',
    shipping: '/api/webhooks/shipping',
  },
}

// Combined routes for easy access
export const ROUTES = {
  // Public
  ...PUBLIC_ROUTES,
  
  // Auth
  ...AUTH_ROUTES,
  
  // User
  ...USER_ROUTES,
  
  // Admin
  admin: ADMIN_ROUTES,
  
  // API
  api: API_ROUTES,
}

// Navigation structure for menus
export const NAVIGATION = {
  main: [
    { name: 'Home', href: PUBLIC_ROUTES.home, icon: '🏠' },
    { name: 'Products', href: PUBLIC_ROUTES.products, icon: '💎' },
    { name: 'Gold', href: PUBLIC_ROUTES.gold, icon: '✨' },
    { name: 'Diamonds', href: PUBLIC_ROUTES.diamonds, icon: '💎' },
    { name: 'Collections', href: PUBLIC_ROUTES.collections, icon: '🎁' },
    { name: 'About', href: PUBLIC_ROUTES.about, icon: 'ℹ️' },
    { name: 'Contact', href: PUBLIC_ROUTES.contact, icon: '📞' },
  ],
  
  footer: {
    shop: [
      { name: 'All Products', href: PUBLIC_ROUTES.products },
      { name: 'New Arrivals', href: PUBLIC_ROUTES.newArrivals },
      { name: 'Best Sellers', href: PUBLIC_ROUTES.bestSellers },
      { name: 'Gift Guide', href: PUBLIC_ROUTES.giftGuide },
      { name: 'Wedding', href: PUBLIC_ROUTES.wedding },
      { name: 'Engagement', href: PUBLIC_ROUTES.engagement },
    ],
    gold: [
      { name: 'Gold Necklaces', href: PUBLIC_ROUTES.category('gold-necklaces') },
      { name: 'Gold Earrings', href: PUBLIC_ROUTES.category('gold-earrings') },
      { name: 'Gold Rings', href: PUBLIC_ROUTES.category('gold-rings') },
      { name: 'Gold Bangles', href: PUBLIC_ROUTES.category('gold-bangles') },
      { name: 'Gold Chains', href: PUBLIC_ROUTES.category('gold-chains') },
    ],
    diamonds: [
      { name: 'Diamond Rings', href: PUBLIC_ROUTES.category('diamond-rings') },
      { name: 'Diamond Necklaces', href: PUBLIC_ROUTES.category('diamond-necklaces') },
      { name: 'Diamond Earrings', href: PUBLIC_ROUTES.category('diamond-earrings') },
      { name: 'Diamond Bracelets', href: PUBLIC_ROUTES.category('diamond-bracelets') },
    ],
    customer: [
      { name: 'My Account', href: USER_ROUTES.dashboard },
      { name: 'My Orders', href: USER_ROUTES.orders },
      { name: 'Wishlist', href: USER_ROUTES.wishlist },
      { name: 'Cart', href: USER_ROUTES.cart },
      { name: 'Track Order', href: USER_ROUTES.orders },
    ],
    info: [
      { name: 'About Us', href: PUBLIC_ROUTES.about },
      { name: 'Contact Us', href: PUBLIC_ROUTES.contact },
      { name: 'Directions', href: PUBLIC_ROUTES.directions },
      { name: 'Health Benefits', href: PUBLIC_ROUTES.healthBenefits },
      { name: 'FAQs', href: PUBLIC_ROUTES.faqs },
      { name: 'Shipping', href: PUBLIC_ROUTES.shipping },
      { name: 'Returns', href: PUBLIC_ROUTES.returns },
    ],
    legal: [
      { name: 'Privacy Policy', href: PUBLIC_ROUTES.privacy },
      { name: 'Terms of Service', href: PUBLIC_ROUTES.terms },
    ],
  },
  
  admin: [
    { name: 'Dashboard', href: ADMIN_ROUTES.dashboard, icon: '📊' },
    { name: 'Products', href: ADMIN_ROUTES.products, icon: '📦' },
    { name: 'Orders', href: ADMIN_ROUTES.orders, icon: '🛒' },
    { name: 'Users', href: ADMIN_ROUTES.users, icon: '👥' },
    { name: 'Customers', href: ADMIN_ROUTES.customers, icon: '👤' },
    { name: 'Reviews', href: ADMIN_ROUTES.reviews, icon: '⭐' },
    { name: 'Marketing', href: ADMIN_ROUTES.marketing, icon: '📢' },
    { name: 'Analytics', href: ADMIN_ROUTES.analytics, icon: '📈' },
    { name: 'Settings', href: ADMIN_ROUTES.settings, icon: '⚙️' },
  ],
}

// Helper function to check if a route matches
export function isActiveRoute(currentPath: string, routePath: string): boolean {
  if (routePath === '/') {
    return currentPath === '/'
  }
  return currentPath.startsWith(routePath)
}

// Helper function to get breadcrumb items for a path
export function getBreadcrumbs(path: string): { name: string; href: string }[] {
  const paths = path.split('/').filter(p => p)
  const breadcrumbs = [{ name: 'Home', href: '/' }]
  
  let currentPath = ''
  for (const p of paths) {
    currentPath += `/${p}`
    const name = p.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
    breadcrumbs.push({ name, href: currentPath })
  }
  
  return breadcrumbs
}

// Helper function to get route name from path
export function getRouteName(path: string): string {
  const routeMap: Record<string, string> = {
    '/': 'Home',
    '/products': 'Products',
    '/cart': 'Cart',
    '/checkout': 'Checkout',
    '/wishlist': 'Wishlist',
    '/orders': 'Orders',
    '/account': 'Account',
    '/about': 'About',
    '/contact': 'Contact',
    '/directions': 'Directions',
    '/health-benefits': 'Health Benefits',
    '/admin/dashboard': 'Dashboard',
    '/admin/products': 'Products',
    '/admin/orders': 'Orders',
    '/admin/users': 'Users',
  }
  
  return routeMap[path] || 'Not Found'
}
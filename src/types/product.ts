// types/product.ts
import { User } from './user'

// Product Category Types
export type ProductCategory = 
  | 'necklaces'
  | 'earrings'
  | 'rings'
  | 'bangles'
  | 'chains'
  | 'pendants'
  | 'bracelets'
  | 'nose-pins'
  | 'toe-rings'
  | 'anklets'

// Product Purity Types
export type GoldPurity = '24K' | '22K' | '18K' | '14K'
export type DiamondPurity = 'IF' | 'VVS1' | 'VVS2' | 'VS1' | 'VS2' | 'SI1' | 'SI2'
export type PlatinumPurity = '950' | '900' | '850'

// Product Gender Types
export type ProductGender = 'men' | 'women' | 'unisex' | 'kids'

// Product Style Types
export type ProductStyle = 'traditional' | 'contemporary' | 'antique' | 'fusion' | 'modern'

// Product Occasion Types
export type ProductOccasion = 
  | 'wedding'
  | 'engagement'
  | 'festive'
  | 'party'
  | 'daily-wear'
  | 'birthday'
  | 'anniversary'

// Product Image Types
export type ProductImage = {
  id: string
  url: string
  alt?: string
  isPrimary: boolean
  sortOrder: number
}

// Product Variant Types
export type ProductVariant = {
  id: string
  productId: string
  name: string
  sku: string
  price: number
  comparePrice?: number
  weight?: number
  purity?: GoldPurity | PlatinumPurity
  stock: number
  images: string[]
  isDefault: boolean
}

// Product Review Types
export type ProductReview = {
  id: string
  productId: string
  userId: string
  user?: User
  rating: number
  title?: string
  content: string
  images?: string[]
  verified: boolean
  helpful: number
  notHelpful: number
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
  updatedAt: string
}

// Product Review Summary
export type ProductReviewSummary = {
  averageRating: number
  totalReviews: number
  ratingDistribution: {
    1: number
    2: number
    3: number
    4: number
    5: number
  }
  verifiedReviews: number
  withImages: number
}

// Product Tag Types
export type ProductTag = {
  id: string
  name: string
  slug: string
}

// Product SEO Types
export type ProductSEO = {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
  canonical?: string
}

// Main Product Type
export type Product = {
  id: string
  name: string
  slug: string
  description: string
  shortDescription?: string
  
  // Pricing
  price: number
  comparePrice?: number
  discount?: number
  cost?: number // For admin only
  
  // Categories
  category: ProductCategory
  subcategory?: string
  tags: ProductTag[]
  
  // Product Details
  purity?: GoldPurity | DiamondPurity | PlatinumPurity
  weight?: number
  dimensions?: {
    length?: number
    width?: number
    height?: number
    unit: 'mm' | 'cm' | 'inch'
  }
  
  // Classification
  gender?: ProductGender
  style?: ProductStyle
  occasion?: ProductOccasion[]
  
  // Media
  images: ProductImage[]
  videos?: string[]
  
  // Inventory
  sku: string
  barcode?: string
  stock: number
  lowStockThreshold: number
  inStock: boolean
  allowBackorder: boolean
  
  // Status
  status: 'draft' | 'published' | 'archived'
  featured: boolean
  isNew: boolean
  isOnSale: boolean
  
  // Variants
  hasVariants: boolean
  variants?: ProductVariant[]
  
  // Reviews
  reviews?: ProductReview[]
  reviewSummary: ProductReviewSummary
  
  // SEO
  seo: ProductSEO
  
  // Metadata
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

// Product Summary Type (for lists)
export type ProductSummary = {
  id: string
  name: string
  slug: string
  price: number
  comparePrice?: number
  discount?: number
  image: string
  category: ProductCategory
  purity?: string
  inStock: boolean
  featured: boolean
  isNew: boolean
  rating: number
  reviewCount: number
}

// Create Product Types
export type CreateProductInput = {
  name: string
  description: string
  shortDescription?: string
  price: number
  comparePrice?: number
  category: ProductCategory
  subcategory?: string
  tags?: string[]
  purity?: string
  weight?: number
  gender?: ProductGender
  style?: ProductStyle
  occasion?: ProductOccasion[]
  images: { url: string; isPrimary: boolean }[]
  sku: string
  stock: number
  lowStockThreshold?: number
  featured?: boolean
  seo?: Partial<ProductSEO>
}

export type CreateProductResponse = {
  success: boolean
  product?: Product
  error?: string
}

// Update Product Types
export type UpdateProductInput = Partial<CreateProductInput> & {
  status?: 'draft' | 'published' | 'archived'
}

export type UpdateProductResponse = {
  success: boolean
  product?: Product
  error?: string
}

// Product Filter Types
export type ProductFilter = {
  category?: ProductCategory | 'all'
  subcategory?: string
  purity?: string
  gender?: ProductGender | 'all'
  style?: ProductStyle | 'all'
  occasion?: ProductOccasion | 'all'
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  featured?: boolean
  onSale?: boolean
  tags?: string[]
  search?: string
  sortBy?: 'featured' | 'price-low' | 'price-high' | 'newest' | 'rating' | 'name-asc' | 'name-desc'
  page?: number
  limit?: number
}

export type ProductFilterResponse = {
  products: ProductSummary[]
  total: number
  page: number
  totalPages: number
  filters: {
    categories: { name: string; count: number }[]
    purities: { value: string; count: number }[]
    priceRange: { min: number; max: number }
  }
}

// Product Search Types
export type ProductSearchInput = {
  query: string
  filters?: Omit<ProductFilter, 'search'>
  page?: number
  limit?: number
}

export type ProductSearchResponse = {
  products: ProductSummary[]
  total: number
  suggestions?: string[]
}

// Related Products Types
export type RelatedProductsInput = {
  productId: string
  limit?: number
  basedOn?: 'category' | 'tags' | 'purity' | 'price'
}

export type RelatedProductsResponse = {
  products: ProductSummary[]
}

// Product Review Types
export type CreateReviewInput = {
  productId: string
  rating: number
  title?: string
  content: string
  images?: string[]
}

export type CreateReviewResponse = {
  success: boolean
  review?: ProductReview
  error?: string
}

export type UpdateReviewInput = {
  rating?: number
  title?: string
  content?: string
  images?: string[]
}

export type UpdateReviewResponse = {
  success: boolean
  review?: ProductReview
  error?: string
}

export type HelpfulReviewInput = {
  reviewId: string
  helpful: boolean
}

// Product Inventory Types
export type InventoryUpdateInput = {
  productId: string
  variantId?: string
  quantity: number
  type: 'add' | 'remove' | 'set'
  reason?: string
}

export type InventoryUpdateResponse = {
  success: boolean
  newStock: number
  error?: string
}

export type LowStockAlert = {
  productId: string
  productName: string
  variantName?: string
  sku: string
  currentStock: number
  threshold: number
}

// Product Bulk Operations Types
export type BulkProductAction = 
  | 'delete'
  | 'publish'
  | 'unpublish'
  | 'feature'
  | 'unfeature'
  | 'updatePrice'
  | 'updateStock'

export type BulkProductInput = {
  productIds: string[]
  action: BulkProductAction
  value?: number | boolean
}

export type BulkProductResponse = {
  success: boolean
  updatedCount: number
  errors?: { id: string; error: string }[]
}

// Product Import/Export Types
export type ProductImportInput = {
  file: File
  format: 'csv' | 'json' | 'excel'
  options?: {
    overwriteExisting?: boolean
    skipFirstRow?: boolean
    mappings?: Record<string, string>
  }
}

export type ProductImportResponse = {
  success: boolean
  imported: number
  failed: number
  errors?: { row: number; error: string }[]
}

export type ProductExportInput = {
  format: 'csv' | 'json' | 'excel'
  filters?: ProductFilter
  fields?: string[]
}

// Product Statistics Types
export type ProductStats = {
  totalProducts: number
  publishedProducts: number
  draftProducts: number
  archivedProducts: number
  outOfStock: number
  lowStock: number
  totalValue: number
  averagePrice: number
  mostViewed: ProductSummary[]
  bestSelling: ProductSummary[]
  topRated: ProductSummary[]
  categoryDistribution: Record<ProductCategory, number>
  priceDistribution: {
    range: string
    count: number
  }[]
}

// Helper functions for product status
export const PRODUCT_STATUS_CONFIG = {
  draft: {
    label: 'Draft',
    color: 'bg-gray-100 text-gray-800',
    icon: '📝',
  },
  published: {
    label: 'Published',
    color: 'bg-green-100 text-green-800',
    icon: '✅',
  },
  archived: {
    label: 'Archived',
    color: 'bg-yellow-100 text-yellow-800',
    icon: '📦',
  },
} as const

// Helper functions for product categories
export const PRODUCT_CATEGORY_CONFIG: Record<ProductCategory, {
  label: string
  icon: string
  parent?: ProductCategory
}> = {
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
}

// Product validation rules
export const PRODUCT_VALIDATION = {
  name: {
    minLength: 3,
    maxLength: 100,
  },
  description: {
    minLength: 10,
    maxLength: 5000,
  },
  price: {
    min: 0,
    max: 1000000,
  },
  stock: {
    min: 0,
    max: 999999,
  },
  images: {
    min: 1,
    max: 20,
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
    maxSize: 5 * 1024 * 1024, // 5MB
  },
  sku: {
    pattern: /^[A-Z0-9-]+$/,
    maxLength: 50,
  },
} as const

// Product messages
export const PRODUCT_MESSAGES = {
  created: 'Product created successfully',
  updated: 'Product updated successfully',
  deleted: 'Product deleted successfully',
  published: 'Product published successfully',
  archived: 'Product archived successfully',
  notFound: 'Product not found',
  outOfStock: 'Product is out of stock',
  invalidSKU: 'SKU already exists',
  invalidPrice: 'Invalid price',
  invalidDiscount: 'Discount cannot exceed price',
  reviewAdded: 'Review added successfully',
  reviewUpdated: 'Review updated successfully',
  reviewDeleted: 'Review deleted successfully',
} as const

// Helper function to calculate discount percentage
export function calculateDiscount(price: number, comparePrice: number): number {
  if (price >= comparePrice) return 0
  return Math.round(((comparePrice - price) / comparePrice) * 100)
}

// Helper function to check if product is on sale
export function isOnSale(product: Product): boolean {
  return !!product.comparePrice && product.comparePrice > product.price
}

// Helper function to get product image URL
export function getProductImage(product: Product, index: number = 0): string {
  const primaryImage = product.images.find(img => img.isPrimary)
  return primaryImage?.url || product.images[index]?.url || '/images/placeholder.jpg'
}

// Helper function to format product price range
export function formatPriceRange(products: Product[]): string {
  const prices = products.map(p => p.price)
  const min = Math.min(...prices)
  const max = Math.max(...prices)
  return min === max ? `$${min}` : `$${min} - $${max}`
}

// Helper function to get product availability status
export function getProductAvailability(product: Product): {
  label: string
  color: string
  available: boolean
} {
  if (product.stock > product.lowStockThreshold) {
    return { label: 'In Stock', color: 'text-green-600', available: true }
  }
  if (product.stock > 0) {
    return { label: 'Low Stock', color: 'text-orange-600', available: true }
  }
  if (product.allowBackorder) {
    return { label: 'Backorder', color: 'text-yellow-600', available: true }
  }
  return { label: 'Out of Stock', color: 'text-red-600', available: false }
}
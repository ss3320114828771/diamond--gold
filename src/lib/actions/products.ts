// lib/actions/products.ts
'use server'

import { revalidatePath } from 'next/cache'

// Types
export type Product = {
  id: string
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
  isNew?: boolean
  discount?: number
  rating?: number
  reviewCount?: number
  sku?: string
  tags?: string[]
  createdAt: string
  updatedAt: string
}

export type ProductFilters = {
  category?: string
  purity?: string
  gender?: string
  occasion?: string
  style?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  featured?: boolean
  search?: string
  tags?: string[]
}

export type ProductsResponse = {
  success: boolean
  products?: Product[]
  product?: Product
  error?: string
  total?: number
  page?: number
  totalPages?: number
}

// Mock products database
const products: Product[] = [
  {
    id: '1',
    name: '24K Gold Kundan Necklace',
    description: 'Exquisite traditional Kundan necklace with intricate design, perfect for weddings and special occasions. Handcrafted by skilled artisans using pure 24K gold.',
    price: 12999,
    purity: '24K',
    weight: 45.5,
    images: ['/images/n1.jpeg', '/images/n2.jpeg', '/images/n3.jpeg'],
    category: 'Necklaces',
    inStock: true,
    featured: true,
    isNew: false,
    discount: 0,
    rating: 4.8,
    reviewCount: 45,
    sku: 'GN-24K-001',
    tags: ['wedding', 'traditional', 'kundan'],
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-03-10T14:20:00Z'
  },
  {
    id: '2',
    name: '22K Gold Jhumka Earrings',
    description: 'Classic Jhumka earrings with peacock design, handcrafted by skilled artisans.',
    price: 3499,
    purity: '22K',
    weight: 12.8,
    images: ['/images/n2.jpeg', '/images/n3.jpeg'],
    category: 'Earrings',
    inStock: true,
    featured: true,
    isNew: false,
    discount: 0,
    rating: 4.6,
    reviewCount: 38,
    sku: 'GE-22K-002',
    tags: ['traditional', 'daily-wear'],
    createdAt: '2024-01-20T09:15:00Z',
    updatedAt: '2024-03-08T11:30:00Z'
  },
  {
    id: '3',
    name: '18K Gold Diamond Ring',
    description: 'Modern design ring with diamond accents, perfect for engagements and special moments.',
    price: 5999,
    comparePrice: 6999,
    purity: '18K',
    weight: 8.5,
    images: ['/images/n3.jpeg', '/images/n4.jpeg'],
    category: 'Rings',
    inStock: true,
    featured: false,
    isNew: true,
    discount: 14,
    rating: 5.0,
    reviewCount: 27,
    sku: 'GR-18K-003',
    tags: ['engagement', 'diamond', 'modern'],
    createdAt: '2024-02-01T13:45:00Z',
    updatedAt: '2024-03-12T16:20:00Z'
  },
  {
    id: '4',
    name: '24K Gold Bangles Set',
    description: 'Set of 4 traditional gold bangles with floral pattern, perfect for weddings.',
    price: 8999,
    purity: '24K',
    weight: 32.0,
    images: ['/images/n4.jpeg', '/images/n5.jpeg'],
    category: 'Bangles',
    inStock: true,
    featured: true,
    isNew: false,
    discount: 0,
    rating: 4.7,
    reviewCount: 23,
    sku: 'GB-24K-004',
    tags: ['wedding', 'traditional', 'set'],
    createdAt: '2024-01-25T11:20:00Z',
    updatedAt: '2024-03-05T10:10:00Z'
  },
  {
    id: '5',
    name: '22K Gold Chain for Men',
    description: 'Bold gold chain with modern links, perfect for daily wear.',
    price: 4999,
    purity: '22K',
    weight: 18.5,
    images: ['/images/n5.jpeg'],
    category: 'Chains',
    inStock: false,
    featured: false,
    isNew: false,
    discount: 0,
    rating: 4.5,
    reviewCount: 15,
    sku: 'GC-22K-005',
    tags: ['men', 'daily-wear'],
    createdAt: '2024-02-10T15:30:00Z',
    updatedAt: '2024-03-01T09:45:00Z'
  },
  {
    id: '6',
    name: '18K Gold Pendant Set',
    description: 'Elegant pendant with matching earrings, perfect for parties.',
    price: 4499,
    purity: '18K',
    weight: 15.2,
    images: ['/images/n6.jpeg', '/images/n1.jpeg'],
    category: 'Pendants',
    inStock: true,
    featured: true,
    isNew: true,
    discount: 0,
    rating: 4.9,
    reviewCount: 31,
    sku: 'GP-18K-006',
    tags: ['party', 'set', 'elegant'],
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-03-14T13:25:00Z'
  }
]

// Helper function to filter products
function filterProducts(filters?: ProductFilters): Product[] {
  let filtered = [...products]

  if (!filters) {
    return filtered
  }

  // Category filter
  if (filters.category) {
    filtered = filtered.filter(p => p.category === filters.category)
  }

  // Purity filter
  if (filters.purity) {
    filtered = filtered.filter(p => p.purity === filters.purity)
  }

  // Gender filter (based on tags)
  if (filters.gender) {
    filtered = filtered.filter(p => p.tags?.includes(filters.gender!))
  }

  // Occasion filter (based on tags)
  if (filters.occasion) {
    filtered = filtered.filter(p => p.tags?.includes(filters.occasion!))
  }

  // Style filter (based on tags)
  if (filters.style) {
    filtered = filtered.filter(p => p.tags?.includes(filters.style!))
  }

  // Price range filter
  if (filters.minPrice !== undefined) {
    filtered = filtered.filter(p => p.price >= filters.minPrice!)
  }

  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter(p => p.price <= filters.maxPrice!)
  }

  // Stock filter
  if (filters.inStock !== undefined) {
    filtered = filtered.filter(p => p.inStock === filters.inStock)
  }

  // Featured filter
  if (filters.featured !== undefined) {
    filtered = filtered.filter(p => p.featured === filters.featured)
  }

  // Search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower) ||
      p.tags?.some(tag => tag.toLowerCase().includes(searchLower))
    )
  }

  // Tags filter
  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter(p =>
      filters.tags!.some(tag => p.tags?.includes(tag))
    )
  }

  return filtered
}

// Get all products with optional filters and pagination
export async function getProducts(
  filters?: ProductFilters,
  page: number = 1,
  limit: number = 12
): Promise<ProductsResponse> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))

    const filtered = filterProducts(filters)
    const total = filtered.length
    const totalPages = Math.ceil(total / limit)
    const start = (page - 1) * limit
    const paginatedProducts = filtered.slice(start, start + limit)

    return {
      success: true,
      products: paginatedProducts,
      total,
      page,
      totalPages
    }
  } catch (error) {
    console.error('Error getting products:', error)
    return {
      success: false,
      error: 'Failed to get products'
    }
  }
}

// Get single product by ID
export async function getProductById(id: string): Promise<ProductsResponse> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200))

    const product = products.find(p => p.id === id)

    if (!product) {
      return {
        success: false,
        error: 'Product not found'
      }
    }

    return {
      success: true,
      product
    }
  } catch (error) {
    console.error('Error getting product:', error)
    return {
      success: false,
      error: 'Failed to get product'
    }
  }
}

// Get product by SKU
export async function getProductBySku(sku: string): Promise<ProductsResponse> {
  try {
    const product = products.find(p => p.sku === sku)

    if (!product) {
      return {
        success: false,
        error: 'Product not found'
      }
    }

    return {
      success: true,
      product
    }
  } catch (error) {
    console.error('Error getting product by SKU:', error)
    return {
      success: false,
      error: 'Failed to get product'
    }
  }
}

// Get featured products
export async function getFeaturedProducts(limit: number = 8): Promise<ProductsResponse> {
  try {
    const featured = products
      .filter(p => p.featured)
      .slice(0, limit)

    return {
      success: true,
      products: featured
    }
  } catch (error) {
    console.error('Error getting featured products:', error)
    return {
      success: false,
      error: 'Failed to get featured products'
    }
  }
}

// Get new arrivals
export async function getNewArrivals(limit: number = 8): Promise<ProductsResponse> {
  try {
    const newArrivals = products
      .filter(p => p.isNew)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit)

    return {
      success: true,
      products: newArrivals
    }
  } catch (error) {
    console.error('Error getting new arrivals:', error)
    return {
      success: false,
      error: 'Failed to get new arrivals'
    }
  }
}

// Get related products
export async function getRelatedProducts(
  productId: string,
  category?: string,
  limit: number = 4
): Promise<ProductsResponse> {
  try {
    let related = products.filter(p => p.id !== productId)

    if (category) {
      related = related.filter(p => p.category === category)
    }

    // If not enough products in same category, add other products
    if (related.length < limit) {
      const otherProducts = products
        .filter(p => p.id !== productId && p.category !== category)
        .slice(0, limit - related.length)
      related = [...related, ...otherProducts]
    }

    return {
      success: true,
      products: related.slice(0, limit)
    }
  } catch (error) {
    console.error('Error getting related products:', error)
    return {
      success: false,
      error: 'Failed to get related products'
    }
  }
}

// Get products by category
export async function getProductsByCategory(
  category: string,
  limit?: number
): Promise<ProductsResponse> {
  try {
    let filtered = products.filter(p => p.category === category)

    if (limit) {
      filtered = filtered.slice(0, limit)
    }

    return {
      success: true,
      products: filtered
    }
  } catch (error) {
    console.error('Error getting products by category:', error)
    return {
      success: false,
      error: 'Failed to get products by category'
    }
  }
}

// Search products
export async function searchProducts(query: string): Promise<ProductsResponse> {
  try {
    if (!query) {
      return {
        success: true,
        products: []
      }
    }

    const searchLower = query.toLowerCase()
    const results = products.filter(p =>
      p.name.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower) ||
      p.tags?.some(tag => tag.toLowerCase().includes(searchLower))
    )

    return {
      success: true,
      products: results
    }
  } catch (error) {
    console.error('Error searching products:', error)
    return {
      success: false,
      error: 'Failed to search products'
    }
  }
}

// Get product categories with counts
export async function getCategories(): Promise<{
  success: boolean
  categories?: { name: string; count: number }[]
  error?: string
}> {
  try {
    const categoryCount = products.reduce((acc, product) => {
      if (product.category) {
        acc[product.category] = (acc[product.category] || 0) + 1
      }
      return acc
    }, {} as Record<string, number>)

    const categories = Object.entries(categoryCount).map(([name, count]) => ({
      name,
      count
    }))

    return {
      success: true,
      categories
    }
  } catch (error) {
    console.error('Error getting categories:', error)
    return {
      success: false,
      error: 'Failed to get categories'
    }
  }
}

// Get product filters (purity options, etc.)
export async function getProductFilters(): Promise<{
  success: boolean
  filters?: {
    purities: string[]
    categories: string[]
    priceRange: { min: number; max: number }
  }
  error?: string
}> {
  try {
    const purities = [...new Set(products.map(p => p.purity).filter(Boolean))] as string[]
    const categories = [...new Set(products.map(p => p.category).filter(Boolean))] as string[]
    const prices = products.map(p => p.price)
    const priceRange = {
      min: Math.min(...prices),
      max: Math.max(...prices)
    }

    return {
      success: true,
      filters: {
        purities,
        categories,
        priceRange
      }
    }
  } catch (error) {
    console.error('Error getting product filters:', error)
    return {
      success: false,
      error: 'Failed to get product filters'
    }
  }
}

// Check product availability
export async function checkAvailability(
  productId: string,
  quantity: number = 1
): Promise<{
  success: boolean
  available?: boolean
  maxAvailable?: number
  error?: string
}> {
  try {
    const product = products.find(p => p.id === productId)

    if (!product) {
      return {
        success: false,
        error: 'Product not found'
      }
    }

    if (!product.inStock) {
      return {
        success: true,
        available: false,
        maxAvailable: 0
      }
    }

    // In real app: Check actual stock in database
    const stock = 10 // Mock stock
    const available = stock >= quantity

    return {
      success: true,
      available,
      maxAvailable: stock
    }
  } catch (error) {
    console.error('Error checking availability:', error)
    return {
      success: false,
      error: 'Failed to check availability'
    }
  }
}

// Get product reviews
export async function getProductReviews(productId: string) {
  try {
    // In real app: Fetch from database
    // For demo, return mock reviews
    const reviews = [
      {
        id: '1',
        userId: '2',
        userName: 'Ahmed Khan',
        rating: 5,
        title: 'Absolutely stunning!',
        content: 'The quality is exceptional. Highly recommend!',
        date: '2024-03-15T10:30:00Z',
        verified: true
      },
      {
        id: '2',
        userId: '3',
        userName: 'Fatima Ali',
        rating: 4,
        title: 'Beautiful piece',
        content: 'Very happy with my purchase. Shipping was quick.',
        date: '2024-03-10T14:20:00Z',
        verified: true
      }
    ]

    return {
      success: true,
      reviews,
      averageRating: 4.5,
      totalReviews: reviews.length
    }
  } catch (error) {
    console.error('Error getting product reviews:', error)
    return {
      success: false,
      error: 'Failed to get product reviews'
    }
  }
}
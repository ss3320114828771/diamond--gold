// hooks/use-products.ts
'use client'

import { useState, useCallback, useEffect } from 'react'

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

export type SortOption = 
  | 'featured'
  | 'price-low'
  | 'price-high'
  | 'name-asc'
  | 'name-desc'
  | 'newest'
  | 'rating'

type ProductsState = {
  products: Product[]
  filteredProducts: Product[]
  currentProduct: Product | null
  isLoading: boolean
  error: string | null
  totalCount: number
  currentPage: number
  totalPages: number
  filters: ProductFilters
  sortBy: SortOption
}

type UseProductsReturn = {
  // State
  products: Product[]
  filteredProducts: Product[]
  currentProduct: Product | null
  isLoading: boolean
  error: string | null
  totalCount: number
  currentPage: number
  totalPages: number
  filters: ProductFilters
  sortBy: SortOption

  // Actions
  fetchProducts: (page?: number, limit?: number) => Promise<void>
  fetchProduct: (id: string) => Promise<void>
  fetchRelatedProducts: (productId: string, category?: string) => Promise<Product[]>
  searchProducts: (query: string) => Promise<void>
  applyFilters: (filters: ProductFilters) => void
  setSortBy: (sortBy: SortOption) => void
  clearFilters: () => void
  loadMore: () => Promise<void>
  clearCurrentProduct: () => void
  clearError: () => void
}

// Mock products data
const mockProducts: Product[] = [
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

export function useProducts(): UseProductsReturn {
  const [state, setState] = useState<ProductsState>({
    products: [],
    filteredProducts: [],
    currentProduct: null,
    isLoading: false,
    error: null,
    totalCount: 0,
    currentPage: 1,
    totalPages: 1,
    filters: {},
    sortBy: 'featured'
  })

  // Filter and sort products
  const filterAndSortProducts = useCallback((
    products: Product[],
    filters: ProductFilters,
    sortBy: SortOption
  ): Product[] => {
    let filtered = [...products]

    // Apply filters
    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category)
    }

    if (filters.purity) {
      filtered = filtered.filter(p => p.purity === filters.purity)
    }

    if (filters.gender) {
      // Assuming products have a gender field or you can derive from tags
      filtered = filtered.filter(p => p.tags?.includes(filters.gender!))
    }

    if (filters.occasion) {
      filtered = filtered.filter(p => p.tags?.includes(filters.occasion!))
    }

    if (filters.style) {
      filtered = filtered.filter(p => p.tags?.includes(filters.style!))
    }

    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(p => p.price >= filters.minPrice!)
    }

    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(p => p.price <= filters.maxPrice!)
    }

    if (filters.inStock !== undefined) {
      filtered = filtered.filter(p => p.inStock === filters.inStock)
    }

    if (filters.featured !== undefined) {
      filtered = filtered.filter(p => p.featured === filters.featured)
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.tags?.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }

    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter(p =>
        filters.tags!.some(tag => p.tags?.includes(tag))
      )
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name))
        break
      case 'newest':
        filtered.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        break
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case 'featured':
      default:
        // Keep original order with featured first
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
    }

    return filtered
  }, [])

  // Fetch products with pagination
  const fetchProducts = useCallback(async (page: number = 1, limit: number = 12) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))

      const filtered = filterAndSortProducts(mockProducts, state.filters, state.sortBy)
      
      const totalCount = filtered.length
      const totalPages = Math.ceil(totalCount / limit)
      const start = (page - 1) * limit
      const paginatedProducts = filtered.slice(start, start + limit)

      setState(prev => ({
        ...prev,
        products: paginatedProducts,
        filteredProducts: filtered,
        isLoading: false,
        error: null,
        totalCount,
        currentPage: page,
        totalPages
      }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch products'
      }))
    }
  }, [state.filters, state.sortBy, filterAndSortProducts])

  // Fetch single product
  const fetchProduct = useCallback(async (id: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 600))

      const product = mockProducts.find(p => p.id === id)

      if (!product) {
        throw new Error('Product not found')
      }

      setState(prev => ({
        ...prev,
        currentProduct: product,
        isLoading: false,
        error: null
      }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch product'
      }))
    }
  }, [])

  // Fetch related products
  const fetchRelatedProducts = useCallback(async (productId: string, category?: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))

      let related = mockProducts.filter(p => p.id !== productId)

      if (category) {
        related = related.filter(p => p.category === category)
      }

      return related.slice(0, 4) // Return top 4 related products
    } catch (error) {
      console.error('Failed to fetch related products:', error)
      return []
    }
  }, [])

  // Search products
  const searchProducts = useCallback(async (query: string) => {
    setState(prev => ({
      ...prev,
      filters: { ...prev.filters, search: query },
      currentPage: 1
    }))
    await fetchProducts(1)
  }, [fetchProducts])

  // Apply filters
  const applyFilters = useCallback((filters: ProductFilters) => {
    setState(prev => ({
      ...prev,
      filters: { ...prev.filters, ...filters },
      currentPage: 1
    }))
    fetchProducts(1)
  }, [fetchProducts])

  // Set sort option
  const setSortBy = useCallback((sortBy: SortOption) => {
    setState(prev => ({ ...prev, sortBy, currentPage: 1 }))
    fetchProducts(1)
  }, [fetchProducts])

  // Clear all filters
  const clearFilters = useCallback(() => {
    setState(prev => ({
      ...prev,
      filters: {},
      sortBy: 'featured',
      currentPage: 1
    }))
    fetchProducts(1)
  }, [fetchProducts])

  // Load more products (pagination)
  const loadMore = useCallback(async () => {
    if (state.currentPage < state.totalPages) {
      await fetchProducts(state.currentPage + 1)
    }
  }, [state.currentPage, state.totalPages, fetchProducts])

  // Clear current product
  const clearCurrentProduct = useCallback(() => {
    setState(prev => ({ ...prev, currentProduct: null }))
  }, [])

  // Clear error
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }))
  }, [])

  // Load initial products
  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return {
    // State
    products: state.products,
    filteredProducts: state.filteredProducts,
    currentProduct: state.currentProduct,
    isLoading: state.isLoading,
    error: state.error,
    totalCount: state.totalCount,
    currentPage: state.currentPage,
    totalPages: state.totalPages,
    filters: state.filters,
    sortBy: state.sortBy,

    // Actions
    fetchProducts,
    fetchProduct,
    fetchRelatedProducts,
    searchProducts,
    applyFilters,
    setSortBy,
    clearFilters,
    loadMore,
    clearCurrentProduct,
    clearError
  }
}
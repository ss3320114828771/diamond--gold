// components/products/product-list.tsx
'use client'

import { useState } from 'react'
import ProductCard from './product-card'

type Product = {
  id: string
  name: string
  price: number
  comparePrice?: number
  purity?: string
  weight?: number
  image: string
  images?: string[]
  category?: string
  inStock?: boolean
  featured?: boolean
  isNew?: boolean
  discount?: number
  rating?: number
  reviewCount?: number
  description?: string
}

type ProductListProps = {
  products: Product[]
  itemsPerPage?: number
  showQuickView?: boolean
  showWishlist?: boolean
  showCompare?: boolean
  onWishlistToggle?: (id: string) => void
  onCompareToggle?: (id: string) => void
  loading?: boolean
  emptyMessage?: string
  sortOptions?: boolean
  filterOptions?: boolean
}

export default function ProductList({
  products,
  itemsPerPage = 10,
  showQuickView = true,
  showWishlist = true,
  showCompare = true,
  onWishlistToggle,
  onCompareToggle,
  loading = false,
  emptyMessage = 'No products found',
  sortOptions = true,
  filterOptions = true
}: ProductListProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState('featured')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    switch(sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'name-asc':
        return a.name.localeCompare(b.name)
      case 'name-desc':
        return b.name.localeCompare(a.name)
      case 'rating':
        return (b.rating || 0) - (a.rating || 0)
      case 'newest':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
      default:
        return 0
    }
  })

  // Pagination
  const indexOfLastProduct = currentPage * itemsPerPage
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Loading skeletons
  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow animate-pulse">
            <div className="flex gap-4 p-4">
              <div className="w-32 h-32 bg-gray-200 rounded"></div>
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl shadow">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{emptyMessage}</h3>
        <p className="text-gray-600">Try adjusting your search or filter criteria</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="bg-white rounded-lg shadow p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            Showing <span className="font-bold">{indexOfFirstProduct + 1}</span> -{' '}
            <span className="font-bold">
              {Math.min(indexOfLastProduct, products.length)}
            </span>{' '}
            of <span className="font-bold">{products.length}</span> products
          </span>
          
          {/* View Mode Toggle */}
          <div className="flex border rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 transition ${
                viewMode === 'grid' 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3h2v2H5V3zm0 4h2v2H5V7zm0 4h2v2H5v-2zm4-8h2v2H9V3zm0 4h2v2H9V7zm0 4h2v2H9v-2zm4-8h2v2h-2V3zm0 4h2v2h-2V7zm0 4h2v2h-2v-2z"/>
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 transition ${
                viewMode === 'list' 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4h14v2H3V4zm0 5h14v2H3V9zm0 5h14v2H3v-2z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Sort Options */}
        {sortOptions && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-yellow-500"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
              <option value="rating">Top Rated</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        )}
      </div>

      {/* Products List */}
      <div className="space-y-4">
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            layout={viewMode}
            showQuickView={showQuickView}
            showWishlist={showWishlist}
            showCompare={showCompare}
            onWishlistToggle={onWishlistToggle}
            onCompareToggle={onCompareToggle}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, index) => {
              const page = index + 1
              // Show current page, first, last, and pages around current
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 2 && page <= currentPage + 2)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-lg font-medium transition ${
                      currentPage === page
                        ? 'bg-yellow-500 text-white'
                        : 'border border-gray-300 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                )
              }
              // Show ellipsis
              if (page === currentPage - 3 || page === currentPage + 3) {
                return <span key={page} className="text-gray-400">...</span>
              }
              return null
            })}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

      {/* Items per page info */}
      <div className="text-center text-sm text-gray-500">
        Showing {Math.min(itemsPerPage, products.length)} items per page
      </div>
    </div>
  )
}
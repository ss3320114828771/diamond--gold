// components/products/product-grid.tsx
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

type ProductGridProps = {
  products: Product[]
  columns?: 2 | 3 | 4 | 5 | 6
  gap?: 'sm' | 'md' | 'lg'
  layout?: 'grid' | 'list'
  showQuickView?: boolean
  showWishlist?: boolean
  showCompare?: boolean
  onWishlistToggle?: (id: string) => void
  onCompareToggle?: (id: string) => void
  loading?: boolean
  emptyMessage?: string
}

export default function ProductGrid({
  products,
  columns = 4,
  gap = 'md',
  layout = 'grid',
  showQuickView = true,
  showWishlist = true,
  showCompare = true,
  onWishlistToggle,
  onCompareToggle,
  loading = false,
  emptyMessage = 'No products found'
}: ProductGridProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 12

  // Gap classes
  const gapClasses = {
    sm: 'gap-3',
    md: 'gap-6',
    lg: 'gap-8'
  }

  // Grid columns classes
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
    6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'
  }

  // List layout classes
  const listClasses = 'grid-cols-1 gap-4'

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(products.length / productsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Loading skeletons
  if (loading) {
    return (
      <div className={`grid ${layout === 'grid' ? gridCols[columns] : listClasses} ${gapClasses[gap]}`}>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-white rounded-xl overflow-hidden shadow animate-pulse">
            <div className="h-64 bg-gray-200"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
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
    <div className="space-y-8">
      {/* Product Count */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <p>
          Showing <span className="font-bold">{indexOfFirstProduct + 1}</span> -{' '}
          <span className="font-bold">
            {Math.min(indexOfLastProduct, products.length)}
          </span>{' '}
          of <span className="font-bold">{products.length}</span> products
        </p>
        
        {/* Layout Toggle (optional - you can add this) */}
        {/* <div className="flex gap-2">
          <button className="p-2 border rounded">Grid</button>
          <button className="p-2 border rounded">List</button>
        </div> */}
      </div>

      {/* Products Grid */}
      <div className={`grid ${layout === 'grid' ? gridCols[columns] : listClasses} ${gapClasses[gap]}`}>
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            layout={layout}
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
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ‹
          </button>
          
          {Array.from({ length: totalPages }).map((_, index) => {
            const page = index + 1
            // Show current page, first, last, and pages around current
            if (
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
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
            if (page === currentPage - 2 || page === currentPage + 2) {
              return <span key={page} className="text-gray-400">...</span>
            }
            return null
          })}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ›
          </button>
        </div>
      )}
    </div>
  )
}
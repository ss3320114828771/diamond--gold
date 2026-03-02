// components/products/related-products.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type RelatedProduct = {
  id: string
  name: string
  price: number
  image: string
  purity?: string
  weight?: number
  category?: string
  inStock?: boolean
}

type RelatedProductsProps = {
  products: RelatedProduct[]
  title?: string
  viewAllLink?: string
  maxItems?: number
  columns?: 3 | 4 | 5
  showViewAll?: boolean
}

export default function RelatedProducts({
  products,
  title = 'You May Also Like',
  viewAllLink = '/products',
  maxItems = 4,
  columns = 4,
  showViewAll = true
}: RelatedProductsProps) {
  const [wishlist, setWishlist] = useState<string[]>([])

  const displayProducts = products.slice(0, maxItems)

  const toggleWishlist = (id: string) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  // Grid columns based on props
  const gridCols = {
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5'
  }

  if (products.length === 0) {
    return null
  }

  return (
    <section className="py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            {title}
          </h2>
          {showViewAll && (
            <Link
              href={viewAllLink}
              className="text-yellow-600 hover:text-yellow-700 font-medium flex items-center gap-1 group"
            >
              <span>View All</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>

        {/* Products Grid */}
        <div className={`grid ${gridCols[columns]} gap-6`}>
          {displayProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Image Container */}
              <Link href={`/products/${product.id}`} className="block relative h-48 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Out of Stock Badge */}
                {!product.inStock && (
                  <div className="absolute top-2 left-2 bg-gray-800 text-white px-2 py-1 rounded-full text-xs font-bold">
                    Out of Stock
                  </div>
                )}

                {/* Quick View Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-black/70 text-white py-2 text-center text-sm font-medium transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  Quick View
                </div>
              </Link>

              {/* Product Info */}
              <div className="p-4">
                {/* Category */}
                {product.category && (
                  <p className="text-xs text-yellow-600 mb-1">{product.category}</p>
                )}

                {/* Title */}
                <Link href={`/products/${product.id}`}>
                  <h3 className="text-lg font-bold text-gray-800 hover:text-yellow-600 transition mb-2 line-clamp-1">
                    {product.name}
                  </h3>
                </Link>

                {/* Specifications */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {product.purity && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                      {product.purity}
                    </span>
                  )}
                  {product.weight && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                      {product.weight}g
                    </span>
                  )}
                </div>

                {/* Price and Actions */}
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>

                  <div className="flex items-center gap-2">
                    {/* Add to Cart Button */}
                    <button
                      disabled={!product.inStock}
                      className="w-8 h-8 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="w-8 h-8 bg-gray-100 rounded-full hover:bg-gray-200 transition flex items-center justify-center"
                    >
                      <svg
                        className={`w-4 h-4 ${
                          wishlist.includes(product.id) ? 'text-red-500 fill-current' : 'text-gray-400'
                        }`}
                        fill={wishlist.includes(product.id) ? 'currentColor' : 'none'}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All (if not shown in header) */}
        {!showViewAll && (
          <div className="text-center mt-8 md:hidden">
            <Link
              href={viewAllLink}
              className="inline-block px-6 py-3 border-2 border-yellow-500 text-yellow-600 rounded-lg font-bold hover:bg-yellow-50 transition"
            >
              View All Products
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
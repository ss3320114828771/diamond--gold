// components/products/product-card.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

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
  description?: string  // Add this line to fix the error
}

type ProductCardProps = {
  product: Product
  layout?: 'grid' | 'list'
  showQuickView?: boolean
  showWishlist?: boolean
  showCompare?: boolean
  onWishlistToggle?: (id: string) => void
  onCompareToggle?: (id: string) => void
}

export default function ProductCard({
  product,
  layout = 'grid',
  showQuickView = true,
  showWishlist = true,
  showCompare = true,
  onWishlistToggle,
  onCompareToggle
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isComparing, setIsComparing] = useState(false)
  const [showQuickViewModal, setShowQuickViewModal] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted)
    onWishlistToggle?.(product.id)
  }

  const handleCompareToggle = () => {
    setIsComparing(!isComparing)
    onCompareToggle?.(product.id)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const discountedPrice = product.discount 
    ? product.price - (product.price * product.discount / 100)
    : product.price

  const renderStars = (rating: number = 0) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  if (layout === 'list') {
    return (
      <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group">
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="relative md:w-64 h-64 overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.discount && (
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  -{product.discount}%
                </span>
              )}
              {product.isNew && (
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  New
                </span>
              )}
              {!product.inStock && (
                <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            {showWishlist && (
              <button
                onClick={handleWishlistToggle}
                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
              >
                <svg
                  className={`w-5 h-5 ${
                    isWishlisted ? 'text-red-500 fill-current' : 'text-gray-400'
                  }`}
                  fill={isWishlisted ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            )}
          </div>

          {/* Content Section */}
          <div className="flex-1 p-6">
            <div className="flex flex-col h-full">
              {/* Title and Category */}
              <div>
                {product.category && (
                  <p className="text-sm text-yellow-600 mb-2">{product.category}</p>
                )}
                <Link href={`/products/${product.id}`}>
                  <h3 className="text-xl font-bold text-gray-800 hover:text-yellow-600 transition mb-2">
                    {product.name}
                  </h3>
                </Link>
              </div>

              {/* Specifications */}
              <div className="flex flex-wrap gap-2 mb-4">
                {product.purity && (
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                    {product.purity}
                  </span>
                )}
                {product.weight && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {product.weight}g
                  </span>
                )}
              </div>

              {/* Description (placeholder) - Now fixed with optional chaining */}
              <p className="text-gray-600 mb-4 line-clamp-2">
                {product.description || 'Beautiful handcrafted jewelry piece perfect for any occasion.'}
              </p>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">{renderStars(product.rating)}</div>
                  <span className="text-sm text-gray-500">({product.reviewCount})</span>
                </div>
              )}

              {/* Price and Actions */}
              <div className="flex items-center justify-between mt-auto">
                <div>
                  {product.discount ? (
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">
                        {formatPrice(discountedPrice)}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-2xl font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>

                <button
                  disabled={!product.inStock}
                  className="px-6 py-2 bg-yellow-500 text-white rounded-lg font-bold hover:bg-yellow-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Grid Layout
  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.discount && (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              -{product.discount}%
            </span>
          )}
          {product.isNew && (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              New
            </span>
          )}
          {!product.inStock && (
            <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-bold">
              Out of Stock
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {showWishlist && (
            <button
              onClick={handleWishlistToggle}
              className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
            >
              <svg
                className={`w-5 h-5 ${
                  isWishlisted ? 'text-red-500 fill-current' : 'text-gray-400'
                }`}
                fill={isWishlisted ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          )}

          {showCompare && (
            <button
              onClick={handleCompareToggle}
              className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
            >
              <svg
                className={`w-5 h-5 ${isComparing ? 'text-yellow-500' : 'text-gray-400'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </button>
          )}
        </div>

        {/* Quick View Overlay */}
        {showQuickView && (
          <button
            onClick={() => setShowQuickViewModal(true)}
            className="absolute inset-x-0 bottom-0 bg-black/70 text-white py-3 text-center font-medium transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
          >
            Quick View
          </button>
        )}
      </div>

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

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-2 mb-2">
            <div className="flex">{renderStars(product.rating)}</div>
            <span className="text-xs text-gray-500">({product.reviewCount})</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            {product.discount ? (
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-900">
                  {formatPrice(discountedPrice)}
                </span>
                <span className="text-xs text-gray-400 line-through">
                  {formatPrice(product.price)}
                </span>
              </div>
            ) : (
              <span className="text-xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            disabled={!product.inStock}
            className="w-10 h-10 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Quick View Modal (simplified) */}
      {showQuickViewModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <button
                onClick={() => setShowQuickViewModal(false)}
                className="float-right text-2xl hover:text-yellow-600"
              >
                ×
              </button>
              <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
              {/* Quick view details would go here */}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
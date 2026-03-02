// components/home/featured-products.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type Product = {
  id: string
  name: string
  price: number
  purity: string
  weight: number
  image: string
  category?: string
  inStock?: boolean
  discount?: number
}

type FeaturedProductsProps = {
  title?: string
  subtitle?: string
  products?: Product[]
  showViewAll?: boolean
  viewAllLink?: string
  columns?: 3 | 4
}

export default function FeaturedProducts({
  title = 'Featured Products',
  subtitle = 'Discover our most popular jewelry pieces',
  products,
  showViewAll = true,
  viewAllLink = '/products',
  columns = 4
}: FeaturedProductsProps) {
  const [wishlist, setWishlist] = useState<string[]>([])

  // Default featured products
  const defaultProducts: Product[] = [
    {
      id: '1',
      name: '24K Gold Kundan Necklace',
      price: 12999,
      purity: '24K',
      weight: 45.5,
      image: '/images/n1.jpeg',
      category: 'Necklaces',
      inStock: true
    },
    {
      id: '2',
      name: '22K Gold Jhumka Earrings',
      price: 3499,
      purity: '22K',
      weight: 12.8,
      image: '/images/n2.jpeg',
      category: 'Earrings',
      inStock: true,
      discount: 10
    },
    {
      id: '3',
      name: '18K Gold Diamond Ring',
      price: 5999,
      purity: '18K',
      weight: 8.5,
      image: '/images/n3.jpeg',
      category: 'Rings',
      inStock: true
    },
    {
      id: '4',
      name: '24K Gold Bangles Set',
      price: 8999,
      purity: '24K',
      weight: 32.0,
      image: '/images/n4.jpeg',
      category: 'Bangles',
      inStock: true,
      discount: 15
    },
    {
      id: '5',
      name: '22K Gold Chain for Men',
      price: 4999,
      purity: '22K',
      weight: 18.5,
      image: '/images/n5.jpeg',
      category: 'Chains',
      inStock: false
    },
    {
      id: '6',
      name: '18K Gold Pendant Set',
      price: 4499,
      purity: '18K',
      weight: 15.2,
      image: '/images/n6.jpeg',
      category: 'Pendants',
      inStock: true
    },
    {
      id: '7',
      name: 'Gold Nose Pin',
      price: 899,
      purity: '22K',
      weight: 2.5,
      image: '/images/n1.jpeg',
      category: 'Nose Pins',
      inStock: true
    },
    {
      id: '8',
      name: 'Diamond Engagement Ring',
      price: 15999,
      purity: '18K',
      weight: 6.5,
      image: '/images/n2.jpeg',
      category: 'Rings',
      inStock: true,
      discount: 5
    }
  ]

  const displayProducts = products || defaultProducts
  const displayCount = columns === 4 ? 8 : 6
  const featuredProducts = displayProducts.slice(0, displayCount)

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

  const discountedPrice = (price: number, discount: number = 0) => {
    return discount > 0 ? price - (price * discount / 100) : price
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Products Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns} gap-6`}>
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative"
            >
              {/* Discount Badge */}
              {product.discount && product.discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
                  -{product.discount}%
                </div>
              )}

              {/* Out of Stock Badge */}
              {!product.inStock && (
                <div className="absolute top-4 left-4 bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
                  Out of Stock
                </div>
              )}

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center z-10 hover:scale-110 transition-transform"
              >
                <svg
                  className={`w-5 h-5 ${
                    wishlist.includes(product.id) ? 'text-red-500 fill-current' : 'text-gray-400'
                  }`}
                  fill={wishlist.includes(product.id) ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>

              {/* Product Image */}
              <Link href={`/products/${product.id}`} className="block relative h-64 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Quick View Overlay */}
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-white text-gray-900 px-6 py-3 rounded-full font-bold transform -translate-y-4 group-hover:translate-y-0 transition-transform">
                    Quick View
                  </span>
                </div>
              </Link>

              {/* Product Info */}
              <div className="p-4">
                <Link href={`/products/${product.id}`}>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 hover:text-yellow-600 transition line-clamp-1">
                    {product.name}
                  </h3>
                </Link>

                {/* Category & Purity */}
                <div className="flex items-center gap-2 mb-3">
                  {product.category && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {product.category}
                    </span>
                  )}
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                    {product.purity}
                  </span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {product.weight}g
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div>
                    {product.discount ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-gray-900">
                          {formatPrice(discountedPrice(product.price, product.discount))}
                        </span>
                        <span className="text-sm text-gray-400 line-through">
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
                    className="w-10 h-10 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        {showViewAll && (
          <div className="text-center mt-12">
            <Link
              href={viewAllLink}
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-yellow-500 text-yellow-600 rounded-full font-bold hover:bg-yellow-500 hover:text-white transition transform hover:scale-105"
            >
              <span>View All Products</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
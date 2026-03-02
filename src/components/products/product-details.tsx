// components/products/product-details.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type Product = {
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
  specifications?: Record<string, string>
}

type ProductDetailsProps = {
  product: Product
  onAddToCart?: (product: Product, quantity: number) => void
  onAddToWishlist?: (productId: string) => void
}

export default function ProductDetails({ 
  product, 
  onAddToCart,
  onAddToWishlist 
}: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description')
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    onAddToCart?.(product, quantity)
  }

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted)
    onAddToWishlist?.(product.id)
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
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left Column - Images */}
        <div>
          {/* Main Image */}
          <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-4 shadow-lg">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              priority
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
            <button
              onClick={handleWishlistToggle}
              className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
            >
              <svg
                className={`w-6 h-6 ${
                  isWishlisted ? 'text-red-500 fill-current' : 'text-gray-400'
                }`}
                fill={isWishlisted ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-5 gap-4">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition ${
                  selectedImage === index 
                    ? 'border-yellow-500' 
                    : 'border-transparent hover:border-yellow-300'
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.name} - View ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column - Details */}
        <div>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-yellow-600">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-yellow-600">Products</Link>
            {product.category && (
              <>
                <span>/</span>
                <Link href={`/categories/${product.category.toLowerCase()}`} className="hover:text-yellow-600">
                  {product.category}
                </Link>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {product.name}
          </h1>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-4 mb-4">
              <div className="flex gap-1">{renderStars(product.rating)}</div>
              <span className="text-sm text-gray-500">
                {product.reviewCount} reviews
              </span>
            </div>
          )}

          {/* Price */}
          <div className="mb-6">
            {product.discount ? (
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-gray-900">
                  {formatPrice(discountedPrice)}
                </span>
                <span className="text-xl text-gray-400 line-through">
                  {formatPrice(product.price)}
                </span>
                <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-bold">
                  Save {product.discount}%
                </span>
              </div>
            ) : (
              <span className="text-4xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Short Description */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            {product.description}
          </p>

          {/* Specifications Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
            {product.purity && (
              <div>
                <p className="text-sm text-gray-500">Purity</p>
                <p className="font-bold text-gray-800">{product.purity}</p>
              </div>
            )}
            {product.weight && (
              <div>
                <p className="text-sm text-gray-500">Weight</p>
                <p className="font-bold text-gray-800">{product.weight}g</p>
              </div>
            )}
            {product.sku && (
              <div>
                <p className="text-sm text-gray-500">SKU</p>
                <p className="font-bold text-gray-800">{product.sku}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-500">Availability</p>
              <p className={`font-bold ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </p>
            </div>
          </div>

          {/* Quantity Selector */}
          {product.inStock && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="w-12 h-12 bg-gray-100 rounded-lg text-xl font-bold hover:bg-gray-200 transition"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  min="1"
                  max="10"
                  className="w-20 h-12 text-center border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
                />
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="w-12 h-12 bg-gray-100 rounded-lg text-xl font-bold hover:bg-gray-200 transition"
                >
                  +
                </button>
                <span className="text-sm text-gray-500 ml-2">Max: 10</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1 py-4 bg-yellow-500 text-white rounded-xl font-bold text-lg hover:bg-yellow-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
            <button className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:border-yellow-500 hover:text-yellow-600 transition">
              Buy Now
            </button>
          </div>

          {/* Shipping Info */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Free Shipping</h4>
                <p className="text-sm text-gray-600">On orders over $5,000. Estimated delivery: 3-5 business days.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-gray-800">30-Day Returns</h4>
                <p className="text-sm text-gray-600">Not satisfied? Return within 30 days for a full refund.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-16">
        {/* Tab Headers */}
        <div className="border-b border-gray-200">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-4 font-bold text-lg transition ${
                activeTab === 'description'
                  ? 'text-yellow-600 border-b-2 border-yellow-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('specifications')}
              className={`pb-4 font-bold text-lg transition ${
                activeTab === 'specifications'
                  ? 'text-yellow-600 border-b-2 border-yellow-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 font-bold text-lg transition ${
                activeTab === 'reviews'
                  ? 'text-yellow-600 border-b-2 border-yellow-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Reviews ({product.reviewCount || 0})
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="py-8">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                This exquisite piece is handcrafted by skilled artisans using traditional techniques passed down through generations. 
                Each detail is carefully crafted to ensure the highest quality and beauty. The gold used is certified and hallmarked 
                for purity, ensuring you receive exactly what you pay for.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Whether you're looking for a special gift or treating yourself, this piece is sure to impress with its timeless 
                elegance and superior craftsmanship.
              </p>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4">Product Specifications</h3>
                <table className="w-full">
                  <tbody className="divide-y divide-gray-200">
                    {product.purity && (
                      <tr>
                        <td className="py-3 text-gray-600">Gold Purity</td>
                        <td className="py-3 font-bold text-gray-800">{product.purity}</td>
                      </tr>
                    )}
                    {product.weight && (
                      <tr>
                        <td className="py-3 text-gray-600">Weight</td>
                        <td className="py-3 font-bold text-gray-800">{product.weight} grams</td>
                      </tr>
                    )}
                    {product.sku && (
                      <tr>
                        <td className="py-3 text-gray-600">SKU</td>
                        <td className="py-3 font-bold text-gray-800">{product.sku}</td>
                      </tr>
                    )}
                    <tr>
                      <td className="py-3 text-gray-600">Category</td>
                      <td className="py-3 font-bold text-gray-800">{product.category || 'Uncategorized'}</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-gray-600">Certification</td>
                      <td className="py-3 font-bold text-gray-800">BIS Hallmarked</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-gray-600">Warranty</td>
                      <td className="py-3 font-bold text-gray-800">Lifetime against defects</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Care Instructions</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Store in a soft pouch or jewelry box</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Avoid contact with chemicals and perfumes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Clean with a soft, dry cloth</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Remove during sports or heavy work</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              {/* Average Rating */}
              <div className="flex items-center gap-8 mb-8 p-6 bg-gray-50 rounded-xl">
                <div className="text-center">
                  <span className="text-5xl font-bold text-gray-800">{product.rating || 0}</span>
                  <span className="text-gray-500">/5</span>
                  <div className="flex gap-1 mt-2">
                    {renderStars(product.rating || 0)}
                  </div>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-800">Customer Reviews</p>
                  <p className="text-gray-600">Based on {product.reviewCount || 0} reviews</p>
                </div>
              </div>

              {/* Write Review Button */}
              <button className="px-6 py-3 bg-yellow-500 text-white rounded-lg font-bold hover:bg-yellow-600 transition">
                Write a Review
              </button>

              {/* Placeholder for reviews list */}
              <p className="text-gray-500 text-center py-8">
                Reviews will appear here. Be the first to review this product!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Admin Info */}
      <div className="mt-8 bg-gray-100 py-4 text-center text-sm rounded">
        <p>Hafiz Sajid Syed | sajid.syed@gmail.com</p>
      </div>
    </div>
  )
}
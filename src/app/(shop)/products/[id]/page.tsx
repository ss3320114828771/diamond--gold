// app/(shop)/products/[id]/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'

type Product = {
  id: string
  name: string
  description: string
  price: number
  purity: string
  weight: number
  type: string
  gender: string
  occasion: string
  images: string[]
  inStock: boolean
  certification?: string
}

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string
  
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState('description')

  // Sample product data - in real app, fetch from API
  const product: Product = {
    id: productId,
    name: '24K Gold Kundan Necklace',
    description: 'Exquisite traditional Kundan necklace with intricate design, perfect for weddings and special occasions. Handcrafted by skilled artisans using pure 24K gold.',
    price: 12999,
    purity: '24K',
    weight: 45.5,
    type: 'Necklace',
    gender: 'Women',
    occasion: 'Wedding',
    images: ['/images/n1.jpeg', '/images/n2.jpeg', '/images/n3.jpeg', '/images/n4.jpeg'],
    inStock: true,
    certification: 'BIS Hallmarked'
  }

  const increaseQty = () => setQuantity(prev => prev + 1)
  const decreaseQty = () => setQuantity(prev => prev > 1 ? prev - 1 : 1)

  const handleAddToCart = () => {
    // Add to cart logic
    alert(`Added ${quantity} item(s) to cart`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Bismillah */}
      <div className="bg-gradient-to-r from-amber-700 to-yellow-700 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-2xl mb-2">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          <h1 className="text-3xl md:text-4xl font-bold">Product Details</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          href="/products" 
          className="inline-flex items-center text-gray-600 hover:text-yellow-600 mb-6"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <div>
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden mb-4 shadow-lg">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
              {!product.inStock && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                  Out of Stock
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square bg-white rounded-lg overflow-hidden border-2 transition
                    ${selectedImage === index ? 'border-yellow-500' : 'border-transparent hover:border-yellow-300'}`}
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
          <div className="space-y-6">
            {/* Title & Purity */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <div className="flex items-center gap-3">
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold">
                  {product.purity}
                </span>
                {product.certification && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    ✓ {product.certification}
                  </span>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-gray-900">${product.price.toLocaleString()}</span>
              <span className="text-gray-500">(${(product.price / product.weight).toFixed(2)}/g)</span>
            </div>

            {/* Specifications Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4 border-y border-gray-200">
              <div>
                <p className="text-sm text-gray-500">Weight</p>
                <p className="font-bold">{product.weight}g</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="font-bold">{product.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="font-bold">{product.gender}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Occasion</p>
                <p className="font-bold">{product.occasion}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Availability</p>
                <p className={`font-bold ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>
            </div>

            {/* Quantity Selector */}
            {product.inStock && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Quantity</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={decreaseQty}
                    className="w-10 h-10 bg-gray-100 rounded-lg text-xl font-bold hover:bg-gray-200 transition"
                  >
                    -
                  </button>
                  <span className="w-16 text-center font-bold text-lg">{quantity}</span>
                  <button
                    onClick={increaseQty}
                    className="w-10 h-10 bg-gray-100 rounded-lg text-xl font-bold hover:bg-gray-200 transition"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 py-4 rounded-xl font-bold text-lg transition
                  ${product.inStock 
                    ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <button className="w-14 h-14 bg-gray-100 rounded-xl text-2xl hover:bg-gray-200 transition">
                ♡
              </button>
            </div>

            {/* Shipping Info */}
            <div className="bg-blue-50 p-4 rounded-xl">
              <div className="flex items-center gap-2 text-blue-800 mb-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <span className="font-bold">Free Shipping</span>
              </div>
              <p className="text-sm text-blue-700">Free shipping on orders over $5,000 • Estimated delivery: 3-5 business days</p>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12">
          <div className="border-b border-gray-200">
            <div className="flex gap-6">
              {['description', 'details', 'shipping'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 font-bold capitalize transition
                    ${activeTab === tab 
                      ? 'text-yellow-600 border-b-2 border-yellow-500' 
                      : 'text-gray-500 hover:text-gray-700'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="py-6">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
                <p className="text-gray-700 mt-4">
                  This exquisite piece is handcrafted by skilled artisans using traditional techniques passed down through generations. 
                  Each detail is carefully crafted to ensure the highest quality and beauty.
                </p>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="grid md:grid-cols-2 gap-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span><strong>Metal:</strong> Pure {product.purity} Gold</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span><strong>Weight:</strong> {product.weight} grams</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span><strong>Length:</strong> 18 inches (adjustable)</span>
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span><strong>Clasp:</strong> Secure lobster clasp</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span><strong>Certification:</strong> {product.certification}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span><strong>Warranty:</strong> Lifetime against defects</span>
                  </li>
                </ul>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-2xl">
                    📦
                  </div>
                  <div>
                    <h4 className="font-bold">Standard Shipping</h4>
                    <p className="text-gray-600">3-5 business days - $10 or free over $5,000</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-2xl">
                    ✈️
                  </div>
                  <div>
                    <h4 className="font-bold">Express Shipping</h4>
                    <p className="text-gray-600">1-2 business days - $25</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-2xl">
                    🔄
                  </div>
                  <div>
                    <h4 className="font-bold">30-Day Returns</h4>
                    <p className="text-gray-600">Easy returns within 30 days of delivery</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Link
                key={i}
                href={`/products/${i}`}
                className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition"
              >
                <div className="aspect-square bg-gray-100 rounded-lg mb-3">
                  <Image
                    src={`/images/n${i}.jpeg`}
                    alt={`Related Product ${i}`}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <h3 className="font-bold text-gray-800">Gold Product {i}</h3>
                <p className="text-yellow-600 font-bold">$2,999</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Admin Info */}
        <div className="mt-8 bg-gray-100 py-4 text-center text-sm rounded">
          <p>Hafiz Sajid Syed | sajid.syed@gmail.com</p>
        </div>
      </div>
    </div>
  )
}
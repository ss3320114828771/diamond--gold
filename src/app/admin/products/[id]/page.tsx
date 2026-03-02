// app/admin/products/[id]/page.tsx
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
  style: string
  gender: string
  occasion: string
  stock: number
  images: string[]
  inStock: boolean
  featured: boolean
  handmade: boolean
  certification: string
  createdAt: string
  updatedAt: string
  sales: number
  revenue: number
}

export default function AdminProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  
  const [product] = useState<Product>({
    id: productId,
    name: '24K Gold Kundan Necklace',
    description: 'Exquisite traditional Kundan necklace with intricate design, perfect for weddings and special occasions. Handcrafted by skilled artisans using pure 24K gold. Features stunning kundan work and precious gemstones.',
    price: 12999,
    purity: '24K',
    weight: 45.5,
    type: 'Necklace',
    style: 'Traditional',
    gender: 'Women',
    occasion: 'Wedding',
    stock: 10,
    images: ['/images/n1.jpeg', '/images/n2.jpeg', '/images/n3.jpeg', '/images/n4.jpeg'],
    inStock: true,
    featured: true,
    handmade: true,
    certification: 'BIS Hallmarked',
    createdAt: '2024-01-15',
    updatedAt: '2024-03-10',
    sales: 45,
    revenue: 584955
  })

  const [activeImage, setActiveImage] = useState(0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Bismillah */}
      <div className="bg-gradient-to-r from-amber-700 to-yellow-700 text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-2xl mb-2">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
              <h1 className="text-3xl md:text-4xl font-bold">Product Details</h1>
              <p className="text-amber-100 mt-2">Product ID: {productId}</p>
            </div>
            
            <div className="flex gap-2">
              <Link
                href="/admin/products"
                className="px-4 py-2 bg-white/20 text-white rounded hover:bg-white/30 transition"
              >
                Back to Products
              </Link>
              <Link
                href={`/admin/products/${productId}/edit`}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
              >
                Edit Product
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500">Price</p>
            <p className="text-2xl font-bold text-gray-800">${product.price.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500">Stock</p>
            <p className={`text-2xl font-bold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500">Total Sales</p>
            <p className="text-2xl font-bold text-blue-600">{product.sales}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500">Revenue</p>
            <p className="text-2xl font-bold text-green-600">${product.revenue.toLocaleString()}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Images */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              {/* Main Image */}
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                <Image
                  src={product.images[activeImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition
                      ${activeImage === index ? 'border-yellow-500' : 'border-transparent hover:border-yellow-300'}`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Column - Product Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Basic Information</h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Product Name</p>
                  <p className="font-bold text-lg">{product.name}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Description</p>
                  <p className="text-gray-700">{product.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Created At</p>
                    <p>{new Date(product.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Updated</p>
                    <p>{new Date(product.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Specifications */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Specifications</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Purity</p>
                  <p className="font-bold">{product.purity}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Weight</p>
                  <p className="font-bold">{product.weight}g</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <p className="font-bold">{product.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Style</p>
                  <p className="font-bold">{product.style}</p>
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
                  <p className="text-sm text-gray-500">Certification</p>
                  <p className="font-bold">{product.certification}</p>
                </div>
              </div>
            </div>

            {/* Status & Options */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Status & Options</h2>
              
              <div className="flex flex-wrap gap-6">
                <div>
                  <span className="text-sm text-gray-500 block mb-1">In Stock</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.inStock ? 'Yes' : 'No'}
                  </span>
                </div>
                
                <div>
                  <span className="text-sm text-gray-500 block mb-1">Featured</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    product.featured ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {product.featured ? 'Yes' : 'No'}
                  </span>
                </div>
                
                <div>
                  <span className="text-sm text-gray-500 block mb-1">Handmade</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    product.handmade ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {product.handmade ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Actions</h2>
          
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/admin/products/${productId}/edit`}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
            >
              Edit Product
            </Link>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
              Duplicate Product
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
              Delete Product
            </button>
            <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition">
              View on Store
            </button>
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
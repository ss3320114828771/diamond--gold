// app/admin/products/[id]/edit/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'

type ProductFormData = {
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
}

export default function EditProductPage() {
  const params = useParams()
  const productId = params.id as string
  
  const [formData, setFormData] = useState<ProductFormData>({
    name: '24K Gold Kundan Necklace',
    description: 'Exquisite traditional Kundan necklace with intricate design, perfect for weddings and special occasions. Handcrafted by skilled artisans using pure 24K gold.',
    price: 12999,
    purity: '24K',
    weight: 45.5,
    type: 'Necklace',
    style: 'Traditional',
    gender: 'Women',
    occasion: 'Wedding',
    stock: 10,
    images: ['/images/n1.jpeg', '/images/n2.jpeg', '/images/n3.jpeg'],
    inStock: true,
    featured: true,
    handmade: true,
    certification: 'BIS Hallmarked'
  })

  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError('Failed to save product. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Bismillah */}
      <div className="bg-gradient-to-r from-amber-700 to-yellow-700 text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-2xl mb-2">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
              <h1 className="text-3xl md:text-4xl font-bold">Edit Product</h1>
              <p className="text-amber-100 mt-2">Product ID: {productId}</p>
            </div>
            
            <div className="flex gap-2">
              <Link
                href="/admin/products"
                className="px-4 py-2 bg-white/20 text-white rounded hover:bg-white/30 transition"
              >
                Cancel
              </Link>
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded shadow-lg z-50">
          Product updated successfully!
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="fixed top-20 right-4 bg-red-500 text-white px-6 py-3 rounded shadow-lg z-50">
          {error}
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Basic Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium mb-2">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium mb-2">Price ($) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                />
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Product Details</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Purity */}
              <div>
                <label className="block text-sm font-medium mb-2">Gold Purity</label>
                <select
                  name="purity"
                  value={formData.purity}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                >
                  <option value="24K">24K</option>
                  <option value="22K">22K</option>
                  <option value="18K">18K</option>
                  <option value="14K">14K</option>
                </select>
              </div>

              {/* Weight */}
              <div>
                <label className="block text-sm font-medium mb-2">Weight (grams)</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  step="0.1"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium mb-2">Jewelry Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                >
                  <option value="Necklace">Necklace</option>
                  <option value="Earrings">Earrings</option>
                  <option value="Ring">Ring</option>
                  <option value="Bangles">Bangles</option>
                  <option value="Chain">Chain</option>
                  <option value="Pendant">Pendant</option>
                  <option value="Nose Pin">Nose Pin</option>
                  <option value="Bracelet">Bracelet</option>
                </select>
              </div>

              {/* Style */}
              <div>
                <label className="block text-sm font-medium mb-2">Style</label>
                <select
                  name="style"
                  value={formData.style}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                >
                  <option value="Traditional">Traditional</option>
                  <option value="Contemporary">Contemporary</option>
                  <option value="Fusion">Fusion</option>
                  <option value="Antique">Antique</option>
                  <option value="Modern">Modern</option>
                </select>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Unisex">Unisex</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>

              {/* Occasion */}
              <div>
                <label className="block text-sm font-medium mb-2">Occasion</label>
                <select
                  name="occasion"
                  value={formData.occasion}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                >
                  <option value="Wedding">Wedding</option>
                  <option value="Festive">Festive</option>
                  <option value="Party">Party</option>
                  <option value="Daily Wear">Daily Wear</option>
                  <option value="Engagement">Engagement</option>
                  <option value="Birthday">Birthday</option>
                </select>
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-medium mb-2">Stock Quantity</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                />
              </div>

              {/* Certification */}
              <div>
                <label className="block text-sm font-medium mb-2">Certification</label>
                <input
                  type="text"
                  name="certification"
                  value={formData.certification}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Product Images</h2>
            
            <div className="grid grid-cols-4 gap-4 mb-4">
              {formData.images.map((img, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={img}
                      alt={`Product ${index + 1}`}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        images: prev.images.filter((_, i) => i !== index)
                      }))
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
              
              {/* Add Image Button */}
              <button
                type="button"
                className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-200 transition"
              >
                <span className="text-3xl">+</span>
              </button>
            </div>
            
            <p className="text-sm text-gray-500">Click + to add more images. Recommended size: 1000x1000px</p>
          </div>

          {/* Status & Options */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Status & Options</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* In Stock */}
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span>In Stock</span>
              </label>

              {/* Featured */}
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span>Featured Product</span>
              </label>

              {/* Handmade */}
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="handmade"
                  checked={formData.handmade}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span>Handmade</span>
              </label>
            </div>
          </div>

          {/* Submit Button (Mobile) */}
          <div className="md:hidden flex gap-4">
            <Link
              href="/admin/products"
              className="flex-1 py-3 bg-gray-100 text-gray-700 rounded font-bold text-center hover:bg-gray-200 transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-3 bg-yellow-500 text-white rounded font-bold hover:bg-yellow-600 transition disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>

        {/* Admin Info */}
        <div className="mt-8 bg-gray-100 py-4 text-center text-sm rounded">
          <p>Hafiz Sajid Syed | sajid.syed@gmail.com</p>
        </div>
      </div>
    </div>
  )
}
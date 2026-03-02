// app/admin/products/add/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type ProductFormData = {
  name: string
  description: string
  price: string
  purity: string
  weight: string
  type: string
  style: string
  gender: string
  occasion: string
  stock: string
  certification: string
  inStock: boolean
  featured: boolean
  handmade: boolean
}

export default function AddProductPage() {
  const router = useRouter()
  
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: '',
    purity: '24K',
    weight: '',
    type: 'Necklace',
    style: 'Traditional',
    gender: 'Women',
    occasion: 'Wedding',
    stock: '',
    certification: '',
    inStock: true,
    featured: false,
    handmade: false
  })

  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) newErrors.name = 'Product name is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.price) newErrors.price = 'Price is required'
    if (Number(formData.price) <= 0) newErrors.price = 'Price must be greater than 0'
    if (!formData.weight) newErrors.weight = 'Weight is required'
    if (Number(formData.weight) <= 0) newErrors.weight = 'Weight must be greater than 0'
    if (!formData.stock) newErrors.stock = 'Stock quantity is required'
    if (Number(formData.stock) < 0) newErrors.stock = 'Stock cannot be negative'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setSaving(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Success - redirect to products list
      router.push('/admin/products?success=Product added successfully')
    } catch (error) {
      alert('Failed to add product. Please try again.')
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
              <h1 className="text-3xl md:text-4xl font-bold">Add New Product</h1>
              <p className="text-amber-100 mt-2">Create a new product in your catalog</p>
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
                {saving ? 'Saving...' : 'Save Product'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Basic Information</h2>
            
            <div className="space-y-4">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., 24K Gold Kundan Necklace"
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500 ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter product description..."
                />
                {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
              </div>

              {/* Price and Stock */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Price ($) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500 ${
                      errors.price ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="0.00"
                  />
                  {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Stock Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    min="0"
                    className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500 ${
                      errors.stock ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="0"
                  />
                  {errors.stock && <p className="mt-1 text-sm text-red-500">{errors.stock}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Product Details</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {/* Purity */}
              <div>
                <label className="block text-sm font-medium mb-2">Gold Purity</label>
                <select
                  name="purity"
                  value={formData.purity}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-yellow-500"
                >
                  <option value="24K">24K (99.9%)</option>
                  <option value="22K">22K (91.6%)</option>
                  <option value="18K">18K (75%)</option>
                  <option value="14K">14K (58.5%)</option>
                </select>
              </div>

              {/* Weight */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Weight (grams) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  min="0"
                  step="0.1"
                  className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500 ${
                    errors.weight ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0.0"
                />
                {errors.weight && <p className="mt-1 text-sm text-red-500">{errors.weight}</p>}
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium mb-2">Jewelry Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-yellow-500"
                >
                  <option value="Necklace">Necklace</option>
                  <option value="Earrings">Earrings</option>
                  <option value="Ring">Ring</option>
                  <option value="Bangles">Bangles</option>
                  <option value="Chain">Chain</option>
                  <option value="Pendant">Pendant</option>
                  <option value="Nose Pin">Nose Pin</option>
                  <option value="Bracelet">Bracelet</option>
                  <option value="Anklet">Anklet</option>
                </select>
              </div>

              {/* Style */}
              <div>
                <label className="block text-sm font-medium mb-2">Style</label>
                <select
                  name="style"
                  value={formData.style}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-yellow-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-yellow-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-yellow-500"
                >
                  <option value="Wedding">Wedding</option>
                  <option value="Festive">Festive</option>
                  <option value="Party">Party</option>
                  <option value="Daily Wear">Daily Wear</option>
                  <option value="Engagement">Engagement</option>
                  <option value="Birthday">Birthday</option>
                </select>
              </div>

              {/* Certification */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Certification</label>
                <input
                  type="text"
                  name="certification"
                  value={formData.certification}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-yellow-500"
                  placeholder="e.g., BIS Hallmarked, GIA Certified"
                />
              </div>
            </div>
          </div>

          {/* Status & Options */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Status & Options</h2>
            
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleChange}
                  className="mr-3"
                />
                <span className="text-gray-700">In Stock</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="mr-3"
                />
                <span className="text-gray-700">Featured Product</span>
                <span className="ml-2 text-sm text-gray-500">(Show on homepage)</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="handmade"
                  checked={formData.handmade}
                  onChange={handleChange}
                  className="mr-3"
                />
                <span className="text-gray-700">Handmade</span>
                <span className="ml-2 text-sm text-gray-500">(Artisan crafted)</span>
              </label>
            </div>
          </div>

          {/* Image Upload Placeholder */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Product Images</h2>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="text-4xl mb-3">📸</div>
              <p className="text-gray-600 mb-2">Drag and drop images here, or click to upload</p>
              <p className="text-sm text-gray-500">Supported formats: JPEG, PNG, WebP (Max: 5MB each)</p>
              <button
                type="button"
                className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition"
              >
                Upload Images
              </button>
            </div>
            
            <p className="text-xs text-gray-400 mt-2">
              Note: Image upload functionality will be implemented with your backend
            </p>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 md:flex-none px-6 py-3 bg-yellow-500 text-white rounded-lg font-bold hover:bg-yellow-600 transition disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Product'}
            </button>
            
            <Link
              href="/admin/products"
              className="flex-1 md:flex-none px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-bold text-center hover:bg-gray-200 transition"
            >
              Cancel
            </Link>
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
// components/admin/product-form.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

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
  images: string[]
}

type ProductFormProps = {
  initialData?: Partial<ProductFormData>
  productId?: string
  isEditing?: boolean
}

export default function ProductForm({ initialData = {}, productId, isEditing = false }: ProductFormProps) {
  const router = useRouter()
  
  const [formData, setFormData] = useState<ProductFormData>({
    name: initialData.name || '',
    description: initialData.description || '',
    price: initialData.price || '',
    purity: initialData.purity || '24K',
    weight: initialData.weight || '',
    type: initialData.type || 'Necklace',
    style: initialData.style || 'Traditional',
    gender: initialData.gender || 'Women',
    occasion: initialData.occasion || 'Wedding',
    stock: initialData.stock || '',
    certification: initialData.certification || '',
    inStock: initialData.inStock ?? true,
    featured: initialData.featured ?? false,
    handmade: initialData.handmade ?? false,
    images: initialData.images || []
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  // Form options
  const purityOptions = ['24K', '22K', '18K', '14K']
  const typeOptions = ['Necklace', 'Earrings', 'Ring', 'Bangles', 'Chain', 'Pendant', 'Nose Pin', 'Bracelet', 'Anklet']
  const styleOptions = ['Traditional', 'Contemporary', 'Fusion', 'Antique', 'Modern']
  const genderOptions = ['Men', 'Women', 'Unisex', 'Kids']
  const occasionOptions = ['Wedding', 'Festive', 'Party', 'Daily Wear', 'Engagement', 'Birthday']

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
      
      // Success - redirect
      router.push('/admin/products?success=Product saved successfully')
    } catch (error) {
      alert('Failed to save product. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
        // In real app, upload to server and get URL
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, 'new-image.jpg'] // Placeholder
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  return (
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
              {purityOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
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
              {typeOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
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
              {styleOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
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
              {genderOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
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
              {occasionOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
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

      {/* Images */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Product Images</h2>
        
        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
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
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                ×
              </button>
            </div>
          ))}
          
          {/* Upload Placeholder */}
          <label className="aspect-square bg-gray-100 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition">
            <span className="text-3xl text-gray-400">+</span>
            <span className="text-xs text-gray-500 mt-1">Upload</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
        
        {/* Image Preview */}
        {imagePreview && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium mb-2">Preview:</p>
            <div className="relative w-32 h-32">
              <Image
                src={imagePreview}
                alt="Preview"
                fill
                className="object-cover rounded"
              />
            </div>
          </div>
        )}
        
        <p className="text-sm text-gray-500 mt-2">
          Click + to upload images. Recommended size: 1000x1000px
        </p>
      </div>

      {/* Status & Options */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Status & Options</h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="inStock"
              checked={formData.inStock}
              onChange={handleChange}
              className="rounded border-gray-300"
            />
            <span className="text-sm">In Stock</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="rounded border-gray-300"
            />
            <span className="text-sm">Featured Product</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="handmade"
              checked={formData.handmade}
              onChange={handleChange}
              className="rounded border-gray-300"
            />
            <span className="text-sm">Handmade</span>
          </label>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={saving}
          className="flex-1 md:flex-none px-6 py-3 bg-yellow-500 text-white rounded-lg font-bold hover:bg-yellow-600 transition disabled:opacity-50"
        >
          {saving ? 'Saving...' : isEditing ? 'Update Product' : 'Create Product'}
        </button>
        
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 md:flex-none px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
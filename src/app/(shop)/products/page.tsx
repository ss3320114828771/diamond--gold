// app/(shop)/products/page.tsx
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
  type: string
  gender: string
  image: string
  inStock: boolean
  featured: boolean
}

export default function ProductsPage() {
  const [filters, setFilters] = useState({
    category: 'all',
    purity: 'all',
    gender: 'all',
    priceRange: 'all'
  })
  
  const [sortBy, setSortBy] = useState('featured')
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)

  // Sample products data
  const products: Product[] = [
    {
      id: '1',
      name: '24K Gold Kundan Necklace',
      price: 12999,
      purity: '24K',
      weight: 45.5,
      type: 'Necklace',
      gender: 'Women',
      image: '/images/n1.jpeg',
      inStock: true,
      featured: true
    },
    {
      id: '2',
      name: '22K Gold Jhumka Earrings',
      price: 3499,
      purity: '22K',
      weight: 12.8,
      type: 'Earrings',
      gender: 'Women',
      image: '/images/n2.jpeg',
      inStock: true,
      featured: true
    },
    {
      id: '3',
      name: '18K Gold Diamond Ring',
      price: 5999,
      purity: '18K',
      weight: 8.5,
      type: 'Ring',
      gender: 'Unisex',
      image: '/images/n3.jpeg',
      inStock: true,
      featured: false
    },
    {
      id: '4',
      name: '24K Gold Bangles Set',
      price: 8999,
      purity: '24K',
      weight: 32.0,
      type: 'Bangles',
      gender: 'Women',
      image: '/images/n4.jpeg',
      inStock: true,
      featured: true
    },
    {
      id: '5',
      name: '22K Gold Chain for Men',
      price: 4999,
      purity: '22K',
      weight: 18.5,
      type: 'Chain',
      gender: 'Men',
      image: '/images/n5.jpeg',
      inStock: false,
      featured: false
    },
    {
      id: '6',
      name: '18K Gold Pendant Set',
      price: 4499,
      purity: '18K',
      weight: 15.2,
      type: 'Pendant',
      gender: 'Women',
      image: '/images/n6.jpeg',
      inStock: true,
      featured: true
    },
    {
      id: '7',
      name: '24K Gold Nose Pin',
      price: 899,
      purity: '24K',
      weight: 2.5,
      type: 'Nose Pin',
      gender: 'Women',
      image: '/images/n1.jpeg',
      inStock: true,
      featured: false
    },
    {
      id: '8',
      name: '22K Gold Bracelet',
      price: 2799,
      purity: '22K',
      weight: 10.2,
      type: 'Bracelet',
      gender: 'Women',
      image: '/images/n2.jpeg',
      inStock: true,
      featured: false
    }
  ]

  // Filter options
  const categories = ['all', 'Necklace', 'Earrings', 'Ring', 'Bangles', 'Chain', 'Pendant']
  const purities = ['all', '24K', '22K', '18K']
  const genders = ['all', 'Men', 'Women', 'Unisex']
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-1000', label: 'Under $1,000' },
    { value: '1000-5000', label: '$1,000 - $5,000' },
    { value: '5000-10000', label: '$5,000 - $10,000' },
    { value: '10000+', label: '$10,000+' }
  ]

  // Filter products
  const filteredProducts = products
    .filter(p => filters.category === 'all' || p.type === filters.category)
    .filter(p => filters.purity === 'all' || p.purity === filters.purity)
    .filter(p => filters.gender === 'all' || p.gender === filters.gender)
    .filter(p => {
      if (filters.priceRange === 'all') return true
      const [min, max] = filters.priceRange === '10000+' 
        ? [10000, Infinity] 
        : filters.priceRange.split('-').map(Number)
      return p.price >= min && p.price <= max
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'price-low': return a.price - b.price
        case 'price-high': return b.price - a.price
        case 'name-asc': return a.name.localeCompare(b.name)
        case 'name-desc': return b.name.localeCompare(a.name)
        default: return a.featured === b.featured ? 0 : a.featured ? -1 : 1
      }
    })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Bismillah */}
      <div className="bg-gradient-to-r from-amber-700 to-yellow-700 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-2xl mb-2">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          <h1 className="text-3xl md:text-4xl font-bold">Our Products</h1>
          <p className="text-amber-100 mt-2">Discover our collection of gold and diamond jewelry</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Mobile Filter Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden w-full mb-4 py-3 bg-yellow-500 text-white rounded-lg font-bold flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h3 className="text-xl font-bold mb-4">Filters</h3>

              {/* Category Filter */}
              <div className="mb-4">
                <label className="block font-medium mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
                  ))}
                </select>
              </div>

              {/* Purity Filter */}
              <div className="mb-4">
                <label className="block font-medium mb-2">Gold Purity</label>
                <select
                  value={filters.purity}
                  onChange={(e) => setFilters({...filters, purity: e.target.value})}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                >
                  {purities.map(p => (
                    <option key={p} value={p}>{p === 'all' ? 'All Purities' : p}</option>
                  ))}
                </select>
              </div>

              {/* Gender Filter */}
              <div className="mb-4">
                <label className="block font-medium mb-2">For</label>
                <select
                  value={filters.gender}
                  onChange={(e) => setFilters({...filters, gender: e.target.value})}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                >
                  {genders.map(g => (
                    <option key={g} value={g}>{g === 'all' ? 'All' : g}</option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-4">
                <label className="block font-medium mb-2">Price Range</label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                >
                  {priceRanges.map(range => (
                    <option key={range.value} value={range.value}>{range.label}</option>
                  ))}
                </select>
              </div>

              {/* Reset Button */}
              <button
                onClick={() => setFilters({
                  category: 'all',
                  purity: 'all',
                  gender: 'all',
                  priceRange: 'all'
                })}
                className="w-full mt-2 py-2 bg-gray-100 text-gray-700 rounded font-medium hover:bg-gray-200 transition"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-gray-600">{filteredProducts.length} Products</span>
                <div className="flex border rounded overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-yellow-500 text-white' : 'hover:bg-gray-100'}`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 3h2v2H5V3zm0 4h2v2H5V7zm0 4h2v2H5v-2zm4-8h2v2H9V3zm0 4h2v2H9V7zm0 4h2v2H9v-2zm4-8h2v2h-2V3zm0 4h2v2h-2V7zm0 4h2v2h-2v-2z"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-yellow-500 text-white' : 'hover:bg-gray-100'}`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4h14v2H3V4zm0 5h14v2H3V9zm0 5h14v2H3v-2z"/>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
              </div>
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-xl text-gray-600 mb-4">No products match your filters</p>
                <button
                  onClick={() => setFilters({
                    category: 'all',
                    purity: 'all',
                    gender: 'all',
                    priceRange: 'all'
                  })}
                  className="px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'} gap-6`}>
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className={`bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition group
                      ${viewMode === 'list' ? 'flex' : ''}`}
                  >
                    {/* Image */}
                    <div className={`relative ${viewMode === 'list' ? 'w-32 h-32' : 'h-48'} overflow-hidden`}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-300"
                      />
                      {product.featured && (
                        <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                          Featured
                        </div>
                      )}
                      {!product.inStock && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                          Out of Stock
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <h3 className="font-bold text-gray-800 mb-1 group-hover:text-yellow-600 transition">
                        {product.name}
                      </h3>
                      
                      <div className="flex flex-wrap gap-1 mb-2">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">{product.purity}</span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">{product.weight}g</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-gray-900">
                          ${product.price.toLocaleString()}
                        </span>
                        <button 
                          onClick={(e) => e.preventDefault()}
                          className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Load More */}
            {filteredProducts.length > 0 && filteredProducts.length < products.length && (
              <div className="text-center mt-8">
                <button className="px-6 py-3 bg-yellow-500 text-white rounded-lg font-bold hover:bg-yellow-600 transition">
                  Load More Products
                </button>
              </div>
            )}
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
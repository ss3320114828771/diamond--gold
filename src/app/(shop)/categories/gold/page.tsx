// app/(shop)/categories/gold/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Simple type for product
type GoldProduct = {
  id: string
  name: string
  price: number
  purity: string
  weight: number
  type: string
  gender: string
  image: string
  inStock: boolean
}

export default function GoldPage() {
  // Simple state
  const [filters, setFilters] = useState({
    purity: 'all',
    type: 'all'
  })
  
  const [sortBy, setSortBy] = useState('featured')
  const [viewMode, setViewMode] = useState('grid')

  // Simple product data
  const products: GoldProduct[] = [
    {
      id: '1',
      name: '24K Gold Necklace',
      price: 12999,
      purity: '24K',
      weight: 45.5,
      type: 'Necklace',
      gender: 'Women',
      image: '/images/n1.jpeg',
      inStock: true
    },
    {
      id: '2',
      name: '22K Gold Earrings',
      price: 3499,
      purity: '22K',
      weight: 12.8,
      type: 'Earrings',
      gender: 'Women',
      image: '/images/n2.jpeg',
      inStock: true
    },
    {
      id: '3',
      name: '18K Gold Ring',
      price: 5999,
      purity: '18K',
      weight: 8.5,
      type: 'Ring',
      gender: 'Unisex',
      image: '/images/n3.jpeg',
      inStock: true
    },
    {
      id: '4',
      name: '24K Gold Bangles',
      price: 8999,
      purity: '24K',
      weight: 32.0,
      type: 'Bangles',
      gender: 'Women',
      image: '/images/n4.jpeg',
      inStock: true
    },
    {
      id: '5',
      name: '22K Gold Chain',
      price: 4999,
      purity: '22K',
      weight: 18.5,
      type: 'Chain',
      gender: 'Men',
      image: '/images/n5.jpeg',
      inStock: false
    },
    {
      id: '6',
      name: '18K Gold Pendant',
      price: 4499,
      purity: '18K',
      weight: 15.2,
      type: 'Pendant',
      gender: 'Women',
      image: '/images/n6.jpeg',
      inStock: true
    }
  ]

  // Filter options
  const purityTypes = ['all', '24K', '22K', '18K']
  const jewelryTypes = ['all', 'Necklace', 'Earrings', 'Ring', 'Bangles', 'Chain', 'Pendant']

  // Filter products
  const filteredProducts = products
    .filter(p => filters.purity === 'all' || p.purity === filters.purity)
    .filter(p => filters.type === 'all' || p.type.toLowerCase() === filters.type)
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      return 0
    })

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Simple Hero */}
      <div className="relative h-64 bg-gradient-to-r from-amber-800 to-yellow-800">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div>
            <p className="text-2xl mb-2">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
            <h1 className="text-4xl md:text-5xl font-bold">Gold Collection</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Simple Filters */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow flex flex-wrap gap-4">
          <select 
            value={filters.purity}
            onChange={(e) => setFilters({...filters, purity: e.target.value})}
            className="px-3 py-2 border rounded"
          >
            {purityTypes.map(t => (
              <option key={t} value={t}>{t === 'all' ? 'All Purity' : t}</option>
            ))}
          </select>

          <select 
            value={filters.type}
            onChange={(e) => setFilters({...filters, type: e.target.value})}
            className="px-3 py-2 border rounded"
          >
            {jewelryTypes.map(t => (
              <option key={t} value={t}>{t === 'all' ? 'All Types' : t}</option>
            ))}
          </select>

          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border rounded"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>

          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="px-3 py-2 bg-gray-100 rounded"
          >
            {viewMode === 'grid' ? 'Grid View' : 'List View'}
          </button>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded">
            <p>No products found</p>
          </div>
        ) : (
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1'} gap-6`}>
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className={`bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                {/* Image */}
                <div className={`relative ${viewMode === 'list' ? 'w-32 h-32' : 'h-48'}`}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  {!product.inStock && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      Out of Stock
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-4 flex-1">
                  <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                  
                  <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-3">
                    <span className="bg-yellow-100 px-2 py-1 rounded">{product.purity}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">{product.weight}g</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">{product.gender}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">${product.price.toLocaleString()}</span>
                    
                    <button 
                      onClick={(e) => e.preventDefault()}
                      className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Simple Admin Info */}
      <div className="bg-gray-100 py-4 text-center text-sm">
        <p>Hafiz Sajid Syed | sajid.syed@gmail.com</p>
      </div>
    </div>
  )
}
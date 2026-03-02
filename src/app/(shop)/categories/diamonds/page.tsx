// app/(shop)/categories/diamonds/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface DiamondProduct {
  id: string
  name: string
  description: string
  price: number
  carat: number
  cut: string
  color: string
  clarity: string
  shape: string
  certification: string
  image: string
  inStock: boolean
  featured: boolean
}

export default function DiamondsPage() {
  const [filters, setFilters] = useState({
    priceRange: 'all',
    carat: 'all',
    cut: 'all',
    color: 'all',
    clarity: 'all',
    shape: 'all'
  })
  
  const [sortBy, setSortBy] = useState('featured')
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)

  // Sample diamond products
  const diamonds: DiamondProduct[] = [
    {
      id: '1',
      name: 'Royal Brilliant Cut Diamond',
      description: 'Exquisite brilliant cut diamond with exceptional sparkle',
      price: 12999,
      carat: 2.5,
      cut: 'Brilliant',
      color: 'D',
      clarity: 'IF',
      shape: 'Round',
      certification: 'GIA',
      image: '/images/n1.jpeg',
      inStock: true,
      featured: true
    },
    {
      id: '2',
      name: 'Princess Cut Solitaire',
      description: 'Stunning princess cut diamond perfect for engagement rings',
      price: 8999,
      carat: 1.8,
      cut: 'Princess',
      color: 'E',
      clarity: 'VVS1',
      shape: 'Square',
      certification: 'IGI',
      image: '/images/n2.jpeg',
      inStock: true,
      featured: true
    },
    {
      id: '3',
      name: 'Emerald Cut Diamond',
      description: 'Elegant emerald cut with step-cut facets',
      price: 15999,
      carat: 3.0,
      cut: 'Emerald',
      color: 'F',
      clarity: 'VVS2',
      shape: 'Rectangle',
      certification: 'GIA',
      image: '/images/n3.jpeg',
      inStock: true,
      featured: false
    },
    {
      id: '4',
      name: 'Cushion Cut Diamond',
      description: 'Romantic cushion cut with soft rounded corners',
      price: 7499,
      carat: 1.5,
      cut: 'Cushion',
      color: 'G',
      clarity: 'VS1',
      shape: 'Cushion',
      certification: 'IGI',
      image: '/images/n4.jpeg',
      inStock: true,
      featured: true
    },
    {
      id: '5',
      name: 'Pear Shaped Diamond',
      description: 'Unique pear shape combining round and marquise',
      price: 10999,
      carat: 2.2,
      cut: 'Pear',
      color: 'H',
      clarity: 'VS2',
      shape: 'Pear',
      certification: 'GIA',
      image: '/images/n5.jpeg',
      inStock: false,
      featured: false
    },
    {
      id: '6',
      name: 'Oval Cut Diamond',
      description: 'Elegant oval cut with brilliant facets',
      price: 9499,
      carat: 2.0,
      cut: 'Oval',
      color: 'I',
      clarity: 'SI1',
      shape: 'Oval',
      certification: 'IGI',
      image: '/images/n6.jpeg',
      inStock: true,
      featured: true
    }
  ]

  // Filter options
  const cutOptions = ['All', 'Brilliant', 'Princess', 'Emerald', 'Cushion', 'Pear', 'Oval', 'Marquise', 'Asscher']
  const colorOptions = ['All', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']
  const clarityOptions = ['All', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'I1']
  const shapeOptions = ['All', 'Round', 'Square', 'Rectangle', 'Cushion', 'Pear', 'Oval', 'Heart', 'Marquise']
  const caratOptions = ['All', '0.5-1.0', '1.0-2.0', '2.0-3.0', '3.0+']

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-purple-800/90 to-pink-800/90 z-10"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/n1.jpeg')" }}
          ></div>
        </div>

        <div className="relative z-20 h-full flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-3xl md:text-4xl text-yellow-300 font-arabic mb-4 animate-pulse">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              <span className="text-yellow-300">Diamond</span> Collection
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              Certified Premium Diamonds | GIA & IGI Certified
            </p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md py-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-around text-white">
              <div className="text-center">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm opacity-90">Certified</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm opacity-90">Diamonds</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">Lifetime</div>
                <div className="text-sm opacity-90">Warranty</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden w-full mb-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 
                     text-white font-bold rounded-xl flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-white rounded-3xl p-6 shadow-xl sticky top-24">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Filters</h3>

                {/* Price Range */}
                <div className="mb-6">
                  <label className="block font-bold text-gray-700 mb-2">Price Range</label>
                  <select 
                    value={filters.priceRange}
                    onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl
                             focus:border-yellow-400 focus:outline-none transition"
                  >
                    <option value="all">All Prices</option>
                    <option value="0-5000">$0 - $5,000</option>
                    <option value="5000-10000">$5,000 - $10,000</option>
                    <option value="10000-20000">$10,000 - $20,000</option>
                    <option value="20000+">$20,000+</option>
                  </select>
                </div>

                {/* Cut */}
                <div className="mb-6">
                  <label className="block font-bold text-gray-700 mb-2">Cut</label>
                  <select 
                    value={filters.cut}
                    onChange={(e) => setFilters({...filters, cut: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl
                             focus:border-yellow-400 focus:outline-none transition"
                  >
                    {cutOptions.map(opt => (
                      <option key={opt} value={opt.toLowerCase()}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Color */}
                <div className="mb-6">
                  <label className="block font-bold text-gray-700 mb-2">Color</label>
                  <select 
                    value={filters.color}
                    onChange={(e) => setFilters({...filters, color: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl
                             focus:border-yellow-400 focus:outline-none transition"
                  >
                    {colorOptions.map(opt => (
                      <option key={opt} value={opt.toLowerCase()}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Clarity */}
                <div className="mb-6">
                  <label className="block font-bold text-gray-700 mb-2">Clarity</label>
                  <select 
                    value={filters.clarity}
                    onChange={(e) => setFilters({...filters, clarity: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl
                             focus:border-yellow-400 focus:outline-none transition"
                  >
                    {clarityOptions.map(opt => (
                      <option key={opt} value={opt.toLowerCase()}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Shape */}
                <div className="mb-6">
                  <label className="block font-bold text-gray-700 mb-2">Shape</label>
                  <select 
                    value={filters.shape}
                    onChange={(e) => setFilters({...filters, shape: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl
                             focus:border-yellow-400 focus:outline-none transition"
                  >
                    {shapeOptions.map(opt => (
                      <option key={opt} value={opt.toLowerCase()}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Carat */}
                <div className="mb-6">
                  <label className="block font-bold text-gray-700 mb-2">Carat</label>
                  <select 
                    value={filters.carat}
                    onChange={(e) => setFilters({...filters, carat: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl
                             focus:border-yellow-400 focus:outline-none transition"
                  >
                    {caratOptions.map(opt => (
                      <option key={opt} value={opt.toLowerCase()}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Certification Note */}
                <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                  <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                    <span className="text-xl">📜</span>
                    Certification
                  </h4>
                  <p className="text-sm text-blue-600">
                    All diamonds are GIA or IGI certified for your peace of mind.
                  </p>
                </div>

                {/* Reset Filters */}
                <button 
                  onClick={() => setFilters({
                    priceRange: 'all',
                    carat: 'all',
                    cut: 'all',
                    color: 'all',
                    clarity: 'all',
                    shape: 'all'
                  })}
                  className="w-full mt-4 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl
                           hover:bg-gray-200 transition"
                >
                  Reset Filters
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:w-3/4">
              {/* Toolbar */}
              <div className="bg-white rounded-2xl p-4 mb-6 shadow-lg flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">{diamonds.length} Diamonds</span>
                  <div className="flex border-2 border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-yellow-400 text-white' : 'hover:bg-gray-100'}`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5 3h2v2H5V3zm0 4h2v2H5V7zm0 4h2v2H5v-2zm4-8h2v2H9V3zm0 4h2v2H9V7zm0 4h2v2H9v-2zm4-8h2v2h-2V3zm0 4h2v2h-2V7zm0 4h2v2h-2v-2z"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-yellow-400 text-white' : 'hover:bg-gray-100'}`}
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
                    className="px-4 py-2 border-2 border-gray-200 rounded-xl
                             focus:border-yellow-400 focus:outline-none transition"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="carat-low">Carat: Low to High</option>
                    <option value="carat-high">Carat: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Products Grid/List */}
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'} gap-6`}>
                {diamonds.map((diamond) => (
                  <Link
                    key={diamond.id}
                    href={`/products/${diamond.id}`}
                    className={`group bg-white rounded-3xl overflow-hidden shadow-xl 
                              hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500
                              ${viewMode === 'list' ? 'flex' : ''}`}
                  >
                    {/* Image */}
                    <div className={`relative ${viewMode === 'list' ? 'w-48 h-48' : 'h-64'} overflow-hidden`}>
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 
                                    opacity-0 group-hover:opacity-20 transition duration-500 z-10"></div>
                      <Image
                        src={diamond.image}
                        alt={diamond.name}
                        fill
                        className="object-cover group-hover:scale-110 transition duration-700"
                      />
                      {diamond.featured && (
                        <div className="absolute top-4 left-4 bg-yellow-400 text-gray-900 
                                      px-3 py-1 rounded-full text-sm font-bold z-20">
                          Featured
                        </div>
                      )}
                      {!diamond.inStock && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white 
                                      px-3 py-1 rounded-full text-sm font-bold z-20">
                          Out of Stock
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-yellow-600 transition">
                        {diamond.name}
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
                        <span className="flex items-center gap-1">
                          <span className="text-yellow-500">⚖️</span> {diamond.carat} ct
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="text-yellow-500">✂️</span> {diamond.cut}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="text-yellow-500">🎨</span> {diamond.color}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="text-yellow-500">💎</span> {diamond.clarity}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="text-yellow-500">🔷</span> {diamond.shape}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="text-yellow-500">📜</span> {diamond.certification}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-gray-800">
                            ${diamond.price.toLocaleString()}
                          </span>
                        </div>
                        
                        <button 
                          onClick={(e) => {
                            e.preventDefault()
                            // Add to cart logic
                          }}
                          className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 
                                   text-white font-bold rounded-xl text-sm
                                   hover:from-yellow-500 hover:to-orange-600
                                   transform hover:scale-105 transition duration-300"
                        >
                          Add to Cart
                        </button>
                      </div>

                      {viewMode === 'list' && (
                        <p className="mt-4 text-gray-600 border-t pt-4">{diamond.description}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 
                                 text-white font-bold rounded-xl text-lg
                                 hover:from-blue-600 hover:to-purple-600
                                 transform hover:scale-105 transition duration-300">
                  Load More Diamonds
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Diamond <span className="text-yellow-300">Education</span>
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                💎
              </div>
              <h3 className="text-xl font-bold mb-2">The 4 C's</h3>
              <p className="text-gray-300 text-sm">Cut, Color, Clarity, Carat - the universal standard</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                📜
              </div>
              <h3 className="text-xl font-bold mb-2">Certification</h3>
              <p className="text-gray-300 text-sm">All diamonds come with GIA or IGI certificates</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                💰
              </div>
              <h3 className="text-xl font-bold mb-2">Investment</h3>
              <p className="text-gray-300 text-sm">Diamonds hold value and appreciate over time</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                🛡️
              </div>
              <h3 className="text-xl font-bold mb-2">Guarantee</h3>
              <p className="text-gray-300 text-sm">Lifetime warranty and buyback guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Info */}
      <section className="py-8 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          <p className="text-sm">
            Need expert advice on choosing the perfect diamond? Contact our administrator:
          </p>
          <p className="font-bold text-gray-800 mt-2">
            Hafiz Sajid Syed | sajid.syed@gmail.com | +1 (234) 567-890
          </p>
        </div>
      </section>
    </div>
  )
}
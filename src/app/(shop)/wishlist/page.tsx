// app/(shop)/wishlist/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type WishlistItem = {
  id: string
  name: string
  price: number
  purity: string
  weight: number
  image: string
  inStock: boolean
}

export default function WishlistPage() {
  // Sample wishlist data
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: '1',
      name: '24K Gold Kundan Necklace',
      price: 12999,
      purity: '24K',
      weight: 45.5,
      image: '/images/n1.jpeg',
      inStock: true
    },
    {
      id: '2',
      name: '22K Gold Jhumka Earrings',
      price: 3499,
      purity: '22K',
      weight: 12.8,
      image: '/images/n2.jpeg',
      inStock: true
    },
    {
      id: '3',
      name: '18K Gold Diamond Ring',
      price: 5999,
      purity: '18K',
      weight: 8.5,
      image: '/images/n3.jpeg',
      inStock: false
    },
    {
      id: '4',
      name: '24K Gold Bangles Set',
      price: 8999,
      purity: '24K',
      weight: 32.0,
      image: '/images/n4.jpeg',
      inStock: true
    },
    {
      id: '5',
      name: '22K Gold Chain for Men',
      price: 4999,
      purity: '22K',
      weight: 18.5,
      image: '/images/n5.jpeg',
      inStock: true
    },
    {
      id: '6',
      name: '18K Gold Pendant Set',
      price: 4499,
      purity: '18K',
      weight: 15.2,
      image: '/images/n6.jpeg',
      inStock: true
    }
  ])

  const removeFromWishlist = (id: string) => {
    setWishlistItems(items => items.filter(item => item.id !== id))
  }

  const addToCart = (id: string) => {
    // Add to cart logic
    alert(`Added item ${id} to cart`)
    // Optionally remove from wishlist after adding to cart
    // removeFromWishlist(id)
  }

  const clearWishlist = () => {
    if (confirm('Are you sure you want to clear your wishlist?')) {
      setWishlistItems([])
    }
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header with Bismillah */}
        <div className="bg-gradient-to-r from-amber-700 to-yellow-700 text-white py-6">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-2xl mb-2">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
            <h1 className="text-3xl md:text-4xl font-bold">My Wishlist</h1>
          </div>
        </div>

        {/* Empty State */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-7xl mb-4">🤍</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">Save your favorite items and come back to them later</p>
            <Link
              href="/products"
              className="inline-block px-6 py-3 bg-yellow-500 text-white rounded-lg font-bold hover:bg-yellow-600 transition"
            >
              Browse Products
            </Link>
          </div>
        </div>

        {/* Admin Info */}
        <div className="fixed bottom-0 left-0 right-0 bg-gray-100 py-4 text-center text-sm">
          <p>Hafiz Sajid Syed | sajid.syed@gmail.com</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Bismillah */}
      <div className="bg-gradient-to-r from-amber-700 to-yellow-700 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-2xl mb-2">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          <h1 className="text-3xl md:text-4xl font-bold">My Wishlist</h1>
          <p className="text-amber-100 mt-2">{wishlistItems.length} items saved</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Actions Bar */}
        <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Total value: </span>
            <span className="text-xl font-bold text-yellow-600">
              ${wishlistItems.reduce((sum, item) => sum + item.price, 0).toLocaleString()}
            </span>
          </div>
          
          <div className="flex gap-2">
            <Link
              href="/products"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded font-medium hover:bg-gray-200 transition"
            >
              Continue Shopping
            </Link>
            <button
              onClick={clearWishlist}
              className="px-4 py-2 bg-red-500 text-white rounded font-medium hover:bg-red-600 transition"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden group">
              {/* Image */}
              <Link href={`/products/${item.id}`} className="block relative h-48 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
                {!item.inStock && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    Out of Stock
                  </div>
                )}
              </Link>

              {/* Details */}
              <div className="p-4">
                <Link href={`/products/${item.id}`} className="block">
                  <h3 className="font-bold text-gray-800 mb-1 hover:text-yellow-600 transition">
                    {item.name}
                  </h3>
                </Link>
                
                <div className="flex flex-wrap gap-1 mb-2">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">{item.purity}</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">{item.weight}g</span>
                </div>

                <div className="text-xl font-bold text-gray-900 mb-3">
                  ${item.price.toLocaleString()}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(item.id)}
                    disabled={!item.inStock}
                    className={`flex-1 py-2 rounded font-medium text-sm transition
                      ${item.inStock 
                        ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                  >
                    {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="p-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition"
                    title="Remove from wishlist"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Share Wishlist */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold mb-3">Share Your Wishlist</h3>
          <p className="text-gray-600 mb-4">Let your friends and family know what you'd love to receive</p>
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Share on Facebook
            </button>
            <button className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition">
              Share on Instagram
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
              Share via WhatsApp
            </button>
            <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition">
              Copy Link
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
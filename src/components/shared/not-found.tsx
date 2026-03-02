// components/shared/not-found.tsx
'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

type NotFoundProps = {
  title?: string
  message?: string
  showHome?: boolean
  showBack?: boolean
  showSearch?: boolean
  className?: string
}

export default function NotFound({
  title = 'Page Not Found',
  message = "The page you're looking for doesn't exist or has been moved.",
  showHome = true,
  showBack = true,
  showSearch = false,
  className = ''
}: NotFoundProps) {
  const router = useRouter()

  return (
    <div className={`min-h-[60vh] flex items-center justify-center p-4 ${className}`}>
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="relative mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-yellow-500 opacity-20">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Floating icons */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-6xl animate-bounce">
                🔍
              </div>
              <div className="absolute -bottom-12 -right-12 text-4xl animate-pulse">
                💎
              </div>
              <div className="absolute -bottom-12 -left-12 text-4xl animate-pulse">
                ✨
              </div>
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          {title}
        </h2>

        {/* Message */}
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          {message}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {showBack && (
            <button
              onClick={() => router.back()}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200 transition transform hover:scale-105"
            >
              ← Go Back
            </button>
          )}

          {showHome && (
            <Link
              href="/"
              className="px-6 py-3 bg-yellow-500 text-white rounded-lg font-bold hover:bg-yellow-600 transition transform hover:scale-105"
            >
              Go to Homepage
            </Link>
          )}
        </div>

        {/* Search Bar (optional) */}
        {showSearch && (
          <div className="mt-8 max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-yellow-500 text-white rounded-md text-sm hover:bg-yellow-600">
                Search
              </button>
            </div>
          </div>
        )}

        {/* Helpful Links */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">You might find these helpful:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/products" className="text-yellow-600 hover:text-yellow-700 hover:underline">
              All Products
            </Link>
            <Link href="/categories/gold" className="text-yellow-600 hover:text-yellow-700 hover:underline">
              Gold Collection
            </Link>
            <Link href="/categories/diamonds" className="text-yellow-600 hover:text-yellow-700 hover:underline">
              Diamonds
            </Link>
            <Link href="/contact" className="text-yellow-600 hover:text-yellow-700 hover:underline">
              Contact Us
            </Link>
          </div>
        </div>

        {/* Admin Contact */}
        <div className="mt-8 text-sm text-gray-500">
          <p>Need assistance? Contact our administrator:</p>
          <p className="font-bold text-gray-800 mt-1">Hafiz Sajid Syed</p>
          <a 
            href="mailto:sajid.syed@gmail.com"
            className="text-yellow-600 hover:text-yellow-700"
          >
            sajid.syed@gmail.com
          </a>
        </div>
      </div>
    </div>
  )
}
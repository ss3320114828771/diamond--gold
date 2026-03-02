// app/(shop)/products/error.tsx
'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Products page error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Header with Bismillah */}
      <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-amber-700 to-yellow-700 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-2xl mb-2">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          <h1 className="text-3xl md:text-4xl font-bold">Products</h1>
        </div>
      </div>

      {/* Error Content */}
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center mt-20">
        {/* Error Icon */}
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        {/* Error Message */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong!</h2>
        <p className="text-gray-600 mb-6">
          We couldn't load the products. Please try again or contact support.
        </p>

        {/* Error Details (Optional - for debugging) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 p-4 bg-gray-100 rounded-lg text-left">
            <p className="text-sm font-mono text-red-600 break-all">
              {error.message || 'Unknown error occurred'}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full py-3 bg-yellow-500 text-white rounded-lg font-bold hover:bg-yellow-600 transition"
          >
            Try Again
          </button>
          
          <Link
            href="/"
            className="block w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200 transition"
          >
            Go to Homepage
          </Link>
        </div>

        {/* Support Contact */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Need immediate assistance?</p>
          <p className="text-sm font-bold text-gray-800">Hafiz Sajid Syed</p>
          <p className="text-sm text-yellow-600">sajid.syed@gmail.com</p>
          <p className="text-sm text-gray-600">+1 (234) 567-890</p>
        </div>
      </div>
    </div>
  )
}
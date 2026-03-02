// components/cart/cart-empty.tsx
import Link from 'next/link'

type CartEmptyProps = {
  message?: string
  showBrowseButton?: boolean
  browseLink?: string
  browseText?: string
}

export default function CartEmpty({ 
  message = 'Your cart is empty', 
  showBrowseButton = true,
  browseLink = '/products',
  browseText = 'Browse Products'
}: CartEmptyProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Empty Cart Icon */}
        <div className="relative mb-6">
          <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
            <svg 
              className="w-16 h-16 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
              />
            </svg>
          </div>
          
          {/* Floating Emoji */}
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center animate-bounce">
            <span className="text-lg">🛒</span>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{message}</h2>
        <p className="text-gray-600 mb-8">
          Looks like you haven't added anything to your cart yet.
        </p>

        {/* Browse Button */}
        {showBrowseButton && (
          <Link
            href={browseLink}
            className="inline-flex items-center justify-center px-6 py-3 bg-yellow-500 text-white rounded-lg font-bold hover:bg-yellow-600 transition transform hover:scale-105"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
              />
            </svg>
            {browseText}
          </Link>
        )}

        {/* Additional Links */}
        <div className="mt-6 text-sm text-gray-500">
          <p>Or explore our:</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link href="/categories/gold" className="text-yellow-600 hover:text-yellow-700">
              Gold Collection
            </Link>
            <span>•</span>
            <Link href="/categories/diamonds" className="text-yellow-600 hover:text-yellow-700">
              Diamond Collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
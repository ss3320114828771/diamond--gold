// app/(shop)/layout.tsx
import Link from 'next/link'

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Simple Shop Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="text-xl font-bold text-yellow-600">
              HS Gold
            </Link>

            {/* Shop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/products" className="text-gray-700 hover:text-yellow-600 transition">
                Products
              </Link>
              <Link href="/categories/diamonds" className="text-gray-700 hover:text-yellow-600 transition">
                Diamonds
              </Link>
              <Link href="/categories/gold" className="text-gray-700 hover:text-yellow-600 transition">
                Gold
              </Link>
              <Link href="/offers" className="text-gray-700 hover:text-yellow-600 transition">
                Offers
              </Link>
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <Link href="/wishlist" className="text-gray-700 hover:text-yellow-600 transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </Link>
              <Link href="/cart" className="text-gray-700 hover:text-yellow-600 transition relative">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  2
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Simple Shop Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-yellow-500 mb-3">HS Gold</h3>
              <p className="text-sm text-gray-400">Premium gold and diamond jewelry since 2024</p>
            </div>
            <div>
              <h4 className="font-bold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-yellow-500 transition">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-yellow-500 transition">Contact</Link></li>
                <li><Link href="/directions" className="hover:text-yellow-500 transition">Directions</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Categories</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/categories/diamonds" className="hover:text-yellow-500 transition">Diamonds</Link></li>
                <li><Link href="/categories/gold" className="hover:text-yellow-500 transition">Gold</Link></li>
                <li><Link href="/products" className="hover:text-yellow-500 transition">All Products</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>sajid.syed@gmail.com</li>
                <li>+1 (234) 567-890</li>
                <li>Hafiz Sajid Syed</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-4 text-center text-sm text-gray-500">
            <p>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
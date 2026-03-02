// components/layout/mobile-menu.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type MenuItem = {
  name: string
  href: string
  icon?: string
  badge?: number
  children?: MenuItem[]
}

type MobileMenuProps = {
  isOpen: boolean
  onClose: () => void
  menuItems?: MenuItem[]
  showAuth?: boolean
  showSearch?: boolean
}

export default function MobileMenu({
  isOpen,
  onClose,
  menuItems,
  showAuth = true,
  showSearch = true
}: MobileMenuProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [cartCount, setCartCount] = useState(2)
  const [wishlistCount, setWishlistCount] = useState(3)
  const pathname = usePathname()

  // Default menu items
  const defaultMenuItems: MenuItem[] = [
    { 
      name: 'Home', 
      href: '/',
      icon: '🏠'
    },
    { 
      name: 'Products', 
      href: '/products',
      icon: '💎'
    },
    { 
      name: 'Categories', 
      href: '#',
      icon: '📋',
      children: [
        { name: 'Gold Necklaces', href: '/categories/gold/necklaces' },
        { name: 'Gold Earrings', href: '/categories/gold/earrings' },
        { name: 'Gold Rings', href: '/categories/gold/rings' },
        { name: 'Gold Bangles', href: '/categories/gold/bangles' },
        { name: 'Diamond Rings', href: '/categories/diamonds/rings' },
        { name: 'Diamond Necklaces', href: '/categories/diamonds/necklaces' },
        { name: 'Diamond Earrings', href: '/categories/diamonds/earrings' },
        { name: 'Wedding Collection', href: '/collections/wedding' },
      ]
    },
    { 
      name: 'About', 
      href: '/about',
      icon: 'ℹ️'
    },
    { 
      name: 'Contact', 
      href: '/contact',
      icon: '📞'
    },
    { 
      name: 'Directions', 
      href: '/directions',
      icon: '📍'
    }
  ]

  const items = menuItems || defaultMenuItems

  // Close menu on route change
  useEffect(() => {
    onClose()
  }, [pathname, onClose])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const toggleExpand = (itemName: string) => {
    setExpandedItems(prev =>
      prev.includes(itemName)
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    )
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-50 lg:hidden animate-fade-in"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white z-50 lg:hidden shadow-2xl animate-slide-in">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-sm">✨</span>
              </div>
              <span className="text-xl font-bold">HS GOLD</span>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Search */}
          {showSearch && (
            <div className="p-4 border-b">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute left-3 top-3.5"
                >
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>
            </div>
          )}

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-2">
              {items.map((item) => (
                <div key={item.name}>
                  {item.children ? (
                    // Item with children (expandable)
                    <div>
                      <button
                        onClick={() => toggleExpand(item.name)}
                        className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-yellow-50 rounded-xl transition"
                      >
                        <div className="flex items-center gap-3">
                          {item.icon && <span className="text-xl">{item.icon}</span>}
                          <span className="font-medium">{item.name}</span>
                          {item.badge && (
                            <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <svg
                          className={`w-5 h-5 transition-transform duration-300 ${
                            expandedItems.includes(item.name) ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Submenu */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          expandedItems.includes(item.name) ? 'max-h-96' : 'max-h-0'
                        }`}
                      >
                        <div className="pl-12 py-2 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className={`block px-4 py-2 text-sm rounded-lg transition ${
                                pathname === child.href
                                  ? 'text-yellow-600 bg-yellow-50 font-medium'
                                  : 'text-gray-600 hover:bg-gray-50 hover:text-yellow-600'
                              }`}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Regular item
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                        pathname === item.href
                          ? 'text-yellow-600 bg-yellow-50 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {item.icon && <span className="text-xl">{item.icon}</span>}
                      <span className="font-medium">{item.name}</span>
                      {item.badge && (
                        <span className="ml-auto px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Cart & Wishlist */}
          <div className="p-4 border-t">
            <div className="flex gap-2 mb-4">
              <Link
                href="/wishlist"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition relative"
              >
                <span className="text-xl">❤️</span>
                <span className="font-medium">Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link
                href="/cart"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition relative"
              >
                <span className="text-xl">🛒</span>
                <span className="font-medium">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-yellow-500 text-white text-xs rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Auth Buttons */}
            {showAuth && (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  className="px-4 py-3 text-center text-gray-700 font-medium border border-gray-300 rounded-xl hover:bg-gray-50 transition"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-3 text-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-medium rounded-xl hover:from-yellow-500 hover:to-orange-600 transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t bg-gray-50">
            <div className="text-center text-sm text-gray-500">
              <p className="mb-2">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
              <p>© 2024 HS Gold. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </>
  )
}
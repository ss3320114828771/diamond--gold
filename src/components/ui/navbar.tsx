// components/ui/navbar.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavItem = {
  label: string
  href: string
  icon?: React.ReactNode
  badge?: number
  children?: NavItem[]
}

type NavbarProps = {
  logo?: React.ReactNode
  brandName?: string
  items?: NavItem[]
  rightItems?: React.ReactNode[]
  transparent?: boolean
  sticky?: boolean
  showSearch?: boolean
  className?: string
}

export default function Navbar({
  logo,
  brandName = 'HS Gold',
  items = [
    { label: 'Home', href: '/' },
    { 
      label: 'Categories', 
      href: '#',
      children: [
        { label: 'Gold Necklaces', href: '/categories/gold/necklaces' },
        { label: 'Gold Earrings', href: '/categories/gold/earrings' },
        { label: 'Gold Rings', href: '/categories/gold/rings' },
        { label: 'Diamond Rings', href: '/categories/diamonds/rings' },
        { label: 'Diamond Necklaces', href: '/categories/diamonds/necklaces' },
      ]
    },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Directions', href: '/directions' },
  ],
  rightItems = [],
  transparent = false,
  sticky = true,
  showSearch = true,
  className = ''
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === '/') return pathname === href
    return pathname.startsWith(href)
  }

  const navbarClasses = `
    w-full z-50 transition-all duration-300
    ${sticky ? 'fixed top-0' : 'relative'}
    ${transparent && !isScrolled 
      ? 'bg-transparent text-white' 
      : 'bg-white text-gray-800 shadow-md'
    }
    ${isScrolled ? 'py-2' : 'py-4'}
    ${className}
  `

  return (
    <header className={navbarClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            {logo ? logo : (
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
                  <span className="text-xl">✨</span>
                </div>
              </div>
            )}
            <span className={`text-2xl font-bold transition-colors ${
              transparent && !isScrolled ? 'text-white' : 'text-gray-800'
            }`}>
              {brandName}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {items.map((item) => (
              <div key={item.label} className="relative group">
                {item.children ? (
                  <>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                      className={`
                        px-4 py-2 rounded-lg font-medium transition-all duration-300
                        flex items-center gap-1
                        ${isActive(item.href)
                          ? transparent && !isScrolled
                            ? 'text-yellow-300'
                            : 'text-yellow-600'
                          : transparent && !isScrolled
                          ? 'text-white hover:text-yellow-300'
                          : 'text-gray-700 hover:text-yellow-600'
                        }
                      `}
                    >
                      {item.label}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`
                      px-4 py-2 rounded-lg font-medium transition-all duration-300
                      flex items-center gap-1
                      ${isActive(item.href)
                        ? transparent && !isScrolled
                          ? 'text-yellow-300'
                          : 'text-yellow-600'
                        : transparent && !isScrolled
                        ? 'text-white hover:text-yellow-300'
                        : 'text-gray-700 hover:text-yellow-600'
                      }
                    `}
                  >
                    {item.label}
                    {item.badge && (
                      <span className="ml-1 px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right Items */}
          <div className="flex items-center gap-2">
            {/* Search */}
            {showSearch && (
              <div className="hidden md:block relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`
                    pl-9 pr-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 w-48 lg:w-64
                    ${transparent && !isScrolled
                      ? 'bg-white/10 text-white placeholder-white/70 border border-white/30'
                      : 'bg-gray-100 text-gray-900 placeholder-gray-500'
                    }
                  `}
                />
                <svg
                  className={`absolute left-3 top-2.5 w-4 h-4 ${
                    transparent && !isScrolled ? 'text-white/70' : 'text-gray-400'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            )}

            {/* Right Items (cart, wishlist, etc) */}
            {rightItems.map((item, index) => (
              <div key={index}>{item}</div>
            ))}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`
                lg:hidden p-2 rounded-lg transition
                ${transparent && !isScrolled
                  ? 'text-white hover:bg-white/10'
                  : 'text-gray-700 hover:bg-gray-100'
                }
              `}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`
            lg:hidden fixed inset-x-0 top-[72px] bg-white shadow-xl transition-all duration-500 overflow-hidden
            ${isMenuOpen ? 'max-h-[calc(100vh-72px)] opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="p-4 space-y-4">
            {/* Mobile Search */}
            {showSearch && (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            )}

            {/* Mobile Navigation */}
            <nav className="space-y-1">
              {items.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <div className="space-y-1">
                      <div className="px-4 py-2 text-sm font-medium text-gray-900">
                        {item.label}
                      </div>
                      <div className="pl-4 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-gray-600 hover:bg-yellow-50 hover:text-yellow-600 rounded-lg transition"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`
                        block px-4 py-2 text-sm font-medium rounded-lg transition
                        ${isActive(item.href)
                          ? 'text-yellow-600 bg-yellow-50'
                          : 'text-gray-700 hover:bg-gray-50'
                        }
                      `}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
// components/layout/header.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  // Ye ensure karega ke component client-side par hi render ho
  useEffect(() => {
    setMounted(true)
  }, [])

  // Agar mounted nahi hai to kuch mat do (hydration error avoid)
  if (!mounted) {
    return (
      <header className="bg-white shadow h-16">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
          <Link href="/" className="text-xl font-bold text-yellow-600">
            HS Gold
          </Link>
        </div>
      </header>
    )
  }

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-yellow-600">
            HS Gold
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-yellow-600">Home</Link>
            <Link href="/products" className="hover:text-yellow-600">Products</Link>
            <Link href="/about" className="hover:text-yellow-600">About</Link>
            <Link href="/contact" className="hover:text-yellow-600">Contact</Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="py-2 hover:text-yellow-600">Home</Link>
              <Link href="/products" className="py-2 hover:text-yellow-600">Products</Link>
              <Link href="/about" className="py-2 hover:text-yellow-600">About</Link>
              <Link href="/contact" className="py-2 hover:text-yellow-600">Contact</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
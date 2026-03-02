// components/products/search-bar.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

type SearchResult = {
  id: string
  name: string
  price: number
  image: string
  category?: string
  purity?: string
}

type SearchBarProps = {
  placeholder?: string
  onSearch?: (query: string) => void
  onResultSelect?: (result: SearchResult) => void
  showResults?: boolean
  autoFocus?: boolean
  className?: string
  variant?: 'default' | 'minimal' | 'hero'
}

export default function SearchBar({
  placeholder = 'Search for gold, diamonds, jewelry...',
  onSearch,
  onResultSelect,
  showResults = true,
  autoFocus = false,
  className = '',
  variant = 'default'
}: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Mock search results (in real app, this would be an API call)
  const mockResults: SearchResult[] = [
    {
      id: '1',
      name: '24K Gold Kundan Necklace',
      price: 12999,
      image: '/images/n1.jpeg',
      category: 'Necklaces',
      purity: '24K'
    },
    {
      id: '2',
      name: '22K Gold Jhumka Earrings',
      price: 3499,
      image: '/images/n2.jpeg',
      category: 'Earrings',
      purity: '22K'
    },
    {
      id: '3',
      name: '18K Gold Diamond Ring',
      price: 5999,
      image: '/images/n3.jpeg',
      category: 'Rings',
      purity: '18K'
    },
    {
      id: '4',
      name: '24K Gold Bangles Set',
      price: 8999,
      image: '/images/n4.jpeg',
      category: 'Bangles',
      purity: '24K'
    },
    {
      id: '5',
      name: '22K Gold Chain for Men',
      price: 4999,
      image: '/images/n5.jpeg',
      category: 'Chains',
      purity: '22K'
    }
  ]

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches')
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Simulate search API call
  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      return
    }

    setIsLoading(true)
    const timer = setTimeout(() => {
      const filtered = mockResults.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category?.toLowerCase().includes(query.toLowerCase()) ||
        item.purity?.toLowerCase().includes(query.toLowerCase())
      )
      setResults(filtered)
      setIsLoading(false)
      setShowDropdown(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      // Save to recent searches
      const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5)
      setRecentSearches(updated)
      localStorage.setItem('recentSearches', JSON.stringify(updated))

      onSearch?.(query)
      router.push(`/search?q=${encodeURIComponent(query)}`)
      setShowDropdown(false)
    }
  }

  const handleResultClick = (result: SearchResult) => {
    onResultSelect?.(result)
    setShowDropdown(false)
    setQuery('')
    router.push(`/products/${result.id}`)
  }

  const handleRecentClick = (term: string) => {
    setQuery(term)
    onSearch?.(term)
    router.push(`/search?q=${encodeURIComponent(term)}`)
    setShowDropdown(false)
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem('recentSearches')
  }

  // Variant styles
  const variantStyles = {
    default: {
      container: 'max-w-2xl mx-auto',
      input: 'w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200',
      icon: 'left-4 top-3.5'
    },
    minimal: {
      container: '',
      input: 'w-full pl-10 pr-4 py-2 bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:bg-white focus:border-yellow-500',
      icon: 'left-3 top-2.5'
    },
    hero: {
      container: 'max-w-3xl mx-auto',
      input: 'w-full pl-14 pr-6 py-5 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white placeholder-white/70 rounded-full focus:outline-none focus:border-yellow-400 text-lg',
      icon: 'left-5 top-5'
    }
  }

  const styles = variantStyles[variant]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  return (
    <div ref={searchRef} className={`relative ${styles.container} ${className}`}>
      <form onSubmit={handleSearch}>
        {/* Search Icon */}
        <div className={`absolute ${styles.icon} text-gray-400`}>
          <svg className={`w-5 h-5 ${variant === 'hero' ? 'text-white/70' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Input */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setShowDropdown(true)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={styles.input}
        />

        {/* Clear Button */}
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className={`absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Search Button */}
        <button
          type="submit"
          className={`absolute right-3 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-yellow-500 text-white rounded-lg text-sm font-medium hover:bg-yellow-600 transition ${
            variant === 'hero' ? 'bg-yellow-500' : ''
          }`}
        >
          Search
        </button>
      </form>

      {/* Results Dropdown */}
      {showResults && showDropdown && (query.length >= 2 || recentSearches.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 max-h-96 overflow-y-auto z-50">
          {/* Loading State */}
          {isLoading && (
            <div className="p-4 text-center text-gray-500">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-yellow-500 border-t-transparent"></div>
              <p className="mt-2">Searching...</p>
            </div>
          )}

          {/* Results */}
          {!isLoading && results.length > 0 && (
            <div>
              <div className="p-3 bg-gray-50 border-b flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Products</span>
                <span className="text-xs text-gray-500">{results.length} found</span>
              </div>
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className="w-full p-3 flex items-center gap-3 hover:bg-gray-50 transition border-b last:border-0"
                >
                  <div className="relative w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={result.image}
                      alt={result.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-medium text-gray-800 line-clamp-1">{result.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      {result.category && (
                        <span className="text-xs text-gray-500">{result.category}</span>
                      )}
                      {result.purity && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                          {result.purity}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-yellow-600">{formatPrice(result.price)}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* No Results */}
          {!isLoading && query.length >= 2 && results.length === 0 && (
            <div className="p-8 text-center">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-gray-600 mb-2">No products found</p>
              <p className="text-sm text-gray-500">Try different keywords</p>
            </div>
          )}

          {/* Recent Searches */}
          {!isLoading && query.length < 2 && recentSearches.length > 0 && (
            <div>
              <div className="p-3 bg-gray-50 border-b flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Recent Searches</span>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-red-500 hover:text-red-600"
                >
                  Clear
                </button>
              </div>
              {recentSearches.map((term, index) => (
                <button
                  key={index}
                  onClick={() => handleRecentClick(term)}
                  className="w-full p-3 flex items-center gap-3 hover:bg-gray-50 transition border-b last:border-0"
                >
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">{term}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
// components/products/filter-sidebar.tsx
'use client'

import { useState } from 'react'

type FilterOption = {
  value: string
  label: string
  count?: number
}

type FilterSection = {
  id: string
  name: string
  type: 'checkbox' | 'radio' | 'range' | 'color'
  options?: FilterOption[]
  min?: number
  max?: number
  step?: number
}

type FilterSidebarProps = {
  sections?: FilterSection[]
  onFilterChange?: (filters: Record<string, any>) => void
  onClose?: () => void
  isMobile?: boolean
  showSearch?: boolean
  showReset?: boolean
}

export default function FilterSidebar({
  sections,
  onFilterChange,
  onClose,
  isMobile = false,
  showSearch = true,
  showReset = true
}: FilterSidebarProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedSections, setExpandedSections] = useState<string[]>([])
  const [selectedFilters, setSelectedFilters] = useState<Record<string, any>>({})
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 })

  // Default filter sections
  const defaultSections: FilterSection[] = [
    {
      id: 'category',
      name: 'Category',
      type: 'checkbox',
      options: [
        { value: 'necklaces', label: 'Necklaces', count: 45 },
        { value: 'earrings', label: 'Earrings', count: 38 },
        { value: 'rings', label: 'Rings', count: 27 },
        { value: 'bangles', label: 'Bangles', count: 23 },
        { value: 'chains', label: 'Chains', count: 15 },
        { value: 'pendants', label: 'Pendants', count: 31 }
      ]
    },
    {
      id: 'purity',
      name: 'Gold Purity',
      type: 'checkbox',
      options: [
        { value: '24k', label: '24K (99.9%)', count: 52 },
        { value: '22k', label: '22K (91.6%)', count: 48 },
        { value: '18k', label: '18K (75%)', count: 35 },
        { value: '14k', label: '14K (58.5%)', count: 12 }
      ]
    },
    {
      id: 'price',
      name: 'Price Range',
      type: 'range',
      min: 0,
      max: 50000,
      step: 1000
    },
    {
      id: 'gender',
      name: 'Gender',
      type: 'checkbox',
      options: [
        { value: 'men', label: 'Men', count: 28 },
        { value: 'women', label: 'Women', count: 89 },
        { value: 'unisex', label: 'Unisex', count: 15 }
      ]
    },
    {
      id: 'occasion',
      name: 'Occasion',
      type: 'checkbox',
      options: [
        { value: 'wedding', label: 'Wedding', count: 42 },
        { value: 'engagement', label: 'Engagement', count: 23 },
        { value: 'daily', label: 'Daily Wear', count: 67 },
        { value: 'party', label: 'Party', count: 31 },
        { value: 'festive', label: 'Festive', count: 28 }
      ]
    },
    {
      id: 'style',
      name: 'Style',
      type: 'checkbox',
      options: [
        { value: 'traditional', label: 'Traditional', count: 54 },
        { value: 'contemporary', label: 'Contemporary', count: 38 },
        { value: 'antique', label: 'Antique', count: 19 },
        { value: 'modern', label: 'Modern', count: 42 }
      ]
    },
    {
      id: 'color',
      name: 'Gemstone Color',
      type: 'color',
      options: [
        { value: 'white', label: 'White', count: 45 },
        { value: 'yellow', label: 'Yellow', count: 23 },
        { value: 'pink', label: 'Pink', count: 12 },
        { value: 'blue', label: 'Blue', count: 8 },
        { value: 'green', label: 'Green', count: 5 }
      ]
    }
  ]

  const filterSections = sections || defaultSections

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  const handleFilterChange = (sectionId: string, value: any, type: string) => {
    let newFilters = { ...selectedFilters }

    if (type === 'checkbox') {
      const currentValues = newFilters[sectionId] || []
      if (currentValues.includes(value)) {
        newFilters[sectionId] = currentValues.filter((v: string) => v !== value)
      } else {
        newFilters[sectionId] = [...currentValues, value]
      }
      
      // Remove empty arrays
      if (newFilters[sectionId].length === 0) {
        delete newFilters[sectionId]
      }
    } else if (type === 'radio') {
      newFilters[sectionId] = value
    } else if (type === 'range') {
      newFilters[sectionId] = value
    }

    setSelectedFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const handlePriceChange = (type: 'min' | 'max', value: number) => {
    const newRange = { ...priceRange, [type]: value }
    setPriceRange(newRange)
    handleFilterChange('price', newRange, 'range')
  }

  const resetFilters = () => {
    setSelectedFilters({})
    setPriceRange({ min: 0, max: 10000 })
    onFilterChange?.({})
  }

  const getActiveFilterCount = () => {
    return Object.keys(selectedFilters).length
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      <aside className={`
        ${isMobile 
          ? 'fixed inset-y-0 left-0 w-80 z-50 bg-white shadow-xl animate-slide-in' 
          : 'relative bg-white rounded-lg shadow'
        }
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Filters</h3>
              {getActiveFilterCount() > 0 && (
                <p className="text-xs text-gray-500">
                  {getActiveFilterCount()} active filters
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {showReset && getActiveFilterCount() > 0 && (
                <button
                  onClick={resetFilters}
                  className="text-sm text-yellow-600 hover:text-yellow-700 font-medium"
                >
                  Reset
                </button>
              )}
              {isMobile && (
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Search */}
          {showSearch && (
            <div className="p-4 border-b">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search filters..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <svg
                  className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          )}

          {/* Filter Sections */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {filterSections.map((section) => (
                <div key={section.id} className="border-b border-gray-200 pb-4 last:border-0">
                  {/* Section Header */}
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between text-left mb-2"
                  >
                    <span className="font-medium text-gray-700">{section.name}</span>
                    <svg
                      className={`w-4 h-4 text-gray-500 transform transition-transform ${
                        expandedSections.includes(section.id) ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Section Content */}
                  {expandedSections.includes(section.id) && (
                    <div className="mt-2 space-y-2">
                      {section.type === 'checkbox' && section.options?.map((option) => (
                        <label key={option.value} className="flex items-center justify-between group cursor-pointer">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              value={option.value}
                              checked={selectedFilters[section.id]?.includes(option.value)}
                              onChange={(e) => handleFilterChange(section.id, option.value, 'checkbox')}
                              className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
                            />
                            <span className="text-sm text-gray-600 group-hover:text-yellow-600">
                              {option.label}
                            </span>
                          </div>
                          {option.count && (
                            <span className="text-xs text-gray-400">({option.count})</span>
                          )}
                        </label>
                      ))}

                      {section.type === 'color' && section.options?.map((option) => (
                        <label key={option.value} className="flex items-center justify-between group cursor-pointer">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              value={option.value}
                              checked={selectedFilters[section.id]?.includes(option.value)}
                              onChange={(e) => handleFilterChange(section.id, option.value, 'checkbox')}
                              className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
                            />
                            <div className="flex items-center gap-2">
                              <span
                                className="w-4 h-4 rounded-full border border-gray-300"
                                style={{ backgroundColor: option.value }}
                              />
                              <span className="text-sm text-gray-600 group-hover:text-yellow-600">
                                {option.label}
                              </span>
                            </div>
                          </div>
                          {option.count && (
                            <span className="text-xs text-gray-400">({option.count})</span>
                          )}
                        </label>
                      ))}

                      {section.type === 'range' && (
                        <div className="space-y-3">
                          <div className="flex gap-2">
                            <input
                              type="number"
                              value={priceRange.min}
                              onChange={(e) => handlePriceChange('min', Number(e.target.value))}
                              min={section.min}
                              max={section.max}
                              step={section.step}
                              className="w-full px-3 py-1 border rounded-lg text-sm focus:outline-none focus:border-yellow-500"
                              placeholder="Min"
                            />
                            <input
                              type="number"
                              value={priceRange.max}
                              onChange={(e) => handlePriceChange('max', Number(e.target.value))}
                              min={section.min}
                              max={section.max}
                              step={section.step}
                              className="w-full px-3 py-1 border rounded-lg text-sm focus:outline-none focus:border-yellow-500"
                              placeholder="Max"
                            />
                          </div>
                          <input
                            type="range"
                            min={section.min}
                            max={section.max}
                            step={section.step}
                            value={priceRange.max}
                            onChange={(e) => handlePriceChange('max', Number(e.target.value))}
                            className="w-full accent-yellow-500"
                          />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>{formatPrice(section.min || 0)}</span>
                            <span>{formatPrice(section.max || 10000)}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Apply Button (Mobile) */}
          {isMobile && (
            <div className="p-4 border-t">
              <button
                onClick={onClose}
                className="w-full py-3 bg-yellow-500 text-white rounded-lg font-bold hover:bg-yellow-600 transition"
              >
                Apply Filters
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </>
  )
}
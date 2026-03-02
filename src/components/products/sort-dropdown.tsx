// components/products/sort-dropdown.tsx
'use client'

import { useState } from 'react'

type SortOption = {
  value: string
  label: string
  icon?: React.ReactNode
}

type SortDropdownProps = {
  options?: SortOption[]
  defaultValue?: string
  onSortChange?: (value: string) => void
  label?: string
  variant?: 'default' | 'minimal' | 'bordered'
  size?: 'sm' | 'md' | 'lg'
  showIcon?: boolean
  className?: string
}

export default function SortDropdown({
  options,
  defaultValue = 'featured',
  onSortChange,
  label = 'Sort by:',
  variant = 'default',
  size = 'md',
  showIcon = true,
  className = ''
}: SortDropdownProps) {
  const [selectedValue, setSelectedValue] = useState(defaultValue)
  const [isOpen, setIsOpen] = useState(false)

  // Default sort options
  const defaultOptions: SortOption[] = [
    { 
      value: 'featured', 
      label: 'Featured',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    },
    { 
      value: 'price-low', 
      label: 'Price: Low to High',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
        </svg>
      )
    },
    { 
      value: 'price-high', 
      label: 'Price: High to Low',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
        </svg>
      )
    },
    { 
      value: 'name-asc', 
      label: 'Name: A to Z',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
        </svg>
      )
    },
    { 
      value: 'name-desc', 
      label: 'Name: Z to A',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
        </svg>
      )
    },
    { 
      value: 'rating', 
      label: 'Top Rated',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    },
    { 
      value: 'newest', 
      label: 'Newest First',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ]

  const sortOptions = options || defaultOptions
  const selectedOption = sortOptions.find(opt => opt.value === selectedValue)

  // Size classes
  const sizeClasses = {
    sm: {
      button: 'px-3 py-1.5 text-sm',
      dropdown: 'text-sm',
      icon: 'w-4 h-4'
    },
    md: {
      button: 'px-4 py-2 text-base',
      dropdown: 'text-base',
      icon: 'w-5 h-5'
    },
    lg: {
      button: 'px-6 py-3 text-lg',
      dropdown: 'text-lg',
      icon: 'w-6 h-6'
    }
  }

  // Variant classes
  const variantClasses = {
    default: {
      button: 'bg-white border border-gray-300 rounded-lg hover:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-200',
      dropdown: 'bg-white border border-gray-200 rounded-lg shadow-lg'
    },
    minimal: {
      button: 'bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none',
      dropdown: 'bg-white border border-gray-200 rounded-lg shadow-lg'
    },
    bordered: {
      button: 'bg-white border-2 border-yellow-500 rounded-lg hover:bg-yellow-50 focus:outline-none',
      dropdown: 'bg-white border-2 border-yellow-500 rounded-lg shadow-lg'
    }
  }

  const handleSelect = (value: string) => {
    setSelectedValue(value)
    onSortChange?.(value)
    setIsOpen(false)
  }

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 transition-all duration-200
          ${sizeClasses[size].button}
          ${variantClasses[variant].button}
        `}
      >
        {showIcon && selectedOption?.icon && (
          <span className={sizeClasses[size].icon}>
            {selectedOption.icon}
          </span>
        )}
        <span>
          {label} <span className="font-medium">{selectedOption?.label}</span>
        </span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <div
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          
          <div
            className={`
              absolute right-0 mt-2 z-50 min-w-[200px] overflow-hidden
              ${variantClasses[variant].dropdown}
              ${sizeClasses[size].dropdown}
            `}
          >
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`
                  w-full flex items-center gap-3 px-4 py-2 text-left transition
                  ${selectedValue === option.value
                    ? 'bg-yellow-500 text-white'
                    : 'hover:bg-gray-100 text-gray-700'
                  }
                `}
              >
                {showIcon && option.icon && (
                  <span className={sizeClasses[size].icon}>
                    {option.icon}
                  </span>
                )}
                <span className="flex-1">{option.label}</span>
                {selectedValue === option.value && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
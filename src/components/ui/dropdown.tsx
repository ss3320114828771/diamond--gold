// components/ui/dropdown.tsx
'use client'

import { useState, useEffect, useRef, ReactNode } from 'react'

type DropdownItem = {
  label: string
  value: string
  icon?: ReactNode
  disabled?: boolean
  divider?: boolean
  onClick?: () => void
}

type DropdownProps = {
  trigger: ReactNode
  items: DropdownItem[]
  placement?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
  width?: 'auto' | 'sm' | 'md' | 'lg'
  className?: string
  menuClassName?: string
  closeOnSelect?: boolean
  closeOnClickOutside?: boolean
  onOpen?: () => void
  onClose?: () => void
}

export default function Dropdown({
  trigger,
  items,
  placement = 'bottom-left',
  width = 'auto',
  className = '',
  menuClassName = '',
  closeOnSelect = true,
  closeOnClickOutside = true,
  onOpen,
  onClose
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Width classes
  const widthClasses = {
    auto: 'min-w-[160px]',
    sm: 'w-32',
    md: 'w-48',
    lg: 'w-64'
  }

  // Placement classes
  const placementClasses = {
    'bottom-left': 'top-full left-0 mt-2',
    'bottom-right': 'top-full right-0 mt-2',
    'top-left': 'bottom-full left-0 mb-2',
    'top-right': 'bottom-full right-0 mb-2'
  }

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (closeOnClickOutside && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        onClose?.()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [closeOnClickOutside, onClose])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
        onClose?.()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  const handleToggle = () => {
    const newState = !isOpen
    setIsOpen(newState)
    if (newState) {
      onOpen?.()
    } else {
      onClose?.()
    }
  }

  const handleItemClick = (item: DropdownItem) => {
    if (item.disabled) return
    
    if (item.onClick) {
      item.onClick()
    }
    
    if (closeOnSelect) {
      setIsOpen(false)
      onClose?.()
    }
  }

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <div onClick={handleToggle} className="cursor-pointer">
        {trigger}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`
            absolute z-50
            ${placementClasses[placement]}
            ${widthClasses[width]}
            bg-white rounded-lg shadow-lg border border-gray-200
            overflow-hidden
            animate-fadeIn
            ${menuClassName}
          `}
        >
          <div className="py-1">
            {items.map((item, index) => (
              <div key={index}>
                {/* Divider */}
                {item.divider && (
                  <div className="my-1 border-t border-gray-200" />
                )}

                {/* Menu Item */}
                {!item.divider && (
                  <button
                    onClick={() => handleItemClick(item)}
                    disabled={item.disabled}
                    className={`
                      w-full text-left px-4 py-2
                      flex items-center gap-2
                      transition-colors duration-200
                      ${item.disabled 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    {/* Icon */}
                    {item.icon && (
                      <span className="text-gray-500">{item.icon}</span>
                    )}
                    
                    {/* Label */}
                    <span className="flex-1">{item.label}</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
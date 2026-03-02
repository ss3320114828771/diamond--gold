// components/ui/accordion.tsx
'use client'

import { useState } from 'react'

type AccordionItem = {
  id: string
  title: string
  content: React.ReactNode
  icon?: React.ReactNode
}

type AccordionProps = {
  items: AccordionItem[]
  allowMultiple?: boolean
  defaultExpanded?: string[]
  variant?: 'default' | 'bordered' | 'separated'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Accordion({
  items,
  allowMultiple = false,
  defaultExpanded = [],
  variant = 'default',
  size = 'md',
  className = ''
}: AccordionProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(defaultExpanded)

  const toggleItem = (itemId: string) => {
    if (allowMultiple) {
      setExpandedItems(prev =>
        prev.includes(itemId)
          ? prev.filter(id => id !== itemId)
          : [...prev, itemId]
      )
    } else {
      setExpandedItems(prev =>
        prev.includes(itemId) ? [] : [itemId]
      )
    }
  }

  // Size classes
  const sizeClasses = {
    sm: {
      button: 'py-2 px-3 text-sm',
      content: 'px-3 pb-2 text-sm',
      icon: 'w-4 h-4'
    },
    md: {
      button: 'py-3 px-4 text-base',
      content: 'px-4 pb-3 text-base',
      icon: 'w-5 h-5'
    },
    lg: {
      button: 'py-4 px-5 text-lg',
      content: 'px-5 pb-4 text-lg',
      icon: 'w-6 h-6'
    }
  }

  // Variant classes
  const variantClasses = {
    default: {
      container: 'divide-y divide-gray-200',
      item: 'bg-white',
      button: 'w-full flex items-center justify-between text-left font-medium text-gray-800 hover:bg-gray-50 transition',
      content: 'text-gray-600'
    },
    bordered: {
      container: 'space-y-2',
      item: 'border border-gray-200 rounded-lg overflow-hidden bg-white',
      button: 'w-full flex items-center justify-between text-left font-medium text-gray-800 hover:bg-gray-50 transition px-4',
      content: 'border-t border-gray-200 px-4'
    },
    separated: {
      container: 'space-y-2',
      item: 'bg-white rounded-lg shadow-sm overflow-hidden',
      button: 'w-full flex items-center justify-between text-left font-medium text-gray-800 hover:bg-gray-50 transition px-4',
      content: 'border-t border-gray-100 px-4'
    }
  }

  const styles = variantClasses[variant]
  const sizeStyle = sizeClasses[size]

  return (
    <div className={`${styles.container} ${className}`}>
      {items.map((item) => {
        const isExpanded = expandedItems.includes(item.id)

        return (
          <div key={item.id} className={styles.item}>
            {/* Accordion Button */}
            <button
              onClick={() => toggleItem(item.id)}
              className={`${styles.button} ${sizeStyle.button}`}
            >
              <div className="flex items-center gap-3">
                {item.icon && (
                  <span className="text-yellow-600">{item.icon}</span>
                )}
                <span>{item.title}</span>
              </div>
              <div className="flex items-center">
                <svg
                  className={`${sizeStyle.icon} transform transition-transform duration-300 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {/* Accordion Content */}
            <div
              className={`
                overflow-hidden transition-all duration-300
                ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
              `}
            >
              <div className={`${styles.content} ${sizeStyle.content}`}>
                {item.content}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
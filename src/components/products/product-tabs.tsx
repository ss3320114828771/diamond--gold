// components/products/product-tabs.tsx
'use client'

import { useState } from 'react'

type Tab = {
  id: string
  label: string
  content: React.ReactNode
  icon?: React.ReactNode
  badge?: number
}

type ProductTabsProps = {
  tabs: Tab[]
  defaultTab?: string
  variant?: 'underline' | 'pills' | 'bordered'
  className?: string
  onTabChange?: (tabId: string) => void
}

export default function ProductTabs({
  tabs,
  defaultTab,
  variant = 'underline',
  className = '',
  onTabChange
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || '')

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    onTabChange?.(tabId)
  }

  // Variant styles
  const variantStyles = {
    underline: {
      container: 'border-b border-gray-200',
      tab: (isActive: boolean) => `
        px-4 py-3 font-medium text-sm transition-colors relative
        ${isActive 
          ? 'text-yellow-600 border-b-2 border-yellow-500 -mb-px' 
          : 'text-gray-500 hover:text-gray-700'
        }
      `
    },
    pills: {
      container: 'flex flex-wrap gap-2',
      tab: (isActive: boolean) => `
        px-4 py-2 rounded-lg font-medium text-sm transition-all
        ${isActive 
          ? 'bg-yellow-500 text-white shadow-md' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }
      `
    },
    bordered: {
      container: 'flex border border-gray-200 rounded-lg overflow-hidden',
      tab: (isActive: boolean) => `
        px-4 py-3 font-medium text-sm transition-all border-r last:border-r-0
        ${isActive 
          ? 'bg-yellow-500 text-white' 
          : 'bg-white text-gray-600 hover:bg-gray-50'
        }
      `
    }
  }

  const styles = variantStyles[variant]

  return (
    <div className={className}>
      {/* Tab Headers */}
      <div className={styles.container}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={styles.tab(activeTab === tab.id)}
          >
            <div className="flex items-center gap-2">
              {tab.icon && <span>{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span className={`
                  ml-1 px-2 py-0.5 text-xs rounded-full
                  ${activeTab === tab.id
                    ? variant === 'pills' || variant === 'bordered'
                      ? 'bg-white text-yellow-600'
                      : 'bg-yellow-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                  }
                `}>
                  {tab.badge}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  )
}
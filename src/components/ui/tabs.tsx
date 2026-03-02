// components/ui/tabs.tsx
'use client'

import { useState, ReactNode } from 'react'

type Tab = {
  id: string
  label: string
  content: ReactNode
  icon?: ReactNode
  badge?: number
  disabled?: boolean
}

type TabsProps = {
  tabs: Tab[]
  defaultTab?: string
  variant?: 'underline' | 'pills' | 'bordered' | 'boxed'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  onChange?: (tabId: string) => void
  className?: string
}

export default function Tabs({
  tabs,
  defaultTab,
  variant = 'underline',
  size = 'md',
  fullWidth = false,
  onChange,
  className = ''
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || '')

  const handleTabClick = (tabId: string) => {
    if (tabs.find(t => t.id === tabId)?.disabled) return
    
    setActiveTab(tabId)
    onChange?.(tabId)
  }

  // Size classes
  const sizeClasses = {
    sm: {
      tab: 'px-3 py-1.5 text-sm',
      icon: 'w-4 h-4',
      badge: 'text-xs'
    },
    md: {
      tab: 'px-4 py-2 text-base',
      icon: 'w-5 h-5',
      badge: 'text-xs'
    },
    lg: {
      tab: 'px-6 py-3 text-lg',
      icon: 'w-6 h-6',
      badge: 'text-sm'
    }
  }

  // Variant classes
  const variantClasses = {
    underline: {
      container: 'border-b border-gray-200',
      tab: (isActive: boolean, disabled: boolean = false) => `
        relative -mb-px
        ${disabled 
          ? 'text-gray-400 cursor-not-allowed' 
          : isActive
            ? 'text-yellow-600 border-b-2 border-yellow-500'
            : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
        }
      `
    },
    pills: {
      container: 'flex flex-wrap gap-2',
      tab: (isActive: boolean, disabled: boolean = false) => `
        rounded-lg
        ${disabled 
          ? 'text-gray-400 bg-gray-100 cursor-not-allowed' 
          : isActive
            ? 'bg-yellow-500 text-white shadow-md'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }
      `
    },
    bordered: {
      container: 'flex',
      tab: (isActive: boolean, disabled: boolean = false) => `
        border border-gray-200 first:rounded-l-lg last:rounded-r-lg -ml-px first:ml-0
        ${disabled 
          ? 'text-gray-400 bg-gray-50 cursor-not-allowed' 
          : isActive
            ? 'bg-yellow-500 text-white border-yellow-500 z-10'
            : 'bg-white text-gray-600 hover:bg-gray-50'
        }
      `
    },
    boxed: {
      container: 'flex bg-gray-100 p-1 rounded-lg',
      tab: (isActive: boolean, disabled: boolean = false) => `
        rounded-md
        ${disabled 
          ? 'text-gray-400 cursor-not-allowed' 
          : isActive
            ? 'bg-white text-yellow-600 shadow'
            : 'text-gray-600 hover:text-gray-800'
        }
      `
    }
  }

  const styles = sizeClasses[size]
  const variantStyle = variantClasses[variant]

  const activeContent = tabs.find(tab => tab.id === activeTab)?.content

  return (
    <div className={className}>
      {/* Tab Headers */}
      <div className={`${variantStyle.container} ${fullWidth ? 'w-full' : ''}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            disabled={tab.disabled}
            className={`
              flex items-center justify-center gap-2
              font-medium transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2
              ${fullWidth ? 'flex-1' : ''}
              ${variantStyle.tab(activeTab === tab.id, tab.disabled)}
              ${styles.tab}
            `}
          >
            {/* Icon */}
            {tab.icon && (
              <span className={styles.icon}>{tab.icon}</span>
            )}

            {/* Label */}
            <span>{tab.label}</span>

            {/* Badge */}
            {tab.badge !== undefined && (
              <span className={`
                px-2 py-0.5 rounded-full
                ${activeTab === tab.id
                  ? variant === 'pills' || variant === 'bordered' || variant === 'boxed'
                    ? 'bg-white text-yellow-600'
                    : 'bg-yellow-500 text-white'
                  : 'bg-gray-200 text-gray-600'
                }
                ${styles.badge}
              `}>
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeContent}
      </div>
    </div>
  )
}
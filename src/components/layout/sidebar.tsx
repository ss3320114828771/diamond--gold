// components/layout/sidebar.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type SidebarItem = {
  name: string
  href: string
  icon: string
  badge?: number
  children?: SidebarItem[]
}

type SidebarProps = {
  items?: SidebarItem[]
  title?: string
  collapsible?: boolean
  showUser?: boolean
  userName?: string
  userEmail?: string
  userAvatar?: string
  onClose?: () => void
  isMobile?: boolean
}

export default function Sidebar({
  items,
  title = 'Menu',
  collapsible = true,
  showUser = true,
  userName = 'Guest User',
  userEmail = 'guest@example.com',
  userAvatar,
  onClose,
  isMobile = false
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const pathname = usePathname()

  // Default sidebar items
  const defaultItems: SidebarItem[] = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: '📊'
    },
    {
      name: 'Products',
      href: '/products',
      icon: '📦',
      children: [
        { name: 'All Products', href: '/products', icon: '📋' },
        { name: 'Add New', href: '/products/add', icon: '➕' },
        { name: 'Categories', href: '/categories', icon: '🏷️' },
        { name: 'Inventory', href: '/inventory', icon: '📊' }
      ]
    },
    {
      name: 'Orders',
      href: '/orders',
      icon: '🛒',
      badge: 5,
      children: [
        { name: 'All Orders', href: '/orders', icon: '📋' },
        { name: 'Pending', href: '/orders/pending', icon: '⏳', badge: 3 },
        { name: 'Processing', href: '/orders/processing', icon: '⚙️', badge: 2 },
        { name: 'Completed', href: '/orders/completed', icon: '✅' },
        { name: 'Cancelled', href: '/orders/cancelled', icon: '❌' }
      ]
    },
    {
      name: 'Customers',
      href: '/customers',
      icon: '👥',
      children: [
        { name: 'All Customers', href: '/customers', icon: '👥' },
        { name: 'Groups', href: '/customers/groups', icon: '👪' },
        { name: 'Reviews', href: '/reviews', icon: '⭐' }
      ]
    },
    {
      name: 'Marketing',
      href: '/marketing',
      icon: '📢',
      children: [
        { name: 'Discounts', href: '/discounts', icon: '🏷️' },
        { name: 'Newsletter', href: '/newsletter', icon: '📧' },
        { name: 'SEO', href: '/seo', icon: '🔍' }
      ]
    },
    {
      name: 'Reports',
      href: '/reports',
      icon: '📈',
      children: [
        { name: 'Sales', href: '/reports/sales', icon: '💰' },
        { name: 'Products', href: '/reports/products', icon: '📦' },
        { name: 'Customers', href: '/reports/customers', icon: '👥' }
      ]
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: '⚙️',
      children: [
        { name: 'General', href: '/settings', icon: '⚙️' },
        { name: 'Payment', href: '/settings/payment', icon: '💳' },
        { name: 'Shipping', href: '/settings/shipping', icon: '📦' },
        { name: 'Taxes', href: '/settings/taxes', icon: '💰' },
        { name: 'Users', href: '/users', icon: '👥' }
      ]
    }
  ]

  const sidebarItems = items || defaultItems

  const toggleExpand = (itemName: string) => {
    setExpandedItems(prev =>
      prev.includes(itemName)
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    )
  }

  const isActive = (href: string) => {
    if (href === '/') return pathname === href
    return pathname.startsWith(href)
  }

  const sidebarClasses = `
    h-full bg-white shadow-xl transition-all duration-300
    ${isCollapsed && collapsible ? 'w-20' : 'w-64'}
    ${isMobile ? 'fixed inset-y-0 left-0 z-50' : 'relative'}
  `

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      <aside className={sidebarClasses}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b flex items-center justify-between">
            {!isCollapsed ? (
              <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            ) : (
              <span className="text-2xl mx-auto">📋</span>
            )}
            
            {collapsible && !isMobile && (
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition"
              >
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    isCollapsed ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                  />
                </svg>
              </button>
            )}

            {isMobile && (
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* User Info */}
          {showUser && !isCollapsed && (
            <div className="p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold">
                  {userAvatar ? (
                    <img src={userAvatar} alt={userName} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    userName.charAt(0).toUpperCase()
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 truncate">{userName}</p>
                  <p className="text-xs text-gray-500 truncate">{userEmail}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="space-y-1 px-2">
              {sidebarItems.map((item) => (
                <div key={item.name}>
                  {item.children ? (
                    // Item with children
                    <div>
                      <button
                        onClick={() => toggleExpand(item.name)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition ${
                          isActive(item.href)
                            ? 'bg-yellow-50 text-yellow-600'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{item.icon}</span>
                          {!isCollapsed && (
                            <>
                              <span className="font-medium">{item.name}</span>
                              {item.badge && (
                                <span className="ml-auto px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                                  {item.badge}
                                </span>
                              )}
                            </>
                          )}
                        </div>
                        {!isCollapsed && (
                          <svg
                            className={`w-4 h-4 transition-transform ${
                              expandedItems.includes(item.name) ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        )}
                      </button>

                      {/* Submenu */}
                      {!isCollapsed && (
                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            expandedItems.includes(item.name) ? 'max-h-96' : 'max-h-0'
                          }`}
                        >
                          <div className="pl-11 py-1 space-y-1">
                            {item.children.map((child) => (
                              <Link
                                key={child.name}
                                href={child.href}
                                className={`flex items-center justify-between px-3 py-2 text-sm rounded-lg transition ${
                                  isActive(child.href)
                                    ? 'text-yellow-600 bg-yellow-50'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-yellow-600'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <span>{child.icon}</span>
                                  <span>{child.name}</span>
                                </div>
                                {child.badge && (
                                  <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                                    {child.badge}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    // Regular item
                    <Link
                      href={item.href}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg transition ${
                        isActive(item.href)
                          ? 'bg-yellow-50 text-yellow-600'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{item.icon}</span>
                        {!isCollapsed && (
                          <>
                            <span className="font-medium">{item.name}</span>
                            {item.badge && (
                              <span className="ml-auto px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* Footer */}
          {!isCollapsed && (
            <div className="p-4 border-t">
              <div className="text-center text-xs text-gray-500">
                <p className="mb-1">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
                <p>Version 1.0.0</p>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
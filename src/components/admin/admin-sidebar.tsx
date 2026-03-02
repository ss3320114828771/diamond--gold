// components/admin/admin-sidebar.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavItem = {
  name: string
  href: string
  icon: string
}

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
  { name: 'Products', href: '/admin/products', icon: '📦' },
  { name: 'Orders', href: '/admin/orders', icon: '🛒' },
  { name: 'Users', href: '/admin/users', icon: '👥' },
  { name: 'Settings', href: '/admin/settings', icon: '⚙️' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + '/')
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`
        hidden lg:block bg-white shadow-lg h-[calc(100vh-4rem)] 
        transition-all duration-300 overflow-y-auto
        ${isCollapsed ? 'w-20' : 'w-64'}
      `}>
        <div className="p-4">
          {/* Toggle Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full mb-6 p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition flex justify-center"
          >
            {isCollapsed ? '→' : '←'}
          </button>

          {/* Bismillah */}
          {!isCollapsed && (
            <div className="text-center mb-6 pb-4 border-b">
              <p className="text-sm text-gray-600">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
            </div>
          )}

          {/* Navigation */}
          <nav className="space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition
                  ${isActive(item.href)
                    ? 'bg-yellow-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                  ${isCollapsed ? 'justify-center' : ''}
                `}
                title={isCollapsed ? item.name : undefined}
              >
                <span className="text-xl">{item.icon}</span>
                {!isCollapsed && <span className="font-medium">{item.name}</span>}
              </Link>
            ))}
          </nav>

          {/* Quick Stats - Only when expanded */}
          {!isCollapsed && (
            <div className="mt-8 pt-4 border-t">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Quick Stats
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Products</span>
                  <span className="font-bold">89</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Orders</span>
                  <span className="font-bold">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Users</span>
                  <span className="font-bold">234</span>
                </div>
              </div>
            </div>
          )}

          {/* Logout Button */}
          <button className={`
            w-full mt-8 px-4 py-3 bg-red-500 text-white rounded-lg 
            hover:bg-red-600 transition flex items-center gap-2
            ${isCollapsed ? 'justify-center' : ''}
          `}>
            <span>🚪</span>
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
        <div className="flex justify-around items-center h-16">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex flex-col items-center justify-center flex-1 h-full
                ${isActive(item.href) ? 'text-yellow-600' : 'text-gray-600 hover:text-yellow-600'}
              `}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
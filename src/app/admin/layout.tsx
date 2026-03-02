// app/admin/layout.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
    { name: 'Products', href: '/admin/products', icon: '📦' },
    { name: 'Orders', href: '/admin/orders', icon: '🛒' },
    { name: 'Users', href: '/admin/users', icon: '👥' },
    { name: 'Settings', href: '/admin/settings', icon: '⚙️' },
  ]

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + '/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <header className="bg-gradient-to-r from-amber-700 to-yellow-700 text-white sticky top-0 z-20">
        <div className="px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Mobile Menu Button */}
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 mr-2 hover:bg-white/10 rounded"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
              <Link href="/admin/dashboard" className="text-xl font-bold">
                Admin Panel
              </Link>
            </div>

            {/* Admin Info */}
            <div className="flex items-center gap-4">
              <span className="hidden md:block text-sm">Hafiz Sajid Syed</span>
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">HS</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 transform 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 transition duration-200 ease-in-out
          z-30 w-64 bg-white shadow-lg h-[calc(100vh-4rem)] overflow-y-auto
        `}>
          <div className="p-4">
            {/* Bismillah in Sidebar */}
            <div className="text-center mb-6 pb-4 border-b">
              <p className="text-sm text-gray-600">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
            </div>

            {/* Navigation */}
            <nav className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition
                    ${isActive(item.href)
                      ? 'bg-yellow-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </nav>

            {/* Quick Stats */}
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

            {/* Logout Button */}
            <button className="w-full mt-8 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center justify-center gap-2">
              <span>🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-4rem)] overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
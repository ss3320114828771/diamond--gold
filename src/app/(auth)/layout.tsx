// app/(auth)/layout.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const isLogin = pathname === '/login'
  const isRegister = pathname === '/register'
  const isForgotPassword = pathname === '/forgot-password'

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-orange-800">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] bg-repeat" />
      </div>

      {/* Header */}
      <header className="relative z-10 py-4 px-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="text-white text-2xl font-bold">
            HS Gold
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Auth Tabs */}
          <div className="flex justify-center space-x-4 mb-8">
            <Link
              href="/login"
              className={`px-6 py-3 rounded-lg font-bold transition ${
                isLogin 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Login
            </Link>
            <Link
              href="/register"
              className={`px-6 py-3 rounded-lg font-bold transition ${
                isRegister 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Register
            </Link>
          </div>

          {/* Auth Forms */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
            {children}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 px-4 text-center text-white/60 text-sm">
        <p>© 2024 HS Gold & Diamonds. All rights reserved.</p>
        <p className="mt-2">Hafiz Sajid Syed | sajid.syed@gmail.com</p>
      </footer>
    </div>
  )
}
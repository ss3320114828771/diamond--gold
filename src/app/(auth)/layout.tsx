// app/(auth)/layout.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isLogin = pathname === '/login'
  const isRegister = pathname === '/register'
  const isForgotPassword = pathname === '/forgot-password'

  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
        {/* Luxury Pattern Overlay */}
        <div className="absolute inset-0 opacity-10"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5L55 30L30 55L5 30L30 5Z' fill='none' stroke='gold' stroke-width='0.5'/%3E%3C/svg%3E")`,
               backgroundSize: '60px 60px'
             }}>
        </div>

        {/* Animated Gradients */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        
        {/* Gold Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400/30 rounded-full animate-twinkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="relative z-20 py-4 px-4 sm:px-6 lg:px-8">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="group">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full 
                            flex items-center justify-center transform group-hover:rotate-180 
                            transition-transform duration-700">
                <span className="text-2xl">✨</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 
                             bg-clip-text text-transparent">
                HS GOLD
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" 
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 
                           font-medium">
              Home
            </Link>
            <Link href="/products" 
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 
                           font-medium">
              Products
            </Link>
            <Link href="/about" 
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 
                           font-medium">
              About
            </Link>
            <Link href="/contact" 
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 
                           font-medium">
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button - Optional */}
          <button className="md:hidden text-white p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main id="auth-content" className="relative z-10 flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Auth Navigation Tabs */}
          <div className="mb-8 flex justify-center space-x-4">
            <Link
              href="/login"
              className={`px-6 py-3 rounded-xl font-bold text-lg transition-all duration-300
                        ${isLogin 
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-[0_0_30px_rgba(255,215,0,0.5)]' 
                          : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'}`}
            >
              Login
            </Link>
            <Link
              href="/register"
              className={`px-6 py-3 rounded-xl font-bold text-lg transition-all duration-300
                        ${isRegister 
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-[0_0_30px_rgba(255,215,0,0.5)]' 
                          : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'}`}
            >
              Register
            </Link>
          </div>

          {/* Current Page Content */}
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 py-6 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <p className="text-gray-400 text-sm">
              © 2024 Hafiz Sajid Gold & Diamonds. All rights reserved.
            </p>

            {/* Quick Links */}
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">
                Terms
              </Link>
              <Link href="/directions" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">
                Directions
              </Link>
            </div>

            {/* Admin Info */}
            <p className="text-gray-400 text-sm">
              Admin: <span className="text-yellow-400">Hafiz Sajid Syed</span>
            </p>
          </div>
        </div>
      </footer>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
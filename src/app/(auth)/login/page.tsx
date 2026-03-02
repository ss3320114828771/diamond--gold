// app/(auth)/login/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simulate login - Replace with actual authentication
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Demo credentials
      if (formData.email === 'admin@hsgold.com' && formData.password === 'admin123') {
        router.push('/admin/dashboard')
      } else if (formData.email === 'sajid.syed@gmail.com' && formData.password === 'admin123') {
        router.push('/admin/dashboard')
      } else if (formData.email && formData.password) {
        router.push('/')
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (err) {
      setError('Invalid email or password. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-orange-800 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Floating Jewels Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-3xl md:text-4xl animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
              opacity: 0.2
            }}
          >
            {i % 3 === 0 ? '💎' : i % 3 === 1 ? '✨' : '👑'}
          </div>
        ))}
      </div>

      {/* Main Login Card */}
      <div className="relative w-full max-w-md">
        {/* Decorative Border Animation */}
        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 rounded-3xl blur-xl opacity-75 animate-pulse"></div>
        
        <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-10 border-2 border-white/30 shadow-[0_0_80px_rgba(255,215,0,0.4)] transform hover:scale-[1.02] transition-all duration-500">
          
          {/* Bismillah */}
          <div className="text-center mb-8">
            <p className="text-3xl md:text-4xl text-yellow-300 font-arabic mb-4 animate-pulse">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full"></div>
          </div>

          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4 animate-bounce">
              <span className="text-4xl">✨</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-200 text-lg">
              Hafiz Sajid Gold & Diamonds
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border-2 border-red-500 rounded-xl backdrop-blur-sm animate-shake">
              <p className="text-white text-center flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-red-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-yellow-300 font-bold mb-2 text-lg flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Email Address
              </label>
              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-white/10 border-2 border-white/30 rounded-xl
                           text-white placeholder-gray-300 text-lg
                           focus:outline-none focus:border-yellow-400 focus:bg-white/20
                           transition-all duration-300 group-hover:border-yellow-300
                           peer"
                  placeholder="Enter your email"
                />
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 
                              transition-opacity duration-300 pointer-events-none
                              shadow-[0_0_30px_rgba(255,215,0,0.3)]"></div>
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-yellow-300 font-bold mb-2 text-lg flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Password
              </label>
              <div className="relative group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-white/10 border-2 border-white/30 rounded-xl
                           text-white placeholder-gray-300 text-lg
                           focus:outline-none focus:border-yellow-400 focus:bg-white/20
                           transition-all duration-300 group-hover:border-yellow-300
                           pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 
                           text-gray-300 hover:text-yellow-300 transition-colors duration-300"
                >
                  {showPassword ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-5 h-5 text-yellow-400 bg-white/10 border-2 border-white/30 
                           rounded focus:ring-yellow-400 focus:ring-2 
                           cursor-pointer transition-all duration-300
                           group-hover:border-yellow-300"
                />
                <span className="ml-2 text-gray-200 group-hover:text-yellow-300 transition-colors duration-300">
                  Remember me
                </span>
              </label>
              
              <Link
                href="/forgot-password"
                className="text-gray-200 hover:text-yellow-300 transition-colors duration-300 
                         text-sm font-medium underline decoration-transparent 
                         hover:decoration-yellow-300 underline-offset-2"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-5 px-6 bg-gradient-to-r from-yellow-400 to-orange-500
                       text-white font-bold rounded-xl text-xl
                       hover:from-yellow-500 hover:to-orange-600
                       transform hover:scale-105 hover:rotate-1
                       transition-all duration-300
                       shadow-[0_0_40px_rgba(255,215,0,0.5)]
                       disabled:opacity-50 disabled:cursor-not-allowed
                       disabled:hover:scale-100 disabled:hover:rotate-0
                       relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center">
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    SIGNING IN...
                  </>
                ) : (
                  'SIGN IN'
                )}
              </span>
              <div className="absolute inset-0 bg-white/20 transform -translate-x-full 
                            group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
            <p className="text-yellow-300 text-sm text-center mb-2 font-bold">
              ⚡ Demo Credentials
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
              <div>
                <p className="font-bold">Admin:</p>
                <p>admin@hsgold.com</p>
                <p>admin123</p>
              </div>
              <div>
                <p className="font-bold">Customer:</p>
                <p>customer@test.com</p>
                <p>customer123</p>
              </div>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <span className="text-gray-300">New to HS Gold? </span>
            <Link
              href="/register"
              className="text-yellow-300 hover:text-yellow-400 font-bold text-lg
                       hover:underline decoration-2 underline-offset-2 
                       transition-all duration-300"
            >
              Create Account
            </Link>
          </div>

          {/* Admin Info */}
          <div className="mt-8 pt-6 border-t-2 border-white/20 text-center">
            <p className="text-gray-300 text-sm flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Administrator: <span className="text-yellow-300 font-bold">Hafiz Sajid Syed</span>
            </p>
            <p className="text-gray-300 text-sm mt-1">
              📧 <span className="text-yellow-300">sajid.syed@gmail.com</span>
            </p>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.2;
          }
          50% { 
            transform: translateY(-30px) rotate(10deg); 
            opacity: 0.4;
          }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  )
}
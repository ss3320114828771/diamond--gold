// app/(auth)/forgot-password/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simulate API call
    try {
      // In real app, call your API
      await new Promise(resolve => setTimeout(resolve, 1500))
      setIsSubmitted(true)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Success State
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-orange-800 flex items-center justify-center p-4">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 max-w-md w-full border-2 border-white/20 shadow-[0_0_50px_rgba(255,215,0,0.3)] animate-[float_3s_ease-in-out_infinite]">
          {/* Bismillah */}
          <div className="text-center mb-8">
            <p className="text-3xl text-yellow-300 font-arabic mb-4 animate-pulse">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
          </div>

          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-bounce">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center text-white mb-4">
            Check Your Email
          </h2>
          
          <p className="text-gray-200 text-center mb-8">
            We've sent a password reset link to:<br />
            <span className="text-yellow-300 font-bold text-xl block mt-2">{email}</span>
          </p>

          <div className="space-y-4">
            <Link
              href="/login"
              className="block w-full py-4 px-6 bg-gradient-to-r from-yellow-400 to-orange-500 
                       text-white font-bold rounded-xl text-center text-lg
                       hover:from-yellow-500 hover:to-orange-600 
                       transform hover:scale-105 transition-all duration-300
                       shadow-[0_0_30px_rgba(255,215,0,0.5)]"
            >
              Return to Login
            </Link>
            
            <button
              onClick={() => setIsSubmitted(false)}
              className="block w-full py-4 px-6 bg-white/10 backdrop-blur-sm
                       text-white font-bold rounded-xl text-center text-lg
                       hover:bg-white/20 transform hover:scale-105 transition-all duration-300
                       border-2 border-white/50"
            >
              Try Another Email
            </button>
          </div>

          {/* Contact Support */}
          <p className="text-center text-gray-300 mt-6">
            Didn't receive the email?{' '}
            <Link href="/contact" className="text-yellow-300 hover:text-yellow-400 underline">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    )
  }

  // Forgot Password Form
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Floating Gold Coins Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              opacity: 0.3
            }}
          >
            {i % 2 === 0 ? '✨' : '💎'}
          </div>
        ))}
      </div>

      {/* Main Form Card */}
      <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 max-w-md w-full border-2 border-white/20 shadow-[0_0_70px_rgba(255,215,0,0.4)] transform hover:scale-105 transition-all duration-500">
        
        {/* Bismillah */}
        <div className="text-center mb-8">
          <p className="text-3xl text-yellow-300 font-arabic mb-4 animate-pulse">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Forgot Password?
          </h1>
          <p className="text-gray-200">
            Enter your email to reset your password
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border-2 border-red-500 rounded-xl text-white text-center animate-shake">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-yellow-300 font-bold mb-2 text-lg">
              Email Address
            </label>
            <div className="relative group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-6 py-4 bg-white/10 border-2 border-white/30 rounded-xl
                         text-white placeholder-gray-300 text-lg
                         focus:outline-none focus:border-yellow-400 focus:bg-white/20
                         transition-all duration-300 group-hover:border-yellow-300"
                placeholder="Enter your email"
              />
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 
                            transition-opacity duration-300 pointer-events-none
                            shadow-[0_0_30px_rgba(255,215,0,0.3)]"></div>
            </div>
          </div>

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
                  SENDING...
                </>
              ) : (
                'SEND RESET LINK'
              )}
            </span>
            <div className="absolute inset-0 bg-white/20 transform -translate-x-full 
                          group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>
        </form>

        {/* Additional Options */}
        <div className="mt-8 space-y-4">
          <Link
            href="/login"
            className="block text-center text-gray-200 hover:text-yellow-300 
                     transition-colors duration-300 text-lg"
          >
            ← Back to Login
          </Link>

          <div className="text-center">
            <span className="text-gray-300">Don't have an account? </span>
            <Link
              href="/register"
              className="text-yellow-300 hover:text-yellow-400 font-bold text-lg
                       hover:underline transition-all duration-300"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Admin Contact Info */}
        <div className="mt-8 pt-6 border-t-2 border-white/20 text-center">
          <p className="text-gray-300 text-sm">
            Administrator: <span className="text-yellow-300 font-bold">Hafiz Sajid Syed</span>
          </p>
          <p className="text-gray-300 text-sm">
            Email: <span className="text-yellow-300">sajid.syed@gmail.com</span>
          </p>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  )
}
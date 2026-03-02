// components/home/newsletter.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

type NewsletterProps = {
  title?: string
  subtitle?: string
  buttonText?: string
  placeholder?: string
  onSubmit?: (email: string) => void
  showPrivacy?: boolean
  background?: 'light' | 'dark' | 'gradient'
}

export default function Newsletter({
  title = 'Subscribe to Our Newsletter',
  subtitle = 'Get the latest updates on new collections, special offers, and jewelry care tips.',
  buttonText = 'Subscribe',
  placeholder = 'Enter your email address',
  onSubmit,
  showPrivacy = true,
  background = 'gradient'
}: NewsletterProps) {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email) {
      setError('Email is required')
      return
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      if (onSubmit) {
        onSubmit(email)
      }
      
      setIsSubscribed(true)
      setEmail('')
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Background classes
  const bgClasses = {
    light: 'bg-gray-50',
    dark: 'bg-gray-900 text-white',
    gradient: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
  }

  if (isSubscribed) {
    return (
      <section className={`py-16 ${bgClasses[background]}`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Thank You!</h2>
            <p className="text-xl opacity-90 mb-8">
              You've successfully subscribed to our newsletter.
            </p>
            <p className="text-sm opacity-75">
              We'll send you the latest updates on new collections and exclusive offers.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={`py-16 ${bgClasses[background]}`}>
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-8">
            {/* Icon */}
            <div className="inline-block p-3 bg-yellow-400 rounded-full mb-4">
              <svg className="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>

            {/* Title */}
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              background === 'light' ? 'text-gray-800' : 'text-white'
            }`}>
              {title}
            </h2>

            {/* Subtitle */}
            <p className={`text-lg max-w-2xl mx-auto ${
              background === 'light' ? 'text-gray-600' : 'text-white/80'
            }`}>
              {subtitle}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={placeholder}
                  className={`w-full px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                    background === 'light' 
                      ? 'bg-white border border-gray-300 text-gray-900' 
                      : 'bg-white/20 backdrop-blur-sm text-white placeholder-white/70 border border-white/30'
                  } ${error ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                  disabled={isLoading}
                />
                {error && (
                  <p className="text-red-500 text-sm mt-2 text-left">{error}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`px-8 py-4 bg-yellow-500 text-gray-900 font-bold rounded-xl hover:bg-yellow-400 transition transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 ${
                  isLoading ? 'cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Subscribing...</span>
                  </span>
                ) : (
                  buttonText
                )}
              </button>
            </div>

            {/* Privacy Policy */}
            {showPrivacy && (
              <p className={`text-xs text-center mt-4 ${
                background === 'light' ? 'text-gray-500' : 'text-white/60'
              }`}>
                By subscribing, you agree to our{' '}
                <Link href="/privacy" className="text-yellow-400 hover:text-yellow-300 underline">
                  Privacy Policy
                </Link>{' '}
                and consent to receive updates from our company.
              </p>
            )}
          </form>

          {/* Benefits */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="text-center">
              <div className="text-2xl mb-2">📦</div>
              <p className={`text-sm font-medium ${
                background === 'light' ? 'text-gray-700' : 'text-white'
              }`}>New Arrivals</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🏷️</div>
              <p className={`text-sm font-medium ${
                background === 'light' ? 'text-gray-700' : 'text-white'
              }`}>Exclusive Offers</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">💎</div>
              <p className={`text-sm font-medium ${
                background === 'light' ? 'text-gray-700' : 'text-white'
              }`}>Care Tips</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🎁</div>
              <p className={`text-sm font-medium ${
                background === 'light' ? 'text-gray-700' : 'text-white'
              }`}>Special Gifts</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
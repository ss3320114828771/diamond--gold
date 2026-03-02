// components/auth/forgot-password-form.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

type ForgotPasswordFormProps = {
  onSuccess?: () => void
  onCancel?: () => void
}

export default function ForgotPasswordForm({ onSuccess, onCancel }: ForgotPasswordFormProps) {
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
      await new Promise(resolve => setTimeout(resolve, 1500))
      setIsSubmitted(true)
      if (onSuccess) onSuccess()
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Check Your Email</h3>
        <p className="text-gray-600 mb-6">
          We've sent a password reset link to <strong className="text-gray-800">{email}</strong>
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="text-yellow-600 hover:text-yellow-700 font-medium"
        >
          Try another email
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Forgot Password?</h2>
        <p className="text-gray-600 mt-2">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
            placeholder="you@example.com"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-yellow-500 text-white rounded-lg font-bold hover:bg-yellow-600 transition disabled:opacity-50 mb-3"
        >
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </button>

        <div className="text-center">
          <Link href="/login" className="text-sm text-gray-600 hover:text-yellow-600">
            ← Back to Login
          </Link>
        </div>
      </form>

      {onCancel && (
        <button
          onClick={onCancel}
          className="mt-3 w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
        >
          Cancel
        </button>
      )}
    </div>
  )
}
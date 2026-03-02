// components/shared/admin-info.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type AdminInfoProps = {
  name?: string
  email?: string
  phone?: string
  role?: string
  avatar?: string
  showDetails?: boolean
  showContact?: boolean
  variant?: 'bar' | 'card' | 'minimal'
  className?: string
}

export default function AdminInfo({
  name = 'Hafiz Sajid Syed',
  email = 'sajid.syed@gmail.com',
  phone = '+1 (234) 567-890',
  role = 'Administrator',
  avatar,
  showDetails = true,
  showContact = true,
  variant = 'bar',
  className = ''
}: AdminInfoProps) {
  const [showQR, setShowQR] = useState(false)

  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`
  }

  const handlePhoneClick = () => {
    window.location.href = `tel:${phone.replace(/\D/g, '')}`
  }

  // Variant styles
  const variantStyles = {
    bar: {
      container: 'bg-gray-100 py-3 px-4',
      content: 'flex flex-wrap items-center justify-center gap-4 text-sm'
    },
    card: {
      container: 'bg-white rounded-lg shadow-lg p-6',
      content: 'space-y-4'
    },
    minimal: {
      container: 'text-sm',
      content: 'flex items-center gap-2'
    }
  }

  const styles = variantStyles[variant]

  if (variant === 'minimal') {
    return (
      <div className={`${styles.container} ${className}`}>
        <div className={styles.content}>
          <span className="text-gray-600">👤</span>
          <span className="font-medium text-gray-800">{name}</span>
          <span className="text-gray-400">|</span>
          <a href={`mailto:${email}`} className="text-yellow-600 hover:text-yellow-700">
            {email}
          </a>
        </div>
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <div className={`${styles.container} ${className}`}>
        <div className={styles.content}>
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gradient-to-r from-yellow-400 to-orange-500">
              {avatar ? (
                <Image
                  src={avatar}
                  alt={name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">
                  {name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{name}</h3>
              <p className="text-yellow-600">{role}</p>
            </div>
          </div>

          {/* Details */}
          {showDetails && (
            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-600 mb-2">
                Managing all aspects of HS Gold & Diamonds, ensuring quality and customer satisfaction since 1999.
              </p>
            </div>
          )}

          {/* Contact Info */}
          {showContact && (
            <div className="space-y-2 border-t border-gray-200 pt-4">
              <button
                onClick={handleEmailClick}
                className="w-full flex items-center gap-3 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <span className="text-xl">✉️</span>
                <span className="flex-1 text-left text-gray-700">{email}</span>
                <span className="text-xs text-gray-400">Click to email</span>
              </button>
              <button
                onClick={handlePhoneClick}
                className="w-full flex items-center gap-3 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <span className="text-xl">📞</span>
                <span className="flex-1 text-left text-gray-700">{phone}</span>
                <span className="text-xs text-gray-400">Click to call</span>
              </button>
            </div>
          )}

          {/* QR Code Toggle (optional) */}
          <button
            onClick={() => setShowQR(!showQR)}
            className="w-full mt-2 text-sm text-yellow-600 hover:text-yellow-700 flex items-center justify-center gap-1"
          >
            <span>{showQR ? 'Hide' : 'Show'} QR Code</span>
            <svg className={`w-4 h-4 transition-transform ${showQR ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* QR Code (simplified) */}
          {showQR && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center">
              <div className="w-32 h-32 mx-auto bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-2xl">📱</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">Scan to save contact</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Default bar variant
  return (
    <div className={`${styles.container} ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className={styles.content}>
          {/* Admin Icon */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {name.charAt(0)}
            </div>
            <span className="font-medium text-gray-800">{name}</span>
            <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded-full">
              {role}
            </span>
          </div>

          {/* Contact Info */}
          {showContact && (
            <>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-1 text-gray-600 hover:text-yellow-600 transition"
              >
                <span className="text-sm">✉️</span>
                <span className="text-sm hidden sm:inline">{email}</span>
              </a>

              <a
                href={`tel:${phone.replace(/\D/g, '')}`}
                className="flex items-center gap-1 text-gray-600 hover:text-yellow-600 transition"
              >
                <span className="text-sm">📞</span>
                <span className="text-sm hidden sm:inline">{phone}</span>
              </a>
            </>
          )}

          {/* Bismillah */}
          <span className="text-xs text-gray-500 hidden md:inline">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </span>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="text-xs bg-yellow-500 text-white px-3 py-1 rounded-full hover:bg-yellow-600 transition"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
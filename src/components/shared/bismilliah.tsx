// components/shared/bismillah.tsx
'use client'

import { useState, useEffect } from 'react'

type BismillahProps = {
  variant?: 'full' | 'short' | 'icon'
  showTranslation?: boolean
  showTransliteration?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: string
  className?: string
  animated?: boolean
  onClick?: () => void
}

export default function Bismillah({
  variant = 'full',
  showTranslation = false,
  showTransliteration = false,
  size = 'md',
  color = 'text-yellow-600',
  className = '',
  animated = true,
  onClick
}: BismillahProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Arabic text variations
  const arabicText = {
    full: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    short: 'بِسْمِ اللَّهِ',
    icon: '﷽' // Unicode ligature for Bismillah
  }

  // Translations
  const translation = 'In the name of Allah, the Most Gracious, the Most Merciful'
  const transliteration = 'Bismillah hir-Rahman nir-Rahim'

  // Size classes
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-2xl'
  }

  // Arabic font size (larger for Arabic text)
  const arabicSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  }

  // Animation classes
  const animationClasses = animated
    ? 'transition-all duration-300 hover:scale-105 hover:text-yellow-500 cursor-pointer'
    : ''

  if (variant === 'icon') {
    return (
      <span
        className={`inline-block ${sizeClasses[size]} ${color} ${animationClasses} ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        title={translation}
      >
        {arabicText.icon}
      </span>
    )
  }

  return (
    <div
      className={`inline-block text-center ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Arabic Text */}
      <div
        className={`
          ${arabicSizeClasses[size]} 
          ${color} 
          ${animationClasses}
          font-arabic
          leading-relaxed
        `}
        dir="rtl"
      >
        {arabicText[variant]}
      </div>

      {/* Transliteration */}
      {showTransliteration && (
        <div
          className={`
            ${sizeClasses[size]} 
            text-gray-500 
            mt-1
            transition-all duration-300
            ${isHovered ? 'opacity-100' : 'opacity-70'}
          `}
        >
          {transliteration}
        </div>
      )}

      {/* Translation */}
      {showTranslation && (
        <div
          className={`
            ${sizeClasses[size]} 
            text-gray-600 
            mt-1
            transition-all duration-300
            ${isHovered ? 'opacity-100' : 'opacity-70'}
          `}
        >
          "{translation}"
        </div>
      )}
    </div>
  )
}
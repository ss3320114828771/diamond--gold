// components/shared/social-share.tsx
'use client'

import { useState } from 'react'

type SocialShareProps = {
  url?: string
  title?: string
  description?: string
  image?: string
  hashtags?: string[]
  variant?: 'icons' | 'buttons' | 'minimal'
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
}

export default function SocialShare({
  url = typeof window !== 'undefined' ? window.location.href : '',
  title = 'Check this out!',
  description = 'Amazing gold and diamond jewelry at HS Gold',
  image,
  hashtags = ['HSGold', 'Jewelry', 'Gold', 'Diamonds'],
  variant = 'icons',
  size = 'md',
  showLabel = false,
  className = ''
}: SocialShareProps) {
  const [copied, setCopied] = useState(false)

  // Encode for URLs
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description)
  const hashtagString = hashtags.map(tag => `%23${tag}`).join(',')

  // Social media share URLs
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&hashtags=${hashtags.join(',')}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${image}&description=${encodedDescription}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  }

  // Social media config
  const socialConfig = [
    {
      id: 'facebook',
      name: 'Facebook',
      icon: '📘',
      color: 'bg-blue-600 hover:bg-blue-700',
      url: shareUrls.facebook,
      label: 'Share on Facebook'
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: '🐦',
      color: 'bg-sky-500 hover:bg-sky-600',
      url: shareUrls.twitter,
      label: 'Share on Twitter'
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: '📱',
      color: 'bg-green-500 hover:bg-green-600',
      url: shareUrls.whatsapp,
      label: 'Share on WhatsApp'
    },
    {
      id: 'telegram',
      name: 'Telegram',
      icon: '✈️',
      color: 'bg-blue-500 hover:bg-blue-600',
      url: shareUrls.telegram,
      label: 'Share on Telegram'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: '🔗',
      color: 'bg-blue-700 hover:bg-blue-800',
      url: shareUrls.linkedin,
      label: 'Share on LinkedIn'
    },
    {
      id: 'pinterest',
      name: 'Pinterest',
      icon: '📌',
      color: 'bg-red-600 hover:bg-red-700',
      url: shareUrls.pinterest,
      label: 'Pin on Pinterest'
    },
    {
      id: 'email',
      name: 'Email',
      icon: '✉️',
      color: 'bg-gray-600 hover:bg-gray-700',
      url: shareUrls.email,
      label: 'Share via Email'
    }
  ]

  // Copy to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // Size classes
  const sizeClasses = {
    sm: {
      icon: 'w-8 h-8 text-sm',
      button: 'px-3 py-1.5 text-sm',
      copy: 'px-3 py-1.5 text-sm'
    },
    md: {
      icon: 'w-10 h-10 text-base',
      button: 'px-4 py-2 text-base',
      copy: 'px-4 py-2 text-base'
    },
    lg: {
      icon: 'w-12 h-12 text-lg',
      button: 'px-6 py-3 text-lg',
      copy: 'px-6 py-3 text-lg'
    }
  }

  // Open share window
  const openShareWindow = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'width=600,height=400')
  }

  // Icons variant
  if (variant === 'icons') {
    return (
      <div className={`flex flex-wrap items-center gap-2 ${className}`}>
        {socialConfig.map((social) => (
          <button
            key={social.id}
            onClick={() => openShareWindow(social.url)}
            className={`
              ${sizeClasses[size].icon}
              ${social.color}
              text-white rounded-full flex items-center justify-center
              transition-transform hover:scale-110
            `}
            aria-label={social.label}
            title={social.label}
          >
            <span>{social.icon}</span>
          </button>
        ))}

        {/* Copy Link Button */}
        <button
          onClick={copyToClipboard}
          className={`
            ${sizeClasses[size].icon}
            bg-gray-100 hover:bg-gray-200 text-gray-600
            rounded-full flex items-center justify-center
            transition-transform hover:scale-110 relative
          `}
          aria-label="Copy link"
          title="Copy link"
        >
          <span>{copied ? '✓' : '🔗'}</span>
          
          {/* Tooltip */}
          {copied && (
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              Copied!
            </span>
          )}
        </button>
      </div>
    )
  }

  // Buttons variant
  if (variant === 'buttons') {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {socialConfig.slice(0, 4).map((social) => (
          <button
            key={social.id}
            onClick={() => openShareWindow(social.url)}
            className={`
              ${sizeClasses[size].button}
              ${social.color}
              text-white rounded-lg flex items-center gap-2
              transition-transform hover:scale-105
            `}
          >
            <span>{social.icon}</span>
            {showLabel && <span>{social.name}</span>}
          </button>
        ))}

        {/* Copy Link Button */}
        <button
          onClick={copyToClipboard}
          className={`
            ${sizeClasses[size].button}
            bg-gray-100 hover:bg-gray-200 text-gray-700
            rounded-lg flex items-center gap-2
            transition-transform hover:scale-105
          `}
        >
          <span>{copied ? '✓' : '🔗'}</span>
          {showLabel && <span>{copied ? 'Copied!' : 'Copy Link'}</span>}
        </button>
      </div>
    )
  }

  // Minimal variant
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm text-gray-500">Share:</span>
      <div className="flex gap-1">
        {socialConfig.slice(0, 3).map((social) => (
          <button
            key={social.id}
            onClick={() => openShareWindow(social.url)}
            className="w-7 h-7 hover:bg-gray-100 rounded-full flex items-center justify-center transition"
            aria-label={social.label}
          >
            <span className="text-sm">{social.icon}</span>
          </button>
        ))}
        <button
          onClick={copyToClipboard}
          className="w-7 h-7 hover:bg-gray-100 rounded-full flex items-center justify-center transition relative"
          aria-label="Copy link"
        >
          <span className="text-sm">{copied ? '✓' : '🔗'}</span>
          {copied && (
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
              Copied!
            </span>
          )}
        </button>
      </div>
    </div>
  )
}
// components/ui/footer.tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'

type FooterColumn = {
  title: string
  links: {
    label: string
    href: string
    icon?: React.ReactNode
  }[]
}

type FooterProps = {
  logo?: React.ReactNode
  brandName?: string
  brandDescription?: string
  columns?: FooterColumn[]
  socialLinks?: {
    platform: string
    href: string
    icon: React.ReactNode
    color?: string
  }[]
  paymentMethods?: {
    name: string
    icon: React.ReactNode
  }[]
  showNewsletter?: boolean
  showCopyright?: boolean
  copyrightText?: string
  className?: string
}

export default function Footer({
  logo,
  brandName = 'HS Gold',
  brandDescription = 'Premium gold and diamond jewelry since 1999. Handcrafted excellence with certified quality.',
  columns = [
    {
      title: 'Quick Links',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Contact Us', href: '/contact' },
        { label: 'Directions', href: '/directions' },
        { label: 'Health Benefits', href: '/health-benefits' }
      ]
    },
    {
      title: 'Categories',
      links: [
        { label: 'Gold Necklaces', href: '/categories/gold/necklaces' },
        { label: 'Gold Earrings', href: '/categories/gold/earrings' },
        { label: 'Gold Rings', href: '/categories/gold/rings' },
        { label: 'Diamond Rings', href: '/categories/diamonds/rings' }
      ]
    },
    {
      title: 'Customer Service',
      links: [
        { label: 'My Account', href: '/account' },
        { label: 'Order Status', href: '/orders' },
        { label: 'Wishlist', href: '/wishlist' },
        { label: 'Privacy Policy', href: '/privacy' }
      ]
    }
  ],
  socialLinks = [
    { platform: 'Facebook', href: 'https://facebook.com/hsgold', icon: '📘', color: 'hover:bg-blue-600' },
    { platform: 'Instagram', href: 'https://instagram.com/hsgold', icon: '📷', color: 'hover:bg-pink-600' },
    { platform: 'Twitter', href: 'https://twitter.com/hsgold', icon: '🐦', color: 'hover:bg-blue-400' },
    { platform: 'WhatsApp', href: 'https://wa.me/1234567890', icon: '📱', color: 'hover:bg-green-600' }
  ],
  paymentMethods = [
    { name: 'Visa', icon: '💳' },
    { name: 'MasterCard', icon: '💳' },
    { name: 'PayPal', icon: '📱' },
    { name: 'Apple Pay', icon: '🍎' }
  ],
  showNewsletter = true,
  showCopyright = true,
  copyrightText = `© ${new Date().getFullYear()} Hafiz Sajid Gold & Diamonds. All rights reserved.`,
  className = ''
}: FooterProps) {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className={`bg-gray-900 text-white ${className}`}>
      {/* Newsletter Section */}
      {showNewsletter && (
        <div className="border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h3>
                <p className="text-gray-400">Get the latest updates on new collections and exclusive offers.</p>
              </div>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-yellow-500 text-white rounded-lg font-bold hover:bg-yellow-600 transition"
                >
                  Subscribe
                </button>
              </form>
              {subscribed && (
                <p className="text-green-400 text-sm md:col-span-2 text-center">
                  ✓ Thank you for subscribing!
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              {logo ? logo : (
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-xl">✨</span>
                </div>
              )}
              <span className="text-2xl font-bold">{brandName}</span>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm">
              {brandDescription}
            </p>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span>123 Jewelry Street, NY 10001</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📞</span>
                <a href="tel:+1234567890" className="hover:text-yellow-500">+1 (234) 567-890</a>
              </div>
              <div className="flex items-center gap-2">
                <span>✉️</span>
                <a href="mailto:info@hsgold.com" className="hover:text-yellow-500">info@hsgold.com</a>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {columns.map((column, index) => (
            <div key={index}>
              <h4 className="text-lg font-bold mb-4 text-yellow-500">{column.title}</h4>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-yellow-500 transition flex items-center gap-2"
                    >
                      {link.icon && <span>{link.icon}</span>}
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-lg hover:scale-110 transition ${social.color || 'hover:bg-gray-700'}`}
                    aria-label={social.platform}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            )}

            {/* Payment Methods */}
            {paymentMethods.length > 0 && (
              <div className="flex gap-2">
                {paymentMethods.map((method, index) => (
                  <span
                    key={index}
                    className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center text-xs text-gray-400"
                    title={method.name}
                  >
                    {method.icon}
                  </span>
                ))}
              </div>
            )}

            {/* Copyright */}
            {showCopyright && (
              <p className="text-sm text-gray-500">
                {copyrightText}
              </p>
            )}
          </div>

          {/* Admin Info */}
          <div className="text-center mt-4 text-sm text-gray-600">
            <span className="text-yellow-500">Hafiz Sajid Syed</span> | sajid.syed@gmail.com
          </div>

          {/* Bismillah */}
          <div className="text-center mt-2 text-sm text-gray-600">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
        </div>
      </div>
    </footer>
  )
}
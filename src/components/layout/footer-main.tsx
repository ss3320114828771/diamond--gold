// components/layout/footer-main.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Footer() {
  const [currentYear, setCurrentYear] = useState('2024')

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString())
  }, [])

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">HS Gold</h3>
            <p className="text-gray-400">Premium gold and diamond jewelry since 1999</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-white">About</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              <li><Link href="/directions" className="text-gray-400 hover:text-white">Directions</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><Link href="/gold" className="text-gray-400 hover:text-white">Gold</Link></li>
              <li><Link href="/diamonds" className="text-gray-400 hover:text-white">Diamonds</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <p className="text-gray-400">sajid.syed@gmail.com</p>
            <p className="text-gray-400">+1 234 567 890</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-4 text-center text-gray-500">
          <p>© {currentYear} HS Gold. All rights reserved.</p>
          <p className="text-sm mt-2">Hafiz Sajid Syed</p>
        </div>
      </div>
    </footer>
  )
}
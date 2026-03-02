// components/home/hero.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type HeroProps = {
  title?: string
  subtitle?: string
  description?: string
  primaryButtonText?: string
  primaryButtonLink?: string
}

export default function Hero({
  title = 'HS Gold & Diamonds',
  subtitle = 'Premium Gold and Diamond Jewelry',
  description = 'Discover our exquisite collection',
  primaryButtonText = 'Shop Now',
  primaryButtonLink = '/products'
}: HeroProps) {
  const [mounted, setMounted] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

  const images = ['/images/n1.jpeg', '/images/n2.jpeg', '/images/n3.jpeg']

  useEffect(() => {
    setMounted(true)
    
    // Auto-play slideshow
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [images.length])

  // Agar mounted nahi hai to static version render karo
  if (!mounted) {
    return (
      <section className="relative h-screen bg-gradient-to-r from-yellow-600 to-amber-700">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
            <p className="text-xl mb-8">{subtitle}</p>
            <Link href={primaryButtonLink} className="bg-yellow-500 text-white px-6 py-3 rounded-full">
              {primaryButtonText}
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Images */}
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={src}
            alt={`Hero ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      {/* Content */}
      <div className="relative h-full flex items-center justify-center text-center text-white px-4">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
          <p className="text-xl mb-4">{subtitle}</p>
          <p className="text-lg mb-8">{description}</p>
          <Link
            href={primaryButtonLink}
            className="inline-block bg-yellow-500 text-white px-8 py-3 rounded-full hover:bg-yellow-600 transition"
          >
            {primaryButtonText}
          </Link>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentImage ? 'w-6 bg-yellow-500' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
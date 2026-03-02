// components/home/testimonials.tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Testimonial = {
  id: string
  name: string
  role?: string
  content: string
  rating: number
  image?: string
  date?: string
  product?: string
}

type TestimonialsProps = {
  title?: string
  subtitle?: string
  testimonials?: Testimonial[]
  autoplay?: boolean
  interval?: number
  showRating?: boolean
}

export default function Testimonials({
  title = 'What Our Customers Say',
  subtitle = 'Real experiences from our valued customers',
  testimonials,
  autoplay = true,
  interval = 5000,
  showRating = true
}: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // Default testimonials
  const defaultTestimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Fatima Ahmed',
      role: 'Wedding Customer',
      content: 'I purchased my wedding jewelry from HS Gold, and I couldn\'t be happier! The quality of the gold and diamonds is exceptional. The craftsmanship is beautiful, and the customer service was outstanding.',
      rating: 5,
      date: '2 months ago',
      product: 'Wedding Collection'
    },
    {
      id: '2',
      name: 'Omar Khan',
      role: 'Regular Customer',
      content: 'Been buying from them for years. Their gold purity is always guaranteed, and prices are fair. Highly recommended for anyone looking for authentic jewelry.',
      rating: 5,
      date: '1 month ago',
      product: 'Gold Chain'
    },
    {
      id: '3',
      name: 'Aisha Syed',
      role: 'First Time Buyer',
      content: 'I was nervous buying diamond jewelry online, but HS Gold made it easy. The certificate came with the product, and it was exactly as described. Will definitely buy again!',
      rating: 5,
      date: '3 weeks ago',
      product: 'Diamond Ring'
    },
    {
      id: '4',
      name: 'Yusuf Mohammed',
      role: 'Gift Buyer',
      content: 'Bought a gold necklace for my wife\'s birthday. She absolutely loves it! The packaging was beautiful, and they even included a handwritten note. Excellent service.',
      rating: 5,
      date: '2 weeks ago',
      product: 'Gold Necklace'
    },
    {
      id: '5',
      name: 'Zainab Ali',
      role: 'Diamond Collector',
      content: 'The diamond quality is superb. I\'ve added several pieces to my collection from HS Gold. Their customer service team is knowledgeable and helped me choose the perfect piece.',
      rating: 5,
      date: '1 week ago',
      product: 'Diamond Earrings'
    }
  ]

  const displayTestimonials = testimonials || defaultTestimonials

  useEffect(() => {
    if (!autoplay || displayTestimonials.length <= 1) return

    const timer = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length)
        setIsAnimating(false)
      }, 500)
    }, interval)

    return () => clearInterval(timer)
  }, [autoplay, interval, displayTestimonials.length])

  const next = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length)
      setIsAnimating(false)
    }, 500)
  }

  const prev = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + displayTestimonials.length) % displayTestimonials.length)
      setIsAnimating(false)
    }, 500)
  }

  const goToSlide = (index: number) => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex(index)
      setIsAnimating(false)
    }, 500)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-amber-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-yellow-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Main Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div
            className={`bg-white rounded-3xl shadow-2xl p-8 md:p-12 transition-opacity duration-500 ${
              isAnimating ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {/* Quote Icon */}
            <div className="text-6xl text-yellow-400 mb-6 opacity-50">"</div>

            {/* Rating */}
            {showRating && (
              <div className="flex gap-1 mb-6">
                {renderStars(displayTestimonials[currentIndex].rating)}
              </div>
            )}

            {/* Testimonial Content */}
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              {displayTestimonials[currentIndex].content}
            </p>

            {/* Customer Info */}
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                {displayTestimonials[currentIndex].image ? (
                  <Image
                    src={displayTestimonials[currentIndex].image!}
                    alt={displayTestimonials[currentIndex].name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-white text-2xl font-bold">
                    {displayTestimonials[currentIndex].name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Name and Details */}
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {displayTestimonials[currentIndex].name}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  {displayTestimonials[currentIndex].role && (
                    <span>{displayTestimonials[currentIndex].role}</span>
                  )}
                  {displayTestimonials[currentIndex].product && (
                    <>
                      <span>•</span>
                      <span className="text-yellow-600">
                        {displayTestimonials[currentIndex].product}
                      </span>
                    </>
                  )}
                </div>
                {displayTestimonials[currentIndex].date && (
                  <p className="text-xs text-gray-400 mt-1">
                    {displayTestimonials[currentIndex].date}
                  </p>
                )}
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 opacity-5">
              <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
              </svg>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex gap-2">
              {displayTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-yellow-500'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-yellow-500 hover:text-white hover:border-yellow-500 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-yellow-500 hover:text-white hover:border-yellow-500 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 mb-4">Trusted by customers worldwide</p>
          <div className="flex flex-wrap justify-center gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Verified Review</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-700 font-medium"
          >
            <span>Read more reviews</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
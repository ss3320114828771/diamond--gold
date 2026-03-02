// components/home/stats.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

type Stat = {
  id: string
  label: string
  value: number
  suffix?: string
  prefix?: string
  icon: string
  description?: string
}

type StatsProps = {
  title?: string
  subtitle?: string
  stats?: Stat[]
  showYears?: boolean
  animated?: boolean
  columns?: 3 | 4 | 5
}

export default function Stats({
  title = 'Our Legacy in Numbers',
  subtitle = 'Years of excellence in craftsmanship and customer satisfaction',
  stats,
  showYears = true,
  animated = true,
  columns = 4
}: StatsProps) {
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [isVisible, setIsVisible] = useState(false)

  // Default stats
  const defaultStats: Stat[] = [
    {
      id: '1',
      label: 'Years of Excellence',
      value: 25,
      suffix: '+',
      icon: '⭐',
      description: 'Serving customers since 1999'
    },
    {
      id: '2',
      label: 'Happy Customers',
      value: 15000,
      suffix: '+',
      icon: '👥',
      description: 'Trusted by jewelry lovers worldwide'
    },
    {
      id: '3',
      label: 'Products',
      value: 5000,
      suffix: '+',
      icon: '💎',
      description: 'Unique jewelry pieces'
    },
    {
      id: '4',
      label: 'Certified Gems',
      value: 3500,
      suffix: '+',
      icon: '📜',
      description: 'GIA & IGI certified diamonds'
    },
    {
      id: '5',
      label: 'Gold Purity',
      value: 99.9,
      suffix: '%',
      icon: '🏆',
      description: 'Purest gold available'
    },
    {
      id: '6',
      label: 'Countries Served',
      value: 45,
      suffix: '+',
      icon: '🌍',
      description: 'Global shipping available'
    },
    {
      id: '7',
      label: 'Expert Artisans',
      value: 50,
      suffix: '+',
      icon: '👨‍🎨',
      description: 'Master craftsmen'
    },
    {
      id: '8',
      label: '5-Star Reviews',
      value: 98,
      suffix: '%',
      icon: '🌟',
      description: 'Customer satisfaction rate'
    }
  ]

  const displayStats = stats || defaultStats

  // Animate counting
  useEffect(() => {
    if (!animated) {
      const initialCounts: Record<string, number> = {}
      displayStats.forEach(stat => {
        initialCounts[stat.id] = stat.value
      })
      setCounts(initialCounts)
      return
    }

    // Intersection Observer to start animation when visible
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    const element = document.getElementById('stats-section')
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [animated, displayStats])

  // Animate numbers
  useEffect(() => {
    if (!animated || !isVisible) {
      const initialCounts: Record<string, number> = {}
      displayStats.forEach(stat => {
        initialCounts[stat.id] = 0
      })
      setCounts(initialCounts)
      return
    }

    const duration = 2000 // 2 seconds
    const steps = 60
    const interval = duration / steps

    displayStats.forEach(stat => {
      let current = 0
      const increment = stat.value / steps
      const timer = setInterval(() => {
        current += increment
        if (current >= stat.value) {
          setCounts(prev => ({ ...prev, [stat.id]: stat.value }))
          clearInterval(timer)
        } else {
          setCounts(prev => ({ ...prev, [stat.id]: Math.floor(current) }))
        }
      }, interval)
    })
  }, [isVisible, animated, displayStats])

  // Grid columns
  const gridCols = {
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5'
  }

  // Format number with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return (
    <section id="stats-section" className="py-16 bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 text-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Stats Grid */}
        <div className={`grid ${gridCols[columns]} gap-6`}>
          {displayStats.map((stat) => (
            <div
              key={stat.id}
              className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-500 hover:bg-white/20"
            >
              {/* Icon */}
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>

              {/* Value */}
              <div className="text-3xl md:text-4xl font-bold mb-2">
                {stat.prefix || ''}
                {counts[stat.id] !== undefined
                  ? formatNumber(Math.floor(counts[stat.id]))
                  : formatNumber(stat.value)}
                {stat.suffix || ''}
              </div>

              {/* Label */}
              <div className="text-sm font-medium uppercase tracking-wider opacity-90 mb-2">
                {stat.label}
              </div>

              {/* Description (optional) */}
              {stat.description && (
                <div className="text-xs opacity-75">
                  {stat.description}
                </div>
              )}

              {/* Hover Line */}
              <div className="w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-500 mt-4 mx-auto"></div>
            </div>
          ))}
        </div>

        {/* Years of Excellence Badge (Optional) */}
        {showYears && (
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-lg rounded-full px-8 py-4">
              <span className="text-3xl">🏆</span>
              <div>
                <span className="text-2xl font-bold block">25+ Years</span>
                <span className="text-sm opacity-90">of Excellence in Jewelry</span>
              </div>
            </div>
          </div>
        )}

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-8">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Certified</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            <span className="text-sm">Trusted by 15k+</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Lifetime Warranty</span>
          </div>
        </div>
      </div>
    </section>
  )
}
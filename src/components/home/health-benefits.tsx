// components/home/health-benefits.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

type Benefit = {
  id: string
  title: string
  description: string
  icon: string
  color: string
  category: 'gold' | 'diamond' | 'both'
}

type HealthBenefitsProps = {
  title?: string
  subtitle?: string
  showReadMore?: boolean
}

export default function HealthBenefits({
  title = 'Health Benefits of Gold & Diamonds',
  subtitle = 'Discover the therapeutic properties of precious metals and gems',
  showReadMore = true
}: HealthBenefitsProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'gold' | 'diamond'>('all')

  const benefits: Benefit[] = [
    {
      id: '1',
      title: 'Anti-inflammatory Properties',
      description: 'Gold has natural anti-inflammatory properties that can help reduce swelling and pain in conditions like arthritis and rheumatism.',
      icon: '🩺',
      color: 'from-yellow-400 to-amber-600',
      category: 'gold'
    },
    {
      id: '2',
      title: 'Improved Blood Circulation',
      description: 'Wearing gold jewelry is believed to improve blood circulation and regulate body temperature, promoting overall cardiovascular health.',
      icon: '❤️',
      color: 'from-red-400 to-pink-600',
      category: 'gold'
    },
    {
      id: '3',
      title: 'Stress Reduction',
      description: 'The warm energy of gold helps calm the nervous system, reducing stress, anxiety, and promoting better sleep.',
      icon: '🧘',
      color: 'from-blue-400 to-indigo-600',
      category: 'gold'
    },
    {
      id: '4',
      title: 'Positive Energy',
      description: 'Diamonds are known to attract positive energy and ward off negative influences, creating a harmonious environment.',
      icon: '💎',
      color: 'from-blue-300 to-purple-400',
      category: 'diamond'
    },
    {
      id: '5',
      title: 'Emotional Balance',
      description: 'Diamonds help stabilize emotions, reduce mood swings, and promote emotional wellbeing.',
      icon: '⚖️',
      color: 'from-indigo-400 to-purple-600',
      category: 'diamond'
    },
    {
      id: '6',
      title: 'Mental Clarity',
      description: 'Both gold and diamonds are believed to enhance mental clarity, focus, and decision-making abilities.',
      icon: '🧠',
      color: 'from-cyan-400 to-blue-600',
      category: 'both'
    },
    {
      id: '7',
      title: 'Immune System Support',
      description: 'Gold particles can stimulate the immune system and help the body fight off infections and diseases.',
      icon: '🛡️',
      color: 'from-green-400 to-emerald-600',
      category: 'gold'
    },
    {
      id: '8',
      title: 'Skin Health',
      description: 'Gold is used in many skincare products for its anti-aging properties and ability to improve skin elasticity.',
      icon: '✨',
      color: 'from-purple-400 to-pink-600',
      category: 'gold'
    },
    {
      id: '9',
      title: 'Physical Vitality',
      description: 'Diamonds can boost physical energy and vitality, helping combat fatigue and lethargy.',
      icon: '⚡',
      color: 'from-yellow-400 to-orange-500',
      category: 'diamond'
    }
  ]

  const filteredBenefits = activeCategory === 'all' 
    ? benefits 
    : benefits.filter(b => b.category === activeCategory || b.category === 'both')

  return (
    <section className="py-16 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-4">
            <span className="text-3xl">✨</span>
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

        {/* Category Tabs */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${
              activeCategory === 'all'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg scale-105'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            All Benefits
          </button>
          <button
            onClick={() => setActiveCategory('gold')}
            className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${
              activeCategory === 'gold'
                ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white shadow-lg scale-105'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Gold Benefits
          </button>
          <button
            onClick={() => setActiveCategory('diamond')}
            className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${
              activeCategory === 'diamond'
                ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white shadow-lg scale-105'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Diamond Benefits
          </button>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBenefits.map((benefit) => (
            <div
              key={benefit.id}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500"
            >
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-xl flex items-center justify-center mb-4 text-3xl group-hover:rotate-12 transition-transform duration-500`}>
                {benefit.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-yellow-600 transition">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>

              {/* Category Badge */}
              <div className="mt-4">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  benefit.category === 'gold' 
                    ? 'bg-yellow-100 text-yellow-800'
                    : benefit.category === 'diamond'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  {benefit.category === 'both' ? 'Gold & Diamond' : benefit.category}
                </span>
              </div>

              {/* Hover Line */}
              <div className="w-0 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 group-hover:w-full transition-all duration-500 mt-4"></div>
            </div>
          ))}
        </div>

        {/* Scientific Evidence Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Scientific Evidence
              </h3>
              <p className="text-gray-600 mb-4">
                Modern research confirms what ancient civilizations knew about the therapeutic properties of precious metals and gems.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700">Gold nanoparticles used in targeted drug delivery</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700">Diamonds used in medical equipment for thermal conductivity</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700">Crystal therapy studies show positive effects on mental wellbeing</span>
                </li>
              </ul>
            </div>

            {/* Quote Box */}
            <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-2xl p-8">
              <svg className="w-10 h-10 text-yellow-400 mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-xl italic mb-4">
                "Gold and diamond jewelry isn't just an accessory – it's an investment in your health and wellbeing."
              </p>
              <p className="text-yellow-400 font-bold">- Hafiz Sajid Syed</p>
            </div>
          </div>
        </div>

        {/* Traditional Medicine Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-amber-50 rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-amber-200 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              🇮🇳
            </div>
            <h4 className="font-bold text-gray-800 mb-2">Ayurveda</h4>
            <p className="text-sm text-gray-600">Gold used in Ayurvedic medicines for rejuvenation and treating various ailments.</p>
          </div>

          <div className="bg-red-50 rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-red-200 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              🇨🇳
            </div>
            <h4 className="font-bold text-gray-800 mb-2">Traditional Chinese Medicine</h4>
            <p className="text-sm text-gray-600">Gold needles used in acupuncture for heart and nervous system.</p>
          </div>

          <div className="bg-green-50 rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              🇵🇰
            </div>
            <h4 className="font-bold text-gray-800 mb-2">Unani Medicine</h4>
            <p className="text-sm text-gray-600">Gold preparations used to strengthen the heart and improve memory.</p>
          </div>
        </div>

        {/* Read More Link */}
        {showReadMore && (
          <div className="text-center mt-12">
            <Link
              href="/health-benefits"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-bold hover:from-emerald-600 hover:to-teal-600 transition transform hover:scale-105"
            >
              <span>Learn More About Health Benefits</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
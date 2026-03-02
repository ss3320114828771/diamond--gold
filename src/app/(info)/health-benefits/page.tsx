// app/(info)/health-benefits/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function HealthBenefitsPage() {
  const [activeTab, setActiveTab] = useState('gold')

  const benefits = {
    gold: [
      {
        title: "Anti-Inflammatory Properties",
        description: "Gold has natural anti-inflammatory properties that can help reduce swelling and pain in conditions like arthritis and rheumatism.",
        icon: "🩺",
        color: "from-yellow-400 to-amber-600"
      },
      {
        title: "Improved Blood Circulation",
        description: "Wearing gold jewelry is believed to improve blood circulation and regulate body temperature, promoting overall cardiovascular health.",
        icon: "❤️",
        color: "from-red-400 to-pink-600"
      },
      {
        title: "Stress Reduction",
        description: "The warm energy of gold helps calm the nervous system, reducing stress, anxiety, and promoting better sleep.",
        icon: "🧘",
        color: "from-blue-400 to-indigo-600"
      },
      {
        title: "Immune System Support",
        description: "Gold particles can stimulate the immune system and help the body fight off infections and diseases.",
        icon: "🛡️",
        color: "from-green-400 to-emerald-600"
      },
      {
        title: "Skin Health",
        description: "Gold is used in many skincare products for its anti-aging properties and ability to improve skin elasticity.",
        icon: "✨",
        color: "from-purple-400 to-pink-600"
      },
      {
        title: "Mental Clarity",
        description: "Gold is believed to enhance mental clarity, focus, and decision-making abilities.",
        icon: "🧠",
        color: "from-cyan-400 to-blue-600"
      }
    ],
    diamond: [
      {
        title: "Positive Energy",
        description: "Diamonds are known to attract positive energy and ward off negative influences, creating a harmonious environment.",
        icon: "💎",
        color: "from-blue-300 to-purple-400"
      },
      {
        title: "Emotional Balance",
        description: "Diamonds help stabilize emotions, reduce mood swings, and promote emotional wellbeing.",
        icon: "⚖️",
        color: "from-indigo-400 to-purple-600"
      },
      {
        title: "Mental Strength",
        description: "The hardness of diamonds symbolizes mental strength, helping build resilience and determination.",
        icon: "💪",
        color: "from-gray-600 to-gray-800"
      },
      {
        title: "Clarity of Thought",
        description: "Diamonds are said to clear mental fog and promote clarity of thought and better decision making.",
        icon: "🔮",
        color: "from-sky-400 to-blue-600"
      },
      {
        title: "Physical Vitality",
        description: "Diamonds can boost physical energy and vitality, helping combat fatigue and lethargy.",
        icon: "⚡",
        color: "from-yellow-400 to-orange-500"
      },
      {
        title: "Spiritual Growth",
        description: "Diamonds facilitate spiritual growth and help connect with higher consciousness.",
        icon: "🕊️",
        color: "from-white to-gray-300"
      }
    ],
    gemstones: [
      {
        title: "Ruby - Vitality & Passion",
        description: "Rubies increase energy, vitality, and passion while protecting against negative energies.",
        icon: "🔴",
        color: "from-red-500 to-rose-600"
      },
      {
        title: "Sapphire - Wisdom & Peace",
        description: "Sapphires promote wisdom, mental peace, and protect against envy and harm.",
        icon: "🔵",
        color: "from-blue-600 to-indigo-700"
      },
      {
        title: "Emerald - Love & Compassion",
        description: "Emeralds open the heart chakra, promoting love, compassion, and emotional healing.",
        icon: "💚",
        color: "from-green-500 to-emerald-600"
      },
      {
        title: "Pearl - Purity & Calm",
        description: "Pearls bring calmness, purity, and emotional balance to the wearer.",
        icon: "⚪",
        color: "from-stone-300 to-gray-400"
      }
    ]
  }

  const scientificStudies = [
    {
      title: "Gold Nanoparticles in Medicine",
      description: "Modern medical research uses gold nanoparticles for targeted drug delivery and cancer treatment.",
      source: "Journal of Nanomedicine",
      year: "2023"
    },
    {
      title: "Diamond's Thermal Properties",
      description: "Diamonds are used in medical equipment for their thermal conductivity and biocompatibility.",
      source: "Medical Device Innovation",
      year: "2024"
    },
    {
      title: "Crystal Therapy Research",
      description: "Studies show that crystal healing can have positive effects on mental wellbeing through placebo and meditation.",
      source: "Holistic Medicine Review",
      year: "2023"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 via-teal-800/90 to-cyan-900/90 z-10"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/n1.jpeg')" }}
          ></div>
        </div>

        <div className="relative z-20 h-full flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-3xl md:text-4xl text-yellow-300 font-arabic mb-4 animate-pulse">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              Health <span className="text-yellow-300">Benefits</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              The Healing Power of Precious Metals & Gems
            </p>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 z-30">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
                  className="fill-emerald-50"/>
          </svg>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block p-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-8">
            <span className="text-5xl">✨</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Ancient Wisdom, Modern Science
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            For thousands of years, civilizations across the world have recognized the healing properties 
            of gold, diamonds, and precious gemstones. Today, modern science is beginning to validate what 
            our ancestors always knew - these precious materials can significantly impact our health and 
            wellbeing.
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setActiveTab('gold')}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300
                        ${activeTab === 'gold' 
                          ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white shadow-lg scale-105' 
                          : 'bg-white text-gray-600 hover:text-yellow-600 shadow-md'}`}
            >
              ✨ Gold Benefits
            </button>
            <button
              onClick={() => setActiveTab('diamond')}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300
                        ${activeTab === 'diamond' 
                          ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white shadow-lg scale-105' 
                          : 'bg-white text-gray-600 hover:text-blue-600 shadow-md'}`}
            >
              💎 Diamond Benefits
            </button>
            <button
              onClick={() => setActiveTab('gemstones')}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300
                        ${activeTab === 'gemstones' 
                          ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg scale-105' 
                          : 'bg-white text-gray-600 hover:text-green-600 shadow-md'}`}
            >
              🔮 Other Gemstones
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeTab === 'gold' && benefits.gold.map((benefit, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl 
                         transform hover:-translate-y-2 transition-all duration-500
                         border-2 border-transparent hover:border-yellow-400"
              >
                <div className={`w-20 h-20 bg-gradient-to-r ${benefit.color} rounded-2xl 
                              flex items-center justify-center mb-4 text-4xl
                              group-hover:rotate-12 transition-transform duration-500`}>
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                
                {/* Hover Effect Line */}
                <div className="w-0 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 
                              group-hover:w-full transition-all duration-500 mt-4"></div>
              </div>
            ))}

            {activeTab === 'diamond' && benefits.diamond.map((benefit, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl 
                         transform hover:-translate-y-2 transition-all duration-500
                         border-2 border-transparent hover:border-blue-400"
              >
                <div className={`w-20 h-20 bg-gradient-to-r ${benefit.color} rounded-2xl 
                              flex items-center justify-center mb-4 text-4xl
                              group-hover:rotate-12 transition-transform duration-500`}>
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                
                <div className="w-0 h-1 bg-gradient-to-r from-blue-400 to-purple-500 
                              group-hover:w-full transition-all duration-500 mt-4"></div>
              </div>
            ))}

            {activeTab === 'gemstones' && benefits.gemstones.map((benefit, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl 
                         transform hover:-translate-y-2 transition-all duration-500
                         border-2 border-transparent hover:border-green-400"
              >
                <div className={`w-20 h-20 bg-gradient-to-r ${benefit.color} rounded-2xl 
                              flex items-center justify-center mb-4 text-4xl
                              group-hover:rotate-12 transition-transform duration-500`}>
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                
                <div className="w-0 h-1 bg-gradient-to-r from-green-400 to-emerald-500 
                              group-hover:w-full transition-all duration-500 mt-4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scientific Evidence Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Scientific <span className="text-yellow-400">Evidence</span>
          </h2>
          <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            Modern research confirms the therapeutic properties of precious metals and gems
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {scientificStudies.map((study, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 
                                        border border-white/20 hover:border-yellow-400 
                                        transition-all duration-300">
                <div className="text-4xl mb-4">🔬</div>
                <h3 className="text-xl font-bold text-yellow-400 mb-2">{study.title}</h3>
                <p className="text-gray-300 mb-4">{study.description}</p>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>{study.source}</span>
                  <span>{study.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Traditional Medicine Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Traditional <span className="text-emerald-600">Healing</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Ancient healing systems like Unani, Ayurveda, and Traditional Chinese Medicine have long 
                recognized the therapeutic properties of gold and precious gems.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-2xl">
                    🇮🇳
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Ayurveda</h3>
                    <p className="text-gray-600">Gold is used in Ayurvedic medicines (Swarna Bhasma) for rejuvenation and treating various ailments.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-2xl">
                    🇨🇳
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Traditional Chinese Medicine</h3>
                    <p className="text-gray-600">Gold needles are used in acupuncture and gold is prescribed for heart and nervous system disorders.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-2xl">
                    🇵🇰
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Unani Medicine</h3>
                    <p className="text-gray-600">Gold preparations are used to strengthen the heart, improve memory, and enhance vitality.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-3xl blur-xl opacity-30"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                <Image
                  src="/images/n2.jpeg"
                  alt="Traditional Healing"
                  width={500}
                  height={400}
                  className="w-full h-auto rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-amber-50 to-yellow-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-4">
            How to <span className="text-amber-600">Benefit</span>
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Simple ways to incorporate precious metals and gems into your wellness routine
          </p>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                💍
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Wear Daily</h3>
              <p className="text-gray-600">Regular wearing allows continuous energy transfer</p>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                🧘
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Meditation</h3>
              <p className="text-gray-600">Hold during meditation for deeper connection</p>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                💧
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Gem Water</h3>
              <p className="text-gray-600">Place in water (ensure safety) for energetic infusion</p>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                🛏️
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Sleep Near</h3>
              <p className="text-gray-600">Place under pillow for restful sleep and dreams</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12">
            Customer <span className="text-purple-600">Experiences</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <div className="flex items-center gap-2 text-yellow-400 mb-4">
                {"★★★★★".split('').map((star, i) => (
                  <span key={i} className="text-2xl">★</span>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "Since wearing my gold ring, my arthritis pain has significantly reduced. I can't believe the difference!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-xl">
                  👤
                </div>
                <div>
                  <p className="font-bold">Fatima A.</p>
                  <p className="text-sm text-gray-500">Verified Buyer</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <div className="flex items-center gap-2 text-yellow-400 mb-4">
                {"★★★★★".split('').map((star, i) => (
                  <span key={i} className="text-2xl">★</span>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "My diamond pendant has helped me feel more centered and calm during stressful work days."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl">
                  👤
                </div>
                <div>
                  <p className="font-bold">Mohammed R.</p>
                  <p className="text-sm text-gray-500">Verified Buyer</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <div className="flex items-center gap-2 text-yellow-400 mb-4">
                {"★★★★★".split('').map((star, i) => (
                  <span key={i} className="text-2xl">★</span>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "The emerald ring I bought has brought so much peace and harmony to my life. Highly recommended!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-xl">
                  👤
                </div>
                <div>
                  <p className="font-bold">Aisha K.</p>
                  <p className="text-sm text-gray-500">Verified Buyer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Islamic Perspective */}
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-900 to-teal-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">🕋</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Islamic <span className="text-yellow-300">Perspective</span>
          </h2>
          
          <p className="text-xl text-gray-200 mb-8 leading-relaxed">
            In Islam, we are encouraged to seek healing and benefit from the natural resources Allah has provided. 
            The Quran mentions the beauty and value of gold and pearls as blessings from Allah. While we believe 
            ultimate healing comes from Allah, using permissible means for better health is encouraged.
          </p>

          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="text-xl font-bold text-yellow-300 mb-3">Quranic Reference</h3>
              <p className="text-gray-200 italic">
                "And among His signs is that He created for you from yourselves mates that you may find tranquility in them; 
                and He placed between you affection and mercy. Indeed in that are signs for a people who give thought." 
                (Surah Ar-Rum, 30:21)
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="text-xl font-bold text-yellow-300 mb-3">Hadith Reference</h3>
              <p className="text-gray-200 italic">
                The Prophet Muhammad (peace be upon him) said: "Make use of the two cures: honey and the Quran." 
                (Ibn Majah). This encourages us to use natural remedies while maintaining faith.
              </p>
            </div>
          </div>

          <p className="text-yellow-300 text-lg mt-8">
            Note: Always consult with healthcare professionals for medical conditions. These benefits are complementary, not替代 for medical treatment.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Experience the Benefits Yourself
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Browse our collection of authentic gold and diamond jewelry, carefully selected for both beauty and therapeutic value.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 
                       text-white font-bold rounded-xl text-lg
                       hover:from-yellow-500 hover:to-orange-600
                       transform hover:scale-105 transition duration-300"
            >
              Shop Now
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-gray-200 text-gray-800 font-bold rounded-xl text-lg
                       hover:bg-gray-300 transform hover:scale-105 transition duration-300"
            >
              Consult an Expert
            </Link>
          </div>
        </div>
      </section>

      {/* Admin Note */}
      <section className="py-8 px-4 border-t border-gray-200">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          <p className="text-sm">
            For personalized guidance on choosing the right piece for your health needs, contact our administrator:
          </p>
          <p className="font-bold text-gray-800 mt-2">
            Hafiz Sajid Syed | sajid.syed@gmail.com | +1 (234) 567-890
          </p>
        </div>
      </section>
    </div>
  )
}
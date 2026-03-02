// app/(info)/about/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - Hafiz Sajid Gold & Diamonds',
  description: 'Discover the legacy of Hafiz Sajid Gold & Diamonds - Premium jewelry with Islamic values and exceptional craftsmanship.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        {/* Background with Overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-pink-800/90 to-orange-800/90 z-10"></div>
          <div 
            className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center"
            style={{ backgroundImage: "url('/images/n1.jpeg')" }}
          ></div>
        </div>

        {/* Content */}
        <div className="relative z-20 h-full flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-4">
            {/* Bismillah */}
            <p className="text-3xl md:text-4xl text-yellow-300 font-arabic mb-6 animate-pulse">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              About <span className="text-yellow-300">HS Gold</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              Crafting Excellence Since 2024
            </p>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 z-30">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
                  className="fill-amber-50 dark:fill-gray-900"/>
          </svg>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Founder Image */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative rounded-3xl overflow-hidden">
                <Image
                  src="/n2.jpeg"
                  alt="Hafiz Sajid Syed"
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover transform group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-3xl font-bold mb-2">Hafiz Sajid Syed</h3>
                  <p className="text-yellow-300 text-xl">Founder & Administrator</p>
                </div>
              </div>
            </div>

            {/* Founder Message */}
            <div className="space-y-6">
              <div className="inline-block p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full">
                <span className="text-4xl">👑</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  A Message from Our Founder
                </span>
              </h2>

              <div className="space-y-4 text-gray-700 text-lg">
                <p className="italic border-l-4 border-yellow-400 pl-4">
                  "Our journey began with a simple vision: to provide the finest gold and diamond jewelry while upholding the highest Islamic values and ethical standards."
                </p>
                
                <p>
                  Assalamu Alaikum wa Rahmatullahi wa Barakatuh. I am honored to welcome you to Hafiz Sajid Gold & Diamonds. As a Hafiz-e-Quran, I believe in conducting business with honesty, integrity, and transparency – principles that are deeply rooted in Islamic teachings.
                </p>
                
                <p>
                  Every piece in our collection is carefully selected to ensure it meets our strict quality standards. We work directly with certified suppliers who share our commitment to ethical sourcing and fair trade practices.
                </p>
                
                <p>
                  Our team is dedicated to helping you find the perfect piece, whether it's for a special occasion, investment, or daily wear. We treat every customer like family because that's what our faith teaches us.
                </p>
              </div>

              {/* Contact Info */}
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>sajid.syed@gmail.com</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>+1 (234) 567-890</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-yellow-300">Values</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Guided by Islamic principles, we ensure every aspect of our business reflects our commitment to excellence and ethics.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="group bg-white/10 backdrop-blur-lg rounded-3xl p-8 transform hover:scale-105 transition duration-500">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl 
                            flex items-center justify-center mb-6 group-hover:rotate-12 transition">
                <span className="text-4xl">📖</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Islamic Values</h3>
              <p className="text-gray-300">
                All our business practices comply with Shariah law, ensuring halal transactions and ethical dealings.
              </p>
            </div>

            {/* Value 2 */}
            <div className="group bg-white/10 backdrop-blur-lg rounded-3xl p-8 transform hover:scale-105 transition duration-500">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl 
                            flex items-center justify-center mb-6 group-hover:rotate-12 transition">
                <span className="text-4xl">💎</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Quality Assurance</h3>
              <p className="text-gray-300">
                Every piece is certified and tested for authenticity, purity, and craftsmanship excellence.
              </p>
            </div>

            {/* Value 3 */}
            <div className="group bg-white/10 backdrop-blur-lg rounded-3xl p-8 transform hover:scale-105 transition duration-500">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl 
                            flex items-center justify-center mb-6 group-hover:rotate-12 transition">
                <span className="text-4xl">🤝</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Trust & Integrity</h3>
              <p className="text-gray-300">
                Building lasting relationships through honesty, transparency, and exceptional service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Health Benefits Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Health Benefits of Gold & Diamonds
                </span>
              </h2>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🩺</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Anti-inflammatory Properties</h3>
                    <p className="text-gray-600">Gold has natural anti-inflammatory properties that can help with arthritis and joint pain.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">✨</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Positive Energy</h3>
                    <p className="text-gray-600">Diamonds are believed to attract positive energy and promote mental clarity.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">💆‍♀️</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Stress Reduction</h3>
                    <p className="text-gray-600">Wearing precious metals and gems can reduce stress and promote emotional wellbeing.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🔄</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Improved Circulation</h3>
                    <p className="text-gray-600">Gold jewelry is known to improve blood circulation when worn regularly.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-3xl blur-xl opacity-30"></div>
              <div className="relative rounded-3xl overflow-hidden">
                <Image
                  src="/images/n3.jpeg"
                  alt="Health Benefits"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-400">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">500+</div>
              <div className="text-white text-lg">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">1000+</div>
              <div className="text-white text-lg">Products</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">50+</div>
              <div className="text-white text-lg">Certified Designs</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">24/7</div>
              <div className="text-white text-lg">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Our <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">Expert Team</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="group">
              <div className="relative mb-4 overflow-hidden rounded-3xl">
                <Image
                  src="/images/n4.jpeg"
                  alt="Team Member"
                  width={400}
                  height={400}
                  className="w-full h-80 object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent 
                              opacity-0 group-hover:opacity-100 transition duration-500"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Ahmed Khan</h3>
              <p className="text-yellow-600 mb-2">Master Jeweler</p>
              <p className="text-gray-600">20+ years of experience in fine jewelry craftsmanship</p>
            </div>

            {/* Team Member 2 */}
            <div className="group">
              <div className="relative mb-4 overflow-hidden rounded-3xl">
                <Image
                  src="/images/n5.jpeg"
                  alt="Team Member"
                  width={400}
                  height={400}
                  className="w-full h-80 object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent 
                              opacity-0 group-hover:opacity-100 transition duration-500"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Fatima Syed</h3>
              <p className="text-yellow-600 mb-2">Gemologist</p>
              <p className="text-gray-600">Certified diamond expert and quality assurance specialist</p>
            </div>

            {/* Team Member 3 */}
            <div className="group">
              <div className="relative mb-4 overflow-hidden rounded-3xl">
                <Image
                  src="/images/n6.jpeg"
                  alt="Team Member"
                  width={400}
                  height={400}
                  className="w-full h-80 object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent 
                              opacity-0 group-hover:opacity-100 transition duration-500"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Yusuf Ali</h3>
              <p className="text-yellow-600 mb-2">Customer Relations</p>
              <p className="text-gray-600">Ensuring every customer receives royal treatment</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-900 to-pink-900 rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Visit Our Showroom
              </h2>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Experience the beauty of our collection in person. Our experts are ready to assist you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" 
                      className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 
                               text-white font-bold rounded-xl text-lg
                               hover:from-yellow-500 hover:to-orange-600
                               transform hover:scale-105 transition duration-300">
                  Contact Us
                </Link>
                <Link href="/directions" 
                      className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white 
                               font-bold rounded-xl text-lg border-2 border-white/50
                               hover:bg-white/30 transform hover:scale-105 transition duration-300">
                  Get Directions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
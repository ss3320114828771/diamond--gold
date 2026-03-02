// app/(info)/directions/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function DirectionsPage() {
  const [activeTab, setActiveTab] = useState('map')
  const [directions, setDirections] = useState({
    from: '',
    mode: 'driving'
  })

  const handleDirectionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setDirections(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="relative h-[40vh] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 via-teal-800/90 to-blue-900/90 z-10"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/n5.jpeg')" }}
          ></div>
        </div>

        <div className="relative z-20 h-full flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-3xl md:text-4xl text-yellow-300 font-arabic mb-4 animate-pulse">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Directions</h1>
            <p className="text-xl md:text-2xl text-gray-200">Find Your Way to Luxury</p>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 z-30">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
                  className="fill-amber-50"/>
          </svg>
        </div>
      </section>

      {/* Quick Info Strip */}
      <section className="py-8 bg-gradient-to-r from-yellow-400 to-orange-400">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-white">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📍</span>
              <div>
                <p className="text-sm opacity-90">Address</p>
                <p className="font-bold">123 Jewelry Street, NY 10001</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-3xl">🕒</span>
              <div>
                <p className="text-sm opacity-90">Open Today</p>
                <p className="font-bold">10:00 AM - 8:00 PM</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-3xl">📞</span>
              <div>
                <p className="text-sm opacity-90">Need Help?</p>
                <p className="font-bold">+1 (234) 567-890</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-2xl p-2 shadow-lg inline-flex">
              <button
                onClick={() => setActiveTab('map')}
                className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300
                          ${activeTab === 'map' 
                            ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg' 
                            : 'text-gray-600 hover:text-yellow-600'}`}
              >
                🗺️ Interactive Map
              </button>
              <button
                onClick={() => setActiveTab('directions')}
                className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300
                          ${activeTab === 'directions' 
                            ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg' 
                            : 'text-gray-600 hover:text-yellow-600'}`}
              >
                🧭 Get Directions
              </button>
              <button
                onClick={() => setActiveTab('parking')}
                className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300
                          ${activeTab === 'parking' 
                            ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg' 
                            : 'text-gray-600 hover:text-yellow-600'}`}
              >
                🅿️ Parking Info
              </button>
            </div>
          </div>

          {/* Map Tab */}
          {activeTab === 'map' && (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-3xl p-4 shadow-2xl">
                  <div className="aspect-video bg-gray-200 rounded-2xl overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.9147703055!2d-74.119763173046!3d40.69740344229443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1645564618725!5m2!1sen!2s"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      className="w-full h-full min-h-[400px]"
                    ></iframe>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Location Card */}
                <div className="bg-white rounded-3xl p-6 shadow-xl">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="text-3xl">📍</span>
                    Our Location
                  </h3>
                  <div className="space-y-3 text-gray-600">
                    <p className="font-bold text-lg">Hafiz Sajid Gold & Diamonds</p>
                    <p>123 Jewelry Street<br />New York, NY 10001<br />United States</p>
                    <div className="pt-3 border-t border-gray-200">
                      <p className="flex items-center gap-2">
                        <span className="text-yellow-500">📞</span>
                        <a href="tel:+1234567890" className="hover:text-yellow-600">+1 (234) 567-890</a>
                      </p>
                      <p className="flex items-center gap-2 mt-2">
                        <span className="text-yellow-500">✉️</span>
                        <a href="mailto:info@hsgold.com" className="hover:text-yellow-600">info@hsgold.com</a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Landmarks Card */}
                <div className="bg-white rounded-3xl p-6 shadow-xl">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="text-3xl">🏛️</span>
                    Nearby Landmarks
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                      <span>Central Park (0.5 miles)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                      <span>Times Square (1.2 miles)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                      <span>Rockefeller Center (0.8 miles)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                      <span>Fifth Avenue Shopping (0.3 miles)</span>
                    </li>
                  </ul>
                </div>

                {/* QR Code for Mobile */}
                <div className="bg-gradient-to-r from-purple-900 to-pink-900 rounded-3xl p-6 shadow-xl text-white">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center">
                      <span className="text-4xl">📱</span>
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Scan for Directions</h4>
                      <p className="text-sm opacity-90">Get live navigation on your phone</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Directions Tab */}
          {activeTab === 'directions' && (
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-3xl p-8 shadow-2xl">
                <h3 className="text-3xl font-bold text-gray-800 mb-6">Plan Your Route</h3>
                
                <div className="space-y-6">
                  {/* Starting Point */}
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">Starting From</label>
                    <input
                      type="text"
                      name="from"
                      value={directions.from}
                      onChange={handleDirectionChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl 
                               focus:border-yellow-400 focus:outline-none transition"
                      placeholder="Enter your starting address"
                    />
                  </div>

                  {/* Travel Mode */}
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">Travel Mode</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: 'driving', icon: '🚗', label: 'Driving' },
                        { value: 'transit', icon: '🚇', label: 'Transit' },
                        { value: 'walking', icon: '🚶', label: 'Walking' }
                      ].map((mode) => (
                        <label
                          key={mode.value}
                          className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-300
                                    ${directions.mode === mode.value 
                                      ? 'border-yellow-400 bg-yellow-50' 
                                      : 'border-gray-200 hover:border-yellow-200'}`}
                        >
                          <input
                            type="radio"
                            name="mode"
                            value={mode.value}
                            checked={directions.mode === mode.value}
                            onChange={handleDirectionChange}
                            className="sr-only"
                          />
                          <div className="text-center">
                            <span className="text-3xl block mb-2">{mode.icon}</span>
                            <span className="text-sm font-medium">{mode.label}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Get Directions Button */}
                  <button
                    className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 
                             text-white font-bold rounded-xl text-lg
                             hover:from-yellow-500 hover:to-orange-600
                             transform hover:scale-105 transition duration-300"
                  >
                    Get Directions
                  </button>
                </div>

                {/* Step by Step Guide */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">Quick Directions</h4>
                  
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center font-bold text-yellow-600">1</div>
                      <div>
                        <p className="font-bold">From Manhattan</p>
                        <p className="text-gray-600">Take 5th Ave south, turn right on 47th St</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center font-bold text-yellow-600">2</div>
                      <div>
                        <p className="font-bold">From Brooklyn</p>
                        <p className="text-gray-600">Take Brooklyn Bridge, exit at City Hall</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center font-bold text-yellow-600">3</div>
                      <div>
                        <p className="font-bold">From Queens</p>
                        <p className="text-gray-600">Take Queensboro Bridge, follow signs to Midtown</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center font-bold text-yellow-600">4</div>
                      <div>
                        <p className="font-bold">From New Jersey</p>
                        <p className="text-gray-600">Take Lincoln Tunnel, exit at 34th St</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Public Transport Info */}
              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-8 shadow-2xl">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <span className="text-3xl">🚇</span>
                    Public Transportation
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-xl">
                      <h4 className="font-bold text-blue-800 mb-2">Subway</h4>
                      <p className="text-gray-700">B, D, F, M trains to 47-50 Sts Rockefeller Center</p>
                      <p className="text-sm text-gray-500 mt-1">2-minute walk from station</p>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-xl">
                      <h4 className="font-bold text-green-800 mb-2">Bus</h4>
                      <p className="text-gray-700">M1, M2, M3, M4, M5 to 5th Ave/47th St</p>
                      <p className="text-sm text-gray-500 mt-1">Stop directly in front</p>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-xl">
                      <h4 className="font-bold text-purple-800 mb-2">Train</h4>
                      <p className="text-gray-700">Grand Central Terminal (15 min walk)</p>
                      <p className="text-sm text-gray-500 mt-1">Follow signs to 5th Ave exit</p>
                    </div>
                  </div>
                </div>

                {/* Accessibility Info */}
                <div className="bg-white rounded-3xl p-8 shadow-2xl">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <span className="text-3xl">♿</span>
                    Accessibility
                  </h3>
                  
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <span className="text-green-500">✅</span>
                      <span>Wheelchair accessible entrance</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-green-500">✅</span>
                      <span>Elevator access to all floors</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-green-500">✅</span>
                      <span>Accessible restrooms</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-green-500">✅</span>
                      <span>Priority parking available</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Parking Tab */}
          {activeTab === 'parking' && (
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-3xl p-8 shadow-2xl">
                <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <span className="text-4xl">🅿️</span>
                  Parking Options
                </h3>

                <div className="space-y-6">
                  {/* Parking Garage */}
                  <div className="p-6 border-2 border-gray-200 rounded-2xl hover:border-yellow-400 transition">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-xl font-bold">Premium Parking Garage</h4>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">Valet</span>
                    </div>
                    <p className="text-gray-600 mb-2">📍 45 W 47th St (entrance on 5th Ave)</p>
                    <p className="text-gray-600 mb-2">🕒 Open 24/7</p>
                    <p className="text-gray-600 mb-4">💰 $15 for 1 hour | $35 max daily</p>
                    <p className="text-sm text-green-600">✓ Discount for HS Gold customers</p>
                  </div>

                  {/* Street Parking */}
                  <div className="p-6 border-2 border-gray-200 rounded-2xl hover:border-yellow-400 transition">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-xl font-bold">Street Parking</h4>
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">Metered</span>
                    </div>
                    <p className="text-gray-600 mb-2">📍 Available on 47th St and 5th Ave</p>
                    <p className="text-gray-600 mb-2">🕒 Mon-Sat: 8am-7pm</p>
                    <p className="text-gray-600 mb-4">💰 $4.50 per hour</p>
                    <p className="text-sm text-yellow-600">⚠️ Limited availability</p>
                  </div>

                  {/* Valet Service */}
                  <div className="p-6 border-2 border-gray-200 rounded-2xl hover:border-yellow-400 transition">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-xl font-bold">HS Gold Valet</h4>
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">Premium</span>
                    </div>
                    <p className="text-gray-600 mb-2">📍 Directly at our entrance</p>
                    <p className="text-gray-600 mb-2">🕒 During business hours</p>
                    <p className="text-gray-600 mb-4">💰 $20 (validated with purchase)</p>
                    <p className="text-sm text-green-600">✓ Free for purchases over $1000</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Parking Map */}
                <div className="bg-white rounded-3xl p-6 shadow-2xl">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">Parking Map</h4>
                  <div className="aspect-square bg-gray-200 rounded-xl overflow-hidden">
                    <Image
                      src="/images/n6.jpeg"
                      alt="Parking Map"
                      width={500}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Tips Card */}
                <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl p-6 shadow-2xl text-white">
                  <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <span className="text-3xl">💡</span>
                    Parking Tips
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Arrive before 11am for best parking availability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Weekends are less crowded for street parking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Use our valet service for convenience</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Download parking apps for real-time availability</span>
                    </li>
                  </ul>
                </div>

                {/* Contact for Help */}
                <div className="bg-white rounded-3xl p-6 shadow-2xl">
                  <h4 className="text-xl font-bold text-gray-800 mb-3">Need Help Finding Us?</h4>
                  <p className="text-gray-600 mb-4">Call our concierge for live assistance</p>
                  <a href="tel:+1234567890" className="block text-center py-3 bg-gray-100 rounded-xl font-bold text-gray-800 hover:bg-gray-200 transition">
                    📞 +1 (234) 567-890
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Important Note */}
      <section className="py-12 px-4 bg-gradient-to-r from-purple-900 to-pink-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🕌</span>
          </div>
          <h3 className="text-2xl font-bold mb-4">Important Note for Muslim Brothers & Sisters</h3>
          <p className="text-gray-200 mb-6">
            We have a designated prayer area available in our showroom. Please feel free to ask our staff for directions to the prayer room. Wudu facilities are also available.
          </p>
          <p className="text-yellow-300 text-xl">
            Masjid Al-Noor is also located 2 blocks away (5 min walk)
          </p>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600">
            Can't find us? Call <a href="tel:+1234567890" className="text-yellow-600 font-bold hover:underline">+1 (234) 567-890</a> for immediate assistance
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Administrator: Hafiz Sajid Syed | sajid.syed@gmail.com
          </p>
        </div>
      </section>
    </div>
  )
}
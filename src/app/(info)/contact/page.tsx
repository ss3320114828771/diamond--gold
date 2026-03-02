// app/(info)/contact/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: 'email'
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setIsSubmitted(true)
    } catch (err) {
      setError('Failed to send message. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-blue-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center border-2 border-white/20">
          <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4">Message Sent!</h2>
          <p className="text-gray-200 mb-8">
            Thank you for contacting us. We'll get back to you within 24 hours.
          </p>
          
          <div className="space-y-4">
            <Link
              href="/"
              className="block w-full py-3 px-4 bg-gradient-to-r from-yellow-400 to-orange-500 
                       text-white font-bold rounded-xl hover:from-yellow-500 hover:to-orange-600 
                       transition duration-300"
            >
              Return to Home
            </Link>
            <button
              onClick={() => setIsSubmitted(false)}
              className="block w-full py-3 px-4 bg-white/20 text-white font-bold rounded-xl 
                       hover:bg-white/30 transition duration-300"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="relative h-[40vh] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-pink-800/90 to-orange-800/90 z-10"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/n4.jpeg')" }}
          ></div>
        </div>

        <div className="relative z-20 h-full flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-3xl md:text-4xl text-yellow-300 font-arabic mb-4 animate-pulse">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Contact Us</h1>
            <p className="text-xl md:text-2xl text-gray-200">We'd Love to Hear From You</p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16 px-4 -mt-20 relative z-30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Phone Card */}
            <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition duration-500">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl 
                            flex items-center justify-center mb-4 group-hover:rotate-12 transition">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Phone</h3>
              <p className="text-gray-600 mb-4">Mon-Sat, 10am-8pm</p>
              <a href="tel:+1234567890" className="text-xl text-yellow-600 font-bold hover:text-yellow-700 transition">
                +1 (234) 567-890
              </a>
            </div>

            {/* Email Card */}
            <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition duration-500">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl 
                            flex items-center justify-center mb-4 group-hover:rotate-12 transition">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Email</h3>
              <p className="text-gray-600 mb-4">24/7 Support</p>
              <a href="mailto:info@hsgold.com" className="text-xl text-yellow-600 font-bold hover:text-yellow-700 transition">
                info@hsgold.com
              </a>
            </div>

            {/* Visit Card */}
            <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition duration-500">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl 
                            flex items-center justify-center mb-4 group-hover:rotate-12 transition">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Visit Us</h3>
              <p className="text-gray-600 mb-4">Showroom Open Daily</p>
              <p className="text-xl text-yellow-600 font-bold">
                123 Jewelry Street<br />NY 10001, USA
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Send us a Message</h2>
              <p className="text-gray-600 mb-8">We'll respond within 24 hours</p>

              {error && (
                <div className="mb-6 p-4 bg-red-100 border-2 border-red-400 rounded-xl text-red-700">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 
                             focus:outline-none transition duration-300"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 
                             focus:outline-none transition duration-300"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 
                             focus:outline-none transition duration-300"
                    placeholder="Enter your phone"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Subject *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 
                             focus:outline-none transition duration-300"
                  >
                    <option value="">Select a subject</option>
                    <option value="product">Product Inquiry</option>
                    <option value="order">Order Status</option>
                    <option value="custom">Custom Design</option>
                    <option value="wholesale">Wholesale Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Preferred Contact */}
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Preferred Contact Method</label>
                  <div className="flex gap-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="email"
                        checked={formData.preferredContact === 'email'}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      Email
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="phone"
                        checked={formData.preferredContact === 'phone'}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      Phone
                    </label>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 
                             focus:outline-none transition duration-300 resize-none"
                    placeholder="Write your message here..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white 
                           font-bold rounded-xl text-lg hover:from-yellow-500 hover:to-orange-600 
                           transform hover:scale-105 transition duration-300
                           disabled:opacity-50 disabled:cursor-not-allowed
                           relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        SENDING...
                      </>
                    ) : (
                      'SEND MESSAGE'
                    )}
                  </span>
                </button>
              </form>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              {/* Map */}
              <div className="bg-white rounded-3xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Location</h3>
                <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.9147703055!2d-74.119763173046!3d40.69740344229443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1645564618725!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-3xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Business Hours</h3>
                <div className="space-y-3">
                  <div className="flex justify-between pb-2 border-b border-gray-200">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-bold text-gray-800">10:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-gray-200">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-bold text-gray-800">11:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-gray-200">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-bold text-gray-800">Closed</span>
                  </div>
                </div>
              </div>

              {/* Admin Contact */}
              <div className="bg-gradient-to-r from-purple-900 to-pink-900 rounded-3xl p-8 shadow-2xl text-white">
                <h3 className="text-2xl font-bold mb-4">Administrator</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-xl">👤</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">Hafiz Sajid Syed</p>
                      <p className="font-bold">Founder & CEO</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-xl">📧</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">Email</p>
                      <p className="font-bold">sajid.syed@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-xl">📞</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">Direct Line</p>
                      <p className="font-bold">+1 (234) 567-890</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-300 text-center mb-12">
            Quick answers to common questions
          </p>

          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="text-xl font-bold text-yellow-300 mb-2">How long does shipping take?</h3>
              <p className="text-gray-300">Domestic shipping takes 3-5 business days. International shipping takes 7-14 business days.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="text-xl font-bold text-yellow-300 mb-2">What is your return policy?</h3>
              <p className="text-gray-300">We offer 30-day returns on all items in original condition with certificate of authenticity.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="text-xl font-bold text-yellow-300 mb-2">Do you offer custom designs?</h3>
              <p className="text-gray-300">Yes! Our expert jewelers can create custom pieces according to your specifications.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="text-xl font-bold text-yellow-300 mb-2">Are your diamonds certified?</h3>
              <p className="text-gray-300">All our diamonds come with GIA or IGI certification ensuring authenticity and quality.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Links */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Connect With Us</h3>
          <div className="flex justify-center gap-4">
            {[
              { name: 'Facebook', icon: '📘', color: 'bg-blue-600' },
              { name: 'Instagram', icon: '📷', color: 'bg-pink-600' },
              { name: 'Twitter', icon: '🐦', color: 'bg-blue-400' },
              { name: 'WhatsApp', icon: '📱', color: 'bg-green-600' },
              { name: 'YouTube', icon: '▶️', color: 'bg-red-600' },
            ].map((social) => (
              <a
                key={social.name}
                href="#"
                className={`w-14 h-14 ${social.color} rounded-full flex items-center justify-center 
                          text-2xl hover:scale-110 transform transition duration-300 hover:rotate-12`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
// app/(auth)/register/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    agreeTerms: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }
      
      // Calculate password strength
      if (name === 'password') {
        let strength = 0
        if (value.length >= 8) strength++
        if (value.match(/[a-z]/)) strength++
        if (value.match(/[A-Z]/)) strength++
        if (value.match(/[0-9]/)) strength++
        if (value.match(/[^a-zA-Z0-9]/)) strength++
        setPasswordStrength(strength)
      }
      
      return newData
    })
  }

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required')
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters')
      return false
    }
    if (!formData.agreeTerms) {
      setError('You must agree to the terms and conditions')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!validateForm()) return
    
    setIsLoading(true)

    // Simulate registration - Replace with actual API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Success - redirect to login or dashboard
      router.push('/login?registered=true')
    } catch (err) {
      setError('Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const getPasswordStrengthColor = () => {
    const colors = {
      0: 'bg-gray-400',
      1: 'bg-red-500',
      2: 'bg-orange-500',
      3: 'bg-yellow-500',
      4: 'bg-blue-500',
      5: 'bg-green-500'
    }
    return colors[passwordStrength as keyof typeof colors] || 'bg-gray-400'
  }

  const getPasswordStrengthText = () => {
    const texts = {
      0: 'Very Weak',
      1: 'Weak',
      2: 'Fair',
      3: 'Good',
      4: 'Strong',
      5: 'Very Strong'
    }
    return texts[passwordStrength as keyof typeof texts] || 'Enter password'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Floating Gold/Diamond Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl md:text-3xl animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${7 + Math.random() * 5}s`,
              opacity: 0.2
            }}
          >
            {i % 4 === 0 ? '💎' : i % 4 === 1 ? '✨' : i % 4 === 2 ? '👑' : '🌟'}
          </div>
        ))}
      </div>

      {/* Main Registration Card */}
      <div className="relative w-full max-w-2xl">
        {/* Decorative Border */}
        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 rounded-3xl blur-xl opacity-75 animate-pulse"></div>
        
        <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-10 border-2 border-white/30 shadow-[0_0_80px_rgba(255,215,0,0.4)]">
          
          {/* Bismillah */}
          <div className="text-center mb-6">
            <p className="text-3xl md:text-4xl text-yellow-300 font-arabic mb-3 animate-pulse">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full"></div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4 animate-bounce">
              <span className="text-3xl">📝</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Join HS Gold
            </h1>
            <p className="text-gray-200 text-lg">
              Create your account and start shopping
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border-2 border-red-500 rounded-xl backdrop-blur-sm animate-shake">
              <p className="text-white text-center flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-red-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-yellow-300 font-bold mb-2 text-lg flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Full Name
              </label>
              <div className="relative group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-white/10 border-2 border-white/30 rounded-xl
                           text-white placeholder-gray-300 text-lg
                           focus:outline-none focus:border-yellow-400 focus:bg-white/20
                           transition-all duration-300 group-hover:border-yellow-300"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-yellow-300 font-bold mb-2 text-lg flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Email Address
              </label>
              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-white/10 border-2 border-white/30 rounded-xl
                           text-white placeholder-gray-300 text-lg
                           focus:outline-none focus:border-yellow-400 focus:bg-white/20
                           transition-all duration-300 group-hover:border-yellow-300"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-yellow-300 font-bold mb-2 text-lg flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Phone Number
              </label>
              <div className="relative group">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-white/10 border-2 border-white/30 rounded-xl
                           text-white placeholder-gray-300 text-lg
                           focus:outline-none focus:border-yellow-400 focus:bg-white/20
                           transition-all duration-300 group-hover:border-yellow-300"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-yellow-300 font-bold mb-2 text-lg flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Password
              </label>
              <div className="relative group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-white/10 border-2 border-white/30 rounded-xl
                           text-white placeholder-gray-300 text-lg
                           focus:outline-none focus:border-yellow-400 focus:bg-white/20
                           transition-all duration-300 group-hover:border-yellow-300
                           pr-12"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 
                           text-gray-300 hover:text-yellow-300 transition-colors duration-300"
                >
                  {showPassword ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1 h-2 mb-1">
                    {[1,2,3,4,5].map((level) => (
                      <div
                        key={level}
                        className={`flex-1 h-full rounded-full transition-all duration-300
                                  ${level <= passwordStrength ? getPasswordStrengthColor() : 'bg-white/20'}`}
                      ></div>
                    ))}
                  </div>
                  <p className={`text-sm ${passwordStrength >= 4 ? 'text-green-400' : 'text-gray-300'}`}>
                    {getPasswordStrengthText()}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-yellow-300 font-bold mb-2 text-lg flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Confirm Password
              </label>
              <div className="relative group">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-white/10 border-2 border-white/30 rounded-xl
                           text-white placeholder-gray-300 text-lg
                           focus:outline-none focus:border-yellow-400 focus:bg-white/20
                           transition-all duration-300 group-hover:border-yellow-300
                           pr-12"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 
                           text-gray-300 hover:text-yellow-300 transition-colors duration-300"
                >
                  {showConfirmPassword ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>
              
              {/* Password Match Indicator */}
              {formData.confirmPassword && (
                <p className={`mt-1 text-sm ${
                  formData.password === formData.confirmPassword 
                    ? 'text-green-400' 
                    : 'text-red-400'
                }`}>
                  {formData.password === formData.confirmPassword 
                    ? '✓ Passwords match' 
                    : '✗ Passwords do not match'}
                </p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="w-5 h-5 mt-1 text-yellow-400 bg-white/10 border-2 border-white/30 
                         rounded focus:ring-yellow-400 focus:ring-2 
                         cursor-pointer transition-all duration-300"
              />
              <label className="text-gray-200 text-sm">
                I agree to the{' '}
                <Link href="/terms" className="text-yellow-300 hover:text-yellow-400 underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-yellow-300 hover:text-yellow-400 underline">
                  Privacy Policy
                </Link>
                . I am at least 18 years old.
              </label>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-5 px-6 bg-gradient-to-r from-yellow-400 to-orange-500
                       text-white font-bold rounded-xl text-xl
                       hover:from-yellow-500 hover:to-orange-600
                       transform hover:scale-105 hover:rotate-1
                       transition-all duration-300
                       shadow-[0_0_40px_rgba(255,215,0,0.5)]
                       disabled:opacity-50 disabled:cursor-not-allowed
                       disabled:hover:scale-100 disabled:hover:rotate-0
                       relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center">
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    CREATING ACCOUNT...
                  </>
                ) : (
                  'CREATE ACCOUNT'
                )}
              </span>
              <div className="absolute inset-0 bg-white/20 transform -translate-x-full 
                            group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <span className="text-gray-300">Already have an account? </span>
            <Link
              href="/login"
              className="text-yellow-300 hover:text-yellow-400 font-bold text-lg
                       hover:underline decoration-2 underline-offset-2 
                       transition-all duration-300"
            >
              Sign In
            </Link>
          </div>

          {/* Admin Info */}
          <div className="mt-8 pt-6 border-t-2 border-white/20 text-center">
            <p className="text-gray-300 text-sm flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Administrator: <span className="text-yellow-300 font-bold">Hafiz Sajid Syed</span>
            </p>
            <p className="text-gray-300 text-sm mt-1">
              📧 <span className="text-yellow-300">sajid.syed@gmail.com</span>
            </p>
          </div>

          {/* Health Benefits Note */}
          <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
            <p className="text-xs text-center text-gray-300">
              💝 Join our family and experience the health benefits of genuine gold and diamond jewelry
            </p>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.2;
          }
          50% { 
            transform: translateY(-30px) rotate(10deg); 
            opacity: 0.4;
          }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  )
}
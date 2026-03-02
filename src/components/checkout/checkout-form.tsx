// components/checkout/checkout-form.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

type CheckoutFormProps = {
  onSubmit?: (data: any) => void
  onBack?: () => void
  isSubmitting?: boolean
}

export default function CheckoutForm({ onSubmit, onBack, isSubmitting = false }: CheckoutFormProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Shipping
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    
    // Payment
    paymentMethod: 'card',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    
    // Additional
    notes: '',
    saveInfo: false,
    newsletter: false
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateShipping = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.firstName) newErrors.firstName = 'First name is required'
    if (!formData.lastName) newErrors.lastName = 'Last name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.phone) newErrors.phone = 'Phone number is required'
    if (!formData.address) newErrors.address = 'Address is required'
    if (!formData.city) newErrors.city = 'City is required'
    if (!formData.state) newErrors.state = 'State is required'
    if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validatePayment = () => {
    const newErrors: Record<string, string> = {}
    
    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required'
      else if (formData.cardNumber.replace(/\s/g, '').length < 16) {
        newErrors.cardNumber = 'Card number must be 16 digits'
      }
      
      if (!formData.cardName) newErrors.cardName = 'Name on card is required'
      
      if (!formData.expiry) newErrors.expiry = 'Expiry date is required'
      else if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) {
        newErrors.expiry = 'Use MM/YY format'
      }
      
      if (!formData.cvv) newErrors.cvv = 'CVV is required'
      else if (formData.cvv.length < 3) newErrors.cvv = 'CVV must be 3-4 digits'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (step === 1 && validateShipping()) {
      setStep(2)
      window.scrollTo(0, 0)
    } else if (step === 2 && validatePayment()) {
      setStep(3)
      window.scrollTo(0, 0)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo(0, 0)
    } else if (onBack) {
      onBack()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(formData)
    }
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return value
    }
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    setFormData(prev => ({ ...prev, cardNumber: formatted }))
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4)
    }
    setFormData(prev => ({ ...prev, expiry: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= 1 ? 'bg-yellow-500 text-white' : 'bg-gray-200'
          }`}>1</div>
          <div className={`w-16 h-1 ${step >= 2 ? 'bg-yellow-500' : 'bg-gray-200'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= 2 ? 'bg-yellow-500 text-white' : 'bg-gray-200'
          }`}>2</div>
          <div className={`w-16 h-1 ${step >= 3 ? 'bg-yellow-500' : 'bg-gray-200'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= 3 ? 'bg-yellow-500 text-white' : 'bg-gray-200'
          }`}>3</div>
        </div>
      </div>

      {/* Step 1: Shipping Information */}
      {step === 1 && (
        <div>
          <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500 ${
                  errors.firstName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500 ${
                  errors.lastName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Address *</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500 ${
                errors.address ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Apartment, suite, etc. (optional)</label>
            <input
              type="text"
              name="apartment"
              value={formData.apartment}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-yellow-500"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">City *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500 ${
                  errors.city ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">State *</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500 ${
                  errors.state ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">ZIP Code *</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500 ${
                  errors.zipCode ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Country *</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-yellow-500"
            >
              <option value="USA">United States</option>
              <option value="UAE">UAE</option>
              <option value="UK">United Kingdom</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="saveInfo"
                checked={formData.saveInfo}
                onChange={handleChange}
                className="mr-2 rounded border-gray-300"
              />
              <span className="text-sm text-gray-600">Save this information for next time</span>
            </label>
          </div>
        </div>
      )}

      {/* Step 2: Payment Information */}
      {step === 2 && (
        <div>
          <h2 className="text-xl font-bold mb-6">Payment Information</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Payment Method</label>
            <div className="space-y-2">
              <label className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={handleChange}
                  className="mr-3"
                />
                <div className="flex items-center gap-2">
                  <span className="text-lg">💳</span>
                  <span>Credit / Debit Card</span>
                </div>
              </label>
              
              <label className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={formData.paymentMethod === 'paypal'}
                  onChange={handleChange}
                  className="mr-3"
                />
                <div className="flex items-center gap-2">
                  <span className="text-lg">📱</span>
                  <span>PayPal</span>
                </div>
              </label>
            </div>
          </div>

          {formData.paymentMethod === 'card' && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Card Number *</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500 ${
                    errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name on Card *</label>
                <input
                  type="text"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleChange}
                  placeholder="As shown on card"
                  className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500 ${
                    errors.cardName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Expiry Date *</label>
                  <input
                    type="text"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleExpiryChange}
                    placeholder="MM/YY"
                    maxLength={5}
                    className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500 ${
                      errors.expiry ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">CVV *</label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    maxLength={4}
                    className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500 ${
                      errors.cvv ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                </div>
              </div>
            </>
          )}

          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleChange}
                className="mr-2 rounded border-gray-300"
              />
              <span className="text-sm text-gray-600">Email me about new products and offers</span>
            </label>
          </div>
        </div>
      )}

      {/* Step 3: Review Order */}
      {step === 3 && (
        <div>
          <h2 className="text-xl font-bold mb-6">Review Your Order</h2>

          <div className="mb-6 p-4 bg-gray-50 rounded">
            <h3 className="font-bold mb-2">Shipping Address</h3>
            <p className="text-gray-600">
              {formData.firstName} {formData.lastName}<br />
              {formData.address}<br />
              {formData.apartment && `${formData.apartment}<br />`}
              {formData.city}, {formData.state} {formData.zipCode}<br />
              {formData.country}
            </p>
            <p className="text-gray-600 mt-2">
              Email: {formData.email}<br />
              Phone: {formData.phone}
            </p>
          </div>

          <div className="mb-6 p-4 bg-gray-50 rounded">
            <h3 className="font-bold mb-2">Payment Method</h3>
            <p className="text-gray-600">
              {formData.paymentMethod === 'card' ? (
                <>💳 Credit Card ending in {formData.cardNumber.slice(-4)}</>
              ) : (
                <>📱 PayPal</>
              )}
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Order Notes (optional)</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-yellow-500"
              placeholder="Special instructions for delivery..."
            />
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={handleBack}
          className="flex-1 py-3 bg-gray-100 text-gray-700 rounded font-bold hover:bg-gray-200 transition"
        >
          Back
        </button>
        
        {step < 3 ? (
          <button
            type="button"
            onClick={handleNext}
            className="flex-1 py-3 bg-yellow-500 text-white rounded font-bold hover:bg-yellow-600 transition"
          >
            Continue
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 py-3 bg-green-500 text-white rounded font-bold hover:bg-green-600 transition disabled:opacity-50"
          >
            {isSubmitting ? 'Placing Order...' : 'Place Order'}
          </button>
        )}
      </div>
    </form>
  )
}
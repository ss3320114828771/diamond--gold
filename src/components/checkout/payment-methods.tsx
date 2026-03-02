// components/checkout/payment-methods.tsx
'use client'

import { useState } from 'react'

type PaymentMethod = 'card' | 'paypal' | 'apple-pay' | 'google-pay'

type PaymentMethodsProps = {
  selectedMethod?: PaymentMethod
  onMethodChange: (method: PaymentMethod) => void
  onCardDetailsChange?: (details: CardDetails) => void
  onSubmit?: () => void
  isProcessing?: boolean
}

type CardDetails = {
  cardNumber: string
  cardName: string
  expiry: string
  cvv: string
  saveCard: boolean
}

export default function PaymentMethods({
  selectedMethod = 'card',
  onMethodChange,
  onCardDetailsChange,
  onSubmit,
  isProcessing = false
}: PaymentMethodsProps) {
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    saveCard: false
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value
    
    setCardDetails(prev => {
      const updated = { ...prev, [name]: newValue }
      if (onCardDetailsChange) {
        onCardDetailsChange(updated)
      }
      return updated
    })

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const parts = []
    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substring(i, i + 4))
    }
    return parts.join(' ').substring(0, 19)
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    setCardDetails(prev => ({ ...prev, cardNumber: formatted }))
    if (onCardDetailsChange) {
      onCardDetailsChange({ ...cardDetails, cardNumber: formatted })
    }
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4)
    }
    setCardDetails(prev => ({ ...prev, expiry: value }))
    if (onCardDetailsChange) {
      onCardDetailsChange({ ...cardDetails, expiry: value })
    }
  }

  const validateCard = () => {
    const newErrors: Record<string, string> = {}
    
    if (!cardDetails.cardNumber) newErrors.cardNumber = 'Card number is required'
    else if (cardDetails.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Card number must be 16 digits'
    }
    
    if (!cardDetails.cardName) newErrors.cardName = 'Name on card is required'
    
    if (!cardDetails.expiry) newErrors.expiry = 'Expiry date is required'
    else if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiry)) {
      newErrors.expiry = 'Use MM/YY format'
    }
    
    if (!cardDetails.cvv) newErrors.cvv = 'CVV is required'
    else if (cardDetails.cvv.length < 3) newErrors.cvv = 'CVV must be 3-4 digits'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (selectedMethod === 'card' && !validateCard()) {
      return
    }
    if (onSubmit) onSubmit()
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-6">Payment Methods</h2>

      {/* Payment Method Selection */}
      <div className="space-y-3 mb-6">
        {/* Credit/Debit Card */}
        <label className={`
          flex items-center p-4 border-2 rounded-lg cursor-pointer transition
          ${selectedMethod === 'card' 
            ? 'border-yellow-500 bg-yellow-50' 
            : 'border-gray-200 hover:border-gray-300'
          }
        `}>
          <input
            type="radio"
            name="paymentMethod"
            value="card"
            checked={selectedMethod === 'card'}
            onChange={(e) => onMethodChange(e.target.value as PaymentMethod)}
            className="mr-3"
          />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-xl">💳</span>
            </div>
            <div>
              <p className="font-bold text-gray-800">Credit / Debit Card</p>
              <p className="text-sm text-gray-500">Visa, MasterCard, American Express</p>
            </div>
          </div>
        </label>

        {/* PayPal */}
        <label className={`
          flex items-center p-4 border-2 rounded-lg cursor-pointer transition
          ${selectedMethod === 'paypal' 
            ? 'border-yellow-500 bg-yellow-50' 
            : 'border-gray-200 hover:border-gray-300'
          }
        `}>
          <input
            type="radio"
            name="paymentMethod"
            value="paypal"
            checked={selectedMethod === 'paypal'}
            onChange={(e) => onMethodChange(e.target.value as PaymentMethod)}
            className="mr-3"
          />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">Pay</span>
            </div>
            <div>
              <p className="font-bold text-gray-800">PayPal</p>
              <p className="text-sm text-gray-500">Fast and secure payments</p>
            </div>
          </div>
        </label>

        {/* Apple Pay */}
        <label className={`
          flex items-center p-4 border-2 rounded-lg cursor-pointer transition
          ${selectedMethod === 'apple-pay' 
            ? 'border-yellow-500 bg-yellow-50' 
            : 'border-gray-200 hover:border-gray-300'
          }
        `}>
          <input
            type="radio"
            name="paymentMethod"
            value="apple-pay"
            checked={selectedMethod === 'apple-pay'}
            onChange={(e) => onMethodChange(e.target.value as PaymentMethod)}
            className="mr-3"
          />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm"></span>
            </div>
            <div>
              <p className="font-bold text-gray-800">Apple Pay</p>
              <p className="text-sm text-gray-500">Pay with Touch ID or Face ID</p>
            </div>
          </div>
        </label>

        {/* Google Pay */}
        <label className={`
          flex items-center p-4 border-2 rounded-lg cursor-pointer transition
          ${selectedMethod === 'google-pay' 
            ? 'border-yellow-500 bg-yellow-50' 
            : 'border-gray-200 hover:border-gray-300'
          }
        `}>
          <input
            type="radio"
            name="paymentMethod"
            value="google-pay"
            checked={selectedMethod === 'google-pay'}
            onChange={(e) => onMethodChange(e.target.value as PaymentMethod)}
            className="mr-3"
          />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <div>
              <p className="font-bold text-gray-800">Google Pay</p>
              <p className="text-sm text-gray-500">Fast checkout with Google</p>
            </div>
          </div>
        </label>
      </div>

      {/* Card Details Form */}
      {selectedMethod === 'card' && (
        <div className="space-y-4 border-t pt-6">
          <h3 className="font-bold text-gray-700">Enter Card Details</h3>

          {/* Card Number */}
          <div>
            <label className="block text-sm font-medium mb-1">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={cardDetails.cardNumber}
              onChange={handleCardNumberChange}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500 ${
                errors.cardNumber ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
            )}
          </div>

          {/* Name on Card */}
          <div>
            <label className="block text-sm font-medium mb-1">Name on Card</label>
            <input
              type="text"
              name="cardName"
              value={cardDetails.cardName}
              onChange={handleCardChange}
              placeholder="As shown on card"
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500 ${
                errors.cardName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.cardName && (
              <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>
            )}
          </div>

          {/* Expiry and CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Expiry Date</label>
              <input
                type="text"
                name="expiry"
                value={cardDetails.expiry}
                onChange={handleExpiryChange}
                placeholder="MM/YY"
                maxLength={5}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500 ${
                  errors.expiry ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.expiry && (
                <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">CVV</label>
              <input
                type="text"
                name="cvv"
                value={cardDetails.cvv}
                onChange={handleCardChange}
                placeholder="123"
                maxLength={4}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500 ${
                  errors.cvv ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.cvv && (
                <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
              )}
            </div>
          </div>

          {/* Save Card */}
          <label className="flex items-center">
            <input
              type="checkbox"
              name="saveCard"
              checked={cardDetails.saveCard}
              onChange={handleCardChange}
              className="mr-2 rounded border-gray-300"
            />
            <span className="text-sm text-gray-600">Save card for future purchases</span>
          </label>

          {/* Security Note */}
          <div className="bg-green-50 p-3 rounded-lg text-xs text-green-700 flex items-start gap-2">
            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <p>Your payment information is encrypted and secure. We never store full card details.</p>
          </div>
        </div>
      )}

      {/* PayPal Info */}
      {selectedMethod === 'paypal' && (
        <div className="border-t pt-6">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-blue-700 mb-2">You'll be redirected to PayPal to complete your payment.</p>
            <p className="text-sm text-blue-600">Secure • Fast • Buyer Protection</p>
          </div>
        </div>
      )}

      {/* Apple Pay Info */}
      {selectedMethod === 'apple-pay' && (
        <div className="border-t pt-6">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-gray-700 mb-2">Pay with Apple Pay using Touch ID or Face ID.</p>
            <p className="text-sm text-gray-600">Available on Safari, Chrome, and Edge</p>
          </div>
        </div>
      )}

      {/* Google Pay Info */}
      {selectedMethod === 'google-pay' && (
        <div className="border-t pt-6">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-blue-700 mb-2">Pay quickly with your Google account.</p>
            <p className="text-sm text-blue-600">Available on Chrome, Android, and more</p>
          </div>
        </div>
      )}

      {/* Continue Button */}
      <button
        onClick={handleSubmit}
        disabled={isProcessing}
        className="w-full mt-6 py-3 bg-yellow-500 text-white rounded-lg font-bold hover:bg-yellow-600 transition disabled:opacity-50"
      >
        {isProcessing ? 'Processing...' : 'Continue to Review'}
      </button>

      {/* Payment Icons */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500 mb-2">Accepted Payment Methods:</p>
        <div className="flex justify-center gap-2">
          <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">VISA</span>
          <span className="px-2 py-1 bg-red-600 text-white text-xs rounded">MC</span>
          <span className="px-2 py-1 bg-blue-400 text-white text-xs rounded">AMEX</span>
          <span className="px-2 py-1 bg-gray-800 text-white text-xs rounded">DISC</span>
          <span className="px-2 py-1 bg-black text-white text-xs rounded">PP</span>
        </div>
      </div>
    </div>
  )
}
// app/(shop)/checkout/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

type FormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  paymentMethod: string
  cardNumber: string
  cardName: string
  expiry: string
  cvv: string
  saveInfo: boolean
}

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    paymentMethod: 'card',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    saveInfo: false
  })

  // Sample cart items
  const cartItems: CartItem[] = [
    {
      id: '1',
      name: '24K Gold Necklace',
      price: 12999,
      quantity: 1,
      image: '/images/n1.jpeg'
    },
    {
      id: '2',
      name: '22K Gold Earrings',
      price: 3499,
      quantity: 2,
      image: '/images/n2.jpeg'
    }
  ]

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = 25
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
    } else if (step === 2) {
      setStep(3)
    } else {
      // Place order
      alert('Order placed successfully!')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Bismillah */}
      <div className="bg-gradient-to-r from-amber-700 to-yellow-700 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-2xl mb-2">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          <h1 className="text-3xl md:text-4xl font-bold">Checkout</h1>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
              {/* Step 1: Shipping Info */}
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Zip Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Country</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                    >
                      <option value="USA">United States</option>
                      <option value="UAE">UAE</option>
                      <option value="UK">United Kingdom</option>
                      <option value="Canada">Canada</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="saveInfo"
                        checked={formData.saveInfo}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <span className="text-sm">Save this information for next time</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-yellow-500 text-white rounded font-bold hover:bg-yellow-600 transition"
                  >
                    Continue to Payment
                  </button>
                </div>
              )}

              {/* Step 2: Payment Info */}
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Payment Information</h2>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Payment Method</label>
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
                        <span>Credit / Debit Card</span>
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
                        <span>PayPal</span>
                      </label>
                    </div>
                  </div>

                  {formData.paymentMethod === 'card' && (
                    <>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Card Number</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          placeholder="1234 5678 9012 3456"
                          required
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Name on Card</label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Expiry Date</label>
                          <input
                            type="text"
                            name="expiry"
                            value={formData.expiry}
                            onChange={handleChange}
                            placeholder="MM/YY"
                            required
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">CVV</label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleChange}
                            placeholder="123"
                            required
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-full py-3 bg-gray-200 text-gray-700 rounded font-bold hover:bg-gray-300 transition"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="w-full py-3 bg-yellow-500 text-white rounded font-bold hover:bg-yellow-600 transition"
                    >
                      Review Order
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Review & Confirm */}
              {step === 3 && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Review Your Order</h2>

                  <div className="mb-6">
                    <h3 className="font-bold mb-2">Shipping Address</h3>
                    <p className="text-gray-600">
                      {formData.firstName} {formData.lastName}<br />
                      {formData.address}<br />
                      {formData.city}, {formData.state} {formData.zipCode}<br />
                      {formData.country}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-bold mb-2">Items</h3>
                    {cartItems.map(item => (
                      <div key={item.id} className="flex justify-between py-2 border-b">
                        <span>{item.name} x{item.quantity}</span>
                        <span>${(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mb-6">
                    <h3 className="font-bold mb-2">Payment Method</h3>
                    <p className="text-gray-600">
                      {formData.paymentMethod === 'card' ? 'Credit Card' : 'PayPal'}
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full py-3 bg-gray-200 text-gray-700 rounded font-bold hover:bg-gray-300 transition"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="w-full py-3 bg-green-500 text-white rounded font-bold hover:bg-green-600 transition"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-3 py-2 border-b">
                  <div className="relative w-16 h-16">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-bold">${(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}

              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-bold">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-bold">${shipping}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-bold">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Total</span>
                  <span className="text-yellow-600">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4 text-xs text-gray-500 text-center">
                <p>Secure Checkout</p>
                <p className="mt-1">We accept: Visa, MasterCard, PayPal</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Info */}
      <div className="bg-gray-100 py-4 text-center text-sm">
        <p>Hafiz Sajid Syed | sajid.syed@gmail.com</p>
      </div>
    </div>
  )
}
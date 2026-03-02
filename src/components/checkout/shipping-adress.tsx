// components/checkout/shipping-address.tsx
'use client'

import { useState } from 'react'

type Address = {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  apartment: string
  city: string
  state: string
  zipCode: string
  country: string
  saveAddress: boolean
}

type ShippingAddressProps = {
  initialData?: Partial<Address>
  onSubmit?: (address: Address) => void
  onBack?: () => void
  isSubmitting?: boolean
  showSaveOption?: boolean
}

export default function ShippingAddress({
  initialData = {},
  onSubmit,
  onBack,
  isSubmitting = false,
  showSaveOption = true
}: ShippingAddressProps) {
  const [address, setAddress] = useState<Address>({
    firstName: initialData.firstName || '',
    lastName: initialData.lastName || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
    address: initialData.address || '',
    apartment: initialData.apartment || '',
    city: initialData.city || '',
    state: initialData.state || '',
    zipCode: initialData.zipCode || '',
    country: initialData.country || 'USA',
    saveAddress: initialData.saveAddress || false
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const countries = [
    'USA', 'UAE', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Italy', 'Spain', 'India', 'Pakistan', 'Saudi Arabia'
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setAddress(prev => ({
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!address.firstName) newErrors.firstName = 'First name is required'
    if (!address.lastName) newErrors.lastName = 'Last name is required'
    if (!address.email) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(address.email)) newErrors.email = 'Email is invalid'
    if (!address.phone) newErrors.phone = 'Phone number is required'
    if (!address.address) newErrors.address = 'Address is required'
    if (!address.city) newErrors.city = 'City is required'
    if (!address.state) newErrors.state = 'State is required'
    if (!address.zipCode) newErrors.zipCode = 'ZIP code is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm() && onSubmit) {
      onSubmit(address)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-6">Shipping Address</h2>

      <form onSubmit={handleSubmit}>
        {/* Name Fields */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={address.firstName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500 ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="John"
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={address.lastName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500 ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Doe"
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          </div>
        </div>

        {/* Contact Fields */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={address.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="john@example.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={address.phone}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500 ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="+1 234 567 890"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
        </div>

        {/* Address Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Street Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="address"
            value={address.address}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500 ${
              errors.address ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="123 Main St"
          />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
        </div>

        {/* Apartment Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Apartment, Suite, etc. <span className="text-gray-400">(optional)</span>
          </label>
          <input
            type="text"
            name="apartment"
            value={address.apartment}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-yellow-500"
            placeholder="Apt 4B"
          />
        </div>

        {/* City, State, ZIP */}
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500 ${
                errors.city ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="New York"
            />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              State <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="state"
              value={address.state}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500 ${
                errors.state ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="NY"
            />
            {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              ZIP Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="zipCode"
              value={address.zipCode}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500 ${
                errors.zipCode ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="10001"
            />
            {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
          </div>
        </div>

        {/* Country */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Country <span className="text-red-500">*</span>
          </label>
          <select
            name="country"
            value={address.country}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-yellow-500"
          >
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        {/* Save Address Option */}
        {showSaveOption && (
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="saveAddress"
                checked={address.saveAddress}
                onChange={handleChange}
                className="mr-2 rounded border-gray-300"
              />
              <span className="text-sm text-gray-600">Save this address for next time</span>
            </label>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="flex-1 py-3 bg-gray-100 text-gray-700 rounded font-bold hover:bg-gray-200 transition"
            >
              Back
            </button>
          )}
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 py-3 bg-yellow-500 text-white rounded font-bold hover:bg-yellow-600 transition disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Continue to Payment'}
          </button>
        </div>

        {/* Help Text */}
        <p className="text-xs text-gray-400 text-center mt-4">
          We'll use this information to ship your order and send updates.
        </p>
      </form>
    </div>
  )
}
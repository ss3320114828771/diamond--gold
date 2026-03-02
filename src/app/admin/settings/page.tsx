// app/admin/settings/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

type Settings = {
  // Store Information
  storeName: string
  storeEmail: string
  storePhone: string
  storeAddress: string
  storeCity: string
  storeState: string
  storeZip: string
  storeCountry: string
  
  // Currency & Tax
  currency: string
  taxRate: string
  taxIncluded: boolean
  
  // Shipping
  freeShippingThreshold: string
  standardShipping: string
  expressShipping: string
  
  // Email Settings
  orderEmail: string
  supportEmail: string
  emailNotifications: boolean
  
  // Order Settings
  autoConfirmOrders: boolean
  lowStockThreshold: string
  
  // Social Media
  facebook: string
  instagram: string
  twitter: string
  whatsapp: string
  
  // SEO
  metaTitle: string
  metaDescription: string
  metaKeywords: string
}

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  
  const [settings, setSettings] = useState<Settings>({
    // Store Information
    storeName: 'HS Gold & Diamonds',
    storeEmail: 'info@hsgold.com',
    storePhone: '+1 234 567 890',
    storeAddress: '123 Jewelry Street',
    storeCity: 'New York',
    storeState: 'NY',
    storeZip: '10001',
    storeCountry: 'USA',
    
    // Currency & Tax
    currency: 'USD',
    taxRate: '8',
    taxIncluded: false,
    
    // Shipping
    freeShippingThreshold: '5000',
    standardShipping: '25',
    expressShipping: '50',
    
    // Email Settings
    orderEmail: 'orders@hsgold.com',
    supportEmail: 'support@hsgold.com',
    emailNotifications: true,
    
    // Order Settings
    autoConfirmOrders: false,
    lowStockThreshold: '5',
    
    // Social Media
    facebook: 'https://facebook.com/hsgold',
    instagram: 'https://instagram.com/hsgold',
    twitter: 'https://twitter.com/hsgold',
    whatsapp: 'https://wa.me/1234567890',
    
    // SEO
    metaTitle: 'HS Gold & Diamonds - Premium Gold and Diamond Jewelry',
    metaDescription: 'Shop the finest gold and diamond jewelry at HS Gold. Traditional and modern designs, certified quality, exceptional craftsmanship.',
    metaKeywords: 'gold jewelry, diamond jewelry, gold necklace, diamond ring, wedding jewelry'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      alert('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  const tabs = [
    { id: 'general', name: 'General', icon: '🏠' },
    { id: 'store', name: 'Store Info', icon: '🏪' },
    { id: 'shipping', name: 'Shipping', icon: '📦' },
    { id: 'email', name: 'Email', icon: '📧' },
    { id: 'social', name: 'Social Media', icon: '🌐' },
    { id: 'seo', name: 'SEO', icon: '🔍' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Bismillah */}
      <div className="bg-gradient-to-r from-amber-700 to-yellow-700 text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-2xl mb-2">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
              <h1 className="text-3xl md:text-4xl font-bold">Settings</h1>
              <p className="text-amber-100 mt-2">Configure your store settings</p>
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded shadow-lg z-50">
          Settings saved successfully!
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Tabs */}
          <div className="md:w-64">
            <div className="bg-white rounded-lg shadow p-4">
              <nav className="space-y-1">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition
                      ${activeTab === tab.id 
                        ? 'bg-yellow-500 text-white' 
                        : 'hover:bg-gray-100 text-gray-700'}`}
                  >
                    <span className="text-xl">{tab.icon}</span>
                    <span className="font-medium">{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Settings Forms */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
              {/* General Settings */}
              {activeTab === 'general' && (
                <div>
                  <h2 className="text-xl font-bold mb-6">General Settings</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Store Name</label>
                      <input
                        type="text"
                        name="storeName"
                        value={settings.storeName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Currency</label>
                        <select
                          name="currency"
                          value={settings.currency}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                        >
                          <option value="USD">USD ($)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="GBP">GBP (£)</option>
                          <option value="AED">AED (د.إ)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Tax Rate (%)</label>
                        <input
                          type="number"
                          name="taxRate"
                          value={settings.taxRate}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="taxIncluded"
                          checked={settings.taxIncluded}
                          onChange={handleChange}
                          className="mr-3"
                        />
                        <span>Tax included in prices</span>
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Low Stock Threshold</label>
                      <input
                        type="number"
                        name="lowStockThreshold"
                        value={settings.lowStockThreshold}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                      />
                      <p className="text-sm text-gray-500 mt-1">Alert when stock falls below this number</p>
                    </div>

                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="autoConfirmOrders"
                          checked={settings.autoConfirmOrders}
                          onChange={handleChange}
                          className="mr-3"
                        />
                        <span>Auto-confirm orders (skip pending status)</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Store Info */}
              {activeTab === 'store' && (
                <div>
                  <h2 className="text-xl font-bold mb-6">Store Information</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Store Email</label>
                      <input
                        type="email"
                        name="storeEmail"
                        value={settings.storeEmail}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Store Phone</label>
                      <input
                        type="text"
                        name="storePhone"
                        value={settings.storePhone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Store Address</label>
                      <input
                        type="text"
                        name="storeAddress"
                        value={settings.storeAddress}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">City</label>
                        <input
                          type="text"
                          name="storeCity"
                          value={settings.storeCity}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">State</label>
                        <input
                          type="text"
                          name="storeState"
                          value={settings.storeState}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">ZIP Code</label>
                        <input
                          type="text"
                          name="storeZip"
                          value={settings.storeZip}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Country</label>
                        <input
                          type="text"
                          name="storeCountry"
                          value={settings.storeCountry}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Shipping Settings */}
              {activeTab === 'shipping' && (
                <div>
                  <h2 className="text-xl font-bold mb-6">Shipping Settings</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Free Shipping Threshold ($)</label>
                      <input
                        type="number"
                        name="freeShippingThreshold"
                        value={settings.freeShippingThreshold}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                      />
                      <p className="text-sm text-gray-500 mt-1">Orders above this amount get free shipping</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Standard Shipping ($)</label>
                        <input
                          type="number"
                          name="standardShipping"
                          value={settings.standardShipping}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Express Shipping ($)</label>
                        <input
                          type="number"
                          name="expressShipping"
                          value={settings.expressShipping}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Email Settings */}
              {activeTab === 'email' && (
                <div>
                  <h2 className="text-xl font-bold mb-6">Email Settings</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Order Email (for notifications)</label>
                      <input
                        type="email"
                        name="orderEmail"
                        value={settings.orderEmail}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Support Email</label>
                      <input
                        type="email"
                        name="supportEmail"
                        value={settings.supportEmail}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                      />
                    </div>

                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="emailNotifications"
                          checked={settings.emailNotifications}
                          onChange={handleChange}
                          className="mr-3"
                        />
                        <span>Enable email notifications</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Social Media */}
              {activeTab === 'social' && (
                <div>
                  <h2 className="text-xl font-bold mb-6">Social Media Links</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Facebook</label>
                      <input
                        type="url"
                        name="facebook"
                        value={settings.facebook}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                        placeholder="https://facebook.com/..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Instagram</label>
                      <input
                        type="url"
                        name="instagram"
                        value={settings.instagram}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                        placeholder="https://instagram.com/..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Twitter</label>
                      <input
                        type="url"
                        name="twitter"
                        value={settings.twitter}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                        placeholder="https://twitter.com/..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">WhatsApp</label>
                      <input
                        type="url"
                        name="whatsapp"
                        value={settings.whatsapp}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                        placeholder="https://wa.me/..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SEO Settings */}
              {activeTab === 'seo' && (
                <div>
                  <h2 className="text-xl font-bold mb-6">SEO Settings</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Meta Title</label>
                      <input
                        type="text"
                        name="metaTitle"
                        value={settings.metaTitle}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                      />
                      <p className="text-sm text-gray-500 mt-1">{settings.metaTitle.length}/60 characters</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Meta Description</label>
                      <textarea
                        name="metaDescription"
                        value={settings.metaDescription}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                      />
                      <p className="text-sm text-gray-500 mt-1">{settings.metaDescription.length}/160 characters</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Meta Keywords</label>
                      <input
                        type="text"
                        name="metaKeywords"
                        value={settings.metaKeywords}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
                        placeholder="Separate with commas"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button (Mobile) */}
              <div className="mt-6 pt-6 border-t md:hidden">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full py-3 bg-yellow-500 text-white rounded-lg font-bold hover:bg-yellow-600 transition disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Admin Info */}
        <div className="mt-8 bg-gray-100 py-4 text-center text-sm rounded">
          <p>Hafiz Sajid Syed | sajid.syed@gmail.com</p>
        </div>
      </div>
    </div>
  )
}
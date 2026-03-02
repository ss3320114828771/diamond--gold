// utils/validation.ts

// Email validation
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Phone number validation (E.164 format)
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/
  return phoneRegex.test(phone)
}

// US ZIP code validation
export function isValidZipCode(zipCode: string): boolean {
  const zipRegex = /^\d{5}(-\d{4})?$/
  return zipRegex.test(zipCode)
}

// Name validation (letters and spaces only)
export function isValidName(name: string): boolean {
  const nameRegex = /^[a-zA-Z\s]+$/
  return nameRegex.test(name)
}

// Password validation
export function isValidPassword(password: string, minLength: number = 6): boolean {
  return password.length >= minLength
}

// Password strength check
export function getPasswordStrength(password: string): {
  score: number
  feedback: string[]
} {
  const feedback: string[] = []
  let score = 0

  if (password.length >= 8) {
    score += 1
  } else {
    feedback.push('Use at least 8 characters')
  }

  if (/[a-z]/.test(password)) {
    score += 1
  } else {
    feedback.push('Add lowercase letters')
  }

  if (/[A-Z]/.test(password)) {
    score += 1
  } else {
    feedback.push('Add uppercase letters')
  }

  if (/[0-9]/.test(password)) {
    score += 1
  } else {
    feedback.push('Add numbers')
  }

  if (/[^a-zA-Z0-9]/.test(password)) {
    score += 1
  } else {
    feedback.push('Add special characters')
  }

  return { score, feedback }
}

// URL validation
export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Credit card validation (Luhn algorithm)
export function isValidCreditCard(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\D/g, '').split('').map(Number)
  
  if (digits.length < 13 || digits.length > 19) {
    return false
  }

  let sum = 0
  let isEven = false

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = digits[i]

    if (isEven) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }

    sum += digit
    isEven = !isEven
  }

  return sum % 10 === 0
}

// Credit card expiry validation
export function isValidCardExpiry(expiry: string): boolean {
  const match = expiry.match(/^(\d{2})\/(\d{2})$/)
  if (!match) return false

  const month = parseInt(match[1], 10)
  const year = parseInt(match[2], 10) + 2000
  const now = new Date()
  const expDate = new Date(year, month, 1)

  return month >= 1 && month <= 12 && expDate > now
}

// CVV validation
export function isValidCVV(cvv: string): boolean {
  return /^\d{3,4}$/.test(cvv)
}

// SKU validation
export function isValidSKU(sku: string): boolean {
  return /^[A-Z0-9-]+$/.test(sku)
}

// Product purity validation
export function isValidGoldPurity(purity: string): boolean {
  const validPurities = ['24K', '22K', '18K', '14K']
  return validPurities.includes(purity)
}

// Weight validation
export function isValidWeight(weight: number): boolean {
  return typeof weight === 'number' && !isNaN(weight) && weight > 0 && weight < 1000
}

// Price validation
export function isValidPrice(price: number): boolean {
  return typeof price === 'number' && !isNaN(price) && price >= 0 && price < 1000000
}

// Quantity validation
export function isValidQuantity(quantity: number): boolean {
  return Number.isInteger(quantity) && quantity > 0 && quantity <= 99
}

// Date validation
export function isValidDate(date: string): boolean {
  const d = new Date(date)
  return d instanceof Date && !isNaN(d.getTime())
}

// Age validation (must be at least 18)
export function isValidAge(birthDate: string, minAge: number = 18): boolean {
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  
  return age >= minAge
}

// Address validation
export function isValidAddress(address: {
  line1?: string
  city?: string
  state?: string
  zipCode?: string
  country?: string
}): boolean {
  return !!(
    address.line1?.trim() &&
    address.city?.trim() &&
    address.state?.trim() &&
    isValidZipCode(address.zipCode || '') &&
    address.country?.trim()
  )
}

// Order number validation
export function isValidOrderNumber(orderNumber: string): boolean {
  return /^ORD-\d{4}-\d{6}-\d{3}$/.test(orderNumber)
}

// Tracking number validation
export function isValidTrackingNumber(trackingNumber: string): boolean {
  return trackingNumber.length >= 5 && trackingNumber.length <= 30
}

// Coupon code validation
export function isValidCouponCode(code: string): boolean {
  return /^[A-Z0-9]{4,12}$/.test(code)
}

// Percentage validation
export function isValidPercentage(value: number): boolean {
  return typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 100
}

// Range validation
export function isValidRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max
}

// Array validation
export function isValidArray<T>(arr: T[], minLength: number = 1): boolean {
  return Array.isArray(arr) && arr.length >= minLength
}

// Object validation
export function isValidObject(obj: any): boolean {
  return obj && typeof obj === 'object' && !Array.isArray(obj) && Object.keys(obj).length > 0
}

// File validation
export function isValidFile(
  file: File,
  options?: {
    maxSize?: number
    allowedTypes?: string[]
  }
): { valid: boolean; error?: string } {
  const { maxSize = 5 * 1024 * 1024, allowedTypes = ['image/jpeg', 'image/png', 'image/webp'] } =
    options || {}

  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File size must be less than ${maxSize / 1024 / 1024}MB`,
    }
  }

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type must be ${allowedTypes.join(', ')}`,
    }
  }

  return { valid: true }
}

// Image dimensions validation
export function isValidImageDimensions(
  file: File,
  options?: {
    minWidth?: number
    maxWidth?: number
    minHeight?: number
    maxHeight?: number
  }
): Promise<{ valid: boolean; error?: string }> {
  return new Promise((resolve) => {
    const img = new Image()
    const url = URL.createObjectURL(file)

    img.onload = () => {
      URL.revokeObjectURL(url)
      
      const { minWidth = 0, maxWidth = 5000, minHeight = 0, maxHeight = 5000 } = options || {}

      if (img.width < minWidth) {
        resolve({ valid: false, error: `Image width must be at least ${minWidth}px` })
        return
      }

      if (img.width > maxWidth) {
        resolve({ valid: false, error: `Image width must be less than ${maxWidth}px` })
        return
      }

      if (img.height < minHeight) {
        resolve({ valid: false, error: `Image height must be at least ${minHeight}px` })
        return
      }

      if (img.height > maxHeight) {
        resolve({ valid: false, error: `Image height must be less than ${maxHeight}px` })
        return
      }

      resolve({ valid: true })
    }

    img.onerror = () => {
      URL.revokeObjectURL(url)
      resolve({ valid: false, error: 'Invalid image file' })
    }

    img.src = url
  })
}

// JSON validation
export function isValidJSON(str: string): boolean {
  try {
    JSON.parse(str)
    return true
  } catch {
    return false
  }
}

// HEX color validation
export function isValidHexColor(color: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)
}

// RGB color validation
export function isValidRgbColor(r: number, g: number, b: number): boolean {
  return (
    r >= 0 && r <= 255 &&
    g >= 0 && g <= 255 &&
    b >= 0 && b <= 255
  )
}

// Boolean validation
export function isValidBoolean(value: any): boolean {
  return typeof value === 'boolean'
}

// Integer validation
export function isValidInteger(value: any): boolean {
  return Number.isInteger(value)
}

// Float validation
export function isValidFloat(value: any): boolean {
  return typeof value === 'number' && !isNaN(value) && isFinite(value)
}

// Alpha validation (letters only)
export function isAlpha(str: string): boolean {
  return /^[a-zA-Z]+$/.test(str)
}

// Alphanumeric validation (letters and numbers only)
export function isAlphanumeric(str: string): boolean {
  return /^[a-zA-Z0-9]+$/.test(str)
}

// Username validation
export function isValidUsername(username: string): boolean {
  return /^[a-zA-Z0-9_]{3,20}$/.test(username)
}

// IP address validation
export function isValidIP(ip: string): boolean {
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/
  if (!ipv4Regex.test(ip)) return false
  
  const parts = ip.split('.').map(Number)
  return parts.every(part => part >= 0 && part <= 255)
}

// MAC address validation
export function isValidMAC(mac: string): boolean {
  return /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(mac)
}

// ISBN validation
export function isValidISBN(isbn: string): boolean {
  const cleaned = isbn.replace(/[-\s]/g, '')
  
  if (cleaned.length === 10) {
    return /^\d{9}[\dX]$/.test(cleaned)
  }
  
  if (cleaned.length === 13) {
    return /^\d{13}$/.test(cleaned)
  }
  
  return false
}

// Required field validation
export function isRequired(value: any): boolean {
  if (value === null || value === undefined) return false
  if (typeof value === 'string') return value.trim() !== ''
  if (Array.isArray(value)) return value.length > 0
  if (typeof value === 'object') return Object.keys(value).length > 0
  return true
}

// Min length validation
export function minLength(value: string, length: number): boolean {
  return value.length >= length
}

// Max length validation
export function maxLength(value: string, length: number): boolean {
  return value.length <= length
}

// Exact length validation
export function exactLength(value: string, length: number): boolean {
  return value.length === length
}

// Min value validation
export function minValue(value: number, min: number): boolean {
  return value >= min
}

// Max value validation
export function maxValue(value: number, max: number): boolean {
  return value <= max
}

// Between validation
export function between(value: number, min: number, max: number): boolean {
  return value >= min && value <= max
}

// Match validation (e.g., password confirmation)
export function matches(value: string, matchValue: string): boolean {
  return value === matchValue
}

// Contains validation
export function contains(value: string, substring: string): boolean {
  return value.includes(substring)
}

// Starts with validation
export function startsWith(value: string, prefix: string): boolean {
  return value.startsWith(prefix)
}

// Ends with validation
export function endsWith(value: string, suffix: string): boolean {
  return value.endsWith(suffix)
}
// utils/format.ts

// Format price to currency
export function formatPrice(
  price: number,
  options?: {
    currency?: string
    locale?: string
    minimumFractionDigits?: number
    maximumFractionDigits?: number
  }
): string {
  const {
    currency = 'USD',
    locale = 'en-US',
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
  } = options || {}

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(price)
}

// Format number with commas
export function formatNumber(
  num: number,
  options?: {
    locale?: string
    minimumFractionDigits?: number
    maximumFractionDigits?: number
  }
): string {
  const {
    locale = 'en-US',
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
  } = options || {}

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(num)
}

// Format percentage
export function formatPercentage(
  value: number,
  options?: {
    locale?: string
    minimumFractionDigits?: number
    maximumFractionDigits?: number
  }
): string {
  const {
    locale = 'en-US',
    minimumFractionDigits = 0,
    maximumFractionDigits = 1,
  } = options || {}

  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value / 100)
}

// Format phone number
export function formatPhoneNumber(phone: string): string {
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '')
  
  // Check if it's a US number
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }
  
  // International format
  if (cleaned.length > 10) {
    return `+${cleaned.slice(0, cleaned.length - 10)} ${cleaned.slice(-10, -7)} ${cleaned.slice(-7, -4)} ${cleaned.slice(-4)}`
  }
  
  return phone
}

// Format credit card number
export function formatCardNumber(cardNumber: string): string {
  const cleaned = cardNumber.replace(/\D/g, '')
  const parts = []
  
  for (let i = 0; i < cleaned.length; i += 4) {
    parts.push(cleaned.slice(i, i + 4))
  }
  
  return parts.join(' ')
}

// Format credit card expiry
export function formatCardExpiry(expiry: string): string {
  const cleaned = expiry.replace(/\D/g, '')
  
  if (cleaned.length >= 2) {
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`
  }
  
  return cleaned
}

// Format file size
export function formatFileSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let size = bytes
  let unitIndex = 0
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }
  
  return `${size.toFixed(1)} ${units[unitIndex]}`
}

// Format duration in seconds
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  
  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`
  }
  if (minutes > 0) {
    return `${minutes}m ${secs}s`
  }
  return `${secs}s`
}

// Format name (capitalize first letter of each word)
export function formatName(name: string): string {
  return name
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Format address
export function formatAddress(address: {
  line1: string
  line2?: string
  city: string
  state: string
  zipCode: string
  country?: string
}): string {
  const parts = [address.line1]
  
  if (address.line2) {
    parts.push(address.line2)
  }
  
  parts.push(`${address.city}, ${address.state} ${address.zipCode}`)
  
  if (address.country) {
    parts.push(address.country)
  }
  
  return parts.join(', ')
}

// Format order number
export function formatOrderNumber(orderNumber: string): string {
  return orderNumber.replace(/-/g, ' ')
}

// Format SKU
export function formatSKU(sku: string): string {
  return sku.toUpperCase().replace(/[^A-Z0-9-]/g, '')
}

// Format weight
export function formatWeight(
  weight: number,
  unit: 'g' | 'kg' | 'oz' | 'lb' = 'g'
): string {
  const formatted = weight.toFixed(1)
  
  const units = {
    g: 'g',
    kg: 'kg',
    oz: 'oz',
    lb: 'lb',
  }
  
  return `${formatted} ${units[unit]}`
}

// Format dimensions
export function formatDimensions(
  dimensions: {
    length: number
    width: number
    height: number
  },
  unit: 'mm' | 'cm' | 'inch' = 'mm'
): string {
  const units = {
    mm: 'mm',
    cm: 'cm',
    inch: '"',
  }
  
  return `${dimensions.length} × ${dimensions.width} × ${dimensions.height} ${units[unit]}`
}

// Format rating (e.g., 4.5 out of 5)
export function formatRating(rating: number, max: number = 5): string {
  return `${rating.toFixed(1)}/${max}`
}

// Format review count with pluralization
export function formatReviewCount(count: number): string {
  if (count === 0) return 'No reviews'
  if (count === 1) return '1 review'
  return `${count} reviews`
}

// Format stock status
export function formatStockStatus(stock: number, threshold: number = 5): string {
  if (stock === 0) return 'Out of Stock'
  if (stock <= threshold) return `Only ${stock} left`
  return 'In Stock'
}

// Format discount
export function formatDiscount(discount: number): string {
  return `-${discount}%`
}

// Format price range
export function formatPriceRange(
  minPrice: number,
  maxPrice: number,
  currency?: string
): string {
  if (minPrice === maxPrice) {
    return formatPrice(minPrice, { currency })
  }
  return `${formatPrice(minPrice, { currency})} - ${formatPrice(maxPrice, { currency})}`
}

// Format list with commas and "and"
export function formatList(items: string[]): string {
  if (items.length === 0) return ''
  if (items.length === 1) return items[0]
  if (items.length === 2) return `${items[0]} and ${items[1]}`
  
  const last = items.pop()
  return `${items.join(', ')}, and ${last}`
}

// Format boolean as Yes/No
export function formatBoolean(value: boolean): string {
  return value ? 'Yes' : 'No'
}

// Format gender
export function formatGender(gender: string): string {
  const genders: Record<string, string> = {
    men: 'Men',
    women: 'Women',
    unisex: 'Unisex',
    kids: 'Kids',
  }
  return genders[gender] || gender
}

// Format product purity
export function formatPurity(purity: string): string {
  if (purity.endsWith('K')) {
    return `${purity} Gold`
  }
  return purity
}

// Format search query for display
export function formatSearchQuery(query: string): string {
  return query.trim().replace(/\s+/g, ' ')
}

// Format slug for display
export function formatSlug(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Format time ago (simplified version)
export function formatTimeAgo(date: string | Date): string {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)
  
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ]
  
  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds)
    if (count > 0) {
      return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`
    }
  }
  
  return 'just now'
}

// Format phone number for display (simple version)
export function formatPhoneSimple(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }
  return phone
}

// Format zip code
export function formatZipCode(zipCode: string): string {
  const cleaned = zipCode.replace(/\D/g, '')
  if (cleaned.length === 9) {
    return `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`
  }
  return cleaned.slice(0, 5)
}

// Format currency amount (without symbol)
export function formatAmount(
  amount: number,
  options?: {
    locale?: string
    minimumFractionDigits?: number
    maximumFractionDigits?: number
  }
): string {
  const {
    locale = 'en-US',
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
  } = options || {}

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount)
}

// Format percentage change
export function formatChange(current: number, previous: number): string {
  const change = ((current - previous) / previous) * 100
  const sign = change > 0 ? '+' : ''
  return `${sign}${change.toFixed(1)}%`
}

// Format color name
export function formatColorName(color: string): string {
  const colors: Record<string, string> = {
    white: 'White',
    yellow: 'Yellow Gold',
    rose: 'Rose Gold',
    platinum: 'Platinum',
    silver: 'Silver',
  }
  return colors[color] || color
}

// Format gemstone name
export function formatGemstone(gemstone: string): string {
  const gemstones: Record<string, string> = {
    diamond: 'Diamond',
    ruby: 'Ruby',
    sapphire: 'Sapphire',
    emerald: 'Emerald',
    pearl: 'Pearl',
  }
  return gemstones[gemstone] || gemstone
}
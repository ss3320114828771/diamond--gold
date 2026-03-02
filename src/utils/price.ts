// utils/price.ts

// Price calculation utilities

// Calculate discounted price
export function calculateDiscountedPrice(price: number, discount: number): number {
  if (discount < 0 || discount > 100) return price
  return price - (price * discount) / 100
}

// Calculate discount percentage
export function calculateDiscountPercentage(original: number, discounted: number): number {
  if (original <= 0 || discounted >= original) return 0
  return Math.round(((original - discounted) / original) * 100)
}

// Calculate tax amount
export function calculateTax(amount: number, taxRate: number): number {
  return amount * (taxRate / 100)
}

// Calculate total with tax
export function calculateTotalWithTax(amount: number, taxRate: number): number {
  return amount + calculateTax(amount, taxRate)
}

// Calculate subtotal from items
export function calculateSubtotal(
  items: Array<{ price: number; quantity: number }>
): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

// Calculate shipping cost based on subtotal
export function calculateShipping(
  subtotal: number,
  freeThreshold: number = 5000,
  shippingCost: number = 25
): number {
  return subtotal >= freeThreshold ? 0 : shippingCost
}

// Calculate order total
export function calculateOrderTotal(params: {
  subtotal: number
  shipping: number
  tax: number
  discount: number
}): number {
  return params.subtotal + params.shipping + params.tax - params.discount
}

// Calculate savings
export function calculateSavings(original: number, final: number): number {
  return original - final
}

// Calculate price per unit (e.g., per gram)
export function calculatePricePerUnit(price: number, weight: number): number {
  if (weight <= 0) return price
  return price / weight
}

// Calculate price with markup
export function calculatePriceWithMarkup(cost: number, markupPercent: number): number {
  return cost * (1 + markupPercent / 100)
}

// Calculate profit margin
export function calculateProfitMargin(cost: number, sellingPrice: number): number {
  if (sellingPrice <= 0) return 0
  return ((sellingPrice - cost) / sellingPrice) * 100
}

// Calculate installment price
export function calculateInstallment(
  total: number,
  months: number,
  interestRate: number = 0
): number {
  const withInterest = total * (1 + interestRate / 100)
  return withInterest / months
}

// Price comparison utilities

// Compare prices (returns -1 if price1 < price2, 0 if equal, 1 if price1 > price2)
export function comparePrices(price1: number, price2: number): number {
  if (price1 < price2) return -1
  if (price1 > price2) return 1
  return 0
}

// Get best price from multiple prices
export function getBestPrice(prices: number[]): number {
  return Math.min(...prices)
}

// Get average price
export function getAveragePrice(prices: number[]): number {
  if (prices.length === 0) return 0
  const sum = prices.reduce((acc, price) => acc + price, 0)
  return sum / prices.length
}

// Price validation utilities

// Check if price is valid
export function isValidPrice(price: number): boolean {
  return typeof price === 'number' && !isNaN(price) && isFinite(price) && price >= 0
}

// Check if discount is valid
export function isValidDiscount(discount: number): boolean {
  return (
    typeof discount === 'number' &&
    !isNaN(discount) &&
    isFinite(discount) &&
    discount >= 0 &&
    discount <= 100
  )
}

// Check if price range is valid
export function isValidPriceRange(min: number, max: number): boolean {
  return isValidPrice(min) && isValidPrice(max) && min <= max
}

// Price formatting utilities

// Format price with currency symbol
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

// Format price without currency symbol
export function formatPriceNumber(
  price: number,
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
  }).format(price)
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

// Format discount percentage
export function formatDiscount(discount: number): string {
  return `-${discount}%`
}

// Format savings
export function formatSavings(amount: number, currency?: string): string {
  return `Save ${formatPrice(amount, { currency})}`
}

// Price rounding utilities

// Round price to nearest value
export function roundPrice(price: number, nearest: number = 1): number {
  return Math.round(price / nearest) * nearest
}

// Round price up (ceiling)
export function roundUpPrice(price: number, nearest: number = 1): number {
  return Math.ceil(price / nearest) * nearest
}

// Round price down (floor)
export function roundDownPrice(price: number, nearest: number = 1): number {
  return Math.floor(price / nearest) * nearest
}

// Price adjustment utilities

// Apply discount to price
export function applyDiscount(price: number, discount: number): number {
  if (!isValidDiscount(discount)) return price
  return price - (price * discount) / 100
}

// Apply markup to price
export function applyMarkup(price: number, markup: number): number {
  return price * (1 + markup / 100)
}

// Apply tax to price
export function applyTax(price: number, taxRate: number): number {
  return price * (1 + taxRate / 100)
}

// Remove tax from price
export function removeTax(priceWithTax: number, taxRate: number): number {
  return priceWithTax / (1 + taxRate / 100)
}

// Price comparison with tolerance
export function pricesAreEqual(
  price1: number,
  price2: number,
  tolerance: number = 0.01
): boolean {
  return Math.abs(price1 - price2) <= tolerance
}

// Price distribution utilities

// Get price segments for price range filter
export function getPriceSegments(
  min: number,
  max: number,
  segments: number = 5
): Array<{ min: number; max: number; label: string }> {
  const step = (max - min) / segments
  const result = []

  for (let i = 0; i < segments; i++) {
    const segmentMin = min + i * step
    const segmentMax = i === segments - 1 ? max : min + (i + 1) * step
    result.push({
      min: Math.round(segmentMin),
      max: Math.round(segmentMax),
      label: `${formatPriceNumber(Math.round(segmentMin))} - ${formatPriceNumber(
        Math.round(segmentMax)
      )}`,
    })
  }

  return result
}

// Price trend analysis

// Calculate price change percentage
export function calculatePriceChange(previous: number, current: number): number {
  if (previous === 0) return 0
  return ((current - previous) / previous) * 100
}

// Calculate moving average
export function calculateMovingAverage(prices: number[], window: number = 7): number[] {
  if (prices.length < window) return []

  const result = []
  for (let i = 0; i <= prices.length - window; i++) {
    const sum = prices.slice(i, i + window).reduce((acc, price) => acc + price, 0)
    result.push(sum / window)
  }

  return result
}

// Price per gram utilities for gold/diamonds

// Calculate price per gram
export function calculatePricePerGram(price: number, weightInGrams: number): number {
  if (weightInGrams <= 0) return 0
  return price / weightInGrams
}

// Calculate price by weight
export function calculatePriceByWeight(pricePerGram: number, weightInGrams: number): number {
  return pricePerGram * weightInGrams
}

// Calculate gold price based on purity
export function calculateGoldPrice(
  weightInGrams: number,
  purity: '24K' | '22K' | '18K' | '14K',
  marketPricePerGram: number
): number {
  const purityFactors = {
    '24K': 1.0,
    '22K': 0.9167,
    '18K': 0.75,
    '14K': 0.5833,
  }

  const factor = purityFactors[purity]
  return weightInGrams * marketPricePerGram * factor
}

// Calculate making charges
export function calculateMakingCharges(
  basePrice: number,
  chargePercentage: number = 10
): number {
  return basePrice * (chargePercentage / 100)
}

// Calculate final jewelry price
export function calculateJewelryPrice(params: {
  weight: number
  purity: '24K' | '22K' | '18K' | '14K'
  marketPrice: number
  makingChargePercent: number
  taxRate?: number
}): {
  basePrice: number
  makingCharges: number
  subtotal: number
  tax: number
  total: number
} {
  const basePrice = calculateGoldPrice(params.weight, params.purity, params.marketPrice)
  const makingCharges = calculateMakingCharges(basePrice, params.makingChargePercent)
  const subtotal = basePrice + makingCharges
  const tax = params.taxRate ? calculateTax(subtotal, params.taxRate) : 0
  const total = subtotal + tax

  return {
    basePrice,
    makingCharges,
    subtotal,
    tax,
    total,
  }
}

// Bulk price calculations

// Calculate bulk discount
export function calculateBulkDiscount(
  quantity: number,
  basePrice: number,
  discounts: Array<{ minQty: number; maxQty: number; discountPercent: number }>
): number {
  const applicableDiscount = discounts.find(
    d => quantity >= d.minQty && quantity <= d.maxQty
  )

  if (!applicableDiscount) return basePrice * quantity

  const discountedPrice = applyDiscount(basePrice, applicableDiscount.discountPercent)
  return discountedPrice * quantity
}

// Calculate tiered pricing
export function calculateTieredPrice(
  quantity: number,
  tiers: Array<{ minQty: number; price: number }>
): number {
  const applicableTier = [...tiers]
    .reverse()
    .find(tier => quantity >= tier.minQty)

  return applicableTier ? applicableTier.price * quantity : 0
}
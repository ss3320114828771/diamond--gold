// utils/helpers.ts

// Deep clone an object
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

// Check if object is empty
export function isEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0
}

// Check if value is null or undefined
export function isNil(value: any): boolean {
  return value === null || value === undefined
}

// Check if value is empty (null, undefined, empty string, empty array, empty object)
export function isEmptyValue(value: any): boolean {
  if (isNil(value)) return true
  if (typeof value === 'string') return value.trim() === ''
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return isEmpty(value)
  return false
}

// Remove empty values from object
export function removeEmptyValues(obj: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {}
  
  for (const [key, value] of Object.entries(obj)) {
    if (!isEmptyValue(value)) {
      result[key] = value
    }
  }
  
  return result
}

// Pick specific keys from object
export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>
  
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key]
    }
  }
  
  return result
}

// Omit specific keys from object
export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj }
  
  for (const key of keys) {
    delete result[key]
  }
  
  return result
}

// Merge objects deeply
export function deepMerge<T extends object>(target: T, source: Partial<T>): T {
  const output = { ...target }
  
  for (const [key, value] of Object.entries(source)) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      output[key as keyof T] = deepMerge(
        output[key as keyof T] as object,
        value as object
      ) as any
    } else {
      output[key as keyof T] = value as any
    }
  }
  
  return output
}

// Generate random ID
export function generateId(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  
  return result
}

// Generate random number between min and max
export function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Delay execution
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Retry function with exponential backoff
export async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error
      if (attempt === maxAttempts) break
      await new Promise(resolve => setTimeout(resolve, delay * attempt))
    }
  }
  
  throw lastError!
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return function (...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle function
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false
  
  return function (...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Memoize function results
export function memoize<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => ReturnType<T> {
  const cache = new Map<string, ReturnType<T>>()
  
  return function (...args: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify(args)
    
    if (cache.has(key)) {
      return cache.get(key)!
    }
    
    const result = func(...args)
    cache.set(key, result)
    return result
  }
}

// Chunk array into smaller arrays
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = []
  
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  
  return chunks
}

// Shuffle array (Fisher-Yates)
export function shuffle<T>(array: T[]): T[] {
  const result = [...array]
  
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  
  return result
}

// Group array by key
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = String(item[key])
    if (!result[groupKey]) {
      result[groupKey] = []
    }
    result[groupKey].push(item)
    return result
  }, {} as Record<string, T[]>)
}

// Sort array by key
export function sortBy<T>(
  array: T[],
  key: keyof T,
  order: 'asc' | 'desc' = 'asc'
): T[] {
  return [...array].sort((a, b) => {
    if (a[key] < b[key]) return order === 'asc' ? -1 : 1
    if (a[key] > b[key]) return order === 'asc' ? 1 : -1
    return 0
  })
}

// Unique array by key
export function uniqueBy<T>(array: T[], key: keyof T): T[] {
  const seen = new Set()
  return array.filter(item => {
    const value = item[key]
    if (seen.has(value)) return false
    seen.add(value)
    return true
  })
}

// Flatten nested array
export function flatten<T>(array: any[]): T[] {
  return array.reduce((result, item) => {
    if (Array.isArray(item)) {
      result.push(...flatten(item))
    } else {
      result.push(item)
    }
    return result
  }, [])
}

// Intersection of arrays
export function intersection<T>(...arrays: T[][]): T[] {
  if (arrays.length === 0) return []
  
  return arrays.reduce((result, array) => {
    return result.filter(item => array.includes(item))
  })
}

// Difference of arrays
export function difference<T>(array1: T[], array2: T[]): T[] {
  return array1.filter(item => !array2.includes(item))
}

// Union of arrays
export function union<T>(...arrays: T[][]): T[] {
  return [...new Set(arrays.flat())]
}

// Check if string contains only numbers
export function isNumeric(str: string): boolean {
  return /^\d+$/.test(str)
}

// Check if string contains only letters
export function isAlpha(str: string): boolean {
  return /^[a-zA-Z]+$/.test(str)
}

// Check if string contains only letters and numbers
export function isAlphanumeric(str: string): boolean {
  return /^[a-zA-Z0-9]+$/.test(str)
}

// Capitalize first letter
export function capitalize(str: string): string {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

// Capitalize each word
export function capitalizeWords(str: string): string {
  return str
    .split(' ')
    .map(word => capitalize(word))
    .join(' ')
}

// Truncate string
export function truncate(str: string, length: number, suffix: string = '...'): string {
  if (str.length <= length) return str
  return str.slice(0, length) + suffix
}

// Slugify string
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
}

// Strip HTML tags
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '')
}

// Escape HTML special characters
export function escapeHtml(str: string): string {
  const entities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }
  
  return str.replace(/[&<>"']/g, char => entities[char])
}

// Unescape HTML special characters
export function unescapeHtml(str: string): string {
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
  }
  
  return str.replace(/&amp;|&lt;|&gt;|&quot;|&#39;/g, entity => entities[entity])
}

// Get URL parameters
export function getUrlParams(url: string): Record<string, string> {
  const params = new URLSearchParams(url.split('?')[1])
  const result: Record<string, string> = {}
  
  params.forEach((value, key) => {
    result[key] = value
  })
  
  return result
}

// Build URL with query parameters
export function buildUrl(base: string, params: Record<string, any>): string {
  const url = new URL(base, window.location.origin)
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.append(key, String(value))
    }
  })
  
  return url.toString()
}

// Copy to clipboard
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

// Download file
export function downloadFile(content: string, filename: string, type: string = 'text/plain') {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

// Open in new window
export function openInNewWindow(url: string, options?: {
  width?: number
  height?: number
  left?: number
  top?: number
}) {
  const {
    width = 800,
    height = 600,
    left = (screen.width - width) / 2,
    top = (screen.height - height) / 2,
  } = options || {}
  
  window.open(
    url,
    '_blank',
    `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes`
  )
}

// Detect mobile device
export function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

// Detect touch device
export function isTouchDevice(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

// Get scroll position
export function getScrollPosition(): { x: number; y: number } {
  return {
    x: window.pageXOffset,
    y: window.pageYOffset,
  }
}

// Scroll to top smoothly
export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Scroll to element smoothly
export function scrollToElement(element: HTMLElement, offset: number = 0) {
  const y = element.getBoundingClientRect().top + window.pageYOffset + offset
  window.scrollTo({ top: y, behavior: 'smooth' })
}
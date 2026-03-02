// lib/utils.ts
// Format price
export function formatPrice(price: number): string {
  return `$${price.toLocaleString()}`
}

// Format date
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString()
}

// Truncate text
export function truncate(text: string, length: number): string {
  return text.length > length ? text.slice(0, length) + '...' : text
}

// Get initials
export function initials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Generate slug
export function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-')
}
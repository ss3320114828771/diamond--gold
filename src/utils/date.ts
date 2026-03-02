// utils/date.ts

// Date format options
export const DATE_FORMATS = {
  short: 'MMM DD, YYYY',
  long: 'MMMM DD, YYYY',
  iso: 'YYYY-MM-DD',
  time: 'HH:mm A',
  dateTime: 'MMM DD, YYYY HH:mm A',
  monthYear: 'MMMM YYYY',
  year: 'YYYY',
  day: 'DD',
  month: 'MM',
} as const

// Format date to string
export function formatDate(
  date: string | Date,
  format: keyof typeof DATE_FORMATS = 'short'
): string {
  const d = new Date(date)
  
  if (isNaN(d.getTime())) {
    return 'Invalid date'
  }

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }

  if (format === 'long') {
    options.month = 'long'
  } else if (format === 'dateTime') {
    options.hour = '2-digit'
    options.minute = '2-digit'
  } else if (format === 'time') {
    delete options.year
    delete options.month
    delete options.day
    options.hour = '2-digit'
    options.minute = '2-digit'
  } else if (format === 'monthYear') {
    delete options.day
    options.month = 'long'
  } else if (format === 'year') {
    delete options.month
    delete options.day
  } else if (format === 'day') {
    delete options.year
    delete options.month
  } else if (format === 'month') {
    delete options.year
    delete options.day
    options.month = 'long'
  }

  return d.toLocaleDateString('en-US', options)
}

// Get relative time (e.g., "2 hours ago")
export function getRelativeTime(date: string | Date): string {
  const d = new Date(date)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)
  const diffWeek = Math.floor(diffDay / 7)
  const diffMonth = Math.floor(diffDay / 30)
  const diffYear = Math.floor(diffDay / 365)

  if (diffSec < 60) {
    return 'just now'
  } else if (diffMin < 60) {
    return `${diffMin} ${diffMin === 1 ? 'minute' : 'minutes'} ago`
  } else if (diffHour < 24) {
    return `${diffHour} ${diffHour === 1 ? 'hour' : 'hours'} ago`
  } else if (diffDay < 7) {
    return `${diffDay} ${diffDay === 1 ? 'day' : 'days'} ago`
  } else if (diffWeek < 4) {
    return `${diffWeek} ${diffWeek === 1 ? 'week' : 'weeks'} ago`
  } else if (diffMonth < 12) {
    return `${diffMonth} ${diffMonth === 1 ? 'month' : 'months'} ago`
  } else {
    return `${diffYear} ${diffYear === 1 ? 'year' : 'years'} ago`
  }
}

// Check if date is today
export function isToday(date: string | Date): boolean {
  const d = new Date(date)
  const today = new Date()
  
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  )
}

// Check if date is yesterday
export function isYesterday(date: string | Date): boolean {
  const d = new Date(date)
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  
  return (
    d.getDate() === yesterday.getDate() &&
    d.getMonth() === yesterday.getMonth() &&
    d.getFullYear() === yesterday.getFullYear()
  )
}

// Check if date is tomorrow
export function isTomorrow(date: string | Date): boolean {
  const d = new Date(date)
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  return (
    d.getDate() === tomorrow.getDate() &&
    d.getMonth() === tomorrow.getMonth() &&
    d.getFullYear() === tomorrow.getFullYear()
  )
}

// Check if date is in the past
export function isPast(date: string | Date): boolean {
  return new Date(date) < new Date()
}

// Check if date is in the future
export function isFuture(date: string | Date): boolean {
  return new Date(date) > new Date()
}

// Get start of day
export function startOfDay(date: string | Date = new Date()): Date {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

// Get end of day
export function endOfDay(date: string | Date = new Date()): Date {
  const d = new Date(date)
  d.setHours(23, 59, 59, 999)
  return d
}

// Get start of week (Sunday)
export function startOfWeek(date: string | Date = new Date()): Date {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day
  return new Date(d.setDate(diff))
}

// Get end of week (Saturday)
export function endOfWeek(date: string | Date = new Date()): Date {
  const d = startOfWeek(date)
  d.setDate(d.getDate() + 6)
  return endOfDay(d)
}

// Get start of month
export function startOfMonth(date: string | Date = new Date()): Date {
  const d = new Date(date)
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

// Get end of month
export function endOfMonth(date: string | Date = new Date()): Date {
  const d = new Date(date)
  return new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999)
}

// Get start of year
export function startOfYear(date: string | Date = new Date()): Date {
  const d = new Date(date)
  return new Date(d.getFullYear(), 0, 1)
}

// Get end of year
export function endOfYear(date: string | Date = new Date()): Date {
  const d = new Date(date)
  return new Date(d.getFullYear(), 11, 31, 23, 59, 59, 999)
}

// Add days to date
export function addDays(date: string | Date, days: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

// Add months to date
export function addMonths(date: string | Date, months: number): Date {
  const d = new Date(date)
  d.setMonth(d.getMonth() + months)
  return d
}

// Add years to date
export function addYears(date: string | Date, years: number): Date {
  const d = new Date(date)
  d.setFullYear(d.getFullYear() + years)
  return d
}

// Get difference in days between two dates
export function diffInDays(date1: string | Date, date2: string | Date): number {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  const diffMs = Math.abs(d2.getTime() - d1.getTime())
  return Math.floor(diffMs / (1000 * 60 * 60 * 24))
}

// Get difference in hours between two dates
export function diffInHours(date1: string | Date, date2: string | Date): number {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  const diffMs = Math.abs(d2.getTime() - d1.getTime())
  return Math.floor(diffMs / (1000 * 60 * 60))
}

// Get difference in minutes between two dates
export function diffInMinutes(date1: string | Date, date2: string | Date): number {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  const diffMs = Math.abs(d2.getTime() - d1.getTime())
  return Math.floor(diffMs / (1000 * 60))
}

// Get difference in months between two dates
export function diffInMonths(date1: string | Date, date2: string | Date): number {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  return (
    (d2.getFullYear() - d1.getFullYear()) * 12 +
    (d2.getMonth() - d1.getMonth())
  )
}

// Get difference in years between two dates
export function diffInYears(date1: string | Date, date2: string | Date): number {
  return diffInMonths(date1, date2) / 12
}

// Check if date is between two dates
export function isBetween(
  date: string | Date,
  start: string | Date,
  end: string | Date
): boolean {
  const d = new Date(date)
  const s = new Date(start)
  const e = new Date(end)
  return d >= s && d <= e
}

// Get the earliest date
export function minDate(...dates: (string | Date)[]): Date {
  return new Date(Math.min(...dates.map(d => new Date(d).getTime())))
}

// Get the latest date
export function maxDate(...dates: (string | Date)[]): Date {
  return new Date(Math.max(...dates.map(d => new Date(d).getTime())))
}

// Format date range
export function formatDateRange(
  startDate: string | Date,
  endDate: string | Date,
  format: keyof typeof DATE_FORMATS = 'short'
): string {
  const start = formatDate(startDate, format)
  const end = formatDate(endDate, format)
  return `${start} - ${end}`
}

// Get age from birthdate
export function getAge(birthDate: string | Date): number {
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  
  return age
}

// Get day of week (0 = Sunday, 6 = Saturday)
export function getDayOfWeek(date: string | Date): number {
  return new Date(date).getDay()
}

// Get day name
export function getDayName(date: string | Date, short: boolean = false): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', { weekday: short ? 'short' : 'long' })
}

// Get month name
export function getMonthName(date: string | Date, short: boolean = false): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', { month: short ? 'short' : 'long' })
}

// Check if year is leap year
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

// Get days in month
export function getDaysInMonth(date: string | Date): number {
  const d = new Date(date)
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()
}

// Get quarter (1-4)
export function getQuarter(date: string | Date): number {
  const d = new Date(date)
  return Math.floor(d.getMonth() / 3) + 1
}

// Check if date is weekend
export function isWeekend(date: string | Date): boolean {
  const day = getDayOfWeek(date)
  return day === 0 || day === 6
}

// Check if date is weekday
export function isWeekday(date: string | Date): boolean {
  return !isWeekend(date)
}

// Get next business day (skip weekends)
export function getNextBusinessDay(date: string | Date): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + 1)
  while (isWeekend(d)) {
    d.setDate(d.getDate() + 1)
  }
  return d
}

// Get previous business day (skip weekends)
export function getPreviousBusinessDay(date: string | Date): Date {
  const d = new Date(date)
  d.setDate(d.getDate() - 1)
  while (isWeekend(d)) {
    d.setDate(d.getDate() - 1)
  }
  return d
}

// Parse date string (supports YYYY-MM-DD, MM/DD/YYYY, etc.)
export function parseDate(dateStr: string): Date | null {
  // Try ISO format first
  let date = new Date(dateStr)
  if (!isNaN(date.getTime())) {
    return date
  }

  // Try MM/DD/YYYY
  const parts = dateStr.split(/[/-]/)
  if (parts.length === 3) {
    const [month, day, year] = parts.map(Number)
    date = new Date(year, month - 1, day)
    if (!isNaN(date.getTime())) {
      return date
    }
  }

  return null
}

// Get timestamp
export function getTimestamp(date: string | Date = new Date()): number {
  return new Date(date).getTime()
}

// Check if date is valid
export function isValidDate(date: any): boolean {
  if (!date) return false
  const d = new Date(date)
  return d instanceof Date && !isNaN(d.getTime())
}
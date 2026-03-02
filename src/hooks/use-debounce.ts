// hooks/use-debounce.ts
'use client'

import { useState, useEffect } from 'react'

/**
 * A hook that debounces a value by delaying its update
 * Useful for search inputs, form validation, etc.
 * 
 * @param value The value to debounce
 * @param delay Delay in milliseconds (default: 500ms)
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // Set a timeout to update the debounced value after the delay
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Clean up the timeout if the value changes before the delay ends
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}
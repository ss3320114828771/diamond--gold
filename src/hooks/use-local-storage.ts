// hooks/use-local-storage.ts
'use client'

import { useState, useEffect, useCallback } from 'react'

type SetValue<T> = (value: T | ((prevValue: T) => T)) => void

/**
 * A hook that synchronizes state with localStorage
 * 
 * @param key The localStorage key
 * @param initialValue The initial value (or function that returns initial value)
 * @returns [storedValue, setValue, removeValue]
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T)
): [T, SetValue<T>, () => void] {
  // Get from localStorage then parse stored json or return initialValue
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') {
      return initialValue instanceof Function ? initialValue() : initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item
        ? (JSON.parse(item) as T)
        : initialValue instanceof Function
        ? initialValue()
        : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue instanceof Function ? initialValue() : initialValue
    }
  }, [key, initialValue])

  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(readValue)

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue: SetValue<T> = useCallback(
    (value) => {
      if (typeof window === 'undefined') {
        console.warn(
          `Tried setting localStorage key "${key}" even though environment is not a client`
        )
      }

      try {
        // Allow value to be a function so we have same API as useState
        const newValue = value instanceof Function ? value(storedValue) : value

        // Save to localStorage
        window.localStorage.setItem(key, JSON.stringify(newValue))

        // Save state
        setStoredValue(newValue)

        // Dispatch a custom event so other tabs can update
        window.dispatchEvent(new Event('local-storage'))
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error)
      }
    },
    [key, storedValue]
  )

  // Remove from localStorage
  const removeValue = useCallback(() => {
    if (typeof window === 'undefined') {
      console.warn(
        `Tried removing localStorage key "${key}" even though environment is not a client`
      )
    }

    try {
      // Remove from localStorage
      window.localStorage.removeItem(key)

      // Reset state to initial value
      setStoredValue(initialValue instanceof Function ? initialValue() : initialValue)

      // Dispatch a custom event so other tabs can update
      window.dispatchEvent(new Event('local-storage'))
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error)
    }
  }, [key, initialValue])

  // Listen for changes to this localStorage key in other tabs/windows
  useEffect(() => {
    const handleStorageChange = () => {
      setStoredValue(readValue())
    }

    // Listen for our custom event
    window.addEventListener('local-storage', handleStorageChange)

    // Listen for the native storage event (triggered by other tabs)
    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('local-storage', handleStorageChange)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [readValue])

  return [storedValue, setValue, removeValue]
}
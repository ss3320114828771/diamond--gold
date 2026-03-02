// hooks/use-media-query.ts
'use client'

import { useState, useEffect } from 'react'

/**
 * A hook that evaluates a media query and returns whether it matches
 * Useful for responsive components that need to adapt based on screen size
 * 
 * @param query The media query to evaluate (e.g., '(min-width: 768px)')
 * @returns Boolean indicating whether the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Create media query list
    const mediaQuery = window.matchMedia(query)
    
    // Set initial value
    setMatches(mediaQuery.matches)

    // Create event listener function
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Add listener for changes
    mediaQuery.addEventListener('change', handler)

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handler)
    }
  }, [query])

  return matches
}
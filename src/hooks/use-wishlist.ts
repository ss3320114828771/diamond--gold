// hooks/use-wishlist.ts
'use client'

import { useState, useEffect, useCallback } from 'react'

export type WishlistItem = {
  id: string
  productId: string
  name: string
  price: number
  image: string
  purity?: string
  weight?: number
  addedAt: string
}

type WishlistState = {
  items: WishlistItem[]
  isLoading: boolean
  error: string | null
}

type UseWishlistReturn = {
  // State
  items: WishlistItem[]
  isLoading: boolean
  error: string | null
  totalItems: number
  totalValue: number

  // Actions
  addItem: (product: {
    id: string
    name: string
    price: number
    image: string
    purity?: string
    weight?: number
  }) => Promise<boolean>
  removeItem: (productId: string) => Promise<boolean>
  toggleItem: (product: {
    id: string
    name: string
    price: number
    image: string
    purity?: string
    weight?: number
  }) => Promise<boolean>
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => Promise<boolean>
  moveToCart: (productId: string) => Promise<boolean>
  moveAllToCart: () => Promise<boolean>
  refreshWishlist: () => Promise<void>
}

const WISHLIST_STORAGE_KEY = 'wishlist'

export function useWishlist(): UseWishlistReturn {
  const [state, setState] = useState<WishlistState>({
    items: [],
    isLoading: true,
    error: null
  })

  // Load wishlist from localStorage on mount
  useEffect(() => {
    loadWishlist()
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (!state.isLoading) {
      saveWishlist(state.items)
    }
  }, [state.items, state.isLoading])

  const loadWishlist = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300))

      // Load from localStorage
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY)
      const items = stored ? JSON.parse(stored) : []

      setState({
        items,
        isLoading: false,
        error: null
      })
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to load wishlist'
      }))
    }
  }, [])

  const saveWishlist = useCallback((items: WishlistItem[]) => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items))
    } catch (error) {
      console.error('Failed to save wishlist:', error)
    }
  }, [])

  const addItem = useCallback(async (product: {
    id: string
    name: string
    price: number
    image: string
    purity?: string
    weight?: number
  }): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300))

      // Check if already in wishlist
      if (state.items.some(item => item.productId === product.id)) {
        setState(prev => ({ ...prev, isLoading: false }))
        return false
      }

      const newItem: WishlistItem = {
        id: `wishlist-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        purity: product.purity,
        weight: product.weight,
        addedAt: new Date().toISOString()
      }

      setState(prev => ({
        ...prev,
        items: [...prev.items, newItem],
        isLoading: false
      }))

      return true
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to add item to wishlist'
      }))
      return false
    }
  }, [state.items])

  const removeItem = useCallback(async (productId: string): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300))

      setState(prev => ({
        ...prev,
        items: prev.items.filter(item => item.productId !== productId),
        isLoading: false
      }))

      return true
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to remove item from wishlist'
      }))
      return false
    }
  }, [])

  const toggleItem = useCallback(async (product: {
    id: string
    name: string
    price: number
    image: string
    purity?: string
    weight?: number
  }): Promise<boolean> => {
    const isInList = state.items.some(item => item.productId === product.id)

    if (isInList) {
      await removeItem(product.id)
      return false
    } else {
      await addItem(product)
      return true
    }
  }, [state.items, addItem, removeItem])

  const isInWishlist = useCallback((productId: string): boolean => {
    return state.items.some(item => item.productId === productId)
  }, [state.items])

  const clearWishlist = useCallback(async (): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300))

      setState(prev => ({
        ...prev,
        items: [],
        isLoading: false
      }))

      return true
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to clear wishlist'
      }))
      return false
    }
  }, [])

  const moveToCart = useCallback(async (productId: string): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      // Find the item
      const item = state.items.find(i => i.productId === productId)
      if (!item) {
        throw new Error('Item not found in wishlist')
      }

      // Simulate API call to add to cart
      await new Promise(resolve => setTimeout(resolve, 300))

      // Remove from wishlist
      setState(prev => ({
        ...prev,
        items: prev.items.filter(i => i.productId !== productId),
        isLoading: false
      }))

      // Dispatch custom event for cart to listen to
      window.dispatchEvent(new CustomEvent('wishlist:move-to-cart', { 
        detail: { 
          productId: item.productId,
          name: item.name,
          price: item.price,
          image: item.image,
          purity: item.purity,
          weight: item.weight
        } 
      }))

      return true
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to move item to cart'
      }))
      return false
    }
  }, [state.items])

  const moveAllToCart = useCallback(async (): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      if (state.items.length === 0) {
        return true
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))

      // Dispatch event for each item
      state.items.forEach(item => {
        window.dispatchEvent(new CustomEvent('wishlist:move-to-cart', { 
          detail: { 
            productId: item.productId,
            name: item.name,
            price: item.price,
            image: item.image,
            purity: item.purity,
            weight: item.weight
          } 
        }))
      })

      // Clear wishlist
      setState(prev => ({
        ...prev,
        items: [],
        isLoading: false
      }))

      return true
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to move items to cart'
      }))
      return false
    }
  }, [state.items])

  const refreshWishlist = useCallback(async () => {
    await loadWishlist()
  }, [loadWishlist])

  const totalItems = state.items.length
  const totalValue = state.items.reduce((sum, item) => sum + item.price, 0)

  return {
    // State
    items: state.items,
    isLoading: state.isLoading,
    error: state.error,
    totalItems,
    totalValue,

    // Actions
    addItem,
    removeItem,
    toggleItem,
    isInWishlist,
    clearWishlist,
    moveToCart,
    moveAllToCart,
    refreshWishlist
  }
}
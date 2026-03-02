// hooks/use-toast.ts
'use client'

import { useState, useCallback } from 'react'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export type Toast = {
  id: string
  message: string
  type: ToastType
  duration?: number
  title?: string
  action?: {
    label: string
    onClick: () => void
  }
}

type ToastOptions = {
  type?: ToastType
  duration?: number
  title?: string
  action?: {
    label: string
    onClick: () => void
  }
}

type UseToastReturn = {
  toasts: Toast[]
  showToast: (message: string, options?: ToastOptions) => string
  showSuccess: (message: string, options?: Omit<ToastOptions, 'type'>) => string
  showError: (message: string, options?: Omit<ToastOptions, 'type'>) => string
  showWarning: (message: string, options?: Omit<ToastOptions, 'type'>) => string
  showInfo: (message: string, options?: Omit<ToastOptions, 'type'>) => string
  dismissToast: (id: string) => void
  dismissAll: () => void
  updateToast: (id: string, updates: Partial<Toast>) => void
}

const DEFAULT_DURATION = 3000

export function useToast(): UseToastReturn {
  const [toasts, setToasts] = useState<Toast[]>([])

  const generateId = useCallback(() => {
    return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }, [])

  const showToast = useCallback((message: string, options: ToastOptions = {}): string => {
    const id = generateId()
    const newToast: Toast = {
      id,
      message,
      type: options.type || 'info',
      duration: options.duration || DEFAULT_DURATION,
      title: options.title,
      action: options.action
    }

    setToasts(prev => [...prev, newToast])

    // Auto-dismiss after duration
    if (  0) {
      setTimeout(() => {
        dismissToast(id)
      }, newToast.duration)
    }

    return id
  }, [generateId])

  const showSuccess = useCallback((message: string, options: Omit<ToastOptions, 'type'> = {}) => {
    return showToast(message, { ...options, type: 'success' })
  }, [showToast])

  const showError = useCallback((message: string, options: Omit<ToastOptions, 'type'> = {}) => {
    return showToast(message, { ...options, type: 'error' })
  }, [showToast])

  const showWarning = useCallback((message: string, options: Omit<ToastOptions, 'type'> = {}) => {
    return showToast(message, { ...options, type: 'warning' })
  }, [showToast])

  const showInfo = useCallback((message: string, options: Omit<ToastOptions, 'type'> = {}) => {
    return showToast(message, { ...options, type: 'info' })
  }, [showToast])

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const dismissAll = useCallback(() => {
    setToasts([])
  }, [])

  const updateToast = useCallback((id: string, updates: Partial<Toast>) => {
    setToasts(prev =>
      prev.map(toast =>
        toast.id === id ? { ...toast, ...updates } : toast
      )
    )
  }, [])

  return {
    toasts,
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    dismissToast,
    dismissAll,
    updateToast
  }
}
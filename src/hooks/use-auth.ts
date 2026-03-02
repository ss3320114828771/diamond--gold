// hooks/use-auth.ts
'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

type User = {
  id: string
  name: string
  email: string
  role: 'admin' | 'customer'
  avatar?: string
}

type LoginCredentials = {
  email: string
  password: string
  rememberMe?: boolean
}

type RegisterData = {
  name: string
  email: string
  password: string
  phone?: string
}

type AuthState = {
  user: User | null
  isLoading: boolean
  error: string | null
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null
  })
  const router = useRouter()

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        // Check localStorage first
        const storedUser = localStorage.getItem('user')
        const storedToken = localStorage.getItem('token')

        if (storedUser && storedToken) {
          setState({
            user: JSON.parse(storedUser),
            isLoading: false,
            error: null
          })
        } else {
          setState({
            user: null,
            isLoading: false,
            error: null
          })
        }
      } catch (error) {
        setState({
          user: null,
          isLoading: false,
          error: 'Failed to load user'
        })
      }
    }

    loadUser()
  }, [])

  // Login function
  const login = useCallback(async (credentials: LoginCredentials) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock validation
      if (!credentials.email || !credentials.password) {
        throw new Error('Email and password are required')
      }

      // Mock user data (in real app, this would come from your API)
      let user: User | null = null

      if (credentials.email === 'admin@example.com' && credentials.password === 'admin123') {
        user = {
          id: '1',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin'
        }
      } else if (credentials.email === 'customer@example.com' && credentials.password === 'customer123') {
        user = {
          id: '2',
          name: 'Customer User',
          email: 'customer@example.com',
          role: 'customer'
        }
      } else {
        throw new Error('Invalid email or password')
      }

      // Generate mock token
      const token = `mock-jwt-token-${Date.now()}`

      // Store in localStorage if rememberMe is true
      if (credentials.rememberMe) {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
      } else {
        // Store in sessionStorage for session-only
        sessionStorage.setItem('user', JSON.stringify(user))
        sessionStorage.setItem('token', token)
      }

      setState({
        user,
        isLoading: false,
        error: null
      })

      return { success: true, user }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed'
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }))
      return { success: false, error: errorMessage }
    }
  }, [])

  // Register function
  const register = useCallback(async (data: RegisterData) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Validate
      if (!data.name || !data.email || !data.password) {
        throw new Error('All fields are required')
      }

      if (data.password.length < 6) {
        throw new Error('Password must be at least 6 characters')
      }

      // Mock user creation
      const user: User = {
        id: `user-${Date.now()}`,
        name: data.name,
        email: data.email,
        role: 'customer'
      }

      const token = `mock-jwt-token-${Date.now()}`

      // Store in localStorage (default behavior)
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token)

      setState({
        user,
        isLoading: false,
        error: null
      })

      return { success: true, user }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed'
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }))
      return { success: false, error: errorMessage }
    }
  }, [])

  // Logout function
  const logout = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true }))

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))

      // Clear storage
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('token')

      setState({
        user: null,
        isLoading: false,
        error: null
      })

      router.push('/login')
      
      return { success: true }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Logout failed'
      }))
      return { success: false, error: 'Logout failed' }
    }
  }, [router])

  // Update user profile
  const updateProfile = useCallback(async (data: Partial<User>) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (!state.user) {
        throw new Error('No user logged in')
      }

      const updatedUser = { ...state.user, ...data }

      // Update storage
      const storage = localStorage.getItem('user') ? localStorage : sessionStorage
      storage.setItem('user', JSON.stringify(updatedUser))

      setState({
        user: updatedUser,
        isLoading: false,
        error: null
      })

      return { success: true, user: updatedUser }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Update failed'
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }))
      return { success: false, error: errorMessage }
    }
  }, [state.user])

  // Check if user is authenticated
  const isAuthenticated = state.user !== null

  // Check if user is admin
  const isAdmin = state.user?.role === 'admin'

  // Clear error
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }))
  }, [])

  return {
    user: state.user,
    isLoading: state.isLoading,
    error: state.error,
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout,
    updateProfile,
    clearError
  }
}
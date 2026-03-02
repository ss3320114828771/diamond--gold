// lib/actions/auth.ts
'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

// Types
export type User = {
  id: string
  name: string
  email: string
  role: 'admin' | 'customer'
  avatar?: string
  phone?: string
  createdAt: string
  lastLogin?: string
}

export type LoginCredentials = {
  email: string
  password: string
  rememberMe?: boolean
}

export type RegisterData = {
  name: string
  email: string
  password: string
  phone?: string
  agreeTerms: boolean
}

export type AuthResponse = {
  success: boolean
  user?: User
  error?: string
  redirectTo?: string
}

// Mock users database (in real app, this would be in your database)
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Hafiz Sajid Syed',
    email: 'sajid.syed@gmail.com',
    role: 'admin',
    phone: '+1 234 567 890',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Ahmed Khan',
    email: 'ahmed@example.com',
    role: 'customer',
    phone: '+1 234 567 891',
    createdAt: '2024-02-15T00:00:00Z',
    lastLogin: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Fatima Ali',
    email: 'fatima@example.com',
    role: 'customer',
    phone: '+1 234 567 892',
    createdAt: '2024-03-10T00:00:00Z'
  }
]

// Simple session store (in real app, use database or Redis)
const sessions = new Map<string, { userId: string; expires: Date }>()

// Helper to generate session token
function generateSessionToken(): string {
  return `sess_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
}

// Helper to set session cookie
async function setSessionCookie(token: string, rememberMe: boolean) {
  const cookieStore = await cookies()
  const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60 // 30 days or 1 day
  
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge,
    path: '/'
  })
}

// Helper to get current user from session
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('session')?.value

  if (!sessionToken) {
    return null
  }

  const session = sessions.get(sessionToken)
  if (!session) {
    return null
  }

  // Check if session expired
  if (session.expires < new Date()) {
    sessions.delete(sessionToken)
    return null
  }

  const user = mockUsers.find(u => u.id === session.userId)
  return user || null
}

// Login action
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  // Validate input
  if (!credentials.email || !credentials.password) {
    return {
      success: false,
      error: 'Email and password are required'
    }
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  // Find user (in real app, check hashed password)
  const user = mockUsers.find(u => u.email === credentials.email)

  // Simple password check (in real app, use bcrypt)
  const isValidPassword = user && 
    ((user.email === 'sajid.syed@gmail.com' && credentials.password === 'admin123') ||
     (user.email === 'ahmed@example.com' && credentials.password === 'customer123') ||
     (user.email === 'fatima@example.com' && credentials.password === 'customer123'))

  if (!user || !isValidPassword) {
    return {
      success: false,
      error: 'Invalid email or password'
    }
  }

  // Create session
  const token = generateSessionToken()
  const expires = new Date()
  expires.setDate(expires.getDate() + (credentials.rememberMe ? 30 : 1))
  
  sessions.set(token, {
    userId: user.id,
    expires
  })

  // Set cookie
  await setSessionCookie(token, credentials.rememberMe || false)

  // Update last login
  user.lastLogin = new Date().toISOString()

  // Return success
  return {
    success: true,
    user: {
      ...user,
      // Don't send sensitive data
    },
    redirectTo: user.role === 'admin' ? '/admin/dashboard' : '/'
  }
}

// Register action
export async function register(data: RegisterData): Promise<AuthResponse> {
  // Validate input
  if (!data.name || !data.email || !data.password) {
    return {
      success: false,
      error: 'All fields are required'
    }
  }

  if (!data.agreeTerms) {
    return {
      success: false,
      error: 'You must agree to the terms and conditions'
    }
  }

  if (data.password.length < 6) {
    return {
      success: false,
      error: 'Password must be at least 6 characters'
    }
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  // Check if email already exists
  if (mockUsers.some(u => u.email === data.email)) {
    return {
      success: false,
      error: 'Email already registered'
    }
  }

  // Create new user (in real app, hash password and save to database)
  const newUser: User = {
    id: (mockUsers.length + 1).toString(),
    name: data.name,
    email: data.email,
    role: 'customer',
    phone: data.phone,
    createdAt: new Date().toISOString()
  }

  // Add to mock database
  mockUsers.push(newUser)

  // Create session
  const token = generateSessionToken()
  const expires = new Date()
  expires.setDate(expires.getDate() + 1) // 1 day default for new registrations
  
  sessions.set(token, {
    userId: newUser.id,
    expires
  })

  // Set cookie
  await setSessionCookie(token, false)

  return {
    success: true,
    user: newUser,
    redirectTo: '/'
  }
}

// Logout action
export async function logout() {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('session')?.value

  if (sessionToken) {
    // Remove session
    sessions.delete(sessionToken)
    
    // Clear cookie
    cookieStore.delete('session')
  }

  // Revalidate paths
  revalidatePath('/')
  revalidatePath('/admin')

  // Redirect to home
  redirect('/')
}

// Check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser()
  return user !== null
}

// Check if user is admin
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser()
  return user?.role === 'admin'
}

// Get user by ID
export async function getUserById(id: string): Promise<User | null> {
  const user = mockUsers.find(u => u.id === id)
  return user || null
}

// Update user profile
export async function updateProfile(data: Partial<User>): Promise<AuthResponse> {
  const user = await getCurrentUser()

  if (!user) {
    return {
      success: false,
      error: 'Not authenticated'
    }
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  // Update user (in real app, update in database)
  const userIndex = mockUsers.findIndex(u => u.id === user.id)
  if (userIndex !== -1) {
    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      ...data,
      // Don't allow role change via profile update
      role: mockUsers[userIndex].role
    }
  }

  // Revalidate paths
  revalidatePath('/profile')
  revalidatePath('/admin/users')

  return {
    success: true,
    user: mockUsers[userIndex]
  }
}

// Change password
export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  const user = await getCurrentUser()

  if (!user) {
    return {
      success: false,
      error: 'Not authenticated'
    }
  }

  // Validate
  if (!currentPassword || !newPassword) {
    return {
      success: false,
      error: 'All fields are required'
    }
  }

  if (newPassword.length < 6) {
    return {
      success: false,
      error: 'New password must be at least 6 characters'
    }
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  // Verify current password (in real app, check hashed password)
  const isValid = (user.email === 'sajid.syed@gmail.com' && currentPassword === 'admin123') ||
                  (currentPassword === 'customer123')

  if (!isValid) {
    return {
      success: false,
      error: 'Current password is incorrect'
    }
  }

  // In real app, update hashed password in database
  // For demo, we just return success

  return {
    success: true
  }
}

// Request password reset
export async function requestPasswordReset(email: string): Promise<{ success: boolean; error?: string }> {
  if (!email) {
    return {
      success: false,
      error: 'Email is required'
    }
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  // Check if user exists (don't reveal if user exists or not for security)
  const user = mockUsers.find(u => u.email === email)

  if (user) {
    // In real app: Generate reset token, save to database, send email
    console.log(`Password reset requested for ${email}`)
  }

  // Always return success to prevent email enumeration
  return {
    success: true
  }
}

// Reset password with token
export async function resetPassword(
  token: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  if (!token || !newPassword) {
    return {
      success: false,
      error: 'All fields are required'
    }
  }

  if (newPassword.length < 6) {
    return {
      success: false,
      error: 'Password must be at least 6 characters'
    }
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  // In real app: Verify token, find user, update password
  // For demo, we just return success if token looks valid
  if (!token.startsWith('reset_')) {
    return {
      success: false,
      error: 'Invalid or expired reset token'
    }
  }

  return {
    success: true
  }
}

// Get all users (admin only)
export async function getAllUsers(): Promise<User[]> {
  const admin = await isAdmin()

  if (!admin) {
    return []
  }

  return mockUsers
}

// Delete user (admin only)
export async function adminDeleteUser(userId: string): Promise<{ success: boolean; error?: string }> {
  const admin = await isAdmin()

  if (!admin) {
    return {
      success: false,
      error: 'Unauthorized'
    }
  }

  // Don't allow deleting yourself
  const currentUser = await getCurrentUser()
  if (currentUser?.id === userId) {
    return {
      success: false,
      error: 'Cannot delete your own account'
    }
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  // In real app: Delete from database
  const userIndex = mockUsers.findIndex(u => u.id === userId)
  if (userIndex !== -1) {
    mockUsers.splice(userIndex, 1)
  }

  revalidatePath('/admin/users')

  return {
    success: true
  }
}
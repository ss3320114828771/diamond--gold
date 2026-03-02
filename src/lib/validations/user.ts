// lib/validations/user.ts
import { z } from 'zod'

// Simple user schema
export const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['admin', 'customer']).default('customer'),
})

export type User = z.infer<typeof userSchema>

// Simple profile update schema
export const updateProfileSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  email: z.string().email('Invalid email address').optional(),
  phone: z.string().optional(),
})

export type UpdateProfile = z.infer<typeof updateProfileSchema>

// Simple password change schema
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password required'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
})

export type ChangePassword = z.infer<typeof changePasswordSchema>

// Simple user filter schema
export const userFilterSchema = z.object({
  role: z.enum(['admin', 'customer']).optional(),
  search: z.string().optional(),
  page: z.number().default(1),
  limit: z.number().default(10),
})

export type UserFilter = z.infer<typeof userFilterSchema>
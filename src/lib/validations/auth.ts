// lib/validations/auth.ts
import { z } from 'zod'

// Login validation schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional().default(false),
})

export type LoginInput = z.infer<typeof loginSchema>

// Register validation schema
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be less than 50 characters')
      .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(50, 'Password must be less than 50 characters')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)/,
        'Password must contain at least one letter and one number'
      ),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    phone: z
      .string()
      .optional()
      .refine(
        (val) => !val || /^\+?[1-9]\d{1,14}$/.test(val),
        'Please enter a valid phone number'
      ),
    agreeTerms: z
      .boolean()
      .refine((val) => val === true, 'You must agree to the terms and conditions'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type RegisterInput = z.infer<typeof registerSchema>

// Forgot password validation schema
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
})

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>

// Reset password validation schema
export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, 'Reset token is required'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(50, 'Password must be less than 50 characters')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)/,
        'Password must contain at least one letter and one number'
      ),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>

// Change password validation schema (for authenticated users)
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(1, 'New password is required')
      .min(6, 'New password must be at least 6 characters')
      .max(50, 'New password must be less than 50 characters')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)/,
        'New password must contain at least one letter and one number'
      ),
    confirmNewPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'New passwords do not match',
    path: ['confirmNewPassword'],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: 'New password must be different from current password',
    path: ['newPassword'],
  })

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>

// Update profile validation schema
export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
    .optional(),
  email: z
    .string()
    .email('Please enter a valid email address')
    .optional(),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\+?[1-9]\d{1,14}$/.test(val),
      'Please enter a valid phone number'
    ),
  avatar: z.string().url('Please enter a valid URL').optional(),
})

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>

// Email verification validation schema
export const verifyEmailSchema = z.object({
  token: z.string().min(1, 'Verification token is required'),
})

export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>

// Two-factor authentication validation schema
export const twoFactorSchema = z.object({
  code: z
    .string()
    .min(1, 'Verification code is required')
    .length(6, 'Verification code must be 6 digits')
    .regex(/^\d+$/, 'Verification code must contain only numbers'),
})

export type TwoFactorInput = z.infer<typeof twoFactorSchema>

// Session validation schema
export const sessionSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  token: z.string().min(1, 'Session token is required'),
  expiresAt: z.date(),
})

export type SessionInput = z.infer<typeof sessionSchema>

// Helper function to validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Helper function to validate password strength
export function getPasswordStrength(password: string): {
  score: number
  feedback: string[]
} {
  const feedback: string[] = []
  let score = 0

  if (password.length >= 8) {
    score += 1
  } else {
    feedback.push('Use at least 8 characters')
  }

  if (/[a-z]/.test(password)) {
    score += 1
  } else {
    feedback.push('Add lowercase letters')
  }

  if (/[A-Z]/.test(password)) {
    score += 1
  } else {
    feedback.push('Add uppercase letters')
  }

  if (/[0-9]/.test(password)) {
    score += 1
  } else {
    feedback.push('Add numbers')
  }

  if (/[^a-zA-Z0-9]/.test(password)) {
    score += 1
  } else {
    feedback.push('Add special characters')
  }

  return { score, feedback }
}

// Helper function to get password strength label
export function getPasswordStrengthLabel(score: number): string {
  const labels = [
    'Very Weak',
    'Weak',
    'Fair',
    'Good',
    'Strong',
    'Very Strong',
  ]
  return labels[score] || 'Unknown'
}

// Helper function to get password strength color
export function getPasswordStrengthColor(score: number): string {
  const colors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-green-600',
  ]
  return colors[score] || 'bg-gray-300'
}

// Error messages for auth forms
export const AUTH_ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_NOT_VERIFIED: 'Please verify your email address before logging in',
  ACCOUNT_LOCKED: 'Your account has been locked. Please contact support',
  ACCOUNT_DISABLED: 'Your account has been disabled',
  TOO_MANY_ATTEMPTS: 'Too many failed attempts. Please try again later',
  SESSION_EXPIRED: 'Your session has expired. Please log in again',
  UNAUTHORIZED: 'You are not authorized to perform this action',
  EMAIL_EXISTS: 'An account with this email already exists',
  WEAK_PASSWORD: 'Please choose a stronger password',
  PASSWORDS_DO_NOT_MATCH: 'Passwords do not match',
  INVALID_TOKEN: 'Invalid or expired token',
  TOKEN_EXPIRED: 'Token has expired',
  USER_NOT_FOUND: 'User not found',
  NETWORK_ERROR: 'Network error. Please check your connection',
  UNKNOWN_ERROR: 'An unknown error occurred. Please try again',
} as const

// Success messages for auth forms
export const AUTH_SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Successfully logged in',
  LOGOUT_SUCCESS: 'Successfully logged out',
  REGISTER_SUCCESS: 'Account created successfully! Please check your email to verify your account',
  PASSWORD_RESET_EMAIL_SENT: 'Password reset instructions have been sent to your email',
  PASSWORD_RESET_SUCCESS: 'Password has been reset successfully. Please log in with your new password',
  PASSWORD_CHANGED: 'Password changed successfully',
  EMAIL_VERIFIED: 'Email verified successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
} as const

// Validation rules for form fields
export const AUTH_VALIDATION_RULES = {
  name: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s]+$/,
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    minLength: 6,
    maxLength: 50,
    requireLetter: true,
    requireNumber: true,
    requireSpecial: false,
  },
  phone: {
    pattern: /^\+?[1-9]\d{1,14}$/,
  },
  twoFactorCode: {
    length: 6,
    pattern: /^\d+$/,
  },
} as const

// Export all schemas as a single object for convenience
export const authValidations = {
  login: loginSchema,
  register: registerSchema,
  forgotPassword: forgotPasswordSchema,
  resetPassword: resetPasswordSchema,
  changePassword: changePasswordSchema,
  updateProfile: updateProfileSchema,
  verifyEmail: verifyEmailSchema,
  twoFactor: twoFactorSchema,
  session: sessionSchema,
}
// lib/validations/product.ts
import { z } from 'zod'

// Simple product schema - only essential fields
export const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().positive('Price must be positive'),
  images: z.array(z.string()).min(1, 'At least one image required'),
  sku: z.string().min(1, 'SKU is required'),
  category: z.string().optional(),
  inStock: z.boolean().default(true),
})

export type Product = z.infer<typeof productSchema>

// Simple create schema
export const createProductSchema = productSchema
export type CreateProduct = z.infer<typeof createProductSchema>

// Simple update schema
export const updateProductSchema = productSchema.partial()
export type UpdateProduct = z.infer<typeof updateProductSchema>

// Simple filter schema
export const filterSchema = z.object({
  category: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  search: z.string().optional(),
  page: z.number().default(1),
  limit: z.number().default(12),
})

export type ProductFilter = z.infer<typeof filterSchema>

// Simple review schema
export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  content: z.string().min(1, 'Review content required'),
})

export type ProductReview = z.infer<typeof reviewSchema>
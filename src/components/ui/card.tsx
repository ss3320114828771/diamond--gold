// components/ui/card.tsx
'use client'

import { ReactNode } from 'react'

type CardProps = {
  children: ReactNode
  variant?: 'default' | 'elevated' | 'outlined' | 'flat'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  hoverable?: boolean
}

type CardHeaderProps = {
  children: ReactNode
  className?: string
  action?: ReactNode
}

type CardBodyProps = {
  children: ReactNode
  className?: string
}

type CardFooterProps = {
  children: ReactNode
  className?: string
  bordered?: boolean
}

export default function Card({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  onClick,
  hoverable = false
}: CardProps) {
  
  // Variant classes
  const variantClasses = {
    default: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-lg',
    outlined: 'bg-white border-2 border-gray-300',
    flat: 'bg-gray-50'
  }

  // Padding classes
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  }

  return (
    <div
      className={`
        rounded-xl overflow-hidden
        ${variantClasses[variant]}
        ${paddingClasses[padding]}
        ${hoverable ? 'transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

// Card Header Component
Card.Header = function CardHeader({ children, className = '', action }: CardHeaderProps) {
  return (
    <div className={`
      flex items-center justify-between
      border-b border-gray-200 pb-4 mb-4
      ${className}
    `}>
      <div className="font-semibold text-gray-800">{children}</div>
      {action && <div>{action}</div>}
    </div>
  )
}

// Card Body Component
Card.Body = function CardBody({ children, className = '' }: CardBodyProps) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

// Card Footer Component
Card.Footer = function CardFooter({ children, className = '', bordered = false }: CardFooterProps) {
  return (
    <div className={`
      flex items-center justify-between
      ${bordered ? 'border-t border-gray-200 pt-4 mt-4' : ''}
      ${className}
    `}>
      {children}
    </div>
  )
}
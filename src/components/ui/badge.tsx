// components/ui/badge.tsx
'use client'

type BadgeProps = {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  rounded?: 'default' | 'full' | 'none'
  icon?: React.ReactNode
  removable?: boolean
  onRemove?: () => void
  className?: string
}

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  rounded = 'default',
  icon,
  removable = false,
  onRemove,
  className = ''
}: BadgeProps) {
  
  // Variant classes
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-yellow-500 text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
    outline: 'bg-transparent border border-gray-300 text-gray-700'
  }

  // Size classes
  const sizeClasses = {
    sm: {
      badge: 'px-2 py-0.5 text-xs',
      icon: 'w-3 h-3',
      remove: 'ml-1'
    },
    md: {
      badge: 'px-3 py-1 text-sm',
      icon: 'w-4 h-4',
      remove: 'ml-1.5'
    },
    lg: {
      badge: 'px-4 py-1.5 text-base',
      icon: 'w-5 h-5',
      remove: 'ml-2'
    }
  }

  // Rounded classes
  const roundedClasses = {
    default: 'rounded',
    full: 'rounded-full',
    none: 'rounded-none'
  }

  const styles = sizeClasses[size]

  return (
    <span
      className={`
        inline-flex items-center font-medium
        ${variantClasses[variant]}
        ${roundedClasses[rounded]}
        ${styles.badge}
        ${className}
      `}
    >
      {/* Icon */}
      {icon && (
        <span className={`mr-1 ${styles.icon}`}>
          {icon}
        </span>
      )}

      {/* Content */}
      {children}

      {/* Remove Button */}
      {removable && (
        <button
          onClick={onRemove}
          className={`
            ${styles.remove} hover:opacity-75 focus:outline-none
            ${variant === 'outline' ? 'text-gray-500' : 'text-white'}
          `}
          aria-label="Remove"
        >
          <svg
            className={styles.icon}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </span>
  )
}
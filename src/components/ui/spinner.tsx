// components/ui/spinner.tsx
'use client'

type SpinnerProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'yellow' | 'white' | 'gray' | 'blue' | 'green' | 'red'
  variant?: 'border' | 'grow' | 'dots' | 'ring'
  text?: string
  fullScreen?: boolean
  className?: string
}

export default function Spinner({
  size = 'md',
  color = 'yellow',
  variant = 'border',
  text,
  fullScreen = false,
  className = ''
}: SpinnerProps) {
  
  // Size classes
  const sizeClasses = {
    xs: {
      border: 'w-4 h-4 border-2',
      grow: 'w-3 h-3',
      dots: 'w-1.5 h-1.5',
      ring: 'w-6 h-6',
      text: 'text-xs'
    },
    sm: {
      border: 'w-6 h-6 border-2',
      grow: 'w-4 h-4',
      dots: 'w-2 h-2',
      ring: 'w-8 h-8',
      text: 'text-sm'
    },
    md: {
      border: 'w-8 h-8 border-3',
      grow: 'w-6 h-6',
      dots: 'w-2.5 h-2.5',
      ring: 'w-12 h-12',
      text: 'text-base'
    },
    lg: {
      border: 'w-12 h-12 border-4',
      grow: 'w-8 h-8',
      dots: 'w-3 h-3',
      ring: 'w-16 h-16',
      text: 'text-lg'
    },
    xl: {
      border: 'w-16 h-16 border-4',
      grow: 'w-12 h-12',
      dots: 'w-4 h-4',
      ring: 'w-24 h-24',
      text: 'text-xl'
    }
  }

  // Color classes
  const colorClasses = {
    yellow: {
      border: 'border-yellow-500 border-t-transparent',
      grow: 'bg-yellow-500',
      dots: 'bg-yellow-500',
      ring: 'border-yellow-500'
    },
    white: {
      border: 'border-white border-t-transparent',
      grow: 'bg-white',
      dots: 'bg-white',
      ring: 'border-white'
    },
    gray: {
      border: 'border-gray-500 border-t-transparent',
      grow: 'bg-gray-500',
      dots: 'bg-gray-500',
      ring: 'border-gray-500'
    },
    blue: {
      border: 'border-blue-500 border-t-transparent',
      grow: 'bg-blue-500',
      dots: 'bg-blue-500',
      ring: 'border-blue-500'
    },
    green: {
      border: 'border-green-500 border-t-transparent',
      grow: 'bg-green-500',
      dots: 'bg-green-500',
      ring: 'border-green-500'
    },
    red: {
      border: 'border-red-500 border-t-transparent',
      grow: 'bg-red-500',
      dots: 'bg-red-500',
      ring: 'border-red-500'
    }
  }

  const styles = sizeClasses[size]
  const colors = colorClasses[color]

  const containerClasses = fullScreen
    ? 'fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center'
    : 'flex items-center justify-center'

  // Border Spinner
  if (variant === 'border') {
    return (
      <div className={`${containerClasses} ${className}`}>
        <div className="text-center">
          <div
            className={`
              ${styles.border}
              ${colors.border}
              rounded-full animate-spin mx-auto
            `}
          />
          {text && (
            <p className={`mt-4 text-gray-600 ${styles.text}`}>
              {text}
            </p>
          )}
        </div>
      </div>
    )
  }

  // Grow Spinner
  if (variant === 'grow') {
    return (
      <div className={`${containerClasses} ${className}`}>
        <div className="text-center">
          <div
            className={`
              ${styles.grow}
              ${colors.grow}
              rounded-full animate-ping mx-auto
            `}
          />
          {text && (
            <p className={`mt-4 text-gray-600 ${styles.text}`}>
              {text}
            </p>
          )}
        </div>
      </div>
    )
  }

  // Dots Spinner
  if (variant === 'dots') {
    return (
      <div className={`${containerClasses} ${className}`}>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`
                  ${styles.dots}
                  ${colors.dots}
                  rounded-full animate-bounce
                `}
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
          {text && (
            <p className={`mt-4 text-gray-600 ${styles.text}`}>
              {text}
            </p>
          )}
        </div>
      </div>
    )
  }

  // Ring Spinner
  if (variant === 'ring') {
    return (
      <div className={`${containerClasses} ${className}`}>
        <div className="text-center">
          <div
            className={`
              ${styles.ring}
              border-4 border-gray-200
              rounded-full relative mx-auto
            `}
          >
            <div
              className={`
                absolute inset-0 border-4
                ${colors.ring}
                border-t-transparent
                rounded-full animate-spin
              `}
            />
          </div>
          {text && (
            <p className={`mt-4 text-gray-600 ${styles.text}`}>
              {text}
            </p>
          )}
        </div>
      </div>
    )
  }

  return null
}
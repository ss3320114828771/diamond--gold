// components/shared/loading.tsx
'use client'

type LoadingProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'spinner' | 'dots' | 'pulse' | 'skeleton'
  text?: string
  fullScreen?: boolean
  className?: string
}

export default function Loading({
  size = 'md',
  variant = 'spinner',
  text,
  fullScreen = false,
  className = ''
}: LoadingProps) {
  
  // Size classes
  const sizeClasses = {
    sm: {
      spinner: 'w-5 h-5 border-2',
      dot: 'w-2 h-2',
      pulse: 'w-12 h-12',
      text: 'text-sm'
    },
    md: {
      spinner: 'w-8 h-8 border-3',
      dot: 'w-3 h-3',
      pulse: 'w-16 h-16',
      text: 'text-base'
    },
    lg: {
      spinner: 'w-12 h-12 border-4',
      dot: 'w-4 h-4',
      pulse: 'w-24 h-24',
      text: 'text-lg'
    },
    xl: {
      spinner: 'w-16 h-16 border-4',
      dot: 'w-5 h-5',
      pulse: 'w-32 h-32',
      text: 'text-xl'
    }
  }

  const containerClasses = fullScreen
    ? 'fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center'
    : 'flex items-center justify-center'

  // Spinner Loader
  if (variant === 'spinner') {
    return (
      <div className={`${containerClasses} ${className}`}>
        <div className="text-center">
          <div
            className={`
              ${sizeClasses[size].spinner}
              border-yellow-500 border-t-transparent
              rounded-full animate-spin mx-auto
            `}
          />
          {text && (
            <p className={`mt-4 text-gray-600 ${sizeClasses[size].text}`}>
              {text}
            </p>
          )}
        </div>
      </div>
    )
  }

  // Dots Loader
  if (variant === 'dots') {
    return (
      <div className={`${containerClasses} ${className}`}>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`
                  ${sizeClasses[size].dot}
                  bg-yellow-500 rounded-full
                  animate-bounce
                `}
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
          {text && (
            <p className={`mt-4 text-gray-600 ${sizeClasses[size].text}`}>
              {text}
            </p>
          )}
        </div>
      </div>
    )
  }

  // Pulse Loader
  if (variant === 'pulse') {
    return (
      <div className={`${containerClasses} ${className}`}>
        <div className="text-center">
          <div
            className={`
              ${sizeClasses[size].pulse}
              bg-yellow-500/30 rounded-full
              animate-ping mx-auto
            `}
          />
          {text && (
            <p className={`mt-4 text-gray-600 ${sizeClasses[size].text}`}>
              {text}
            </p>
          )}
        </div>
      </div>
    )
  }

  // Skeleton Loader (for content)
  if (variant === 'skeleton') {
    return (
      <div className={`${fullScreen ? 'p-8' : ''} ${className}`}>
        <div className="animate-pulse space-y-4">
          {/* Image placeholder */}
          <div className="w-full h-48 bg-gray-200 rounded-lg" />
          
          {/* Text lines */}
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
          
          {/* Grid placeholders */}
          <div className="grid grid-cols-3 gap-4">
            <div className="h-20 bg-gray-200 rounded" />
            <div className="h-20 bg-gray-200 rounded" />
            <div className="h-20 bg-gray-200 rounded" />
          </div>
          
          {/* Button placeholder */}
          <div className="h-10 bg-gray-200 rounded w-32" />
        </div>
      </div>
    )
  }

  return null
}
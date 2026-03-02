// components/ui/slider.tsx
'use client'

import { useState, useEffect, useRef } from 'react'

type SliderProps = {
  min?: number
  max?: number
  step?: number
  defaultValue?: number
  value?: number
  onChange?: (value: number) => void
  label?: string
  showValue?: boolean
  marks?: { value: number; label: string }[]
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Slider({
  min = 0,
  max = 100,
  step = 1,
  defaultValue,
  value: controlledValue,
  onChange,
  label,
  showValue = true,
  marks = [],
  disabled = false,
  size = 'md',
  className = ''
}: SliderProps) {
  const [internalValue, setInternalValue] = useState(defaultValue || min)
  const [isDragging, setIsDragging] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  const value = controlledValue !== undefined ? controlledValue : internalValue

  // Size classes
  const sizeClasses = {
    sm: {
      track: 'h-1',
      thumb: 'w-3 h-3',
      label: 'text-sm',
      value: 'text-xs'
    },
    md: {
      track: 'h-2',
      thumb: 'w-4 h-4',
      label: 'text-base',
      value: 'text-sm'
    },
    lg: {
      track: 'h-3',
      thumb: 'w-5 h-5',
      label: 'text-lg',
      value: 'text-base'
    }
  }

  const styles = sizeClasses[size]

  const percentage = ((value - min) / (max - min)) * 100

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return
    setIsDragging(true)
    updateValueFromMouse(e)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || disabled) return
    updateValueFromMouse(e)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const updateValueFromMouse = (e: MouseEvent | React.MouseEvent) => {
    if (!sliderRef.current) return

    const rect = sliderRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const width = rect.width

    let newValue = (x / width) * (max - min) + min
    newValue = Math.min(max, Math.max(min, newValue))
    newValue = Math.round(newValue / step) * step

    if (controlledValue === undefined) {
      setInternalValue(newValue)
    }
    onChange?.(newValue)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label and Value */}
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && (
            <span className={`font-medium text-gray-700 ${styles.label}`}>
              {label}
            </span>
          )}
          {showValue && (
            <span className={`text-gray-500 ${styles.value}`}>
              {value}
            </span>
          )}
        </div>
      )}

      {/* Slider Container */}
      <div className="relative py-2">
        {/* Track Background */}
        <div
          ref={sliderRef}
          className={`
            relative w-full rounded-full bg-gray-200 cursor-pointer
            ${styles.track}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          onMouseDown={handleMouseDown}
        >
          {/* Filled Track */}
          <div
            className="absolute h-full rounded-full bg-yellow-500"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Thumb */}
        <div
          className={`
            absolute top-1/2 -translate-y-1/2 -translate-x-1/2
            ${styles.thumb}
            bg-white border-2 border-yellow-500 rounded-full shadow-md
            cursor-grab active:cursor-grabbing
            transition-shadow hover:shadow-lg
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            ${isDragging ? 'shadow-lg scale-110' : ''}
          `}
          style={{ left: `${percentage}%` }}
          onMouseDown={handleMouseDown}
        />

        {/* Marks */}
        {marks.length > 0 && (
          <div className="relative mt-2">
            {marks.map((mark) => {
              const markPercentage = ((mark.value - min) / (max - min)) * 100
              return (
                <div
                  key={mark.value}
                  className="absolute -translate-x-1/2 text-center"
                  style={{ left: `${markPercentage}%` }}
                >
                  <div className="w-0.5 h-2 bg-gray-300 mx-auto" />
                  <span className="text-xs text-gray-500 mt-1 block">
                    {mark.label}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
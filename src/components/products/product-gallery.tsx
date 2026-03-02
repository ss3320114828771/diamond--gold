// components/products/product-gallery.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'

type ProductGalleryProps = {
  images: string[]
  productName: string
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape'
  showThumbnails?: boolean
  thumbnailPosition?: 'bottom' | 'left' | 'right'
  allowZoom?: boolean
  onImageChange?: (index: number) => void
}

export default function ProductGallery({
  images,
  productName,
  aspectRatio = 'square',
  showThumbnails = true,
  thumbnailPosition = 'bottom',
  allowZoom = true,
  onImageChange
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })

  // Aspect ratio classes
  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]'
  }

  // Thumbnail position classes
  const thumbnailClasses = {
    bottom: 'flex-col',
    left: 'flex-row',
    right: 'flex-row-reverse'
  }

  const handleImageSelect = (index: number) => {
    setSelectedImage(index)
    onImageChange?.(index)
    setIsZoomed(false)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!allowZoom || !isZoomed) return

    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100

    setZoomPosition({ x, y })
  }

  const handlePrevImage = () => {
    const newIndex = selectedImage === 0 ? images.length - 1 : selectedImage - 1
    setSelectedImage(newIndex)
    onImageChange?.(newIndex)
  }

  const handleNextImage = () => {
    const newIndex = selectedImage === images.length - 1 ? 0 : selectedImage + 1
    setSelectedImage(newIndex)
    onImageChange?.(newIndex)
  }

  if (!images || images.length === 0) {
    return (
      <div className={`${aspectClasses[aspectRatio]} bg-gray-200 rounded-2xl flex items-center justify-center`}>
        <span className="text-gray-400">No image available</span>
      </div>
    )
  }

  return (
    <div className={`flex ${thumbnailClasses[thumbnailPosition]} gap-4`}>
      {/* Thumbnails */}
      {showThumbnails && images.length > 1 && (
        <div className={`
          flex gap-2 overflow-auto
          ${thumbnailPosition === 'bottom' ? 'flex-row mt-4' : 'flex-col w-24'}
        `}>
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => handleImageSelect(index)}
              className={`
                relative flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all
                ${thumbnailPosition === 'bottom' ? 'w-20 h-20' : 'w-20 h-20'}
                ${selectedImage === index 
                  ? 'border-yellow-500 shadow-lg scale-105' 
                  : 'border-transparent hover:border-yellow-300'
                }
              `}
            >
              <Image
                src={img}
                alt={`${productName} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Image */}
      <div className="flex-1 relative">
        <div
          className={`
            relative ${aspectClasses[aspectRatio]} bg-gray-100 rounded-2xl overflow-hidden
            ${allowZoom ? 'cursor-zoom-in' : ''}
          `}
          onClick={() => allowZoom && setIsZoomed(!isZoomed)}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setIsZoomed(false)}
        >
          {/* Main Image */}
          <Image
            src={images[selectedImage]}
            alt={`${productName} - Main View`}
            fill
            className={`
              object-cover transition-transform duration-300
              ${isZoomed ? 'scale-150' : 'scale-100'}
            `}
            style={{
              transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
            }}
            priority
          />

          {/* Navigation Arrows (for mobile) */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handlePrevImage()
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-gray-800 hover:bg-white transition md:hidden"
              >
                ‹
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleNextImage()
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-gray-800 hover:bg-white transition md:hidden"
              >
                ›
              </button>
            </>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm md:hidden">
              {selectedImage + 1} / {images.length}
            </div>
          )}

          {/* Zoom Indicator */}
          {allowZoom && !isZoomed && (
            <div className="absolute bottom-4 right-4 bg-black/50 text-white p-2 rounded-full md:opacity-0 md:group-hover:opacity-100 transition-opacity">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          )}
        </div>

        {/* Desktop Navigation Arrows */}
        {images.length > 1 && (
          <div className="hidden md:block">
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-gray-800 hover:bg-white transition opacity-0 group-hover:opacity-100"
            >
              ‹
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-gray-800 hover:bg-white transition opacity-0 group-hover:opacity-100"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
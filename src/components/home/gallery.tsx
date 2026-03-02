// components/home/gallery.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type GalleryImage = {
  id: string
  src: string
  alt: string
  title?: string
  link?: string
  width?: number
  height?: number
}

type GalleryProps = {
  title?: string
  subtitle?: string
  images?: GalleryImage[]
  columns?: 2 | 3 | 4
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape'
  showCaptions?: boolean
  lightbox?: boolean
}

export default function Gallery({
  title = 'Our Collection',
  subtitle = 'Browse our stunning jewelry collection',
  images,
  columns = 3,
  aspectRatio = 'square',
  showCaptions = true,
  lightbox = true
}: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [filter, setFilter] = useState('all')

  // Default gallery images
  const defaultImages: GalleryImage[] = [
    {
      id: '1',
      src: '/images/n1.jpeg',
      alt: 'Gold Necklace',
      title: '24K Gold Kundan Necklace',
      link: '/products/1'
    },
    {
      id: '2',
      src: '/images/n2.jpeg',
      alt: 'Gold Earrings',
      title: '22K Gold Jhumka Earrings',
      link: '/products/2'
    },
    {
      id: '3',
      src: '/images/n3.jpeg',
      alt: 'Diamond Ring',
      title: '18K Gold Diamond Ring',
      link: '/products/3'
    },
    {
      id: '4',
      src: '/images/n4.jpeg',
      alt: 'Gold Bangles',
      title: '24K Gold Bangles Set',
      link: '/products/4'
    },
    {
      id: '5',
      src: '/images/n5.jpeg',
      alt: 'Gold Chain',
      title: '22K Gold Chain for Men',
      link: '/products/5'
    },
    {
      id: '6',
      src: '/images/n6.jpeg',
      alt: 'Gold Pendant',
      title: '18K Gold Pendant Set',
      link: '/products/6'
    }
  ]

  const displayImages = images || defaultImages

  // Filter categories
  const categories = ['all', 'necklaces', 'earrings', 'rings', 'bangles', 'chains']
  
  const filteredImages = filter === 'all' 
    ? displayImages 
    : displayImages.filter(img => 
        img.title?.toLowerCase().includes(filter) || 
        img.alt.toLowerCase().includes(filter)
      )

  // Aspect ratio classes
  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]'
  }

  // Grid columns
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  }

  const openLightbox = (image: GalleryImage) => {
    if (lightbox) {
      setSelectedImage(image)
      document.body.style.overflow = 'hidden'
    }
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = 'auto'
  }

  return (
    <section className="py-16 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === cat
                  ? 'bg-yellow-500 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className={`grid ${gridCols[columns]} gap-6`}>
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              onClick={() => openLightbox(image)}
            >
              {/* Image */}
              <div className={`${aspectClasses[aspectRatio]} relative`}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Caption */}
                {showCaptions && (
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    {image.title && (
                      <h3 className="text-white text-xl font-bold mb-2">{image.title}</h3>
                    )}
                    {image.link && (
                      <Link
                        href={image.link}
                        className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>View Product</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    )}
                  </div>
                )}

                {/* Index Number */}
                <div className="absolute top-4 left-4 w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  {index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-500 text-white rounded-full font-bold hover:bg-yellow-600 transition transform hover:scale-105"
          >
            <span>View Full Gallery</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightbox && selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white text-4xl hover:text-yellow-500 transition"
          >
            ×
          </button>
          
          <div className="relative max-w-5xl w-full h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              className="object-contain"
            />
            
            {selectedImage.title && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-white text-2xl font-bold">{selectedImage.title}</h3>
              </div>
            )}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              const currentIndex = displayImages.findIndex(img => img.id === selectedImage.id)
              const prevIndex = currentIndex > 0 ? currentIndex - 1 : displayImages.length - 1
              setSelectedImage(displayImages[prevIndex])
            }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-yellow-500 transition"
          >
            ‹
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation()
              const currentIndex = displayImages.findIndex(img => img.id === selectedImage.id)
              const nextIndex = currentIndex < displayImages.length - 1 ? currentIndex + 1 : 0
              setSelectedImage(displayImages[nextIndex])
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-yellow-500 transition"
          >
            ›
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full">
            {displayImages.findIndex(img => img.id === selectedImage.id) + 1} / {displayImages.length}
          </div>
        </div>
      )}
    </section>
  )
}
// components/products/product-reviews.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Review = {
  id: string
  userName: string
  userAvatar?: string
  rating: number
  title?: string
  content: string
  date: string
  verified?: boolean
  helpful?: number
  images?: string[]
  productName?: string
  productId?: string
}

type ProductReviewsProps = {
  productId?: string
  productName?: string
  reviews: Review[]
  averageRating?: number
  totalReviews?: number
  showWriteReview?: boolean
  onWriteReview?: () => void
  onHelpful?: (reviewId: string) => void
}

export default function ProductReviews({
  productId,
  productName,
  reviews,
  averageRating,
  totalReviews = reviews.length,
  showWriteReview = true,
  onWriteReview,
  onHelpful
}: ProductReviewsProps) {
  const [sortBy, setSortBy] = useState('recent')
  const [filterRating, setFilterRating] = useState(0)
  const [expandedReviews, setExpandedReviews] = useState<string[]>([])

  // Calculate rating distribution
  const ratingCounts = [0, 0, 0, 0, 0]
  reviews.forEach(review => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingCounts[review.rating - 1]++
    }
  })

  const average = averageRating || 
    (reviews.length > 0 
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
      : 0)

  // Sort reviews
  const sortedReviews = [...reviews].sort((a, b) => {
    switch(sortBy) {
      case 'recent':
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case 'highest':
        return b.rating - a.rating
      case 'lowest':
        return a.rating - b.rating
      case 'helpful':
        return (b.helpful || 0) - (a.helpful || 0)
      default:
        return 0
    }
  })

  // Filter by rating
  const filteredReviews = filterRating === 0
    ? sortedReviews
    : sortedReviews.filter(review => review.rating === filterRating)

  const toggleExpand = (reviewId: string) => {
    setExpandedReviews(prev =>
      prev.includes(reviewId)
        ? prev.filter(id => id !== reviewId)
        : [...prev, reviewId]
    )
  }

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-5 h-5'
    }

    return Array.from({ length: 5 }).map((_, index) => (
      <svg
        key={index}
        className={`${sizeClasses[size]} ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Customer Reviews
          {totalReviews > 0 && (
            <span className="ml-2 text-lg font-normal text-gray-500">
              ({totalReviews})
            </span>
          )}
        </h2>
        {showWriteReview && (
          <button
            onClick={onWriteReview}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 transition"
          >
            Write a Review
          </button>
        )}
      </div>

      {reviews.length === 0 ? (
        // No reviews state
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Reviews Yet</h3>
          <p className="text-gray-600 mb-6">Be the first to review this product</p>
          {showWriteReview && (
            <button
              onClick={onWriteReview}
              className="px-6 py-3 bg-yellow-500 text-white rounded-lg font-bold hover:bg-yellow-600 transition"
            >
              Write a Review
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Rating Summary */}
          <div className="grid md:grid-cols-2 gap-8 mb-8 p-6 bg-gray-50 rounded-xl">
            {/* Average Rating */}
            <div className="text-center md:text-left">
              <div className="text-5xl font-bold text-gray-800 mb-2">
                {average.toFixed(1)}
              </div>
              <div className="flex justify-center md:justify-start gap-1 mb-2">
                {renderStars(Math.round(average), 'lg')}
              </div>
              <p className="text-sm text-gray-500">
                Based on {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
              </p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = ratingCounts[rating - 1] || 0
                const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0
                
                return (
                  <button
                    key={rating}
                    onClick={() => setFilterRating(filterRating === rating ? 0 : rating)}
                    className={`flex items-center gap-2 w-full group ${
                      filterRating === rating ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <span className="text-sm font-medium w-8">{rating}★</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-12">{count}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Filter:</span>
              <button
                onClick={() => setFilterRating(0)}
                className={`px-3 py-1 rounded-full text-sm transition ${
                  filterRating === 0
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {[5, 4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setFilterRating(rating)}
                  className={`px-3 py-1 rounded-full text-sm transition ${
                    filterRating === rating
                      ? 'bg-yellow-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {rating}★
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 border rounded-lg text-sm focus:outline-none focus:border-yellow-500"
              >
                <option value="recent">Most Recent</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
                <option value="helpful">Most Helpful</option>
              </select>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {filteredReviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                {/* Review Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                      {review.userAvatar ? (
                        <Image
                          src={review.userAvatar}
                          alt={review.userName}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-lg">
                          {review.userName.charAt(0)}
                        </div>
                      )}
                    </div>

                    {/* User Info */}
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-gray-800">{review.userName}</h4>
                        {review.verified && (
                          <span className="px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded-full">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex gap-0.5">
                          {renderStars(review.rating, 'sm')}
                        </div>
                        <span className="text-xs text-gray-500">
                          {formatDate(review.date)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Helpful Button */}
                  <button
                    onClick={() => onHelpful?.(review.id)}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-lg text-sm text-gray-600 hover:bg-gray-200 transition"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    <span>Helpful ({review.helpful || 0})</span>
                  </button>
                </div>

                {/* Review Title */}
                {review.title && (
                  <h5 className="font-bold text-gray-800 mb-2">{review.title}</h5>
                )}

                {/* Review Content */}
                <div className="text-gray-600 mb-3">
                  <p className={expandedReviews.includes(review.id) ? '' : 'line-clamp-3'}>
                    {review.content}
                  </p>
                  {review.content.length > 300 && (
                    <button
                      onClick={() => toggleExpand(review.id)}
                      className="text-yellow-600 hover:text-yellow-700 text-sm font-medium mt-1"
                    >
                      {expandedReviews.includes(review.id) ? 'Show less' : 'Read more'}
                    </button>
                  )}
                </div>

                {/* Review Images */}
                {review.images && review.images.length > 0 && (
                  <div className="flex gap-2 mt-3">
                    {review.images.map((img, index) => (
                      <div key={index} className="relative w-20 h-20 rounded-lg overflow-hidden">
                        <Image
                          src={img}
                          alt={`Review image ${index + 1}`}
                          fill
                          className="object-cover cursor-pointer hover:scale-110 transition"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Product Link (for all reviews page) */}
                {productId && productName && (
                  <Link
                    href={`/products/${productId}`}
                    className="inline-block mt-3 text-sm text-yellow-600 hover:text-yellow-700"
                  >
                    View Product →
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {filteredReviews.length < reviews.length && (
            <div className="text-center mt-8">
              <button className="px-6 py-3 border-2 border-yellow-500 text-yellow-600 rounded-lg font-bold hover:bg-yellow-50 transition">
                Load More Reviews
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
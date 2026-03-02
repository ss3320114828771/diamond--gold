// app/(shop)/products/[id]/loading.tsx
export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <div className="bg-gradient-to-r from-amber-700 to-yellow-700 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-8 w-48 bg-white/20 rounded animate-pulse mx-auto"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button Skeleton */}
        <div className="h-6 w-24 bg-gray-200 rounded animate-pulse mb-6"></div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Gallery Skeleton */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-200 rounded-2xl animate-pulse"></div>
            
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <div className="h-10 w-3/4 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Price */}
            <div className="h-12 w-40 bg-gray-200 rounded animate-pulse"></div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i}>
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>

            {/* Quantity */}
            <div>
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 w-16 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <div className="h-14 w-full bg-gray-200 rounded-xl animate-pulse"></div>
              <div className="h-14 w-14 bg-gray-200 rounded-xl animate-pulse"></div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Related Products Skeleton */}
        <div className="mt-16">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-4">
                <div className="aspect-square bg-gray-200 rounded-lg animate-pulse mb-3"></div>
                <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Admin Info Skeleton */}
      <div className="mt-8 bg-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mx-auto"></div>
        </div>
      </div>
    </div>
  )
}
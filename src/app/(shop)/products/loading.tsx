// app/(shop)/products/loading.tsx
export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Bismillah */}
      <div className="bg-gradient-to-r from-amber-700 to-yellow-700 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-8 w-48 bg-white/20 rounded animate-pulse mx-auto"></div>
          <div className="h-4 w-64 bg-white/20 rounded animate-pulse mx-auto mt-2"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filter Bar Skeleton */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* Toolbar Skeleton */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-40 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Products Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg overflow-hidden shadow">
              {/* Image Skeleton */}
              <div className="aspect-square bg-gray-200 animate-pulse"></div>
              
              {/* Content Skeleton */}
              <div className="p-4 space-y-3">
                <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex gap-2">
                  <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Skeleton */}
        <div className="text-center mt-8">
          <div className="h-12 w-48 bg-gray-200 rounded animate-pulse mx-auto"></div>
        </div>

        {/* Admin Info Skeleton */}
        <div className="mt-8 bg-gray-100 py-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
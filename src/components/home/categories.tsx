// components/home/categories.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'

type CategoriesProps = {
  title?: string
  subtitle?: string
  columns?: 2 | 3 | 4 | 5 | 6  // Sirf yeh values allow hain
}

export default function Categories({ 
  title = 'Shop by Category',
  subtitle = 'Explore our exclusive collections',
  columns = 4 
}: CategoriesProps) {
  // Agar columns number 2-6 ke beech nahi hai to default 4 use karo
  const validColumns = [2, 3, 4, 5, 6].includes(columns as number) ? columns : 4

  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
    6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-gray-600">{subtitle}</p>}
        </div>
        
        <div className={`grid ${gridCols[validColumns as keyof typeof gridCols]} gap-6`}>
          {/* Categories content */}
          {[1, 2, 3, 4].map((i) => (
            <Link key={i} href={`/categories/${i}`} className="bg-gray-100 p-8 text-center rounded-lg hover:bg-yellow-500 hover:text-white transition">
              Category {i}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
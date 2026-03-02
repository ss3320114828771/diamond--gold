// components/home/categories.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'

type CategoriesProps = {
  title?: string
  subtitle?: string
  columns?: 2 | 3 | 4 | 5 | 6
}

export default function Categories({ 
  title = 'Shop by Category',
  subtitle = 'Explore our exclusive collections',
  columns = 4 
}: CategoriesProps) {
  
  const categories = [
    { id: 1, name: 'Gold Necklaces', image: '/n1.jpeg', slug: '/categories/gold/necklaces' },
    { id: 2, name: 'Diamond Rings', image: '/n2.jpeg', slug: '/categories/diamonds/rings' },
    { id: 3, name: 'Gold Earrings', image: '/n3.jpeg', slug: '/categories/gold/earrings' },
    { id: 4, name: 'Diamond Necklaces', image: '/n4.jpeg', slug: '/categories/diamonds/necklaces' },
  ]

  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
    6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-gray-600">{subtitle}</p>}
        </div>
        
        <div className={`grid ${gridCols[columns]} gap-6`}>
          {categories.map((category) => (
            <Link key={category.id} href={category.slug} className="group">
              <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />
                <h3 className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
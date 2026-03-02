// components/home/hero.tsx (Ultra Simple Version)
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative h-screen bg-gradient-to-r from-yellow-600 to-orange-600">
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative h-full flex items-center justify-center text-center text-white px-4">
        <div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            HS Gold & Diamonds
          </h1>
          <p className="text-xl mb-8">
            Premium gold and diamond jewelry since 1999
          </p>
          <Link
            href="/products"
            className="inline-block px-8 py-3 bg-yellow-500 text-white rounded-full hover:bg-yellow-600"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  )
}
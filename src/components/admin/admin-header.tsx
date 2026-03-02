// components/admin/admin-header.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type AdminHeaderProps = {
  title: string
  subtitle?: string
}

export default function AdminHeader({ title, subtitle }: AdminHeaderProps) {
  const pathname = usePathname()

  return (
    <div className="bg-gradient-to-r from-amber-700 to-yellow-700 text-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Title Section */}
          <div>
            <p className="text-2xl mb-2">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
            <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
            {subtitle && <p className="text-amber-100 mt-2">{subtitle}</p>}
          </div>

          {/* Admin Info */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-amber-100">Admin</p>
              <p className="font-bold">Hafiz Sajid Syed</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold">HS</span>
            </div>
          </div>
        </div>

        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-sm text-amber-100 mt-4">
          <Link href="/admin/dashboard" className="hover:text-white transition">
            Dashboard
          </Link>
          {pathname !== '/admin/dashboard' && (
            <>
              <span>/</span>
              <span className="text-white">
                {pathname.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
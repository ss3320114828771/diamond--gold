// components/layout/breadcrumb.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type BreadcrumbProps = {
  homeElement?: React.ReactNode
  separator?: React.ReactNode
  containerClasses?: string
  listClasses?: string
  activeClasses?: string
  capitalizeLinks?: boolean
  excludePaths?: string[]
}

export default function Breadcrumb({
  homeElement = 'Home',
  separator = (
    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  ),
  containerClasses = 'bg-gray-100 py-3 px-4',
  listClasses = 'flex items-center flex-wrap gap-2 text-sm',
  activeClasses = 'text-gray-800 font-medium',
  capitalizeLinks = true,
  excludePaths = ['/admin', '/api']
}: BreadcrumbProps) {
  const pathname = usePathname()

  // Don't render breadcrumbs on excluded paths
  if (excludePaths.some(path => pathname.startsWith(path))) {
    return null
  }

  // Split pathname into segments
  const paths = pathname.split('/').filter(path => path)

  // Generate breadcrumb items
  const breadcrumbs = paths.map((path, index) => {
    const url = '/' + paths.slice(0, index + 1).join('/')
    const isLast = index === paths.length - 1
    
    // Format the name (capitalize and replace hyphens)
    let name = path.replace(/-/g, ' ')
    if (capitalizeLinks) {
      name = name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    }

    return { name, url, isLast }
  })

  // If on homepage, don't render breadcrumbs
  if (paths.length === 0) {
    return null
  }

  return (
    <nav aria-label="Breadcrumb" className={containerClasses}>
      <ol className={listClasses}>
        {/* Home link */}
        <li className="flex items-center">
          <Link
            href="/"
            className="text-gray-600 hover:text-yellow-600 transition-colors"
          >
            {homeElement}
          </Link>
        </li>

        {/* Separator after home */}
        {paths.length > 0 && (
          <li className="flex items-center text-gray-400">
            {separator}
          </li>
        )}

        {/* Dynamic breadcrumbs */}
        {breadcrumbs.map((item, index) => (
          <li key={item.url} className="flex items-center">
            {item.isLast ? (
              <span className={activeClasses}>
                {item.name}
              </span>
            ) : (
              <>
                <Link
                  href={item.url}
                  className="text-gray-600 hover:text-yellow-600 transition-colors"
                >
                  {item.name}
                </Link>
                <span className="ml-2 text-gray-400">
                  {separator}
                </span>
              </>
            )}
          </li>
        ))}
      </ol>

      {/* Schema.org markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: process.env.NEXTAUTH_URL || 'https://hsgold.com'
              },
              ...breadcrumbs.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 2,
                name: item.name,
                item: `${process.env.NEXTAUTH_URL || 'https://hsgold.com'}${item.url}`
              }))
            ]
          })
        }}
      />
    </nav>
  )
}
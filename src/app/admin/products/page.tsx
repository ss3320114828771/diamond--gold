// app/admin/products/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type Product = {
  id: string
  name: string
  price: number
  purity: string
  weight: number
  stock: number
  image: string
  inStock: boolean
  featured: boolean
  sales: number
}

export default function AdminProductsPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  // Sample products data
  const products: Product[] = [
    {
      id: '1',
      name: '24K Gold Kundan Necklace',
      price: 12999,
      purity: '24K',
      weight: 45.5,
      stock: 10,
      image: '/images/n1.jpeg',
      inStock: true,
      featured: true,
      sales: 45
    },
    {
      id: '2',
      name: '22K Gold Jhumka Earrings',
      price: 3499,
      purity: '22K',
      weight: 12.8,
      stock: 15,
      image: '/images/n2.jpeg',
      inStock: true,
      featured: true,
      sales: 38
    },
    {
      id: '3',
      name: '18K Gold Diamond Ring',
      price: 5999,
      purity: '18K',
      weight: 8.5,
      stock: 5,
      image: '/images/n3.jpeg',
      inStock: true,
      featured: false,
      sales: 27
    },
    {
      id: '4',
      name: '24K Gold Bangles Set',
      price: 8999,
      purity: '24K',
      weight: 32.0,
      stock: 8,
      image: '/images/n4.jpeg',
      inStock: true,
      featured: true,
      sales: 23
    },
    {
      id: '5',
      name: '22K Gold Chain for Men',
      price: 4999,
      purity: '22K',
      weight: 18.5,
      stock: 0,
      image: '/images/n5.jpeg',
      inStock: false,
      featured: false,
      sales: 15
    },
    {
      id: '6',
      name: '18K Gold Pendant Set',
      price: 4499,
      purity: '18K',
      weight: 15.2,
      stock: 12,
      image: '/images/n6.jpeg',
      inStock: true,
      featured: true,
      sales: 31
    }
  ]

  // Filter products
  const filteredProducts = products
    .filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.includes(search)
    )
    .filter(p => {
      if (filter === 'all') return true
      if (filter === 'inStock') return p.inStock
      if (filter === 'outOfStock') return !p.inStock
      if (filter === 'featured') return p.featured
      return true
    })

  // Select all products
  const selectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id))
    }
  }

  // Toggle product selection
  const toggleSelect = (id: string) => {
    setSelectedProducts(prev =>
      prev.includes(id)
        ? prev.filter(pid => pid !== id)
        : [...prev, id]
    )
  }

  // Bulk actions
  const handleBulkDelete = () => {
    if (confirm(`Delete ${selectedProducts.length} selected products?`)) {
      alert(`Deleted ${selectedProducts.length} products`)
      setSelectedProducts([])
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Bismillah */}
      <div className="bg-gradient-to-r from-amber-700 to-yellow-700 text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-2xl mb-2">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
              <h1 className="text-3xl md:text-4xl font-bold">Manage Products</h1>
              <p className="text-amber-100 mt-2">{products.length} total products</p>
            </div>
            
            <Link
              href="/admin/products/add"
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
            >
              + Add New Product
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters and Actions */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
              />
            </div>

            {/* Filter */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
            >
              <option value="all">All Products</option>
              <option value="inStock">In Stock</option>
              <option value="outOfStock">Out of Stock</option>
              <option value="featured">Featured</option>
            </select>

            {/* Bulk Actions */}
            {selectedProducts.length > 0 && (
              <div className="flex gap-2">
                <button
                  onClick={handleBulkDelete}
                  className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete Selected ({selectedProducts.length})
                </button>
              </div>
            )}

            {/* Export */}
            <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
              Export CSV
            </button>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                      onChange={selectAll}
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Purity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Weight</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sales</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => toggleSelect(product.id)}
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative w-12 h-12">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">ID: {product.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium">{product.purity}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span>{product.weight}g</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold">${product.price.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-medium ${product.stock === 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span>{product.sales}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1">
                        {product.featured && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Featured</span>
                        )}
                        {!product.inStock && (
                          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Out of Stock</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </Link>
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="text-yellow-600 hover:text-yellow-900"
                        >
                          Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No products found</p>
              <Link
                href="/admin/products/add"
                className="text-yellow-600 hover:underline"
              >
                Add your first product
              </Link>
            </div>
          )}

          {/* Pagination */}
          <div className="bg-white px-4 py-3 border-t">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{' '}
                <span className="font-medium">{filteredProducts.length}</span> of{' '}
                <span className="font-medium">{filteredProducts.length}</span> results
              </p>
              <div className="flex gap-2">
                <button className="px-3 py-1 border rounded hover:bg-gray-50">Previous</button>
                <button className="px-3 py-1 border rounded bg-yellow-500 text-white">1</button>
                <button className="px-3 py-1 border rounded hover:bg-gray-50">2</button>
                <button className="px-3 py-1 border rounded hover:bg-gray-50">3</button>
                <button className="px-3 py-1 border rounded hover:bg-gray-50">Next</button>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Info */}
        <div className="mt-8 bg-gray-100 py-4 text-center text-sm rounded">
          <p>Hafiz Sajid Syed | sajid.syed@gmail.com</p>
        </div>
      </div>
    </div>
  )
}
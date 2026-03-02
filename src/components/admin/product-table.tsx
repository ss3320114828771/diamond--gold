// components/admin/product-table.tsx
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

type ProductTableProps = {
  products: Product[]
  showFilters?: boolean
  onStatusChange?: (id: string, field: string, value: any) => void
  onDelete?: (id: string) => void
  onBulkDelete?: (ids: string[]) => void
}

export default function ProductTable({ 
  products, 
  showFilters = true, 
  onStatusChange,
  onDelete,
  onBulkDelete 
}: ProductTableProps) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

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
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    )
  }

  // Handle bulk delete
  const handleBulkDelete = () => {
    if (onBulkDelete && selectedProducts.length > 0) {
      onBulkDelete(selectedProducts)
      setSelectedProducts([])
    }
  }

  // Stock status color
  const getStockColor = (stock: number) => {
    if (stock === 0) return 'text-red-600'
    if (stock < 5) return 'text-orange-600'
    return 'text-green-600'
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Filters */}
      {showFilters && (
        <div className="p-4 border-b">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
              />
            </div>
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
          </div>
        </div>
      )}

      {/* Bulk Actions */}
      {selectedProducts.length > 0 && (
        <div className="bg-gray-50 px-4 py-2 border-b flex items-center gap-4">
          <span className="text-sm font-medium">{selectedProducts.length} selected</span>
          <button 
            onClick={handleBulkDelete}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Delete Selected
          </button>
        </div>
      )}

      {/* Table */}
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
                  {onStatusChange ? (
                    <input
                      type="number"
                      value={product.stock}
                      onChange={(e) => onStatusChange(product.id, 'stock', parseInt(e.target.value))}
                      min="0"
                      className={`w-20 px-2 py-1 border rounded ${getStockColor(product.stock)}`}
                    />
                  ) : (
                    <span className={`font-medium ${getStockColor(product.stock)}`}>
                      {product.stock}
                    </span>
                  )}
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
                    {onStatusChange && (
                      <label className="flex items-center gap-1 text-sm">
                        <input
                          type="checkbox"
                          checked={product.featured}
                          onChange={(e) => onStatusChange(product.id, 'featured', e.target.checked)}
                          className="rounded"
                        />
                        <span className="text-xs">Featured</span>
                      </label>
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
                    {onDelete && (
                      <button
                        onClick={() => onDelete(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    )}
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
      {filteredProducts.length > 0 && (
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
      )}
    </div>
  )
}
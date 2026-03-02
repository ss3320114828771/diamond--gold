// components/admin/user-table.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type User = {
  id: string
  name: string
  email: string
  role: 'admin' | 'customer'
  orders: number
  spent: number
  joined: string
  status: 'active' | 'blocked'
  lastLogin?: string
  avatar?: string
}

type UserTableProps = {
  users: User[]
  showFilters?: boolean
  onStatusChange?: (id: string, status: 'active' | 'blocked') => void
  onRoleChange?: (id: string, role: 'admin' | 'customer') => void
  onDelete?: (id: string) => void
  onBulkAction?: (ids: string[], action: string) => void
}

export default function UserTable({ 
  users, 
  showFilters = true, 
  onStatusChange,
  onRoleChange,
  onDelete,
  onBulkAction 
}: UserTableProps) {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  // Filter users
  const filteredUsers = users
    .filter(user => 
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    )
    .filter(user => roleFilter === 'all' || user.role === roleFilter)
    .filter(user => statusFilter === 'all' || user.status === statusFilter)

  // Select all users
  const selectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(filteredUsers.map(u => u.id))
    }
  }

  // Toggle user selection
  const toggleSelect = (id: string) => {
    setSelectedUsers(prev =>
      prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]
    )
  }

  // Handle bulk action
  const handleBulkAction = (action: string) => {
    if (onBulkAction && selectedUsers.length > 0) {
      onBulkAction(selectedUsers, action)
      setSelectedUsers([])
    }
  }

  // Get role badge color
  const getRoleColor = (role: string) => {
    return role === 'admin' 
      ? 'bg-purple-100 text-purple-800' 
      : 'bg-blue-100 text-blue-800'
  }

  // Get status badge color
  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800'
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Filters */}
      {showFilters && (
        <div className="p-4 border-b">
          <div className="flex flex-wrap gap-4">
            {/* Search */}
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
              />
            </div>

            {/* Role Filter */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
            >
              <option value="all">All Roles</option>
              <option value="customer">Customers</option>
              <option value="admin">Admins</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border rounded focus:outline-none focus:border-yellow-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
        </div>
      )}

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="bg-gray-50 px-4 py-2 border-b flex items-center gap-4">
          <span className="text-sm font-medium">{selectedUsers.length} selected</span>
          <button
            onClick={() => handleBulkAction('block')}
            className="text-sm text-yellow-600 hover:text-yellow-800"
          >
            Block
          </button>
          <button
            onClick={() => handleBulkAction('unblock')}
            className="text-sm text-green-600 hover:text-green-800"
          >
            Unblock
          </button>
          <button
            onClick={() => handleBulkAction('delete')}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Delete
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
                  checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                  onChange={selectAll}
                  className="rounded border-gray-300"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Spent</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Login</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => toggleSelect(user.id)}
                    className="rounded border-gray-300"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                      {user.avatar ? (
                        <Image
                          src={user.avatar}
                          alt={user.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-yellow-100 text-yellow-600 font-bold">
                          {user.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {onRoleChange ? (
                    <select
                      value={user.role}
                      onChange={(e) => onRoleChange(user.id, e.target.value as 'admin' | 'customer')}
                      className={`px-2 py-1 text-xs rounded-full ${getRoleColor(user.role)} border-0 focus:ring-2 focus:ring-yellow-500`}
                    >
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : (
                    <span className={`px-2 py-1 text-xs rounded-full ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className="font-medium">{user.orders}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-bold text-green-600">{formatCurrency(user.spent)}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm">{new Date(user.joined).toLocaleDateString()}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-500">
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {onStatusChange ? (
                    <select
                      value={user.status}
                      onChange={(e) => onStatusChange(user.id, e.target.value as 'active' | 'blocked')}
                      className={`px-2 py-1 text-xs rounded-full ${getStatusColor(user.status)} border-0 focus:ring-2 focus:ring-yellow-500`}
                    >
                      <option value="active">Active</option>
                      <option value="blocked">Blocked</option>
                    </select>
                  ) : (
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/users/${user.id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </Link>
                    {onDelete && (
                      <button
                        onClick={() => onDelete(user.id)}
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
      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No users found</p>
        </div>
      )}

      {/* Pagination */}
      {filteredUsers.length > 0 && (
        <div className="bg-white px-4 py-3 border-t">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{' '}
              <span className="font-medium">{filteredUsers.length}</span> of{' '}
              <span className="font-medium">{filteredUsers.length}</span> results
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
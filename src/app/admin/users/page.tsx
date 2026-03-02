// app/admin/users/page.tsx
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
  avatar?: string
}

export default function AdminUsersPage() {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  // Sample users data
  const users: User[] = [
    {
      id: '1',
      name: 'Ahmed Khan',
      email: 'ahmed.khan@email.com',
      role: 'customer',
      orders: 12,
      spent: 45670,
      joined: '2024-01-15',
      status: 'active'
    },
    {
      id: '2',
      name: 'Fatima Ali',
      email: 'fatima.ali@email.com',
      role: 'customer',
      orders: 8,
      spent: 28990,
      joined: '2024-02-10',
      status: 'active'
    },
    {
      id: '3',
      name: 'Yusuf Mohammed',
      email: 'yusuf.m@email.com',
      role: 'customer',
      orders: 5,
      spent: 15450,
      joined: '2024-02-20',
      status: 'active'
    },
    {
      id: '4',
      name: 'Hafiz Sajid Syed',
      email: 'sajid.syed@gmail.com',
      role: 'admin',
      orders: 0,
      spent: 0,
      joined: '2024-01-01',
      status: 'active'
    },
    {
      id: '5',
      name: 'Aisha Syed',
      email: 'aisha.s@email.com',
      role: 'customer',
      orders: 15,
      spent: 67890,
      joined: '2024-01-05',
      status: 'active'
    },
    {
      id: '6',
      name: 'Omar Hassan',
      email: 'omar.h@email.com',
      role: 'customer',
      orders: 3,
      spent: 8999,
      joined: '2024-03-01',
      status: 'blocked'
    }
  ]

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
      prev.includes(id)
        ? prev.filter(uid => uid !== id)
        : [...prev, id]
    )
  }

  // Bulk actions
  const handleBulkBlock = () => {
    if (confirm(`Block ${selectedUsers.length} selected users?`)) {
      alert(`Blocked ${selectedUsers.length} users`)
      setSelectedUsers([])
    }
  }

  const handleBulkDelete = () => {
    if (confirm(`Delete ${selectedUsers.length} selected users?`)) {
      alert(`Deleted ${selectedUsers.length} users`)
      setSelectedUsers([])
    }
  }

  // Stats
  const totalUsers = users.length
  const totalCustomers = users.filter(u => u.role === 'customer').length
  const totalAdmins = users.filter(u => u.role === 'admin').length
  const activeUsers = users.filter(u => u.status === 'active').length
  const totalSpent = users.reduce((sum, u) => sum + u.spent, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Bismillah */}
      <div className="bg-gradient-to-r from-amber-700 to-yellow-700 text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-2xl mb-2">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
              <h1 className="text-3xl md:text-4xl font-bold">Manage Users</h1>
              <p className="text-amber-100 mt-2">{totalUsers} total users</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500">Total Users</p>
            <p className="text-2xl font-bold">{totalUsers}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500">Customers</p>
            <p className="text-2xl font-bold">{totalCustomers}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500">Admins</p>
            <p className="text-2xl font-bold">{totalAdmins}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500">Active</p>
            <p className="text-2xl font-bold text-green-600">{activeUsers}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500">Total Spent</p>
            <p className="text-2xl font-bold text-yellow-600">${totalSpent.toLocaleString()}</p>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
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

            {/* Bulk Actions */}
            {selectedUsers.length > 0 && (
              <div className="flex gap-2">
                <button
                  onClick={handleBulkBlock}
                  className="px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Block Selected ({selectedUsers.length})
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete Selected ({selectedUsers.length})
                </button>
              </div>
            )}

            {/* Export */}
            <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
              Export CSV
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
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
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        user.role === 'admin' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium">{user.orders}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold">${user.spent.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm">{new Date(user.joined).toLocaleDateString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          View
                        </button>
                        <button className="text-yellow-600 hover:text-yellow-900">
                          Edit
                        </button>
                        {user.status === 'active' ? (
                          <button className="text-red-600 hover:text-red-900">
                            Block
                          </button>
                        ) : (
                          <button className="text-green-600 hover:text-green-900">
                            Unblock
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
              <p className="text-gray-500">No users found matching your filters</p>
            </div>
          )}

          {/* Pagination */}
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
        </div>

        {/* Admin Info */}
        <div className="mt-8 bg-gray-100 py-4 text-center text-sm rounded">
          <p>Hafiz Sajid Syed | sajid.syed@gmail.com</p>
        </div>
      </div>
    </div>
  )
}
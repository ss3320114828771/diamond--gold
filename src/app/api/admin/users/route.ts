// app/api/admin/users/route.ts
import { NextResponse } from 'next/server'

// Mock users data - In real app, fetch from database
let users = [
  {
    id: '1',
    name: 'Ahmed Khan',
    email: 'ahmed.khan@email.com',
    role: 'customer',
    orders: 12,
    spent: 45670,
    joined: '2024-01-15',
    status: 'active',
    lastLogin: '2024-03-15'
  },
  {
    id: '2',
    name: 'Fatima Ali',
    email: 'fatima.ali@email.com',
    role: 'customer',
    orders: 8,
    spent: 28990,
    joined: '2024-02-10',
    status: 'active',
    lastLogin: '2024-03-14'
  },
  {
    id: '3',
    name: 'Yusuf Mohammed',
    email: 'yusuf.m@email.com',
    role: 'customer',
    orders: 5,
    spent: 15450,
    joined: '2024-02-20',
    status: 'active',
    lastLogin: '2024-03-10'
  },
  {
    id: '4',
    name: 'Hafiz Sajid Syed',
    email: 'sajid.syed@gmail.com',
    role: 'admin',
    orders: 0,
    spent: 0,
    joined: '2024-01-01',
    status: 'active',
    lastLogin: '2024-03-15'
  },
  {
    id: '5',
    name: 'Aisha Syed',
    email: 'aisha.s@email.com',
    role: 'customer',
    orders: 15,
    spent: 67890,
    joined: '2024-01-05',
    status: 'active',
    lastLogin: '2024-03-13'
  },
  {
    id: '6',
    name: 'Omar Hassan',
    email: 'omar.h@email.com',
    role: 'customer',
    orders: 3,
    spent: 8999,
    joined: '2024-03-01',
    status: 'blocked',
    lastLogin: '2024-03-05'
  }
]

// GET /api/admin/users - Get all users with optional filters
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Filter parameters
    const search = searchParams.get('search')?.toLowerCase()
    const role = searchParams.get('role')
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    
    // In real app: Check authentication and permissions
    // const session = await getSession()
    // if (!session || session.user.role !== 'admin') {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    // Filter users
    let filteredUsers = [...users]
    
    if (search) {
      filteredUsers = filteredUsers.filter(u => 
        u.name.toLowerCase().includes(search) ||
        u.email.toLowerCase().includes(search)
      )
    }
    
    if (role && role !== 'all') {
      filteredUsers = filteredUsers.filter(u => u.role === role)
    }
    
    if (status && status !== 'all') {
      filteredUsers = filteredUsers.filter(u => u.status === status)
    }

    // Calculate summary stats
    const stats = {
      total: users.length,
      customers: users.filter(u => u.role === 'customer').length,
      admins: users.filter(u => u.role === 'admin').length,
      active: users.filter(u => u.status === 'active').length,
      blocked: users.filter(u => u.status === 'blocked').length,
      totalSpent: users.reduce((sum, u) => sum + u.spent, 0)
    }

    // Pagination
    const start = (page - 1) * limit
    const paginatedUsers = filteredUsers.slice(start, start + limit)
    
    return NextResponse.json({
      success: true,
      data: paginatedUsers,
      stats,
      pagination: {
        page,
        limit,
        total: filteredUsers.length,
        pages: Math.ceil(filteredUsers.length / limit)
      }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

// POST /api/admin/users - Create new user
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'role']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Check if email already exists
    const existingUser = users.find(u => u.email === body.email)
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Email already exists' },
        { status: 400 }
      )
    }

    // Generate new user ID
    const newId = (users.length + 1).toString()
    
    const newUser = {
      id: newId,
      ...body,
      orders: 0,
      spent: 0,
      joined: new Date().toISOString().split('T')[0],
      status: body.status || 'active',
      lastLogin: null
    }
    
    // In real app: Save to database with hashed password
    users.push(newUser)
    
    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      data: newUser
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create user' },
      { status: 500 }
    )
  }
}

// PUT /api/admin/users - Bulk update users
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { ids, action, value } = body
    
    if (!ids || !action) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Update users based on action
    users = users.map(u => {
      if (ids.includes(u.id)) {
        switch(action) {
          case 'block':
            return { ...u, status: 'blocked' }
          case 'unblock':
            return { ...u, status: 'active' }
          case 'changeRole':
            return { ...u, role: value }
          default:
            return u
        }
      }
      return u
    })
    
    return NextResponse.json({
      success: true,
      message: `Successfully updated ${ids.length} users`,
      updatedIds: ids
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update users' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/users - Bulk delete users
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const ids = searchParams.get('ids')?.split(',')
    
    if (!ids || ids.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No user IDs provided' },
        { status: 400 }
      )
    }

    // Prevent deleting admin users (optional safety check)
    const adminUsers = users.filter(u => ids.includes(u.id) && u.role === 'admin')
    if (adminUsers.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Cannot delete admin users' },
        { status: 400 }
      )
    }
    
    // In real app: Delete from database
    users = users.filter(u => !ids.includes(u.id))
    
    return NextResponse.json({
      success: true,
      message: `Successfully deleted ${ids.length} users`,
      deletedIds: ids
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete users' },
      { status: 500 }
    )
  }
}

// PATCH /api/admin/users/[id] - Update specific user
export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const body = await request.json()
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'User ID required' },
        { status: 400 }
      )
    }

    const userIndex = users.findIndex(u => u.id === id)
    if (userIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    // Update user
    users[userIndex] = {
      ...users[userIndex],
      ...body,
      id // Preserve original ID
    }
    
    return NextResponse.json({
      success: true,
      message: 'User updated successfully',
      data: users[userIndex]
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update user' },
      { status: 500 }
    )
  }
}
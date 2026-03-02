// app/api/admin/products/route.ts
import { NextResponse } from 'next/server'

// Mock products data - In real app, fetch from database
let products = [
  {
    id: '1',
    name: '24K Gold Kundan Necklace',
    description: 'Traditional Kundan necklace with intricate design',
    price: 12999,
    purity: '24K',
    weight: 45.5,
    type: 'Necklace',
    style: 'Traditional',
    gender: 'Women',
    occasion: 'Wedding',
    stock: 10,
    images: ['/images/n1.jpeg', '/images/n2.jpeg'],
    inStock: true,
    featured: true,
    handmade: true,
    certification: 'BIS Hallmarked',
    createdAt: '2024-01-15',
    sales: 45
  },
  {
    id: '2',
    name: '22K Gold Jhumka Earrings',
    description: 'Classic Jhumka earrings with peacock design',
    price: 3499,
    purity: '22K',
    weight: 12.8,
    type: 'Earrings',
    style: 'Traditional',
    gender: 'Women',
    occasion: 'Festive',
    stock: 15,
    images: ['/images/n2.jpeg'],
    inStock: true,
    featured: true,
    handmade: true,
    certification: 'BIS Hallmarked',
    createdAt: '2024-01-20',
    sales: 38
  },
  {
    id: '3',
    name: '18K Gold Diamond Ring',
    description: 'Modern design ring with diamond accents',
    price: 5999,
    purity: '18K',
    weight: 8.5,
    type: 'Ring',
    style: 'Contemporary',
    gender: 'Unisex',
    occasion: 'Daily Wear',
    stock: 5,
    images: ['/images/n3.jpeg'],
    inStock: true,
    featured: false,
    handmade: false,
    certification: 'IGI Certified',
    createdAt: '2024-02-01',
    sales: 27
  }
]

// GET /api/admin/products - Get all products with optional filters
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Filter parameters
    const search = searchParams.get('search')?.toLowerCase()
    const purity = searchParams.get('purity')
    const type = searchParams.get('type')
    const inStock = searchParams.get('inStock')
    const featured = searchParams.get('featured')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    
    // In real app: Check authentication and permissions
    // const session = await getSession()
    // if (!session || session.user.role !== 'admin') {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    // Filter products
    let filteredProducts = [...products]
    
    if (search) {
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(search) ||
        p.id.includes(search)
      )
    }
    
    if (purity && purity !== 'all') {
      filteredProducts = filteredProducts.filter(p => p.purity === purity)
    }
    
    if (type && type !== 'all') {
      filteredProducts = filteredProducts.filter(p => p.type === type)
    }
    
    if (inStock === 'true') {
      filteredProducts = filteredProducts.filter(p => p.inStock)
    } else if (inStock === 'false') {
      filteredProducts = filteredProducts.filter(p => !p.inStock)
    }
    
    if (featured === 'true') {
      filteredProducts = filteredProducts.filter(p => p.featured)
    }

    // Pagination
    const start = (page - 1) * limit
    const paginatedProducts = filteredProducts.slice(start, start + limit)
    
    return NextResponse.json({
      success: true,
      data: paginatedProducts,
      pagination: {
        page,
        limit,
        total: filteredProducts.length,
        pages: Math.ceil(filteredProducts.length / limit)
      }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

// POST /api/admin/products - Create new product
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['name', 'price', 'purity', 'weight', 'type', 'stock']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Generate new product ID
    const newId = (products.length + 1).toString()
    
    const newProduct = {
      id: newId,
      ...body,
      images: body.images || [],
      inStock: body.stock > 0,
      sales: 0,
      createdAt: new Date().toISOString().split('T')[0]
    }
    
    // In real app: Save to database
    products.push(newProduct)
    
    return NextResponse.json({
      success: true,
      message: 'Product created successfully',
      data: newProduct
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/products - Bulk delete products
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const ids = searchParams.get('ids')?.split(',')
    
    if (!ids || ids.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No product IDs provided' },
        { status: 400 }
      )
    }
    
    // In real app: Delete from database
    products = products.filter(p => !ids.includes(p.id))
    
    return NextResponse.json({
      success: true,
      message: `Successfully deleted ${ids.length} products`,
      deletedIds: ids
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete products' },
      { status: 500 }
    )
  }
}

// PUT /api/admin/products - Bulk update products (e.g., update stock, featured status)
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
    
    // Update products based on action
    products = products.map(p => {
      if (ids.includes(p.id)) {
        switch(action) {
          case 'updateStock':
            return { ...p, stock: value, inStock: value > 0 }
          case 'toggleFeatured':
            return { ...p, featured: value }
          case 'updatePrice':
            return { ...p, price: value }
          default:
            return p
        }
      }
      return p
    })
    
    return NextResponse.json({
      success: true,
      message: `Successfully updated ${ids.length} products`,
      updatedIds: ids
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update products' },
      { status: 500 }
    )
  }
}
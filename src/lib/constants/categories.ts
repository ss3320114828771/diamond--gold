// lib/constants/categories.ts

// Types
export type Category = {
  id: string
  name: string
  slug: string
  description: string
  image: string
  icon: string
  metaTitle: string
  metaDescription: string
  parentId?: string
}

export type BreadcrumbItem = {
  name: string
  path: string
}

export type NavCategory = {
  name: string
  slug: string
  icon: string
  subcategories: {
    name: string
    slug: string
  }[]
}

export type SitemapUrl = {
  url: string
  lastModified: string
  changeFrequency: 'weekly' | 'daily' | 'monthly' | 'yearly'
  priority: number
}

// Main Categories
export const MAIN_CATEGORIES: Category[] = [
  {
    id: 'gold',
    name: 'Gold',
    slug: 'gold',
    description: 'Pure gold jewelry for every occasion',
    image: '/images/categories/gold.jpg',
    icon: '✨',
    metaTitle: 'Gold Jewelry - HS Gold & Diamonds',
    metaDescription: 'Explore our exquisite collection of gold jewelry including necklaces, earrings, rings, and more. 24K, 22K, and 18K gold available.'
  },
  {
    id: 'diamonds',
    name: 'Diamonds',
    slug: 'diamonds',
    description: 'Certified diamond jewelry for special moments',
    image: '/images/categories/diamonds.jpg',
    icon: '💎',
    metaTitle: 'Diamond Jewelry - HS Gold & Diamonds',
    metaDescription: 'Discover our stunning diamond jewelry collection featuring engagement rings, necklaces, earrings, and more. GIA & IGI certified diamonds.'
  },
  {
    id: 'platinum',
    name: 'Platinum',
    slug: 'platinum',
    description: 'Elegant platinum pieces for timeless beauty',
    image: '/images/categories/platinum.jpg',
    icon: '⚪',
    metaTitle: 'Platinum Jewelry - HS Gold & Diamonds',
    metaDescription: 'Shop our collection of platinum jewelry including rings, necklaces, and bracelets. Premium quality platinum pieces.'
  },
  {
    id: 'silver',
    name: 'Silver',
    slug: 'silver',
    description: 'Stylish silver jewelry for daily wear',
    image: '/images/categories/silver.jpg',
    icon: '🔘',
    metaTitle: 'Silver Jewelry - HS Gold & Diamonds',
    metaDescription: 'Browse our collection of sterling silver jewelry. Perfect for everyday wear and gifting.'
  }
]

// Gold Subcategories
export const GOLD_SUBCATEGORIES: Category[] = [
  {
    id: 'gold-necklaces',
    name: 'Necklaces',
    slug: 'gold-necklaces',
    parentId: 'gold',
    description: 'Beautiful gold necklaces for all occasions',
    image: '/images/categories/gold-necklaces.jpg',
    icon: '📿',
    metaTitle: 'Gold Necklaces - HS Gold & Diamonds',
    metaDescription: 'Shop our collection of gold necklaces including traditional, modern, and designer pieces.'
  },
  {
    id: 'gold-earrings',
    name: 'Earrings',
    slug: 'gold-earrings',
    parentId: 'gold',
    description: 'Elegant gold earrings for every style',
    image: '/images/categories/gold-earrings.jpg',
    icon: '🔔',
    metaTitle: 'Gold Earrings - HS Gold & Diamonds',
    metaDescription: 'Discover our range of gold earrings including jhumkas, studs, drops, and more.'
  },
  {
    id: 'gold-rings',
    name: 'Rings',
    slug: 'gold-rings',
    parentId: 'gold',
    description: 'Stunning gold rings for all fingers',
    image: '/images/categories/gold-rings.jpg',
    icon: '💍',
    metaTitle: 'Gold Rings - HS Gold & Diamonds',
    metaDescription: 'Explore our collection of gold rings including engagement rings, wedding bands, and fashion rings.'
  },
  {
    id: 'gold-bangles',
    name: 'Bangles',
    slug: 'gold-bangles',
    parentId: 'gold',
    description: 'Traditional and modern gold bangles',
    image: '/images/categories/gold-bangles.jpg',
    icon: '🔄',
    metaTitle: 'Gold Bangles - HS Gold & Diamonds',
    metaDescription: 'Shop gold bangles in various designs including traditional, contemporary, and antique finishes.'
  },
  {
    id: 'gold-chains',
    name: 'Chains',
    slug: 'gold-chains',
    parentId: 'gold',
    description: 'Gold chains for men and women',
    image: '/images/categories/gold-chains.jpg',
    icon: '🔗',
    metaTitle: 'Gold Chains - HS Gold & Diamonds',
    metaDescription: 'Browse our selection of gold chains including rope, cable, box, and more styles.'
  },
  {
    id: 'gold-pendants',
    name: 'Pendants',
    slug: 'gold-pendants',
    parentId: 'gold',
    description: 'Beautiful gold pendants with meaning',
    image: '/images/categories/gold-pendants.jpg',
    icon: '📿',
    metaTitle: 'Gold Pendants - HS Gold & Diamonds',
    metaDescription: 'Discover gold pendants in various designs including religious symbols, initials, and decorative motifs.'
  },
  {
    id: 'gold-nose-pins',
    name: 'Nose Pins',
    slug: 'gold-nose-pins',
    parentId: 'gold',
    description: 'Elegant gold nose pins and studs',
    image: '/images/categories/gold-nose-pins.jpg',
    icon: '🔘',
    metaTitle: 'Gold Nose Pins - HS Gold & Diamonds',
    metaDescription: 'Shop our collection of gold nose pins in various designs and sizes.'
  },
  {
    id: 'gold-toe-rings',
    name: 'Toe Rings',
    slug: 'gold-toe-rings',
    parentId: 'gold',
    description: 'Traditional gold toe rings (Bichiya)',
    image: '/images/categories/gold-toe-rings.jpg',
    icon: '🦶',
    metaTitle: 'Gold Toe Rings - HS Gold & Diamonds',
    metaDescription: 'Explore our collection of traditional gold toe rings (bichiya) for weddings and daily wear.'
  }
]

// Diamond Subcategories
export const DIAMOND_SUBCATEGORIES: Category[] = [
  {
    id: 'diamond-rings',
    name: 'Rings',
    slug: 'diamond-rings',
    parentId: 'diamonds',
    description: 'Stunning diamond rings for every occasion',
    image: '/images/categories/diamond-rings.jpg',
    icon: '💍',
    metaTitle: 'Diamond Rings - HS Gold & Diamonds',
    metaDescription: 'Shop our collection of diamond rings including solitaires, engagement rings, and fashion rings.'
  },
  {
    id: 'diamond-necklaces',
    name: 'Necklaces',
    slug: 'diamond-necklaces',
    parentId: 'diamonds',
    description: 'Elegant diamond necklaces and pendants',
    image: '/images/categories/diamond-necklaces.jpg',
    icon: '📿',
    metaTitle: 'Diamond Necklaces - HS Gold & Diamonds',
    metaDescription: 'Discover our range of diamond necklaces including solitaire pendants, tennis necklaces, and more.'
  },
  {
    id: 'diamond-earrings',
    name: 'Earrings',
    slug: 'diamond-earrings',
    parentId: 'diamonds',
    description: 'Beautiful diamond earrings for all styles',
    image: '/images/categories/diamond-earrings.jpg',
    icon: '🔔',
    metaTitle: 'Diamond Earrings - HS Gold & Diamonds',
    metaDescription: 'Browse our selection of diamond earrings including studs, drops, hoops, and chandeliers.'
  },
  {
    id: 'diamond-bracelets',
    name: 'Bracelets',
    slug: 'diamond-bracelets',
    parentId: 'diamonds',
    description: 'Sparkling diamond bracelets',
    image: '/images/categories/diamond-bracelets.jpg',
    icon: '🔗',
    metaTitle: 'Diamond Bracelets - HS Gold & Diamonds',
    metaDescription: 'Explore our collection of diamond bracelets including tennis bracelets, bangles, and cuffs.'
  },
  {
    id: 'diamond-bangles',
    name: 'Bangles',
    slug: 'diamond-bangles',
    parentId: 'diamonds',
    description: 'Elegant diamond bangles',
    image: '/images/categories/diamond-bangles.jpg',
    icon: '🔄',
    metaTitle: 'Diamond Bangles - HS Gold & Diamonds',
    metaDescription: 'Shop diamond bangles in various designs perfect for special occasions.'
  }
]

// Occasion Categories
export const OCCASION_CATEGORIES: Category[] = [
  {
    id: 'wedding',
    name: 'Wedding Collection',
    slug: 'wedding',
    description: 'Jewelry for your special day',
    image: '/images/categories/wedding.jpg',
    icon: '💒',
    metaTitle: 'Wedding Jewelry - HS Gold & Diamonds',
    metaDescription: 'Find the perfect jewelry for your wedding day including bridal sets, engagement rings, and wedding bands.'
  },
  {
    id: 'engagement',
    name: 'Engagement',
    slug: 'engagement',
    description: 'Promise rings and engagement jewelry',
    image: '/images/categories/engagement.jpg',
    icon: '💍',
    metaTitle: 'Engagement Rings - HS Gold & Diamonds',
    metaDescription: 'Shop engagement rings and promise jewelry for that special moment.'
  },
  {
    id: 'festive',
    name: 'Festive Collection',
    slug: 'festive',
    description: 'Jewelry for celebrations',
    image: '/images/categories/festive.jpg',
    icon: '🎉',
    metaTitle: 'Festive Jewelry - HS Gold & Diamonds',
    metaDescription: 'Discover jewelry perfect for festivals and celebrations including Diwali, Eid, and more.'
  },
  {
    id: 'daily-wear',
    name: 'Daily Wear',
    slug: 'daily-wear',
    description: 'Elegant pieces for everyday',
    image: '/images/categories/daily-wear.jpg',
    icon: '⭐',
    metaTitle: 'Daily Wear Jewelry - HS Gold & Diamonds',
    metaDescription: 'Browse our collection of lightweight jewelry perfect for everyday wear.'
  },
  {
    id: 'party',
    name: 'Party Wear',
    slug: 'party-wear',
    description: 'Make a statement at parties',
    image: '/images/categories/party-wear.jpg',
    icon: '🎊',
    metaTitle: 'Party Wear Jewelry - HS Gold & Diamonds',
    metaDescription: 'Shop statement jewelry pieces for parties and special events.'
  }
]

// Gender Categories
export const GENDER_CATEGORIES: Category[] = [
  {
    id: 'women',
    name: 'Women',
    slug: 'women',
    description: 'Jewelry designed for women',
    image: '/images/categories/women.jpg',
    icon: '👩',
    metaTitle: 'Women\'s Jewelry - HS Gold & Diamonds',
    metaDescription: 'Explore our collection of jewelry designed for women including necklaces, earrings, rings, and more.'
  },
  {
    id: 'men',
    name: 'Men',
    slug: 'men',
    description: 'Bold jewelry for men',
    image: '/images/categories/men.jpg',
    icon: '👨',
    metaTitle: 'Men\'s Jewelry - HS Gold & Diamonds',
    metaDescription: 'Shop our collection of men\'s jewelry including chains, rings, bracelets, and cufflinks.'
  },
  {
    id: 'kids',
    name: 'Kids',
    slug: 'kids',
    description: 'Adorable jewelry for little ones',
    image: '/images/categories/kids.jpg',
    icon: '🧒',
    metaTitle: 'Kids Jewelry - HS Gold & Diamonds',
    metaDescription: 'Discover cute and safe jewelry for children including bracelets, earrings, and pendants.'
  },
  {
    id: 'unisex',
    name: 'Unisex',
    slug: 'unisex',
    description: 'Jewelry for everyone',
    image: '/images/categories/unisex.jpg',
    icon: '👥',
    metaTitle: 'Unisex Jewelry - HS Gold & Diamonds',
    metaDescription: 'Browse our collection of gender-neutral jewelry pieces.'
  }
]

// Style Categories
export const STYLE_CATEGORIES: Category[] = [
  {
    id: 'traditional',
    name: 'Traditional',
    slug: 'traditional',
    description: 'Classic and timeless designs',
    image: '/images/categories/traditional.jpg',
    icon: '🏛️',
    metaTitle: 'Traditional Jewelry - HS Gold & Diamonds',
    metaDescription: 'Explore our collection of traditional jewelry designs passed down through generations.'
  },
  {
    id: 'contemporary',
    name: 'Contemporary',
    slug: 'contemporary',
    description: 'Modern and trendy designs',
    image: '/images/categories/contemporary.jpg',
    icon: '✨',
    metaTitle: 'Contemporary Jewelry - HS Gold & Diamonds',
    metaDescription: 'Shop modern and trendy jewelry designs for the fashion-forward individual.'
  },
  {
    id: 'antique',
    name: 'Antique',
    slug: 'antique',
    description: 'Vintage-inspired pieces',
    image: '/images/categories/antique.jpg',
    icon: '🏺',
    metaTitle: 'Antique Jewelry - HS Gold & Diamonds',
    metaDescription: 'Discover vintage-inspired antique finish jewelry with timeless appeal.'
  },
  {
    id: 'fusion',
    name: 'Fusion',
    slug: 'fusion',
    description: 'Traditional meets modern',
    image: '/images/categories/fusion.jpg',
    icon: '🔄',
    metaTitle: 'Fusion Jewelry - HS Gold & Diamonds',
    metaDescription: 'Browse our fusion collection blending traditional designs with contemporary elements.'
  }
]

// Collection Categories
export const COLLECTION_CATEGORIES: Category[] = [
  {
    id: 'best-sellers',
    name: 'Best Sellers',
    slug: 'best-sellers',
    description: 'Our most popular pieces',
    image: '/images/categories/best-sellers.jpg',
    icon: '🏆',
    metaTitle: 'Best Selling Jewelry - HS Gold & Diamonds',
    metaDescription: 'Shop our most popular and best-selling jewelry pieces loved by customers.'
  },
  {
    id: 'new-arrivals',
    name: 'New Arrivals',
    slug: 'new-arrivals',
    description: 'Fresh off the workbench',
    image: '/images/categories/new-arrivals.jpg',
    icon: '🆕',
    metaTitle: 'New Arrivals - HS Gold & Diamonds',
    metaDescription: 'Discover our newest jewelry collections and latest designs.'
  },
  {
    id: 'gift-guide',
    name: 'Gift Guide',
    slug: 'gift-guide',
    description: 'Perfect gifts for loved ones',
    image: '/images/categories/gift-guide.jpg',
    icon: '🎁',
    metaTitle: 'Gift Guide - HS Gold & Diamonds',
    metaDescription: 'Find the perfect jewelry gift for any occasion with our curated gift guide.'
  },
  {
    id: 'limited-edition',
    name: 'Limited Edition',
    slug: 'limited-edition',
    description: 'Exclusive, limited pieces',
    image: '/images/categories/limited-edition.jpg',
    icon: '✨',
    metaTitle: 'Limited Edition Jewelry - HS Gold & Diamonds',
    metaDescription: 'Shop our exclusive limited edition jewelry pieces available for a limited time.'
  }
]

// Combined categories for easy access
export const ALL_CATEGORIES: Category[] = [
  ...MAIN_CATEGORIES,
  ...GOLD_SUBCATEGORIES,
  ...DIAMOND_SUBCATEGORIES,
  ...OCCASION_CATEGORIES,
  ...GENDER_CATEGORIES,
  ...STYLE_CATEGORIES,
  ...COLLECTION_CATEGORIES
]

// Helper functions
export function getCategoryBySlug(slug: string): Category | undefined {
  return ALL_CATEGORIES.find(cat => cat.slug === slug)
}

export function getCategoriesByParent(parentId: string): Category[] {
  return ALL_CATEGORIES.filter(cat => cat.parentId === parentId)
}

export function getMainCategories(): Category[] {
  return MAIN_CATEGORIES
}

export function getSubcategories(mainCategoryId: string): Category[] {
  switch (mainCategoryId) {
    case 'gold':
      return GOLD_SUBCATEGORIES
    case 'diamonds':
      return DIAMOND_SUBCATEGORIES
    default:
      return []
  }
}

export function getCategoryBreadcrumb(slug: string): BreadcrumbItem[] {
  const category = getCategoryBySlug(slug)
  if (!category) return []

  const breadcrumb: BreadcrumbItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Categories', path: '/categories' }
  ]
  
  // Add parent category if exists
  if (category.parentId) {
    // Find parent in MAIN_CATEGORIES
    const parent = MAIN_CATEGORIES.find(cat => cat.id === category.parentId)
    if (parent) {
      breadcrumb.push({ 
        name: parent.name, 
        path: `/categories/${parent.slug}` 
      })
    }
  }
  
  // Add current category
  breadcrumb.push({ 
    name: category.name, 
    path: `/categories/${category.slug}` 
  })
  
  return breadcrumb
}

export function getCategoryMeta(slug: string): { title: string; description: string } {
  const category = getCategoryBySlug(slug)
  return {
    title: category?.metaTitle || 'Categories - HS Gold & Diamonds',
    description: category?.metaDescription || 'Browse our collection of gold and diamond jewelry.'
  }
}

// Category navigation structure
export const CATEGORY_NAVIGATION: NavCategory[] = [
  {
    name: 'Gold',
    slug: 'gold',
    icon: '✨',
    subcategories: GOLD_SUBCATEGORIES.map(sub => ({
      name: sub.name,
      slug: sub.slug
    }))
  },
  {
    name: 'Diamonds',
    slug: 'diamonds',
    icon: '💎',
    subcategories: DIAMOND_SUBCATEGORIES.map(sub => ({
      name: sub.name,
      slug: sub.slug
    }))
  },
  {
    name: 'Occasions',
    slug: 'occasions',
    icon: '🎉',
    subcategories: OCCASION_CATEGORIES.map(cat => ({
      name: cat.name,
      slug: cat.slug
    }))
  },
  {
    name: 'Collections',
    slug: 'collections',
    icon: '🏆',
    subcategories: COLLECTION_CATEGORIES.map(cat => ({
      name: cat.name,
      slug: cat.slug
    }))
  }
]

// Category URLs for sitemap
export const CATEGORY_URLS: SitemapUrl[] = ALL_CATEGORIES.map(cat => ({
  url: `/categories/${cat.slug}`,
  lastModified: new Date().toISOString(),
  changeFrequency: 'weekly',
  priority: 0.8
}))
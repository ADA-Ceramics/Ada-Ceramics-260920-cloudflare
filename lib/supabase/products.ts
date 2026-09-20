import { createClient } from './server'

export type Product = {
  id: string
  name: string
  slug: string
  main_image: string | null
  category: string
  subcategory: string | null
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
  description?: string
  price?: number
}

export type Category = {
  id: string
  name: string
  slug: string
  parent_id: string | null
}

// 获取分类 + 所有子分类 ID
async function getCategoryAndChildIds(rootSlug: string): Promise<string[]> {
  const supabase = await createClient()

  const { data: rootCat } = await supabase
    .from('product_categories')
    .select('id, slug')
    .eq('slug', rootSlug)
    .single()

  if (!rootCat) return []

  const { data: allCats } = await supabase
    .from('product_categories')
    .select('id, parent_id')

  if (!allCats) return [rootCat.id]

  const childIds: string[] = []
  const stack = allCats.filter(c => c.parent_id === rootCat.id)

  while (stack.length > 0) {
    const curr = stack.pop()!
    childIds.push(curr.id)
    stack.push(...allCats.filter(c => c.parent_id === curr.id))
  }

  return [rootCat.id, ...childIds]
}

// 按分类 slug 获取产品（自动识别一级/二级）
export async function getProductsByCategory(categorySlug: string) {
  const supabase = await createClient()

  const { data: cat } = await supabase
    .from('product_categories')
    .select('id, parent_id')
    .eq('slug', categorySlug)
    .single()

  if (!cat) return []

  // 一级分类：查 category IN (...)
  if (cat.parent_id === null) {
    const ids = await getCategoryAndChildIds(categorySlug)
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .in('category', ids)
      .order('sort_order', { ascending: true })

    if (error) {
      console.error('一级分类产品查询失败:', error)
      return []
    }
    return data || []
  }

  // 二级分类：查 subcategory = id
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .eq('subcategory', cat.id)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('二级分类产品查询失败:', error)
    return []
  }
  return data || []
}

// 获取所有产品
export async function getAllProducts() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('获取所有产品失败:', error)
    return []
  }
  return data || []
}

// 获取单个产品
export async function getProductBySlug(slug: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error) return null
  return data
}

// ✅ 已修改：分类 固定顺序，不再按字母排序
export async function getCategoryTree() {
  const supabase = await createClient()
  const { data: categories } = await supabase
    .from('product_categories')
    .select('id, name, slug, parent_id')
    // 已删除 .order('name') → 顺序永远固定

  if (!categories) return []

  const parents = categories.filter(c => c.parent_id === null)
  return parents.map(p => ({
    ...p,
    children: categories.filter(c => c.parent_id === p.id)
  }))
}

// ✅ 新增：获取分类信息
export async function getCategoryBySlug(slug: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('product_categories')
    .select('id, name, slug, parent_id')
    .eq('slug', slug)
    .single()
  return data
}

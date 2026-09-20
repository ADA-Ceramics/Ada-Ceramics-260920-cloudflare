export interface Product {
  id: string
  name: string
  slug: string
  category: string
  category_slug?: string
  description: string | null
  price: number | null
  main_image: string | null
  features: string[] | null
  specifications: Record<string, string> | null
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

// 保留旧类型别名以兼容
export type CeramicProduct = Product

// 产品分类信息
export interface ProductCategory {
  slug: string
  name: string
  description: string
}

// 分类信息（已删除重复项，只剩下 3 个正确项目）
export const CATEGORY_INFO: Record<string, { name: string; description: string }> = {
  'high-temp-white-porcelain': {
    name: 'High-Temperature White Porcelain',
    description: 'Premium white porcelain fired at high temperatures for exceptional durability and elegant appearance.',
  },
  'color-glaze': {
    name: 'Color Glaze Ceramic',
    description: 'Vibrant color glazed ceramics with rich, lasting colors and unique finishes.',
  },
  'kiln-change-ceramic': {
    name: 'Kiln Change Ceramic',
    description: 'Artistic kiln transformation ceramics with natural, unpredictable color patterns.',
  },
}

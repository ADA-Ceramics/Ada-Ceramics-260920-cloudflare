import { getProductsByCategory } from "@/lib/supabase/products"

/**
 * L2 富产品数据（在 SiloProduct 基础上补充用于"尺寸/釉色/定制/排序"筛选的字段）。
 * 仅新增文件，不改动 lib/silo/products.ts，避免影响 L1 逻辑。
 */
export type L2Product = {
  id: string
  name: string
  slug: string
  main_image: string | null
  /** 该产品所属的分类 slug（用于拼接 L3 单品页跳转链接） */
  categorySlug: string
  /** 以下字段用于客户端筛选（联动 Supabase 实际数据，缺失安全降级） */
  description: string
  specifications: string
  features: string
  price: number | null
  createdAt: string
  sortOrder: number
}

function toText(v: unknown): string {
  if (!v) return ""
  if (typeof v === "string") return v
  try {
    return JSON.stringify(v)
  } catch {
    return ""
  }
}

/**
 * 拉取某个 L2 细分品类的产品：
 * - 严格只查当前 L2 对应的 Supabase 分类 slug（跨品类零混入）。
 * - 依次尝试候选 slug（兼容历史命名），命中即停，按 id 去重。
 * - 返回富字段供前端筛选；任何查询失败安全返回空数组。
 */
export async function getL2Products(categorySlugs: string[]): Promise<L2Product[]> {
  const seen = new Set<string>()
  const merged: L2Product[] = []

  for (const slug of categorySlugs) {
    let rows: any[] = []
    try {
      rows = await getProductsByCategory(slug)
    } catch {
      rows = []
    }
    for (const p of rows) {
      if (!p?.id || seen.has(p.id)) continue
      seen.add(p.id)
      merged.push({
        id: p.id,
        name: p.name ?? "",
        slug: p.slug ?? "",
        main_image: p.main_image ?? null,
        categorySlug: slug,
        description: toText(p.description),
        specifications: toText(p.specifications),
        features: toText(p.features),
        price: typeof p.price === "number" ? p.price : null,
        createdAt: p.created_at ?? "",
        sortOrder: typeof p.sort_order === "number" ? p.sort_order : 0,
      })
    }
    // 命中某个候选 slug 即认为是当前细分品类数据，停止继续合并以保证严格隔离
    if (merged.length > 0) break
  }

  return merged
}

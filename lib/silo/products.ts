import { getProductsByCategory } from "@/lib/supabase/products"

export type SiloProduct = {
  id: string
  name: string
  slug: string
  main_image: string | null
  /** 该产品所属的分类 slug（用于拼接单品页跳转链接） */
  categorySlug: string
}

/**
 * 拉取某个 Silo 的热销产品：
 * - 依次尝试配置的候选分类 slug（未命中的 slug 安全返回空，不报错）
 * - 仅展示当前 Silo 对应品类产品，按 id 去重，禁止混入其它分类
 * - 限制数量，保证网格整洁
 */
export async function getSiloProducts(
  categorySlugs: string[],
  limit = 8,
): Promise<SiloProduct[]> {
  const seen = new Set<string>()
  const merged: SiloProduct[] = []

  for (const slug of categorySlugs) {
    if (merged.length >= limit) break
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
        name: p.name,
        slug: p.slug,
        main_image: p.main_image ?? null,
        categorySlug: slug,
      })
      if (merged.length >= limit) break
    }
  }

  return merged
}

import { getProductsByCategory } from "@/lib/supabase/products"

/**
 * L3 单品详情数据层（仅新增文件，不改动 L1/L2 既有逻辑）。
 *
 * 严格遵循 Silo 隔离：单品必须归属当前 L2 对应的 Supabase 分类，
 * 否则视为「不在本细分」返回 null（路由层 notFound），杜绝跨品类混入。
 * 相关产品同样仅取当前 L2 细分下的其他单品。
 */
export type L3Image = { url: string; alt: string }
export type L3RelatedProduct = {
  id: string
  name: string
  slug: string
  main_image: string | null
}
export type L3Detail = {
  id: string
  name: string
  slug: string
  description: string
  /** 主图 + 细节图合并后的图库（已过滤空值） */
  images: L3Image[]
  /** 归一化后的规格表（label/value）；为空时由 config 层兜底生成 */
  specifications: { label: string; value: string }[]
  /** 卖点/特性列表；为空时由 config 层兜底生成 */
  features: string[]
  price: number | null
  /** 命中的 Supabase 分类 slug（用于拼接同细分相关单品链接） */
  categorySlug: string
  /** 同 L2 细分下的其他单品（严格隔离，向下/同层内链） */
  related: L3RelatedProduct[]
}

/** 把 Supabase 中可能为对象 / JSON 字符串 / 数组的规格字段，归一化为 label/value 列表 */
function normalizeSpecifications(raw: unknown): { label: string; value: string }[] {
  if (!raw) return []
  let value: unknown = raw
  if (typeof raw === "string") {
    const trimmed = raw.trim()
    if (!trimmed) return []
    try {
      value = JSON.parse(trimmed)
    } catch {
      // 非 JSON 纯文本：作为单行规格展示
      return [{ label: "Details", value: trimmed }]
    }
  }
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (item && typeof item === "object" && !Array.isArray(item)) {
          const label = String((item as Record<string,unknown>).label ?? (item as Record<string,unknown>).name ?? (item as Record<string,unknown>).key ?? "").trim()
          const v = String((item as Record<string,unknown>).value ?? (item as Record<string,unknown>).val ?? "").trim()
          if (label && v) return { label, value: v }
          return null
        }
        const s = String(item ?? "").trim()
        return s ? { label: "Spec", value: s } : null
      })
      .filter(Boolean) as { label: string; value: string }[]
  }
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return Object.entries(value as Record<string,unknown>)
      .map(([k, v]) => ({ label: String(k).trim(), value: String(v ?? "").trim() }))
      .filter((x) => x.label && x.value)
  }
  return []
}

/** 把 features 字段（数组 / JSON 字符串 / 换行文本）归一化为字符串数组 */
function normalizeFeatures(raw: unknown): string[] {
  if (!raw) return []
  let value: unknown = raw
  if (typeof raw === "string") {
    const trimmed = raw.trim()
    if (!trimmed) return []
    try {
      value = JSON.parse(trimmed)
    } catch {
      return trimmed
        .split(/\r?\n|;|,(?=\s)/)
        .map((s) => s.trim())
        .filter(Boolean)
    }
  }
  if (Array.isArray(value)) {
    return value.map((s) => String(s ?? "").trim()).filter(Boolean)
  }
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return Object.values(value as Record<string,unknown>).map((s) => String(s ?? "").trim()).filter(Boolean)
  }
  return []
}

function buildImages(p: unknown): L3Image[] {
  const product = p as Record<string,unknown>
  const altBase = (name: string) =>
    `wholesale ceramic ${name} custom OEM tableware for Horeca bulk buyers`
  const gallery: string[] = Array.isArray(product?.gallery_images) ? product.gallery_images : []
  const galleryAlt: string[] = Array.isArray(product?.gallery_images_alt) ? product.gallery_images_alt : []
  const images: L3Image[] = [
    {
      url: (product?.main_image ?? "") as string,
      alt: (product?.main_image_alt || altBase((product?.name ?? "product") as string)) as string,
    },
    ...gallery.map((url, i) => ({
      url,
      alt: galleryAlt[i] || `${(product?.name ?? "product") as string} - detail ${i + 1}`,
    })),
  ].filter((img) => img.url)
  return images
}

/**
 * 拉取某 L2 细分下的单品详情 + 同细分相关单品（严格品类隔离）。
 * - 依次尝试候选分类 slug，命中含目标单品的分类即停。
 * - 单品不在任何候选分类内 → 返回 null（路由层 notFound）。
 */
export async function getL3Detail(
  categorySlugs: string[],
  productSlug: string,
): Promise<L3Detail | null> {
  for (const slug of categorySlugs) {
    let rows: unknown[] = []
    try {
      rows = await getProductsByCategory(slug)
    } catch (err) {
      rows = []
    }
    if (!rows || rows.length === 0) continue
    const match = rows.find((p) => (p as Record<string,unknown>)?.slug === productSlug)
    if (!match) continue
    const matchObj = match as Record<string,unknown>
    const related: L3RelatedProduct[] = rows
      .filter((p) => {
        const item = p as Record<string,unknown>
        return item?.slug && item.slug !== productSlug
      })
      .slice(0, 8)
      .map((p) => {
        const item = p as Record<string,unknown>
        return {
          id: (item.id ?? "") as string,
          name: (item.name ?? "") as string,
          slug: (item.slug ?? "") as string,
          main_image: (item.main_image ?? null) as string | null,
        }
      })
    return {
      id: (matchObj.id ?? "") as string,
      name: (matchObj.name ?? "") as string,
      slug: (matchObj.slug ?? "") as string,
      description: typeof matchObj.description === "string" ? matchObj.description : "",
      images: buildImages(match),
      specifications: normalizeSpecifications(matchObj.specifications),
      features: normalizeFeatures(matchObj.features),
      price: typeof matchObj.price === "number" ? matchObj.price : null,
      categorySlug: slug,
      related,
    }
  }
  return null
}

/** 预生成静态参数用：取某 L2 细分下全部单品 slug（严格隔离） */
export async function getL3SlugsForCategory(categorySlugs: string[]): Promise<string[]> {
  for (const slug of categorySlugs) {
    let rows: unknown[] = []
    try {
      rows = await getProductsByCategory(slug)
    } catch {
      rows = []
    }
    if (rows && rows.length > 0) {
      return rows.map((p) => (p as Record<string,unknown>)?.slug).filter(Boolean) as string[]
    }
  }
  return []
}

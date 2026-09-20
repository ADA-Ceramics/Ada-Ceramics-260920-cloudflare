"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Package, SlidersHorizontal, X } from "lucide-react"
import type { L2Product } from "@/lib/silo/l2-products"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SiloL2ProductBrowserProps {
  locale: string
  label: string
  products: L2Product[]
  /** L3 单品路由：父级 Silo slug */
  parentSlug: string
  /** L3 单品路由：当前 L2 slug */
  l2Slug: string
  /** 无产品时引导链接（不含 locale 前缀） */
  fallbackHref: string
}

type SortKey = "featured" | "newest" | "name-asc" | "price-asc" | "price-desc"

// 已知釉色/颜色词库（仅展示产品数据中真实出现的选项）
const COLOR_VOCAB = [
  "White", "Black", "Blue", "Green", "Grey", "Gray", "Beige", "Brown",
  "Pink", "Red", "Yellow", "Cream", "Ivory", "Matte", "Glossy", "Reactive",
  "Speckled", "Glaze",
]

const CUSTOM_KEYWORDS = ["custom", "oem", "odm", "logo", "personali", "bespoke", "private label"]

function haystack(p: L2Product): string {
  return `${p.name} ${p.description} ${p.specifications} ${p.features}`.toLowerCase()
}

/** 从产品名/规格中提取尺寸标记（oz/ml/cm/mm/inch），仅保留真实出现的值 */
function extractSizes(p: L2Product): string[] {
  const text = `${p.name} ${p.specifications}`
  const matches = text.match(/\d+(?:\.\d+)?\s?(?:oz|ml|cm|mm|inch|in|")/gi) || []
  return matches.map((m) => m.replace(/\s+/g, "").toLowerCase())
}

export function SiloL2ProductBrowser({
  locale,
  label,
  products,
  parentSlug,
  l2Slug,
  fallbackHref,
}: SiloL2ProductBrowserProps) {
  // ---- 从真实产品数据派生筛选项（联动 Supabase 内容）----
  const { sizeOptions, colorOptions, hasCustom } = useMemo(() => {
    const sizes = new Set<string>()
    const colors = new Set<string>()
    let custom = false
    for (const p of products) {
      extractSizes(p).forEach((s) => sizes.add(s))
      const hs = haystack(p)
      COLOR_VOCAB.forEach((c) => {
        if (hs.includes(c.toLowerCase())) colors.add(c)
      })
      if (CUSTOM_KEYWORDS.some((k) => hs.includes(k))) custom = true
    }
    return {
      sizeOptions: Array.from(sizes).sort(),
      colorOptions: Array.from(colors).sort(),
      hasCustom: custom,
    }
  }, [products])

  const hasPrice = useMemo(() => products.some((p) => p.price != null), [products])

  // ---- 筛选 + 排序状态 ----
  const [sort, setSort] = useState<SortKey>("featured")
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [customOnly, setCustomOnly] = useState(false)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const toggle = (
    value: string,
    list: string[],
    setter: (v: string[]) => void,
  ) => {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])
  }

  const filtered = useMemo(() => {
    let list = [...products]

    if (selectedSizes.length > 0) {
      list = list.filter((p) => {
        const sizes = extractSizes(p)
        return selectedSizes.some((s) => sizes.includes(s))
      })
    }
    if (selectedColors.length > 0) {
      list = list.filter((p) => {
        const hs = haystack(p)
        return selectedColors.some((c) => hs.includes(c.toLowerCase()))
      })
    }
    if (customOnly) {
      list = list.filter((p) => CUSTOM_KEYWORDS.some((k) => haystack(p).includes(k)))
    }

    switch (sort) {
      case "newest":
        list.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""))
        break
      case "name-asc":
        list.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "price-asc":
        list.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity))
        break
      case "price-desc":
        list.sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity))
        break
      default:
        list.sort((a, b) => a.sortOrder - b.sortOrder)
    }
    return list
  }, [products, selectedSizes, selectedColors, customOnly, sort])

  const activeFilterCount =
    selectedSizes.length + selectedColors.length + (customOnly ? 1 : 0)

  const clearAll = () => {
    setSelectedSizes([])
    setSelectedColors([])
    setCustomOnly(false)
  }

  // ---- 筛选侧栏（桌面常驻 / 移动可折叠）----
  const FilterPanel = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg text-[#1a1a2e]">Filter Products</h3>
        {activeFilterCount > 0 && (
          <button
            onClick={clearAll}
            className="text-xs font-medium text-[#8b7355] hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* 排序 */}
      <div>
        <Label className="text-sm font-medium text-[#1a1a2e] mb-2 block">Sort by</Label>
        <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Featured" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="newest">Newest Arrivals</SelectItem>
            <SelectItem value="name-asc">Name: A to Z</SelectItem>
            {hasPrice && <SelectItem value="price-asc">Price: Low to High</SelectItem>}
            {hasPrice && <SelectItem value="price-desc">Price: High to Low</SelectItem>}
          </SelectContent>
        </Select>
      </div>

      {/* 尺寸 */}
      {sizeOptions.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-[#1a1a2e] mb-3">Size / Capacity</h4>
          <div className="space-y-2.5">
            {sizeOptions.map((size) => (
              <label key={size} className="flex items-center gap-2.5 cursor-pointer">
                <Checkbox
                  checked={selectedSizes.includes(size)}
                  onCheckedChange={() =>
                    toggle(size, selectedSizes, setSelectedSizes)
                  }
                />
                <span className="text-sm text-muted-foreground uppercase">{size}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* 釉色 */}
      {colorOptions.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-[#1a1a2e] mb-3">Glaze / Color</h4>
          <div className="space-y-2.5">
            {colorOptions.map((color) => (
              <label key={color} className="flex items-center gap-2.5 cursor-pointer">
                <Checkbox
                  checked={selectedColors.includes(color)}
                  onCheckedChange={() =>
                    toggle(color, selectedColors, setSelectedColors)
                  }
                />
                <span className="text-sm text-muted-foreground">{color}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* 定制 */}
      {hasCustom && (
        <div>
          <h4 className="text-sm font-medium text-[#1a1a2e] mb-3">Customization</h4>
          <label className="flex items-center gap-2.5 cursor-pointer">
            <Checkbox
              checked={customOnly}
              onCheckedChange={(v) => setCustomOnly(Boolean(v))}
            />
            <span className="text-sm text-muted-foreground">OEM / Custom available</span>
          </label>
        </div>
      )}

      {sizeOptions.length === 0 && colorOptions.length === 0 && !hasCustom && (
        <p className="text-xs text-muted-foreground leading-relaxed">
          Use sorting to browse the range. Need a specific size, glaze or custom spec?
          Contact our team for the full catalog.
        </p>
      )}
    </div>
  )

  return (
    <section translate="no" className="notranslate py-16 lg:py-20 bg-[#f5f3ef]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1a2e] mb-2 text-balance">
            Browse {label}
          </h2>
          <p className="text-muted-foreground">
            Filter our wholesale {label.toLowerCase()} by size, glaze and customization.
          </p>
        </div>

        {/* 移动端筛选开关 */}
        <div className="lg:hidden mb-5">
          <button
            onClick={() => setMobileFiltersOpen((o) => !o)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-[#8b7355] text-[#8b7355] text-sm font-medium bg-white"
            aria-expanded={mobileFiltersOpen}
          >
            {mobileFiltersOpen ? (
              <X className="w-4 h-4" aria-hidden="true" />
            ) : (
              <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
            )}
            <span>{mobileFiltersOpen ? "Hide Filters" : "Show Filters"}</span>
            {activeFilterCount > 0 && (
              <span className="ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#8b7355] text-white text-[10px]">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* 左侧筛选栏：移动端折叠，桌面常驻 */}
          <aside className="w-full lg:w-64 shrink-0">
            <div
              className={`${mobileFiltersOpen ? "block" : "hidden"} lg:block bg-white rounded-xl border border-border p-5 lg:sticky lg:top-28`}
            >
              {FilterPanel}
            </div>
          </aside>

          {/* 右侧产品网格 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-muted-foreground">
                <span>{`${filtered.length} ${filtered.length === 1 ? "product" : "products"}`}</span>
              </p>
            </div>

            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
                {filtered.map((product) => (
                  <Link
                    key={product.id}
                    href={`/${locale}/${parentSlug}/${l2Slug}/${product.slug}`}
                    className="group flex flex-col rounded-xl border border-border bg-white overflow-hidden transition-all hover:shadow-lg"
                  >
                    <div className="aspect-square bg-[#f9fafb] overflow-hidden relative">
                      {product.main_image ? (
                        <img
                          src={product.main_image || "/placeholder.svg"}
                          alt={`Wholesale ceramic ${product.name} for Horeca bulk buyers`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-[#9ca3af]">
                          <Package className="w-14 h-14 opacity-30" aria-hidden="true" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col flex-1 p-4 sm:p-5">
                      <h3 className="text-sm sm:text-base font-medium text-[#1a1a2e] mb-3 leading-snug group-hover:text-[#8b7355] transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground">
                          MOQ: 500 pcs
                        </span>
                        <span className="text-xs font-semibold text-[#8b7355]">
                          View Details
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : products.length > 0 ? (
              // 有产品但被筛选清空：引导放宽条件
              <div className="rounded-xl border border-dashed border-[#8b7355]/40 bg-white p-10 text-center">
                <Package className="w-12 h-12 mx-auto text-[#8b7355]/40 mb-4" aria-hidden="true" />
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  No products match the selected filters. Try clearing some filters to see
                  the full {label.toLowerCase()} range.
                </p>
                <button
                  onClick={clearAll}
                  className="inline-flex items-center px-6 py-3 rounded-md bg-[#8b7355] text-white text-sm font-medium hover:bg-[#75603f] transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              // 无产品优雅降级
              <div className="rounded-xl border border-dashed border-[#8b7355]/40 bg-white p-10 text-center">
                <Package className="w-12 h-12 mx-auto text-[#8b7355]/40 mb-4" aria-hidden="true" />
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Our full {label.toLowerCase()} catalog is available on request. Contact us
                  for the latest product list, specifications and wholesale pricing.
                </p>
                <Link
                  href={`/${locale}${fallbackHref}`}
                  className="inline-flex items-center px-6 py-3 rounded-md bg-[#8b7355] text-white text-sm font-medium hover:bg-[#75603f] transition-colors"
                >
                  Request Catalog
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

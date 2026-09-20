import Link from "next/link"
import { Package } from "lucide-react"
import type { SiloProduct } from "@/lib/silo/products"
import { buildSiloProductPath } from "@/lib/silo/l2-config"

export type BestSellerGroup = {
  slug: string
  title: string
  products: SiloProduct[]
}

interface BestSellersGridProps {
  locale: string
  groups: BestSellerGroup[]
}

// 区块 5：均衡爆款产品网格 —— 4 大 Silo 各取爆款，避免单一品类失衡，卡片直达 L3 单品页
export default function BestSellersGrid({ locale, groups }: BestSellersGridProps) {
  // 交错合并：每个 Silo 均衡贡献，保证视觉上 4 条产品线平均分布
  const items = groups.flatMap((g) =>
    g.products.map((p) => ({ ...p, siloTitle: g.title })),
  )

  if (items.length === 0) return null

  return (
    <section className="py-16 lg:py-24 bg-[#f5f3ef]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-[#8b7355] text-xs font-semibold uppercase tracking-widest mb-3">
              Across All 4 Collections
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1a1a2e] text-balance">
              Best Selling Wholesale Ceramic Products
            </h2>
          </div>
          <Link
            href={`/${locale}/products`}
            className="inline-flex items-center self-start sm:self-auto px-5 py-2.5 rounded-md border border-[#8b7355] text-[#8b7355] text-sm font-medium hover:bg-[#8b7355] hover:text-white transition-colors"
          >
            View All Products
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {items.map((product) => (
            <Link
              key={product.id}
              href={`/${locale}${buildSiloProductPath(product.categorySlug, product.slug)}`}
              className="group flex flex-col rounded-xl border border-[#e7e2d8] bg-white overflow-hidden transition-all hover:shadow-lg"
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
                    <Package className="w-12 h-12 opacity-30" aria-hidden="true" />
                  </div>
                )}
                <span className="absolute top-2 left-2 text-[10px] font-medium text-white bg-[#8b7355] rounded px-2 py-0.5">
                  {product.siloTitle}
                </span>
              </div>
              <div className="flex flex-col flex-1 p-4">
                <h3 className="text-sm font-medium text-[#1a1a2e] mb-3 leading-snug group-hover:text-[#8b7355] transition-colors line-clamp-2">
                  {product.name}
                </h3>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-xs font-medium text-[#9ca3af]">MOQ: 500 pcs</span>
                  <span className="text-xs font-semibold text-[#8b7355]">View Details</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

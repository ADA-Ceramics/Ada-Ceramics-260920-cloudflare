import Link from "next/link"
import { ArrowRight, Package } from "lucide-react"
import type { L3RelatedProduct } from "@/lib/silo/l3-products"

interface SiloL3RelatedProps {
  locale: string
  parentSlug: string
  l2Slug: string
  l2Label: string
  related: L3RelatedProduct[]
}

/**
 * 区块 5：同 L2 细分相关单品网格（向下/同层内链，权重分发）。
 * 仅展示当前 L2 细分下的其他单品（严格隔离，无跨 Silo 混入）；
 * 每张卡片跳转对应 L3 单品页。网格桌面 4 列 / 平板 2 列 / 手机 1 列。
 * 末尾「View All [L2]」按钮回流 L2 集合页权重。
 */
export function SiloL3Related({
  locale,
  parentSlug,
  l2Slug,
  l2Label,
  related,
}: SiloL3RelatedProps) {
  if (related.length === 0) return null

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1a2e] mb-3 text-balance">
            More Wholesale {l2Label} Products
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Explore other {l2Label.toLowerCase()} from the same collection — all
            factory-direct, FDA/LFGB certified and available for OEM customization.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {related.map((p) => (
            <Link
              key={p.id}
              href={`/${locale}/${parentSlug}/${l2Slug}/${p.slug}`}
              className="group flex flex-col rounded-xl border border-border bg-white overflow-hidden transition-all hover:shadow-lg hover:border-[#8b7355]/40"
            >
              <div className="aspect-square bg-[#f9fafb] overflow-hidden relative">
                {p.main_image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.main_image || "/placeholder.svg"}
                    alt={`wholesale ceramic ${p.name} custom OEM tableware for Horeca bulk buyers`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-[#9ca3af]">
                    <Package className="w-12 h-12 opacity-30" aria-hidden="true" />
                  </div>
                )}
              </div>
              <div className="flex flex-col flex-1 p-4 sm:p-5">
                <h3 className="text-sm sm:text-base font-medium text-[#1a1a2e] mb-3 leading-snug line-clamp-2 group-hover:text-[#8b7355] transition-colors">
                  {p.name}
                </h3>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">
                    MOQ: 500 pcs
                  </span>
                  <span className="text-xs font-semibold text-[#8b7355]">View Details</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href={`/${locale}/${parentSlug}/${l2Slug}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-[#8b7355] text-[#8b7355] text-sm font-medium hover:bg-[#8b7355] hover:text-white transition-colors"
          >
            View All {l2Label}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}

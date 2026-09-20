import Link from "next/link"
import { Package } from "lucide-react"
import type { SiloProduct } from "@/lib/silo/products"
import { buildSiloProductPath } from "@/lib/silo/l2-config"

interface SiloProductGridProps {
  locale: string
  label: string
  products: SiloProduct[]
  /** 无产品时引导用户前往的细分/询盘链接（不含 locale 前缀） */
  fallbackHref: string
}

/**
 * 热销产品网格区块：仅展示当前 Silo 对应品类产品（禁止混入其它分类）。
 * 产品卡片含产品图、长尾标题、MOQ 起订量、单品页跳转链接，响应式自适应列数。
 */
export function SiloProductGrid({
  locale,
  label,
  products,
  fallbackHref,
}: SiloProductGridProps) {
  return (
    <section className="py-16 lg:py-20 bg-[#f5f3ef]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1a2e] mb-2 text-balance">
              Best-Selling {label}
            </h2>
            <p className="text-muted-foreground">
              Popular {label.toLowerCase()} chosen by wholesale and Horeca buyers.
            </p>
          </div>
          <Link
            href={`/${locale}/products`}
            className="inline-flex items-center self-start sm:self-auto px-5 py-2.5 rounded-md border border-[#8b7355] text-[#8b7355] text-sm font-medium hover:bg-[#8b7355] hover:text-white transition-colors"
          >
            View All Products
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/${locale}${buildSiloProductPath(product.categorySlug, product.slug)}`}
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
        ) : (
          <div className="rounded-xl border border-dashed border-[#8b7355]/40 bg-white p-10 text-center">
            <Package className="w-12 h-12 mx-auto text-[#8b7355]/40 mb-4" aria-hidden="true" />
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Our full {label.toLowerCase()} catalog is available on request. Browse the
              sub-categories above or contact us for the latest product list and pricing.
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
    </section>
  )
}

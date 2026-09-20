import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { buildAlt, type SiloSubcategory } from "@/lib/silo/config"

interface SiloSubcategoryCardsProps {
  locale: string
  heading: string
  subcategories: SiloSubcategory[]
}

/**
 * 子分类快捷卡片组（向下内链）：每张卡片配图 + H2 标题 + 简介 + 细分页直达锚链接
 * 卡片数量随各页面子分类数量自适应（3/4/5 个）。
 */
export function SiloSubcategoryCards({
  locale,
  heading,
  subcategories,
}: SiloSubcategoryCardsProps) {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1a2e] mb-3 text-balance">
          {heading}
        </h2>
        <p className="text-muted-foreground mb-10 max-w-2xl">
          Browse our specialized sub-categories and jump straight to the products you need.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {subcategories.map((sub) => (
            <Link
              key={sub.name}
              href={`/${locale}${sub.href}`}
              className="group flex flex-col rounded-xl border border-border overflow-hidden bg-white transition-all hover:shadow-lg hover:border-[#8b7355]/40"
            >
              <div className="aspect-[4/3] bg-[#f5f3ef] overflow-hidden">
                <img
                  src={sub.image || "/placeholder.svg"}
                  alt={buildAlt(sub.altKeyword)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col flex-1 p-5">
                <h3 className="font-serif text-lg text-[#1a1a2e] mb-2 group-hover:text-[#8b7355] transition-colors">
                  {sub.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {sub.blurb}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#8b7355]">
                  View Collection
                  <ArrowRight
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

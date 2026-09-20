import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { buildAlt } from "@/lib/silo/config"
import type { L2Config } from "@/lib/silo/l2-config"

interface SiloL2SiblingLinksProps {
  locale: string
  parentLabel: string
  siblings: L2Config[]
}

/**
 * 同 Silo 其他 L2 子分类横向跳转卡片（同级横向内链）。
 * 视觉沿用 SiloSubcategoryCards 风格，打通同 Silo 内部权重流转。
 */
export function SiloL2SiblingLinks({
  locale,
  parentLabel,
  siblings,
}: SiloL2SiblingLinksProps) {
  if (siblings.length === 0) return null

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1a2e] mb-3 text-balance">
          More {parentLabel} Categories
        </h2>
        <p className="text-muted-foreground mb-10 max-w-2xl">
          Explore other sub-categories in our {parentLabel.toLowerCase()} range.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {siblings.map((sib) => (
            <Link
              key={sib.slug}
              href={`/${locale}/${sib.parentSlug}/${sib.slug}`}
              className="group flex flex-col rounded-xl border border-border overflow-hidden bg-white transition-all hover:shadow-lg hover:border-[#8b7355]/40"
            >
              <div className="aspect-[4/3] bg-[#f5f3ef] overflow-hidden">
                <img
                  src={sib.bannerImage || "/placeholder.svg"}
                  alt={buildAlt(sib.keyword)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col flex-1 p-5">
                <h3 className="font-serif text-lg text-[#1a1a2e] mb-2 group-hover:text-[#8b7355] transition-colors">
                  {sib.label}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {sib.intro}
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

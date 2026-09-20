import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { CROSS_SILO_CARDS, buildAlt } from "@/lib/silo/config"

interface SiloCrossLinksProps {
  locale: string
  /** 当前页面 slug，用于高亮标识当前 Silo */
  currentSlug: string
}

/**
 * 底部跨 Silo 全站导流区（横向内链）：横向 4 张分类卡片，覆盖全部 4 个一级 Silo 页面，
 * 打通全站权重流转，实现全站互通。
 */
export function SiloCrossLinks({ locale, currentSlug }: SiloCrossLinksProps) {
  return (
    <section className="py-16 lg:py-20 bg-[#1a1a2e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl sm:text-3xl mb-3 text-balance">
          Explore Our Full Ceramic Range
        </h2>
        <p className="text-white/70 mb-10 max-w-2xl">
          Discover every product line across our four wholesale ceramic categories.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CROSS_SILO_CARDS.map((card) => {
            const isCurrent = card.slug === currentSlug
            return (
              <Link
                key={card.slug}
                href={`/${locale}/${card.slug}`}
                aria-current={isCurrent ? "page" : undefined}
                className={`group flex flex-col rounded-xl overflow-hidden bg-white/5 border transition-all hover:bg-white/10 ${
                  isCurrent
                    ? "border-[#8b7355]"
                    : "border-white/10 hover:border-white/30"
                }`}
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={card.image || "/placeholder.svg"}
                    alt={buildAlt(card.keyword)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col flex-1 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-serif text-lg">{card.title}</h3>
                    {isCurrent && (
                      <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-[#8b7355] text-white">
                        You are here
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed flex-1">{card.blurb}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#c9a87c]">
                    View Category
                    <ArrowRight
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

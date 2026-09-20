import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { CROSS_SILO_CARDS, buildAlt } from "@/lib/silo/config"

interface SiloHubCardsProps {
  locale: string
}

// 区块 3：4 大 Silo 一级分类卡片枢纽区 —— 首页最高权重平分给 4 个平行一级 Silo
const HUB_DESCRIPTIONS: Record<string, string> = {
  dinnerware: "Wholesale ceramic plates, bowls & dinner sets for restaurant & hotel service.",
  bakeware: "Oven-safe ramekins, casseroles & pizza baking dishes bulk supply.",
  "table-decor-drinkware": "Custom mugs, table vases & decorative ceramic table accessories.",
  "oem-custom-ceramics": "Custom logo, glaze color & new mold OEM/ODM manufacturing service.",
}

export default function SiloHubCards({ locale }: SiloHubCardsProps) {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#8b7355] text-xs font-semibold uppercase tracking-widest mb-3">
            Our Collections
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-[#1a1a2e] text-balance">
            Product Categories
          </h2>
         <p className="text-sm text-gray-600 mt-2 mb-8">
  Explore our wide range of high-quality products designed for both everyday use and special occasions.
</p> 
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CROSS_SILO_CARDS.map((card) => (
            <Link
              key={card.slug}
              href={`/${locale}/${card.slug}`}
              className="group flex flex-col rounded-2xl border border-[#ece7dd] bg-[#faf8f4] overflow-hidden transition-all hover:shadow-lg hover:border-[#d8c4a8]"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={card.image}
                  alt={buildAlt(card.keyword)}
                  width={480}
                  height={360}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col flex-1 p-5">
                <h3 className="font-serif text-xl text-[#1a1a2e] mb-2">{card.title}</h3>
                <p className="text-sm text-[#6b6862] leading-relaxed flex-1">
                  {HUB_DESCRIPTIONS[card.slug] ?? card.blurb}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#8b7355]">
                  Explore Subcategories
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

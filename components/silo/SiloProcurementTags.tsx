import Link from "next/link"
import type { SiloConfig } from "@/lib/silo/config"

interface SiloProcurementTagsProps {
  locale: string
  procurement: SiloConfig["procurement"]
}

/**
 * 采购场景筛选标签栏：H3 标题，文字标签做锚文本内链细分采购需求。
 */
export function SiloProcurementTags({ locale, procurement }: SiloProcurementTagsProps) {
  return (
    <section className="py-12 bg-[#f5f3ef]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="font-serif text-xl text-[#1a1a2e] mb-6">{procurement.heading}</h3>
        <ul className="flex flex-wrap gap-3">
          {procurement.tags.map((tag) => (
            <li key={tag.label}>
              <Link
                href={`/${locale}${tag.href}`}
                className="inline-flex items-center px-4 py-2 rounded-full border border-[#8b7355]/40 bg-white text-sm text-[#1a1a2e] hover:bg-[#8b7355] hover:text-white hover:border-[#8b7355] transition-colors"
              >
                {tag.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

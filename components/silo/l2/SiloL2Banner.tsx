import Link from "next/link"
import { ArrowLeft, MessageCircle } from "lucide-react"
import { buildAlt } from "@/lib/silo/config"
import { SiloL2Breadcrumb } from "./SiloL2Breadcrumb"

interface SiloL2BannerProps {
  locale: string
  parentSlug: string
  parentLabel: string
  slug: string
  label: string
  h1: string
  intro: string
  bannerImage: string
  keyword: string
}

/**
 * L2 轻量化 Banner：细分合集图 + 唯一 H1 + 细分简介 + 双 CTA
 * （Request Custom Quote → /contact 询盘页；返回 L1 烘焙首页 → /{parentSlug}）。
 * 顶部内置三级面包屑（含 Schema）。pt-32 避让全局固定 Header。
 * 较 L1 Banner 更轻量：去掉四大卖点行，聚焦细分转化。
 */
export function SiloL2Banner({
  locale,
  parentSlug,
  parentLabel,
  slug,
  label,
  h1,
  intro,
  bannerImage,
  keyword,
}: SiloL2BannerProps) {
  return (
    <section className="relative pt-32 pb-10 bg-[#f5f3ef] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={bannerImage || "/placeholder.svg"}
          alt={buildAlt(keyword)}
          className="w-full h-full object-cover opacity-20"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f5f3ef] via-[#f5f3ef]/90 to-[#f5f3ef]/60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SiloL2Breadcrumb
          locale={locale}
          parentSlug={parentSlug}
          parentLabel={parentLabel}
          slug={slug}
          label={label}
        />

        <div className="mt-6 max-w-3xl">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight text-[#1a1a2e] text-balance">
            {h1}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed text-pretty">
            {intro}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#8b7355] text-white text-sm font-medium hover:bg-[#75603f] transition-colors"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>Request Custom Quote</span>
            </Link>
            <Link
              href={`/${locale}/${parentSlug}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-[#8b7355] text-[#8b7355] text-sm font-medium hover:bg-[#8b7355] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Back to {parentLabel}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

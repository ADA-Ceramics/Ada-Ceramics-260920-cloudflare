import { Layers, ShieldCheck, Settings, Zap } from "lucide-react"
import { buildAlt } from "@/lib/silo/config"
import { SiloBreadcrumb } from "./SiloBreadcrumb"

interface SiloBannerProps {
  locale: string
  slug: string
  label: string
  h1: string
  intro: string
  bannerImage: string
  keyword: string
}

const sellingPoints = [
  { icon: Layers, title: "Low MOQ" },
  { icon: ShieldCheck, title: "FDA/LFGB Certified" },
  { icon: Settings, title: "Custom OEM/ODM" },
  { icon: Zap, title: "Fast Delivery" },
]

/**
 * 分类首屏 Banner：全屏宽陶瓷产品图 + 页面唯一 H1 + 约 100 词 B 端批发简介
 * 顶部内置面包屑（含 Schema）。pt-32 用于避让全局固定 Header。
 */
export function SiloBanner({
  locale,
  slug,
  label,
  h1,
  intro,
  bannerImage,
  keyword,
}: SiloBannerProps) {
  return (
    <section className="relative pt-32 pb-12 bg-[#f5f3ef] overflow-hidden">
      {/* 全屏宽背景产品图 */}
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
        <SiloBreadcrumb locale={locale} slug={slug} label={label} />

        <div className="mt-8 max-w-3xl">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight text-[#1a1a2e] text-balance">
            {h1}
          </h1>
          <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed text-pretty">
            {intro}
          </p>
        </div>

        <ul className="mt-10 flex flex-wrap gap-x-10 gap-y-6">
          {sellingPoints.map((p) => {
            const Icon = p.icon
            return (
              <li key={p.title} className="flex items-center gap-3">
                <span className="w-12 h-12 rounded-full border-2 border-[#8b7355] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#8b7355]" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium text-[#1a1a2e]">{p.title}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

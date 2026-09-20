import Link from "next/link"
import { ArrowRight, ArrowLeft, MessageCircle, CheckCircle2, Quote } from "lucide-react"
import { notFound } from "next/navigation"
import { SiloFaq } from "@/components/silo/SiloFaq"
import { SiloCrossLinks } from "@/components/silo/SiloCrossLinks"
import { SiloL2Breadcrumb } from "@/components/silo/l2/SiloL2Breadcrumb"
import { OemWhatsAppFloat } from "./OemWhatsAppFloat"
import { OemCaseStudiesGrid } from "./OemCaseStudiesGrid"
import { getL2Config } from "@/lib/silo/l2-config"
import {
  OEM_PARENT_SLUG,
  OEM_PARENT_LABEL,
  OEM_CASE_STUDIES_SLUG,
  OEM_WORKFLOW,
  OEM_APPLICABLE_COLLECTIONS,
  getAllOemServicePages,
} from "@/lib/silo/oem-service-config"
import { CASE_BRAND_WALL, CASE_REVIEWS } from "@/lib/silo/oem-case-studies-config"

/**
 * OEM & ODM Project Case Studies L3 专属页面（区别于通用 OemServicePage 模板）。
 * 固定 10 区块顺序：面包屑 → Hero(唯一H1+双CTA) → 筛选+案例网格 → 品牌LOGO墙 →
 * 合作流程(节点内链3个L3服务) → 分产品线案例(内链4大产品Silo) → 海外评价 →
 * FAQ(FAQPageSchema) → 同Silo互通卡片 → 全站跨Silo导流。
 */
export function OemCaseStudiesPage({ locale }: { locale: string }) {
  const data = getL2Config(OEM_PARENT_SLUG, OEM_CASE_STUDIES_SLUG)
  if (!data) notFound()

  const services = getAllOemServicePages().filter((s) => s.slug !== OEM_CASE_STUDIES_SLUG)
  const l1Href = `/${locale}/${OEM_PARENT_SLUG}`
  const quoteHref = `/${locale}/contact`

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* 区块1+2：面包屑（含 Schema）+ Hero 首屏（唯一 H1 + 双 CTA） */}
      <section className="relative pt-32 pb-12 bg-[#f5f3ef] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={data.bannerImage || "/placeholder.svg"}
            alt="OEM custom ceramic tableware project cases for global Horeca brand bulk wholesale"
            className="w-full h-full object-cover opacity-20"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f5f3ef] via-[#f5f3ef]/90 to-[#f5f3ef]/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SiloL2Breadcrumb
            locale={locale}
            parentSlug={OEM_PARENT_SLUG}
            parentLabel={OEM_PARENT_LABEL}
            slug={OEM_CASE_STUDIES_SLUG}
            label={data.label}
          />

          <div className="mt-6 max-w-3xl">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight text-[#1a1a2e] text-balance">
              OEM &amp; ODM Custom Ceramic Tableware Project Case Studies For Global Horeca &amp; Brand Partners
            </h1>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed text-pretty">
              Real <strong className="font-medium text-[#1a1a2e]">bulk custom ceramic</strong> programs delivered
              for hotels, restaurants, café chains and gift brands worldwide. Explore proven{" "}
              <strong className="font-medium text-[#1a1a2e]">brand OEM cooperation</strong> projects spanning{" "}
              <strong className="font-medium text-[#1a1a2e]">hotel restaurant tableware customization</strong>, from
              concept and tooling to glaze, branding and shelf-ready packaging.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={quoteHref}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#8b7355] text-white text-sm font-medium hover:bg-[#75603f] transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Request Custom Quote</span>
              </Link>
              <Link
                href={l1Href}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-[#8b7355] text-[#8b7355] text-sm font-medium hover:bg-[#8b7355] hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                <span>Back To All OEM Services</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 区块3：筛选 + 案例网格（客户端交互） */}
      <OemCaseStudiesGrid locale={locale} />

      {/* 区块4：合作品牌 LOGO 墙（E-E-A-T 信任背书） */}
      <section className="py-16 lg:py-20 bg-[#f5f3ef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1a2e] mb-3 text-balance">
            Trusted By Global Horeca &amp; Retail Brands
          </h2>
          <p className="text-muted-foreground mb-10 max-w-2xl">
            Long-term partner to overseas hotel chains, restaurant and café groups, retailers and gifting brands
            sourcing private-label ceramics.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CASE_BRAND_WALL.map((b) => (
              <div
                key={b.name}
                className="flex flex-col items-center justify-center text-center rounded-xl border border-black/10 bg-white px-4 py-6"
              >
                <span className="font-serif text-base text-[#1a1a2e] leading-tight">{b.name}</span>
                <span className="mt-1.5 text-xs text-muted-foreground">{b.sector}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 区块5：完整 OEM 合作流程，节点锚文本交叉内链 3 个 OEM L3 服务页 */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1a2e] mb-3 text-balance">
            Our End-to-End OEM &amp; ODM Cooperation Process
          </h2>
          <p className="text-muted-foreground mb-10 max-w-2xl">
            Inquiry → Custom Design → Sample Making → Mold Development → Mass Production → Global Shipping.
          </p>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {OEM_WORKFLOW.map((step, i) => (
              <li
                key={step.title}
                className="relative flex flex-col rounded-xl border border-black/10 bg-[#f5f3ef] p-6"
              >
                <span className="absolute top-5 right-5 font-serif text-3xl text-[#8b7355]/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-lg text-[#1a1a2e] pr-10">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{step.description}</p>
                {step.linkSlug && (
                  <Link
                    href={`/${locale}/${OEM_PARENT_SLUG}/${step.linkSlug}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#8b7355] hover:text-[#75603f]"
                  >
                    {services.find((s) => s.slug === step.linkSlug)?.label ?? "Learn more"}
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 区块6：分产品线案例分区（内链 4 大产品 Silo） */}
      <section className="py-16 lg:py-20 bg-[#f5f3ef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1a2e] mb-3 text-balance">
            Project Cases By Product Line
          </h2>
          <p className="text-muted-foreground mb-10 max-w-2xl">
            Our OEM programs span every ceramic category. Explore the matching product Silo to start customizing.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {OEM_APPLICABLE_COLLECTIONS.map((c) => (
              <Link
                key={c.slug}
                href={`/${locale}/${c.slug}`}
                className="group flex flex-col rounded-xl overflow-hidden border border-black/10 bg-white hover:border-[#8b7355] transition-colors"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={c.image || "/placeholder.svg"}
                    alt={`OEM custom ceramic ${c.title.toLowerCase()} project case for global Horeca brand bulk wholesale`}
                    width={1600}
                    height={1000}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col flex-1 p-5">
                  <h3 className="font-serif text-lg text-[#1a1a2e]">{c.title} OEM Cases</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{c.blurb}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#8b7355]">
                    Explore {c.title} Silo
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 区块7：海外客户真实评价（承接 reliable ceramic manufacturer 长尾） */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1a2e] mb-10 text-balance">
            What Global Buyers Say About Working With Us
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {CASE_REVIEWS.map((r) => (
              <figure key={r.author} className="flex flex-col rounded-xl border border-black/10 bg-[#f5f3ef] overflow-hidden">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={r.image || "/placeholder.svg"}
                    alt={r.alt}
                    width={1600}
                    height={1000}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <blockquote className="flex flex-col flex-1 p-6">
                  <Quote className="w-7 h-7 text-[#8b7355]/40 mb-3" aria-hidden="true" />
                  <p className="text-sm text-[#1a1a2e] leading-relaxed flex-1">{r.quote}</p>
                  <figcaption className="mt-4">
                    <span className="block font-medium text-[#1a1a2e] text-sm">{r.author}</span>
                    <span className="block text-xs text-muted-foreground">{r.role}</span>
                  </figcaption>
                </blockquote>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 区块8：项目合作专属 FAQ（FAQPage Schema 已在顶部注入） */}
      <SiloFaq faqs={data.faqs} />

      {/* 底部核心转化引导 */}
      <section className="py-16 lg:py-20 bg-[#1a1a2e] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl text-balance">Ready To Start Your OEM Ceramic Project?</h2>
          <p className="mt-4 text-white/70 leading-relaxed text-pretty">
            Share your concept, specs and artwork. From custom logo printing and glaze to new molds and packaging,
            we scale private-label programs from pilot runs to full container production.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-white/80">
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#c9a87c]" aria-hidden="true" /> Low MOQ</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#c9a87c]" aria-hidden="true" /> Free Sampling</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#c9a87c]" aria-hidden="true" /> FDA / LFGB Certified</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#c9a87c]" aria-hidden="true" /> Global Delivery</span>
          </div>
          <Link
            href={quoteHref}
            className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-md bg-[#8b7355] text-white text-base font-medium hover:bg-[#75603f] transition-colors"
          >
            <MessageCircle className="w-5 h-5" aria-hidden="true" />
            Request Custom Quote
          </Link>
        </div>
      </section>

      {/* 区块9：同 OEM Silo 其余服务互通卡片 */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1a2e] text-balance">
              All Custom Ceramic OEM Solutions
            </h2>
            <Link href={l1Href} className="inline-flex items-center gap-1.5 text-sm font-medium text-[#8b7355] hover:text-[#75603f]">
              Back to {OEM_PARENT_LABEL}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/${locale}/${OEM_PARENT_SLUG}/${s.slug}`}
                className="group flex flex-col rounded-xl overflow-hidden border border-black/10 bg-white hover:border-[#8b7355] transition-colors"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={s.bannerImage || "/placeholder.svg"}
                    alt={`${s.keyword} OEM and ODM service for Horeca bulk wholesale brands`}
                    width={1600}
                    height={1000}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col flex-1 p-5">
                  <h3 className="font-serif text-base text-[#1a1a2e]">{s.label}</h3>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#8b7355]">
                    View Service
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* 末尾标准 Silo 隔离引导句 */}
          <p className="mt-10 text-sm text-muted-foreground leading-relaxed max-w-3xl">
            {data.seo.siloGuide}
          </p>
        </div>
      </section>

      {/* 区块10：全站统一四大 Silo 导流卡片 */}
      <SiloCrossLinks locale={locale} currentSlug={OEM_PARENT_SLUG} />

      <OemWhatsAppFloat serviceName="OEM & ODM Projects" />
    </>
  )
}

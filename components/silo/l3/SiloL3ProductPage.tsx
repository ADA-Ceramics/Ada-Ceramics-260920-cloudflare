import { notFound } from "next/navigation"
import Link from "next/link"
import {
  Layers,
  ShieldCheck,
  Flame,
  Settings,
  Check,
  MessageCircle,
  ArrowRight,
  Building2,
} from "lucide-react"
import { Footer } from "@/components/layout/footer"
import { getL2Config, getL2ConfigsByParent } from "@/lib/silo/l2-config"
import { getL3Detail } from "@/lib/silo/l3-products"
import {
  buildSpecifications,
  buildFeatures,
  buildH1,
  buildSeo,
  buildFaqs,
  buildScenarios,
  getOemServices,
  getQuoteHref,
  L3_SELLING_POINTS,
} from "@/lib/silo/l3-config"
// 复用现有 silo 组件（零修改）
import { SiloSeoContent } from "@/components/silo/SiloSeoContent"
import { SiloFaq } from "@/components/silo/SiloFaq"
import { SiloCrossLinks } from "@/components/silo/SiloCrossLinks"
import { SiloL2SiblingLinks } from "@/components/silo/l2/SiloL2SiblingLinks"
// L3 专属组件
import { SiloL3Breadcrumb } from "./SiloL3Breadcrumb"
import { SiloL3Gallery } from "./SiloL3Gallery"
import { SiloL3Related } from "./SiloL3Related"

const SELLING_POINT_ICONS = [Layers, ShieldCheck, Flame, Settings]

interface SiloL3ProductPageProps {
  parentSlug: string
  l2Slug: string
  productSlug: string
  locale: string
}

/**
 * 通用 L3 单品详情页模板（数据驱动，全站 4 大 Silo 一键复用）。
 * 固定 9 区块自上而下：
 *  1) 四级面包屑  2) 双栏主视觉(图库+转化)  3) 规格&定制服务
 *  4) 商用场景图文  5) 同 L2 相关单品  6) 350 词 SEO
 *  7) 单品 FAQ+Schema  8) 同 Silo 其他 L2 横向卡片  9) 跨 4 大 Silo 导流
 * 全局 Header 由 layout 提供，本模板仅追加 Footer。
 */
export async function SiloL3ProductPage({
  parentSlug,
  l2Slug,
  productSlug,
  locale,
}: SiloL3ProductPageProps) {
  const l2 = getL2Config(parentSlug, l2Slug)
  if (!l2) notFound()

  // 严格仅在当前 L2 细分品类内查找该单品（跨品类隔离）
  const detail = await getL3Detail(l2.productCategorySlugs, productSlug)
  if (!detail) notFound()

  const specifications = buildSpecifications(detail, l2)
  const features = buildFeatures(detail, l2)
  const h1 = buildH1(detail, l2)
  const seo = buildSeo(detail, l2)
  const faqs = buildFaqs(detail, l2)
  const scenarios = buildScenarios(locale, l2)
  const oemServices = getOemServices(locale)
  const quoteHref = getQuoteHref(locale)

  const siblings = getL2ConfigsByParent(parentSlug).filter((c) => c.slug !== l2.slug)

  const description =
    detail.description?.trim() ||
    `Factory-direct wholesale ${detail.name || l2.keyword} manufactured in Chaozhou, China. ` +
      `Food-safe, FDA & LFGB certified ceramic built for hotels, restaurants, cafés and bakeries, ` +
      `with full OEM/ODM customization and low MOQs for growing brands.`

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: detail.name,
    description,
    image: detail.images.map((i) => i.url).filter(Boolean),
    sku: detail.id,
    brand: { "@type": "Brand", name: "ADA Ceramics" },
    manufacturer: {
      "@type": "Organization",
      name: "ADA Ceramics",
      url: "https://www.adaceramics.com",
    },
    category: l2.label,
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }

  return (
    <div translate="no" className="notranslate min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 区块 1：四级面包屑 + 卖点条 */}
      <section className="pt-32 pb-6 bg-[#f5f3ef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SiloL3Breadcrumb
            locale={locale}
            parentSlug={parentSlug}
            parentLabel={l2.parentLabel}
            l2Slug={l2.slug}
            l2Label={l2.label}
            productSlug={productSlug}
            productName={detail.name || l2.label}
          />
        </div>
      </section>

      {/* 区块 2：双栏主视觉（左图库 + 右转化） */}
      <section className="py-8 lg:py-10 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <SiloL3Gallery images={detail.images} productName={detail.name || l2.label} />

            <div className="space-y-6">
              <div>
                <p className="text-sm text-[#8b7355] font-medium mb-2">{l2.label}</p>
                <h1 className="font-serif text-2xl sm:text-3xl lg:text-[2.1rem] leading-tight text-[#1a1a2e] text-balance">
                  {h1}
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">SKU: {detail.id}</p>
              </div>

              {/* 核心卖点标签 */}
              <div className="flex flex-wrap gap-2.5">
                {L3_SELLING_POINTS.map((point, i) => {
                  const Icon = SELLING_POINT_ICONS[i] ?? Check
                  return (
                    <span
                      key={point}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#8b7355]/40 bg-[#f5f3ef] px-3 py-1.5 text-xs font-medium text-[#1a1a2e]"
                    >
                      <Icon className="w-3.5 h-3.5 text-[#8b7355]" aria-hidden="true" />
                      {point}
                    </span>
                  )
                })}
              </div>

              <p className="text-muted-foreground leading-relaxed text-pretty">{description}</p>

              {/* 核心规格速览（前 4 项） */}
              <dl className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-lg bg-[#f9fafb] p-4 border border-border">
                {specifications.slice(0, 4).map((spec) => (
                  <div key={spec.label}>
                    <dt className="text-xs text-muted-foreground">{spec.label}</dt>
                    <dd className="text-sm font-medium text-[#1a1a2e]">{spec.value}</dd>
                  </div>
                ))}
              </dl>

              {/* 批量采购提示 */}
              <p className="rounded-md border-l-4 border-[#8b7355] bg-[#f5f3ef] px-4 py-3 text-sm text-[#1a1a2e]/80">
                Bulk buyer? Factory-direct pricing with flexible MOQs, sample service and
                full OEM/ODM support for {l2.label.toLowerCase()} programs.
              </p>

              {/* 双 CTA */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <Link
                  href={quoteHref}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-[#8b7355] text-white text-sm font-medium hover:bg-[#75603f] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Request Custom Quote</span>
                </Link>
                <Link
                  href={`/${locale}/${parentSlug}/${l2Slug}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md border border-[#8b7355] text-[#8b7355] text-sm font-medium hover:bg-[#8b7355] hover:text-white transition-colors"
                >
                  <span>View All {l2.label}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 区块 3：规格表 + 定制服务（承接 OEM 长尾词） */}
      <section className="py-16 lg:py-20 bg-[#f5f3ef]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1a2e] mb-8 text-balance">
            Custom OEM &amp; Product Specifications
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* 完整规格表 */}
            <div className="rounded-xl border border-border bg-white overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {specifications.map((spec, i) => (
                    <tr
                      key={spec.label}
                      className={i % 2 === 0 ? "bg-white" : "bg-[#f9fafb]"}
                    >
                      <th
                        scope="row"
                        className="text-left font-medium text-muted-foreground px-5 py-3 w-2/5 align-top"
                      >
                        {spec.label}
                      </th>
                      <td className="px-5 py-3 text-[#1a1a2e]">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 关键特性 + 定制服务内链 */}
            <div className="space-y-8">
              <div>
                <h3 className="font-serif text-lg text-[#1a1a2e] mb-3">Key Features</h3>
                <ul className="space-y-2.5">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check
                        className="w-5 h-5 text-[#8b7355] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span className="text-muted-foreground leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-serif text-lg text-[#1a1a2e] mb-3">
                  Custom OEM/ODM Services
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {oemServices.map((svc) => (
                    <Link
                      key={svc.title}
                      href={svc.href}
                      className="group flex flex-col rounded-lg border border-border bg-white p-4 transition-all hover:border-[#8b7355]/50 hover:shadow-sm"
                    >
                      <span className="flex items-center gap-1.5 text-sm font-medium text-[#1a1a2e] group-hover:text-[#8b7355] transition-colors">
                        {svc.title}
                        <ArrowRight
                          className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="mt-1 text-xs text-muted-foreground leading-relaxed">
                        {svc.description}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 区块 4：商用场景实拍图文（承接场景搜索词，内链 L1/L2） */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1a2e] mb-3 text-balance">
            Ideal For Hotel, Restaurant &amp; Bakery Bulk Supply
          </h2>
          <p className="text-muted-foreground mb-10 max-w-2xl">
            Built for high-volume commercial use across the global hospitality industry.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {scenarios.map((s, i) => {
              const Icon = [Building2, Layers, Flame][i] ?? Building2
              return (
                <Link
                  key={s.title}
                  href={s.href}
                  className="group flex flex-col rounded-xl border border-border bg-[#f5f3ef] p-6 transition-all hover:shadow-lg hover:border-[#8b7355]/40"
                >
                  <span className="w-11 h-11 rounded-full bg-white border border-[#8b7355]/30 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#8b7355]" aria-hidden="true" />
                  </span>
                  <h3 className="font-serif text-lg text-[#1a1a2e] mb-2 group-hover:text-[#8b7355] transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {s.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#8b7355]">
                    Learn more
                    <ArrowRight
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* 区块 5：同 L2 相关单品网格 */}
      <SiloL3Related
        locale={locale}
        parentSlug={parentSlug}
        l2Slug={l2.slug}
        l2Label={l2.label}
        related={detail.related}
      />

      {/* 区块 6：350 词 SEO 长文（复用组件，单品语义 H2 + Silo 隔离引导句） */}
      <SiloSeoContent seo={seo} />

      {/* 区块 7：单品专属 FAQ + FAQPage Schema */}
      <SiloFaq faqs={faqs} />

      {/* 区块 8：同 Silo 其他 L2 横向卡片 */}
      <SiloL2SiblingLinks
        locale={locale}
        parentLabel={l2.parentLabel}
        siblings={siblings}
      />

      {/* 区块 9：跨 4 大 Silo 导流卡片 */}
      <SiloCrossLinks locale={locale} currentSlug={parentSlug} />

      <Footer />
    </div>
  )
}

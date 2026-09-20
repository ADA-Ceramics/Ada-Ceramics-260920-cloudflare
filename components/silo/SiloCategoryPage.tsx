import { notFound } from "next/navigation"
import { Footer } from "@/components/layout/footer"
import { getSiloConfig, CROSS_SILO_CARDS } from "@/lib/silo/config"
import { getSiloProducts } from "@/lib/silo/products"
import { SiloBanner } from "./SiloBanner"
import { SiloSubcategoryCards } from "./SiloSubcategoryCards"
import { SiloProductGrid } from "./SiloProductGrid"
import { SiloSeoContent } from "./SiloSeoContent"
import { SiloProcurementTags } from "./SiloProcurementTags"
import { SiloFaq } from "./SiloFaq"
import { SiloCrossLinks } from "./SiloCrossLinks"

interface SiloCategoryPageProps {
  /** Silo 页面 slug */
  siloSlug: string
  locale: string
}

/**
 * 4 个一级分类集合页共用的统一模板。
 * - 全局 Header 由 layout 提供，本模板仅追加 Footer，避免重复 Header。
 * - 服务端拉取当前 Silo 产品，注入 FAQPage 结构化数据。
 */
export async function SiloCategoryPage({ siloSlug, locale }: SiloCategoryPageProps) {
  const config = getSiloConfig(siloSlug)
  if (!config) notFound()

  // 短标签（用于面包屑/标题）：取跨 Silo 卡片标题，回退到 H1
  const label =
    CROSS_SILO_CARDS.find((c) => c.slug === siloSlug)?.title ?? config.h1

  const products = await getSiloProducts(config.productCategorySlugs)
  const fallbackHref = config.subcategories[0]?.href ?? "/products"

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <SiloBanner
        locale={locale}
        slug={config.slug}
        label={label}
        h1={config.h1}
        intro={config.intro}
        bannerImage={config.bannerImage}
        keyword={config.keyword}
      />

      <SiloSubcategoryCards
        locale={locale}
        heading={`${label} Sub-Categories`}
        subcategories={config.subcategories}
      />

      <SiloProductGrid
        locale={locale}
        label={label}
        products={products}
        fallbackHref={fallbackHref}
      />

      <SiloSeoContent seo={config.seo} />

      <SiloProcurementTags locale={locale} procurement={config.procurement} />

      <SiloFaq faqs={config.faqs} />

      <SiloCrossLinks locale={locale} currentSlug={config.slug} />

      <Footer />
    </div>
  )
}

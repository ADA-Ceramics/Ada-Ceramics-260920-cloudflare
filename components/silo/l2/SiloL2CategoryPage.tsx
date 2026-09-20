import { notFound } from "next/navigation"
import { Footer } from "@/components/layout/footer"
import { getL2Config, getL2ConfigsByParent } from "@/lib/silo/l2-config"
import { getL2Products } from "@/lib/silo/l2-products"
// 复用现有 L1 silo 组件（零修改）
import { SiloSeoContent } from "@/components/silo/SiloSeoContent"
import { SiloProcurementTags } from "@/components/silo/SiloProcurementTags"
import { SiloFaq } from "@/components/silo/SiloFaq"
import { SiloCrossLinks } from "@/components/silo/SiloCrossLinks"
// L2 专属组件
import { SiloL2Banner } from "./SiloL2Banner"
import { SiloL2ProductBrowser } from "./SiloL2ProductBrowser"
import { SiloL2SiblingLinks } from "./SiloL2SiblingLinks"

interface SiloL2CategoryPageProps {
  parentSlug: string
  l2Slug: string
  locale: string
}

/**
 * 通用 L2 二级分类集合页模板（数据驱动，全站所有 L2 一键复用）。
 * 固定从上到下区块：
 *  1) 三级面包屑（在 Banner 内）2) 轻量化 Banner + 双 CTA
 *  3) 采购优势标签 4) 左筛选 + 右产品网格 5) 300 词 SEO
 *  6) 同 Silo 其他 L2 横向跳转 7) FAQ + Schema 8) 跨四大 Silo 导流
 * 全局 Header 由 layout 提供，本模板仅追加 Footer。
 */
export async function SiloL2CategoryPage({
  parentSlug,
  l2Slug,
  locale,
}: SiloL2CategoryPageProps) {
  const config = getL2Config(parentSlug, l2Slug)
  if (!config) notFound()

  // 严格仅拉取当前 L2 对应品类产品（跨品类隔离）
  const products = await getL2Products(config.productCategorySlugs)
  // 同 Silo 其他 L2（横向内链）
  const siblings = getL2ConfigsByParent(parentSlug).filter((c) => c.slug !== config.slug)

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }

  // translate="no" 防止浏览器自动翻译（Google Translate）改写文本节点，
  // 导致 React 卸载子树时 removeChild 找不到原节点而崩溃；站点已有自有 i18n。
  return (
    <div translate="no" className="notranslate min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <SiloL2Banner
        locale={locale}
        parentSlug={config.parentSlug}
        parentLabel={config.parentLabel}
        slug={config.slug}
        label={config.label}
        h1={config.h1}
        intro={config.intro}
        bannerImage={config.bannerImage}
        keyword={config.keyword}
      />

      <SiloProcurementTags locale={locale} procurement={config.procurement} />

      <SiloL2ProductBrowser
        locale={locale}
        label={config.label}
        products={products}
        parentSlug={config.parentSlug}
        l2Slug={config.slug}
        fallbackHref="/contact"
      />

      <SiloSeoContent seo={config.seo} />

      <SiloL2SiblingLinks
        locale={locale}
        parentLabel={config.parentLabel}
        siblings={siblings}
      />

      <SiloFaq faqs={config.faqs} />

      <SiloCrossLinks locale={locale} currentSlug={config.parentSlug} />

      <Footer />
    </div>
  )
}

import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Package } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { QuoteForm } from "@/components/shared/quote-form"
import { SILO_ORDER, SILO_CONFIGS, CROSS_SILO_CARDS } from "@/lib/silo/config"
import { getSiloProducts, type SiloProduct } from "@/lib/silo/products"

// 站点基础信息（与 sitemap.ts / layout.tsx 的 canonical 完全一致，避免 301）
const SITE_URL = "https://www.adaceramics.com"

// ============================================================
// SEO Metadata —— 复用四大 Silo 关键词地图（SILO_CONFIGS.metaKeywords），
// 不新增独立关键词布局；title/description 沿用全站 meta 模板口径。
// ============================================================
export function generateMetadata(): Metadata {
  // 聚合四大 Silo 的关键词地图并去重，作为本聚合页关键词（不新增词）
  const keywords = Array.from(
    new Set(
      SILO_ORDER.flatMap((slug) =>
        (SILO_CONFIGS[slug]?.metaKeywords ?? "").split(",").map((k) => k.trim()).filter(Boolean),
      ),
    ),
  ).join(", ")

  const title =
    "All Products | Wholesale Ceramic Tableware Manufacturer & OEM/ODM Supplier | ADA Ceramics"
  const description =
    "Browse all ADA Ceramics product collections in one place — wholesale dinnerware, oven-safe bakeware, table decor & drinkware and full OEM/ODM custom ceramics. Factory-direct, low MOQ, FDA/LFGB certified."

  return {
    title,
    description,
    keywords,
    alternates: { canonical: `${SITE_URL}/en/products/all` },
    openGraph: {
      title,
      description,
      type: "website",
    },
  }
}

interface PageProps {
  params: Promise<{ locale: string }>
}

type SiloBlock = {
  slug: string
  title: string
  blurb: string
  keyword: string
  products: SiloProduct[]
}

export default async function AllProductsPage({ params }: PageProps) {
  const { locale } = await params

  // 复用既有产品接口逻辑（getSiloProducts → getProductsByCategory），按四大 Silo 并行拉取
  const blocks: SiloBlock[] = await Promise.all(
    SILO_ORDER.map(async (slug) => {
      const config = SILO_CONFIGS[slug]!
      const card = CROSS_SILO_CARDS.find((c) => c.slug === slug)
      const products = await getSiloProducts(config.productCategorySlugs, 8)
      return {
        slug,
        title: card?.title ?? config.h1,
        blurb: card?.blurb ?? "",
        keyword: config.keyword,
        products,
      }
    }),
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero —— 样式与现有产品/分类页一致 */}
      <section className="pt-32 pb-12 bg-[#f5f3ef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm text-muted-foreground mb-6"
          >
            <Link href={`/${locale}`} className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/${locale}/products`} className="hover:text-foreground transition-colors">
              Products
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">All Products</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-serif font-normal text-foreground mb-4 text-balance">
            All Products — Browse Our Four Ceramic Collections
          </h1>
          <p className="text-muted-foreground max-w-4xl leading-relaxed">
            Explore the complete ADA Ceramics range across our four core collections. Every item
            below links straight to its optimized collection page for full sub-categories, bulk
            pricing and OEM/ODM customization.
          </p>
        </div>
      </section>

      {/* 四大 Silo 入口卡片 —— 链接指向四大 silo 页面（根绝对路径） */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {blocks.map((block) => (
              <Link
                key={block.slug}
                href={`/${locale}/${block.slug}`}
                className="group border border-[#e5e7eb] rounded-lg overflow-hidden bg-white hover:shadow-lg transition-all block"
              >
                <div className="aspect-[4/3] relative bg-[#f9fafb]">
                  <Image
                    src={CROSS_SILO_CARDS.find((c) => c.slug === block.slug)?.image ?? "/placeholder.svg"}
                    alt={`Wholesale ceramic ${block.keyword} custom OEM tableware for Horeca bulk buyers`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-5 text-center">
                  <h2 className="text-base font-medium text-[#1a1a1a] group-hover:text-[#8b7355] transition-colors mb-2">
                    {block.title}
                  </h2>
                  <p className="text-sm text-muted-foreground line-clamp-2">{block.blurb}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 按 Silo 分组的产品聚合 —— 所有产品卡片均链接到对应 silo 页面（根绝对路径） */}
      {blocks.map((block, index) => (
        <section
          key={block.slug}
          className={`py-16 ${index % 2 === 0 ? "bg-[#f5f3ef]" : "bg-white"}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1a1a] mb-2 text-balance">
                  {block.title}
                </h2>
                {block.blurb && <p className="text-muted-foreground">{block.blurb}</p>}
              </div>
              <Link
                href={`/${locale}/${block.slug}`}
                className="inline-flex items-center self-start sm:self-auto px-5 py-2.5 rounded-md border border-[#8b7355] text-[#8b7355] text-sm font-medium hover:bg-[#8b7355] hover:text-white transition-colors"
              >
                Explore {block.title}
              </Link>
            </div>

            {block.products.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
                {block.products.map((product) => (
                  // 产品链接直接指向所属 silo 页面（非单品页），根绝对路径，爬虫友好
                  <Link
                    key={product.id}
                    href={`/${locale}/${block.slug}`}
                    className="group flex flex-col rounded-xl border border-border bg-white overflow-hidden transition-all hover:shadow-lg"
                  >
                    <div className="aspect-square bg-[#f9fafb] overflow-hidden relative">
                      {product.main_image ? (
                        <img
                          src={product.main_image || "/placeholder.svg"}
                          alt={`Wholesale ceramic ${product.name} for Horeca bulk buyers`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-[#9ca3af]">
                          <Package className="w-14 h-14 opacity-30" aria-hidden="true" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col flex-1 p-4 sm:p-5">
                      <h3 className="text-sm sm:text-base font-medium text-[#1a1a1a] mb-3 leading-snug group-hover:text-[#8b7355] transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground">MOQ: 500 pcs</span>
                        <span className="text-xs font-semibold text-[#8b7355]">View Collection</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-[#8b7355]/40 bg-white p-10 text-center">
                <Package className="w-12 h-12 mx-auto text-[#8b7355]/40 mb-4" aria-hidden="true" />
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Browse the full {block.title} collection for sub-categories, bulk pricing and
                  OEM/ODM customization.
                </p>
                <Link
                  href={`/${locale}/${block.slug}`}
                  className="inline-flex items-center px-6 py-3 rounded-md bg-[#8b7355] text-white text-sm font-medium hover:bg-[#75603f] transition-colors"
                >
                  Explore {block.title}
                </Link>
              </div>
            )}
          </div>
        </section>
      ))}

      <QuoteForm />
      <Footer />
    </div>
  )
}

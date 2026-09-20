import type { Metadata } from "next"
import { Footer } from "@/components/layout/footer"
import { getSiloProducts } from "@/lib/silo/products"
import { SILO_CONFIGS } from "@/lib/silo/config"
import { SiloCrossLinks } from "@/components/silo/SiloCrossLinks"

import HomeHero from "@/components/home/HomeHero"
import SiloHubCards from "@/components/home/SiloHubCards"
import ProcurementBar from "@/components/home/ProcurementBar"
import BestSellersGrid, { type BestSellerGroup } from "@/components/home/BestSellersGrid"
import OemQuickEntry from "@/components/home/OemQuickEntry"
import BrandCases from "@/components/home/BrandCases"
import HomeBlog from "@/components/home/HomeBlog"
import HomeFaq from "@/components/home/HomeFaq"
import HomeJsonLd from "@/components/home/HomeJsonLd"

// 首页 Meta：均衡覆盖 dinnerware / bakeware / table decor drinkware / OEM custom ceramics 四大核心词根
// 关键词分层：大流量采购根词（wholesale/bulk/supplier/manufacturer/factory）+ 高转化定制词（OEM/ODM/custom logo/private label）
// + 场景词（restaurant/hotel/café/Horeca）+ 信任词（FDA/LFGB/low MOQ）
export const metadata: Metadata = {
  title:
    "Wholesale Custom Ceramic Tableware Manufacturer | Dinnerware, Bakeware, Decor Drinkware & OEM/ODM | ADA Ceramics",
  description:
    "ADA Ceramics is a factory-direct wholesale custom ceramic tableware manufacturer and OEM/ODM supplier for restaurants, hotels, cafés and global brands. Bulk ceramic dinnerware, oven-safe bakeware, table decor drinkware and full private-label custom ceramics with custom logo printing, glaze & color matching and new mold development. FDA & LFGB certified, low MOQ, worldwide shipping from Chaozhou, China.",
  keywords:
    "wholesale ceramic tableware manufacturer, custom ceramic tableware supplier, bulk ceramic dinnerware, ceramic dinnerware supplier, wholesale ceramic bakeware manufacturer, custom ceramic mugs wholesale, ceramic mug manufacturer, OEM ceramics manufacturer, ODM ceramics factory, private label ceramics, custom logo ceramics, FDA LFGB ceramic factory, restaurant hotel tableware supplier, Horeca ceramic tableware, ceramic tableware factory China",
  robots: "index, follow",
  alternates: { canonical: "https://www.adaceramics.com/en" },
  openGraph: {
    title: "Premium Ceramic Tableware for Global Horeca & Retail",
    description:
      "Factory-direct bulk ceramic dinnerware, oven-safe bakeware, table decor drinkware and full OEM/ODM custom ceramics with custom logo printing and private-label service. FDA & LFGB certified, low MOQ, worldwide shipping.",
    type: "website",
  },
}

// 4 大 Silo 均衡爆款：每个一级 Silo 各取 2 款，保证 4 条产品线权重平均
async function getBalancedBestSellers(): Promise<BestSellerGroup[]> {
  const order = [
    { slug: "dinnerware", title: "Dinnerware" },
    { slug: "bakeware", title: "Bakeware" },
    { slug: "table-decor-drinkware", title: "Table Decor & Drinkware" },
    { slug: "oem-custom-ceramics", title: "OEM Custom Ceramics" },
  ]

  const groups = await Promise.all(
    order.map(async ({ slug, title }) => {
      const config = SILO_CONFIGS[slug]
      const products = await getSiloProducts(config.productCategorySlugs, 2)
      return { slug, title, products }
    }),
  )

  return groups.filter((g) => g.products.length > 0)
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const bestSellerGroups = await getBalancedBestSellers()

  return (
    <div className="min-h-screen bg-white">
      {/* 首页结构化数据：Organization + WebSite（SearchAction） */}
      <HomeJsonLd locale={locale} />

      {/* 区块 1：全局固定 Header 由 layout 提供 */}

      {/* 区块 2：全屏 Hero 双栏 Banner（唯一 H1 + 双 CTA） */}
      <HomeHero locale={locale} />

      {/* 区块 3：4 大 Silo 一级分类卡片枢纽区（首页权重均分给 4 个一级 Silo） */}
      <SiloHubCards locale={locale} />

      {/* 区块 4：B 端采购核心优势标签栏 */}
      <ProcurementBar locale={locale} />

      {/* 区块 5：均衡爆款产品网格（4 大 Silo 各 2 款，直达 L3 单品页） */}
      <BestSellersGrid locale={locale} groups={bestSellerGroups} />

      {/* 区块 6：OEM 定制服务快捷入口（4 个 OEM L3 服务页快捷按钮） */}
      <OemQuickEntry locale={locale} />

      {/* 区块 7：品牌合作案例区（内链 OEM 案例 L3 页面） */}
      <BrandCases locale={locale} />

      {/* 区块 8：资讯 Blog 引流区（文章内链对应 Silo） */}
      <HomeBlog locale={locale} />

      {/* 区块 9：全站统一 FAQ 简版（FAQPage 结构化数据） */}
      <HomeFaq locale={locale} />

      {/* 区块 10：底部全站 Silo 互通导流区（复用 SiloCrossLinks，全站统一） */}
      <SiloCrossLinks locale={locale} currentSlug="" />

      {/* 区块 11：标准全站 Footer */}
      <Footer />
    </div>
  )
}

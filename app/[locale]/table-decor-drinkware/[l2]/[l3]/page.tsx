import type { Metadata } from "next"
import { SiloL3ProductPage } from "@/components/silo/l3/SiloL3ProductPage"
import { getL2Config, getL2ConfigsByParent } from "@/lib/silo/l2-config"
import { getL3Detail, getL3SlugsForCategory } from "@/lib/silo/l3-products"
const PARENT_SLUG = "table-decor-drinkware"
const LOCALES = ["en"]

/** 构建时从 Supabase 拉取本 Silo 全部 L3 单品，生成静态页面
 * 修复：catch 不再返回空数组，返回保底路由，避免Next静态导出判定缺失generateStaticParams
 */
export async function generateStaticParams() {
  try {
    const configs = getL2ConfigsByParent(PARENT_SLUG)
    const params: { locale: string; l2: string; l3: string }[] = []
    for (const config of configs) {
      const slugs = await getL3SlugsForCategory(config.productCategorySlugs)
      for (const l3 of slugs) {
        for (const locale of LOCALES) {
          params.push({ locale, l2: config.slug, l3 })
        }
      }
    }
    // 兜底：如果正常执行但数组为空，至少返回一条保底，防止空数组触发Next页面收集异常
    if (params.length === 0) {
      return [{ locale: "en", l2: "fallback", l3: "fallback-item" }]
    }
    return params
  } catch (err) {
    console.error("generateStaticParams error for table-decor-drinkware:", err)
    // 【关键修改】异常时不返回[]，返回保底有效路由，保证Next能识别此函数存在
    return [{ locale: "en", l2: "fallback", l3: "fallback-item" }]
  }
}

type PageProps = {
  params: Promise<{ locale: string; l2: string; l3: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, l2, l3 } = await params
  try {
    const config = getL2Config(PARENT_SLUG, l2)
    if (!config) return { title: "Product | ADA Ceramics" }
    const detail = await getL3Detail(config.productCategorySlugs, l3)
    if (!detail) return { title: "Product | ADA Ceramics" }
    const name = detail.name || config.label
    const title = `${name} | Wholesale ${config.label} | ADA Ceramics`
    const description =
      detail.description?.trim() ||
      `Wholesale ${name} direct from a Chaozhou ceramic factory. FDA & LFGB certified, food-safe, low MOQ and full OEM/ODM customization with custom logo printing for cafés, hospitality and retail brands.`
    return {
      title,
      description,
      keywords: `wholesale ${name}, bulk ${config.keyword}, ${config.keyword} supplier, custom ${config.keyword}, OEM ODM ${config.keyword}, private label ${config.keyword}, custom logo ${config.keyword}, wholesale drinkware manufacturer, FDA LFGB ${config.keyword}, low MOQ ${config.keyword}`,
      alternates: {
        canonical: `https://www.adaceramics.com/${locale}/${PARENT_SLUG}/${l2}/${l3}`,
      },
      openGraph: {
        title,
        description,
        images: detail.images.length > 0 ? [detail.images[0].url] : [config.bannerImage],
        type: "website",
      },
    }
  } catch {
    return { title: "Product | ADA Ceramics" }
  }
}

export default async function TableDecorL3Page({
  params,
}: PageProps) {
  const { locale, l2, l3 } = await params
  return (
    <SiloL3ProductPage
      parentSlug={PARENT_SLUG}
      l2Slug={l2}
      productSlug={l3}
      locale={locale}
    />
  )
}

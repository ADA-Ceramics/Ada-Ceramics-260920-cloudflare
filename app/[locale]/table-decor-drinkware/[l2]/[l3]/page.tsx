import type { Metadata } from "next"
import { SiloL3ProductPage } from "@/components/silo/l3/SiloL3ProductPage"
import { getL2Config, getL2ConfigsByParent } from "@/lib/silo/l2-config"
import { getL3Detail, getL3SlugsForCategory } from "@/lib/silo/l3-products"

const PARENT_SLUG = "table-decor-drinkware"
const LOCALES = ["en"]
/** 构建时从 Supabase 拉取本 Silo 全部 L3 单品，生成静态页面 */
export async function generateStaticParams() {
  try {
    // ✅ 删除await，同步本地配置函数
    const configs = getL2ConfigsByParent(PARENT_SLUG)
    const params: { locale: string; l2: string; l3: string }[] = []
    for (const config of configs) {
      // ✅ Supabase异步查询，保留await
      const slugs = await getL3SlugsForCategory(config.productCategorySlugs)
      for (const l3 of slugs) {
        for (const locale of LOCALES) {
          params.push({ locale, l2: config.slug, l3 })
        }
      }
    }
    return params
  } catch (err) {
    console.error("generateStaticParams error for table-decor-drinkware:", err)
    return []
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
    // ✅ 删除await，同步本地配置函数
    const config = getL2Config(PARENT_SLUG, l2)
    if (!config) return {}
    // ✅ Supabase异步查询，保留await
    const detail = await getL3Detail(config.productCategorySlugs, l3)
    if (!detail) return {}
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
    return {}
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

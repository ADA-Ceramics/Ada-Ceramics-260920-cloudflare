import type { Metadata } from "next"
import { SiloL3ProductPage } from "@/components/silo/l3/SiloL3ProductPage"
import { getL2Config, getL2ConfigsByParent } from "@/lib/silo/l2-config"
import { getL3Detail, getL3SlugsForCategory } from "@/lib/silo/l3-products"
const PARENT_SLUG = "dinnerware"
const LOCALES = ["en"]

/** 构建时从 Supabase 拉取本 Silo 全部 L3 单品，生成静态页面 */
export async function generateStaticParams() {
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
  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; l2: string; l3: string }>
}): Promise<Metadata> {
  const { locale, l2, l3 } = await params
  const config = getL2Config(PARENT_SLUG, l2)
  if (!config) return {}
  const detail = await getL3Detail(config.productCategorySlugs, l3)
  if (!detail) return {}
  const name = detail.name || config.label
  const title = `${name} | Wholesale ${config.label} | ADA Ceramics`
  const description =
    detail.description?.trim() ||
    `Wholesale ${name} direct from a Chaozhou ceramic factory. FDA & LFGB certified, oven safe, low MOQ and full OEM/ODM customization for restaurants, hotels and bakeries.`
  return {
    title,
    description,
    keywords: `wholesale ${name}, bulk ${config.keyword}, ${config.keyword} supplier, custom ${config.keyword}, OEM ODM ${config.keyword}, private label ${config.keyword}, wholesale ${config.parentLabel} manufacturer, FDA LFGB ${config.keyword}, low MOQ ${config.keyword}`,
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
}

export default async function DinnerwareL3Page({
  params,
}: {
  params: Promise<{ locale: string; l2: string; l3: string }>
}) {
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

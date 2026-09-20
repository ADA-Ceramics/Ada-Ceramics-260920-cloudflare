import type { Metadata } from "next"
import { SiloL2CategoryPage } from "@/components/silo/l2/SiloL2CategoryPage"
import { getL2Config, getL2ConfigsByParent } from "@/lib/silo/l2-config"

const PARENT_SLUG = "dinnerware"

/** 预生成本 Silo 全部 L2 路径，确保一键复用全部子分类 */
export function generateStaticParams() {
  return getL2ConfigsByParent(PARENT_SLUG).map((c) => ({ l2: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; l2: string }>
}): Promise<Metadata> {
  const { locale, l2 } = await params
  const config = getL2Config(PARENT_SLUG, l2)
  if (!config) return {}

  return {
    title: config.metaTitle,
    description: config.metaDescription,
    keywords: config.metaKeywords,
    alternates: {
      canonical: `https://www.adaceramics.com/${locale}/${PARENT_SLUG}/${config.slug}`,
    },
    openGraph: {
      title: config.metaTitle,
      description: config.metaDescription,
      images: [config.bannerImage],
      type: "website",
    },
  }
}

export default async function DinnerwareL2Page({
  params,
}: {
  params: Promise<{ locale: string; l2: string }>
}) {
  const { locale, l2 } = await params
  return <SiloL2CategoryPage parentSlug={PARENT_SLUG} l2Slug={l2} locale={locale} />
}

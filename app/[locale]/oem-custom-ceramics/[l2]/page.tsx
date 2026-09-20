import type { Metadata } from "next"
import { OemServicePage } from "@/components/silo/oem/OemServicePage"
import { OemCaseStudiesPage } from "@/components/silo/oem/OemCaseStudiesPage"
import { getL2Config, getL2ConfigsByParent } from "@/lib/silo/l2-config"
import { OEM_CASE_STUDIES_SLUG } from "@/lib/silo/oem-service-config"

const PARENT_SLUG = "oem-custom-ceramics"

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

export default async function OemCustomCeramicsL2Page({
  params,
}: {
  params: Promise<{ locale: string; l2: string }>
}) {
  const { locale, l2 } = await params
  if (l2 === OEM_CASE_STUDIES_SLUG) {
    return <OemCaseStudiesPage locale={locale} />
  }
  return <OemServicePage slug={l2} locale={locale} />
}

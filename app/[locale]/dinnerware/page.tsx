import type { Metadata } from "next"
import { SiloCategoryPage } from "@/components/silo/SiloCategoryPage"
import { getSiloConfig } from "@/lib/silo/config"

const SILO_SLUG = "dinnerware"

export function generateMetadata(): Metadata {
  const config = getSiloConfig(SILO_SLUG)!
  return {
    title: config.metaTitle,
    description: config.metaDescription,
    keywords: config.metaKeywords,
    alternates: { canonical: `https://www.adaceramics.com/en/${SILO_SLUG}` },
    openGraph: {
      title: config.metaTitle,
      description: config.metaDescription,
      images: [config.bannerImage],
      type: "website",
    },
  }
}

export default async function DinnerwarePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return <SiloCategoryPage siloSlug={SILO_SLUG} locale={locale} />
}

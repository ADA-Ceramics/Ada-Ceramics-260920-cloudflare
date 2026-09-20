import type { Metadata } from "next"
import { SiloCategoryPage } from "@/components/silo/SiloCategoryPage"
import { getSiloConfig } from "@/lib/silo/config"
import { getL2ConfigsByParent } from '@/lib/silo/l2-config'

const SILO_SLUG = "table-decor-drinkware"

export async function generateStaticParams() {
  const list = getL2ConfigsByParent(SILO_SLUG);
  return list.map(item => ({
    locale: 'en',
    l2: item.slug
  }));
}

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
export default async function TableDecorDrinkwarePage({
  params,
}: {
  params: Promise<{ locale: string, l2: string }>
}) {
  const { locale } = await params
  return <SiloCategoryPage siloSlug={SILO_SLUG} locale={locale} />
}

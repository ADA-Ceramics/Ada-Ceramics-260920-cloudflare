import { FactoryClient } from "@/components/pages/factory-client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ADA Ceramics Factory | China OEM Ceramic Tableware Manufacturing Factory",
  description:
    "Tour the ADA Ceramics factory: a 46,000 ㎡ certified production base in Chaozhou, China with 13+ lines, 340+ workers, FDA & LFGB compliance, strict QC and full OEM/ODM bulk capacity for global B2B buyers.",
}

export default async function FactoryPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return <FactoryClient locale={locale} />
}

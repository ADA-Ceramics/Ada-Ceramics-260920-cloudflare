import { AboutClient } from "@/components/pages/about-client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About ADA Ceramics | Professional Ceramic Tableware Manufacturer & Supplier",
  description:
    "ADA Ceramics is a manufacturer-backed ceramic brand with 30+ years of heritage, FDA & LFGB certified, serving global businesses with reliable wholesale supply and OEM/ODM brand cooperation.",
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return <AboutClient locale={locale} />
}

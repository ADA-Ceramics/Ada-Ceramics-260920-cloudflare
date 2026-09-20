import { ContactClient } from "@/components/pages/contact-client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | ADA Ceramics",
  description: "Get in touch with ADA Ceramics for wholesale inquiries, custom OEM orders, price quotes and business cooperation. Fast reply & professional service worldwide.",
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return <ContactClient locale={locale} />
}

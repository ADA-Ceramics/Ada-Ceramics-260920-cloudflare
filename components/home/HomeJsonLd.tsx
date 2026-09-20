const SITE_URL = "https://www.adaceramics.com"

type HomeJsonLdProps = {
  locale: string
}

// 首页结构化数据：Organization（品牌实体）+ WebSite（站点 + 站内搜索）
export default function HomeJsonLd({ locale }: HomeJsonLdProps) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "ADA Ceramics",
    alternateName: "ADA Ceramics Wholesale Tableware Manufacturer",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.png`,
    },
    description:
      "ADA Ceramics is a wholesale custom ceramic tableware manufacturer for Horeca and global brands, producing dinnerware, oven-safe bakeware, table decor drinkware and full OEM custom ceramics. FDA & LFGB certified with low MOQ and worldwide shipping.",
    foundingLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Chaozhou",
        addressRegion: "Guangdong",
        addressCountry: "CN",
      },
    },
    knowsAbout: [
      "Wholesale Ceramic Dinnerware",
      "Oven-Safe Ceramic Bakeware",
      "Table Decor & Drinkware",
      "OEM Custom Ceramics",
      "Private Label Ceramic Manufacturing",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      availableLanguage: ["English"],
      areaServed: "Worldwide",
    },
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "ADA Ceramics",
    description:
      "Wholesale custom ceramic tableware manufacturer for Horeca and global brands.",
    inLanguage: "en",
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/${locale}/products?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  )
}

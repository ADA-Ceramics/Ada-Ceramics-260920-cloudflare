import Link from "next/link"
import { ChevronRight } from "lucide-react"

const SITE_URL = "https://www.adaceramics.com"

interface SiloL3BreadcrumbProps {
  locale: string
  parentSlug: string
  parentLabel: string
  l2Slug: string
  l2Label: string
  /** 当前单品 slug（用于 BreadcrumbList Schema 末级的规范 URL，避免缺失产品段造成链接不完整） */
  productSlug: string
  productName: string
}

/**
 * L3 四级面包屑：Home > L1 大类 > L2 细分 > 当前单品（自带 BreadcrumbList Schema）。
 * 前三级均可点击，向上回流权重至 L2 细分页与 L1 大类页；视觉与 L2 面包屑完全一致。
 */
export function SiloL3Breadcrumb({
  locale,
  parentSlug,
  parentLabel,
  l2Slug,
  l2Label,
  productSlug,
  productName,
}: SiloL3BreadcrumbProps) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/${locale}` },
      {
        "@type": "ListItem",
        position: 2,
        name: parentLabel,
        item: `${SITE_URL}/${locale}/${parentSlug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: l2Label,
        item: `${SITE_URL}/${locale}/${parentSlug}/${l2Slug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: productName,
        item: `${SITE_URL}/${locale}/${parentSlug}/${l2Slug}/${productSlug}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
      >
        <Link href={`/${locale}`} className="hover:text-[#8b7355] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-4 h-4 shrink-0" aria-hidden="true" />
        <Link
          href={`/${locale}/${parentSlug}`}
          className="hover:text-[#8b7355] transition-colors"
        >
          {parentLabel}
        </Link>
        <ChevronRight className="w-4 h-4 shrink-0" aria-hidden="true" />
        <Link
          href={`/${locale}/${parentSlug}/${l2Slug}`}
          className="hover:text-[#8b7355] transition-colors"
        >
          {l2Label}
        </Link>
        <ChevronRight className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span
          className="text-foreground font-medium truncate max-w-[220px]"
          aria-current="page"
        >
          {productName}
        </span>
      </nav>
    </>
  )
}

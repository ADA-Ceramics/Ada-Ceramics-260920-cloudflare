import Link from "next/link"
import { ChevronRight } from "lucide-react"

const SITE_URL = "https://www.adaceramics.com"

interface SiloL2BreadcrumbProps {
  locale: string
  parentSlug: string
  parentLabel: string
  slug: string
  label: string
}

/**
 * L2 三级面包屑：Home > 父级 Silo > 当前 L2（自带 BreadcrumbList Schema）。
 * 视觉与原 SiloBreadcrumb 完全一致；新增独立组件以满足三级层级 + 上链 L1 的 SEO 闭环，
 * 不修改原有 2 级 SiloBreadcrumb 源码。
 */
export function SiloL2Breadcrumb({
  locale,
  parentSlug,
  parentLabel,
  slug,
  label,
}: SiloL2BreadcrumbProps) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: parentLabel,
        item: `${SITE_URL}/${locale}/${parentSlug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: label,
        item: `${SITE_URL}/${locale}/${parentSlug}/${slug}`,
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
        className="flex items-center gap-2 text-sm text-muted-foreground"
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
        <span className="text-foreground font-medium" aria-current="page">
          {label}
        </span>
      </nav>
    </>
  )
}

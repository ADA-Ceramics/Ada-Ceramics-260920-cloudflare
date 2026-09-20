import Link from "next/link"
import { ChevronRight } from "lucide-react"

const SITE_URL = "https://www.adaceramics.com"

interface SiloBreadcrumbProps {
  locale: string
  /** 当前分类页 slug */
  slug: string
  /** 当前分类显示名 */
  label: string
}

/**
 * 面包屑导航（自带 BreadcrumbList Schema 结构化数据）
 * 固定结构：Home > 当前分类，预留回链首页逻辑（向上内链）
 */
export function SiloBreadcrumb({ locale, slug, label }: SiloBreadcrumbProps) {
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
        name: label,
        item: `${SITE_URL}/${locale}/${slug}`,
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
        <span className="text-foreground font-medium" aria-current="page">
          {label}
        </span>
      </nav>
    </>
  )
}

import { Metadata } from "next"
import { getAllPosts } from "@/lib/notion"
import { BlogList, type LatestProduct } from "@/components/blog/blog-list"
import { getAllProducts, getCategoryTree } from "@/lib/supabase/products"
import { buildSiloProductPath } from "@/lib/silo/l2-config"

export const metadata: Metadata = {
  title: "Ceramic Tableware Wholesale Guides & Industry News | ADA Ceramics Blog",
  description:
    "Expert wholesale buying guides and industry news on dinnerware, bakeware, table decor & drinkware, and OEM custom ceramics for hotels, restaurants and bulk brand buyers.",
  keywords:
    "ceramic tableware wholesale guide, dinnerware buying tips, bakeware selection, table decor drinkware trends, OEM custom ceramics knowledge, bulk ceramic supplier news",
  alternates: { canonical: "https://www.adaceramics.com/en/blog" },
  openGraph: {
    title: "Ceramic Tableware Wholesale Guides & Industry News | ADA Ceramics Blog",
    description:
      "Wholesale buying guides and industry news across dinnerware, bakeware, table decor drinkware and OEM custom ceramics.",
    type: "website",
  },
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const { posts, error } = await getAllPosts()

  // 侧边栏「Latest Products」：取最新上架产品，并把分类 id 解析为 slug 拼出可访问的详情页链接
  let latestProducts: LatestProduct[] = []
  try {
    const [products, categories] = await Promise.all([getAllProducts(), getCategoryTree()])
    const idToSlug = new Map(categories.map((c) => [c.id, c.slug]))
    latestProducts = (products as Array<Record<string, unknown>>)
      .slice()
      .sort((a, b) => new Date(String(b.created_at)).getTime() - new Date(String(a.created_at)).getTime())
      .slice(0, 5)
      .map((p) => {
        const subSlug = p.subcategory ? idToSlug.get(p.subcategory as string) : undefined
        return {
          id: String(p.id),
          name: String(p.name),
          image: (p.main_image as string | null) || "/wholesale-ceramics-supplier.webp",
          href: subSlug
            ? `/${locale}${buildSiloProductPath(subSlug, String(p.slug))}`
            : `/${locale}/products`,
        }
      })
  } catch (e) {
    console.error("加载 Latest Products 失败:", e)
  }

  return <BlogList posts={posts} error={error} locale={locale} latestProducts={latestProducts} />
}

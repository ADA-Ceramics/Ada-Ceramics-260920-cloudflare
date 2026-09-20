import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

interface HomeBlogProps {
  locale: string
}

// 区块 8：资讯 Blog 引流区 —— 3 篇文章卡片，正文分别内链对应 Silo 页面，捕获低竞争问答长尾
const ARTICLES = [
  {
    title: "How to Buy Bulk Ceramic Dinnerware: A Wholesale Sourcing Guide",
    image: "/wholesale-dinnerware-sets.webp",
    alt: "guide to buying bulk wholesale ceramic dinnerware plates and bowls",
    siloLabel: "Dinnerware",
    siloHref: "/dinnerware",
    date: "May 15, 2026",
  },
  {
    title: "Hotel Bakeware Purchasing Guide: Oven-Safe Ceramic Essentials",
    image: "/wholesale-bakeware.webp",
    alt: "hotel oven-safe ceramic bakeware purchasing guide for kitchens",
    siloLabel: "Bakeware",
    siloHref: "/bakeware",
    date: "May 8, 2026",
  },
  {
    title: "Custom Ceramic Mug MOQ Explained: Branding for Cafés & Gifts",
    image: "/ceramic-gift-mug.webp",
    alt: "custom ceramic mug MOQ and OEM branding guide for cafés",
    siloLabel: "OEM Custom Ceramics",
    siloHref: "/oem-custom-ceramics",
    date: "April 28, 2026",
  },
]

export default function HomeBlog({ locale }: HomeBlogProps) {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <p className="text-[#8b7355] text-xs font-semibold uppercase tracking-widest mb-3">
              Wholesale Guides
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1a1a2e] text-balance">
              Ceramic Tableware Wholesale Guides &amp; Articles
            </h2>
          </div>
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center self-start sm:self-auto px-5 py-2.5 rounded-md border border-[#8b7355] text-[#8b7355] text-sm font-medium hover:bg-[#8b7355] hover:text-white transition-colors"
          >
            View All Articles
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTICLES.map((article) => (
            <article
              key={article.title}
              className="group flex flex-col rounded-2xl border border-[#e7e2d8] bg-[#faf8f4] overflow-hidden transition-all hover:shadow-lg"
            >
              <Link href={`/${locale}/blog`} className="block aspect-[16/10] overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.alt}
                  width={520}
                  height={325}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
              <div className="flex flex-col flex-1 p-5">
                <span className="text-xs text-[#9ca3af] mb-2">{article.date}</span>
                <h3 className="font-serif text-lg text-[#1a1a2e] leading-snug mb-3">
                  <Link href={`/${locale}/blog`} className="hover:text-[#8b7355] transition-colors">
                    {article.title}
                  </Link>
                </h3>
                <Link
                  href={`/${locale}${article.siloHref}`}
                  className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-[#8b7355]"
                >
                  Explore {article.siloLabel}
                  <ArrowRight
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

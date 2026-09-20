"use client"

import Link from "next/link"
import Image from "next/image"
import { AlertCircle, Search, ArrowRight, Tag, Send, Check, ChevronRight } from "lucide-react"
import { useMemo, useState } from "react"
import type { BlogPost } from "@/lib/notion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SiloBreadcrumb } from "@/components/silo/SiloBreadcrumb"
import { SiloCrossLinks } from "@/components/silo/SiloCrossLinks"
import { CONTACT_API } from "@/components/home/types"

export interface LatestProduct {
  id: string
  name: string
  image: string
  href: string
}

interface BlogListProps {
  posts: BlogPost[]
  error?: string | null
  locale: string
  latestProducts?: LatestProduct[]
}

/**
 * 分类筛选标签：对应 4 大产品线 + OEM 定制 + 工厂批发资讯。
 * keywords 用于把 Notion 文章 tags 归类到对应分类（无配置时按标题关键词兜底匹配）。
 */
const CATEGORY_FILTERS = [
  { id: "all", label: "All Articles", keywords: [] as string[] },
  { id: "dinnerware", label: "Dinnerware Guides", keywords: ["dinnerware", "plate", "bowl", "dinner"] },
  { id: "bakeware", label: "Bakeware Tips", keywords: ["bakeware", "oven", "baking", "bake"] },
  { id: "table-decor", label: "Table Decor Trends", keywords: ["table decor", "drinkware", "mug", "cup", "decor"] },
  { id: "oem", label: "OEM Custom Knowledge", keywords: ["oem", "custom", "logo", "mold", "odm"] },
  { id: "factory", label: "Factory & Wholesale FAQs", keywords: ["factory", "wholesale", "bulk", "moq", "shipping"] },
] as const

// 资讯专属 FAQ（承接低竞争采购问答长尾词，内嵌 FAQPage Schema）
const BLOG_FAQS = [
  {
    q: "Are you a manufacturer or trade company?",
    a: "ADA Ceramics is a direct ceramic manufacturer with our own factory, producing dinnerware, bakeware and drinkware in-house. Buying from us means factory-direct pricing, full quality control and reliable lead times without any middleman.",
  },
  {
    q: "What is the minimum order quantity (MOQ)?",
    a: "Custom ceramic MOQ usually starts from a few hundred to a few thousand pieces per design depending on shape, glaze and decoration. We offer flexible minimums for new brands and scalable volume pricing for established buyers.",
  },
  {
    q: "What about the lead time for mass production?",
    a: "Standard bulk orders typically ship within 30-45 days after sample approval, while custom OEM projects vary by mold and decoration complexity. We confirm exact timelines with every quote and keep you updated through production.",
  },
  {
    q: "What certificates do you have?",
    a: "Our tableware is produced with food-safe, FDA and LFGB certified glazes, and we support additional compliance testing such as California Prop 65 and reach on request for retail and Horeca buyers worldwide.",
  },
  {
    q: "Where is your factory located? How can I visit?",
    a: "Our factory is located in China's main ceramic production cluster. We welcome scheduled factory visits and audits, and also provide virtual video tours and third-party inspection support for overseas buyers.",
  },
]

export function BlogList({ posts, error, locale, latestProducts = [] }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  // —— Get a Quote 表单（复用 CONTACT_API / Cloudflare Worker 提交，成功后跳转 WhatsApp）——
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    details: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch(CONTACT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, category: "Blog inquiry", quantity: "" }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setShowSuccessModal(true)
        setTimeout(() => {
          const msg = `Hi, I'm ${formData.fullName} from ${formData.company}.\nEmail: ${formData.email}\nPhone: ${formData.phone}\nDetails: ${formData.details}`
          window.open(`https://wa.me/8615919512131?text=${encodeURIComponent(msg)}`, "_blank")
          setShowSuccessModal(false)
        }, 2000)
      } else {
        alert("Failed to send message: " + (data.error || "Please try again"))
      }
    } catch {
      alert("Network error, please try again later")
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })

  // 文章归类：依据 tags + 标题关键词匹配分类
  const matchesCategory = (post: BlogPost, categoryId: string) => {
    if (categoryId === "all") return true
    const cat = CATEGORY_FILTERS.find((c) => c.id === categoryId)
    if (!cat) return true
    const haystack = `${post.title} ${post.excerpt} ${post.tags.join(" ")}`.toLowerCase()
    return cat.keywords.some((kw) => haystack.includes(kw))
  }

  const filteredPosts = useMemo(
    () =>
      posts.filter(
        (post) =>
          matchesCategory(post, activeCategory) &&
          `${post.title} ${post.excerpt}`.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [posts, activeCategory, searchQuery],
  )

  // 热门标签云：聚合 Notion 文章 tags（无则用分类标签兜底）
  const popularTags = useMemo(() => {
    const counts = new Map<string, number>()
    posts.forEach((p) => p.tags.forEach((t) => counts.set(t, (counts.get(t) || 0) + 1)))
    const fromNotion = [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([t]) => t)
    return fromNotion.length > 0
      ? fromNotion.slice(0, 12)
      : [
          "Ceramic Manufacturing Process",
          "Ceramic Materials & Product Knowledge",
          "Ceramic Sourcing Guide",
          "Ceramics OEM/ODM Solutions",
          "Company News & Exhibition Updates",
          "Compliance & Sustainability",
          "Factory Capability & Quality Control",
          "Market Trends & Design Inspiration",
        ]
  }, [posts])

  // 右侧 + 底部核心导流卡片：4 大产品 Silo + OEM 定制
  const siloLinks = [
    { label: "Dinnerware Wholesale", href: `/${locale}/dinnerware` },
    { label: "Bakeware Wholesale", href: `/${locale}/bakeware` },
    { label: "Table Decor & Drinkware", href: `/${locale}/table-decor-drinkware` },
    { label: "OEM Custom Ceramics", href: `/${locale}/oem-custom-ceramics` },
  ]

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: BLOG_FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />

      {/* 提交成功提示弹窗 */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-8 max-w-md mx-4 text-center shadow-2xl">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent Successfully!</h3>
            <p className="text-gray-600">Thank you for contacting us. We will get back to you within 24 hours.</p>
            <p className="text-sm text-gray-400 mt-4">Redirecting to WhatsApp...</p>
          </div>
        </div>
      )}

      <main className="min-h-screen bg-background">
        {/* 区块 1��面包屑 Home > Blogs & News（含 BreadcrumbSchema） */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
          <SiloBreadcrumb locale={locale} slug="blog" label="Blogs & News" />
        </div>

        {/* 区块 2：博客 Hero 首屏（唯一 H1 + 搜索框） */}
        <section className="bg-[#f5f3ef] pt-10 pb-14 mt-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div className="max-w-3xl">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#1a1a2e] mb-5 leading-tight text-balance">
                  Ceramic Tableware Wholesale Guides &amp; Industry News
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Expert buying guides, design trends and factory insights covering wholesale{" "}
                  <strong className="font-medium text-[#1a1a2e]">dinnerware</strong>,{" "}
                  <strong className="font-medium text-[#1a1a2e]">bakeware</strong>,{" "}
                  <strong className="font-medium text-[#1a1a2e]">table decor &amp; drinkware</strong> and{" "}
                  <strong className="font-medium text-[#1a1a2e]">OEM custom ceramics</strong> for hotels, restaurants
                  and bulk brand buyers worldwide.
                </p>
              </div>
              <div className="w-full lg:w-80 shrink-0">
                <label htmlFor="blog-hero-search" className="sr-only">
                  Search articles
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
                  <input
                    id="blog-hero-search"
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#8b7355] focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 区块 3：分类标签横向筛选栏 */}
        <section className="border-b border-gray-100 bg-white sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap gap-2.5">
              {CATEGORY_FILTERS.map((cat) => {
                const active = activeCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    aria-pressed={active}
                    className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors ${
                      active
                        ? "bg-[#8b7355] text-white border-[#8b7355]"
                        : "bg-white text-muted-foreground border-gray-200 hover:border-[#8b7355] hover:text-[#8b7355]"
                    }`}
                  >
                    {cat.label}
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* 区块 4：左右分栏（左：横向文章列表 / 右：侧边栏） */}
        <section className="py-14 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* 左侧主区域：Notion 文章渲染为横向卡片列表 */}
              <div className="flex-1 min-w-0">
                {error ? (
                  <div className="rounded-xl border border-gray-100 bg-[#f9fafb] p-8 text-center">
                    <h2 className="text-lg font-medium text-foreground mb-2">No articles to display yet</h2>
                    <p className="text-muted-foreground text-sm max-w-md mx-auto">
                      Articles will appear here automatically once the Notion database is connected. Setup details are
                      available at the bottom of this page.
                    </p>
                  </div>
                ) : filteredPosts.length === 0 ? (
                  <div className="py-16 text-center">
                    <h2 className="text-lg font-medium text-foreground mb-2">
                      {searchQuery || activeCategory !== "all" ? "No matching articles" : "No articles available yet"}
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      {searchQuery || activeCategory !== "all"
                        ? "Try a different keyword or category, or browse our product collections below."
                        : "New wholesale guides and industry news are published regularly. Check back soon."}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    {filteredPosts.map((post) => (
                      <article
                        key={post.id}
                        className="group flex flex-col sm:flex-row gap-5 rounded-xl overflow-hidden border border-gray-100 bg-white p-4 transition-all hover:shadow-md hover:border-gray-200"
                      >
                        <Link
                          href={`/${locale}/blog/${post.slug}`}
                          className="relative w-full sm:w-56 md:w-64 shrink-0 aspect-[16/10] overflow-hidden rounded-lg bg-gray-100"
                        >
                          <Image
                            src={post.coverImage || "/ceramic-manufacturer.webp"}
                            alt={`${post.title} - wholesale ceramic tableware guide for hotel & bulk brand buyers`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 100vw, 256px"
                          />
                        </Link>
                        <div className="flex flex-col flex-1 min-w-0 sm:py-1">
                          {post.tags[0] && (
                            <span className="inline-flex w-fit items-center gap-1 text-xs font-medium text-[#8b7355] mb-2">
                              <Tag className="w-3 h-3" aria-hidden="true" />
                              {post.tags[0]}
                            </span>
                          )}
                          <Link href={`/${locale}/blog/${post.slug}`}>
                            <h2 className="text-xl font-serif font-normal text-[#1a1a2e] mb-2 leading-snug group-hover:text-[#8b7355] transition-colors line-clamp-2">
                              {post.title}
                            </h2>
                          </Link>
                          {post.excerpt && (
                            <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2 md:line-clamp-3">
                              {post.excerpt}
                            </p>
                          )}
                          <div className="mt-auto flex items-center justify-between gap-3">
                            <time className="text-xs text-muted-foreground" dateTime={post.publishedAt}>
                              {formatDate(post.publishedAt)}
                            </time>
                            <Link
                              href={`/${locale}/blog/${post.slug}`}
                              className="inline-flex items-center gap-1 text-sm font-medium text-[#8b7355] hover:text-[#6d5a43] transition-colors"
                            >
                              Read More
                              <ArrowRight className="w-4 h-4" aria-hidden="true" />
                            </Link>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>

              {/* 右侧侧边栏：搜索 / 热门标签云 / 最新产品 / 核心导流 */}
              <aside className="lg:w-80 flex-shrink-0">
                <div className="lg:sticky lg:top-24 space-y-8">
                  {/* ① 文章搜索框（与顶部联动同一 state） */}
                  <div className="bg-[#f9fafb] rounded-lg p-5 border border-gray-100">
                    <h2 className="text-base font-semibold text-[#1a1a2e] mb-3">Search Articles</h2>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
                      <label htmlFor="blog-sidebar-search" className="sr-only">
                        Search articles
                      </label>
                      <input
                        id="blog-sidebar-search"
                        type="text"
                        placeholder="Search ..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#8b7355] focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* ② 热门标签云（读取 Notion 文章标签筛选） */}
                  <div className="bg-[#f9fafb] rounded-lg p-5 border border-gray-100">
                    <h2 className="text-base font-semibold text-[#1a1a2e] mb-4">Tags</h2>
                    <div className="flex flex-wrap gap-2">
                      {popularTags.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => setSearchQuery(tag)}
                          className="px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-md text-muted-foreground text-left hover:border-[#8b7355] hover:text-[#8b7355] transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* ③ 最新产品（从 Supabase 拉取，导流到产品详情页） */}
                  {latestProducts.length > 0 && (
                    <div className="bg-[#f9fafb] rounded-lg p-5 border border-gray-100">
                      <h2 className="text-base font-semibold text-[#1a1a2e] mb-4">Latest Products</h2>
                      <ul className="space-y-4">
                        {latestProducts.map((product) => (
                          <li key={product.id}>
                            <Link href={product.href} className="group flex items-center gap-3">
                              <div className="relative w-16 h-16 shrink-0 rounded-md overflow-hidden bg-white border border-gray-100">
                                <Image
                                  src={product.image || "/wholesale-ceramics-supplier.webp"}
                                  alt={`${product.name} - wholesale ceramic tableware from ADA Ceramics factory`}
                                  fill
                                  className="object-cover"
                                  sizes="64px"
                                />
                              </div>
                              <span className="text-sm text-[#1a1a2e] leading-snug line-clamp-3 group-hover:text-[#8b7355] transition-colors">
                                {product.name}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* ④ 核心导流卡片：4 大产品 Silo + OEM 定制 */}
                  <div className="bg-[#1a1a2e] rounded-lg p-6">
                    <h2 className="text-base font-semibold text-white mb-4">Shop Our Collections</h2>
                    <ul className="space-y-2.5">
                      {siloLinks.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="group flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10 hover:border-white/25"
                          >
                            {link.label}
                            <ArrowRight
                              className="w-4 h-4 text-[#c9a87c] transition-transform group-hover:translate-x-1"
                              aria-hidden="true"
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/${locale}/contact`}
                      className="mt-5 block w-full text-center px-5 py-2.5 bg-[#8b7355] text-white font-medium text-sm rounded-lg hover:bg-[#6d5a43] transition-colors"
                    >
                      Request Custom Quote
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* 区块 5：Get a Quote —— 左侧 FAQ 手风琴 + 右侧 Send A Message 表单（对标竞品布局） */}
        <section className="py-16 bg-[#f5f3ef]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* 左：Get a Quote 文案 + FAQ 手风琴（FAQPage Schema 已在顶部注入） */}
              <div>
                <h2 className="font-serif text-3xl text-[#1a1a2e] mb-4">Get a Quote</h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Thank you for your interest in our products! Please fill in the following information, and our team
                  will provide you with a detailed quote as soon as possible.
                </p>
                <h3 className="font-serif text-2xl text-[#1a1a2e] mb-4 pb-2 border-b border-[#8b7355]/40 inline-block">
                  FAQ
                </h3>
                <div className="mt-4 divide-y divide-gray-200 border-t border-gray-200">
                  {BLOG_FAQS.map((faq, i) => {
                    const open = openFaq === i
                    return (
                      <div key={faq.q}>
                        <button
                          type="button"
                          onClick={() => setOpenFaq(open ? null : i)}
                          aria-expanded={open}
                          className="w-full flex items-center justify-between gap-4 py-4 text-left"
                        >
                          <span className="text-[#1a1a2e] font-medium">{faq.q}</span>
                          <span
                            className={`shrink-0 w-6 h-6 rounded-full bg-[#1a3a5c] text-white flex items-center justify-center transition-transform ${
                              open ? "rotate-90" : ""
                            }`}
                          >
                            <ChevronRight className="w-4 h-4" aria-hidden="true" />
                          </span>
                        </button>
                        {open && <p className="pb-4 -mt-1 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* 右：Send A Message 表单 */}
              <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 bg-[#eef1f4] px-6 py-4">
                  <Send className="w-5 h-5 text-[#1a3a5c]" aria-hidden="true" />
                  <h3 className="text-lg font-semibold text-[#1a1a2e]">Send A Message</h3>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="q-name" className="sr-only">
                        Name
                      </label>
                      <input
                        id="q-name"
                        type="text"
                        required
                        placeholder="Name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="q-company" className="sr-only">
                        Company
                      </label>
                      <input
                        id="q-company"
                        type="text"
                        placeholder="Company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="q-email" className="sr-only">
                        Email
                      </label>
                      <input
                        id="q-email"
                        type="email"
                        required
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="q-phone" className="sr-only">
                        Phone
                      </label>
                      <input
                        id="q-phone"
                        type="tel"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="q-message" className="sr-only">
                      How can we help you?
                    </label>
                    <textarea
                      id="q-message"
                      required
                      rows={5}
                      placeholder="How can we help you?"
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:border-transparent transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#1a3a5c] text-white py-3.5 rounded-lg font-semibold text-sm hover:bg-[#15314d] transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* 区块 6：Notion 配置提示（低优先级，弱化样式，放页面下半区） */}
        {error && (
          <section className="py-10 bg-[#f9fafb] border-t border-gray-100">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <details className="rounded-lg border border-gray-200 bg-white p-5 text-sm">
                <summary className="flex items-center gap-2 cursor-pointer text-muted-foreground font-medium">
                  <AlertCircle className="w-4 h-4 text-amber-500" aria-hidden="true" />
                  Admin: Notion database setup (deployment only)
                </summary>
                <div className="mt-4 text-muted-foreground">
                  <p className="mb-3">
                    Connect your Notion database to automatically sync and display all uploaded blog articles:
                  </p>
                  <ol className="space-y-2 list-decimal list-inside">
                    <li>Open your Notion database page</li>
                    <li>
                      Click the <code className="bg-gray-100 px-1.5 py-0.5 rounded border text-xs">...</code> menu
                    </li>
                    <li>
                      Select <code className="bg-gray-100 px-1.5 py-0.5 rounded border text-xs">Add connections</code>
                    </li>
                    <li>Search and select your integration</li>
                    <li>Refresh this page</li>
                  </ol>
                </div>
              </details>
            </div>
          </section>
        )}

        {/* 区块 7：全站统一 4 大 Silo 底部导流 */}
        <SiloCrossLinks locale={locale} currentSlug="blog" />
      </main>

      {/* 区块 8：标准全站 Footer */}
      <Footer />
    </>
  )
}

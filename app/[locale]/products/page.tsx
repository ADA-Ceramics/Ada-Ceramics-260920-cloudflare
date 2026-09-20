import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Package, Layers, Gift, Settings, Zap, Clock, Award, Truck } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { QuoteForm } from "@/components/shared/quote-form"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// ============================================================
// SEO Metadata
// ============================================================
export const metadata: Metadata = {
  title: "Wholesale Ceramic Tableware | Factory Direct Manufacturing | ADA Ceramics",
  description: "Professional ceramic factory supplying wholesale plates, bowls, mugs and bakeware. FDA/LFGB certified, low MOQ, custom OEM/ODM available. Factory direct pricing for global wholesalers.",
  keywords: "wholesale ceramic, bulk tableware, ceramic plates, ceramic bowls, ceramic mugs, restaurant supplies, hotel dinnerware, OEM ceramic, FDA certified",
  openGraph: {
    title: "Wholesale Ceramic Tableware | ADA Ceramics",
    description: "Factory direct ceramic tableware for restaurants, hotels and catering businesses.",
    type: "website",
  },
}

// ============================================================
// 静态数据
// ============================================================

// Selling points
const sellingPoints = [
  { icon: Layers, title: "Low MOQ" },
  { icon: Gift, title: "Free Samples" },
  { icon: Settings, title: "Custom OEM/ODM" },
  { icon: Zap, title: "Fast Delivery" },
]

// Business solutions - SEO优化：alt文本包含业务场景、目标客户和产品特性
const businessSolutions = [
  {
    title: "Hotel & Restaurant Bulk Supplies",
    href: "/en/dinnerware",
    image: "/porcelain-tableware-for-hotel-restore.webp",
    alt: "Wholesale porcelain tableware for hotels and restaurants from China - bulk white ceramic plates bowls dinnerware sets for commercial foodservice B2B supplier"
  },
  {
    title: "Amazon & Retail Packaging",
    href: "/en/dinnerware",
    image: "/amazon-hotsell-ceramic.webp",
    alt: "Best-selling ceramic tableware for Amazon FBA and retail stores - trending stoneware plates bowls with retail-ready gift box packaging from China factory"
  },
  {
    title: "Wedding & Event Catering",
    href: "/en/bakeware",
    image: "/ceramic-plates-for-catering-service.webp",
    alt: "Elegant ceramic plates for wedding catering and event services - bulk porcelain dinnerware rental sets for banquets parties from China wholesale supplier"
  },
  {
    title: "Custom Corporate Gifting",
    href: "/en/table-decor-drinkware",
    image: "/ceramic-gift-mug.webp",
    alt: "Custom printed ceramic gift mugs for corporate branding OEM ODM - personalized promotional drinkware with company logo from China manufacturer"
  },
]

// Why choose us
const whyChooseUs = [
  { icon: Clock, title: "30+ Years Export to EU/US", href: "/about-us" },
  { icon: Award, title: "FDA/LFGB Certified", href: "/en/dinnerware" },
  { icon: Package, title: "Flexible MOQ & Fast Samples", href: "/en/oem-custom-ceramics" },
  { icon: Truck, title: "45-50Day On-Time Delivery", href: "/en/dinnerware" },
]

// FAQ
const faqItems = [
  {
    question: "Do your products meet FDA (US) and LFGB (EU) food contact safety standards?",
    answer: "Yes. All our ceramics pass FDA & LFGB lead/cadmium migration tests, with SGS/Intertek reports available.",
  },
  {
    question: "Are your ceramics microwave & dishwasher safe?",
    answer: "Most items are microwave & dishwasher safe; gold trim items are handwash only.",
  },
  {
    question: "What is your sample lead time and mass production delivery time?",
    answer: "Sample: Normally 10–15 days; Mass production: 45–55 days after sample approval.",
  },
  {
    question: "Can you do custom designs/logo? What's the MOQ?",
    answer: "Yes, OEM/ODM available. MOQ: 500–1000 pcs (depends on item).",
  },
  {
    question: "What's your packaging? Can you provide COC/DoC and test reports?",
    answer: "Safe export packaging (brown box/color box). We can provide SGS test reports as requested.",
  },
]

// ============================================================
// 客户端交互组件（四大主分类集合卡片）
// ============================================================
import { ProductCategoryTabs } from "./ProductCategoryTabs"

// ============================================================
// 页面组件
// ============================================================
interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function ProductsPage({ params }: PageProps) {
  const { locale } = await params

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-[#f5f3ef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href={`/${locale}`} className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Products</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-serif font-normal text-foreground mb-4">
            Wholesale Ceramic Tableware | Factory Direct Manufacturing
          </h1>
          <p className="text-muted-foreground mb-8 max-w-4xl">
            We are a professional ceramic factory supplying a full range of wholesale tableware. Our products include plates, bowls, coffee cup set & mugs and bakeware, all made with food-safe materials and durable glaze. We offer bulk orders, custom designs, low MOQ and fast delivery for global wholesalers.
          </p>

          {/* Selling Points */}
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 lg:gap-16">
            {sellingPoints.map((point) => {
              const IconComponent = point.icon
              return (
                <div key={point.title} className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full border-2 border-[#8b7355] flex items-center justify-center mb-3">
                    <IconComponent className="w-7 h-7 text-[#8b7355]" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm font-medium text-[#1a1a1a]">{point.title}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 四大主分类集合卡片组件，仅传locale */}
      <ProductCategoryTabs locale={locale} />

      {/* OEM定制入口按钮 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <Link
          href={`/${locale}/oem-custom-ceramics`}
          className="inline-flex px-5 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors"
        >
          Custom OEM & ODM Solutions
        </Link>
      </div>

      {/* Solutions For Your Business */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#8b7355] text-xs font-medium mb-3 tracking-widest uppercase">
              BUSINESS SOLUTIONS
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#1a1a1a]">
              Solutions For Your Business
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessSolutions.map((solution) => (
              <Link
                key={solution.title}
                href={`/${locale}${solution.href}`}
                className="group border border-[#e5e7eb] rounded-lg overflow-hidden bg-white hover:shadow-lg transition-all block"
              >
                <div className="aspect-[4/3] relative bg-[#f5f3ef]">
                  <Image
                    src={solution.image}
                    alt={solution.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-medium text-[#1a1a1a] group-hover:text-[#8b7355] transition-colors">
                    {solution.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* One-Stop Ceramic Tableware Sourcing */}
      <section className="py-16 bg-[#f5f3ef]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#1a1a1a] text-center mb-16">
            One-Stop Ceramic Tableware Sourcing
          </h2>

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-16">
            <div className="w-full md:w-1/2">
              <div className="aspect-[4/3] relative bg-[#e5e1db] rounded-xl overflow-hidden">
                <Image
                  src="/wholesale-ceramics-supplier.webp"
                  alt="China wholesale ceramic tableware supplier - complete product range including porcelain plates bowls mugs bakeware with professional 3D design prototyping and R&D services for B2B buyers"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-[#4b5563] leading-relaxed text-base">
                We supply a full range of daily-use ceramic tableware, including plates, bowls, coffee cups & mugs and bakeware to fully cover your product sourcing needs. Equipped with an in-house R&D team, we provide professional 3D design and 3D printing services to turn your original ideas and concepts into accurate visual drafts and real samples.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12 mb-16">
            <div className="w-full md:w-1/2">
              <div className="aspect-[4/3] relative bg-[#e5e1db] rounded-xl overflow-hidden">
                <Image
                  src="/color-glaze.webp"
                  alt="Ceramic decoration techniques from China manufacturer - underglaze color in-glaze overglaze decal transfer digital inkjet printing pad printing on porcelain stoneware tableware"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-[#4b5563] leading-relaxed text-base">
                We master complete ceramic decoration technologies such as underglaze color, in-glaze color, overglaze decal, digital inkjet printing and pad printing.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-1/2">
              <div className="aspect-[4/3] relative bg-[#e5e1db] rounded-xl overflow-hidden">
                <Image
                  src="/factory-building.webp"
                  alt="China ceramic tableware factory OEM ODM manufacturer - custom dinnerware production facility with quality control MOQ flexibility small trial orders bulk orders door-to-door shipping worldwide"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-[#4b5563] leading-relaxed text-base">
                We support full customization of colors, patterns, logos, packaging and private labels. Every procedure from design development, sample making to mass production is strictly controlled in our own factory. We accept both small trial orders and large bulk orders, and provide reliable door-to-door delivery services to simplify your entire purchasing process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#8b7355] text-xs font-medium mb-3 tracking-widest uppercase">
              OUR ADVANTAGES
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#1a1a1a]">
              Why Choose Us
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item) => {
              const IconComponent = item.icon
              return (
                <Link
                  key={item.title}
                  href={`/${locale}${item.href}`}
                  className="group flex flex-col items-center text-center p-6 border border-[#e5e7eb] rounded-lg bg-white hover:shadow-md hover:border-[#8b7355]/30 transition-all"
                >
                  <div className="w-14 h-14 bg-[#f5f3ef] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#8b7355]/10 transition-colors">
                    <IconComponent className="w-7 h-7 text-[#8b7355]" />
                  </div>
                  <h3 className="text-base font-medium text-[#1a1a1a] group-hover:text-[#8b7355] transition-colors">
                    {item.title}
                  </h3>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-[#f9fafb]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#8b7355] text-xs font-medium mb-3 tracking-widest uppercase">
              FAQ
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#1a1a1a]">
              Frequently Asked Questions
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-[#e5e7eb]">
                <AccordionTrigger className="text-left text-[#1a1a1a] font-medium py-5 hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#6b7280] pb-5">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Quote Form */}
      <QuoteForm />

      <Footer />
    </div>
  )
}

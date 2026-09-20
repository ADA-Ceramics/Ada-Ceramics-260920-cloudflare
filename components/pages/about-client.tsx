import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Award,
  Globe,
  ShieldCheck,
  Handshake,
  Building2,
  Users,
  Factory as FactoryIcon,
  Boxes,
} from "lucide-react"
import { Footer } from "@/components/layout/footer"
import { SiloBreadcrumb } from "@/components/silo/SiloBreadcrumb"
import { SiloFaq } from "@/components/silo/SiloFaq"
import { SiloCrossLinks } from "@/components/silo/SiloCrossLinks"
import type { SiloFaqItem } from "@/lib/silo/config"

const SITE_URL = "https://www.adaceramics.com"

interface AboutClientProps {
  locale: string
}

/** 品牌发展历程（30+ 年）*/
const MILESTONES = [
  { year: "1990", title: "Workshop Founded", desc: "Established in Chaozhou as a family-run ceramic workshop, laying the foundation of our craftsmanship heritage." },
  { year: "2008", title: "Automated Production", desc: "Introduced our first automated production lines, scaling capacity for international wholesale partners." },
  { year: "2012", title: "Global Certifications", desc: "Secured EU LFGB and US FDA certifications, opening access to regulated overseas markets." },
  { year: "2015", title: "OEM/ODM Division", desc: "Built a dedicated foreign-trade team to deliver tailored OEM/ODM programs for global brands." },
  { year: "2022", title: "ADA Ceramics Launched", desc: "Spun off as an independent brand focused on overseas B2B partnerships and supply reliability." },
  { year: "2024", title: "30+ Years Strong", desc: "Trusted by clients in 50+ countries, recognised for consistent quality and dependable delivery." },
]

/** 企业核心实力 */
const STRENGTHS = [
  { icon: Building2, label: "46,000 ㎡", desc: "Modern manufacturing base in Chaozhou, China's ceramic capital." },
  { icon: Users, label: "340+ Team", desc: "Skilled craftspeople, QC inspectors and trade specialists." },
  { icon: Globe, label: "50+ Countries", desc: "Reliable export experience across Europe, North America and beyond." },
  { icon: ShieldCheck, label: "FDA & LFGB", desc: "Food-safe compliance verified for international procurement." },
]

/** 经营理念 */
const PHILOSOPHY = [
  { icon: Award, title: "Quality First", desc: "Every order is held to consistent, audited standards from material to packaging." },
  { icon: Handshake, title: "Partnership Mindset", desc: "We act as a long-term supply partner, not a one-off vendor, for growing brands." },
  { icon: Globe, title: "Global Reliability", desc: "Transparent communication and dependable lead times keep your supply chain stable." },
]

/** 办公室 & 团队实景照片 */
const GALLERY = [
  { src: "/high-quality-ceramic-manufacturer.webp", alt: "ADA Ceramics professional manufacturing base in Chaozhou, China" },
  { src: "/factory-monitoring-system.webp", alt: "ADA Ceramics digital production monitoring and management system" },
  { src: "/ceramic-manufacturer.webp", alt: "ADA Ceramics experienced ceramic production team at work" },
  { src: "/wholesale-ceramics-supplier.webp", alt: "ADA Ceramics wholesale supplier warehouse and order fulfilment" },
]

/** 全球合作品牌客户墙（文字化呈现，避免使用未授权 logo）*/
const CLIENT_SECTORS = [
  "Hotel & Hospitality Groups",
  "Restaurant Chains",
  "Café & Coffee Brands",
  "Retail & Department Stores",
  "Homeware Importers",
  "E-commerce Sellers",
  "Promotional & Gifting Brands",
  "Wholesale Distributors",
]

/** 内链区块：4 大一级产品 Silo + 工厂页 + OEM 一级页 */
const INTERNAL_LINKS = [
  { slug: "dinnerware", label: "Dinnerware Collection" },
  { slug: "bakeware", label: "Bakeware Collection" },
  { slug: "table-decor-drinkware", label: "Table Decor & Drinkware" },
  { slug: "oem-custom-ceramics", label: "OEM Custom Ceramics" },
]

const FAQS: SiloFaqItem[] = [
  {
    q: "Is ADA Ceramics a manufacturer or a trading company?",
    a: "ADA Ceramics is a manufacturer-backed brand with our own 46,000 ㎡ production base in Chaozhou, China. This lets us control quality, pricing and lead times directly for our B2B partners.",
  },
  {
    q: "How many years of experience does ADA Ceramics have?",
    a: "Our manufacturing heritage spans 30+ years, beginning as a family workshop in 1990 and growing into an independent export brand serving clients in over 50 countries.",
  },
  {
    q: "What makes ADA Ceramics a reliable supply partner?",
    a: "We combine FDA and LFGB food-safe compliance, audited quality control, a dedicated foreign-trade team and consistent on-time delivery, supporting long-term wholesale and OEM partnerships.",
  },
  {
    q: "Can ADA Ceramics support brand and enterprise cooperation?",
    a: "Yes. We work with hotel groups, restaurant chains, retailers and importers worldwide, offering tailored OEM/ODM programs and dependable bulk supply for established and growing brands.",
  },
]

export function AboutClient({ locale }: AboutClientProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 2. Brand Hero Banner + H1 + slogan */}
      <section className="pt-32 pb-16 bg-[#f5f3ef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 1. Silo Breadcrumb */}
          <SiloBreadcrumb locale={locale} slug="about" label="About Us" />

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1a2e] leading-tight text-balance">
                About ADA Ceramics | Professional Ceramic Tableware Manufacturer &amp; Supplier
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
                A trusted, manufacturer-backed ceramic brand with 30+ years of heritage — partnering
                with global businesses through reliable supply, certified quality and dedicated service.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#8b7355] text-white text-sm font-semibold transition-colors hover:bg-[#735f45]"
                >
                  Partner With Us
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={`/${locale}/factory`}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg border border-[#1a1a2e]/20 text-[#1a1a2e] text-sm font-semibold transition-colors hover:bg-[#1a1a2e]/5"
                >
                  Explore Our Factory
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/high-quality-ceramic-manufacturer.webp"
                alt="ADA Ceramics professional ceramic tableware manufacturer and global supplier"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Brand 30+ Years Development History */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#8b7355] font-semibold mb-2">Our Journey</p>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1a2e] text-balance">
              30+ Years of Brand Development
            </h2>
          </div>
          <ol className="relative border-l-2 border-[#8b7355]/20 ml-3 space-y-10">
            {MILESTONES.map((m) => (
              <li key={m.year} className="relative pl-8">
                <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#8b7355] ring-4 ring-white" />
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="font-serif text-xl font-bold text-[#8b7355]">{m.year}</span>
                  <h3 className="text-lg font-semibold text-[#1a1a2e]">{m.title}</h3>
                </div>
                <p className="mt-1.5 text-muted-foreground leading-relaxed">{m.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. Enterprise Core Strength & Business Philosophy */}
      <section className="py-16 lg:py-20 bg-[#f5f3ef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#8b7355] font-semibold mb-2">Why Partner With Us</p>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1a2e] text-balance">
              Enterprise Core Strength &amp; Business Philosophy
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {STRENGTHS.map((s) => (
              <div key={s.label} className="bg-white rounded-xl p-6 text-center border border-black/5">
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-[#8b7355]/10 flex items-center justify-center">
                  <s.icon className="w-6 h-6 text-[#8b7355]" aria-hidden="true" />
                </div>
                <p className="font-serif text-xl font-bold text-[#1a1a2e]">{s.label}</p>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PHILOSOPHY.map((p) => (
              <div key={p.title} className="bg-white rounded-xl p-7 border border-black/5">
                <div className="w-12 h-12 mb-4 rounded-lg bg-[#1a1a2e]/5 flex items-center justify-center">
                  <p.icon className="w-6 h-6 text-[#1a1a2e]" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-[#1a1a2e] mb-2">{p.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Office & Team Real Photos Gallery */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#8b7355] font-semibold mb-2">Inside ADA Ceramics</p>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1a2e] text-balance">
              Our Office &amp; Team
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {GALLERY.map((img) => (
              <div key={img.src} className="relative aspect-square rounded-xl overflow-hidden shadow-sm">
                <Image
                  src={img.src || "/placeholder.svg"}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Global Cooperative Brand Client Wall */}
      <section className="py-16 lg:py-20 bg-[#f5f3ef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#8b7355] font-semibold mb-2">Trusted Worldwide</p>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1a2e] text-balance">
              Global Cooperative Brands &amp; Clients
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              We supply established brands and enterprises across diverse sectors worldwide.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CLIENT_SECTORS.map((sector) => (
              <div
                key={sector}
                className="flex items-center justify-center text-center min-h-20 rounded-xl bg-white border border-black/5 px-4 py-5 text-sm font-medium text-[#1a1a2e]"
              >
                {sector}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Internal Link Block: 4 L1 silos + Factory + OEM */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1a2e] mb-8 text-balance">
            Explore More About ADA Ceramics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {INTERNAL_LINKS.map((link) => (
              <Link
                key={link.slug}
                href={`/${locale}/${link.slug}`}
                className="group flex items-center justify-between rounded-xl border border-black/10 p-5 transition-colors hover:border-[#8b7355] hover:bg-[#f5f3ef]"
              >
                <span className="font-medium text-[#1a1a2e]">{link.label}</span>
                <ArrowRight className="w-4 h-4 text-[#8b7355] transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            ))}
            <Link
              href={`/${locale}/factory`}
              className="group flex items-center justify-between rounded-xl border border-black/10 p-5 transition-colors hover:border-[#8b7355] hover:bg-[#f5f3ef]"
            >
              <span className="inline-flex items-center gap-2 font-medium text-[#1a1a2e]">
                <FactoryIcon className="w-4 h-4 text-[#8b7355]" aria-hidden="true" />
                Our Factory
              </span>
              <ArrowRight className="w-4 h-4 text-[#8b7355] transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="group flex items-center justify-between rounded-xl border border-black/10 p-5 transition-colors hover:border-[#8b7355] hover:bg-[#f5f3ef]"
            >
              <span className="inline-flex items-center gap-2 font-medium text-[#1a1a2e]">
                <Boxes className="w-4 h-4 text-[#8b7355]" aria-hidden="true" />
                Contact Us
              </span>
              <ArrowRight className="w-4 h-4 text-[#8b7355] transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Brand Cooperation FAQ + FAQPage Schema */}
      <SiloFaq faqs={FAQS} />

      {/* 9. Unified 4-silo cross-link footer component */}
      <SiloCrossLinks locale={locale} currentSlug="about" />

      {/* 10. Bottom CTA to Contact */}
      <section className="py-16 lg:py-20 bg-[#f5f3ef]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1a2e] mb-4 text-balance">
            Ready to Build a Reliable Ceramic Partnership?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Talk to our team about wholesale supply, brand cooperation and OEM/ODM programs.
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[#8b7355] text-white font-semibold transition-colors hover:bg-[#735f45]"
          >
            Contact Us
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}

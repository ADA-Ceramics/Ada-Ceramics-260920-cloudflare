import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  CheckCircle2,
  Building2,
  Users,
  Cog,
  Gauge,
  ShieldCheck,
  PackageCheck,
  ClipboardCheck,
  Boxes,
} from "lucide-react"
import { Footer } from "@/components/layout/footer"
import { SiloBreadcrumb } from "@/components/silo/SiloBreadcrumb"
import { SiloFaq } from "@/components/silo/SiloFaq"
import { SiloCrossLinks } from "@/components/silo/SiloCrossLinks"
import type { SiloFaqItem } from "@/lib/silo/config"

interface FactoryClientProps {
  locale: string
}

/** 3. 工厂核心数据 */
const FACTORY_STATS = [
  { icon: Building2, value: "46,000 ㎡", label: "Factory Area" },
  { icon: Users, value: "340+", label: "Skilled Workers" },
  { icon: Cog, value: "13+", label: "Production Lines" },
  { icon: Gauge, value: "98%", label: "Quality Pass Rate" },
]

/** 4. 车间实拍画廊 */
const WORKSHOPS = [
  { src: "/factory-building.webp", alt: "ADA Ceramics ceramic manufacturing production line workshop", title: "Production Line" },
  { src: "/color-glaze.webp", alt: "ADA Ceramics glaze and surface decoration workshop", title: "Glaze Workshop" },
  { src: "/quality check.webp", alt: "ADA Ceramics quality control inspection room", title: "QC Inspection Room" },
  { src: "/custom-ceramic-tableware-logo-branding-services.webp", alt: "ADA Ceramics OEM custom ceramic tableware workshop", title: "OEM Custom Workshop" },
]

/** 5. 生产工序 + 质检 */
const PROCESS = [
  { step: 1, title: "Material Preparation", desc: "Selected kaolin and clay are processed and refined for stable, food-safe ceramic bodies." },
  { step: 2, title: "Forming & Shaping", desc: "Automated and manual forming lines shape each item to precise specifications." },
  { step: 3, title: "Glazing & Decoration", desc: "Even glazing and custom decoration applied under controlled conditions." },
  { step: 4, title: "High-Temp Firing", desc: "Advanced kilns fire products at controlled temperatures for durability." },
  { step: 5, title: "Strict QC Inspection", desc: "Multi-stage inspection covers dimensions, glaze, color and food-safety standards." },
  { step: 6, title: "Packaging & Shipping", desc: "Reinforced export packaging and efficient global logistics for bulk orders." },
]

const QC_POINTS = [
  "Incoming raw-material verification",
  "In-process dimensional & glaze checks",
  "Food-safety testing (FDA / LFGB)",
  "Lead & cadmium free assurance",
  "Pre-shipment full inspection",
  "Batch traceability for every order",
]

/** 6. 全球认证 */
const CERTS = [
  { name: "FDA", full: "U.S. Food & Drug Administration", desc: "Compliant with FDA food-contact regulations." },
  { name: "LFGB", full: "German Food Safety Standard", desc: "Meets German food-grade material requirements." },
  { name: "Sedex", full: "Supplier Ethical Data Exchange", desc: "Verified ethical trading practices." },
  { name: "BSCI", full: "Business Social Compliance", desc: "Certified social compliance standards." },
]

/** 7. 批量 & OEM 产能 */
const CAPACITY = [
  { icon: Boxes, title: "High-Volume Capacity", desc: "13+ production lines support large bulk orders with stable monthly output." },
  { icon: Cog, title: "OEM / ODM Production", desc: "In-house tooling, mold development and custom decoration for bespoke programs." },
  { icon: PackageCheck, title: "Flexible MOQ & Lead Times", desc: "Scalable runs and reliable scheduling tailored to your purchasing cycle." },
]

/** 8. 验厂 & 批发服务 */
const AUDIT_SERVICES = [
  "Third-party factory audit support (Sedex / BSCI ready)",
  "Sample development & pre-production approval",
  "Dedicated export & documentation team",
  "FOB / CIF flexible shipping terms from Chaozhou, China",
]

const FAQS: SiloFaqItem[] = [
  {
    q: "Where is the ADA Ceramics factory located?",
    a: "Our 46,000 ㎡ manufacturing base is located in Chaozhou, Guangdong — China's renowned ceramic production hub — with 13+ production lines and 340+ skilled workers.",
  },
  {
    q: "Can I arrange a factory visit or audit?",
    a: "Yes. We welcome in-person factory visits and support third-party audits such as Sedex and BSCI. Contact our team to schedule a visit or request audit documentation.",
  },
  {
    q: "What is your bulk order and OEM production capacity?",
    a: "With 13+ production lines we handle high-volume bulk orders and full OEM/ODM programs, including mold development, custom glazes and branded decoration with flexible MOQ and lead times.",
  },
  {
    q: "Which quality and food-safety certifications do you hold?",
    a: "Our production complies with FDA and LFGB food-safety standards and follows Sedex/BSCI social-compliance practices, with full pre-shipment inspection and a 98% quality pass rate.",
  },
]

export function FactoryClient({ locale }: FactoryClientProps) {
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

      {/* 2. Factory Hero + H1 + intro + Book Visit CTA */}
      <section className="pt-32 pb-16 bg-[#f5f3ef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 1. Silo Breadcrumb */}
          <SiloBreadcrumb locale={locale} slug="factory" label="Factory" />

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1a2e] leading-tight text-balance">
                ADA Ceramics Factory | China OEM Ceramic Tableware Manufacturing Factory
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
                A 46,000 ㎡ certified production base in Chaozhou with 13+ lines and 340+ workers —
                built for high-volume bulk orders, OEM/ODM programs and audited B2B supply.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#8b7355] text-white text-sm font-semibold transition-colors hover:bg-[#735f45]"
                >
                  Book a Factory Visit
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={`/${locale}/oem-custom-ceramics`}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg border border-[#1a1a2e]/20 text-[#1a1a2e] text-sm font-semibold transition-colors hover:bg-[#1a1a2e]/5"
                >
                  OEM Custom Service
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/factory-building.webp"
                alt="ADA Ceramics OEM ceramic tableware manufacturing factory in Chaozhou, China"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Factory Core Data */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {FACTORY_STATS.map((s) => (
              <div key={s.label} className="text-center rounded-xl border border-black/5 bg-[#f5f3ef] p-6">
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-[#8b7355]/10 flex items-center justify-center">
                  <s.icon className="w-6 h-6 text-[#8b7355]" aria-hidden="true" />
                </div>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-[#1a1a2e]">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Workshop Real Shot Gallery */}
      <section className="py-16 lg:py-20 bg-[#f5f3ef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#8b7355] font-semibold mb-2">Inside the Factory</p>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1a2e] text-balance">
              Workshop Real Shots
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WORKSHOPS.map((w) => (
              <div key={w.title} className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm">
                <Image
                  src={w.src || "/placeholder.svg"}
                  alt={w.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <span className="text-white text-sm font-medium">{w.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Production Process + Strict QC */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#8b7355] font-semibold mb-2">How We Produce</p>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1a2e] text-balance">
              Production Process &amp; Strict QC Inspection
            </h2>
          </div>

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {PROCESS.map((p) => (
              <li key={p.step} className="relative rounded-xl border border-black/10 p-6">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1a1a2e] text-white font-semibold">
                  {p.step}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-[#1a1a2e]">{p.title}</h3>
                <p className="mt-1.5 text-muted-foreground leading-relaxed">{p.desc}</p>
              </li>
            ))}
          </ol>

          <div className="rounded-2xl bg-[#f5f3ef] p-8 lg:p-10">
            <div className="flex items-center gap-3 mb-6">
              <ClipboardCheck className="w-6 h-6 text-[#8b7355]" aria-hidden="true" />
              <h3 className="text-xl font-semibold text-[#1a1a2e]">Strict Quality Control System</h3>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {QC_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#8b7355] shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-[#1a1a2e]">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Global Certifications */}
      <section className="py-16 lg:py-20 bg-[#f5f3ef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#8b7355] font-semibold mb-2">Compliance</p>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1a2e] text-balance">
              Global Certifications
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CERTS.map((c) => (
              <div key={c.name} className="bg-white rounded-2xl p-6 text-center border border-black/5">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#8b7355]/10 flex items-center justify-center">
                  <span className="font-serif text-xl font-bold text-[#8b7355]">{c.name}</span>
                </div>
                <h3 className="font-semibold text-[#1a1a2e] mb-2">{c.full}</h3>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Bulk Order & OEM Production Capacity */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#8b7355] font-semibold mb-2">Scale With Confidence</p>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1a2e] text-balance">
              Bulk Order &amp; OEM Production Capacity
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CAPACITY.map((c) => (
              <div key={c.title} className="rounded-xl border border-black/10 p-7">
                <div className="w-12 h-12 mb-4 rounded-lg bg-[#8b7355]/10 flex items-center justify-center">
                  <c.icon className="w-6 h-6 text-[#8b7355]" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-[#1a1a2e] mb-2">{c.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Factory Audit & Bulk Wholesale Service */}
      <section className="py-16 lg:py-20 bg-[#1a1a2e] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <ShieldCheck className="w-7 h-7 text-[#c9a87c]" aria-hidden="true" />
              <h2 className="font-serif text-2xl sm:text-3xl text-balance">
                Factory Audit &amp; Bulk Wholesale Service
              </h2>
            </div>
            <p className="text-white/70 leading-relaxed mb-6">
              From audit support to dedicated export documentation, we make large-scale sourcing
              transparent and dependable for global buyers.
            </p>
            <ul className="space-y-3">
              {AUDIT_SERVICES.map((s) => (
                <li key={s} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#c9a87c] shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-white/90">{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src="/factory-monitoring-system.webp"
              alt="ADA Ceramics factory audit and bulk wholesale production management system"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* 9. Internal Link: About / Contact / OEM Custom Silo */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1a2e] mb-8 text-balance">
            Continue Exploring
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { href: `/${locale}/about`, label: "About ADA Ceramics" },
              { href: `/${locale}/contact`, label: "Contact Us" },
              { href: `/${locale}/oem-custom-ceramics`, label: "OEM Custom Ceramics" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center justify-between rounded-xl border border-black/10 p-5 transition-colors hover:border-[#8b7355] hover:bg-[#f5f3ef]"
              >
                <span className="font-medium text-[#1a1a2e]">{link.label}</span>
                <ArrowRight className="w-4 h-4 text-[#8b7355] transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Factory Wholesale FAQ + Schema */}
      <SiloFaq faqs={FAQS} />

      {/* 11. Unified 4-silo cross-link footer component */}
      <SiloCrossLinks locale={locale} currentSlug="factory" />

      <Footer />
    </div>
  )
}

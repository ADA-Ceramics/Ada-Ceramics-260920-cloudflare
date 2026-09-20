import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface HomeFaqProps {
  locale: string
}

// 区块 9：全站统一 FAQ 简版 —— 4 条核心采购问题，答案自然植入 4 大 Silo 关键词，抢占精选片段
const FAQS = [
  {
    q: "What ceramic products do you supply for wholesale buyers?",
    a: "We manufacture four core lines: wholesale ceramic dinnerware (plates, bowls and sets), oven-safe bakeware, table decor drinkware (mugs, vases and jars) and full OEM custom ceramics, all FDA & LFGB certified for global Horeca and retail buyers.",
  },
  {
    q: "What is your minimum order quantity (MOQ)?",
    a: "Stock dinnerware, bakeware and table decor drinkware items start at 500 pieces per design, while fully custom OEM ceramics typically start from 1,000–3,000 pieces depending on logo, glaze and mold requirements.",
  },
  {
    q: "Can you produce custom branded ceramic tableware?",
    a: "Yes. Our OEM custom ceramics service covers custom logo printing, bespoke glaze colour, new mold development and private-label packaging across every dinnerware, bakeware and drinkware product line.",
  },
  {
    q: "Do you ship wholesale ceramic orders worldwide?",
    a: "We ship bulk ceramic tableware worldwide from Chaozhou, China on flexible FOB and CIF terms, with reinforced export packaging engineered for long-haul ocean freight and full export documentation.",
  },
]

export default function HomeFaq({ locale }: HomeFaqProps) {
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
    <section className="py-16 lg:py-24 bg-[#f5f3ef]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-[#8b7355] text-xs font-semibold uppercase tracking-widest mb-3">
            Procurement FAQ
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1a1a2e] text-balance">
            Wholesale Ceramic Tableware FAQs
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-xl border border-[#e7e2d8] bg-white px-5 py-4 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-medium text-[#1a1a2e]">
                {faq.q}
                <ArrowRight
                  className="w-4 h-4 shrink-0 text-[#8b7355] transition-transform group-open:rotate-90"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 text-sm text-[#6b6862] leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#8b7355] hover:underline"
          >
            Read the full wholesale FAQ &amp; buying guides
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}

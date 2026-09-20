import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import type { SiloFaqItem } from "@/lib/silo/config"

interface SiloFaqProps {
  faqs: SiloFaqItem[]
}

/**
 * FAQ 问答区块：5 条 B 端采购高频问答，抓取谷歌问答长尾词、适配精选片段。
 * 配套的 FAQPage Schema 在页面模板中统一注入。
 */
export function SiloFaq({ faqs }: SiloFaqProps) {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1a2e] mb-8 text-balance">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left font-medium text-[#1a1a2e]">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

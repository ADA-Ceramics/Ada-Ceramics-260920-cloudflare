import type { SiloConfig } from "@/lib/silo/config"

interface SiloSeoContentProps {
  seo: SiloConfig["seo"]
}

/**
 * SEO 正文长文本区（300-350 词）：二级 H2 标题，分采购场景、定制服务、资质物流三段，
 * 末尾添加 Silo 区分引导句，杜绝站内关键词内部竞争。
 */
export function SiloSeoContent({ seo }: SiloSeoContentProps) {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1a2e] mb-8 text-balance">
          {seo.h2}
        </h2>

        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <div>
            <h3 className="font-serif text-lg text-[#1a1a2e] mb-2">Procurement Scenarios</h3>
            <p className="text-pretty">{seo.procurementScenario}</p>
          </div>
          <div>
            <h3 className="font-serif text-lg text-[#1a1a2e] mb-2">Custom & OEM Services</h3>
            <p className="text-pretty">{seo.customService}</p>
          </div>
          <div>
            <h3 className="font-serif text-lg text-[#1a1a2e] mb-2">
              Certification & Logistics
            </h3>
            <p className="text-pretty">{seo.qualityLogistics}</p>
          </div>

          <p className="text-pretty border-l-4 border-[#8b7355] pl-4 text-[#1a1a2e]/80 italic">
            {seo.siloGuide}
          </p>
        </div>
      </div>
    </section>
  )
}

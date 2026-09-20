import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

interface BrandCasesProps {
  locale: string
}

// 区块 7：品牌合作案例区 —— 全部内链 OEM 案例 L3 页面，承接「custom ceramic brand manufacturer」长尾词
const CASE_STUDIES_HREF = "/oem-custom-ceramics/oem-odm-case-studies"

const CASES = [
  {
    title: "Retail Homeware Range",
    blurb: "End-to-end private-label tableware program from concept to shelf-ready production.",
    image: "/ceramic-retail.webp",
    alt: "retail private label ceramic homeware range OEM cooperation case",
  },
  {
    title: "Café & Hotel Program",
    blurb: "Coordinated branded drinkware and dinnerware for a global hospitality group.",
    image: "/ceramic-gift-mug.webp",
    alt: "branded café and hotel ceramic drinkware OEM cooperation case",
  },
  {
    title: "Designer ODM Collection",
    blurb: "Exclusive collection combining custom molds, signature glaze and gift packaging.",
    image: "/custom-ceramic-tableware-packaging-labeling-services.webp",
    alt: "designer ODM ceramic collection custom mold and packaging case study",
  },
  {
    title: "Ecommerce Bestseller Line",
    blurb: "High-volume private-label ceramic line developed for online marketplace brands.",
    image: "/amazon-hotsell-ceramic.webp",
    alt: "ecommerce private label ceramic bestseller OEM ODM case study",
  },
]

export default function BrandCases({ locale }: BrandCasesProps) {
  return (
    <section className="py-16 lg:py-24 bg-[#f5f3ef]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#8b7355] text-xs font-semibold uppercase tracking-widest mb-3">
            Trusted By Global Brands
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1a1a2e] text-balance">
            Global Brand OEM Cooperation Cases
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CASES.map((item) => (
            <Link
              key={item.title}
              href={`/${locale}${CASE_STUDIES_HREF}`}
              className="group flex flex-col rounded-2xl border border-[#e7e2d8] bg-white overflow-hidden transition-all hover:shadow-lg"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={480}
                  height={360}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col flex-1 p-5">
                <h3 className="font-serif text-lg text-[#1a1a2e] mb-2">{item.title}</h3>
                <p className="text-sm text-[#6b6862] leading-relaxed flex-1">{item.blurb}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#8b7355]">
                  View Case Study
                  <ArrowRight
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

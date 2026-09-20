import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

interface OemQuickEntryProps {
  locale: string
}

// 区块 6：OEM 定制服务快捷入口 —— 双栏图文，4 个快捷按钮直达 OEM L3 服务页，补强第四大 Silo 内链
const OEM_SERVICES = [
  { label: "Custom Logo Printing", href: "/oem-custom-ceramics/custom-logo-printing" },
  { label: "Custom Glaze & Color", href: "/oem-custom-ceramics/custom-glaze-color" },
  { label: "New Mold Development", href: "/oem-custom-ceramics/new-mold-development" },
  { label: "OEM Project Case Studies", href: "/oem-custom-ceramics/oem-odm-case-studies" },
]

const OEM_GALLERY = [
  { src: "/custom-ceramic-tableware-logo-branding-services.webp", alt: "custom logo printing on wholesale ceramic tableware OEM service" },
  { src: "/custom-color-glaze-ceramic.webp", alt: "custom glaze color development for private label ceramic tableware" },
  { src: "/ceramic-manufacturer.webp", alt: "new mold development tooling for custom OEM ceramic shapes" },
]

export default function OemQuickEntry({ locale }: OemQuickEntryProps) {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* 左：定制工艺实拍拼图 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden row-span-2">
              <Image
                src={OEM_GALLERY[0].src}
                alt={OEM_GALLERY[0].alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src={OEM_GALLERY[1].src}
                alt={OEM_GALLERY[1].alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src={OEM_GALLERY[2].src}
                alt={OEM_GALLERY[2].alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
          </div>

          {/* 右：OEM 文案 + 4 个 L3 服务快捷按钮 */}
          <div>
            <p className="text-[#8b7355] text-xs font-semibold uppercase tracking-widest mb-3">
              OEM / ODM Solutions
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1a1a2e] text-balance mb-5">
              Full Custom OEM &amp; ODM Ceramic Solutions
            </h2>
            <p className="text-base text-[#5a5750] leading-relaxed mb-8 max-w-xl">
              From custom logo printing and bespoke custom glaze color to new mold development and proven
              OEM project case studies, we turn your brand concept into shelf-ready ceramics. Low MOQ,
              in-house tooling and FDA/LFGB certified production for global private-label programs.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {OEM_SERVICES.map((service) => (
                <Link
                  key={service.href}
                  href={`/${locale}${service.href}`}
                  className="group inline-flex items-center justify-between gap-2 rounded-lg border border-[#e7e2d8] bg-[#faf8f4] px-4 py-3 text-sm font-medium text-[#1a1a2e] transition-colors hover:border-[#8b7355] hover:bg-white"
                >
                  {service.label}
                  <ArrowRight
                    className="w-4 h-4 text-[#8b7355] transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>

            <Link
              href={`/${locale}/oem-custom-ceramics`}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-[#8b7355] text-white text-sm font-semibold transition-colors hover:bg-[#735f45] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8b7355]"
            >
              Explore All Custom Solutions
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

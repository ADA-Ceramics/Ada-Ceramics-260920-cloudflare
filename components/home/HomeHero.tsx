import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ShieldCheck, Globe } from "lucide-react"

interface HomeHeroProps {
  locale: string
}

// 区块 2：全屏背景图 Hero —— 居中排版，承载页面唯一 H1，均衡覆盖 4 大 Silo 核心词根
export default function HomeHero({ locale }: HomeHeroProps) {
  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden">
      {/* 背景实景大图 —— next/image 优化 LCP：自动 preload + fetchPriority=high + AVIF/WebP 降级，priority 禁用懒加载 */}
      <Image
        src="/premium-beige-ceramic-plates-manufacturer.webp"
        alt="Premium Beige Ceramic Dinnerware wholesale Plates & Bowls Manufacturer"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        quality={70}
      className="object-cover" style={{opacity:0.7}}
      />
     
      {/* 居中内容 */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-28 lg:py-32 text-center">
        <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-[#e3dccf] rounded-full px-4 py-1.5 mb-7">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8b7355]" aria-hidden="true" />
          <span className="text-xs font-medium tracking-wide text-[#8b7355] uppercase">
            Wholesale &amp; Custom Ceramic
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl lg:text-[56px] leading-tight text-[#1a1a2e] whitesapace-nowrap ">
          Premium Ceramic Tableware
        </h1>
        <p className="font-serif text-2xl sm:text-4xl lg:text-[44px] leading-tight text-[#8b7355] text-balance mb-6">
          For Global Horeca &amp; Retail
        </p>

        <p className="text-base sm:text-lg text-[#5a5750] leading-relaxed mb-3 max-w-2xl mx-auto">
          Professional ceramic manufacturer offering FDA/LFGB certified dinnerware, custom OEM/ODM solutions, and worldwide shipping.
        </p>

        <p className="text-sm sm:text-base text-[#6b6862] leading-relaxed mb-9 max-w-2xl mx-auto">
         
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <Link
            href={`/${locale}/dinnerware`}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#1a1a2e] text-white text-sm font-semibold transition-colors hover:bg-[#2c2c4a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a1a2e]"
          >
            View Products
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-white/90 backdrop-blur-sm border border-[#1a1a2e]/15 text-[#1a1a2e] text-sm font-semibold transition-colors hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8b7355]"
          >
            Request Quote
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <span className="inline-flex items-center gap-2 text-sm text-[#6b6862]">
            <ShieldCheck className="w-4 h-4 text-[#8b7355]" aria-hidden="true" />
            FDA &amp; LFGB Certified
          </span>
          <span className="inline-flex items-center gap-2 text-sm text-[#6b6862]">
            <Globe className="w-4 h-4 text-[#8b7355]" aria-hidden="true" />
            Worldwide Bulk Shipping
          </span>
        </div>
      </div>
    </section>
  )
}

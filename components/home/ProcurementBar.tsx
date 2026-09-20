import Link from "next/link"
import { Boxes, ShieldCheck, Settings2, Ship } from "lucide-react"

interface ProcurementBarProps {
  locale: string
}

// 区块 4：B 端采购核心优势标签栏 —— 强化 E-E-A-T，锚文本内链对应 Silo / 资质内容
const TAGS = [
  {
    icon: Boxes,
    label: "Low Minimum MOQ",
    href: "/oem-custom-ceramics",
  },
  {
    icon: ShieldCheck,
    label: "FDA & LFGB Food Safe Certified",
    href: "/about",
  },
  {
    icon: Settings2,
    label: "Full OEM Custom Support",
    href: "/oem-custom-ceramics",
  },
  {
    icon: Ship,
    label: "Worldwide Bulk Shipping",
    href: "/contact",
  },
]

export default function ProcurementBar({ locale }: ProcurementBarProps) {
  return (
    <section className="py-12 bg-[#1a1a2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TAGS.map((tag) => {
            const Icon = tag.icon
            return (
              <Link
                key={tag.label}
                href={`/${locale}${tag.href}`}
                className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-4 transition-colors hover:bg-white/10 hover:border-white/25"
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#8b7355]/20 text-[#c9a87c] shrink-0">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium text-white leading-snug">{tag.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

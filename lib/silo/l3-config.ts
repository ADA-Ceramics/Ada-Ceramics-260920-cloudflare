import { getL2Config, type L2Config } from "@/lib/silo/l2-config"
import type { L3Detail } from "@/lib/silo/l3-products"
import type { SiloConfig, SiloFaqItem } from "@/lib/silo/config"

/**
 * L3 单品页「模板兜底」配置层（数据驱动，全站 L3 一键复用）。
 *
 * 设计原则（对齐验收标准）：
 * - 单品的图库 / 描述 / 规格 / 相关产品 → 始终来自 Supabase 真实数据（l3-products）。
 * - 当 Supabase 的 specifications / features / 单品 FAQ 缺失时 → 用「品类关键词 + B 端通用
 *   采购参数 / 问答」模板兜底，保证每个单品页内容完整、无空块。
 * - 文案、规格、CTA、内链全部由当前 L2/L1 config 参数化生成，替换品类即自动适配。
 */

const OEM_SILO = "oem-custom-ceramics"

/** OEM 定制服务分项（锚文本内链第四大 Silo 服务子页，承接定制询盘） */
export type OemService = { title: string; description: string; href: string }

export function getOemServices(locale: string): OemService[] {
  return [
    {
      title: "Custom Logo Printing",
      description:
        "Decal, pad-print and silk-screen branding to put your logo, brand mark or restaurant name on every piece.",
      href: `/${locale}/${OEM_SILO}/custom-logo-printing`,
    },
    {
      title: "Custom Glaze & Color",
      description:
        "Bespoke glaze matching and signature reactive or matte finishes developed to your Pantone references.",
      href: `/${locale}/${OEM_SILO}/custom-glaze-color`,
    },
    {
      title: "New Mold Development",
      description:
        "Exclusive shapes and proprietary tooling for fully owned, differentiated product designs.",
      href: `/${locale}/${OEM_SILO}/new-mold-development`,
    },
    {
      title: "Gift Box & Packaging",
      description:
        "Retail-ready gift boxes, sleeves and branded master cartons engineered for safe global shipping.",
      href: `/${locale}/${OEM_SILO}/oem-odm-case-studies`,
    },
  ]
}

/** 全站统一核心卖点标签 */
export const L3_SELLING_POINTS = [
  "Low MOQ",
  "LFGB & FDA Certified",
  "Oven Safe",
  "Custom Logo Available",
] as const

/**
 * 规格表兜底：当 Supabase 无 specifications 时，按 L2 品类关键词生成 B 端通用规格行。
 * 真实数据存在时优先用真实数据，仅缺失项不强行覆盖。
 */
export function buildSpecifications(
  detail: L3Detail,
  l2: L2Config,
): { label: string; value: string }[] {
  if (detail.specifications.length > 0) return detail.specifications

  const kw = l2.keyword
  return [
    { label: "Material", value: "High-fired stoneware / porcelain ceramic" },
    { label: "Capacity / Size", value: "Multiple sizes available on request" },
    { label: "Glaze", value: "Food-safe glaze; custom colors available" },
    { label: "Temperature", value: "Oven, microwave & dishwasher safe" },
    { label: "Certification", value: "FDA & LFGB food-contact certified" },
    { label: "MOQ", value: "From 500 pcs per design (lower for stock items)" },
    { label: "Customization", value: `Logo printing, glaze & shape OEM for ${kw}` },
    { label: "Packaging", value: "Standard export carton; gift box optional" },
  ]
}

/** 特性兜底：缺失时按品类生成 B 端通用卖点 */
export function buildFeatures(detail: L3Detail, l2: L2Config): string[] {
  if (detail.features.length > 0) return detail.features

  const kw = l2.keyword
  return [
    `Factory-direct wholesale ${kw} with transparent, competitive pricing`,
    "Thermal-shock resistant, chip-resistant high-fired ceramic body",
    "Food-safe, FDA & LFGB certified glazes for commercial use",
    "Full OEM/ODM: custom logo, glaze color, shape and gift packaging",
    "Stackable, space-efficient design suited to busy Horeca service",
  ]
}

/** 单品页唯一 H1 兜底（精准 B 端长尾采购词） */
export function buildH1(detail: L3Detail, l2: L2Config): string {
  const name = detail.name?.trim()
  if (name) return `${name} | Wholesale ${l2.label} for Restaurants & Bulk Buyers`
  return `Wholesale ${l2.label} for Restaurants, Hotels & Bulk Buyers`
}

/** 商用场景实拍图文区（承接场景搜索词，文字内链 L1/L2） */
export type L3Scenario = { title: string; description: string; href: string }

export function buildScenarios(locale: string, l2: L2Config): L3Scenario[] {
  const l2Href = `/${locale}/${l2.parentSlug}/${l2.slug}`
  const l1Href = `/${locale}/${l2.parentSlug}`
  const kw = l2.keyword
  return [
    {
      title: "Hotels & Fine Dining",
      description: `Elevate banquet and à la carte service with consistent, durable ${kw} built for high-volume hotel tabletop programs.`,
      href: l1Href,
    },
    {
      title: "Restaurants & Cafés",
      description: `Hard-wearing ${kw} that survives daily commercial dishwashing while keeping plating crisp and on-brand.`,
      href: l2Href,
    },
    {
      title: "Bakeries & Catering",
      description: `Oven-safe, stackable ${kw} for bakeries, central kitchens and catering companies sourcing in bulk.`,
      href: l2Href,
    },
  ]
}

/**
 * SEO 长文兜底：当无单品专属长文时，复用 L2 的三段式 SEO 结构（已含 Silo 隔离引导句），
 * 但替换 H2 为单品语义标题。直接复用 SiloSeoContent 组件渲染。
 */
export function buildSeo(detail: L3Detail, l2: L2Config): SiloConfig["seo"] {
  const name = detail.name?.trim() || l2.label
  return {
    ...l2.seo,
    h2: `Bulk Wholesale Custom Ceramic ${name} Manufacturing`,
  }
}

/**
 * 单品专属 FAQ 兜底：缺乏单品级 FAQ 时，基于品类关键词生成精准采购问答
 * （捕获问答长尾词 + 精选片段），并保留 L2 的通用问答补足条数。
 */
export function buildFaqs(detail: L3Detail, l2: L2Config): SiloFaqItem[] {
  const kw = l2.keyword
  const name = detail.name?.trim() || l2.label
  const productFaqs: SiloFaqItem[] = [
    {
      q: `What is the MOQ for custom logo ${kw}?`,
      a: `Custom-branded ${name.toLowerCase()} typically starts at 500–1,000 pieces per design, with lower MOQs available on in-stock items. Send your artwork and target quantity for an exact quote.`,
    },
    {
      q: `Are these ceramic ${kw} dishwasher and oven safe?`,
      a: `Yes. Our high-fired ${name.toLowerCase()} are commercial dishwasher safe and, where the form allows, oven and microwave safe. Exact thermal limits are confirmed on your final spec sheet.`,
    },
    {
      q: `Can I mix different glaze colors or sizes in one bulk order?`,
      a: `Absolutely. We support mixed glaze colors and assorted sizes within a single production run, subject to per-variant minimums—ideal for building a coordinated tabletop range.`,
    },
    {
      q: `Do you provide FDA / LFGB certification for ${kw}?`,
      a: `All food-contact ${name.toLowerCase()} are produced with FDA and LFGB certified glazes, and we can supply test reports to support customs clearance and retail compliance.`,
    },
  ]

  // 用 L2 通用问答补足到 5 条，避免空块
  const merged = [...productFaqs]
  for (const f of l2.faqs) {
    if (merged.length >= 5) break
    if (!merged.some((m) => m.q === f.q)) merged.push(f)
  }
  return merged.slice(0, 5)
}

/** 取主 CTA 报价链接（站内无 /oem-quote，统一指向 OEM 第四大 Silo，杜绝 404） */
export function getQuoteHref(locale: string): string {
  return `/${locale}/${OEM_SILO}`
}

/** 便捷：校验 L2 是否存在（路由层用） */
export function getL3L2Config(parentSlug: string, l2Slug: string): L2Config | undefined {
  return getL2Config(parentSlug, l2Slug)
}

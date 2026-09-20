// ============================================================================
// OEM 服务页（L3 扁平三级 URL：/oem-custom-ceramics/{slug}）专属内容配置。
// 仅新增，不改动 lib/silo/l2-config.ts 与任何原有配置。
// 复用现有 L2 OEM 配置（oemLogoPrinting 等）的 seo / faqs / banner 数据，
// 在其之上补充服务页特有的模块数据：实拍图库、工厂全流程、品牌案例。
// 主 CTA 报价统一指向 /contact（站内无 /oem-quote 路由，遵循既定决策）。
// ============================================================================

import { getL2Config, getL2ConfigsByParent, type L2Config } from "@/lib/silo/l2-config"

export const OEM_PARENT_SLUG = "oem-custom-ceramics"
export const OEM_PARENT_LABEL = "OEM Custom Ceramics"

/** 案例页 slug（保留站内现有 slug，避免破坏已建路由 / sitemap / 导航） */
export const OEM_CASE_STUDIES_SLUG = "oem-odm-case-studies"

export type OemGalleryImage = {
  src: string
  /** 细分定制长尾关键词 alt */
  alt: string
}

export type OemWorkflowStep = {
  title: string
  description: string
  /** 流程节点锚文本内链对应的 OEM 服务 slug（不含父级前缀），可选 */
  linkSlug?: string
}

export type OemServiceExtras = {
  /** 模块4 实拍案例图库（每张 alt 植入细分长尾词） */
  gallery: OemGalleryImage[]
  /** 模块6 客户项目案例卡片（全部内链案例页） */
  caseHighlights: { title: string; blurb: string }[]
  /** 模块8 底部促单文案 */
  closingPitch: string
}

/**
 * 模块5 一站式 OEM 工厂全流程（全服务页通用，节点内链开模/打样 L3 服务页）。
 * Online Inquiry → Custom Sample Making → New Mold Development → Mass Production → Global Delivery
 */
export const OEM_WORKFLOW: OemWorkflowStep[] = [
  {
    title: "Online Inquiry",
    description:
      "Share your concept, target specs, artwork and volumes. A dedicated project manager scopes the program and confirms feasibility, MOQ and lead time.",
  },
  {
    title: "Custom Sample Making",
    description:
      "We produce pre-production samples for colour, glaze and branding sign-off before any bulk commitment, refining against your approval.",
    linkSlug: "custom-glaze-color",
  },
  {
    title: "New Mold Development",
    description:
      "For proprietary shapes, our in-house tooling team engineers master and production molds from your drawings, CAD or reference samples.",
    linkSlug: "new-mold-development",
  },
  {
    title: "Mass Production",
    description:
      "Approved samples move to scaled production under strict QC, FDA/LFGB certification and batch inspection across every run.",
    linkSlug: "custom-logo-printing",
  },
  {
    title: "Global Delivery",
    description:
      "Reinforced export packaging, full documentation and worldwide shipping from Chaozhou, China on flexible FOB and CIF terms.",
  },
]

/** 模块3 横向导流的三大产品 Silo（打通产品与定制服务语义关联） */
export const OEM_APPLICABLE_COLLECTIONS = [
  {
    slug: "dinnerware",
    title: "Dinnerware",
    blurb: "Plates, bowls, sets and serve dishes for restaurants, hotels and retail brands.",
    keyword: "custom dinnerware collection",
    image: "/ceramic-plates-for-catering-service.webp",
  },
  {
    slug: "bakeware",
    title: "Bakeware",
    blurb: "Ramekins, baking dishes and loaf, pie & pizza pans engineered for oven use.",
    keyword: "custom bakeware collection",
    image: "/kiln-transformation.webp",
  },
  {
    slug: "table-decor-drinkware",
    title: "Table Decor & Drinkware",
    blurb: "Cups, mugs, vases, jars, trays and candle holders for branded programs.",
    keyword: "custom table decor and drinkware collection",
    image: "/ceramic-gift-mug.webp",
  },
] as const

// ----------------------------------------------------------------------------
// 每个 OEM 服务页特有内容（键为 L2 slug）
// ----------------------------------------------------------------------------

const EXTRAS: Record<string, OemServiceExtras> = {
  "custom-logo-printing": {
    gallery: [
      { src: "/custom-ceramic-tableware-logo-branding-services.webp", alt: "custom logo printing on ceramic mugs for branded Horeca wholesale" },
      { src: "/ceramic-gift-mug.webp", alt: "custom logo decal branded ceramic gift mug OEM sample" },
      { src: "/custom-ceramic-tableware-packaging-labeling-services.webp", alt: "branded ceramic tableware custom packaging and logo labeling" },
      { src: "/ceramic-retail.webp", alt: "private label logo printed ceramic retail tableware range" },
    ],
    caseHighlights: [
      { title: "Branded Café Mug Program", blurb: "Full-wrap decal logo printing across a multi-SKU café drinkware launch." },
      { title: "Hotel Tableware Branding", blurb: "Discreet pad-printed crests on plates and bowls for a boutique hotel group." },
      { title: "Promotional Gift Mugs", blurb: "Gold metallic decals on gift mugs for a corporate promotional campaign." },
    ],
    closingPitch:
      "Turn stock or bespoke ceramics into fully branded product with dishwasher-durable, food-safe logo printing. Low MOQs, free sampling and worldwide delivery.",
  },
  "custom-glaze-color": {
    gallery: [
      { src: "/custom-color-glaze-ceramic.webp", alt: "custom glaze and colour development on private label ceramic tableware" },
      { src: "/color-glaze.webp", alt: "reactive gradient custom glaze ceramic sample for OEM brands" },
      { src: "/kiln-transformation.webp", alt: "kiln-fired custom matte glaze ceramic finish development" },
      { src: "/premium_beige_ceramic_plate_.webp", alt: "brand colour matched satin glaze ceramic plate OEM sample" },
    ],
    caseHighlights: [
      { title: "Signature Reactive Glaze", blurb: "Exclusive reactive gradient finish developed for a designer tableware line." },
      { title: "Brand Colour Match", blurb: "Pantone-matched solid colour range for a retail homeware collection." },
      { title: "Matte Hospitality Range", blurb: "Durable matte satin glaze engineered for a hotel dining program." },
    ],
    closingPitch:
      "Define your range with a bespoke, food-safe glaze engineered for consistency reorder after reorder. Low MOQs, fast glaze trials and global shipping.",
  },
  "new-mold-development": {
    gallery: [
      { src: "/ceramic-manufacturer.webp", alt: "new mold development for exclusive custom ceramic shape tooling" },
      { src: "/high-quality-ceramic-manufacturer.webp", alt: "production tooling for proprietary ceramic design OEM development" },
      { src: "/factory-monitoring-system.webp", alt: "in-house ceramic mold engineering and dimensional inspection" },
      { src: "/chinese-ceraimc-manufacturer.webp", alt: "bespoke ceramic shape pre-production sample from new mold" },
    ],
    caseHighlights: [
      { title: "Proprietary Bowl Shape", blurb: "Custom-engineered organic bowl form developed from a designer's CAD files." },
      { title: "Exclusive Mug Tooling", blurb: "Dedicated production molds for a brand's signature handle profile." },
      { title: "Sculptural Decor Piece", blurb: "Complex multi-part tooling for a sculptural table decor collection." },
    ],
    closingPitch:
      "Bring an exclusive shape to life with in-house tooling engineered for manufacturability. Low MOQs, validated prototyping and worldwide delivery.",
  },
  "oem-odm-case-studies": {
    gallery: [
      { src: "/custom-ceramic-tableware-packaging-labeling-services.webp", alt: "OEM ODM private label ceramic project packaging case study" },
      { src: "/ceramic-retail.webp", alt: "retail private label ceramic range OEM ODM project sample" },
      { src: "/wholesale-ceramics-supplier.webp", alt: "wholesale branded ceramic program delivered for global buyer" },
      { src: "/amazon-hotsell-ceramic.webp", alt: "ecommerce private label ceramic collection OEM ODM case study" },
    ],
    caseHighlights: [
      { title: "Retail Homeware Range", blurb: "End-to-end private-label tableware range from concept to shelf-ready production." },
      { title: "Café & Hotel Program", blurb: "Coordinated branded drinkware and dinnerware for a hospitality group." },
      { title: "Designer Collection", blurb: "Exclusive ODM collection combining custom molds, glaze and packaging." },
    ],
    closingPitch:
      "See how we scale private-label programs from pilot runs to full container production, then start your own. Low MOQs, free sampling and global delivery.",
  },
}

export type OemServicePageData = L2Config & {
  extras: OemServiceExtras
  workflow: OemWorkflowStep[]
}

/** 取单个 OEM 服务页完整数据（L2 配置 + 服务页特有内容） */
export function getOemServicePage(slug: string): OemServicePageData | undefined {
  const base = getL2Config(OEM_PARENT_SLUG, slug)
  const extras = EXTRAS[slug]
  if (!base || !extras) return undefined
  return { ...base, extras, workflow: OEM_WORKFLOW }
}

/** 取全部 OEM 服务页（模块9 同 Silo 互通卡片 + 页脚批量内链 + 静态参数） */
export function getAllOemServicePages(): OemServicePageData[] {
  return getL2ConfigsByParent(OEM_PARENT_SLUG)
    .filter((c) => EXTRAS[c.slug])
    .map((c) => ({ ...c, extras: EXTRAS[c.slug], workflow: OEM_WORKFLOW }))
}

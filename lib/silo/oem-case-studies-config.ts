// ============================================================================
// OEM & ODM 项目案例页（L3：/oem-custom-ceramics/oem-odm-case-studies）专属数据。
// 仅新增，不改动任何现有配置；案例素材仅用于本页筛选展示，绝不混入普通批发单品。
// ============================================================================

/** 行业筛选维度 */
export type CaseIndustry = "hotel" | "restaurant" | "gift-brand"
/** 定制工艺筛选维度（对应 3 个 OEM L3 服务页 slug） */
export type CaseProcess = "custom-logo-printing" | "custom-glaze-color" | "new-mold-development"
/** 产品品类筛选维度（对应 3 大产品 Silo L1 slug） */
export type CaseCategory = "dinnerware" | "bakeware" | "table-decor-drinkware"

export type OemProjectCase = {
  id: string
  title: string
  /** 卡片图，统一 1600×1000 WebP */
  image: string
  /** 标准化 alt：OEM custom ceramic [品类] project case for global Horeca brand bulk wholesale */
  alt: string
  industry: CaseIndustry
  process: CaseProcess
  category: CaseCategory
  /** 客户/市场背景（脱敏，不虚构具体品牌名） */
  client: string
  region: string
  /** 卡片摘要 */
  summary: string
  /** 展开后的完整项目详情要点 */
  details: {
    moq: string
    leadTime: string
    scope: string[]
  }
}

export const CASE_INDUSTRIES: { value: CaseIndustry; label: string }[] = [
  { value: "hotel", label: "Hotel" },
  { value: "restaurant", label: "Restaurant & Café" },
  { value: "gift-brand", label: "Gift & Retail Brand" },
]

export const CASE_PROCESSES: { value: CaseProcess; label: string }[] = [
  { value: "custom-logo-printing", label: "Custom Logo Printing" },
  { value: "custom-glaze-color", label: "Custom Glaze & Color" },
  { value: "new-mold-development", label: "New Mold Development" },
]

export const CASE_CATEGORIES: { value: CaseCategory; label: string }[] = [
  { value: "dinnerware", label: "Dinnerware" },
  { value: "bakeware", label: "Bakeware" },
  { value: "table-decor-drinkware", label: "Table Decor & Drinkware" },
]

/** 本页全部 OEM/ODM 定制项目案例（仅定制项目，非普通批发单品） */
export const OEM_PROJECT_CASES: OemProjectCase[] = [
  {
    id: "boutique-hotel-dinnerware",
    title: "Boutique Hotel Signature Dinnerware",
    image: "/porcelain-tableware-for-hotel-restore.webp",
    alt: "OEM custom ceramic dinnerware project case for global Horeca brand bulk wholesale",
    industry: "hotel",
    process: "new-mold-development",
    category: "dinnerware",
    client: "Boutique Hotel Group",
    region: "Middle East",
    summary:
      "Exclusive coupe plate and bowl shapes engineered from the group's design brief for a multi-property dining rollout.",
    details: {
      moq: "3,000 pcs / shape",
      leadTime: "55 days after sample approval",
      scope: ["New mold development", "Reactive matte glaze", "Discreet pad-printed crest", "Reinforced export packaging"],
    },
  },
  {
    id: "restaurant-plate-program",
    title: "Fine-Dining Restaurant Plate Program",
    image: "/porcelain-tableware-for-restaurants.webp",
    alt: "OEM custom ceramic dinnerware project case for global Horeca brand bulk wholesale",
    industry: "restaurant",
    process: "custom-glaze-color",
    category: "dinnerware",
    client: "Restaurant Group",
    region: "Western Europe",
    summary:
      "Pantone-matched satin glaze across a coordinated plate and serve-dish range built for heavy commercial use.",
    details: {
      moq: "2,000 pcs / design",
      leadTime: "45 days after sample approval",
      scope: ["Brand colour matching", "Commercial-grade glaze", "Chip-resistant body", "Batch QC & LFGB testing"],
    },
  },
  {
    id: "cafe-branded-mugs",
    title: "Branded Café Drinkware Launch",
    image: "/coffee-cup-cafe.webp",
    alt: "OEM custom ceramic table decor and drinkware project case for global Horeca brand bulk wholesale",
    industry: "restaurant",
    process: "custom-logo-printing",
    category: "table-decor-drinkware",
    client: "Specialty Café Chain",
    region: "North America",
    summary:
      "Full-wrap decal logo printing across a multi-SKU mug and cup program rolled out to dozens of café locations.",
    details: {
      moq: "1,000 pcs / SKU",
      leadTime: "35 days after artwork sign-off",
      scope: ["Full-wrap decal printing", "Dishwasher-durable inks", "Multi-SKU coordination", "Retail-ready cartons"],
    },
  },
  {
    id: "gift-brand-mug-set",
    title: "Promotional Gift Mug Collection",
    image: "/ceramic-gift-mug.webp",
    alt: "OEM custom ceramic table decor and drinkware project case for global Horeca brand bulk wholesale",
    industry: "gift-brand",
    process: "custom-logo-printing",
    category: "table-decor-drinkware",
    client: "Corporate Gifting Brand",
    region: "Western Europe",
    summary:
      "Gold metallic decals and bespoke gift-box packaging for a seasonal corporate promotional campaign.",
    details: {
      moq: "1,000 pcs / design",
      leadTime: "38 days after artwork sign-off",
      scope: ["Gold metallic decals", "Custom gift packaging", "Colour-matched bodies", "FOB & CIF shipping"],
    },
  },
  {
    id: "retail-private-label-range",
    title: "Retail Private-Label Tableware Range",
    image: "/ceramic-retail.webp",
    alt: "OEM custom ceramic dinnerware project case for global Horeca brand bulk wholesale",
    industry: "gift-brand",
    process: "custom-glaze-color",
    category: "dinnerware",
    client: "Homeware Retailer",
    region: "Oceania",
    summary:
      "End-to-end private-label range taken from concept to shelf-ready production with a signature glaze palette.",
    details: {
      moq: "2,000 pcs / colourway",
      leadTime: "50 days after sample approval",
      scope: ["Range design support", "Custom glaze palette", "Private-label branding", "Shelf-ready packaging"],
    },
  },
  {
    id: "hotel-bakeware-ramekins",
    title: "Hotel Banquet Bakeware Set",
    image: "/wholesale-bakeware.webp",
    alt: "OEM custom ceramic bakeware project case for global Horeca brand bulk wholesale",
    industry: "hotel",
    process: "new-mold-development",
    category: "bakeware",
    client: "Hotel Banqueting Group",
    region: "Southeast Asia",
    summary:
      "Custom ramekins and oven-to-table baking dishes engineered for thermal-shock resistance and stacking.",
    details: {
      moq: "3,000 pcs / shape",
      leadTime: "55 days after sample approval",
      scope: ["New mold development", "Thermal-shock body", "Stackable geometry", "Strict batch inspection"],
    },
  },
  {
    id: "designer-reactive-glaze",
    title: "Designer Reactive-Glaze Decor Collection",
    image: "/custom-color-glaze-ceramic.webp",
    alt: "OEM custom ceramic table decor and drinkware project case for global Horeca brand bulk wholesale",
    industry: "gift-brand",
    process: "custom-glaze-color",
    category: "table-decor-drinkware",
    client: "Independent Design Studio",
    region: "Western Europe",
    summary:
      "Exclusive reactive gradient glaze developed for a limited designer vase and decor collection.",
    details: {
      moq: "1,500 pcs / design",
      leadTime: "48 days after sample approval",
      scope: ["Reactive glaze R&D", "Shade consistency control", "Designer collaboration", "Premium packaging"],
    },
  },
  {
    id: "ecommerce-amazon-range",
    title: "E-commerce Private-Label Dinner Set",
    image: "/amazon-hotsell-ceramic.webp",
    alt: "OEM custom ceramic dinnerware project case for global Horeca brand bulk wholesale",
    industry: "gift-brand",
    process: "custom-logo-printing",
    category: "dinnerware",
    client: "Online Marketplace Seller",
    region: "North America",
    summary:
      "Branded dinner set with logo-printed packaging optimised for marketplace fulfilment and unboxing.",
    details: {
      moq: "2,000 pcs / set",
      leadTime: "42 days after artwork sign-off",
      scope: ["Logo-printed packaging", "Drop-test cartons", "Barcode & labelling", "Marketplace-ready kits"],
    },
  },
  {
    id: "restaurant-serving-bowls",
    title: "Restaurant Signature Serving Bowls",
    image: "/wholesale-bowls.webp",
    alt: "OEM custom ceramic dinnerware project case for global Horeca brand bulk wholesale",
    industry: "restaurant",
    process: "new-mold-development",
    category: "dinnerware",
    client: "Casual Dining Chain",
    region: "Middle East",
    summary:
      "Proprietary deep serving-bowl shape developed for a signature menu format across the chain.",
    details: {
      moq: "3,000 pcs / shape",
      leadTime: "55 days after sample approval",
      scope: ["New mold development", "Ergonomic stacking", "Durable commercial glaze", "Container production"],
    },
  },
]

/** 合作品牌 LOGO 墙（脱敏行业背书，强化 E-E-A-T；不虚构真实品牌名） */
export const CASE_BRAND_WALL: { name: string; sector: string }[] = [
  { name: "Global Hotel Group", sector: "Hospitality" },
  { name: "European Café Chain", sector: "Food Service" },
  { name: "Homeware Retailer", sector: "Retail" },
  { name: "Corporate Gifting Co.", sector: "Promotional Gifts" },
  { name: "Fine-Dining Group", sector: "Restaurants" },
  { name: "Design Studio", sector: "Designer Collections" },
]

/** 海外客户真实采购反馈（承接 reliable ceramic manufacturer 长尾信任词） */
export const CASE_REVIEWS: { quote: string; author: string; role: string; image: string; alt: string }[] = [
  {
    quote:
      "ADA handled our hotel dinnerware program end to end. The custom molds and glaze matched our brief exactly, and every container arrived on schedule. A genuinely reliable ceramic manufacturer.",
    author: "Procurement Director",
    role: "Boutique Hotel Group, Middle East",
    image: "/porcelain-tableware-for-hotel-restore.webp",
    alt: "OEM custom ceramic dinnerware project case for global Horeca brand bulk wholesale",
  },
  {
    quote:
      "Our branded café mugs came out perfectly. Low MOQs let us launch across all locations, and the logo printing has held up through thousands of dishwasher cycles.",
    author: "Operations Manager",
    role: "Specialty Café Chain, North America",
    image: "/coffee-cup-cafe.webp",
    alt: "OEM custom ceramic table decor and drinkware project case for global Horeca brand bulk wholesale",
  },
  {
    quote:
      "From sampling to shelf-ready packaging, the team managed our private-label range professionally. Quality and compliance documentation were exactly what our retail buyers needed.",
    author: "Brand Owner",
    role: "Homeware Retailer, Oceania",
    image: "/ceramic-retail.webp",
    alt: "OEM custom ceramic dinnerware project case for global Horeca brand bulk wholesale",
  },
]

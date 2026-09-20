// ============================================================================
// L2 二级分类集合页配置（数据驱动，单一通用模板复用全站所有 L2 子分类）
// 仅新增，不改动 lib/silo/config.ts 与任何原有 L1 配置。
// 复用 L1 的 seo / procurement / faqs 数据结构，从而 100% 复用现有 silo 组件：
//   SiloSeoContent / SiloProcurementTags / SiloFaq / SiloCrossLinks
// 图片 alt 统一模板沿用 lib/silo/config.ts 的 buildAlt()。
// ============================================================================

import type { SiloConfig, SiloFaqItem } from "@/lib/silo/config"

export type L2Config = {
  /** 所属 L1 Silo slug（用于面包屑上链 + 跨 Silo 高亮） */
  parentSlug: string
  /** L1 显示名（面包屑中间段） */
  parentLabel: string
  /** L2 路由 slug（拼接为 /{parentSlug}/{slug}） */
  slug: string
  /** L2 显示名（面包屑末段 / H1 兜底） */
  label: string
  /**
   * 当前 L2 对应的 Supabase 分类 slug（候选，严格隔离仅查当前细分品类）。
   * 多候选用于兼容历史 slug，命中第一个有数据的即可，绝不混入其它品类。
   */
  productCategorySlugs: string[]
  /** 细分品类核心关键词，用于图片 alt 模板 */
  keyword: string
  /** 页面唯一 H1 */
  h1: string
  /** 独立 meta title（站点 layout 会自动追加品牌名，无需手动拼） */
  metaTitle: string
  /** 独立 meta description */
  metaDescription: string
  metaKeywords: string
  /** 细分合集 Banner 图（复用站点现有 WebP 资源） */
  bannerImage: string
  /** 细分简介（约 60-90 词，B 端口吻） */
  intro: string
  /** 300 词 L2 专属 SEO 长文（复用 SiloSeoContent 结构，末段自带 Silo 隔离结束语） */
  seo: SiloConfig["seo"]
  /** 采购优势标签（复用 SiloProcurementTags 结构） */
  procurement: SiloConfig["procurement"]
  /** 细分专属 FAQ（复用 SiloFaq + FAQPage Schema） */
  faqs: SiloFaqItem[]
}

// ----------------------------------------------------------------------------
// Bakeware（烘焙）Silo —— 通用 L2 模板的标准落地样例
// ----------------------------------------------------------------------------

const ramekinBowls: L2Config = {
  parentSlug: "bakeware",
  parentLabel: "Bakeware",
  slug: "ramekin-bowls",
  label: "Wholesale Ramekin Bowls",
  productCategorySlugs: ["ramekins"],
  keyword: "ramekin bowls",
  h1: "Wholesale Ceramic Ramekin Bowls for Soufflé, Crème Brûlée & Commercial Catering",
  metaTitle: "Wholesale Ceramic Ramekin Bowls | Bulk Oven-Safe Bakeware Supplier",
  metaDescription:
    "Bulk oven-safe ceramic ramekins direct from Chaozhou factory. Ideal for soufflés, dipping sauces & restaurant catering. FDA-approved wholesale pricing.",
  metaKeywords:
    "wholesale ramekins, bulk ceramic ramekins, ceramic ramekin bowls supplier, commercial baking ramekins, oven-safe ramekins, soufflé ramekins wholesale, crème brûlée dishes bulk, dipping sauce pots wholesale, OEM custom branded ramekins, FDA LFGB ramekins",
  bannerImage: "/white-ceramic-ramekins-bakeware-subcat-wholesale.webp",
  intro:
    "ADA Ceramics offers oven-safe ceramic ramekin bowls in commercial sizes for soufflés, crème brûlée, dipping sauces and daily catering. High-fired for thermal shock resistance, easy to clean, with low MOQs, bulk order options and full OEM/ODM branding support for wholesale buyers.",
  seo: {
    h2: "Oven-Safe Wholesale Ramekin Bowls Built for Commercial Daily Service",
    procurementScenario:
      "Restaurants, patisseries, hotels and caterers depend on ramekins that move straight from oven to table and back through the dishwasher without crazing or cracking.  Our ceramic ramekin bowls are fired at high temperature for even heat retention and reliable thermal-shock resistance, so soufflés rise evenly, crème brûlée sets consistently and portioned sides plate beautifully. Standard 2oz to 8oz capacities let buyers cover dipping sauces, condiments, baked starters and dessert programs from a single durable range,lowering breakage costs across busy service.ideal for high-volume bulk order needs",
    customService:
      "As a full OEM/ODM manufacturer we customize ramekin capacity, rim profile, fluting, glaze colour, embossed logos and retail-ready packaging to your specification. Send artwork for branded ramekins, match a signature glaze, or commission new mold development for an exclusive shape. Low minimum order quantities let importers and private-label brands trial fresh ramekin ranges, and our in-house sampling team delivers approved pre-production samples quickly to protect your launch timeline.",
    qualityLogistics:
      "Every ramekin order is produced under strict QC with FDA and LFGB food-contact certification, thermal testing and reinforced export packaging engineered for long-haul ocean freight. Our logistics team consolidates mixed bakeware loads, manages documentation and ships worldwide from Chaozhou, China on flexible FOB and CIF terms.",
    siloGuide:
      "Need larger oven-to-table pieces? Browse our Baking Dishes & Casseroles and Loaf, Pie & Pizza Pans sub-categories within the Bakeware Silo, or explore the Dinnerware and Table Decor & Drinkware Silos for plates, bowls and drinkware.",
  },
  procurement: {
    heading: "Shop Ramekin Bowls by Procurement Need",
    tags: [
      { label: "Soufflé Ramekins", href: "/bakeware/ramekin-bowls" },
      { label: "Crème Brûlée Dishes", href: "/bakeware/ramekin-bowls" },
      { label: "Dipping & Sauce Pots", href: "/bakeware/ramekin-bowls" },
      { label: "Baked Side Ramekins", href: "/bakeware/ramekin-bowls" },
      { label: "Custom Branded Ramekins", href: "/contact" },
    ],
  },
  faqs: [
    {
      q: "Are your ceramic ramekins oven and thermal-shock safe?",
      a: "Yes. Our ramekin bowls are high-temperature fired and thermal-tested for direct oven use, with a dense body that resists cracking through normal heating and cooling cycles in professional kitchens.",
    },
    {
      q: "What capacities and sizes of ramekins do you offer?",
      a: "Standard ramekins range from about 2oz to 8oz (60ml–240ml) covering dipping pots, crème brûlée dishes, soufflé ramekins and portioned side dishes. Custom capacities are available via new mold development.",
    },
    {
      q: "What is the MOQ for wholesale ramekin bowls?",
      a: "Standard MOQ starts at 500 pieces per design for stock ramekins. Custom OEM/ODM ramekins generally start from 1,000–3,000 pieces depending on glaze and mold requirements.",
    },
    {
      q: "Can ramekins be customized with our logo or glaze colour?",
      a: "Yes. We offer custom glaze colour matching, embossed or printed logos, rim and fluting changes, and new mold development, plus retail-ready branded packaging for private-label lines.",
    },
    {
      q: "Are your ramekins microwave and dishwasher safe?",
      a: "Our ceramic ramekins are microwave and dishwasher safe under normal use, and FDA/LFGB certified as food-contact safe for global markets.",
    },
  ],
}

const bakingDishes: L2Config = {
  parentSlug: "bakeware",
  parentLabel: "Bakeware",
  slug: "baking-dishes-casseroles",
  label: "Baking Dishes & Casseroles",
  productCategorySlugs: ["baking-dishes"],
  keyword: "baking dishes and casseroles",
  h1: "Wholesale Ceramic Baking Dishes & Casseroles for Oven-to-Table Service",
  metaTitle: "Wholesale Oven-Safe Bakeware | Ceramic Baking Dishes Bulk",
  metaDescription:
    "Bulk oven-to-table ceramic baking dishes direct from Chaozhou factory. Ideal for restaurants, caterers, FDA-approved.",
  metaKeywords:
    "wholesale baking dishes, bulk ceramic casseroles, ceramic casserole dish manufacturer, oven-to-table bakeware supplier, lasagne gratin dishes wholesale, lidded casserole supplier, thermal shock resistant baking dish, OEM custom casseroles, restaurant casserole dishes bulk, lead-free glaze bakeware",
  bannerImage: "/wholesale-bakeware.webp",
  intro:
    "ADA Ceramics is your Chaozhou-based OEM/ODM manufacturer for bulk ceramic baking dishes and casseroles. Our commercial-grade oven-to-table bakeware meets FDA/LFGB standards, with low MOQs and custom branding for wholesale buyers.",
  seo: {
    h2: "Wholesale Ceramic Baking Dishes & Casseroles for Professional Kitchens",
    procurementScenario:
      "Restaurants, hotels, caterers and retail homeware brands need baking dishes that cook evenly, retain heat at service and survive constant oven and dishwasher cycles. Our ceramic baking dishes and casseroles are high-temperature fired for thermal-shock resistance and uniform heat distribution, ideal for gratins, lasagne, roasts, bakes and slow-cooked casseroles. A coordinated range of rectangular, oval and round sizes lets buyers standardize one durable oven-to-table program across every outlet while keeping presentation consistent.",
    customService:
      "Our OEM/ODM service customizes dish dimensions and capacity, handle styling, lid options, glaze colour, embossed branding and retail gift packaging. Submit artwork for branded casseroles, match a signature colour, or develop new molds for an exclusive bakeware line. Low minimum order quantities let buyers trial new ranges, and our sampling team delivers approved pre-production samples fast to keep launches on schedule.",
    qualityLogistics:
      "All baking dishes are produced under strict QC with FDA and LFGB food-contact certification, thermal testing and reinforced export packaging built for ocean freight. Our logistics team consolidates mixed bakeware loads, handles documentation and ships worldwide from Chaozhou, China on flexible FOB and CIF terms.",
    siloGuide:
      "Looking for individual portions or flat bakeware? Explore our Ramekin Bowls and Loaf, Pie & Pizza Pans sub-categories within the Bakeware Silo, or visit the Dinnerware and Table Decor & Drinkware Silos for complementary ranges.",
  },
  procurement: {
    heading: "Shop Baking Dishes & Casseroles by Procurement Need",
    tags: [
      { label: "Lasagne & Gratin Dishes", href: "/bakeware/baking-dishes-casseroles" },
      { label: "Lidded Casseroles", href: "/bakeware/baking-dishes-casseroles" },
      { label: "Oval Roasting Bakers", href: "/bakeware/baking-dishes-casseroles" },
      { label: "Oven-to-Table Sets", href: "/bakeware/baking-dishes-casseroles" },
      { label: "Custom Branded Bakers", href: "/contact" },
    ],
  },
  faqs: [
    {
      q: "Are your baking dishes oven and thermal-shock safe?",
      a: "Yes. Our baking dishes and casseroles are high-temperature fired and thermal-tested for oven use, with a dense body that resists cracking from normal heating and cooling in professional kitchens.",
    },
    {
      q: "What sizes of baking dishes and casseroles do you supply?",
      a: "We offer rectangular, oval and round bakers in a range of family and service sizes, from individual gratins to large lasagne dishes, with custom dimensions available via new mold development.",
    },
    {
      q: "What is the MOQ for wholesale baking dishes?",
      a: "Standard MOQ starts at 500 pieces per design for stock items. Custom OEM/ODM baking dishes generally start from 1,000–3,000 pieces depending on mold and glaze requirements.",
    },
    {
      q: "Can casseroles be customized with lids, colours or branding?",
      a: "Yes. We customize lids, handles, capacity, glaze colour and embossed or printed logos, plus retail-ready packaging for private-label oven-to-table ranges.",
    },
    {
      q: "Are your baking dishes microwave and dishwasher safe?",
      a: "Our ceramic baking dishes are microwave and dishwasher safe under normal use, and FDA/LFGB certified as food-contact safe for global markets.",
    },
  ],
}

const piePizzaPans: L2Config = {
  parentSlug: "bakeware",
  parentLabel: "Bakeware",
  slug: "loaf-pie-pizza-pans",
  label: "Loaf, Pie & Pizza Pans",
  productCategorySlugs: ["pie-pizza-plates"],
  keyword: "loaf pie and pizza pans",
  h1: "Wholesale Ceramic Loaf, Pie & Pizza Pans for Bakeries & Kitchens",
  metaTitle: "Wholesale Ceramic Loaf & Pizza Pans | Bulk Oven-Safe Bakeware",
  metaDescription:
    "wholesale loaf pans, bulk pizza pans, ceramic bakeware supplier, Chaozhou baking pan manufacturer.",
  metaKeywords:
    "wholesale loaf pans, bulk ceramic pizza pans, ceramic pie dish supplier, loaf bread pan manufacturer, quiche dish wholesale, bakery supply bakeware, oven-safe ceramic baking pans, OEM custom baking pans, factory direct bakeware, FDA LFGB pizza pans",
  bannerImage: "/amazon-hotsell-ceramic.webp",
  intro:
    "ADA Ceramics manufactures oven-safe ceramic loaf, pie & pizza pans for bakeries, commercial kitchens and homeware retailers. High-fired for uniform browning and thermal-shock resistance, these bakeware pans deliver steady baking results for bulk batches. We offer low MOQ wholesale supply plus full OEM/ODM custom sizing, glaze color and logo branding.",
  seo: {
    h2: "Wholesale Loaf, Pie & Pizza Pans Engineered for Even Baking",
    procurementScenario:
      "Bakeries, restaurants, hotels and retail brands need flat and formed bakeware that browns evenly and withstands continuous high-heat baking. Our ceramic loaf, pie and pizza pans are high-temperature fired for excellent heat retention and thermal-shock resistance, producing crisp pizza bases, golden pie crusts and well-risen loaves. A consistent range of diameters and capacities lets buyers standardize their baking program and supply retail shelves with dependable, attractive bakeware.",
    customService:
      "Our OEM/ODM service customizes pan diameter, depth, fluting, glaze colour, embossed logos and retail gift packaging. Send artwork for branded pans, match a signature colour, or commission new mold development for an exclusive design. Low minimum order quantities let buyers test new ranges, and our sampling team produces approved pre-production samples quickly to keep launches on track.",
    qualityLogistics:
      "All loaf, pie and pizza pans are produced under strict QC with FDA and LFGB food-contact certification, thermal testing and reinforced export packaging for ocean freight. Our logistics team consolidates mixed bakeware loads, manages documentation and ships worldwide from Chaozhou, China on flexible FOB and CIF terms.",
    siloGuide:
      "Need individual portions or deeper bakers? Explore our Ramekin Bowls and Baking Dishes & Casseroles sub-categories within the Bakeware Silo, or browse the Dinnerware and Table Decor & Drinkware Silos for plates and drinkware.",
  },
  procurement: {
    heading: "Shop Loaf, Pie & Pizza Pans by Procurement Need",
    tags: [
      { label: "Pizza Baking Pans", href: "/bakeware/loaf-pie-pizza-pans" },
      { label: "Pie & Quiche Dishes", href: "/bakeware/loaf-pie-pizza-pans" },
      { label: "Loaf & Bread Pans", href: "/bakeware/loaf-pie-pizza-pans" },
      { label: "Bakery Supply", href: "/bakeware/loaf-pie-pizza-pans" },
      { label: "Custom Branded Pans", href: "/contact" },
    ],
  },
  faqs: [
    {
      q: "Are your pie and pizza pans oven and thermal-shock safe?",
      a: "Yes. Our loaf, pie and pizza pans are high-temperature fired and thermal-tested for oven use, resisting cracking from normal heating and cooling cycles in busy bakeries and kitchens.",
    },
    {
      q: "Do ceramic pizza pans give a crisp base?",
      a: "Our ceramic pizza pans retain and distribute heat evenly, helping produce a crisp, well-browned base, and they transition cleanly from oven to table for service.",
    },
    {
      q: "What is the MOQ for wholesale loaf, pie and pizza pans?",
      a: "Standard MOQ starts at 500 pieces per design for stock items. Custom OEM/ODM pans generally start from 1,000–3,000 pieces depending on mold and glaze requirements.",
    },
    {
      q: "Can pans be customized with our brand or colours?",
      a: "Yes. We offer custom glaze colour matching, embossed or printed logos, dimension changes and new mold development, plus retail-ready branded packaging for private-label ranges.",
    },
    {
      q: "Are your baking pans dishwasher safe?",
      a: "Our ceramic loaf, pie and pizza pans are dishwasher safe under normal use, and FDA/LFGB certified as food-contact safe for international markets.",
    },
  ],
}

// ----------------------------------------------------------------------------
// Dinnerware（正餐餐具）Silo —— 复用同一通用 L2 模板
// ----------------------------------------------------------------------------

const dinnerwarePlates: L2Config = {
  parentSlug: "dinnerware",
  parentLabel: "Dinnerware",
  slug: "plates",
  label: "Plates",
  productCategorySlugs: ["wholesale-plates", "plates"],
  keyword: "dinner plates",
  h1: "Wholesale Ceramic Plates for Restaurants, Hotels & Catering",
  metaTitle: "Wholesale Ceramic Dinner, Side & Dessert Plates | Bulk Dinnerware",
  metaDescription:
    "Chip-resistant bulk ceramic plates from Chaozhou factory. Multi-use dinner, dessert, side plates for hotels, restaurants. FDA/LFGB safe, low MOQ, full OEM/ODM.",
  metaKeywords:
    "wholesale ceramic plates, bulk dinner plates, ceramic dinner plate manufacturer, restaurant plates supplier, dessert side plates wholesale, charger plates bulk, coupe plates supplier, chip-resistant restaurant plates, custom logo dinner plates, OEM private label plates, hotel catering plates bulk, FDA LFGB ceramic plates",
  bannerImage: "/wholesale-plates.webp",
  intro:
    "ADA Ceramics offers chip-resistant ceramic plates in commercial sizes for dinner, dessert, side and charger plating. High-fired dense bodies with stain-proof smooth glaze withstand repeated stacking, dishwashing and daily use for hotels, restaurants and catering teams. We provide low MOQ bulk orders and complete OEM/ODM custom branding for global wholesale buyers.",
  seo: {
    h2: "Chip-Resistant Wholesale Plates Built for High-Volume Commercial Use",
    procurementScenario:
      "Restaurants, hotels, canteens and caterers need plates that survive constant stacking, washing and plating without chipping or losing their finish. Our ceramic plates are fired at high temperature for dense, impact-resistant bodies and a smooth non-porous glaze that resists staining and scratching. A coordinated range of dinner, dessert, side and charger sizes lets buyers standardize one durable plating program across every outlet, lowering breakage costs and keeping table presentation consistent at scale.",
    customService:
      "As a full OEM/ODM manufacturer we customize plate diameter, rim profile, coupe or rimmed shape, glaze colour, embossed or printed logos and retail-ready packaging. Send artwork for branded plates, match a signature glaze, or commission new mold development for an exclusive shape. Low minimum order quantities let importers and private-label brands trial new ranges, and our sampling team delivers approved pre-production samples quickly to protect launch timelines.",
    qualityLogistics:
      "Every plate order is produced under strict QC with FDA and LFGB food-contact certification, edge-impact testing and reinforced export packaging engineered for long-haul ocean freight. Our logistics team consolidates mixed dinnerware loads, manages documentation and ships worldwide from Chaozhou, China on flexible FOB and CIF terms.",
    siloGuide:
      "Need matching bowls or full table programs? Browse our Bowls, Dinnerware Sets and Serve Dishes sub-categories within the Dinnerware Silo, or explore the Bakeware and Table Decor & Drinkware Silos for oven dishes and drinkware.",
  },
  procurement: {
    heading: "Shop Plates by Procurement Need",
    tags: [
      { label: "Dinner Plates", href: "/dinnerware/plates" },
      { label: "Dessert & Side Plates", href: "/dinnerware/plates" },
      { label: "Charger Plates", href: "/dinnerware/plates" },
      { label: "Coupe Plates", href: "/dinnerware/plates" },
      { label: "Custom Branded Plates", href: "/contact" },
    ],
  },
  faqs: [
    {
      q: "Are your ceramic plates chip-resistant?",
      a: "Yes. Our plates are high-temperature fired for a dense, impact-resistant body with reinforced edges, tested to withstand constant stacking, washing and plating in professional kitchens.",
    },
    {
      q: "What plate sizes do you offer?",
      a: "Standard ranges cover dinner plates (about 10–12in), dessert and side plates (about 6–8in) and charger plates, with custom diameters and rim profiles available via new mold development.",
    },
    {
      q: "What is the MOQ for wholesale plates?",
      a: "Standard MOQ starts at 500 pieces per design for stock plates. Custom OEM/ODM plates generally start from 1,000–3,000 pieces depending on glaze and mold requirements.",
    },
    {
      q: "Can plates be customized with our logo or glaze colour?",
      a: "Yes. We offer custom glaze colour matching, embossed or printed logos, rim and shape changes, and new mold development, plus retail-ready branded packaging for private-label lines.",
    },
    {
      q: "Are your plates dishwasher and microwave safe?",
      a: "Our ceramic plates are dishwasher and microwave safe under normal use, and FDA/LFGB certified as food-contact safe for global markets.",
    },
  ],
}

const dinnerwareBowls: L2Config = {
  parentSlug: "dinnerware",
  parentLabel: "Dinnerware",
  slug: "bowls",
  label: "Bowls",
  productCategorySlugs: ["wholesale-bowls", "bowls"],
  keyword: "wholesale ceramic bowls",
  h1: "Wholesale Ceramic Bowls for Restaurants, Hotels & Catering Businesses ",
  metaTitle: "Wholesale Ceramic Bowls | FDA LFGB Bulk Soup & Ramen Bowls for Restaurants",
  metaDescription:
    "Durable chip-resistant bulk ceramic bowls made in Chaozhou factory. Multi-purpose soup, salad, ramen and snack bowls ideal for hotels, restaurants and catering businesses. FDA & LFGB food safe, low MOQ bulk supply, with OEM/ODM support, glaze and sizing.",
  metaKeywords:
    "wholesale ceramic bowls, bulk soup bowls, ceramic salad bowl supplier, ramen noodle bowl manufacturer, cereal bowls wholesale, pasta bowls bulk, rice snack bowls supplier, custom logo bowls, OEM ODM ceramic bowls, restaurant catering bowls bulk, low MOQ ceramic bowls, FDA LFGB bowls",
  bannerImage: "/wholesale-bowls.webp",
  intro:
    "ADA Ceramics provides chip-resistant ceramic bowls in commercial sizes for soup, salad, ramen, rice and snack service. High-temperature fired dense bodies paired with stain-proof smooth glaze deliver long-lasting performance for daily hotel, restaurant and catering use. We offer low MOQ bulk orders and complete OEM/ODM custom branding for global wholesale buyers.",
  seo: {
    h2: "Versatile Wholesale Ceramic Bowls Built for Commercial Daily Catering Service",
    procurementScenario:
      "Restaurants, hotels, canteens and caterers rely on bowls that handle constant stacking, washing and plating across soup, salad, ramen, rice and snack programs. Our ceramic bowls are fired at high temperature for dense, impact-resistant bodies and a smooth non-porous glaze that resists staining and odour. A coordinated range of capacities lets buyers standardize one durable bowl program across every outlet, lowering replacement costs while keeping presentation consistent at scale.",
    customService:
      "As a full OEM/ODM manufacturer we customize bowl capacity, depth, rim profile, glaze colour, embossed or printed logos and retail-ready packaging. Send artwork for branded bowls, match a signature glaze, or commission new mold development for an exclusive shape. Low minimum order quantities let importers and private-label brands trial new ranges, and our sampling team delivers approved pre-production samples quickly.",
    qualityLogistics:
      "Every bowl order is produced under strict QC with FDA and LFGB food-contact certification, impact testing and reinforced export packaging engineered for ocean freight. Our logistics team consolidates mixed dinnerware loads, manages documentation and ships worldwide from Chaozhou, China on flexible FOB and CIF terms.",
    siloGuide:
      "Need matching plates or full table programs? Browse our Plates, Dinnerware Sets and Serve Dishes sub-categories within the Dinnerware Silo, or explore the Bakeware and Table Decor & Drinkware Silos for oven dishes and drinkware.",
  },
  procurement: {
    heading: "Shop Bowls by Procurement Need",
    tags: [
      { label: "Soup & Cereal Bowls", href: "/dinnerware/bowls" },
      { label: "Salad & Pasta Bowls", href: "/dinnerware/bowls" },
      { label: "Ramen & Noodle Bowls", href: "/dinnerware/bowls" },
      { label: "Rice & Snack Bowls", href: "/dinnerware/bowls" },
      { label: "Custom Branded Bowls", href: "/contact" },
    ],
  },
  faqs: [
    {
      q: "Are your ceramic bowls chip-resistant?",
      a: "Yes. Our bowls are high-temperature fired for a dense, impact-resistant body, tested to withstand constant stacking, washing and plating in professional kitchens.",
    },
    {
      q: "What bowl sizes and capacities do you offer?",
      a: "Standard ranges cover snack and rice bowls, soup and cereal bowls, salad and pasta bowls and large ramen bowls, with custom capacities available via new mold development.",
    },
    {
      q: "What is the MOQ for wholesale bowls?",
      a: "Standard MOQ starts at 500 pieces per design for stock bowls. Custom OEM/ODM bowls generally start from 1,000–3,000 pieces depending on glaze and mold requirements.",
    },
    {
      q: "Can bowls be customized with our logo or glaze colour?",
      a: "Yes. We offer custom glaze colour matching, embossed or printed logos, shape and capacity changes, and new mold development, plus retail-ready branded packaging.",
    },
    {
      q: "Are your bowls dishwasher and microwave safe?",
      a: "Our ceramic bowls are dishwasher and microwave safe under normal use, and FDA/LFGB certified as food-contact safe for global markets.",
    },
  ],
}

const dinnerwareSets: L2Config = {
  parentSlug: "dinnerware",
  parentLabel: "Dinnerware",
  slug: "dinnerware-sets",
  label: "Dinnerware Sets",
  productCategorySlugs: ["wholesale-dinnerware-sets", "dinnerware-sets"],
  keyword: "dinnerware sets",
  h1: "Wholesale FDA LFGB Ceramic Dinnerware Sets for Hotels, Retail & Private Label OEM",
  metaTitle: "Wholesale Ceramic Dinnerware Sets | FDA LFGB Bulk Matched Tableware for Hotels",
  metaDescription:
    "Complete matched ceramic dinnerware sets supplied by Chaozhou factory. Coordinated plates, bowls and mugs suit hotel catering, retail shops and private-label brands. FDA & LFGB food safe, low MOQ bulk orders, with full OEM & ODM custom glaze, logo and sizing service.",
  metaKeywords:
    "wholesale ceramic dinnerware sets, bulk matched tableware, hotel dinnerware supplier, porcelain dinner set manufacturer, coupe dinner sets wholesale, stackable dinnerware sets, retail gift dinner sets, private label OEM dinner sets, custom branded dinnerware collection, commercial catering tableware, low MOQ custom tableware factory, FDA LFGB dinnerware sets",
  bannerImage: "/wholesale-dinnerware-sets.webp",
  intro:
    "ADA Ceramics produces fully coordinated ceramic dinnerware sets with matching plates, bowls and mugs under unified durable glaze. High-fired for solid durability and even finish, these tableware sets meet hotel dining standards, retail gift lines and private-label collections. We offer low MOQ bulk orders and full OEM/ODM custom glaze, logo and sizing solutions.",
  seo: {
    h2: "Coordinated Wholesale Ceramic Dinnerware Sets for Commercial Hotel Table Settings",
    procurementScenario:
      "Hotels, retailers and homeware brands need dinnerware sets that match perfectly across plates, bowls and mugs and stay consistent reorder after reorder. Our ceramic sets are fired at high temperature for dense, durable bodies and a uniform glaze finish, so every place setting looks coordinated and survives daily washing and stacking. Buyers can standardize one matched program across rooms, outlets or retail SKUs, simplifying replenishment while protecting brand presentation.",
    customService:
      "As a full OEM/ODM manufacturer we configure set composition (piece count, shapes, capacities), glaze colour, decal or embossed branding and retail gift packaging. Build an exclusive collection from new molds, match a signature colourway, or adapt an existing range for your market. Low minimum order quantities let private-label brands trial fresh set concepts, with fast approved pre-production samples.",
    qualityLogistics:
      "Every dinnerware set is produced under strict QC with FDA and LFGB food-contact certification, impact testing and reinforced retail-ready export packaging engineered for ocean freight. Our logistics team consolidates mixed loads, manages documentation and ships worldwide from Chaozhou, China on flexible FOB and CIF terms.",
    siloGuide:
      "Want to build sets from individual pieces? Browse our Plates, Bowls and Serve Dishes sub-categories within the Dinnerware Silo, or explore the Bakeware and Table Decor & Drinkware Silos for oven dishes and drinkware.",
  },
  procurement: {
    heading: "Shop Dinnerware Sets by Procurement Need",
    tags: [
      { label: "Hotel Table Sets", href: "/dinnerware/dinnerware-sets" },
      { label: "Retail Gift Sets", href: "/dinnerware/dinnerware-sets" },
      { label: "Coupe Dinner Sets", href: "/dinnerware/dinnerware-sets" },
      { label: "Stackable Sets", href: "/dinnerware/dinnerware-sets" },
      { label: "Private-Label Sets", href: "/contact" },
    ],
  },
  faqs: [
    {
      q: "How many pieces are in your dinnerware sets?",
      a: "We configure set composition to your spec — common formats include 12-, 16-, 18- and 30-piece sets pairing plates, bowls and mugs, with custom counts available for private-label ranges.",
    },
    {
      q: "Are the sets fully colour and glaze matched?",
      a: "Yes. All pieces in a set are produced from the same glaze batch program for a consistent colour and finish across plates, bowls and mugs, and stay consistent on reorder.",
    },
    {
      q: "What is the MOQ for wholesale dinnerware sets?",
      a: "Standard MOQ starts at 500 sets per design for stock ranges. Custom OEM/ODM sets generally start from 1,000–3,000 sets depending on composition, glaze and mold requirements.",
    },
    {
      q: "Can sets be customized and gift-packaged for retail?",
      a: "Yes. We offer custom glaze colours, decals or embossed logos, new mold development and retail-ready gift packaging designed for shelf and e-commerce presentation.",
    },
    {
      q: "Are your dinnerware sets dishwasher and microwave safe?",
      a: "Our ceramic dinnerware sets are dishwasher and microwave safe under normal use, and FDA/LFGB certified as food-contact safe for global markets.",
    },
  ],
}

const dinnerwareServeDishes: L2Config = {
  parentSlug: "dinnerware",
  parentLabel: "Dinnerware",
  slug: "serve-dishes",
  label: "Serve Dishes",
  productCategorySlugs: ["oval-serving-plates", "serve-dishes", "serving-dishes"],
  keyword: "serve dishes",
  h1: "Wholesale FDA LFGB Ceramic Serving Dishes & Platters for Buffet, Banquet & Catering",
  metaTitle: "Wholesale Ceramic Serving Dishes | FDA LFGB Bulk Platters & Bowls for Buffets",
  metaDescription:
    "Oven-safe ceramic serving dishes and platters supplied by Chaozhou factory. Oval platters, serving bowls and buffet trays fit hotel banquets, restaurant buffets and catering businesses. FDA & LFGB food safe, low MOQ bulk supply, supporting full OEM & ODM custom size, glaze and logo branding.",
  metaKeywords:
    "wholesale serve dishes, bulk ceramic serving platters, ceramic serveware supplier, oval platters wholesale, buffet serving bowls bulk, banquet platters supplier, family-style serving dishes, custom branded serveware, OEM ODM serving platters, restaurant catering serveware, FDA LFGB serving dishes",
  bannerImage: "/ceramic-plates-for-catering-service.webp",
  intro:
    "ADA Ceramics provides oven-safe ceramic serving dishes, oval platters and serving bowls for buffets, banquets and family-style catering. High-fired for thermal shock resistance and elegant glaze finish, these serving ware seamlessly transfer from oven to table with premium display effect. We offer low MOQ bulk orders and complete OEM/ODM custom logo, glaze and sizing branding solutions.",
  seo: {
    h2: "Oven-Safe Wholesale Ceramic Serving Dishes for Buffet & Banquet Presentation",
    procurementScenario:
      "Restaurants, hotels and caterers need serving pieces that present large-format dishes attractively and survive constant buffet and banquet service. Our ceramic serve dishes, platters and serving bowls are high-temperature fired for thermal-shock resistance and a smooth, stain-resistant glaze, moving from oven or fridge to table without crazing. A coordinated range of oval, round and rectangular formats lets buyers build a consistent serving program for buffets, family-style menus and banquet plating.",
    customService:
      "As a full OEM/ODM manufacturer we customize platter dimensions and depth, rim profile, glaze colour, embossed or printed logos and packaging. Send artwork for branded serveware, match a signature glaze, or commission new mold development for exclusive presentation pieces. Low minimum order quantities let buyers trial new ranges, with fast approved pre-production samples.",
    qualityLogistics:
      "Every serve dish order is produced under strict QC with FDA and LFGB food-contact certification, thermal testing and reinforced export packaging engineered for long-haul ocean freight. Our logistics team consolidates mixed dinnerware loads, manages documentation and ships worldwide from Chaozhou, China on flexible FOB and CIF terms.",
    siloGuide:
      "Need everyday plates and bowls too? Browse our Plates, Bowls and Dinnerware Sets sub-categories within the Dinnerware Silo, or explore the Bakeware and Table Decor & Drinkware Silos for oven dishes and drinkware.",
  },
  procurement: {
    heading: "Shop Serve Dishes by Procurement Need",
    tags: [
      { label: "Oval Platters", href: "/dinnerware/serve-dishes" },
      { label: "Buffet Serving Bowls", href: "/dinnerware/serve-dishes" },
      { label: "Banquet Platters", href: "/dinnerware/serve-dishes" },
      { label: "Family-Style Dishes", href: "/dinnerware/serve-dishes" },
      { label: "Custom Branded Serveware", href: "/contact" },
    ],
  },
  faqs: [
    {
      q: "Are your serve dishes oven and thermal-shock safe?",
      a: "Yes. Our serve dishes and platters are high-temperature fired and thermal-tested, moving from oven or fridge to table without crazing under normal professional use.",
    },
    {
      q: "What shapes and sizes of serve dishes do you offer?",
      a: "We supply oval, round and rectangular platters and serving bowls across buffet and banquet sizes, with custom dimensions available via new mold development.",
    },
    {
      q: "What is the MOQ for wholesale serve dishes?",
      a: "Standard MOQ starts at 500 pieces per design for stock items. Custom OEM/ODM serveware generally starts from 1,000–3,000 pieces depending on glaze and mold requirements.",
    },
    {
      q: "Can serveware be customized with our brand or colours?",
      a: "Yes. We offer custom glaze colour matching, embossed or printed logos, dimension changes and new mold development, plus retail-ready branded packaging.",
    },
    {
      q: "Are your serve dishes dishwasher safe?",
      a: "Our ceramic serve dishes are dishwasher safe under normal use, and FDA/LFGB certified as food-contact safe for international markets.",
    },
  ],
}

// ----------------------------------------------------------------------------
// Table Decor & Drinkware（桌面装饰 + 饮具）Silo —— 复用同一通用 L2 模板
// ----------------------------------------------------------------------------

const tableCupsMugs: L2Config = {
  parentSlug: "table-decor-drinkware",
  parentLabel: "Table Decor & Drinkware",
  slug: "cups-mugs",
  label: "Cups & Mugs",
  productCategorySlugs: ["wholesale-cups-mugs", "cups-mugs"],
  keyword: "cups and mugs",
  h1: "Wholesale FDA LFGB Ceramic Cups & Mugs for Cafés, Hotels & Custom Branded Gifting",
  metaTitle: "Wholesale Ceramic Cups & Mugs | FDA LFGB Bulk Coffee Mugs for Cafés & Hotels",
  metaDescription:
    "Durable ceramic cups and mugs in bulk direct from a Chaozhou factory. Coffee mugs, cappuccino cups and saucers for cafés, hotels and branded gifting. Low MOQ, FDA/LFGB certified, full OEM/ODM custom logo printing.",
  metaKeywords:
    "custom ceramic mugs wholesale, bulk coffee mugs, ceramic mug manufacturer, cappuccino cups saucers supplier, espresso cups wholesale, custom logo mugs bulk, branded gift mugs, sublimation mugs wholesale, OEM ceramic mugs, private label drinkware, café branded mugs bulk, FDA LFGB mugs",
  bannerImage: "/coffee-cup-cafe.webp",
  intro:
    "ADA Ceramics supplies durable ceramic cups and mugs in café-ready shapes for coffee, cappuccino, tea and branded gifting. Each piece is high-temperature fired for a dense, chip-resistant body and a smooth, stain-resistant glaze built for constant café service, dishwashing and retail handling, with low MOQs and full OEM/ODM logo printing.",
  seo: {
    h2: "Café-Grade Wholesale Ceramic Cups & Mugs for Hotel & Daily Catering Service",
    procurementScenario:
      "Cafés, hotels, offices and gift brands need drinkware that survives constant brewing, washing and stacking while carrying their identity. Our ceramic cups and mugs are fired at high temperature for dense, chip-resistant bodies and a smooth non-porous glaze that resists staining and odour. A coordinated range of espresso, cappuccino, coffee and latte sizes lets buyers standardize one durable drinkware program across every outlet, lowering breakage costs and keeping branded presentation consistent at scale.",
    customService:
      "As a full OEM/ODM manufacturer we customize mug shape, handle style, capacity, glaze colour, decal or pad-printed logos and retail-ready packaging. Send artwork for branded coffee programs, match a seasonal palette, or commission new mold development for an exclusive mug. Low minimum order quantities let cafés and private-label brands trial fresh ranges, with fast approved pre-production samples.",
    qualityLogistics:
      "Every cup and mug order is produced under strict QC with FDA and LFGB food-contact certification, edge-impact testing and reinforced fragile-rated export packaging engineered for ocean freight. Our logistics team consolidates mixed decor loads, manages documentation and ships worldwide from Chaozhou, China on flexible FOB and CIF terms.",
    siloGuide:
      "Building a full table program? Browse our Vases, Storage & Condiment Jars, Serving Trays and Candle Holders sub-categories within the Table Decor & Drinkware Silo, or explore the Dinnerware and Bakeware Silos for plates and oven dishes.",
  },
  procurement: {
    heading: "Shop Cups & Mugs by Procurement Need",
    tags: [
      { label: "Coffee Mugs", href: "/table-decor-drinkware/cups-mugs" },
      { label: "Cappuccino Cups & Saucers", href: "/table-decor-drinkware/cups-mugs" },
      { label: "Espresso Cups", href: "/table-decor-drinkware/cups-mugs" },
      { label: "Branded Gift Mugs", href: "/table-decor-drinkware/cups-mugs" },
      { label: "Custom Logo Mugs", href: "/contact" },
    ],
  },
  faqs: [
    {
      q: "Can you produce custom branded mugs with our logo?",
      a: "Yes. We offer decal, pad and stamp logo printing, custom glaze colours, handle and shape changes, and new mold development, plus retail-ready branded packaging for café and gifting programs.",
    },
    {
      q: "What cup and mug sizes do you offer?",
      a: "Standard ranges cover espresso (about 2–3oz), cappuccino (about 5–6oz), coffee and latte mugs (about 8–16oz), with custom capacities and shapes available via new mold development.",
    },
    {
      q: "What is the MOQ for wholesale cups and mugs?",
      a: "Standard MOQ starts at 500 pieces per design for stock mugs. Custom OEM/ODM drinkware generally starts from 1,000–3,000 pieces depending on glaze, printing and mold requirements.",
    },
    {
      q: "Are your mugs food-safe and dishwasher safe?",
      a: "Yes. Our cups and mugs are FDA and LFGB certified, lead and cadmium safe, and dishwasher and microwave safe under normal use.",
    },
    {
      q: "How are mugs packed for export?",
      a: "Each piece uses reinforced, fragile-rated export packaging engineered for long-haul ocean freight, with mixed-load consolidation and full documentation shipped from Chaozhou, China.",
    },
  ],
}

const tableVases: L2Config = {
  parentSlug: "table-decor-drinkware",
  parentLabel: "Table Decor & Drinkware",
  slug: "vases",
  label: "Vases",
  productCategorySlugs: ["vases"],
  keyword: "decorative vases",
  h1: "Wholesale Ceramic Vases for Hospitality Styling & Retail Home Decor",
  metaTitle: "Wholesale Ceramic Vases | Bulk Decorative & Bud Vases",
  metaDescription:
    "Decorative ceramic vases in bulk direct from a Chaozhou factory. Bud, table and floor vases for hospitality styling, gifting and retail home decor. Low MOQ, full OEM/ODM glaze and shape customization.",
  metaKeywords:
    "wholesale ceramic vases, bulk decorative vases, ceramic vase manufacturer, bud vases supplier, table centerpiece vases wholesale, floor statement vases bulk, hospitality decor vases, home decor vases supplier, custom branded vases, OEM ODM vase development, retail gift vases bulk",
  bannerImage: "/color-glaze.webp",
  intro:
    "ADA Ceramics supplies decorative ceramic vases for hotels, restaurants, gift brands and lifestyle retailers. From slim bud vases to statement table pieces, each vase pairs on-trend silhouettes with a refined, durable glaze finish suited to hospitality styling and retail display, with low MOQs and full OEM/ODM customization of shape, colour and branding.",
  seo: {
    h2: "On-Trend Wholesale Vases for Styling & Retail Display",
    procurementScenario:
      "Hotels, restaurants, florists, gift companies and home-decor retailers source vases that set a mood and survive constant handling and display. Our ceramic vases are produced with a dense body and a smooth, refined glaze that resists chipping and water staining, holding their finish through repeated styling rotations. A coordinated range of bud, table and floor silhouettes lets buyers build cohesive decor collections for room accents, table centerpieces and retail shelves.",
    customService:
      "As a full OEM/ODM manufacturer we customize vase silhouette, height, opening, glaze colour, surface texture, embossed branding and retail packaging. Match a seasonal palette, develop an exclusive shape from new molds, or adapt an existing range for your market. Low minimum order quantities let decor brands trial fresh ranges, with fast approved pre-production samples.",
    qualityLogistics:
      "Every vase order ships with careful QC, glaze and water-tightness checks and reinforced fragile-rated export packaging engineered for ocean freight. Our logistics team consolidates mixed decor loads, manages documentation and ships worldwide from Chaozhou, China on flexible FOB and CIF terms.",
    siloGuide:
      "Completing a decor range? Browse our Cups & Mugs, Storage & Condiment Jars, Serving Trays and Candle Holders sub-categories within the Table Decor & Drinkware Silo, or explore the Dinnerware and Bakeware Silos for tableware.",
  },
  procurement: {
    heading: "Shop Vases by Procurement Need",
    tags: [
      { label: "Bud Vases", href: "/table-decor-drinkware/vases" },
      { label: "Table Centerpiece Vases", href: "/table-decor-drinkware/vases" },
      { label: "Floor & Statement Vases", href: "/table-decor-drinkware/vases" },
      { label: "Hospitality Decor Vases", href: "/table-decor-drinkware/vases" },
      { label: "Custom Branded Vases", href: "/contact" },
    ],
  },
  faqs: [
    {
      q: "Are your ceramic vases watertight?",
      a: "Yes. Our vases are high-temperature fired with a sealed glaze and tested for water-tightness, suitable for fresh-flower display in hospitality and retail settings.",
    },
    {
      q: "What vase sizes and styles do you offer?",
      a: "We supply slim bud vases, table centerpiece vases and larger floor and statement vases across a range of silhouettes, with custom shapes available via new mold development.",
    },
    {
      q: "What is the MOQ for wholesale vases?",
      a: "Standard MOQ starts at 500 pieces per design for stock vases. Custom OEM/ODM vases generally start from 1,000–3,000 pieces depending on glaze and mold requirements.",
    },
    {
      q: "Can vases be customized with our colours or branding?",
      a: "Yes. We offer custom glaze colour matching, surface textures, embossed logos, shape changes and new mold development, plus retail-ready branded packaging.",
    },
    {
      q: "How are vases packed for export?",
      a: "Vases use reinforced, fragile-rated export packaging engineered for long-haul ocean freight, with mixed-load consolidation and full documentation shipped from Chaozhou, China.",
    },
  ],
}

const tableStorageJars: L2Config = {
  parentSlug: "table-decor-drinkware",
  parentLabel: "Table Decor & Drinkware",
  slug: "storage-condiment-jars",
  label: "Storage & Condiment Jars",
  productCategorySlugs: ["storage-condiment-jars"],
  keyword: "storage and condiment jars",
  h1: "Wholesale Ceramic Storage & Condiment Jars for Kitchens, Delis & Retail",
  metaTitle: "Wholesale Ceramic Storage & Condiment Jars | Bulk Sealed Jars",
  metaDescription:
    "Sealed ceramic storage and condiment jars in bulk direct from a Chaozhou factory. Canisters, spice and sauce jars for kitchens, delis and retail. Low MOQ, FDA/LFGB certified, full OEM/ODM customization.",
  metaKeywords:
    "wholesale ceramic storage jars, bulk airtight canisters, ceramic condiment jars supplier, spice jars wholesale, sauce condiment pots bulk, sealed storage jar manufacturer, deli pantry storage jars, custom branded jars, OEM ODM ceramic jars, retail kitchen storage jars, food-safe ceramic canisters",
  bannerImage: "/custom-color-glaze-ceramic.webp",
  intro:
    "ADA Ceramics supplies sealed ceramic storage and condiment jars for commercial kitchens, delis, cafés and retail pantry ranges. From airtight canisters to small sauce and spice jars, each piece pairs a durable, food-safe glaze with secure lids for everyday storage and attractive display, with low MOQs and full OEM/ODM customization of size, colour and branding.",
  seo: {
    h2: "Sealed Wholesale Storage & Condiment Jars for Daily Use",
    procurementScenario:
      "Kitchens, delis, cafés and retail homeware brands need storage jars that keep contents fresh, look tidy on display and survive constant opening and washing. Our ceramic storage and condiment jars are high-temperature fired for a dense, non-porous body and finished with secure lids and food-safe glaze that resists staining and odour. A coordinated range of canister, spice and sauce sizes lets buyers standardize one durable storage program across kitchens and retail shelves.",
    customService:
      "As a full OEM/ODM manufacturer we customize jar capacity, lid type and seal, glaze colour, embossed or printed branding and retail-ready packaging. Match a kitchen range, develop an exclusive canister shape from new molds, or adapt an existing line for your market. Low minimum order quantities let buyers trial fresh ranges, with fast approved pre-production samples.",
    qualityLogistics:
      "Every jar order is produced under strict QC with FDA and LFGB food-contact certification, seal testing and reinforced fragile-rated export packaging engineered for ocean freight. Our logistics team consolidates mixed decor loads, manages documentation and ships worldwide from Chaozhou, China on flexible FOB and CIF terms.",
    siloGuide:
      "Building a kitchen and table range? Browse our Cups & Mugs, Vases, Serving Trays and Candle Holders sub-categories within the Table Decor & Drinkware Silo, or explore the Dinnerware and Bakeware Silos for tableware.",
  },
  procurement: {
    heading: "Shop Storage & Condiment Jars by Procurement Need",
    tags: [
      { label: "Airtight Canisters", href: "/table-decor-drinkware/storage-condiment-jars" },
      { label: "Spice Jars", href: "/table-decor-drinkware/storage-condiment-jars" },
      { label: "Sauce & Condiment Pots", href: "/table-decor-drinkware/storage-condiment-jars" },
      { label: "Deli & Pantry Storage", href: "/table-decor-drinkware/storage-condiment-jars" },
      { label: "Custom Branded Jars", href: "/contact" },
    ],
  },
  faqs: [
    {
      q: "Are your storage jars airtight?",
      a: "Yes. Our canisters are supplied with sealing lids (silicone or cork options) and tested for a secure seal to keep dry goods and condiments fresh in kitchens and retail use.",
    },
    {
      q: "What jar sizes do you offer?",
      a: "We supply small spice and sauce jars through to large pantry canisters across a coordinated range, with custom capacities and lid styles available via new mold development.",
    },
    {
      q: "What is the MOQ for wholesale storage and condiment jars?",
      a: "Standard MOQ starts at 500 pieces per design for stock jars. Custom OEM/ODM jars generally start from 1,000–3,000 pieces depending on glaze, lid and mold requirements.",
    },
    {
      q: "Can jars be customized with our branding?",
      a: "Yes. We offer custom glaze colours, embossed or printed logos, lid and capacity changes and new mold development, plus retail-ready branded packaging.",
    },
    {
      q: "Are your jars food-safe and dishwasher safe?",
      a: "Our ceramic jars are FDA and LFGB certified, lead and cadmium safe, and dishwasher safe under normal use; lids should be washed per their material guidance.",
    },
  ],
}

const tableServingTrays: L2Config = {
  parentSlug: "table-decor-drinkware",
  parentLabel: "Table Decor & Drinkware",
  slug: "serving-trays",
  label: "Serving Trays",
  productCategorySlugs: ["serving-trays"],
  keyword: "serving trays",
  h1: "Wholesale Ceramic Serving Trays for Table Presentation & Display",
  metaTitle: "Wholesale Ceramic Serving Trays | Bulk Platters & Display Trays",
  metaDescription:
    "Ceramic serving trays in bulk direct from a Chaozhou factory. Rectangular, round and tasting trays for cafés, hotels, gifting and retail display. Low MOQ, FDA/LFGB certified, full OEM/ODM customization.",
  metaKeywords:
    "wholesale ceramic serving trays, bulk display trays, ceramic tray manufacturer, tasting snack trays supplier, rectangular presentation trays wholesale, round display trays bulk, café hotel service trays, custom branded trays, OEM ODM serving trays, retail decor trays, food-safe ceramic trays",
  bannerImage: "/ceramic-snack-plate-for-home.webp",
  intro:
    "ADA Ceramics supplies ceramic serving trays for cafés, hotels, gift brands and lifestyle retailers. From tasting and snack trays to larger rectangular presentation trays, each piece pairs a refined glaze finish with a durable, food-safe body built for table service and retail display, with low MOQs and full OEM/ODM customization of size, colour and branding.",
  seo: {
    h2: "Refined Wholesale Serving Trays for Presentation & Display",
    procurementScenario:
      "Cafés, hotels, caterers and home-decor retailers need serving trays that present food and accents attractively and survive constant handling. Our ceramic serving trays are high-temperature fired for a dense body and a smooth, stain-resistant glaze, transitioning cleanly from kitchen to table and holding their finish through repeated service. A coordinated range of round, rectangular and tasting formats lets buyers build a consistent presentation and display program across outlets and retail shelves.",
    customService:
      "As a full OEM/ODM manufacturer we customize tray dimensions, rim profile, glaze colour, surface texture, embossed branding and retail packaging. Match a signature range, develop an exclusive tray shape from new molds, or adapt an existing line. Low minimum order quantities let buyers trial fresh ranges, with fast approved pre-production samples.",
    qualityLogistics:
      "Every serving tray order ships under strict QC with FDA and LFGB food-contact certification, edge testing and reinforced fragile-rated export packaging engineered for ocean freight. Our logistics team consolidates mixed decor loads, manages documentation and ships worldwide from Chaozhou, China on flexible FOB and CIF terms.",
    siloGuide:
      "Completing a table range? Browse our Cups & Mugs, Vases, Storage & Condiment Jars and Candle Holders sub-categories within the Table Decor & Drinkware Silo, or explore the Dinnerware and Bakeware Silos for tableware.",
  },
  procurement: {
    heading: "Shop Serving Trays by Procurement Need",
    tags: [
      { label: "Tasting & Snack Trays", href: "/table-decor-drinkware/serving-trays" },
      { label: "Rectangular Presentation Trays", href: "/table-decor-drinkware/serving-trays" },
      { label: "Round Display Trays", href: "/table-decor-drinkware/serving-trays" },
      { label: "Café & Hotel Service Trays", href: "/table-decor-drinkware/serving-trays" },
      { label: "Custom Branded Trays", href: "/contact" },
    ],
  },
  faqs: [
    {
      q: "Are your serving trays food-safe?",
      a: "Yes. Our serving trays are FDA and LFGB certified, lead and cadmium safe, with a smooth non-porous glaze suitable for direct food contact and table service.",
    },
    {
      q: "What tray shapes and sizes do you offer?",
      a: "We supply round, rectangular and tasting trays across snack, presentation and display sizes, with custom dimensions and rim profiles available via new mold development.",
    },
    {
      q: "What is the MOQ for wholesale serving trays?",
      a: "Standard MOQ starts at 500 pieces per design for stock trays. Custom OEM/ODM trays generally start from 1,000–3,000 pieces depending on glaze and mold requirements.",
    },
    {
      q: "Can trays be customized with our branding?",
      a: "Yes. We offer custom glaze colours, surface textures, embossed or printed logos, shape changes and new mold development, plus retail-ready branded packaging.",
    },
    {
      q: "Are your serving trays dishwasher safe?",
      a: "Our ceramic serving trays are dishwasher safe under normal use, and FDA/LFGB certified as food-contact safe for international markets.",
    },
  ],
}

const tableCandleHolders: L2Config = {
  parentSlug: "table-decor-drinkware",
  parentLabel: "Table Decor & Drinkware",
  slug: "candle-holders",
  label: "Candle Holders",
  productCategorySlugs: ["candle-holders"],
  keyword: "candle holders",
  h1: "Wholesale Ceramic Candle Holders for Ambiance, Gifting & Home Accents",
  metaTitle: "Wholesale Ceramic Candle Holders | Bulk Tealight & Pillar Holders",
  metaDescription:
    "Decorative ceramic candle holders in bulk direct from a Chaozhou factory. Tealight, pillar and taper holders for hospitality ambiance, gifting and retail home accents. Low MOQ, full OEM/ODM customization.",
  metaKeywords:
    "wholesale ceramic candle holders, bulk tealight votive holders, ceramic candle holder manufacturer, pillar candle holders supplier, taper candle holders wholesale, hospitality ambiance decor, home accent candle holders, custom branded candle holders, OEM ODM candle holders, retail gift candle holders",
  bannerImage: "/kiln-transformation.webp",
  intro:
    "ADA Ceramics supplies decorative ceramic candle holders for hotels, restaurants, gift brands and lifestyle retailers. From tealight and votive holders to pillar and taper designs, each piece pairs an on-trend silhouette with a heat-stable, durable glaze finish suited to hospitality ambiance and retail display, with low MOQs and full OEM/ODM customization of shape, colour and branding.",
  seo: {
    h2: "Atmospheric Wholesale Candle Holders for Decor & Gifting",
    procurementScenario:
      "Hotels, restaurants, spas, gift companies and home-decor retailers source candle holders that set an atmosphere and withstand repeated use and display. Our ceramic candle holders are high-temperature fired for a dense, heat-stable body and a refined glaze that holds its finish through styling rotations. A coordinated range of tealight, votive, pillar and taper formats lets buyers build cohesive ambiance collections for table settings, room accents and retail gift ranges.",
    customService:
      "As a full OEM/ODM manufacturer we customize holder silhouette, size, glaze colour, surface texture, embossed branding and retail gift packaging. Match a seasonal palette, develop an exclusive shape from new molds, or adapt an existing range. Low minimum order quantities let decor and gift brands trial fresh ranges, with fast approved pre-production samples.",
    qualityLogistics:
      "Every candle holder order ships with careful QC, heat-stability checks and reinforced fragile-rated export packaging engineered for ocean freight. Our logistics team consolidates mixed decor loads, manages documentation and ships worldwide from Chaozhou, China on flexible FOB and CIF terms.",
    siloGuide:
      "Completing a decor range? Browse our Cups & Mugs, Vases, Storage & Condiment Jars and Serving Trays sub-categories within the Table Decor & Drinkware Silo, or explore the Dinnerware and Bakeware Silos for tableware.",
  },
  procurement: {
    heading: "Shop Candle Holders by Procurement Need",
    tags: [
      { label: "Tealight & Votive Holders", href: "/table-decor-drinkware/candle-holders" },
      { label: "Pillar Candle Holders", href: "/table-decor-drinkware/candle-holders" },
      { label: "Taper Candle Holders", href: "/table-decor-drinkware/candle-holders" },
      { label: "Hospitality Ambiance Decor", href: "/table-decor-drinkware/candle-holders" },
      { label: "Custom Branded Holders", href: "/contact" },
    ],
  },
  faqs: [
    {
      q: "Are your ceramic candle holders heat-stable?",
      a: "Yes. Our candle holders are high-temperature fired for a dense, heat-stable body suitable for tealight, votive, pillar and taper candles under normal use.",
    },
    {
      q: "What candle holder styles do you offer?",
      a: "We supply tealight and votive holders, pillar holders and taper holders across a coordinated range of silhouettes, with custom shapes available via new mold development.",
    },
    {
      q: "What is the MOQ for wholesale candle holders?",
      a: "Standard MOQ starts at 500 pieces per design for stock holders. Custom OEM/ODM holders generally start from 1,000–3,000 pieces depending on glaze and mold requirements.",
    },
    {
      q: "Can candle holders be customized with our branding?",
      a: "Yes. We offer custom glaze colours, surface textures, embossed logos, shape changes and new mold development, plus retail-ready gift packaging.",
    },
    {
      q: "How are candle holders packed for export?",
      a: "Candle holders use reinforced, fragile-rated export packaging engineered for long-haul ocean freight, with mixed-load consolidation and full documentation shipped from Chaozhou, China.",
    },
  ],
}

// ----------------------------------------------------------------------------
// OEM Custom Ceramics（OEM 定制代工服务）Silo —— 复用同一通用 L2 模板
// （服务型细分：无对应库存品类时，产品网格优雅降级为空占位）
// ----------------------------------------------------------------------------

const oemLogoPrinting: L2Config = {
  parentSlug: "oem-custom-ceramics",
  parentLabel: "OEM Custom Ceramics",
  slug: "custom-logo-printing",
  label: "Custom Logo Printing",
  productCategorySlugs: ["custom-logo-printing"],
  keyword: "custom logo printing on ceramics",
  h1: "Custom Logo Printing on Ceramics | Branded Tableware Decoration",
  metaTitle: "Custom Logo Printing on Ceramics | Decal & Pad Print Branding",
  metaDescription:
    "Custom logo printing on ceramic tableware from a Chaozhou OEM factory. Decal, pad and stamp branding for mugs, plates and drinkware. Low MOQ, FDA/LFGB certified, fast sampling for global brands.",
  metaKeywords:
    "custom logo printing ceramics, decal logo printing tableware, pad print mugs, silk screen ceramic printing, branded ceramics OEM, private label logo printing, custom logo mugs bulk, custom branded dinnerware, ceramic logo decal supplier, low MOQ custom logo ceramics",
  bannerImage: "/custom-ceramic-tableware-logo-branding-services.webp",
  intro:
    "ADA Ceramics applies durable custom logo printing to ceramic tableware and drinkware for brands, cafés, hotels and promotional buyers. Using decal, pad and stamp techniques with fired-on, dishwasher-durable results, we turn stock or bespoke ceramics into fully branded product, with low MOQs, fast sampling and FDA/LFGB certified production.",
  seo: {
    h2: "Durable Custom Logo Printing for Branded Ceramics",
    procurementScenario:
      "Brands, cafés, hotels and promotional agencies need logo decoration that survives commercial dishwashing and daily use without fading. Our fired-on decal, pad and stamp printing bonds the design into a protective glaze layer for long-lasting, food-safe branding across mugs, plates, bowls and drinkware. Buyers can brand a proven stock shape or a bespoke product from a single accountable factory, keeping logo colour and placement consistent across every reorder.",
    customService:
      "We handle artwork setup, colour matching to brand standards, full-wrap and multi-position printing, and gold/metallic decals where required. Dedicated project managers guide proof approval, sampling and pre-production sign-off, while low minimum order quantities let emerging brands launch branded ranges without overcommitting. Combine logo printing with custom glaze, shape or packaging for a complete private-label program.",
    qualityLogistics:
      "All branded production runs under strict QC with FDA and LFGB certification, dishwasher-durability testing and reinforced export packaging. Our team manages documentation, compliance and worldwide shipping from Chaozhou, China on flexible FOB and CIF terms, keeping branded launches on schedule.",
    siloGuide:
      "Building a complete custom program? Explore our Custom Glaze & Color, New Mold Development and OEM & ODM Project Case Studies sub-categories within the OEM Custom Ceramics Silo, or browse the Dinnerware, Bakeware and Table Decor & Drinkware Silos for stock ranges to brand.",
  },
  procurement: {
    heading: "Start Your Custom Logo Printing Project",
    tags: [
      { label: "Decal Logo Printing", href: "/oem-custom-ceramics/custom-logo-printing" },
      { label: "Pad & Stamp Printing", href: "/oem-custom-ceramics/custom-logo-printing" },
      { label: "Full-Wrap Branding", href: "/oem-custom-ceramics/custom-logo-printing" },
      { label: "Gold & Metallic Decals", href: "/oem-custom-ceramics/custom-logo-printing" },
      { label: "Request a Quote", href: "/contact" },
    ],
  },
  faqs: [
    {
      q: "What logo printing techniques do you offer for ceramics?",
      a: "We offer fired-on decal, pad and stamp printing, including full-wrap, multi-position and gold/metallic decals, all bonded into a protective glaze layer for durability.",
    },
    {
      q: "Is the printed logo dishwasher durable?",
      a: "Yes. Our fired-on printing bonds the design into the glaze, producing dishwasher-durable, food-safe branding that resists fading under normal commercial use.",
    },
    {
      q: "What is the MOQ for custom logo printing?",
      a: "Logo printing on stock shapes typically starts from 500–1,000 pieces per design, with fully custom branded programs generally from 1,000–3,000 pieces depending on requirements.",
    },
    {
      q: "Can you match our exact brand colours?",
      a: "Yes. We colour-match decals and prints to your brand standards (Pantone references welcome) and provide pre-production proofs and samples for approval before bulk.",
    },
    {
      q: "Can logo printing be combined with custom glazes or shapes?",
      a: "Absolutely. Logo printing can be combined with custom glaze and colour, new mold development and bespoke packaging for a complete private-label program.",
    },
  ],
}

const oemGlazeColor: L2Config = {
  parentSlug: "oem-custom-ceramics",
  parentLabel: "OEM Custom Ceramics",
  slug: "custom-glaze-color",
  label: "Custom Glaze & Color",
  productCategorySlugs: ["custom-glaze-color"],
  keyword: "custom glaze and color development",
  h1: "Custom Glaze & Color Development for Private-Label Ceramics",
  metaTitle: "Custom Glaze & Color Development | Bespoke Ceramic Finishes",
  metaDescription:
    "Bespoke glaze and colour development from a Chaozhou OEM ceramic factory. Signature colour matching, reactive and matte glazes for private-label tableware. Low MOQ, FDA/LFGB certified, fast sampling.",
  metaKeywords:
    "custom glaze development, ceramic color matching, bespoke glaze factory, reactive glaze OEM, matte glaze tableware, custom color ceramics manufacturer, Pantone glaze matching, signature brand color ceramics, lead-free glaze development, OEM ODM glaze service",
  bannerImage: "/custom-color-glaze-ceramic.webp",
  intro:
    "ADA Ceramics develops bespoke glazes and signature colours for private-label ceramic ranges. From brand-matched solid colours to reactive, matte, speckled and gradient effects, our in-house glaze lab formulates food-safe finishes engineered for consistency across production, with low MOQs, fast sampling and FDA/LFGB certified results.",
  seo: {
    h2: "Bespoke Glaze & Color Development Engineered for Consistency",
    procurementScenario:
      "Brands and importers choose custom glaze development when a signature finish defines their range. Our glaze lab formulates brand-matched solid colours and on-trend reactive, matte, speckled and gradient effects, then engineers them for repeatable, food-safe results across large production runs. Buyers gain an exclusive look that differentiates retail shelves and hospitality programs while staying consistent reorder after reorder.",
    customService:
      "We match colours to brand standards, develop new glaze effects from references or samples, and balance aesthetics with manufacturability and compliance before tooling. Dedicated project managers guide glaze trials, sampling and pre-production sign-off, while low minimum order quantities let emerging brands launch a signature finish. Combine custom glaze with logo printing, new molds and packaging for a complete private-label program.",
    qualityLogistics:
      "All custom-glaze production runs under strict QC with FDA and LFGB certification, lead and cadmium safety testing, batch colour control and reinforced export packaging. We manage documentation, compliance and worldwide shipping from Chaozhou, China on flexible FOB and CIF terms.",
    siloGuide:
      "Building a complete custom program? Explore our Custom Logo Printing, New Mold Development and OEM & ODM Project Case Studies sub-categories within the OEM Custom Ceramics Silo, or browse the Dinnerware, Bakeware and Table Decor & Drinkware Silos for stock ranges to customize.",
  },
  procurement: {
    heading: "Start Your Custom Glaze & Color Project",
    tags: [
      { label: "Brand Colour Matching", href: "/oem-custom-ceramics/custom-glaze-color" },
      { label: "Reactive & Gradient Glazes", href: "/oem-custom-ceramics/custom-glaze-color" },
      { label: "Matte & Satin Finishes", href: "/oem-custom-ceramics/custom-glaze-color" },
      { label: "Speckled & Textured Glazes", href: "/oem-custom-ceramics/custom-glaze-color" },
      { label: "Request a Quote", href: "/contact" },
    ],
  },
  faqs: [
    {
      q: "Can you match a specific brand colour?",
      a: "Yes. Our glaze lab matches solid colours to your brand standards (Pantone references welcome) and provides glaze trial samples for approval before bulk production.",
    },
    {
      q: "What glaze effects can you develop?",
      a: "We develop solid colours plus reactive, gradient, matte, satin, speckled and textured effects, all engineered to be food-safe and repeatable across production.",
    },
    {
      q: "Are custom glazes food-safe and certified?",
      a: "Yes. All custom glazes are FDA and LFGB certified, lead and cadmium safe, and batch-tested for colour consistency and compliance.",
    },
    {
      q: "What is the MOQ for custom glaze development?",
      a: "Custom glaze ranges generally start from 1,000–3,000 pieces per design depending on the finish and shape, with flexible MOQs to help new brands launch.",
    },
    {
      q: "How long does glaze development take?",
      a: "Glaze trials and sampling usually take about 10–20 days, with bulk production 30–45 days after sample approval, depending on complexity and volume.",
    },
  ],
}

const oemMoldDevelopment: L2Config = {
  parentSlug: "oem-custom-ceramics",
  parentLabel: "OEM Custom Ceramics",
  slug: "new-mold-development",
  label: "New Mold Development",
  productCategorySlugs: ["new-mold-development"],
  keyword: "new mold development for ceramics",
  h1: "New Mold Development for Exclusive Ceramic Shapes & Tooling",
  metaTitle: "New Mold Development | Custom Ceramic Tooling & Shapes",
  metaDescription:
    "Custom ceramic mold and tooling development from a Chaozhou OEM factory. Exclusive shapes engineered from your drawings or samples for proprietary private-label designs. Low MOQ, FDA/LFGB certified.",
  metaKeywords:
    "new mold development, custom ceramic tooling, ceramic mold factory, bespoke ceramic shapes, proprietary design OEM, custom shape ceramics manufacturer, ceramic product development, made-to-order ceramic mold, ODM ceramic design service, low MOQ custom mold",
  bannerImage: "/ceramic-manufacturer.webp",
  intro:
    "ADA Ceramics develops new molds and tooling to bring exclusive ceramic shapes to life. From your drawings, CAD or physical samples, our in-house tooling team engineers proprietary designs for manufacturability, producing approved pre-production samples before bulk, with low MOQs and FDA/LFGB certified production.",
  seo: {
    h2: "Exclusive New Mold & Tooling Development from Concept to Production",
    procurementScenario:
      "Brands and designers commission new mold development when an existing shape cannot carry their concept. Our tooling team turns drawings, CAD files or reference samples into production-ready ceramic molds, engineering wall thickness, draft and shrinkage for consistent, manufacturable results. Buyers gain a proprietary product they fully own, differentiating retail ranges and hospitality programs from off-the-shelf tableware.",
    customService:
      "We provide design-for-manufacture review, 3D prototyping, master mold and production tooling creation, and approved pre-production sampling. Dedicated project managers guide each milestone from concept to sign-off, while low minimum order quantities make bespoke development viable for emerging brands. Combine new molds with custom glaze, logo printing and packaging for a complete private-label program.",
    qualityLogistics:
      "All tooling and production runs under strict QC with FDA and LFGB certification, dimensional inspection and reinforced export packaging. With in-house tooling and 30+ years of experience, we manage documentation, compliance and worldwide shipping from Chaozhou, China on flexible FOB and CIF terms.",
    siloGuide:
      "Building a complete custom program? Explore our Custom Logo Printing, Custom Glaze & Color and OEM & ODM Project Case Studies sub-categories within the OEM Custom Ceramics Silo, or browse the Dinnerware, Bakeware and Table Decor & Drinkware Silos for stock ranges.",
  },
  procurement: {
    heading: "Start Your New Mold Development Project",
    tags: [
      { label: "Design-for-Manufacture Review", href: "/oem-custom-ceramics/new-mold-development" },
      { label: "3D Prototyping", href: "/oem-custom-ceramics/new-mold-development" },
      { label: "Master & Production Tooling", href: "/oem-custom-ceramics/new-mold-development" },
      { label: "Pre-Production Sampling", href: "/oem-custom-ceramics/new-mold-development" },
      { label: "Request a Quote", href: "/contact" },
    ],
  },
  faqs: [
    {
      q: "Can you develop a brand-new ceramic product from our design?",
      a: "Yes. Our in-house tooling team develops new molds from your drawings, CAD files or physical samples, engineering the design for manufacturability before producing approved samples.",
    },
    {
      q: "Do you provide prototyping before tooling?",
      a: "We offer 3D prototyping and design-for-manufacture review to validate form, fit and manufacturability before committing to master and production tooling.",
    },
    {
      q: "What is the MOQ for products from new molds?",
      a: "Custom-mold products generally start from 1,000–3,000 pieces per design depending on complexity, with flexible MOQs to support new brand launches.",
    },
    {
      q: "How long does new mold development take?",
      a: "Tooling and sampling typically take about 15–30 days depending on complexity, with bulk production 30–45 days after sample approval.",
    },
    {
      q: "Do we own the molds we commission?",
      a: "Custom tooling developed for your proprietary design is dedicated to your production; ownership and exclusivity terms are confirmed in your project agreement.",
    },
  ],
}

const oemCaseStudies: L2Config = {
  parentSlug: "oem-custom-ceramics",
  parentLabel: "OEM Custom Ceramics",
  slug: "oem-odm-case-studies",
  label: "OEM & ODM Project Case Studies",
  productCategorySlugs: ["oem-odm-case-studies"],
  keyword: "OEM ODM ceramic project case studies",
  h1: "OEM & ODM Project Case Studies | Proven Private-Label Ceramics",
  metaTitle: "OEM & ODM Ceramic Case Studies | Private-Label Projects",
  metaDescription:
    "Explore OEM/ODM ceramic project case studies from a Chaozhou factory. Proven private-label tableware, drinkware and decor programs delivered for global brands and Horeca buyers. Low MOQ, FDA/LFGB certified.",
  metaKeywords:
    "OEM ceramic case studies, ODM project examples, private label tableware projects, custom ceramics portfolio, ceramic manufacturer China, branded ceramic projects, private label packaging ceramics, hotel restaurant OEM projects, contract ceramic manufacturing examples, trusted ceramic OEM partner",
  bannerImage: "/custom-ceramic-tableware-packaging-labeling-services.webp",
  intro:
    "ADA Ceramics has delivered private-label ceramic programs for global retail brands, café and hotel groups and gift companies. These OEM/ODM case studies showcase how we take projects from concept through tooling, custom glaze, logo printing and packaging to shelf-ready production, with low MOQs and FDA/LFGB certified manufacturing.",
  seo: {
    h2: "Proven OEM & ODM Ceramic Programs Delivered Worldwide",
    procurementScenario:
      "Buyers evaluating a manufacturing partner want proof of delivery on real private-label programs. Our case studies span retail homeware ranges, branded café and hotel drinkware, promotional gifting and exclusive designer collections, demonstrating our ability to scale from pilot runs to full container production. Each project shows coordinated design, tooling, glaze, branding and packaging managed by a single accountable factory.",
    customService:
      "Every program is supported by in-house design, tooling and a dedicated project manager guiding artwork, sampling and pre-production sign-off. Low minimum order quantities let emerging brands launch, while our experience de-risks complex multi-component collections. Use these examples as a starting point, then tailor a program with custom logo printing, glaze, new molds and packaging.",
    qualityLogistics:
      "All featured programs were produced under strict QC with FDA and LFGB certification, batch inspection and reinforced export packaging. With 30+ years of experience, we manage documentation, compliance and worldwide shipping from Chaozhou, China on flexible FOB and CIF terms.",
    siloGuide:
      "Ready to start your own program? Explore our Custom Logo Printing, Custom Glaze & Color and New Mold Development sub-categories within the OEM Custom Ceramics Silo, or browse the Dinnerware, Bakeware and Table Decor & Drinkware Silos for stock ranges to customize.",
  },
  procurement: {
    heading: "Explore Our OEM & ODM Project Work",
    tags: [
      { label: "Retail Private-Label Ranges", href: "/oem-custom-ceramics/oem-odm-case-studies" },
      { label: "Branded Café & Hotel Programs", href: "/oem-custom-ceramics/oem-odm-case-studies" },
      { label: "Promotional Gifting", href: "/oem-custom-ceramics/oem-odm-case-studies" },
      { label: "Designer Collections", href: "/oem-custom-ceramics/oem-odm-case-studies" },
      { label: "Start Your Project", href: "/contact" },
    ],
  },
  faqs: [
    {
      q: "What kinds of OEM/ODM projects have you delivered?",
      a: "We have delivered retail private-label ranges, branded café and hotel drinkware, promotional gifting and exclusive designer collections across tableware, drinkware and decor.",
    },
    {
      q: "Can you scale from a pilot run to full production?",
      a: "Yes. Our factory scales from low-MOQ pilot runs to full container production, with consistent quality and branding maintained across reorders.",
    },
    {
      q: "How do you manage complex multi-component collections?",
      a: "A dedicated project manager coordinates design, tooling, glaze, logo printing, packaging and QC, giving you a single accountable partner from concept to delivery.",
    },
    {
      q: "What is the MOQ to start a private-label project?",
      a: "Custom programs generally start from 1,000–3,000 pieces per design, with flexible MOQs to help new and growing brands launch.",
    },
    {
      q: "How do I start a project like these?",
      a: "Send your concept, specs and artwork via our contact page for a tailored quote; our team will guide tooling, sampling and production planning.",
    },
  ],
}

// ----------------------------------------------------------------------------
// 汇总 + 查询辅助（键名固定为 `${parentSlug}/${slug}`，便于路由按 silo+l2 取配置）
// ----------------------------------------------------------------------------

export const L2_CONFIGS: Record<string, L2Config> = {
  "bakeware/ramekin-bowls": ramekinBowls,
  "bakeware/baking-dishes-casseroles": bakingDishes,
  "bakeware/loaf-pie-pizza-pans": piePizzaPans,
  "dinnerware/plates": dinnerwarePlates,
  "dinnerware/bowls": dinnerwareBowls,
  "dinnerware/dinnerware-sets": dinnerwareSets,
  "dinnerware/serve-dishes": dinnerwareServeDishes,
  "table-decor-drinkware/cups-mugs": tableCupsMugs,
  "table-decor-drinkware/vases": tableVases,
  "table-decor-drinkware/storage-condiment-jars": tableStorageJars,
  "table-decor-drinkware/serving-trays": tableServingTrays,
  "table-decor-drinkware/candle-holders": tableCandleHolders,
  "oem-custom-ceramics/custom-logo-printing": oemLogoPrinting,
  "oem-custom-ceramics/custom-glaze-color": oemGlazeColor,
  "oem-custom-ceramics/new-mold-development": oemMoldDevelopment,
  "oem-custom-ceramics/oem-odm-case-studies": oemCaseStudies,
}

/** 取某个 L2 配置 */
export function getL2Config(parentSlug: string, slug: string): L2Config | undefined {
  return L2_CONFIGS[`${parentSlug}/${slug}`]
}

/** 取某个 L1 Silo 下全部 L2 配置（用于横向兄弟跳转 + 静态参数生成） */
export function getL2ConfigsByParent(parentSlug: string): L2Config[] {
  return Object.values(L2_CONFIGS).filter((c) => c.parentSlug === parentSlug)
}

/**
 * 反查：由 Supabase 产品分类 slug 反推其所属的 L2 配置（含所属 Silo）。
 * 用于把历史扁平产品链接（/products/[categorySlug]/[productSlug]）
 * 收敛到唯一的 Silo 层级路径 /[silo]/[l2]/[productSlug]，杜绝重复/冲突 URL。
 */
export function getL2ConfigByProductCategorySlug(categorySlug: string): L2Config | undefined {
  return Object.values(L2_CONFIGS).find((c) => c.productCategorySlugs.includes(categorySlug))
}

/**
 * 由产品分类 slug + 产品 slug 直接构造规范的 Silo 层级详情页路径（不含 locale 前缀）。
 * 命中映射返回 `/{silo}/{l2}/{productSlug}`；未命中回退到对应 Silo 首页或站点首页，避免死链。
 */
export function buildSiloProductPath(categorySlug: string, productSlug: string): string {
  const l2 = getL2ConfigByProductCategorySlug(categorySlug)
  if (!l2) return "/products"
  return `/${l2.parentSlug}/${l2.slug}/${productSlug}`
}

// ============================================================================
// 4 大 Silo 一级分类集合页配置（数据驱动，单一模板复用）
// 仅承载本文件 4 个同级一级分类页面的内容，不影响全站其它路由/组件。
// 图片 alt 统一模板：wholesale ceramic [品类词] custom OEM tableware for Horeca bulk buyers
// ============================================================================

export type SiloSubcategory = {
  /** H2 卡片标题 */
  name: string
  /** 卡片简短介绍 */
  blurb: string
  /** 向下内链：直达细分页面锚链接（不含 locale 前缀） */
  href: string
  /** 卡片配图（复用站点现有 WebP 资源） */
  image: string
  /** 图片 SEO 关键词（用于 alt 模板） */
  altKeyword: string
}

export type SiloFaqItem = { q: string; a: string }

export type ProcurementTag = {
  label: string
  /** 锚文本内链（不含 locale 前缀） */
  href: string
}

export type SiloConfig = {
  /** 页面一级 URL slug（同级不嵌套） */
  slug: string
  /** 拉取热销产品时尝试的分类 slug（多候选自动合并，未命中安全跳过） */
  productCategorySlugs: string[]
  /** 品类核心关键词，用于图片 alt 模板 */
  keyword: string
  /** 页面唯一 H1 核心流量标题 */
  h1: string
  /** 独立 meta title */
  metaTitle: string
  /** 独立 meta description */
  metaDescription: string
  metaKeywords: string
  /** 首屏 Banner 全屏宽产品图 */
  bannerImage: string
  /** 约 100 词 B 端批发简介 */
  intro: string
  /** 子分类快捷卡片组 */
  subcategories: SiloSubcategory[]
  /** SEO 正文长文本（300-350 词）三段 + Silo 区分引导句 */
  seo: {
    h2: string
    procurementScenario: string
    customService: string
    qualityLogistics: string
    siloGuide: string
  }
  /** 采购场景筛选标签栏 */
  procurement: {
    heading: string
    tags: ProcurementTag[]
  }
  /** FAQ：5 条 B 端采购高频问答 */
  faqs: SiloFaqItem[]
}

/** 生成统一的图片 alt 文本 */
export function buildAlt(keyword: string): string {
  return `wholesale ceramic ${keyword} custom OEM tableware for Horeca bulk buyers`
}

// ----------------------------------------------------------------------------
// 1. Dinnerware（正餐餐具）
// ----------------------------------------------------------------------------
const dinnerware: SiloConfig = {
  slug: "dinnerware",
  productCategorySlugs: [
    "wholesale-plates",
    "wholesale-bowls",
    "wholesale-dinnerware-sets",
    "plates",
    "bowls",
    "dinnerware-sets",
    "dinnerware",
  ],
  keyword: "dinnerware",
  h1: "Wholesale Ceramic Dinnerware Manufacturer for Restaurants, Hotels & Catering",
  metaTitle: "Wholesale Ceramic Dinnerware Supplier | Bulk Plates, Bowls & Sets | OEM",
  metaDescription:
    "Factory-direct wholesale ceramic dinnerware supplier and OEM manufacturer. Chip-resistant bulk dinner plates, bowls, serve dishes and complete porcelain dinnerware sets for restaurants, hotels and caterers. Custom logo & private-label service, low MOQ, FDA/LFGB certified.",
  metaKeywords:
    "wholesale ceramic dinnerware, bulk dinner plates, ceramic dinnerware supplier, restaurant dinnerware wholesale, hotel tableware supplier, porcelain dinnerware manufacturer, wholesale ceramic serveware, serving platters supplier, custom porcelain dinnerware, OEM/ODM custom dinnerware, custom logo private label dinnerware, chip-resistant restaurant plates, commercial grade stoneware dinnerware, catering dinnerware bulk, FDA LFGB certified dinnerware",
  bannerImage: "/porcelain-tableware-for-restaurants.webp",
  intro:
    "ADA Ceramics manufactures commercial-grade ceramic dinnerware for global Horeca buyers, importers and retail brands. Our dinnerware Silo covers chip-resistant plates, versatile bowls, oven-to-table serve dishes and fully matched dinnerware sets fired in high-temperature kilns for superior strength and a clean glaze finish. Every piece is food-safe, dishwasher-durable and built for high-volume restaurant, hotel and catering service. With low MOQs, reliable lead times and complete OEM/ODM customization, we help wholesale partners stock dependable everyday tableware and launch private-label dinnerware collections that win repeat orders worldwide.",
  subcategories: [
    {
      name: "Dinnerware Sets",
      blurb: "Fully matched ceramic dinner sets for hotels, B&Bs and hospitality groups.",
      href: "/dinnerware/dinnerware-sets",
      image: "/wholesale-dinnerware-sets.webp",
      altKeyword: "dinnerware sets",
    },
    {
      name: "Plates",
      blurb: "Chip-resistant dinner, dessert and side plates for busy food service.",
      href: "/dinnerware/plates",
      image: "/wholesale-plates.webp",
      altKeyword: "dinner plates",
    },
    {
      name: "Bowls",
      blurb: "Soup, salad, ramen and snack bowls in commercial-ready sizes.",
      href: "/dinnerware/bowls",
      image: "/wholesale-bowls.webp",
      altKeyword: "soup and salad bowls",
    },
    {
      name: "Serve Dishes",
      blurb: "Oval platters and serving dishes for family-style and buffet dining.",
      href: "/dinnerware/serve-dishes",
      image: "/images/categories/white-ceramic-oval-roasting-platter-turkey-serving-bakeware.webp",
      altKeyword: "serving dishes and platters",
    },
  ],
  seo: {
    h2: "Wholesale Ceramic Dinnerware Built for Commercial Food Service",
    procurementScenario:
      "Restaurants, hotels and catering companies rely on dinnerware that survives constant stacking, washing and plating without chipping. Our ceramic plates, bowls and serve dishes are fired at high temperature for dense, impact-resistant bodies and a smooth non-porous glaze that resists staining and odour. From à la carte fine dining and hotel breakfast buffets to canteen and banquet service, buyers can standardize one durable dinnerware program across every outlet, lowering replacement costs and keeping table presentation consistent at scale.",
    customService:
      "As a full OEM/ODM dinnerware manufacturer we tailor shape, size, glaze colour, rim style, embossing and branded packaging to your specification. Send artwork for custom logo printing, request bespoke glaze matching, or develop an entirely new mold for an exclusive dinnerware collection. Low minimum order quantities let importers and private-label brands test new ranges before scaling, while our in-house sampling team turns concepts into approved pre-production samples quickly so your launch timeline stays on track.",
    qualityLogistics:
      "Every dinnerware order is produced under strict QC with FDA and LFGB food-contact certification, batch inspection and reinforced export packaging engineered for long-haul ocean freight. Our experienced logistics team consolidates mixed dinnerware loads, handles documentation and ships worldwide from Chaozhou, China, supporting FOB and container orders for distributors and chain buyers.",
    siloGuide:
      "Looking beyond plates and bowls? Explore our dedicated Bakeware, Table Decor & Drinkware and OEM Custom Ceramics Silos for oven dishes, mugs, vases and bespoke private-label projects.",
  },
  procurement: {
    heading: "Shop Dinnerware by Procurement Need",
    tags: [
      { label: "Restaurant Dinnerware", href: "/dinnerware/plates" },
      { label: "Hotel Tableware", href: "/dinnerware/dinnerware-sets" },
      { label: "Catering Bulk Bowls", href: "/dinnerware/bowls" },
      { label: "Buffet Serve Dishes", href: "/dinnerware/serve-dishes" },
      { label: "Private-Label Sets", href: "/oem-custom-ceramics" },
    ],
  },
  faqs: [
    {
      q: "What is the minimum order quantity for wholesale dinnerware?",
      a: "Our standard MOQ starts at 500 pieces per item for in-stock shapes, with flexible mixed-container loading. Custom OEM/ODM dinnerware typically starts from 1,000–3,000 pieces depending on mold and glaze requirements.",
    },
    {
      q: "Is your ceramic dinnerware food-safe and certified?",
      a: "Yes. All dinnerware is FDA and LFGB certified for food contact, lead and cadmium safe, dishwasher and microwave safe, and produced under batch quality inspection.",
    },
    {
      q: "Can you produce custom dinnerware with our logo or design?",
      a: "Absolutely. We offer custom logo printing, decal and stamp branding, bespoke glaze colours, custom shapes and new mold development for fully private-label dinnerware collections.",
    },
    {
      q: "How chip-resistant is your commercial dinnerware?",
      a: "Our dinnerware is high-temperature fired for a dense, hard-wearing body with reinforced rims, making it well suited to the repeated stacking and washing of restaurant and hotel use.",
    },
    {
      q: "What are your lead times and shipping terms for bulk dinnerware?",
      a: "Sampling takes about 7–15 days and bulk production 25–40 days depending on volume. We ship worldwide on FOB or CIF terms with export-grade packaging from Chaozhou, China.",
    },
  ],
}

// ----------------------------------------------------------------------------
// 2. Bakeware（烘焙烤盘器皿）
// ----------------------------------------------------------------------------
const bakeware: SiloConfig = {
  slug: "bakeware",
  productCategorySlugs: ["wholesale-bakeware", "bakeware", "baking-dishes", "ramekins", "pie-pizza-plates"],
  keyword: "bakeware",
  h1: "Wholesale Ceramic Bakeware Manufacturer | Oven-Safe Baking Dishes for Bulk Buyers",
  metaTitle: "Wholesale Ceramic Bakeware Manufacturer | Oven-Safe Baking Dishes & Ramekins",
  metaDescription:
    "Factory-direct wholesale ceramic bakeware manufacturer. Oven-safe, thermal-shock resistant ramekins, baking dishes, casseroles, loaf, pie and pizza pans for restaurants, bakeries and retail brands. OEM/ODM private-label service, low MOQ, FDA/LFGB & lead-free glaze.",
  metaKeywords:
    "wholesale ceramic bakeware, ceramic bakeware manufacturer, bulk baking dish supplier, stoneware bakeware wholesale, OEM/ODM custom bakeware, custom logo private label bakeware, factory direct ceramic kitchenware, oven-safe ceramic baking dish bulk, thermal shock resistant bakeware, wholesale ramekins casseroles, lead-free glaze bakeware, FDA LFGB bakeware supplier",
  bannerImage: "/wholesale-bakeware.webp",
  intro:
    "ADA Ceramics produces durable, oven-safe ceramic bakeware for commercial kitchens, bakeries and homeware retailers around the world. Our bakeware Silo covers individual ramekins, family-size baking dishes and casseroles, plus loaf, pie and pizza pans engineered to withstand high oven temperatures and thermal shock. The dense ceramic body delivers even heat distribution for consistent baking results, while the easy-clean glaze handles daily professional use. With low MOQs and complete OEM/ODM customization of size, colour and branding, we help wholesale partners build reliable bakeware ranges that perform from oven to table.",
  subcategories: [
    {
      name: "Ramekin Bowls",
      blurb: "Individual oven-safe ramekins for soufflés, crème brûlée and sides.",
      href: "/bakeware/ramekin-bowls",
      image: "/images/categories/white-ceramic-ramekins-bakeware-subcat-wholesale.webp",
      altKeyword: "ramekin bowls",
    },
    {
      name: "Baking Dishes & Casseroles",
      blurb: "Family-size baking dishes and lidded casseroles for oven-to-table service.",
      href: "/bakeware/baking-dishes-casseroles",
      image: "/wholesale-bakeware.webp",
      altKeyword: "baking dishes and casseroles",
    },
    {
      name: "Loaf, Pie & Pizza Pans",
      blurb: "Loaf, pie and pizza bakeware for bakeries and restaurant kitchens.",
      href: "/bakeware/loaf-pie-pizza-pans",
      image: "/images/categories/ceramic-loaf-pie-pizza-bakeware-collection-for-bakery-restaurant.webp",
      altKeyword: "loaf pie and pizza pans",
    },
  ],
  seo: {
    h2: "Oven-Safe Wholesale Bakeware Engineered for Daily Kitchen Use",
    procurementScenario:
      "Bakeries, restaurants, hotels and retail brands need bakeware that moves straight from a hot oven to the table and back through the dishwasher without cracking. Our ceramic ramekins, baking dishes, casseroles and pie pans are fired for thermal-shock resistance and even heat retention, so baked goods cook uniformly and stay warm at service. Whether you supply professional kitchens running continuous bakes or retail shelves selling homeware ranges, a single durable bakeware program keeps presentation and performance consistent across every order.",
    customService:
      "We provide full OEM/ODM bakeware customization including capacity and dimension changes, custom glaze colours, embossed logos, handle styling and retail-ready gift packaging. Submit your artwork for branding, match a signature colour, or commission new mold development for an exclusive bakeware line. Low minimum order quantities let buyers trial fresh ranges, and our sampling team delivers approved pre-production samples fast to protect your launch schedule.",
    qualityLogistics:
      "All bakeware is manufactured under strict QC with FDA and LFGB food-contact certification, thermal testing and reinforced export packaging built for ocean freight. Our logistics team consolidates mixed bakeware loads, manages export documentation and ships worldwide from Chaozhou, China on flexible FOB and container terms.",
    siloGuide:
      "Need more than oven dishes? Visit our Dinnerware, Table Decor & Drinkware and OEM Custom Ceramics Silos for plates, mugs, vases and fully bespoke private-label production.",
  },
  procurement: {
    heading: "Shop Bakeware by Procurement Need",
    tags: [
      { label: "Bakery Supply", href: "/bakeware/loaf-pie-pizza-pans" },
      { label: "Restaurant Casseroles", href: "/bakeware/baking-dishes-casseroles" },
      { label: "Individual Ramekins", href: "/bakeware/ramekin-bowls" },
      { label: "Retail Homeware", href: "/bakeware" },
      { label: "Custom Bakeware", href: "/oem-custom-ceramics" },
    ],
  },
  faqs: [
    {
      q: "Is your ceramic bakeware oven and thermal-shock safe?",
      a: "Yes. Our bakeware is high-temperature fired and thermal-tested for oven use, with a dense body that resists cracking from normal heating and cooling cycles in professional kitchens.",
    },
    {
      q: "What is the MOQ for wholesale bakeware orders?",
      a: "Standard MOQ starts at 500 pieces per item for stock designs. Custom OEM/ODM bakeware generally starts from 1,000–3,000 pieces depending on mold and glaze needs.",
    },
    {
      q: "Can bakeware be customized with our brand or colours?",
      a: "Yes. We offer custom glaze colour matching, embossed or printed logos, dimension changes and new mold development, plus retail-ready branded packaging for private-label lines.",
    },
    {
      q: "Are your baking dishes microwave and dishwasher safe?",
      a: "Our ceramic bakeware is microwave and dishwasher safe under normal use, and FDA/LFGB certified as food-contact safe for global markets.",
    },
    {
      q: "How is bakeware packed for export?",
      a: "Each piece is protected with reinforced export packaging designed for long-haul ocean freight, and we consolidate mixed loads with full documentation shipped from Chaozhou, China.",
    },
  ],
}

// ----------------------------------------------------------------------------
// 3. Table Decor & Drinkware（桌面装饰 + 饮具）
// ----------------------------------------------------------------------------
const tableDecorDrinkware: SiloConfig = {
  slug: "table-decor-drinkware",
  productCategorySlugs: ["wholesale-cups-mugs", "cups-mugs", "table-decor-drinkware"],
  keyword: "table decor and drinkware",
  h1: "Wholesale Ceramic Drinkware & Table Decor Manufacturer for Cafés & Retail",
  metaTitle: "Wholesale Ceramic Drinkware & Table Decor | Custom Mugs, Vases & Jars",
  metaDescription:
    "Factory-direct wholesale ceramic drinkware and table decor supplier. Custom coffee mugs, cups, vases, storage jars, serving trays and candle holders for cafés, gifting and retail brands. Custom logo printing, OEM/ODM branding, low MOQ, FDA/LFGB certified.",
  metaKeywords:
    "custom ceramic mugs wholesale, wholesale drinkware supplier, ceramic mug manufacturer, bulk coffee mugs, custom logo mugs bulk, OEM/ODM custom drinkware, custom logo private label drinkware, custom printed mugs wholesale, sublimation mugs wholesale, ceramic vases bulk, café branded mugs, table decor supplier, ceramic storage jars wholesale, candle holders bulk",
  bannerImage: "/ceramic-gift-mug.webp",
  intro:
    "ADA Ceramics supplies stylish ceramic table decor and drinkware for cafés, hospitality groups, gift brands and lifestyle retailers worldwide. This Silo brings together cups and mugs, decorative vases, storage and condiment jars, serving trays and candle holders that elevate any table setting. Each piece blends on-trend design with food-safe, durable ceramic construction suited to daily commercial use and retail display. With low MOQs and complete OEM/ODM customization of shape, glaze colour, logo and packaging, we help partners launch cohesive drinkware and home-accent collections that stand out on shelves and in cafés.",
  subcategories: [
    {
      name: "Cups & Mugs",
      blurb: "Coffee mugs, cups and saucers for cafés, offices and branded gifting.",
      href: "/table-decor-drinkware/cups-mugs",
      image: "/images/categories/wholesale-ceramic-coffee-mug-and-saucer-commercial-cafe-supplies.webp",
      altKeyword: "cups and mugs",
    },
    {
      name: "Vases",
      blurb: "Decorative ceramic vases for hospitality styling and retail home decor.",
      href: "/table-decor-drinkware/vases",
      image: "/images/categories/wholesale-gradient-glaze-ceramic-vase-hotel-hospitality-home-decoration.webp",
      altKeyword: "decorative vases",
    },
    {
      name: "Storage & Condiment Jars",
      blurb: "Sealed storage and condiment jars for kitchens, delis and retail.",
      href: "/table-decor-drinkware/storage-condiment-jars",
      image: "/images/categories/wholesale-gloss-ceramic-storage-jars-wood-lid-sealed-condiment-container-set.webp",
      altKeyword: "storage and condiment jars",
    },
    {
      name: "Serving Trays",
      blurb: "Ceramic serving trays for table presentation and display.",
      href: "/table-decor-drinkware/serving-trays",
      image: "/ceramic-snack-plate-for-home.webp",
      altKeyword: "serving trays",
    },
    {
      name: "Candle Holders",
      blurb: "Ceramic candle holders for ambiance, gifting and home accents.",
      href: "/table-decor-drinkware/candle-holders",
      image: "/images/categories/wholesale-matte-ceramic-candle-jars-empty-candle-holders-for-gift-suppliers.webp",
      altKeyword: "candle holders",
    },
  ],
  seo: {
    h2: "Wholesale Drinkware & Table Decor That Elevates Every Setting",
    procurementScenario:
      "Cafés, restaurants, gift companies and lifestyle retailers source drinkware and table decor that balances visual appeal with everyday durability. Our ceramic mugs, cups, vases, jars, trays and candle holders are produced with a smooth, food-safe glaze and a sturdy body that withstands repeated café service and retail handling. From branded coffee programs and hotel room accents to curated gift sets and home-decor ranges, buyers can build a coordinated collection of drinkware and decorative pieces that reinforces brand identity across every touchpoint.",
    customService:
      "Our OEM/ODM service customizes mug shapes, handle styles, vase silhouettes, glaze colours, logo printing and complete retail packaging. Send artwork for custom branded drinkware, match a seasonal colour palette, or develop a new mold for an exclusive vase or jar design. Low minimum order quantities make it easy to test gift and decor ranges, and our sampling team produces approved samples quickly so collections reach market on time.",
    qualityLogistics:
      "Every drinkware and decor order ships with FDA and LFGB food-contact certification where applicable, careful QC and reinforced export packaging suited to fragile-item ocean freight. We consolidate mixed decor loads, handle documentation and ship worldwide from Chaozhou, China on flexible FOB and container terms.",
    siloGuide:
      "Furnishing the full table? Browse our Dinnerware, Bakeware and OEM Custom Ceramics Silos for plates, oven dishes and tailor-made private-label ceramics.",
  },
  procurement: {
    heading: "Shop Table Decor & Drinkware by Procurement Need",
    tags: [
      { label: "Café Drinkware", href: "/table-decor-drinkware/cups-mugs" },
      { label: "Branded Gift Mugs", href: "/oem-custom-ceramics" },
      { label: "Hospitality Decor Vases", href: "/table-decor-drinkware/vases" },
      { label: "Kitchen Storage Jars", href: "/table-decor-drinkware/storage-condiment-jars" },
      { label: "Retail Home Accents", href: "/table-decor-drinkware/candle-holders" },
    ],
  },
  faqs: [
    {
      q: "Can you produce custom branded mugs and drinkware?",
      a: "Yes. Custom logo printing, decal branding, bespoke glaze colours, custom mug shapes and new mold development are all available for private-label drinkware programs.",
    },
    {
      q: "What is the MOQ for table decor and drinkware?",
      a: "Stock mugs and decor items start at 500 pieces per design, while fully custom OEM/ODM pieces generally start from 1,000–3,000 pieces depending on complexity.",
    },
    {
      q: "Are your mugs and cups food-safe and dishwasher safe?",
      a: "Yes. Our drinkware is FDA and LFGB certified, lead and cadmium safe, and dishwasher and microwave safe under normal use.",
    },
    {
      q: "Do you supply decorative items like vases and candle holders for retail?",
      a: "We do. Vases, storage jars, serving trays and candle holders are available for retail and hospitality buyers, with custom glazes, shapes and branded packaging.",
    },
    {
      q: "How are fragile decor pieces packed for export?",
      a: "Decorative and drinkware items use reinforced, fragile-rated export packaging engineered for ocean freight, with mixed-load consolidation shipped from Chaozhou, China.",
    },
  ],
}

// ----------------------------------------------------------------------------
// 4. OEM Custom Ceramics（OEM 定制代工服务）
// ----------------------------------------------------------------------------
const oemCustomCeramics: SiloConfig = {
  slug: "oem-custom-ceramics",
  productCategorySlugs: ["oem-odm", "oem-custom-ceramics"],
  keyword: "custom OEM ceramics",
  h1: "OEM/ODM Custom Ceramics Manufacturer | Private-Label Tableware Service",
  metaTitle: "OEM Custom Ceramics Manufacturer | Private-Label Tableware ODM Factory",
  metaDescription:
    "Full-service OEM/ODM custom ceramics manufacturer in Chaozhou, China. Custom logo printing, bespoke glaze & color development, new mold development and private-label project management for global brands and Horeca buyers. Low MOQ, fast sampling, FDA/LFGB certified.",
  metaKeywords:
    "ceramic OEM manufacturer, ODM ceramics factory, custom ceramic manufacturer China, private label ceramics, custom logo printing ceramics, custom glaze color development, new mold development ceramics, private label packaging ceramics, contract ceramic manufacturing, ceramic tableware OEM low MOQ, ceramic ODM lead time, FDA LFGB ceramic factory, branded tableware manufacturer",
  bannerImage: "/custom-ceramic-tableware-logo-branding-services.webp",
  intro:
    "ADA Ceramics is a full-service OEM and ODM ceramic manufacturer helping global brands, importers and Horeca buyers bring custom tableware to life. From custom logo printing and bespoke glaze and colour development to new mold creation and end-to-end private-label project management, our factory turns your concept into shelf-ready ceramics. With 30+ years of manufacturing experience, in-house design and tooling, low MOQs and FDA/LFGB certified production, we support everything from a single branded mug program to a complete private-label dinnerware collection — backed by dedicated project coordination and reliable worldwide shipping.",
  subcategories: [
    {
      name: "Custom Logo Printing",
      blurb: "Decal, pad and stamp logo branding for fully customized tableware.",
      href: "/oem-custom-ceramics/custom-logo-printing",
      image: "/custom-ceramic-tableware-logo-branding-services.webp",
      altKeyword: "custom logo printing",
    },
    {
      name: "Custom Glaze & Color",
      blurb: "Bespoke glaze matching and signature colour development for your brand.",
      href: "/oem-custom-ceramics/custom-glaze-color",
      image: "/custom-color-glaze-ceramic.webp",
      altKeyword: "custom glaze and color",
    },
    {
      name: "New Mold Development",
      blurb: "Exclusive shape and tooling development for proprietary designs.",
      href: "/oem-custom-ceramics/new-mold-development",
      image: "/images/categories/custom-size-ceramic-wares-3d-design-oem-odm-project-case-for-global-brands.webp",
      altKeyword: "new mold development",
    },
    {
      name: "OEM & ODM Project Case Studies",
      blurb: "Proven private-label projects delivered for global ceramic brands.",
      href: "/oem-custom-ceramics/oem-odm-case-studies",
      image: "/images/categories/wedding-event-catering.webp",
      altKeyword: "OEM ODM project case studies",
    },
    {
      name: "Request Custom Quote",
      blurb: "Send your specs and artwork for a fast, tailored production quote.",
      href: "/contact",
      image: "/images/categories/b2b-ceramic-order-inquiry-form-request-tailored-production-custom-quote.webp",
      altKeyword: "custom ceramic quote",
    },
  ],
  seo: {
    h2: "End-to-End OEM & ODM Ceramic Manufacturing for Global Brands",
    procurementScenario:
      "Brands, importers and hospitality groups choose OEM/ODM production when off-the-shelf tableware cannot carry their identity. Our custom ceramics service supports private-label retail ranges, branded café and hotel programs, promotional gifting and exclusive designer collections. Whether you need your logo on a proven shape or a completely original product engineered from scratch, our factory scales from pilot runs to full container production, giving buyers a single accountable partner for design, tooling, manufacturing and packaging.",
    customService:
      "Our customization covers the entire journey: custom logo printing with decal, pad and stamp techniques; bespoke glaze and colour matching to brand standards; new mold and tooling development for proprietary shapes; and complete private-label packaging and labelling. Dedicated project managers guide artwork approval, sampling and pre-production sign-off, while low minimum order quantities let emerging brands launch without overcommitting. In-house design support helps refine concepts for manufacturability and cost efficiency before tooling begins.",
    qualityLogistics:
      "All custom production runs under strict QC with FDA and LFGB certification, full batch inspection and reinforced export packaging. With 30+ years of experience, we manage documentation, compliance and worldwide shipping from Chaozhou, China on flexible FOB and CIF terms, keeping private-label launches on schedule.",
    siloGuide:
      "Prefer to start from a stock range? Explore our Dinnerware, Bakeware and Table Decor & Drinkware Silos, then customize any product through this OEM service.",
  },
  procurement: {
    heading: "Start Your Custom Ceramic Project",
    tags: [
      { label: "Custom Logo Printing", href: "/oem-custom-ceramics/custom-logo-printing" },
      { label: "Bespoke Glaze & Color", href: "/oem-custom-ceramics/custom-glaze-color" },
      { label: "New Mold Development", href: "/oem-custom-ceramics/new-mold-development" },
      { label: "Private-Label Packaging", href: "/oem-custom-ceramics/oem-odm-case-studies" },
      { label: "Request a Quote", href: "/contact" },
    ],
  },
  faqs: [
    {
      q: "What OEM/ODM services do you offer for ceramics?",
      a: "We provide custom logo printing, bespoke glaze and colour development, new mold and tooling creation, custom shapes, and full private-label packaging and project management from concept to delivery.",
    },
    {
      q: "What is the minimum order quantity for custom ceramics?",
      a: "Custom OEM/ODM orders typically start from 1,000–3,000 pieces per design depending on mold, glaze and printing requirements. We offer flexible MOQs to help new brands launch.",
    },
    {
      q: "Can you develop a brand-new product from our design?",
      a: "Yes. Our in-house tooling team develops new molds from your drawings or samples, refining the design for manufacturability before producing approved pre-production samples.",
    },
    {
      q: "How long does a custom ceramic project take?",
      a: "Sampling usually takes 10–20 days and bulk production 30–45 days after sample approval, depending on mold development and order volume.",
    },
    {
      q: "Are your custom ceramics certified for international markets?",
      a: "Yes. Production is FDA and LFGB certified, lead and cadmium safe, and inspected batch by batch to meet the compliance requirements of global markets.",
    },
  ],
}

// ----------------------------------------------------------------------------
// 汇总 + 查询辅助
// ----------------------------------------------------------------------------
export const SILO_CONFIGS: Record<string, SiloConfig> = {
  dinnerware,
  bakeware,
  "table-decor-drinkware": tableDecorDrinkware,
  "oem-custom-ceramics": oemCustomCeramics,
}

export const SILO_ORDER = [
  "dinnerware",
  "bakeware",
  "table-decor-drinkware",
  "oem-custom-ceramics",
] as const

export type SiloSlug = (typeof SILO_ORDER)[number]

export function getSiloConfig(slug: string): SiloConfig | undefined {
  return SILO_CONFIGS[slug]
}

/** 底部跨 Silo 全站导流卡片数据：覆盖全部 4 个一级 Silo 页面 */
export type CrossSiloCard = {
  slug: string
  title: string
  blurb: string
  image: string
  keyword: string
}

export const CROSS_SILO_CARDS: CrossSiloCard[] = [
  {
    slug: "dinnerware",
    title: "Dinnerware",
    blurb: "Plates, bowls, serve dishes & full dinner sets.",
    image: "/wholesale-plates.webp",
    keyword: "dinnerware",
  },
  {
    slug: "bakeware",
    title: "Bakeware",
    blurb: "Ramekins, baking dishes, casseroles & pans.",
    image: "/wholesale-bakeware.webp",
    keyword: "bakeware",
  },
  {
    slug: "table-decor-drinkware",
    title: "Table Decor & Drinkware",
    blurb: "Mugs, vases, jars, trays & candle holders.",
    image: "/images/categories/wholesale-embossed-ceramic-teapot-cup-set-table-decor-drinkware-collection.webp",
    keyword: "table decor and drinkware",
  },
  {
    slug: "oem-custom-ceramics",
    title: "OEM Custom Ceramics",
    blurb: "Logo printing, custom glaze, molds & private label.",
    image: "/ceramic-plates-for-catering-service.webp",
    keyword: "custom OEM ceramics",
  },
]

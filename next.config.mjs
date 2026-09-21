/** @type {import('next').NextConfig} */
// 旧扁平产品分类 slug → 新四大 Silo 层级路径（/[silo]/[l2]）的唯一映射。
// 与 lib/silo/l2-config.ts 的 productCategorySlugs 完全对齐，
// 用于把历史 /en/products/[categorySlug]/[productSlug] 301 收敛到 Silo 层级详情页，杜绝死链与重复 URL。
const LEGACY_CATEGORY_TO_SILO = {
// Bakeware
  ramekins: 'bakeware/ramekin-bowls',
'baking-dishes': 'bakeware/baking-dishes-casseroles',
'pie-pizza-plates': 'bakeware/loaf-pie-pizza-pans',
// Dinnerware
'wholesale-plates': 'dinnerware/plates',
  plates: 'dinnerware/plates',
'wholesale-bowls': 'dinnerware/bowls',
  bowls: 'dinnerware/bowls',
'wholesale-dinnerware-sets': 'dinnerware/dinnerware-sets',
'dinnerware-sets': 'dinnerware/dinnerware-sets',
'oval-serving-plates': 'dinnerware/serve-dishes',
'serve-dishes': 'dinnerware/serve-dishes',
'serving-dishes': 'dinnerware/serve-dishes',
// Table Decor & Drinkware
'wholesale-cups-mugs': 'table-decor-drinkware/cups-mugs',
'cups-mugs': 'table-decor-drinkware/cups-mugs',
  vases: 'table-decor-drinkware/vases',
'storage-condiment-jars': 'table-decor-drinkware/storage-condiment-jars',
'serving-trays': 'table-decor-drinkware/serving-trays',
'candle-holders': 'table-decor-drinkware/candle-holders',
// OEM Custom Ceramics
'custom-logo-printing': 'oem-custom-ceramics/custom-logo-printing',
'custom-glaze-color': 'oem-custom-ceramics/custom-glaze-color',
'new-mold-development': 'oem-custom-ceramics/new-mold-development',
'oem-odm-case-studies': 'oem-custom-ceramics/oem-odm-case-studies',
}
const nextConfig = {
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1280, 1920],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  productionBrowserSourceMaps: false,
}
export default nextConfig

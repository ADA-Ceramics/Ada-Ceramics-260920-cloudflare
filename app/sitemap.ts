import { MetadataRoute } from 'next'
import { SILO_ORDER, SILO_CONFIGS } from '@/lib/silo/config'
import { getL2ConfigsByParent } from '@/lib/silo/l2-config'

// 站点基础信息（与 app/[locale]/layout.tsx 的 canonical / metadataBase 完全一致，避免 301 跳转）
const BASE_URL = 'https://www.adaceramics.com'
const DEFAULT_LOCALE = 'en'

/**
 * 四大 Silo 中承载「批发 / 供应商」等 B 端核心流量的 Silo。
 * 其下的 L2 分类（wholesale 产品集合页）与 OEM/supplier 服务页统一给 0.8 优先级。
 * 当前四大 Silo 全部属于 B 端核心，集中维护便于后续单独调权。
 */
const B2B_CORE_SILOS = new Set<string>([
  'dinnerware',
  'bakeware',
  'table-decor-drinkware',
  'oem-custom-ceramics',
])

/** 统一拼接带默认 locale 前缀的绝对 URL（对齐真实路由 /[locale]/...） */
function localizedUrl(path = ''): string {
  return `${BASE_URL}/${DEFAULT_LOCALE}${path}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // 1) 站点核心静态页（按导航顺序；路径对齐真实路由，杜绝 about-us / custom-solutions 等跳转源）
  const staticPages: MetadataRoute.Sitemap = [
    { url: localizedUrl(), lastModified: now, changeFrequency: 'weekly', priority: 1 }, // Home
    { url: localizedUrl('/products'), lastModified: now, changeFrequency: 'weekly', priority: 0.7 }, // 四大 Silo 聚合入口
    { url: localizedUrl('/products/all'), lastModified: now, changeFrequency: 'weekly', priority: 0.7 }, // All Products 聚合页（导流四大 Silo）
    { url: localizedUrl('/about'), lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: localizedUrl('/factory'), lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: localizedUrl('/blog'), lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: localizedUrl('/contact'), lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ]

  // 2) 按导航栏「四大 Silo」分组的产品/分类页。
  //    slug 直接取自 lib/silo 配置（SILO_CONFIGS + L2_CONFIGS），与分类层级 100% 对齐，无任何拼写或路径差异。
  const productPages: MetadataRoute.Sitemap = []

  for (const siloSlug of SILO_ORDER) {
    const silo = SILO_CONFIGS[siloSlug]
    if (!silo) continue

    const isB2BCore = B2B_CORE_SILOS.has(siloSlug)

    // L1 一级 Silo 集合页
    productPages.push({
      url: localizedUrl(`/${silo.slug}`),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    })

    // L2 二级子分类页（直接遍历该 Silo 下的 L2 配置，保证 parentSlug/slug 完全对齐）
    for (const l2 of getL2ConfigsByParent(siloSlug)) {
      productPages.push({
        url: localizedUrl(`/${l2.parentSlug}/${l2.slug}`),
        lastModified: now,
        changeFrequency: 'monthly',
        // wholesale / supplier 等 B 端核心路径统一 0.8
        priority: isB2BCore ? 0.8 : 0.7,
      })
    }
  }

  return [...staticPages, ...productPages]
}

export interface CategoryData {
  slug: string
  name: string
  description: string
  image: string | null
  alt: string
}

export const WHATSAPP_PHONE = "8615919512131"
/** Cloudflare Worker 询盘接口。部署前替换为实际 Worker URL。 */
export const CONTACT_API = "https://YOUR_CLOUDFLARE_WORKER_URL"

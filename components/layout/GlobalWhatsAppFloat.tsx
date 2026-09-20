"use client"

import { usePathname } from "next/navigation"
import { WhatsAppFloat } from "@/components/shared/whatsapp-float"

/**
 * 全局悬浮 WhatsApp 询盘组件。
 * - 点击后弹出居中必填表单（公司名/邮箱/采购需求），提交后跳转 WhatsApp（逻辑见 WhatsAppFloat）。
 * - OEM 定制 L2/L3 详情页已自带 OemWhatsAppFloat，这里自动跳过以避免重复。
 */
export function GlobalWhatsAppFloat() {
  const pathname = usePathname()

  // 去掉语言前缀（/en、/es...）得到纯路径段
  const segments = (pathname || "/").split("/").filter(Boolean)
  const localeStripped = segments.slice(1) // 移除 locale 段

  // OEM 定制 L2/L3 详情页（/[locale]/oem-custom-ceramics/<slug>）已自带悬浮按钮，跳过
  const isOemDetailPage =
    localeStripped[0] === "oem-custom-ceramics" && localeStripped.length >= 2
  if (isOemDetailPage) return null

  return <WhatsAppFloat tipText="Chat with our team" ariaLabel="Contact ADA Ceramics via WhatsApp" />
}

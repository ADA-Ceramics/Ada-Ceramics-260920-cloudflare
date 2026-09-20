"use client"

import { WhatsAppFloat } from "@/components/shared/whatsapp-float"

/**
 * OEM 页面悬浮 WhatsApp 询盘按钮。
 * 点击后弹出居中必填表单（公司名/邮箱/采购需求），提交后按固定格式生成消息并跳转 WhatsApp。
 * 复用全站统一的 WhatsAppFloat 组件，仅定制提示文案与无障碍标签。
 */
export function OemWhatsAppFloat({ serviceName }: { serviceName: string }) {
  return (
    <WhatsAppFloat
      tipText="Chat with our OEM team"
      ariaLabel={`Contact ADA Ceramics on WhatsApp about ${serviceName}`}
    />
  )
}

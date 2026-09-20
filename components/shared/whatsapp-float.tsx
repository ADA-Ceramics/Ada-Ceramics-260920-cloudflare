"use client"

import { useEffect, useState, type FormEvent } from "react"
import { CONTACT_API } from "@/components/home/types"

/**
 * 全站统一的 WhatsApp 询盘浮动按钮 + 居中表单弹窗。
 *
 * 点击按钮后弹出居中表单（公司名、邮箱、采购需求，全部必填），
 * 提交后按固定格式生成初始消息「我是[公司名]，邮箱[邮箱]，想咨询[采购需求]」，
 * 再跳转到 WhatsApp 对话页。弹窗带半透明遮罩、可点击空白处/Esc 关闭，
 * 仅在打开时渲染，不遮挡正常页面内容。
 */
const WHATSAPP_NUMBER = "8615919512131"

interface WhatsAppFloatProps {
  /** 提示气泡文案 */
  tipText?: string
  /** 按钮无障碍标签 */
  ariaLabel?: string
}

export function WhatsAppFloat({
  tipText = "Chat with our team",
  ariaLabel = "Contact ADA Ceramics via WhatsApp",
}: WhatsAppFloatProps) {
  const [showTip, setShowTip] = useState(true)
  const [open, setOpen] = useState(false)
  const [company, setCompany] = useState("")
  const [email, setEmail] = useState("")
  const [requirement, setRequirement] = useState("")
  const [submitting, setSubmitting] = useState(false)

  // 打开弹窗时锁定页面滚动 + 支持 Esc 关闭
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (submitting) return
    const c = company.trim()
    const m = email.trim()
    const r = requirement.trim()
    // 三项全部必填，任一为空则不提交（input 自带 required 已拦截，这里二次兜底）
    if (!c || !m || !r) return

    // 预填充采购需求逻辑保持不变
    const message = `我是${c}，邮箱${m}，想咨询${r}`
    const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

    setSubmitting(true)
    try {
      // 第一步（必等异步）：复用全站 contact 表单已验证通过的邮件通道（Cloudflare Worker CONTACT_API）。
      // payload 字段结构与全站 contact 表单完全一致：fullName / company / email / phone / category / quantity / details。
      const res = await fetch(CONTACT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: c,
          company: c,
          email: m,
          phone: "",
          category: "WhatsApp Inquiry",
          quantity: "",
          details: r,
        }),
      })

      const data = await res.json()

      // 第二步：必须等邮件发送成功回调返回后，才执行 WhatsApp 跳转（严格串行，非并行）
      if (res.ok && data.success) {
        window.open(href, "_blank", "noopener,noreferrer")
        setOpen(false)
        setCompany("")
        setEmail("")
        setRequirement("")
      } else {
        // 邮件发送失败：不跳转，透出服务端真实错误（与全站 contact 表单一致）
        console.error("提交失败", data)
        alert("Failed to send message: " + (data.error || "Please try again"))
      }
    } catch (err) {
      // 网络异常：同样不跳转 WhatsApp
      console.error("Error submitting form:", err)
      alert("Network error, please try again later")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      {/* 悬浮按钮区 */}
      <div className="fixed bottom-5 right-5 z-[9999] flex items-center gap-3">
        {showTip && (
          <div className="hidden sm:flex items-center gap-2 rounded-full bg-white shadow-lg ring-1 ring-black/5 px-4 py-2">
            <span className="text-sm text-[#1a1a2e]">{tipText}</span>
            <button
              type="button"
              onClick={() => setShowTip(false)}
              aria-label="Dismiss WhatsApp tip"
              className="text-muted-foreground hover:text-[#1a1a2e] text-lg leading-none"
            >
              &times;
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={ariaLabel}
          aria-haspopup="dialog"
          className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#25D366] text-white shadow-xl hover:scale-105 transition-transform"
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" aria-hidden="true">
            <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.027zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        </button>
      </div>

      {/* 居中表单弹窗 */}
      {open && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="whatsapp-form-title"
        >
          {/* 半透明遮罩，点击关闭 */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* 表单卡片 */}
          <div className="relative w-full max-w-md rounded-2xl bg-background p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close form"
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground text-2xl leading-none"
            >
              &times;
            </button>

            <h2 id="whatsapp-form-title" className="text-xl font-bold text-foreground text-balance">
              Start a WhatsApp Inquiry
            </h2>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              Fill in the details below and we&apos;ll continue the conversation on WhatsApp.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="wa-company" className="text-sm font-medium text-foreground">
                  Company Name <span className="text-destructive">*</span>
                </label>
                <input
                  id="wa-company"
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Your company"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="wa-email" className="text-sm font-medium text-foreground">
                  Email <span className="text-destructive">*</span>
                </label>
                <input
                  id="wa-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="wa-requirement" className="text-sm font-medium text-foreground">
                  Purchase Requirements <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="wa-requirement"
                  required
                  rows={3}
                  value={requirement}
                  onChange={(e) => setRequirement(e.target.value)}
                  placeholder="Products, quantity, customization, target price..."
                  className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                  <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.027zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                {submitting ? "Sending..." : "Send via WhatsApp"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

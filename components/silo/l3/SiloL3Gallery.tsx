"use client"

import { useState } from "react"
import Image from "next/image"
import { Package, ZoomIn } from "lucide-react"
import type { L3Image } from "@/lib/silo/l3-products"

interface SiloL3GalleryProps {
  images: L3Image[]
  productName: string
}

/**
 * L3 左栏产品图库：主图 + 缩略图切换 + 悬停放大预览。
 * 全部图片统一 object-cover、灰色骨架占位，避免空白塌陷。
 * 包裹 translate="no" 防止浏览器自动翻译改写节点导致 React removeChild 崩溃。
 */
export function SiloL3Gallery({ images, productName }: SiloL3GalleryProps) {
  const [selected, setSelected] = useState(0)
  const [zoom, setZoom] = useState(false)

  const safe = images.length > 0 ? images : []
  const active = safe[selected]

  return (
    <div translate="no" className="notranslate space-y-4">
      <div className="aspect-square relative bg-[#f9fafb] rounded-lg overflow-hidden border border-[#e5e7eb] group">
        {active ? (
          <>
            <Image
              src={active.url || "/placeholder.svg"}
              alt={active.alt || productName}
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={`object-cover transition-transform duration-300 ${
                zoom ? "scale-150 cursor-zoom-out" : "cursor-zoom-in group-hover:scale-105"
              }`}
              onClick={() => setZoom((z) => !z)}
            />
            <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white pointer-events-none">
              <ZoomIn className="w-3 h-3" aria-hidden="true" />
              {zoom ? "Click to reset" : "Click to zoom"}
            </span>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-[#9ca3af]">
            <Package className="w-16 h-16 opacity-30" aria-hidden="true" />
          </div>
        )}
      </div>

      {safe.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {safe.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setSelected(idx)
                setZoom(false)
              }}
              aria-label={`View image ${idx + 1} of ${safe.length}`}
              aria-current={selected === idx}
              className={`w-20 h-20 shrink-0 rounded border overflow-hidden transition-all hover:border-[#8b7355] relative bg-[#f9fafb] ${
                selected === idx
                  ? "border-[#8b7355] ring-2 ring-[#8b7355]/20"
                  : "border-gray-300"
              }`}
            >
              <Image
                src={img.url || "/placeholder.svg"}
                alt={img.alt || `${productName} thumbnail ${idx + 1}`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

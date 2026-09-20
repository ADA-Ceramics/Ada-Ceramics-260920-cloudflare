"use client"

import { useState } from "react"
import type { OemGalleryImage } from "@/lib/silo/oem-service-config"

/**
 * 模块4 实拍图库：多列响应式网格，点击放大预览（纯客户端 lightbox，无第三方依赖）。
 * 图片统一 16:10、WebP，alt 植入细分定制长尾词。
 */
export function OemGallery({ images }: { images: OemGalleryImage[] }) {
  const [active, setActive] = useState<OemGalleryImage | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(img)}
            className="group relative aspect-[16/10] overflow-hidden rounded-lg bg-[#f5f3ef] ring-1 ring-black/5"
            aria-label={`Enlarge image: ${img.alt}`}
          >
            <img
              src={img.src || "/placeholder.svg"}
              alt={img.alt}
              width={1600}
              height={1000}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          onClick={() => setActive(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
        >
          <button
            type="button"
            aria-label="Close preview"
            className="absolute top-5 right-5 text-white text-3xl leading-none"
            onClick={() => setActive(null)}
          >
            &times;
          </button>
          <img
            src={active.src || "/placeholder.svg"}
            alt={active.alt}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
          />
        </div>
      )}
    </>
  )
}

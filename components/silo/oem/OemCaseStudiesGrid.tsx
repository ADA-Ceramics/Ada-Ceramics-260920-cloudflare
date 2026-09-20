"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { ArrowRight, SlidersHorizontal, X } from "lucide-react"
import {
  OEM_PROJECT_CASES,
  CASE_INDUSTRIES,
  CASE_PROCESSES,
  CASE_CATEGORIES,
  type CaseIndustry,
  type CaseProcess,
  type CaseCategory,
  type OemProjectCase,
} from "@/lib/silo/oem-case-studies-config"

const OEM_SILO = "oem-custom-ceramics"

/**
 * 模块3：桌面左右分栏筛选 + 案例网格（移动端自动上下堆叠）。
 * 仅筛选本页 OEM 定制项目案例，绝不混入普通批发单品；
 * 卡片点击就地展开完整项目详情；无匹配结果时优雅展示 Request Custom Catalog 引导。
 */
export function OemCaseStudiesGrid({ locale }: { locale: string }) {
  const [industry, setIndustry] = useState<CaseIndustry | null>(null)
  const [process, setProcess] = useState<CaseProcess | null>(null)
  const [category, setCategory] = useState<CaseCategory | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = useMemo(
    () =>
      OEM_PROJECT_CASES.filter(
        (c) =>
          (!industry || c.industry === industry) &&
          (!process || c.process === process) &&
          (!category || c.category === category),
      ),
    [industry, process, category],
  )

  const hasFilter = Boolean(industry || process || category)
  const clearAll = () => {
    setIndustry(null)
    setProcess(null)
    setCategory(null)
  }

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1a2e] mb-8 text-balance">
          Browse OEM &amp; ODM Project Case Studies
        </h2>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* 左侧筛选栏（移动端堆叠到顶部） */}
          <aside className="lg:w-64 lg:flex-shrink-0">
            <div className="lg:sticky lg:top-28 rounded-xl border border-black/10 bg-[#f5f3ef] p-5">
              <div className="flex items-center justify-between mb-5">
                <span className="inline-flex items-center gap-2 font-medium text-[#1a1a2e]">
                  <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
                  Filter Cases
                </span>
                {hasFilter && (
                  <button
                    type="button"
                    onClick={clearAll}
                    className="inline-flex items-center gap-1 text-xs text-[#8b7355] hover:text-[#75603f]"
                  >
                    <X className="w-3 h-3" aria-hidden="true" />
                    Clear
                  </button>
                )}
              </div>

              <FilterGroup
                title="Industry"
                options={CASE_INDUSTRIES}
                active={industry}
                onChange={(v) => setIndustry(v as CaseIndustry | null)}
              />
              <FilterGroup
                title="Custom Process"
                options={CASE_PROCESSES}
                active={process}
                onChange={(v) => setProcess(v as CaseProcess | null)}
              />
              <FilterGroup
                title="Product Category"
                options={CASE_CATEGORIES}
                active={category}
                onChange={(v) => setCategory(v as CaseCategory | null)}
              />
            </div>
          </aside>

          {/* 右侧案例网格 */}
          <div className="flex-1">
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((c) => (
                  <CaseCard
                    key={c.id}
                    data={c}
                    locale={locale}
                    open={expanded === c.id}
                    onToggle={() => setExpanded(expanded === c.id ? null : c.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-[#8b7355]/40 bg-[#f5f3ef] p-10 text-center">
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  No case studies match these filters yet. Request our full custom catalog and we&apos;ll share
                  the latest private-label programs relevant to your project.
                </p>
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center px-6 py-3 rounded-md bg-[#8b7355] text-white text-sm font-medium hover:bg-[#75603f] transition-colors"
                >
                  Request Custom Catalog
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function FilterGroup({
  title,
  options,
  active,
  onChange,
}: {
  title: string
  options: { value: string; label: string }[]
  active: string | null
  onChange: (v: string | null) => void
}) {
  return (
    <div className="mb-5 last:mb-0">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">{title}</p>
      <div className="flex flex-col gap-1.5">
        {options.map((o) => {
          const isActive = active === o.value
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(isActive ? null : o.value)}
              className={`text-left text-sm px-3 py-2 rounded-md border transition-colors ${
                isActive
                  ? "border-[#8b7355] bg-[#8b7355] text-white"
                  : "border-black/10 bg-white text-[#1a1a2e] hover:border-[#8b7355]"
              }`}
            >
              {o.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function CaseCard({
  data,
  locale,
  open,
  onToggle,
}: {
  data: OemProjectCase
  locale: string
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className="flex flex-col rounded-xl border border-black/10 bg-white overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-[16/10] overflow-hidden bg-[#f5f3ef]">
        <img
          src={data.image || "/placeholder.svg"}
          alt={data.alt}
          width={1600}
          height={1000}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col flex-1 p-5">
        <div className="flex flex-wrap gap-1.5 mb-3">
          <Tag>{CASE_INDUSTRIES.find((i) => i.value === data.industry)?.label}</Tag>
          <Tag>{CASE_CATEGORIES.find((i) => i.value === data.category)?.label}</Tag>
        </div>
        <h3 className="font-serif text-lg text-[#1a1a2e] leading-snug">{data.title}</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          {data.client} &middot; {data.region}
        </p>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">{data.summary}</p>

        {open && (
          <div className="mt-4 rounded-lg bg-[#f5f3ef] p-4 text-sm">
            <dl className="space-y-2">
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">MOQ</dt>
                <dd className="font-medium text-[#1a1a2e] text-right">{data.details.moq}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Lead Time</dt>
                <dd className="font-medium text-[#1a1a2e] text-right">{data.details.leadTime}</dd>
              </div>
            </dl>
            <p className="mt-3 mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Project Scope
            </p>
            <ul className="space-y-1">
              {data.details.scope.map((s) => (
                <li key={s} className="flex items-start gap-2 text-[#1a1a2e]">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#8b7355] flex-shrink-0" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
            <Link
              href={`/${locale}/${OEM_SILO}/${data.process}`}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#8b7355] hover:text-[#75603f]"
            >
              See the {CASE_PROCESSES.find((p) => p.value === data.process)?.label} service
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        )}

        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          className="mt-4 inline-flex items-center justify-center gap-1.5 text-sm font-medium text-[#8b7355] hover:text-[#75603f] self-start"
        >
          {open ? "Hide project details" : "View project details"}
          <ArrowRight
            className={`w-4 h-4 transition-transform ${open ? "rotate-90" : ""}`}
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-[#f5f3ef] text-[#8b7355] border border-[#8b7355]/30">
      {children}
    </span>
  )
}

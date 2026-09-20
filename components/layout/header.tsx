"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

// 严格对应你本地实际文件名
const LANGUAGES = [
  { code: "en", name: "EN", flag: "/flags/en.webp", googleLang: "en" },
  { code: "es", name: "ES", flag: "/flags/es.webp", googleLang: "es" },
  { code: "fr", name: "FR", flag: "/flags/fr.webp", googleLang: "fr" },
  { code: "de", name: "DE", flag: "/flags/de.webp", googleLang: "de" },
  { code: "pt", name: "PT", flag: "/flags/pt.webp", googleLang: "pt" },
  { code: "it", name: "IT", flag: "/flags/it.webp", googleLang: "it" },
  { code: "nl", name: "NL", flag: "/flags/nl.webp", googleLang: "nl" },
  { code: "ja", name: "JA", flag: "/flags/ja.webp", googleLang: "ja" },
]

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: {
      translate: {
        TranslateElement: {
          new(options: {
            pageLanguage: string;
            includedLanguages: string;
            layout: number;
            autoDisplay: boolean;
          }, elementId: string): void;
          InlineLayout: {
            SIMPLE: number;
          };
        };
      };
    };
  }
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  // 当前展开的下拉菜单（桌面 hover / 移动端 accordion）
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileOpenMenu, setMobileOpenMenu] = useState<string | null>(null)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const [isGoogleTranslateReady, setIsGoogleTranslateReady] = useState(false)
  
  const pathname = usePathname()
  const router = useRouter()

  // 从当前URL路径中提取语言代码
  const getCurrentLocale = () => {
    const segments = pathname.split('/')
    const locale = segments[1]
    return LANGUAGES.find(l => l.code === locale)?.code || 'en'
  }

  const [currentLangCode, setCurrentLangCode] = useState(getCurrentLocale())

  // 触发Google翻译到指定语言
  const triggerGoogleTranslate = (langCode: string, shouldReload = false) => {
    const lang = LANGUAGES.find(l => l.code === langCode)
    if (!lang) return

    // 如果是英语，需要恢复原文
    if (langCode === 'en') {
      // 清除所有Google翻译相关cookie
      const clearGoogleTranslateCookies = () => {
        const hostname = window.location.hostname
        const domains = ['', '.'+hostname, hostname]
        const paths = ['/', '']
        
        domains.forEach(domain => {
          paths.forEach(path => {
            document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}${domain ? '; domain='+domain : ''}`
            document.cookie = `googtrans=/en/en; path=${path}${domain ? '; domain='+domain : ''}`
          })
        })
        // 额外清除根域名的cookie
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/'
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost'
      }
      
      clearGoogleTranslateCookies()
      
      // 尝试通过Google翻译API恢复原文
      const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement
      if (combo) {
        combo.value = 'en'
        combo.dispatchEvent(new Event("change", { bubbles: true }))
      }
      
      // 如果是用户主动切换（shouldReload为true），刷新页面彻底清除翻译状态
      if (shouldReload) {
        setTimeout(() => {
          window.location.reload()
        }, 100)
      }
      return
    }

    // 非英语：触发翻译
    const tryTriggerTranslate = () => {
      const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement
      if (combo) {
        combo.value = lang.googleLang
        combo.dispatchEvent(new Event("change", { bubbles: true }))
        return true
      }
      return false
    }

    if (!tryTriggerTranslate()) {
      setTimeout(tryTriggerTranslate, 500)
    }
  }

  // 监听路径变化，更新当前语言并同步翻译状态
  useEffect(() => {
    const locale = getCurrentLocale()
    setCurrentLangCode(locale)
    
    // 当Google翻译准备好后，根据URL语言触发翻译（不刷新页面）
    if (isGoogleTranslateReady) {
      triggerGoogleTranslate(locale, false)
    }
  }, [pathname, isGoogleTranslateReady])

  // 初始化谷歌免费翻译挂件
  useEffect(() => {
    // 避免重复加载
    if (document.getElementById('google-translate-script')) {
      return
    }

    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement({
          pageLanguage: "en",
          includedLanguages: "en,es,fr,de,pt,it,nl,ja",
          // 使用HORIZONTAL布局以生成下拉select
          layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL || 1,
          autoDisplay: false
        }, "google_translate_widget")
        
        // 延迟设置ready状态，等待Google翻译组件完全初始化
        setTimeout(() => {
          setIsGoogleTranslateReady(true)
        }, 1000)
      }
    }

    const script = document.createElement("script")
    script.id = 'google-translate-script'
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    script.async = true
    document.body.appendChild(script)
  }, [])

  // 切换语种：更新URL子目录并触发翻译
  const changeLang = (langCode: string) => {
    setCurrentLangCode(langCode)
    setIsLangMenuOpen(false)
    
    // 获取当前路径并替换语言代码
    const segments = pathname.split('/')
    segments[1] = langCode // 替换语言代码部分
    const newPath = segments.join('/') || `/${langCode}`
    
    // 对于英语，直接跳转到英语URL并刷新以清除翻译状态
    if (langCode === 'en') {
      // 清除cookies后直接通过window.location跳转，确保完全刷新
      const clearGoogleTranslateCookies = () => {
        const hostname = window.location.hostname
        const domains = ['', '.'+hostname, hostname]
        const paths = ['/', '']
        
        domains.forEach(domain => {
          paths.forEach(path => {
            document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}${domain ? '; domain='+domain : ''}`
          })
        })
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/'
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost'
      }
      
      clearGoogleTranslateCookies()
      // 使用window.location直接跳转，确保URL更新和页面刷新同时完成
      window.location.href = newPath
    } else {
      // 非英语：先触发翻译，再导航
      triggerGoogleTranslate(langCode, false)
      router.push(newPath)
    }
  }

  const currentLang = LANGUAGES.find(item => item.code === currentLangCode) || LANGUAGES[0]

  // ✅ 顶部一级可见导航：Home | Dinnerware | Bakeware | Table Decor & Drinkware | OEM Custom Ceramics | Contact
  // 下拉子项严格对齐四大 Silo 的 L2 层级路由 /[silo]/[l2]，与 l2-config.ts、面包屑、sitemap 形成闭环
  const navItems: {
    name: string
    href: string
    dropdown?: { name: string; href: string }[]
  }[] = [
    { name: "Home", href: `/${currentLangCode}` },
    {
      name: "Dinnerware",
      href: `/${currentLangCode}/dinnerware`,
      dropdown: [
        { name: "Dinnerware Sets", href: `/${currentLangCode}/dinnerware/dinnerware-sets` },
        { name: "Plates", href: `/${currentLangCode}/dinnerware/plates` },
        { name: "Bowls", href: `/${currentLangCode}/dinnerware/bowls` },
        { name: "Serve Dishes", href: `/${currentLangCode}/dinnerware/serve-dishes` },
      ],
    },
    {
      name: "Bakeware",
      href: `/${currentLangCode}/bakeware`,
      dropdown: [
        { name: "Ramekin Bowls", href: `/${currentLangCode}/bakeware/ramekin-bowls` },
        { name: "Baking Dishes & Casseroles", href: `/${currentLangCode}/bakeware/baking-dishes-casseroles` },
        { name: "Loaf & Pie & Pizza Pans", href: `/${currentLangCode}/bakeware/loaf-pie-pizza-pans` },
      ],
    },
    {
      name: "Table Decor & Drinkware",
      href: `/${currentLangCode}/table-decor-drinkware`,
      dropdown: [
        { name: "Cups & Mugs", href: `/${currentLangCode}/table-decor-drinkware/cups-mugs` },
        { name: "Vases", href: `/${currentLangCode}/table-decor-drinkware/vases` },
        { name: "Storage & Condiment Jars", href: `/${currentLangCode}/table-decor-drinkware/storage-condiment-jars` },
        { name: "Serving Trays", href: `/${currentLangCode}/table-decor-drinkware/serving-trays` },
        { name: "Candle Holders", href: `/${currentLangCode}/table-decor-drinkware/candle-holders` },
      ],
    },
    {
      name: "OEM Custom Ceramics",
      href: `/${currentLangCode}/oem-custom-ceramics`,
      dropdown: [
        { name: "Custom Logo Printing", href: `/${currentLangCode}/oem-custom-ceramics/custom-logo-printing` },
        { name: "Custom Glaze & Color", href: `/${currentLangCode}/oem-custom-ceramics/custom-glaze-color` },
        { name: "New Mold Development", href: `/${currentLangCode}/oem-custom-ceramics/new-mold-development` },
        { name: "OEM & ODM Project Case Studies", href: `/${currentLangCode}/oem-custom-ceramics/oem-odm-case-studies` },
        { name: "Request Custom Quote", href: `/${currentLangCode}/contact` },
      ],
    },
    { name: "Contact", href: `/${currentLangCode}/contact` },
  ]

  // ✅ 右上角折叠收纳菜单：Company（收起低频资讯）
  const companyMenu = {
    name: "Company",
    dropdown: [
      { name: "About Us", href: `/${currentLangCode}/about` },
      { name: "Factory", href: `/${currentLangCode}/factory` },
      { name: "Blog", href: `/${currentLangCode}/blog` },
    ],
  }

  // 页面滚动效果
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // 点击外部关闭语言菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (isLangMenuOpen && !target.closest('[data-lang-menu]')) {
        setIsLangMenuOpen(false)
      }
    }
    
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isLangMenuOpen])

  return (
    <>
      {/* 隐藏原生翻译控件，后台调度使用 */}
      <div id="google_translate_widget" className="hidden" style={{ display: 'none' }}></div>
      
      {/* 隐藏Google翻译顶部栏 */}
      <style jsx global>{`
        .goog-te-banner-frame,
        .skiptranslate,
        #goog-gt-tt,
        .goog-te-balloon-frame,
        div#goog-gt-,
        .goog-text-highlight {
          display: none !important;
        }
        body {
          top: 0 !important;
        }
        .goog-te-gadget {
          display: none !important;
        }
      `}</style>

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "bg-[#f5efe6] shadow" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* 网站Logo：品牌名固定为两行 ADA / CERAMICS，并禁止 Google 翻译，避免被译成 "THERE IS" 等导致串变 */}
            <Link
              href={`/${currentLangCode}`}
              className="notranslate flex items-center gap-2"
              translate="no"
            >
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">C</span>
              </div>
              <span className="flex flex-col text-xl font-bold leading-tight whitespace-nowrap">
                <span>ADA</span>
                <span>CERAMICS</span>
              </span>
            </Link>

            {/* 桌面导航栏 */}
            <nav className="hidden lg:flex items-center gap-7">
              {navItems.map(item => (
                <div key={item.name} className="relative">
                  {item.dropdown ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setOpenMenu(item.name)}
                      onMouseLeave={() => setOpenMenu(null)}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-1 text-sm font-medium py-2 whitespace-nowrap",
                          pathname.startsWith(item.href) ? "text-primary" : "hover:text-primary"
                        )}
                      >
                        {item.name}
                        <ChevronDown className={cn("w-4 h-4 transition-transform", openMenu === item.name && "rotate-180")} />
                      </Link>
                      <div className={cn(
                        "absolute left-0 top-full pt-2 transition-all duration-200",
                        openMenu === item.name ? "opacity-100 visible" : "opacity-0 invisible"
                      )}>
                        <div className="bg-white shadow-lg rounded-xl border py-2 min-w-[240px]">
                          {item.dropdown.map(sub => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                              onClick={() => setOpenMenu(null)}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "text-sm font-medium py-2 hover:text-primary whitespace-nowrap",
                        pathname === item.href && "text-primary"
                      )}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* 右上角折叠收纳按钮：Company */}
              <div
                className="relative"
                onMouseEnter={() => setOpenMenu(companyMenu.name)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  className="flex items-center gap-1 text-sm font-medium py-2 whitespace-nowrap hover:text-primary"
                >
                  {companyMenu.name}
                  <ChevronDown className={cn("w-4 h-4 transition-transform", openMenu === companyMenu.name && "rotate-180")} />
                </button>
                <div className={cn(
                  "absolute right-0 top-full pt-2 transition-all duration-200",
                  openMenu === companyMenu.name ? "opacity-100 visible" : "opacity-0 invisible"
                )}>
                  <div className="bg-white shadow-lg rounded-xl border py-2 min-w-[180px]">
                    {companyMenu.dropdown.map(sub => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                        onClick={() => setOpenMenu(null)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* 桌面端国旗语种选择器，显示国旗+语言代码 */}
              <div className="relative" data-lang-menu>
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 transition-colors"
                >
                  <Image
                    src={currentLang.flag}
                    alt={`${currentLang.code} flag`}
                    width={22}
                    height={16}
                    className="rounded object-cover"
                    style={{ height: 'auto' }}
                    unoptimized
                  />
                  <span className="text-sm font-medium">{currentLang.name}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                <div className={cn(
                  "absolute right-0 top-full mt-1 w-36 bg-white shadow-lg rounded-lg border z-50 transition-all",
                  isLangMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                )}>
                  {LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => changeLang(lang.code)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-left text-sm",
                        currentLangCode === lang.code && "bg-gray-100 text-primary"
                      )}
                    >
                      <Image
                        src={lang.flag}
                        alt={`${lang.code} flag`}
                        width={20}
                        height={14}
                        className="rounded object-cover"
                        style={{ height: 'auto' }}
                        unoptimized
                      />
                      <span className="font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </nav>

            {/* 移动端按钮区域 */}
            <div className="lg:hidden flex items-center gap-3">
              <div className="relative" data-lang-menu>
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center gap-1.5 p-2 rounded hover:bg-gray-100"
                >
                  <Image
                    src={currentLang.flag}
                    alt={`${currentLang.code} flag`}
                    width={22}
                    height={16}
                    className="rounded"
                    style={{ height: 'auto' }}
                    unoptimized
                  />
                  <span className="text-xs font-medium">{currentLang.name}</span>
                </button>
                <div className={cn(
                  "absolute right-0 top-full mt-2 w-32 bg-white shadow-lg rounded-lg border z-50",
                  isLangMenuOpen ? "block" : "hidden"
                )}>
                  {LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => changeLang(lang.code)}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 text-sm",
                        currentLangCode === lang.code && "bg-gray-100 text-primary"
                      )}
                    >
                      <Image
                        src={lang.flag}
                        alt={`${lang.code} flag`}
                        width={18}
                        height={13}
                        className="rounded"
                        style={{ height: 'auto' }}
                        unoptimized
                      />
                      <span className="font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2"
                aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 移动端下拉菜单 */}
      <div className={cn(
        "lg:hidden bg-white border-t overflow-y-auto transition-all duration-300 fixed top-20 left-0 right-0 z-40",
        isMobileMenuOpen ? "max-h-[calc(100vh-5rem)] opacity-100" : "max-h-0 opacity-0"
      )}>
        <nav className="px-4 py-3 space-y-1">
          {navItems.map(item => (
            <div key={item.name}>
              {item.dropdown ? (
                <div>
                  <button
                    onClick={() => setMobileOpenMenu(mobileOpenMenu === item.name ? null : item.name)}
                    className="w-full flex justify-between items-center px-3 py-3 font-medium"
                  >
                    {item.name}
                    <ChevronDown className={cn("w-4 h-4 transition-transform", mobileOpenMenu === item.name && "rotate-180")} />
                  </button>
                  <div className={cn("overflow-hidden transition-all", mobileOpenMenu === item.name ? "max-h-96" : "max-h-0")}>
                    <div className="pl-4 pb-2 space-y-1">
                      {item.dropdown.map(sub => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-3 py-2 text-sm text-gray-600 hover:text-primary"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block px-3 py-3 font-medium rounded",
                    pathname === item.href && "bg-gray-100 text-primary"
                  )}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}

          {/* 移动端 Company 折叠收纳菜单 */}
          <div>
            <button
              onClick={() => setMobileOpenMenu(mobileOpenMenu === companyMenu.name ? null : companyMenu.name)}
              className="w-full flex justify-between items-center px-3 py-3 font-medium"
            >
              {companyMenu.name}
              <ChevronDown className={cn("w-4 h-4 transition-transform", mobileOpenMenu === companyMenu.name && "rotate-180")} />
            </button>
            <div className={cn("overflow-hidden transition-all", mobileOpenMenu === companyMenu.name ? "max-h-96" : "max-h-0")}>
              <div className="pl-4 pb-2 space-y-1">
                {companyMenu.dropdown.map(sub => (
                  <Link
                    key={sub.name}
                    href={sub.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-primary"
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}

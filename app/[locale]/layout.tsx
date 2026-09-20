import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { Header } from '@/components/layout/header'
import { GlobalWhatsAppFloat } from '@/components/layout/GlobalWhatsAppFloat'
import { locales } from '@/lib/i18n/config'
import '../globals.css'

/** 静态导出必须预生成全部 locale 路径 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.adaceramics.com"),
  title: {
    template: "%s | ADA Ceramics",
    default: "ADA Ceramics | Wholesale Ceramic Mugs & Tableware",
  },
  description: "Professional ceramic manufacturer & supplier. Wholesale ceramic tableware, porcelain dinnerware, custom OEM/ODM mugs and bowls from China factory.",
  keywords: ["ceramic tableware", "porcelain dinnerware", "wholesale ceramics", "custom mugs", "OEM ceramic", "ODM tableware", "China ceramic factory", "bulk ceramic supplier"],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "ADA Ceramics",
    title: "ADA Ceramics | Wholesale Ceramic Mugs & Tableware",
    description: "Professional ceramic manufacturer & supplier. Wholesale ceramic tableware, porcelain dinnerware, custom OEM/ODM mugs and bowls from China factory.",
    images: ["/premium_beige_ceramic_plate_.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "ADA Ceramics | Wholesale Ceramic Mugs & Tableware",
    description: "Professional ceramic manufacturer & supplier from China.",
    images: ["/premium_beige_ceramic_plate_.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.adaceramics.com/en",
    languages: {
      "en": "https://www.adaceramics.com/en",
      "es": "https://www.adaceramics.com/es",
      "fr": "https://www.adaceramics.com/fr",
      "de": "https://www.adaceramics.com/de",
      "pt": "https://www.adaceramics.com/pt",
      "it": "https://www.adaceramics.com/it",
      "nl": "https://www.adaceramics.com/nl",
      "ja": "https://www.adaceramics.com/ja",
      "x-default": "https://www.adaceramics.com/en",
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  
  return (
    <html lang={locale} className={`${inter.variable} bg-background`} suppressHydrationWarning>
      <head>
        {/* 隐藏Google翻译默认UI但保留功能 */}
        <style dangerouslySetInnerHTML={{ __html: `
          /* 隐藏Google翻译顶部横幅 */
          .goog-te-banner-frame {
            display: none !important;
          }
          /* 隐藏翻译提示框和高亮 */
          #goog-gt-tt,
          .goog-te-balloon-frame,
          div#goog-gt-,
          .goog-text-highlight {
            display: none !important;
          }
          /* 彻底隐藏谷歌翻译原生左上角标识 */
          #google_translate_element {
            display: none !important;
          }
          /* 隐藏Google翻译加载指示器和左上角状态提示 */
          .goog-te-spinner-pos,
          .goog-te-spinner,
          #goog-gt-vt,
          .goog-te-ftab,
          .goog-te-ftab-link,
          .goog-logo-link,
          .goog-te-menu-value span[style],
          div[id^="goog-gt-"] {
            display: none !important;
          }
          /* 隐藏翻译进度条和加载动画 */
          .goog-te-progress-bar,
          .goog-te-progress-bar-container {
            display: none !important;
            visibility: hidden !important;
          }
          /* 防止body被Google翻译推下去 */
          body {
            top: 0 !important;
            position: relative !important;
          }
          /* Google翻译gadget容器：移到屏幕外但保持功能 */
          .goog-te-gadget {
            position: fixed !important;
            left: -9999px !important;
            top: 0 !important;
          }
          /* 翻译控件容器：移到屏幕外但保持可访问 */
          #google_translate_widget {
            position: fixed !important;
            left: -9999px !important;
            top: 0 !important;
            width: 1px !important;
            height: 1px !important;
            overflow: hidden !important;
          }
          /* skiptranslate: 移到屏幕外而不是display:none */
          .skiptranslate {
            position: fixed !important;
            left: -9999px !important;
            top: 0 !important;
          }
          /* 确保goog-te-combo可被JS访问 */
          .goog-te-combo {
            position: relative !important;
          }
          /* 保护带notranslate类的元素不被翻译 */
          .notranslate {
            font-family: inherit;
          }
        `}} />
      </head>
      <body className="font-sans antialiased">
        {/* Google Analytics (gtag.js) - 使用 next/script 避免 hydration 错误 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9EC22P07Z6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9EC22P07Z6');
          `}
        </Script>
        <Header />
        {children}
        <GlobalWhatsAppFloat />
      </body>
    </html>
  )
}

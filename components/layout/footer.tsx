"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Mail, Phone, MapPin } from "lucide-react"
import { companyInfo } from "@/lib/data"

export function Footer() {
  // 从路径提取语言前缀，保证页脚链接与顶部导航栏完全一致（绝对路径、含 locale）
  const pathname = usePathname()
  const locale = pathname?.split("/")[1] || "en"

  // 第二列 Products：四大核心 Silo（地址/文本与顶部导航栏一致）+ All Products 总入口
  const productLinks = [
    { name: "Dinnerware", href: `/${locale}/dinnerware` },
    { name: "Bakeware", href: `/${locale}/bakeware` },
    { name: "Table Decor & Drinkware", href: `/${locale}/table-decor-drinkware` },
    { name: "OEM Custom Ceramics", href: `/${locale}/oem-custom-ceramics` },
    { name: "All Products", href: `/${locale}/products/all` },
  ]

  // 第三列 Quick Links：非产品类核心页面
  const quickLinks = [
    { name: "About Us", href: `/${locale}/about` },
    { name: "Factory Blog", href: `/${locale}/blog` },
    { name: "Contact Us", href: `/${locale}/contact` },
  ]

  const socialLinks = [
    {
      label: "Visit our Twitter page",
      href: "#",
      path: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z",
    },
    {
      label: "Visit our LinkedIn page",
      href: "#",
      path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
    },
    {
      label: "Visit our Instagram page",
      href: "#",
      path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
    },
  ]

  return (
    <footer className="bg-[#1a1a2e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* 第一列：品牌 Logo + 定位语 + 社交账号 */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-[#1a1a2e] font-bold text-xl">C</span>
              </div>
              <span className="text-xl font-bold">ADA CERAMICS</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Professional ceramic tableware manufacturer with 30+ years OEM/ODM experience.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label={social.label}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* 第二列：Products */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Products</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/70 hover:text-white text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 第三列：Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/70 hover:text-white text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 第四列：Contact Us */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-white/50 mt-0.5 shrink-0" />
                <a href={`mailto:${companyInfo.email}`} className="text-white/70 hover:text-white text-sm transition-colors">
                  {companyInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-white/50 mt-0.5 shrink-0" />
                <a href={`tel:${companyInfo.phone}`} className="text-white/70 hover:text-white text-sm transition-colors">
                  {companyInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-white/50 mt-0.5 shrink-0" />
                <address className="text-white/70 text-sm not-italic">
                  Tangbian, Shuanggang Village<br />
                  Fengtang Town, Chao&apos;an District<br />
                  Chaozhou, Guangdong Province<br />
                  China 515646
                </address>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} ADA CERAMICS. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href={`/${locale}`} className="text-white/50 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href={`/${locale}`} className="text-white/50 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

"use client"

import Link from "next/link"
import Image from 'next/image'

// 4大顶层主分类，与首页展示完全一致
interface MainCollection {
  slug: string
  name: string
  image: string
  alt: string
}

interface ProductCategoryTabsProps {
  locale: string
}

export function ProductCategoryTabs({ locale }: ProductCategoryTabsProps) {
  const mainCollections: MainCollection[] = [
    {
      slug: "dinnerware",
      name: "Dinnerware",
      image: "/images/categories/dinnerware-collection.webp",
      alt: "Wholesale ceramic dinnerware collection - plates, bowls, serving dishes for hotels, restaurants and catering businesses from Chaozhou factory"
    },
    {
      slug: "bakeware",
      name: "Bakeware",
      image: "/images/categories/bakeware-collection.webp",
      alt: "Oven safe ceramic bakeware wholesale - baking dishes, ramekins, pizza plates for commercial kitchens and bakeries"
    },
    {
      slug: "table-decor-drinkware",
      name: "Table Decor & Drinkware",
      image: "/images/categories/drinkware-collection.webp",
      alt: "Wholesale ceramic cups & mugs, custom drinkware for cafes, hotel amenities and branded corporate gifts"
    },
    {
      slug: "oem-custom-ceramics",
      name: "OEM Custom Ceramics",
      image: "/images/categories/oem-custom-collection.webp",
      alt: "Custom OEM ODM ceramic tableware - private label, custom glaze, logo printing and packaging service from China manufacturer"
    }
  ]

  return (
    <section id="all-products-section" className="py-12 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-serif text-2xl md:text-3xl text-[#1a1a1a]">Our 4 Main Ceramic Tableware Collections</h2>
        </div>

        {/* 四大主分类卡片网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mainCollections.map((collection) => (
            <Link
              key={collection.slug}
              href={`/${locale}/${collection.slug}`}
              className="group border border-[#e5e7eb] rounded-lg overflow-hidden bg-white hover:shadow-lg transition-all block"
            >
              <div className="aspect-[4/3] relative bg-[#f9fafb]">
                <Image
                  src={collection.image}
                  alt={collection.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-5 text-center">
                <h3 className="text-base font-medium text-[#1a1a1a] group-hover:text-[#8b7355] transition-colors mb-4">
                  {collection.name}
                </h3>
                <span className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#8b7355] rounded-md hover:bg-[#6d5a43] transition-colors">
                  Explore Subcategories
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

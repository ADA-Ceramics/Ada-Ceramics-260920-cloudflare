// Company info
export const companyInfo = {
  name: "ADA CERAMICS",
  tagline: "Premium Food Grade Ceramic Manufacturer",
  email: "sukichoi@adaceramics.com",
  phone: "+86 15919512131",
  address: {
    line1: "Tangbian, Shuanggang Village",
    line2: "Fengtang Town, Chao'an District",
    line3: "Chaozhou, Guangdong Province, China 515646",
  },
  businessHours: "Monday - Saturday, 9:00 AM - 6:00 PM (GMT+8)",
  stats: {
    yearsExperience: "30+",
    globalClients: "500+",
    countriesServed: "50+",
    productsDelivered: "10M+",
  },
  factory: {
    area: "50,000",
    workers: "300+",
    productionLines: "10+",
    qualityRate: "98%",
  },
}

// Certifications
export const certifications = [
  {
    id: "fda",
    name: "FDA",
    fullName: "U.S. Food & Drug Administration",
    description: "Compliant with FDA food contact regulations",
  },
  {
    id: "lfgb",
    name: "LFGB",
    fullName: "German Food Safety",
    description: "Meets German food-grade material standards",
  },
  {
    id: "sedex",
    name: "Sedex",
    fullName: "Supplier Ethical Data Exchange",
    description: "Verified ethical trading practices",
  },
  {
    id: "bsci",
    name: "BSCI",
    fullName: "Business Social Compliance",
    description: "Certified social compliance standards",
  },
]

// ✅ 产品数据（必须加这个，否则详情页报错）
export const products = [
  {
    id: "492e2698-07c8-48c1-a0d5-1ff2bc75b0bd",
    name: "White High-temp Porcelain Dinner Set",
    description: "Premium food grade ceramic dinner set for home and restaurant use.",
    material: "High-temperature Porcelain",
    size: "Customizable",
    moq: "1000 pcs",
    certification: "FDA, LFGB",
    image: "/images/product1.jpg"
  },
  {
    id: "2",
    name: "Custom Ceramic Coffee Mug",
    description: "Eco-friendly ceramic mug with custom logo printing.",
    material: "Ceramic",
    size: "300ml / 400ml",
    moq: "2000 pcs",
    certification: "FDA",
    image: "/images/product2.jpg"
  },
  {
    id: "3",
    name: "Ceramic Bowl Set",
    description: "Durable ceramic bowl set for kitchen use.",
    material: "Ceramic",
    size: "4.5/5/6 inch",
    moq: "3000 pcs",
    certification: "FDA, LFGB",
    image: "/images/product3.jpg"
  }
]

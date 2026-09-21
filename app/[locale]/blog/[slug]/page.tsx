import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getPostBySlug, getAllPostSlugs } from "@/lib/notion"
import { BlogDetail } from "@/components/blog/blog-detail"

// 全部支持的语言，和你页面语言切换一一对应
const LOCALES = ["en", "es", "fr", "de", "pt", "it", "nl", "ja"]

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllPostSlugs()
    const paths: Array<{ locale: string; slug: string }> = []
    // 生成【所有语言 × 所有文章slug】组合
    for (const locale of LOCALES) {
      for (const slug of slugs) {
        paths.push({ locale, slug })
      }
    }
    return paths
  } catch (err) {
    console.error("generateStaticParams error for blog:", err)
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  try {
    const post = await getPostBySlug(slug)
  
    if (!post) {
      return {
        title: "Post Not Found | ADA Ceramics",
      }
    }
  
    return {
      title: `${post.title} | ADA Ceramics`,
      description: post.excerpt || `Learn about ceramic tableware, manufacturing & industry insights. Read ${post.title} from ADA Ceramics professional factory blog.`,
      keywords: post.tags?.join(", ") || "",
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: "article",
        publishedTime: post.publishedAt,
        modifiedTime: post.updatedAt,
        images: post.coverImage ? [post.coverImage] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt,
        images: post.coverImage ? [post.coverImage] : [],
      },
    }
  } catch {
    return {
      title: "Post Not Found | ADA Ceramics",
    }
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params
  try {
    const post = await getPostBySlug(slug)
  
    if (!post) {
      notFound()
    }
  
    return <BlogDetail post={post} />
  } catch {
    notFound()
  }
}

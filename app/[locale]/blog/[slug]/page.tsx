import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getPostBySlug, getAllPostSlugs } from "@/lib/notion"
import { BlogDetail } from "@/components/blog/blog-detail"

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({
    locale: "en",
    slug
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  
  if (!post) {
    return {
      title: "Post Not Found | ADA Ceramics",
    }
  }
  
  return {
    title: `${post.title} | ADA Ceramics`,
    description: post.excerpt || `Learn about ceramic tableware, manufacturing & industry insights. Read ${post.title} from ADA Ceramics professional factory blog.`,
    keywords: post.tags.join(", "),
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
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  
  if (!post) {
    notFound()
  }
  
  return <BlogDetail post={post} />
}

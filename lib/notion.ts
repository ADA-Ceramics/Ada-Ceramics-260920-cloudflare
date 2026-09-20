import { Client } from "@notionhq/client"
import type { 
  PageObjectResponse, 
  BlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints"

// Notion数据库ID (从URL提取)
const DATABASE_ID = process.env.NOTION_DATABASE_ID || "365ca966b2bb80909b22e7716707c9fb"

// 创建Notion客户端实例
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

// 博客文章类型定义
export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  coverImage: string | null
  publishedAt: string
  updatedAt: string
  tags: string[]
  author: string
  status: "Published" | "Draft"
}

// 博客详情类型
export interface BlogPostDetail extends BlogPost {
  content: NotionBlock[]
}

// Notion块类型
export interface NotionBlock {
  id: string
  type: string
  content: string
  children?: NotionBlock[]
  url?: string
  href?: string
  caption?: string
  language?: string
  items?: string[]
  checked?: boolean
  level?: number
}

// 从富文本中提取纯文本
function extractPlainText(richText: RichTextItemResponse[]): string {
  return richText.map(text => text.plain_text).join("")
}

// 从富文本中提取带链接的HTML
function extractRichTextHTML(richText: RichTextItemResponse[]): string {
  return richText.map(text => {
    let content = text.plain_text
    
    // 处理各种文本注解
    if (text.annotations.bold) content = `<strong>${content}</strong>`
    if (text.annotations.italic) content = `<em>${content}</em>`
    if (text.annotations.strikethrough) content = `<del>${content}</del>`
    if (text.annotations.underline) content = `<u>${content}</u>`
    if (text.annotations.code) content = `<code>${content}</code>`
    
    // 处理链接 - 支持站内产品页面内链
    if (text.type === 'text' && text.text.link) {
      const url = text.text.link.url
      // 检测是否为站内链接
      const isInternalLink = url.startsWith('/') || 
        url.includes('adaceramics.com') || 
        url.includes('localhost')
      
      if (isInternalLink) {
        content = `<a href="${url}" class="text-primary hover:underline font-medium">${content}</a>`
      } else {
        content = `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">${content}</a>`
      }
    }
    
    return content
  }).join("")
}

// 将Notion页面转换为博客文章
function pageToPost(page: PageObjectResponse): BlogPost {
  const properties = page.properties
  
  // 提取标题 - 支持中文字段名"文章标题"
  const titleProp = properties['文章标题'] || properties.Title || properties.Name || properties.title || properties.name
  const title = titleProp?.type === 'title' 
    ? extractPlainText(titleProp.title) 
    : "Untitled"
  
  // 提取摘要
  const excerptProp = properties.Excerpt || properties.Description || properties.excerpt || properties.description
  const excerpt = excerptProp?.type === 'rich_text' 
    ? extractPlainText(excerptProp.rich_text) 
    : ""
  
  // 提取封面图
  const cover = page.cover
  let coverImage: string | null = null
  if (cover) {
    if (cover.type === 'external') {
      coverImage = cover.external.url
    } else if (cover.type === 'file') {
      coverImage = cover.file.url
    }
  }
  
  // 提取标签
  const tagsProp = properties.Tags || properties.tags
  const tags: string[] = tagsProp?.type === 'multi_select' 
    ? tagsProp.multi_select.map(tag => tag.name) 
    : []
  
  // 提取作者
  const authorProp = properties.Author || properties.author
  const author = authorProp?.type === 'rich_text' 
    ? extractPlainText(authorProp.rich_text) || "ADA Ceramics"
    : "ADA Ceramics"
  
  // 提取状态
  const statusProp = properties.Status || properties.status
  const status = statusProp?.type === 'select' && statusProp.select?.name === 'Published'
    ? 'Published' as const
    : 'Published' as const // 默认显示所有文章
  
  // 提取slug
  const slugProp = properties.Slug || properties.slug
  const slug = slugProp?.type === 'rich_text' 
    ? extractPlainText(slugProp.rich_text) || page.id.replace(/-/g, '')
    : page.id.replace(/-/g, '')
  
  return {
    id: page.id,
    slug,
    title,
    excerpt,
    coverImage,
    publishedAt: page.created_time,
    updatedAt: page.last_edited_time,
    tags,
    author,
    status,
  }
}

// 将Notion块转换为渲染格式
async function blockToNotionBlock(block: BlockObjectResponse): Promise<NotionBlock | null> {
  const baseBlock = {
    id: block.id,
    type: block.type,
    content: "",
  }

  switch (block.type) {
    case 'paragraph':
      return {
        ...baseBlock,
        content: extractRichTextHTML(block.paragraph.rich_text),
      }
    
    case 'heading_1':
      return {
        ...baseBlock,
        content: extractRichTextHTML(block.heading_1.rich_text),
        level: 1,
      }
    
    case 'heading_2':
      return {
        ...baseBlock,
        content: extractRichTextHTML(block.heading_2.rich_text),
        level: 2,
      }
    
    case 'heading_3':
      return {
        ...baseBlock,
        content: extractRichTextHTML(block.heading_3.rich_text),
        level: 3,
      }
    
    case 'bulleted_list_item':
      return {
        ...baseBlock,
        content: extractRichTextHTML(block.bulleted_list_item.rich_text),
      }
    
    case 'numbered_list_item':
      return {
        ...baseBlock,
        content: extractRichTextHTML(block.numbered_list_item.rich_text),
      }
    
    case 'to_do':
      return {
        ...baseBlock,
        content: extractRichTextHTML(block.to_do.rich_text),
        checked: block.to_do.checked,
      }
    
    case 'toggle':
      return {
        ...baseBlock,
        content: extractRichTextHTML(block.toggle.rich_text),
      }
    
    case 'quote':
      return {
        ...baseBlock,
        content: extractRichTextHTML(block.quote.rich_text),
      }
    
    case 'callout':
      return {
        ...baseBlock,
        content: extractRichTextHTML(block.callout.rich_text),
      }
    
    case 'code':
      return {
        ...baseBlock,
        content: extractPlainText(block.code.rich_text),
        language: block.code.language,
      }
    
    case 'image':
      let imageUrl = ""
      if (block.image.type === 'external') {
        imageUrl = block.image.external.url
      } else if (block.image.type === 'file') {
        imageUrl = block.image.file.url
      }
      return {
        ...baseBlock,
        url: imageUrl,
        caption: block.image.caption ? extractPlainText(block.image.caption) : "",
      }
    
    case 'video':
      let videoUrl = ""
      if (block.video.type === 'external') {
        videoUrl = block.video.external.url
      } else if (block.video.type === 'file') {
        videoUrl = block.video.file.url
      }
      return {
        ...baseBlock,
        url: videoUrl,
        caption: block.video.caption ? extractPlainText(block.video.caption) : "",
      }
    
    case 'embed':
      return {
        ...baseBlock,
        url: block.embed.url,
        caption: block.embed.caption ? extractPlainText(block.embed.caption) : "",
      }
    
    case 'bookmark':
      return {
        ...baseBlock,
        url: block.bookmark.url,
        caption: block.bookmark.caption ? extractPlainText(block.bookmark.caption) : "",
      }
    
    case 'divider':
      return baseBlock
    
    case 'table_of_contents':
      return baseBlock
    
    default:
      return null
  }
}

// API返回类型
export interface NotionApiResult {
  posts: BlogPost[]
  error: string | null
}

// 获取所有博客文章
export async function getAllPosts(): Promise<NotionApiResult> {
  try {
    if (!process.env.NOTION_API_KEY) {
      return { posts: [], error: "NOTION_API_KEY is not configured" }
    }
    
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      sorts: [
        {
          timestamp: "created_time",
          direction: "descending",
        },
      ],
    })
    
    const posts = response.results
      .filter((page): page is PageObjectResponse => 'properties' in page)
      .map(pageToPost)
    
    return { posts, error: null }
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string }
    if (err.code === 'object_not_found') {
      return { 
        posts: [], 
        error: "Database not shared with integration. Please share your Notion database with your integration." 
      }
    }
    console.error("Error fetching posts from Notion:", error)
    return { posts: [], error: err.message || "Failed to fetch posts" }
  }
}

// 根据slug获取单篇文章
export async function getPostBySlug(slug: string): Promise<BlogPostDetail | null> {
  try {
    if (!process.env.NOTION_API_KEY) return null
    
    // 获取所有文章然后在本地匹配slug（避免Slug属性不存在的问题）
    const { posts } = await getAllPosts()
    const matchedPost = posts.find(post => post.slug === slug)
    
    if (!matchedPost) {
      return null
    }
    
    // 获取页面内容块
    const blocks = await getPageBlocks(matchedPost.id)
    
    return {
      ...matchedPost,
      content: blocks,
    }
  } catch (error) {
    console.error("[v0] Error fetching post by slug:", error)
    return null
  }
}

// 获取页面的所有块内容
async function getPageBlocks(pageId: string): Promise<NotionBlock[]> {
  try {
    if (!process.env.NOTION_API_KEY) return []
    
    const blocks: NotionBlock[] = []
    let cursor: string | undefined

    do {
      const response = await notion.blocks.children.list({
        block_id: pageId,
        start_cursor: cursor,
        page_size: 100,
      })

      for (const block of response.results) {
        if ('type' in block) {
          const notionBlock = await blockToNotionBlock(block as BlockObjectResponse)
          if (notionBlock) {
            // 如果块有子块，递归获取
            if ((block as BlockObjectResponse).has_children) {
              notionBlock.children = await getPageBlocks(block.id)
            }
            blocks.push(notionBlock)
          }
        }
      }

      cursor = response.has_more ? response.next_cursor ?? undefined : undefined
    } while (cursor)

    return blocks
  } catch (error) {
    console.error("[v0] Error fetching page blocks:", error)
    return []
  }
}

// 获取所有文章的slug用于静态生成
export async function getAllPostSlugs(): Promise<string[]> {
  const { posts } = await getAllPosts()
  return posts.map(post => post.slug)
}

// 按标签获取文章
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  try {
    if (!process.env.NOTION_API_KEY) return []
    
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        or: [
          {
            property: "Tags",
            multi_select: {
              contains: tag,
            },
          },
          {
            property: "tags",
            multi_select: {
              contains: tag,
            },
          },
        ],
      },
      sorts: [
        {
          timestamp: "created_time",
          direction: "descending",
        },
      ],
    })

    return response.results
      .filter((page): page is PageObjectResponse => 'properties' in page)
      .map(pageToPost)
  } catch (error) {
    console.error("[v0] Error fetching posts by tag:", error)
    return []
  }
}

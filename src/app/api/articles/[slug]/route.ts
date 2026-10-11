import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb/mongoose'
import Article from '@/lib/mongodb/models/Article'
import { serialize } from 'next-mdx-remote/serialize'

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!slug || slug.length > 200) return NextResponse.json({ error: 'Article not found.' }, { status: 404 })
  try {
    await dbConnect()
    const article = await Article.findOne({ slug, published: true })
      .select('title slug description category emoji content createdAt').lean()
    if (!article) return NextResponse.json({ error: 'Article not found.' }, { status: 404 })
    const source = await serialize(article.content, { blockJS: true, blockDangerousJS: true })
    return NextResponse.json({ article: { ...article, content: undefined }, source }, { headers: { 'Cache-Control': 'public, max-age=60, s-maxage=60, stale-while-revalidate=300' } })
  } catch {
    return NextResponse.json({ error: 'Article is temporarily unavailable.' }, { status: 503 })
  }
}

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb/mongoose';
import Article from '@/lib/mongodb/models/Article';

export async function GET() {
  try {
    await dbConnect();
    const articles = await Article.find({ published: true }).select("_id title slug description category emoji createdAt").sort({ createdAt: -1 }).limit(100).lean();
    return NextResponse.json(articles, { headers: { 'Cache-Control': 'public, max-age=60, s-maxage=60, stale-while-revalidate=300' } });
  } catch {
    return NextResponse.json({ error: "Articles are temporarily unavailable." }, { status: 503 });
  }
}

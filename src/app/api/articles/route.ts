import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb/mongoose';
import Article from '@/lib/mongodb/models/Article';

export async function GET() {
  try {
    await dbConnect();
    const articles = await Article.find({ published: true }).sort({ createdAt: -1 });
    return NextResponse.json(articles);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

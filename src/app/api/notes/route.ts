import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb/mongoose';
import Note from '@/lib/mongodb/models/Note';

export async function GET() {
  try {
    await dbConnect();
    const notes = await Note.find({}).sort({ createdAt: -1 }).limit(50);
    return NextResponse.json(notes);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { text, name, email, emoji, color } = await request.json();

    if (!text || !text.trim()) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    await dbConnect();
    const newNote = await Note.create({
      text,
      name,
      email,
      emoji,
      color,
    });

    return NextResponse.json(newNote, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

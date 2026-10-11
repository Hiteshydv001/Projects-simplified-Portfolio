import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb/mongoose'
import Note from '@/lib/mongodb/models/Note'
import { guardWrite, readJson, stringField, validEmail, RequestError, requestFailure } from '@/lib/security/request'

const publicFields = '_id text name emoji color createdAt'
export async function GET() {
  try {
    await dbConnect()
    const notes = await Note.find({}).select(publicFields).sort({ createdAt: -1 }).limit(50).lean()
    return NextResponse.json(notes, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) { return requestFailure(error, 'Notes are temporarily unavailable.') }
}
export async function POST(request: Request) {
  try {
    guardWrite(request, 'notes')
    const payload = await readJson(request, 8192)
    const text = stringField(payload.text, 'note', 1000)
    const name = stringField(payload.name, 'name', 100, false)
    const email = stringField(payload.email, 'email', 254, false)
    const emoji = stringField(payload.emoji, 'emoji', 16)
    const color = stringField(payload.color, 'color', 40)
    if (email && !validEmail(email)) throw new RequestError('Please enter a valid email.')
    const colors = ['orange', 'emerald', 'blue', 'pink', 'purple', 'amber']
    if (!colors.includes(color)) throw new RequestError('Please choose a valid note color.')
    await dbConnect()
    const note = await Note.create({ text, name, email, emoji, color })
    return NextResponse.json({ _id: note._id, text: note.text, name: note.name, emoji: note.emoji, color: note.color, createdAt: note.createdAt }, { status: 201, headers: { 'Cache-Control': 'no-store' } })
  } catch (error) { return requestFailure(error, 'Unable to save your note right now.') }
}

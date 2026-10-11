import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { guardWrite, readJson, stringField, validEmail, RequestError, requestFailure } from '@/lib/security/request'
import { contactEmail } from '@/lib/content/contact-email'

export const dynamic = 'force-dynamic'

function mailConfiguration() {
  const host = process.env.SMTP_HOST?.trim()
  const user = process.env.SMTP_USER?.trim()
  const pass = process.env.SMTP_PASS
  const port = Number(process.env.SMTP_PORT || 587)
  if (!host || !user || !pass || !Number.isInteger(port) || port < 1 || port > 65535) return null
  return { host, user, pass, port, to: process.env.CONTACT_TO?.trim() || contactEmail, from: process.env.CONTACT_FROM?.trim() || user }
}

export function GET() {
  return NextResponse.json({ delivery: mailConfiguration() ? 'smtp' : 'email-draft' }, { headers: { 'Cache-Control': 'no-store' } })
}

export async function POST(request: Request) {
  try {
    guardWrite(request, 'contact')
    const payload = await readJson(request)
    const name = stringField(payload.name, 'name', 100)
    const phone = stringField(payload.phone, 'phone number', 40, false)
    const email = stringField(payload.email, 'email address', 254)
    const message = stringField(payload.message, 'message', 5000)
    if (!validEmail(email) || /[\r\n]/.test(name) || (phone && !/^[+()\d\s.-]{5,40}$/.test(phone))) throw new RequestError('Please check your contact details.')
    const config = mailConfiguration()
    if (!config) return NextResponse.json({ delivery: 'email-draft' }, { headers: { 'Cache-Control': 'no-store' } })
    const transporter = nodemailer.createTransport({
      host: config.host, port: config.port, secure: config.port === 465,
      requireTLS: config.port !== 465, auth: { user: config.user, pass: config.pass },
      disableFileAccess: true, disableUrlAccess: true, connectionTimeout: 10000, socketTimeout: 15000,
    })
    await transporter.sendMail({
      from: config.from, to: config.to, replyTo: email,
      subject: 'Portfolio contact: ' + name,
      text: ['Name: ' + name, 'Email: ' + email, 'Phone: ' + phone, '', message].join('\n'),
    })
    return NextResponse.json({ ok: true, delivery: 'smtp' }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) { return requestFailure(error, 'Unable to send your message right now. Please try again later.') }
}

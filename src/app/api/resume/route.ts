import { readFile } from 'fs/promises'
import path from 'path'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const shouldDownload = url.searchParams.get('download') === '1'

  const filePath = path.join(process.cwd(), 'public', 'CV_Hitesh_Kumar.pdf')
  const fileBuffer = await readFile(filePath)

  return new Response(fileBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': shouldDownload
        ? 'attachment; filename="CV_Hitesh_Kumar.pdf"'
        : 'inline; filename="CV_Hitesh_Kumar.pdf"',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}

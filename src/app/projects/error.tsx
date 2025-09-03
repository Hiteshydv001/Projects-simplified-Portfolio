'use client'
 
import { useEffect } from 'react'
import Link from 'next/link'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Project page error:', error)
  }, [error])
 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h2 className="text-xl font-semibold">Something went wrong!</h2>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-4 py-2 text-sm bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors"
        >
          Try again
        </button>
        <Link
          href="/projects"
          className="px-4 py-2 text-sm bg-accent/10 text-muted-foreground rounded-full hover:bg-accent/20 transition-colors"
        >
          Return to Projects
        </Link>
      </div>
    </div>
  )
}

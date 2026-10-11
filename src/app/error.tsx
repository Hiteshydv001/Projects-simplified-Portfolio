'use client'

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <section className="mx-auto max-w-3xl px-5 py-20"><div className="page-hero"><p className="page-eyebrow mb-5">A small interruption</p><h1 className="mb-5 text-3xl sm:text-4xl">Something didn’t load.</h1><p className="mb-8 text-muted-foreground">Please try again. If the problem continues, you can return to the homepage.</p><button onClick={reset} className="action-primary bg-primary text-primary-foreground">Try again</button></div></section>
}

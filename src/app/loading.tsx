export default function Loading() {
  return <div className="studio-page" role="status" aria-live="polite">
    <span className="text-sm text-muted-foreground">Opening page…</span>
    <div aria-hidden="true" className="mt-8 h-20 w-2/3 rounded-xl bg-muted" />
    <div aria-hidden="true" className="mt-6 h-4 w-full max-w-xl rounded bg-muted" />
    <div aria-hidden="true" className="mt-3 h-4 w-3/4 max-w-lg rounded bg-muted" />
  </div>
}

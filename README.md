# Hitesh Kumar — Portfolio

Personal portfolio built with Next.js 15, React 19, TypeScript, and Tailwind CSS. The drafting-board design follows the requested kushbothra.com reference: white grid, cyan selection frames, bold display lettering, handwritten notes, colorful stickers, folder cards, and draggable photos. The content, projects, research, and credentials belong to Hitesh.

## Local development

```sh
npm install
npm run dev
```

Open http://localhost:3000. Node.js 22.12 or newer is recommended for the patched image-processing dependency.

Flux, Inter Display, DM Mono, and Just Me Again Down Here are served locally from `public/fonts`, so builds no longer need a Google Fonts connection. Shared controls offer light/dark themes and reduced motion; operating-system motion preferences are respected. The all-pages menu contains every archive, including booking, the assistant, notes, and the resume.

The navigation search opens from the magnifying glass or Ctrl/Cmd K. It filters all 16 pages by names, descriptions, and topic aliases; Down enters the results, Up/Down moves between links, and Enter navigates. Results scroll within the panel, leaving the search and controls visible. A cyan/green signal waveform replaces the former neural wire strip in the header and footer, pauses outside the viewport, and respects reduced motion.

A white-and-blue 3D robot pet opens the shared portfolio assistant from any page. Its beveled body is rendered with native WebGL. A 26-second routine alternates between laptop typing, idle breathing, curious looks, waving, and happy bouncing, with smooth pose transitions and changing expressions. Hover or keyboard focus interrupts the routine with a greeting; its head follows the pointer. It needs no additional package, model download, or external image. A shaded SVG with matching behaviors takes over when WebGL is unavailable. The pet can be minimized and restored; its animation clock pauses in background tabs, and reduced-motion preferences keep it still. A compact chat bubble opens beside the animated pet on desktop and above it on mobile, with no overlay or page scroll lock. Minimizing and reopening preserves the conversation and draft for the current page session. Escape or the close button hides chat and restores focus; the footer assistant button opens the same panel. Messages scroll inside the bubble. Chat still uses the existing assistant service and loads only when first opened.

`/case-study` and `/play-ground` match the reference navigation. Existing `/projects` and `/projects/[slug]` URLs remain available. Optional `NEXT_DIST_DIR` lets a development preview and production verification use separate build folders (`.next-studio` and `.next-production`).

## Optional services

Copy `.env.example` to `.env.local` and populate only the services you use:

- `NEXT_PUBLIC_SITE_URL`: your canonical origin; set this to the deployed HTTPS URL in production.
- `MONGODB_URI`: articles, the note wall, and the public Analytics dashboard.
- `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`: direct contact form delivery. `SMTP_PORT` defaults to 587; `CONTACT_TO` defaults to the portfolio's public email. `CONTACT_FROM` optionally sets a verified sending address. Port 465 uses implicit TLS; other ports require STARTTLS. Restart your development server after changing `.env.local`.
- `GEMINI_API_KEY`: drawing recognition. This key stays on the server.
- `NEXT_PUBLIC_GA_ID`: optional Google Analytics measurement ID.

Without SMTP credentials, the contact form offers a prefilled email draft and a copy-note option. The visitor sends the draft from their own email app; opening it never displays a sent confirmation. With SMTP configured, the form sends directly and preserves the note if delivery fails. Other service-backed features show an unavailable state without credentials. The assistant connects to the existing portfolio assistant service on Render. Calendar booking uses the existing Cal.com account.

The playground shows explicitly labeled simulated attention/embedding examples. Text generation uses the maintained Hugging Face Transformers library, loads on demand, and downloads its model on first use in the browser.

## Public analytics

`/analytics` is linked in the top navigation. Its Visitors and Page Views cards, period comparisons, and interactive chart use `/api/analytics` with 24H, 7D, and 30D windows. Windows use UTC calendar hours/days and include the current partial bucket. Visitors are distinct anonymous browser IDs across a selected window; their daily counts may add up to more than the period total when a browser returns on several days. Growth compares the preceding equal-length window and shows no percentage when there is no baseline.

Set `MONGODB_URI` to enable recording. A shared layout tracker records initial page loads and pathname changes once, without query strings, page paths, raw IPs, or contact details. It uses a random first-party browser ID stored in localStorage and stores only its hash in hourly MongoDB counters. Do Not Track and Global Privacy Control are respected. Records expire after 62 days. Browser storage being cleared, blocked tracking, and browsers opting out affect the counts. This dashboard starts collecting after installation; older home-only visitor counters and external Vercel/Google analytics history are not imported. Without a database, it shows an unavailable state instead of invented counts.

## Checks

```sh
npm run typecheck
npm run lint
npm run test:security
npm run build
npm audit
```

Builds check TypeScript and ESLint; neither is bypassed. Focused security tests cover cross-origin writes, malformed requests, actual body-size limits, header injection, abuse limits, and safe error responses.

## Security behavior

- Public note responses omit email addresses, including the response after creating a note.
- Contact, notes, drawing recognition, and visitor writes have per-instance rate limits. On Vercel, the limiter uses Vercel's overwritten client IP header; other hosts share a conservative bucket rather than trusting spoofable proxy headers.
- For scaled deployments, configure an edge or distributed rate limiter. In-memory limits reset on restart and are not shared across instances.
- JSON writes validate field types, lengths, and request origins. SMTP sends from a configured account, uses the visitor's address only as reply-to, requires TLS, and disables file/URL access.
- Internal database and SMTP errors are not returned to visitors.
- Responses include MIME sniffing protection, frame restrictions, referrer/permissions policies, and a baseline CSP. The CSP restricts objects, base URLs, framing, and form destinations; it is not a full script allowlist.
- Database-authored articles use MDX and must remain trusted author content. Do not expose an unauthenticated article-writing endpoint.

## Content

Projects, research, experience, patents, and certifications retain their existing data and routes. Unreferenced UI components, duplicate types, unused Supabase integration, obsolete global Next type overrides, and conflicting style files were removed. Existing MDX reference files and public media were preserved.

## Reuse

You are welcome to reuse this portfolio under the repository's license. Credit and a star are appreciated.

export const contactEmail = 'hiteshofficial0001@gmail.com'

export function contactDraftText({ name, email, message }: { name: string; email: string; message: string }) {
  return [`Name: ${name.trim()}`, `Email: ${email.trim()}`, '', message.trim()].join('\n')
}

export function contactDraftUrl(details: { name: string; email: string; message: string }) {
  return `mailto:${contactEmail}?subject=${encodeURIComponent(`Portfolio contact: ${details.name.trim()}`)}&body=${encodeURIComponent(contactDraftText(details))}`
}

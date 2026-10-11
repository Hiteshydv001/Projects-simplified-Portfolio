'use client'

import { useEffect, useState } from 'react'
import { Check, ArrowRight, ArrowLeft } from 'lucide-react'
import { SelectionFrame } from './primitives'
import { Reveal } from './motion'
import { conversationStarters } from '@/lib/content/conversation-starters'
import { contactEmail, contactDraftText, contactDraftUrl } from '@/lib/content/contact-email'

export function StudioContact() {
  const [step, setStep] = useState(1)
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [delivery, setDelivery] = useState<'checking' | 'smtp' | 'email-draft'>('checking')
  const [draftOpened, setDraftOpened] = useState(false)
  const [copyStatus, setCopyStatus] = useState('')
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('starter')
    const starter = conversationStarters.find(item => item.id === id)
    if (starter) setMessage(starter.message)
  }, [])
  useEffect(() => {
    const controller = new AbortController()
    let active = true
    const timeout = window.setTimeout(() => controller.abort(), 5000)
    async function checkDelivery() {
      try {
        const response = await fetch('/api/contact', { cache: 'no-store', signal: controller.signal })
        if (!response.ok) throw new Error('Delivery is unavailable')
        const data = await response.json()
        if (active) setDelivery(data.delivery === 'smtp' ? 'smtp' : 'email-draft')
      } catch { if (active) setDelivery('email-draft') }
      finally { window.clearTimeout(timeout) }
    }
    void checkDelivery()
    return () => { active = false; window.clearTimeout(timeout); controller.abort() }
  }, [])
  const draftUrl = contactDraftUrl({ name, email, message })

  async function copyNote() {
    try {
      await navigator.clipboard.writeText(contactDraftText({ name, email, message }))
      setCopyStatus('Note copied. Paste it into your email.')
    } catch { setCopyStatus('Could not copy automatically. Your note is still in the form above.') }
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (sending || (step === 2 && delivery === 'checking')) return
    setError('')
    if (step === 1) {
      if (!message.trim()) { setError('Tell me a little about what you have in mind.'); return }
      setStep(2)
      return
    }
    if (!name.trim() || !email.trim() || !message.trim()) { setError('Please fill in your name, email, and note.'); return }
    if (delivery === 'email-draft') {
      setDraftOpened(true)
      window.location.assign(draftUrl)
      return
    }
    setSending(true)
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, message, phone: '' }), signal: AbortSignal.timeout(20000) })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(data.error || 'Unable to send right now. You can email me directly below.')
      }
      if (data.delivery === 'email-draft') {
        setDelivery('email-draft')
        setError('Direct delivery is unavailable. Your note is saved here; open an email draft below.')
        return
      }
      if (data.ok !== true) throw new Error('Delivery could not be confirmed. Please try again or open an email draft below.')
      setSent(true)
      setMessage(''); setName(''); setEmail('')
    } catch (problem) { setError(problem instanceof Error && problem.name !== 'TimeoutError' ? problem.message : 'The request timed out. Please try again, or email me below.') }
    finally { setSending(false) }
  }
  return <section className="contact-page">
    <Reveal><p className="hand-note underlined-note">leave me a note</p><div><SelectionFrame color="ink" className="contact-title"><h1>Contact</h1></SelectionFrame></div></Reveal>
    <Reveal delay={.1}>
      <div className="contact-note">
        {sent ? <div className="contact-success" role="status"><Check size={32} /><h2>Message sent!</h2><p>Thanks for reaching out. I’ll get back to you soon.</p><button className="mt-6" onClick={() => { setSent(false); setStep(1); setDraftOpened(false); setCopyStatus('') }}>Write another note</button></div> :
          <form onSubmit={submit} aria-label="Contact Hitesh">
            {step === 1 ? <>
              <label htmlFor="studio-message">What’s on your mind?</label>
              <textarea id="studio-message" value={message} onChange={event => setMessage(event.target.value)} maxLength={5000} required placeholder="An idea, a question, or just hello…" />
            </> : <>
              <label htmlFor="studio-name">What should I call you?</label>
              <input id="studio-name" autoComplete="name" required maxLength={100} value={name} onChange={event => setName(event.target.value)} placeholder="Your name" />
              <label htmlFor="studio-email">Where can I find you?</label>
              <input id="studio-email" type="email" autoComplete="email" required maxLength={254} value={email} onChange={event => setEmail(event.target.value)} placeholder="you@example.com" />
              <p className="text-xs opacity-70">Your details stay between us.</p>
              {delivery === 'email-draft' && <p className="contact-delivery-hint">This opens your email app with your note filled in. Send it there to reach me.</p>}
            </>}
            {error && <p className="contact-error" role="alert">{error}</p>}
            <div className="contact-actions">
              {step === 2 && <button type="button" className="contact-back" onClick={() => { setStep(1); setError(''); setDraftOpened(false); setCopyStatus('') }} disabled={sending}><ArrowLeft className="inline-block" size={13} /> Back</button>}
              <button type="submit" disabled={sending || (step === 2 && delivery === 'checking')}>
                {sending ? 'Sending…' : step === 1 ? 'Next' : delivery === 'checking' ? 'One moment…' : delivery === 'email-draft' ? draftOpened ? 'Reopen draft' : 'Open email draft' : 'Send note'}
                {!sending && <ArrowRight className="inline-block ml-2" size={14} />} <span className="ml-2 opacity-60">({step}/2)</span>
              </button>
            </div>
            {step === 2 && (draftOpened || error) && <div className="contact-draft-help">
              {draftOpened && <p role="status">Your note hasn’t been sent yet. Send the draft from your email app, or copy it below.</p>}
              {!draftOpened && <a href={draftUrl} onClick={() => setDraftOpened(true)}>Open an email draft instead ↗</a>}
              <button type="button" className="contact-copy" onClick={copyNote}>Copy note</button>
              {copyStatus && <p role="status">{copyStatus}</p>}
            </div>}
          </form>}
      </div>
      <p className="hand-note contact-availability">Good conversations are always welcome!</p>
      <a className="contact-email" href={`mailto:${contactEmail}`}>Or email me: {contactEmail} ↗</a>
    </Reveal>
  </section>
}

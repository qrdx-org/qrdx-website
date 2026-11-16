'use client'

import { useState, type ChangeEvent, type FormEvent } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Eyebrow, PageHero, Section } from '@/components/site/blocks'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { apps, contact, docs, social } from '@/lib/site'

const CHANNELS = [
  { k: 'Support', v: contact.support, href: `mailto:${contact.support}`, text: 'Help with the wallet, Trade or the explorer.' },
  { k: 'Research', v: contact.research, href: `mailto:${contact.research}`, text: 'The protocol, the cryptography, working together.' },
  { k: 'Security', v: 'Report a vulnerability', href: docs.reporting, text: 'Privately, before anything is public. The page says how.' },
  { k: 'Partners', v: 'trade.qrdx.org/partner', href: `${apps.trade}/partner`, text: 'Listing a market, or building on the exchange.' },
  { k: 'Community', v: 'Telegram', href: social.telegram, text: 'Questions and announcements, with other people using QRDX.' },
]

const FIELD = 'h-11 rounded-md border-foreground/15 bg-transparent'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const change = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [e.target.id]: e.target.value }))

  // No server receives this: it opens the visitor's email app with the message filled in.
  const submit = (e: FormEvent) => {
    e.preventDefault()
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    window.location.href = `mailto:${contact.support}?subject=${encodeURIComponent(form.subject || 'Contact form')}&body=${encodeURIComponent(body)}`
  }

  return (
    <>
      <PageHero eyebrow="Contact" title="Talk to the people building QRDX">
        Most questions are answered in the{' '}
        <a href={docs.home} target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground">
          docs
        </a>
        . For everything else, write to the right address below.
      </PageHero>

      <Section>
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <dl className="border-t border-foreground/15">
            {CHANNELS.map((c) => (
              <div key={c.k} className="grid gap-x-6 gap-y-1 border-b py-5 sm:grid-cols-[7rem_1fr]">
                <dt className="pt-0.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">{c.k}</dt>
                <dd>
                  <a
                    href={c.href}
                    {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group inline-flex items-center gap-1.5 font-medium underline decoration-foreground/20 underline-offset-4 hover:decoration-foreground"
                  >
                    {c.v}
                    {c.href.startsWith('http') && <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />}
                  </a>
                  <p className="mt-1 text-sm text-muted-foreground">{c.text}</p>
                </dd>
              </div>
            ))}
          </dl>

          <form onSubmit={submit} className="space-y-5">
            <Eyebrow>Write to support</Eyebrow>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block space-y-2 text-sm">
                <span>Name</span>
                <Input id="name" value={form.name} onChange={change} autoComplete="name" className={FIELD} />
              </label>
              <label className="block space-y-2 text-sm">
                <span>Email</span>
                <Input id="email" type="email" value={form.email} onChange={change} autoComplete="email" required className={FIELD} />
              </label>
            </div>
            <label className="block space-y-2 text-sm">
              <span>Subject</span>
              <Input id="subject" value={form.subject} onChange={change} className={FIELD} />
            </label>
            <label className="block space-y-2 text-sm">
              <span>Message</span>
              <Textarea id="message" value={form.message} onChange={change} required rows={7} className="rounded-md border-foreground/15 bg-transparent" />
            </label>
            <div className="flex flex-wrap items-center gap-4">
              <button type="submit" className="inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                Open in your email app
              </button>
              <span className="text-xs text-muted-foreground">Nothing is sent from this page; your email app sends it to {contact.support}.</span>
            </div>
          </form>
        </div>
      </Section>
    </>
  )
}

'use client';

import { useState } from 'react';
import { Mail, Send, Check } from 'lucide-react';
import { SITE } from '@/lib/site';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const inputStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.02)',
  border: '1px solid var(--border)',
  color: 'var(--text)',
};

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [company, setCompany] = useState(''); // honeypot
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, company }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Something went wrong. Please email us directly.');
      }
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  if (status === 'success') {
    return (
      <div
        className="rounded-2xl p-8 text-center"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: 'rgba(34,197,94,0.12)', color: '#22c55e' }}
          aria-hidden="true"
        >
          <Check size={22} />
        </div>
        <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text)' }}>
          Thanks, {name.split(' ')[0] || 'there'} — your message is on its way.
        </h2>
        <p className="text-[15px] leading-relaxed" style={{ color: 'var(--text-2)' }}>
          We’ll reply to <strong style={{ color: 'var(--text)' }}>{email}</strong> shortly. Prefer
          to talk sooner? You can also{' '}
          <a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer" className="font-semibold" style={{ color: '#93c5fd' }}>
            book a free call
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl p-6 sm:p-8 flex flex-col gap-4"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      noValidate
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium" style={{ color: 'var(--text)' }}>
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          className="rounded-xl px-4 py-2.5 text-[15px] outline-none focus:border-[var(--primary)] transition-colors"
          style={inputStyle}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium" style={{ color: 'var(--text)' }}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className="rounded-xl px-4 py-2.5 text-[15px] outline-none focus:border-[var(--primary)] transition-colors"
          style={inputStyle}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium" style={{ color: 'var(--text)' }}>
          What can we help with?
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="rounded-xl px-4 py-2.5 text-[15px] outline-none focus:border-[var(--primary)] transition-colors resize-y"
          style={inputStyle}
        />
      </div>

      {/* Honeypot — visually hidden, ignored by humans, filled by bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company (leave blank)</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      {status === 'error' && (
        <p className="text-sm" style={{ color: 'var(--cta)' }} role="alert">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4 mt-2">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold text-white transition-transform duration-150 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
          style={{ background: 'var(--cta)' }}
        >
          <Send size={16} />
          {status === 'submitting' ? 'Sending…' : 'Send message'}
        </button>
        <a
          href={`mailto:${SITE.email}`}
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-150 hover:text-[var(--text)]"
          style={{ color: 'var(--text-2)' }}
        >
          <Mail size={15} /> {SITE.email}
        </a>
      </div>
    </form>
  );
}

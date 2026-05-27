'use client'

import { useEffect, useState } from 'react'
import { supabase, type Review } from '@/lib/supabase'

// ─── Star display ─────────────────────────────────────────────────────────────
function Stars({ rating, size = 18, interactive = false, onChange }: {
  rating: number
  size?: number
  interactive?: boolean
  onChange?: (r: number) => void
}) {
  const [hovered, setHovered] = useState(0)
  const display = interactive ? (hovered || rating) : rating
  return (
    <div style={{ display: 'flex', gap: '3px' }}>
      {[1, 2, 3, 4, 5].map(n => (
        <span
          key={n}
          onClick={() => interactive && onChange?.(n)}
          onMouseEnter={() => interactive && setHovered(n)}
          onMouseLeave={() => interactive && setHovered(0)}
          style={{
            fontSize: `${size}px`, lineHeight: 1,
            cursor: interactive ? 'pointer' : 'default',
            color: n <= display ? '#f59e0b' : '#e2e8f0',
            transition: 'color 0.15s',
            userSelect: 'none',
          }}
        >★</span>
      ))}
    </div>
  )
}

// ─── Avatar initials ──────────────────────────────────────────────────────────
function Avatar({ name, size = 44 }: { name: string; size?: number }) {
  const initials = name.trim().split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase()
  const colors = ['#00c896', '#6366f1', '#ec4899', '#f59e0b', '#3b82f6', '#f97316', '#22c55e', '#a855f7']
  const color = colors[name.charCodeAt(0) % colors.length]
  return (
    <div style={{
      width: `${size}px`, height: `${size}px`, borderRadius: '50%',
      background: `${color}22`, border: `2px solid ${color}40`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: `${size * 0.36}px`, fontWeight: 800, color,
      fontFamily: "'Syne', sans-serif", flexShrink: 0,
    }}>
      {initials}
    </div>
  )
}

// ─── Relative time ────────────────────────────────────────────────────────────
function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1)   return 'just now'
  if (m < 60)  return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24)  return `${h}h ago`
  const d = Math.floor(h / 24)
  if (d < 7)   return `${d}d ago`
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

// ─── Rating breakdown bar ─────────────────────────────────────────────────────
function RatingBar({ star, count, total }: { star: number; count: number; total: number }) {
  const pct = total ? Math.round((count / total) * 100) : 0
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
      <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, width: '8px', textAlign: 'right' }}>{star}</span>
      <span style={{ fontSize: '13px', color: '#f59e0b' }}>★</span>
      <div style={{ flex: 1, height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #f59e0b, #fbbf24)', borderRadius: '4px', transition: 'width 0.6s ease' }} />
      </div>
      <span style={{ fontSize: '11px', color: '#94a3b8', width: '22px', textAlign: 'right' }}>{count}</span>
    </div>
  )
}

// ─── Submit form ──────────────────────────────────────────────────────────────
function ReviewForm({ onSubmitted }: { onSubmitted: () => void }) {
  const [rating, setRating]   = useState(0)
  const [name, setName]       = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [success, setSuccess] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!rating)   { setError('Please select a star rating.'); return }
    if (!name.trim())    { setError('Please enter your name.'); return }
    if (!message.trim()) { setError('Please write a short review.'); return }

    setLoading(true)
    setError('')

    const { error: sbErr } = await supabase.from('reviews').insert({
      name: name.trim(),
      company: company.trim() || null,
      rating,
      message: message.trim(),
    })

    setLoading(false)
    if (sbErr) { setError('Something went wrong. Please try again.'); return }

    setSuccess(true)
    onSubmitted()
  }

  if (success) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 24px', background: '#f0fdf4', borderRadius: '20px', border: '2px solid #00c896' }}>
        <div style={{ fontSize: '40px', marginBottom: '12px' }}>🎉</div>
        <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', fontFamily: "'Syne', sans-serif", marginBottom: '6px' }}>
          Thank you for your review!
        </div>
        <div style={{ color: '#64748b', fontSize: '14px' }}>Your feedback helps Elisha grow and reach more clients.</div>
      </div>
    )
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', borderRadius: '12px',
    border: '1.5px solid #e2e8f0', fontSize: '14px', color: '#0f172a',
    fontFamily: "'Inter', sans-serif", outline: 'none', background: '#fff',
    transition: 'border-color 0.2s', boxSizing: 'border-box',
  }

  return (
    <form onSubmit={submit} style={{ background: '#f8fafc', borderRadius: '20px', padding: '28px', border: '1.5px solid #e2e8f0' }}>
      <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', fontFamily: "'Syne', sans-serif", marginBottom: '6px' }}>
        Leave a Review
      </div>
      <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>
        Worked with Elisha? Share your experience — it takes 30 seconds.
      </div>

      {/* Star picker */}
      <div style={{ marginBottom: '18px' }}>
        <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '8px', letterSpacing: '0.5px' }}>YOUR RATING *</div>
        <Stars rating={rating} size={32} interactive onChange={setRating} />
        {rating > 0 && (
          <div style={{ marginTop: '6px', fontSize: '12px', color: '#f59e0b', fontWeight: 700 }}>
            {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent!'][rating]}
          </div>
        )}
      </div>

      {/* Name + Company row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px', letterSpacing: '0.5px' }}>YOUR NAME *</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Sarah Kamau"
            style={inputStyle}
            onFocus={e => { e.target.style.borderColor = '#6366f1' }}
            onBlur={e => { e.target.style.borderColor = '#e2e8f0' }} />
        </div>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px', letterSpacing: '0.5px' }}>COMPANY / ROLE</label>
          <input value={company} onChange={e => setCompany(e.target.value)} placeholder="e.g. CTO at TechCo"
            style={inputStyle}
            onFocus={e => { e.target.style.borderColor = '#6366f1' }}
            onBlur={e => { e.target.style.borderColor = '#e2e8f0' }} />
        </div>
      </div>

      {/* Message */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px', letterSpacing: '0.5px' }}>YOUR REVIEW *</label>
        <textarea value={message} onChange={e => setMessage(e.target.value)}
          placeholder="Describe your experience working with Elisha..."
          rows={4}
          style={{ ...inputStyle, resize: 'vertical', minHeight: '96px' }}
          onFocus={e => { e.target.style.borderColor = '#6366f1' }}
          onBlur={e => { e.target.style.borderColor = '#e2e8f0' }} />
        <div style={{ textAlign: 'right', fontSize: '11px', color: message.length > 400 ? '#ec4899' : '#94a3b8', marginTop: '4px' }}>
          {message.length}/500
        </div>
      </div>

      {error && (
        <div style={{ padding: '10px 14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', color: '#dc2626', fontSize: '13px', marginBottom: '14px' }}>
          ⚠️ {error}
        </div>
      )}

      <button type="submit" disabled={loading} style={{
        width: '100%', padding: '13px', borderRadius: '12px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
        background: loading ? '#e2e8f0' : 'linear-gradient(135deg, #00c896, #22c55e)',
        color: loading ? '#94a3b8' : '#fff', fontWeight: 800, fontSize: '15px',
        fontFamily: "'Inter', sans-serif", transition: 'all 0.2s',
        boxShadow: loading ? 'none' : '0 4px 16px rgba(0,200,150,0.35)',
      }}>
        {loading ? 'Submitting…' : '✨ Submit Review'}
      </button>
    </form>
  )
}

// ─── Main Reviews Section ─────────────────────────────────────────────────────
export function ReviewsSection() {
  const [reviews, setReviews]     = useState<Review[]>([])
  const [loading, setLoading]     = useState(true)
  const [expanded, setExpanded]   = useState<string | null>(null)

  async function load() {
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })
    setReviews(data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const avg    = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) : 0
  const counts = [5, 4, 3, 2, 1].map(s => ({ star: s, count: reviews.filter(r => r.rating === s).length }))

  return (
    <section id="reviews" style={{ background: 'linear-gradient(135deg, #faf5ff 0%, #f0f9ff 100%)', padding: '96px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{
            display: 'inline-block', padding: '5px 14px', borderRadius: '20px',
            background: '#fef3c7', color: '#d97706', fontSize: '11px',
            fontWeight: 800, letterSpacing: '2.5px', fontFamily: "'JetBrains Mono', monospace", marginBottom: '14px',
          }}>CLIENT REVIEWS</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: '#0f172a', margin: '0', fontFamily: "'Syne', sans-serif" }}>
            What Clients Say
          </h2>
          <p style={{ color: '#64748b', fontSize: '16px', marginTop: '10px' }}>Real feedback from people I've built for.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '36px', alignItems: 'start' }}>

          {/* Left: aggregate + form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Aggregate rating card */}
            <div style={{ background: '#fff', borderRadius: '20px', padding: '28px', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', textAlign: 'center' }}>
              <div style={{ fontSize: '64px', fontWeight: 900, color: '#0f172a', fontFamily: "'Syne', sans-serif", lineHeight: 1 }}>
                {reviews.length ? avg.toFixed(1) : '—'}
              </div>
              <div style={{ marginTop: '8px', marginBottom: '4px' }}>
                <Stars rating={Math.round(avg)} size={22} />
              </div>
              <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>
                {reviews.length} review{reviews.length !== 1 ? 's' : ''}
              </div>
              {counts.map(({ star, count }) => (
                <RatingBar key={star} star={star} count={count} total={reviews.length} />
              ))}
            </div>

            {/* Submit form */}
            <ReviewForm onSubmitted={load} />
          </div>

          {/* Right: review cards */}
          <div>
            {loading && (
              <div style={{ textAlign: 'center', padding: '60px', color: '#94a3b8' }}>
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>⏳</div>
                Loading reviews…
              </div>
            )}

            {!loading && reviews.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px', background: '#fff', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>💬</div>
                <div style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', fontFamily: "'Syne', sans-serif", marginBottom: '6px' }}>
                  No reviews yet
                </div>
                <div style={{ color: '#64748b', fontSize: '14px' }}>Be the first to leave a review!</div>
              </div>
            )}

            {!loading && reviews.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {reviews.map(review => {
                  const isLong = review.message.length > 220
                  const isOpen = expanded === review.id
                  return (
                    <div key={review.id} style={{
                      background: '#fff', borderRadius: '18px', padding: '20px 22px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                      borderLeft: `4px solid ${['', '#ec4899', '#f59e0b', '#3b82f6', '#6366f1', '#00c896'][review.rating]}`,
                    }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '10px' }}>
                        <Avatar name={review.name} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '4px' }}>
                            <div>
                              <div style={{ fontWeight: 800, fontSize: '14px', color: '#0f172a', fontFamily: "'Syne', sans-serif" }}>{review.name}</div>
                              {review.company && <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>{review.company}</div>}
                            </div>
                            <div style={{ fontSize: '11px', color: '#94a3b8', whiteSpace: 'nowrap' }}>{timeAgo(review.created_at)}</div>
                          </div>
                          <div style={{ marginTop: '5px' }}>
                            <Stars rating={review.rating} size={14} />
                          </div>
                        </div>
                      </div>
                      <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.7', margin: 0 }}>
                        {isLong && !isOpen ? review.message.slice(0, 220) + '…' : review.message}
                      </p>
                      {isLong && (
                        <button onClick={() => setExpanded(isOpen ? null : review.id)} style={{
                          marginTop: '6px', background: 'none', border: 'none', cursor: 'pointer',
                          color: '#6366f1', fontWeight: 700, fontSize: '13px', padding: 0, fontFamily: 'inherit',
                        }}>
                          {isOpen ? 'Show less ↑' : 'Read more ↓'}
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

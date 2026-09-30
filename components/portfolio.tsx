'use client'

import { useState, useEffect } from 'react'
import { Download, ExternalLink, Github, Linkedin, Mail, MapPin, Phone, Menu, X, GraduationCap } from 'lucide-react'
import { ReviewsSection } from '@/components/reviews-section'
import data from '@/data/portfolio.json'

// All content lives in data/portfolio.json — edit that file to update the site.
const { personal } = data

type Job = {
  title: string; company: string; period: string; type?: string; icon: string
  summary?: string; points: string[]; tags?: string[]
}
type Project = {
  title: string; category: string; desc: string; tags: string[]
  demo?: string; github?: string; image?: string; status?: string
}

// ─── Palette ─────────────────────────────────────────────────────────────────
const TONES = [
  { accent: '#00c896', bg: '#e6faf5', text: '#065f46', gradient: 'linear-gradient(135deg, #00c896, #22c55e)' },
  { accent: '#6366f1', bg: '#eef2ff', text: '#3730a3', gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)' },
  { accent: '#ec4899', bg: '#fdf2f8', text: '#9d174d', gradient: 'linear-gradient(135deg, #ec4899, #f97316)' },
  { accent: '#f59e0b', bg: '#fffbeb', text: '#92400e', gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)' },
  { accent: '#3b82f6', bg: '#eff6ff', text: '#1e40af', gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)' },
  { accent: '#f97316', bg: '#fff7ed', text: '#9a3412', gradient: 'linear-gradient(135deg, #f97316, #facc15)' },
]
const tone = (i: number) => TONES[i % TONES.length]

const phoneHref = `tel:${personal.phone.replace(/\s/g, '')}`

// Renders **bold** segments from the JSON copy
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
        i % 2 ? <strong key={i} style={{ color: '#0f172a' }}>{part}</strong> : part)}
    </>
  )
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = ['About', 'Skills', 'Experience', 'Projects', 'Reviews', 'Contact']

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(16px)',
      boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.08)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent',
      transition: 'all 0.3s ease',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
        {/* Logo */}
        <a href="#hero" style={{ textDecoration: 'none' }}>
          <span style={{
            fontSize: '24px', fontWeight: 900, fontFamily: "'Syne', sans-serif",
            background: 'linear-gradient(135deg, #00c896, #6366f1)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>EK.</span>
        </a>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="hidden-mobile">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{
              padding: '6px 14px', borderRadius: '20px', textDecoration: 'none',
              color: '#475569', fontWeight: 600, fontSize: '14px', transition: 'all 0.2s',
              fontFamily: "'Inter', sans-serif",
            }}
              onMouseEnter={e => { (e.target as HTMLElement).style.background = '#f1f5f9'; (e.target as HTMLElement).style.color = '#0f172a' }}
              onMouseLeave={e => { (e.target as HTMLElement).style.background = 'transparent'; (e.target as HTMLElement).style.color = '#475569' }}
            >{l}</a>
          ))}
          <a href={personal.cv} download style={{
            marginLeft: '8px', padding: '8px 18px', borderRadius: '20px',
            background: 'linear-gradient(135deg, #00c896, #22c55e)',
            color: '#fff', fontWeight: 700, fontSize: '14px', textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: '6px',
            boxShadow: '0 4px 14px rgba(0,200,150,0.35)',
          }}>
            <Download style={{ width: 14, height: 14 }} /> CV
          </a>
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setOpen(o => !o)} style={{
          display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '8px',
        }} className="show-mobile">
          {open ? <X style={{ width: 22, height: 22, color: '#0f172a' }} /> : <Menu style={{ width: 22, height: 22, color: '#0f172a' }} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div style={{ background: '#fff', borderTop: '1px solid #f1f5f9', padding: '12px 24px 20px' }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} style={{
              display: 'block', padding: '10px 0', color: '#475569', fontWeight: 600,
              fontSize: '15px', textDecoration: 'none', borderBottom: '1px solid #f1f5f9',
            }}>{l}</a>
          ))}
          <a href={personal.cv} download style={{
            display: 'block', marginTop: '14px', padding: '10px 18px', textAlign: 'center',
            background: 'linear-gradient(135deg, #00c896, #22c55e)', color: '#fff',
            fontWeight: 700, borderRadius: '12px', textDecoration: 'none',
          }}>Download CV</a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="hero" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #faf5ff 50%, #fff5f0 100%)',
      paddingTop: '64px',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px', textAlign: 'center', width: '100%' }}>
        <div style={{
          display: 'inline-block', padding: '6px 16px', borderRadius: '20px',
          background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)',
          color: '#6366f1', fontSize: '12px', fontWeight: 700, letterSpacing: '2.5px',
          fontFamily: "'JetBrains Mono', monospace", marginBottom: '24px',
        }}>
          HELLO, I'M
        </div>

        <h1 style={{
          fontSize: 'clamp(52px, 8vw, 96px)', fontWeight: 800, lineHeight: 1.05,
          fontFamily: "'Syne', sans-serif", letterSpacing: '-2px',
          background: 'linear-gradient(135deg, #00c896 0%, #6366f1 45%, #ec4899 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          margin: '0 0 16px',
        }}>
          {personal.name}
        </h1>

        <p style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', color: '#64748b', fontWeight: 500, marginBottom: '6px' }}>
          {personal.title}
        </p>
        <p style={{ fontSize: '14px', color: '#6366f1', fontWeight: 700, letterSpacing: '1px', fontFamily: "'JetBrains Mono', monospace", marginBottom: '16px' }}>
          {personal.roles}
        </p>

        <p style={{ fontSize: '16px', color: '#94a3b8', maxWidth: '600px', margin: '0 auto 36px', lineHeight: '1.7' }}>
          {personal.tagline}
        </p>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '56px' }}>
          <a href="#projects" style={{
            padding: '14px 32px', borderRadius: '50px',
            background: 'linear-gradient(135deg, #00c896, #22c55e)',
            color: '#fff', fontWeight: 700, fontSize: '15px', textDecoration: 'none',
            boxShadow: '0 8px 28px rgba(0,200,150,0.35)', transition: 'transform 0.2s',
          }}>View Projects</a>
          <a href={personal.cv} download style={{
            padding: '14px 32px', borderRadius: '50px',
            background: '#fff', color: '#0f172a', fontWeight: 700, fontSize: '15px',
            textDecoration: 'none', border: '2px solid #e2e8f0',
            display: 'flex', alignItems: 'center', gap: '8px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
          }}>
            <Download style={{ width: 16, height: 16 }} /> Download CV
          </a>
        </div>

        {/* Tech stack */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '64px' }}>
          {data.heroTech.map((label, i) => (
            <span key={label} style={{
              padding: '7px 16px', background: tone(i).bg, border: `1.5px solid ${tone(i).accent}30`,
              borderRadius: '20px', color: tone(i).accent, fontSize: '13px', fontWeight: 700,
              fontFamily: "'JetBrains Mono', monospace",
            }}>{label}</span>
          ))}
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', maxWidth: '780px', margin: '0 auto' }}>
          {data.heroStats.map(({ value, label }, i) => (
            <div key={label} style={{
              padding: '20px 12px', background: '#fff', borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.07)', borderTop: `3px solid ${tone(i).accent}`,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '30px', fontWeight: 800, color: '#0f172a', fontFamily: "'Syne', sans-serif", whiteSpace: 'nowrap' }}>{value}</div>
              <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, marginTop: '4px' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────
function Section({ id, label, heading, subheading, bg, children }: {
  id: string; label: string; heading: string; subheading?: string; bg?: string; children: React.ReactNode
}) {
  return (
    <section id={id} style={{ background: bg ?? '#fff', padding: '96px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ marginBottom: '56px', textAlign: 'center' }}>
          <div style={{
            display: 'inline-block', padding: '5px 14px', borderRadius: '20px',
            background: '#eef2ff', color: '#6366f1', fontSize: '11px',
            fontWeight: 800, letterSpacing: '2.5px', fontFamily: "'JetBrains Mono', monospace", marginBottom: '14px',
          }}>{label}</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: '#0f172a', margin: '0', fontFamily: "'Syne', sans-serif", lineHeight: 1.2 }}>
            {heading}
          </h2>
          {subheading && <p style={{ color: '#64748b', fontSize: '16px', marginTop: '12px', maxWidth: '560px', margin: '12px auto 0', lineHeight: '1.6' }}>{subheading}</p>}
        </div>
        {children}
      </div>
    </section>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  const { about } = data
  return (
    <Section id="about" label="ABOUT ME" heading={about.heading} bg="#fff">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '56px', alignItems: 'center' }}>
        <div>
          {about.paragraphs.map((p, i) => (
            <p key={i} style={{ fontSize: '16px', color: '#475569', lineHeight: '1.8', marginBottom: '16px' }}>
              <Rich text={p} />
            </p>
          ))}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px',
            background: '#f0fdf4', borderRadius: '12px', borderLeft: '3px solid #00c896',
            color: '#065f46', fontWeight: 600, fontSize: '14px', margin: '8px 0 20px',
          }}>
            <MapPin style={{ width: 16, height: 16, color: '#00c896' }} />
            {personal.location} &nbsp;·&nbsp; {personal.availability}
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {[
              { icon: <Github style={{ width: 16, height: 16 }} />, label: 'GitHub', href: personal.github, bg: '#0f172a' },
              { icon: <Linkedin style={{ width: 16, height: 16 }} />, label: 'LinkedIn', href: personal.linkedin, bg: '#0077b5' },
              { icon: <Mail style={{ width: 16, height: 16 }} />, label: 'Email', href: `mailto:${personal.email}`, bg: '#ea4335' },
            ].map(({ icon, label, href, bg }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 16px',
                background: bg, color: '#fff', borderRadius: '10px', textDecoration: 'none',
                fontWeight: 700, fontSize: '13px',
              }}>
                {icon} {label}
              </a>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          {about.impact.map(({ value, label }, i) => (
            <div key={label} style={{
              padding: '28px 20px', background: tone(i).bg, borderRadius: '20px',
              borderTop: `4px solid ${tone(i).accent}`, textAlign: 'center',
            }}>
              <div style={{ fontSize: '40px', fontWeight: 800, color: '#0f172a', fontFamily: "'Syne', sans-serif" }}>{value}</div>
              <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, marginTop: '6px' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

// ─── Skills ───────────────────────────────────────────────────────────────────
function Skills() {
  return (
    <Section id="skills" label="TECHNOLOGIES" heading="Skills & Technologies" bg="#f8fafc">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {data.skills.map((cat, i) => {
          const t = tone(i)
          return (
            <div key={cat.title} style={{
              background: '#fff', borderRadius: '20px', overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}>
              <div style={{ height: '6px', background: t.gradient }} />
              <div style={{ padding: '24px' }}>
                <div style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', marginBottom: '16px', fontFamily: "'Syne', sans-serif" }}>
                  {cat.title}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  {cat.skills.map(s => (
                    <div key={s} style={{
                      padding: '7px 12px', background: t.bg, borderRadius: '8px',
                      fontSize: '13px', color: t.text, fontWeight: 600,
                      borderLeft: `2.5px solid ${t.accent}`,
                    }}>{s}</div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}

// ─── Experience ───────────────────────────────────────────────────────────────
function Experience() {
  const jobs = data.experience as Job[]

  return (
    <Section id="experience" label="EXPERIENCE" heading="My Professional Journey" bg="#fff">
      <div style={{ maxWidth: '760px', margin: '0 auto', position: 'relative' }}>
        {/* Timeline line */}
        <div style={{ position: 'absolute', left: '19px', top: '12px', bottom: '12px', width: '2px', background: 'linear-gradient(180deg, #00c896, #6366f1, #ec4899, #f59e0b)' }} />
        {jobs.map((job, i) => {
          const t = tone(i)
          return (
            <div key={i} style={{ display: 'flex', gap: '24px', marginBottom: '32px', position: 'relative' }}>
              {/* Dot */}
              <div style={{
                width: '40px', height: '40px', borderRadius: '50%', background: t.accent,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, boxShadow: `0 0 0 4px ${t.bg}, 0 0 0 6px ${t.accent}30`,
                fontSize: '14px',
              }}>
                {job.icon}
              </div>
              {/* Card */}
              <div style={{ flex: 1, minWidth: 0, background: '#fff', borderRadius: '16px', padding: '20px 24px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', borderLeft: `4px solid ${t.accent}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '6px' }}>
                  <div style={{ fontWeight: 800, fontSize: '16px', color: '#0f172a', fontFamily: "'Syne', sans-serif" }}>{job.title}</div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {job.type && <span style={{ padding: '3px 10px', background: t.bg, color: t.text, borderRadius: '10px', fontSize: '11px', fontWeight: 700 }}>{job.type}</span>}
                    <span style={{ padding: '3px 10px', background: t.accent, color: '#fff', borderRadius: '10px', fontSize: '11px', fontWeight: 700 }}>{job.period}</span>
                  </div>
                </div>
                <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, marginBottom: '12px' }}>{job.company}</div>
                {job.summary && <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.6', margin: '0 0 10px' }}>{job.summary}</p>}
                <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none' }}>
                  {job.points.map((p, pi) => (
                    <li key={pi} style={{ fontSize: '14px', color: '#475569', marginBottom: '6px', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: t.accent, marginTop: '2px', flexShrink: 0 }}>▸</span> {p}
                    </li>
                  ))}
                </ul>
                {job.tags && (
                  <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginTop: '12px' }}>
                    {job.tags.map(tag => (
                      <span key={tag} style={{ padding: '3px 9px', background: t.bg, color: t.text, borderRadius: '8px', fontSize: '11px', fontWeight: 700 }}>{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Education */}
      <div style={{ maxWidth: '760px', margin: '48px auto 0' }}>
        <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', fontFamily: "'Syne', sans-serif", marginBottom: '18px', textAlign: 'center' }}>
          Education &amp; Certifications
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          {data.education.map((e, i) => {
            const t = tone(i + 1)
            return (
              <div key={e.title} style={{ background: t.bg, borderRadius: '16px', padding: '18px 20px', borderTop: `3px solid ${t.accent}` }}>
                <GraduationCap style={{ width: 20, height: 20, color: t.accent, marginBottom: '8px' }} />
                <div style={{ fontWeight: 800, fontSize: '14px', color: '#0f172a', marginBottom: '4px' }}>{e.title}</div>
                <div style={{ fontSize: '13px', color: t.text, fontWeight: 600 }}>{e.school}</div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{e.period}</div>
                {'detail' in e && e.detail && <div style={{ fontSize: '12px', color: '#64748b', marginTop: '8px', lineHeight: '1.5' }}>{e.detail}</div>}
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}

// ─── Projects ─────────────────────────────────────────────────────────────────
const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  'Live':           { bg: '#00c896', color: '#fff' },
  'In development': { bg: '#f59e0b', color: '#fff' },
}

// Screenshot, or a branded cover when a project has no image (or it fails to load)
function ProjectImage({ p, i, height }: { p: Project; i: number; height: string }) {
  const [failed, setFailed] = useState(false)
  const t = tone(i)
  const status = p.status ?? (p.demo ? 'Live' : undefined)
  const s = (status && STATUS_STYLE[status]) || { bg: 'rgba(15,23,42,0.75)', color: '#fff' }

  return (
    <div style={{ height, position: 'relative', overflow: 'hidden', background: `${t.accent}15` }}>
      {p.image && !failed ? (
        <img src={p.image} alt={p.title} loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
          onError={() => setFailed(true)} />
      ) : (
        <div style={{
          height: '100%', background: t.gradient, color: '#fff', padding: '16px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        }}>
          <div style={{ fontSize: '22px', fontWeight: 800, fontFamily: "'Syne', sans-serif", lineHeight: 1.2 }}>{p.title}</div>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', opacity: 0.85, marginTop: '8px', fontFamily: "'JetBrains Mono', monospace" }}>
            {p.tags.slice(0, 3).join(' · ').toUpperCase()}
          </div>
        </div>
      )}
      {status && (
        <span style={{
          position: 'absolute', top: '10px', left: '10px', padding: '3px 10px', borderRadius: '10px',
          background: s.bg, color: s.color, fontSize: '10px', fontWeight: 800, letterSpacing: '1px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}>{status.toUpperCase()}</span>
      )}
    </div>
  )
}

function Projects() {
  const { featured, categories, subheading } = data.projects
  const items = data.projects.items as Project[]
  const [filter, setFilter] = useState('all')
  const tabs = [{ id: 'all', label: 'All' }, ...categories]
  const shown = filter === 'all' ? items : items.filter(p => p.category === filter)

  return (
    <Section id="projects" label="FEATURED WORK" heading="Projects & Live Platforms" bg="#f8fafc" subheading={subheading}>
      {/* Featured */}
      <div style={{
        background: '#fff', borderRadius: '24px', overflow: 'hidden',
        boxShadow: '0 8px 40px rgba(0,0,0,0.1)', marginBottom: '36px',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      }}>
        <div style={{ height: '100%', minHeight: '280px', overflow: 'hidden', background: '#f0fdf4' }}>
          <img src={featured.image} alt={featured.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left top' }}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
        </div>
        <div style={{ padding: '36px' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
            <span style={{ padding: '4px 12px', background: '#e6faf5', color: '#065f46', borderRadius: '20px', fontSize: '11px', fontWeight: 700 }}>FEATURED</span>
            <span style={{ padding: '4px 12px', background: '#00c89620', color: '#00c896', borderRadius: '20px', fontSize: '11px', fontWeight: 700, border: '1px solid #00c89640' }}>LIVE</span>
          </div>
          <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', fontFamily: "'Syne', sans-serif", marginBottom: '12px', lineHeight: 1.2 }}>{featured.title}</h3>
          <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.75', marginBottom: '20px' }}>{featured.desc}</p>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '24px' }}>
            {featured.tags.map(t => (
              <span key={t} style={{ padding: '4px 10px', background: '#00c89615', color: '#00c896', borderRadius: '10px', fontSize: '12px', fontWeight: 700 }}>{t}</span>
            ))}
          </div>
          <a href={featured.demo} target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '10px 22px',
            background: 'linear-gradient(135deg, #00c896, #22c55e)', color: '#fff',
            borderRadius: '12px', textDecoration: 'none', fontWeight: 700, fontSize: '14px',
            boxShadow: '0 4px 14px rgba(0,200,150,0.35)',
          }}>
            <ExternalLink style={{ width: 15, height: 15 }} /> View Live Site
          </a>
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '28px' }}>
        {tabs.map(tab => {
          const count = tab.id === 'all' ? items.length : items.filter(p => p.category === tab.id).length
          const active = filter === tab.id
          return (
            <button key={tab.id} onClick={() => setFilter(tab.id)} style={{
              padding: '8px 18px', borderRadius: '20px', cursor: 'pointer',
              border: active ? '1.5px solid #6366f1' : '1.5px solid #e2e8f0',
              background: active ? '#6366f1' : '#fff', color: active ? '#fff' : '#475569',
              fontWeight: 700, fontSize: '13px', transition: 'all 0.2s',
            }}>
              {tab.label} <span style={{ opacity: 0.7, fontWeight: 600 }}>({count})</span>
            </button>
          )
        })}
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {shown.map(p => {
          const i = items.indexOf(p)
          const t = tone(i)
          return (
            <div key={p.title} style={{
              background: '#fff', borderRadius: '18px', overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
              display: 'flex', flexDirection: 'column',
            }}>
              <ProjectImage p={p} i={i} height="170px" />
              <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontWeight: 800, fontSize: '15px', color: '#0f172a', marginBottom: '8px', fontFamily: "'Syne', sans-serif" }}>{p.title}</div>
                <div style={{ fontSize: '12.5px', color: '#64748b', lineHeight: '1.6', marginBottom: '12px', flex: 1 }}>{p.desc}</div>
                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '14px' }}>
                  {p.tags.map(tag => (
                    <span key={tag} style={{ padding: '3px 8px', background: `${t.accent}15`, color: t.accent, borderRadius: '8px', fontSize: '11px', fontWeight: 700 }}>{tag}</span>
                  ))}
                </div>
                {(p.demo || p.github) && (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {p.demo && (
                      <a href={p.demo} target="_blank" rel="noopener noreferrer" style={{
                        display: 'flex', alignItems: 'center', gap: '5px', padding: '7px 14px',
                        background: t.accent, color: '#fff', borderRadius: '9px',
                        textDecoration: 'none', fontWeight: 700, fontSize: '12px',
                      }}>
                        <ExternalLink style={{ width: 12, height: 12 }} /> Live
                      </a>
                    )}
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noopener noreferrer" style={{
                        display: 'flex', alignItems: 'center', gap: '5px', padding: '7px 14px',
                        background: '#f1f5f9', color: '#475569', borderRadius: '9px',
                        textDecoration: 'none', fontWeight: 700, fontSize: '12px',
                      }}>
                        <Github style={{ width: 12, height: 12 }} /> Code
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const { contact } = data
  return (
    <Section id="contact" label="CONTACT" heading={contact.heading} bg="#fff" subheading={contact.subheading}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', maxWidth: '900px', margin: '0 auto' }}>
        {/* Info */}
        <div style={{ background: 'linear-gradient(135deg, #f0f9ff, #eef2ff)', borderRadius: '24px', padding: '36px' }}>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', fontFamily: "'Syne', sans-serif", marginBottom: '8px' }}>
            Get in Touch
          </div>
          <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.75', marginBottom: '24px' }}>
            {contact.blurb}
          </p>
          {[
            { icon: <Mail style={{ width: 18, height: 18 }} />, label: 'Email', value: personal.email, href: `mailto:${personal.email}`, bg: '#eff6ff', color: '#3b82f6' },
            { icon: <Phone style={{ width: 18, height: 18 }} />, label: 'Phone', value: personal.phone, href: phoneHref, bg: '#f0fdf4', color: '#00c896' },
            { icon: <MapPin style={{ width: 18, height: 18 }} />, label: 'Location', value: personal.location, href: null, bg: '#fdf2f8', color: '#ec4899' },
          ].map(({ icon, label, value, href, bg, color }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', background: bg, borderRadius: '12px', marginBottom: '10px' }}>
              <div style={{ color, flexShrink: 0 }}>{icon}</div>
              <div>
                <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700, marginBottom: '2px' }}>{label}</div>
                {href
                  ? <a href={href} style={{ fontSize: '14px', color: '#0f172a', fontWeight: 700, textDecoration: 'none' }}>{value}</a>
                  : <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: 700 }}>{value}</div>}
              </div>
            </div>
          ))}
        </div>

        {/* Social + CTA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {[
            { icon: <Github style={{ width: 20, height: 20 }} />, label: 'GitHub', sub: personal.githubHandle, href: personal.github, bg: 'linear-gradient(135deg, #0f172a, #334155)' },
            { icon: <Linkedin style={{ width: 20, height: 20 }} />, label: 'LinkedIn', sub: personal.linkedinName, href: personal.linkedin, bg: 'linear-gradient(135deg, #0077b5, #0096d6)' },
            { icon: <Mail style={{ width: 20, height: 20 }} />, label: 'Email Me', sub: personal.email, href: `mailto:${personal.email}`, bg: 'linear-gradient(135deg, #ea4335, #ff6b6b)' },
          ].map(({ icon, label, sub, href, bg }) => (
            <a key={label} href={href} target={label !== 'Email Me' ? '_blank' : undefined} rel="noopener noreferrer" style={{
              display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 20px',
              background: bg, color: '#fff', borderRadius: '16px', textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)', transition: 'transform 0.2s',
            }}>
              {icon}
              <div>
                <div style={{ fontWeight: 800, fontSize: '15px' }}>{label}</div>
                <div style={{ fontSize: '12px', opacity: 0.75 }}>{sub}</div>
              </div>
            </a>
          ))}
          <a href={personal.cv} download style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            padding: '18px', background: 'linear-gradient(135deg, #00c896, #22c55e)',
            color: '#fff', borderRadius: '16px', textDecoration: 'none',
            fontWeight: 800, fontSize: '16px', boxShadow: '0 8px 28px rgba(0,200,150,0.35)',
            marginTop: '4px',
          }}>
            <Download style={{ width: 18, height: 18 }} /> Download Full CV
          </a>
        </div>
      </div>
    </Section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
      padding: '64px 24px 32px',
      borderTop: '4px solid transparent',
      borderImage: 'linear-gradient(90deg, #00c896, #6366f1, #ec4899) 1',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Top row: logo + links + social */}
        <style>{`@media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr !important; } .footer-grid div { text-align: left !important; } }`}</style>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'start', gap: '32px', marginBottom: '48px' }}>

          {/* Left: logo + tagline */}
          <div>
            <div style={{
              fontSize: '32px', fontWeight: 900, fontFamily: "'Syne', sans-serif",
              background: 'linear-gradient(135deg, #00c896, #6366f1)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              marginBottom: '8px',
            }}>EK.</div>
            <div style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>
              {personal.name}
            </div>
            <div style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.6', maxWidth: '240px' }}>
              {personal.footerBlurb}
            </div>
          </div>

          {/* Center: quick nav */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#00c896', fontSize: '11px', fontWeight: 800, letterSpacing: '2px', marginBottom: '14px', fontFamily: "'JetBrains Mono', monospace" }}>
              NAVIGATE
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map(l => (
                <a key={l} href={`#${l.toLowerCase()}`} style={{
                  color: '#cbd5e1', fontSize: '14px', fontWeight: 600, textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.color = '#00c896' }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.color = '#cbd5e1' }}
                >{l}</a>
              ))}
            </div>
          </div>

          {/* Right: contact info */}
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: '#6366f1', fontSize: '11px', fontWeight: 800, letterSpacing: '2px', marginBottom: '14px', fontFamily: "'JetBrains Mono', monospace" }}>
              CONTACT
            </div>
            {[
              { icon: '✉️', value: personal.email, href: `mailto:${personal.email}` },
              { icon: '📱', value: personal.phone, href: phoneHref },
              { icon: '📍', value: personal.location, href: null },
            ].map(({ icon, value, href }) => (
              <div key={value} style={{ marginBottom: '8px' }}>
                {href
                  ? <a href={href} style={{ color: '#cbd5e1', fontSize: '13px', textDecoration: 'none', fontWeight: 500 }}>
                      {icon} {value}
                    </a>
                  : <span style={{ color: '#94a3b8', fontSize: '13px' }}>{icon} {value}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)', marginBottom: '28px' }} />

        {/* Bottom row: social icons + copyright */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ color: '#64748b', fontSize: '13px' }}>
            © {new Date().getFullYear()} {personal.name} / <span style={{ color: '#00c896', fontWeight: 700 }}>{personal.brand}</span>. All rights reserved.
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            {[
              { href: personal.github, icon: <Github style={{ width: 17, height: 17 }} />, label: 'GitHub', color: '#f1f5f9' },
              { href: personal.linkedin, icon: <Linkedin style={{ width: 17, height: 17 }} />, label: 'LinkedIn', color: '#60a5fa' },
              { href: `mailto:${personal.email}`, icon: <Mail style={{ width: 17, height: 17 }} />, label: 'Email', color: '#f87171' },
            ].map(({ href, icon, label, color }) => (
              <a key={label} href={href} target={label !== 'Email' ? '_blank' : undefined} rel="noopener noreferrer"
                title={label}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '8px 14px', borderRadius: '20px',
                  background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
                  color, textDecoration: 'none', fontSize: '12px', fontWeight: 700,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { (e.target as HTMLElement).closest('a')!.style.background = 'rgba(255,255,255,0.15)' }}
                onMouseLeave={e => { (e.target as HTMLElement).closest('a')!.style.background = 'rgba(255,255,255,0.08)' }}
              >
                {icon} {label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export function Portfolio() {
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", color: '#0f172a', background: '#fff', scrollBehavior: 'smooth' }}>
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <ReviewsSection />
      <Footer />
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { Download, ExternalLink, Github, Linkedin, Mail, MapPin, Phone, Menu, X } from 'lucide-react'
import { ReviewsSection } from '@/components/reviews-section'

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
          <a href="/cv/ELISHA_CV.pdf" download style={{
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
          <a href="/cv/ELISHA_CV.pdf" download style={{
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
          Elisha Keanche
        </h1>

        <p style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', color: '#64748b', fontWeight: 500, marginBottom: '16px' }}>
          Full-Stack Developer
        </p>

        <p style={{ fontSize: '16px', color: '#94a3b8', maxWidth: '560px', margin: '0 auto 36px', lineHeight: '1.7' }}>
          Building production-grade web systems that serve real users across Kenya and beyond.
        </p>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '56px' }}>
          <a href="#projects" style={{
            padding: '14px 32px', borderRadius: '50px',
            background: 'linear-gradient(135deg, #00c896, #22c55e)',
            color: '#fff', fontWeight: 700, fontSize: '15px', textDecoration: 'none',
            boxShadow: '0 8px 28px rgba(0,200,150,0.35)', transition: 'transform 0.2s',
          }}>View Projects</a>
          <a href="/cv/ELISHA_CV.pdf" download style={{
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
          {[
            { label: 'Python / Flask', color: '#00c896', bg: '#e6faf5' },
            { label: 'PHP / Laravel', color: '#6366f1', bg: '#eef2ff' },
            { label: 'React',         color: '#ec4899', bg: '#fdf2f8' },
            { label: 'MySQL / PostgreSQL', color: '#3b82f6', bg: '#eff6ff' },
            { label: 'JavaScript', color: '#f59e0b', bg: '#fffbeb' },
            { label: 'UI/UX Design', color: '#f97316', bg: '#fff7ed' },
          ].map(({ label, color, bg }) => (
            <span key={label} style={{
              padding: '7px 16px', background: bg, border: `1.5px solid ${color}30`,
              borderRadius: '20px', color, fontSize: '13px', fontWeight: 700,
              fontFamily: "'JetBrains Mono', monospace",
            }}>{label}</span>
          ))}
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', maxWidth: '700px', margin: '0 auto' }}>
          {[
            { v: '15+', l: 'Projects Shipped', c: '#00c896' },
            { v: '7+',  l: 'Live Platforms',   c: '#6366f1' },
            { v: '4+',  l: 'Years Building',   c: '#ec4899' },
            { v: '85%', l: 'ML Accuracy',      c: '#f59e0b' },
          ].map(({ v, l, c }) => (
            <div key={l} style={{
              padding: '20px 16px', background: '#fff', borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.07)', borderTop: `3px solid ${c}`,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', fontFamily: "'Syne', sans-serif" }}>{v}</div>
              <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, marginTop: '4px' }}>{l}</div>
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
          {subheading && <p style={{ color: '#64748b', fontSize: '16px', marginTop: '12px', maxWidth: '520px', margin: '12px auto 0', lineHeight: '1.6' }}>{subheading}</p>}
        </div>
        {children}
      </div>
    </section>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <Section id="about" label="ABOUT ME" heading="Building real-world systems that matter" bg="#fff">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'center' }}>
        <div>
          <p style={{ fontSize: '16px', color: '#475569', lineHeight: '1.8', marginBottom: '16px' }}>
            I'm a full-stack developer based in <strong style={{ color: '#0f172a' }}>Nairobi, Kenya</strong>, specializing
            in production-grade web systems. I've shipped <strong style={{ color: '#6366f1' }}>7+ live platforms</strong> spanning
            ERP, LMS, talent marketplaces, booking systems, fintech, and data tools.
          </p>
          <p style={{ fontSize: '16px', color: '#475569', lineHeight: '1.8', marginBottom: '24px' }}>
            I bring both <strong style={{ color: '#0f172a' }}>engineering depth</strong> and{' '}
            <strong style={{ color: '#0f172a' }}>design sensibility</strong> to every project — from database architecture
            to polished, user-facing interfaces.
          </p>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px',
            background: '#f0fdf4', borderRadius: '12px', borderLeft: '3px solid #00c896',
            color: '#065f46', fontWeight: 600, fontSize: '14px', marginBottom: '20px',
          }}>
            <MapPin style={{ width: 16, height: 16, color: '#00c896' }} />
            Nairobi, Kenya &nbsp;·&nbsp; Open to full-time &amp; select freelance
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {[
              { icon: <Github style={{ width: 16, height: 16 }} />, label: 'GitHub', href: 'https://github.com/Elisha-3', bg: '#0f172a' },
              { icon: <Linkedin style={{ width: 16, height: 16 }} />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/keanche-elisha-329284158', bg: '#0077b5' },
              { icon: <Mail style={{ width: 16, height: 16 }} />, label: 'Email', href: 'mailto:keancheelisha3@gmail.com', bg: '#ea4335' },
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
          {[
            { v: '15+', l: 'Projects Shipped', c: '#00c896', bg: '#f0fdf4' },
            { v: '7+',  l: 'Live Platforms',   c: '#6366f1', bg: '#eef2ff' },
            { v: '4+',  l: 'Years Building',   c: '#ec4899', bg: '#fdf2f8' },
            { v: '85%', l: 'ML Accuracy',      c: '#f59e0b', bg: '#fffbeb' },
          ].map(({ v, l, c, bg }) => (
            <div key={l} style={{
              padding: '28px 20px', background: bg, borderRadius: '20px',
              borderTop: `4px solid ${c}`, textAlign: 'center',
            }}>
              <div style={{ fontSize: '40px', fontWeight: 800, color: '#0f172a', fontFamily: "'Syne', sans-serif" }}>{v}</div>
              <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, marginTop: '6px' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

// ─── Skills ───────────────────────────────────────────────────────────────────
function Skills() {
  const cats = [
    { title: 'Backend & Systems', emoji: '', gradient: 'linear-gradient(135deg, #00c896, #22c55e)', bg: '#e6faf5', border: '#00c896', text: '#065f46',
      skills: ['Python & Flask', 'PHP & Laravel', 'MySQL / PostgreSQL', 'REST APIs & Firebase', 'Authentication & RBAC'] },
    { title: 'Frontend & UI', emoji: '', gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)', bg: '#eef2ff', border: '#6366f1', text: '#3730a3',
      skills: ['HTML5 / CSS3', 'JavaScript (ES6+)', 'React', 'Tailwind CSS & Bootstrap 5', 'Chart.js & Data Viz'] },
    { title: 'Data & Machine Learning', emoji: '', gradient: 'linear-gradient(135deg, #ec4899, #f97316)', bg: '#fdf2f8', border: '#ec4899', text: '#9d174d',
      skills: ['Machine Learning', 'Pandas & NumPy', 'Scikit-learn', 'Data Visualization', 'Linear Regression (85% acc.)'] },
    { title: 'Tools & Platforms', emoji: '', gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)', bg: '#fffbeb', border: '#f59e0b', text: '#92400e',
      skills: ['Git & GitHub', 'UI/UX Design', 'Render & Netlify', 'Firebase & Hosting'] },
  ]

  return (
    <Section id="skills" label="TECHNOLOGIES" heading="Skills & Technologies" bg="#f8fafc">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {cats.map((cat, i) => (
          <div key={i} style={{
            background: '#fff', borderRadius: '20px', overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}>
            <div style={{ height: '6px', background: cat.gradient }} />
            <div style={{ padding: '24px' }}>
              <div style={{ fontSize: '20px', marginBottom: '6px' }}>{cat.emoji}</div>
              <div style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', marginBottom: '16px', fontFamily: "'Syne', sans-serif" }}>
                {cat.title}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                {cat.skills.map(s => (
                  <div key={s} style={{
                    padding: '7px 12px', background: cat.bg, borderRadius: '8px',
                    fontSize: '13px', color: cat.text, fontWeight: 600,
                    borderLeft: `2.5px solid ${cat.border}`,
                  }}>{s}</div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

// ─── Experience ───────────────────────────────────────────────────────────────
function Experience() {
  const jobs = [
    { title: 'Full-Stack Developer', company: 'Oracom Group', period: '2025 – Present', type: 'Full-time',
      accent: '#00c896', bg: '#e6faf5', text: '#065f46',
      points: [
        'ODSERP — Architected a comprehensive ERP covering Accounting, HRM, CRM, POS & Project Management with role-based access control',
        'ODSAlma — Built a unified alumni platform where all alumni seamlessly connect, collaborate, and manage their activities; alumni sign up, submit documentation for approval, and gain access to an exclusive community fostering engagement, networking, and continuous impact',
        'ODSAITECH — Delivered the platform for ODS AI.Tech, the AI engineering arm of Oracom Group, built to bridge the gap between enterprise-grade AI and real growing businesses — architecting bespoke AI systems tailored to client operations, data, and goals; from automating workflows and building predictive models to deploying intelligent mobile apps',
        'Talents-Optimized Ecosystem — Full platform build for the human potential liberation company unlocking creative essence through imagination activation, character & capability development',
        'Sanibook Portal — Built Kenya\'s Sanitation Knowledge Hub, centralising sanitation pilot data, validating progress, and fostering evidence-based decision-making at national scale',
      ] },
    { title: 'Freelance Developer', company: 'Various Clients · Nairobi, Kenya', period: '2022 – 2024', type: 'Freelance',
      accent: '#ec4899', bg: '#fdf2f8', text: '#9d174d',
      points: ['Delivered 10+ projects spanning e-commerce, civic portals, dashboards & ML-powered tools', 'Clients ranged from local businesses to government institutions across Kenya'] },
    { title: 'Frontend & UI/UX Development', company: 'Academic & Personal Projects', period: '2021 – 2022', type: 'Self-directed',
      accent: '#f59e0b', bg: '#fffbeb', text: '#92400e',
      points: ['Built React storefronts and interactive data visualization dashboards', 'Established strong foundation in UX design principles and responsive interfaces'] },
  ]

  return (
    <Section id="experience" label="EXPERIENCE" heading="My Professional Journey" bg="#fff">
      <div style={{ maxWidth: '760px', margin: '0 auto', position: 'relative' }}>
        {/* Timeline line */}
        <div style={{ position: 'absolute', left: '19px', top: '12px', bottom: '12px', width: '2px', background: 'linear-gradient(180deg, #00c896, #6366f1, #ec4899, #f59e0b)' }} />
        {jobs.map((job, i) => (
          <div key={i} style={{ display: 'flex', gap: '24px', marginBottom: '32px', position: 'relative' }}>
            {/* Dot */}
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%', background: job.accent,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, boxShadow: `0 0 0 4px ${job.bg}, 0 0 0 6px ${job.accent}30`,
              fontSize: '14px',
            }}>
              {['🏢', '🚀', '💻', '📚'][i]}
            </div>
            {/* Card */}
            <div style={{ flex: 1, background: '#fff', borderRadius: '16px', padding: '20px 24px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', borderLeft: `4px solid ${job.accent}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '6px' }}>
                <div style={{ fontWeight: 800, fontSize: '16px', color: '#0f172a', fontFamily: "'Syne', sans-serif" }}>{job.title}</div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <span style={{ padding: '3px 10px', background: job.bg, color: job.text, borderRadius: '10px', fontSize: '11px', fontWeight: 700 }}>{job.type}</span>
                  <span style={{ padding: '3px 10px', background: job.accent, color: '#fff', borderRadius: '10px', fontSize: '11px', fontWeight: 700 }}>{job.period}</span>
                </div>
              </div>
              <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, marginBottom: '12px' }}>{job.company}</div>
              <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none' }}>
                {job.points.map((p, pi) => (
                  <li key={pi} style={{ fontSize: '14px', color: '#475569', marginBottom: '6px', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <span style={{ color: job.accent, marginTop: '2px', flexShrink: 0 }}>▸</span> {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

// ─── Projects ─────────────────────────────────────────────────────────────────
function Projects() {
  const featured = {
    title: 'ODSERP — Enterprise Resource Planning System',
    desc: 'A comprehensive, full-featured ERP platform covering Accounting, Human Resource Management, CRM, Point-of-Sale, and Project Management. Built with role-based access control for multi-department organizations. Currently serving multiple organizations in production.',
    tags: ['Full-Stack', 'ERP', 'HRM', 'CRM', 'POS', 'PHP', 'MySQL'],
    demo: 'https://odserp.com', image: '/images/odserp.png', accent: '#00c896',
  }

  const projects = [
    { title: 'ODSAlma — LMS', desc: 'Learning & Alumni Management System for student records, course management, and institutional reporting.', tags: ['LMS', 'Flask', 'Alumni Portal'], demo: 'https://odsalma.com', image: '/images/odsalma.png', accent: '#6366f1' },
    { title: 'Talents-Optimized', desc: 'A revolutionary human potential liberation platform that unlocks the infinite creative essence within every individual — through neuroscience, nature\'s wisdom, and advanced character development. Moving humans from consumers of circumstances to conscious creators of reality.', tags: ['Human Potential', 'Laravel', 'PHP', 'Character Dev'], demo: 'https://talents-optimized.com', image: '/images/talents-optimized.png', accent: '#ec4899' },
    { title: 'Sanibook.ke', desc: "Kenya's Sanitation Knowledge Hub — bridging the gap between isolated sanitation pilots and national-scale solutions by centralising data, validating progress, and fostering evidence-based decision-making.", tags: ['Sanitation Hub', 'Data Platform', 'Knowledge Mgmt'], demo: 'http://dev.sanibook.ke/', image: '/images/sanibook.ke.png', accent: '#f59e0b' },
    { title: 'Financial Management System', desc: 'Budget tracking, expense management and audit-ready financial reports with governance controls.', tags: ['Fintech', 'Flask', 'MySQL'], demo: 'https://fms.digitallyfit.top/', image: '/images/features.jpg', accent: '#3b82f6' },
    { title: 'ODSAITECH Platform', desc: 'Corporate website and service platform for an AI & technology solutions company.', tags: ['Corporate', 'CMS', 'SEO'], demo: 'https://odsaitech.com', image: '/images/odsai.jpg', accent: '#f97316' },
    { title: 'Toi Shop — E-Commerce', desc: 'Secure e-commerce with cart, checkout, admin dashboard and analytics. 500+ transactions in first month.', tags: ['Flask', 'MySQL', 'E-Commerce'], demo: 'https://toi-shop-main.onrender.com/', image: '/images/toi_shop.png', accent: '#22c55e', github: 'https://github.com/Elisha-3/Toi-Shop' },
  ]

  return (
    <Section id="projects" label="FEATURED WORK" heading="Projects & Live Platforms" bg="#f8fafc"
      subheading="7+ platforms currently live in production — from full ERPs to booking systems and ML tools.">
      {/* Featured */}
      <div style={{
        background: '#fff', borderRadius: '24px', overflow: 'hidden',
        boxShadow: '0 8px 40px rgba(0,0,0,0.1)', marginBottom: '28px',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
      }}>
        <div style={{ height: '100%', minHeight: '280px', overflow: 'hidden', background: '#f0fdf4' }}>
          <img src={featured.image} alt={featured.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
        </div>
        <div style={{ padding: '36px' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
            <span style={{ padding: '4px 12px', background: '#e6faf5', color: '#065f46', borderRadius: '20px', fontSize: '11px', fontWeight: 700 }}>FEATURED</span>
            <span style={{ padding: '4px 12px', background: `${featured.accent}20`, color: featured.accent, borderRadius: '20px', fontSize: '11px', fontWeight: 700, border: `1px solid ${featured.accent}40` }}>LIVE</span>
          </div>
          <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', fontFamily: "'Syne', sans-serif", marginBottom: '12px', lineHeight: 1.2 }}>{featured.title}</h3>
          <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.75', marginBottom: '20px' }}>{featured.desc}</p>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '24px' }}>
            {featured.tags.map(t => (
              <span key={t} style={{ padding: '4px 10px', background: `${featured.accent}15`, color: featured.accent, borderRadius: '10px', fontSize: '12px', fontWeight: 700 }}>{t}</span>
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

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {projects.map((p, i) => (
          <div key={i} style={{
            background: '#fff', borderRadius: '18px', overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
            display: 'flex', flexDirection: 'column',
          }}>
            <div style={{ height: '160px', background: `${p.accent}15`, overflow: 'hidden' }}>
              <img src={p.image} alt={p.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
            </div>
            <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontWeight: 800, fontSize: '15px', color: '#0f172a', marginBottom: '8px', fontFamily: "'Syne', sans-serif" }}>{p.title}</div>
              <div style={{ fontSize: '12.5px', color: '#64748b', lineHeight: '1.6', marginBottom: '12px', flex: 1 }}>{p.desc}</div>
              <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '14px' }}>
                {p.tags.map(t => (
                  <span key={t} style={{ padding: '3px 8px', background: `${p.accent}15`, color: p.accent, borderRadius: '8px', fontSize: '11px', fontWeight: 700 }}>{t}</span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {p.demo !== '#' && (
                  <a href={p.demo} target="_blank" rel="noopener noreferrer" style={{
                    display: 'flex', alignItems: 'center', gap: '5px', padding: '7px 14px',
                    background: p.accent, color: '#fff', borderRadius: '9px',
                    textDecoration: 'none', fontWeight: 700, fontSize: '12px',
                  }}>
                    <ExternalLink style={{ width: 12, height: 12 }} /> Live
                  </a>
                )}
                {(p as any).github && (
                  <a href={(p as any).github} target="_blank" rel="noopener noreferrer" style={{
                    display: 'flex', alignItems: 'center', gap: '5px', padding: '7px 14px',
                    background: '#f1f5f9', color: '#475569', borderRadius: '9px',
                    textDecoration: 'none', fontWeight: 700, fontSize: '12px',
                  }}>
                    <Github style={{ width: 12, height: 12 }} /> Code
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <Section id="contact" label="CONTACT" heading="Let's Work Together" bg="#fff"
      subheading="Open to full-time roles and select freelance work. Let's build something great.">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', maxWidth: '900px', margin: '0 auto' }}>
        {/* Info */}
        <div style={{ background: 'linear-gradient(135deg, #f0f9ff, #eef2ff)', borderRadius: '24px', padding: '36px' }}>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', fontFamily: "'Syne', sans-serif", marginBottom: '8px' }}>
            Get in Touch
          </div>
          <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.75', marginBottom: '24px' }}>
            Whether you need a full ERP, a slick React frontend, or a smart ML-powered tool — I'm ready to help bring your vision to life.
          </p>
          {[
            { icon: <Mail style={{ width: 18, height: 18 }} />, label: 'Email', value: 'keancheelisha3@gmail.com', href: 'mailto:keancheelisha3@gmail.com', bg: '#eff6ff', color: '#3b82f6' },
            { icon: <Phone style={{ width: 18, height: 18 }} />, label: 'Phone', value: '+254 706 210 521', href: 'tel:+254706210521', bg: '#f0fdf4', color: '#00c896' },
            { icon: <MapPin style={{ width: 18, height: 18 }} />, label: 'Location', value: 'Nairobi, Kenya', href: null, bg: '#fdf2f8', color: '#ec4899' },
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
            { icon: <Github style={{ width: 20, height: 20 }} />, label: 'GitHub', sub: 'github.com/Elisha-3', href: 'https://github.com/Elisha-3', bg: 'linear-gradient(135deg, #0f172a, #334155)' },
            { icon: <Linkedin style={{ width: 20, height: 20 }} />, label: 'LinkedIn', sub: 'Keanche Elisha', href: 'https://www.linkedin.com/in/keanche-elisha-329284158', bg: 'linear-gradient(135deg, #0077b5, #0096d6)' },
            { icon: <Mail style={{ width: 20, height: 20 }} />, label: 'Email Me', sub: 'keancheelisha3@gmail.com', href: 'mailto:keancheelisha3@gmail.com', bg: 'linear-gradient(135deg, #ea4335, #ff6b6b)' },
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
          <a href="/cv/ELISHA_CV.pdf" download style={{
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'start', gap: '32px', marginBottom: '48px' }}>

          {/* Left: logo + tagline */}
          <div>
            <div style={{
              fontSize: '32px', fontWeight: 900, fontFamily: "'Syne', sans-serif",
              background: 'linear-gradient(135deg, #00c896, #6366f1)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              marginBottom: '8px',
            }}>EK.</div>
            <div style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>
              Elisha Keanche
            </div>
            <div style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.6', maxWidth: '220px' }}>
              Full-Stack Developer &amp; UI/UX Designer based in Nairobi, Kenya.
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
              { icon: '✉️', value: 'keancheelisha3@gmail.com', href: 'mailto:keancheelisha3@gmail.com' },
              { icon: '📱', value: '+254 706 210 521', href: 'tel:+254706210521' },
              { icon: '📍', value: 'Nairobi, Kenya', href: null },
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
            © 2025 Elisha Keanche / <span style={{ color: '#00c896', fontWeight: 700 }}>ElmonelTech</span>. All rights reserved.
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            {[
              { href: 'https://github.com/Elisha-3', icon: <Github style={{ width: 17, height: 17 }} />, label: 'GitHub', color: '#f1f5f9' },
              { href: 'https://www.linkedin.com/in/keanche-elisha-329284158', icon: <Linkedin style={{ width: 17, height: 17 }} />, label: 'LinkedIn', color: '#60a5fa' },
              { href: 'mailto:keancheelisha3@gmail.com', icon: <Mail style={{ width: 17, height: 17 }} />, label: 'Email', color: '#f87171' },
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

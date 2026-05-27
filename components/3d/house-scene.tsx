'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, OrbitControls, Float } from '@react-three/drei'
import { useRef, useState, useCallback, Suspense } from 'react'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { Home, User, Code2, Briefcase, FolderOpen, Mail, ChevronLeft, ChevronRight } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

// ─── Constants ────────────────────────────────────────────────────────────────
const ROOMS = [
  { id: 0, name: 'Entrance',   x: 0,  icon: Home,       accent: '#00c896', soft: '#e6faf5' },
  { id: 1, name: 'About',      x: 15, icon: User,        accent: '#6366f1', soft: '#eef2ff' },
  { id: 2, name: 'Skills',     x: 30, icon: Code2,       accent: '#22c55e', soft: '#f0fdf4' },
  { id: 3, name: 'Experience', x: 45, icon: Briefcase,   accent: '#f59e0b', soft: '#fffbeb' },
  { id: 4, name: 'Projects',   x: 60, icon: FolderOpen,  accent: '#ec4899', soft: '#fdf2f8' },
  { id: 5, name: 'Contact',    x: 75, icon: Mail,        accent: '#3b82f6', soft: '#eff6ff' },
]

// ─── Camera ──────────────────────────────────────────────────────────────────
function CameraRig({ targetX, controlsRef }: { targetX: number; controlsRef: React.RefObject<OrbitControlsImpl> }) {
  const { camera } = useThree()
  useFrame(() => {
    const a = 0.06
    camera.position.x += (targetX - camera.position.x) * a
    camera.position.y += (2.2    - camera.position.y) * a
    camera.position.z += (7.5    - camera.position.z) * a
    if (controlsRef.current) {
      controlsRef.current.target.x += (targetX - controlsRef.current.target.x) * a
      controlsRef.current.target.y += (1.8     - controlsRef.current.target.y) * a
      controlsRef.current.update()
    }
  })
  return null
}

// ─── Room Shell (bright, airy) ────────────────────────────────────────────────
function RoomShell({ x }: { x: number }) {
  return (
    <group position={[x, 0, 0]}>
      {/* Warm wood floor */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 12]} />
        <meshStandardMaterial color="#c9ad8a" roughness={0.45} metalness={0.0} />
      </mesh>
      {/* Floor trim */}
      <mesh position={[0, 0.04, -5.4]} rotation={[0, 0, 0]}>
        <boxGeometry args={[14, 0.12, 0.06]} />
        <meshStandardMaterial color="#b8976c" roughness={0.5} />
      </mesh>
      {/* Back wall - crisp white */}
      <mesh position={[0, 3.5, -5.5]} receiveShadow>
        <planeGeometry args={[14, 9]} />
        <meshStandardMaterial color="#f8f9ff" roughness={0.98} />
      </mesh>
      {/* Left wall */}
      <mesh position={[-7, 3.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[12, 9]} />
        <meshStandardMaterial color="#f5f7ff" roughness={0.98} />
      </mesh>
      {/* Right wall */}
      <mesh position={[7, 3.5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[12, 9]} />
        <meshStandardMaterial color="#f5f7ff" roughness={0.98} />
      </mesh>
      {/* Ceiling */}
      <mesh position={[0, 7, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 12]} />
        <meshStandardMaterial color="#ffffff" roughness={1} />
      </mesh>
    </group>
  )
}

// ─── Lights (very bright, clean) ─────────────────────────────────────────────
function RoomLights({ x }: { x: number }) {
  return (
    <group position={[x, 0, 0]}>
      <pointLight position={[0, 5.8, 0]}    intensity={3.5} color="#ffffff" castShadow shadow-mapSize={512} />
      <pointLight position={[-3.5, 4.5, 1]} intensity={1.5} color="#e8f4ff" />
      <pointLight position={[3.5, 4.5, 1]}  intensity={1.5} color="#fff5e8" />
      <directionalLight position={[4, 7, 4]} intensity={1.8} color="#ffffff" />
    </group>
  )
}

// ─── Furniture (dark for contrast against white walls) ────────────────────────
function Desk({ pos }: { pos: [number, number, number] }) {
  return (
    <group position={pos}>
      <mesh position={[0, 0.76, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.4, 0.07, 1.4]} />
        <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.5} />
      </mesh>
      {([-1.55, 1.55] as number[]).map(lx => (
        <mesh key={lx} position={[lx, 0.38, 0]} castShadow>
          <boxGeometry args={[0.07, 0.76, 1.2]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.6} />
        </mesh>
      ))}
      <mesh position={[0, 0.93, -0.38]} castShadow>
        <boxGeometry args={[0.13, 0.3, 0.13]} />
        <meshStandardMaterial color="#0a0f1e" roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh position={[0, 1.38, -0.43]} castShadow>
        <boxGeometry args={[2.2, 1.1, 0.06]} />
        <meshStandardMaterial color="#0a0f1e" roughness={0.1} metalness={0.95} />
      </mesh>
      {/* Screen - colorful glow */}
      <mesh position={[0, 1.38, -0.39]}>
        <planeGeometry args={[2.02, 0.96]} />
        <meshStandardMaterial color="#00c896" emissive="#00c896" emissiveIntensity={0.4} roughness={0} />
      </mesh>
      <mesh position={[0, 0.8, 0.1]} castShadow>
        <boxGeometry args={[1.35, 0.035, 0.44]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[0.85, 0.79, 0.12]} castShadow>
        <boxGeometry args={[0.23, 0.035, 0.38]} />
        <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.4} />
      </mesh>
    </group>
  )
}

function Chair({ pos }: { pos: [number, number, number] }) {
  return (
    <group position={pos}>
      <mesh position={[0, 0.56, 0]} castShadow>
        <boxGeometry args={[0.84, 0.1, 0.84]} />
        <meshStandardMaterial color="#334155" roughness={0.6} />
      </mesh>
      <mesh position={[0, 1.05, -0.37]} castShadow>
        <boxGeometry args={[0.84, 0.94, 0.09]} />
        <meshStandardMaterial color="#334155" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.26, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 0.52, 8]} />
        <meshStandardMaterial color="#475569" roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh position={[0, 0.04, 0]} castShadow>
        <cylinderGeometry args={[0.48, 0.48, 0.045, 12]} />
        <meshStandardMaterial color="#1e293b" roughness={0.35} metalness={0.6} />
      </mesh>
    </group>
  )
}

function Bookshelf({ pos }: { pos: [number, number, number] }) {
  const COLORS = ['#00c896', '#6366f1', '#ec4899', '#f59e0b', '#3b82f6', '#22c55e', '#f97316']
  return (
    <group position={pos}>
      <mesh position={[0, 1.55, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 3.1, 0.4]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.2} />
      </mesh>
      {[0.52, 1.1, 1.7, 2.32].map((sy, si) => (
        <group key={si}>
          <mesh position={[0, sy, 0.02]} castShadow>
            <boxGeometry args={[1.4, 0.04, 0.32]} />
            <meshStandardMaterial color="#334155" roughness={0.5} />
          </mesh>
          {COLORS.slice(0, 5).map((c, bi) => (
            <mesh key={bi} position={[-0.54 + bi * 0.255, sy + 0.21, 0.03]} castShadow>
              <boxGeometry args={[0.17, 0.36, 0.27]} />
              <meshStandardMaterial color={c} roughness={0.7} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}

function FloorLamp({ pos }: { pos: [number, number, number] }) {
  return (
    <group position={pos}>
      <mesh position={[0, 1.15, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 2.3, 8]} />
        <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 2.38, 0]} castShadow>
        <cylinderGeometry args={[0.24, 0.14, 0.38, 16]} />
        <meshStandardMaterial color="#fef3c7" emissive="#fde68a" emissiveIntensity={0.8} />
      </mesh>
      <pointLight position={[0, 2.15, 0]} intensity={1.5} color="#fef9c3" distance={8} />
    </group>
  )
}

// ─── Colorful Panel ───────────────────────────────────────────────────────────
function Panel({ pos, width = 380, gradient, children }: {
  pos: [number, number, number]
  width?: number
  gradient?: string
  children: React.ReactNode
}) {
  return (
    <Html position={pos} transform occlude={false} center style={{ width: `${width}px`, pointerEvents: 'auto' }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.13), 0 4px 20px rgba(0,0,0,0.08)',
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: '13px',
        lineHeight: '1.65',
      }}>
        {gradient && (
          <div style={{ height: '5px', background: gradient }} />
        )}
        <div style={{ padding: '20px 22px', color: '#0f172a' }}>
          {children}
        </div>
      </div>
    </Html>
  )
}

// ─── Wall Display (bright, gradient name) ─────────────────────────────────────
function WallDisplay({ x }: { x: number }) {
  return (
    <Html position={[x, 4.2, -5.2]} transform occlude={false} center style={{ width: '700px', pointerEvents: 'none' }}>
      <div style={{
        textAlign: 'center',
        padding: '36px 44px',
        background: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        boxShadow: '0 30px 80px rgba(0,0,0,0.12), 0 0 0 1px rgba(255,255,255,0.9)',
        fontFamily: "'Inter', system-ui, sans-serif",
        borderTop: '4px solid transparent',
        borderImage: 'linear-gradient(90deg, #00c896, #6366f1, #ec4899) 1',
      }}>
        <div style={{ fontSize: '11px', color: '#6366f1', letterSpacing: '4px', marginBottom: '10px', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>
          HELLO, I'M
        </div>
        <div style={{
          fontSize: '54px', fontWeight: 800, lineHeight: 1.05,
          fontFamily: "'Syne', sans-serif", letterSpacing: '-1px',
          background: 'linear-gradient(135deg, #00c896 0%, #6366f1 50%, #ec4899 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          Elisha Keanche
        </div>
        <div style={{ fontSize: '17px', color: '#64748b', marginTop: '8px', fontWeight: 500 }}>
          Full-Stack Developer &amp; UI/UX Designer
        </div>
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { label: 'Python / Flask', color: '#00c896', bg: '#e6faf5' },
            { label: 'PHP / Laravel', color: '#6366f1', bg: '#eef2ff' },
            { label: 'React', color: '#ec4899', bg: '#fdf2f8' },
            { label: 'MySQL / PostgreSQL', color: '#3b82f6', bg: '#eff6ff' },
          ].map(({ label, color, bg }) => (
            <span key={label} style={{
              padding: '6px 14px', background: bg,
              border: `1.5px solid ${color}`, borderRadius: '20px',
              color, fontSize: '12px', fontWeight: 700,
              fontFamily: "'JetBrains Mono', monospace",
            }}>{label}</span>
          ))}
        </div>
        <div style={{ marginTop: '16px', color: '#94a3b8', fontSize: '13px' }}>
          Building production-grade web systems that serve real users across Kenya and beyond.
        </div>
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#cbd5e1', fontFamily: "'JetBrains Mono', monospace" }}>
          📍 Nairobi, Kenya &nbsp;·&nbsp; ✉️ keancheelisha3@gmail.com
        </div>
      </div>
    </Html>
  )
}

// ─── Room: Entrance ────────────────────────────────────────────────────────────
function EntranceRoom({ x }: { x: number }) {
  return (
    <group>
      <RoomShell x={x} />
      <RoomLights x={x} />
      <Desk pos={[x, 0, -0.9]} />
      <Chair pos={[x, 0, 0.9]} />
      <Bookshelf pos={[x + 4.8, 0, -4.8]} />
      <FloorLamp pos={[x - 4.8, 0, -3.5]} />
      <WallDisplay x={x} />

      {/* Stats */}
      <Float speed={1.4} rotationIntensity={0.05} floatIntensity={0.25}>
        <Panel pos={[x - 4.2, 2.7, -1.2]} width={210} gradient="linear-gradient(90deg, #00c896, #22c55e)">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '10px', fontWeight: 800, color: '#00a87a', letterSpacing: '2px', marginBottom: '14px' }}>
              AT A GLANCE
            </div>
            {[
              { v: '15+', l: 'Projects', color: '#00c896' },
              { v: '7+',  l: 'Live Platforms', color: '#6366f1' },
              { v: '4+',  l: 'Years Building', color: '#ec4899' },
              { v: '85%', l: 'ML Accuracy', color: '#f59e0b' },
            ].map(({ v, l, color }) => (
              <div key={l} style={{ marginBottom: '10px', padding: '10px', background: '#f8fafc', borderRadius: '12px', borderLeft: `3px solid ${color}` }}>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', fontFamily: "'Syne', sans-serif" }}>{v}</div>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>{l}</div>
              </div>
            ))}
          </div>
        </Panel>
      </Float>

      {/* Quick links */}
      <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.25}>
        <Panel pos={[x + 4.2, 2.7, -1.2]} width={215} gradient="linear-gradient(90deg, #6366f1, #ec4899)">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '10px', fontWeight: 800, color: '#6366f1', letterSpacing: '2px', marginBottom: '14px' }}>
              QUICK LINKS
            </div>
            {[
              { emoji: '⚡', label: 'GitHub', href: 'https://github.com/Elisha-3', bg: 'linear-gradient(135deg, #0f172a, #1e293b)', color: '#fff' },
              { emoji: '💼', label: 'LinkedIn', href: 'https://www.linkedin.com/in/keanche-elisha-329284158', bg: 'linear-gradient(135deg, #0077b5, #0096d6)', color: '#fff' },
              { emoji: '📄', label: 'Download CV', href: '/cv/ELISHA_CV.pdf', bg: 'linear-gradient(135deg, #00c896, #22c55e)', color: '#fff' },
            ].map(({ emoji, label, href, bg, color }) => (
              <a key={label} href={href} download={label === 'Download CV' || undefined}
                target={label !== 'Download CV' ? '_blank' : undefined} rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px',
                  background: bg, color, borderRadius: '12px', textDecoration: 'none',
                  fontWeight: 700, fontSize: '13px', marginBottom: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                }}>
                <span style={{ fontSize: '18px' }}>{emoji}</span> {label}
              </a>
            ))}
          </div>
        </Panel>
      </Float>
    </group>
  )
}

// ─── Room: About ──────────────────────────────────────────────────────────────
function AboutRoom({ x }: { x: number }) {
  return (
    <group>
      <RoomShell x={x} />
      <RoomLights x={x} />
      <Desk pos={[x - 2, 0, -0.9]} />
      <Chair pos={[x - 2, 0, 0.9]} />
      <Bookshelf pos={[x + 5.2, 0, -4.8]} />
      <FloorLamp pos={[x + 4.5, 0, -2.5]} />

      {/* Main about */}
      <Float speed={1.3} rotationIntensity={0.04} floatIntensity={0.2}>
        <Panel pos={[x - 1.5, 3.1, -2.0]} width={380} gradient="linear-gradient(90deg, #6366f1, #8b5cf6)">
          <div>
            <div style={{ fontSize: '10px', fontWeight: 800, color: '#6366f1', letterSpacing: '2.5px', marginBottom: '10px' }}>
              WHO I AM
            </div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '14px', lineHeight: 1.2, fontFamily: "'Syne', sans-serif" }}>
              Building real-world systems<br />that actually matter.
            </div>
            <p style={{ color: '#475569', fontSize: '13px', lineHeight: '1.75', marginBottom: '10px' }}>
              I'm a full-stack developer based in <strong style={{ color: '#0f172a' }}>Nairobi, Kenya</strong>, specializing in
              production-grade web systems. I've shipped <strong style={{ color: '#6366f1' }}>7+ live platforms</strong> spanning
              ERP, LMS, talent marketplaces, booking systems, fintech, and data tools.
            </p>
            <p style={{ color: '#475569', fontSize: '13px', lineHeight: '1.75', marginBottom: '14px' }}>
              I bring both <strong style={{ color: '#0f172a' }}>engineering depth</strong> and{' '}
              <strong style={{ color: '#0f172a' }}>design sensibility</strong> to every project — from database
              architecture to polished UIs.
            </p>
            <div style={{
              padding: '10px 14px', background: '#eef2ff', borderRadius: '10px',
              borderLeft: '3px solid #6366f1', fontSize: '12px', color: '#4338ca', fontWeight: 600,
            }}>
              📍 Nairobi, Kenya &nbsp;·&nbsp; Open to full-time &amp; select freelance
            </div>
          </div>
        </Panel>
      </Float>

      {/* Stats */}
      <Float speed={1.1} rotationIntensity={0.04} floatIntensity={0.2}>
        <Panel pos={[x + 3.8, 2.7, -2.0]} width={200} gradient="linear-gradient(90deg, #ec4899, #f97316)">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '10px', fontWeight: 800, color: '#ec4899', letterSpacing: '2.5px', marginBottom: '14px' }}>
              BY THE NUMBERS
            </div>
            {[
              { v: '15+', l: 'Projects Shipped', c: '#00c896' },
              { v: '7+',  l: 'Live Platforms',   c: '#6366f1' },
              { v: '4+',  l: 'Years Experience', c: '#ec4899' },
              { v: '85%', l: 'ML Accuracy',      c: '#f59e0b' },
            ].map(({ v, l, c }) => (
              <div key={l} style={{ marginBottom: '9px', padding: '9px', background: '#f8fafc', borderRadius: '10px', borderLeft: `3px solid ${c}` }}>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', fontFamily: "'Syne', sans-serif" }}>{v}</div>
                <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 600 }}>{l}</div>
              </div>
            ))}
          </div>
        </Panel>
      </Float>
    </group>
  )
}

// ─── Room: Skills ─────────────────────────────────────────────────────────────
const SKILL_CATS = [
  { title: 'Backend & Systems', emoji: '⚙️', skills: ['Python & Flask', 'PHP & Laravel', 'MySQL / PostgreSQL', 'REST APIs & Firebase', 'Auth & RBAC'],         gradient: 'linear-gradient(90deg, #00c896, #22c55e)', accent: '#00c896', bg: '#e6faf5', text: '#065f46' },
  { title: 'Frontend & UI',     emoji: '🎨', skills: ['HTML5 / CSS3', 'JavaScript ES6+', 'React', 'Tailwind CSS & Bootstrap', 'Chart.js'],                    gradient: 'linear-gradient(90deg, #6366f1, #8b5cf6)', accent: '#6366f1', bg: '#eef2ff', text: '#3730a3' },
  { title: 'Data & ML',         emoji: '🤖', skills: ['Machine Learning', 'Pandas & NumPy', 'Scikit-learn', 'Data Visualization', 'Linear Regression'],        gradient: 'linear-gradient(90deg, #ec4899, #f97316)', accent: '#ec4899', bg: '#fdf2f8', text: '#9d174d' },
  { title: 'Tools & Platforms', emoji: '🛠️', skills: ['Git & GitHub', 'WordPress & CMS', 'UI/UX Design', 'Render & Netlify', 'Firebase'],                     gradient: 'linear-gradient(90deg, #f59e0b, #ef4444)', accent: '#f59e0b', bg: '#fffbeb', text: '#92400e' },
]

function SkillsRoom({ x }: { x: number }) {
  return (
    <group>
      <RoomShell x={x} />
      <RoomLights x={x} />
      <Bookshelf pos={[x - 5.5, 0, -4.8]} />
      <Bookshelf pos={[x + 5.5, 0, -4.8]} />
      <FloorLamp pos={[x, 0, -4.8]} />

      {SKILL_CATS.map((cat, i) => {
        const col = i % 2 === 0 ? -3.0 : 3.0
        const row = i < 2 ? 3.8 : 1.5
        return (
          <Float key={i} speed={1.1 + i * 0.1} rotationIntensity={0.04} floatIntensity={0.18}>
            <Panel pos={[x + col, row, -2.8]} width={252} gradient={cat.gradient}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', marginBottom: '10px', fontFamily: "'Syne', sans-serif" }}>
                  {cat.emoji} {cat.title}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {cat.skills.map(s => (
                    <div key={s} style={{
                      padding: '6px 10px', background: cat.bg, borderRadius: '8px',
                      fontSize: '12px', color: cat.text, fontWeight: 600,
                      borderLeft: `2.5px solid ${cat.accent}`,
                    }}>{s}</div>
                  ))}
                </div>
              </div>
            </Panel>
          </Float>
        )
      })}
    </group>
  )
}

// ─── Room: Experience ─────────────────────────────────────────────────────────
const JOBS = [
  { title: 'Full-Stack Developer', company: 'Oracom Group / ODS', period: '2024 – Present', gradient: 'linear-gradient(90deg, #00c896, #22c55e)', accent: '#00c896', bg: '#e6faf5', text: '#065f46',
    points: ['Architected ODSERP — full ERP with Accounting, HRM, CRM, POS', 'Built ODSAlma — Learning & Alumni Management System', 'Delivered ODSAITECH platform & Digitally Fit News CMS'] },
  { title: 'Full-Stack Developer', company: 'Talents-Optimized & Sanibook.ke', period: '2023 – Present', gradient: 'linear-gradient(90deg, #6366f1, #8b5cf6)', accent: '#6366f1', bg: '#eef2ff', text: '#3730a3',
    points: ['Built Talents-Optimized — Laravel talent marketplace', 'Developed Sanibook.ke — real-time service booking platform'] },
  { title: 'Freelance Developer', company: 'Various Clients · Nairobi', period: '2022 – 2024', gradient: 'linear-gradient(90deg, #ec4899, #f97316)', accent: '#ec4899', bg: '#fdf2f8', text: '#9d174d',
    points: ['Delivered 10+ projects: e-commerce, civic portals, ML tools', 'Clients from local businesses to government institutions'] },
  { title: 'Frontend & UI/UX', company: 'Academic & Personal Projects', period: '2021 – 2022', gradient: 'linear-gradient(90deg, #f59e0b, #ef4444)', accent: '#f59e0b', bg: '#fffbeb', text: '#92400e',
    points: ['Built React storefronts & interactive data dashboards', 'Strong foundation in UX design and responsive interfaces'] },
]

function ExperienceRoom({ x }: { x: number }) {
  return (
    <group>
      <RoomShell x={x} />
      <RoomLights x={x} />
      <Desk pos={[x + 3.5, 0, -0.9]} />
      <Chair pos={[x + 3.5, 0, 0.9]} />
      <FloorLamp pos={[x - 5.2, 0, -3.5]} />

      <Float speed={1.2} rotationIntensity={0.04} floatIntensity={0.2}>
        <Panel pos={[x - 1.8, 3.1, -2.2]} width={390} gradient="linear-gradient(90deg, #f59e0b, #ec4899, #6366f1)">
          <div>
            <div style={{ fontSize: '10px', fontWeight: 800, color: '#f59e0b', letterSpacing: '2.5px', marginBottom: '14px' }}>
              EXPERIENCE TIMELINE
            </div>
            {JOBS.map((job, i) => (
              <div key={i} style={{
                marginBottom: '12px', padding: '12px 14px',
                background: job.bg, borderRadius: '12px',
                borderLeft: `3.5px solid ${job.accent}`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px', gap: '8px' }}>
                  <div style={{ fontWeight: 800, fontSize: '13px', color: '#0f172a', fontFamily: "'Syne', sans-serif" }}>{job.title}</div>
                  <span style={{
                    fontSize: '10px', fontWeight: 700, color: '#fff',
                    background: job.accent, padding: '2px 8px',
                    borderRadius: '10px', whiteSpace: 'nowrap',
                  }}>{job.period}</span>
                </div>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, marginBottom: '6px' }}>{job.company}</div>
                {job.points.map((p, pi) => (
                  <div key={pi} style={{ fontSize: '11px', color: job.text, marginBottom: '2px' }}>• {p}</div>
                ))}
              </div>
            ))}
          </div>
        </Panel>
      </Float>
    </group>
  )
}

// ─── Room: Projects ───────────────────────────────────────────────────────────
const PROJECTS = [
  { title: 'ODSERP',                desc: 'Full ERP with Accounting, HRM, CRM, POS & Project Management with RBAC.',                    tags: ['Full-Stack', 'ERP'],   demo: 'https://odserp.com',                    accent: '#00c896', bg: '#e6faf5', text: '#065f46' },
  { title: 'ODSAlma — LMS',         desc: 'Learning & Alumni Management System for student records, course management & reports.',       tags: ['LMS', 'Flask'],        demo: 'https://odsalma.com',                   accent: '#6366f1', bg: '#eef2ff', text: '#3730a3' },
  { title: 'Talents-Optimized',     desc: 'Laravel talent marketplace with smart candidate matching & end-to-end recruitment.',          tags: ['Laravel', 'PHP'],      demo: 'https://talents-optimized.com',         accent: '#ec4899', bg: '#fdf2f8', text: '#9d174d' },
  { title: 'Sanibook.ke',           desc: 'Kenya service-booking platform with real-time slot availability & provider dashboards.',      tags: ['Booking'],             demo: 'http://dev.sanibook.ke/',              accent: '#f59e0b', bg: '#fffbeb', text: '#92400e' },
  { title: 'Financial Mgmt System', desc: 'Budget tracking, expense management & audit-ready financial reporting.',                      tags: ['Fintech', 'Flask'],    demo: 'https://fms.digitallyfit.top/',        accent: '#3b82f6', bg: '#eff6ff', text: '#1e40af' },
  { title: 'Toi Shop — E-Commerce', desc: 'Secure e-commerce with cart, checkout, admin & analytics. 500+ transactions first month.',   tags: ['Flask', 'Payments'],   demo: 'https://toi-shop-main.onrender.com/',  accent: '#f97316', bg: '#fff7ed', text: '#c2410c' },
]

function ProjectsRoom({ x }: { x: number }) {
  return (
    <group>
      <RoomShell x={x} />
      <RoomLights x={x} />
      <Bookshelf pos={[x - 5.5, 0, -4.8]} />
      <FloorLamp pos={[x + 5.2, 0, -3.5]} />

      <Float speed={1.2} rotationIntensity={0.04} floatIntensity={0.2}>
        <Panel pos={[x - 2.8, 3.0, -2.2]} width={305} gradient="linear-gradient(90deg, #00c896, #6366f1)">
          <div>
            <div style={{ fontSize: '10px', fontWeight: 800, color: '#6366f1', letterSpacing: '2.5px', marginBottom: '12px' }}>
              LIVE PLATFORMS
            </div>
            {PROJECTS.slice(0, 3).map((p, i) => (
              <div key={i} style={{ marginBottom: '10px', padding: '11px', borderRadius: '12px', background: p.bg, borderLeft: `3px solid ${p.accent}` }}>
                <div style={{ fontWeight: 800, fontSize: '13px', color: '#0f172a', marginBottom: '4px', fontFamily: "'Syne', sans-serif" }}>{p.title}</div>
                <div style={{ fontSize: '11px', color: '#64748b', lineHeight: '1.5', marginBottom: '6px' }}>{p.desc}</div>
                <div style={{ display: 'flex', gap: '5px', marginBottom: '6px' }}>
                  {p.tags.map(t => (
                    <span key={t} style={{ padding: '2px 8px', borderRadius: '10px', fontSize: '10px', background: p.accent, color: '#fff', fontWeight: 700 }}>{t}</span>
                  ))}
                </div>
                <a href={p.demo} target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', color: p.accent, fontWeight: 700, textDecoration: 'none' }}>
                  🔗 View Live →
                </a>
              </div>
            ))}
          </div>
        </Panel>
      </Float>

      <Float speed={1.0} rotationIntensity={0.04} floatIntensity={0.2}>
        <Panel pos={[x + 2.8, 3.0, -2.2]} width={305} gradient="linear-gradient(90deg, #ec4899, #f59e0b)">
          <div>
            <div style={{ fontSize: '10px', fontWeight: 800, color: '#ec4899', letterSpacing: '2.5px', marginBottom: '12px' }}>
              MORE PROJECTS
            </div>
            {PROJECTS.slice(3).map((p, i) => (
              <div key={i} style={{ marginBottom: '10px', padding: '11px', borderRadius: '12px', background: p.bg, borderLeft: `3px solid ${p.accent}` }}>
                <div style={{ fontWeight: 800, fontSize: '13px', color: '#0f172a', marginBottom: '4px', fontFamily: "'Syne', sans-serif" }}>{p.title}</div>
                <div style={{ fontSize: '11px', color: '#64748b', lineHeight: '1.5', marginBottom: '6px' }}>{p.desc}</div>
                <div style={{ display: 'flex', gap: '5px', marginBottom: '6px' }}>
                  {p.tags.map(t => (
                    <span key={t} style={{ padding: '2px 8px', borderRadius: '10px', fontSize: '10px', background: p.accent, color: '#fff', fontWeight: 700 }}>{t}</span>
                  ))}
                </div>
                <a href={p.demo} target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', color: p.accent, fontWeight: 700, textDecoration: 'none' }}>
                  🔗 View Live →
                </a>
              </div>
            ))}
          </div>
        </Panel>
      </Float>
    </group>
  )
}

// ─── Room: Contact ────────────────────────────────────────────────────────────
function ContactRoom({ x }: { x: number }) {
  return (
    <group>
      <RoomShell x={x} />
      <RoomLights x={x} />
      <Desk pos={[x, 0, -0.9]} />
      <Chair pos={[x, 0, 0.9]} />
      <FloorLamp pos={[x + 5.2, 0, -3.5]} />
      <FloorLamp pos={[x - 5.2, 0, -3.5]} />

      <Float speed={1.3} rotationIntensity={0.04} floatIntensity={0.25}>
        <Panel pos={[x - 2.7, 3.0, -1.8]} width={280} gradient="linear-gradient(90deg, #3b82f6, #6366f1)">
          <div>
            <div style={{ fontSize: '10px', fontWeight: 800, color: '#3b82f6', letterSpacing: '2.5px', marginBottom: '12px' }}>
              GET IN TOUCH
            </div>
            <div style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', marginBottom: '10px', fontFamily: "'Syne', sans-serif" }}>
              Open to Opportunities
            </div>
            <div style={{ fontSize: '12px', color: '#475569', lineHeight: '1.7', marginBottom: '16px' }}>
              Available for full-time roles and select freelance work. Whether you need a robust web system, polished UI, or a custom data tool — let's talk!
            </div>
            {[
              { emoji: '✉️', label: 'Email', value: 'keancheelisha3@gmail.com', href: 'mailto:keancheelisha3@gmail.com', bg: '#eff6ff' },
              { emoji: '📍', label: 'Location', value: 'Nairobi, Kenya', href: null, bg: '#f0fdf4' },
              { emoji: '📱', label: 'Phone', value: '+254 706 210 521', href: 'tel:+254706210521', bg: '#fdf2f8' },
            ].map(({ emoji, label, value, href, bg }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 11px', background: bg, borderRadius: '10px', marginBottom: '7px' }}>
                <span style={{ fontSize: '16px' }}>{emoji}</span>
                <div>
                  <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700 }}>{label}</div>
                  {href
                    ? <a href={href} style={{ fontSize: '12px', color: '#0f172a', fontWeight: 700, textDecoration: 'none' }}>{value}</a>
                    : <div style={{ fontSize: '12px', color: '#0f172a', fontWeight: 700 }}>{value}</div>}
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </Float>

      <Float speed={1.1} rotationIntensity={0.04} floatIntensity={0.25}>
        <Panel pos={[x + 2.7, 3.0, -1.8]} width={265} gradient="linear-gradient(90deg, #00c896, #3b82f6)">
          <div>
            <div style={{ fontSize: '10px', fontWeight: 800, color: '#00c896', letterSpacing: '2.5px', marginBottom: '12px' }}>
              CONNECT WITH ME
            </div>
            {[
              { emoji: '⚡', label: 'GitHub', sub: 'github.com/Elisha-3', href: 'https://github.com/Elisha-3', bg: 'linear-gradient(135deg, #0f172a, #334155)' },
              { emoji: '💼', label: 'LinkedIn', sub: 'Keanche Elisha', href: 'https://www.linkedin.com/in/keanche-elisha-329284158', bg: 'linear-gradient(135deg, #0077b5, #0096d6)' },
              { emoji: '✉️', label: 'Email Me', sub: 'keancheelisha3@gmail.com', href: 'mailto:keancheelisha3@gmail.com', bg: 'linear-gradient(135deg, #ea4335, #ff6b6b)' },
            ].map(({ emoji, label, sub, href, bg }) => (
              <a key={label} href={href} target={label !== 'Email Me' ? '_blank' : undefined} rel="noopener noreferrer" style={{
                display: 'flex', alignItems: 'center', gap: '10px', padding: '11px 13px',
                background: bg, color: '#fff', borderRadius: '12px', textDecoration: 'none',
                fontWeight: 700, marginBottom: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}>
                <span style={{ fontSize: '18px' }}>{emoji}</span>
                <div>
                  <div style={{ fontSize: '13px' }}>{label}</div>
                  <div style={{ fontSize: '10px', opacity: 0.75 }}>{sub}</div>
                </div>
              </a>
            ))}
            <a href="/cv/ELISHA_CV.pdf" download style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              padding: '12px', background: 'linear-gradient(135deg, #00c896, #22c55e)',
              color: '#fff', borderRadius: '12px', textDecoration: 'none', fontWeight: 800,
              fontSize: '13px', marginTop: '4px', boxShadow: '0 4px 16px rgba(0,200,150,0.35)',
            }}>
              📄 Download CV
            </a>
          </div>
        </Panel>
      </Float>
    </group>
  )
}

// ─── Scene ────────────────────────────────────────────────────────────────────
function Scene({ currentRoom }: { currentRoom: number }) {
  const controlsRef = useRef<OrbitControlsImpl>(null!)
  const targetX = ROOMS[currentRoom].x
  return (
    <>
      <ambientLight intensity={1.8} color="#fff8f0" />
      <CameraRig targetX={targetX} controlsRef={controlsRef} />
      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.1}
        minAzimuthAngle={-Math.PI / 5}
        maxAzimuthAngle={Math.PI / 5}
      />
      <EntranceRoom   x={0} />
      <AboutRoom      x={15} />
      <SkillsRoom     x={30} />
      <ExperienceRoom x={45} />
      <ProjectsRoom   x={60} />
      <ContactRoom    x={75} />
    </>
  )
}

// ─── UI Overlay ───────────────────────────────────────────────────────────────
function UIOverlay({ currentRoom, setCurrentRoom }: { currentRoom: number; setCurrentRoom: (n: number) => void }) {
  const room = ROOMS[currentRoom]
  return (
    <>
      {/* Top bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 24px', pointerEvents: 'none',
        background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
      }}>
        <div style={{ pointerEvents: 'auto', fontSize: '22px', fontWeight: 900, fontFamily: "'Syne', sans-serif",
          background: 'linear-gradient(135deg, #00c896, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>
          EK.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '10px', height: '10px', borderRadius: '50%', background: room.accent,
            boxShadow: `0 0 0 3px ${room.accent}30`,
          }} />
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', fontFamily: "'Inter', sans-serif", letterSpacing: '0.5px' }}>
            {room.name}
          </div>
        </div>
        <div style={{ pointerEvents: 'auto' }}>
          <ThemeToggle />
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{ position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)', zIndex: 50 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '4px',
          padding: '6px 10px', borderRadius: '50px',
          background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.06)',
        }}>
          <NavBtn onClick={() => setCurrentRoom(Math.max(0, currentRoom - 1))} disabled={currentRoom === 0}>
            <ChevronLeft style={{ width: 16, height: 16 }} />
          </NavBtn>

          {ROOMS.map((r) => {
            const Icon = r.icon
            const active = currentRoom === r.id
            return (
              <button key={r.id} onClick={() => setCurrentRoom(r.id)} style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                padding: active ? '7px 14px' : '7px 10px',
                borderRadius: '30px', border: 'none', cursor: 'pointer',
                background: active ? r.accent : 'transparent',
                color: active ? '#fff' : '#64748b',
                fontWeight: 700, fontSize: '12px',
                transition: 'all 0.25s ease',
                fontFamily: "'Inter', system-ui, sans-serif",
                boxShadow: active ? `0 4px 14px ${r.accent}50` : 'none',
              }}>
                <Icon style={{ width: 14, height: 14 }} />
                {active && <span>{r.name}</span>}
              </button>
            )
          })}

          <NavBtn onClick={() => setCurrentRoom(Math.min(ROOMS.length - 1, currentRoom + 1))} disabled={currentRoom === ROOMS.length - 1}>
            <ChevronRight style={{ width: 16, height: 16 }} />
          </NavBtn>
        </div>
      </div>

      {/* Hint */}
      <div style={{
        position: 'fixed', bottom: '80px', left: '50%', transform: 'translateX(-50%)',
        zIndex: 40, color: 'rgba(0,0,0,0.25)', fontSize: '11px',
        fontFamily: "'JetBrains Mono', monospace", pointerEvents: 'none', letterSpacing: '1px',
      }}>
        ← → to navigate rooms
      </div>
    </>
  )
}

function NavBtn({ onClick, disabled, children }: { onClick: () => void; disabled: boolean; children: React.ReactNode }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width: '32px', height: '32px', borderRadius: '50%', border: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      background: disabled ? 'transparent' : '#f1f5f9',
      color: disabled ? '#cbd5e1' : '#475569',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'all 0.2s', fontFamily: 'inherit',
    }}>
      {children}
    </button>
  )
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export function House3D() {
  const [currentRoom, setCurrentRoom] = useState(0)

  const handleKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') setCurrentRoom(r => Math.min(ROOMS.length - 1, r + 1))
    if (e.key === 'ArrowLeft')  setCurrentRoom(r => Math.max(0, r - 1))
  }, [])

  return (
    <div
      style={{
        position: 'relative', width: '100%', height: '100vh', outline: 'none',
        background: 'linear-gradient(135deg, #f0f9ff 0%, #faf5ff 50%, #fff0f9 100%)',
      }}
      tabIndex={0}
      onKeyDown={handleKey}
    >
      <Canvas
        shadows
        camera={{ position: [0, 2.2, 7.5], fov: 55 }}
        gl={{ antialias: true, alpha: false }}
      >
        <Suspense fallback={null}>
          <Scene currentRoom={currentRoom} />
        </Suspense>
      </Canvas>
      <UIOverlay currentRoom={currentRoom} setCurrentRoom={setCurrentRoom} />
    </div>
  )
}

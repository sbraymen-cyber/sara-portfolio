import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useBreakpoint } from '../hooks/useBreakpoint';

const PROJECTS = [
  {
    slug: 'broadstreet-ai',
    company: 'Evernorth / Cigna',
    title: 'AI Research Agent — "John Snow"',
    desc: 'Clinical AI agent before the industry had standards for it. Multi-turn, hallucination handling, context-window UX.',
    accent: 'var(--steel)',
    accentRgb: '111,135,190',
    img: '/case-studies/broadstreet-ai/img-1.webp',
  },
  {
    slug: 'broadstreet-clinical',
    company: 'Evernorth / Cigna',
    title: 'Clinical Intelligence Platform',
    desc: '0→1 product for clinical population research across 182M records. Three versions shipped.',
    accent: 'var(--steel)',
    accentRgb: '111,135,190',
    img: '/case-studies/broadstreet-clinical/img-1.webp',
  },
  {
    slug: 'louisiana-housing',
    company: 'Horne LLP',
    title: 'Emergency Housing Relief',
    desc: 'Four real-time dashboards across four states. $300M in COVID mortgage relief tracked to the day.',
    accent: 'var(--amber)',
    accentRgb: '196,154,90',
    img: '/case-studies/louisiana-housing/img-1.webp',
  },
  {
    slug: 'sar-consumer',
    company: 'Sar — Passion project',
    title: 'Consumer Receipt Experience',
    desc: 'Tap phone at checkout. Receipt in Apple Wallet. No app required. Built alongside full-time work.',
    accent: 'var(--coral)',
    accentRgb: '200,80,60',
    img: '/case-studies/sar-consumer/img-1.webp',
  },
  {
    slug: 'sar-merchant',
    company: 'Sar — Passion project',
    title: 'Merchant Platform & POS',
    desc: '$0.04 per receipt. Pricing, Square integration, merchant dashboard. A side project with real traction.',
    accent: 'var(--coral)',
    accentRgb: '200,80,60',
    img: '/case-studies/sar-merchant/img-1.webp',
  },
];

function Card({ project: p, index, isMobile }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/work/${p.slug}`)}
      style={{ cursor: 'pointer', borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 28 }}
    >
      {/* Image */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 8,
        height: isMobile ? 200 : 260,
        background: '#141210',
        marginBottom: 20,
      }}>
        {p.img && (
          <img src={p.img} alt={p.title} loading="lazy" style={{
            width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center',
            transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
          }} />
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(14,12,10,0.55) 0%, transparent 50%)' }} />
        {/* Accent line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: p.accent, opacity: hovered ? 1 : 0.4, transition: 'opacity 0.3s' }} />
      </div>

      {/* Meta row */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: p.accent, letterSpacing: '0.01em', opacity: 0.7 }}>{num}</span>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)' }}>{p.company}</span>
        </div>
        <span style={{
          fontSize: 11, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase',
          color: hovered ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.15)',
          transition: 'color 0.2s',
        }}>View →</span>
      </div>

      <h3 style={{ fontSize: isMobile ? 19 : 21, fontWeight: 600, letterSpacing: '-0.025em', color: '#fff', lineHeight: 1.2, marginBottom: 8 }}>
        {p.title}
      </h3>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>{p.desc}</p>
    </motion.article>
  );
}

export default function Work() {
  const { isMobile, isTablet } = useBreakpoint();
  const px = isMobile ? 20 : isTablet ? 32 : 48;

  return (
    <section id="work" style={{ maxWidth: 1080, margin: '0 auto', padding: `${isMobile ? 80 : 120}px ${px}px ${isMobile ? 60 : 100}px` }}>
      <div style={{ marginBottom: 64 }}>
        <motion.p
          style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: 16 }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          Selected work
        </motion.p>
        <motion.h2 className="type-h1" style={{ color: '#fff', maxWidth: '22ch' }}
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.06 }}>
          Design, product, and AI — all the way to shipped.
        </motion.h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 0 : '0 48px' }}>
        {PROJECTS.map((p, i) => (
          <Card key={p.slug} project={p} index={i} isMobile={isMobile} />
        ))}
      </div>
    </section>
  );
}

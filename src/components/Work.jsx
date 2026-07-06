import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useBreakpoint } from '../hooks/useBreakpoint';

const PROJECTS = [
  {
    slug: 'broadstreet-clinical',
    company: 'Evernorth / Cigna',
    title: 'Clinical Intelligence Platform',
    desc: '0→1 product for clinical population research across 182M records. Three versions shipped. Triggered a platform-wide redesign.',
    accent: '#3D9E8C',
    accentRgb: '61,158,140',
    img: '/case-studies/broadstreet-clinical/img-1.webp',
  },
  {
    slug: 'broadstreet-ai',
    company: 'Evernorth / Cigna',
    title: 'AI Research Agent — "John Snow"',
    desc: 'Designed a clinical AI agent before the industry had standards for it. Hallucination handling, context-window UX, multi-turn interactions — all from scratch.',
    accent: '#8B6FBE',
    accentRgb: '139,111,190',
    img: '/case-studies/broadstreet-ai/img-1.webp',
  },
  {
    slug: 'louisiana-housing',
    company: 'Horne LLP',
    title: 'Emergency Housing Relief',
    desc: 'Four real-time dashboards across four states. $300M in COVID mortgage relief — tracked from week-old spreadsheets to live data.',
    accent: '#BE7A6F',
    accentRgb: '190,122,111',
    img: '/case-studies/louisiana-housing/img-1.webp',
  },
  {
    slug: 'sar-consumer',
    company: 'Sar — Founder',
    title: 'Consumer Receipt Experience',
    desc: 'Tap phone at checkout. Receipt in Apple Wallet. No app required. Built because every other solution asked too much of the customer.',
    accent: '#6F87BE',
    accentRgb: '111,135,190',
    img: '/case-studies/sar-consumer/img-1.webp',
  },
  {
    slug: 'sar-merchant',
    company: 'Sar — Founder',
    title: 'Merchant Platform & POS',
    desc: '$0.04 per receipt. Pricing strategy, Square integration, merchant dashboard, and a sustainability badge that became a word-of-mouth driver.',
    accent: '#C49A5A',
    accentRgb: '196,154,90',
    img: '/case-studies/sar-merchant/img-1.webp',
    wide: true,
  },
];

function Card({ project: p, index, isMobile }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const isWide = p.wide && !isMobile;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: (index % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/work/${p.slug}`)}
      style={{
        gridColumn: isWide ? 'span 2' : 'span 1',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Image */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 10,
        height: isWide ? 300 : isMobile ? 200 : 240,
        background: `radial-gradient(ellipse at 40% 40%, rgba(${p.accentRgb},0.15) 0%, #141210 70%)`,
        marginBottom: 20,
      }}>
        {p.img && (
          <img src={p.img} alt={p.title} loading="lazy" style={{
            width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block',
            transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
          }} />
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(14,12,10,0.6) 0%, transparent 60%)' }} />
        {/* Arrow */}
        <div style={{
          position: 'absolute', bottom: 16, right: 16,
          width: 36, height: 36, borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.15)',
          backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, color: '#fff',
          transition: 'opacity 0.25s, transform 0.25s',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'scale(1)' : 'scale(0.8)',
        }}>↗</div>
      </div>

      {/* Text */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: `rgba(${p.accentRgb},0.7)` }}>
            {p.company}
          </span>
          <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.15)', transition: 'color 0.2s', ...(hovered ? { color: 'rgba(255,255,255,0.4)' } : {}) }}>
            Read →
          </span>
        </div>
        <h3 style={{ fontSize: isMobile ? 20 : 22, fontWeight: 600, letterSpacing: '-0.025em', color: '#fff', lineHeight: 1.2 }}>
          {p.title}
        </h3>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, marginTop: 2 }}>{p.desc}</p>
      </div>
    </motion.article>
  );
}

export default function Work() {
  const { isMobile, isTablet } = useBreakpoint();
  const px = isMobile ? 20 : isTablet ? 32 : 48;

  return (
    <section id="work" style={{ maxWidth: 1080, margin: '0 auto', padding: `${isMobile ? 80 : 120}px ${px}px ${isMobile ? 60 : 100}px` }}>
      <div style={{ marginBottom: 56 }}>
        <motion.p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: 16 }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          Selected work
        </motion.p>
        <motion.h2 className="type-h1" style={{ color: '#fff', maxWidth: '20ch' }}
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.06 }}>
          Design, product, and AI — all the way to shipped.
        </motion.h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 40 : 48 }}>
        {PROJECTS.map((p, i) => (
          <Card key={p.slug} project={p} index={i} isMobile={isMobile} />
        ))}
      </div>
    </section>
  );
}

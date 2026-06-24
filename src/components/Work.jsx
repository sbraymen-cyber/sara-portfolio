import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

const PROJECTS = [
  {
    slug: 'broadstreet-clinical',
    company: 'Evernorth / Cigna',
    title: 'Clinical Intelligence Platform',
    desc: 'Led 0→1 product design for a clinical data query tool on 182M+ records. Ran discovery, defined scope with PMs and engineering, and shipped 3 versions. Triggered a full platform redesign.',
    accent: '#3D9E8C',
    accentRgb: '61,158,140',
    tags: ['Healthcare AI', '0→1', 'Enterprise UX'],
    metric: '23% → 89%',
    metricLabel: 'adoption',
    img: '/case-studies/broadstreet-clinical/img-1.png',
    span: 1,
  },
  {
    slug: 'broadstreet-ai',
    company: 'Evernorth / Cigna',
    title: 'AI Research Agent — "John Snow"',
    desc: 'Designed an AI agent for clinical epidemiologists before the industry had standards. Defined hallucination handling, context-window UX, and multi-turn interaction patterns from scratch.',
    accent: '#8B6FBE',
    accentRgb: '139,111,190',
    tags: ['AI Product', 'Agent UX', 'GenAI'],
    metric: '96%',
    metricLabel: '"must have"',
    img: '/case-studies/broadstreet-ai/img-1.png',
    span: 1,
  },
  {
    slug: 'louisiana-housing',
    company: 'Horne LLP',
    title: 'Emergency Housing Relief',
    desc: 'Owned design and development of 4 real-time dashboards across 4 states tracking $300M in COVID mortgage relief. Built with Power BI and SQL from week-old spreadsheets under real urgency.',
    accent: '#BE7A6F',
    accentRgb: '190,122,111',
    tags: ['Data Product', 'Power BI', 'Crisis Response'],
    metric: '$300M',
    metricLabel: 'tracked in real time',
    img: '/case-studies/louisiana-housing/img-1.png',
    span: 1,
  },
  {
    slug: 'sar-consumer',
    company: 'Sar — Founder & PM',
    title: 'Consumer Receipt Experience',
    desc: 'Defined the product vision, UX, and go-to-market for a tap-to-wallet receipt experience. No app download. Tap phone at checkout → receipt in Apple Wallet instantly.',
    accent: '#6F87BE',
    accentRgb: '111,135,190',
    tags: ['Consumer Product', 'NFC', 'iOS'],
    metric: '3+',
    metricLabel: 'live pilots',
    img: '/case-studies/sar-consumer/img-1.png',
    span: 1,
  },
  {
    slug: 'sar-merchant',
    company: 'Sar — Founder & PM',
    title: 'Merchant Platform & POS Integrations',
    desc: 'Set pricing strategy ($0.04/receipt), owned Square API integration roadmap, designed merchant dashboard and sustainability metrics. Multi-POS schema built for Toast and Clover expansion.',
    accent: '#C49A5A',
    accentRgb: '196,154,90',
    tags: ['B2B Product', 'Roadmap', 'Square API'],
    metric: '4×',
    metricLabel: 'retention lift',
    img: '/case-studies/sar-merchant/img-1.png',
    liveUrl: 'https://sar-app.com',
    span: 2,
  },
];

function Card({ project: p, index }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const isWide = p.span === 2;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/work/${p.slug}`)}
      style={{
        gridColumn: isWide ? 'span 2' : 'span 1',
        cursor: 'pointer',
        borderRadius: 12,
        overflow: 'hidden',
        border: `1.5px solid ${hovered ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.07)'}`,
        transition: 'border-color 0.25s, transform 0.25s',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        background: '#161414',
      }}
    >
      {/* Screenshot */}
      <div style={{ position: 'relative', overflow: 'hidden', height: isWide ? 320 : 260 }}>
        {p.img ? (
          <img src={p.img} alt={p.title} style={{
            width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block',
            transition: 'transform 0.5s ease',
            transform: hovered ? 'scale(1.03)' : 'scale(1)',
          }} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: `radial-gradient(ellipse at 35% 30%, rgba(${p.accentRgb},0.25) 0%, #0e0c0a 70%)` }} />
        )}

        {/* Metric badge */}
        <div style={{
          position: 'absolute', top: 16, right: 16,
          background: 'rgba(10,8,6,0.82)',
          backdropFilter: 'blur(16px)',
          border: `1px solid rgba(${p.accentRgb},0.3)`,
          borderRadius: 100,
          padding: '6px 14px',
          display: 'flex', alignItems: 'baseline', gap: 5,
        }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>{p.metric}</span>
          <span style={{ fontSize: 11, color: `rgba(${p.accentRgb},0.9)`, fontWeight: 500 }}>{p.metricLabel}</span>
        </div>

        {/* Bottom gradient */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(22,20,20,1) 0%, rgba(22,20,20,0.2) 40%, transparent 70%)' }} />
      </div>

      {/* Content */}
      <div style={{ padding: '22px 24px 24px' }}>
        {/* Company pill */}
        <div style={{ marginBottom: 12 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
            color: `rgba(${p.accentRgb},0.95)`,
            background: `rgba(${p.accentRgb},0.08)`,
            border: `1px solid rgba(${p.accentRgb},0.2)`,
            borderRadius: 100, padding: '4px 10px 4px 8px',
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: `rgba(${p.accentRgb},0.9)`, flexShrink: 0 }} />
            {p.company}
          </span>
        </div>
        <h3 style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.02em', color: '#fff', marginBottom: 8, lineHeight: 1.3 }}>{p.title}</h3>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, marginBottom: 16 }}>{p.desc}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {p.tags.slice(0, 3).map(t => (
              <span key={t} style={{
                fontSize: 11, fontWeight: 500,
                background: `rgba(${p.accentRgb},0.08)`,
                border: `1px solid rgba(${p.accentRgb},0.18)`,
                borderRadius: 100, padding: '3px 10px',
                color: `rgba(${p.accentRgb},0.85)`,
              }}>{t}</span>
            ))}
          </div>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', flexShrink: 0 }}>View case study →</span>
        </div>
      </div>
    </motion.article>
  );
}

export default function Work() {
  return (
    <section id="work" style={{ maxWidth: 1080, margin: '0 auto', padding: '120px 48px 100px' }}>
      {/* Section header */}
      <div style={{ marginBottom: 56 }}>
        <motion.p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          Selected work
        </motion.p>
        <motion.h2 className="type-h1" style={{ color: '#fff', maxWidth: '18ch' }}
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.06 }}>
          Design, product, and AI work — all the way to shipped.
        </motion.h2>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {PROJECTS.map((p, i) => (
          <Card key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

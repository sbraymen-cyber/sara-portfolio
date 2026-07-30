import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBreakpoint } from '../hooks/useBreakpoint';

const PROJECTS = [
  {
    slug: 'broadstreet-ai',
    company: 'Evernorth / Cigna',
    title: 'AI Research Agent — "John Snow"',
    desc: 'Conversational AI agent for clinical research. It fills search filters on your behalf rather than just telling you what to do.',
    accent: 'var(--accent)',
    accentRgb: '45,64,48',
    img: '/case-studies/broadstreet-ai/screen-3.webp',
  },
  {
    slug: 'sar-consumer',
    company: 'Sar — Passion project',
    title: 'Sar: Zero-Friction Receipt',
    desc: 'A receipt app I designed and built myself. NFC tap to Apple Wallet in under 3 seconds, nothing extra required from the customer.',
    accent: 'var(--accent-warm)',
    accentRgb: '160,72,37',
    img: '/case-studies/sar-consumer/screen-wallet.webp',
  },
  {
    slug: 'broadstreet-clinical',
    company: 'Evernorth / Cigna',
    title: 'Clinical Intelligence Platform',
    desc: 'A search and visualization tool for clinical population research, built over four years from nothing. Three versions, 182M patient records.',
    accent: 'var(--accent)',
    accentRgb: '45,64,48',
    img: '/case-studies/broadstreet-clinical/cover.webp',
  },
  {
    slug: 'louisiana-housing',
    company: 'Horne LLP',
    title: 'Emergency Housing Relief',
    desc: 'Four real-time dashboards across four states. $300M in COVID mortgage relief tracked to the day.',
    accent: 'var(--accent-warm)',
    accentRgb: '160,72,37',
    img: '/case-studies/louisiana-housing/dash-5.webp',
  },
];

const WORK_BUBBLES = [
  { text: 'want to go for a coffee break?', x: '68%', delay: 1.2,  dur: 8.0, bg: '#FDF1EB', color: '#A04825' },
  { text: 'does this look centered to you?', x: '52%', delay: 3.5,  dur: 7.2, bg: '#EAF0EC', color: '#2D4030' },
  { text: 'who wrote this copy 😅',           x: '76%', delay: 5.8,  dur: 6.8, bg: '#FFFFFF', color: '#3A3D3A' },
  { text: 'can I steal your screen for a sec?', x: '58%', delay: 8.0, dur: 7.5, bg: '#EAF0EC', color: '#2D4030' },
  { text: 'we need more whitespace',          x: '72%', delay: 10.5, dur: 7.0, bg: '#FDF1EB', color: '#7A3318' },
];

function Thumbnail({ slug }) {
  const s = { width: '100%', height: '100%', display: 'block' };

  // Broadstreet AI — warm sage bg, stacked chat bubbles, serif stat
  if (slug === 'broadstreet-ai') return (
    <svg viewBox="0 0 600 280" style={s} aria-hidden>
      <rect width="600" height="280" rx="12" fill="#EEF2EE"/>
      {/* Soft glow */}
      <ellipse cx="460" cy="100" rx="180" ry="130" fill="rgba(61,107,82,0.09)"/>
      {/* Chat bubbles — AI side (sage) */}
      <rect x="240" y="44" width="290" height="44" rx="14" fill="#3D6B52"/>
      <text x="262" y="62" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="Inter,sans-serif">Tell me about the patients</text>
      <text x="262" y="78" fill="#fff" fontSize="10" fontFamily="Inter,sans-serif" fontWeight="500">you're looking for...</text>
      {/* User reply */}
      <rect x="70" y="106" width="270" height="34" rx="14" fill="#fff" stroke="rgba(45,64,48,0.12)" strokeWidth="1"/>
      <text x="88" y="128" fill="#3A3D3A" fontSize="10" fontFamily="Inter,sans-serif">Find PCOS patients in rural Colorado</text>
      {/* AI response */}
      <rect x="240" y="158" width="290" height="70" rx="14" fill="#3D6B52"/>
      <text x="262" y="177" fill="rgba(255,255,255,0.65)" fontSize="9" fontFamily="Inter,sans-serif">Auto-filling filters...</text>
      <rect x="262" y="186" width="100" height="7" rx="4" fill="rgba(255,255,255,0.35)"/>
      <rect x="262" y="200" width="160" height="7" rx="4" fill="rgba(255,255,255,0.2)"/>
      <rect x="262" y="214" width="80"  height="7" rx="4" fill="rgba(255,255,255,0.12)"/>
      {/* Stat bottom-left */}
      <text x="48" y="232" fill="#2D4030" fontSize="38" fontFamily="Georgia,serif" fontWeight="400" letterSpacing="-1">96%</text>
      <text x="49" y="252" fill="rgba(45,64,48,0.4)" fontSize="9" fontFamily="Inter,sans-serif" letterSpacing="1.5">RATED MUST-HAVE</text>
    </svg>
  );

  // Broadstreet Clinical — sage tint, map dots, big stat
  if (slug === 'broadstreet-clinical') return (
    <svg viewBox="0 0 600 280" style={s} aria-hidden>
      <rect width="600" height="280" rx="12" fill="#EBF0EC"/>
      <ellipse cx="380" cy="130" rx="220" ry="160" fill="rgba(45,107,94,0.07)"/>
      {/* Dot grid — choropleth suggestion */}
      {Array.from({length: 35}, (_,i) => {
        const col = i % 7, row = Math.floor(i / 7);
        const x = 220 + col * 48 + (row % 2) * 22;
        const y = 36 + row * 42;
        const op = [0.15,0.35,0.6,0.85,0.5,0.25,0.7][col] * (0.6 + row * 0.1);
        return <circle key={i} cx={x} cy={y} r={4 + ((i * 3) % 4)} fill={`rgba(45,107,94,${Math.min(op,0.9)})`}/>;
      })}
      {/* Filter panel — minimal */}
      <rect x="28" y="28" width="168" height="210" rx="14" fill="rgba(255,255,255,0.55)" stroke="rgba(45,64,48,0.1)" strokeWidth="1"/>
      <text x="44" y="52" fill="#2D4030" fontSize="10" fontFamily="Inter,sans-serif" fontWeight="700">Search filter</text>
      {['Demographics','Condition','Geography','Date range'].map((lbl, i) => (
        <g key={lbl}>
          <rect x="44" y={66 + i * 44} width="136" height="30" rx="8" fill="rgba(45,107,94,0.08)" stroke="rgba(45,107,94,0.12)" strokeWidth="1"/>
          <text x="58" y={85 + i * 44} fill="rgba(45,64,48,0.55)" fontSize="9" fontFamily="Inter,sans-serif">{lbl}</text>
        </g>
      ))}
      {/* Stat */}
      <text x="224" y="248" fill="#2D6B5E" fontSize="52" fontFamily="Georgia,serif" fontWeight="400" letterSpacing="-2">182M</text>
      <text x="225" y="265" fill="rgba(45,107,94,0.4)" fontSize="9" fontFamily="Inter,sans-serif" letterSpacing="1.5">PATIENT RECORDS</text>
    </svg>
  );

  // Louisiana Housing — warm cream, clean bars, amber stat
  if (slug === 'louisiana-housing') return (
    <svg viewBox="0 0 600 280" style={s} aria-hidden>
      <rect width="600" height="280" rx="12" fill="#F5EFE6"/>
      <ellipse cx="300" cy="200" rx="300" ry="100" fill="rgba(160,72,37,0.05)"/>
      {/* Bar chart */}
      {[55,80,68,105,92,128,158].map((h, i) => (
        <g key={i}>
          <rect x={52 + i * 72} y={210 - h} width={48} height={h} rx="6"
            fill={i === 6 ? '#A04825' : `rgba(160,72,37,${0.15 + i * 0.08})`}/>
          <text x={52 + i * 72 + 24} y="228" fill="rgba(160,72,37,0.4)" fontSize="9" fontFamily="Inter,sans-serif" textAnchor="middle">
            {['Jan','Feb','Mar','Apr','May','Jun','Jul'][i]}
          </text>
        </g>
      ))}
      {/* Stat top-right */}
      <text x="566" y="80" fill="#A04825" fontSize="52" fontFamily="Georgia,serif" fontWeight="400" letterSpacing="-1" textAnchor="end">$300M</text>
      <text x="566" y="98" fill="rgba(160,72,37,0.4)" fontSize="9" fontFamily="Inter,sans-serif" textAnchor="end" letterSpacing="1.5">COVID HOUSING RELIEF</text>
      {/* Baseline */}
      <line x1="40" y1="210" x2="570" y2="210" stroke="rgba(160,72,37,0.15)" strokeWidth="1"/>
    </svg>
  );

  // Sar — clean light, wallet card centered, NFC arcs
  if (slug === 'sar-consumer') return (
    <svg viewBox="0 0 600 280" style={s} aria-hidden>
      <defs>
        <linearGradient id="wc" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2D4030"/>
          <stop offset="100%" stopColor="#3D6B52"/>
        </linearGradient>
      </defs>
      <rect width="600" height="280" rx="12" fill="#F0F4F7"/>
      {/* NFC arcs left */}
      {[52, 36, 20].map((r, i) => (
        <path key={i} d={`M ${118 - r} ${140 - r * 1.2} A ${r * 1.4} ${r * 1.8} 0 0 1 ${118 - r} ${140 + r * 1.2}`}
          fill="none" stroke="rgba(45,64,48,0.18)" strokeWidth="2.5" strokeLinecap="round"/>
      ))}
      <circle cx="118" cy="140" r="8" fill="#2D4030"/>
      {/* Wallet card */}
      <rect x="168" y="34" width="380" height="212" rx="20" fill="url(#wc)"/>
      <ellipse cx="290" cy="80" rx="110" ry="55" fill="rgba(255,255,255,0.05)"/>
      <text x="196" y="74" fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="600" letterSpacing="2">APPLE WALLET</text>
      <text x="196" y="108" fill="#fff" fontSize="22" fontFamily="Georgia,serif">Sar Receipt</text>
      <text x="196" y="128" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="Inter,sans-serif">Blue Pan Kitchen · Boulder, CO</text>
      <line x1="196" y1="144" x2="524" y2="144" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
      {[['Eggs Benedict','$18.00'],['Cold Brew','$6.50'],['Total','$27.02']].map(([item, price], i) => (
        <g key={i}>
          <text x="196" y={160 + i * 20} fill={i === 2 ? '#fff' : 'rgba(255,255,255,0.5)'} fontSize="11" fontFamily="Inter,sans-serif" fontWeight={i === 2 ? '600' : '400'}>{item}</text>
          <text x="522" y={160 + i * 20} fill={i === 2 ? '#fff' : 'rgba(255,255,255,0.5)'} fontSize="11" fontFamily="Inter,sans-serif" fontWeight={i === 2 ? '600' : '400'} textAnchor="end">{price}</text>
        </g>
      ))}
    </svg>
  );

  return null;
}

function Card({ project: p, index, isMobile }) {
  const navigate = useNavigate();
  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0, margin: '0px 0px 200px 0px' }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => navigate(`/work/${p.slug}`)}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && navigate(`/work/${p.slug}`)}
      tabIndex={0}
      role="button"
      aria-label={`View case study: ${p.title}`}
      style={{ cursor: 'pointer', borderTop: '1px solid var(--border)', paddingTop: 48, paddingBottom: 48, outline: 'none' }}
      whileHover="hovered"
    >
      {/* Thumbnail */}
      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 12, height: isMobile ? 220 : 280, marginBottom: 24 }}>
        <motion.div
          variants={{ hovered: { scale: 1.03 } }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '100%', height: '100%' }}
        >
          <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </motion.div>
        {/* Dark overlay on hover */}
        <motion.div
          variants={{ default: { opacity: 0 }, hovered: { opacity: 1 } }}
          initial="default"
          transition={{ duration: 0.25 }}
          style={{ position: 'absolute', inset: 0, background: 'rgba(26,29,26,0.22)', borderRadius: 12 }}
        />
        {/* View label */}
        <motion.div
          variants={{ default: { opacity: 0, y: 6 }, hovered: { opacity: 1, y: 0 } }}
          initial="default"
          transition={{ duration: 0.25 }}
          style={{ position: 'absolute', bottom: 16, right: 16, background: 'rgba(255,255,255,0.95)', borderRadius: 100, padding: '8px 18px', fontSize: 12, fontWeight: 600, color: 'var(--text-1)', letterSpacing: '0.04em' }}
        >View case study →</motion.div>
        {/* Accent line */}
        <motion.div
          variants={{ hovered: { scaleX: 1, opacity: 1 } }}
          initial={{ scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.35 }}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: p.accent, transformOrigin: 'left' }}
        />
      </div>

      {/* Meta row */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.05em' }}>{num}</span>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-3)' }}>{p.company}</span>
        </div>
        <motion.span
          variants={{ hovered: { color: 'var(--text-1)', x: 3 } }}
          transition={{ duration: 0.2 }}
          style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-2)' }}
        >View →</motion.span>
      </div>

      <motion.h3
        variants={{ hovered: { color: 'var(--accent)' } }}
        transition={{ duration: 0.2 }}
        style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: isMobile ? 22 : 26,
          fontWeight: 400,
          letterSpacing: '-0.02em',
          color: 'var(--text-1)',
          lineHeight: 1.2,
          marginBottom: 10,
        }}
      >
        {p.title}
      </motion.h3>
      <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.7 }}>{p.desc}</p>
    </motion.article>
  );
}

export default function Work() {
  const { isMobile, isTablet } = useBreakpoint();
  const px = isMobile ? 20 : isTablet ? 32 : 48;

  return (
    <section id="work" style={{ position: 'relative', maxWidth: 1080, margin: '0 auto', padding: `${isMobile ? 80 : 120}px ${px}px ${isMobile ? 60 : 100}px` }}>

      {/* Decorative bubbles */}
      {!isMobile && WORK_BUBBLES.map((b, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: [0, 0.88, 0.88, 0], y: [10, -8, -12, -20] }}
          transition={{ duration: b.dur, delay: b.delay, repeat: Infinity, repeatDelay: b.dur * 0.8, ease: 'easeInOut' }}
          style={{
            position: 'absolute', left: b.x, top: `${20 + i * 18}%`,
            background: b.bg, color: b.color,
            fontSize: 12, fontWeight: 500, fontFamily: 'Inter, sans-serif',
            padding: '7px 13px', borderRadius: 100,
            boxShadow: '0 2px 12px rgba(26,29,26,0.08)',
            border: '1px solid rgba(26,29,26,0.07)',
            pointerEvents: 'none', zIndex: 0, whiteSpace: 'nowrap',
          }}
        >{b.text}</motion.div>
      ))}

      <div style={{ marginBottom: 64 }}>
        <motion.p
          style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0, margin: '0px 0px 200px 0px' }}>
          Selected work
        </motion.p>
        <motion.h2 className="type-h1" style={{ color: 'var(--text-1)', maxWidth: '22ch' }}
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0, margin: '0px 0px 200px 0px' }}
          transition={{ delay: 0.06 }}>
          A few things I've worked on.
        </motion.h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 0 : '0 48px' }}>
        {PROJECTS.map((p, i) => (
          <Card key={`${p.slug}-${i}`} project={p} index={i} isMobile={isMobile} />
        ))}
      </div>
    </section>
  );
}

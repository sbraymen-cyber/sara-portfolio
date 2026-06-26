import { motion } from 'framer-motion';
import VideoBackground from './VideoBackground';
import Aurora from './Aurora';
import { useBreakpoint } from '../hooks/useBreakpoint';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
});

const STATS = [
  { n: '$300M', label: 'Housing aid disbursed', sub: 'FEMA · 3 states' },
  { n: '100k+', label: 'Users on Evernorth Control Center', sub: 'Evernorth / Cigna' },
  { n: '1', label: 'App in TestFlight', sub: 'Sar · NFC receipts' },
];

export default function Hero() {
  const { isMobile, isTablet } = useBreakpoint();
  const px = isMobile ? 20 : isTablet ? 32 : 48;

  return (
    <section style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      {isMobile ? <Aurora /> : <VideoBackground />}

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1080, margin: '0 auto', padding: `0 ${px}px ${isMobile ? 60 : 80}px`, width: '100%' }}>

        <motion.p {...fadeUp(0.2)} style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: 24 }}>
          Senior Product Manager & Designer · Boulder, CO
        </motion.p>

        <motion.h1 {...fadeUp(0.32)} className="type-display" style={{ marginBottom: 28, maxWidth: '18ch' }}>
          Sara Braymen
        </motion.h1>

        <motion.p {...fadeUp(0.42)} style={{ fontSize: isMobile ? 16 : 18, color: 'rgba(255,255,255,0.58)', maxWidth: 540, marginBottom: 48, lineHeight: 1.7, fontWeight: 400 }}>
          I lead product across the full stack — from discovery and roadmapping to AI architecture and shipping. Enterprise platforms, government data systems, and my own app in TestFlight.
        </motion.p>

        <motion.div {...fadeUp(0.52)} style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: isMobile ? 48 : 80 }}>
          <a href="#work"
            style={{ fontSize: 13, fontWeight: 600, color: '#fff', textDecoration: 'none', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 100, padding: '11px 24px', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
            View work ↓
          </a>
          <a href="#contact"
            style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'color 0.15s' }}
            onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,0.85)'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}>
            Get in touch →
          </a>
        </motion.div>

        <motion.div {...fadeUp(0.6)} style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 0, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          {STATS.map((s, i) => (
            <div key={i} style={{
              flex: isMobile ? 'none' : 1,
              padding: isMobile ? '20px 0' : '28px 0',
              paddingRight: !isMobile && i < STATS.length - 1 ? 32 : 0,
              paddingLeft: !isMobile && i > 0 ? 32 : 0,
              borderRight: !isMobile && i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              borderBottom: isMobile && i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
            }}>
              <p style={{ fontSize: isMobile ? 26 : 30, fontWeight: 600, letterSpacing: '-0.03em', color: '#fff', marginBottom: 5 }}>{s.n}</p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginBottom: 3 }}>{s.label}</p>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)' }}>{s.sub}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { useBreakpoint } from '../hooks/useBreakpoint';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

const EXPLORATIONS = [
  {
    title: 'MLB Website Redesign',
    company: 'Major League Baseball',
    type: 'Speculative · Figma Make',
    year: '2026',
    description: 'A full speculative redesign of MLB.com — modernizing the homepage, game day experience, and team pages with a focus on real-time score context and bringing the energy of the ballpark into the browser. Built interactively in Figma Make.',
    what: 'Redesigned the hero, live game module, and standings architecture. Prioritized the game-day state as the primary homepage mode during the season.',
    accent: '#1a3a5c',
    accentLight: 'rgba(26,58,92,0.07)',
    accentBorder: 'rgba(26,58,92,0.18)',
    href: 'https://www.figma.com/make/OHzD1soe8C8At0LnSdYzVJ/Revamp-MLB-Website-Design',
    emoji: '⚾',
  },
  {
    title: 'Epic Pass App Redesign',
    company: 'Vail Resorts',
    type: 'Speculative · Figma Make',
    year: '2026',
    description: 'I ski at Vail. I use this app. So I did what any designer would do: audited the job listing, went feature-by-feature against what the app actually delivers, and redesigned the gaps. The "More" tab is a dumped list of legal links. The Stats screen leads with an empty state upsell. The home screen doesn\'t know what day it is in your ski season. I redesigned all of it.',
    what: 'Rebuilt the navigation and information hierarchy from the "More" tab up. Redesigned the Stats experience to lead with your data, not a GPS upsell. Added resort-context awareness to the home screen so it surfaces what matters on a ski day vs. a planning day.',
    accent: '#1E4D6B',
    accentLight: 'rgba(30,77,107,0.07)',
    accentBorder: 'rgba(30,77,107,0.18)',
    href: 'https://www.figma.com/make/kzeFAjEcA7IOwEIP5OZIDy/EpicPass-App-Redesign?fullscreen=1&t=m5qZRKY13h0id1b8-1&code-node-id=0-9',
    emoji: '⛷️',
  },
];

export default function Explorations() {
  const { isMobile, isTablet } = useBreakpoint();
  const px = isMobile ? 20 : isTablet ? 32 : 56;

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--text-1)' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: `${isMobile ? 100 : 140}px ${px}px 100px` }}>

        {/* Header */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: 80 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 20 }}>Side Projects</p>
          <h1 style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: isMobile ? 'clamp(40px, 10vw, 56px)' : 'clamp(52px, 6vw, 72px)',
            fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.05,
            color: 'var(--text-1)', marginBottom: 24, maxWidth: '18ch',
          }}>
            Consumer product<br /><em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>thinking</em>
          </h1>
          <p style={{ fontSize: isMobile ? 15 : 17, color: 'var(--text-2)', maxWidth: 520, lineHeight: 1.7 }}>
            Speculative redesigns I built to stay sharp on consumer UX outside my day-to-day. I pick products I use, find the parts that frustrate me, and redesign them — fully interactive, built in Figma Make.
          </p>
        </motion.div>

        {/* Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 32 : 48 }}>
          {EXPLORATIONS.map((ex, i) => (
            <motion.a
              key={ex.title}
              href={ex.href}
              target="_blank"
              rel="noopener noreferrer"
              {...fadeUp(0.1 + i * 0.1)}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.22 }}
              style={{
                display: 'block',
                textDecoration: 'none',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-md)',
                borderRadius: 20,
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: '0 2px 20px rgba(26,29,26,0.05)',
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 40px rgba(26,29,26,0.1)'; e.currentTarget.style.borderColor = `rgba(${ex.accent.slice(1).match(/.{2}/g).map(h => parseInt(h, 16)).join(',')},0.3)`; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 20px rgba(26,29,26,0.05)'; e.currentTarget.style.borderColor = 'var(--border-md)'; }}
            >
              {/* Color band header */}
              <div style={{
                background: ex.accentLight,
                borderBottom: `1px solid ${ex.accentBorder}`,
                padding: isMobile ? '28px 24px' : '36px 48px',
                display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24,
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 28 }}>{ex.emoji}</span>
                    <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: ex.accent, background: `rgba(${ex.accent.slice(1).match(/.{2}/g).map(h => parseInt(h,16)).join(',')},0.12)`, border: `1px solid ${ex.accentBorder}`, borderRadius: 100, padding: '3px 10px' }}>{ex.type}</span>
                  </div>
                  <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: isMobile ? 26 : 34, fontWeight: 400, letterSpacing: '-0.02em', color: 'var(--text-1)', marginBottom: 4, lineHeight: 1.1 }}>{ex.title}</h2>
                  <p style={{ fontSize: 14, color: 'var(--text-3)' }}>{ex.company} · {ex.year}</p>
                </div>
                <div style={{
                  flexShrink: 0, fontSize: 22, color: ex.accent,
                  background: `rgba(${ex.accent.slice(1).match(/.{2}/g).map(h => parseInt(h,16)).join(',')},0.1)`,
                  border: `1px solid ${ex.accentBorder}`,
                  borderRadius: 100, width: 44, height: 44,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>↗</div>
              </div>

              {/* Body */}
              <div style={{ padding: isMobile ? '24px 24px' : '32px 48px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 20 : 48 }}>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 10 }}>Overview</p>
                  <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.75 }}>{ex.description}</p>
                </div>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 10 }}>What I redesigned</p>
                  <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.75 }}>{ex.what}</p>
                </div>
              </div>

              {/* Footer CTA */}
              <div style={{ padding: isMobile ? '0 24px 24px' : '0 48px 28px' }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: ex.accent, letterSpacing: '0.01em' }}>
                  Open interactive prototype ↗
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Footer note */}
        <motion.p {...fadeUp(0.3)} style={{ marginTop: 72, fontSize: 13, color: 'var(--text-3)', lineHeight: 1.6, maxWidth: 480 }}>
          These are speculative — no NDA, no client. Just me staying curious about products I use and redesigning the parts that bug me.
        </motion.p>

      </div>
    </div>
  );
}

import { motion } from 'framer-motion';
import { useBreakpoint } from '../hooks/useBreakpoint';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
});

const STATS = [
  { n: 'Fortune 15', label: 'Evernorth / Cigna — lead designer on a platform used by 100k+ people', color: 'var(--accent)' },
  { n: '$300M',      label: 'in COVID housing relief tracked across 4 states', color: 'var(--accent-sage)' },
  { n: '182M',       label: 'patient records made searchable', color: 'var(--accent-warm)' },
  { n: '5-person',   label: 'teams — managing designers, collaborating with clients, scoping work at Prominent', color: 'var(--accent)' },
];

const BUBBLES = [
  { text: 'users don\'t read — they scan',       x: '58%', y: '22%', delay: 0.4,  dur: 7.0, bg: '#EAF0EC', color: '#2D4030', drift: -8 },
  { text: 'one tap, not three',                   x: '72%', y: '36%', delay: 1.0,  dur: 6.2, bg: '#FDF1EB', color: '#7A3318', drift: 6  },
  { text: 'let\'s add more joy to this!',         x: '60%', y: '52%', delay: 1.8,  dur: 7.5, bg: '#FDF1EB', color: '#A04825', drift: -7 },
  { text: 'accessibility = everyone',             x: '80%', y: '20%', delay: 0.7,  dur: 6.8, bg: '#EAF0EC', color: '#2D4030', drift: 7  },
  { text: 'what does the user actually want?',    x: '56%', y: '40%', delay: 0.3,  dur: 8.0, bg: '#EAF0EC', color: '#2D4030', drift: -9 },
  { text: 'make it feel effortless',              x: '82%', y: '50%', delay: 1.5,  dur: 7.2, bg: '#EAF0EC', color: '#2D4030', drift: -5 },
  { text: 'every pixel is a decision',            x: '76%', y: '28%', delay: 2.0,  dur: 7.8, bg: '#FFFFFF', color: '#3A3D3A', drift: -4 },
  { text: 'trust the process 🌱',                 x: '62%', y: '60%', delay: 3.5,  dur: 6.4, bg: '#EAF0EC', color: '#2D4030', drift: 6  },
  { text: 'simplify the error state',             x: '70%', y: '44%', delay: 4.0,  dur: 6.8, bg: '#FFFFFF', color: '#3A3D3A', drift: -6 },
  { text: 'ship it ✦',                           x: '84%', y: '38%', delay: 4.5,  dur: 5.5, bg: '#EAF0EC', color: '#2D4030', drift: -8 },
  { text: 'data tells a story',                   x: '54%', y: '30%', delay: 2.6,  dur: 6.5, bg: '#FDF1EB', color: '#7A3318', drift: -6 },
  { text: 'delight is a feature',                 x: '78%', y: '58%', delay: 5.2,  dur: 7.0, bg: '#FFFFFF', color: '#3A3D3A', drift: 5  },
];

export default function Hero() {
  const { isMobile, isTablet } = useBreakpoint();
  const px = isMobile ? 20 : isTablet ? 32 : 64;

  return (
    <section style={{
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
    }}>

      {/* Aurora */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 70% 55% at 80% 15%, rgba(138,155,142,0.22) 0%, transparent 60%),
          radial-gradient(ellipse 55% 65% at 15% 75%, rgba(216,138,110,0.18) 0%, transparent 60%),
          radial-gradient(ellipse 60% 45% at 55% 100%, rgba(45,64,48,0.06) 0%, transparent 65%)
        `,
      }} />

      {/* Thought bubbles */}
      {!isMobile && BUBBLES.map((b, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{
            opacity: [0, 0.92, 0.92, 0],
            y: [12, b.drift, b.drift * 0.4, b.drift - 4],
          }}
          transition={{
            duration: b.dur,
            delay: b.delay,
            repeat: Infinity,
            repeatDelay: b.dur * 0.6,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            left: b.x,
            top: b.y,
            background: b.bg,
            color: b.color,
            fontSize: 12,
            fontWeight: 500,
            fontFamily: 'Inter, sans-serif',
            letterSpacing: '0.005em',
            padding: '7px 13px',
            borderRadius: 100,
            boxShadow: '0 2px 12px rgba(26,29,26,0.08), 0 1px 3px rgba(26,29,26,0.06)',
            border: '1px solid rgba(26,29,26,0.07)',
            pointerEvents: 'none',
            zIndex: 1,
            whiteSpace: 'nowrap',
          }}
        >
          {b.text}
        </motion.div>
      ))}

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1080, margin: '0 auto', padding: `${isMobile ? '88px' : '140px'} ${px}px ${isMobile ? '40px' : '80px'}`, width: '100%' }}>

        <motion.p {...fadeUp(0.2)} style={{
          fontSize: 11, fontWeight: 600, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: 'var(--accent)', marginBottom: isMobile ? 14 : 28,
        }}>
          Senior Product Designer · Boulder, CO
        </motion.p>

        <motion.div {...fadeUp(0.3)} style={{ marginBottom: isMobile ? 20 : 32 }}>
          <h1 style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: isMobile ? 'clamp(52px, 14vw, 80px)' : 'clamp(80px, 11vw, 128px)',
            fontWeight: 400,
            letterSpacing: '-0.03em',
            lineHeight: 0.93,
            color: 'var(--text-1)',
          }}>
            Sara<br />
            <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Braymen</em>
          </h1>
        </motion.div>

        <motion.p {...fadeUp(0.42)} style={{
          fontSize: isMobile ? 16 : 18,
          color: 'var(--text-2)',
          maxWidth: 520, marginBottom: isMobile ? 28 : 44, lineHeight: 1.65, fontWeight: 400,
        }}>
          Turning complex problems into products people actually enjoy using — in healthcare, data, and beyond.
        </motion.p>

        <motion.div {...fadeUp(0.52)} style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: isMobile ? 48 : 80, flexWrap: 'wrap' }}>
          <a href="#work" style={{
            fontSize: 14, fontWeight: 600, color: '#fff',
            textDecoration: 'none',
            background: 'var(--accent)',
            borderRadius: 100,
            padding: '13px 28px',
            transition: 'background 0.15s, transform 0.15s',
            display: 'inline-block',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-hover)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            View work ↓
          </a>
          <a href="#contact" style={{
            fontSize: 14, fontWeight: 500, color: 'var(--text-2)',
            textDecoration: 'none', transition: 'color 0.15s',
          }}
            onMouseEnter={e => e.target.style.color = 'var(--text-1)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-2)'}
          >
            Get in touch →
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div {...fadeUp(0.6)} style={{
          display: isMobile ? 'grid' : 'flex',
          gridTemplateColumns: isMobile ? '1fr 1fr' : undefined,
          flexDirection: 'row',
          borderTop: '1px solid var(--border)',
        }}>
          {STATS.map((s, i) => (
            <div key={i} style={{
              flex: isMobile ? 'none' : 1,
              padding: isMobile ? '20px 0' : '32px 0',
              paddingRight: !isMobile && i < STATS.length - 1 ? 28 : isMobile && i % 2 === 0 ? 16 : 0,
              paddingLeft: !isMobile && i > 0 ? 28 : 0,
              borderRight: !isMobile && i < STATS.length - 1 ? '1px solid var(--border)' : 'none',
              borderBottom: isMobile ? '1px solid var(--border)' : 'none',
              borderLeft: isMobile && i % 2 === 1 ? '1px solid var(--border)' : 'none',
              paddingLeft: isMobile && i % 2 === 1 ? 16 : (!isMobile && i > 0 ? 28 : 0),
            }}>
              <p style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: isMobile ? 30 : 44,
                fontWeight: 400,
                letterSpacing: '-0.03em',
                color: s.color,
                marginBottom: 6,
                lineHeight: 1,
              }}>{s.n}</p>
              <p style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.45, maxWidth: 160 }}>{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Fade into next section */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: 180,
        background: 'linear-gradient(to bottom, transparent 0%, var(--bg) 100%)',
        pointerEvents: 'none',
        zIndex: 2,
      }} />
    </section>
  );
}

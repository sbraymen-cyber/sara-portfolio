import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useBreakpoint } from '../hooks/useBreakpoint';

/* ─── Audio ─────────────────────────────────────────── */
function playTone(freq = 220, dur = 1.2, vol = 0.04, type = 'sine') {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + dur);
  } catch (_) {}
}

function haptic(pattern = [60]) {
  try { navigator.vibrate?.(pattern); } catch (_) {}
}

/* ─── Grain overlay ──────────────────────────────────── */
const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`;

/* ─── Scene component ────────────────────────────────── */
function Scene({ children, tone = 280, pattern = [60], delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -120px 0px' });
  const fired = useRef(false);

  useEffect(() => {
    if (inView && !fired.current) {
      fired.current = true;
      setTimeout(() => {
        playTone(tone, 1.4, 0.035);
        haptic(pattern);
      }, delay);
    }
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Title card ─────────────────────────────────────── */
function TitleCard({ label }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28,
    }}>
      <div style={{ flex: 1, height: 1, background: 'rgba(26,29,26,0.15)' }} />
      <span style={{
        fontSize: 10, fontWeight: 700, letterSpacing: '0.18em',
        textTransform: 'uppercase', color: 'rgba(26,29,26,0.35)',
        fontFamily: 'Courier New, monospace',
      }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: 'rgba(26,29,26,0.15)' }} />
    </div>
  );
}

/* ─── Pull statement ─────────────────────────────────── */
function Statement({ children, accent }) {
  return (
    <p style={{
      fontFamily: "'Instrument Serif', Georgia, serif",
      fontSize: 'clamp(22px, 3.5vw, 36px)',
      fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1.35,
      color: accent ? '#8B6FE8' : '#1A1D1A',
      marginBottom: 0,
    }}>{children}</p>
  );
}

function Body({ children }) {
  return (
    <p style={{
      fontSize: 16, lineHeight: 1.8,
      color: 'rgba(26,29,26,0.58)',
      maxWidth: 560,
      fontFamily: 'Inter, sans-serif',
      fontWeight: 400,
    }}>{children}</p>
  );
}

/* ─── Page ───────────────────────────────────────────── */
export default function Philosophy() {
  const { isMobile, isTablet } = useBreakpoint();
  const px = isMobile ? 24 : isTablet ? 40 : 72;

  // Hero entrance tone
  useEffect(() => {
    const t = setTimeout(() => {
      playTone(110, 2.8, 0.025, 'sine');
      haptic([30, 20, 30]);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      background: '#F7F6F2',
      minHeight: '100vh',
      color: '#1A1D1A',
      position: 'relative',
    }}>
      {/* Film grain */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        backgroundImage: GRAIN_SVG,
        backgroundRepeat: 'repeat',
        pointerEvents: 'none',
        mixBlendMode: 'multiply',
        opacity: 0.6,
      }} />

      {/* Vignette */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 90% 80% at 50% 40%, transparent 50%, rgba(16,14,10,0.18) 100%)',
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: 740, margin: '0 auto',
        padding: `${isMobile ? 110 : 160}px ${px}px ${isMobile ? 100 : 160}px`,
      }}>

        {/* ── Opening title card ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.3 }}
          style={{ marginBottom: isMobile ? 80 : 120 }}
        >
          <p style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: 'rgba(26,29,26,0.3)',
            fontFamily: 'Courier New, monospace', marginBottom: 32,
          }}>Sara Braymen · Boulder, CO · 2026</p>

          <h1 style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: isMobile ? 'clamp(52px, 14vw, 72px)' : 'clamp(72px, 10vw, 100px)',
            fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 0.92,
            color: '#1A1D1A', marginBottom: 40,
          }}>
            Still<br />
            <em style={{ fontStyle: 'italic', color: '#8B6FE8' }}>Becoming.</em>
          </h1>

          <p style={{
            fontSize: isMobile ? 16 : 18, color: 'rgba(26,29,26,0.5)',
            lineHeight: 1.75, maxWidth: 420, fontStyle: 'italic',
            fontFamily: "'Instrument Serif', Georgia, serif",
          }}>
            "Some designers care about pixels.<br />
            I care about what happens to people after the pixels."
          </p>
        </motion.div>

        {/* ── Scene 1: The butterfly effect ── */}
        <div style={{ marginBottom: isMobile ? 80 : 120 }}>
          <Scene tone={196} pattern={[50, 30, 50]}>
            <TitleCard label="I · The Butterfly Effect" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <Statement>A filter decision in a healthcare dashboard affects how quickly a doctor finds a patient. That patient is someone's parent.</Statement>
              <Body>Small decisions compound. I've never forgotten that the thing on my screen connects to something real on the other end. The distance between a design choice and a human outcome is shorter than most people think — and longer than most people act like it is.</Body>
              <Body>I chose healthcare, emergency relief, and financial tools on purpose. Not because they were available. Because they're the places where design actually changes what happens next.</Body>
            </div>
          </Scene>
        </div>

        {/* ── Scene 2: On purpose ── */}
        <div style={{ marginBottom: isMobile ? 80 : 120 }}>
          <Scene tone={220} pattern={[80]} delay={100}>
            <TitleCard label="II · On Purpose" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <Statement accent>Vague ambition produces vague results. The most powerful thing you can do is decide.</Statement>
              <Body>I've learned that clarity of direction is more valuable than perfection of plan. The gap between where you are and where you want to be isn't a problem to solve — it's a distance to cover. You cover it by moving, every day, in one direction.</Body>
              <Body>I know what I'm building toward: products that operate at the intersection of AI, access, and human dignity. That's the sentence I come back to. Everything else is tactics.</Body>
            </div>
          </Scene>
        </div>

        {/* ── Scene 3: On people ── */}
        <div style={{ marginBottom: isMobile ? 80 : 120 }}>
          <Scene tone={262} pattern={[40, 20, 40, 20, 40]} delay={80}>
            <TitleCard label="III · On People" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <Statement>The most underrated design skill is listening. Not waiting to speak — actually listening.</Statement>
              <Body>Every person I've worked alongside has taught me something I couldn't have learned from a spec or a brief. The engineer who said "that's going to break" was right, and he was also telling me something important about trust. The researcher who hesitated before clicking was telling me everything about the interface.</Body>
              <Body>I lead teams the way I want to be led: with clear expectations, genuine curiosity, and the understanding that the person across from you usually knows something you don't. That's not a management philosophy. It's just respect.</Body>
            </div>
          </Scene>
        </div>

        {/* ── Scene 4: On growth ── */}
        <div style={{ marginBottom: isMobile ? 80 : 120 }}>
          <Scene tone={330} pattern={[100, 30, 60]} delay={120}>
            <TitleCard label="IV · On Growth" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <Statement>The only failure is stopping.</Statement>
              <Body>I've built things that didn't work. Shipped features that missed. Led projects that took three versions to get right. Broadstreet took four years and three complete redesigns before it became something I was proud of. The learning wasn't despite the iteration — it was the iteration.</Body>
              <Body>I started an LLC, filed patents, learned to use a database, built and deployed three websites, and integrated with Apple Wallet — not because I had to, but because understanding how something works makes me better at designing it. Curiosity isn't a soft skill. It's how I stay useful.</Body>
            </div>
          </Scene>
        </div>

        {/* ── Scene 5: Where I'm going ── */}
        <div style={{ marginBottom: isMobile ? 80 : 120 }}>
          <Scene tone={440} pattern={[80, 40, 80, 40, 120]} delay={60}>
            <TitleCard label="V · Where I'm Going" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <Statement accent>I want to work on the problems that matter most while there's still time to matter.</Statement>
              <Body>That means AI that makes complex things accessible — not just impressive. Healthcare tools that reach the people who need them, not just the people who can afford to navigate them. Products that treat users as full human beings, not engagement metrics.</Body>
              <Body>Brown University. A startup. A Fortune 15 company. Each one was a deliberate move toward something larger. I'm not done moving.</Body>
              <div style={{
                marginTop: 16,
                padding: '24px 28px',
                border: '1px solid rgba(139,111,232,0.25)',
                borderRadius: 16,
                background: 'rgba(139,111,232,0.04)',
              }}>
                <p style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: isMobile ? 18 : 22, fontWeight: 400,
                  letterSpacing: '-0.015em', lineHeight: 1.5,
                  color: '#8B6FE8', margin: 0,
                }}>
                  "Small actions, compounded over time, with intention — that's how things change."
                </p>
              </div>
            </div>
          </Scene>
        </div>

        {/* ── Closing ── */}
        <Scene tone={523} pattern={[60, 30, 60, 30, 60, 30, 100]} delay={200}>
          <div style={{
            borderTop: '1px solid rgba(26,29,26,0.12)',
            paddingTop: 56, textAlign: 'center',
          }}>
            <p style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: isMobile ? 26 : 34, fontWeight: 400,
              letterSpacing: '-0.025em', color: '#1A1D1A',
              marginBottom: 20,
            }}>
              If you're still reading,<br />
              we should probably talk.
            </p>
            <a href="/#contact" style={{
              display: 'inline-block',
              background: '#8B6FE8', color: '#fff',
              borderRadius: 100, padding: '14px 36px',
              fontSize: 15, fontWeight: 600, textDecoration: 'none',
              letterSpacing: '0.01em',
              transition: 'background 0.15s, transform 0.15s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#7C5CBF'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#8B6FE8'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >Get in touch →</a>
          </div>
        </Scene>

        {/* Footer film strip */}
        <div style={{
          marginTop: 80, display: 'flex', justifyContent: 'center',
          gap: 8,
        }}>
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} style={{
              width: i === 3 ? 24 : 6, height: 6,
              borderRadius: 100,
              background: i === 3 ? '#8B6FE8' : 'rgba(26,29,26,0.15)',
              transition: 'all 0.3s',
            }} />
          ))}
        </div>
        <p style={{
          textAlign: 'center', marginTop: 16,
          fontSize: 10, fontWeight: 600, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: 'rgba(26,29,26,0.25)',
          fontFamily: 'Courier New, monospace',
        }}>End of reel</p>

      </div>
    </div>
  );
}

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useBreakpoint } from '../hooks/useBreakpoint';

function playTone(freq = 220, dur = 1.2, vol = 0.03, type = 'sine') {
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

const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`;

function Beat({ children, tone = 280, pattern = [50], delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' });
  const fired = useRef(false);

  useEffect(() => {
    if (inView && !fired.current) {
      fired.current = true;
      setTimeout(() => { playTone(tone, 1.2, 0.028); haptic(pattern); }, delay);
    }
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Philosophy() {
  const { isMobile } = useBreakpoint();
  const px = isMobile ? 24 : 64;

  useEffect(() => {
    const t = setTimeout(() => {
      playTone(110, 2.4, 0.022, 'sine');
      haptic([25, 15, 25]);
    }, 500);
    return () => clearTimeout(t);
  }, []);

  const serif = "'Instrument Serif', Georgia, serif";

  return (
    <div style={{ background: '#F7F6F2', minHeight: '100vh', color: '#1A1D1A', position: 'relative' }}>
      {/* Grain */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        backgroundImage: GRAIN_SVG, backgroundRepeat: 'repeat',
        pointerEvents: 'none', mixBlendMode: 'multiply', opacity: 0.6,
      }} />
      {/* Vignette */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 90% 80% at 50% 40%, transparent 50%, rgba(16,14,10,0.16) 100%)',
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: 620, margin: '0 auto',
        padding: `${isMobile ? 100 : 140}px ${px}px ${isMobile ? 80 : 120}px`,
      }}>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          style={{ marginBottom: isMobile ? 64 : 96 }}
        >
          <p style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'rgba(26,29,26,0.28)',
            fontFamily: 'Courier New, monospace', marginBottom: 28,
          }}>Sara Braymen · 2026</p>

          <h1 style={{
            fontFamily: serif,
            fontSize: isMobile ? 'clamp(48px,13vw,64px)' : 'clamp(64px,9vw,88px)',
            fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 0.94,
            color: '#1A1D1A', marginBottom: 0,
          }}>
            Still<br />
            <em style={{ fontStyle: 'italic', color: '#8B6FE8' }}>Becoming.</em>
          </h1>
        </motion.div>

        {/* Scene 1 */}
        <div style={{ marginBottom: isMobile ? 60 : 88 }}>
          <Beat tone={196} pattern={[40, 20, 40]}>
            <p style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.16em',
              textTransform: 'uppercase', color: 'rgba(26,29,26,0.3)',
              fontFamily: 'Courier New, monospace', marginBottom: 20,
            }}>On work</p>
            <p style={{
              fontFamily: serif,
              fontSize: isMobile ? 22 : 28, fontWeight: 400,
              letterSpacing: '-0.02em', lineHeight: 1.4,
              color: '#1A1D1A', marginBottom: 16,
            }}>
              I care about whether the thing I made actually helped someone. That's the whole job.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.78, color: 'rgba(26,29,26,0.54)', maxWidth: 500 }}>
              I've been lucky to work in healthcare, emergency relief, and fintech — places where the stakes feel real. Not because I sought importance, but because that's where I ended up, and I've tried to take it seriously.
            </p>
          </Beat>
        </div>

        {/* Scene 2 */}
        <div style={{ marginBottom: isMobile ? 60 : 88 }}>
          <Beat tone={220} pattern={[60]} delay={80}>
            <p style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.16em',
              textTransform: 'uppercase', color: 'rgba(26,29,26,0.3)',
              fontFamily: 'Courier New, monospace', marginBottom: 20,
            }}>On people</p>
            <p style={{
              fontFamily: serif,
              fontSize: isMobile ? 22 : 28, fontWeight: 400,
              letterSpacing: '-0.02em', lineHeight: 1.4,
              color: '#8B6FE8', marginBottom: 16,
            }}>
              Most of what I know, I learned from someone else.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.78, color: 'rgba(26,29,26,0.54)', maxWidth: 500 }}>
              I try to remember that. It makes me a better collaborator, and honestly, a less annoying one. I'd rather ask the question than pretend I already know.
            </p>
          </Beat>
        </div>

        {/* Scene 3 */}
        <div style={{ marginBottom: isMobile ? 60 : 88 }}>
          <Beat tone={262} pattern={[40, 20, 40, 20, 40]} delay={60}>
            <p style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.16em',
              textTransform: 'uppercase', color: 'rgba(26,29,26,0.3)',
              fontFamily: 'Courier New, monospace', marginBottom: 20,
            }}>On AI</p>
            <p style={{
              fontFamily: serif,
              fontSize: isMobile ? 22 : 28, fontWeight: 400,
              letterSpacing: '-0.02em', lineHeight: 1.4,
              color: '#1A1D1A', marginBottom: 16,
            }}>
              I'm genuinely excited about what's coming. And a little cautious about it too.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.78, color: 'rgba(26,29,26,0.54)', maxWidth: 500 }}>
              Both things can be true. I think the most interesting work right now sits at the edge of what AI can do and what humans actually need — and I want to help figure that out.
            </p>
          </Beat>
        </div>

        {/* Scene 4 */}
        <div style={{ marginBottom: isMobile ? 60 : 88 }}>
          <Beat tone={330} pattern={[80, 30, 50]} delay={100}>
            <p style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.16em',
              textTransform: 'uppercase', color: 'rgba(26,29,26,0.3)',
              fontFamily: 'Courier New, monospace', marginBottom: 20,
            }}>On right now</p>
            <p style={{
              fontFamily: serif,
              fontSize: isMobile ? 22 : 28, fontWeight: 400,
              letterSpacing: '-0.02em', lineHeight: 1.4,
              color: '#1A1D1A', marginBottom: 16,
            }}>
              I'm still figuring it out. That feels about right.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.78, color: 'rgba(26,29,26,0.54)', maxWidth: 500 }}>
              Brown, then a startup, then a Fortune 15 company. Each move made sense at the time. I'm not done moving — I just don't think I need to dress it up as a grand plan.
            </p>
          </Beat>
        </div>

        {/* Closing */}
        <Beat tone={440} pattern={[60, 30, 60]} delay={150}>
          <div style={{
            borderTop: '1px solid rgba(26,29,26,0.1)',
            paddingTop: 48, textAlign: 'center',
          }}>
            <p style={{
              fontFamily: serif,
              fontSize: isMobile ? 22 : 28, fontWeight: 400,
              letterSpacing: '-0.02em', color: '#1A1D1A', marginBottom: 20,
            }}>
              If any of this resonates,<br />let's talk.
            </p>
            <a href="/#contact" style={{
              display: 'inline-block',
              background: '#8B6FE8', color: '#fff',
              borderRadius: 100, padding: '13px 32px',
              fontSize: 14, fontWeight: 600, textDecoration: 'none',
              letterSpacing: '0.01em',
              transition: 'background 0.15s, transform 0.15s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#7C5CBF'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#8B6FE8'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >Get in touch →</a>
          </div>
        </Beat>

        <p style={{
          textAlign: 'center', marginTop: 64,
          fontSize: 10, fontWeight: 600, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: 'rgba(26,29,26,0.2)',
          fontFamily: 'Courier New, monospace',
        }}>End of reel</p>
      </div>
    </div>
  );
}

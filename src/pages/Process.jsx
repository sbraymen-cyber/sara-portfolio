import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useBreakpoint } from '../hooks/useBreakpoint';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

const MESSY = [
  {
    label: 'How I actually start a project',
    body: "I talk to the engineers first. Not the stakeholders — the engineers. They know where the bodies are buried. They know which requirement is real and which one got added because someone had a bad meeting. I buy them coffee and ask 'what would you do if nobody was watching?' That answer is usually the right product.",
  },
  {
    label: 'The thing I do that nobody asks for',
    body: "I make a 'stupid questions' doc at the start of every project. Every assumption, every thing I feel dumb asking, every 'surely this already exists' — all in one place. It has saved me from building the wrong thing more times than I can count. The questions that feel too basic are usually the ones that expose the flaw in the whole approach.",
  },
  {
    label: 'What a design review actually looks like',
    body: "I print things out. I know. I tape them to the wall and walk away. Come back the next day. Something about the physical distance — you stop defending your decisions and start seeing them. I've thrown out full days of work because of a 10-second hallway moment. That's not failure, that's the job.",
  },
  {
    label: 'The version you don\'t see',
    body: "Every finished design has at least three discarded versions behind it. Usually more. One where I overengineered it, one where I tried to be too clever, one where I copied something I'd seen and thought I could do better. Version four is usually the one that ships. Sometimes five. I don't count the others.",
  },
  {
    label: 'How I know something is done',
    body: "I show it to someone who doesn't care about it. Not someone on the team — someone completely outside. My mom has genuinely improved three products I've shipped. She doesn't know what ArcGIS is. She knows when something is confusing. That's the test.",
  },
  {
    label: 'The thing I\'m still learning',
    body: "Letting go of the feature I love that users don't. I get attached. I know it's wrong. I've gotten better at it. But there's always one thing per project that I argue for longer than the data supports. I'm aware of it. That's most of the battle.",
  },
];

const TOOLS = [
  { name: 'Figma', note: 'Everything. Always open.' },
  { name: 'Claude Code', note: 'Built this site with it. Built Sar with it.' },
  { name: 'Sticky notes', note: 'The physical kind. Non-negotiable.' },
  { name: 'Voice memos', note: 'Most of my best ideas happen while walking.' },
  { name: 'Notion', note: 'Messy, over-linked, somehow works.' },
  { name: 'A very good pen', note: 'Pilot G2 0.5. Everything else is a compromise.' },
];

export default function Process() {
  const { isMobile, isTablet } = useBreakpoint();
  const px = isMobile ? 20 : isTablet ? 32 : 48;

  return (
    <div style={{ background: '#0F0D0C', minHeight: '100vh', color: '#fff' }}>
      {/* Nav */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'rgba(15,13,12,0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 32px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>← Sara Braymen</Link>
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.15)' }}>Not indexed · Not linked · You found it</span>
        </div>
      </div>

      <div style={{ maxWidth: 780, margin: '0 auto', padding: `${isMobile ? 96 : 140}px ${px}px 120px` }}>

        {/* Header */}
        <motion.div {...fade(0.1)} style={{ marginBottom: 80 }}>
          <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: 20 }}>The back room</p>
          <h1 style={{ fontSize: isMobile ? 40 : 64, fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.05, color: '#fff', marginBottom: 28 }}>
            How I actually work
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, maxWidth: 520 }}>
            The front page is the finished work. This is the part I don't usually show — the process, the dead ends, the opinions I hold strongly and the habits I can't shake. If you're reading this, you either know me or you went looking.
          </p>
        </motion.div>

        {/* Process notes */}
        <motion.div {...fade(0.2)} style={{ marginBottom: 80 }}>
          {MESSY.map((item, i) => (
            <div key={i} style={{
              paddingTop: 36, paddingBottom: 36,
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}>
              <p style={{ fontSize: isMobile ? 18 : 22, fontWeight: 600, letterSpacing: '-0.02em', color: '#fff', marginBottom: 12, lineHeight: 1.25 }}>{item.label}</p>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, maxWidth: 580 }}>{item.body}</p>
            </div>
          ))}
        </motion.div>

        {/* Tools */}
        <motion.div {...fade(0.3)} style={{ marginBottom: 80 }}>
          <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: 32 }}>What's always open</p>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 16 : 20 }}>
            {TOOLS.map((t, i) => (
              <div key={i} style={{ padding: '16px 20px', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 4 }}>{t.name}</p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>{t.note}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Closing */}
        <motion.div {...fade(0.4)} style={{ paddingTop: 48, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ fontSize: isMobile ? 18 : 24, fontWeight: 400, letterSpacing: '-0.015em', color: 'rgba(255,255,255,0.6)', lineHeight: 1.55, maxWidth: 520, marginBottom: 32 }}>
            "The work looks effortless because I do the effortful part before anyone's watching."
          </p>
          <Link to="/" style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.35)', textDecoration: 'none', letterSpacing: '0.02em', transition: 'color 0.15s' }}
            onMouseEnter={e => e.target.style.color = '#fff'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.35)'}>
            ← Back to the front
          </Link>
        </motion.div>

      </div>
    </div>
  );
}

import { motion } from 'framer-motion';
import { useBreakpoint } from '../hooks/useBreakpoint';

const ITEMS = [
  {
    label: 'I speak engineer',
    body: "SQL, APIs, webhooks, context windows — I genuinely love this stuff. I show up to standups, ask the questions nobody else thinks to ask, and get along well with engineers. I value their input deeply while always advocating for what's right for the user and the business first.",
    accent: 'var(--accent-warm)',
  },
  {
    label: 'Simplicity is the hard part',
    body: "The complexity doesn't disappear — it moves into the decisions. I take on the messy product calls so users never have to feel them. The best interface isn't the one with the most options. It's the one where the right choice feels so obvious you almost don't notice it was a choice at all.",
    accent: 'var(--accent)',
  },
  {
    label: 'Collaboration is a craft',
    body: "I keep things light when the pressure is on and share credit freely. I've had engineers from past teams reach out just to say they finally shipped something they were proud of. That kind of thing stays with me a lot longer than any performance review.",
    accent: 'var(--accent-sage)',
  },
];

export default function Principles() {
  const { isMobile, isTablet } = useBreakpoint();
  const px = isMobile ? 20 : isTablet ? 32 : 48;
  const cols = isMobile ? '1fr' : isTablet ? '1fr 1fr' : '1fr 1fr 1fr';

  return (
    <section style={{ maxWidth: 1080, margin: '0 auto', padding: `0 ${px}px ${isMobile ? 80 : 120}px` }}>
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 64, display: 'grid', gridTemplateColumns: cols, gap: isMobile ? 36 : 40 }}>
        {ITEMS.map((item, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0, margin: '0px 0px 200px 0px' }}
            transition={{ duration: 0.55, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ width: 28, height: 2, background: item.accent, borderRadius: 2, marginBottom: 20 }} />
            <p style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: 20, fontWeight: 400,
              color: 'var(--text-1)', marginBottom: 10, letterSpacing: '-0.02em',
            }}>{item.label}</p>
            <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.75 }}>{item.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

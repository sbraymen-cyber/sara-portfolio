import { motion } from 'framer-motion';
import { useBreakpoint } from '../hooks/useBreakpoint';

const ITEMS = [
  {
    label: 'Comfortable with technical work',
    body: "SQL, APIs, webhooks, context windows — I enjoy learning this stuff and find it makes collaboration with engineers a lot easier. I try to understand how something works before I ask a team to build it.",
    accent: 'var(--accent-warm)',
  },
  {
    label: 'Simplicity takes a lot of work',
    body: "The complexity doesn't go away, it just moves into the decisions. I try to absorb as much of that as I can so the person using the product doesn't have to feel it.",
    accent: 'var(--accent)',
  },
  {
    label: 'Good to work with',
    body: "I try to keep things grounded when the pressure is high, share credit, and make sure engineers feel heard. Some of the best feedback I've gotten has come from people I built things alongside.",
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

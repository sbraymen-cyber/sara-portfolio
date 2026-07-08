import { motion } from 'framer-motion';
import { useBreakpoint } from '../hooks/useBreakpoint';

const ITEMS = [
  {
    label: 'I speak engineer',
    body: "SQL, APIs, webhooks, context windows — I don't need things translated for me. I show up to standups, ask the questions nobody else asks, and defend my team's time in every stakeholder meeting. Engineers don't dread working with me. A few have followed me across companies.",
    accent: 'var(--coral)',
  },
  {
    label: 'Simplicity is the hard part',
    body: "The complexity doesn't disappear — it moves into the decisions. I make the messy product calls so users never have to feel them. The best interface isn't the one with the most options. It's the one that makes the right choice feel obvious.",
    accent: 'var(--steel)',
  },
  {
    label: 'People like working with me',
    body: "I give credit loudly and take blame quietly. I keep a steady attitude when timelines slip and priorities shift. Former engineers still reach out when they ship something new. That's the review I care about.",
    accent: 'var(--amber)',
  },
];

export default function Principles() {
  const { isMobile, isTablet } = useBreakpoint();
  const px = isMobile ? 20 : isTablet ? 32 : 48;
  const cols = isMobile ? '1fr' : isTablet ? '1fr 1fr' : '1fr 1fr 1fr';

  return (
    <section style={{ maxWidth: 1080, margin: '0 auto', padding: `0 ${px}px ${isMobile ? 80 : 120}px` }}>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 64, display: 'grid', gridTemplateColumns: cols, gap: isMobile ? 36 : 40 }}>
        {ITEMS.map((item, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ width: 28, height: 2, background: item.accent, borderRadius: 2, marginBottom: 20 }} />
            <p style={{ fontSize: 19, fontWeight: 600, color: '#fff', marginBottom: 10, letterSpacing: '-0.02em' }}>{item.label}</p>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.42)', lineHeight: 1.7 }}>{item.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

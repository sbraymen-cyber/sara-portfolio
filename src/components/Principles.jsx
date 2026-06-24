import { motion } from 'framer-motion';

const ITEMS = [
  {
    label: 'Design and engineering, both',
    body: "I write production React code in addition to doing design work. It changes how I think — I prototype in the real medium, not just in Figma, and I understand the constraints I'm designing within.",
    accent: 'var(--coral)',
  },
  {
    label: 'Close to the product decisions',
    body: "I work well alongside PMs and often take on product thinking — scoping, prioritization, stakeholder alignment. At Sar I own those decisions myself as the founder.",
    accent: 'var(--steel)',
  },
  {
    label: 'Early to AI product work',
    body: "I designed an AI research agent at Evernorth in 2024 when patterns for this kind of work were still being figured out. It pushed me to think hard about trust, failure states, and what users actually need from AI.",
    accent: 'var(--amber)',
  },
];

export default function Principles() {
  return (
    <section style={{ maxWidth: 1080, margin: '0 auto', padding: '0 48px 120px' }}>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 64, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 40 }}>
        {ITEMS.map((item, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ width: 28, height: 2, background: item.accent, borderRadius: 2, marginBottom: 20 }} />
            <p style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 10, letterSpacing: '-0.01em' }}>{item.label}</p>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.42)', lineHeight: 1.7 }}>{item.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

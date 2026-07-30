import { motion } from 'framer-motion';
import { useBreakpoint } from '../hooks/useBreakpoint';

const PRINCIPLES = [
  {
    label: 'Research before anything else',
    body: 'I try not to open Figma until I understand the problem well enough to explain it to someone who isn\'t on the team. That usually means talking to users, sitting in on standups, and reading whatever documentation actually exists.',
  },
  {
    label: 'Working closely with engineers',
    body: 'At Evernorth I moved onto the engineering and data team so I could understand the infrastructure before designing on top of it. I\'ve found that the most useful design decisions tend to happen in conversation, not in isolation.',
  },
  {
    label: 'The right fidelity for the question',
    body: 'Rough flows when direction is unclear, higher fidelity when a specific decision needs pressure-testing. I try to match how much polish something gets to how much certainty it\'s earned.',
  },
  {
    label: 'Thinking about the business, too',
    body: 'On Sar, one of the most consequential decisions wasn\'t visual at all — it was pricing. I try to stay aware of how a product makes money, because that shapes what\'s actually possible.',
  },
];

export default function Approach() {
  const { isMobile, isTablet } = useBreakpoint();
  const px = isMobile ? 20 : isTablet ? 32 : 48;
  return (
    <section style={{ maxWidth: 960, margin: '0 auto', padding: `0 ${px}px ${isMobile ? 80 : 100}px` }}>
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 64, marginBottom: 48 }}>
        <motion.p
          className="type-label-sm"
          style={{ color: 'var(--text-3)', marginBottom: 12 }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0, margin: '0px 0px 200px 0px' }} transition={{ duration: 0.4 }}
        >
          How I work
        </motion.p>
        <motion.h2
          className="type-h1"
          style={{ color: 'var(--text-1)' }}
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0, margin: '0px 0px 200px 0px' }} transition={{ duration: 0.45, delay: 0.05 }}
        >
          How I tend to approach things.
        </motion.h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 2 }}>
        {PRINCIPLES.map((p, i) => (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0, margin: '0px 0px 200px 0px' }}
            transition={{ duration: 0.45, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            style={{
              padding: '28px 32px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: isMobile
                ? (i === 0 ? '12px 12px 0 0' : i === PRINCIPLES.length - 1 ? '0 0 12px 12px' : 0)
                : (i === 0 ? '12px 0 0 0' : i === 1 ? '0 12px 0 0' : i === 2 ? '0 0 0 12px' : '0 0 12px 0'),
            }}
          >
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', marginBottom: 12, letterSpacing: '-0.01em' }}>{p.label}</p>
            <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.75 }}>{p.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

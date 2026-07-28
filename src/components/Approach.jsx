import { motion } from 'framer-motion';
import { useBreakpoint } from '../hooks/useBreakpoint';

const PRINCIPLES = [
  {
    label: 'Discovery before pixels',
    body: 'I don\'t open Figma until I understand the problem. That means sitting with the data team, shadowing the user, reading the ticket backlog. The brief I write before design is the most valuable artifact I make.',
  },
  {
    label: 'Cross-functional by default',
    body: 'I don\'t hand things off — I embed. At Evernorth I moved onto the engineering and data team to understand the infrastructure before designing on top of it. The best design decisions I\'ve made were in a Slack thread with a backend engineer.',
  },
  {
    label: 'Prototype to think, ship to prove',
    body: 'I move fast between fidelities — rough flows to align on direction, high-fidelity prototypes to pressure-test decisions, production-quality work to validate with real users. The right artifact is whichever one answers the question in front of me.',
  },
  {
    label: 'Business model as design tool',
    body: 'The most important design decision on Sar wasn\'t the color or the NFC interaction — it was $0.04. Pricing is UX. Revenue model is product strategy. I think about both from day one.',
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
          User-centered by instinct. Systems-level by practice.
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
            <p className="type-body-md" style={{ color: 'var(--text-2)', lineHeight: 1.65 }}>{p.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

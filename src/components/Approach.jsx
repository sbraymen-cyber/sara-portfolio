import { motion } from 'framer-motion';

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
    label: 'Ship, don\'t prototype',
    body: 'I write production code. My prototypes are the product. This changes how I prioritize: if it\'s too complex to build well, it\'s too complex to design. Constraints are the spec.',
  },
  {
    label: 'Business model as design tool',
    body: 'The most important design decision on Sar wasn\'t the color or the NFC interaction — it was $0.04. Pricing is UX. Revenue model is product strategy. I think about both from day one.',
  },
];

export default function Approach() {
  return (
    <section style={{ maxWidth: 960, margin: '0 auto', padding: '0 32px 100px' }}>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 64, marginBottom: 48 }}>
        <motion.p
          className="type-label-sm"
          style={{ color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
        >
          How I work
        </motion.p>
        <motion.h2
          className="type-h1"
          style={{ color: '#fff' }}
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.05 }}
        >
          PM instincts. Design craft. Engineering reality.
        </motion.h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
        {PRINCIPLES.map((p, i) => (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.45, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            style={{
              padding: '28px 32px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: i === 0 ? '12px 0 0 0' : i === 1 ? '0 12px 0 0' : i === 2 ? '0 0 0 12px' : '0 0 12px 0',
            }}
          >
            <p className="type-label-md" style={{ color: 'var(--coral)', marginBottom: 12 }}>{p.label}</p>
            <p className="type-body-md" style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.65 }}>{p.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { useBreakpoint } from '../hooks/useBreakpoint';

const ITEMS = [
  {
    label: 'Technical enough to be dangerous',
    body: "I use AI to write production code, and I understand databases and technical constraints deeply enough to design around them — not into them. Developers never have to re-explain their stack to me. I already know what's happening behind the curtain.",
    accent: 'var(--coral)',
  },
  {
    label: 'Business decisions, disguised as simplicity',
    body: "I make product calls that balance user needs, business goals, and technical reality — then hide all of that complexity behind flows that feel obvious. The best interfaces don't feel designed. They feel inevitable.",
    accent: 'var(--steel)',
  },
  {
    label: 'Early to AI product work',
    body: "I shipped an AI agent that guides users through a geospatial mapping tool — before the industry had a playbook for it. That meant working directly with our developer to find where design ambition met ArcGIS and Neo4j constraints, and finding solutions that didn't make us compromise on quality.",
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
            <p style={{ fontFamily: 'var(--serif)', fontSize: 19, fontWeight: 500, color: '#fff', marginBottom: 10, letterSpacing: '-0.01em' }}>{item.label}</p>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.42)', lineHeight: 1.7 }}>{item.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

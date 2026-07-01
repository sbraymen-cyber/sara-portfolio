import { motion } from 'framer-motion';
import { useBreakpoint } from '../hooks/useBreakpoint';

const JOBS = [
  { company: 'Prominent Technology', role: 'Senior UX Manager', period: 'Mar 2026 – Present', current: true },
  { company: 'Sar, Inc.', role: 'Founder', period: 'Mar 2025 – Present' },
  {
    company: 'Evernorth Health Services (Cigna)',
    period: 'Apr 2022 – Mar 2026',
    note: 'Broadstreet Clinical + AI platforms',
    promotionGroup: [
      { role: 'Lead Product Manager – UX', period: 'Oct 2023 – Mar 2026' },
      { role: 'Senior UX Designer', period: 'Apr 2022 – Oct 2023' },
    ],
  },
  { company: 'Horne LLP', role: 'Senior Data Visualization Designer / Developer', period: 'Apr 2021 – Apr 2022', note: 'Louisiana + Alabama COVID relief programs' },
];

const SKILLS = ['Product Strategy', 'Roadmapping', 'AI / GenAI UX', 'Design Systems', 'User Research', 'Figma', 'React', 'TypeScript', 'SQL', 'Power BI', 'Stakeholder Alignment', '0→1 Products', 'Agent UX', 'iOS / NFC', 'Framer'];

export default function Experience() {
  const { isMobile, isTablet } = useBreakpoint();
  const px = isMobile ? 20 : isTablet ? 32 : 48;

  return (
    <section id="experience" style={{ maxWidth: 1080, margin: '0 auto', padding: `0 ${px}px ${isMobile ? 80 : 120}px` }}>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 64 }}>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 48 : 80, alignItems: 'start' }}>

          {/* Experience column */}
          <div>
            <motion.p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: 32 }}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              Experience
            </motion.p>

            <div>
              {JOBS.map((job, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  style={{ paddingBottom: 28, marginBottom: 28, borderBottom: i < JOBS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
                >
                  {job.promotionGroup ? (
                    /* Grouped promotion — role first, then company + dates */
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 15, fontWeight: 600, color: '#fff', letterSpacing: '-0.01em' }}>{job.promotionGroup[0].role}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', marginBottom: 10 }}>
                        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{job.company}</span>
                        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', whiteSpace: 'nowrap' }}>{job.promotionGroup[0].period}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                        <div style={{ width: 1, alignSelf: 'stretch', background: 'rgba(255,255,255,0.08)', flexShrink: 0 }} />
                        <div>
                          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', letterSpacing: '-0.01em' }}>{job.promotionGroup[1].role}</span>
                          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.18)', marginLeft: 10 }}>{job.promotionGroup[1].period}</span>
                        </div>
                      </div>
                      {job.note && <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.22)', marginTop: 10 }}>{job.note}</p>}
                    </>
                  ) : (
                    /* Standard single role */
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 15, fontWeight: 600, color: '#fff', letterSpacing: '-0.01em' }}>{job.role}</span>
                        {job.current && (
                          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', background: 'rgba(232,112,90,0.12)', color: 'var(--coral)', border: '1px solid rgba(232,112,90,0.25)', borderRadius: 100, padding: '2px 8px' }}>Now</span>
                        )}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{job.company}</span>
                        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', whiteSpace: 'nowrap' }}>{job.period}</span>
                      </div>
                      {job.note && <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.22)', marginTop: 6 }}>{job.note}</p>}
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Skills + Education column */}
          <div>
            <motion.p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: 32 }}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              Skills & Tools
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 48 }}
            >
              {SKILLS.map(s => (
                <span key={s} style={{
                  fontSize: 12, fontWeight: 500,
                  color: 'rgba(255,255,255,0.55)',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 100, padding: '5px 14px',
                }}>{s}</span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.18 }}
            >
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: 24 }}>Get in touch</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a href="mailto:sarabraymen@gmail.com" style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.target.style.color = '#fff'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}>
                  sarabraymen@gmail.com ↗
                </a>
                <a href="https://linkedin.com/in/sarabraymen" target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.target.style.color = '#fff'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}>
                  LinkedIn ↗
                </a>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { useBreakpoint } from '../hooks/useBreakpoint';

const JOBS = [
  { company: 'Prominent Technology', role: 'Senior UX Manager', period: 'Mar 2026 – Present', current: true },
  { company: 'Sar, Inc.', role: 'Founder', period: 'Mar 2025 – Present', passionProject: true },
  { company: 'Evernorth Health Services (Cigna)', role: 'Lead UX Designer', period: 'Apr 2022 – Mar 2026' },
  { company: 'Horne LLP', role: 'Senior Data Visualization Designer / Developer', period: 'Apr 2021 – Apr 2022' },
];

export default function Experience() {
  const { isMobile, isTablet } = useBreakpoint();
  const px = isMobile ? 20 : isTablet ? 32 : 48;

  return (
    <section id="experience" style={{ maxWidth: 1080, margin: '0 auto', padding: `0 ${px}px ${isMobile ? 80 : 120}px` }}>
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 64 }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 48 : 80, alignItems: 'start' }}>

          {/* Experience column */}
          <div>
            <motion.p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 32 }}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0, margin: '0px 0px 200px 0px' }}>
              Experience
            </motion.p>

            <div>
              {JOBS.map((job, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0, margin: '0px 0px 200px 0px' }}
                  transition={{ duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  style={{ paddingBottom: 28, marginBottom: 28, borderBottom: i < JOBS.length - 1 ? '1px solid var(--border)' : 'none' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                    <span style={{
                      fontFamily: "'Instrument Serif', Georgia, serif",
                      fontSize: 16, fontWeight: 400,
                      color: 'var(--text-1)', letterSpacing: '-0.01em',
                    }}>{job.role}</span>
                    {job.current && (
                      <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', background: 'rgba(45,64,48,0.1)', color: 'var(--accent)', border: '1px solid rgba(45,64,48,0.2)', borderRadius: 100, padding: '2px 8px' }}>Now</span>
                    )}
                    {job.passionProject && (
                      <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', background: 'rgba(216,138,110,0.1)', color: 'var(--accent-warm)', border: '1px solid rgba(216,138,110,0.25)', borderRadius: 100, padding: '2px 8px' }}>Passion project</span>
                    )}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 13, color: 'var(--text-2)' }}>{job.company}</span>
                    <span style={{ fontSize: 12, color: 'var(--text-3)', whiteSpace: 'nowrap' }}>{job.period}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0, margin: '0px 0px 200px 0px' }}
              transition={{ duration: 0.5, delay: 0.18 }}
            >
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 24 }}>Get in touch</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a href="mailto:sarabraymen@gmail.com" style={{ fontSize: 14, color: 'var(--text-2)', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--text-1)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-2)'}>
                  sarabraymen@gmail.com ↗
                </a>
                <a href="https://linkedin.com/in/sarabraymen" target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: 14, color: 'var(--text-2)', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--text-1)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-2)'}>
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

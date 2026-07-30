import { motion } from 'framer-motion';
import { useBreakpoint } from '../hooks/useBreakpoint';

const JOBS = [
  { company: 'Prominent Technologies', role: 'Senior UX Manager', period: 'Mar 2026 – Present', current: true },
  { company: 'Sar, Inc.', role: 'Founder', period: 'Mar 2025 – Present', passionProject: true },
  { company: 'Evernorth Health Services (Cigna)', role: 'Lead Product Designer', period: 'Apr 2022 – Mar 2026' },
  { company: 'Horne LLP', role: 'Senior Data Visualization Designer / Developer', period: 'Apr 2021 – Apr 2022' },
];

const EDUCATION = [
  { degree: 'MS, Innovation Management & Entrepreneurship', school: 'Brown University', period: '2026 – 2028', current: true },
  { degree: 'Certificate, User Experience Design', school: 'UC Berkeley Extension', period: '2021' },
  { degree: 'BS, Accounting & Management Information Systems', school: 'Iowa State University', period: '2015 – 2019' },
];

const chipStyle = (color, bg, border) => ({
  fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
  background: bg, color, border: `1px solid ${border}`, borderRadius: 100, padding: '2px 8px',
});

export default function Experience() {
  const { isMobile, isTablet } = useBreakpoint();
  const px = isMobile ? 20 : isTablet ? 32 : 48;

  return (
    <section id="experience" style={{ maxWidth: 1080, margin: '0 auto', padding: `0 ${px}px ${isMobile ? 80 : 120}px` }}>
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 64 }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 56 : 80, alignItems: 'start' }}>

          {/* Experience */}
          <div>
            <motion.p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 32 }}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0, margin: '0px 0px 200px 0px' }}>
              Experience
            </motion.p>
            {JOBS.map((job, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0, margin: '0px 0px 200px 0px' }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                style={{ paddingBottom: 24, marginBottom: 24, borderBottom: i < JOBS.length - 1 ? '1px solid var(--border)' : 'none' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 4 }}>
                  <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 16, fontWeight: 400, color: 'var(--text-1)', letterSpacing: '-0.01em', lineHeight: 1.3 }}>{job.role}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-3)', whiteSpace: 'nowrap', flexShrink: 0, paddingTop: 2 }}>{job.period}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 13, color: 'var(--text-2)' }}>{job.company}</span>
                  {job.current && <span style={chipStyle('#fff', 'var(--accent)', 'var(--accent)')}>Now</span>}
                  {job.passionProject && <span style={chipStyle('#fff', 'var(--accent-warm)', 'var(--accent-warm)')}>Passion project</span>}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Education + links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 52 }}>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0, margin: '0px 0px 200px 0px' }}
              transition={{ duration: 0.5, delay: 0.14 }}
            >
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 32 }}>Education</p>
              {EDUCATION.map((ed, i) => (
                <div key={i} style={{ paddingBottom: 22, marginBottom: 22, borderBottom: i < EDUCATION.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 4 }}>
                    <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 16, fontWeight: 400, color: 'var(--text-1)', letterSpacing: '-0.01em', lineHeight: 1.3 }}>{ed.degree}</span>
                    <span style={{ fontSize: 12, color: 'var(--text-3)', whiteSpace: 'nowrap', flexShrink: 0, paddingTop: 2 }}>{ed.period}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <span style={{ fontSize: 13, color: 'var(--text-2)' }}>{ed.school}</span>
                    {ed.current && <span style={chipStyle('#fff', 'var(--accent)', 'var(--accent)')}>Expected</span>}
                  </div>
                </div>
              ))}
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}

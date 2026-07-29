import { motion } from 'framer-motion';
import { useBreakpoint } from '../hooks/useBreakpoint';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] },
});

const EXPERIENCE = [
  {
    role: 'Senior UX Manager',
    company: 'Prominent Technologies',
    location: 'Boulder, CO (Remote)',
    period: 'Mar 2026 – Present',
    current: true,
    bullets: [
      'Partner directly with CEO to advocate for design-centered product direction across Engineering, QA, and Business Analysis.',
      'Design and prototype AI-powered workflows and scaled support solutions for enterprise clients — translating complex operations into intuitive, personalized user journeys.',
      'Communicate the user experience at every stage through flow diagrams, storyboards, and high-fidelity prototypes, driving cross-functional alignment.',
    ],
  },
  {
    role: 'Founder',
    company: 'Sar, Inc.',
    location: 'Boulder, CO',
    period: 'Mar 2025 – Present',
    passionProject: true,
    bullets: [
      'Designing and building an NFC-based digital receipt platform — consumer iOS app, merchant dashboard, Square integration, and Apple Wallet delivery.',
      'End-to-end: product strategy, UX, engineering (Expo / Supabase / Square API / PKPass), and business development.',
      'Active pilots in Boulder and Denver, CO.',
    ],
  },
  {
    role: 'Lead Product Designer',
    company: 'Evernorth Health Services (Cigna)',
    location: 'Boulder, CO (Remote)',
    period: 'Apr 2022 – Apr 2026',
    bullets: [
      'Designed intuitive user journeys for Broadstreet, an enterprise healthcare platform serving 100K+ users at a Fortune 15 company — reducing manual search effort by 90%.',
      'Developed a multi-turn generative AI conversational agent (John Snow), crafting interaction patterns that surface information progressively across automated and human-led support touchpoints.',
      'Integrated user feedback and business requirements into ongoing updates through research, personas, journey maps, and flow diagrams — advocating for user voice across product, engineering, and clinical teams.',
    ],
  },
  {
    role: 'Senior Data Visualization Designer / Developer',
    company: 'Horne LLP',
    location: 'Austin, TX (Hybrid)',
    period: 'Apr 2021 – Apr 2022',
    bullets: [
      'Designed scaled support solutions for a $300M FEMA program, translating complex backend data into clear, decision-ready interfaces across three states.',
      'Applied user-centered design principles and WCAG accessibility standards, prioritizing clarity and actionability for non-technical users.',
      'Iterated on design decisions through stakeholder feedback loops, presenting updates directly to program leadership.',
    ],
  },
];

const EDUCATION = [
  {
    degree: 'MS, Innovation Management & Entrepreneurship',
    school: 'Brown University',
    location: 'Remote from Boulder, CO',
    period: 'Jul 2026 – May 2028',
    current: true,
    note: 'Innovation Management, Go-to-Market Strategy',
  },
  {
    degree: 'Graduate Coursework, Creative Technology & Design',
    school: 'University of Colorado Boulder',
    location: 'Boulder, CO',
    period: 'Jan 2026 – Dec 2026',
    note: 'Hardware prototyping, physical computing, Arduino',
  },
  {
    degree: 'Certificate, User Experience Design',
    school: 'UC Berkeley Extension',
    location: 'Remote',
    period: 'Feb 2021 – Dec 2021',
    note: 'Grade: 3.84 · UX Architecture, Prototyping',
  },
  {
    degree: 'BS, Accounting & Management Information Systems',
    school: 'Iowa State University',
    location: 'Ames, IA',
    period: 'Aug 2015 – Dec 2019',
    note: 'Alpha Delta Pi · Tennis Club · Python, SQL',
  },
];

const CERTIFICATIONS = [
  { name: 'Design Systems', issuer: 'Memorisely', date: 'Nov 2024' },
  { name: 'Virtual Reality & Augmented Reality', issuer: 'MIT xPRO', date: 'Sep 2023' },
  { name: 'Decision Making & Problem Solving', issuer: 'Kepner-Tregoe', date: 'Mar 2018' },
];

const SKILLS = [
  { label: 'Design & AI', items: 'Figma, Figma Make, Wireframes, Prototyping, Generative AI, Conversational UI, Claude' },
  { label: 'Methods', items: 'Agile, Cross-functional collaboration, User research, Journey mapping, WCAG, SQL' },
];

export default function Resume() {
  const { isMobile, isTablet } = useBreakpoint();
  const px = isMobile ? 20 : isTablet ? 32 : 56;

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--text-1)' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: `${isMobile ? 100 : 140}px ${px}px 100px` }}>

        {/* Header */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>Resume</p>
          <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: isMobile ? 'clamp(40px, 10vw, 56px)' : 'clamp(48px, 6vw, 72px)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.0, color: 'var(--text-1)', marginBottom: 16 }}>
            Sara <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Braymen</em>
          </h1>
          <p style={{ fontSize: 15, color: 'var(--text-2)', marginBottom: 28, lineHeight: 1.6 }}>Interaction Design · AI-Powered UX · Human-Centered Systems</p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="/sara-braymen-resume.pdf" download style={{
              fontSize: 12, fontWeight: 600, color: '#fff', background: 'var(--accent)',
              textDecoration: 'none', borderRadius: 100, padding: '8px 18px', transition: 'background 0.15s',
            }}
              onMouseEnter={e => e.target.style.background = 'var(--accent-hover)'} onMouseLeave={e => e.target.style.background = 'var(--accent)'}>
              Download PDF ↓
            </a>
          </div>
        </motion.div>

        {/* Experience */}
        <motion.div {...fadeUp(0.1)} style={{ borderTop: '1px solid var(--border)', paddingTop: 48, marginBottom: 56 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 36 }}>Experience</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {EXPERIENCE.map((job, i) => (
              <motion.div key={i} {...fadeUp(0.12 + i * 0.07)}
                style={{ paddingBottom: 36, marginBottom: 36, borderBottom: i < EXPERIENCE.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 4, flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 18, fontWeight: 400, color: 'var(--text-1)', letterSpacing: '-0.01em' }}>{job.role}</span>
                    {job.current && <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', background: 'var(--accent)', color: '#fff', borderRadius: 100, padding: '2px 8px' }}>Now</span>}
                    {job.passionProject && <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', background: 'var(--accent-warm)', color: '#fff', borderRadius: 100, padding: '2px 8px' }}>Passion project</span>}
                  </div>
                  <span style={{ fontSize: 12, color: 'var(--text-3)', whiteSpace: 'nowrap', flexShrink: 0 }}>{job.period}</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 14 }}>{job.company} · {job.location}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {job.bullets.map((b, j) => (
                    <li key={j} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--accent)', fontSize: 14, lineHeight: '22px', flexShrink: 0 }}>—</span>
                      <span style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.7 }}>{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education */}
        <motion.div {...fadeUp(0.2)} style={{ borderTop: '1px solid var(--border)', paddingTop: 48, marginBottom: 56 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 36 }}>Education</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {EDUCATION.map((ed, i) => (
              <motion.div key={i} {...fadeUp(0.22 + i * 0.07)}
                style={{ paddingBottom: 28, marginBottom: 28, borderBottom: i < EDUCATION.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                      <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 17, fontWeight: 400, color: 'var(--text-1)', letterSpacing: '-0.01em' }}>{ed.degree}</span>
                      {ed.current && <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', background: 'var(--accent)', color: '#fff', borderRadius: 100, padding: '2px 8px' }}>Expected</span>}
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: ed.note ? 6 : 0 }}>{ed.school} · {ed.location}</p>
                    {ed.note && <p style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.5 }}>{ed.note}</p>}
                  </div>
                  <span style={{ fontSize: 12, color: 'var(--text-3)', whiteSpace: 'nowrap', flexShrink: 0 }}>{ed.period}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div {...fadeUp(0.26)} style={{ borderTop: '1px solid var(--border)', paddingTop: 48, marginBottom: 56 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 28 }}>Certifications</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {CERTIFICATIONS.map((c, i) => (
              <motion.div key={i} {...fadeUp(0.28 + i * 0.06)}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, flexWrap: 'wrap', paddingBottom: 16, marginBottom: 16, borderBottom: i < CERTIFICATIONS.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div>
                  <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 16, fontWeight: 400, color: 'var(--text-1)', letterSpacing: '-0.01em' }}>{c.name}</span>
                  <span style={{ fontSize: 13, color: 'var(--text-3)', marginLeft: 10 }}>{c.issuer}</span>
                </div>
                <span style={{ fontSize: 12, color: 'var(--text-3)', whiteSpace: 'nowrap', flexShrink: 0 }}>{c.date}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div {...fadeUp(0.28)} style={{ borderTop: '1px solid var(--border)', paddingTop: 48 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 28 }}>Core competencies</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {SKILLS.map((s, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '160px 1fr', gap: isMobile ? 4 : 20, alignItems: 'baseline' }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-1)', letterSpacing: '0.01em' }}>{s.label}</span>
                <span style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6 }}>{s.items}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}

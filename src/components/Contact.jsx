import { motion } from 'framer-motion';
import { useBreakpoint } from '../hooks/useBreakpoint';

export default function Contact() {
  const { isMobile, isTablet } = useBreakpoint();
  const px = isMobile ? 20 : isTablet ? 32 : 48;

  function openEmail() {
    window.location.href = 'mailto:sarabraymen@gmail.com?subject=Let%27s%20connect&body=Hi%20Sara%2C%0A%0A';
  }

  return (
    <section id="contact" style={{ maxWidth: 1080, margin: '0 auto', padding: `0 ${px}px ${isMobile ? 80 : 120}px` }}>
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 64 }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 40 : 80, alignItems: 'center' }}>

          {/* Left — copy */}
          <div>
            <motion.p
              style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0, margin: "0px 0px 200px 0px" }}>
              Get in touch
            </motion.p>
            <motion.h2
              style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: isMobile ? 32 : 42, fontWeight: 400, letterSpacing: '-0.025em', color: 'var(--text-1)', marginBottom: 20, lineHeight: 1.1 }}
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0, margin: "0px 0px 200px 0px" }}
              transition={{ delay: 0.06 }}>
              Say hi.
            </motion.h2>
            <motion.p
              style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.7, marginBottom: 32 }}
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0, margin: "0px 0px 200px 0px" }}
              transition={{ delay: 0.1 }}>
              {"I'm open to Senior Product Design, PM, and AI product roles. I'd love to hear more about what you're building."}
            </motion.p>
            <motion.div
              style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0, margin: "0px 0px 200px 0px" }}
              transition={{ delay: 0.14 }}>
              <a href="https://www.linkedin.com/in/braymen/" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 14, color: 'var(--text-2)', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => e.target.style.color = 'var(--text-1)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-2)'}>
                LinkedIn ↗
              </a>
            </motion.div>
          </div>

          {/* Right — CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0, margin: "0px 0px 200px 0px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>

            <motion.button
              onClick={openEmail}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '16px 32px',
                borderRadius: 100,
                border: 'none',
                background: 'var(--accent)',
                color: '#fff',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
                letterSpacing: '-0.01em',
                boxShadow: '0 4px 20px rgba(45,64,48,0.2)',
                transition: 'box-shadow 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 28px rgba(45,64,48,0.3)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(45,64,48,0.2)'}
            >
              Email me
            </motion.button>

          </motion.div>

        </div>
      </div>
    </section>
  );
}

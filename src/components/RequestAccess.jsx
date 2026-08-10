import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { MiniCaterpillar } from './Caterpillar';

export default function RequestAccess({ project, onClose }) {
  const [state, handleSubmit] = useForm('xzeprpbb');
  const { isMobile } = useBreakpoint();

  // Close on Escape
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(16,18,16,0.6)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: isMobile ? 20 : 40,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={e => e.stopPropagation()}
          style={{
            background: 'var(--bg)',
            borderRadius: 20,
            padding: isMobile ? '36px 28px' : '52px 56px',
            maxWidth: 520,
            width: '100%',
            position: 'relative',
            boxShadow: '0 32px 80px rgba(16,18,16,0.25), 0 4px 16px rgba(16,18,16,0.1)',
            border: '1px solid var(--border)',
          }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              position: 'absolute', top: 20, right: 20,
              background: 'none', border: '1px solid var(--border)',
              borderRadius: 100, width: 32, height: 32,
              cursor: 'pointer', color: 'var(--text-3)',
              fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'color 0.15s, border-color 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-1)'; e.currentTarget.style.borderColor = 'var(--text-3)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-3)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
          >×</button>

          {state.succeeded ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}><MiniCaterpillar /></div>
              <h2 style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: 28, fontWeight: 400, letterSpacing: '-0.025em',
                color: 'var(--text-1)', marginBottom: 12,
              }}>Request received.</h2>
              <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.7 }}>
                Sara will be in touch soon. In the meantime, feel free to
                explore the rest of the site — or{' '}
                <a href="/play" style={{ color: 'var(--accent)', textDecoration: 'none', borderBottom: '1px solid currentColor' }}>
                  play a game
                </a>
                .
              </p>
            </div>
          ) : (
            <>
              <p style={{
                fontSize: 11, fontWeight: 600, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16,
              }}>Request access</p>

              <h2 style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: isMobile ? 26 : 32, fontWeight: 400,
                letterSpacing: '-0.025em', lineHeight: 1.15,
                color: 'var(--text-1)', marginBottom: 10,
              }}>
                {project?.title ?? 'Case study'}
              </h2>

              <p style={{ fontSize: 14, color: 'var(--text-3)', lineHeight: 1.6, marginBottom: 32 }}>
                Sara shares full case studies directly. Drop your info and she'll send it over.
              </p>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <input type="hidden" name="project" value={project?.title ?? ''} />

                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={labelStyle}>Name</label>
                    <input name="name" required placeholder="Your name" style={inputStyle} />
                    <ValidationError field="name" errors={state.errors} style={{ color: 'var(--accent-warm)', fontSize: 12, marginTop: 4 }} />
                  </div>
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input name="email" type="email" required placeholder="you@company.com" style={inputStyle} />
                    <ValidationError field="email" errors={state.errors} style={{ color: 'var(--accent-warm)', fontSize: 12, marginTop: 4 }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={labelStyle}>Company / Role <span style={{ color: 'var(--text-3)', fontWeight: 400 }}>(optional)</span></label>
                    <input name="company" placeholder="Acme Corp — Product Manager" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone <span style={{ color: 'var(--text-3)', fontWeight: 400 }}>(optional)</span></label>
                    <input name="phone" type="tel" placeholder="+1 (555) 000-0000" style={inputStyle} />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>What are you working on? <span style={{ color: 'var(--text-3)', fontWeight: 400 }}>(optional)</span></label>
                  <textarea name="message" placeholder="Context helps Sara tailor her response." rows={3}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: 80, fontFamily: 'inherit' }} />
                </div>

                <button
                  type="submit"
                  disabled={state.submitting}
                  style={{
                    marginTop: 8,
                    background: 'var(--accent)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 100,
                    padding: '14px 28px',
                    fontSize: 14, fontWeight: 600,
                    cursor: state.submitting ? 'not-allowed' : 'pointer',
                    opacity: state.submitting ? 0.6 : 1,
                    transition: 'background 0.15s, transform 0.15s, opacity 0.15s',
                    alignSelf: 'flex-start',
                  }}
                  onMouseEnter={e => { if (!state.submitting) { e.currentTarget.style.background = 'var(--accent-hover)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  {state.submitting ? 'Sending…' : 'Request access →'}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

const labelStyle = {
  display: 'block',
  fontSize: 11, fontWeight: 600, letterSpacing: '0.06em',
  textTransform: 'uppercase', color: 'var(--text-3)',
  marginBottom: 6,
};

const inputStyle = {
  width: '100%',
  background: 'transparent',
  border: '1px solid var(--border-md)',
  borderRadius: 10,
  padding: '10px 14px',
  fontSize: 14,
  color: 'var(--text-1)',
  fontFamily: 'inherit',
  outline: 'none',
  transition: 'border-color 0.15s',
  boxSizing: 'border-box',
};

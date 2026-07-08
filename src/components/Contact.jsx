import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBreakpoint } from '../hooks/useBreakpoint';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const FIELDS = [
  { name: 'name', label: 'Your name', type: 'text', placeholder: 'Jane Smith', required: true },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'jane@company.com', required: true },
  { name: 'role', label: 'Role / company', type: 'text', placeholder: 'Product Lead at Acme', required: false },
];

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 10,
  padding: '13px 16px',
  fontSize: 14,
  color: '#fff',
  outline: 'none',
  fontFamily: 'inherit',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box',
};

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', role: '', message: '' });
  const [status, setStatus] = useState('idle');
  const { isMobile, isTablet } = useBreakpoint();
  const px = isMobile ? 20 : isTablet ? 32 : 48;

  function set(k, v) { setForm(f => ({ ...f, [k]: v })); }

  async function submit(e) {
    e.preventDefault();
    setStatus('sending');
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}${form.role ? ` — ${form.role}` : ''}`);
    const body = encodeURIComponent(`${form.message}\n\n—\n${form.name}\n${form.email}${form.role ? `\n${form.role}` : ''}`);
    window.location.href = `mailto:sarabraymen@gmail.com?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', role: '', message: '' });
    }, 500);
  }

  return (
    <section id="contact" style={{ maxWidth: 1080, margin: '0 auto', padding: `0 ${px}px ${isMobile ? 80 : 120}px` }}>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 64 }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 40 : 80, alignItems: 'start' }}>

          {/* Left — copy */}
          <div>
            <motion.p
              style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: 16 }}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              Get in touch
            </motion.p>
            <motion.h2
              style={{ fontSize: isMobile ? 26 : 32, fontWeight: 600, letterSpacing: '-0.025em', color: '#fff', marginBottom: 20, lineHeight: 1.2 }}
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.06 }}>
              Say hi.
            </motion.h2>
            <motion.p
              style={{ fontSize: 15, color: 'rgba(255,255,255,0.42)', lineHeight: 1.7, marginBottom: 32 }}
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}>
              {"I'm looking for Senior PM, Product Design, and AI product roles. If you're building something genuinely hard, I'd love to hear about it — even if the timing isn't right yet."}
            </motion.p>
            <motion.div
              style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.14 }}>
              <a href="mailto:sarabraymen@gmail.com"
                style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => e.target.style.color = '#fff'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.45)'}>
                sarabraymen@gmail.com ↗
              </a>
              <a href="https://linkedin.com/in/sarabraymen" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => e.target.style.color = '#fff'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.45)'}>
                LinkedIn ↗
              </a>
            </motion.div>
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  style={{ background: 'rgba(61,158,140,0.08)', border: '1px solid rgba(61,158,140,0.2)', borderRadius: 12, padding: '48px 32px', textAlign: 'center' }}>
                  <p style={{ fontSize: 22, marginBottom: 12 }}>✦</p>
                  <p style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 8 }}>Message sent</p>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)' }}>{"Thanks — I'll be in touch soon."}</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {FIELDS.map(f => (
                    <div key={f.name}>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.4)', marginBottom: 6, letterSpacing: '0.02em' }}>
                        {f.label}{f.required && <span style={{ color: 'var(--coral)', marginLeft: 2 }}>*</span>}
                      </label>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        value={form[f.name]}
                        onChange={e => set(f.name, e.target.value)}
                        required={f.required}
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.25)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                      />
                    </div>
                  ))}

                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.4)', marginBottom: 6, letterSpacing: '0.02em' }}>
                      Message <span style={{ color: 'var(--coral)', marginLeft: 2 }}>*</span>
                    </label>
                    <textarea
                      placeholder="Tell me what you're working on..."
                      value={form.message}
                      onChange={e => set('message', e.target.value)}
                      required
                      rows={4}
                      style={{ ...inputStyle, resize: 'vertical', minHeight: 110 }}
                      onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.25)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>

                  {status === 'error' && (
                    <p style={{ fontSize: 13, color: 'var(--coral)' }}>Something went wrong — try emailing me directly.</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    style={{
                      marginTop: 4,
                      padding: '13px 24px',
                      borderRadius: 100,
                      border: '1px solid rgba(255,255,255,0.15)',
                      background: status === 'sending' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.1)',
                      color: status === 'sending' ? 'rgba(255,255,255,0.35)' : '#fff',
                      fontSize: 13, fontWeight: 600,
                      cursor: status === 'sending' ? 'default' : 'pointer',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      transition: 'all 0.2s',
                      alignSelf: 'flex-start',
                      fontFamily: 'inherit',
                    }}>
                    {status === 'sending' ? 'Sending…' : 'Send message →'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

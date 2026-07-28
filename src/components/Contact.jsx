import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBreakpoint } from '../hooks/useBreakpoint';

const FIELDS = [
  { name: 'name', label: 'Your name', type: 'text', placeholder: 'Jane Smith', required: true },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'jane@company.com', required: true },
  { name: 'role', label: 'Role / company', type: 'text', placeholder: 'Product Lead at Acme', required: false },
];

const inputStyle = {
  width: '100%',
  background: 'var(--bg-surface)',
  border: '1px solid var(--border-md)',
  borderRadius: 10,
  padding: '13px 16px',
  fontSize: 14,
  color: 'var(--text-1)',
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

  function submit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}${form.role ? ` — ${form.role}` : ''}`);
    const body = encodeURIComponent(`${form.message}\n\n—\n${form.name}${form.role ? `\n${form.role}` : ''}\n${form.email}`);
    window.location.href = `mailto:sarabraymen@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <section id="contact" style={{ maxWidth: 1080, margin: '0 auto', padding: `0 ${px}px ${isMobile ? 80 : 120}px` }}>
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 64 }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 40 : 80, alignItems: 'start' }}>

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
              {"I'm open to Senior Product Design, PM, and AI product roles. I'd love to hear more about what you're building and how I can help."}
            </motion.p>
            <motion.div
              style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0, margin: "0px 0px 200px 0px" }}
              transition={{ delay: 0.14 }}>
              <a href="mailto:sarabraymen@gmail.com"
                style={{ fontSize: 14, color: 'var(--text-2)', textDecoration: 'none', transition: 'color 0.15s' }}
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
            </motion.div>
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0, margin: "0px 0px 200px 0px" }}
            transition={{ duration: 0.5, delay: 0.1 }}>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  style={{ background: 'rgba(45,64,48,0.06)', border: '1px solid rgba(45,64,48,0.15)', borderRadius: 12, padding: '48px 32px', textAlign: 'center' }}>
                  <p style={{ fontSize: 22, marginBottom: 12 }}>✦</p>
                  <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-1)', marginBottom: 8 }}>Message sent</p>
                  <p style={{ fontSize: 14, color: 'var(--text-2)' }}>{"Thanks — I'll be in touch soon."}</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {FIELDS.map(f => (
                    <div key={f.name}>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-3)', marginBottom: 6, letterSpacing: '0.02em' }}>
                        {f.label}{f.required && <span style={{ color: 'var(--accent-warm)', marginLeft: 2 }}>*</span>}
                      </label>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        value={form[f.name]}
                        onChange={e => set(f.name, e.target.value)}
                        required={f.required}
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                        onBlur={e => e.target.style.borderColor = 'var(--border-md)'}
                      />
                    </div>
                  ))}

                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-3)', marginBottom: 6, letterSpacing: '0.02em' }}>
                      Message <span style={{ color: 'var(--accent-warm)', marginLeft: 2 }}>*</span>
                    </label>
                    <textarea
                      placeholder="Tell me what you're working on..."
                      value={form.message}
                      onChange={e => set('message', e.target.value)}
                      required
                      rows={4}
                      style={{ ...inputStyle, resize: 'vertical', minHeight: 110 }}
                      onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border-md)'}
                    />
                  </div>

                  {status === 'error' && (
                    <p style={{ fontSize: 13, color: 'var(--accent-warm)' }}>Something went wrong — try emailing me directly.</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    style={{
                      marginTop: 4,
                      padding: '13px 26px',
                      borderRadius: 100,
                      border: 'none',
                      background: status === 'sending' ? 'var(--bg-hover)' : 'var(--accent)',
                      color: status === 'sending' ? 'var(--text-3)' : '#fff',
                      fontSize: 13, fontWeight: 600,
                      cursor: status === 'sending' ? 'default' : 'pointer',
                      transition: 'all 0.2s',
                      alignSelf: 'flex-start',
                      fontFamily: 'inherit',
                    }}
                    onMouseEnter={e => { if (status !== 'sending') e.target.style.background = 'var(--accent-hover)'; }}
                    onMouseLeave={e => { if (status !== 'sending') e.target.style.background = 'var(--accent)'; }}>
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

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import { useBreakpoint } from '../hooks/useBreakpoint';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = SUPABASE_URL && SUPABASE_ANON_KEY
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

const STARTERS = [
  'Tell me about her design process',
  'How does she work with engineers?',
  'Tell me about her AI product work',
  'What kind of team would she thrive in?',
];

function renderMarkdown(text) {
  return text.split('\n').map((line, li) => {
    const parts = line.split(/\*\*(.+?)\*\*/g);
    return (
      <span key={li}>
        {parts.map((part, i) => i % 2 === 1 ? <strong key={i}>{part}</strong> : part)}
        {li < text.split('\n').length - 1 && <br />}
      </span>
    );
  });
}

function Message({ role, content }) {
  const isUser = role === 'user';
  if (!content) return null;
  return (
    <div style={{
      display: 'flex',
      justifyContent: isUser ? 'flex-end' : 'flex-start',
      marginBottom: 10,
    }}>
      <div style={{
        maxWidth: '82%',
        padding: '9px 13px',
        borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
        background: isUser ? 'var(--accent)' : 'var(--bg-surface)',
        border: `1px solid ${isUser ? 'transparent' : 'var(--border-md)'}`,
        fontSize: 13,
        lineHeight: 1.65,
        color: isUser ? '#fff' : 'var(--text-1)',
      }}>
        {isUser ? content : renderMarkdown(content)}
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 10 }}>
      <div style={{
        padding: '12px 16px',
        borderRadius: '16px 16px 16px 4px',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-md)',
        display: 'flex', gap: 4, alignItems: 'center',
      }}>
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent-sage)' }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity }}
          />
        ))}
      </div>
    </div>
  );
}

export default function SaraBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const { isMobile } = useBreakpoint();

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: 'assistant', content: "Hi! I'm Sara's portfolio assistant. Ask me anything about her work, background, or what she's building. ✦" }]);
    }
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streaming]);

  async function send(text) {
    const userText = text ?? input.trim();
    if (!userText || streaming) return;
    setInput('');

    const next = [...messages, { role: 'user', content: userText }];
    setMessages(next);
    setStreaming(true);
    setMessages(m => [...m, { role: 'assistant', content: '' }]);

    try {
      if (!supabase) throw new Error('not_configured');
      const { data: { session } } = await supabase.auth.getSession();
      const headers = {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${session?.access_token ?? SUPABASE_ANON_KEY}`,
      };

      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/sara-chat`,
        { method: 'POST', headers, body: JSON.stringify({ messages: next }) }
      );

      if (!res.ok) throw new Error(await res.text());

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(l => l.startsWith('data: '));
        for (const line of lines) {
          const data = line.slice(6);
          if (data === '[DONE]') break;
          try {
            const parsed = JSON.parse(data);
            if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
              accumulated += parsed.delta.text;
              setMessages(m => {
                const copy = [...m];
                copy[copy.length - 1] = { role: 'assistant', content: accumulated };
                return copy;
              });
            }
          } catch { /* skip malformed SSE lines */ }
        }
      }
    } catch {
      setMessages(m => {
        const copy = [...m];
        copy[copy.length - 1] = { role: 'assistant', content: "Sorry, something went wrong. Try refreshing or email Sara at sarabraymen@gmail.com." };
        return copy;
      });
    } finally {
      setStreaming(false);
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  }

  const showStarters = messages.length <= 1 && !streaming;
  const canSend = input.trim() && !streaming;

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        aria-label={open ? 'Close chat' : 'Ask about Sara'}
        style={{
          position: 'fixed', bottom: 28, right: 28, zIndex: 1000,
          display: 'flex', alignItems: 'center', gap: 9,
          padding: '12px 20px',
          borderRadius: 100,
          background: 'var(--accent)',
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(45,64,48,0.25)',
          fontFamily: 'inherit',
        }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0 }}
              style={{ fontSize: 14, lineHeight: 1 }}>✕</motion.span>
          ) : (
            <motion.span key="icon" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ fontSize: 14 }}>✦</motion.span>
          )}
        </AnimatePresence>
        <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.01em' }}>
          {open ? 'Close' : 'Ask about Sara'}
        </span>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              bottom: isMobile ? 0 : 88,
              right: isMobile ? 0 : 28,
              left: isMobile ? 0 : 'auto',
              zIndex: 999,
              width: isMobile ? '100%' : 380,
              maxHeight: isMobile ? '78vh' : 540,
              borderRadius: isMobile ? '20px 20px 0 0' : 16,
              display: 'flex', flexDirection: 'column',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-md)',
              boxShadow: '0 16px 48px rgba(26,29,26,0.14), 0 4px 12px rgba(26,29,26,0.06)',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '14px 18px',
              borderBottom: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', gap: 12,
              background: 'var(--bg-elevated)',
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'var(--accent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 600, color: '#fff', flexShrink: 0,
              }}>S</div>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)', lineHeight: 1 }}>Sara's Portfolio Agent</p>
                <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 3 }}>Ask me anything about her work</p>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#3D9E6E' }} />
                <span style={{ fontSize: 11, color: 'var(--text-3)' }}>Online</span>
              </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '14px 14px 8px', minHeight: 0 }}>
              {messages.map((m, i) => <Message key={i} role={m.role} content={m.content} />)}
              {streaming && messages[messages.length - 1]?.content === '' && <TypingDots />}
              <div ref={messagesEndRef} />
            </div>

            {/* Starter chips */}
            <AnimatePresence>
              {showStarters && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ padding: '0 14px 10px', display: 'flex', flexWrap: 'wrap', gap: 6 }}
                >
                  {STARTERS.map(s => (
                    <button key={s} onClick={() => send(s)} style={{
                      padding: '6px 12px', borderRadius: 100, cursor: 'pointer',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-md)',
                      color: 'var(--text-2)', fontSize: 12, fontWeight: 500,
                      fontFamily: 'inherit', transition: 'background 0.15s',
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-surface)'}
                    >{s}</button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input */}
            <div style={{
              padding: '10px 12px',
              borderTop: '1px solid var(--border)',
              display: 'flex', gap: 8, alignItems: 'flex-end',
              background: 'var(--bg-elevated)',
            }}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask about Sara's work…"
                rows={1}
                aria-label="Message input"
                style={{
                  flex: 1,
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-md)',
                  borderRadius: 10,
                  padding: '9px 12px',
                  color: 'var(--text-1)',
                  fontSize: 13, resize: 'none',
                  outline: 'none', fontFamily: 'inherit', lineHeight: 1.5,
                  maxHeight: 100, overflowY: 'auto',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border-md)'}
              />
              <motion.button
                onClick={() => send()}
                whileTap={{ scale: 0.92 }}
                disabled={!canSend}
                aria-label="Send message"
                style={{
                  width: 36, height: 36, borderRadius: '50%', cursor: canSend ? 'pointer' : 'default',
                  background: canSend ? 'var(--accent)' : 'var(--bg-hover)',
                  border: 'none',
                  color: canSend ? '#fff' : 'var(--text-3)',
                  fontSize: 16,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.2s, color 0.2s',
                  flexShrink: 0,
                  fontFamily: 'inherit',
                }}
              >↑</motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

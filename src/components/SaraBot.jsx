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

function Message({ role, content }) {
  const isUser = role === 'user';
  return (
    <div style={{
      display: 'flex',
      justifyContent: isUser ? 'flex-end' : 'flex-start',
      marginBottom: 12,
    }}>
      <div style={{
        maxWidth: '82%',
        padding: '10px 14px',
        borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
        background: isUser
          ? 'rgba(111,135,190,0.22)'
          : 'rgba(255,255,255,0.06)',
        border: `1px solid ${isUser ? 'rgba(111,135,190,0.3)' : 'rgba(255,255,255,0.08)'}`,
        fontSize: 14,
        lineHeight: 1.55,
        color: isUser ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.78)',
        whiteSpace: 'pre-wrap',
      }}>
        {content}
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 12 }}>
      <div style={{
        padding: '12px 16px',
        borderRadius: '16px 16px 16px 4px',
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', gap: 4, alignItems: 'center',
      }}>
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(111,135,190,0.6)' }}
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

    // Add empty assistant message that we'll fill as we stream
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
          } catch {
            // skip malformed SSE lines
          }
        }
      }
    } catch (err) {
      setMessages(m => {
        const copy = [...m];
        copy[copy.length - 1] = { role: 'assistant', content: "Sorry, something went wrong. Try refreshing or email Sara directly at sarabraymen@gmail.com." };
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

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed', bottom: 28, right: 28, zIndex: 1000,
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '14px 22px',
          borderRadius: 100,
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.18)',
          backdropFilter: 'blur(28px) saturate(1.5)',
          WebkitBackdropFilter: 'blur(28px) saturate(1.5)',
          color: '#fff', cursor: 'pointer',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 8px 32px rgba(0,0,0,0.45), 0 0 0 0.5px rgba(232,112,90,0.2)',
        }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0 }}
              style={{ fontSize: 18, lineHeight: 1 }}>✕</motion.span>
          ) : (
            <motion.span key="icon" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ fontSize: 16 }}>✦</motion.span>
          )}
        </AnimatePresence>
        <span style={{ fontSize: 13, fontWeight: 500, letterSpacing: '0.01em', color: 'rgba(255,255,255,0.85)' }}>
          {open ? 'Close' : 'Ask about Sara'}
        </span>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              bottom: isMobile ? 0 : 90,
              right: isMobile ? 0 : 28,
              left: isMobile ? 0 : 'auto',
              zIndex: 999,
              width: isMobile ? '100%' : 380,
              maxHeight: isMobile ? '75vh' : 540,
              borderRadius: isMobile ? '20px 20px 0 0' : 20,
              display: 'flex', flexDirection: 'column',
              background: 'rgba(22,20,18,0.96)',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(32px)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 60px rgba(111,135,190,0.08)',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(111,135,190,0.4), rgba(139,111,190,0.3))',
                border: '1px solid rgba(111,135,190,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 600, color: '#6F87BE',
              }}>S</div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#fff', lineHeight: 1 }}>Sara's Portfolio Agent</p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>Ask me anything about her work</p>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4CAF80' }} />
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>Online</span>
              </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 8px', minHeight: 0 }}>
              {messages.map((m, i) => <Message key={i} role={m.role} content={m.content} />)}
              {streaming && messages[messages.length - 1]?.content === '' && <TypingDots />}
              <div ref={messagesEndRef} />
            </div>

            {/* Starter chips */}
            <AnimatePresence>
              {showStarters && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ padding: '0 16px 12px', display: 'flex', flexWrap: 'wrap', gap: 6 }}
                >
                  {STARTERS.map(s => (
                    <button key={s} onClick={() => send(s)} style={{
                      padding: '6px 12px', borderRadius: 100, cursor: 'pointer',
                      background: 'rgba(111,135,190,0.1)', border: '1px solid rgba(111,135,190,0.2)',
                      color: 'rgba(255,255,255,0.65)', fontSize: 12, fontWeight: 500,
                    }}>{s}</button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input */}
            <div style={{
              padding: '10px 12px',
              borderTop: '1px solid rgba(255,255,255,0.07)',
              display: 'flex', gap: 8, alignItems: 'flex-end',
            }}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask about Sara's work…"
                rows={1}
                style={{
                  flex: 1, background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12,
                  padding: '9px 13px', color: '#fff', fontSize: 13, resize: 'none',
                  outline: 'none', fontFamily: 'inherit', lineHeight: 1.5,
                  maxHeight: 100, overflowY: 'auto',
                }}
              />
              <motion.button
                onClick={() => send()}
                whileTap={{ scale: 0.92 }}
                disabled={!input.trim() || streaming}
                style={{
                  width: 36, height: 36, borderRadius: '50%', cursor: 'pointer',
                  background: input.trim() && !streaming ? '#6F87BE' : 'rgba(255,255,255,0.08)',
                  border: 'none', color: '#fff', fontSize: 16,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.2s',
                  flexShrink: 0,
                }}
              >↑</motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

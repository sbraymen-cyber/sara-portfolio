import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const LABELS = [
  '🎮 play?',
  'nope →',
  'too slow 👀',
  'almost...',
  'ok fine →',
];

const BUTTON_W = 100;
const BUTTON_H = 40;
const FLEE_RADIUS = 130;

function safePos(avoidX, avoidY) {
  const pad = 32;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  for (let i = 0; i < 20; i++) {
    const x = pad + Math.random() * (vw - BUTTON_W - pad * 2);
    const y = pad + Math.random() * (vh - BUTTON_H - pad * 2);
    const dx = x + BUTTON_W / 2 - avoidX;
    const dy = y + BUTTON_H / 2 - avoidY;
    if (Math.sqrt(dx * dx + dy * dy) > FLEE_RADIUS * 2.5) return { x, y };
  }
  // Fallback to opposite corner
  return {
    x: avoidX > vw / 2 ? pad : vw - BUTTON_W - pad,
    y: avoidY > vh / 2 ? pad : vh - BUTTON_H - pad,
  };
}

export default function RunawayButton() {
  const navigate = useNavigate();
  const [pos, setPos] = useState({ x: 64, y: -200 }); // start off-screen, enter from top
  const [label, setLabel] = useState(LABELS[0]);
  const [escapes, setEscapes] = useState(0);
  const [tired, setTired] = useState(false);
  const [visible, setVisible] = useState(false);
  const cooldown = useRef(false);
  const posRef = useRef(pos);
  posRef.current = pos;

  // Drop in after a short delay
  useEffect(() => {
    const t = setTimeout(() => {
      setPos({ x: 64, y: window.innerHeight - 100 });
      setVisible(true);
    }, 2800);
    return () => clearTimeout(t);
  }, []);

  // Mouse chase logic
  useEffect(() => {
    const onMove = e => {
      if (cooldown.current || tired) return;
      const p = posRef.current;
      const cx = p.x + BUTTON_W / 2;
      const cy = p.y + BUTTON_H / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      if (Math.sqrt(dx * dx + dy * dy) < FLEE_RADIUS) {
        cooldown.current = true;
        setEscapes(n => {
          const next = n + 1;
          setLabel(LABELS[Math.min(next, LABELS.length - 1)]);
          if (next >= 4) setTired(true);
          return next;
        });
        setPos(safePos(e.clientX, e.clientY));
        setTimeout(() => { cooldown.current = false; }, 450);
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [tired]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.button
        key="runaway"
        animate={{ x: pos.x, y: pos.y, rotate: tired ? 0 : escapes > 0 ? [-2, 2, -1, 0] : 0 }}
        transition={{
          x: { type: 'spring', stiffness: tired ? 60 : 280, damping: tired ? 18 : 22 },
          y: { type: 'spring', stiffness: tired ? 60 : 280, damping: tired ? 18 : 22 },
          rotate: { duration: 0.3 },
        }}
        onClick={() => navigate('/play')}
        whileHover={{ scale: tired ? 1.08 : 1 }}
        whileTap={{ scale: 0.94 }}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          zIndex: 999,
          background: tired ? 'var(--accent)' : 'rgba(255,255,255,0.9)',
          color: tired ? '#fff' : 'var(--text-2)',
          border: tired ? 'none' : '1px solid var(--border-md)',
          borderRadius: 100,
          padding: '10px 18px',
          fontSize: 13,
          fontWeight: 600,
          fontFamily: 'Inter, sans-serif',
          cursor: tired ? 'pointer' : 'default',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: tired
            ? '0 4px 24px rgba(45,64,48,0.25)'
            : '0 2px 12px rgba(26,29,26,0.1)',
          width: BUTTON_W,
          height: BUTTON_H,
          whiteSpace: 'nowrap',
          userSelect: 'none',
          pointerEvents: 'all',
          letterSpacing: '0.01em',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.3s, color 0.3s, border 0.3s, box-shadow 0.3s',
        }}
        aria-label="Play a game"
      >
        {label}
      </motion.button>
    </AnimatePresence>
  );
}

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const W = 72, H = 56;
const FLEE_RADIUS = 150;

function safePos(avoidX, avoidY) {
  const pad = 40;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  for (let i = 0; i < 20; i++) {
    const x = pad + Math.random() * (vw - W - pad * 2);
    const y = pad + Math.random() * (vh - H - pad * 2);
    const dx = x + W / 2 - avoidX;
    const dy = y + H / 2 - avoidY;
    if (Math.sqrt(dx * dx + dy * dy) > FLEE_RADIUS * 2.5) return { x, y };
  }
  return {
    x: avoidX > window.innerWidth / 2 ? pad : window.innerWidth - W - pad,
    y: avoidY > window.innerHeight / 2 ? pad : window.innerHeight - H - pad,
  };
}

function ButterflySVG({ flapping, landed }) {
  const wingsVariants = {
    flap: {
      scaleX: [1, 0.12, 1, 0.08, 1],
      transition: { duration: 0.55, repeat: Infinity, ease: 'easeInOut' },
    },
    landed: {
      scaleX: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const cx = 36, cy = 30;

  return (
    <svg width={W} height={H} viewBox="0 0 72 56" aria-hidden="true" style={{ display: 'block', filter: 'drop-shadow(0 3px 10px rgba(91,79,140,0.35))' }}>
      {/* Left wings */}
      <motion.g
        variants={wingsVariants}
        animate={landed ? 'landed' : flapping ? 'flap' : 'flap'}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      >
        {/* Left upper wing */}
        <path
          d={`M ${cx} ${cy} C ${cx-16} ${cy-20}, ${cx-34} ${cy-22}, ${cx-30} ${cy-4} C ${cx-26} ${cy+8}, ${cx-10} ${cy+6}, ${cx} ${cy}`}
          fill="#8B6FE8"
          opacity="0.92"
        />
        {/* Left upper wing overlay (pattern) */}
        <circle cx={cx-20} cy={cy-10} r={4} fill="rgba(255,255,255,0.2)" />
        <circle cx={cx-26} cy={cy-2} r={2.5} fill="#D88A6E" opacity="0.7" />

        {/* Left lower wing */}
        <path
          d={`M ${cx} ${cy} C ${cx-14} ${cy+4}, ${cx-28} ${cy+16}, ${cx-22} ${cy+22} C ${cx-16} ${cy+26}, ${cx-6} ${cy+16}, ${cx} ${cy}`}
          fill="#7C5CBF"
          opacity="0.88"
        />
        <circle cx={cx-16} cy={cy+16} r={3} fill="#D88A6E" opacity="0.65" />

        {/* Right upper wing */}
        <path
          d={`M ${cx} ${cy} C ${cx+16} ${cy-20}, ${cx+34} ${cy-22}, ${cx+30} ${cy-4} C ${cx+26} ${cy+8}, ${cx+10} ${cy+6}, ${cx} ${cy}`}
          fill="#8B6FE8"
          opacity="0.92"
        />
        <circle cx={cx+20} cy={cy-10} r={4} fill="rgba(255,255,255,0.2)" />
        <circle cx={cx+26} cy={cy-2} r={2.5} fill="#D88A6E" opacity="0.7" />

        {/* Right lower wing */}
        <path
          d={`M ${cx} ${cy} C ${cx+14} ${cy+4}, ${cx+28} ${cy+16}, ${cx+22} ${cy+22} C ${cx+16} ${cy+26}, ${cx+6} ${cy+16}, ${cx} ${cy}`}
          fill="#7C5CBF"
          opacity="0.88"
        />
        <circle cx={cx+16} cy={cy+16} r={3} fill="#D88A6E" opacity="0.65" />
      </motion.g>

      {/* Body */}
      <ellipse cx={cx} cy={cy} rx={2.5} ry={10} fill="#2D4030" />
      <ellipse cx={cx} cy={cy-10} rx={3.5} ry={4} fill="#3D6B52" />

      {/* Antennae */}
      <motion.line
        x1={cx-1} y1={cy-13} x2={cx-12} y2={cy-26}
        stroke="#2D4030" strokeWidth="1.2" strokeLinecap="round"
        animate={{ rotate: [-15, 15, -15] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: `${cx-1}px ${cy-13}px` }}
      />
      <circle cx={cx-12} cy={cy-26} r={2} fill="#D88A6E" />
      <motion.line
        x1={cx+1} y1={cy-13} x2={cx+12} y2={cy-26}
        stroke="#2D4030" strokeWidth="1.2" strokeLinecap="round"
        animate={{ rotate: [12, -12, 12] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.25 }}
        style={{ transformOrigin: `${cx+1}px ${cy-13}px` }}
      />
      <circle cx={cx+12} cy={cy-26} r={2} fill="#D88A6E" />

      {/* Landed: soft glow ring */}
      {landed && (
        <motion.ellipse
          cx={cx} cy={cy+14} rx={18} ry={5}
          fill="rgba(139,111,232,0.15)"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </svg>
  );
}

export default function ButterflyButton() {
  const navigate = useNavigate();
  const [pos, setPos] = useState({ x: 80, y: -200 });
  const [visible, setVisible] = useState(false);
  const [escapes, setEscapes] = useState(0);
  const [tired, setTired] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const cooldown = useRef(false);
  const posRef = useRef(pos);
  posRef.current = pos;

  // Drift in from off-screen
  useEffect(() => {
    const t = setTimeout(() => {
      setPos({ x: window.innerWidth * 0.15, y: window.innerHeight * 0.75 });
      setVisible(true);
    }, 3200);
    return () => clearTimeout(t);
  }, []);

  // Show label once tired
  useEffect(() => {
    if (tired) {
      const t = setTimeout(() => setShowLabel(true), 600);
      return () => clearTimeout(t);
    }
  }, [tired]);

  // Mouse flee
  useEffect(() => {
    const onMove = e => {
      if (cooldown.current || tired) return;
      const p = posRef.current;
      const cx = p.x + W / 2, cy = p.y + H / 2;
      const dx = e.clientX - cx, dy = e.clientY - cy;
      if (Math.sqrt(dx * dx + dy * dy) < FLEE_RADIUS) {
        cooldown.current = true;
        setEscapes(n => {
          const next = n + 1;
          if (next >= 4) setTired(true);
          return next;
        });
        setPos(safePos(e.clientX, e.clientY));
        setTimeout(() => { cooldown.current = false; }, 500);
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [tired]);

  if (!visible) return null;

  return (
    <motion.div
      animate={{ x: pos.x, y: pos.y }}
      transition={{
        x: { type: 'spring', stiffness: tired ? 50 : 260, damping: tired ? 16 : 20 },
        y: { type: 'spring', stiffness: tired ? 50 : 260, damping: tired ? 16 : 20 },
      }}
      onClick={tired ? () => navigate('/philosophy') : undefined}
      style={{
        position: 'fixed', top: 0, left: 0, zIndex: 999,
        cursor: tired ? 'pointer' : 'default',
        pointerEvents: 'all',
        userSelect: 'none',
        width: W, height: H,
      }}
    >
      <ButterflySVG flapping={!tired} landed={tired} />
      {showLabel && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute', bottom: -22, left: '50%', transform: 'translateX(-50%)',
            whiteSpace: 'nowrap', fontSize: 11, fontWeight: 600,
            color: '#8B6FE8', letterSpacing: '0.04em', fontFamily: 'Inter, sans-serif',
          }}
        >
          follow me →
        </motion.div>
      )}
    </motion.div>
  );
}

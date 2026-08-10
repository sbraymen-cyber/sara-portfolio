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
  const cx = 36, cy = 30;

  return (
    <svg width={W} height={H} viewBox="0 0 72 56" aria-hidden="true" style={{ display: 'block', filter: 'drop-shadow(0 4px 14px rgba(200,100,20,0.3))' }}>
      <motion.g
        animate={landed ? { scaleX: 1 } : { scaleX: [1, 0.1, 1, 0.08, 1] }}
        transition={landed
          ? { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
          : { duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      >
        {/* ── Left upper wing ── */}
        <path d={`M${cx},${cy} C${cx-14},${cy-18} ${cx-32},${cy-20} ${cx-28},${cy-3} C${cx-24},${cy+10} ${cx-9},${cy+7} ${cx},${cy}`}
          fill="#E07820" />
        {/* black border */}
        <path d={`M${cx},${cy} C${cx-14},${cy-18} ${cx-32},${cy-20} ${cx-28},${cy-3} C${cx-24},${cy+10} ${cx-9},${cy+7} ${cx},${cy}`}
          fill="none" stroke="#1A1209" strokeWidth="2.5" />
        {/* vein */}
        <path d={`M${cx},${cy} C${cx-10},${cy-8} ${cx-22},${cy-12} ${cx-26},${cy-6}`}
          fill="none" stroke="#1A1209" strokeWidth="1" opacity="0.5" />
        {/* white spots along edge */}
        <circle cx={cx-26} cy={cy-14} r={2.2} fill="white" opacity="0.9" />
        <circle cx={cx-30} cy={cy-5} r={1.8} fill="white" opacity="0.85" />
        <circle cx={cx-22} cy={cy-18} r={1.5} fill="white" opacity="0.8" />
        <circle cx={cx-14} cy={cy-20} r={1.4} fill="white" opacity="0.75" />

        {/* ── Left lower wing ── */}
        <path d={`M${cx},${cy} C${cx-12},${cy+5} ${cx-26},${cy+18} ${cx-20},${cy+24} C${cx-14},${cy+28} ${cx-5},${cy+17} ${cx},${cy}`}
          fill="#E07820" />
        <path d={`M${cx},${cy} C${cx-12},${cy+5} ${cx-26},${cy+18} ${cx-20},${cy+24} C${cx-14},${cy+28} ${cx-5},${cy+17} ${cx},${cy}`}
          fill="none" stroke="#1A1209" strokeWidth="2.5" />
        <circle cx={cx-18} cy={cx-4} r={2} fill="white" opacity="0.85" />
        <circle cx={cx-22} cy={cy+20} r={2.2} fill="white" opacity="0.9" />
        <circle cx={cx-12} cy={cy+24} r={1.6} fill="white" opacity="0.8" />

        {/* ── Right upper wing ── */}
        <path d={`M${cx},${cy} C${cx+14},${cy-18} ${cx+32},${cy-20} ${cx+28},${cy-3} C${cx+24},${cy+10} ${cx+9},${cy+7} ${cx},${cy}`}
          fill="#E07820" />
        <path d={`M${cx},${cy} C${cx+14},${cy-18} ${cx+32},${cy-20} ${cx+28},${cy-3} C${cx+24},${cy+10} ${cx+9},${cy+7} ${cx},${cy}`}
          fill="none" stroke="#1A1209" strokeWidth="2.5" />
        <path d={`M${cx},${cy} C${cx+10},${cy-8} ${cx+22},${cy-12} ${cx+26},${cy-6}`}
          fill="none" stroke="#1A1209" strokeWidth="1" opacity="0.5" />
        <circle cx={cx+26} cy={cy-14} r={2.2} fill="white" opacity="0.9" />
        <circle cx={cx+30} cy={cy-5} r={1.8} fill="white" opacity="0.85" />
        <circle cx={cx+22} cy={cy-18} r={1.5} fill="white" opacity="0.8" />
        <circle cx={cx+14} cy={cy-20} r={1.4} fill="white" opacity="0.75" />

        {/* ── Right lower wing ── */}
        <path d={`M${cx},${cy} C${cx+12},${cy+5} ${cx+26},${cy+18} ${cx+20},${cy+24} C${cx+14},${cy+28} ${cx+5},${cy+17} ${cx},${cy}`}
          fill="#E07820" />
        <path d={`M${cx},${cy} C${cx+12},${cy+5} ${cx+26},${cy+18} ${cx+20},${cy+24} C${cx+14},${cy+28} ${cx+5},${cy+17} ${cx},${cy}`}
          fill="none" stroke="#1A1209" strokeWidth="2.5" />
        <circle cx={cx+22} cy={cy+20} r={2.2} fill="white" opacity="0.9" />
        <circle cx={cx+12} cy={cy+24} r={1.6} fill="white" opacity="0.8" />
      </motion.g>

      {/* Body — black like a real monarch */}
      <ellipse cx={cx} cy={cy+2} rx={2.8} ry={11} fill="#1A1209" />
      <ellipse cx={cx} cy={cy-9} rx={4} ry={4.5} fill="#1A1209" />
      {/* white head dots */}
      <circle cx={cx-2} cy={cy-11} r={1} fill="white" opacity="0.7" />
      <circle cx={cx+2} cy={cy-11} r={1} fill="white" opacity="0.7" />

      {/* Antennae */}
      <motion.line x1={cx-1} y1={cy-13} x2={cx-11} y2={cy-26}
        stroke="#1A1209" strokeWidth="1.3" strokeLinecap="round"
        animate={{ rotate: [-12, 12, -12] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: `${cx-1}px ${cy-13}px` }}
      />
      <circle cx={cx-11} cy={cy-26} r={2.2} fill="#1A1209" />
      <motion.line x1={cx+1} y1={cy-13} x2={cx+11} y2={cy-26}
        stroke="#1A1209" strokeWidth="1.3" strokeLinecap="round"
        animate={{ rotate: [10, -10, 10] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        style={{ transformOrigin: `${cx+1}px ${cy-13}px` }}
      />
      <circle cx={cx+11} cy={cy-26} r={2.2} fill="#1A1209" />

      {landed && (
        <motion.ellipse cx={cx} cy={cy+16} rx={20} ry={5}
          fill="rgba(224,120,32,0.15)"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6 }}
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
        x: { type: 'spring', stiffness: tired ? 22 : 65, damping: tired ? 18 : 28 },
        y: { type: 'spring', stiffness: tired ? 22 : 65, damping: tired ? 18 : 28 },
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
            color: '#E07820', letterSpacing: '0.04em', fontFamily: 'Inter, sans-serif',
          }}
        >
          follow me →
        </motion.div>
      )}
    </motion.div>
  );
}

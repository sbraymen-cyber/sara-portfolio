import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const W = 88, H = 70;
const FLEE_RADIUS = 140;

// Sophisticated amber-orange, not cartoonish
const WING = '#C96B10';
const WING_SHADOW = '#A8540C';
const INK = '#0E0900';

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

function VortexTransition() {
  return (
    <>
      <style>{`
        @keyframes vortexRing {
          0%   { transform: rotate(0deg) scale(0.1); opacity: 0.85; }
          100% { transform: rotate(600deg) scale(9); opacity: 0; }
        }
        @keyframes vortexFill {
          0%   { opacity: 0; }
          50%  { opacity: 1; }
          100% { opacity: 1; background: #F7F6F2; }
        }
      `}</style>
      <div style={{
        position: 'fixed', inset: 0, zIndex: 9998,
        pointerEvents: 'none',
        animation: 'vortexFill 1.05s ease forwards',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {[0, 0.07, 0.14].map((delay, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: 80, height: 80, borderRadius: '50%',
            border: `${3 - i}px solid rgba(201,107,16,${0.6 - i * 0.15})`,
            animation: `vortexRing ${0.88 + i * 0.06}s cubic-bezier(0.2,0,0.8,1) ${delay}s forwards`,
          }} />
        ))}
      </div>
    </>
  );
}

function ButterflySVG({ landed }) {
  const cx = 44, cy = 30;

  return (
    <svg
      width={W} height={H}
      viewBox="0 0 88 70"
      style={{
        display: 'block',
        filter: 'drop-shadow(0 4px 12px rgba(150,70,8,0.18))',
        overflow: 'visible',
      }}
    >
      <motion.g
        animate={landed
          ? { scaleX: 1 }
          : { scaleX: [1, 0.08, 1, 0.06, 1] }
        }
        transition={landed
          ? { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
          : { duration: 1.6, repeat: Infinity, ease: [0.4, 0, 0.6, 1] }
        }
        style={{ transformOrigin: `${cx}px ${cy + 4}px` }}
      >
        {/* ─── Left forewing ─── */}
        <path
          d={`M ${cx},22 C ${cx-6},10 ${cx-22},2 ${cx-36},7 C ${cx-44},12 ${cx-42},24 ${cx-30},30 C ${cx-18},35 ${cx-6},35 ${cx},33 Z`}
          fill={WING}
        />
        {/* forewing border */}
        <path
          d={`M ${cx},22 C ${cx-6},10 ${cx-22},2 ${cx-36},7 C ${cx-44},12 ${cx-42},24 ${cx-30},30 C ${cx-18},35 ${cx-6},35 ${cx},33 Z`}
          fill="none" stroke={INK} strokeWidth="3.2" strokeLinejoin="round"
        />
        {/* forewing veins — 2 subtle ones */}
        <path d={`M ${cx},28 C ${cx-12},22 ${cx-26},14 ${cx-36},10`} fill="none" stroke={INK} strokeWidth="1" opacity="0.38"/>
        <path d={`M ${cx},28 C ${cx-8},18 ${cx-16},10 ${cx-22},6`} fill="none" stroke={INK} strokeWidth="0.8" opacity="0.25"/>
        {/* forewing white edge dots */}
        <circle cx={cx-37} cy={6}  r={2.6} fill="white" opacity="0.9"/>
        <circle cx={cx-26} cy={2}  r={2}   fill="white" opacity="0.82"/>
        <circle cx={cx-44} cy={16} r={2.2} fill="white" opacity="0.85"/>
        <circle cx={cx-43} cy={26} r={1.8} fill="white" opacity="0.78"/>

        {/* ─── Left hindwing ─── */}
        <path
          d={`M ${cx},33 C ${cx-10},38 ${cx-28},46 ${cx-28},56 C ${cx-28},64 ${cx-16},66 ${cx-6},62 C ${cx+2},57 ${cx},46 ${cx},33 Z`}
          fill={WING_SHADOW}
        />
        <path
          d={`M ${cx},33 C ${cx-10},38 ${cx-28},46 ${cx-28},56 C ${cx-28},64 ${cx-16},66 ${cx-6},62 C ${cx+2},57 ${cx},46 ${cx},33 Z`}
          fill="none" stroke={INK} strokeWidth="3.2" strokeLinejoin="round"
        />
        <path d={`M ${cx},38 C ${cx-10},42 ${cx-22},50 ${cx-26},58`} fill="none" stroke={INK} strokeWidth="0.9" opacity="0.35"/>
        <circle cx={cx-27} cy={58} r={2.4} fill="white" opacity="0.88"/>
        <circle cx={cx-18} cy={64} r={2}   fill="white" opacity="0.8"/>
        <circle cx={cx-7}  cy={64} r={1.8} fill="white" opacity="0.75"/>

        {/* ─── Right forewing ─── */}
        <path
          d={`M ${cx},22 C ${cx+6},10 ${cx+22},2 ${cx+36},7 C ${cx+44},12 ${cx+42},24 ${cx+30},30 C ${cx+18},35 ${cx+6},35 ${cx},33 Z`}
          fill={WING}
        />
        <path
          d={`M ${cx},22 C ${cx+6},10 ${cx+22},2 ${cx+36},7 C ${cx+44},12 ${cx+42},24 ${cx+30},30 C ${cx+18},35 ${cx+6},35 ${cx},33 Z`}
          fill="none" stroke={INK} strokeWidth="3.2" strokeLinejoin="round"
        />
        <path d={`M ${cx},28 C ${cx+12},22 ${cx+26},14 ${cx+36},10`} fill="none" stroke={INK} strokeWidth="1" opacity="0.38"/>
        <path d={`M ${cx},28 C ${cx+8},18 ${cx+16},10 ${cx+22},6`}   fill="none" stroke={INK} strokeWidth="0.8" opacity="0.25"/>
        <circle cx={cx+37} cy={6}  r={2.6} fill="white" opacity="0.9"/>
        <circle cx={cx+26} cy={2}  r={2}   fill="white" opacity="0.82"/>
        <circle cx={cx+44} cy={16} r={2.2} fill="white" opacity="0.85"/>
        <circle cx={cx+43} cy={26} r={1.8} fill="white" opacity="0.78"/>

        {/* ─── Right hindwing ─── */}
        <path
          d={`M ${cx},33 C ${cx+10},38 ${cx+28},46 ${cx+28},56 C ${cx+28},64 ${cx+16},66 ${cx+6},62 C ${cx-2},57 ${cx},46 ${cx},33 Z`}
          fill={WING_SHADOW}
        />
        <path
          d={`M ${cx},33 C ${cx+10},38 ${cx+28},46 ${cx+28},56 C ${cx+28},64 ${cx+16},66 ${cx+6},62 C ${cx-2},57 ${cx},46 ${cx},33 Z`}
          fill="none" stroke={INK} strokeWidth="3.2" strokeLinejoin="round"
        />
        <path d={`M ${cx},38 C ${cx+10},42 ${cx+22},50 ${cx+26},58`} fill="none" stroke={INK} strokeWidth="0.9" opacity="0.35"/>
        <circle cx={cx+27} cy={58} r={2.4} fill="white" opacity="0.88"/>
        <circle cx={cx+18} cy={64} r={2}   fill="white" opacity="0.8"/>
        <circle cx={cx+7}  cy={64} r={1.8} fill="white" opacity="0.75"/>
      </motion.g>

      {/* ─── Body ─── */}
      <ellipse cx={cx} cy={cy+8} rx={2.8} ry={13} fill={INK} />
      {/* thorax */}
      <ellipse cx={cx} cy={cy-4} rx={4}   ry={5}  fill={INK} />

      {/* ─── Antennae ─── */}
      <motion.line
        x1={cx-1} y1={cy-8} x2={cx-14} y2={cy-24}
        stroke={INK} strokeWidth="1.4" strokeLinecap="round"
        animate={{ rotate: [-8, 8, -8] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: `${cx-1}px ${cy-8}px` }}
      />
      <circle cx={cx-14} cy={cy-24} r={2.8} fill={INK} />

      <motion.line
        x1={cx+1} y1={cy-8} x2={cx+14} y2={cy-24}
        stroke={INK} strokeWidth="1.4" strokeLinecap="round"
        animate={{ rotate: [7, -7, 7] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        style={{ transformOrigin: `${cx+1}px ${cy-8}px` }}
      />
      <circle cx={cx+14} cy={cy-24} r={2.8} fill={INK} />

      {/* Landed shadow */}
      {landed && (
        <motion.ellipse
          cx={cx} cy={68} rx={22} ry={4}
          fill="rgba(201,107,16,0.12)"
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
  const [tired, setTired] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const cooldown = useRef(false);
  const posRef = useRef(pos);
  posRef.current = pos;

  useEffect(() => {
    const t = setTimeout(() => {
      setPos({ x: window.innerWidth * 0.15, y: window.innerHeight * 0.75 });
      setVisible(true);
    }, 3200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (tired) {
      const t = setTimeout(() => setShowLabel(true), 600);
      return () => clearTimeout(t);
    }
  }, [tired]);

  useEffect(() => {
    let escapes = 0;
    const onMove = e => {
      if (cooldown.current || tired) return;
      const p = posRef.current;
      const bcx = p.x + W / 2, bcy = p.y + H / 2;
      const dx = e.clientX - bcx, dy = e.clientY - bcy;
      if (Math.sqrt(dx * dx + dy * dy) < FLEE_RADIUS) {
        cooldown.current = true;
        escapes += 1;
        if (escapes >= 4) setTired(true);
        setPos(safePos(e.clientX, e.clientY));
        setTimeout(() => { cooldown.current = false; }, 600);
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [tired]);

  if (!visible) return null;

  return (
    <>
      {transitioning && <VortexTransition />}
      <motion.div
        animate={{ x: pos.x, y: pos.y }}
        transition={{
          x: { type: 'spring', stiffness: tired ? 22 : 65, damping: tired ? 18 : 28 },
          y: { type: 'spring', stiffness: tired ? 22 : 65, damping: tired ? 18 : 28 },
        }}
        onClick={tired && !transitioning ? () => {
          setTransitioning(true);
          setTimeout(() => navigate('/play'), 1050);
        } : undefined}
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 999,
          cursor: tired ? 'pointer' : 'default',
          pointerEvents: 'all',
          userSelect: 'none',
          width: W, height: H,
        }}
      >
        <ButterflySVG landed={tired} />
        {showLabel && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'absolute', bottom: -22, left: '50%', transform: 'translateX(-50%)',
              whiteSpace: 'nowrap', fontSize: 11, fontWeight: 600,
              color: '#C96B10', letterSpacing: '0.05em', fontFamily: 'Inter, sans-serif',
            }}
          >
            catch me →
          </motion.div>
        )}
      </motion.div>
    </>
  );
}

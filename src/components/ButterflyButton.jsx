import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const W = 92, H = 76;
const FLEE_RADIUS = 150;
const ORANGE = '#E8841A';
const BLACK = '#100C00';

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

function ButterflySVG({ landed }) {
  const flapTransition = {
    duration: 1.3,
    repeat: Infinity,
    ease: [0.45, 0, 0.55, 1],
    repeatType: 'mirror',
  };

  return (
    <div style={{
      width: W, height: H,
      position: 'relative',
      perspective: '180px',
      perspectiveOrigin: '50% 46%',
      filter: 'drop-shadow(0 8px 20px rgba(180,90,10,0.22))',
    }}>

      {/* ── Left wing group ── */}
      <motion.div
        style={{
          position: 'absolute',
          right: '50%', top: 0,
          width: 48, height: H,
          transformOrigin: 'right 38%',
          transformStyle: 'preserve-3d',
        }}
        animate={landed ? { rotateY: -28 } : { rotateY: [0, -72, 0] }}
        transition={landed ? { duration: 0.7, ease: [0.16,1,0.3,1] } : flapTransition}
      >
        <svg width="48" height={H} viewBox="0 0 48 76" overflow="visible" style={{ display: 'block' }}>
          {/* Upper forewing */}
          <path d="M 48,26 C 42,10 24,0 6,9 C -5,16 -3,30 12,36 C 26,41 40,40 48,38 Z"
            fill={ORANGE} />
          <path d="M 48,26 C 42,10 24,0 6,9 C -5,16 -3,30 12,36 C 26,41 40,40 48,38 Z"
            fill="none" stroke={BLACK} strokeWidth="4" strokeLinejoin="round" />
          {/* Forewing veins */}
          <path d="M 48,32 C 36,26 22,18 8,13" fill="none" stroke={BLACK} strokeWidth="1.3" opacity="0.5"/>
          <path d="M 48,32 C 40,22 28,13 18,8" fill="none" stroke={BLACK} strokeWidth="1" opacity="0.35"/>
          {/* Forewing white spots */}
          <circle cx="4" cy="7" r="3" fill="white" opacity="0.92"/>
          <circle cx="16" cy="1" r="2.4" fill="white" opacity="0.88"/>
          <circle cx="28" cy="-1" r="2" fill="white" opacity="0.82"/>
          <circle cx="-3" cy="19" r="2.4" fill="white" opacity="0.88"/>
          <circle cx="-4" cy="29" r="2" fill="white" opacity="0.82"/>

          {/* Lower hindwing */}
          <path d="M 48,38 C 36,46 14,52 11,62 C 8,70 20,74 32,68 C 44,62 48,50 48,38 Z"
            fill={ORANGE} />
          <path d="M 48,38 C 36,46 14,52 11,62 C 8,70 20,74 32,68 C 44,62 48,50 48,38 Z"
            fill="none" stroke={BLACK} strokeWidth="4" strokeLinejoin="round" />
          {/* Hindwing vein */}
          <path d="M 48,44 C 36,48 20,54 13,60" fill="none" stroke={BLACK} strokeWidth="1.1" opacity="0.45"/>
          {/* Hindwing white spots */}
          <circle cx="10" cy="64" r="2.8" fill="white" opacity="0.92"/>
          <circle cx="20" cy="71" r="2.4" fill="white" opacity="0.88"/>
          <circle cx="30" cy="70" r="2" fill="white" opacity="0.82"/>
        </svg>
      </motion.div>

      {/* ── Right wing group ── */}
      <motion.div
        style={{
          position: 'absolute',
          left: '50%', top: 0,
          width: 48, height: H,
          transformOrigin: 'left 38%',
          transformStyle: 'preserve-3d',
        }}
        animate={landed ? { rotateY: 28 } : { rotateY: [0, 72, 0] }}
        transition={landed ? { duration: 0.7, ease: [0.16,1,0.3,1] } : flapTransition}
      >
        <svg width="48" height={H} viewBox="0 0 48 76" overflow="visible" style={{ display: 'block' }}>
          {/* Upper forewing */}
          <path d="M 0,26 C 6,10 24,0 42,9 C 53,16 51,30 36,36 C 22,41 8,40 0,38 Z"
            fill={ORANGE} />
          <path d="M 0,26 C 6,10 24,0 42,9 C 53,16 51,30 36,36 C 22,41 8,40 0,38 Z"
            fill="none" stroke={BLACK} strokeWidth="4" strokeLinejoin="round" />
          <path d="M 0,32 C 12,26 26,18 40,13" fill="none" stroke={BLACK} strokeWidth="1.3" opacity="0.5"/>
          <path d="M 0,32 C 8,22 20,13 30,8" fill="none" stroke={BLACK} strokeWidth="1" opacity="0.35"/>
          <circle cx="44" cy="7" r="3" fill="white" opacity="0.92"/>
          <circle cx="32" cy="1" r="2.4" fill="white" opacity="0.88"/>
          <circle cx="20" cy="-1" r="2" fill="white" opacity="0.82"/>
          <circle cx="51" cy="19" r="2.4" fill="white" opacity="0.88"/>
          <circle cx="52" cy="29" r="2" fill="white" opacity="0.82"/>

          {/* Lower hindwing */}
          <path d="M 0,38 C 12,46 34,52 37,62 C 40,70 28,74 16,68 C 4,62 0,50 0,38 Z"
            fill={ORANGE} />
          <path d="M 0,38 C 12,46 34,52 37,62 C 40,70 28,74 16,68 C 4,62 0,50 0,38 Z"
            fill="none" stroke={BLACK} strokeWidth="4" strokeLinejoin="round" />
          <path d="M 0,44 C 12,48 28,54 35,60" fill="none" stroke={BLACK} strokeWidth="1.1" opacity="0.45"/>
          <circle cx="38" cy="64" r="2.8" fill="white" opacity="0.92"/>
          <circle cx="28" cy="71" r="2.4" fill="white" opacity="0.88"/>
          <circle cx="18" cy="70" r="2" fill="white" opacity="0.82"/>
        </svg>
      </motion.div>

      {/* ── Body ── */}
      <div style={{
        position: 'absolute',
        left: '50%', top: '18%',
        transform: 'translateX(-50%)',
        width: 9, height: 46,
        background: `linear-gradient(to bottom, #2A2000 0%, ${BLACK} 100%)`,
        borderRadius: '5px 5px 4px 4px',
        zIndex: 2,
        boxShadow: '1px 0 3px rgba(0,0,0,0.3)',
      }}>
        {/* Head */}
        <div style={{
          width: 11, height: 11, borderRadius: '50%',
          background: BLACK,
          position: 'absolute', top: -9, left: -1,
          boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
        }} />
        {/* White head dots */}
        <div style={{ position:'absolute', top:-7, left:1, width:3, height:3, borderRadius:'50%', background:'rgba(255,255,255,0.7)' }} />
        <div style={{ position:'absolute', top:-7, left:5, width:3, height:3, borderRadius:'50%', background:'rgba(255,255,255,0.7)' }} />
      </div>

      {/* ── Antennae overlay ── */}
      <svg style={{ position:'absolute', inset:0, overflow:'visible', zIndex:3, pointerEvents:'none' }}
        width={W} height={H}>
        <motion.line
          x1={W/2-1} y1={14} x2={W/2-16} y2={-4}
          stroke={BLACK} strokeWidth="1.6" strokeLinecap="round"
          animate={{ rotate: [-10, 10, -10] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: `${W/2-1}px 14px` }}
        />
        <circle cx={W/2-16} cy={-4} r={3} fill={BLACK} />
        <motion.line
          x1={W/2+1} y1={14} x2={W/2+16} y2={-4}
          stroke={BLACK} strokeWidth="1.6" strokeLinecap="round"
          animate={{ rotate: [8, -8, 8] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          style={{ transformOrigin: `${W/2+1}px 14px` }}
        />
        <circle cx={W/2+16} cy={-4} r={3} fill={BLACK} />
      </svg>

      {/* Shadow glow when landed */}
      {landed && (
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.7 }}
          style={{
            position: 'absolute', bottom: -8, left: '5%',
            width: '90%', height: 10, borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(232,132,26,0.28) 0%, transparent 70%)',
          }}
        />
      )}
    </div>
  );
}

function VortexTransition({ origin }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9998,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      pointerEvents: 'none',
      animation: 'vortexFadeIn 1.1s ease forwards',
    }}>
      <style>{`
        @keyframes vortexFadeIn {
          0% { opacity: 0; background: transparent; }
          40% { opacity: 1; }
          100% { opacity: 1; background: #F7F6F2; }
        }
        @keyframes vortexSpin {
          0% { transform: rotate(0deg) scale(0.2); opacity: 0.9; }
          100% { transform: rotate(720deg) scale(8); opacity: 0; }
        }
        @keyframes vortexSpin2 {
          0% { transform: rotate(60deg) scale(0.15); opacity: 0.7; }
          100% { transform: rotate(780deg) scale(7); opacity: 0; }
        }
        @keyframes vortexSpin3 {
          0% { transform: rotate(120deg) scale(0.1); opacity: 0.5; }
          100% { transform: rotate(840deg) scale(6); opacity: 0; }
        }
      `}</style>
      {[1,2,3].map(i => (
        <div key={i} style={{
          position: 'absolute',
          width: 120, height: 120,
          borderRadius: '50%',
          border: `${5 - i}px solid rgba(232,132,26,${0.5 - i * 0.12})`,
          animation: `vortexSpin${i > 1 ? i : ''} ${0.9 + i * 0.05}s cubic-bezier(0.4,0,1,1) forwards`,
          animationDelay: `${(i - 1) * 0.06}s`,
        }} />
      ))}
      <div style={{
        position: 'absolute',
        width: 60, height: 60,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,132,26,0.35) 0%, transparent 70%)',
        animation: 'vortexSpin 0.85s cubic-bezier(0.4,0,1,1) forwards',
      }} />
    </div>
  );
}

export default function ButterflyButton() {
  const navigate = useNavigate();
  const [pos, setPos] = useState({ x: 80, y: -200 });
  const [visible, setVisible] = useState(false);
  const [escapes, setEscapes] = useState(0);
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
      onClick={tired && !transitioning ? () => {
        setTransitioning(true);
        setTimeout(() => navigate('/philosophy'), 1050);
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
            position: 'absolute', bottom: -24, left: '50%', transform: 'translateX(-50%)',
            whiteSpace: 'nowrap', fontSize: 11, fontWeight: 600,
            color: '#E07820', letterSpacing: '0.04em', fontFamily: 'Inter, sans-serif',
          }}
        >
          follow me →
        </motion.div>
      )}
      {transitioning && <VortexTransition />}
    </motion.div>
  );
}

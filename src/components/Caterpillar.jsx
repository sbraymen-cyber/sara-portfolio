import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const SEGMENTS = 7;
const SEG_SIZE = 16;
const SEG_GAP = 8;
const BODY_W = SEGMENTS * (SEG_SIZE + SEG_GAP);

const COLORS = ['#2D4030','#3D6B52','#3D6B52','#A04825','#2D4030','#3D6B52','#A04825'];

// Antennae wiggle
const antennaAnim = {
  animate: { rotate: [-12, 12, -12], transition: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' } },
};

function CaterpillarBody({ flipped }) {
  return (
    <svg
      width={BODY_W + SEG_SIZE + 24}
      height={SEG_SIZE + 24}
      style={{ display: 'block', transform: flipped ? 'scaleX(-1)' : 'none' }}
      aria-hidden="true"
    >
      {/* Antennae on head (rightmost when not flipped) */}
      <motion.line
        x1={BODY_W + 4} y1={SEG_SIZE / 2 + 6}
        x2={BODY_W + 14} y2={4}
        stroke="#2D4030" strokeWidth="1.5" strokeLinecap="round"
        {...antennaAnim}
        style={{ transformOrigin: `${BODY_W + 4}px ${SEG_SIZE / 2 + 6}px` }}
      />
      <motion.line
        x1={BODY_W + 4} y1={SEG_SIZE / 2 + 6}
        x2={BODY_W + 20} y2={6}
        stroke="#2D4030" strokeWidth="1.5" strokeLinecap="round"
        animate={{ rotate: [10, -10, 10] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        style={{ transformOrigin: `${BODY_W + 4}px ${SEG_SIZE / 2 + 6}px` }}
      />
      {/* Antenna dots */}
      <circle cx={BODY_W + 14} cy={4} r={2} fill="#D88A6E" />
      <circle cx={BODY_W + 20} cy={6} r={2} fill="#D88A6E" />

      {/* Body segments */}
      {Array.from({ length: SEGMENTS }).map((_, i) => {
        const x = (SEGMENTS - 1 - i) * (SEG_SIZE + SEG_GAP) + 6;
        const isHead = i === 0;
        return (
          <motion.circle
            key={i}
            cx={x + SEG_SIZE / 2}
            cy={SEG_SIZE / 2 + 6}
            r={isHead ? SEG_SIZE / 2 + 1.5 : SEG_SIZE / 2}
            fill={COLORS[i]}
            animate={{ cy: [SEG_SIZE / 2 + 6, SEG_SIZE / 2 + 3, SEG_SIZE / 2 + 6] }}
            transition={{ duration: 0.55, delay: i * 0.07, repeat: Infinity, ease: 'easeInOut' }}
          />
        );
      })}

      {/* Eyes */}
      <circle cx={BODY_W + 2} cy={SEG_SIZE / 2 + 3} r={2} fill="white" />
      <circle cx={BODY_W + 2} cy={SEG_SIZE / 2 + 3} r={1} fill="#1A1D1A" />
      <circle cx={BODY_W + 6} cy={SEG_SIZE / 2 + 3} r={2} fill="white" />
      <circle cx={BODY_W + 6} cy={SEG_SIZE / 2 + 3} r={1} fill="#1A1D1A" />

      {/* Smile */}
      <path d={`M ${BODY_W + 1} ${SEG_SIZE / 2 + 8} Q ${BODY_W + 4} ${SEG_SIZE / 2 + 11} ${BODY_W + 7} ${SEG_SIZE / 2 + 8}`}
        fill="none" stroke="#1A1D1A" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

const ROUTES = [
  { startX: -BODY_W - 40, endX: '110vw', y: '92vh', dir: 1 },
  { startX: '110vw',       endX: -BODY_W - 40, y: '85vh', dir: -1 },
  { startX: -BODY_W - 40, endX: '110vw', y: '88vh', dir: 1 },
];

export function MiniCaterpillar() {
  const S = 10, G = 5, N = 5;
  const W = N * (S + G);
  const COLS = ['#2D4030','#3D6B52','#A04825','#3D6B52','#2D4030'];
  return (
    <svg width={W + S + 20} height={S + 16} aria-hidden="true" style={{ display: 'block' }}>
      <motion.line x1={W + 2} y1={S/2+4} x2={W+10} y2={2} stroke="#2D4030" strokeWidth="1.2" strokeLinecap="round"
        animate={{ rotate: [-12, 12, -12] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: `${W+2}px ${S/2+4}px` }} />
      <motion.line x1={W + 2} y1={S/2+4} x2={W+14} y2={4} stroke="#2D4030" strokeWidth="1.2" strokeLinecap="round"
        animate={{ rotate: [10, -10, 10] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        style={{ transformOrigin: `${W+2}px ${S/2+4}px` }} />
      <circle cx={W+10} cy={2} r={1.5} fill="#D88A6E" />
      <circle cx={W+14} cy={4} r={1.5} fill="#D88A6E" />
      {Array.from({ length: N }).map((_, i) => {
        const x = (N - 1 - i) * (S + G) + 4;
        return (
          <motion.circle key={i} cx={x + S/2} cy={S/2+4} r={i===0 ? S/2+1 : S/2} fill={COLS[i]}
            animate={{ cy: [S/2+4, S/2+2, S/2+4] }}
            transition={{ duration: 0.55, delay: i * 0.08, repeat: Infinity, ease: 'easeInOut' }} />
        );
      })}
      <circle cx={W+1} cy={S/2+2} r={1.5} fill="white" />
      <circle cx={W+1} cy={S/2+2} r={0.7} fill="#1A1D1A" />
      <circle cx={W+5} cy={S/2+2} r={1.5} fill="white" />
      <circle cx={W+5} cy={S/2+2} r={0.7} fill="#1A1D1A" />
      <path d={`M ${W} ${S/2+6} Q ${W+3} ${S/2+9} ${W+6} ${S/2+6}`} fill="none" stroke="#1A1D1A" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
}

export default function Caterpillar() {
  const controls = useAnimation();
  const [routeIdx, setRouteIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    let alive = true;
    async function run() {
      while (alive) {
        const r = ROUTES[routeIdx % ROUTES.length];
        setFlipped(r.dir === -1);
        setVisible(true);

        await controls.start({
          x: r.endX,
          y: r.y,
          transition: { duration: 14 + Math.random() * 6, ease: 'linear' },
        });

        if (!alive) break;
        setVisible(false);
        await new Promise(res => setTimeout(res, 1800 + Math.random() * 2400));

        if (!alive) break;
        setRouteIdx(i => i + 1);
        const next = ROUTES[(routeIdx + 1) % ROUTES.length];
        await controls.set({ x: next.startX, y: next.y });
      }
    }
    run();
    return () => { alive = false; };
  }, [routeIdx]);

  return (
    <motion.div
      animate={controls}
      initial={{ x: ROUTES[0].startX, y: ROUTES[0].y }}
      style={{
        position: 'fixed',
        zIndex: 998,
        pointerEvents: 'none',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.4s ease',
        bottom: 0,
        left: 0,
      }}
    >
      <CaterpillarBody flipped={flipped} />
    </motion.div>
  );
}

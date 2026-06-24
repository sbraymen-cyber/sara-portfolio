import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const RINGS = [
  { rx: 120, ry: 36, rotate: 0, duration: 8, dotOffset: 0 },
  { rx: 110, ry: 42, rotate: 60, duration: 11, dotOffset: 0.33 },
  { rx: 115, ry: 38, rotate: -50, duration: 14, dotOffset: 0.66 },
];

function Ring({ rx, ry, rotate, duration, dotOffset, accent }) {
  return (
    <g transform={`rotate(${rotate})`}>
      <ellipse cx={0} cy={0} rx={rx} ry={ry}
        fill="none"
        stroke={`rgba(${accent},0.22)`}
        strokeWidth={1}
      />
      {/* Travelling dot */}
      <motion.circle
        r={3.5}
        fill={`rgba(${accent},0.9)`}
        style={{ filter: `drop-shadow(0 0 6px rgba(${accent},0.8))` }}
        animate={{
          cx: [rx, 0, -rx, 0, rx],
          cy: [0, ry, 0, -ry, 0],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
          delay: -duration * dotOffset,
        }}
      />
    </g>
  );
}

export default function HeroGraphic() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 50, damping: 20 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 50, damping: 20 });

  function onMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() { mx.set(0); my.set(0); }

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 900 }}
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width={300} height={300} viewBox="-150 -150 300 300" style={{ overflow: 'visible' }}>
        <defs>
          <radialGradient id="coreGrad" cx="40%" cy="35%">
            <stop offset="0%" stopColor="rgba(180,210,255,0.95)" />
            <stop offset="35%" stopColor="rgba(111,135,190,0.7)" />
            <stop offset="100%" stopColor="rgba(40,60,140,0.15)" />
          </radialGradient>
          <radialGradient id="glowGrad">
            <stop offset="0%" stopColor="rgba(111,135,190,0.35)" />
            <stop offset="100%" stopColor="rgba(111,135,190,0)" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Outer ambient glow */}
        <motion.circle cx={0} cy={0} r={130} fill="url(#glowGrad)"
          animate={{ r: [130, 145, 130], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Orbit rings + dots */}
        {RINGS.map((ring, i) => (
          <Ring key={i} {...ring} accent={i === 0 ? '111,135,190' : i === 1 ? '61,180,200' : '139,111,190'} />
        ))}

        {/* Core sphere */}
        <motion.circle cx={0} cy={0} r={62} fill="url(#coreGrad)"
          animate={{ r: [62, 65, 62] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          filter="url(#glow)"
        />

        {/* Sphere highlight */}
        <ellipse cx={-18} cy={-20} rx={22} ry={14}
          fill="rgba(255,255,255,0.18)"
          style={{ filter: 'blur(4px)' }}
        />

        {/* Floating data nodes */}
        {[
          { x: -105, y: -55, r: 3, accent: '111,135,190', d: 2.2 },
          { x: 95,  y: -72, r: 2, accent: '61,180,200',  d: 3.1 },
          { x: 108, y:  48, r: 3, accent: '139,111,190', d: 1.8 },
          { x: -90, y:  65, r: 2, accent: '111,135,190', d: 2.7 },
          { x: -30, y: -115,r: 2, accent: '61,180,200',  d: 3.4 },
          { x:  40, y:  112,r: 2, accent: '139,111,190', d: 2.0 },
        ].map((n, i) => (
          <motion.circle key={i} cx={n.x} cy={n.y} r={n.r}
            fill={`rgba(${n.accent},0.85)`}
            style={{ filter: `drop-shadow(0 0 4px rgba(${n.accent},0.7))` }}
            animate={{ opacity: [0.4, 1, 0.4], r: [n.r, n.r + 1, n.r] }}
            transition={{ duration: n.d, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
          />
        ))}

        {/* Connecting lines from nodes to sphere */}
        {[
          { x1: -105, y1: -55 }, { x1: 95, y1: -72 }, { x1: 108, y1: 48 },
          { x1: -90, y1: 65 },   { x1: -30, y1: -115 }, { x1: 40, y1: 112 },
        ].map((l, i) => (
          <motion.line key={i} x1={l.x1} y1={l.y1} x2={0} y2={0}
            stroke="rgba(111,135,190,0.12)" strokeWidth={0.8}
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
          />
        ))}
      </svg>
    </motion.div>
  );
}

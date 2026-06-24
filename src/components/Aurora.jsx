import { motion } from 'framer-motion';

const BLUE = '111, 135, 190';
const GOLD = '190, 160, 111';

const ORBS = [
  { size: 1100, blur: 150, opacity: 0.13, duration: 34, x: [0, 200, -130, 240, -90, 110, 0], y: [0, -220, 190, -110, 230, -170, 0], scale: [1, 1.08, 0.96, 1.04, 1, 1.06, 1], top: '15%', left: '35%', color: BLUE },
  { size: 750,  blur: 120, opacity: 0.10, duration: 28, x: [0, -170, 110, -210, 150, -90, 0], y: [0, 140, -170, 90, -210, 130, 0], scale: [1, 0.94, 1.06, 0.98, 1.04, 0.96, 1], top: '5%',  left: '65%', color: BLUE },
  { size: 850,  blur: 140, opacity: 0.09, duration: 42, x: [0, 230, -90, 170, -190, 70, 0],  y: [0, -90, 210, -150, 110, -190, 0], scale: [1, 1.05, 0.97, 1.08, 0.95, 1.03, 1], top: '60%', left: '10%', color: BLUE },
  { size: 550,  blur: 100, opacity: 0.11, duration: 20, x: [0, -110, 170, -70, 130, -190, 0], y: [0, 170, -110, 190, -130, 90, 0],  scale: [1, 1.1, 0.92, 1.06, 0.96, 1.08, 1], top: '40%', left: '50%', color: GOLD },
  { size: 700,  blur: 120, opacity: 0.08, duration: 36, x: [0, -150, 90, -210, 110, -70, 0], y: [0, -110, 160, -190, 70, -130, 0], scale: [1, 0.96, 1.07, 0.93, 1.05, 0.97, 1], top: '75%', left: '70%', color: BLUE },
  { size: 480,  blur: 90,  opacity: 0.07, duration: 18, x: [0, 130, -190, 90, -110, 170, 0], y: [0, -150, 70, -170, 130, -90, 0],  scale: [1, 1.04, 0.98, 1.06, 0.94, 1.02, 1], top: '25%', left: '80%', color: GOLD },
];

export default function Aurora() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <div className="absolute inset-0" style={{ background: '#1A1816' }} />
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            top: orb.top,
            left: orb.left,
            width: orb.size,
            height: orb.size,
            marginLeft: -orb.size / 2,
            marginTop: -orb.size / 2,
            borderRadius: '50%',
            filter: `blur(${orb.blur}px)`,
            background: `radial-gradient(circle at center,
              rgba(${orb.color}, ${orb.opacity}) 0%,
              rgba(${orb.color}, ${orb.opacity * 0.6}) 35%,
              rgba(${orb.color}, ${orb.opacity * 0.2}) 60%,
              transparent 75%)`,
            willChange: 'transform',
          }}
          animate={{ x: orb.x, y: orb.y, scale: orb.scale }}
          transition={{ duration: orb.duration, repeat: Infinity, ease: 'easeInOut', times: [0, 0.2, 0.35, 0.55, 0.7, 0.85, 1] }}
        />
      ))}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 40%, transparent 30%, rgba(26,24,22,0.55) 70%, rgba(26,24,22,0.9) 100%)' }}
      />
    </div>
  );
}

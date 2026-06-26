import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useBreakpoint } from '../hooks/useBreakpoint';

const LINKS = [
  ['Work', '#work'],
  ['Experience', '#experience'],
  ['Contact', '#contact'],
];

export default function Nav() {
  const { isMobile } = useBreakpoint();
  const { scrollY } = useScroll();
  const pillOpacity = useTransform(scrollY, [20, 80], [0, 1]);
  const pillScale = useTransform(scrollY, [20, 80], [0.94, 1]);

  return (
    <motion.nav
      style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div style={{
        maxWidth: 1080, margin: '0 auto',
        padding: `18px ${isMobile ? 20 : 48}px`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>

        {/* Name */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.9)', letterSpacing: '-0.01em' }}>
            Sara Braymen
          </span>
        </Link>

        {/* Liquid glass pill — fades in on scroll */}
        <motion.div style={{
          opacity: pillOpacity,
          scale: pillScale,
          display: 'flex', gap: 2, alignItems: 'center',
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.14)',
          borderRadius: 100,
          padding: '5px 6px',
          backdropFilter: 'blur(24px) saturate(1.3) brightness(1.1)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.3) brightness(1.1)',
          boxShadow: '0 4px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.1)',
        }}>
          {LINKS.map(([label, href]) => (
            <a key={label} href={href}
              style={{
                fontSize: 13, fontWeight: 500,
                color: 'rgba(255,255,255,0.6)',
                textDecoration: 'none',
                padding: '7px 16px',
                borderRadius: 100,
                transition: 'color 0.15s, background 0.15s',
                letterSpacing: '0.005em',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.background = 'rgba(255,255,255,0.11)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                e.currentTarget.style.background = 'transparent';
              }}
            >{label}</a>
          ))}
        </motion.div>

      </div>
    </motion.nav>
  );
}

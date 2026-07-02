import { motion } from 'framer-motion';

const LOGOS = [
  { label: null, src: '/logos/evernorth.svg', alt: 'Evernorth', href: 'https://www.evernorth.com' },
  { label: 'Prominent Technology', href: 'https://www.prominent-tech.com' },
  { label: 'Horne LLP', href: 'https://www.hornecpa.com' },
  { label: 'Sar®', href: 'https://sar-app.com' },
];

const ITEMS = [...LOGOS, ...LOGOS, ...LOGOS];

const wordmarkStyle = {
  fontSize: 15,
  fontWeight: 700,
  letterSpacing: '-0.02em',
  color: 'rgba(255,255,255,0.28)',
  whiteSpace: 'nowrap',
  userSelect: 'none',
  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
};

export default function Logos() {
  return (
    <div style={{ overflow: 'hidden', paddingTop: 8, paddingBottom: 48, position: 'relative' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to right, #111010, transparent)', zIndex: 1, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to left, #111010, transparent)', zIndex: 1, pointerEvents: 'none' }} />

      <motion.div
        animate={{ x: ['0%', '-33.333%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', alignItems: 'center', gap: 72, width: 'max-content' }}
      >
        {ITEMS.map((logo, i) => (
          <a key={i} href={logo.href} target="_blank" rel="noopener noreferrer"
            style={{ flexShrink: 0, display: 'flex', alignItems: 'center', textDecoration: 'none', transition: 'opacity 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.65'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            {logo.src ? (
              <img src={logo.src} alt={logo.alt} style={{ height: 22, width: 'auto', opacity: 0.28, filter: 'brightness(0) invert(1)', userSelect: 'none' }} />
            ) : (
              <span style={wordmarkStyle}>{logo.label}</span>
            )}
          </a>
        ))}
      </motion.div>
    </div>
  );
}

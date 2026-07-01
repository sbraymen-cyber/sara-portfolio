import { motion } from 'framer-motion';

const LOGOS = [
  { src: '/logos/evernorth.svg', alt: 'Evernorth', href: 'https://www.evernorth.com' },
  { src: '/logos/prominent.svg', alt: 'Prominent Technology', href: 'https://www.prominent-tech.com' },
  { src: '/logos/horne.svg', alt: 'Horne LLP', href: 'https://www.hornecpa.com' },
  { src: '/logos/sar.svg', alt: 'Sar', href: 'https://sar-app.com' },
];

// Duplicate for seamless loop
const ITEMS = [...LOGOS, ...LOGOS, ...LOGOS];

export default function Logos() {
  return (
    <div style={{ overflow: 'hidden', paddingTop: 8, paddingBottom: 48, position: 'relative' }}>
      {/* Fade edges */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to right, #111010, transparent)', zIndex: 1, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to left, #111010, transparent)', zIndex: 1, pointerEvents: 'none' }} />

      <motion.div
        animate={{ x: ['0%', '-33.333%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', alignItems: 'center', gap: 64, width: 'max-content' }}
      >
        {ITEMS.map((logo, i) => (
          <a key={i} href={logo.href} target="_blank" rel="noopener noreferrer"
            style={{ flexShrink: 0, display: 'flex', alignItems: 'center', transition: 'opacity 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <img
              src={logo.src}
              alt={logo.alt}
              style={{
                height: 24,
                width: 'auto',
                opacity: 0.28,
                filter: 'brightness(0) invert(1)',
                userSelect: 'none',
              }}
            />
          </a>
        ))}
      </motion.div>
    </div>
  );
}

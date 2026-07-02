import { motion } from 'framer-motion';

const LOGOS = [
  { name: 'Evernorth', href: 'https://www.evernorth.com', img: '/logos/evernorth.svg' },
  { name: 'Prominent Technology', href: 'https://www.prominent-tech.com' },
  { name: 'Horne LLP', href: 'https://www.hornecpa.com' },
  { name: 'Sar®', href: 'https://sar-app.com' },
];

const ITEMS = [...LOGOS, ...LOGOS, ...LOGOS].map((l, i) => ({ ...l, uid: i }));

export default function Logos() {
  return (
    <div style={{ overflow: 'hidden', paddingTop: 8, paddingBottom: 48, position: 'relative' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to right, #111010, transparent)', zIndex: 1, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to left, #111010, transparent)', zIndex: 1, pointerEvents: 'none' }} />

      <motion.div
        animate={{ x: ['0%', '-33.333%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', alignItems: 'center', gap: 80, width: 'max-content' }}
      >
        {ITEMS.map(({ name, href, img, uid }) => (
          <a key={uid} href={href} target="_blank" rel="noopener noreferrer"
            style={{ flexShrink: 0, display: 'flex', alignItems: 'center', textDecoration: 'none', opacity: 0.28, transition: 'opacity 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.65'}
            onMouseLeave={e => e.currentTarget.style.opacity = '0.28'}
          >
            {img ? (
              <img src={img} alt={name} style={{ height: 20, width: 'auto', filter: 'brightness(0) invert(1)' }} />
            ) : (
              <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.02em', color: '#fff', whiteSpace: 'nowrap', fontFamily: 'inherit' }}>
                {name}
              </span>
            )}
          </a>
        ))}
      </motion.div>
    </div>
  );
}

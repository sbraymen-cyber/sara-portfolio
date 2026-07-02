import { motion } from 'framer-motion';

const logoStyle = { opacity: 0.3, filter: 'brightness(0) invert(1)', flexShrink: 0 };

function EvernorthLogo() {
  return <img src="/logos/evernorth.svg" alt="Evernorth" style={{ ...logoStyle, height: 22, width: 'auto' }} />;
}

function ProminentLogo() {
  return (
    <svg width="160" height="28" viewBox="0 0 160 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={logoStyle}>
      <circle cx="14" cy="14" r="12" stroke="white" strokeWidth="2.2" fill="none"/>
      <circle cx="14" cy="14" r="6" stroke="white" strokeWidth="2" fill="none"/>
      <line x1="14" y1="20" x2="14" y2="26" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
      <text x="32" y="19" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif" fontSize="14" fontWeight="700" fill="white" letterSpacing="-0.2">Prominent</text>
    </svg>
  );
}

function HorneLogo() {
  return (
    <svg width="110" height="28" viewBox="0 0 110 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={logoStyle}>
      <circle cx="14" cy="14" r="12" stroke="white" strokeWidth="2.2" fill="none"/>
      {/* Stylised H inside circle */}
      <line x1="8" y1="8" x2="8" y2="20" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="20" y1="8" x2="20" y2="20" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="8" y1="14" x2="20" y2="14" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
      <text x="32" y="19" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif" fontSize="14" fontWeight="700" fill="white" letterSpacing="-0.2">Horne LLP</text>
    </svg>
  );
}

function SarLogo() {
  return (
    <svg width="52" height="28" viewBox="0 0 52 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={logoStyle}>
      <text x="0" y="19" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif" fontSize="16" fontWeight="700" fill="white" letterSpacing="-0.3">Sar®</text>
    </svg>
  );
}

const LOGOS = [
  { Component: EvernorthLogo, href: 'https://www.evernorth.com', key: 'evernorth' },
  { Component: ProminentLogo, href: 'https://www.prominent-tech.com', key: 'prominent' },
  { Component: HorneLogo, href: 'https://www.hornecpa.com', key: 'horne' },
  { Component: SarLogo, href: 'https://sar-app.com', key: 'sar' },
];

const ITEMS = [...LOGOS, ...LOGOS, ...LOGOS].map((l, i) => ({ ...l, uid: i }));

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
        {ITEMS.map(({ Component, href, uid }) => (
          <a key={uid} href={href} target="_blank" rel="noopener noreferrer"
            style={{ flexShrink: 0, display: 'flex', alignItems: 'center', textDecoration: 'none', transition: 'opacity 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.6'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <Component />
          </a>
        ))}
      </motion.div>
    </div>
  );
}

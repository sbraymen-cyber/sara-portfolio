import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useBreakpoint } from '../hooks/useBreakpoint';

const LINKS = [
  ['Work', '#work'],
  ['Side Projects', '/explorations'],
  ['Experience', '#experience'],
  ['Resume', '/resume'],
  ['Contact', '#contact'],
];

const MOBILE_LINKS = [
  ['Work', '#work'],
  ['Side Projects', '/explorations'],
  ['Resume', '/resume'],
  ['Contact', '#contact'],
];

export default function Nav() {
  const { isMobile } = useBreakpoint();
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const links = isMobile ? MOBILE_LINKS : LINKS;

  function navHref(hash) {
    return isHome ? hash : `/${hash}`;
  }

  return (
    <motion.nav
      style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <div style={{
        maxWidth: 1080, margin: '0 auto',
        padding: `${isMobile ? 14 : 18}px ${isMobile ? 16 : 48}px`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>

        <Link to="/" style={{ textDecoration: 'none' }}>
          <span style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontStyle: 'italic',
            fontSize: isMobile ? 18 : 22,
            color: 'var(--accent)',
            letterSpacing: '-0.02em',
          }}>
            Sara Braymen
          </span>
        </Link>

        <div style={{
          display: 'flex', gap: 2, alignItems: 'center',
          background: 'rgba(255,255,255,0.75)',
          border: '1px solid var(--border)',
          borderRadius: 100,
          padding: '4px 5px',
          backdropFilter: 'blur(20px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
          boxShadow: '0 2px 16px rgba(26,29,26,0.06), inset 0 1px 0 rgba(255,255,255,0.8)',
        }}>
          {links.map(([label, href]) => {
            const isPage = href.startsWith('/') && !href.startsWith('/#');
            const linkStyle = {
              fontSize: isMobile ? 12 : 13,
              fontWeight: 500,
              color: 'var(--text-2)',
              textDecoration: 'none',
              padding: isMobile ? '6px 10px' : '7px 16px',
              borderRadius: 100,
              transition: 'color 0.15s, background 0.15s',
              letterSpacing: '0.005em',
              whiteSpace: 'nowrap',
              display: 'inline-block',
            };
            const hoverOn = e => { e.currentTarget.style.color = 'var(--text-1)'; e.currentTarget.style.background = 'rgba(26,29,26,0.06)'; };
            const hoverOff = e => { e.currentTarget.style.color = 'var(--text-2)'; e.currentTarget.style.background = 'transparent'; };
            const isExplorations = label === 'Side Projects';
            const explorationStyle = isExplorations ? {
              ...linkStyle,
              color: 'var(--accent)',
              background: 'rgba(45,64,48,0.07)',
              boxShadow: '0 0 0 1px rgba(45,64,48,0.18), 0 0 12px rgba(45,64,48,0.18), 0 0 24px rgba(45,64,48,0.08)',
            } : linkStyle;
            const explorationHoverOn = isExplorations
              ? e => { e.currentTarget.style.color = 'var(--accent-hover)'; e.currentTarget.style.background = 'rgba(45,64,48,0.12)'; e.currentTarget.style.boxShadow = '0 0 0 1px rgba(45,64,48,0.25), 0 0 18px rgba(45,64,48,0.28), 0 0 36px rgba(45,64,48,0.12)'; }
              : hoverOn;
            const explorationHoverOff = isExplorations
              ? e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.background = 'rgba(45,64,48,0.07)'; e.currentTarget.style.boxShadow = '0 0 0 1px rgba(45,64,48,0.18), 0 0 12px rgba(45,64,48,0.18), 0 0 24px rgba(45,64,48,0.08)'; }
              : hoverOff;
            return isPage
              ? <Link key={label} to={href} style={explorationStyle} onMouseEnter={explorationHoverOn} onMouseLeave={explorationHoverOff}>{label}</Link>
              : <a key={label} href={navHref(href)} style={explorationStyle} onMouseEnter={explorationHoverOn} onMouseLeave={explorationHoverOff}>{label}</a>;
          })}
        </div>

      </div>
    </motion.nav>
  );
}

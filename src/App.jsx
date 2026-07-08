import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Work from './components/Work';
import Principles from './components/Principles';
import Experience from './components/Experience';
import Contact from './components/Contact';
const CaseStudy = lazy(() => import('./pages/CaseStudy'));
const Process = lazy(() => import('./pages/Process'));
import SaraBot from './components/SaraBot';
import { useBreakpoint } from './hooks/useBreakpoint';
import './index.css';

const MAINTENANCE = false;

function CursorGlow() {
  const x = useMotionValue(-800);
  const y = useMotionValue(-800);
  const slowX = useSpring(x, { stiffness: 32, damping: 20 });
  const slowY = useSpring(y, { stiffness: 32, damping: 20 });
  const fastX = useSpring(x, { stiffness: 220, damping: 28 });
  const fastY = useSpring(y, { stiffness: 220, damping: 28 });

  useEffect(() => {
    const move = e => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999, overflow: 'hidden' }}>
      <motion.div style={{
        position: 'absolute', left: slowX, top: slowY,
        x: '-50%', y: '-50%',
        width: 600, height: 500,
        borderRadius: '60% 40% 55% 45% / 50% 55% 45% 50%',
        background: 'radial-gradient(ellipse, rgba(232,112,90,0.04) 0%, rgba(111,135,190,0.03) 50%, transparent 70%)',
        filter: 'blur(40px)',
      }} />
      <motion.div style={{
        position: 'absolute', left: fastX, top: fastY,
        x: '-50%', y: '-50%',
        width: 5, height: 5,
        borderRadius: '50%',
        background: 'rgba(232,112,90,0.6)',
        boxShadow: '0 0 8px 2px rgba(232,112,90,0.25)',
      }} />
    </div>
  );
}

function Maintenance() {
  return (
    <div style={{ background: '#0F0D0C', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: 'center', maxWidth: 480 }}
      >
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: 24 }}>Back shortly</p>
        <h1 style={{ fontSize: 'clamp(40px, 7vw, 72px)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.05, color: '#fff', marginBottom: 20 }}>
          Sara Braymen
        </h1>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.38)', lineHeight: 1.7, marginBottom: 40 }}>
          Making a few updates. Back up by 5:00 PM MT.
        </p>
        <a href="mailto:sarabraymen@gmail.com" style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.25)', textDecoration: 'none', letterSpacing: '0.01em', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 2, transition: 'color 0.15s' }}
          onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
          onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.25)'}>
          sarabraymen@gmail.com
        </a>
      </motion.div>
    </div>
  );
}

function Portfolio() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <Principles />
        <Experience />
        <Contact />
      </main>
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', maxWidth: 1080, margin: '0 auto', padding: '32px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>© 2026 Sara Braymen</span>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.18)' }}>Made with ❤️ in Boulder, CO</span>
      </footer>
    </>
  );
}

export default function App() {
  const { pathname } = useLocation();
  const { isMobile } = useBreakpoint();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  if (MAINTENANCE) return <Maintenance />;

  return (
    <>
      {!isMobile && <CursorGlow />}
      <SaraBot />
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/work/:slug" element={<Suspense fallback={null}><CaseStudy /></Suspense>} />
        <Route path="/process" element={<Suspense fallback={null}><Process /></Suspense>} />
      </Routes>
    </>
  );
}

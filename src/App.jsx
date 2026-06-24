import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Work from './components/Work';
import Principles from './components/Principles';
import Experience from './components/Experience';
import Contact from './components/Contact';
import CaseStudy from './pages/CaseStudy';
import SaraBot from './components/SaraBot';
import './index.css';

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
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.12)' }}>Built by Sara</span>
      </footer>
    </>
  );
}

export default function App() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  return (
    <>
      <CursorGlow />
      <SaraBot />
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
      </Routes>
    </>
  );
}

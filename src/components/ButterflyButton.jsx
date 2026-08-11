import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const W = 110, H = 88;
const FLEE_RADIUS = 140;
const INK = '#0E0900';

function safePos(avoidX, avoidY) {
  const pad = 40;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  for (let i = 0; i < 20; i++) {
    const x = pad + Math.random() * (vw - W - pad * 2);
    const y = pad + Math.random() * (vh - H - pad * 2);
    const dx = x + W / 2 - avoidX;
    const dy = y + H / 2 - avoidY;
    if (Math.sqrt(dx * dx + dy * dy) > FLEE_RADIUS * 2.5) return { x, y };
  }
  return {
    x: avoidX > window.innerWidth / 2 ? pad : window.innerWidth - W - pad,
    y: avoidY > window.innerHeight / 2 ? pad : window.innerHeight - H - pad,
  };
}

function VortexTransition() {
  return (
    <>
      <style>{`
        @keyframes vRing { 0%{transform:rotate(0deg) scale(0.1);opacity:.85} 100%{transform:rotate(600deg) scale(9);opacity:0} }
        @keyframes vFill { 0%{opacity:0} 55%{opacity:1} 100%{opacity:1;background:#F7F6F2} }
      `}</style>
      <div style={{
        position:'fixed',inset:0,zIndex:9998,pointerEvents:'none',
        animation:'vFill 1.05s ease forwards',
        display:'flex',alignItems:'center',justifyContent:'center',
      }}>
        {[0,0.07,0.14].map((delay,i)=>(
          <div key={i} style={{
            position:'absolute',width:80,height:80,borderRadius:'50%',
            border:`${3-i}px solid rgba(201,107,16,${0.6-i*0.15})`,
            animation:`vRing ${0.88+i*0.06}s cubic-bezier(0.2,0,0.8,1) ${delay}s forwards`,
          }}/>
        ))}
      </div>
    </>
  );
}

function ButterflySVG({ landed }) {
  // viewBox is 140 × 110, scaled to W × H
  // body center x=70, y=55
  return (
    <svg
      width={W} height={H}
      viewBox="0 0 140 110"
      style={{ display:'block', overflow:'visible',
        filter:'drop-shadow(0 5px 16px rgba(120,55,5,0.2))' }}
    >
      <defs>
        {/* Forewing gradient — warm amber, lighter toward inner wing */}
        <radialGradient id="bfwL" cx="70%" cy="40%" r="60%">
          <stop offset="0%"   stopColor="#EDAA4A"/>
          <stop offset="55%"  stopColor="#C8690E"/>
          <stop offset="100%" stopColor="#9E4A04"/>
        </radialGradient>
        <radialGradient id="bfwR" cx="30%" cy="40%" r="60%">
          <stop offset="0%"   stopColor="#EDAA4A"/>
          <stop offset="55%"  stopColor="#C8690E"/>
          <stop offset="100%" stopColor="#9E4A04"/>
        </radialGradient>
        {/* Hindwing — deeper, slightly different hue */}
        <radialGradient id="bhwL" cx="75%" cy="35%" r="65%">
          <stop offset="0%"   stopColor="#D4862A"/>
          <stop offset="60%"  stopColor="#A85208"/>
          <stop offset="100%" stopColor="#7A3202"/>
        </radialGradient>
        <radialGradient id="bhwR" cx="25%" cy="35%" r="65%">
          <stop offset="0%"   stopColor="#D4862A"/>
          <stop offset="60%"  stopColor="#A85208"/>
          <stop offset="100%" stopColor="#7A3202"/>
        </radialGradient>
      </defs>

      {/* ════ Wing group — scaleX for flutter ════ */}
      <motion.g
        animate={landed ? {scaleX:1} : {scaleX:[1,0.07,1,0.05,1]}}
        transition={landed
          ? {duration:0.5,ease:[0.16,1,0.3,1]}
          : {duration:1.7,repeat:Infinity,ease:[0.42,0,0.58,1]}}
        style={{transformOrigin:'70px 50px'}}
      >

        {/* ── LEFT FOREWING ── */}
        {/* Black backing = border */}
        <path d="M 70,28 C 60,12 40,2 14,6 C 2,10 -3,24 6,36 C 13,46 30,53 54,57 C 63,59 70,55 70,49 Z"
          fill={INK}/>
        {/* Orange fill inset */}
        <path d="M 70,31 C 62,17 44,8 20,12 C 10,15 6,27 13,36 C 19,45 35,51 57,54 C 65,56 70,52 70,49 Z"
          fill="url(#bfwL)"/>
        {/* Veins */}
        <path d="M 70,44 C 54,38 36,28 18,16" fill="none" stroke={INK} strokeWidth="1.2" opacity="0.55"/>
        <path d="M 70,46 C 52,44 34,42 16,40" fill="none" stroke={INK} strokeWidth="1"   opacity="0.45"/>
        <path d="M 70,47 C 55,49 38,51 24,49" fill="none" stroke={INK} strokeWidth="0.9" opacity="0.38"/>
        <path d="M 70,42 C 56,34 42,22 28,13" fill="none" stroke={INK} strokeWidth="1"   opacity="0.45"/>
        <path d="M 70,43 C 60,37 50,28 38,20" fill="none" stroke={INK} strokeWidth="0.8" opacity="0.32"/>
        {/* White spots — apex row */}
        <circle cx="14" cy="5"   r="3.2" fill="white" opacity="0.93"/>
        <circle cx="26" cy="2"   r="2.6" fill="white" opacity="0.88"/>
        <circle cx="37" cy="1"   r="2.2" fill="white" opacity="0.84"/>
        <circle cx="47" cy="2"   r="1.8" fill="white" opacity="0.78"/>
        {/* Outer margin spots */}
        <circle cx="3"  cy="26"  r="2.6" fill="white" opacity="0.88"/>
        <circle cx="3"  cy="37"  r="2.2" fill="white" opacity="0.84"/>
        <circle cx="7"  cy="47"  r="2.4" fill="white" opacity="0.86"/>
        {/* Lower border spots */}
        <circle cx="20" cy="56"  r="2.2" fill="white" opacity="0.84"/>
        <circle cx="32" cy="58"  r="1.8" fill="white" opacity="0.78"/>
        <circle cx="43" cy="58"  r="1.6" fill="white" opacity="0.74"/>

        {/* ── LEFT HINDWING ── */}
        <path d="M 70,49 C 56,58 28,64 20,78 C 13,88 24,96 42,92 C 58,88 70,74 70,64 Z"
          fill={INK}/>
        <path d="M 70,51 C 58,60 32,66 26,78 C 20,86 29,92 44,88 C 59,84 70,71 70,64 Z"
          fill="url(#bhwL)"/>
        {/* Hindwing veins */}
        <path d="M 70,57 C 56,62 38,68 26,76" fill="none" stroke={INK} strokeWidth="1.1" opacity="0.5"/>
        <path d="M 70,61 C 60,66 46,73 38,80" fill="none" stroke={INK} strokeWidth="0.9" opacity="0.42"/>
        <path d="M 70,55 C 58,58 44,62 34,66" fill="none" stroke={INK} strokeWidth="0.8" opacity="0.35"/>
        {/* Hindwing spots */}
        <circle cx="19" cy="80"  r="3"   fill="white" opacity="0.92"/>
        <circle cx="24" cy="90"  r="2.6" fill="white" opacity="0.87"/>
        <circle cx="35" cy="95"  r="2.2" fill="white" opacity="0.84"/>
        <circle cx="46" cy="94"  r="2"   fill="white" opacity="0.8"/>

        {/* ── RIGHT FOREWING (mirror) ── */}
        <path d="M 70,28 C 80,12 100,2 126,6 C 138,10 143,24 134,36 C 127,46 110,53 86,57 C 77,59 70,55 70,49 Z"
          fill={INK}/>
        <path d="M 70,31 C 78,17 96,8 120,12 C 130,15 134,27 127,36 C 121,45 105,51 83,54 C 75,56 70,52 70,49 Z"
          fill="url(#bfwR)"/>
        <path d="M 70,44 C 86,38 104,28 122,16" fill="none" stroke={INK} strokeWidth="1.2" opacity="0.55"/>
        <path d="M 70,46 C 88,44 106,42 124,40" fill="none" stroke={INK} strokeWidth="1"   opacity="0.45"/>
        <path d="M 70,47 C 85,49 102,51 116,49" fill="none" stroke={INK} strokeWidth="0.9" opacity="0.38"/>
        <path d="M 70,42 C 84,34 98,22 112,13"  fill="none" stroke={INK} strokeWidth="1"   opacity="0.45"/>
        <path d="M 70,43 C 80,37 90,28 102,20"  fill="none" stroke={INK} strokeWidth="0.8" opacity="0.32"/>
        <circle cx="126" cy="5"   r="3.2" fill="white" opacity="0.93"/>
        <circle cx="114" cy="2"   r="2.6" fill="white" opacity="0.88"/>
        <circle cx="103" cy="1"   r="2.2" fill="white" opacity="0.84"/>
        <circle cx="93"  cy="2"   r="1.8" fill="white" opacity="0.78"/>
        <circle cx="137" cy="26"  r="2.6" fill="white" opacity="0.88"/>
        <circle cx="137" cy="37"  r="2.2" fill="white" opacity="0.84"/>
        <circle cx="133" cy="47"  r="2.4" fill="white" opacity="0.86"/>
        <circle cx="120" cy="56"  r="2.2" fill="white" opacity="0.84"/>
        <circle cx="108" cy="58"  r="1.8" fill="white" opacity="0.78"/>
        <circle cx="97"  cy="58"  r="1.6" fill="white" opacity="0.74"/>

        {/* ── RIGHT HINDWING (mirror) ── */}
        <path d="M 70,49 C 84,58 112,64 120,78 C 127,88 116,96 98,92 C 82,88 70,74 70,64 Z"
          fill={INK}/>
        <path d="M 70,51 C 82,60 108,66 114,78 C 120,86 111,92 96,88 C 81,84 70,71 70,64 Z"
          fill="url(#bhwR)"/>
        <path d="M 70,57 C 84,62 102,68 114,76" fill="none" stroke={INK} strokeWidth="1.1" opacity="0.5"/>
        <path d="M 70,61 C 80,66 94,73 102,80"  fill="none" stroke={INK} strokeWidth="0.9" opacity="0.42"/>
        <path d="M 70,55 C 82,58 96,62 106,66"  fill="none" stroke={INK} strokeWidth="0.8" opacity="0.35"/>
        <circle cx="121" cy="80"  r="3"   fill="white" opacity="0.92"/>
        <circle cx="116" cy="90"  r="2.6" fill="white" opacity="0.87"/>
        <circle cx="105" cy="95"  r="2.2" fill="white" opacity="0.84"/>
        <circle cx="94"  cy="94"  r="2"   fill="white" opacity="0.8"/>
      </motion.g>

      {/* ════ Body ════ */}
      {/* Abdomen */}
      <ellipse cx="70" cy="62" rx="3.2" ry="16" fill={INK}/>
      {/* Body white spots (abdomen segments) */}
      <circle cx="70" cy="54" r="1.3" fill="white" opacity="0.55"/>
      <circle cx="70" cy="59" r="1.2" fill="white" opacity="0.5"/>
      <circle cx="70" cy="64" r="1.2" fill="white" opacity="0.48"/>
      <circle cx="70" cy="69" r="1.1" fill="white" opacity="0.44"/>
      {/* Thorax */}
      <ellipse cx="70" cy="46" rx="4.5" ry="6" fill={INK}/>
      {/* Head */}
      <circle cx="70" cy="38" r="5" fill={INK}/>
      {/* Head white dots */}
      <circle cx="67.5" cy="36" r="1.4" fill="white" opacity="0.65"/>
      <circle cx="72.5" cy="36" r="1.4" fill="white" opacity="0.65"/>

      {/* ════ Antennae ════ */}
      <motion.path
        d="M 68.5,34 Q 56,20 47,5"
        fill="none" stroke={INK} strokeWidth="1.6" strokeLinecap="round"
        animate={{rotate:[-7,7,-7]}}
        transition={{duration:2.8,repeat:Infinity,ease:'easeInOut'}}
        style={{transformOrigin:'68.5px 34px'}}
      />
      <circle cx="47" cy="5" r="3.2" fill={INK}/>
      {/* Club tip highlight */}
      <circle cx="46" cy="4" r="1.2" fill="rgba(255,255,255,0.4)"/>

      <motion.path
        d="M 71.5,34 Q 84,20 93,5"
        fill="none" stroke={INK} strokeWidth="1.6" strokeLinecap="round"
        animate={{rotate:[6,-6,6]}}
        transition={{duration:2.8,repeat:Infinity,ease:'easeInOut',delay:0.45}}
        style={{transformOrigin:'71.5px 34px'}}
      />
      <circle cx="93" cy="5" r="3.2" fill={INK}/>
      <circle cx="94" cy="4" r="1.2" fill="rgba(255,255,255,0.4)"/>

      {/* Landed shadow */}
      {landed && (
        <motion.ellipse cx="70" cy="108" rx="28" ry="5"
          fill="rgba(180,80,10,0.12)"
          initial={{opacity:0,scaleX:0}}
          animate={{opacity:1,scaleX:1}}
          transition={{duration:0.6}}
        />
      )}
    </svg>
  );
}

export default function ButterflyButton() {
  const navigate = useNavigate();
  const [pos, setPos] = useState({ x: 80, y: -200 });
  const [visible, setVisible] = useState(false);
  const [tired, setTired] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const cooldown = useRef(false);
  const posRef = useRef(pos);
  posRef.current = pos;

  useEffect(() => {
    const t = setTimeout(() => {
      setPos({ x: window.innerWidth * 0.15, y: window.innerHeight * 0.72 });
      setVisible(true);
    }, 3200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (tired) {
      const t = setTimeout(() => setShowLabel(true), 600);
      return () => clearTimeout(t);
    }
  }, [tired]);

  useEffect(() => {
    let escapes = 0;
    const onMove = e => {
      if (cooldown.current || tired) return;
      const p = posRef.current;
      const bcx = p.x + W / 2, bcy = p.y + H / 2;
      const dx = e.clientX - bcx, dy = e.clientY - bcy;
      if (Math.sqrt(dx * dx + dy * dy) < FLEE_RADIUS) {
        cooldown.current = true;
        escapes += 1;
        if (escapes >= 4) setTired(true);
        setPos(safePos(e.clientX, e.clientY));
        setTimeout(() => { cooldown.current = false; }, 600);
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [tired]);

  if (!visible) return null;

  return (
    <>
      {transitioning && <VortexTransition />}
      <motion.div
        animate={{ x: pos.x, y: pos.y }}
        transition={{
          x: { type:'spring', stiffness: tired ? 22 : 65, damping: tired ? 18 : 28 },
          y: { type:'spring', stiffness: tired ? 22 : 65, damping: tired ? 18 : 28 },
        }}
        onClick={tired && !transitioning ? () => {
          setTransitioning(true);
          setTimeout(() => navigate('/play'), 1050);
        } : undefined}
        style={{
          position:'fixed', top:0, left:0, zIndex:999,
          cursor: tired ? 'pointer' : 'default',
          pointerEvents:'all', userSelect:'none',
          width:W, height:H,
        }}
      >
        <ButterflySVG landed={tired} />
        {showLabel && (
          <motion.div
            initial={{opacity:0,y:4}}
            animate={{opacity:1,y:0}}
            transition={{duration:0.4}}
            style={{
              position:'absolute', bottom:-22, left:'50%', transform:'translateX(-50%)',
              whiteSpace:'nowrap', fontSize:11, fontWeight:600,
              color:'#C96B10', letterSpacing:'0.05em', fontFamily:'Inter, sans-serif',
            }}
          >
            catch me →
          </motion.div>
        )}
      </motion.div>
    </>
  );
}

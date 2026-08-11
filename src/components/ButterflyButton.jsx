import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const W = 120, H = 96;
const FLEE_RADIUS = 140;
const BLK = '#180A00';   // warm deep black
const ORG = '#F07800';   // vivid monarch orange
const ORG2 = '#FFB040';  // lighter highlight
const ORG3 = '#C85A00';  // deep shadow in cells

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
        @keyframes vR{0%{transform:rotate(0deg) scale(.1);opacity:.9}100%{transform:rotate(600deg) scale(9);opacity:0}}
        @keyframes vF{0%{opacity:0}55%{opacity:1}100%{opacity:1;background:#F7F6F2}}
      `}</style>
      <div style={{position:'fixed',inset:0,zIndex:9998,pointerEvents:'none',
        animation:'vF 1.05s ease forwards',display:'flex',alignItems:'center',justifyContent:'center'}}>
        {[0,.07,.14].map((d,i)=>(
          <div key={i} style={{position:'absolute',width:80,height:80,borderRadius:'50%',
            border:`${3-i}px solid rgba(240,120,0,${.6-i*.15})`,
            animation:`vR ${.88+i*.06}s cubic-bezier(.2,0,.8,1) ${d}s forwards`}}/>
        ))}
      </div>
    </>
  );
}

// ─── The butterfly SVG ─────────────────────────────────────────────────────
// Drawn top-down, spread-wing, illustration style to match the reference.
// Viewbox 0 0 170 136 → rendered at W×H via SVG scaling.
// Body centre: x=85, y=58
function ButterflySVG({ landed }) {
  return (
    <svg width={W} height={H} viewBox="0 0 170 136"
      style={{display:'block',overflow:'visible',
        filter:'drop-shadow(0 6px 18px rgba(120,50,0,.22))'}}>
      <defs>
        <radialGradient id="fg" cx="60%" cy="38%" r="62%">
          <stop offset="0%"  stopColor={ORG2}/>
          <stop offset="45%" stopColor={ORG}/>
          <stop offset="100%" stopColor={ORG3}/>
        </radialGradient>
        <radialGradient id="hg" cx="55%" cy="32%" r="58%">
          <stop offset="0%"  stopColor={ORG2}/>
          <stop offset="50%" stopColor={ORG}/>
          <stop offset="100%" stopColor={ORG3}/>
        </radialGradient>
        <radialGradient id="fgR" cx="40%" cy="38%" r="62%">
          <stop offset="0%"  stopColor={ORG2}/>
          <stop offset="45%" stopColor={ORG}/>
          <stop offset="100%" stopColor={ORG3}/>
        </radialGradient>
        <radialGradient id="hgR" cx="45%" cy="32%" r="58%">
          <stop offset="0%"  stopColor={ORG2}/>
          <stop offset="50%" stopColor={ORG}/>
          <stop offset="100%" stopColor={ORG3}/>
        </radialGradient>
      </defs>

      {/* ══ WING FLAP GROUP ══ */}
      <motion.g
        animate={landed ? {scaleX:1} : {scaleX:[1,.06,1,.04,1]}}
        transition={landed
          ? {duration:.5,ease:[.16,1,.3,1]}
          : {duration:1.8,repeat:Infinity,ease:[.45,0,.55,1]}}
        style={{transformOrigin:'85px 56px'}}
      >

        {/* ════ LEFT FOREWING ════ */}
        {/* Black backing = creates thick border */}
        <path d="M 85,26 C 73,8 50,0 20,6 C 2,10 -5,26 5,40 C 13,52 36,60 64,64 C 75,66 85,60 85,52 Z" fill={BLK}/>
        {/* Orange fill — inset ~9px to leave border */}
        <path d="M 85,30 C 75,14 54,7 28,13 C 12,17 7,31 15,42 C 22,52 43,58 68,61 C 77,63 85,57 85,52 Z" fill="url(#fg)"/>
        {/* ── Cell veins ── */}
        {/* Main radial vein 1 (upper) */}
        <path d="M 85,44 C 66,36 44,26 22,16" fill="none" stroke={BLK} strokeWidth="2.4"/>
        {/* Radial 2 */}
        <path d="M 85,46 C 66,40 46,34 26,30" fill="none" stroke={BLK} strokeWidth="2"/>
        {/* Radial 3 */}
        <path d="M 85,48 C 68,46 50,44 32,44" fill="none" stroke={BLK} strokeWidth="2"/>
        {/* Median */}
        <path d="M 85,50 C 70,50 54,52 40,54" fill="none" stroke={BLK} strokeWidth="1.8"/>
        {/* Cubital */}
        <path d="M 85,51 C 74,54 62,58 52,60" fill="none" stroke={BLK} strokeWidth="1.6"/>
        {/* Discal cell cross-vein */}
        <path d="M 44,26 C 42,32 40,40 44,48" fill="none" stroke={BLK} strokeWidth="1.8"/>
        {/* ── Apex white spots ── */}
        <circle cx="19" cy="5"  r="4"   fill="white" opacity=".95"/>
        <circle cx="31" cy="2"  r="3.2" fill="white" opacity=".9"/>
        <circle cx="43" cy="0"  r="2.8" fill="white" opacity=".86"/>
        <circle cx="55" cy="0"  r="2.4" fill="white" opacity=".82"/>
        <circle cx="65" cy="2"  r="2"   fill="white" opacity=".78"/>
        {/* ── Outer margin spots ── */}
        <circle cx="3"  cy="22" r="3.2" fill="white" opacity=".9"/>
        <circle cx="2"  cy="34" r="2.8" fill="white" opacity=".86"/>
        <circle cx="4"  cy="44" r="2.8" fill="white" opacity=".86"/>
        <circle cx="9"  cy="53" r="2.4" fill="white" opacity=".82"/>
        {/* ── Lower border spots ── */}
        <circle cx="22" cy="63" r="2.4" fill="white" opacity=".84"/>
        <circle cx="34" cy="65" r="2"   fill="white" opacity=".8"/>
        <circle cx="45" cy="65" r="1.8" fill="white" opacity=".76"/>

        {/* ════ LEFT HINDWING ════ */}
        <path d="M 85,52 C 68,62 36,70 26,86 C 18,98 30,108 50,104 C 68,100 85,84 85,68 Z" fill={BLK}/>
        <path d="M 85,55 C 70,65 42,72 34,86 C 27,97 37,104 54,100 C 70,96 85,81 85,68 Z" fill="url(#hg)"/>
        {/* Hindwing veins */}
        <path d="M 85,62 C 68,68 48,76 36,86" fill="none" stroke={BLK} strokeWidth="2.2"/>
        <path d="M 85,66 C 72,72 56,80 46,90" fill="none" stroke={BLK} strokeWidth="2"/>
        <path d="M 85,60 C 72,64 56,70 46,76" fill="none" stroke={BLK} strokeWidth="1.8"/>
        <path d="M 85,58 C 76,60 64,64 56,68" fill="none" stroke={BLK} strokeWidth="1.6"/>
        {/* Hindwing spots */}
        <circle cx="25" cy="88"  r="3.4" fill="white" opacity=".92"/>
        <circle cx="28" cy="99"  r="3"   fill="white" opacity=".88"/>
        <circle cx="38" cy="107" r="2.8" fill="white" opacity=".86"/>
        <circle cx="50" cy="108" r="2.4" fill="white" opacity=".82"/>
        <circle cx="62" cy="105" r="2.2" fill="white" opacity=".8"/>

        {/* ════ RIGHT FOREWING (mirror) ════ */}
        <path d="M 85,26 C 97,8 120,0 150,6 C 168,10 175,26 165,40 C 157,52 134,60 106,64 C 95,66 85,60 85,52 Z" fill={BLK}/>
        <path d="M 85,30 C 95,14 116,7 142,13 C 158,17 163,31 155,42 C 148,52 127,58 102,61 C 93,63 85,57 85,52 Z" fill="url(#fgR)"/>
        <path d="M 85,44 C 104,36 126,26 148,16" fill="none" stroke={BLK} strokeWidth="2.4"/>
        <path d="M 85,46 C 104,40 124,34 144,30" fill="none" stroke={BLK} strokeWidth="2"/>
        <path d="M 85,48 C 102,46 120,44 138,44" fill="none" stroke={BLK} strokeWidth="2"/>
        <path d="M 85,50 C 100,50 116,52 130,54" fill="none" stroke={BLK} strokeWidth="1.8"/>
        <path d="M 85,51 C 96,54 108,58 118,60" fill="none" stroke={BLK} strokeWidth="1.6"/>
        <path d="M 126,26 C 128,32 130,40 126,48" fill="none" stroke={BLK} strokeWidth="1.8"/>
        <circle cx="151" cy="5"  r="4"   fill="white" opacity=".95"/>
        <circle cx="139" cy="2"  r="3.2" fill="white" opacity=".9"/>
        <circle cx="127" cy="0"  r="2.8" fill="white" opacity=".86"/>
        <circle cx="115" cy="0"  r="2.4" fill="white" opacity=".82"/>
        <circle cx="105" cy="2"  r="2"   fill="white" opacity=".78"/>
        <circle cx="167" cy="22" r="3.2" fill="white" opacity=".9"/>
        <circle cx="168" cy="34" r="2.8" fill="white" opacity=".86"/>
        <circle cx="166" cy="44" r="2.8" fill="white" opacity=".86"/>
        <circle cx="161" cy="53" r="2.4" fill="white" opacity=".82"/>
        <circle cx="148" cy="63" r="2.4" fill="white" opacity=".84"/>
        <circle cx="136" cy="65" r="2"   fill="white" opacity=".8"/>
        <circle cx="125" cy="65" r="1.8" fill="white" opacity=".76"/>

        {/* ════ RIGHT HINDWING (mirror) ════ */}
        <path d="M 85,52 C 102,62 134,70 144,86 C 152,98 140,108 120,104 C 102,100 85,84 85,68 Z" fill={BLK}/>
        <path d="M 85,55 C 100,65 128,72 136,86 C 143,97 133,104 116,100 C 100,96 85,81 85,68 Z" fill="url(#hgR)"/>
        <path d="M 85,62 C 102,68 122,76 134,86" fill="none" stroke={BLK} strokeWidth="2.2"/>
        <path d="M 85,66 C 98,72 114,80 124,90"  fill="none" stroke={BLK} strokeWidth="2"/>
        <path d="M 85,60 C 98,64 114,70 124,76"  fill="none" stroke={BLK} strokeWidth="1.8"/>
        <path d="M 85,58 C 94,60 106,64 114,68"  fill="none" stroke={BLK} strokeWidth="1.6"/>
        <circle cx="145" cy="88"  r="3.4" fill="white" opacity=".92"/>
        <circle cx="142" cy="99"  r="3"   fill="white" opacity=".88"/>
        <circle cx="132" cy="107" r="2.8" fill="white" opacity=".86"/>
        <circle cx="120" cy="108" r="2.4" fill="white" opacity=".82"/>
        <circle cx="108" cy="105" r="2.2" fill="white" opacity=".8"/>
      </motion.g>

      {/* ══ BODY ══ */}
      {/* Abdomen */}
      <ellipse cx="85" cy="72" rx="4" ry="22" fill={BLK}/>
      {/* white abdominal bands */}
      {[62,68,74,80,86].map(y => (
        <ellipse key={y} cx="85" cy={y} rx="3.2" ry="1.2" fill="rgba(255,255,255,.18)"/>
      ))}
      {/* Thorax */}
      <ellipse cx="85" cy="50" rx="5.5" ry="8" fill={BLK}/>
      {/* Head */}
      <circle cx="85" cy="40" r="6" fill={BLK}/>
      {/* Head spots */}
      <circle cx="82" cy="38" r="1.8" fill="white" opacity=".55"/>
      <circle cx="88" cy="38" r="1.8" fill="white" opacity=".55"/>

      {/* ══ ANTENNAE ══ */}
      <motion.path d="M 83,35 Q 68,18 56,4"
        fill="none" stroke={BLK} strokeWidth="1.8" strokeLinecap="round"
        animate={{rotate:[-6,6,-6]}}
        transition={{duration:3,repeat:Infinity,ease:'easeInOut'}}
        style={{transformOrigin:'83px 35px'}}
      />
      <circle cx="56" cy="4" r="3.8" fill={BLK}/>
      <circle cx="55" cy="3" r="1.5" fill="rgba(255,255,255,.35)"/>

      <motion.path d="M 87,35 Q 102,18 114,4"
        fill="none" stroke={BLK} strokeWidth="1.8" strokeLinecap="round"
        animate={{rotate:[5,-5,5]}}
        transition={{duration:3,repeat:Infinity,ease:'easeInOut',delay:.5}}
        style={{transformOrigin:'87px 35px'}}
      />
      <circle cx="114" cy="4" r="3.8" fill={BLK}/>
      <circle cx="115" cy="3" r="1.5" fill="rgba(255,255,255,.35)"/>

      {landed && (
        <motion.ellipse cx="85" cy="133" rx="32" ry="5"
          fill="rgba(200,90,0,.1)"
          initial={{opacity:0,scaleX:0}}
          animate={{opacity:1,scaleX:1}}
          transition={{duration:.7}}
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
      setPos({ x: window.innerWidth * 0.14, y: window.innerHeight * 0.72 });
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
        <ButterflySVG landed={tired}/>
        {showLabel && (
          <motion.div
            initial={{opacity:0,y:4}} animate={{opacity:1,y:0}}
            transition={{duration:.4}}
            style={{
              position:'absolute', bottom:-22, left:'50%', transform:'translateX(-50%)',
              whiteSpace:'nowrap', fontSize:11, fontWeight:600,
              color:'#C96B10', letterSpacing:'.05em', fontFamily:'Inter, sans-serif',
            }}
          >
            catch me →
          </motion.div>
        )}
      </motion.div>
    </>
  );
}

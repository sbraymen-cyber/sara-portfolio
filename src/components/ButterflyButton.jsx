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
        animate={landed ? {scaleX:1} : {scaleX:[1,.08,1,.06,1]}}
        transition={landed
          ? {duration:.6,ease:[.16,1,.3,1]}
          : {duration:3.2,repeat:Infinity,ease:[.45,0,.55,1]}}
        style={{transformOrigin:'85px 58px'}}
      >

        {/* ════ LEFT FOREWING — elongated triangle, proper monarch shape ════ */}
        {/* Black backing */}
        <path d="M 85,28 C 76,12 52,2 24,6 C 8,10 2,22 6,36 C 10,48 20,56 85,54 Z" fill={BLK}/>
        {/* Orange inset */}
        <path d="M 85,30 C 78,16 56,8 30,12 C 16,15 10,26 14,38 C 18,49 30,54 85,52 Z" fill="url(#fg)"/>
        {/* Veins — fan from body out */}
        <path d="M 85,42 C 64,34 40,22 18,12"  fill="none" stroke={BLK} strokeWidth="2.2"/>
        <path d="M 85,44 C 64,38 42,30 22,24"  fill="none" stroke={BLK} strokeWidth="2"/>
        <path d="M 85,46 C 66,44 46,40 28,38"  fill="none" stroke={BLK} strokeWidth="2"/>
        <path d="M 85,48 C 70,48 52,48 36,50"  fill="none" stroke={BLK} strokeWidth="1.8"/>
        <path d="M 85,50 C 74,52 62,54 50,54"  fill="none" stroke={BLK} strokeWidth="1.6"/>
        {/* Discal cross-vein */}
        <path d="M 38,22 C 36,30 36,40 40,48"  fill="none" stroke={BLK} strokeWidth="1.8"/>
        {/* Apex spots */}
        <circle cx="22" cy="5"  r="4"   fill="white" opacity=".95"/>
        <circle cx="34" cy="2"  r="3.2" fill="white" opacity=".9"/>
        <circle cx="46" cy="0"  r="2.8" fill="white" opacity=".86"/>
        <circle cx="58" cy="1"  r="2.4" fill="white" opacity=".82"/>
        <circle cx="68" cy="3"  r="2"   fill="white" opacity=".78"/>
        {/* Outer margin spots */}
        <circle cx="4"  cy="22" r="3.2" fill="white" opacity=".9"/>
        <circle cx="3"  cy="34" r="2.8" fill="white" opacity=".86"/>
        <circle cx="5"  cy="45" r="2.6" fill="white" opacity=".84"/>
        {/* Lower border spots */}
        <circle cx="16" cy="55" r="2.4" fill="white" opacity=".84"/>
        <circle cx="28" cy="57" r="2"   fill="white" opacity=".8"/>
        <circle cx="40" cy="57" r="1.8" fill="white" opacity=".76"/>

        {/* ════ LEFT HINDWING — wide rounded fan ════ */}
        {/* Black backing */}
        <path d="M 85,54 C 70,58 44,64 28,78 C 14,90 18,106 36,108 C 54,110 72,100 85,72 Z" fill={BLK}/>
        {/* Orange inset */}
        <path d="M 85,57 C 72,61 48,68 34,80 C 22,91 26,104 40,105 C 56,106 72,97 85,72 Z" fill="url(#hg)"/>
        {/* Hindwing veins */}
        <path d="M 85,63 C 70,68 52,76 38,86"  fill="none" stroke={BLK} strokeWidth="2.2"/>
        <path d="M 85,67 C 72,74 58,82 48,92"  fill="none" stroke={BLK} strokeWidth="2"/>
        <path d="M 85,61 C 74,65 60,70 50,76"  fill="none" stroke={BLK} strokeWidth="1.8"/>
        <path d="M 85,59 C 78,62 68,66 60,70"  fill="none" stroke={BLK} strokeWidth="1.6"/>
        {/* Hindwing spots */}
        <circle cx="26" cy="82"  r="3.2" fill="white" opacity=".92"/>
        <circle cx="22" cy="94"  r="2.8" fill="white" opacity=".88"/>
        <circle cx="28" cy="104" r="2.8" fill="white" opacity=".86"/>
        <circle cx="40" cy="108" r="2.4" fill="white" opacity=".82"/>
        <circle cx="52" cy="108" r="2.2" fill="white" opacity=".8"/>
        <circle cx="63" cy="104" r="2"   fill="white" opacity=".78"/>

        {/* ════ RIGHT FOREWING (mirror) ════ */}
        <path d="M 85,28 C 94,12 118,2 146,6 C 162,10 168,22 164,36 C 160,48 150,56 85,54 Z" fill={BLK}/>
        <path d="M 85,30 C 92,16 114,8 140,12 C 154,15 160,26 156,38 C 152,49 140,54 85,52 Z" fill="url(#fgR)"/>
        <path d="M 85,42 C 106,34 130,22 152,12" fill="none" stroke={BLK} strokeWidth="2.2"/>
        <path d="M 85,44 C 106,38 128,30 148,24" fill="none" stroke={BLK} strokeWidth="2"/>
        <path d="M 85,46 C 104,44 124,40 142,38" fill="none" stroke={BLK} strokeWidth="2"/>
        <path d="M 85,48 C 100,48 118,48 134,50" fill="none" stroke={BLK} strokeWidth="1.8"/>
        <path d="M 85,50 C 96,52 108,54 120,54"  fill="none" stroke={BLK} strokeWidth="1.6"/>
        <path d="M 132,22 C 134,30 134,40 130,48" fill="none" stroke={BLK} strokeWidth="1.8"/>
        <circle cx="148" cy="5"  r="4"   fill="white" opacity=".95"/>
        <circle cx="136" cy="2"  r="3.2" fill="white" opacity=".9"/>
        <circle cx="124" cy="0"  r="2.8" fill="white" opacity=".86"/>
        <circle cx="112" cy="1"  r="2.4" fill="white" opacity=".82"/>
        <circle cx="102" cy="3"  r="2"   fill="white" opacity=".78"/>
        <circle cx="166" cy="22" r="3.2" fill="white" opacity=".9"/>
        <circle cx="167" cy="34" r="2.8" fill="white" opacity=".86"/>
        <circle cx="165" cy="45" r="2.6" fill="white" opacity=".84"/>
        <circle cx="154" cy="55" r="2.4" fill="white" opacity=".84"/>
        <circle cx="142" cy="57" r="2"   fill="white" opacity=".8"/>
        <circle cx="130" cy="57" r="1.8" fill="white" opacity=".76"/>

        {/* ════ RIGHT HINDWING (mirror) ════ */}
        <path d="M 85,54 C 100,58 126,64 142,78 C 156,90 152,106 134,108 C 116,110 98,100 85,72 Z" fill={BLK}/>
        <path d="M 85,57 C 98,61 122,68 136,80 C 148,91 144,104 130,105 C 114,106 98,97 85,72 Z" fill="url(#hgR)"/>
        <path d="M 85,63 C 100,68 118,76 132,86"  fill="none" stroke={BLK} strokeWidth="2.2"/>
        <path d="M 85,67 C 98,74 112,82 122,92"   fill="none" stroke={BLK} strokeWidth="2"/>
        <path d="M 85,61 C 96,65 110,70 120,76"   fill="none" stroke={BLK} strokeWidth="1.8"/>
        <path d="M 85,59 C 92,62 102,66 110,70"   fill="none" stroke={BLK} strokeWidth="1.6"/>
        <circle cx="144" cy="82"  r="3.2" fill="white" opacity=".92"/>
        <circle cx="148" cy="94"  r="2.8" fill="white" opacity=".88"/>
        <circle cx="142" cy="104" r="2.8" fill="white" opacity=".86"/>
        <circle cx="130" cy="108" r="2.4" fill="white" opacity=".82"/>
        <circle cx="118" cy="108" r="2.2" fill="white" opacity=".8"/>
        <circle cx="107" cy="104" r="2"   fill="white" opacity=".78"/>
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

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBreakpoint } from '../hooks/useBreakpoint';

const QUESTIONS = [
  { q: "What does 'JTBD' stand for in product thinking?", options: ["Just The Business Decisions", "Jobs To Be Done", "Journey To Brand Discovery", "Just Test Before Deploying"], answer: 1, category: "Product" },
  { q: "What is 'few-shot prompting'?", options: ["Fine-tuning on a small dataset", "Providing examples in the prompt to guide the model's output", "Reducing API token usage", "Running a model with limited compute"], answer: 1, category: "AI" },
  { q: "What is the 'double diamond' design process?", options: ["A Figma pricing tier", "Two phases of diverge-then-converge thinking: discover + define, then develop + deliver", "Two overlapping user personas", "An A/B testing methodology"], answer: 1, category: "Design" },
  { q: "What is 'RAG' in the context of AI?", options: ["Red-Amber-Green status system", "Retrieval-Augmented Generation", "Recursive Agent Graph", "Real-time Analytics Gateway"], answer: 1, category: "AI" },
  { q: "Hick's Law states that:", options: ["Users prefer dark mode by default", "Decision time increases with the number of choices", "Simpler interfaces always outperform complex ones", "Users scan pages in an F-shaped pattern"], answer: 1, category: "Design" },
  { q: "What is a 'design system'?", options: ["A Figma enterprise subscription", "A collection of reusable components, tokens, and guidelines that define a product's visual and interaction language", "The grid structure underlying a layout", "A method for scoring UX quality"], answer: 1, category: "Design" },
  { q: "In PM prioritization, what does MoSCoW stand for?", options: ["Most Critical, Sometimes Needed, Could Wait, Won't Do", "Must Have, Should Have, Could Have, Won't Have", "Minimum Output for Scrum Cadence, Objectives Worth", "A Russian agile framework"], answer: 1, category: "Product" },
  { q: "What is 'hallucination' in AI?", options: ["When a model generates unusually vivid images", "When a model confidently produces false or fabricated information", "When a model refuses to answer a question", "A type of adversarial attack on a model"], answer: 1, category: "AI" },
  { q: "Who wrote 'The Design of Everyday Things'?", options: ["Steve Jobs", "Dieter Rams", "Don Norman", "Jony Ive"], answer: 2, category: "Design" },
  { q: "What is Figma Make primarily used for?", options: ["Exporting assets to developers", "Generating interactive prototypes and code from natural language prompts", "Creating component libraries", "Running usability tests inside Figma"], answer: 1, category: "Design" },
  { q: "What does OKR stand for?", options: ["Optimal Knowledge Repository", "Objectives and Key Results", "Ongoing KPI Report", "Output and Key Requirements"], answer: 1, category: "Product" },
  { q: "What is 'multimodal AI'?", options: ["AI that runs across multiple servers", "AI that can process and generate multiple data types — text, image, audio, and more", "AI with distinct personality modes", "AI that chains multiple models together"], answer: 1, category: "AI" },
  { q: "Fitts's Law describes:", options: ["The ideal ratio of signal to noise in a UI", "The time to acquire a target as a function of its distance and size", "The cognitive load introduced by a user interface", "How users mentally model a system"], answer: 1, category: "Design" },
  { q: "What is 'vibe coding'?", options: ["Using color psychology in product design", "Describing intent to an AI and letting it write the code", "A Spotify-developed frontend framework", "Testing copy using emotional response scoring"], answer: 1, category: "AI" },
  { q: "What are 'dark patterns' in UX?", options: ["High-contrast color schemes for accessibility", "UI designs that trick users into unintended actions", "Interfaces optimized for dark mode", "A/B tests that deliberately underperform"], answer: 1, category: "Design" },
  { q: "What is 'prompt engineering'?", options: ["Building the hardware that runs AI models", "Crafting inputs to reliably get desired outputs from AI models", "Designing microcopy and tooltips in product UI", "A technique for compressing model weights"], answer: 1, category: "AI" },
  { q: "What is an 'agentic' AI workflow?", options: ["A model that only responds to one question at a time", "A system where an AI autonomously plans, uses tools, and takes multi-step actions to complete a goal", "An AI optimized for customer service", "A model fine-tuned on agent-specific data"], answer: 1, category: "AI" },
  { q: "In UX, what is a 'happy path'?", options: ["The animation played on success states", "The ideal user journey through a product with no errors or detours", "A positive NPS score from user testing", "The onboarding flow for first-time users"], answer: 1, category: "Design" },
  { q: "What does WCAG stand for?", options: ["Web Content Accessibility Guidelines", "World Coalition for AI Governance", "Web Component Architecture Guide", "Wireframe Component and Grid"], answer: 0, category: "Design" },
  { q: "What is 'context window' in AI?", options: ["The visible area of a UI component", "The maximum amount of text a model can process in a single interaction", "A technique for displaying AI-generated content progressively", "The training data timeframe a model was exposed to"], answer: 1, category: "AI" },
];

const CAT = {
  Design: { color: 'var(--accent)', emoji: '✏️' },
  Product: { color: 'var(--accent-sage)', emoji: '📦' },
  AI: { color: 'var(--accent-warm)', emoji: '🤖' },
};

const CORRECT_MSGS = ["Nice!", "That's right!", "You know your stuff.", "Correct!", "Nailed it.", "Yes!", "Exactly.", "Sharp."];
const WRONG_MSGS = ["Ooh, close.", "Not quite.", "Good guess though.", "Worth knowing!", "Tricky one.", "Almost."];
const STREAK_MSGS = { 3: "🔥 On a roll", 5: "🔥🔥 Unstoppable", 7: "🔥🔥🔥 Are you Sara??" };

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

function Confetti({ x, y }) {
  const pieces = Array.from({ length: 12 }, (_, i) => ({
    angle: (i / 12) * 360,
    color: ['var(--accent)', 'var(--accent-warm)', 'var(--accent-sage)', '#fff'][i % 4],
    size: 4 + Math.random() * 5,
  }));
  return (
    <div style={{ position: 'fixed', left: x, top: y, pointerEvents: 'none', zIndex: 9999 }}>
      {pieces.map((p, i) => (
        <motion.div key={i}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: Math.cos(p.angle * Math.PI / 180) * (50 + Math.random() * 60), y: Math.sin(p.angle * Math.PI / 180) * (50 + Math.random() * 60) + 30, opacity: 0, scale: 0.3 }}
          transition={{ duration: 0.7 + Math.random() * 0.4, ease: 'easeOut' }}
          style={{ position: 'absolute', width: p.size, height: p.size, borderRadius: 2, background: p.color, transform: `rotate(${p.angle}deg)` }}
        />
      ))}
    </div>
  );
}

export default function Play() {
  const { isMobile, isTablet } = useBreakpoint();
  const px = isMobile ? 20 : isTablet ? 32 : 48;

  const [questions] = useState(() => shuffle(QUESTIONS).slice(0, 10));
  const [step, setStep] = useState(-1);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [revealed, setRevealed] = useState(false);
  const [streak, setStreak] = useState(0);
  const [confettiPos, setConfettiPos] = useState(null);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const btnRefs = useRef([]);

  const q = step >= 0 && step < questions.length ? questions[step] : null;
  const score = answers.filter(Boolean).length;

  function startGame() { setStep(0); setAnswers([]); setSelected(null); setRevealed(false); setStreak(0); }
  function restart() { setStep(-1); setAnswers([]); setSelected(null); setRevealed(false); setStreak(0); }

  function pick(i, e) {
    if (revealed) return;
    setSelected(i);
    setRevealed(true);
    const correct = i === q.answer;
    const newStreak = correct ? streak + 1 : 0;
    setStreak(newStreak);
    setFeedbackMsg(correct
      ? CORRECT_MSGS[Math.floor(Math.random() * CORRECT_MSGS.length)]
      : WRONG_MSGS[Math.floor(Math.random() * WRONG_MSGS.length)]);
    if (correct && e) {
      const rect = e.currentTarget.getBoundingClientRect();
      setConfettiPos({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      setTimeout(() => setConfettiPos(null), 1200);
    }
  }

  function next() {
    const correct = selected === q.answer;
    const newAnswers = [...answers, correct];
    setAnswers(newAnswers);
    setSelected(null);
    setRevealed(false);
    setFeedbackMsg('');
    setStep(s => s + 1 >= questions.length ? questions.length : s + 1);
  }

  function resultLabel(s) {
    if (s === 10) return { title: 'Perfect score.', sub: "Ok, show-off. Sara's impressed." };
    if (s >= 8)  return { title: 'Really solid.', sub: 'Strong across design, product, and AI. You clearly think about this stuff.' };
    if (s >= 6)  return { title: 'Pretty good!', sub: "Good instincts. A few blind spots, but honestly, same." };
    if (s >= 4)  return { title: 'Not bad.', sub: "Some good moments in there. The AI questions are tough." };
    return { title: 'Okay, well.', sub: "Sara's hiring, not judging. (Mostly.)" };
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--text-1)' }}>
      {confettiPos && <Confetti x={confettiPos.x} y={confettiPos.y} />}

      <div style={{ maxWidth: 700, margin: '0 auto', padding: `${isMobile ? 100 : 140}px ${px}px ${isMobile ? 80 : 120}px` }}>
        <AnimatePresence mode="wait">

          {/* Intro */}
          {step === -1 && (
            <motion.div key="intro"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 20 }}>
                while you wait for sara to reply
              </p>
              <h1 style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: isMobile ? 'clamp(40px, 10vw, 60px)' : 'clamp(52px, 7vw, 76px)',
                fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.0,
                color: 'var(--text-1)', marginBottom: 24,
              }}>
                Design &amp; AI<br />
                <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>trivia.</em>
              </h1>
              <p style={{ fontSize: 17, color: 'var(--text-2)', lineHeight: 1.7, maxWidth: 460, marginBottom: 40 }}>
                10 questions. No fluff. If you score 8 or higher, Sara will definitely want to talk to you.
              </p>
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 52 }}>
                {Object.entries(CAT).map(([name, { color, emoji }]) => (
                  <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>{emoji}</span>
                    <span style={{ fontSize: 13, color: 'var(--text-2)', fontWeight: 500 }}>{name}</span>
                  </div>
                ))}
              </div>
              <motion.button
                onClick={startGame}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: 'var(--accent)', color: '#fff', border: 'none',
                  borderRadius: 100, padding: '16px 40px',
                  fontSize: 16, fontWeight: 600, cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(45,64,48,0.2)',
                }}
              >
                Let's go →
              </motion.button>
            </motion.div>
          )}

          {/* Question */}
          {q && (
            <motion.div key={`q-${step}`}
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>

              {/* Progress bar */}
              <div style={{ marginBottom: 36 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 16 }}>{CAT[q.category].emoji}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-3)' }}>{q.category}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {streak >= 3 && (
                      <motion.span
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent-warm)' }}>
                        {STREAK_MSGS[Math.max(...Object.keys(STREAK_MSGS).filter(k => k <= streak).map(Number))] || `🔥 ${streak} streak`}
                      </motion.span>
                    )}
                    <span style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 500 }}>{step + 1} / {questions.length}</span>
                  </div>
                </div>
                <div style={{ height: 3, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
                  <motion.div
                    animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ height: '100%', background: CAT[q.category].color, borderRadius: 3 }}
                  />
                </div>
              </div>

              <h2 style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: isMobile ? 22 : 29, fontWeight: 400,
                letterSpacing: '-0.02em', lineHeight: 1.3,
                color: 'var(--text-1)', marginBottom: 28,
              }}>{q.q}</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                {q.options.map((opt, i) => {
                  const isSelected = selected === i;
                  const isCorrect = i === q.answer;
                  let bg = 'transparent', border = 'var(--border-md)', color = 'var(--text-1)', weight = 400;
                  if (revealed) {
                    if (isCorrect) { bg = 'rgba(45,107,94,0.1)'; border = CAT[q.category].color; color = CAT[q.category].color; weight = 600; }
                    else if (isSelected) { bg = 'rgba(160,72,37,0.07)'; border = 'rgba(160,72,37,0.4)'; color = 'var(--accent-warm)'; }
                    else { color = 'var(--text-3)'; }
                  }
                  return (
                    <motion.button
                      key={i}
                      ref={el => btnRefs.current[i] = el}
                      onClick={e => pick(i, e)}
                      whileHover={!revealed ? { x: 6, borderColor: CAT[q.category].color } : {}}
                      transition={{ duration: 0.15 }}
                      style={{
                        background: bg, border: `1px solid ${border}`,
                        borderRadius: 14, padding: '15px 20px',
                        fontSize: 15, color, textAlign: 'left', fontWeight: weight,
                        cursor: revealed ? 'default' : 'pointer',
                        fontFamily: 'inherit',
                        transition: 'background 0.2s, border-color 0.2s, color 0.2s',
                        display: 'flex', alignItems: 'center', gap: 14,
                      }}
                    >
                      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: revealed && isCorrect ? CAT[q.category].color : revealed && isSelected ? 'var(--accent-warm)' : 'var(--text-3)', minWidth: 18 }}>
                        {['A', 'B', 'C', 'D'][i]}
                      </span>
                      <span style={{ flex: 1 }}>{opt}</span>
                      {revealed && isCorrect && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ fontSize: 16 }}>✓</motion.span>}
                      {revealed && isSelected && !isCorrect && <span style={{ fontSize: 14, opacity: 0.6 }}>✗</span>}
                    </motion.button>
                  );
                })}
              </div>

              <AnimatePresence>
                {revealed && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                    <motion.button
                      onClick={next}
                      whileHover={{ scale: 1.03, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        background: 'var(--accent)', color: '#fff', border: 'none',
                        borderRadius: 100, padding: '13px 28px',
                        fontSize: 14, fontWeight: 600, cursor: 'pointer',
                      }}
                    >
                      {step + 1 >= questions.length ? 'See results →' : 'Next →'}
                    </motion.button>
                    {feedbackMsg && (
                      <motion.span
                        initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                        style={{ fontSize: 14, color: selected === q.answer ? 'var(--accent)' : 'var(--text-3)', fontStyle: 'italic' }}>
                        {feedbackMsg}
                      </motion.span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Results */}
          {step === questions.length && (
            <motion.div key="results"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>

              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 20 }}>
                Results
              </p>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 16 }}>
                <motion.span
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 14 }}
                  style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontSize: isMobile ? 80 : 108, fontWeight: 400,
                    letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--accent)',
                  }}>{score}</motion.span>
                <span style={{ fontSize: 28, color: 'var(--border-md)', fontWeight: 300 }}>/ 10</span>
              </div>

              <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: isMobile ? 28 : 38, fontWeight: 400, letterSpacing: '-0.025em', color: 'var(--text-1)', marginBottom: 10 }}>
                {resultLabel(score).title}
              </h2>
              <p style={{ fontSize: 16, color: 'var(--text-2)', lineHeight: 1.7, maxWidth: 440, marginBottom: 44 }}>
                {resultLabel(score).sub}
              </p>

              {/* Breakdown */}
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 28, marginBottom: 44 }}>
                <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 20 }}>Breakdown</p>
                {questions.map((q, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                    style={{ display: 'flex', gap: 14, paddingBottom: 14, marginBottom: 14, borderBottom: i < questions.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <span style={{ fontSize: 14, flexShrink: 0, marginTop: 2, color: answers[i] ? 'var(--accent)' : 'var(--accent-warm)' }}>
                      {answers[i] ? '✓' : '✗'}
                    </span>
                    <div>
                      <p style={{ fontSize: 13, color: 'var(--text-1)', marginBottom: 3, lineHeight: 1.4 }}>{q.q}</p>
                      <p style={{ fontSize: 12, color: 'var(--text-3)' }}>
                        <span style={{ color: CAT[q.category].color, fontWeight: 600 }}>{q.options[q.answer]}</span>
                        {' · '}{CAT[q.category].emoji} {q.category}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <motion.button onClick={restart} whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                  style={{ background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 100, padding: '13px 28px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                  Play again →
                </motion.button>
                <a href="/#contact"
                  style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid var(--border-md)', borderRadius: 100, padding: '13px 28px', fontSize: 14, fontWeight: 500, color: 'var(--text-2)', textDecoration: 'none', transition: 'color 0.15s, border-color 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-1)'; e.currentTarget.style.borderColor = 'var(--text-3)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-2)'; e.currentTarget.style.borderColor = 'var(--border-md)'; }}>
                  Get in touch →
                </a>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}

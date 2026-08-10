import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBreakpoint } from '../hooks/useBreakpoint';

const QUESTIONS = [
  {
    q: "What does 'JTBD' stand for in product thinking?",
    options: ["Just The Business Decisions", "Jobs To Be Done", "Journey To Brand Discovery", "Just Test Before Deploying"],
    answer: 1,
    category: "Product",
  },
  {
    q: "What is 'few-shot prompting'?",
    options: ["Giving an AI model a small dataset to fine-tune on", "Providing examples in the prompt to guide the model's output", "A method for reducing API token usage", "Running a model with limited compute"],
    answer: 1,
    category: "AI",
  },
  {
    q: "What is the 'double diamond' design process?",
    options: ["A Figma pricing tier", "Two phases of diverge-then-converge thinking: discover + define, then develop + deliver", "Two overlapping user personas", "An A/B testing methodology"],
    answer: 1,
    category: "Design",
  },
  {
    q: "What is 'RAG' in the context of AI?",
    options: ["Red-Amber-Green status system", "Retrieval-Augmented Generation", "Recursive Agent Graph", "Real-time Analytics Gateway"],
    answer: 1,
    category: "AI",
  },
  {
    q: "Hick's Law states that:",
    options: ["Users prefer dark mode by default", "Decision time increases logarithmically with the number of choices", "Simpler interfaces always outperform complex ones", "Users scan pages in an F-shaped pattern"],
    answer: 1,
    category: "Design",
  },
  {
    q: "What is a 'design system'?",
    options: ["A Figma enterprise subscription", "A collection of reusable components, tokens, and guidelines that define a product's visual and interaction language", "The grid structure underlying a layout", "A method for scoring UX quality"],
    answer: 1,
    category: "Design",
  },
  {
    q: "In PM prioritization, what does MoSCoW stand for?",
    options: ["Most Critical, Sometimes Needed, Could Wait, Won't Do", "Must Have, Should Have, Could Have, Won't Have", "Minimum Output for Scrum Cadence and Objectives Worth", "A Russian agile framework"],
    answer: 1,
    category: "Product",
  },
  {
    q: "What is 'hallucination' in AI?",
    options: ["When a model generates unusually vivid images", "When a model confidently produces false or fabricated information", "When a model refuses to answer a question", "A type of adversarial attack on a model"],
    answer: 1,
    category: "AI",
  },
  {
    q: "Who wrote 'The Design of Everyday Things'?",
    options: ["Steve Jobs", "Dieter Rams", "Don Norman", "Jony Ive"],
    answer: 2,
    category: "Design",
  },
  {
    q: "What is Figma Make primarily used for?",
    options: ["Exporting assets to developers", "Generating interactive prototypes and code from natural language prompts", "Creating component libraries", "Running usability tests inside Figma"],
    answer: 1,
    category: "Design",
  },
  {
    q: "What does OKR stand for?",
    options: ["Optimal Knowledge Repository", "Objectives and Key Results", "Ongoing KPI Report", "Output and Key Requirements"],
    answer: 1,
    category: "Product",
  },
  {
    q: "What is 'multimodal AI'?",
    options: ["AI that runs across multiple servers", "AI that can process and generate multiple data types — text, image, audio, and more", "AI with distinct personality modes", "AI that chains multiple models together"],
    answer: 1,
    category: "AI",
  },
  {
    q: "Fitts's Law describes:",
    options: ["The ideal ratio of signal to noise in a UI", "The time to acquire a target as a function of its distance and size", "The cognitive load introduced by a user interface", "How users mentally model a system"],
    answer: 1,
    category: "Design",
  },
  {
    q: "What is 'vibe coding'?",
    options: ["Using color psychology in product design", "Describing intent to an AI and letting it write the code", "A Spotify-developed frontend framework", "Testing copy using emotional response scoring"],
    answer: 1,
    category: "AI",
  },
  {
    q: "What are 'dark patterns' in UX?",
    options: ["High-contrast color schemes for accessibility", "UI designs that trick users into unintended actions", "Interfaces optimized for dark mode", "A/B tests that deliberately underperform"],
    answer: 1,
    category: "Design",
  },
  {
    q: "What is 'prompt engineering'?",
    options: ["Building the hardware that runs AI models", "Crafting inputs to reliably get desired outputs from AI models", "Designing microcopy and tooltips in product UI", "A technique for compressing model weights"],
    answer: 1,
    category: "AI",
  },
  {
    q: "What is an 'agentic' AI workflow?",
    options: ["A model that only responds to one question at a time", "A system where an AI autonomously plans, uses tools, and takes multi-step actions to complete a goal", "An AI optimized for customer service", "A model fine-tuned on agent-specific data"],
    answer: 1,
    category: "AI",
  },
  {
    q: "In UX, what is a 'happy path'?",
    options: ["The animation played on success states", "The ideal user journey through a product with no errors or detours", "A positive NPS score from user testing", "The onboarding flow for first-time users"],
    answer: 1,
    category: "Design",
  },
  {
    q: "What does WCAG stand for?",
    options: ["Web Content Accessibility Guidelines", "World Coalition for AI Governance", "Web Component Architecture Guide", "Wireframe Component and Grid"],
    answer: 0,
    category: "Design",
  },
  {
    q: "What is 'context window' in AI?",
    options: ["The visible area of a UI component", "The maximum amount of text a model can process in a single interaction", "A technique for displaying AI-generated content progressively", "The training data timeframe a model was exposed to"],
    answer: 1,
    category: "AI",
  },
];

const CATEGORY_COLOR = {
  Design: 'var(--accent)',
  Product: 'var(--accent-sage)',
  AI: 'var(--accent-warm)',
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Play() {
  const { isMobile, isTablet } = useBreakpoint();
  const px = isMobile ? 20 : isTablet ? 32 : 48;

  const [questions] = useState(() => shuffle(QUESTIONS).slice(0, 10));
  const [step, setStep] = useState(-1); // -1 = intro, 0-9 = question, 10 = results
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [revealed, setRevealed] = useState(false);

  const q = step >= 0 && step < questions.length ? questions[step] : null;
  const score = answers.filter(Boolean).length;

  function startGame() { setStep(0); setAnswers([]); setSelected(null); setRevealed(false); }
  function restart() { setStep(-1); setAnswers([]); setSelected(null); setRevealed(false); }

  function pick(i) {
    if (revealed) return;
    setSelected(i);
    setRevealed(true);
  }

  function next() {
    const correct = selected === q.answer;
    const newAnswers = [...answers, correct];
    setAnswers(newAnswers);
    setSelected(null);
    setRevealed(false);
    if (step + 1 >= questions.length) {
      setStep(questions.length);
    } else {
      setStep(s => s + 1);
    }
  }

  function resultLabel(s) {
    if (s === 10) return { title: 'Perfect score.', sub: 'You belong at the table.' };
    if (s >= 8)  return { title: 'Genuinely impressive.', sub: 'Strong instincts across design, product, and AI.' };
    if (s >= 6)  return { title: 'Solid.', sub: "You know your stuff. A few blind spots, but who doesn't." };
    if (s >= 4)  return { title: 'Room to grow.', sub: 'Some good instincts. The AI questions might be worth revisiting.' };
    return { title: 'Hey, at least you tried.', sub: "Sara's hiring, not judging. (Well, a little.)" };
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--text-1)' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: `${isMobile ? 100 : 140}px ${px}px ${isMobile ? 80 : 120}px` }}>

        <AnimatePresence mode="wait">

          {/* Intro */}
          {step === -1 && (
            <motion.div key="intro"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 24 }}>
                While you wait
              </p>
              <h1 style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: isMobile ? 'clamp(40px, 10vw, 56px)' : 'clamp(52px, 7vw, 72px)',
                fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.05,
                color: 'var(--text-1)', marginBottom: 20,
              }}>
                Design, Product<br />& AI Trivia
              </h1>
              <p style={{ fontSize: 17, color: 'var(--text-2)', lineHeight: 1.7, maxWidth: 480, marginBottom: 48 }}>
                10 questions. No fluff. Covers UX principles, modern product thinking, and the AI landscape — the stuff that actually matters right now.
              </p>
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 64 }}>
                {['Design', 'Product', 'AI'].map(cat => (
                  <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: CATEGORY_COLOR[cat] }} />
                    <span style={{ fontSize: 13, color: 'var(--text-2)', fontWeight: 500 }}>{cat}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={startGame}
                style={{
                  background: 'var(--accent)', color: '#fff', border: 'none',
                  borderRadius: 100, padding: '15px 36px',
                  fontSize: 15, fontWeight: 600, cursor: 'pointer',
                  transition: 'background 0.15s, transform 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-hover)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                Start →
              </button>
            </motion.div>
          )}

          {/* Question */}
          {q && (
            <motion.div key={`q-${step}`}
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>

              {/* Progress */}
              <div style={{ marginBottom: 40 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: CATEGORY_COLOR[q.category] }} />
                    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-3)' }}>{q.category}</span>
                  </div>
                  <span style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 500 }}>{step + 1} / {questions.length}</span>
                </div>
                <div style={{ height: 2, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
                  <motion.div
                    animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{ height: '100%', background: CATEGORY_COLOR[q.category], borderRadius: 2 }}
                  />
                </div>
              </div>

              <h2 style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: isMobile ? 22 : 28, fontWeight: 400,
                letterSpacing: '-0.02em', lineHeight: 1.3,
                color: 'var(--text-1)', marginBottom: 32,
              }}>{q.q}</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
                {q.options.map((opt, i) => {
                  const isSelected = selected === i;
                  const isCorrect = i === q.answer;
                  let bg = 'transparent';
                  let border = 'var(--border-md)';
                  let color = 'var(--text-1)';
                  if (revealed) {
                    if (isCorrect) { bg = 'rgba(45,107,94,0.1)'; border = 'rgba(45,107,94,0.5)'; color = 'var(--accent)'; }
                    else if (isSelected && !isCorrect) { bg = 'rgba(160,72,37,0.08)'; border = 'rgba(160,72,37,0.35)'; color = 'var(--accent-warm)'; }
                  }
                  return (
                    <motion.button
                      key={i}
                      onClick={() => pick(i)}
                      whileHover={!revealed ? { x: 4 } : {}}
                      transition={{ duration: 0.15 }}
                      style={{
                        background: bg, border: `1px solid ${border}`,
                        borderRadius: 12, padding: '14px 20px',
                        fontSize: 15, color, textAlign: 'left',
                        cursor: revealed ? 'default' : 'pointer',
                        fontFamily: 'inherit', fontWeight: isCorrect && revealed ? 600 : 400,
                        transition: 'background 0.2s, border-color 0.2s, color 0.2s',
                        display: 'flex', alignItems: 'center', gap: 12,
                      }}
                    >
                      <span style={{
                        fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
                        color: revealed && isCorrect ? 'var(--accent)' : revealed && isSelected ? 'var(--accent-warm)' : 'var(--text-3)',
                        minWidth: 20, flexShrink: 0,
                      }}>
                        {['A', 'B', 'C', 'D'][i]}
                      </span>
                      {opt}
                      {revealed && isCorrect && <span style={{ marginLeft: 'auto', fontSize: 16 }}>✓</span>}
                      {revealed && isSelected && !isCorrect && <span style={{ marginLeft: 'auto', fontSize: 14 }}>✗</span>}
                    </motion.button>
                  );
                })}
              </div>

              {revealed && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                  <button
                    onClick={next}
                    style={{
                      background: 'var(--accent)', color: '#fff', border: 'none',
                      borderRadius: 100, padding: '13px 28px',
                      fontSize: 14, fontWeight: 600, cursor: 'pointer',
                      transition: 'background 0.15s, transform 0.15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-hover)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    {step + 1 >= questions.length ? 'See results →' : 'Next →'}
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Results */}
          {step === questions.length && (
            <motion.div key="results"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>

              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 24 }}>
                Results
              </p>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 20 }}>
                <span style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: isMobile ? 72 : 96, fontWeight: 400,
                  letterSpacing: '-0.04em', lineHeight: 1,
                  color: 'var(--accent)',
                }}>{score}</span>
                <span style={{ fontSize: 24, color: 'var(--text-3)', fontWeight: 300 }}>/ 10</span>
              </div>

              <h2 style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: isMobile ? 28 : 36, fontWeight: 400,
                letterSpacing: '-0.025em', color: 'var(--text-1)', marginBottom: 12,
              }}>{resultLabel(score).title}</h2>
              <p style={{ fontSize: 16, color: 'var(--text-2)', lineHeight: 1.7, maxWidth: 460, marginBottom: 48 }}>
                {resultLabel(score).sub}
              </p>

              {/* Breakdown */}
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 32, marginBottom: 48 }}>
                <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 20 }}>Breakdown</p>
                {questions.map((q, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 14,
                    paddingBottom: 16, marginBottom: 16,
                    borderBottom: i < questions.length - 1 ? '1px solid var(--border)' : 'none',
                  }}>
                    <span style={{
                      fontSize: 14, flexShrink: 0, marginTop: 2,
                      color: answers[i] ? 'var(--accent)' : 'var(--accent-warm)',
                    }}>{answers[i] ? '✓' : '✗'}</span>
                    <div>
                      <p style={{ fontSize: 14, color: 'var(--text-1)', marginBottom: 4, lineHeight: 1.4 }}>{q.q}</p>
                      <p style={{ fontSize: 12, color: 'var(--text-3)' }}>
                        <span style={{ color: 'var(--accent)', fontWeight: 500 }}>{q.options[q.answer]}</span>
                        {' '}·{' '}
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: CATEGORY_COLOR[q.category], display: 'inline-block' }} />
                          {q.category}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <button
                  onClick={restart}
                  style={{
                    background: 'var(--accent)', color: '#fff', border: 'none',
                    borderRadius: 100, padding: '13px 28px',
                    fontSize: 14, fontWeight: 600, cursor: 'pointer',
                    transition: 'background 0.15s, transform 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-hover)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  Play again →
                </button>
                <a href="/#contact" style={{
                  background: 'transparent', color: 'var(--text-2)',
                  border: '1px solid var(--border-md)',
                  borderRadius: 100, padding: '13px 28px',
                  fontSize: 14, fontWeight: 500, cursor: 'pointer',
                  textDecoration: 'none', display: 'inline-block',
                  transition: 'color 0.15s, border-color 0.15s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-1)'; e.currentTarget.style.borderColor = 'var(--text-3)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-2)'; e.currentTarget.style.borderColor = 'var(--border-md)'; }}
                >
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

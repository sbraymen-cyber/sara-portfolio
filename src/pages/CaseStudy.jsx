import { useRef, useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useBreakpoint } from '../hooks/useBreakpoint';

/* ─── Data ────────────────────────────────────────── */
export const STUDIES = {
  'broadstreet-clinical': {
    slug: 'broadstreet-clinical',
    company: 'Evernorth / Cigna',
    title: 'Clinical Intelligence Platform',
    tagline: "Four years as lead designer on a healthcare platform at a Fortune 15 company. Built from nothing, shipped three versions.",
    role: 'Lead Designer & Product Manager',
    timeline: '2022 – 2026',
    accent: '#2D6B5E',
    accentRgb: '45,107,94',
    tags: ['Enterprise UX', 'Healthcare', 'Data Visualization', 'User Research', 'Design Systems', 'Cross-functional', 'Systems Thinking', 'Information Architecture', 'Population Health', 'ArcGIS'],
    stats: [
      { value: 'Fortune 15', label: 'Evernorth / Cigna — one of the largest healthcare companies in the US' },
      { value: '182M', label: 'patient records made searchable' },
      { value: '100k+', label: 'users across three shipped versions' },
    ],
    challenge: "Evernorth's 182M patient records were locked behind SQL. The researchers, clinicians, and analysts who needed to ask questions of that data had no real interface to do it with.",
    carousel: [
      { src: '/case-studies/broadstreet-clinical/welcome-1.png', caption: 'Broadstreet — welcome screen and product entry point' },
      { src: '/case-studies/broadstreet-clinical/search-filter.png', caption: 'Search filter — demographics, condition, and treatment controls with live summary' },
      { src: '/case-studies/broadstreet-clinical/search-ai.png', caption: 'Broadstreet AI — natural language query fills filters in real time' },
      { src: '/case-studies/broadstreet-clinical/search-results.png', caption: 'Search results — top market with map, patient count, and provider density' },
      { src: '/case-studies/broadstreet-clinical/screen-2.webp', caption: 'Result details — physician profile popup with specialty, address, and patient density map' },
    ],
    discoveryHeading: 'Becoming the Subject Matter Expert',
    discoveryBody: [
      "I spent months listening before opening a design tool — joining engineering standups, interviewing clinicians and analysts, learning what 'coverage gap' means to different people in the same organization. The personas below came out of that work.",
    ],
    discoveryImages: [
      { src: '/case-studies/broadstreet-clinical/screen-6.webp', caption: 'Mark — Evernorth Data Analyst persona' },
      { src: '/case-studies/broadstreet-clinical/screen-5.webp', caption: 'Martina — Goals, influences, needs, and pain points' },
    ],
    approachColumns: true,
    approach: [
      { title: 'Research first', body: "Months of discovery before Figma: clinician interviews, engineering standups, learning the data model." },
      { title: 'Geography as the frame', body: "Built around the ArcGIS map. Every filter and result surfaces in relation to place, because that's how researchers think." },
      { title: 'Designing for lab screens and real hands', body: "Touchable, mobile-friendly components alongside a web interface. Learning the design system while balancing stakeholder feedback that shifted quickly." },
    ],
    evolution: [
      { era: '2022–2023', label: 'Wizard Flow', body: 'Step-by-step guided search. Users found it constraining. Experienced researchers wanted all options visible at once, not locked behind sequential steps.' },
      { era: '2024–2025', label: 'Side Panel Search', body: 'Persistent filter panel alongside the map. Faster to first search, but as the filter set expanded, the panel stopped scaling for power users with complex queries.' },
      { era: '2026–Present', label: 'AI-Powered Search', body: 'Natural language entry: "Find PCOS patients in regions with limited reproductive endocrinologist access." Conversational intent, visual refinement. Early prototypes show strong user preference.' },
    ],
    pullQuote: null,
    outcome: "Broadstreet is now the primary research tool for clinical population analysis at Evernorth, used by over 100,000 people. Search time dropped from hours to seconds across three shipped versions.",
    nextSteps: [
      'Expand to external health systems and payers, applying the same interface model to a B2B2C context with different trust and permissions constraints.',
      'Build a saved cohort system so researchers can track a patient population over time, not just run one-off queries.',
      'Explore mobile-first views for clinical field teams who need population data at the point of care, not just at a desk.',
    ],
  },

  'broadstreet-ai': {
    slug: 'broadstreet-ai',
    company: 'Evernorth / Cigna',
    title: 'Conversational AI Agent',
    tagline: "An AI agent for clinical research at Evernorth. 96% of tested users called it a must-have.",
    role: 'Lead Designer & Product Manager',
    timeline: '2025 – Present',
    accent: '#5B4F8C',
    accentRgb: '91,79,140',
    tags: ['Generative AI', 'Conversational UX', 'Enterprise', 'User Research', 'Interaction Design', 'Multi-turn Dialogue', 'Prompt Design', 'AI Safety UX', 'Knowledge Transfer', 'Healthcare AI'],
    stats: [
      { value: '96%', label: 'of tested users rated it a "must have"' },
      { value: '100k+', label: 'users on the Broadstreet platform' },
      { value: 'Fortune 15', label: 'Evernorth / Cigna — enterprise healthcare at scale' },
    ],
    challenge: "Broadstreet is an internal tool at Evernorth for exploring anonymized patient data. It started as a platform for clinical researchers — finding patient populations, identifying coverage gaps, locating physicians by specialty. Now we're expanding it to a broader set of analysts looking for healthcare trends and physician patterns across large datasets.\n\nThe challenge with adding AI was that the database was more powerful than most users realized, but learning it well took time they didn't have. More documentation wasn't the answer. What was needed was something that could sit alongside a researcher, help them build a search in real time, and step back once they no longer needed help.",
    images: [
      { src: '/case-studies/broadstreet-ai/welcome-1.png', caption: 'Broadstreet — welcome screen and product entry point' },
      { src: '/case-studies/broadstreet-ai/screen-2.webp', caption: 'Search filter + AI panel open — side-by-side before the pop-up decision' },
      { src: '/case-studies/broadstreet-ai/screen-3.webp', caption: 'Broadstreet AI panel open — "Tell me about the patients you\'re looking for"' },
      { src: '/case-studies/broadstreet-ai/screen-4.webp', caption: 'AI fills cardiovascular filters autonomously from a natural language prompt' },
      { src: '/case-studies/broadstreet-ai/screen-5.webp', caption: 'Agent response — "Help me find patients with Type 2 diabetes" with auto-filled filters' },
      { src: '/case-studies/broadstreet-ai/screen-6.webp', caption: 'PTSD conversation — agent clarifying scope and asking follow-up questions' },
      { src: '/case-studies/broadstreet-ai/screen-7.webp', caption: 'Agent refining PTSD search — narrowing by condition, specialty, and location' },
      { src: '/case-studies/broadstreet-ai/screen-8.webp', caption: 'Complex multi-condition query — cardiovascular + PTSD with female patient filter' },
      { src: '/case-studies/broadstreet-ai/screen-9.webp', caption: 'Final confirmed search — filters locked and ready to run' },
    ],
    teamProcess: {
      intro: "Working documentation from the FigJam we used to map the three-phase roadmap: conversational querying, agentic action, then fraud and waste detection.",
      images: [
        { src: '/case-studies/broadstreet-ai/figjam-roadmap.png', caption: 'Team FigJam — mapping the Chat → Agentic → Fraud, Waste & Abuse roadmap' },
      ],
    },
    evolution: [
      { era: 'V1', label: 'The Popup Agent', body: 'A floating chat bubble that answered questions but couldn\'t touch the UI. Users still had to act on every suggestion themselves.', img: '/case-studies/broadstreet-ai/v1-popup.png' },
      { era: 'V2', label: 'The Sidebar Agent', body: 'Persistent right-panel with direct filter access. The agent could build a complete search on your behalf — shifting from advisor to collaborator.', img: '/case-studies/broadstreet-ai/screen-3.webp' },
      { era: 'V3', label: 'Structured Components', body: 'Mid-conversation UI handoffs: date pickers, map selections, ICD browsers surfaced at the moment they\'re needed. Prose when prose is enough.', img: '/case-studies/broadstreet-ai/v2-icd-codes.png' },
    ],
    video: { src: '/case-studies/broadstreet-ai/demo.mp4', caption: 'Live demo — John Snow filling search filters from a natural language prompt' },
    approachColumns: true,
    approach: [
      { title: 'Doing, not just telling', body: "John Snow makes selections on your behalf — it fills filters, not just describes them. It steps back the moment you don't need it." },
      { title: 'Designing the edges', body: "What the agent shouldn't do mattered as much as what it could. Every scope boundary was a deliberate design decision." },
      { title: 'Constraints as design inputs', body: "Context window limits and hallucination risk became design questions worked through directly with engineers, not blockers." },
    ],
    pullQuote: "The hardest design problem wasn't building an agent that could answer clinical questions. It was building one that knew when to stop talking and let the researcher do the work.",
    outcome: "96% of tested users called it a must-have. John Snow now handles the query construction phase — the part of the workflow where researchers used to give up.",
    nextSteps: [
      'Add physician primary address to search results so researchers can locate providers geographically, not just by specialty.',
      'Build a compare populations feature so analysts can run two searches side-by-side and identify differences across cohorts.',
      'Continue expanding non-AI capabilities — the core search and filter experience still has room to grow independently of the agent.',
    ],
  },

  'louisiana-housing': {
    slug: 'louisiana-housing',
    company: 'Horne LLP',
    title: 'Emergency Housing Relief',
    tagline: "$300M in COVID housing relief tracked across four states in real time.",
    role: 'Data Visualization Designer & Developer',
    timeline: 'Apr 2021 – Apr 2022',
    accent: '#8B6230',
    accentRgb: '139,98,48',
    tags: ['Data Visualization', 'Information Architecture', 'WCAG Accessibility', 'User Research', 'SQL', 'Power BI', 'Stakeholder Alignment', 'Government Programs', 'Data Pipeline', 'Emergency Relief'],
    stats: [
      { value: '$300M', label: 'in COVID housing relief tracked in real time' },
      { value: '4→45s', label: 'minutes to seconds — average time-to-decision after the redesign' },
      { value: '4', label: 'states, each with different schemas, eligibility rules, and funding structures' },
    ],
    discoveryHeading: 'Research in the Field',
    discoveryBody: [
      "Six interviews with program managers in Louisiana, Mississippi, and Texas — all actively processing housing applications. Average time to find a specific applicant's status: over 4 minutes. Two couldn't find it at all without switching systems. After the redesign: under 45 seconds.",
    ],
    challenge: "The data that could have told program managers where the money was stuck — which applications were stalled, which families were still waiting — existed. It just required SQL to reach. The people responsible for moving that money were navigating blind.",
    housingFlow: true,
    carousel: [
      { src: '/case-studies/louisiana-housing/dash-1.webp', caption: 'Louisiana — overview dashboard: disbursements, pipeline, parish-level map' },
      { src: '/case-studies/louisiana-housing/dash-2.webp', caption: 'Louisiana — applications: stage breakdown, arrearage, LHC/HCA referrals' },
      { src: '/case-studies/louisiana-housing/dash-3.webp', caption: 'Louisiana — statewide view: top parishes by applications and disbursement' },
      { src: '/case-studies/louisiana-housing/dash-4.webp', caption: 'Louisiana — mortgages: servicer breakdown, delinquency days, federal loan program' },
      { src: '/case-studies/louisiana-housing/dash-5.webp', caption: 'Louisiana — demographics: employment, race, gender, veteran status, disability' },
    ],
    approach: [
      { title: 'Decision-first architecture', body: "I asked each program director what decision they needed to make that morning. Every dashboard view was built around that answer, not around what data was available." },
      { title: 'Design and data both', body: "I wrote the SQL, maintained real-time refresh across four state schemas, and stayed close to the pipeline throughout. The handoff wasn't an endpoint." },
      { title: 'WCAG as a real constraint', body: "High-stakes decisions, often on hardware people didn't choose. Accessibility shaped every color and label, not just the checklist." },
      { title: 'Legible in 30 seconds', body: "Program directors were policy people, not data people. Each view had to work in a leadership meeting where someone had half a minute to assess a disbursement." },
    ],
    pullQuote: "Partway through this project, I spoke briefly with someone who was waiting on housing assistance. She had no idea what I was building. That conversation stayed with me. It made every subsequent design decision feel more consequential than any stakeholder review ever could.",
    outcome: "Program administrators went from week-old spreadsheets to live dashboards across four states. Time-to-decision dropped from over 4 minutes to under 45 seconds.",
    nextSteps: [
      'Replace Power BI with a custom-built web dashboard: browser-native, offline-capable, and accessible without a Power BI license for field workers on state-issued hardware.',
      'Add a predictive flags view: surface applications that are trending toward delay so program managers can act before they miss the funding window.',
      'Build a cross-state comparison layer so federal overseers can benchmark disbursement velocity across all four programs simultaneously.',
    ],
  },

  'sar-consumer': {
    slug: 'sar-consumer',
    company: 'Sar — Passion project',
    title: 'Sar: Zero-Friction Receipt',
    tagline: "Designed it, built it, incorporated it. NFC tap to Apple Wallet in under 3 seconds.",
    role: 'Founder & Lead Designer',
    timeline: '2024 – Present',
    accent: '#3D5E8C',
    accentRgb: '61,94,140',
    tags: ['Interaction Design', 'iOS', 'Apple Wallet', 'NFC', 'Two-sided UX', 'User Research', 'Zero-friction Design', 'App Clips', 'Merchant UX', 'Digital Receipts', 'Hardware-free'],
    stats: [
      { value: '< 3s', label: 'NFC tap to Apple Wallet receipt' },
      { value: '$0.04', label: 'per receipt — designed the pricing model myself' },
      { value: '3+', label: 'active pilots across Boulder & Denver, CO' },
    ],
    imagesNote: "These are early lo-fi concept screens from 2022 — the starting point. The aesthetic has changed significantly since then.",
    compactCarousel: true,
    images: [
      { src: '/case-studies/sar-consumer/img-2.webp', caption: 'The shoebox moment: what receipts actually become' },
      { src: '/case-studies/sar-consumer/img-3.webp', caption: 'Consumer frustration is the design brief' },
      { src: '/case-studies/sar-consumer/screen-wallet.webp', caption: 'Apple Wallet receipt: the end state the entire product is built around' },
      { src: '/case-studies/sar-consumer/screen-nfc.webp', caption: 'NFC tap flow: the 3-second consumer interaction' },
      { src: '/case-studies/sar-consumer/screen-transactions.webp', caption: 'Transaction history: receipt data organized automatically post-tap' },
    ],
    fieldPhotos: [
      { src: '/case-studies/sar-consumer/website-consumer.png', caption: 'Consumer site — built in React/Vite, deployed to Cloudflare Pages' },
      { src: '/case-studies/sar-consumer/website-business.png', caption: 'Merchant site — separate landing page for the business-side pitch' },
      { src: '/case-studies/sar-consumer/website-pricing.png', caption: '$0.04 per receipt — pricing page I designed, wrote, and shipped' },
    ],
    discoveryHeading: 'Listening at the Point of Payment',
    discoveryBody: [
      "Eight in-person interviews at Boulder and Denver coffee shops, right after people paid. 7 of 8 threw their paper receipt away immediately. The word that came up most: automatic. 3 of 8 had given a fake email at a POS terminal just to avoid marketing. That pointed directly to Apple Wallet — already trusted, no marketing risk.",
    ],
    challenge: "Every digital receipt product before this one asked the customer to do something — type an email, download an app, create an account. That friction is why paper receipts still exist. The question: what if they never have to do anything at all?",
    approach: [
      { title: 'Zero friction as a rule', body: "The consumer should never do anything they wouldn't already do at checkout. That eliminated email forms and app prompts before I drew a wireframe." },
      { title: 'Why Wallet', body: "Apple Wallet already lives on every iPhone, trusted for boarding passes and concert tickets. The full app earns its download later, after trust is established." },
      { title: 'Two separate journeys', body: "Consumer never sees the merchant dashboard. Merchant never sees the consumer flow. Two distinct experiences sharing one backend." },
      { title: 'Merchant setup that disappears', body: "No new hardware. The NFC reader is already on every modern POS. One connection, and receipts trigger automatically on every sale." },
      { title: 'Built it myself', body: "React/Vite site, Supabase database, PassKit integration, merchant sign-up flow. Incorporated as a C Corp. Every technical decision is mine." },
      { title: 'Physical prototype', body: "Built an NFC hardware prototype in spring 2026 to run the full checkout flow in person with pilot merchants, without needing a live integration." },
    ],
    researchPlan: {
      title: 'Active Research Questions',
      items: [
        { phase: 'First-tap clarity', body: 'In-store intercepts at pilot locations — was the gesture obvious? Was Apple Wallet the expected destination? Where did hesitation happen and why?' },
        { phase: 'Return behavior', body: 'Do customers who tapped once tap again on a return visit? Whether this is habit-forming or a novelty determines the entire acquisition strategy.' },
        { phase: 'App download trigger', body: 'What moved early users from Wallet receipt to full app download? Feature pull, a specific notification, or something else? That\'s the conversion funnel to optimize.' },
        { phase: 'Non-tappers', body: "Structured exit interviews with customers who saw the NFC prompt but didn't tap. Awareness gap, trust barrier, or just distracted? Different diagnoses, different design responses." },
      ],
    },
    pullQuote: null,
    colorPalette: [
      { hex: '#3D5E8C', name: 'Trust Blue', note: 'The whole product runs on trust — you\'re handing over your receipt data. Blue is the color that says "we\'re not going to sell this." Chosen very deliberately.' },
      { hex: '#6B8FB8', name: 'Sky', note: 'The lighter sibling. Used for hover states, secondary UI, anything that should feel open and unintimidating.' },
      { hex: '#E8F1FA', name: 'Ghost', note: 'Almost white, slightly blue. The background that makes the whole thing feel clean without feeling cold.' },
      { hex: '#1C2B3A', name: 'Midnight', note: 'Text color. Dark enough to read comfortably, warm enough not to feel like a spreadsheet.' },
    ],
    claudeNote: "This entire website — the consumer site, the merchant landing page, the pricing page — was built using Claude Code. I designed it, wrote the copy, and made every decision. Claude helped me move fast. That felt right for a product that\'s also built around AI.",
    liveUrl: 'https://sar-app.com',
    outcome: "I've built a PassKit integration that generates Apple Wallet passes and set up the Supabase database to support it. The hypothesis I'm testing: Apple Wallet is the right home base for receipts — already trusted, already on every iPhone, no app download required to get value from the first interaction.\n\nI'm working with 3 pilot businesses to get real merchant feedback, since they're the ones who will actually pay for this. That feedback is shaping the product more than any assumption I started with.\n\nThe longer vision is bigger than receipts. Itemized receipt data is genuinely valuable — for sustainability reporting, for accounting automation, for returns, for fraud detection, for business analytics. Sar could become the infrastructure layer underneath all of that. It's a side project for now, so it'll take time to get there. But the foundation is being built intentionally.",
    nextSteps: [
      'Complete the Square integration with the Denver pilot merchant — real transactions, real receipts, real feedback.',
      'Ship the consumer app so early users have somewhere to see their receipt history, not just a Wallet pass.',
      'Use the pilot to figure out the right sequencing — merchant-first, consumer-first, or simultaneous — before scaling.',
    ],
  },
};

/* ─── Components ──────────────────────────────────── */
function Stat({ value, label, accent }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0, margin: "0px 0px 200px 0px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45 }}>
      <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(32px, 6vw, 42px)', fontWeight: 400, letterSpacing: '-0.03em', color: accent, lineHeight: 1, marginBottom: 8 }}>{value}</div>
      <div style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.5 }}>{label}</div>
    </motion.div>
  );
}

function Section({ label, children }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0, margin: "0px 0px 200px 0px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
      style={{ paddingTop: 56, borderTop: '1px solid var(--border)', marginTop: 56 }}>
      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 20 }}>{label}</p>
      {children}
    </motion.div>
  );
}

function FloatingTags({ tags, accent, accentRgb }) {
  const POSITIONS = [
    // Right side
    { x: '56%', y: '10%', delay: 0.3,  dur: 6.8, drift: -7 },
    { x: '74%', y: '6%',  delay: 1.1,  dur: 7.4, drift: 6  },
    { x: '84%', y: '24%', delay: 1.6,  dur: 6.5, drift: -5 },
    { x: '60%', y: '50%', delay: 2.2,  dur: 7.1, drift: 8  },
    { x: '72%', y: '64%', delay: 0.7,  dur: 6.3, drift: -6 },
    { x: '64%', y: '36%', delay: 1.9,  dur: 7.6, drift: 5  },
    { x: '80%', y: '44%', delay: 3.1,  dur: 6.9, drift: -4 },
    { x: '58%', y: '78%', delay: 2.7,  dur: 7.2, drift: 7  },
    { x: '88%', y: '58%', delay: 4.0,  dur: 6.4, drift: -8 },
    // Left side (top and bottom to avoid text)
    { x: '2%',  y: '8%',  delay: 0.9,  dur: 7.0, drift: 5  },
    { x: '14%', y: '15%', delay: 2.4,  dur: 6.6, drift: -6 },
    { x: '5%',  y: '80%', delay: 1.4,  dur: 7.3, drift: 4  },
    { x: '18%', y: '88%', delay: 3.3,  dur: 6.7, drift: -5 },
    { x: '8%',  y: '70%', delay: 4.2,  dur: 7.5, drift: 6  },
    { x: '22%', y: '5%',  delay: 1.7,  dur: 6.2, drift: -4 },
    { x: '10%', y: '92%', delay: 2.9,  dur: 7.8, drift: 5  },
  ];
  return tags.map((tag, i) => {
    const p = POSITIONS[i % POSITIONS.length];
    return (
      <motion.div
        key={tag}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: [0, 0.9, 0.9, 0], y: [12, p.drift, p.drift * 0.4, p.drift - 4] }}
        transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, repeatDelay: p.dur * 0.6, ease: 'easeInOut' }}
        style={{
          position: 'absolute', left: p.x, top: p.y,
          fontSize: 11, fontWeight: 600, letterSpacing: '0.05em',
          background: `rgba(${accentRgb},0.1)`, color: accent,
          border: `1px solid rgba(${accentRgb},0.25)`,
          borderRadius: 100, padding: '5px 12px',
          pointerEvents: 'none', zIndex: 3, whiteSpace: 'nowrap',
          boxShadow: '0 2px 12px rgba(26,29,26,0.07)',
        }}
      >
        {tag}
      </motion.div>
    );
  });
}

function AppFlowMap() {
  const W = 760, H = 430;
  const NW = 148, NH = 62;

  const topRow = [
    { id: 'apply',  cx: 80,  cy: 100, label: 'Resident Applies',    sub: 'Portal or parish office',        type: 'start' },
    { id: 'elig',   cx: 267, cy: 100, label: 'Eligibility Review',  sub: 'Income · residency · COVID loss', type: 'process' },
    { id: 'docs',   cx: 453, cy: 100, label: 'Document Collection', sub: 'ID, lease, income verification',  type: 'process' },
    { id: 'assign', cx: 640, cy: 100, label: 'Case Assigned',       sub: 'Routed to parish manager',       type: 'process' },
  ];

  const bottomRow = [
    { id: 'queue',   cx: 640, cy: 300, label: 'Manager Review Queue',  sub: 'Tracked in spreadsheets',        type: 'pain' },
    { id: 'approve', cx: 453, cy: 300, label: 'Approval Decision',     sub: 'Approve · return · deny',        type: 'decision' },
    { id: 'disburse',cx: 267, cy: 300, label: 'Fund Disbursement',     sub: 'Direct to landlord or utility',  type: 'process' },
    { id: 'closed',  cx: 80,  cy: 300, label: 'Case Closed',           sub: 'Family receives assistance',     type: 'end' },
  ];

  const allNodes = [...topRow, ...bottomRow];

  const typeStyle = {
    start:    { bg: 'rgba(45,107,94,0.1)',  border: 'rgba(45,107,94,0.45)',  label: '#2D6B5E', sub: '#6C706B' },
    process:  { bg: 'rgba(26,29,26,0.04)', border: 'rgba(26,29,26,0.16)',  label: '#1A1D1A', sub: '#6C706B' },
    pain:     { bg: 'rgba(160,72,37,0.09)',border: 'rgba(160,72,37,0.38)', label: '#A04825', sub: '#6C706B' },
    decision: { bg: 'rgba(139,98,48,0.1)', border: 'rgba(139,98,48,0.42)', label: '#8B6230', sub: '#6C706B' },
    end:      { bg: 'rgba(139,98,48,0.14)',border: '#8B6230',               label: '#8B6230', sub: '#6C706B' },
  };

  const painBadges = [
    { x: 453, y: 156, text: 'Incomplete docs returned to applicant — no status update sent' },
    { x: 640, y: 200, text: 'Backlog invisible — status only visible in weekly batch reports' },
    { x: 453, y: 356, text: 'Disbursement timing unknown until a separate confirmation call' },
  ];

  return (
    <Section label="The Process I Was Designing For">
      <p style={{ fontSize: 14, color: 'var(--text-2)', maxWidth: 580, marginBottom: 32, lineHeight: 1.65 }}>
        This is the journey a housing assistance application moved through. Each gap between stages was a place where the data fell silent — where a family might wait for days with no one able to say exactly why.
      </p>
      <div style={{ overflowX: 'auto', borderRadius: 16, border: '1px solid var(--border-md)', background: 'var(--bg-surface)', padding: '20px 0 8px' }}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', minWidth: 620, display: 'block' }}
          aria-label="Housing assistance application process flow diagram" role="img">
          <defs>
            <marker id="arr-la" markerWidth="7" markerHeight="7" refX="5.5" refY="3.5" orient="auto">
              <path d="M0,0 L0,7 L7,3.5 z" fill="rgba(26,29,26,0.25)" />
            </marker>
          </defs>

          {/* Top row connectors → */}
          {topRow.slice(0,-1).map((n,i) => (
            <line key={`t${i}`}
              x1={n.cx + NW/2} y1={n.cy} x2={topRow[i+1].cx - NW/2} y2={topRow[i+1].cy}
              stroke="rgba(26,29,26,0.2)" strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#arr-la)" />
          ))}

          {/* Snake turn: right side down */}
          <path d={`M ${640} ${100+NH/2} C ${640} ${200}, ${640} ${200}, ${640} ${300-NH/2}`}
            fill="none" stroke="rgba(26,29,26,0.2)" strokeWidth="1.5"
            strokeDasharray="5 4" markerEnd="url(#arr-la)" />

          {/* Bottom row connectors ← */}
          {bottomRow.slice(0,-1).map((n,i) => (
            <line key={`b${i}`}
              x1={n.cx - NW/2} y1={n.cy} x2={bottomRow[i+1].cx + NW/2} y2={bottomRow[i+1].cy}
              stroke="rgba(26,29,26,0.2)" strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#arr-la)" />
          ))}

          {/* Nodes */}
          {allNodes.map(n => {
            const s = typeStyle[n.type];
            return (
              <g key={n.id}>
                <rect x={n.cx-NW/2} y={n.cy-NH/2} width={NW} height={NH} rx="10"
                  fill={s.bg} stroke={s.border} strokeWidth="1.25" />
                <text x={n.cx} y={n.cy - 9} textAnchor="middle"
                  fill={s.label} fontSize="12" fontWeight="600" fontFamily="inherit">{n.label}</text>
                <text x={n.cx} y={n.cy + 12} textAnchor="middle"
                  fill={s.sub} fontSize="10" fontFamily="inherit">{n.sub}</text>
              </g>
            );
          })}

          {/* Pain point badges */}
          {painBadges.map((b, i) => {
            const tw = 196, th = 34;
            return (
              <g key={i}>
                <rect x={b.x - tw/2} y={b.y - th/2} width={tw} height={th} rx="6"
                  fill="rgba(160,72,37,0.07)" stroke="rgba(160,72,37,0.28)" strokeWidth="1" />
                <text x={b.x} y={b.y - 5} textAnchor="middle"
                  fill="#A04825" fontSize="9.5" fontWeight="600" fontFamily="inherit">⚠ Visibility gap</text>
                <text x={b.x} y={b.y + 9} textAnchor="middle"
                  fill="#6C706B" fontSize="9" fontFamily="inherit">{b.text.split(' — ')[0]}</text>
              </g>
            );
          })}

          {/* Legend */}
          {[
            { x: 56,  color: 'rgba(45,107,94,0.45)',  bg: 'rgba(45,107,94,0.1)',  label: 'Start / end' },
            { x: 186, color: 'rgba(26,29,26,0.2)',    bg: 'rgba(26,29,26,0.04)',  label: 'Process stage' },
            { x: 316, color: 'rgba(139,98,48,0.42)',  bg: 'rgba(139,98,48,0.1)',  label: 'Decision point' },
            { x: 446, color: 'rgba(160,72,37,0.38)',  bg: 'rgba(160,72,37,0.09)', label: 'Visibility gap' },
          ].map((l,i) => (
            <g key={i}>
              <rect x={l.x} y={H-36} width={100} height={22} rx="5"
                fill={l.bg} stroke={l.color} strokeWidth="1" />
              <text x={l.x + 50} y={H-21} textAnchor="middle"
                fill="#6C706B" fontSize="9.5" fontFamily="inherit">{l.label}</text>
            </g>
          ))}
        </svg>
      </div>
    </Section>
  );
}

function AgentMap({ accent }) {
  const W = 760, H = 520;
  const NW = 188, NH = 58;

  const nodes = [
    { id: 'input',   cx: 380, cy: 56,  label: 'User prompt',         sub: '"Find PCOS patients in rural Colorado"', type: 'input' },
    { id: 'intent',  cx: 380, cy: 158, label: 'Intent parsing',       sub: 'Condition · Geography · Specialty',      type: 'process' },
    { id: 'scope',   cx: 104, cy: 274, label: 'Off-topic',            sub: 'Redirect gracefully',                    type: 'decision-no' },
    { id: 'clarify', cx: 380, cy: 274, label: 'Needs clarification',  sub: 'Ask 1 follow-up question',               type: 'decision' },
    { id: 'fill',    cx: 656, cy: 274, label: 'Confident mapping',    sub: 'Auto-fill filters silently',             type: 'decision-yes' },
    { id: 'confirm', cx: 380, cy: 382, label: 'Show user filters',    sub: 'Explain each choice in plain language',  type: 'process' },
    { id: 'edit',    cx: 164, cy: 470, label: 'User edits',           sub: 'Return to clarify loop',                 type: 'branch' },
    { id: 'run',     cx: 596, cy: 470, label: 'Confirm & run',        sub: 'Filters locked · search executes',       type: 'output' },
  ];

  const typeStyle = {
    'input':        { bg: 'rgba(91,79,140,0.15)',  border: '#5B4F8C',              label: '#1A1D1A', sub: '#5C605C' },
    'process':      { bg: 'rgba(26,29,26,0.04)',   border: 'rgba(26,29,26,0.18)', label: '#1A1D1A', sub: '#5C605C' },
    'decision':     { bg: 'rgba(196,154,90,0.12)', border: 'rgba(196,154,90,0.5)', label: '#8B6230', sub: '#5C605C' },
    'decision-yes': { bg: 'rgba(45,107,94,0.12)',  border: 'rgba(45,107,94,0.5)', label: '#2D6B5E',  sub: '#5C605C' },
    'decision-no':  { bg: 'rgba(200,80,60,0.1)',   border: 'rgba(200,80,60,0.4)', label: '#B04030',  sub: '#5C605C' },
    'branch':       { bg: 'rgba(26,29,26,0.03)',   border: 'rgba(26,29,26,0.12)', label: '#1A1D1A',  sub: '#5C605C' },
    'output':       { bg: 'rgba(91,79,140,0.18)',  border: '#5B4F8C',              label: '#1A1D1A',  sub: '#5C605C' },
  };

  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]));

  const edges = [
    ['input',  'intent',  null,        null],
    ['intent', 'scope',   'off-topic', '#B04030'],
    ['intent', 'clarify', 'unclear',   '#8B6230'],
    ['intent', 'fill',    'clear',     '#2D6B5E'],
    ['scope',  'confirm', null,        null],
    ['clarify','confirm', null,        null],
    ['fill',   'confirm', null,        null],
    ['confirm','edit',    'revise',    '#8C908B'],
    ['confirm','run',     'approve',   '#8C908B'],
  ];

  function edgePath(n1, n2) {
    const x1 = n1.cx, y1 = n1.cy + NH / 2;
    const x2 = n2.cx, y2 = n2.cy - NH / 2;
    const my = (y1 + y2) / 2;
    return `M ${x1} ${y1} C ${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`;
  }

  return (
    <Section label="Agent Decision Map">
      <p style={{ fontSize: 14, color: 'var(--text-2)', maxWidth: 560, marginBottom: 32, lineHeight: 1.65 }}>
        How John Snow routes a user prompt — from natural language to executed search. Every branch was a deliberate design decision; scope creep, hallucination, and ambiguous intent each required months of iteration.
      </p>
      <div style={{ overflowX: 'auto', borderRadius: 16, border: '1px solid var(--border-md)', background: 'var(--bg-surface)', padding: '16px 0' }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          style={{ width: '100%', minWidth: 580, display: 'block' }}
          aria-label="Agent decision map showing how user prompts are routed through intent parsing to search execution"
          role="img"
        >
          <defs>
            <marker id="arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0,0 L0,7 L7,3.5 z" fill="rgba(26,29,26,0.22)" />
            </marker>
          </defs>

          {edges.map(([a, b, label, labelColor], i) => {
            const n1 = nodeMap[a], n2 = nodeMap[b];
            const d = edgePath(n1, n2);
            const mx = (n1.cx + n2.cx) / 2;
            const my = (n1.cy + NH / 2 + n2.cy - NH / 2) / 2;
            return (
              <g key={i}>
                <path d={d} fill="none" stroke="rgba(26,29,26,0.18)" strokeWidth="1.5"
                  strokeDasharray="5 4" markerEnd="url(#arrow)" />
                {label && (
                  <text x={mx} y={my - 5} textAnchor="middle"
                    fill={labelColor} fontSize="11" fontWeight="600" fontFamily="inherit"
                    letterSpacing="0.04em">
                    {label}
                  </text>
                )}
              </g>
            );
          })}

          {nodes.map(n => {
            const s = typeStyle[n.type];
            return (
              <g key={n.id}>
                <rect
                  x={n.cx - NW / 2} y={n.cy - NH / 2}
                  width={NW} height={NH} rx="10"
                  fill={s.bg} stroke={s.border} strokeWidth="1.25"
                />
                <text x={n.cx} y={n.cy - 9} textAnchor="middle"
                  fill={s.label} fontSize="13" fontWeight="600" fontFamily="inherit">
                  {n.label}
                </text>
                <text x={n.cx} y={n.cy + 12} textAnchor="middle"
                  fill={s.sub} fontSize="10.5" fontFamily="inherit">
                  {n.sub}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </Section>
  );
}

const FRAME_STYLE = {
  border: '10px solid #FAFAF7',
  boxShadow: '0 6px 28px rgba(26,29,26,0.1), 0 1px 4px rgba(26,29,26,0.06)',
  borderRadius: 12,
  overflow: 'hidden',
};

function VideoPlayer({ src, caption }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  function play() {
    setPlaying(true);
    requestAnimationFrame(() => videoRef.current?.play());
  }

  return (
    <div style={{ marginTop: 56 }}>
      <div style={{ position: 'relative', ...FRAME_STYLE, background: '#0a0a0a', cursor: playing ? 'default' : 'pointer' }}
        onClick={!playing ? play : undefined}>
        <video
          ref={videoRef}
          src={src}
          controls={playing}
          playsInline
          preload="metadata"
          style={{ width: '100%', display: 'block', maxHeight: 600, objectFit: 'contain' }}
        />
        {!playing && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,0.38)',
          }}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: 68, height: 68, borderRadius: '50%',
                background: 'rgba(255,255,255,0.95)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M8 5.5l11 6.5-11 6.5V5.5z" fill="#1a1d1a"/>
              </svg>
            </motion.div>
            <p style={{ marginTop: 16, fontSize: 12, color: 'rgba(255,255,255,0.7)', fontWeight: 500, letterSpacing: '0.04em' }}>
              Click to watch
            </p>
          </div>
        )}
      </div>
      {caption && <p style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 10, paddingLeft: 4 }}>{caption}</p>}
    </div>
  );
}

function Carousel({ slides, accent, accentRgb, compact }) {
  const [idx, setIdx] = useState(0);

  // Preload all images up front; also eagerly preload prev/next neighbors
  useEffect(() => {
    slides.forEach(s => { const img = new Image(); img.src = s.src; });
  }, [slides]);
  useEffect(() => {
    const neighbors = [
      (idx + 1) % slides.length,
      (idx - 1 + slides.length) % slides.length,
    ];
    neighbors.forEach(i => { const img = new Image(); img.src = slides[i].src; });
  }, [idx, slides]);

  const prev = () => setIdx(i => (i - 1 + slides.length) % slides.length);
  const next = () => setIdx(i => (i + 1) % slides.length);
  const goTo = (i) => setIdx(i);

  return (
    <div style={{ marginTop: 56, maxWidth: compact ? 520 : '100%', margin: compact ? '56px auto 0' : '56px 0 0' }}>
      <div style={{ position: 'relative', borderRadius: 3, overflow: 'hidden', border: '10px solid #FAFAF7', boxShadow: '0 6px 28px rgba(100,70,30,0.13), 0 1px 4px rgba(100,70,30,0.07)', background: '#000', height: compact ? 680 : 520 }}>
        {slides.map((slide, i) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.caption}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'top',
              opacity: i === idx ? 1 : 0,
              transition: 'opacity 350ms ease-in-out',
              willChange: 'opacity',
              pointerEvents: 'none',
            }}
          />
        ))}
        <button onClick={prev} aria-label="Previous" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.85)', border: '1px solid var(--border-md)', borderRadius: 100, width: 40, height: 40, color: 'var(--text-1)', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>‹</button>
        <button onClick={next} aria-label="Next" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.85)', border: '1px solid var(--border-md)', borderRadius: 100, width: 40, height: 40, color: 'var(--text-1)', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>›</button>
        <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(255,255,255,0.9)', border: `1px solid rgba(${accentRgb},0.25)`, borderRadius: 100, padding: '3px 12px', fontSize: 11, fontWeight: 600, color: accent, letterSpacing: '0.06em', backdropFilter: 'blur(8px)' }}>
          {idx + 1} / {slides.length}
        </div>
      </div>
      <p style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 10, paddingLeft: 4 }}>{slides[idx].caption}</p>
      <div style={{ display: 'flex', gap: 6, marginTop: 14, paddingLeft: 4 }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}`} style={{ width: i === idx ? 20 : 6, height: 6, borderRadius: 100, background: i === idx ? accent : 'var(--border-md)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.25s' }} />
        ))}
      </div>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────── */
export default function CaseStudy() {
  const { slug } = useParams();
  const study = STUDIES[slug];
  if (!study) return <Navigate to="/" replace />;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isMobile, isTablet } = useBreakpoint();
  const px = isMobile ? 16 : isTablet ? 28 : 48;

  const { title, company, tagline, role, timeline, accent, accentRgb, tags, stats, challenge, approach, evolution, pullQuote, outcome } = study;

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--text-1)' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: `${isMobile ? 80 : 120}px ${px}px ${isMobile ? 60 : 100}px` }}>

        {/* Hero */}
        <div style={{ position: 'relative', overflow: 'visible', minHeight: isMobile ? 'auto' : '72vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {!isMobile && <FloatingTags tags={tags} accent={accent} accentRgb={accentRgb} />}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }} style={{ position: 'relative', zIndex: 2 }}>

          <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: isMobile ? 'clamp(32px, 8vw, 48px)' : 'clamp(40px, 6vw, 64px)', fontWeight: 400, letterSpacing: '-0.025em', color: 'var(--text-1)', marginBottom: 20, lineHeight: 1.1, maxWidth: '18ch' }}>{title}</h1>

          <p style={{ fontSize: isMobile ? 15 : 17, color: 'var(--text-2)', maxWidth: 560, marginBottom: 36, lineHeight: 1.7 }}>{tagline}</p>

          <div style={{ display: 'flex', gap: isMobile ? 24 : 40, flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 4 }}>Role</p>
              <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-1)' }}>{role}</p>
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 4 }}>Timeline</p>
              <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-1)' }}>{timeline}</p>
            </div>
          </div>
        </motion.div>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : `repeat(${stats.length}, 1fr)`,
          gap: isMobile ? '24px 16px' : 32,
          paddingTop: 56, borderTop: '1px solid var(--border)', marginTop: 56
        }}>
          {stats.map((s, i) => <Stat key={i} value={s.value} label={s.label} accent={accent} />)}
        </div>

        {/* Challenge */}
        <Section label="The Challenge">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {challenge.split('\n\n').map((para, i) => (
              <p key={i} style={{ fontSize: isMobile ? 15 : 17, color: 'var(--text-2)', maxWidth: 600, lineHeight: 1.7 }}>{para}</p>
            ))}
          </div>
        </Section>

        {/* Application process flow — Louisiana Housing */}
        {study.housingFlow && <AppFlowMap />}

        {/* Team process artifacts — Broadstreet AI (shown early, right after challenge) */}
        {study.teamProcess && (
          <Section label="How We Mapped It Out">
            <p style={{ fontSize: isMobile ? 15 : 17, color: 'var(--text-2)', maxWidth: 600, lineHeight: 1.75, marginBottom: 32 }}>
              {study.teamProcess.intro}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {study.teamProcess.images.map((img, i) => (
                <motion.figure key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0, margin: '0px 0px 200px 0px' }} transition={{ duration: 0.5, delay: i * 0.1 }} style={{ margin: 0 }}>
                  <div style={{ ...FRAME_STYLE }}>
                    <img src={img.src} alt={img.caption} loading="lazy" style={{ width: '100%', display: 'block' }} />
                  </div>
                  {img.caption && <figcaption style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 10, lineHeight: 1.5 }}>{img.caption}</figcaption>}
                </motion.figure>
              ))}
            </div>
          </Section>
        )}

        {/* Discovery / Research section */}
        {(study.discoveryBody || study.discoveryImages) && (
          <>
            <Section label={study.discoveryHeading || 'Discovery'}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {(study.discoveryBody || []).map((para, i) => (
                  <p key={i} style={{ fontSize: isMobile ? 15 : 17, color: 'var(--text-2)', maxWidth: 640, lineHeight: 1.75 }}>{para}</p>
                ))}
              </div>
            </Section>
            {study.discoveryImages && (
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 16 : 24, marginTop: 40 }}>
                {study.discoveryImages.map((img, i) => (
                  <motion.figure key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0, margin: '0px 0px 200px 0px' }} transition={{ duration: 0.5, delay: i * 0.1 }} style={{ margin: 0 }}>
                    <div style={{ height: 340, borderRadius: 3, overflow: 'hidden', border: '10px solid #FAFAF7', boxShadow: '0 6px 28px rgba(100,70,30,0.13), 0 1px 4px rgba(100,70,30,0.07)' }}>
                      <img src={img.src} alt={img.caption} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </div>
                    {img.caption && <figcaption style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 10, paddingLeft: 2, lineHeight: 1.5 }}>{img.caption}</figcaption>}
                  </motion.figure>
                ))}
              </div>
            )}
          </>
        )}

        {/* Field photos — 3-up grid (Sar) */}
        {study.fieldPhotos && (
          <Section label="Learning & Testing">
            <p style={{ fontSize: isMobile ? 15 : 17, color: 'var(--text-2)', maxWidth: 600, lineHeight: 1.7, marginBottom: 32 }}>
              A lot of this project has been figuring out what's actually possible. I've built out pieces — the marketing sites, a Supabase database, a PassKit integration — not because they're all production-ready, but because testing each avenue myself is the only way to know what the real constraints are.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 20 : 28 }}>
              {study.fieldPhotos.map((img, i) => (
                <motion.figure key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0, margin: '0px 0px 200px 0px' }} transition={{ duration: 0.5, delay: i * 0.1 }} style={{ margin: 0 }}>
                  <div style={{ ...FRAME_STYLE }}>
                    <img src={img.src} alt={img.caption} loading="lazy" style={{ width: '100%', display: 'block' }} />
                  </div>
                  {img.caption && <figcaption style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 10, lineHeight: 1.5 }}>{img.caption}</figcaption>}
                </motion.figure>
              ))}
            </div>
          </Section>
        )}

        {/* Approach */}
        <Section label="Approach">
          {study.approachColumns && !isMobile ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}>
              {approach.map((a, i) => (
                <div key={i} style={{ paddingTop: 20, borderTop: `2px solid ${accent}`, opacity: 1 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: accent, opacity: 0.7, letterSpacing: '0.04em', display: 'block', marginBottom: 10 }}>0{i + 1}</span>
                  <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 18, fontWeight: 400, color: 'var(--text-1)', letterSpacing: '-0.01em', marginBottom: 14, lineHeight: 1.3 }}>{a.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.75 }}>{a.body}</p>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {approach.map((a, i) => (
                <div key={i} style={{ paddingBottom: 32, paddingTop: i > 0 ? 32 : 0, borderTop: i > 0 ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', marginBottom: 10, flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: accent, opacity: 0.7, minWidth: 24, letterSpacing: '0.04em' }}>0{i + 1}</span>
                    <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: isMobile ? 18 : 20, fontWeight: 400, color: 'var(--text-1)', letterSpacing: '-0.01em' }}>{a.title}</h3>
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--text-2)', maxWidth: 560, paddingLeft: isMobile ? 0 : 36, lineHeight: 1.7 }}>{a.body}</p>
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* Evolution */}
        {evolution && (
          <Section label="Design Evolution">
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : `repeat(${evolution.length}, 1fr)`, gap: isMobile ? 32 : 20 }}>
              {evolution.map((item, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
                  {item.img && (
                    <div style={{ ...FRAME_STYLE, marginBottom: 16, height: 220 }}>
                      <img src={item.img} alt={item.label} style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }} />
                    </div>
                  )}
                  <div style={{ paddingTop: 16, borderTop: `2px solid ${i === evolution.length - 1 ? accent : 'var(--border-md)'}` }}>
                    <p style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 6, fontWeight: 600, letterSpacing: '0.04em' }}>{item.era}</p>
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)', marginBottom: 10 }}>{item.label}</p>
                    <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.65 }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Research Plan (Sar Consumer only) */}
        {study.researchPlan && (
          <Section label={study.researchPlan.title}>
            <div style={{ borderRadius: 12, border: '1px solid var(--border-md)', overflow: 'hidden' }}>
              {study.researchPlan.items.map((item, i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '160px 1fr',
                  gap: isMobile ? 4 : 0,
                  padding: '16px 20px',
                  borderTop: i > 0 ? '1px solid var(--border)' : 'none',
                  background: i % 2 === 0 ? 'var(--bg-surface)' : 'transparent',
                  alignItems: 'start',
                }}>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: accent, paddingTop: 2 }}>{item.phase}</span>
                  <span style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.65 }}>{item.body}</span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Carousel — placed after Approach to build up to the final product */}
        {study.carousel && (
          <Carousel slides={study.carousel} accent={accent} accentRgb={accentRgb} />
        )}

        {/* Color palette section (Sar) */}
        {study.colorPalette && (
          <Section label="Color & Craft">
            {study.claudeNote && (
              <p style={{ fontSize: isMobile ? 14 : 15, color: 'var(--text-2)', maxWidth: 600, lineHeight: 1.7, marginBottom: 40, padding: '16px 20px', borderRadius: 10, border: '1px solid var(--border-md)', background: 'var(--bg-surface)' }}>
                ✦ {study.claudeNote}
              </p>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: 16 }}>
              {study.colorPalette.map((swatch, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0, margin: '0px 0px 200px 0px' }} transition={{ duration: 0.4, delay: i * 0.07 }}>
                  <div style={{ height: 100, borderRadius: 12, background: swatch.hex, marginBottom: 12 }} />
                  <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-1)', marginBottom: 4, fontFamily: 'monospace' }}>{swatch.hex}</p>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)', marginBottom: 6 }}>{swatch.name}</p>
                  <p style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.55 }}>{swatch.note}</p>
                </motion.div>
              ))}
            </div>
          </Section>
        )}

        {/* Screenshots — placed just before pull quote as the final payoff */}
        {study.imagesNote && (
          <p style={{ fontSize: 13, color: 'var(--text-3)', fontStyle: 'italic', marginTop: 56, marginBottom: -32, paddingLeft: 2 }}>{study.imagesNote}</p>
        )}
        {study.images && (
          study.phoneGrid ? (
            <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: isMobile ? 12 : 20 }}>
              {study.images.map((img, i) => (
                <motion.figure key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0, margin: "0px 0px 200px 0px" }} transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }} style={{ margin: 0 }}>
                  <img src={img.src} alt={img.caption} loading="lazy" style={{ width: '100%', borderRadius: 20, border: '1px solid var(--border)', display: 'block' }} />
                  {img.caption && <figcaption style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 8, paddingLeft: 2 }}>{img.caption}</figcaption>}
                </motion.figure>
              ))}
            </div>
          ) : (
            <Carousel slides={study.images} accent={accent} accentRgb={accentRgb} compact={study.compactCarousel} />
          )
        )}

        {/* Video */}
        {study.video && <VideoPlayer src={study.video.src} caption={study.video.caption} />}

        {/* Pull quote */}
        {pullQuote && <div style={{ paddingTop: 56, borderTop: '1px solid var(--border)', marginTop: 56 }}>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0, margin: "0px 0px 200px 0px" }}
            style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: isMobile ? 'clamp(18px, 4vw, 24px)' : 'clamp(20px, 2.5vw, 28px)', fontWeight: 400, letterSpacing: '-0.015em', lineHeight: 1.5, color: 'var(--text-1)', maxWidth: 600 }}
          >
            <span style={{ color: accent }}>"</span>{pullQuote}<span style={{ color: accent }}>"</span>
          </motion.p>
        </div>}

        {/* Outcome */}
        <Section label="Outcome">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {(outcome || '').split('\n\n').map((para, i) => (
              <p key={i} style={{ fontSize: isMobile ? 15 : 17, color: 'var(--text-2)', maxWidth: 560, lineHeight: 1.7 }}>{para}</p>
            ))}
          </div>
        </Section>

        {/* What I'd do next */}
        {study.nextSteps && (
          <Section label="What I'd do next">
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {study.nextSteps.map((step, i) => (
                <li key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <span style={{
                    flexShrink: 0, width: 24, height: 24, borderRadius: '50%',
                    background: `rgba(${study.accentRgb},0.1)`,
                    border: `1px solid rgba(${study.accentRgb},0.2)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700, color: study.accent, marginTop: 1,
                  }}>{i + 1}</span>
                  <p style={{ fontSize: isMobile ? 14 : 16, color: 'var(--text-2)', lineHeight: 1.7, margin: 0 }}>{step}</p>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Live site CTA */}
        {study.liveUrl && (
          <div style={{ paddingTop: 56, borderTop: '1px solid var(--border)', marginTop: 56, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 20 }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)' }}>See it live</p>
            <motion.a
              href={study.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0, margin: "0px 0px 200px 0px" }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: isMobile ? '14px 24px' : '16px 36px', borderRadius: 100,
                background: accent,
                textDecoration: 'none',
              }}
            >
              <span style={{ fontSize: isMobile ? 14 : 16, fontWeight: 600, color: '#fff' }}>Sign up ↗</span>
            </motion.a>
          </div>
        )}

        {/* More */}
        <div style={{ paddingTop: 56, borderTop: '1px solid var(--border)', marginTop: 56 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 20 }}>More case studies</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {Object.values(STUDIES).filter(s => s.slug !== slug).map(s => (
              <Link key={s.slug} to={`/work/${s.slug}`}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid var(--border)', textDecoration: 'none', transition: 'opacity 0.15s', gap: 12 }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.65'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <div style={{ minWidth: 0 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: s.accent, marginRight: 12 }}>{s.company}</span>
                  <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-1)' }}>{s.title}</span>
                </div>
                <span style={{ color: 'var(--text-3)', fontSize: 14, flexShrink: 0 }}>↗</span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

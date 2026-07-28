import { useRef, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useBreakpoint } from '../hooks/useBreakpoint';

/* ─── Data ────────────────────────────────────────── */
export const STUDIES = {
  'broadstreet-clinical': {
    slug: 'broadstreet-clinical',
    company: 'Evernorth / Cigna',
    title: 'Clinical Intelligence Platform',
    tagline: "Built from zero — months of discovery, a cross-functional team I merged onto, and a design standard that eventually forced an upgrade of the entire platform it lived in.",
    role: 'Lead Designer & Product Manager',
    timeline: '2022 – Present',
    accent: '#2D6B5E',
    accentRgb: '45,107,94',
    tags: ['Healthcare AI', 'Data Visualization', 'Enterprise UX', 'ArcGIS', 'Neo4j'],
    stats: [
      { value: '3', label: 'major versions shipped (MVP → Filtering → NLM)' },
      { value: '182M', label: 'patient records made searchable' },
      { value: '0→1', label: 'product built from scratch' },
    ],
    challenge: 'Clinicians, researchers, and analysts at Evernorth needed to understand patient population patterns across 182 million records — but the only way in was writing SQL. Broadstreet is a geospatial mapping tool built on ArcGIS, with Neo4j as the underlying graph database. The goal was to make that data accessible to anyone in the field without dumbing it down for experts — and to do it within the real constraints of what ArcGIS and Neo4j would actually support. There was no existing product to iterate on. I started from nothing.',
    images: [
      { src: '/case-studies/broadstreet-clinical/screen-clean.webp', caption: 'Broadstreet — welcome screen and product entry point' },
    ],
    discoveryHeading: 'Becoming the Subject Matter Expert',
    discoveryBody: [
      "Before I touched a single screen, I spent months embedded with clinicians, researchers, and data analysts learning how they actually worked. I sat in on weekly syncs with the dev team I eventually merged onto. I asked questions no one else was asking — not about requirements, but about the data itself. How does a clinical researcher think about a patient population? What does 'coverage gap' mean when you're an analyst at Evernorth versus a physician in the field?",
      "The persona work wasn't a deliverable. It was how I learned to think like the people I was designing for. Mark — a data analyst with deep SQL fluency and zero patience for wizards — became my mental model for every decision. If Mark would skip it, I cut it. If Mark would question it, I explained it. Understanding his frustrations, his workflows, and his expectations of enterprise software shaped every interaction pattern in the product.",
      "That immersion also taught me where the real design problem was: not making the data simpler, but making the complexity legible. There's a difference. Users didn't want to be protected from the complexity of 182 million patient records — they wanted tools that respected how expert they already were.",
    ],
    discoveryImages: [
      { src: '/case-studies/broadstreet-clinical/screen-5.webp', caption: 'User persona — Mark, Evernorth data analyst' },
      { src: '/case-studies/broadstreet-clinical/screen-6.webp', caption: 'Discovery: persona mapping for clinical researcher audience' },
    ],
    finalImages: [
      { src: '/case-studies/broadstreet-clinical/screen-2.webp', caption: 'Result details — physician overlay, West Palm Beach' },
      { src: '/case-studies/broadstreet-clinical/screen-3.webp', caption: 'Search results grid — top result with underserved areas' },
    ],
    approach: [
      { title: 'Discovery First, Always', body: 'I spent months in deep discovery — interviewing clinicians, researchers, and analysts, then joining weekly syncs with the data and dev team I eventually merged onto. Understanding how data actually flowed through the system wasn\'t optional; it was the entire design foundation. You can\'t design a research tool if you don\'t understand the research.' },
      { title: 'Geospatial as the Primary Frame', body: 'Researchers think in geography. "Coverage in the Southeast," "gaps in rural areas," "outbreak density by county." I designed the ArcGIS choropleth map as the entry point — the first thing you see, the main way you orient. Neo4j handles the graph relationships underneath, connecting patients to diagnoses to providers across 182M records. I worked directly with our developer to find what was feasible within those constraints, finding solutions that let us raise the design bar without fighting the software.' },
      { title: 'Raising the Design Bar for a Platform', body: "I worked within Evernorth's Control Center design system — but pushed deliberately outside it where the tool demanded more. The result wasn\'t just a better product: the design standard we set for Broadstreet created pressure that eventually triggered a broader upgrade of the entire Control Center host platform. One well-designed app changed what the whole team thought was possible." },
      { title: 'How I Work With Teams', body: "I merged onto a data and engineering team mid-project and had to earn trust fast. That meant showing up to their standups, learning their vocabulary, and asking questions that made them feel heard rather than questioned. I set the product direction in close partnership with my director, kept stakeholders aligned through every pivot, and made sure the engineers knew why each decision mattered — not just what to build. The goal was always to keep momentum without leaving anyone behind." },
    ],
    evolution: [
      { era: '2022–2023', label: 'Wizard Flow', body: 'Step-by-step guided search. Users found it constraining — experienced researchers wanted all options visible at once, not locked behind sequential steps.' },
      { era: '2024–2025', label: 'Side Panel Search', body: 'Filters alongside the map. Faster to first search, but as the filter set expanded, the panel stopped scaling for power users with complex queries.' },
      { era: '2026–Present', label: 'AI-Powered Search', body: 'Natural language entry — "Find PCOS patients in regions with limited reproductive endocrinologist access." Conversational intent, visual refinement. Early prototypes show strong preference.' },
    ],
    pullQuote: "I spent months just learning how the data moved through the system before I touched a single screen. You can't design something you don't understand.",
    outcome: 'Broadstreet became the core workflow for clinical population research at Evernorth. Three major versions shipped. The design standard we established pushed the entire Control Center platform to raise its bar. The next phase is expanding it beyond internal use — evolving Broadstreet into an external tool available to health systems, payers, and research institutions who need the same depth of clinical population intelligence without building it themselves.',
  },

  'broadstreet-ai': {
    slug: 'broadstreet-ai',
    company: 'Evernorth / Cigna',
    title: 'Conversational AI Design',
    tagline: 'Designed a clinical AI agent — named John Snow, after the physician who traced cholera to a pump on Broadstreet — before the industry had a playbook for what that even meant.',
    role: 'Lead Designer & Product Manager',
    timeline: '2025 – Present',
    accent: '#5B4F8C',
    accentRgb: '91,79,140',
    tags: ['Conversational AI', 'Design Systems', 'GenAI', 'UX Research', 'Enterprise'],
    stats: [
      { value: '96%', label: '"must have" in user validation' },
      { value: '100k+', label: 'users on the Broadstreet platform' },
      { value: 'V3', label: 'of the platform — shipped' },
    ],
    challenge: "Broadstreet's anonymized claims database is extraordinarily powerful — and deeply underused, because learning to query it takes time most researchers don't have. Training documentation wasn't working. Users needed to learn by doing, with a guide who could hold their hand, make selections for them, and explain what was happening in real time. That's a different design problem than most AI work.",
    agentMap: true,
    images: [
      { src: '/case-studies/broadstreet-ai/screen-2.webp', caption: 'Search filter + AI panel open — side-by-side before the pop-up decision' },
      { src: '/case-studies/broadstreet-ai/screen-3.webp', caption: 'Broadstreet AI panel open — "Tell me about the patients you\'re looking for"' },
      { src: '/case-studies/broadstreet-ai/screen-4.webp', caption: 'AI fills cardiovascular filters autonomously from a natural language prompt' },
      { src: '/case-studies/broadstreet-ai/screen-5.webp', caption: 'Agent response — "Help me find patients with Type 2 diabetes" with auto-filled filters' },
      { src: '/case-studies/broadstreet-ai/screen-6.webp', caption: 'PTSD conversation — agent clarifying scope and asking follow-up questions' },
      { src: '/case-studies/broadstreet-ai/screen-7.webp', caption: 'Agent refining PTSD search — narrowing by condition, specialty, and location' },
      { src: '/case-studies/broadstreet-ai/screen-8.webp', caption: 'Complex multi-condition query — cardiovascular + PTSD with female patient filter' },
      { src: '/case-studies/broadstreet-ai/screen-9.webp', caption: 'Final confirmed search — filters locked and ready to run' },
    ],
    approach: [
      { title: 'Learning by Experience, Not Documentation', body: "The insight was simple: people don't read training docs, but they'll follow a good guide. John Snow walks users through constructing a search, explains what each filter does in plain language, and makes selections on their behalf when they're stuck. The agent isn't a chatbot — it's a co-pilot that transfers knowledge through demonstration rather than instruction." },
      { title: 'Designing for Hallucination and Scope Creep', body: "Our biggest challenge wasn't the UI — it was keeping John Snow on task. Context windows, prompt boundaries, and hallucination were real engineering constraints that shaped every design decision. When users got curious about the AI itself and started asking John Snow about its own architecture (it's named after a famous epidemiologist — people got excited), we had to design graceful redirects and populate a dedicated Learn More page. Two devs and I went back and forth on these edge cases for months." },
      { title: 'Pop-Up Agent Over Sidecar — a Market-Informed Call', body: "I researched current AI assistant patterns extensively before committing to a layout. The dominant trend in enterprise AI in 2025 moved away from persistent sidecars — which compete with content for space — toward focused modal agents that appear at the moment of need and get out of the way. We shipped a pop-up agent. The sidecar pattern may return if Broadstreet expands its artifact surface area, but for the current workflow it was the right call." },
      { title: 'Keeping Engineers and Stakeholders Moving Together', body: "This project had real technical complexity — context windows, hallucination boundaries, prompt constraints — and I worked directly with two engineers to turn those constraints into design decisions rather than design blockers. I kept my director informed at every fork, framed tradeoffs clearly, and never let disagreement stall momentum. When the team got excited about the John Snow easter egg and started going down rabbit holes, I kept us focused while making sure everyone felt heard. That balance — protecting the team's energy while staying on target — is something I care a lot about." },
    ],
    pullQuote: "We named the agent John Snow after the physician who traced a cholera outbreak to a water pump on Broadstreet in 1854. It felt right. The tool finds patterns in patient data — so did he.",
    outcome: "John Snow handles the first half of the Broadstreet research workflow — the discovery and query construction phase where users previously churned. 96% of tested users called it a 'must have.' The next frontier: letting the agent decide mid-conversation when a structured UI component is a better response than prose.",
  },

  'louisiana-housing': {
    slug: 'louisiana-housing',
    company: 'Horne LLP',
    title: 'Emergency Housing Relief',
    tagline: 'Four dashboards. Four states. $300M in COVID relief that people desperately needed — and no real-time way to track any of it, until there was.',
    role: 'Data Visualization Designer & Developer',
    timeline: 'Apr 2021 – Apr 2022',
    accent: '#8B6230',
    accentRgb: '139,98,48',
    tags: ['Power BI', 'Data Visualization', 'SQL', 'WCAG Accessibility', 'Emergency Response'],
    stats: [
      { value: '$300M', label: 'in COVID relief tracked across 4 states' },
      { value: '4', label: 'dashboards built end-to-end' },
      { value: '9', label: 'C-suite and program directors with live visibility for the first time' },
    ],
    challenge: "States were processing COVID-19 housing assistance applications by the thousands. The data existed — it just lived inside a database that required a SQL query to reach. Executives and program managers had the database but not the means to interrogate it, so oversight meant waiting for reports that were already a week old by the time they landed. Families who'd lost jobs during the pandemic were waiting on housing funds while the people accountable for releasing them were navigating blind.",
    carousel: [
      { src: '/case-studies/louisiana-housing/dash-1.webp', caption: 'Louisiana — overview dashboard: disbursements, pipeline, parish-level map' },
      { src: '/case-studies/louisiana-housing/dash-2.webp', caption: 'Louisiana — applications: stage breakdown, arrearage, LHC/HCA referrals' },
      { src: '/case-studies/louisiana-housing/dash-3.webp', caption: 'Louisiana — statewide view: top parishes by applications and disbursement' },
      { src: '/case-studies/louisiana-housing/dash-4.webp', caption: 'Louisiana — mortgages: servicer breakdown, delinquency days, federal loan program' },
      { src: '/case-studies/louisiana-housing/dash-5.webp', caption: 'Louisiana — demographics: employment, race, gender, veteran status, disability' },
    ],
    approach: [
      { title: 'I built the data pipeline, not just the charts', body: "This wasn't a design handoff. I wrote the SQL — queries connecting live application databases to Power BI, optimized for real-time refresh across four states with different schemas, eligibility rules, and funding caps. When the data was wrong, I was the one who found it. When the refresh was slow, I was the one who fixed it. The design only works if the data does." },
      { title: 'Information architecture driven by decisions, not data', body: "I sat with program administrators and state officials before I built anything. The question wasn't 'what data do we have?' — it was 'what decision are you trying to make right now, and what would change it?' The answer shaped everything: five views per state, each one answering a specific question an executive might walk in with. Application bottlenecks. Disbursement velocity. Parish-level gaps. Demographic equity. Nothing made it in because it was available. Everything made it in because someone needed it." },
      { title: 'Readable under pressure, accessible by default', body: "Administrators were making high-stakes calls under stress, often on equipment they didn't choose. WCAG compliance wasn't a checkbox — it was a constraint that shaped every color, every label, every contrast ratio. Demographic data was surfaced mindfully. The dashboards had to be understood at a glance by someone who'd never seen them. That's a higher bar than 'looks good in a demo.'" },
    ],
    pullQuote: "Partway through the project I got to speak with a few of the people actually applying. One woman mentioned she'd been waiting months. I don't think she knew who I was or what I was building — she was just sharing. That stayed with me longer than any stakeholder review.",
    outcome: 'Four states. Real-time visibility for the first time. Administrators went from week-old spreadsheets to live dashboards that showed exactly where every dollar was and where it was stuck. The work mattered in the most direct way possible — families got housing assistance faster because decisions could finally be made on accurate data.',
  },

  'sar-consumer': {
    slug: 'sar-consumer',
    company: 'Sar — Passion project',
    title: 'Sar: Receipt Platform',
    tagline: "Every purchase in the US generates a piece of waste or a spam email nobody asked for. Thermal paper receipts are toxic, unrecyclable, and discard the most valuable data a merchant collects. Sar replaces them — for both sides of the counter.",
    role: 'Founder, Designer & Engineer',
    timeline: '2024 – Present (part-time)',
    accent: '#3D5E8C',
    accentRgb: '61,94,140',
    tags: ['NFC', 'iOS', 'Apple Wallet', 'Square API', 'Supabase', 'Expo'],
    stats: [
      { value: '$800M+', label: 'spent annually in the US printing thermal paper receipts — money that returns zero customer data' },
      { value: '~11.4B', label: 'paper receipts printed per year in the US — the vast majority discarded within seconds' },
      { value: '3+', label: 'active pilots in Boulder & Denver, CO' },
    ],
    compactCarousel: true,
    images: [
      { src: '/case-studies/sar-consumer/screen-wallet.webp', caption: 'Apple Wallet' },
      { src: '/case-studies/sar-consumer/screen-nfc.webp', caption: 'NFC tap flow' },
      { src: '/case-studies/sar-consumer/screen-signup.webp', caption: 'Onboarding' },
    ],
    challenge: "Every digital receipt product before Sar made the same mistake: they asked the customer to do something. Type an email. Download an app. Create an account. That friction is why paper receipts still exist. At the same time, merchants need a sustainability story, real customer data, and a system that doesn't require retraining staff. One product, two audiences, zero crossover confusion — and the backend has to normalize completely different data formats from Square, Toast, and Ingenico into one clean receipt shape before any of that matters.",
    approach: [
      { title: 'The Data Is Already There', body: "Every transaction generates itemized purchase data that currently goes nowhere. Organized and surfaced correctly, it's valuable to both sides — merchants understand what's selling and when, consumers have a searchable record of everything they've bought. Sar is the layer that finally makes use of it." },
      { title: 'NFC Is Already Built Into the POS', body: "Modern POS systems have NFC built in. The same reader that processes tap-to-pay is the one Sar uses to deliver the receipt — no new hardware, no staff behavior change required. The customer taps their phone the same way they'd tap a card. A receipt appears in Apple Wallet. The infrastructure investment was already made. We're using it." },
      { title: 'Apple Wallet as the Entry Point', body: "The flow: customer pays → taps phone to POS NFC reader → App Clip slides up instantly → Face ID authenticates → receipt lands in Apple Wallet before they've put their card away. Apple Wallet was the right destination because it's on every iPhone, already trusted, requires zero download. Receipt history, IRS tax categorization, PDF export, and Expensify/TurboTax integration are the depth that earns the full app download later." },
      { title: 'Two Pages, One Product', body: "The consumer site is emotional and minimal — one CTA, aurora animation, done. The merchant page (/business) is the full pitch: $0.04 per receipt in the largest type on the page, comparison table, sustainability badge, dashboard preview, and a signup form split by company size. Neither audience gets stuck in the wrong place." },
      { title: 'Square OAuth, Webhooks, and a Marketplace App', body: "Merchants connect Square in one click via OAuth 2.0. Every completed payment fires a real-time webhook that generates a receipt automatically — no merchant action after setup. Sar Receipts is in the Square App Marketplace application process under Customer Engagement. Toast and Ingenico normalization are in progress." },
      { title: 'Multi-POS Schema Built for Scale', body: "The Supabase schema was generalized from day one: a merchants table, a pos_connections table, and a source column on every receipt. Square, Toast, Clover, and Ingenico all normalize to the same shape — line items, subtotal, tax, tip, total, payment method — before they touch the dashboard. Adding a new POS is a new edge function, not a new data model." },
      { title: 'Built Solo with Claude Code', body: "The entire product — Expo Router iOS app, Supabase schema and RLS policies, EAS build pipeline, Square integration, Apple Wallet PKPass generation, and the tax categorization keyword engine — was built in active collaboration with Claude Code. Not as a shortcut. As a proof of concept for what a solo founder-designer-engineer can ship when AI handles implementation and you focus on the product." },
    ],
    researchPlan: {
      title: 'What I\'m Learning Next',
      items: [
        { phase: 'First-tap clarity', body: 'In-store intercepts at pilot locations — did the gesture feel obvious? Was Apple Wallet the right destination? What created hesitation?' },
        { phase: 'Return behavior', body: 'Do customers who tapped once tap again on a return visit? Is this habit-forming or a novelty? That distinction determines the acquisition strategy.' },
        { phase: 'App download trigger', body: 'What made early users cross from Wallet receipt to full app? Feature pull, notification, or something else? That\'s the funnel to optimize.' },
        { phase: 'Non-tappers', body: "Exit interviews with customers who didn't tap the NFC reader. Awareness gap, trust barrier, or just didn't notice? Different problems, different fixes." },
      ],
    },
    pullQuote: "I've pitched this to enough business owners to know exactly when they cross their arms. Every section of the merchant page is designed to answer the next objection before they can raise it.",
    liveUrl: 'https://sar-app.com',
    outcome: 'Continuing to develop POS marketplace integrations over the summer and expanding pilot partnerships in Boulder and Denver.',
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

function Carousel({ slides, accent, accentRgb, compact }) {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx(i => (i - 1 + slides.length) % slides.length);
  const next = () => setIdx(i => (i + 1) % slides.length);

  return (
    <div style={{ marginTop: 56, maxWidth: compact ? 320 : '100%' }}>
      <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border-md)', background: 'var(--bg-surface)' }}>
        <motion.img
          key={idx}
          src={slides[idx].src}
          alt={slides[idx].caption}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          loading="lazy" style={{ width: '100%', display: 'block' }}
        />
        <button onClick={prev} aria-label="Previous" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.85)', border: '1px solid var(--border-md)', borderRadius: 100, width: 40, height: 40, color: 'var(--text-1)', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>‹</button>
        <button onClick={next} aria-label="Next" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.85)', border: '1px solid var(--border-md)', borderRadius: 100, width: 40, height: 40, color: 'var(--text-1)', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>›</button>
        <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(255,255,255,0.9)', border: `1px solid rgba(${accentRgb},0.25)`, borderRadius: 100, padding: '3px 12px', fontSize: 11, fontWeight: 600, color: accent, letterSpacing: '0.06em', backdropFilter: 'blur(8px)' }}>
          {idx + 1} / {slides.length}
        </div>
      </div>
      <p style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 10, paddingLeft: 4 }}>{slides[idx].caption}</p>
      <div style={{ display: 'flex', gap: 6, marginTop: 14, paddingLeft: 4 }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} aria-label={`Go to slide ${i + 1}`} style={{ width: i === idx ? 20 : 6, height: 6, borderRadius: 100, background: i === idx ? accent : 'var(--border-md)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.25s' }} />
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
      {/* Nav */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'rgba(247,246,242,0.88)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: `0 ${px}px`, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <Link to="/" style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-2)', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-1)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-2)'}>← Sara Braymen</Link>
          <span style={{ fontSize: 12, color: 'var(--text-3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{company}</span>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: `${isMobile ? 72 : 120}px ${px}px ${isMobile ? 60 : 100}px` }}>

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 24 }}>
            {tags.map(t => (
              <span key={t} style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', background: `rgba(${accentRgb},0.08)`, color: accent, border: `1px solid rgba(${accentRgb},0.2)`, borderRadius: 100, padding: '3px 10px' }}>{t}</span>
            ))}
          </div>

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
          <p style={{ fontSize: isMobile ? 15 : 17, color: 'var(--text-2)', maxWidth: 600, lineHeight: 1.7 }}>{challenge}</p>
        </Section>

        {/* Agent decision map — Broadstreet AI */}
        {study.agentMap && <AgentMap accent={accent} />}

        {/* Carousel (Louisiana dashboard walkthrough) */}
        {study.carousel && (
          <Carousel slides={study.carousel} accent={accent} accentRgb={accentRgb} />
        )}

        {/* Screenshots */}
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

        {/* Discovery / Research section */}
        {study.discoveryImages && (
          <>
            <Section label={study.discoveryHeading || 'Discovery'}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {(study.discoveryBody || []).map((para, i) => (
                  <p key={i} style={{ fontSize: isMobile ? 15 : 16, color: 'var(--text-2)', maxWidth: 620, lineHeight: 1.7 }}>{para}</p>
                ))}
              </div>
            </Section>
            <Carousel slides={[...study.discoveryImages, ...(study.finalImages || [])]} accent={accent} accentRgb={accentRgb} />
          </>
        )}

        {/* Approach */}
        <Section label="Approach">
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
        </Section>

        {/* Evolution */}
        {evolution && (
          <Section label="Design Evolution">
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {evolution.map((item, i) => (
                <div key={i} style={{ flex: '1 1 180px', paddingTop: 20, borderTop: `2px solid ${i === evolution.length - 1 ? accent : 'var(--border-md)'}` }}>
                  <p style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 6, fontWeight: 600, letterSpacing: '0.04em' }}>{item.era}</p>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)', marginBottom: 10 }}>{item.label}</p>
                  <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.65 }}>{item.body}</p>
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

        {/* Pull quote */}
        <div style={{ paddingTop: 56, borderTop: '1px solid var(--border)', marginTop: 56 }}>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0, margin: "0px 0px 200px 0px" }}
            style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: isMobile ? 'clamp(18px, 4vw, 24px)' : 'clamp(20px, 2.5vw, 28px)', fontWeight: 400, letterSpacing: '-0.015em', lineHeight: 1.5, color: 'var(--text-1)', maxWidth: 600 }}
          >
            <span style={{ color: accent }}>"</span>{pullQuote}<span style={{ color: accent }}>"</span>
          </motion.p>
        </div>

        {/* Outcome */}
        <Section label="Outcome">
          <p style={{ fontSize: isMobile ? 15 : 17, color: 'var(--text-2)', maxWidth: 560, lineHeight: 1.7 }}>{outcome}</p>
        </Section>

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

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
    accent: '#3D9E8C',
    accentRgb: '61,158,140',
    tags: ['Healthcare AI', 'Data Visualization', 'Enterprise UX', 'ArcGIS', 'Neo4j'],
    stats: [
      { value: '3', label: 'major versions shipped (MVP → Filtering → NLM)' },
      { value: '182M', label: 'patient records made searchable' },
      { value: '0→1', label: 'product built from scratch' },
    ],
    challenge: 'Clinicians, researchers, and analysts at Evernorth needed to understand patient population patterns across 182 million records — but the only way in was writing SQL. Broadstreet is a geospatial mapping tool built on ArcGIS, with Neo4j as the underlying graph database. The goal was to make that data accessible to anyone in the field without dumbing it down for experts — and to do it within the real constraints of what ArcGIS and Neo4j would actually support. There was no existing product to iterate on. I started from nothing.',
    images: [
      { src: '/case-studies/broadstreet-clinical/img-1.webp', caption: 'Search results — geographic choropleth with top result and related markets' },
      { src: '/case-studies/broadstreet-clinical/screen-2.webp', caption: 'Result details — physician overlay, West Palm Beach' },
      { src: '/case-studies/broadstreet-clinical/screen-3.webp', caption: 'Search results grid — top result with underserved areas' },
      { src: '/case-studies/broadstreet-clinical/screen-5.webp', caption: 'User persona — Mark, Evernorth data analyst' },
      { src: '/case-studies/broadstreet-clinical/screen-6.webp', caption: 'Discovery: user persona mapping for clinical researcher audience' },
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
    outcome: 'Broadstreet became the core workflow for clinical population research at Evernorth. Three major versions shipped. The design standard we established pushed the entire Control Center platform to raise its bar. The V3 natural language interface is expanding use cases into real-time outbreak detection and regional care gap analysis.',
  },

  'broadstreet-ai': {
    slug: 'broadstreet-ai',
    company: 'Evernorth / Cigna',
    title: 'Conversational AI Design',
    tagline: 'Designed a clinical AI agent — named John Snow, after the physician who traced cholera to a pump on Broadstreet — before the industry had a playbook for what that even meant.',
    role: 'Lead Designer & Product Manager',
    timeline: '2025 – Present',
    accent: '#8B6FBE',
    accentRgb: '139,111,190',
    tags: ['Conversational AI', 'Design Systems', 'GenAI', 'UX Research', 'Enterprise'],
    stats: [
      { value: '96%', label: '"must have" in user validation' },
      { value: '100k+', label: 'users on the Broadstreet platform' },
      { value: 'V3', label: 'of the platform — shipped' },
    ],
    challenge: "Broadstreet's anonymized claims database is extraordinarily powerful — and deeply underused, because learning to query it takes time most researchers don't have. Training documentation wasn't working. Users needed to learn by doing, with a guide who could hold their hand, make selections for them, and explain what was happening in real time. That's a different design problem than most AI work.",
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
    accent: '#BE9A6F',
    accentRgb: '190,154,111',
    tags: ['Power BI', 'Data Visualization', 'SQL', 'WCAG Accessibility', 'Emergency Response'],
    stats: [
      { value: '$300M', label: 'in COVID relief tracked across 4 states' },
      { value: '4', label: 'dashboards built end-to-end' },
      { value: '4', label: 'happy directors — finally had real-time visibility' },
    ],
    challenge: "States were receiving COVID-19 housing assistance applications by the thousands, and the database existed — but there was no feasible way for executives and program managers to see what was actually happening. Reports were manual, delayed, and nearly impossible to act on. People who'd lost jobs during the pandemic were waiting on housing funds while the people approving them were flying blind.",
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
    pullQuote: "I got to talk to some of the actual applicants. One woman thanked me. She'd been waiting on funds for months. That conversation has stayed with me.",
    outcome: 'Four states. Real-time visibility for the first time. Administrators went from week-old spreadsheets to live dashboards that showed exactly where every dollar was and where it was stuck. The work mattered in the most direct way possible — families got housing assistance faster because decisions could finally be made on accurate data.',
  },

  'sar-consumer': {
    slug: 'sar-consumer',
    company: 'Sar — Passion project',
    title: 'Consumer Receipt Experience',
    tagline: "Paper receipts cost $0.02, return nothing, and get thrown away in seconds. I built a $0.04 replacement that turns every transaction into a marketing channel — nights and weekends, alongside full-time work.",
    role: 'Founder, Designer & Engineer',
    timeline: '2024 – Present (part-time)',
    accent: '#6F87BE',
    accentRgb: '111,135,190',
    tags: ['NFC', 'iOS', 'Apple Wallet', 'Expo', 'Supabase'],
    stats: [
      { value: '$0.04', label: 'per receipt — vs $0.02 for paper that returns nothing' },
      { value: '0', label: 'apps required at the first tap' },
      { value: '3+', label: 'live merchant pilots in Boulder & Denver' },
    ],
    phoneGrid: true,
    images: [
      { src: '/case-studies/sar-consumer/screen-wallet.webp', caption: 'Apple Wallet' },
      { src: '/case-studies/sar-consumer/screen-nfc.webp', caption: 'NFC tap flow' },
      { src: '/case-studies/sar-consumer/screen-signup.webp', caption: 'Onboarding' },
      { src: '/case-studies/sar-consumer/screen-transactions.webp', caption: 'Transactions' },
    ],
    challenge: "Every \"digital receipt\" product before Sar made the same mistake: they asked the customer to do something. Type an email. Download an app. Create an account. That friction is the entire reason paper receipts still exist in 2026. The insight wasn't to digitize the receipt — it was to make the digital receipt require less effort than the paper one.",
    approach: [
      { title: 'The Reframe: Not a Receipt Product. A Marketing Channel.', body: "The business model is $0.04 per completed digital receipt. But framing it as a cheaper receipt misses the point — paper receipts are already cheap. The real pitch is that every Sar receipt can embed a personalized discount code, a Google Review link, or a product recommendation. A $0.02 paper receipt is a sunk cost. A $0.04 Sar receipt is an automated repeat-visit driver. That's the insight that makes the economics obvious." },
      { title: 'Why NFC, Not QR', body: "QR codes require the cashier to hold something up, the customer to open their camera, aim, scan, and wait. It adds 10–15 seconds to checkout and requires a behavioral change from staff. NFC is different — it\'s a sticker on the counter that the customer taps, same motion as tap-to-pay, zero staff involvement. The choice wasn\'t aesthetic. It was about removing every possible point of failure between \"customer wants receipt\" and \"receipt appears.\"" },
      { title: 'Apple Wallet as the Entry Point', body: "The five-step flow: pay normally → cashier says \"tap for your receipt\" → customer taps the Sar sticker → a lightweight App Clip slides up instantly → Face ID authenticates → receipt lands in Apple Wallet before they\'ve put their card away. That evening, one push notification invites them to the full app. Apple Wallet was the right destination because it\'s already on every iPhone, already trusted, requires zero download. It\'s the hook. Receipt history, IRS tax categorization, PDF export, and Expensify/TurboTax integration are the depth that earns the download later." },
      { title: 'The Design Decisions Behind the Interface', body: "Dark background (#1A1816, warm not cool) because it matches Apple Wallet\'s aesthetic — this app lives next to your boarding passes and credit cards, and it should feel like it belongs there. Email OTP instead of passwords because anyone tapping an NFC sticker at a coffee counter shouldn\'t need to remember credentials. Square first because it has the largest SMB POS market share and the cleanest API for a proof of concept — Toast and Clover are extensions of the same architecture, not rebuilds." },
      { title: 'Built Solo with Claude Code', body: "The entire product — Expo Router iOS app, Supabase schema and RLS policies, EAS build pipeline, Square integration, Apple Wallet PKPass generation, and the tax categorization keyword engine — was built by me in active collaboration with Claude Code (Anthropic\'s AI CLI). Not as a shortcut. As a proof of concept for what a solo founder-designer-engineer can ship when AI handles implementation and you focus on the product. Zero to launch-ready in days, not months." },
    ],
    researchPlan: {
      title: 'What I\'m Learning Next',
      items: [
        { phase: 'First-tap clarity', body: 'In-store intercepts at pilot locations — did the gesture feel obvious? Was Apple Wallet the right destination? What created hesitation?' },
        { phase: 'Return behavior', body: 'Do customers who tapped once tap again on a return visit? Is this habit-forming or a novelty? That distinction determines the acquisition strategy.' },
        { phase: 'App download trigger', body: 'What made early users cross from Wallet receipt to full app? Feature pull, notification, or something else? That\'s the funnel to optimize.' },
        { phase: 'Non-tappers', body: 'Exit interviews with customers who walked past the sticker. Awareness gap, trust barrier, or just didn\'t notice? Different problems, different fixes.' },
      ],
    },
    pullQuote: "Everyone said just add a QR code. But QR codes require the customer to do something. The whole premise of Sar is that they don't have to.",
    liveUrl: 'https://sar-app.com',
    outcome: 'Live pilots in Boulder and Denver, CO. iOS app in early access. Square POS integration live — silently intercepts the transaction payload on payment completion. Coming next: Apple App Clip for the NFC tap flow, PKPass via Supabase Edge Function, App Store submission, Google Wallet, Toast and Clover integrations.',
  },

  'sar-merchant': {
    slug: 'sar-merchant',
    company: 'Sar — Passion project',
    title: 'Merchant Platform & POS Integrations',
    tagline: '$0.04 per receipt. $0.00 if they still want paper. Built nights and weekends alongside full-time work — because the problem was too good to leave alone.',
    role: 'Founder, Designer & Engineer',
    timeline: '2025 – Present (part-time)',
    accent: '#6F87BE',
    accentRgb: '111,135,190',
    tags: ['B2B Design', 'Square API', 'Toast', 'Supabase Edge Functions', 'OAuth'],
    stats: [
      { value: '$0.04', label: 'per receipt — the number the whole page is built around' },
      { value: '3+', label: 'active pilots in Boulder & Denver, CO' },
      { value: '3 POS', label: 'systems normalized into one receipt schema (Square, Toast, Ingenico)' },
    ],
    challenge: "Sar serves two completely different audiences with different needs, different fears, and different reasons to care. Merchants want cost savings, faster checkout, customer data, and a sustainability story they can actually use. Consumers want receipts that appear without typing anything at the register. One product, two landing pages, zero crossover confusion — and the backend has to normalize completely different data formats from Square, Toast, and Ingenico into one clean receipt shape before any of that front-end work matters.",
    approach: [
      { title: 'Lead With the Number', body: "$0.04 is in the largest type on the merchant page — not buried in a pricing table. Immediately below it: a callout that paper overrides are always $0.00. That second line is the one that closes the room. It answers the objection before anyone can raise it. A merchant who prints 200 receipts a day can opt out of any of them for free. That\'s not a limitation. It\'s a trust signal." },
      { title: 'Two Pages, One Product', body: "The homepage (sar-app.com) is built for consumers — emotional, minimal, fast. \"Receipt chaos, solved.\" Aurora animation. One CTA. The business page (/business) is the full merchant pitch: comparison table, value prop cards, how it works for staff, sustainability badge, BI dashboard preview, receipt-as-marketing-channel breakdown, cashier scripts, and a signup form split by company size (enterprise gets a contact card, SMBs fill out a form directly). Each page has a subtle nav link to the other. Neither audience gets stuck." },
      { title: 'Square: OAuth, Webhooks, and a Marketplace App', body: "Merchants connect Square in one click via OAuth 2.0 — tokens stored server-side, auto-refreshed before expiry. From that point, every completed Square payment fires a real-time webhook that generates a digital receipt automatically. No merchant action required after setup. The integration handles payments, refunds, order updates, and customer profile changes. Sar Receipts is now in the Square App Marketplace application process under category: Customer Engagement." },
      { title: 'Multi-POS Schema Designed for Scale', body: "Square was the proof of concept, but the Supabase schema was generalized from day one: a merchants table, a pos_connections table, and a source column on every receipt. Toast, Clover, Ingenico, and Worldline receipts normalize to the same shape — line items, subtotal, tax, tip, total, payment method — before they ever touch the merchant dashboard. Adding a new POS is a new edge function, not a new data model." },
      { title: 'Merchant Dashboard & Internal Admin Portal', body: "The merchant dashboard (sar-app.com/dashboard) shows real-time sustainability metrics, revenue charts, monthly breakdowns, and best/least popular items by volume and revenue. Built on Recharts with the same aurora-and-dark-glass design system as the marketing site. Alongside it: an internal admin portal (sar-app.com/admin) that gives Sara a cross-merchant view of Sar earnings, per-merchant billing, and aggregate sustainability impact — the tool that runs the business." },
      { title: 'Sustainability as Hard ROI, Not Soft Brand', body: "The Certified Paperless badge isn\'t decorative. It shows live metrics — trees saved, pounds of paper eliminated, CO₂ avoided — calculated from that merchant\'s actual transaction volume. Embeddable badge, share-ready social cards, printable certification. Merchants don\'t just feel good about it. They post it. It becomes part of how they talk about their business to neighboring owners, which is where pilot growth has actually come from." },
      { title: 'Cashier Scripts', body: "The biggest friction in rolling out any new checkout behavior is the 30 seconds where the cashier doesn\'t know what to say. The merchant page includes three ready-to-use scripts for different situations — first-time customer, returning customer, customer who prefers paper. Staff adoption is a UX problem, not a training problem, and this is how you solve it at the point of sale." },
    ],
    pullQuote: "I've pitched this to enough business owners to know exactly when they cross their arms. The page is designed around that moment — every section answers the next objection before they can raise it.",
    outcome: '3+ active pilots in Boulder and Denver. Square OAuth integration live. Toast and Ingenico normalization in progress. Square App Marketplace application filed under Customer Engagement. Pre-revenue — billing activates when pilots convert. The sustainability badge has become a word-of-mouth driver: multiple pilot merchants have mentioned it to neighboring businesses unprompted.',
    liveUrl: 'https://sar-app.com',
  },
};

/* ─── Components ──────────────────────────────────── */
function Stat({ value, label, accent }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45 }}>
      <div style={{ fontSize: 42, fontWeight: 700, letterSpacing: '-0.035em', color: accent, lineHeight: 1, marginBottom: 8 }}>{value}</div>
      <div className="type-caption" style={{ color: 'rgba(255,255,255,0.38)' }}>{label}</div>
    </motion.div>
  );
}

function Section({ label, children }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
      style={{ paddingTop: 56, borderTop: '1px solid rgba(255,255,255,0.07)', marginTop: 56 }}>
      <p className="type-label-sm" style={{ color: 'var(--coral)', marginBottom: 20 }}>{label}</p>
      {children}
    </motion.div>
  );
}

function Carousel({ slides, accent, accentRgb }) {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx(i => (i - 1 + slides.length) % slides.length);
  const next = () => setIdx(i => (i + 1) % slides.length);

  return (
    <div style={{ marginTop: 56 }}>
      <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', background: '#111' }}>
        <motion.img
          key={idx}
          src={slides[idx].src}
          alt={slides[idx].caption}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          loading="lazy" style={{ width: '100%', display: 'block' }}
        />
        {/* Prev / Next */}
        <button onClick={prev} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 100, width: 40, height: 40, color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>‹</button>
        <button onClick={next} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 100, width: 40, height: 40, color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>›</button>
        {/* Slide label */}
        <div style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(0,0,0,0.6)', border: `1px solid rgba(${accentRgb},0.3)`, borderRadius: 100, padding: '3px 12px', fontSize: 11, fontWeight: 600, color: accent, letterSpacing: '0.06em', backdropFilter: 'blur(8px)' }}>
          {idx + 1} / {slides.length}
        </div>
      </div>
      {/* Caption */}
      <p className="type-caption" style={{ color: 'rgba(255,255,255,0.3)', marginTop: 10, paddingLeft: 4 }}>{slides[idx].caption}</p>
      {/* Dot indicators */}
      <div style={{ display: 'flex', gap: 6, marginTop: 14, paddingLeft: 4 }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} style={{ width: i === idx ? 20 : 6, height: 6, borderRadius: 100, background: i === idx ? accent : 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.25s' }} />
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
  const px = isMobile ? 20 : isTablet ? 32 : 48;

  const { title, company, tagline, role, timeline, accent, accentRgb, tags, stats, challenge, approach, evolution, pullQuote, outcome } = study;

  return (
    <div style={{ background: '#1A1816', minHeight: '100vh', color: '#fff' }}>
      {/* Nav */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'rgba(26,24,22,0.88)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 32px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" className="type-label-sm" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>← Sara Braymen</Link>
          <span className="type-caption" style={{ color: 'rgba(255,255,255,0.2)' }}>{company}</span>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: `${isMobile ? 80 : 120}px ${px}px ${isMobile ? 60 : 100}px` }}>

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
            {tags.map(t => (
              <span key={t} className="type-caption" style={{ background: `rgba(${accentRgb},0.1)`, color: accent, border: `1px solid rgba(${accentRgb},0.2)`, borderRadius: 100, padding: '3px 10px' }}>{t}</span>
            ))}
          </div>

          <h1 className="type-display" style={{ marginBottom: 24, maxWidth: '18ch' }}>{title}</h1>

          <p className="type-body-lg" style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 560, marginBottom: 40 }}>{tagline}</p>


          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
            <div>
              <p className="type-caption" style={{ color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>Role</p>
              <p className="type-label-md" style={{ color: '#fff' }}>{role}</p>
            </div>
            <div>
              <p className="type-caption" style={{ color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>Timeline</p>
              <p className="type-label-md" style={{ color: '#fff' }}>{timeline}</p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', paddingTop: 56, borderTop: '1px solid rgba(255,255,255,0.07)', marginTop: 56 }}>
          {stats.map((s, i) => <Stat key={i} value={s.value} label={s.label} accent={accent} />)}
        </div>

        {/* Challenge */}
        <Section label="The Challenge">
          <p className="type-body-lg" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 600 }}>{challenge}</p>
        </Section>

        {/* Carousel (Louisiana dashboard walkthrough) */}
        {study.carousel && (
          <Carousel slides={study.carousel} accent={accent} accentRgb={accentRgb} />
        )}

        {/* Screenshots */}
        {study.images && (
          study.phoneGrid ? (
            /* Phone mockup grid — 2 columns, smaller */
            <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: isMobile ? 12 : 20 }}>
              {study.images.map((img, i) => (
                <motion.figure key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }} style={{ margin: 0 }}>
                  <img src={img.src} alt={img.caption} loading="lazy" style={{ width: '100%', borderRadius: 20, border: '1px solid rgba(255,255,255,0.07)', display: 'block' }} />
                  {img.caption && <figcaption className="type-caption" style={{ color: 'rgba(255,255,255,0.25)', marginTop: 8, paddingLeft: 2, fontSize: 10 }}>{img.caption}</figcaption>}
                </motion.figure>
              ))}
            </div>
          ) : (
            <div style={{ marginTop: study.carousel ? 32 : 56, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {study.images.map((img, i) => (
                <motion.figure key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }} style={{ margin: 0 }}>
                  <img src={img.src} alt={img.caption} loading="lazy" style={{ width: '100%', borderRadius: 16, border: '1px solid rgba(255,255,255,0.07)', display: 'block' }} />
                  {img.caption && <figcaption className="type-caption" style={{ color: 'rgba(255,255,255,0.3)', marginTop: 10, paddingLeft: 4 }}>{img.caption}</figcaption>}
                </motion.figure>
              ))}
            </div>
          )
        )}

        {/* Approach */}
        <Section label="Approach">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {approach.map((a, i) => (
              <div key={i} style={{ paddingBottom: 32, paddingTop: i > 0 ? 32 : 0, borderTop: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', marginBottom: 10 }}>
                  <span className="type-caption" style={{ color: accent, opacity: 0.7, minWidth: 24 }}>0{i + 1}</span>
                  <h3 className="type-label-lg" style={{ color: '#fff' }}>{a.title}</h3>
                </div>
                <p className="type-body-md" style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 560, paddingLeft: isMobile ? 0 : 36 }}>{a.body}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Evolution */}
        {evolution && (
          <Section label="Design Evolution">
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {evolution.map((item, i) => (
                <div key={i} style={{ flex: '1 1 200px', paddingTop: 20, borderTop: `2px solid ${i === evolution.length - 1 ? accent : 'rgba(255,255,255,0.08)'}` }}>
                  <p className="type-caption" style={{ color: 'rgba(255,255,255,0.3)', marginBottom: 6 }}>{item.era}</p>
                  <p className="type-label-md" style={{ color: '#fff', marginBottom: 10 }}>{item.label}</p>
                  <p className="type-body-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>{item.body}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Research Plan (Sar Consumer only) */}
        {study.researchPlan && (
          <Section label={study.researchPlan.title}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {study.researchPlan.items.map((item, i) => (
                <div key={i} style={{ paddingBottom: 24, paddingTop: i > 0 ? 24 : 0, borderTop: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                  <p className="type-label-sm" style={{ color: study.accent, marginBottom: 6, opacity: 0.85 }}>{item.phase}</p>
                  <p className="type-body-md" style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 560 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Pull quote */}
        <div style={{ paddingTop: 56, borderTop: '1px solid rgba(255,255,255,0.07)', marginTop: 56 }}>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 400, letterSpacing: '-0.015em', lineHeight: 1.5, color: 'rgba(255,255,255,0.82)', maxWidth: 600 }}
          >
            <span style={{ color: accent, fontStyle: 'normal' }}>"</span>{pullQuote}<span style={{ color: accent, fontStyle: 'normal' }}>"</span>
          </motion.p>
        </div>

        {/* Outcome */}
        <Section label="Outcome">
          <p className="type-body-lg" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 560 }}>{outcome}</p>
        </Section>

        {/* Live site CTA */}
        {study.liveUrl && (
          <div style={{ paddingTop: 56, borderTop: '1px solid rgba(255,255,255,0.07)', marginTop: 56, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 20 }}>
            <p className="type-label-sm" style={{ color: 'var(--coral)' }}>See it live</p>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              {/* Glow */}
              <div style={{ position: 'absolute', inset: -32, borderRadius: 48, background: `radial-gradient(ellipse at center, rgba(${study.accentRgb},0.2) 0%, transparent 70%)`, pointerEvents: 'none' }} />
              <motion.a
                href={study.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  position: 'relative',
                  display: 'inline-flex', alignItems: 'center', gap: 14,
                  padding: isMobile ? '18px 28px' : '22px 48px', borderRadius: 24,
                  background: `linear-gradient(135deg, rgba(${study.accentRgb},0.22) 0%, rgba(${study.accentRgb},0.1) 100%)`,
                  border: `1.5px solid rgba(${study.accentRgb},0.5)`,
                  boxShadow: `0 0 32px rgba(${study.accentRgb},0.25), inset 0 1px 0 rgba(255,255,255,0.1)`,
                  textDecoration: 'none',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <span style={{ fontSize: isMobile ? 16 : 22, fontWeight: 700, letterSpacing: '-0.02em', color: '#fff' }}>Get started at sar-app.com</span>
                <span style={{ fontSize: isMobile ? 16 : 22, color: study.accent }}>↗</span>
              </motion.a>
            </div>
          </div>
        )}

        {/* More */}
        <div style={{ paddingTop: 56, borderTop: '1px solid rgba(255,255,255,0.07)', marginTop: 56 }}>
          <p className="type-label-sm" style={{ color: 'var(--coral)', marginBottom: 20 }}>More case studies</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {Object.values(STUDIES).filter(s => s.slug !== slug).map(s => (
              <Link key={s.slug} to={`/work/${s.slug}`}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', textDecoration: 'none', transition: 'opacity 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <div>
                  <span className="type-caption" style={{ color: s.company.includes('Evernorth') ? '#3D9E8C' : s.accent, marginRight: 12 }}>{s.company}</span>
                  <span className="type-label-md" style={{ color: '#fff' }}>{s.title}</span>
                </div>
                <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 14 }}>↗</span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

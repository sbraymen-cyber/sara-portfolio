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
    tagline: "Built 0→1 at a Fortune 15 company — months of embedded discovery, a cross-functional team I merged onto, and a design bar that eventually forced an upgrade of the entire platform it lived in.",
    role: 'Lead Designer & Product Manager',
    timeline: '2022 – 2026',
    accent: '#2D6B5E',
    accentRgb: '45,107,94',
    tags: ['Enterprise UX', 'Healthcare', 'Data Visualization', 'User Research', 'Design Systems', 'Cross-functional', 'Systems Thinking', 'Information Architecture', 'Population Health', 'ArcGIS'],
    stats: [
      { value: '3', label: 'major versions shipped — MVP to AI-powered search' },
      { value: '182M', label: 'patient records made searchable through visual interfaces' },
      { value: '0→1', label: 'product built from scratch, no prior design to iterate on' },
    ],
    challenge: 'Clinicians, researchers, and analysts at Evernorth needed to understand patient population patterns across 182 million records — but the only path in was writing SQL. The goal was to make that data accessible to anyone in the field without dumbing it down for experts, and to do it within the real constraints of ArcGIS and Neo4j. No prior product existed. I started from nothing and had to become a subject matter expert before I could design anything.',
    images: [
      { src: '/case-studies/broadstreet-clinical/screen-clean.webp', caption: 'Broadstreet — welcome screen and product entry point' },
    ],
    discoveryHeading: 'Becoming the Subject Matter Expert',
    discoveryBody: [
      "Before I touched a single screen, I spent months embedded with clinicians, researchers, and data analysts learning how they actually worked. I sat in on weekly syncs with the engineering and data team I eventually merged onto. The questions I was asking weren't about requirements — they were about how clinical researchers think. What does 'coverage gap' mean to an Evernorth analyst versus a physician in the field? Those aren't the same question.",
      "The persona work wasn't a deliverable. It was how I learned to think like the people I was designing for. Mark — a data analyst with deep SQL fluency and zero patience for guided wizards — became my mental model for every interaction decision. If Mark would skip it, I cut it. If Mark would question it, I explained it. That level of specificity is what separates design that respects expert users from design that condescends to them.",
      "That immersion also clarified the real design problem: not making the data simpler, but making its complexity legible. Users didn't want to be shielded from 182 million records — they wanted interfaces that treated their expertise as a starting point, not an obstacle.",
    ],
    discoveryImages: [
      { src: '/case-studies/broadstreet-clinical/screen-5.webp', caption: 'User persona — Mark, Evernorth data analyst' },
      { src: '/case-studies/broadstreet-clinical/screen-6.webp', caption: 'Discovery: persona mapping for clinical researcher audience' },
    ],
    approach: [
      { title: 'Research before wireframes', body: 'Deep discovery wasn\'t a phase — it was the entire foundation. I interviewed clinicians, researchers, and analysts, joined engineering standups, and learned the underlying data model before opening Figma. You can\'t design an interface for a system you don\'t understand at the level your users understand it.' },
      { title: 'Geography as the primary interaction model', body: 'Clinical researchers think spatially. "Coverage gaps in the Southeast." "Outbreak density by county." I positioned the ArcGIS choropleth map as the entry point and primary navigation surface — the thing you see first, the frame you never leave. Every filter and result surfaces in relation to geography, because that\'s how the users think about patients.' },
      { title: 'Raising the design bar for an entire platform', body: "I worked within Evernorth's Control Center design system — and pushed deliberately past it where the product demanded more. The design standard we set for Broadstreet created visible pressure on the host platform. Within the year, Control Center began a broader design upgrade. One well-scoped product changed what the whole team thought was achievable." },
      { title: 'Cross-functional execution', body: "Merging onto an existing data and engineering team mid-project meant earning trust before earning authority. I showed up to standups, learned their vocabulary, and framed every design decision as a shared problem. I kept leadership aligned at every pivot, ensured engineers understood the rationale behind each choice, and translated design intent into implementation-ready specs — keeping the team moving without leaving anyone behind." },
    ],
    evolution: [
      { era: '2022–2023', label: 'Wizard Flow', body: 'Step-by-step guided search. Users found it constraining — experienced researchers wanted all options visible at once, not locked behind sequential steps.' },
      { era: '2024–2025', label: 'Side Panel Search', body: 'Persistent filter panel alongside the map. Faster to first search, but as the filter set expanded, the panel stopped scaling for power users with complex queries.' },
      { era: '2026–Present', label: 'AI-Powered Search', body: 'Natural language entry — "Find PCOS patients in regions with limited reproductive endocrinologist access." Conversational intent, visual refinement. Early prototypes show strong user preference.' },
    ],
    pullQuote: "If you can't explain how the data moves through the system, you can't design the interface that makes it legible. Discovery wasn't a phase — it was the entire foundation.",
    outcome: 'Broadstreet became the primary research workflow for clinical population analysis at Evernorth — serving 100k+ users across three major versions, reducing manual search effort by 90%. The design standard we set created visible pressure on the host platform: within a year, Control Center began a broader upgrade. The next phase brings the same clinical intelligence depth to external health systems, payers, and research institutions.',
    nextSteps: [
      'Expand to external health systems and payers — the same interface model applied to a B2B2C context with different trust and permissions constraints.',
      'Build a saved cohort system so researchers can track a patient population over time, not just run one-off queries.',
      'Explore mobile-first views for clinical field teams who need population data at the point of care, not just at a desk.',
    ],
  },

  'broadstreet-ai': {
    slug: 'broadstreet-ai',
    company: 'Evernorth / Cigna',
    title: 'Conversational AI Agent',
    tagline: 'Designed a multi-turn clinical AI agent — named John Snow, after the physician who traced cholera to a water pump — before the industry had a playbook for what conversational enterprise UX meant.',
    role: 'Lead Designer & Product Manager',
    timeline: '2025 – Present',
    accent: '#5B4F8C',
    accentRgb: '91,79,140',
    tags: ['Generative AI', 'Conversational UX', 'Enterprise', 'User Research', 'Interaction Design', 'Multi-turn Dialogue', 'Prompt Design', 'AI Safety UX', 'Knowledge Transfer', 'Healthcare AI'],
    stats: [
      { value: '96%', label: 'of tested users rated it a "must have"' },
      { value: '100k+', label: 'users on the Broadstreet platform' },
      { value: 'V3', label: 'of the platform — shipped' },
    ],
    challenge: "Broadstreet's clinical database is powerful and deeply underused — because learning to query it takes time most researchers don't have. Training documentation wasn't working. The real need was a guide who could walk users through a search in real time, explain what each field meant, make selections on their behalf when they were stuck, and get out of the way when they weren't. That's a different design problem than most AI work — less about intelligence, more about trust and transparency.",
    agentMap: true,
    images: [
      { src: '/case-studies/broadstreet-ai/screen-2.webp', caption: 'Search filter + AI panel open — side-by-side before the pop-up decision' },
      { src: '/case-studies/broadstreet-ai/screen-3.webp', caption: 'Broadstreet AI panel open — "Tell me about the patients you\'re looking for"' },
      { src: '/case-studies/broadstreet-ai/v2-icd-codes.png', caption: 'Custom ICD code browser — surfaced mid-conversation when the agent needs precision input' },
      { src: '/case-studies/broadstreet-ai/v2-demographics.png', caption: 'Custom demographics modal — age range and sex rules built through the AI conversation' },
      { src: '/case-studies/broadstreet-ai/screen-4.webp', caption: 'AI fills cardiovascular filters autonomously from a natural language prompt' },
      { src: '/case-studies/broadstreet-ai/screen-5.webp', caption: 'Agent response — "Help me find patients with Type 2 diabetes" with auto-filled filters' },
      { src: '/case-studies/broadstreet-ai/screen-6.webp', caption: 'PTSD conversation — agent clarifying scope and asking follow-up questions' },
      { src: '/case-studies/broadstreet-ai/screen-7.webp', caption: 'Agent refining PTSD search — narrowing by condition, specialty, and location' },
      { src: '/case-studies/broadstreet-ai/screen-8.webp', caption: 'Complex multi-condition query — cardiovascular + PTSD with female patient filter' },
      { src: '/case-studies/broadstreet-ai/screen-9.webp', caption: 'Final confirmed search — filters locked and ready to run' },
    ],
    evolution: [
      { era: 'V1', label: 'The Popup Agent', body: 'A floating chat bubble in the corner — it could answer questions about the platform but couldn\'t touch the UI. Users asked it to help, it explained what to do, and then they still had to do it themselves. The gap between what the agent said and what it could actually do was the whole problem.', img: '/case-studies/broadstreet-ai/v1-popup.png' },
      { era: 'V2', label: 'The Sidebar Agent', body: 'The agent moved into a persistent right-panel with direct access to every filter — it could select conditions, set demographics, and build a complete search on your behalf. The shift from "tell me what to do" to "I\'ll do it with you" changed the entire value proposition.', img: '/case-studies/broadstreet-ai/screen-3.webp' },
      { era: 'V3', label: 'Structured Components', body: 'The next frontier: mid-conversation UI handoffs — a date picker, a map selection, an ICD code browser — surfaced inside the chat at the moment they\'re needed. Prose when prose is enough; precision UI when it isn\'t.', img: '/case-studies/broadstreet-ai/v2-icd-codes.png' },
    ],
    approach: [
      { title: 'Knowledge transfer through demonstration', body: "The core insight: people don't read training documentation, but they will follow a good guide. John Snow walks users through building a search, explains each filter in plain language, and makes selections on their behalf when they're stuck. The agent transfers expertise through doing, not explaining — and that distinction shapes every interaction pattern in the product." },
      { title: 'Designing the boundaries of AI behavior', body: "Keeping John Snow on task was the hardest design problem on this project. Users got curious — the agent is named after a famous epidemiologist, and people wanted to explore that. We had to design graceful redirects, a dedicated 'Learn More' surface, and strict scope boundaries that felt helpful rather than evasive. Every edge case was a deliberate design decision, not an afterthought." },
      { title: 'Layout as a strategic call', body: "I researched AI assistant patterns extensively before committing to a layout. Enterprise AI in 2025 was moving away from persistent sidecars — which compete with content for space — toward focused modal agents that appear at the moment of need. We shipped a pop-up agent. The decision was informed by market patterns, user workflow analysis, and the specific constraints of Broadstreet's map-heavy interface." },
      { title: 'Turning technical constraints into design decisions', body: "Context windows, hallucination boundaries, and prompt constraints were real engineering limits that could have become design blockers. Instead, I worked directly with two engineers to make each constraint a decision point — what should the agent say when it reaches its limit? How do we design a graceful handoff back to the manual UI? Technical complexity became a source of UX clarity, not a ceiling." },
    ],
    pullQuote: "John Snow traced a cholera outbreak to a single water pump in 1854. Naming the agent after him wasn't a flourish — the tool does the same thing, with a hundred and seventy years more data.",
    outcome: "John Snow handles the query construction phase of the Broadstreet workflow — where users previously churned because the learning curve was too steep. 96% of tested users called it a 'must have.' The next frontier: letting the agent surface structured UI components — a date picker, a map selection — mid-conversation when prose alone isn't enough.",
    nextSteps: [
      'Surface structured UI components mid-conversation — date pickers, map selections — so the agent can hand off to precise controls without breaking the conversational flow.',
      'Design a memory model: let John Snow remember what a researcher tends to search for and pre-populate a starting point on their next session.',
      'Build an agent audit log so clinical compliance teams can see exactly what the AI recommended and why — a requirement before enterprise-wide rollout.',
    ],
  },

  'louisiana-housing': {
    slug: 'louisiana-housing',
    company: 'Horne LLP',
    title: 'Emergency Housing Relief',
    tagline: 'Four states. $300M in COVID housing relief. And no real-time way for anyone to see where the money was or where it was stuck — until there was.',
    role: 'Data Visualization Designer & Developer',
    timeline: 'Apr 2021 – Apr 2022',
    accent: '#8B6230',
    accentRgb: '139,98,48',
    tags: ['Data Visualization', 'Information Architecture', 'WCAG Accessibility', 'User Research', 'SQL', 'Power BI', 'Stakeholder Alignment', 'Government Programs', 'Data Pipeline', 'Emergency Relief'],
    stats: [
      { value: '$300M', label: 'in COVID housing relief tracked in real time' },
      { value: '4', label: 'states — four different schemas, eligibility rules, and funding structures' },
      { value: '9', label: 'executives and program directors with live visibility for the first time' },
    ],
    discoveryHeading: 'Research in the Field',
    discoveryBody: [
      "We talked to 6 program managers across Louisiana, Mississippi, and Texas — all actively processing COVID housing assistance applications. Sessions were remote, 30 minutes, conducted over Zoom while they shared their screens.",
      "Every single person had at least 3 browser tabs open during our session. Two had Excel spreadsheets running alongside the dashboard. When we asked them to find a specific applicant's status, the average time was over 4 minutes. Two couldn't find it at all without switching to a different system. One PM had built her own color-coded Excel tracker because 'the dashboard doesn't tell me what I need to do next, just what happened.' WiFi dropped during 2 of the 6 sessions. They didn't even react — this was normal for them.",
      "The insight that shaped everything: the people using this tool were in crisis mode — understaffed, underfunded, and accountable for money reaching families who needed it. Every second of confusion had a human cost downstream. 'Elegant' was irrelevant. 'Scannable at a glance' was everything. After the redesign, average time-to-decision dropped from 4+ minutes to under 45 seconds.",
    ],
    challenge: "States were processing thousands of COVID-19 housing assistance applications. The data existed — it lived in databases that required a SQL query to reach. Program managers had access to the database but not the means to interrogate it, so oversight meant waiting for reports that were already a week old by the time they landed. Families who had lost their jobs were waiting on housing funds while the people responsible for releasing them were navigating blind.",
    carousel: [
      { src: '/case-studies/louisiana-housing/dash-1.webp', caption: 'Louisiana — overview dashboard: disbursements, pipeline, parish-level map' },
      { src: '/case-studies/louisiana-housing/dash-2.webp', caption: 'Louisiana — applications: stage breakdown, arrearage, LHC/HCA referrals' },
      { src: '/case-studies/louisiana-housing/dash-3.webp', caption: 'Louisiana — statewide view: top parishes by applications and disbursement' },
      { src: '/case-studies/louisiana-housing/dash-4.webp', caption: 'Louisiana — mortgages: servicer breakdown, delinquency days, federal loan program' },
      { src: '/case-studies/louisiana-housing/dash-5.webp', caption: 'Louisiana — demographics: employment, race, gender, veteran status, disability' },
    ],
    approach: [
      { title: 'Understanding the decisions before designing the data', body: "I sat with program administrators and state officials before I built anything. The question wasn't 'what data do we have?' — it was 'what decision are you trying to make right now, and what would change it?' The answer shaped everything: five views per state, each one answering a specific question a program director might walk in with. Application bottlenecks. Disbursement velocity. Parish-level gaps. Demographic equity. Nothing made it in because it was available — everything made it in because someone needed it." },
      { title: 'End-to-end ownership of the data pipeline', body: "This wasn't a design handoff. I wrote the SQL — queries connecting live application databases to Power BI, optimized for real-time refresh across four states with different schemas, eligibility rules, and funding caps. When the data was wrong, I found it. When the refresh was slow, I fixed it. Owning the full stack meant the design and the data stayed in sync — and when something broke at 2am before a stakeholder review, I was the one who fixed it." },
      { title: 'Accessibility as a design constraint, not a checklist', body: "Administrators were making high-stakes calls under pressure, often on equipment they didn't choose. WCAG compliance shaped every color decision, every label, every contrast ratio. Demographic data was surfaced mindfully. The dashboards had to be understood at a glance by someone who had never seen them before. That's a harder bar than 'looks good in a Figma prototype.'" },
      { title: 'Communicating complex systems to non-technical stakeholders', body: "Program directors weren't data people — they were policy people. Every design decision had to translate a complex, multi-state data model into something a C-suite executive could act on in under thirty seconds. I presented iterative updates directly to program leadership, incorporated stakeholder feedback at every stage, and kept the information architecture anchored to the decisions people actually needed to make." },
    ],
    pullQuote: "Partway through the project I spoke with someone who was waiting on housing assistance. She had no idea what I was building. That conversation made every design decision feel more consequential than any stakeholder review ever could.",
    outcome: 'Program administrators went from week-old spreadsheets to live dashboards showing exactly where every dollar was and where it was stuck — across four states, in real time. Families received assistance faster because the people responsible for releasing funds could finally see the full picture. Design with a direct human outcome.',
    nextSteps: [
      'Replace Power BI with a custom-built web dashboard — browser-native, offline-capable, and accessible without a Power BI license for field workers on state-issued hardware.',
      'Add a predictive flags view: surface applications that are trending toward delay so program managers can act before they miss the funding window.',
      'Build a cross-state comparison layer so federal overseers can benchmark disbursement velocity across all four programs simultaneously.',
    ],
  },

  'sar-consumer': {
    slug: 'sar-consumer',
    company: 'Sar — Passion project',
    title: 'Sar: Zero-Friction Receipt',
    tagline: "Designed a two-sided product — a receipt that requires nothing from the consumer, and a setup that requires nothing from the merchant after day one. The hard part was making both feel that simple.",
    role: 'Founder & Lead Designer',
    timeline: '2024 – Present',
    accent: '#3D5E8C',
    accentRgb: '61,94,140',
    tags: ['Interaction Design', 'iOS', 'Apple Wallet', 'NFC', 'Two-sided UX', 'User Research', 'Zero-friction Design', 'App Clips', 'Merchant UX', 'Digital Receipts', 'Hardware-free'],
    stats: [
      { value: '< 3s', label: 'from tap to receipt in Apple Wallet — the core interaction goal' },
      { value: '0', label: 'new hardware or staff behavior change required for merchants' },
      { value: '3+', label: 'active pilots across Boulder & Denver, CO' },
    ],
    compactCarousel: true,
    images: [
      { src: '/case-studies/sar-consumer/screen-wallet.webp', caption: 'Apple Wallet receipt' },
      { src: '/case-studies/sar-consumer/screen-nfc.webp', caption: 'NFC tap flow' },
      { src: '/case-studies/sar-consumer/screen-signup.webp', caption: 'Onboarding' },
    ],
    discoveryHeading: 'Listening at the Point of Payment',
    discoveryBody: [
      "We recruited 8 people ages 24–45 — a mix of frequent restaurant-goers and small business owners — through a Boulder coffee shop and two Denver brunch spots. Sessions were 20 minutes, in-person, right after they paid.",
      "7 of 8 said they throw paper receipts away immediately or let them go through the wash. The one who kept them did it 'for taxes' and still had a shoebox. When asked what the ideal receipt experience would look like, 4 people unprompted described something on their phone — 2 specifically said 'like a notification.' The word that came up most across all 8 sessions: automatic. Nobody wanted to scan anything, open an app, or type an email address. The threshold for action at checkout is essentially zero.",
      "3 of 8 had given a fake email address at a POS to avoid marketing. Trust in email receipts is low — not because people don't want receipts, but because they don't trust what comes after. That finding ruled out email entirely and pointed directly to Apple Wallet: a trusted, contained surface with no marketing risk.",
    ],
    challenge: "Every digital receipt solution before Sar made the same mistake: they asked the customer to do something. Type an email. Download an app. Create an account. That friction is exactly why paper receipts still exist — the alternatives were more work than the thing they replaced. The design challenge wasn't technical. It was interaction design: how do you deliver a receipt to a consumer who never asked for one, without asking them to do anything, while simultaneously building a product merchants would actually adopt without retraining their staff?",
    approach: [
      { title: 'Zero consumer action as the design constraint', body: "The central design decision on Sar wasn't a screen or a flow — it was a rule: the consumer should never have to do anything they wouldn't already do at checkout. That constraint eliminated email forms, app download prompts, and account creation entirely. What remained was NFC tap → App Clip → Face ID → Apple Wallet. Each step in that sequence maps to something the user is already doing. Nothing is new behavior." },
      { title: 'Choosing Apple Wallet over an app', body: "Apple Wallet was a deliberate design decision, not a default. It's already on every iPhone, already trusted for passes and confirmations, and requires zero mental model change. The receipt lands where users already look for this kind of thing. The full app earns its download later — through receipt history, tax categorization, and expense export — once the user has seen enough value to want more. Starting in Wallet is how you earn that trust without demanding it upfront." },
      { title: 'Two audiences, one coherent product', body: "Designing for consumers and merchants simultaneously meant two completely different interaction models that could never conflict. The consumer never sees the merchant dashboard. The merchant never sees the consumer app. Each audience has its own entry point, its own mental model, its own definition of success. The design challenge was keeping both journeys simple while sharing a single backend — and making sure neither user ever felt like they wandered into the wrong product." },
      { title: 'Designing the merchant experience to disappear', body: "The best merchant UX is the one merchants don't notice. No new hardware — the NFC reader that processes tap-to-pay already exists on every modern POS. No staff retraining — the checkout flow doesn't change. One OAuth connection, and every completed payment triggers a receipt automatically. I designed the merchant onboarding to be a single decision point: connect your POS. Everything after that runs without them." },
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
    pullQuote: "Every receipt solution before Sar asked the customer to do something. Making zero consumer action the hard constraint — not an aspiration — is what forced every interaction decision that followed.",
    liveUrl: 'https://sar-app.com',
    outcome: 'Three active pilots running in Boulder and Denver. The core interaction — tap, Face ID, Wallet, done — is working as designed and clocking in under three seconds. Current focus: expanding pilot partnerships and running the research loop to understand exactly where the experience breaks down and for whom.',
    nextSteps: [
      'Build tax categorization into the Wallet receipt so expense tracking happens at the moment of purchase — no app required to get value from the data.',
      'Design the merchant analytics layer: revenue trends, top items, peak hours — turning the receipt data into a lightweight POS insights dashboard for small businesses.',
      'Test the Android path. The NFC tap works cross-platform but the Wallet equivalent (Google Wallet) has different trust signals and a different mental model to design for.',
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

  // Preload all images immediately so clicks feel instant
  useEffect(() => {
    slides.forEach(s => { const img = new Image(); img.src = s.src; });
  }, [slides]);

  const prev = () => setIdx(i => (i - 1 + slides.length) % slides.length);
  const next = () => setIdx(i => (i + 1) % slides.length);

  return (
    <div style={{ marginTop: 56, maxWidth: compact ? 340 : '100%', margin: compact ? '56px auto 0' : '56px 0 0' }}>
      <div style={{ position: 'relative', borderRadius: 3, overflow: 'hidden', border: '10px solid #FAFAF7', boxShadow: '0 6px 28px rgba(100,70,30,0.13), 0 1px 4px rgba(100,70,30,0.07)', background: '#FAFAF7' }}>
        <AnimatePresence mode="sync">
        <motion.img
          key={idx}
          src={slides[idx].src}
          alt={slides[idx].caption}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ width: '100%', display: 'block', position: 'relative' }}
        />
        </AnimatePresence>
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
                    <img src={img.src} alt={img.caption} loading="lazy" style={{ width: '100%', display: 'block', borderRadius: 3, border: '10px solid #FAFAF7', boxShadow: '0 6px 28px rgba(100,70,30,0.13), 0 1px 4px rgba(100,70,30,0.07)' }} />
                    {img.caption && <figcaption style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 10, paddingLeft: 2, lineHeight: 1.5 }}>{img.caption}</figcaption>}
                  </motion.figure>
                ))}
              </div>
            )}
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
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : `repeat(${evolution.length}, 1fr)`, gap: isMobile ? 32 : 20 }}>
              {evolution.map((item, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
                  {item.img && (
                    <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border-md)', marginBottom: 16, background: 'var(--bg-elevated)' }}>
                      <img src={item.img} alt={item.label} style={{ width: '100%', display: 'block', objectFit: 'cover', maxHeight: 220 }} />
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

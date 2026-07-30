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
    tagline: "Four years building something from nothing — learning a domain I had never worked in before, earning a place on a team that hadn't asked for me, and discovering that when you care enough about the work, the work has a way of asking more of everyone around you.",
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
    challenge: "The clinical researchers and analysts at Evernorth had access to 182 million patient records — and almost no real way to ask them a question. The only path in was SQL, which meant that population-level insight, the kind that shapes how care gets delivered, was effectively locked behind a technical skill most of the people who needed it most didn't have. What I came to understand was that this wasn't really a data problem. It was a problem of access. And access is a design problem.",
    carousel: [
      { src: '/case-studies/broadstreet-clinical/welcome-1.png', caption: 'Broadstreet — welcome screen and product entry point' },
      { src: '/case-studies/broadstreet-clinical/search-filter.png', caption: 'Search filter — demographics, condition, and treatment controls with live summary' },
      { src: '/case-studies/broadstreet-clinical/search-ai.png', caption: 'Broadstreet AI — natural language query fills filters in real time' },
      { src: '/case-studies/broadstreet-clinical/search-results.png', caption: 'Search results — top market with map, patient count, and provider density' },
      { src: '/case-studies/broadstreet-clinical/screen-2.webp', caption: 'Result details — physician profile popup with specialty, address, and patient density map' },
    ],
    discoveryHeading: 'Becoming the Subject Matter Expert',
    discoveryBody: [
      "Before I opened a design tool, I spent months just listening. I sat in on weekly standups with the engineering team I would eventually join. I talked to clinicians, researchers, data analysts — not to gather requirements, but to understand how they thought. What does a 'coverage gap' mean to a data analyst at Evernorth versus a physician working in the field? They're using the same phrase to describe two different problems. That distinction mattered for nearly every decision I made later.",
      "The persona work I did wasn't a deliverable to check off. It was how I learned to see through the eyes of the people I was designing for. Mark — a data analyst with deep SQL fluency and very little patience for interfaces that didn't take him seriously — became the person I was quietly asking 'what would you do?' at every step. If Mark would skip it, I cut it. If Mark would stop and question it, I stopped and explained it. That kind of specificity is what separates a product that respects its users from one that condescends to them.",
      "And what all of that listening eventually clarified was this: the goal was never to make the data simpler. It was to make its complexity navigable. The researchers I was designing for didn't want to be shielded from 182 million records. They wanted an interface that assumed they were capable — and gave them the tools to prove it.",
    ],
    discoveryImages: [
      { src: '/case-studies/broadstreet-clinical/screen-6.webp', caption: 'Mark — Evernorth Data Analyst persona' },
      { src: '/case-studies/broadstreet-clinical/screen-5.webp', caption: 'Martina — Goals, influences, needs, and pain points' },
      { src: '/case-studies/broadstreet-clinical/section-1.webp', caption: 'Research artifacts — persona development and discovery synthesis' },
      { src: '/case-studies/broadstreet-clinical/section-2.webp', caption: 'Early information architecture — structuring 182M records for visual navigation' },
      { src: '/case-studies/broadstreet-clinical/section-3.webp', caption: 'Iteration documentation — tracking design decisions across versions' },
      { src: '/case-studies/broadstreet-clinical/section-4.webp', caption: 'Process work — how each version evolved in response to user feedback' },
    ],
    approach: [
      { title: 'Earning the right to design', body: "There's a version of this project where I walked in with wireframes after two weeks. That's not the version I chose. I spent months in discovery — talking to clinicians and analysts, joining engineering standups, learning the data model before I touched a design tool. The only way to build something that genuinely respects expert users is to understand the domain at the level they understand it. That patience, early on, saved a great deal of time later." },
      { title: 'Geography as the frame everything else lives inside', body: "Clinical researchers think in geography. Coverage gaps in the Southeast. Outbreak density by county. That's not metaphor — it's how they actually organize their understanding of patient populations. So I built the entire product around the ArcGIS map. Not as a feature, but as the frame you never leave. Every filter, every result, every refinement surfaces in relation to place — because that's where the thinking happens." },
      { title: 'Caring about craft, even when no one required it', body: "Broadstreet sat inside Evernorth's Control Center design system, and I worked within it. But there were places where the product demanded more than the system had to offer — more precision, more care, more attention to the person on the other side of the screen. So I pushed, thoughtfully, past it. What I didn't anticipate was the effect: within a year, Control Center began a broader design upgrade. I didn't set out to change the platform. I just tried to do right by the product." },
      { title: 'Showing up as a colleague, not a vendor', body: "I joined an existing engineering and data team mid-project, which meant earning trust I hadn't yet established. I went to the standups. I learned the vocabulary. I tried to bring design into the conversation as a shared problem rather than an outside perspective. And I made sure that every person — on the engineering side, on the leadership side — understood not just what we were building, but why." },
    ],
    evolution: [
      { era: '2022–2023', label: 'Wizard Flow', body: 'Step-by-step guided search. Users found it constraining — experienced researchers wanted all options visible at once, not locked behind sequential steps.' },
      { era: '2024–2025', label: 'Side Panel Search', body: 'Persistent filter panel alongside the map. Faster to first search, but as the filter set expanded, the panel stopped scaling for power users with complex queries.' },
      { era: '2026–Present', label: 'AI-Powered Search', body: 'Natural language entry — "Find PCOS patients in regions with limited reproductive endocrinologist access." Conversational intent, visual refinement. Early prototypes show strong user preference.' },
    ],
    pullQuote: "What I came to understand, after months of listening before I ever designed anything, was that the hardest part of this work wasn't the interface. It was earning the right to design it in the first place.",
    outcome: "Broadstreet became the primary research tool for clinical population analysis at Evernorth — used by over 100,000 people, across three major versions, reducing the time it took to build a meaningful patient search from hours to seconds. The care we brought to this one product quietly raised expectations for the platform around it. The next chapter: bringing that same depth of clinical intelligence to external health systems, payers, and research institutions who need it just as much.",
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
    tagline: "Named the agent after the physician who traced a cholera epidemic to a single water pump in 1854 — by talking to people, drawing a map, and following the evidence carefully. The tool does something similar. It just has a hundred and seventy years more data to work with.",
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
    challenge: "The clinical database at Broadstreet was more powerful than most of the people using it realized. But learning to use it well took time — time that researchers, who already carried full workloads, simply didn't have. Training documentation existed. People weren't reading it. What was really needed wasn't more explanation. It was someone who could sit alongside a researcher, help them build a search in real time, and step back the moment they no longer needed help. That's a different kind of AI design problem. Less about capability. More about trust.",
    images: [
      { src: '/case-studies/broadstreet-ai/welcome-1.png', caption: 'Broadstreet — welcome screen and product entry point' },
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
    teamProcess: {
      intro: "This is how the team actually worked through the problem — a shared FigJam board where we mapped the three phases of the product roadmap together. What you're looking at is real working documentation: phase one was conversational querying, phase two was agentic action (the agent doing things, not just saying them), and phase three was applying that intelligence to fraud, waste, and abuse detection. The sticky notes are mine and my collaborators'. The messy parts are the honest parts.",
      images: [
        { src: '/case-studies/broadstreet-ai/figjam-roadmap.png', caption: 'Team FigJam — mapping the Chat → Agentic → Fraud, Waste & Abuse roadmap' },
      ],
    },
    evolution: [
      { era: 'V1', label: 'The Popup Agent', body: 'A floating chat bubble in the corner — it could answer questions about the platform but couldn\'t touch the UI. Users asked it to help, it explained what to do, and then they still had to do it themselves. The gap between what the agent said and what it could actually do was the whole problem.', img: '/case-studies/broadstreet-ai/v1-popup.png' },
      { era: 'V2', label: 'The Sidebar Agent', body: 'The agent moved into a persistent right-panel with direct access to every filter — it could select conditions, set demographics, and build a complete search on your behalf. The shift from "tell me what to do" to "I\'ll do it with you" changed the entire value proposition.', img: '/case-studies/broadstreet-ai/screen-3.webp' },
      { era: 'V3', label: 'Structured Components', body: 'The next frontier: mid-conversation UI handoffs — a date picker, a map selection, an ICD code browser — surfaced inside the chat at the moment they\'re needed. Prose when prose is enough; precision UI when it isn\'t.', img: '/case-studies/broadstreet-ai/v2-icd-codes.png' },
    ],
    approach: [
      { title: 'Guiding alongside, not instructing from above', body: "What I kept returning to was a simple truth: people don't read documentation, but they will follow a thoughtful guide. John Snow was designed to walk beside you — explaining each filter in language that didn't assume expertise, making selections on your behalf when you were stuck, and stepping back the moment you weren't. That shift from telling people what to do to doing it with them changed the entire nature of what the product was." },
      { title: 'Designing where the agent stops', body: "One of the most considered parts of this work was determining what John Snow shouldn't do. Users were curious — the agent is named after a famous epidemiologist, and people wanted to explore that. So we designed graceful redirects, a dedicated space for that curiosity, and scope boundaries that felt genuinely helpful rather than arbitrary. Every edge case was a real design decision, treated with real care." },
      { title: 'Doing the research before settling on a direction', body: "Before I committed to a layout, I spent real time studying how AI assistants were being integrated across enterprise products. What I found was a clear shift: the industry was moving away from persistent sidepanels — which compete with the content they're meant to support — toward agents that appear exactly when someone needs them, and disappear when they don't. That's the direction we took. Not because it felt right, but because the evidence pointed there." },
      { title: 'Sitting with the constraints until they became decisions', body: "Context window limits, hallucination risk, prompt constraints — these were genuine engineering realities, and they could have simply become blockers. Instead, I worked directly with two engineers to treat each one as a design question worth answering. What should the agent say when it reaches the edge of what it can do? How do we hand back gracefully to the manual interface? Working through those questions honestly made the product more trustworthy, not less capable." },
    ],
    pullQuote: "The hardest design problem wasn't building an agent that could answer clinical questions. It was building one that knew when to stop talking and let the researcher do the work.",
    outcome: "John Snow now handles the part of the Broadstreet workflow where researchers used to give up — the query construction phase, where the learning curve was steepest and the cost of confusion highest. Ninety-six percent of people who tested it called it a must-have. The next step is letting the agent hand off to structured UI components — a date picker, a map selection — mid-conversation, when language alone isn't precise enough.",
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
    tagline: "Four states. $300 million in COVID housing relief. And the families waiting on that money deserved better than a system where no one could tell where it was stuck — or why.",
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
      "We talked to six program managers across Louisiana, Mississippi, and Texas — all of them actively processing housing assistance applications for families in crisis. Sessions were thirty minutes, remote, while they shared their screens.",
      "Every single person had at least three browser tabs open during our conversation. Two had built their own Excel trackers alongside the existing dashboard — because, as one program manager put it, 'the dashboard tells me what happened. It doesn't tell me what I need to do next.' When we asked them to find a specific applicant's status, the average time was over four minutes. Two couldn't find it at all without switching to a different system. WiFi dropped during two of the six sessions. Neither person reacted. This was simply the environment they worked in every day.",
      "What became clear across all six conversations was that these were people operating under genuine pressure — understaffed, underfunded, and personally accountable for getting money to families who were counting on it. Every moment of confusion in the interface had a cost that didn't show up in any dashboard, but you could feel it if you spent any time with the people doing the work. 'Elegant' was not the bar. 'Scannable at a glance, the moment you need it' was the bar. After the redesign, average time-to-decision dropped from over four minutes to under forty-five seconds.",
    ],
    challenge: "In the months after the pandemic began, states across the South were processing thousands of applications from families who had lost their jobs, fallen behind on rent, and were one missed payment away from losing their homes. The data that could have told program managers where the money was, which applications were stalled, which families were still waiting — it all existed. It just sat in a database that required SQL to reach. And so the people responsible for moving that money to the families who needed it were, in a very real sense, navigating blind.",
    housingFlow: true,
    carousel: [
      { src: '/case-studies/louisiana-housing/dash-1.webp', caption: 'Louisiana — overview dashboard: disbursements, pipeline, parish-level map' },
      { src: '/case-studies/louisiana-housing/dash-2.webp', caption: 'Louisiana — applications: stage breakdown, arrearage, LHC/HCA referrals' },
      { src: '/case-studies/louisiana-housing/dash-3.webp', caption: 'Louisiana — statewide view: top parishes by applications and disbursement' },
      { src: '/case-studies/louisiana-housing/dash-4.webp', caption: 'Louisiana — mortgages: servicer breakdown, delinquency days, federal loan program' },
      { src: '/case-studies/louisiana-housing/dash-5.webp', caption: 'Louisiana — demographics: employment, race, gender, veteran status, disability' },
    ],
    approach: [
      { title: 'Starting with the decision, not the data', body: "Before I designed anything, I sat with program administrators and state officials and asked a single question: what decision are you trying to make right now, and what would change it? That question became the architecture of the entire product. Each of the five views per state was built around something a program director might genuinely need to know on any given morning — where applications were stalled, how quickly money was moving, which parishes were falling behind, whether the people receiving assistance reflected the communities most in need. Nothing made it in because the data was available. Everything made it in because someone needed to act on it." },
      { title: 'Staying accountable to both the design and the data', body: "This wasn't a project that ended at the handoff. I wrote the SQL connecting the live application databases to Power BI, maintained real-time data refresh across four states with different schemas, eligibility rules, and funding structures, and stayed close to the pipeline throughout. When something was wrong in the numbers, I went looking for it. When a refresh failed the night before a stakeholder review, I stayed until it was right. The design and the data had to stay honest to each other — and that meant staying responsible for both." },
      { title: 'Accessibility as a genuine obligation', body: "The people using these dashboards were making high-stakes decisions under real pressure, often on hardware they hadn't chosen. WCAG compliance wasn't a line item — it shaped every color, every label, every contrast ratio. I thought carefully about how demographic data was presented, and how to make it meaningful without reducing people to categories. The standard I held myself to was simple: could someone who had never seen this dashboard understand what it was telling them, the very first time they opened it?" },
      { title: 'Translating for people who had to act, not analyze', body: "Program directors were policy people, not data people — and that distinction mattered for every design decision I made. Each view had to be legible to someone in a leadership meeting who might have thirty seconds to determine whether a disbursement was on track or in trouble. I presented updates directly to program leadership throughout the project, listened carefully to what confused them, and kept the information architecture anchored to the questions they were actually asking." },
    ],
    pullQuote: "Partway through this project, I spoke briefly with someone who was waiting on housing assistance. She had no idea what I was building. That conversation stayed with me — and made every subsequent design decision feel more consequential than any stakeholder review ever could.",
    outcome: "Program administrators went from week-old spreadsheets to live dashboards that showed exactly where every dollar was and where it was stuck — across four states, in real time. Families received assistance faster because the people responsible for releasing those funds could finally see the full picture. That's what I mean when I say design can have a direct human outcome.",
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
    tagline: "Designed it, coded it, incorporated it, and then went out to coffee shops to watch people stuff receipts into their coat pockets — just to make sure the problem was exactly what I thought it was.",
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
      { src: '/case-studies/sar-consumer/screen-wallet.webp', caption: 'Apple Wallet receipt — the end state the entire product is built around' },
      { src: '/case-studies/sar-consumer/screen-nfc.webp', caption: 'NFC tap flow — the 3-second consumer interaction' },
      { src: '/case-studies/sar-consumer/screen-signup.webp', caption: 'Consumer sign-up — built in React/Vite, deployed to Cloudflare Pages, backed by Supabase' },
      { src: '/case-studies/sar-consumer/screen-transactions.webp', caption: 'Transaction history — receipt data organized automatically post-tap' },
    ],
    fieldPhotos: [
      { src: '/case-studies/sar-consumer/img-1.webp', caption: 'Field research — the receipt problem in real life' },
      { src: '/case-studies/sar-consumer/img-2.webp', caption: 'The "shoebox moment" — what receipts actually become' },
      { src: '/case-studies/sar-consumer/img-3.webp', caption: 'Consumer frustration is the design brief' },
    ],
    discoveryHeading: 'Listening at the Point of Payment',
    discoveryBody: [
      "I recruited eight people between twenty-four and forty-five through a Boulder coffee shop and two Denver brunch spots — frequent diners, a couple of small business owners, people who paid for things regularly and had feelings about what happened afterward. Sessions were twenty minutes, in person, right after they paid.",
      "Seven of the eight said they throw paper receipts away immediately — or find them later, crumpled, in a coat pocket that went through the wash. The one person who kept them was doing it 'for taxes,' and she still had a shoebox. When I asked what an ideal receipt experience would look like, four people, unprompted, described something that came to their phone. Two specifically said 'like a notification.' The word that came up most often across all eight conversations was the same: automatic. No one wanted to scan anything, open anything, or type anything. The threshold for action at the moment of checkout is, in practice, essentially zero.",
      "Three of the eight had given a fake email address at a point-of-sale terminal just to avoid being put on a marketing list. What that told me wasn't that people don't want receipts. It was that they don't trust what comes after them. And that finding pointed directly toward Apple Wallet — a surface people already trusted, that carried no marketing risk, and that required nothing they weren't already doing.",
    ],
    challenge: "Every digital receipt solution that came before Sar made the same assumption: that a customer at checkout would be willing to do something. Type an email. Download an app. Create an account. And because of that assumption — because the experience of getting a digital receipt was reliably more effortful than just taking the paper one — paper receipts are still everywhere. The question I kept returning to was a simple one: what does it look like if the customer never has to do anything at all? Not less. Nothing.",
    approach: [
      { title: 'Zero friction — as a rule, not an aspiration', body: "The most consequential design decision on Sar wasn't a screen, or a flow, or a color. It was a rule: the consumer should never have to do anything they wouldn't already do at checkout. That rule eliminated email forms, app download prompts, and account creation before I had drawn a single wireframe. What remained was a sequence — NFC tap, App Clip, Face ID, Apple Wallet — in which every single step is something a person was already doing. Nothing asks for new behavior. That constraint wasn't limiting. It was clarifying." },
      { title: 'Why Wallet, and why not an app', body: "Apple Wallet was a considered choice. It already lives on every iPhone. It's already trusted for boarding passes, concert tickets, loyalty cards. It doesn't ask the person using it to change anything about how they relate to their phone. The receipt arrives somewhere familiar. And the full app — with history, tax categorization, expense export — earns its download later, once someone has seen enough Wallet receipts to want more. I wanted trust to come before the ask. Wallet made that sequence possible." },
      { title: 'Two audiences, one product that holds together quietly', body: "Building for consumers and merchants at the same time meant holding two entirely separate interaction models in mind — and making sure they never bled into each other. The consumer never sees the merchant dashboard. The merchant never sees the consumer experience. Each person enters through their own door, has their own definition of what went well, and should never feel like they've wandered into something built for someone else. The discipline was keeping both journeys genuinely simple while sharing a single backend underneath." },
      { title: 'A merchant experience that disappears after setup', body: "The best experience for a merchant is one they barely remember setting up. No new hardware — the NFC reader that handles tap-to-pay is already on every modern point-of-sale system. No retraining for staff. One connection, and every completed payment triggers a receipt automatically. I designed the onboarding around a single decision: connect your POS. Everything after that should simply run." },
      { title: 'From design to code — and everything in between', body: "Sar is a real product, not a concept. I built the consumer website in React and Vite, deployed it to Cloudflare Pages, designed and built the merchant sign-up flow, and set up the Supabase database. I integrated PassKit to generate the Apple Wallet passes that arrive on customers' phones after a tap. I work with AI as a collaborator throughout development — it helps me move faster, but every decision is mine. I also incorporated Sar as a C Corp (PBC), because if this ever grew into something, I wanted it to be ready for that." },
      { title: 'A physical prototype to make the interaction real', body: "In the spring of 2026, I built a physical NFC hardware prototype to demonstrate the full checkout flow — tap at the terminal, Wallet pass appears on the customer's phone. Building it let me measure the actual latency of the interaction, observe whether the gesture felt intuitive without any instruction, and put the complete experience in front of pilot merchants in person, without needing a live integration running behind it. There is something irreplaceable about showing someone a real thing rather than a simulation of one." },
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
    pullQuote: "The question every receipt product before this one got wrong was what to ask of the customer. The answer I kept arriving at was: nothing. And designing backward from nothing turned out to be the most clarifying constraint I've ever worked with.",
    liveUrl: 'https://sar-app.com',
    outcome: "Three active pilots running in Boulder and Denver. The core interaction — tap, Face ID, Wallet, done — is working as designed and coming in under three seconds. What I'm focused on now is understanding, with real rigor, exactly where the experience breaks down and for whom: who hesitates, who never returns, and what the product needs to become in order to earn their trust.",
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
                  <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid var(--border-md)', background: 'var(--bg-elevated)' }}>
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
                    <img src={img.src} alt={img.caption} loading="lazy" style={{ width: '100%', display: 'block', borderRadius: 3, border: '10px solid #FAFAF7', boxShadow: '0 6px 28px rgba(100,70,30,0.13), 0 1px 4px rgba(100,70,30,0.07)' }} />
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
              Before there were any screens, I spent time at coffee shops and restaurants just watching what happened at the moment of payment. Receipts got crumpled, left on the counter, or tucked into pockets and forgotten within thirty seconds. The problem I was designing for was right there in front of me — I just needed to sit still long enough to see it clearly.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 16 : 20 }}>
              {study.fieldPhotos.map((img, i) => (
                <motion.figure key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0, margin: '0px 0px 200px 0px' }} transition={{ duration: 0.5, delay: i * 0.1 }} style={{ margin: 0 }}>
                  <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid var(--border-md)', background: 'var(--bg-elevated)', aspectRatio: '4/3' }}>
                    <img src={img.src} alt={img.caption} loading="lazy" style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }} />
                  </div>
                  {img.caption && <figcaption style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 10, lineHeight: 1.5 }}>{img.caption}</figcaption>}
                </motion.figure>
              ))}
            </div>
          </Section>
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

        {/* Carousel — placed after Approach to build up to the final product */}
        {study.carousel && (
          <Carousel slides={study.carousel} accent={accent} accentRgb={accentRgb} />
        )}

        {/* Screenshots — placed just before pull quote as the final payoff */}
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

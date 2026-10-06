import type { MouseEvent, ReactNode } from 'react'
import { Badge } from '../components/ui/Badge'
import { Card } from '../components/ui/Card'

const PORTFOLIO_URL = 'https://rachnabhardwajus.wixsite.com/rachna-bhardwaj-pm'
const GITHUB_URL = 'https://github.com/rachnabhardwajus-PortfolioPM/stay-n-sleep-prototype'
// An HTML copy, because a PDF opened from inside an embedded (sandboxed) page shows blank
const PRD_URL = '/case-study-assets/prd.html'

const NAV_SECTIONS = [
  ['research', 'Research'],
  ['vision', 'Vision'],
  ['journey', 'Journey'],
  ['mvp', 'MVP'],
  ['tradeoffs', 'Tradeoffs'],
  ['roadmap', 'Roadmap'],
  ['kpis', 'KPIs'],
  ['design', 'Design'],
  ['build', 'Build'],
  ['prd', 'PRD'],
] as const

const AT_A_GLANCE = [
  ['Role', 'Product Manager (end to end)'],
  ['Timeline', '6 weeks'],
  ['Tools', 'ChatGPT (PRD) · Figma Make (design) · Claude Code (build) · GitHub · Vercel'],
  ['Stack', 'React · TypeScript · Vite · Tailwind CSS'],
]

const JOURNEY_STEPS = [
  'Company SSO',
  'Dashboard',
  'Create Group Booking',
  'Trip Details',
  'Add Employees',
  'Search Stays',
  'Pick Property',
  'Loyalty Savings Auto-Applied',
  'Review',
  'Confirm',
  'Trip Appears on Dashboard',
]

const MVP_FEATURES = [
  {
    feature: 'Exclusive corporate discount rates',
    why: 'Loyalty tiers (Silver, Gold, Platinum) give companies a reason to make Stay-n-Sleep their main booking platform and to keep coming back.',
    inPrototype: true,
  },
  {
    feature: 'Enhanced reporting dashboard',
    why: 'Lets travel managers monitor and manage travel spend with real-time insights and reports.',
    inPrototype: false,
  },
  {
    feature: 'Priority support',
    why: 'A dedicated support line for corporate accounts so bookings and cancellations get resolved quickly.',
    inPrototype: false,
  },
]

const TRADEOFFS = [
  {
    title: 'Retention vs. acquisition',
    text: 'We prioritized loyalty features for existing corporate customers, who spent 31% more than new customers, over acquisition-focused features. We accepted slower short-term customer growth in exchange for stronger retention and lifetime value.',
  },
  {
    title: 'Booking frequency vs. margin per booking',
    text: 'We introduced 10–20% loyalty discounts to encourage repeat bookings. We accepted lower margin on discounted transactions, expecting increased booking frequency and customer lifetime value to compensate.',
  },
  {
    title: 'Immediate value clarity vs. tier transparency',
    text: 'We displayed the actual dollar savings, such as “You saved $414,” rather than emphasizing the discount percentage or complete tier rules. This made the benefit tangible but made it harder for travel managers to compare future tier benefits in advance.',
  },
  {
    title: 'Company value vs. traveler motivation',
    text: 'We designed loyalty status at the company level because the company paid for the bookings. This aligned the reward with the buyer but provided less personal recognition to the employees making the trips.',
  },
  {
    title: 'Checkout simplicity vs. reward visibility',
    text: 'We applied discounts automatically without codes or redemption steps. This reduced booking friction, but it also made the reward easier to overlook, requiring us to reinforce the savings throughout the journey.',
  },
  {
    title: 'Speed to learning vs. feature breadth',
    text: 'We launched loyalty and group booking first to validate repeat-booking behavior and demand for coordinated travel. We deferred reporting and priority support, accepting a less complete experience in exchange for faster learning.',
  },
]

const SCOPE_DECISIONS = [
  ['Happy path only, with mock data and no backend', 'One complete successful booking, with simulated SSO, payments and property data.'],
  ['Manual employee entry', "Derek types each traveler's name and work email. No HR-directory integration."],
  ['Desktop-first', 'Travel managers plan and book group trips at their desks.'],
  ['Edit and Cancel are visible but not functional', 'They show what the broader product offers.'],
]

const ROADMAP = [
  {
    goal: 'Innovation',
    now: ['Launch a beta release for controlled corporate groups'],
    next: ['Roll out to all corporate users', '20% increase in engagement with the admin dashboard and reports'],
    later: ['Roll out to all users across the app'],
  },
  {
    goal: 'User engagement and retention',
    now: ['Onboarding program for new loyalty members to boost early engagement'],
    next: ['25% increase in new users', 'Achieve a 40% retention rate'],
    later: ['20% more yearly profit from this feature'],
  },
  {
    goal: 'Customer satisfaction',
    now: ['Use beta analytics to improve customer service'],
    next: ['70% increase in customer satisfaction rate'],
    later: ['95% customer satisfaction rate'],
  },
]

const SUPPORTING_KPIS = [
  'Loyalty Adoption Rate',
  'Corporate Retention Rate',
  'Annual Spend per Account',
  'Avg. Booking Value',
  'Loyalty Booking Conversion',
  'Customer Lifetime Value',
  'Total Savings Delivered',
]

const SCREENS = [
  ['figma-1-login.jpg', 'Company SSO login'],
  ['figma-2-dashboard.jpg', 'Corporate dashboard with Gold status and savings'],
  ['figma-3-trip-details.jpg', 'Group booking: trip details'],
  ['figma-4-search.jpg', 'Search results with loyalty-eligible stays'],
  ['figma-5-confirmation.jpg', 'Booking confirmation'],
]

const BUILD_STEPS = [
  'Used the PRD as the single source of truth and gave it to Claude Code as the build brief',
  'Built a working React + TypeScript app: SSO simulation, group booking, search, automatic loyalty pricing, confirmation',
  'Caught a PRD conflict in the Figma mockup (it showed "25% off") and fixed it so managers see dollar savings only',
  'Pushed it to GitHub and deployed it free on Vercel',
]

const CODE_SNIPPET = `// PRD rule: travel managers see the dollar savings, never the tier %.
// Round the discounted nightly rate first, so "$rate × nights × rooms"
// always equals the subtotal shown on screen.
export function computeBookingPricing(
  standardRatePerNight: number,
  nights: number,
  rooms: number,
  tier: LoyaltyTier,
  loyaltyEligible: boolean,
): BookingPricing {
  const corporateRatePerNight = loyaltyEligible
    ? Math.round(standardRatePerNight * (1 - tierDiscountRate(tier)))
    : standardRatePerNight
  const standardTotal = standardRatePerNight * nights * rooms
  const corporateTotal = corporateRatePerNight * nights * rooms
  const savings = standardTotal - corporateTotal
  const taxesAndFees = Math.round(corporateTotal * 0.15)
  const total = corporateTotal + taxesAndFees
  // ...returns every figure the price summary shows
}`

const LINK_BASE =
  'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors'
const LINK_PRIMARY = `${LINK_BASE} bg-blue-600 text-white hover:bg-blue-700`
const LINK_LIGHT = `${LINK_BASE} border border-white/20 bg-white/10 text-white hover:bg-white/20`
const LINK_SECONDARY = `${LINK_BASE} border border-slate-300 bg-white text-slate-700 hover:bg-slate-50`

// Scrolls in code rather than relying on the #hash, which does nothing when the page is embedded
function scrollToSection(id: string) {
  return (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    document.getElementById(id)?.scrollIntoView({ block: 'start' })
  }
}

function Section({ id, number, title, children }: { id: string; number: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-slate-200 py-14">
      <p className="text-sm font-bold tracking-widest text-blue-600">{number}</p>
      <h2 className="mt-1 text-3xl font-extrabold text-slate-900">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  )
}

export function CaseStudyPage() {
  // ?embed hides the top bar and footer when the page is shown inside the portfolio site
  const embedded = new URLSearchParams(window.location.search).has('embed')

  return (
    <div className="min-h-screen bg-slate-50 text-slate-700">
      {!embedded && (
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3">
          <a href={PORTFOLIO_URL} className="whitespace-nowrap text-sm font-semibold text-slate-600 hover:text-slate-900">
            ← Rachna Bhardwaj · Portfolio
          </a>
          <nav className="hidden gap-4 text-sm font-medium text-slate-500 xl:flex">
            {NAV_SECTIONS.map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={scrollToSection(id)} className="hover:text-slate-900">
                {label}
              </a>
            ))}
          </nav>
          <a href="/login" target="_blank" rel="noreferrer" className="whitespace-nowrap text-sm font-semibold text-blue-600 hover:text-blue-700">
            Live prototype →
          </a>
        </div>
      </header>
      )}

      <div className="bg-slate-900 text-white">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <p className="flex items-center gap-2 text-sm font-semibold text-blue-400">
            <span aria-hidden>🏠</span> Product case study
          </p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl">
            Stay-n-Sleep: Corporate Loyalty &amp; Group Booking
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-slate-300">
            A corporate travel marketplace where travel managers book stays for whole teams and automatically save with
            their company's loyalty tier. I took it from research and PRD to design to a live, working prototype.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/login" target="_blank" rel="noreferrer" className={LINK_PRIMARY}>
              Live Prototype
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className={LINK_LIGHT}>
              GitHub
            </a>
            <a href="#design" onClick={scrollToSection('design')} className={LINK_LIGHT}>
              Figma Screens
            </a>
            <a href={PRD_URL} target="_blank" rel="noreferrer" className={LINK_LIGHT}>
              Full PRD
            </a>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-6">
        <div className="grid gap-8 py-14 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-extrabold text-slate-900">About the app</h2>
            <p className="mt-4 leading-relaxed">
              Stay-n-Sleep is a New York-based marketplace for corporate travel stays and local experiences, with 2M+
              listings from hosts and hotels and 20M+ guests served. Only corporate customers book through it, and
              they've been asking for a loyalty program.
            </p>
          </div>
          <Card className="p-6 lg:col-span-2">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">At a glance</h2>
            <dl className="mt-4 space-y-3 text-sm">
              {AT_A_GLANCE.map(([label, value]) => (
                <div key={label}>
                  <dt className="font-semibold text-slate-900">{label}</dt>
                  <dd className="mt-0.5">{value}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </div>

        <Section id="research" number="01" title="Identify: Market Research & Customer Empathy">
          <p className="max-w-3xl leading-relaxed">
            Demand for a loyalty program has been growing among existing corporate customers. Before designing anything,
            I looked at what the company's research says about them.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              ['50%', 'more likely to try new products and experiences than new customers'],
              ['31%', 'more spend from existing customers than from new ones'],
              ['Lower cost', 'to retain an existing customer than to acquire a new one'],
            ].map(([stat, label]) => (
              <Card key={stat} className="p-5">
                <p className="text-3xl font-extrabold text-slate-900">{stat}</p>
                <p className="mt-2 text-sm">{label}</p>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="vision" number="02" title="Mission, Vision & Product Vision">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="p-6">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">Mission</h3>
              <p className="mt-2 text-lg font-medium text-slate-900">
                Build a lifelong community of travelers and empower every traveler to have meaningful experiences.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">Vision</h3>
              <p className="mt-2 text-lg font-medium text-slate-900">
                Connect people and broaden horizons through new experiences and cultures.
              </p>
            </Card>
          </div>
          <Card className="mt-4 p-6">
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">Product vision</h3>
            <p className="mt-2 leading-relaxed">
              <strong className="text-slate-900">For</strong> business travelers{' '}
              <strong className="text-slate-900">who</strong> need a streamlined, cost-effective and rewarding travel
              experience with benefits tailored to corporate travel, <strong className="text-slate-900">Stay-n-Sleep</strong>{' '}
              is a marketplace <strong className="text-slate-900">that</strong> offers a loyalty program with
              personalized rewards, seamless company travel management and exclusive business travel perks.{' '}
              <strong className="text-slate-900">Unlike</strong> Airbnb, it provides specialized corporate features:
              admin dashboards, price alerts, corporate payment options and company travel-expense management.
            </p>
          </Card>
        </Section>

        <Section id="journey" number="03" title="Persona & User Journey">
          <Card className="p-6">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-xl font-bold text-slate-900">Derek, Corporate Travel Manager</h3>
              <Badge variant="gold">★ Gold member company</Badge>
            </div>
            <p className="mt-3 leading-relaxed">
              Derek books accommodations for employees, creates group bookings, manages the travel budget and reviews
              expenses. He needs an efficient way to book stays for several employees at once while cutting travel costs
              through his company's loyalty benefits.
            </p>
          </Card>
          <figure className="mt-6">
            <a href="/case-study-assets/persona.png" target="_blank" rel="noreferrer">
              <img
                src="/case-study-assets/persona.png"
                alt="Key customer persona: Derek, the travel manager, with his goals, needs and pain points"
                className="w-full max-w-3xl rounded-xl border border-slate-200 bg-white shadow-sm"
              />
            </a>
            <figcaption className="mt-2 text-sm text-slate-500">Key customer persona from the research phase</figcaption>
          </figure>
          <h3 className="mt-8 font-bold text-slate-900">Derek books a team trip in one flow</h3>
          <ol className="mt-4 flex flex-wrap items-center gap-2 text-sm">
            {JOURNEY_STEPS.map((step, index) => (
              <li key={step} className="flex items-center gap-2">
                <span className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-900">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  {step}
                </span>
                {index < JOURNEY_STEPS.length - 1 && (
                  <span aria-hidden className="text-slate-400">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </Section>

        <Section id="mvp" number="04" title="Plan: MVP">
          <p className="max-w-3xl leading-relaxed">
            Defining the MVP early validates market fit, shortens time to market and brings in feedback sooner. The
            prototype builds Loyalty Discounts and Group Booking end to end. The Reporting Dashboard and Priority Support
            stay in the MVP but come after the core value is validated.
          </p>
          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Feature</th>
                  <th className="px-4 py-3">Why</th>
                  <th className="px-4 py-3">In prototype</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {MVP_FEATURES.map((row) => (
                  <tr key={row.feature}>
                    <td className="px-4 py-3 font-semibold text-slate-900">{row.feature}</td>
                    <td className="px-4 py-3">{row.why}</td>
                    <td className="px-4 py-3">
                      <Badge variant={row.inPrototype ? 'success' : 'neutral'}>{row.inPrototype ? 'Built' : 'Next'}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section id="tradeoffs" number="05" title="Tradeoffs">
          <p className="max-w-3xl leading-relaxed">
            Each of these was a choice between two things we wanted. This is what we picked and what we accepted in
            return.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {TRADEOFFS.map((item, index) => (
              <Card key={item.title} className="p-6">
                <h3 className="font-bold text-slate-900">
                  {index + 1}. {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed">{item.text}</p>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="roadmap" number="06" title="Product Roadmap">
          <p className="max-w-3xl leading-relaxed">
            An outcome-based roadmap, chosen because it ties to the business goal of retention and leaves the team free
            to adapt as it learns from user feedback.
          </p>
          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="text-xs uppercase tracking-wide">
                <tr>
                  <th className="bg-slate-100 px-4 py-3 text-slate-500">Goal</th>
                  <th className="bg-green-100 px-4 py-3 text-green-700">Now (1–2 months)</th>
                  <th className="bg-blue-100 px-4 py-3 text-blue-700">Next (3–6 months)</th>
                  <th className="bg-amber-100 px-4 py-3 text-amber-800">Later (6+ months)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {ROADMAP.map((row) => (
                  <tr key={row.goal} className="align-top">
                    <td className="px-4 py-3 font-semibold text-slate-900">{row.goal}</td>
                    {[row.now, row.next, row.later].map((items, column) => (
                      <td key={column} className="px-4 py-3">
                        <ul className="space-y-1">
                          {items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section id="kpis" number="07" title="Success Metrics">
          <Card className="border-blue-200 bg-blue-50 p-6">
            <p className="text-sm font-bold uppercase tracking-wide text-blue-700">North Star</p>
            <p className="mt-1 text-2xl font-extrabold text-slate-900">Repeat Corporate Booking Rate</p>
          </Card>
          <h3 className="mt-6 font-bold text-slate-900">Supporting KPIs</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {SUPPORTING_KPIS.map((kpi) => (
              <Badge key={kpi}>{kpi}</Badge>
            ))}
          </div>
          <p className="mt-4 text-sm italic text-slate-500">
            These are proposed post-launch KPIs, not results from the prototype.
          </p>
        </Section>

        <Section id="design" number="08" title="Design">
          <p className="max-w-3xl leading-relaxed">
            I used Figma Make to turn the PRD into a clickable prototype of the whole happy path before writing any
            code.
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {SCREENS.map(([file, caption]) => (
              <figure key={file}>
                <a href={`/case-study-assets/${file}`} target="_blank" rel="noreferrer">
                  <img
                    src={`/case-study-assets/${file}`}
                    alt={caption}
                    className="w-full rounded-xl border border-slate-200 shadow-sm"
                  />
                </a>
                <figcaption className="mt-2 text-sm text-slate-500">{caption} · Designed in Figma Make</figcaption>
              </figure>
            ))}
          </div>
          <h3 className="mt-10 font-bold text-slate-900">Prototype scope decisions</h3>
          <ul className="mt-3 max-w-3xl space-y-2 text-sm">
            {SCOPE_DECISIONS.map(([decision, detail]) => (
              <li key={decision}>
                <span className="font-semibold text-slate-900">{decision}.</span> {detail}
              </li>
            ))}
          </ul>
        </Section>

        <Section id="build" number="09" title="Build">
          <h3 className="font-bold text-slate-900">How I built it with Claude Code</h3>
          <ul className="mt-3 max-w-3xl list-disc space-y-2 pl-5">
            {BUILD_STEPS.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
          <div className="mt-6 overflow-hidden rounded-xl bg-slate-900 shadow-sm">
            <p className="border-b border-white/10 bg-slate-800 px-5 py-3 font-mono text-xs text-slate-400">
              src/utils/loyalty.ts
            </p>
            <pre className="overflow-x-auto p-5 font-mono text-sm leading-relaxed text-slate-200">
              <code>{CODE_SNIPPET}</code>
            </pre>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className={LINK_SECONDARY}>
              View Code on GitHub
            </a>
            <a href="/login" target="_blank" rel="noreferrer" className={LINK_PRIMARY}>
              Try the Live App
            </a>
          </div>
        </Section>

        <Section id="prd" number="10" title="PRD">
          <dl className="max-w-3xl space-y-3">
            <div>
              <dt className="inline font-semibold text-slate-900">Problem: </dt>
              <dd className="inline">
                Corporate customers want loyalty rewards. Existing customers spend 31% more and are 50% more likely to
                try new products.
              </dd>
            </div>
            <div>
              <dt className="inline font-semibold text-slate-900">Goal: </dt>
              <dd className="inline">
                A company-level loyalty program (Silver / Gold / Platinum) based on annual booking spend.
              </dd>
            </div>
            <div>
              <dt className="inline font-semibold text-slate-900">In scope: </dt>
              <dd className="inline">Derek's group booking and loyalty savings, happy path.</dd>
            </div>
            <div>
              <dt className="inline font-semibold text-slate-900">Out of scope: </dt>
              <dd className="inline">Real payments and SSO, the host portal, flights and cars, error flows.</dd>
            </div>
          </dl>
          <a href={PRD_URL} target="_blank" rel="noreferrer" className={`${LINK_PRIMARY} mt-6`}>
            Read the full PRD
          </a>
        </Section>
      </main>

      {!embedded && (
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-6 text-sm text-slate-500">
          <p>© 2026 Rachna Bhardwaj</p>
          <a href={PORTFOLIO_URL} className="font-semibold text-slate-600 hover:text-slate-900">
            Back to portfolio
          </a>
        </div>
      </footer>
      )}
    </div>
  )
}

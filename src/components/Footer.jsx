import { GraduationCap } from 'lucide-react'
import Logo from './Logo'

const year = new Date().getFullYear()

const columns = [
  {
    title: 'Tools',
    links: [
      ['#search', 'Compare Medicines'],
      ['#calculator', 'Savings Calculator'],
      ['#kendras', 'Find a Kendra'],
    ],
  },
  {
    title: 'Project',
    links: [
      ['#about', 'How It Works'],
      ['#disclaimer', 'Disclaimer'],
      ['#home', 'Back to top'],
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-navy-200">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            A medicine price awareness tool to compare reference prices, estimate
            potential savings and find Jan Aushadhi Kendras.
          </p>
          <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/10">
            <GraduationCap size={14} className="text-emerald-400" />
            Community Engagement Project
          </span>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold text-white">{col.title}</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {col.links.map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="transition hover:text-emerald-400">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="text-sm font-semibold text-white">Educational disclaimer</h4>
          <p className="mt-4 text-sm leading-relaxed">
            Informational only — not medical advice. Prices are reference data
            and may change. Kendra listings come from the official PMBI Kendra locator. Consult a qualified doctor or pharmacist before
            changing any treatment.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-navy-400 sm:flex-row sm:justify-between">
          <p>© {year} Arogya Bachat. Educational project.</p>
          <p>No online sales, ordering or delivery.</p>
        </div>
      </div>
    </footer>
  )
}

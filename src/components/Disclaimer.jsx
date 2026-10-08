import { BookOpen, Database, IndianRupee, RefreshCw, ShieldAlert, Stethoscope, UserRound } from 'lucide-react'
import Reveal from './Reveal'

const points = [
  { icon: BookOpen, title: 'Educational project', text: 'An informational Community Engagement Project — not a pharmacy or medical service.' },
  { icon: IndianRupee, title: 'Reference prices', text: 'Prices shown are reference data for comparison only.' },
  { icon: RefreshCw, title: 'Data may change', text: 'Prices vary by retailer, location and date, and can change at any time.' },
  { icon: Stethoscope, title: 'No diagnosis or prescription', text: 'This website does not diagnose any condition or prescribe any medicine.' },
  { icon: ShieldAlert, title: 'No replacement advice', text: 'It does not instruct anyone to replace or switch their prescribed medicines.' },
  { icon: Database, title: 'Data status', text: 'Jan Aushadhi MRPs come from the official PMBI Product MRP List. Leading Brand Reference Prices are the listed MRP of one widely used brand (from 1mg.com), adjusted to the same pack size — an educational comparison, not live prices. Kendra codes, addresses and locations come from the official PMBI Kendra locator.' },
]

export default function Disclaimer() {
  return (
    <section id="disclaimer" className="py-20 md:py-24">
      <div className="container-page">
        <Reveal className="card overflow-hidden">
          <div className="grid lg:grid-cols-[20rem_1fr]">
            <div className="border-b border-navy-100 bg-amber-50/60 p-6 sm:p-8 lg:border-r lg:border-b-0">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <ShieldAlert size={24} />
              </span>
              <p className="eyebrow mt-5 !text-amber-700">Important information</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Disclaimer</h2>
              <p className="mt-3 text-sm leading-relaxed text-navy-600">
                Please read before using the information on this website.
              </p>
            </div>

            <div className="p-6 sm:p-8">
              <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {points.map(({ icon: Icon, title, text }) => (
                  <li key={title} className="flex gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-700">
                      <Icon size={17} />
                    </span>
                    <div>
                      <p className="font-display text-sm font-bold text-navy-900">{title}</p>
                      <p className="mt-0.5 text-sm leading-relaxed text-navy-600">{text}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex items-start gap-3 rounded-xl bg-emerald-50 p-4 ring-1 ring-emerald-100">
                <UserRound size={18} className="mt-0.5 shrink-0 text-emerald-700" />
                <p className="text-sm leading-relaxed font-medium text-emerald-900">
                  Always consult a qualified doctor or pharmacist before making any
                  change to your treatment.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

import { BookOpen, Calculator, MapPin, Scale } from 'lucide-react'

const items = [
  { icon: Scale, title: 'Compare reference prices', text: 'Same ingredient, strength & pack' },
  { icon: Calculator, title: 'Estimate potential savings', text: 'Monthly and yearly estimates' },
  { icon: MapPin, title: 'Find nearby Kendras', text: 'Filter by your area' },
  { icon: BookOpen, title: 'Educational & informational', text: 'No sales, no prescriptions' },
]

export default function ValueStrip() {
  return (
    <section aria-label="Key benefits" className="container-page relative z-10 -mt-2 pb-6">
      <div className="card grid divide-y divide-navy-100 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
        {items.map(({ icon: Icon, title, text }) => (
          <div key={title} className="group flex items-center gap-4 p-5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition duration-300 group-hover:bg-emerald-600 group-hover:text-white">
              <Icon size={20} />
            </span>
            <div>
              <p className="font-display text-sm font-bold text-navy-900">{title}</p>
              <p className="text-xs text-navy-500">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

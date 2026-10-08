import { BadgeCheck, MapPin, Navigation, Store } from 'lucide-react'
import { formatDate } from '../data/medicines'

export default function StoreCard({ kendra }) {
  return (
    <article className="card group flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      {/* location-themed header */}
      <div className="bg-dots relative h-16 bg-gradient-to-br from-cyan-50 to-emerald-50">
        <span className="absolute -bottom-5 left-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-card ring-1 ring-navy-900/5 transition group-hover:bg-emerald-600 group-hover:text-white">
          <MapPin size={20} />
        </span>
        <span className="absolute top-3 right-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-semibold text-navy-700 ring-1 ring-navy-900/5">
          {kendra.area ?? kendra.city}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 pt-8">
        <h3 className="text-base leading-snug font-bold">{kendra.name}</h3>

        <div className="mt-3 flex-1 text-sm text-navy-600">
          <p className="flex items-start gap-2">
            <Store size={15} className="mt-0.5 shrink-0 text-navy-400" />
            <span>
              {kendra.address}
              <span className="mt-0.5 block text-xs text-navy-500">
                {kendra.area ?? <span className="italic">Area not stated</span>} · {kendra.city} · PIN {kendra.pinCode}
              </span>
            </span>
          </p>
        </div>

        <p className="mt-4 flex items-start gap-1.5 text-[11px] leading-relaxed text-navy-500">
          <BadgeCheck size={12} className="mt-0.5 shrink-0 text-emerald-600" />
          <span>
            <a
              href={kendra.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-navy-200 underline-offset-2 hover:text-emerald-700"
            >
              PMBI Kendra locator
            </a>{' '}
            · checked {formatDate(kendra.verifiedOn)}
          </span>
        </p>

        <a
          href={kendra.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn mt-4 w-full bg-navy-900 text-white hover:bg-emerald-600 focus-visible:ring-emerald-200"
        >
          <Navigation size={15} /> View on Map
        </a>
      </div>
    </article>
  )
}

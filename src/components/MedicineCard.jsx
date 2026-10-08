import { ArrowRight, BadgeCheck, Calendar, ExternalLink, Pill } from 'lucide-react'
import { formatDate, formatINR, getSavings, hasBrandReference } from '../data/medicines'

export default function MedicineCard({ medicine, onCalculate }) {
  const savings = getSavings(medicine)
  const hasBrand = hasBrandReference(medicine)
  const janShare = hasBrand ? Math.min((medicine.janAushadhiPrice / medicine.brandReferencePrice) * 100, 100) : 0
  // Shown as-is: if Jan Aushadhi is the dearer option, say so rather than show a negative "saving"
  const costsMore = savings && savings.amount < 0

  return (
    <article className="card group flex h-full flex-col transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      {/* Medicine information */}
      <div className="p-5 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 transition group-hover:bg-cyan-600 group-hover:text-white">
              <Pill size={20} />
            </span>
            <div>
              <h3 className="text-lg leading-tight font-bold">{medicine.name}</h3>
              <p className="mt-0.5 text-sm text-navy-500">{medicine.genericName}</p>
            </div>
          </div>
          <span className="shrink-0 rounded-md bg-navy-50 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-navy-600 uppercase ring-1 ring-navy-100">
            Code {medicine.drugCode}
          </span>
        </div>

        <dl className="mt-4 flex flex-wrap gap-1.5 text-xs">
          {[
            ['Strength', medicine.strength],
            ['Form', medicine.dosageForm],
            ['Pack', `${medicine.packSize} ${medicine.unit}`],
          ].map(([label, value]) => (
            <div key={label} className="flex gap-1 rounded-md bg-navy-50 px-2 py-1">
              <dt className="text-navy-500">{label}:</dt>
              <dd className="font-semibold text-navy-800">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Price comparison */}
      <div className="mx-3 rounded-xl bg-mist p-4">
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="text-navy-500">Leading Brand Reference Price</span>
          {hasBrand ? (
            <span className="font-semibold text-navy-700">{formatINR(medicine.brandReferencePrice)}</span>
          ) : (
            <span className="text-xs font-medium text-navy-400 italic">Not yet verified</span>
          )}
        </div>
        <div className={`mt-1.5 h-1.5 rounded-full ${hasBrand ? 'bg-navy-200' : 'bg-navy-100'}`} />

        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="font-medium text-emerald-700">Jan Aushadhi MRP</span>
          <span className="font-bold text-emerald-700">{formatINR(medicine.janAushadhiPrice)}</span>
        </div>
        <div className="mt-1.5 h-1.5 rounded-full bg-emerald-100">
          <div
            className={`h-full rounded-full ${hasBrand ? 'bg-emerald-500' : 'bg-emerald-200'}`}
            style={{ width: hasBrand ? `${janShare}%` : '100%' }}
          />
        </div>

        <div className="mt-4 flex items-end justify-between gap-3 border-t border-navy-100 pt-3">
          {costsMore ? (
            <>
              <div>
                <p className="text-[11px] font-semibold tracking-wider text-navy-500 uppercase">
                  Jan Aushadhi costs more / pack
                </p>
                <p className="font-display text-2xl font-extrabold text-navy-900">{formatINR(-savings.amount)}</p>
              </div>
              <span className="rounded-lg bg-amber-100 px-2.5 py-1 font-display text-sm font-bold text-amber-800">
                {(-savings.percent).toFixed(1)}% higher
              </span>
            </>
          ) : savings ? (
            <>
              <div>
                <p className="text-[11px] font-semibold tracking-wider text-navy-500 uppercase">
                  Potential saving / pack
                </p>
                <p className="font-display text-2xl font-extrabold text-navy-900">{formatINR(savings.amount)}</p>
              </div>
              <span className="rounded-lg bg-emerald-600 px-2.5 py-1 font-display text-sm font-bold text-white">
                Save {savings.percent.toFixed(1)}%
              </span>
            </>
          ) : (
            <p className="text-xs leading-relaxed text-navy-500">
              Savings will be shown once a verified Leading Brand Reference is added.
            </p>
          )}
        </div>
      </div>

      {/* Source + action */}
      <div className="mt-auto flex flex-col gap-3 p-5 pt-4">
        <div className="space-y-1 text-[11px] text-navy-500">
          <p className="flex items-center gap-1.5 font-semibold text-emerald-700">
            <BadgeCheck size={12} className="shrink-0" /> Source-backed reference data
          </p>
          <p className="flex items-center gap-1.5">
            <ExternalLink size={12} className="shrink-0" /> Jan Aushadhi:{' '}
            <a
              href={medicine.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-navy-200 underline-offset-2 hover:text-emerald-700"
            >
              PMBI Product MRP List
            </a>
          </p>
          {medicine.brandReference && (
            <p className="flex items-start gap-1.5">
              <ExternalLink size={12} className="mt-px shrink-0" />
              <span>
                Brand ref.:{' '}
                <a
                  href={medicine.brandReference.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-navy-200 underline-offset-2 hover:text-emerald-700"
                >
                  {medicine.brandReference.productName}
                </a>{' '}
                ({medicine.brandReference.packSize} {medicine.unit.replace(/s$/, '')}
                {medicine.brandReference.packSize === 1 ? '' : 's'}, MRP {formatINR(medicine.brandReference.packMrp)})
              </span>
            </p>
          )}
          <p className="flex items-center gap-1.5">
            <Calendar size={12} className="shrink-0" /> Last verified: {formatDate(medicine.verifiedOn)}
          </p>
        </div>
        <button
          onClick={() => onCalculate(medicine.id)}
          className="group/btn inline-flex items-center gap-1.5 self-start text-sm font-semibold text-emerald-700 transition hover:text-emerald-800"
        >
          Calculate savings
          <ArrowRight size={16} className="transition group-hover/btn:translate-x-1" />
        </button>
      </div>
    </article>
  )
}

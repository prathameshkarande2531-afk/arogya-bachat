import { useState } from 'react'
import { Activity, BadgeCheck, Pill, TrendingDown } from 'lucide-react'
import { formatINR, getSavings, hasBrandReference, medicines } from '../data/medicines'

// A few records to preview in the hero dashboard card
const previewIds = [2, 4, 6]
const previews = medicines.filter((m) => previewIds.includes(m.id))

export default function SavingsSnapshot() {
  const [activeId, setActiveId] = useState(previews[0].id)
  const medicine = previews.find((m) => m.id === activeId)
  const savings = getSavings(medicine)
  const hasBrand = hasBrandReference(medicine)
  const percent = savings ? savings.percent : 0
  const janShare = hasBrand ? (medicine.janAushadhiPrice / medicine.brandReferencePrice) * 100 : 100

  // Savings ring geometry
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - percent / 100)

  return (
    <div className="relative mx-auto w-full max-w-lg">
      {/* back plate for depth */}
      <div className="absolute inset-x-6 -bottom-4 top-6 -z-10 rounded-3xl bg-navy-900/5" />

      <div className="card overflow-hidden !rounded-3xl shadow-lift">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-navy-100 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <Activity size={17} />
            </span>
            <div>
              <p className="font-display text-sm font-bold text-navy-900">Savings Snapshot</p>
              <p className="text-[11px] text-navy-400">Per pack · reference prices</p>
            </div>
          </div>
          <span className="rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-bold tracking-wider text-emerald-700 uppercase ring-1 ring-emerald-200">
            Source-backed
          </span>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-navy-100 bg-navy-50/60 px-3 py-2">
          {previews.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveId(m.id)}
              className={`flex-1 rounded-lg px-2 py-1.5 text-xs font-semibold transition ${
                m.id === activeId
                  ? 'bg-white text-navy-900 shadow-card'
                  : 'text-navy-500 hover:text-navy-800'
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>

        <div className="p-5 sm:p-6">
          {/* Medicine */}
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
              <Pill size={20} />
            </span>
            <div>
              <p className="font-display text-lg font-bold text-navy-900">
                {medicine.name} {medicine.strength}
              </p>
              <p className="text-xs text-navy-500">
                {medicine.dosageForm} · {medicine.packSize} {medicine.unit} · PMBI code {medicine.drugCode}
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-[1fr_auto] items-center gap-6">
            {/* Price bars */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-navy-500">Leading Brand Reference Price</span>
                  {hasBrand ? (
                    <span className="font-semibold text-navy-800">{formatINR(medicine.brandReferencePrice)}</span>
                  ) : (
                    <span className="font-medium text-navy-400 italic">Not yet verified</span>
                  )}
                </div>
                <div className="mt-1.5 h-2.5 rounded-full bg-navy-100">
                  {hasBrand && <div className="h-full w-full rounded-full bg-navy-400" />}
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-emerald-700">Jan Aushadhi MRP</span>
                  <span className="font-semibold text-emerald-700">{formatINR(medicine.janAushadhiPrice)}</span>
                </div>
                <div className="mt-1.5 h-2.5 rounded-full bg-emerald-50">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all duration-700"
                    style={{ width: `${janShare}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Savings ring */}
            <div className="relative h-28 w-28">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                <circle cx="50" cy="50" r={radius} fill="none" strokeWidth="9" className="stroke-emerald-50" />
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="none"
                  strokeWidth="9"
                  strokeLinecap="round"
                  className="stroke-emerald-500 transition-all duration-700"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-xl font-extrabold text-navy-900">
                  {savings ? `${Math.round(percent)}%` : '—'}
                </span>
                <span className="text-[10px] font-medium text-navy-500">{savings ? 'lower' : 'pending'}</span>
              </div>
            </div>
          </div>

          {/* Savings summary */}
          <div className="mt-6 flex items-center justify-between rounded-2xl bg-navy-900 px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
                <TrendingDown size={20} />
              </span>
              <div>
                <p className="text-xs text-navy-200">
                  {savings ? 'Potential saving per pack' : 'Jan Aushadhi MRP per pack'}
                </p>
                <p className="font-display text-2xl font-bold">
                  {formatINR(savings ? savings.amount : medicine.janAushadhiPrice)}
                </p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white">
              {savings ? `−${percent.toFixed(1)}%` : 'Official MRP'}
            </span>
          </div>

          <p className="mt-4 flex items-center gap-1.5 text-[11px] text-navy-400">
            <BadgeCheck size={13} className="text-cyan-600" />
            Jan Aushadhi MRP: official PMBI list · Brand: listed MRP, not a live price
          </p>
        </div>
      </div>
    </div>
  )
}

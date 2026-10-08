import { CalendarDays, Info, PiggyBank, Wallet } from 'lucide-react'
import { formatINR, hasBrandReference, medicines } from '../data/medicines'
import AnimatedNumber from './AnimatedNumber'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

// Alphabetical order for the dropdown
const sortedMedicines = [...medicines].sort(
  (a, b) => a.name.localeCompare(b.name) || parseFloat(a.strength) - parseFloat(b.strength),
)

export default function SavingsCalculator({ selectedId, setSelectedId, quantity, setQuantity }) {
  const medicine = medicines.find((m) => m.id === Number(selectedId))
  const qty = Number(quantity)
  const validQty = quantity !== '' && qty >= 0 && Number.isFinite(qty)

  // Savings can only be estimated when a verified leading-brand reference exists
  const canEstimate = medicine ? hasBrandReference(medicine) : false

  // Per-unit prices (e.g. per tablet) = pack price / pack size
  const savingPerUnit = canEstimate
    ? (medicine.brandReferencePrice - medicine.janAushadhiPrice) / medicine.packSize
    : 0
  const monthly = validQty ? savingPerUnit * qty : 0
  const yearly = monthly * 12
  // Negative difference = Jan Aushadhi is dearer; show it as an extra cost, never as a saving
  const extraCost = canEstimate && savingPerUnit < 0

  const unitLabel = medicine ? medicine.unit.replace(/s$/, '') : 'unit'

  return (
    <section id="calculator" className="relative overflow-hidden bg-white py-20 md:py-24">
      <div className="pointer-events-none absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-navy-100 to-transparent" />

      <div className="container-page grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        {/* LEFT: explanation + inputs */}
        <Reveal>
          <SectionHeading
            align="left"
            eyebrow="Savings calculator"
            title="Estimate what you could save"
            subtitle="Choose a medicine and enter how many units you use in a month. We’ll estimate the potential monthly and yearly difference using the reference prices."
          />

          <div className="space-y-5">
            <div>
              <label htmlFor="calc-medicine" className="mb-2 block text-sm font-semibold text-navy-800">
                Medicine
              </label>
              <select
                id="calc-medicine"
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                className="field cursor-pointer"
              >
                <option value="">Choose a medicine…</option>
                {sortedMedicines.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} {m.strength} {m.dosageForm}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="calc-qty" className="mb-2 block text-sm font-semibold text-navy-800">
                Monthly quantity <span className="font-normal text-navy-500">({medicine ? medicine.unit : 'units'})</span>
              </label>
              <input
                id="calc-qty"
                type="number"
                min="0"
                inputMode="numeric"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g. 30"
                className="field"
              />
              {quantity !== '' && !validQty && (
                <p className="mt-1.5 text-xs font-medium text-rose-600">Please enter a number 0 or more.</p>
              )}
              <div className="mt-3 flex flex-wrap gap-2">
                {[30, 60, 90].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setQuantity(String(n))}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      String(n) === quantity
                        ? 'bg-navy-900 text-white'
                        : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
                    }`}
                  >
                    {n} / month
                  </button>
                ))}
              </div>
            </div>

            {medicine && (
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-mist p-3">
                  <p className="text-xs text-navy-500">Leading Brand Reference Price</p>
                  {canEstimate ? (
                    <p className="font-semibold text-navy-800">
                      {formatINR(medicine.brandReferencePrice)} <span className="font-normal text-navy-500">/ {medicine.packSize}</span>
                    </p>
                  ) : (
                    <p className="font-medium text-navy-400 italic">Not yet verified</p>
                  )}
                </div>
                <div className="rounded-xl bg-emerald-50 p-3">
                  <p className="text-xs text-emerald-700">Jan Aushadhi MRP</p>
                  <p className="font-semibold text-emerald-800">
                    {formatINR(medicine.janAushadhiPrice)} <span className="font-normal text-emerald-700">/ {medicine.packSize}</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </Reveal>

        {/* RIGHT: result card */}
        <Reveal delay={120} className="lg:sticky lg:top-24">
          <div className="relative overflow-hidden rounded-3xl bg-navy-900 p-6 text-white shadow-lift sm:p-8">
            <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <p className="font-display text-lg font-bold text-white">
                  {extraCost ? 'Your estimated extra cost' : 'Your estimated savings'}
                </p>
                <span className="rounded-md bg-white/10 px-2 py-1 text-[10px] font-bold tracking-wider text-navy-100 uppercase">
                  Estimate
                </span>
              </div>
              <p className="mt-1 text-sm text-navy-200">
                {medicine
                  ? `${medicine.name} ${medicine.strength} · ${validQty ? qty : 0} ${medicine.unit} / month`
                  : 'Select a medicine to see your estimate'}
              </p>

              {/* Dominant yearly figure */}
              <div className="mt-8">
                <p className="flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-300 uppercase">
                  <PiggyBank size={15} /> {extraCost ? 'Estimated yearly extra cost' : 'Estimated yearly saving'}
                </p>
                <p className="mt-2 font-display text-5xl font-extrabold tracking-tight text-white tabular-nums sm:text-6xl">
                  {medicine && !canEstimate ? '—' : <AnimatedNumber value={Math.abs(yearly)} />}
                </p>
                {extraCost && (
                  <p className="mt-3 rounded-xl bg-amber-400/10 p-3 text-sm text-amber-100 ring-1 ring-amber-300/20">
                    For this medicine the Jan Aushadhi MRP is higher than the Leading Brand Reference Price,
                    so there is no saving to show.
                  </p>
                )}
                {medicine && !canEstimate && (
                  <p className="mt-3 rounded-xl bg-white/[0.06] p-3 text-sm text-navy-100 ring-1 ring-white/10">
                    A verified Leading Brand Reference for this medicine hasn’t been added yet,
                    so savings can’t be estimated. Its official Jan Aushadhi MRP is{' '}
                    <span className="font-semibold text-white">{formatINR(medicine.janAushadhiPrice)}</span> per{' '}
                    {medicine.packSize} {medicine.unit}.
                  </p>
                )}
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10">
                  <p className="flex items-center gap-1.5 text-xs text-navy-200">
                    <CalendarDays size={14} /> {extraCost ? 'Monthly extra cost' : 'Estimated monthly saving'}
                  </p>
                  <p className="mt-1 font-display text-2xl font-bold tabular-nums">
                    {medicine && !canEstimate ? '—' : <AnimatedNumber value={Math.abs(monthly)} />}
                  </p>
                </div>
                <div className="rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10">
                  <p className="flex items-center gap-1.5 text-xs text-navy-200">
                    <Wallet size={14} /> {extraCost ? 'Extra cost' : 'Saving'} per {unitLabel}
                  </p>
                  <p className="mt-1 font-display text-2xl font-bold tabular-nums">
                    {medicine && !canEstimate ? '—' : <AnimatedNumber value={Math.abs(savingPerUnit)} />}
                  </p>
                </div>
              </div>

              <p className="mt-6 flex items-start gap-2 border-t border-white/10 pt-5 text-xs leading-relaxed text-navy-200">
                <Info size={15} className="mt-px shrink-0 text-emerald-300" />
                Estimates are based on the reference data shown above. Brand
                reference prices are listed MRPs, not live selling prices, and may
                vary by retailer, location and date. Educational comparison only. Do not change
                your medicines without consulting a doctor or pharmacist.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { ChevronDown, Search, SearchX, X } from 'lucide-react'
import { medicines, searchMedicines } from '../data/medicines'
import MedicineCard from './MedicineCard'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const PAGE_SIZE = 12

export default function MedicineSearch({ query, setQuery, onCalculate }) {
  const results = searchMedicines(query)
  // Show cards a page at a time so the full list doesn't make the page endless
  const [limit, setLimit] = useState(PAGE_SIZE)
  const visible = results.slice(0, limit)

  return (
    <section id="search" className="py-20 md:py-24">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Search & compare"
            title="Compare medicine reference prices"
            subtitle="Search by medicine name, active ingredient or brand name. Each comparison uses the same ingredient, strength, dosage form and pack size."
          />
        </Reveal>

        <Reveal delay={80} className="mx-auto max-w-2xl">
          <div className="relative">
            <Search className="absolute top-1/2 left-5 -translate-y-1/2 text-navy-400" size={22} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a medicine, ingredient or brand, e.g. metformin or Dolo 650"
              aria-label="Search medicine"
              className="field !rounded-2xl !py-4 !pr-12 !pl-14 text-base shadow-card"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full p-1.5 text-navy-400 transition hover:bg-navy-50 hover:text-navy-800"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between text-sm">
            <p className="text-navy-500" aria-live="polite">
              {query.trim() ? (
                <>
                  <span className="font-semibold text-navy-900">{results.length}</span> result
                  {results.length === 1 ? '' : 's'} for “{query.trim()}”
                </>
              ) : (
                <>
                  Showing all <span className="font-semibold text-navy-900">{results.length}</span> medicines
                </>
              )}
            </p>
            <span className="hidden text-xs text-navy-400 sm:inline">Source-backed reference data · per pack · INR</span>
          </div>
        </Reveal>

        {results.length > 0 ? (
          <>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((m) => (
                <div key={m.id} className="animate-fade-up">
                  <MedicineCard medicine={m} onCalculate={onCalculate} />
                </div>
              ))}
            </div>
            {results.length > limit && (
              <div className="mt-10 text-center">
                <button onClick={() => setLimit((n) => n + PAGE_SIZE)} className="btn-secondary">
                  Show more <ChevronDown size={16} />
                </button>
                <p className="mt-2 text-xs text-navy-400">
                  Showing {visible.length} of {results.length}
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="card mx-auto mt-10 max-w-md p-10 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-50 text-navy-400">
              <SearchX size={26} />
            </span>
            <p className="mt-4 font-display text-lg font-bold text-navy-900">No medicines found</p>
            <p className="mt-1 text-sm text-navy-500">
              The list currently covers {medicines.length} medicines. Try “paracetamol” or “amlodipine”.
            </p>
            <button onClick={() => setQuery('')} className="btn-secondary mt-5">
              Show all medicines
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

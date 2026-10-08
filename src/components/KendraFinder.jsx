import { useState } from 'react'
import { Info, MapPinOff, Search } from 'lucide-react'
import { cities, kendras } from '../data/kendras'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import StoreCard from './StoreCard'

export default function KendraFinder() {
  const [text, setText] = useState('')
  const [city, setCity] = useState('All')

  const q = text.trim().toLowerCase()
  const results = kendras.filter((k) => {
    const matchesCity = city === 'All' || k.city === city
    // Name includes the official Kendra code, so searching "PMBJK01600" works too
    const matchesText =
      !q ||
      [k.name, k.area, k.city, k.address, k.pinCode].some((v) => v?.toLowerCase().includes(q))
    return matchesCity && matchesText
  })

  return (
    <section id="kendras" className="py-20 md:py-24">
      <div className="container-page grid items-start gap-10 lg:grid-cols-[22rem_1fr] lg:gap-12">
        {/* LEFT: controls */}
        <Reveal className="lg:sticky lg:top-24">
          <SectionHeading
            align="left"
            eyebrow="Kendra finder"
            title="Find a Jan Aushadhi Kendra"
            subtitle="Search by Kendra, area or city, then open the location in maps."
          />

          <div className="card space-y-5 p-5">
            <div>
              <label htmlFor="kendra-search" className="mb-2 block text-sm font-semibold text-navy-800">
                Search Kendra, area or city
              </label>
              <div className="relative">
                <Search className="absolute top-1/2 left-4 -translate-y-1/2 text-navy-400" size={18} />
                <input
                  id="kendra-search"
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="e.g. Pimpri, Rasta Peth or 411038"
                  className="field !pl-11"
                />
              </div>
            </div>

            <div>
              <label htmlFor="kendra-city" className="mb-2 block text-sm font-semibold text-navy-800">
                City
              </label>
              <select
                id="kendra-city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="field cursor-pointer"
              >
                <option value="All">All cities</option>
                {cities.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {['All', ...cities].map((a) => (
                <button
                  key={a}
                  onClick={() => setCity(a)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    city === a
                      ? 'bg-emerald-600 text-white'
                      : 'bg-navy-50 text-navy-600 hover:bg-emerald-50 hover:text-emerald-700'
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-navy-500">
            <Info size={14} className="mt-px shrink-0 text-amber-600" />
            Kendra codes, addresses and map locations are from the official PMBI
            Kendra locator. Please confirm details before visiting.
          </p>
        </Reveal>

        {/* RIGHT: results */}
        <div>
          <p className="mb-4 text-sm text-navy-500" aria-live="polite">
            <span className="font-semibold text-navy-900">{results.length}</span> Kendra
            {results.length === 1 ? '' : 's'} found
            {city !== 'All' && <> in <span className="font-semibold text-navy-900">{city}</span></>}
          </p>

          {results.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((k) => (
                <div key={k.id} className="animate-fade-up">
                  <StoreCard kendra={k} />
                </div>
              ))}
            </div>
          ) : (
            <div className="card p-10 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-50 text-navy-400">
                <MapPinOff size={26} />
              </span>
              <p className="mt-4 font-display text-lg font-bold text-navy-900">No Kendras found</p>
              <p className="mt-1 text-sm text-navy-500">Try another area, city or PIN code, or reset the filters.</p>
              <button
                onClick={() => {
                  setText('')
                  setCity('All')
                }}
                className="btn-secondary mt-5"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

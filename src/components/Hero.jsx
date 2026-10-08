import { useState } from 'react'
import { ArrowRight, GraduationCap, Search, ShieldCheck } from 'lucide-react'
import SavingsSnapshot from './SavingsSnapshot'

export default function Hero({ onSearch }) {
  const [text, setText] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    onSearch(text)
    document.getElementById('search')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative -mt-16 overflow-hidden pt-16">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#eaf6f3] via-[#f2f8fb] to-mist" />
      <div className="bg-dots pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_65%)]" />
      <div className="pointer-events-none absolute -top-40 right-[-10%] -z-10 h-[32rem] w-[32rem] rounded-full bg-cyan-200/30 blur-3xl" />

      <div className="container-page grid items-center gap-12 py-12 md:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-20">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-navy-700 shadow-card ring-1 ring-navy-900/5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <GraduationCap size={12} />
            </span>
            Community Engagement Project
          </span>

          <h1 className="mt-6 text-[2.2rem] leading-[1.08] font-extrabold tracking-tight text-navy-900 sm:text-5xl lg:text-[3.6rem]">
            Compare medicine prices.
            <br />
            <span className="text-emerald-600">Understand your savings.</span>
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed font-medium text-navy-500">
            Look up medicine reference prices, see the potential savings with
            Jan Aushadhi options, and find a Kendra near you — clear, simple
            and free.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 flex max-w-xl flex-col gap-2 rounded-2xl bg-white p-2 shadow-lift ring-1 ring-navy-900/5 transition focus-within:ring-4 focus-within:ring-emerald-500/20 sm:flex-row"
          >
            <label className="relative flex-1">
              <span className="sr-only">Search medicine</span>
              <Search className="absolute top-1/2 left-4 -translate-y-1/2 text-navy-400" size={20} />
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Search by medicine or ingredient…"
                className="w-full rounded-xl bg-transparent py-3.5 pr-4 pl-12 text-navy-900 outline-none placeholder:text-navy-400"
              />
            </label>
            <button type="submit" className="btn-primary !py-3.5 shadow-none">
              Compare prices <ArrowRight size={17} />
            </button>
          </form>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-navy-500">
            <span>Try:</span>
            {['Paracetamol', 'Metformin', 'Amlodipine'].map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => {
                  setText(name)
                  onSearch(name)
                  document.getElementById('search')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="font-semibold text-navy-700 underline decoration-navy-200 underline-offset-4 transition hover:text-emerald-700 hover:decoration-emerald-400"
              >
                {name}
              </button>
            ))}
          </div>

          <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-navy-500">
            <ShieldCheck size={15} className="mt-px shrink-0 text-emerald-600" />
            Informational only. Jan Aushadhi MRPs from the official PMBI list. Not medical advice —
            always consult your doctor or pharmacist.
          </p>
        </div>

        <div className="animate-fade-up [animation-delay:150ms]">
          <SavingsSnapshot />
        </div>
      </div>
    </section>
  )
}

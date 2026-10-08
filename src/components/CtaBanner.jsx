import { ArrowRight, MapPin } from 'lucide-react'
import Reveal from './Reveal'

export default function CtaBanner() {
  return (
    <section className="pb-20 md:pb-24">
      <div className="container-page">
        <Reveal className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600 px-6 py-12 text-center shadow-lift sm:px-12 md:py-16">
          <div className="bg-dots pointer-events-none absolute inset-0 opacity-30 invert" />
          <div className="pointer-events-none absolute -right-20 -bottom-24 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />

          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Make informed medicine price decisions.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-emerald-50 sm:text-lg">
              Compare reference prices, estimate potential savings and find Jan
              Aushadhi Kendras.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="#search" className="btn bg-white text-emerald-800 shadow-md hover:-translate-y-0.5 hover:bg-emerald-50 focus-visible:ring-white/40">
                Compare a Medicine <ArrowRight size={16} />
              </a>
              <a href="#kendras" className="btn text-white ring-1 ring-white/50 hover:bg-white/10 focus-visible:ring-white/40">
                <MapPin size={16} /> Find a Kendra
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

import { Calculator, MapPin, Scale, Search } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const steps = [
  { icon: Search, title: 'Search', text: 'Type a medicine name or its active ingredient.' },
  { icon: Scale, title: 'Compare', text: 'See brand and Jan Aushadhi reference prices side by side.' },
  { icon: Calculator, title: 'Calculate', text: 'Enter your monthly quantity to estimate potential savings.' },
  { icon: MapPin, title: 'Find Kendra', text: 'Locate a Jan Aushadhi Kendra in your area and open it on a map.' },
]

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-navy-900 py-20 md:py-24">
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-40 invert" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-emerald-500/15 blur-3xl" />

      <div className="container-page relative">
        <Reveal>
          <SectionHeading
            light
            eyebrow="How it works"
            title="From search to savings in four steps"
            subtitle="Arogya Bachat is a student-led Community Engagement Project that raises awareness about affordable medicine options available through Jan Aushadhi Kendras."
          />
        </Reveal>

        <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-6">
          {/* connecting line – horizontal on desktop */}
          <div className="absolute top-7 right-[12.5%] left-[12.5%] hidden h-px bg-gradient-to-r from-emerald-400/60 via-cyan-400/60 to-emerald-400/60 lg:block" />
          {/* connecting line – vertical on mobile */}
          <div className="absolute top-7 bottom-7 left-7 w-px bg-gradient-to-b from-emerald-400/60 to-cyan-400/60 lg:hidden" />

          {steps.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 100} className="group relative flex gap-5 lg:flex-col lg:items-center lg:text-center">
              <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy-900 font-display text-lg font-bold text-emerald-400 ring-2 ring-emerald-400/70 transition duration-300 group-hover:bg-emerald-500 group-hover:text-white">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="lg:mt-6">
                <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.07] text-cyan-300 ring-1 ring-white/10">
                  <Icon size={18} />
                </span>
                <h3 className="text-lg font-bold text-white">{title}</h3>
                <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-navy-200 lg:mx-auto">{text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

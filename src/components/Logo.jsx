import { HeartPulse } from 'lucide-react'

export default function Logo({ light = false }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-navy-900 text-emerald-400 shadow-sm">
        <HeartPulse size={19} strokeWidth={2.4} />
        <span className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-white" />
      </span>
      <span className={`font-display text-[1.05rem] font-bold tracking-tight ${light ? 'text-white' : 'text-navy-900'}`}>
        Arogya<span className="text-emerald-600"> Bachat</span>
      </span>
    </span>
  )
}

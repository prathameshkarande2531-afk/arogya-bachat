import { useEffect, useState } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'
import Logo from './Logo'

const links = [
  { href: '#search', label: 'Compare' },
  { href: '#calculator', label: 'Savings Calculator' },
  { href: '#kendras', label: 'Find Kendra' },
  { href: '#about', label: 'How It Works' },
  { href: '#disclaimer', label: 'Disclaimer' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'border-b border-navy-100 bg-white/85 shadow-[0_4px_20px_-12px_rgb(11_31_58/0.25)] backdrop-blur-lg'
          : 'border-b border-transparent bg-white/0'
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between gap-6">
        <a href="#home" aria-label="Arogya Bachat home">
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-navy-600 transition hover:bg-navy-50 hover:text-navy-900"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href="#search" className="btn-primary hidden !px-4 !py-2.5 shadow-none sm:inline-flex">
            Compare Medicine <ArrowRight size={16} />
          </a>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-xl text-navy-800 ring-1 ring-navy-100 transition hover:bg-navy-50 lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-[max-height] duration-300 lg:hidden ${open ? 'max-h-[28rem]' : 'max-h-0'}`}
      >
        <ul className="container-page space-y-1 pt-2 pb-5">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium text-navy-800 transition hover:bg-navy-50"
              >
                {link.label}
                <ArrowRight size={16} className="text-navy-400" />
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a href="#search" onClick={() => setOpen(false)} className="btn-primary w-full !py-3.5">
              Compare Medicine
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}

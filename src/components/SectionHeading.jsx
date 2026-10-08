export default function SectionHeading({ eyebrow, title, subtitle, align = 'center', light = false }) {
  const alignment = align === 'left' ? 'text-left' : 'mx-auto text-center'
  return (
    <div className={`mb-10 max-w-2xl ${alignment}`}>
      {eyebrow && <p className={`eyebrow ${light ? 'text-emerald-300' : ''}`}>{eyebrow}</p>}
      <h2
        className={`mt-2 text-3xl font-bold tracking-tight sm:text-[2.5rem] sm:leading-[1.15] ${
          light ? 'text-white' : 'text-navy-900'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${light ? 'text-navy-200' : 'text-navy-500'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

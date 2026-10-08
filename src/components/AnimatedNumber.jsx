import { useEffect, useRef, useState } from 'react'
import { formatINR } from '../data/medicines'

// Smoothly counts from the previous value to the new value.
// Display only — the real value is calculated elsewhere.
export default function AnimatedNumber({ value, duration = 500 }) {
  const [display, setDisplay] = useState(value)
  const fromRef = useRef(value)

  useEffect(() => {
    const from = fromRef.current
    const to = value
    if (from === to) return

    // With reduced motion, finish in a single frame
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const total = reduceMotion ? 1 : duration

    let frame
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / total, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      const current = from + (to - from) * eased
      fromRef.current = current
      setDisplay(current)
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value, duration])

  return <>{formatINR(display)}</>
}

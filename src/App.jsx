import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ValueStrip from './components/ValueStrip'
import MedicineSearch from './components/MedicineSearch'
import SavingsCalculator from './components/SavingsCalculator'
import KendraFinder from './components/KendraFinder'
import About from './components/About'
import Disclaimer from './components/Disclaimer'
import CtaBanner from './components/CtaBanner'
import Footer from './components/Footer'

export default function App() {
  // Shared state so the hero search and the medicine cards can talk to other sections
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState('')
  const [quantity, setQuantity] = useState('30')

  // Called from a medicine card: pick that medicine in the calculator and scroll there
  function handleCalculate(id) {
    setSelectedId(String(id))
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen overflow-x-clip">
      <Navbar />
      <main>
        <Hero onSearch={setQuery} />
        <ValueStrip />
        <MedicineSearch query={query} setQuery={setQuery} onCalculate={handleCalculate} />
        <SavingsCalculator
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          quantity={quantity}
          setQuantity={setQuantity}
        />
        <KendraFinder />
        <About />
        <Disclaimer />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  )
}

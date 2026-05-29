import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Accueil from './pages/Accueil'
import Alphabetisation from './pages/Base'
import PetitsMetiers from './pages/PetitsMetiers'
import MonCycle from './pages/MonCycle'
import MamanAide from './pages/MamanAide'
import BonneHumeur from './pages/BonneHumeur'
import CoachIA from './pages/CoachIA'
import Navbar from './components/Navbar'
import SplashScreen from './components/SplashScreen'

function App() {
  const [splashTermine, setSplashTermine] = useState(false)

  if (!splashTermine) {
    return <SplashScreen onTermine={() => setSplashTermine(true)} />
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/alphabetisation" element={<Alphabetisation />} />
        <Route path="/petits-metiers" element={<PetitsMetiers />} />
        <Route path="/mon-cycle" element={<MonCycle />} />
        <Route path="/maman-aide" element={<MamanAide />} />
        <Route path="/bonne-humeur" element={<BonneHumeur />} />
        <Route path="/coach-ia" element={<CoachIA />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
import { useEffect, useState } from 'react'

export default function SplashScreen({ onTermine }) {
  const [phase, setPhase] = useState('entree')

  useEffect(() => {
    // Apparition
    const t1 = setTimeout(() => setPhase('visible'), 100)
    // Disparition après 2.5 secondes
    const t2 = setTimeout(() => setPhase('sortie'), 2600)
    // Termine et affiche l'app
    const t3 = setTimeout(() => onTermine(), 3200)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999,
      background: 'linear-gradient(160deg, #831843 0%, #9d174d 40%, #6b21a8 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      transition: 'opacity 0.6s ease',
      opacity: phase === 'entree' ? 0 : phase === 'visible' ? 1 : 0,
    }}>

      {/* Logo */}
      <div style={{
        width: 90, height: 90, borderRadius: 24,
        background: 'linear-gradient(135deg, #f472b6, #a78bfa)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 28,
        boxShadow: '0 8px 32px #0004',
        transition: 'transform 0.6s ease',
        transform: phase === 'visible' ? 'scale(1)' : 'scale(0.8)',
      }}>
        <span style={{ color: '#fff', fontSize: 42, fontWeight: '700', letterSpacing: -1 }}>F</span>
      </div>

      {/* Titre */}
      <h1 style={{
        color: '#fff', fontSize: 28, fontWeight: '700',
        margin: '0 0 10px', letterSpacing: 0.5,
        transition: 'opacity 0.8s ease 0.2s',
        opacity: phase === 'visible' ? 1 : 0,
      }}>
        Femme Lumière +
      </h1>

      {/* Sous-titre */}
      <p style={{
        color: '#fbcfe8', fontSize: 15, margin: 0,
        letterSpacing: 0.3, textAlign: 'center', maxWidth: 260, lineHeight: 1.5,
        transition: 'opacity 0.8s ease 0.4s',
        opacity: phase === 'visible' ? 1 : 0,
      }}>
        Ton espace, ta force, ta lumière
      </p>

      {/* Point de chargement style Apple */}
      <div style={{
        position: 'absolute', bottom: 60,
        display: 'flex', gap: 8,
        transition: 'opacity 0.8s ease 0.6s',
        opacity: phase === 'visible' ? 1 : 0,
      }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{
            width: 6, height: 6, borderRadius: '50%',
            backgroundColor: '#fbcfe8',
            animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
          }} />
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  )
}
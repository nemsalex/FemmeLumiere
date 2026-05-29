import { useState } from 'react'
import { Sun, Volume2, Wind, Music, Star } from 'lucide-react'

const CITATIONS = [
  "Tu es plus forte que tu ne le crois.",
  "Chaque jour est une nouvelle chance de briller.",
  "Ta valeur ne dépend pas de l'opinion des autres.",
  "Tu es capable de choses extraordinaires.",
  "La femme qui persévère finit toujours par réussir.",
  "Prends soin de toi, tu le mérites.",
  "Ta force intérieure est ta plus grande richesse.",
  "Avance à ton rythme, chaque pas compte.",
]

const RESPIRATIONS = [
  { titre: 'Respiration calme', description: 'Inspire 4 secondes, retiens 4 secondes, expire 4 secondes.', duree: 4 },
  { titre: 'Respiration apaisante', description: 'Inspire 4 secondes, retiens 7 secondes, expire 8 secondes.', duree: 7 },
]

const MESSAGES = [
  "Tu es une femme forte et courageuse.",
  "Tes efforts d'aujourd'hui construisent ton succès de demain.",
  "Tu n'es pas seule, des milliers de femmes avancent avec toi.",
  "Tu mérites tout le bonheur du monde.",
  "Tu es belle, intelligente et capable.",
]

const lire = (texte) => {
  const synth = window.speechSynthesis
  synth.cancel()
  const u = new SpeechSynthesisUtterance(texte)
  u.lang = 'fr-FR'
  u.rate = 0.8
  u.pitch = 1.1
  synth.speak(u)
}

export default function BonneHumeur() {
  const [onglet, setOnglet] = useState('citation')
  const [citationIndex, setCitationIndex] = useState(Math.floor(Math.random() * CITATIONS.length))
  const [messageIndex, setMessageIndex] = useState(0)
  const [respirationActive, setRespirationActive] = useState(null)
  const [phase, setPhase] = useState('')
  const [lisant, setLisant] = useState(false)

  const nouvelleCitation = () => {
    let i
    do { i = Math.floor(Math.random() * CITATIONS.length) } while (i === citationIndex)
    setCitationIndex(i)
  }

  const lancerRespiration = (resp) => {
    if (respirationActive === resp.titre) { setRespirationActive(null); setPhase(''); return }
    setRespirationActive(resp.titre)
    const phases = [
      { texte: 'Inspire...', duree: resp.duree * 1000 },
      { texte: 'Retiens...', duree: resp.duree * 1000 },
      { texte: 'Expire...', duree: resp.duree * 2000 },
    ]
    let i = 0
    const next = () => {
      if (i >= phases.length) { setPhase('Bien joué.'); return }
      setPhase(phases[i].texte)
      setTimeout(() => { i++; next() }, phases[i].duree)
    }
    next()
  }

  const lireMessage = () => {
    setLisant(true)
    lire(MESSAGES[messageIndex])
    setTimeout(() => setLisant(false), 4000)
  }

  const onglets = [
    { key: 'citation', label: 'Citation du jour' },
    { key: 'motivation', label: 'Motivation' },
    { key: 'respiration', label: 'Respiration' },
    { key: 'musique', label: 'Relaxation' },
  ]

  return (
    <div className="min-h-screen pb-10" style={{ backgroundColor: '#fff7ed' }}>

      <div className="px-4 py-6 text-center" style={{ backgroundColor: '#fed7aa' }}>
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2" style={{ color: '#7c2d12' }}>
          <Sun /> Bonne Humeur
        </h2>
        <p className="text-sm mt-1" style={{ color: '#9a3412' }}>Prends soin de toi chaque jour</p>
      </div>

      <div className="flex gap-2 px-4 py-3 bg-white shadow-sm overflow-x-auto">
        {onglets.map((o) => (
          <button
            key={o.key}
            onClick={() => setOnglet(o.key)}
            className="btn btn-sm rounded-full whitespace-nowrap"
            style={onglet === o.key
              ? { backgroundColor: '#fb923c', color: '#fff', border: 'none' }
              : { backgroundColor: 'transparent', color: '#374151', border: '1px solid #e5e7eb' }
            }
          >
            {o.label}
          </button>
        ))}
      </div>

      <div className="px-4 py-6 max-w-md mx-auto">

        {onglet === 'citation' && (
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-8 shadow-sm text-center" style={{ borderWidth: 1, borderStyle: 'solid', borderColor: '#fed7aa' }}>
              <Star size={32} className="mx-auto mb-4" style={{ color: '#fdba74' }} />
              <p className="text-xl font-semibold leading-relaxed italic" style={{ color: '#374151' }}>
                "{CITATIONS[citationIndex]}"
              </p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => lire(CITATIONS[citationIndex])} className="btn flex-1 border-none gap-2" style={{ backgroundColor: '#fed7aa', color: '#7c2d12' }}>
                <Volume2 size={18} /> Écouter
              </button>
              <button onClick={nouvelleCitation} className="btn flex-1 border-none text-white gap-2" style={{ backgroundColor: '#fb923c' }}>
                <Sun size={18} /> Nouvelle citation
              </button>
            </div>
          </div>
        )}

        {onglet === 'motivation' && (
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-8 shadow-sm text-center" style={{ borderWidth: 1, borderStyle: 'solid', borderColor: '#fed7aa' }}>
              <p className="text-lg font-semibold leading-relaxed" style={{ color: '#374151' }}>
                {MESSAGES[messageIndex]}
              </p>
            </div>
            <button onClick={lireMessage} disabled={lisant} className="btn w-full border-none text-white gap-2" style={{ backgroundColor: '#fb923c' }}>
              <Volume2 size={18} /> {lisant ? 'Lecture en cours...' : 'Écouter ce message'}
            </button>
            <div className="flex gap-3">
              <button onClick={() => setMessageIndex((i) => (i === 0 ? MESSAGES.length - 1 : i - 1))} className="btn flex-1 btn-ghost" style={{ borderWidth: 1, borderStyle: 'solid', borderColor: '#fed7aa' }}>
                Précédent
              </button>
              <button onClick={() => setMessageIndex((i) => (i + 1) % MESSAGES.length)} className="btn flex-1 btn-ghost" style={{ borderWidth: 1, borderStyle: 'solid', borderColor: '#fed7aa' }}>
                Suivant
              </button>
            </div>
          </div>
        )}

        {onglet === 'respiration' && (
          <div className="space-y-4">
            <p className="text-center text-sm" style={{ color: '#6b7280' }}>Prends quelques minutes pour respirer et te calmer</p>
            {RESPIRATIONS.map((resp) => (
              <div key={resp.titre} className="bg-white rounded-2xl overflow-hidden shadow-sm" style={{ borderWidth: 1, borderStyle: 'solid', borderColor: '#fed7aa' }}>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Wind size={18} style={{ color: '#fb923c' }} />
                    <p className="font-semibold" style={{ color: '#1f2937' }}>{resp.titre}</p>
                  </div>
                  <p className="text-sm" style={{ color: '#6b7280' }}>{resp.description}</p>
                </div>
                {respirationActive === resp.titre && phase && (
                  <div className="px-4 py-6 text-center" style={{ backgroundColor: '#fff7ed' }}>
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#fed7aa' }}>
                      <Wind size={32} style={{ color: '#fb923c' }} />
                    </div>
                    <p className="text-2xl font-bold" style={{ color: '#fb923c' }}>{phase}</p>
                  </div>
                )}
                <div className="px-4 pb-4">
                  <button
                    onClick={() => lancerRespiration(resp)}
                    className="btn w-full rounded-xl border-none"
                    style={respirationActive === resp.titre
                      ? { backgroundColor: '#e5e7eb', color: '#6b7280' }
                      : { backgroundColor: '#fb923c', color: '#fff' }
                    }
                  >
                    {respirationActive === resp.titre ? 'Arrêter' : 'Commencer'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {onglet === 'musique' && (
          <div className="space-y-4">
            <p className="text-center text-sm" style={{ color: '#6b7280' }}>Ferme les yeux et écoute ce texte de relaxation</p>
            {[
              { titre: 'Détente du soir', texte: "Ferme les yeux. Respire doucement. Tu es en sécurité. Laisse ton corps se détendre complètement. Chaque tension disparaît. Tu mérites ce repos." },
              { titre: 'Confiance en soi', texte: "Tu es forte. Tu es capable. Tu as déjà surmonté des épreuves difficiles. Aujourd'hui encore, tu vas avancer. Crois en toi. Tu es lumière." },
              { titre: 'Paix intérieure', texte: "Pose ta main sur ton coeur. Sens-le battre pour toi. Tu es vivante, tu es présente. Ce moment t'appartient. Tout va bien." },
            ].map((item) => (
              <div key={item.titre} className="bg-white rounded-2xl p-5 shadow-sm" style={{ borderWidth: 1, borderStyle: 'solid', borderColor: '#fed7aa' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Music size={18} style={{ color: '#fb923c' }} />
                  <p className="font-semibold" style={{ color: '#1f2937' }}>{item.titre}</p>
                </div>
                <p className="text-sm leading-relaxed italic mb-4" style={{ color: '#6b7280' }}>{item.texte}</p>
                <button onClick={() => lire(item.texte)} className="btn btn-sm w-full border-none gap-2" style={{ backgroundColor: '#fff7ed', color: '#7c2d12' }}>
                  <Volume2 size={16} /> Écouter
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
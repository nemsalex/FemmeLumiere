import { useState } from 'react'
import { BookOpen, Volume2, Globe } from 'lucide-react'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const SYLLABES = ['BA', 'BE', 'BI', 'BO', 'BU', 'MA', 'ME', 'MI', 'MO', 'MU',
  'PA', 'PE', 'PI', 'PO', 'PU', 'FA', 'FE', 'FI', 'FO', 'FU']
const MOTS = ['MAMA', 'PAPA', 'BEBE', 'LAIT', 'PAIN', 'EAU', 'FEU', 'SOL', 'MAIN', 'PIED']
const HISTOIRES = [
  {
    texte: "Ami va au marché. Elle achète du lait et du pain. Elle rentre chez elle contente.",
    question: "Qu'est-ce qu'Ami achète ?",
    choix: ["Du lait et du pain", "De la viande", "Des habits"],
    reponse: 0,
  },
  {
    texte: "Sali a un bébé. Le bébé pleure. Sali lui donne du lait. Le bébé sourit.",
    question: "Pourquoi le bébé sourit-il ?",
    choix: ["Il a faim", "Il a reçu du lait", "Il dort"],
    reponse: 1,
  },
]
const MOTS_ANGLAIS = [
  { mot: 'Water', traduction: 'Eau' },
  { mot: 'Food', traduction: 'Nourriture' },
  { mot: 'Baby', traduction: 'Bébé' },
  { mot: 'Home', traduction: 'Maison' },
  { mot: 'Love', traduction: 'Amour' },
  { mot: 'Work', traduction: 'Travail' },
  { mot: 'Health', traduction: 'Santé' },
  { mot: 'School', traduction: 'École' },
]

const lire = (texte, lang = 'fr-FR') => {
  const synth = window.speechSynthesis
  synth.cancel()
  const u = new SpeechSynthesisUtterance(texte)
  u.lang = lang
  u.rate = 0.8
  synth.speak(u)
}

export default function Alphabetisation() {
  const [onglet, setOnglet] = useState('alphabet')
  const [histoireIndex, setHistoireIndex] = useState(0)
  const [reponseChoisie, setReponseChoisie] = useState(null)
  const [texteEcrit, setTexteEcrit] = useState('')
  const histoire = HISTOIRES[histoireIndex]

  const onglets = [
    { key: 'alphabet', label: 'Alphabet' },
    { key: 'syllabes', label: 'Syllabes' },
    { key: 'mots', label: 'Mots' },
    { key: 'histoires', label: 'Histoires' },
    { key: 'ecriture', label: 'Écriture' },
    { key: 'anglais', label: 'Anglais' },
  ]

  return (
    <div className="min-h-screen pb-10" style={{ backgroundColor: '#fefce8' }}>

      <div className="px-4 py-6 text-center" style={{ backgroundColor: '#fef08a' }}>
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2" style={{ color: '#713f12' }}>
          <BookOpen /> Alphabétisation
        </h2>
        <p className="text-sm mt-1" style={{ color: '#854d0e' }}>Apprends à lire et écrire à ton rythme</p>
      </div>

      <div className="flex overflow-x-auto gap-2 px-4 py-3 bg-white shadow-sm">
        {onglets.map((o) => (
          <button
            key={o.key}
            onClick={() => setOnglet(o.key)}
            className="btn btn-sm rounded-full whitespace-nowrap"
            style={onglet === o.key
              ? { backgroundColor: '#facc15', color: '#713f12', border: 'none' }
              : { backgroundColor: 'transparent', color: '#374151', border: '1px solid #e5e7eb' }
            }
          >
            {o.label}
          </button>
        ))}
      </div>

      <div className="px-4 py-6 max-w-md mx-auto">

        {onglet === 'alphabet' && (
          <div>
            <p className="text-center mb-4" style={{ color: '#6b7280' }}>Appuie sur une lettre pour l'entendre</p>
            <div className="grid grid-cols-5 gap-2">
              {ALPHABET.map((lettre) => (
                <button
                  key={lettre}
                  onClick={() => lire(lettre)}
                  className="btn text-xl font-bold rounded-xl"
                  style={{ backgroundColor: '#fef9c3', borderColor: '#fde047', color: '#713f12', borderWidth: 1, borderStyle: 'solid' }}
                >
                  {lettre}
                </button>
              ))}
            </div>
          </div>
        )}

        {onglet === 'syllabes' && (
          <div>
            <p className="text-center mb-4" style={{ color: '#6b7280' }}>Appuie pour écouter chaque syllabe</p>
            <div className="grid grid-cols-4 gap-3">
              {SYLLABES.map((syl) => (
                <button
                  key={syl}
                  onClick={() => lire(syl)}
                  className="btn font-bold text-lg rounded-xl"
                  style={{ backgroundColor: '#fef9c3', borderColor: '#fde047', color: '#713f12', borderWidth: 1, borderStyle: 'solid' }}
                >
                  {syl}
                </button>
              ))}
            </div>
          </div>
        )}

        {onglet === 'mots' && (
          <div>
            <p className="text-center mb-4" style={{ color: '#6b7280' }}>Lis et écoute chaque mot</p>
            <div className="grid grid-cols-2 gap-3">
              {MOTS.map((mot) => (
                <button
                  key={mot}
                  onClick={() => lire(mot)}
                  className="flex items-center justify-between bg-white rounded-2xl px-4 py-3"
                  style={{ borderWidth: 2, borderStyle: 'solid', borderColor: '#fde047' }}
                >
                  <span className="font-bold text-lg" style={{ color: '#713f12' }}>{mot}</span>
                  <Volume2 size={18} style={{ color: '#eab308' }} />
                </button>
              ))}
            </div>
          </div>
        )}

        {onglet === 'histoires' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm" style={{ borderWidth: 1, borderStyle: 'solid', borderColor: '#fde047' }}>
              <p className="leading-relaxed text-lg" style={{ color: '#374151' }}>{histoire.texte}</p>
              <button
                onClick={() => lire(histoire.texte)}
                className="btn btn-sm mt-3 border-none gap-2"
                style={{ backgroundColor: '#fef08a', color: '#713f12' }}
              >
                <Volume2 size={16} /> Écouter
              </button>
            </div>

            <div className="rounded-2xl p-4" style={{ backgroundColor: '#fefce8', borderWidth: 1, borderStyle: 'solid', borderColor: '#fde047' }}>
              <p className="font-semibold mb-3" style={{ color: '#713f12' }}>{histoire.question}</p>
              <div className="space-y-2">
                {histoire.choix.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setReponseChoisie(i)}
                    className="w-full text-left px-4 py-3 rounded-xl transition-colors"
                    style={
                      reponseChoisie === null
                        ? { backgroundColor: '#fff', borderWidth: 2, borderStyle: 'solid', borderColor: '#fde047', color: '#374151' }
                        : i === histoire.reponse
                        ? { backgroundColor: '#dcfce7', borderWidth: 2, borderStyle: 'solid', borderColor: '#86efac', color: '#14532d' }
                        : reponseChoisie === i
                        ? { backgroundColor: '#fee2e2', borderWidth: 2, borderStyle: 'solid', borderColor: '#fca5a5', color: '#991b1b' }
                        : { backgroundColor: '#fff', borderWidth: 2, borderStyle: 'solid', borderColor: '#e5e7eb', color: '#374151' }
                    }
                  >
                    {c}
                  </button>
                ))}
              </div>
              {reponseChoisie !== null && (
                <p className="mt-3 font-semibold text-center" style={{ color: reponseChoisie === histoire.reponse ? '#16a34a' : '#dc2626' }}>
                  {reponseChoisie === histoire.reponse ? 'Bravo ! Bonne réponse !' : 'Essaie encore !'}
                </p>
              )}
            </div>

            <div className="flex justify-between">
              <button onClick={() => { setHistoireIndex(0); setReponseChoisie(null) }} className="btn btn-sm btn-ghost" disabled={histoireIndex === 0}>Précédente</button>
              <button onClick={() => { setHistoireIndex(1); setReponseChoisie(null) }} className="btn btn-sm btn-ghost" disabled={histoireIndex === HISTOIRES.length - 1}>Suivante</button>
            </div>
          </div>
        )}

        {onglet === 'ecriture' && (
          <div className="space-y-4">
            <p className="text-center" style={{ color: '#6b7280' }}>Écris un mot ou une phrase</p>
            <textarea
              className="w-full h-40 rounded-2xl p-4 text-xl focus:outline-none bg-white"
              style={{ borderWidth: 2, borderStyle: 'solid', borderColor: '#fde047', color: '#374151' }}
              placeholder="Écris ici..."
              value={texteEcrit}
              onChange={(e) => setTexteEcrit(e.target.value)}
            />
            <div className="flex gap-3">
              <button
                onClick={() => lire(texteEcrit)}
                disabled={!texteEcrit}
                className="btn flex-1 border-none gap-2"
                style={{ backgroundColor: '#facc15', color: '#713f12' }}
              >
                <Volume2 size={18} /> Écouter ma phrase
              </button>
              <button
                onClick={() => setTexteEcrit('')}
                className="btn btn-ghost"
                style={{ borderWidth: 1, borderStyle: 'solid', borderColor: '#fde047' }}
              >
                Effacer
              </button>
            </div>
            <div className="rounded-2xl p-4" style={{ backgroundColor: '#fef9c3' }}>
              <p className="font-semibold mb-2" style={{ color: '#713f12' }}>Essaie d'écrire :</p>
              <div className="flex flex-wrap gap-2">
                {['MAMA', 'EAU', 'BEBE', 'PAIN'].map((mot) => (
                  <span key={mot} className="badge border-none text-sm" style={{ backgroundColor: '#fde047', color: '#713f12' }}>{mot}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {onglet === 'anglais' && (
          <div>
            <p className="text-center mb-4 flex items-center justify-center gap-2" style={{ color: '#6b7280' }}>
              <Globe size={18} /> Mots utiles en anglais
            </p>
            <div className="space-y-3">
              {MOTS_ANGLAIS.map((item) => (
                <div key={item.mot} className="flex items-center justify-between bg-white rounded-2xl px-4 py-3 shadow-sm" style={{ borderWidth: 2, borderStyle: 'solid', borderColor: '#fef08a' }}>
                  <div>
                    <p className="font-bold text-lg" style={{ color: '#713f12' }}>{item.mot}</p>
                    <p className="text-sm" style={{ color: '#6b7280' }}>{item.traduction}</p>
                  </div>
                  <button
                    onClick={() => lire(item.mot, 'en-US')}
                    className="btn btn-circle btn-sm border-none"
                    style={{ backgroundColor: '#fef9c3', color: '#713f12' }}
                  >
                    <Volume2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
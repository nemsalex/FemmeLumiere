import { useState } from 'react'
import { BookOpen, Volume2, Globe } from 'lucide-react'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const SYLLABES = ['BA','BE','BI','BO','BU','MA','ME','MI','MO','MU','PA','PE','PI','PO','PU','FA','FE','FI','FO','FU']
const MOTS = ['MAMA','PAPA','BEBE','LAIT','PAIN','EAU','FEU','SOL','MAIN','PIED']
const HISTOIRES = [
  {
    texte: "Ami va au marché. Elle achète du lait et du pain. Elle rentre chez elle contente.",
    question: "Qu'est-ce qu'Ami achète ?",
    choix: ["Du lait et du pain","De la viande","Des habits"],
    reponse: 0,
  },
  {
    texte: "Sali a un bébé. Le bébé pleure. Sali lui donne du lait. Le bébé sourit.",
    question: "Pourquoi le bébé sourit-il ?",
    choix: ["Il a faim","Il a reçu du lait","Il dort"],
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
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(texte)
  u.lang = lang
  u.rate = 0.8
  window.speechSynthesis.speak(u)
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
    <div style={{ minHeight: '100vh', backgroundColor: '#fefce8', paddingBottom: 40 }}>

      {/* Header */}
      <div style={{ backgroundColor: '#fef08a', padding: '24px 16px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 24, fontWeight: 'bold', color: '#713f12', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, margin: 0 }}>
          <BookOpen size={24} /> Alphabétisation
        </h2>
        <p style={{ color: '#854d0e', fontSize: 14, marginTop: 4 }}>Apprends à lire et écrire à ton rythme</p>
      </div>

      {/* Onglets */}
      <div style={{ display: 'flex', gap: 8, padding: '12px 16px', backgroundColor: '#fff', boxShadow: '0 1px 4px #0001', overflowX: 'auto' }}>
        {onglets.map((o) => (
          <button
            key={o.key}
            onClick={() => setOnglet(o.key)}
            style={{
              padding: '6px 16px',
              borderRadius: 999,
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              fontWeight: 600,
              fontSize: 13,
              backgroundColor: onglet === o.key ? '#facc15' : '#f3f4f6',
              color: onglet === o.key ? '#713f12' : '#374151',
              transition: 'all 0.2s',
            }}
          >
            {o.label}
          </button>
        ))}
      </div>

      {/* Contenu */}
      <div style={{ padding: '24px 16px', maxWidth: 480, margin: '0 auto' }}>

        {/* ALPHABET */}
        {onglet === 'alphabet' && (
          <div>
            <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: 16 }}>Appuie sur une lettre pour l'entendre</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
              {ALPHABET.map((lettre) => (
                <button
                  key={lettre}
                  onClick={() => lire(lettre)}
                  style={{ backgroundColor: '#fef9c3', border: '1px solid #fde047', color: '#713f12', borderRadius: 12, padding: '12px 0', fontSize: 18, fontWeight: 'bold', cursor: 'pointer' }}
                >
                  {lettre}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* SYLLABES */}
        {onglet === 'syllabes' && (
          <div>
            <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: 16 }}>Appuie pour écouter chaque syllabe</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
              {SYLLABES.map((syl) => (
                <button
                  key={syl}
                  onClick={() => lire(syl)}
                  style={{ backgroundColor: '#fef9c3', border: '1px solid #fde047', color: '#713f12', borderRadius: 12, padding: '12px 0', fontSize: 16, fontWeight: 'bold', cursor: 'pointer' }}
                >
                  {syl}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* MOTS */}
        {onglet === 'mots' && (
          <div>
            <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: 16 }}>Lis et écoute chaque mot</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {MOTS.map((mot) => (
                <button
                  key={mot}
                  onClick={() => lire(mot)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', border: '2px solid #fde047', borderRadius: 16, padding: '12px 16px', cursor: 'pointer' }}
                >
                  <span style={{ fontWeight: 'bold', fontSize: 18, color: '#713f12' }}>{mot}</span>
                  <Volume2 size={18} style={{ color: '#eab308' }} />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* HISTOIRES */}
        {onglet === 'histoires' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ backgroundColor: '#fff', borderRadius: 16, padding: 20, border: '1px solid #fde047' }}>
              <p style={{ color: '#374151', lineHeight: 1.6, fontSize: 17 }}>{histoire.texte}</p>
              <button
                onClick={() => lire(histoire.texte)}
                style={{ marginTop: 12, backgroundColor: '#fef08a', border: 'none', borderRadius: 8, padding: '6px 14px', color: '#713f12', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600 }}
              >
                <Volume2 size={16} /> Écouter
              </button>
            </div>

            <div style={{ backgroundColor: '#fefce8', borderRadius: 16, padding: 16, border: '1px solid #fde047' }}>
              <p style={{ fontWeight: 600, color: '#713f12', marginBottom: 12 }}>{histoire.question}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {histoire.choix.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setReponseChoisie(i)}
                    style={{
                      textAlign: 'left', padding: '12px 16px', borderRadius: 12, cursor: 'pointer', border: '2px solid',
                      backgroundColor: reponseChoisie === null ? '#fff' : i === histoire.reponse ? '#dcfce7' : reponseChoisie === i ? '#fee2e2' : '#fff',
                      borderColor: reponseChoisie === null ? '#fde047' : i === histoire.reponse ? '#86efac' : reponseChoisie === i ? '#fca5a5' : '#e5e7eb',
                      color: reponseChoisie === null ? '#374151' : i === histoire.reponse ? '#14532d' : reponseChoisie === i ? '#991b1b' : '#374151',
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
              {reponseChoisie !== null && (
                <p style={{ marginTop: 12, fontWeight: 600, textAlign: 'center', color: reponseChoisie === histoire.reponse ? '#16a34a' : '#dc2626' }}>
                  {reponseChoisie === histoire.reponse ? 'Bravo ! Bonne réponse !' : 'Essaie encore !'}
                </p>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => { setHistoireIndex(0); setReponseChoisie(null) }} disabled={histoireIndex === 0} style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #e5e7eb', backgroundColor: '#fff', cursor: 'pointer', color: '#374151' }}>Précédente</button>
              <button onClick={() => { setHistoireIndex(1); setReponseChoisie(null) }} disabled={histoireIndex === 1} style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #e5e7eb', backgroundColor: '#fff', cursor: 'pointer', color: '#374151' }}>Suivante</button>
            </div>
          </div>
        )}

        {/* ECRITURE */}
        {onglet === 'ecriture' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p style={{ textAlign: 'center', color: '#6b7280' }}>Écris un mot ou une phrase</p>
            <textarea
              rows={5}
              placeholder="Écris ici..."
              value={texteEcrit}
              onChange={(e) => setTexteEcrit(e.target.value)}
              style={{ width: '100%', borderRadius: 16, border: '2px solid #fde047', padding: 16, fontSize: 18, color: '#374151', backgroundColor: '#fff', outline: 'none', resize: 'none', boxSizing: 'border-box' }}
            />
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={() => lire(texteEcrit)}
                disabled={!texteEcrit}
                style={{ flex: 1, backgroundColor: '#facc15', border: 'none', borderRadius: 12, padding: '12px 0', color: '#713f12', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
              >
                <Volume2 size={18} /> Écouter
              </button>
              <button
                onClick={() => setTexteEcrit('')}
                style={{ padding: '12px 20px', border: '1px solid #fde047', borderRadius: 12, backgroundColor: '#fff', color: '#713f12', cursor: 'pointer', fontWeight: 600 }}
              >
                Effacer
              </button>
            </div>
            <div style={{ backgroundColor: '#fef9c3', borderRadius: 16, padding: 16 }}>
              <p style={{ fontWeight: 600, color: '#713f12', marginBottom: 8 }}>Essaie d'écrire :</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['MAMA','EAU','BEBE','PAIN'].map((mot) => (
                  <span key={mot} style={{ backgroundColor: '#fde047', color: '#713f12', borderRadius: 999, padding: '4px 12px', fontSize: 13, fontWeight: 600 }}>{mot}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ANGLAIS */}
        {onglet === 'anglais' && (
          <div>
            <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <Globe size={18} /> Mots utiles en anglais
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {MOTS_ANGLAIS.map((item) => (
                <div key={item.mot} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', borderRadius: 16, padding: '12px 16px', border: '2px solid #fef08a' }}>
                  <div>
                    <p style={{ fontWeight: 'bold', fontSize: 18, color: '#713f12', margin: 0 }}>{item.mot}</p>
                    <p style={{ color: '#6b7280', fontSize: 13, margin: 0 }}>{item.traduction}</p>
                  </div>
                  <button
                    onClick={() => lire(item.mot, 'en-US')}
                    style={{ backgroundColor: '#fef9c3', border: 'none', borderRadius: 999, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#713f12' }}
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
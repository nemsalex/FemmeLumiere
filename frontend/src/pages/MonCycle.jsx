import { useState, useEffect } from 'react'
import { Heart, Calendar, Thermometer, Clock, BookHeart, Info, CheckCircle } from 'lucide-react'
import axios from 'axios'

const API_URL = 'https://femmelumiere.onrender.com/api'

const HUMEURS = [
  { valeur: 'joyeuse', label: 'Joyeuse', icon: <Heart size={20} /> },
  { valeur: 'triste', label: 'Triste', icon: <BookHeart size={20} /> },
  { valeur: 'fatiguee', label: 'Fatiguée', icon: <Clock size={20} /> },
  { valeur: 'stressee', label: 'Stressée', icon: <Thermometer size={20} /> },
  { valeur: 'calme', label: 'Calme', icon: <Calendar size={20} /> },
]

const PHASES = [
  {
    nom: 'Règles',
    jours: 'Jours 1 à 5',
    couleur: '#fecdd3',
    texte: '#9d174d',
    description: "C'est le début de ton cycle. Tu peux avoir des douleurs au ventre. Repose-toi, bois de l'eau chaude et mange des fruits.",
    conseils: ['Repose-toi au maximum', "Bois de l'eau chaude ou tisane", 'Évite les aliments sucrés et salés', 'Change ta serviette toutes les 4-6h'],
  },
  {
    nom: 'Après les règles',
    jours: 'Jours 6 à 10',
    couleur: '#fef9c3',
    texte: '#713f12',
    description: "Ton corps reprend des forces. Tu te sens mieux, plus énergique. C'est un bon moment pour travailler et faire tes activités.",
    conseils: ['Profite de ton énergie', 'Bonne période pour le sport', 'Mange équilibré', 'Hydrate-toi bien'],
  },
  {
    nom: 'Période fertile',
    jours: 'Jours 11 à 17',
    couleur: '#dcfce7',
    texte: '#14532d',
    description: "C'est la période où tu peux tomber enceinte si tu as des rapports. Si tu ne veux pas de grossesse, utilise une protection.",
    conseils: ['Période de grossesse possible', 'Utilise une protection si nécessaire', 'Tu te sens souvent bien et belle', 'Énergie au maximum'],
  },
  {
    nom: 'Avant les règles',
    jours: 'Jours 18 à 28',
    couleur: '#ede9fe',
    texte: '#4a1d96',
    description: "Tu peux te sentir fatiguée, irritable ou avoir mal aux seins. C'est normal, ton corps se prépare pour les prochaines règles.",
    conseils: ["Sois douce avec toi-même", 'Évite la caféine', 'Fais des exercices légers', 'Parle de tes émotions'],
  },
]

function formaterDate(dateStr) {
  if (!dateStr) return ''
  const [annee, mois, jour] = dateStr.split('-')
  return `${jour}/${mois}/${annee}`
}

function joursRestants(dateStr) {
  const aujourd = new Date()
  const cible = new Date(dateStr)
  const diff = Math.ceil((cible - aujourd) / (1000 * 60 * 60 * 24))
  if (diff < 0) return 'passé'
  if (diff === 0) return "aujourd'hui"
  if (diff === 1) return 'demain'
  return `dans ${diff} jours`
}

export default function MonCycle() {
  const [onglet, setOnglet] = useState('cycle')
  const [dateAffichee, setDateAffichee] = useState('')
  const [dateRegles, setDateRegles] = useState('')
  const [resultat, setResultat] = useState(null)
  const [erreur, setErreur] = useState('')
  const [chargement, setChargement] = useState(false)
  const [humeurChoisie, setHumeurChoisie] = useState(null)
  const [note, setNote] = useState('')
  const [messageHumeur, setMessageHumeur] = useState('')
  const [historique, setHistorique] = useState([])
  const [phaseActive, setPhaseActive] = useState(null)

  const gererDate = (valeur) => {
    const chiffres = valeur.replace(/\D/g, '').slice(0, 8)
    let formate = chiffres
    if (chiffres.length >= 3 && chiffres.length <= 4) formate = chiffres.slice(0, 2) + '/' + chiffres.slice(2)
    else if (chiffres.length >= 5) formate = chiffres.slice(0, 2) + '/' + chiffres.slice(2, 4) + '/' + chiffres.slice(4, 8)
    setDateAffichee(formate)
    setResultat(null)
    setErreur('')

    if (chiffres.length === 8) {
      const jour = parseInt(chiffres.slice(0, 2))
      const mois = parseInt(chiffres.slice(2, 4))
      const annee = parseInt(chiffres.slice(4, 8))
      const anneeActuelle = new Date().getFullYear()
      if (jour < 1 || jour > 31) { setErreur('Le jour doit être entre 01 et 31.'); return }
      if (mois < 1 || mois > 12) { setErreur('Le mois doit être entre 01 et 12.'); return }
      if (annee < 2000 || annee > anneeActuelle) { setErreur(`L'année doit être entre 2000 et ${anneeActuelle}.`); return }
      const date = new Date(annee, mois - 1, jour)
      if (date.getDate() !== jour || date.getMonth() !== mois - 1) { setErreur("Cette date n'existe pas."); return }
      if (date > new Date()) { setErreur('La date ne peut pas être dans le futur.'); return }
      setErreur('')
      setDateRegles(`${annee}-${String(mois).padStart(2, '0')}-${String(jour).padStart(2, '0')}`)
    } else {
      setDateRegles('')
    }
  }

  useEffect(() => {
    if (onglet === 'historique') {
      axios.get(`${API_URL}/cycle/historique/`, { timeout: 60000 })
        .then(res => setHistorique(res.data))
        .catch(() => setHistorique([]))
    }
  }, [onglet])

  const soumettreDate = async () => {
    if (!dateRegles) { setErreur('Veuillez entrer une date valide au format JJ/MM/AAAA.'); return }
    setErreur('')
    setResultat(null)
    setChargement(true)
    let tentatives = 0
    while (tentatives < 3) {
      try {
        const res = await axios.post(`${API_URL}/cycle/`, { date_regles: dateRegles }, { timeout: 30000 })
        setResultat(res.data)
        setChargement(false)
        return
      } catch {
        tentatives++
        if (tentatives < 3) await new Promise(r => setTimeout(r, 3000))
      }
    }
    setErreur('Impossible de joindre le serveur. Vérifie ta connexion.')
    setChargement(false)
  }

  const soumettreHumeur = async () => {
    if (!humeurChoisie) return
    try {
      await axios.post(`${API_URL}/humeur/`, { humeur: humeurChoisie, note }, { timeout: 60000 })
      setMessageHumeur('Humeur enregistrée avec succès.')
      setHumeurChoisie(null)
      setNote('')
    } catch {
      setMessageHumeur("Erreur lors de l'enregistrement.")
    }
  }

  const onglets = [
    { key: 'cycle', label: 'Mon Cycle' },
    { key: 'comprendre', label: 'Comprendre' },
    { key: 'humeur', label: 'Mon Humeur' },
    { key: 'historique', label: 'Historique' },
    { key: 'conseils', label: 'Conseils' },
  ]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fdf2f8', paddingBottom: 40 }}>

      <div style={{ backgroundColor: '#fbcfe8', padding: '24px 16px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 24, fontWeight: 'bold', color: '#831843', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, margin: 0 }}>
          <Heart /> Mon Cycle
        </h2>
        <p style={{ color: '#9d174d', fontSize: 14, margin: '4px 0 0' }}>Suis ton cycle et ton bien-être</p>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '12px 16px', backgroundColor: '#fff', boxShadow: '0 1px 4px #0001', overflowX: 'auto' }}>
        {onglets.map((o) => (
          <button key={o.key} onClick={() => setOnglet(o.key)}
            style={{ padding: '6px 16px', borderRadius: 999, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', fontWeight: 600, fontSize: 13, transition: 'all 0.2s', backgroundColor: onglet === o.key ? '#f472b6' : '#f3f4f6', color: onglet === o.key ? '#fff' : '#374151' }}
          >
            {o.label}
          </button>
        ))}
      </div>

      <div style={{ padding: '24px 16px', maxWidth: 480, margin: '0 auto' }}>

        {/* MON CYCLE */}
        {onglet === 'cycle' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Explication simple */}
            <div style={{ backgroundColor: '#fce7f3', borderRadius: 16, padding: 16, border: '1px solid #fbcfe8' }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <Info size={18} style={{ color: '#f472b6', flexShrink: 0, marginTop: 2 }} />
                <div>
                  <p style={{ fontWeight: 700, color: '#831843', margin: '0 0 4px' }}>Comment ça marche ?</p>
                  <p style={{ fontSize: 13, color: '#9d174d', lineHeight: 1.6, margin: 0 }}>
                    Entre la date du premier jour de tes dernières règles (le jour où le sang a commencé). On calcule automatiquement quand tes prochaines règles arrivent et ta période fertile.
                  </p>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: '#fff', borderRadius: 16, padding: 20, border: '1px solid #fbcfe8' }}>
              <p style={{ fontWeight: 600, color: '#374151', margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Calendar size={18} style={{ color: '#f472b6' }} />
                Quand ont commencé tes dernières règles ?
              </p>
              <p style={{ fontSize: 12, color: '#9ca3af', margin: '0 0 12px' }}>
                Exemple : si tes règles ont commencé le 15 mai 2026, entre 15/05/2026
              </p>
              <input
                type="text" placeholder="JJ/MM/AAAA" maxLength={10}
                value={dateAffichee} onChange={(e) => gererDate(e.target.value)}
                style={{ width: '100%', borderRadius: 12, border: '2px solid #fbcfe8', padding: '14px 16px', fontSize: 18, color: '#374151', backgroundColor: '#fff', outline: 'none', boxSizing: 'border-box', textAlign: 'center', letterSpacing: 2 }}
              />
              {erreur && <p style={{ color: '#dc2626', fontSize: 13, margin: '8px 0 0' }}>{erreur}</p>}
              <button onClick={soumettreDate} disabled={chargement}
                style={{ width: '100%', marginTop: 16, backgroundColor: chargement ? '#f9a8d4' : '#f472b6', border: 'none', borderRadius: 12, padding: '14px 0', color: '#fff', fontWeight: 600, fontSize: 15, cursor: chargement ? 'not-allowed' : 'pointer', transition: 'all 0.2s' }}
              >
                {chargement ? 'Calcul en cours...' : 'Calculer mon cycle'}
              </button>
            </div>

            {resultat && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

                {/* Résultat principal */}
                <div style={{ backgroundColor: '#fff', borderRadius: 16, padding: 20, border: '2px solid #f9a8d4' }}>
                  <p style={{ fontWeight: 700, color: '#831843', fontSize: 16, margin: '0 0 16px', textAlign: 'center' }}>
                    Résultats de ton cycle
                  </p>

                  {/* Prochaines règles */}
                  <div style={{ backgroundColor: '#fff1f2', borderRadius: 12, padding: 14, marginBottom: 12 }}>
                    <p style={{ fontSize: 12, color: '#9ca3af', margin: '0 0 4px' }}>Tes prochaines règles arrivent</p>
                    <p style={{ fontWeight: 'bold', color: '#9d174d', fontSize: 20, margin: '0 0 4px' }}>
                      {formaterDate(resultat.prochaine_periode)}
                    </p>
                    <p style={{ fontSize: 13, color: '#f472b6', margin: 0, fontWeight: 600 }}>
                      {joursRestants(resultat.prochaine_periode)}
                    </p>
                  </div>

                  {/* Période fertile */}
                  <div style={{ backgroundColor: '#f0fdf4', borderRadius: 12, padding: 14, marginBottom: 12 }}>
                    <p style={{ fontSize: 12, color: '#9ca3af', margin: '0 0 4px' }}>Ta période fertile (risque de grossesse)</p>
                    <p style={{ fontWeight: 'bold', color: '#14532d', fontSize: 16, margin: '0 0 2px' }}>
                      Du {formaterDate(resultat.debut_fertile)} au {formaterDate(resultat.fin_fertile)}
                    </p>
                    <p style={{ fontSize: 12, color: '#16a34a', margin: 0 }}>
                      {joursRestants(resultat.debut_fertile)} — utilise une protection si tu ne veux pas de grossesse
                    </p>
                  </div>

                  {/* Conseil */}
                  <div style={{ backgroundColor: '#fefce8', borderRadius: 12, padding: 14, display: 'flex', gap: 8 }}>
                    <CheckCircle size={16} style={{ color: '#eab308', flexShrink: 0, marginTop: 2 }} />
                    <p style={{ fontSize: 13, color: '#713f12', margin: 0, lineHeight: 1.6 }}>{resultat.conseil}</p>
                  </div>
                </div>

                {/* Frise visuelle du cycle */}
                <div style={{ backgroundColor: '#fff', borderRadius: 16, padding: 16, border: '1px solid #fbcfe8' }}>
                  <p style={{ fontWeight: 700, color: '#831843', margin: '0 0 12px', fontSize: 14 }}>Les 4 phases de ton cycle</p>
                  <div style={{ display: 'flex', borderRadius: 12, overflow: 'hidden', height: 12, marginBottom: 12 }}>
                    <div style={{ flex: 1, backgroundColor: '#fecdd3' }} />
                    <div style={{ flex: 1, backgroundColor: '#fef9c3' }} />
                    <div style={{ flex: 1.5, backgroundColor: '#dcfce7' }} />
                    <div style={{ flex: 2, backgroundColor: '#ede9fe' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {PHASES.map((phase, i) => (
                      <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: 10, borderRadius: 10, cursor: 'pointer', backgroundColor: phaseActive === i ? phase.couleur : '#f9fafb', transition: 'all 0.2s' }}
                        onClick={() => setPhaseActive(phaseActive === i ? null : i)}
                      >
                        <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: phase.couleur, border: `2px solid ${phase.texte}`, flexShrink: 0 }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <p style={{ fontWeight: 600, color: '#374151', margin: 0, fontSize: 13 }}>{phase.nom}</p>
                            <span style={{ fontSize: 11, color: '#9ca3af' }}>{phase.jours}</span>
                          </div>
                          {phaseActive === i && (
                            <div style={{ marginTop: 8 }}>
                              <p style={{ fontSize: 13, color: phase.texte, lineHeight: 1.6, margin: '0 0 8px' }}>{phase.description}</p>
                              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
                                {phase.conseils.map((c, j) => (
                                  <li key={j} style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                                    <span style={{ color: phase.texte, fontWeight: 'bold', fontSize: 14 }}>•</span>
                                    <span style={{ fontSize: 12, color: '#374151' }}>{c}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* COMPRENDRE SON CYCLE */}
        {onglet === 'comprendre' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ backgroundColor: '#fce7f3', borderRadius: 16, padding: 16, border: '1px solid #fbcfe8' }}>
              <p style={{ fontWeight: 700, color: '#831843', margin: '0 0 8px', fontSize: 16 }}>C'est quoi le cycle menstruel ?</p>
              <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, margin: 0 }}>
                Le cycle menstruel c'est le rythme naturel du corps de la femme. En moyenne, il dure <strong>28 jours</strong>. Il commence le premier jour de tes règles et se termine la veille de tes prochaines règles. Chaque mois, ton corps se prépare à une possible grossesse.
              </p>
            </div>

            {PHASES.map((phase, i) => (
              <div key={i} style={{ backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', border: `2px solid ${phase.couleur}` }}>
                <div style={{ backgroundColor: phase.couleur, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ fontWeight: 700, color: phase.texte, margin: 0, fontSize: 15 }}>{phase.nom}</p>
                  <span style={{ fontSize: 12, color: phase.texte, fontWeight: 600, backgroundColor: '#fff5', borderRadius: 999, padding: '2px 10px' }}>{phase.jours}</span>
                </div>
                <div style={{ padding: 16 }}>
                  <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, margin: '0 0 12px' }}>{phase.description}</p>
                  <p style={{ fontWeight: 600, color: '#374151', margin: '0 0 8px', fontSize: 13 }}>Conseils pour cette phase :</p>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {phase.conseils.map((c, j) => (
                      <li key={j} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                        <span style={{ backgroundColor: phase.couleur, color: phase.texte, borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 'bold', flexShrink: 0, marginTop: 1 }}>✓</span>
                        <span style={{ fontSize: 13, color: '#374151', lineHeight: 1.5 }}>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            <div style={{ backgroundColor: '#fefce8', borderRadius: 16, padding: 16, border: '1px solid #fef08a' }}>
              <p style={{ fontWeight: 700, color: '#713f12', margin: '0 0 8px' }}>A savoir</p>
              <p style={{ fontSize: 13, color: '#713f12', lineHeight: 1.7, margin: 0 }}>
                Chaque femme est différente. Ton cycle peut durer entre 21 et 35 jours — c'est normal. Si tu as des douleurs très fortes ou des règles très abondantes, consulte un médecin ou une sage-femme.
              </p>
            </div>
          </div>
        )}

        {/* HUMEUR */}
        {onglet === 'humeur' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p style={{ textAlign: 'center', color: '#6b7280', margin: 0 }}>Comment tu te sens aujourd'hui ?</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {HUMEURS.map((h) => (
                <button key={h.valeur} onClick={() => setHumeurChoisie(h.valeur)}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: 16, borderRadius: 16, border: `2px solid ${humeurChoisie === h.valeur ? '#f472b6' : '#fce7f3'}`, backgroundColor: humeurChoisie === h.valeur ? '#fbcfe8' : '#fff', color: humeurChoisie === h.valeur ? '#831843' : '#6b7280', cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  {h.icon}
                  <span style={{ fontSize: 12, fontWeight: 600 }}>{h.label}</span>
                </button>
              ))}
            </div>
            <textarea rows={3} placeholder="Une note pour aujourd'hui... (optionnel)" value={note} onChange={(e) => setNote(e.target.value)}
              style={{ width: '100%', borderRadius: 16, border: '2px solid #fbcfe8', padding: 12, fontSize: 14, color: '#374151', backgroundColor: '#fff', outline: 'none', resize: 'none', boxSizing: 'border-box' }}
            />
            <button onClick={soumettreHumeur} disabled={!humeurChoisie}
              style={{ width: '100%', backgroundColor: humeurChoisie ? '#f472b6' : '#e5e7eb', border: 'none', borderRadius: 12, padding: '14px 0', color: humeurChoisie ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 15, cursor: humeurChoisie ? 'pointer' : 'not-allowed', transition: 'all 0.2s' }}
            >
              Enregistrer mon humeur
            </button>
            {messageHumeur && <p style={{ textAlign: 'center', fontSize: 14, color: '#16a34a', margin: 0 }}>{messageHumeur}</p>}
          </div>
        )}

        {/* HISTORIQUE */}
        {onglet === 'historique' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p style={{ textAlign: 'center', fontSize: 13, color: '#6b7280', margin: 0 }}>Tes 5 derniers cycles enregistrés</p>
            {historique.length === 0 ? (
              <div style={{ backgroundColor: '#fff', borderRadius: 16, padding: 32, textAlign: 'center', border: '1px solid #fbcfe8' }}>
                <Calendar size={32} style={{ color: '#fbcfe8', display: 'block', margin: '0 auto 8px' }} />
                <p style={{ color: '#9ca3af', margin: 0 }}>Aucun cycle enregistré pour l'instant.</p>
              </div>
            ) : (
              historique.map((c, i) => (
                <div key={i} style={{ backgroundColor: '#fff', borderRadius: 16, padding: 16, display: 'flex', alignItems: 'center', gap: 12, border: '1px solid #fbcfe8' }}>
                  <Calendar size={20} style={{ color: '#f472b6' }} />
                  <div>
                    <p style={{ fontSize: 12, color: '#9ca3af', margin: 0 }}>Début des règles</p>
                    <p style={{ fontWeight: 600, color: '#1f2937', margin: 0 }}>{formaterDate(c.date_regles)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* CONSEILS */}
        {onglet === 'conseils' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { titre: 'Pendant les règles', texte: "Bois beaucoup d'eau, repose-toi et évite les aliments trop salés ou sucrés. Une bouillotte chaude sur le ventre aide contre les douleurs.", icon: <Heart size={20} style={{ color: '#f472b6' }} /> },
              { titre: 'Période fertile', texte: "La période fertile dure environ 6 jours. C'est la période la plus propice à la grossesse. Si tu ne veux pas tomber enceinte, utilise une méthode de contraception.", icon: <Calendar size={20} style={{ color: '#f472b6' }} /> },
              { titre: 'Douleurs menstruelles', texte: "Une bouillotte sur le ventre, une tisane au gingembre ou un léger massage du ventre dans le sens des aiguilles d'une montre peut aider à soulager les douleurs.", icon: <Thermometer size={20} style={{ color: '#f472b6' }} /> },
              { titre: 'Hygiène intime', texte: "Change ta serviette toutes les 4 à 6 heures. Lave-toi à l'eau propre sans savon parfumé. Ne laisse jamais une serviette plus de 8 heures.", icon: <BookHeart size={20} style={{ color: '#f472b6' }} /> },
              { titre: 'Quand voir un médecin ?', texte: "Consulte si : tes règles sont très abondantes, tes douleurs sont insupportables, tes règles durent plus de 7 jours, ou si tu n'as pas eu de règles depuis 3 mois.", icon: <Info size={20} style={{ color: '#f472b6' }} /> },
            ].map((conseil) => (
              <div key={conseil.titre} style={{ backgroundColor: '#fff', borderRadius: 16, padding: 16, border: '1px solid #fbcfe8' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  {conseil.icon}
                  <p style={{ fontWeight: 600, color: '#1f2937', margin: 0 }}>{conseil.titre}</p>
                </div>
                <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6, margin: 0 }}>{conseil.texte}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
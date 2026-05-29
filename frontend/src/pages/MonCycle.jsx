import { useState, useEffect } from 'react'
import { Heart, Calendar, Thermometer, Clock, BookHeart } from 'lucide-react'
import axios from 'axios'

const API_URL = 'https://femmelumiere.onrender.com/api'

const HUMEURS = [
  { valeur: 'joyeuse', label: 'Joyeuse', icon: <Heart size={20} /> },
  { valeur: 'triste', label: 'Triste', icon: <BookHeart size={20} /> },
  { valeur: 'fatiguee', label: 'Fatiguée', icon: <Clock size={20} /> },
  { valeur: 'stressee', label: 'Stressée', icon: <Thermometer size={20} /> },
  { valeur: 'calme', label: 'Calme', icon: <Calendar size={20} /> },
]

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

  const gererDate = (valeur) => {
    const chiffres = valeur.replace(/\D/g, '').slice(0, 8)
    let formate = chiffres
    if (chiffres.length >= 3 && chiffres.length <= 4) {
      formate = chiffres.slice(0, 2) + '/' + chiffres.slice(2)
    } else if (chiffres.length >= 5) {
      formate = chiffres.slice(0, 2) + '/' + chiffres.slice(2, 4) + '/' + chiffres.slice(4, 8)
    }
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
      if (date.getDate() !== jour || date.getMonth() !== mois - 1) {
        setErreur("Cette date n'existe pas."); return
      }
      if (date > new Date()) {
        setErreur('La date ne peut pas être dans le futur.'); return
      }

      setErreur('')
      const iso = `${annee}-${String(mois).padStart(2, '0')}-${String(jour).padStart(2, '0')}`
      setDateRegles(iso)
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
    if (!dateRegles) {
      setErreur('Veuillez entrer une date valide au format JJ/MM/AAAA.')
      return
    }
    setErreur('')
    setResultat(null)
    setChargement(true)

    let tentatives = 0
    const maxTentatives = 3

    while (tentatives < maxTentatives) {
      try {
        const res = await axios.post(
          `${API_URL}/cycle/`,
          { date_regles: dateRegles },
          { timeout: 30000 }
        )
        setResultat(res.data)
        setErreur('')
        if (Notification.permission === 'granted') {
          new Notification('Femme Lumière', { body: `Prochaine période le ${res.data.prochaine_periode}` })
        } else if (Notification.permission !== 'denied') {
          Notification.requestPermission().then(perm => {
            if (perm === 'granted') new Notification('Femme Lumière', { body: `Prochaine période le ${res.data.prochaine_periode}` })
          })
        }
        setChargement(false)
        return
      } catch {
        tentatives++
        if (tentatives < maxTentatives) {
          await new Promise(resolve => setTimeout(resolve, 3000))
        }
      }
    }
    setErreur('Impossible de joindre le serveur. Vérifie ta connexion internet.')
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
            style={{ padding: '6px 16px', borderRadius: 999, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', fontWeight: 600, fontSize: 13, backgroundColor: onglet === o.key ? '#f472b6' : '#f3f4f6', color: onglet === o.key ? '#fff' : '#374151', transition: 'all 0.2s' }}
          >
            {o.label}
          </button>
        ))}
      </div>

      <div style={{ padding: '24px 16px', maxWidth: 480, margin: '0 auto' }}>

        {onglet === 'cycle' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ backgroundColor: '#fff', borderRadius: 16, padding: 20, border: '1px solid #fbcfe8' }}>
              <p style={{ fontWeight: 600, color: '#374151', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Calendar size={18} style={{ color: '#f472b6' }} />
                Date de début de tes dernières règles
              </p>
              <input
                type="text"
                placeholder="JJ/MM/AAAA"
                maxLength={10}
                value={dateAffichee}
                onChange={(e) => gererDate(e.target.value)}
                style={{ width: '100%', borderRadius: 12, border: '2px solid #fbcfe8', padding: '12px 16px', fontSize: 16, color: '#374151', backgroundColor: '#fff', outline: 'none', boxSizing: 'border-box' }}
              />
              {erreur && <p style={{ color: '#dc2626', fontSize: 13, margin: '8px 0 0' }}>{erreur}</p>}
              <button
                onClick={soumettreDate}
                disabled={chargement}
                style={{ width: '100%', marginTop: 16, backgroundColor: chargement ? '#f9a8d4' : '#f472b6', border: 'none', borderRadius: 12, padding: '14px 0', color: '#fff', fontWeight: 600, fontSize: 15, cursor: chargement ? 'not-allowed' : 'pointer', transition: 'all 0.2s' }}
              >
                {chargement ? 'Calcul en cours...' : 'Calculer mon cycle'}
              </button>
            </div>

            {resultat && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: 'Prochaine période', valeur: resultat.prochaine_periode, bg: '#fdf2f8', border: '#fbcfe8' },
                  { label: 'Début période fertile', valeur: resultat.debut_fertile, bg: '#fff1f2', border: '#fecdd3' },
                  { label: 'Fin période fertile', valeur: resultat.fin_fertile, bg: '#fff1f2', border: '#fecdd3' },
                ].map((item) => (
                  <div key={item.label} style={{ borderRadius: 16, padding: 16, display: 'flex', alignItems: 'center', gap: 16, backgroundColor: item.bg, border: `1px solid ${item.border}` }}>
                    <Calendar size={18} style={{ color: '#f472b6' }} />
                    <div>
                      <p style={{ fontSize: 12, color: '#6b7280', margin: 0 }}>{item.label}</p>
                      <p style={{ fontWeight: 'bold', color: '#1f2937', margin: 0 }}>{item.valeur}</p>
                    </div>
                  </div>
                ))}
                <div style={{ backgroundColor: '#fefce8', border: '1px solid #fef08a', borderRadius: 16, padding: 16 }}>
                  <p style={{ fontSize: 14, color: '#713f12', margin: 0 }}>{resultat.conseil}</p>
                </div>
              </div>
            )}
          </div>
        )}

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
                    <p style={{ fontWeight: 600, color: '#1f2937', margin: 0 }}>{c.date_regles}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {onglet === 'conseils' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { titre: 'Pendant les règles', texte: "Bois beaucoup d'eau, repose-toi et évite les aliments trop salés ou sucrés.", icon: <Heart size={20} style={{ color: '#f472b6' }} /> },
              { titre: 'Période fertile', texte: "La période fertile dure environ 6 jours par cycle. C'est la période la plus propice à la grossesse.", icon: <Calendar size={20} style={{ color: '#f472b6' }} /> },
              { titre: 'Douleurs menstruelles', texte: "Une bouillotte sur le ventre, une tisane au gingembre ou un léger massage peuvent aider.", icon: <Thermometer size={20} style={{ color: '#f472b6' }} /> },
              { titre: 'Hygiène intime', texte: "Change ta serviette toutes les 4 à 6 heures. Lave-toi à l'eau propre sans savon parfumé.", icon: <BookHeart size={20} style={{ color: '#f472b6' }} /> },
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
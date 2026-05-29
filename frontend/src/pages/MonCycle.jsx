import { useState, useEffect } from 'react'
import { Heart, Calendar, Thermometer, Clock, BookHeart } from 'lucide-react'
import api from '../api'

const HUMEURS = [
  { valeur: 'joyeuse', label: 'Joyeuse', icon: <Heart size={20} /> },
  { valeur: 'triste', label: 'Triste', icon: <BookHeart size={20} /> },
  { valeur: 'fatiguee', label: 'Fatiguée', icon: <Clock size={20} /> },
  { valeur: 'stressee', label: 'Stressée', icon: <Thermometer size={20} /> },
  { valeur: 'calme', label: 'Calme', icon: <Calendar size={20} /> },
]

export default function MonCycle() {
  const [onglet, setOnglet] = useState('cycle')
  const [dateRegles, setDateRegles] = useState('')
  const [resultat, setResultat] = useState(null)
  const [erreur, setErreur] = useState('')
  const [chargement, setChargement] = useState(false)
  const [humeurChoisie, setHumeurChoisie] = useState(null)
  const [note, setNote] = useState('')
  const [messageHumeur, setMessageHumeur] = useState('')
  const [historique, setHistorique] = useState([])

  useEffect(() => {
    if (onglet === 'historique') {
      api.get('http://127.0.0.1:8000/api/cycle/historique/')
        .then(res => setHistorique(res.data))
        .catch(() => setHistorique([]))
    }
  }, [onglet])

  const soumettreDate = async () => {
    if (!dateRegles) { setErreur('Veuillez entrer une date.'); return }
    setErreur('')
    setChargement(true)
    try {
      const res = await api.post('http://127.0.0.1:8000/api/cycle/', { date_regles: dateRegles })
      setResultat(res.data)
      if (Notification.permission === 'granted') {
        new Notification('Femme Lumière', { body: `Prochaine période le ${res.data.prochaine_periode}` })
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(perm => {
          if (perm === 'granted') new Notification('Femme Lumière', { body: `Prochaine période le ${res.data.prochaine_periode}` })
        })
      }
    } catch {
      setErreur('Erreur de connexion au serveur.')
    } finally {
      setChargement(false)
    }
  }

  const soumettreHumeur = async () => {
    if (!humeurChoisie) return
    try {
      await api.post('http://127.0.0.1:8000/api/humeur/', { humeur: humeurChoisie, note })
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
    <div className="min-h-screen pb-10" style={{ backgroundColor: '#fdf2f8' }}>

      <div className="px-4 py-6 text-center" style={{ backgroundColor: '#fbcfe8' }}>
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2" style={{ color: '#831843' }}>
          <Heart /> Mon Cycle
        </h2>
        <p className="text-sm mt-1" style={{ color: '#9d174d' }}>Suis ton cycle et ton bien-être</p>
      </div>

      <div className="flex gap-2 px-4 py-3 bg-white shadow-sm overflow-x-auto">
        {onglets.map((o) => (
          <button
            key={o.key}
            onClick={() => setOnglet(o.key)}
            className="btn btn-sm rounded-full whitespace-nowrap"
            style={onglet === o.key
              ? { backgroundColor: '#f472b6', color: '#fff', border: 'none' }
              : { backgroundColor: 'transparent', color: '#374151', border: '1px solid #e5e7eb' }
            }
          >
            {o.label}
          </button>
        ))}
      </div>

      <div className="px-4 py-6 max-w-md mx-auto">

        {onglet === 'cycle' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm" style={{ borderWidth: 1, borderStyle: 'solid', borderColor: '#fbcfe8' }}>
              <p className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#374151' }}>
                <Calendar size={18} style={{ color: '#f472b6' }} />
                Date de début de tes dernières règles
              </p>
              <input
                type="date"
                className="input input-bordered w-full rounded-xl"
                style={{ borderColor: '#fbcfe8' }}
                value={dateRegles}
                onChange={(e) => setDateRegles(e.target.value)}
              />
              {erreur && <p className="text-sm mt-2" style={{ color: '#dc2626' }}>{erreur}</p>}
              <button
                onClick={soumettreDate}
                disabled={chargement}
                className="btn w-full mt-4 border-none text-white rounded-xl"
                style={{ backgroundColor: '#f472b6' }}
              >
                {chargement ? 'Calcul en cours...' : 'Calculer mon cycle'}
              </button>
            </div>

            {resultat && (
              <div className="space-y-3">
                {[
                  { label: 'Prochaine période', valeur: resultat.prochaine_periode, bg: '#fdf2f8', border: '#fbcfe8' },
                  { label: 'Début période fertile', valeur: resultat.debut_fertile, bg: '#fff1f2', border: '#fecdd3' },
                  { label: 'Fin période fertile', valeur: resultat.fin_fertile, bg: '#fff1f2', border: '#fecdd3' },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl p-4 flex items-center gap-4" style={{ backgroundColor: item.bg, borderWidth: 1, borderStyle: 'solid', borderColor: item.border }}>
                    <Calendar size={18} style={{ color: '#f472b6' }} />
                    <div>
                      <p className="text-xs" style={{ color: '#6b7280' }}>{item.label}</p>
                      <p className="font-bold" style={{ color: '#1f2937' }}>{item.valeur}</p>
                    </div>
                  </div>
                ))}
                <div className="rounded-2xl p-4" style={{ backgroundColor: '#fefce8', borderWidth: 1, borderStyle: 'solid', borderColor: '#fef08a' }}>
                  <p className="text-sm" style={{ color: '#713f12' }}>{resultat.conseil}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {onglet === 'humeur' && (
          <div className="space-y-4">
            <p className="text-center" style={{ color: '#6b7280' }}>Comment tu te sens aujourd'hui ?</p>
            <div className="grid grid-cols-3 gap-3">
              {HUMEURS.map((h) => (
                <button
                  key={h.valeur}
                  onClick={() => setHumeurChoisie(h.valeur)}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl transition-all"
                  style={humeurChoisie === h.valeur
                    ? { backgroundColor: '#fbcfe8', borderWidth: 2, borderStyle: 'solid', borderColor: '#f472b6', color: '#831843' }
                    : { backgroundColor: '#fff', borderWidth: 2, borderStyle: 'solid', borderColor: '#fce7f3', color: '#6b7280' }
                  }
                >
                  {h.icon}
                  <span className="text-xs font-semibold">{h.label}</span>
                </button>
              ))}
            </div>
            <textarea
              className="w-full rounded-2xl p-3 text-sm focus:outline-none bg-white"
              style={{ borderWidth: 2, borderStyle: 'solid', borderColor: '#fbcfe8', color: '#374151' }}
              placeholder="Une note pour aujourd'hui... (optionnel)"
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <button
              onClick={soumettreHumeur}
              disabled={!humeurChoisie}
              className="btn w-full border-none text-white rounded-xl"
              style={{ backgroundColor: '#f472b6' }}
            >
              Enregistrer mon humeur
            </button>
            {messageHumeur && <p className="text-center text-sm" style={{ color: '#16a34a' }}>{messageHumeur}</p>}
          </div>
        )}

        {onglet === 'historique' && (
          <div className="space-y-3">
            <p className="text-center text-sm" style={{ color: '#6b7280' }}>Tes 5 derniers cycles enregistrés</p>
            {historique.length === 0 ? (
              <div className="bg-white rounded-2xl p-6 text-center" style={{ borderWidth: 1, borderStyle: 'solid', borderColor: '#fbcfe8' }}>
                <Calendar size={32} className="mx-auto mb-2" style={{ color: '#fbcfe8' }} />
                <p style={{ color: '#9ca3af' }}>Aucun cycle enregistré pour l'instant.</p>
              </div>
            ) : (
              historique.map((c, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 flex items-center gap-3" style={{ borderWidth: 1, borderStyle: 'solid', borderColor: '#fbcfe8' }}>
                  <Calendar size={20} style={{ color: '#f472b6' }} />
                  <div>
                    <p className="text-xs" style={{ color: '#9ca3af' }}>Début des règles</p>
                    <p className="font-semibold" style={{ color: '#1f2937' }}>{c.date_regles}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {onglet === 'conseils' && (
          <div className="space-y-3">
            {[
              { titre: 'Pendant les règles', texte: "Bois beaucoup d'eau, repose-toi et évite les aliments trop salés ou sucrés.", icon: <Heart size={20} style={{ color: '#f472b6' }} /> },
              { titre: 'Période fertile', texte: "La période fertile dure environ 6 jours par cycle. C'est la période la plus propice à la grossesse.", icon: <Calendar size={20} style={{ color: '#f472b6' }} /> },
              { titre: 'Douleurs menstruelles', texte: "Une bouillotte sur le ventre, une tisane au gingembre ou un léger massage peuvent aider.", icon: <Thermometer size={20} style={{ color: '#f472b6' }} /> },
              { titre: 'Hygiène intime', texte: "Change ta serviette toutes les 4 à 6 heures. Lave-toi à l'eau propre sans savon parfumé.", icon: <BookHeart size={20} style={{ color: '#f472b6' }} /> },
            ].map((conseil) => (
              <div key={conseil.titre} className="bg-white rounded-2xl p-4 shadow-sm" style={{ borderWidth: 1, borderStyle: 'solid', borderColor: '#fbcfe8' }}>
                <div className="flex items-center gap-2 mb-2">
                  {conseil.icon}
                  <p className="font-semibold" style={{ color: '#1f2937' }}>{conseil.titre}</p>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>{conseil.texte}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
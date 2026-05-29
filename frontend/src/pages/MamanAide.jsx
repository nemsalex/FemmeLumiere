import { useState } from 'react'
import { Baby, AlertCircle, ChevronDown, ChevronUp, Thermometer, Wind, Droplets, Clock } from 'lucide-react'

const CATEGORIES = [
  {
    label: '0 - 1 an',
    bg: '#f0fdf4', border: '#86efac', text: '#14532d',
    btnActif: { backgroundColor: '#22c55e', color: '#fff', border: 'none' },
    fiches: [
      {
        titre: 'Allaitement',
        contenu: [
          'Allaite toutes les 2 à 3 heures, jour et nuit.',
          "Assure-toi que le bébé prend bien tout le mamelon en bouche.",
          "Allaite au moins 6 mois, idéalement jusqu'à 2 ans.",
          "Bois beaucoup d'eau pour produire assez de lait.",
        ],
      },
      {
        titre: 'Sommeil du nourrisson',
        contenu: [
          'Un nouveau-né dort entre 16 et 18 heures par jour.',
          'Couche toujours le bébé sur le dos pour éviter la mort subite.',
          'Évite les oreillers et couvertures épaisses dans le lit.',
          'Crée une routine : bain, tétée, sommeil.',
        ],
      },
      {
        titre: 'Bain du bébé',
        contenu: [
          "L'eau doit être tiède, teste avec le coude.",
          'Baigne le bébé 2 à 3 fois par semaine maximum.',
          'Soutiens toujours la tête du bébé.',
          'Sèche bien les plis du cou, des bras et des jambes.',
        ],
      },
    ],
  },
  {
    label: '1 - 3 ans',
    bg: '#eff6ff', border: '#93c5fd', text: '#1e3a5f',
    btnActif: { backgroundColor: '#3b82f6', color: '#fff', border: 'none' },
    fiches: [
      {
        titre: 'Alimentation',
        contenu: [
          'Introduis des aliments variés : légumes, fruits, céréales, protéines.',
          'Évite le sel, le sucre et les aliments épicés avant 2 ans.',
          '3 repas par jour + 2 petites collations.',
          "Ne force jamais l'enfant à manger.",
        ],
      },
      {
        titre: 'Apprentissage de la propreté',
        contenu: [
          'La propreté commence généralement entre 18 et 36 mois.',
          "Attends que l'enfant montre des signes de préparation.",
          'Sois patiente et encourage sans punir les accidents.',
          'Félicite chaque progrès, même petit.',
        ],
      },
      {
        titre: 'Développement du langage',
        contenu: [
          "Parle beaucoup à ton enfant, nomme les objets autour de lui.",
          'Lis des histoires simples tous les jours.',
          'Chante des chansons et répète des comptines.',
          'Réponds toujours quand il essaie de parler.',
        ],
      },
    ],
  },
  {
    label: '4 - 7 ans',
    bg: '#fefce8', border: '#fde047', text: '#713f12',
    btnActif: { backgroundColor: '#eab308', color: '#fff', border: 'none' },
    fiches: [
      {
        titre: "Préparation à l'école",
        contenu: [
          "Apprends-lui à tenir un crayon et à dessiner.",
          'Entraîne-le à reconnaître les lettres et les chiffres.',
          'Instaure une heure fixe pour les devoirs.',
          'Encourage la curiosité, réponds à ses questions.',
        ],
      },
      {
        titre: 'Limites et discipline',
        contenu: [
          'Pose des règles claires et explique pourquoi.',
          'Sois constante : les mêmes règles tous les jours.',
          'Félicite les bons comportements plus que tu ne punis.',
          'Évite les punitions physiques, elles font plus de mal que de bien.',
        ],
      },
    ],
  },
]

const SOS = [
  {
    titre: 'Fièvre',
    icon: <Thermometer size={22} style={{ color: '#ef4444' }} />,
    bg: '#fff1f2', border: '#fecdd3',
    etapes: [
      'Prends la température : fièvre si plus de 38°C.',
      "Déshabille l'enfant et mets-le dans un endroit frais.",
      'Donne du paracétamol adapté à son poids.',
      "Fais-lui boire beaucoup d'eau ou de lait.",
      "Si fièvre dépasse 39.5°C ou dure plus de 48h, va au centre de santé.",
    ],
  },
  {
    titre: 'Diarrhée',
    icon: <Droplets size={22} style={{ color: '#3b82f6' }} />,
    bg: '#eff6ff', border: '#93c5fd',
    etapes: [
      "Donne beaucoup d'eau ou de SRO (sel de réhydratation orale).",
      "Continue l'allaitement si le bébé est encore allaité.",
      'Évite les jus de fruits et sodas.',
      "Si plus de 5 selles liquides en 24h ou sang dans les selles, va au centre de santé.",
      "Si l'enfant ne boit plus ou a les yeux enfoncés, c'est urgent.",
    ],
  },
  {
    titre: 'Toux',
    icon: <Wind size={22} style={{ color: '#6b7280' }} />,
    bg: '#f9fafb', border: '#e5e7eb',
    etapes: [
      "Surélève légèrement la tête de l'enfant pour dormir.",
      "Donne du miel (uniquement après 1 an) pour adoucir la gorge.",
      "Humidifie la chambre avec une bassine d'eau.",
      "Si toux avec sifflement ou difficultés à respirer, va au centre de santé.",
    ],
  },
  {
    titre: 'Blessure',
    icon: <AlertCircle size={22} style={{ color: '#f97316' }} />,
    bg: '#fff7ed', border: '#fdba74',
    urgence: true,
    etapes: [
      "Rince la plaie à l'eau propre pendant 5 minutes.",
      'Désinfecte avec du produit antiseptique si disponible.',
      'Couvre avec un pansement propre.',
      "Si la plaie est profonde, saigne beaucoup ou est due à une morsure, va au centre de santé.",
      "N'applique pas de terre ou de produits traditionnels sur la plaie.",
    ],
  },
]

export default function MamanAide() {
  const [onglet, setOnglet] = useState('bebe')
  const [categorieActive, setCategorieActive] = useState(0)
  const [ficheOuverte, setFicheOuverte] = useState(null)
  const [sosOuvert, setSosOuvert] = useState(null)
  const categorie = CATEGORIES[categorieActive]

  return (
    <div className="min-h-screen pb-10" style={{ backgroundColor: '#f0fdf4' }}>

      <div className="px-4 py-6 text-center" style={{ backgroundColor: '#bbf7d0' }}>
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2" style={{ color: '#14532d' }}>
          <Baby /> Maman Aide
        </h2>
        <p className="text-sm mt-1" style={{ color: '#166534' }}>Guide pratique pour les mamans</p>
      </div>

      <div className="flex gap-2 px-4 py-3 bg-white shadow-sm">
        <button
          onClick={() => setOnglet('bebe')}
          className="btn btn-sm rounded-full flex-1"
          style={onglet === 'bebe'
            ? { backgroundColor: '#22c55e', color: '#fff', border: 'none' }
            : { backgroundColor: 'transparent', color: '#374151', border: '1px solid #e5e7eb' }
          }
        >
          Guide bébé
        </button>
        <button
          onClick={() => setOnglet('sos')}
          className="btn btn-sm rounded-full flex-1 gap-1"
          style={onglet === 'sos'
            ? { backgroundColor: '#ef4444', color: '#fff', border: 'none' }
            : { backgroundColor: 'transparent', color: '#ef4444', border: '1px solid #fca5a5' }
          }
        >
          <AlertCircle size={15} /> SOS Rapide
        </button>
      </div>

      <div className="px-4 py-6 max-w-md mx-auto">

        {onglet === 'bebe' && (
          <div className="space-y-4">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {CATEGORIES.map((cat, i) => (
                <button
                  key={cat.label}
                  onClick={() => { setCategorieActive(i); setFicheOuverte(null) }}
                  className="btn btn-sm rounded-full whitespace-nowrap"
                  style={categorieActive === i ? cat.btnActif : { backgroundColor: 'transparent', color: '#374151', border: '1px solid #e5e7eb' }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {categorie.fiches.map((fiche, i) => (
              <div key={fiche.titre} className="rounded-2xl overflow-hidden bg-white shadow-sm" style={{ borderWidth: 2, borderStyle: 'solid', borderColor: categorie.border }}>
                <button
                  className="w-full flex items-center justify-between px-4 py-4 bg-white"
                  onClick={() => setFicheOuverte(ficheOuverte === i ? null : i)}
                >
                  <div className="flex items-center gap-3">
                    <Baby size={18} style={{ color: '#22c55e' }} />
                    <p className="font-bold" style={{ color: '#1f2937' }}>{fiche.titre}</p>
                  </div>
                  {ficheOuverte === i
                    ? <ChevronUp size={20} style={{ color: '#9ca3af' }} />
                    : <ChevronDown size={20} style={{ color: '#9ca3af' }} />
                  }
                </button>
                {ficheOuverte === i && (
                  <div className="px-4 pb-4 bg-white">
                    <ul className="space-y-2">
                      {fiche.contenu.map((point, j) => (
                        <li key={j} className="flex gap-3 items-start">
                          <span className="w-2 h-2 rounded-full shrink-0 mt-2" style={{ backgroundColor: '#22c55e' }} />
                          <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>{point}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {onglet === 'sos' && (
          <div className="space-y-3">
            <p className="text-center text-sm" style={{ color: '#6b7280' }}>Que faire en cas d'urgence ? Suis les étapes.</p>
            {SOS.map((item, i) => (
              <div key={item.titre} className="rounded-2xl overflow-hidden bg-white shadow-sm" style={{ borderWidth: 2, borderStyle: 'solid', borderColor: item.border }}>
                <button
                  className="w-full flex items-center justify-between px-4 py-4 bg-white"
                  onClick={() => setSosOuvert(sosOuvert === i ? null : i)}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <div className="text-left">
                      <p className="font-bold" style={{ color: '#1f2937' }}>{item.titre}</p>
                      {item.urgence && (
                        <span className="badge badge-sm border-none" style={{ backgroundColor: '#fee2e2', color: '#991b1b' }}>Urgent</span>
                      )}
                    </div>
                  </div>
                  {sosOuvert === i
                    ? <ChevronUp size={20} style={{ color: '#9ca3af' }} />
                    : <ChevronDown size={20} style={{ color: '#9ca3af' }} />
                  }
                </button>
                {sosOuvert === i && (
                  <div className="px-4 pb-4 bg-white">
                    <ol className="space-y-2">
                      {item.etapes.map((etape, j) => (
                        <li key={j} className="flex gap-3 items-start">
                          <span className="rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ backgroundColor: item.bg, color: '#374151' }}>
                            {j + 1}
                          </span>
                          <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>{etape}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
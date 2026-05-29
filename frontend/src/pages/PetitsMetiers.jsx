import { useState } from 'react'
import { Scissors, ChefHat, Sparkles, ChevronDown, ChevronUp, Star } from 'lucide-react'

const METIERS = [
  {
    categorie: 'Couture',
    icon: <Scissors size={20} />,
    bg: '#f3e8ff', border: '#d8b4fe', text: '#6b21a8',
    btnActif: { backgroundColor: '#a855f7', color: '#fff', border: 'none' },
    fiches: [
      {
        titre: 'Coudre à la main', difficulte: 'Facile',
        materiel: ['Aiguille', 'Fil', 'Tissu', 'Ciseaux'],
        etapes: [
          'Coupe ton tissu à la taille voulue.',
          "Enfile le fil dans l'aiguille et fais un nœud au bout.",
          "Pique l'aiguille de bas en haut tous les 5mm.",
          "Continue jusqu'au bout et fais un nœud final.",
          'Coupe le fil en excès avec les ciseaux.',
        ],
        conseil: 'Pour un point solide, garde tes points réguliers et serrés.',
      },
      {
        titre: 'Réparer un vêtement', difficulte: 'Facile',
        materiel: ['Aiguille', 'Fil de la couleur du vêtement', 'Ciseaux'],
        etapes: [
          "Identifie l'endroit déchiré ou décousu.",
          'Enfile ton aiguille avec du fil de la même couleur.',
          'Aligne les deux bords du tissu.',
          'Couds en faisant des petits points serrés.',
          'Fais un nœud solide à la fin.',
        ],
        conseil: 'Utilise du fil de la même couleur pour que la réparation soit invisible.',
      },
      {
        titre: 'Faire un ourlet', difficulte: 'Moyen',
        materiel: ['Aiguille', 'Fil', 'Épingles', 'Fer à repasser'],
        etapes: [
          'Mesure la longueur souhaitée et marque avec des épingles.',
          "Replie le tissu deux fois vers l'intérieur.",
          'Repasse le pli avec le fer pour le fixer.',
          'Couds le long du pli avec des points discrets.',
          'Retire les épingles et repasse une dernière fois.',
        ],
        conseil: 'Repasser avant de coudre rend le travail beaucoup plus propre.',
      },
    ],
  },
  {
    categorie: 'Coiffure',
    icon: <Sparkles size={20} />,
    bg: '#fce7f3', border: '#f9a8d4', text: '#9d174d',
    btnActif: { backgroundColor: '#ec4899', color: '#fff', border: 'none' },
    fiches: [
      {
        titre: 'Tresser les cheveux', difficulte: 'Facile',
        materiel: ['Peigne', 'Huile de coco', 'Élastiques'],
        etapes: [
          'Démêle bien les cheveux avec le peigne.',
          "Applique un peu d'huile de coco sur le cuir chevelu.",
          'Divise les cheveux en 3 sections égales.',
          'Passe la section droite au centre, puis la gauche.',
          "Répète jusqu'en bas et fixe avec un élastique.",
        ],
        conseil: 'Des cheveux légèrement humides se tressent plus facilement.',
      },
      {
        titre: 'Faire un chignon simple', difficulte: 'Facile',
        materiel: ['Peigne', 'Élastiques', 'Épingles à cheveux'],
        etapes: [
          'Peigne les cheveux vers l\'arrière.',
          'Fais une queue de cheval haute ou basse.',
          "Enroule les cheveux autour de l'élastique.",
          'Fixe avec les épingles à cheveux.',
          "Lisse les petits cheveux avec un peu d'eau.",
        ],
        conseil: 'Un chignon bien fixé tient toute la journée.',
      },
    ],
  },
  {
    categorie: 'Business',
    icon: <ChefHat size={20} />,
    bg: '#ffedd5', border: '#fdba74', text: '#7c2d12',
    btnActif: { backgroundColor: '#f97316', color: '#fff', border: 'none' },
    fiches: [
      {
        titre: 'Faire et vendre du jus', difficulte: 'Facile',
        materiel: ['Fruits frais', 'Extracteur ou presse', 'Bouteilles propres', 'Étiquettes'],
        etapes: [
          'Achète des fruits frais au marché (orange, bissap, tamarin...).',
          "Lave bien les fruits à l'eau propre.",
          'Presse ou mixe les fruits et filtre le jus.',
          'Verse dans des bouteilles propres et fermées.',
          'Écris le prix et la date sur une étiquette.',
          'Vends le matin tôt quand il fait frais.',
        ],
        conseil: 'Achète en gros au marché pour réduire ton coût et gagner plus.',
      },
      {
        titre: 'Fabriquer du savon', difficulte: 'Moyen',
        materiel: ['Huile de palme', 'Soude caustique', 'Eau', 'Moule', 'Gants de protection'],
        etapes: [
          'Mets tes gants — la soude est dangereuse sans protection.',
          'Mélange 100g de soude dans 250ml d\'eau froide, jamais chaude.',
          "Chauffe 500ml d'huile de palme à feu doux.",
          "Verse lentement la soude dans l'huile en remuant.",
          "Mélange jusqu'à obtenir une pâte épaisse.",
          'Verse dans le moule et laisse sécher 4 semaines.',
        ],
        conseil: "Toujours verser la soude dans l'eau, jamais l'inverse. Travaille en plein air.",
      },
      {
        titre: 'Vendre des beignets', difficulte: 'Facile',
        materiel: ['Farine', 'Sucre', 'Levure', 'Huile de friture', 'Bassine'],
        etapes: [
          'Mélange 500g farine, 2 cuillères de sucre, 1 sachet de levure.',
          "Ajoute de l'eau tiède petit à petit pour former une pâte molle.",
          'Laisse reposer la pâte 30 minutes couverte.',
          "Chauffe l'huile dans une bassine à feu moyen.",
          "Forme des boules et fais frire jusqu'à dorure.",
          'Égoutte sur du papier et vends chaud.',
        ],
        conseil: "Vends le matin à l'école ou au marché pour écouler rapidement.",
      },
    ],
  },
]

export default function PetitsMetiers() {
  const [categorieActive, setCategorieActive] = useState(0)
  const [ficheOuverte, setFicheOuverte] = useState(null)
  const categorie = METIERS[categorieActive]

  return (
    <div className="min-h-screen pb-10" style={{ backgroundColor: '#faf5ff' }}>

      <div className="px-4 py-6 text-center" style={{ backgroundColor: '#e9d5ff' }}>
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2" style={{ color: '#4a1d96' }}>
          <Scissors /> Petits Métiers
        </h2>
        <p className="text-sm mt-1" style={{ color: '#6b21a8' }}>Apprends un métier, gagne ta vie</p>
      </div>

      <div className="flex gap-2 px-4 py-3 bg-white shadow-sm overflow-x-auto">
        {METIERS.map((m, i) => (
          <button
            key={m.categorie}
            onClick={() => { setCategorieActive(i); setFicheOuverte(null) }}
            className="btn btn-sm rounded-full gap-2 whitespace-nowrap"
            style={categorieActive === i ? m.btnActif : { backgroundColor: 'transparent', color: '#374151', border: '1px solid #e5e7eb' }}
          >
            {m.icon} {m.categorie}
          </button>
        ))}
      </div>

      <div className="px-4 py-6 max-w-md mx-auto space-y-4">
        {categorie.fiches.map((fiche, i) => (
          <div key={fiche.titre} className="rounded-2xl shadow-sm overflow-hidden bg-white" style={{ borderWidth: 2, borderStyle: 'solid', borderColor: categorie.border }}>

            <button
              className="w-full flex items-center justify-between px-4 py-4 bg-white"
              onClick={() => setFicheOuverte(ficheOuverte === i ? null : i)}
            >
              <div className="flex items-center gap-3">
                <Star size={20} style={{ color: categorie.text }} />
                <div className="text-left">
                  <p className="font-bold" style={{ color: '#1f2937' }}>{fiche.titre}</p>
                  <span
                    className="badge badge-sm border-none mt-1"
                    style={fiche.difficulte === 'Facile'
                      ? { backgroundColor: '#dcfce7', color: '#14532d' }
                      : { backgroundColor: '#ffedd5', color: '#7c2d12' }
                    }
                  >
                    {fiche.difficulte}
                  </span>
                </div>
              </div>
              {ficheOuverte === i
                ? <ChevronUp size={20} style={{ color: '#9ca3af' }} />
                : <ChevronDown size={20} style={{ color: '#9ca3af' }} />
              }
            </button>

            {ficheOuverte === i && (
              <div className="px-4 pb-4 bg-white space-y-4">
                <div>
                  <p className="font-semibold mb-2" style={{ color: '#374151' }}>Matériel nécessaire</p>
                  <div className="flex flex-wrap gap-2">
                    {fiche.materiel.map((m) => (
                      <span key={m} className="badge border-none" style={{ backgroundColor: '#f3f4f6', color: '#374151' }}>{m}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-semibold mb-2" style={{ color: '#374151' }}>Étapes</p>
                  <ol className="space-y-2">
                    {fiche.etapes.map((etape, j) => (
                      <li key={j} className="flex gap-3 items-start">
                        <span className="rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shrink-0 mt-0.5" style={{ backgroundColor: categorie.bg, color: categorie.text }}>
                          {j + 1}
                        </span>
                        <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>{etape}</p>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="rounded-xl p-3" style={{ backgroundColor: categorie.bg, borderWidth: 1, borderStyle: 'solid', borderColor: categorie.border }}>
                  <p className="text-sm font-semibold mb-1" style={{ color: categorie.text }}>Conseil</p>
                  <p className="text-sm" style={{ color: categorie.text }}>{fiche.conseil}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
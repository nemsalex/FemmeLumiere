import { useState } from 'react'
import { Scissors, ChefHat, Sparkles, ChevronDown, ChevronUp, Star, Play } from 'lucide-react'

const METIERS = [
  {
    categorie: 'Couture',
    icon: <Scissors size={20} />,
    bg: '#f3e8ff', border: '#d8b4fe', text: '#6b21a8',
    btnActif: { backgroundColor: '#a855f7', color: '#fff', border: 'none' },
    fiches: [
      {
        titre: 'Coudre à la main', difficulte: 'Facile',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
        video: 'ns6yRNIkEnI',
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
        image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&q=80',
        video: '162kB_7eigo',
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
        image: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=400&q=80',
        video: '3kfyHH5OfrI',
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
        image: 'https://images.unsplash.com/photo-1590337374697-c6d2c5a43d38?w=400&q=80',
        video: 'frwcIzvHYC8',
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
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80',
        video: 'IoO6lLkdeuY',
        materiel: ['Peigne', 'Élastiques', 'Épingles à cheveux'],
        etapes: [
          "Peigne les cheveux vers l'arrière.",
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
        image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&q=80',
        video: 'bB2xQE58MZ0',
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
        image: 'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=400&q=80',
        video: 'KijtJer0710',
        materiel: ['Huile de palme', 'Soude caustique', 'Eau', 'Moule', 'Gants de protection'],
        etapes: [
          'Mets tes gants — la soude est dangereuse sans protection.',
          "Mélange 100g de soude dans 250ml d'eau froide, jamais chaude.",
          "Chauffe 500ml d'huile de palme à feu doux.",
          "Verse lentement la soude dans l'huile en remuant.",
          "Mélange jusqu'à obtenir une pâte épaisse.",
          'Verse dans le moule et laisse sécher 4 semaines.',
        ],
        conseil: "Toujours verser la soude dans l'eau, jamais l'inverse. Travaille en plein air.",
      },
      {
        titre: 'Vendre des beignets', difficulte: 'Facile',
        image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80',
        video: 'AvSYUlWkSeQ',
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

function VideoYoutube({ videoId }) {
  const [jouer, setJouer] = useState(false)
  if (jouer) {
    return (
      <div style={{ borderRadius: 12, overflow: 'hidden', marginBottom: 12 }}>
        <iframe width="100%" height="200"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="Tutoriel" frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen style={{ display: 'block' }}
        />
      </div>
    )
  }
  return (
    <button onClick={() => setJouer(true)}
      style={{ width: '100%', marginBottom: 12, borderRadius: 12, overflow: 'hidden', border: 'none', padding: 0, cursor: 'pointer', position: 'relative', backgroundColor: '#000', display: 'block' }}
    >
      <img src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} alt="Tutoriel"
        style={{ width: '100%', height: 170, objectFit: 'cover', opacity: 0.85, display: 'block' }}
      />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#ff0000', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px #0005' }}>
        <Play size={22} fill="#fff" style={{ color: '#fff', marginLeft: 3 }} />
      </div>
      <div style={{ position: 'absolute', bottom: 8, left: 12, backgroundColor: '#000a', borderRadius: 6, padding: '3px 10px' }}>
        <span style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>Voir le tutoriel</span>
      </div>
    </button>
  )
}

export default function PetitsMetiers() {
  const [categorieActive, setCategorieActive] = useState(0)
  const [ficheOuverte, setFicheOuverte] = useState(null)
  const categorie = METIERS[categorieActive]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#faf5ff', paddingBottom: 40 }}>
      <div style={{ backgroundColor: '#e9d5ff', padding: '24px 16px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 24, fontWeight: 'bold', color: '#4a1d96', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, margin: 0 }}>
          <Scissors /> Petits Métiers
        </h2>
        <p style={{ color: '#6b21a8', fontSize: 14, margin: '4px 0 0' }}>Apprends un métier, gagne ta vie</p>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '12px 16px', backgroundColor: '#fff', boxShadow: '0 1px 4px #0001', overflowX: 'auto' }}>
        {METIERS.map((m, i) => (
          <button key={m.categorie} onClick={() => { setCategorieActive(i); setFicheOuverte(null) }}
            style={{ padding: '6px 16px', borderRadius: 999, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', fontWeight: 600, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s',
              ...(categorieActive === i ? m.btnActif : { backgroundColor: '#f3f4f6', color: '#374151' })
            }}
          >
            {m.icon} {m.categorie}
          </button>
        ))}
      </div>

      <div style={{ padding: '24px 16px', maxWidth: 480, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {categorie.fiches.map((fiche, i) => (
          <div key={fiche.titre} style={{ borderRadius: 16, overflow: 'hidden', backgroundColor: '#fff', boxShadow: '0 2px 8px #0001', borderWidth: 2, borderStyle: 'solid', borderColor: categorie.border }}>

            {/* Image de la fiche */}
            <img
              src={fiche.image}
              alt={fiche.titre}
              style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }}
              onError={(e) => { e.target.style.display = 'none' }}
            />

            <button style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', backgroundColor: '#fff', border: 'none', cursor: 'pointer' }}
              onClick={() => setFicheOuverte(ficheOuverte === i ? null : i)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Star size={20} style={{ color: categorie.text }} />
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontWeight: 'bold', color: '#1f2937', margin: 0 }}>{fiche.titre}</p>
                  <span style={{ display: 'inline-block', marginTop: 4, borderRadius: 999, padding: '2px 10px', fontSize: 12, fontWeight: 600, backgroundColor: fiche.difficulte === 'Facile' ? '#dcfce7' : '#ffedd5', color: fiche.difficulte === 'Facile' ? '#14532d' : '#7c2d12' }}>
                    {fiche.difficulte}
                  </span>
                </div>
              </div>
              {ficheOuverte === i ? <ChevronUp size={20} style={{ color: '#9ca3af' }} /> : <ChevronDown size={20} style={{ color: '#9ca3af' }} />}
            </button>

            {ficheOuverte === i && (
              <div style={{ padding: '0 16px 16px', backgroundColor: '#fff' }}>
                <VideoYoutube videoId={fiche.video} />

                <div style={{ marginBottom: 16 }}>
                  <p style={{ fontWeight: 600, color: '#374151', marginBottom: 8 }}>Matériel nécessaire</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {fiche.materiel.map((m) => (
                      <span key={m} style={{ backgroundColor: '#f3f4f6', color: '#374151', borderRadius: 999, padding: '4px 12px', fontSize: 13 }}>{m}</span>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <p style={{ fontWeight: 600, color: '#374151', marginBottom: 8 }}>Étapes</p>
                  <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {fiche.etapes.map((etape, j) => (
                      <li key={j} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                        <span style={{ backgroundColor: categorie.bg, color: categorie.text, borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 'bold', flexShrink: 0, marginTop: 2 }}>
                          {j + 1}
                        </span>
                        <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.6, margin: 0 }}>{etape}</p>
                      </li>
                    ))}
                  </ol>
                </div>

                <div style={{ backgroundColor: categorie.bg, borderRadius: 12, padding: 12, borderWidth: 1, borderStyle: 'solid', borderColor: categorie.border }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: categorie.text, margin: '0 0 4px' }}>Conseil</p>
                  <p style={{ fontSize: 13, color: categorie.text, margin: 0 }}>{fiche.conseil}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
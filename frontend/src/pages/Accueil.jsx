import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Scissors, Heart, Baby, Smile, Bot } from 'lucide-react'

const modules = [
  {
    label: 'Alphabétisation',
    icon: <BookOpen size={32} />,
    route: '/alphabetisation',
    bg: 'linear-gradient(135deg, #fef9c3, #fde047)',
    border: '#fde047',
    text: '#713f12',
  },
  {
    label: 'Petits Métiers',
    icon: <Scissors size={32} />,
    route: '/petits-metiers',
    bg: 'linear-gradient(135deg, #f3e8ff, #d8b4fe)',
    border: '#d8b4fe',
    text: '#6b21a8',
  },
  {
    label: 'Mon Cycle',
    icon: <Heart size={32} />,
    route: '/mon-cycle',
    bg: 'linear-gradient(135deg, #fce7f3, #f9a8d4)',
    border: '#f9a8d4',
    text: '#9d174d',
  },
  {
    label: 'Maman Aide',
    icon: <Baby size={32} />,
    route: '/maman-aide',
    bg: 'linear-gradient(135deg, #dcfce7, #86efac)',
    border: '#86efac',
    text: '#14532d',
  },
  {
    label: 'Bonne Humeur',
    icon: <Smile size={32} />,
    route: '/bonne-humeur',
    bg: 'linear-gradient(135deg, #ffedd5, #fdba74)',
    border: '#fdba74',
    text: '#7c2d12',
  },
  {
    label: 'Coach IA',
    icon: <Bot size={32} />,
    route: '/coach-ia',
    bg: 'linear-gradient(135deg, #dbeafe, #93c5fd)',
    border: '#93c5fd',
    text: '#1e3a5f',
  },
]

export default function Accueil() {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(null)

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fdf2f8 0%, #fce7f3 50%, #ede9fe 100%)', paddingBottom: 40 }}>

      <div style={{ textAlign: 'center', padding: '40px 16px 32px' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, #f472b6, #a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 4px 15px #f472b640' }}>
          <span style={{ color: '#fff', fontSize: 28, fontWeight: 'bold' }}>F</span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 'bold', color: '#831843', margin: '0 0 8px' }}>Femme Lumière +</h1>
        <p style={{ color: '#9d174d', fontSize: 15, maxWidth: 280, margin: '0 auto', lineHeight: 1.5 }}>
          Ton espace d'apprentissage, de santé et de bien-être
        </p>
      </div>

      <div style={{ padding: '0 20px', maxWidth: 480, margin: '0 auto' }}>
        <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 3, color: '#c084fc', textAlign: 'center', marginBottom: 16 }}>
          Choisir un module
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {modules.map((module) => (
            <button
              key={module.route}
              onClick={() => navigate(module.route)}
              onMouseEnter={() => setHovered(module.route)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                padding: '24px 16px',
                borderRadius: 24,
                border: `1.5px solid ${module.border}`,
                background: module.bg,
                color: module.text,
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                transform: hovered === module.route ? 'translateY(-4px) scale(1.03)' : 'translateY(0) scale(1)',
                boxShadow: hovered === module.route ? `0 8px 24px ${module.border}80` : '0 2px 8px #0000000d',
              }}
            >
              {module.icon}
              <span style={{ fontWeight: 600, fontSize: 13, textAlign: 'center', lineHeight: 1.3 }}>{module.label}</span>
            </button>
          ))}
        </div>
      </div>

      <p style={{ textAlign: 'center', fontSize: 12, marginTop: 40, color: '#d8b4fe' }}>
        Femme Lumière + — Pour chaque femme
      </p>
    </div>
  )
}
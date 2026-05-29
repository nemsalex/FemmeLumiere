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

  return (
    <div className="min-h-screen pb-10" style={{ background: 'linear-gradient(160deg, #fdf2f8 0%, #fce7f3 50%, #ede9fe 100%)' }}>

      {/* Hero */}
      <div className="text-center px-4 pt-10 pb-8">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md" style={{ background: 'linear-gradient(135deg, #f472b6, #a78bfa)' }}>
          <span className="text-white text-2xl font-bold">F</span>
        </div>
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#831843' }}>
          Femme Lumière +
        </h1>
        <p className="text-base max-w-xs mx-auto leading-relaxed" style={{ color: '#9d174d' }}>
          Ton espace d'apprentissage, de santé et de bien-être
        </p>
      </div>

      {/* Grille modules */}
      <div className="px-5 max-w-md mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest mb-4 text-center" style={{ color: '#c084fc' }}>
          Choisir un module
        </p>
        <div className="grid grid-cols-2 gap-4">
          {modules.map((module) => (
            <button
              key={module.route}
              onClick={() => navigate(module.route)}
              className="flex flex-col items-center justify-center gap-3 p-6 rounded-3xl shadow-md active:scale-95 transition-all duration-150"
              style={{
                background: module.bg,
                borderWidth: '1.5px',
                borderStyle: 'solid',
                borderColor: module.border,
                color: module.text,
              }}
            >
              {module.icon}
              <span className="font-semibold text-sm text-center leading-tight">{module.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer discret */}
      <p className="text-center text-xs mt-10" style={{ color: '#d8b4fe' }}>
        Femme Lumière + — Pour chaque femme
      </p>
    </div>
  )
}
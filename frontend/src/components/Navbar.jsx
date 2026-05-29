import { useNavigate, useLocation } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const estAccueil = location.pathname === '/'

  return (
    <div className="navbar bg-pink-100 shadow-sm px-4 sticky top-0 z-50">
      <div className="flex-none">
        {!estAccueil && (
          <button
            className="btn btn-ghost btn-circle text-pink-500"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={22} />
          </button>
        )}
      </div>
      <div className="flex-1 justify-center">
        <span className="text-xl font-bold text-pink-600">Femme Lumière +</span>
      </div>
      <div className="flex-none">
        {!estAccueil && (
          <button
            className="btn btn-ghost btn-circle text-pink-500"
            onClick={() => navigate('/')}
          >
            <Home size={22} />
          </button>
        )}
      </div>
    </div>
  )
}
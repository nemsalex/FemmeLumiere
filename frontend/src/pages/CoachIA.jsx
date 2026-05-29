import { useState, useRef, useEffect } from 'react'
import { Bot, Send, User, Trash2 } from 'lucide-react'
import api from '../api'

const SUGGESTIONS = [
  "Comment apprendre à lire rapidement ?",
  "Quand est ma période fertile ?",
  "Mon bébé a de la fièvre, que faire ?",
  "Comment lancer un petit commerce ?",
  "Je me sens triste, aide-moi.",
]

export default function CoachIA() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Bonjour ! Je suis Coach Lumière. Je suis là pour t\'aider sur l\'alphabétisation, ton cycle, la santé de ton bébé, les petits métiers et la motivation. Comment puis-je t\'aider aujourd\'hui ?',
    },
  ])
  const [input, setInput] = useState('')
  const [chargement, setChargement] = useState(false)
  const [erreur, setErreur] = useState('')
  const finRef = useRef(null)

  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const envoyer = async (texte) => {
    const messageUtilisateur = texte || input.trim()
    if (!messageUtilisateur) return

    const nouveauxMessages = [
      ...messages,
      { role: 'user', content: messageUtilisateur },
    ]
    setMessages(nouveauxMessages)
    setInput('')
    setChargement(true)
    setErreur('')

    try {
      const res = await api.post('http://127.0.0.1:8000/api/coach/', {
        messages: nouveauxMessages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      })
      const reponse = res.data.reponse
      setMessages([...nouveauxMessages, { role: 'assistant', content: reponse }])
    } catch {
      setErreur('Erreur de connexion. Vérifie ta connexion internet.')
    } finally {
      setChargement(false)
    }
  }

  const reinitialiser = () => {
    setMessages([{
      role: 'assistant',
      content: 'Bonjour ! Je suis Coach Lumière. Comment puis-je t\'aider aujourd\'hui ?',
    }])
  }

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col pb-0">
      <div className="bg-blue-200 px-4 py-6 text-center">
        <h2 className="text-2xl font-bold text-blue-800 flex items-center justify-center gap-2">
          <Bot /> Coach IA
        </h2>
        <p className="text-blue-700 text-sm mt-1">Pose ta question, je t'aide</p>
      </div>

      <div className="flex gap-2 px-4 py-3 bg-white shadow-sm overflow-x-auto">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => envoyer(s)}
            className="btn btn-sm rounded-full whitespace-nowrap btn-ghost border border-blue-200 text-blue-700 text-xs"
          >
            {s}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 max-w-md mx-auto w-full">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 items-end ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              msg.role === 'assistant' ? 'bg-blue-200 text-blue-700' : 'bg-pink-200 text-pink-700'
            }`}>
              {msg.role === 'assistant' ? <Bot size={16} /> : <User size={16} />}
            </div>
            <div className={`max-w-xs px-4 py-3 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'assistant'
                ? 'bg-white border border-blue-100 text-gray-700 rounded-bl-none'
                : 'bg-blue-400 text-white rounded-br-none'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}

        {chargement && (
          <div className="flex gap-3 items-end">
            <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center">
              <Bot size={16} className="text-blue-700" />
            </div>
            <div className="bg-white border border-blue-100 px-4 py-3 rounded-2xl rounded-bl-none">
              <span className="loading loading-dots loading-sm text-blue-400" />
            </div>
          </div>
        )}

        {erreur && (
          <p className="text-center text-red-500 text-sm">{erreur}</p>
        )}

        <div ref={finRef} />
      </div>

      <div className="bg-white border-t border-gray-100 px-4 py-3 max-w-md mx-auto w-full">
        <div className="flex gap-2 items-center">
          <button
            onClick={reinitialiser}
            className="btn btn-circle btn-sm btn-ghost text-gray-400 border border-gray-200"
          >
            <Trash2 size={15} />
          </button>
          <input
            type="text"
            className="input input-bordered flex-1 rounded-full text-sm focus:border-blue-400"
            placeholder="Écris ta question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && envoyer()}
          />
          <button
            onClick={() => envoyer()}
            disabled={!input.trim() || chargement}
            className="btn btn-circle bg-blue-400 border-none text-white"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
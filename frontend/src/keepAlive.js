// Ping le backend toutes les 10 minutes pour éviter qu'il s'endorme
const BACKEND_URL = 'https://femmelumiere.onrender.com/api/cycle/historique/'

export const demarrerKeepAlive = () => {
  const ping = async () => {
    try {
      await fetch(BACKEND_URL)
    } catch {
      // silencieux
    }
  }
  ping() // ping immédiat au démarrage
  setInterval(ping, 10 * 60 * 1000) // puis toutes les 10 minutes
}
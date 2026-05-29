import axios from 'axios'

const api = axios.create({
  baseURL: 'https://femmelumiere.onrender.com'
})

export default api
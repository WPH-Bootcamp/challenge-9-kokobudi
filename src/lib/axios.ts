import axios from 'axios'

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY as string

if (!TMDB_API_KEY) {
  console.error(
    '⚠️  VITE_TMDB_API_KEY is missing! Please check your .env file.'
  )
}

const apiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 10_000, // fail after 10 seconds (avoids hanging forever)
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})


apiClient.interceptors.request.use(
  (config) => {
    config.params = {
      ...config.params,    // keep any params already passed in
      api_key: TMDB_API_KEY,
    }
    return config
  },
  (error) => Promise.reject(error)
)

apiClient.interceptors.response.use(
  (response) => response, // success — just pass it through

  (error) => {
    if (error.response) {
      // Server responded, but with an error status code
      const { status } = error.response
      if (status === 401) {
        console.error('❌ TMDB: Invalid API key. Check your .env file.')
      } else if (status === 404) {
        console.error('❌ TMDB: Movie/resource not found.')
      } else if (status === 429) {
        console.error('❌ TMDB: Rate limit hit. Too many requests!')
      }
    } else if (error.request) {
      // Request was made but no response received (network issue)
      console.error('❌ Network error. Are you connected to the internet?')
    }

    // Always reject so React Query can catch it too
    return Promise.reject(error)
  }
)

export default apiClient
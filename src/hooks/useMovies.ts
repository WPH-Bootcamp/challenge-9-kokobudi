import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Movie } from '../types/movie'

// 1. Kita bikin cetakan dulu: Tas ransel ini isinya apa aja?
interface MovieStore {
  favorites: Movie[] // Daftar film favorit
  addFavorite: (movie: Movie) => void // Fungsi buat masukin film
  removeFavorite: (id: number) => void // Fungsi buat ngeluarin film
  isFavorite: (id: number) => boolean // Fungsi buat ngecek, ini udah difavoritin belum?
}

// 2. Kita bikin tas ranselnya (Store)
export const useMovieStore = create<MovieStore>()(
  persist(
    (set, get) => ({
      favorites: [], // Awalnya tas ransel kosong

      // Cara nambahin film ke favorit
      addFavorite: (movie) => {
        const currentFavorites = get().favorites
        // Cek dulu, filmnya udah ada di favorit belum? Biar gak dobel
        const isAlreadyFav = currentFavorites.some((fav) => fav.id === movie.id)
        
        if (!isAlreadyFav) {
          // Kalau belum ada, tambahin ke array
          set({ favorites: [...currentFavorites, movie] })
        }
      },

      // Cara ngehapus film dari favorit
      removeFavorite: (id) => {
        set((state) => ({
          // Filter: simpan semua film KECUALI film yang ID-nya mau dihapus
          favorites: state.favorites.filter((movie) => movie.id !== id),
        }))
      },

      // Cara ngecek apakah film ini favorit atau bukan
      isFavorite: (id) => {
        return get().favorites.some((movie) => movie.id === id)
      },
    }),
    {
      // Ini nama kunci buat disimpen di memori browser (localStorage)
      name: 'movie-favorites', 
    }
  )
)
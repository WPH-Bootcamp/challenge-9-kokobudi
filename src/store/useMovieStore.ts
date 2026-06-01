import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Movie } from '@/types/movie'

interface FavoriteState {
  favorites: Movie[]
  addFavorite: (movie: Movie) => void
  removeFavorite: (movieId: number) => void
  isFavorite: (movieId: number) => boolean
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],
      
      addFavorite: (movie) => 
        set((state) => ({ favorites: [...state.favorites, movie] })),
        
      removeFavorite: (movieId) => 
        set((state) => ({
          favorites: state.favorites.filter((m) => m.id !== movieId)
        })),
        
      isFavorite: (movieId) => 
        get().favorites.some((m) => m.id === movieId),
    }),
    {
      name: 'movie-explorer-favorites', // Ini otomatis jadi nama key di localStorage
    }
  )
)
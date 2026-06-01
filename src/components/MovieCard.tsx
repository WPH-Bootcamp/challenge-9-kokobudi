// src/components/MovieCard.tsx
import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import type { Movie } from '../types/movie'

interface MovieCardProps {
  movie: Movie
}

export default function MovieCard({ movie }: MovieCardProps) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster'

  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'

  return (
    <Link to={`/movie/${movie.id}`}>
      <Card className="overflow-hidden bg-slate-900 border-slate-800 text-white hover:ring-2 hover:ring-slate-400 transition-all duration-300">
        
        {/* Bagian Poster (Gambar) */}
        <div className="aspect-[2/3] relative">
          <img
            src={imageUrl}
            alt={movie.title}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>

        {/* Bagian Teks (Judul, Rating, Tahun) */}
        <CardContent className="p-3">
          <h3 className="font-semibold truncate text-sm mb-1" title={movie.title}>
            {movie.title}
          </h3>
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1 text-yellow-500">
              <Star className="w-3 h-3 fill-current" />
              {movie.vote_average.toFixed(1)}
            </span>
            <span>{year}</span>
          </div>
        </CardContent>

      </Card>
    </Link>
  )
}
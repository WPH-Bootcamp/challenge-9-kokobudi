// src/pages/MovieDetailPage.tsx
import { useParams } from 'react-router-dom'

export default function MovieDetailPage() {
  // Ngambil ID film dari URL (misal: /movie/123 -> dapet 123)
  const { id } = useParams()

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Detail Film ID: {id} 🎬</h1>
    </div>
  )
}
import { useParams } from 'react-router-dom'

export default function MovieDetailPage() {
  const { id } = useParams()

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Detail Film ID: {id} 🎬</h1>
    </div>
  )
}
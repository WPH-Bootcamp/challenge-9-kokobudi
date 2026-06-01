import { useState, useEffect } from 'react';
import { Movie } from '@/types/movie';
import { getStoredFavorites, saveStoredFavorites } from '@/utils/favoritesHelper'; // Sesuaikan path-nya

interface FavoritesPageProps {
  onMovieClick: (id: number) => void;
  onBackToHome: () => void;
}

export default function FavoritesPage({ onMovieClick, onBackToHome }: FavoritesPageProps) {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  // Muat data favorit saat halaman pertama kali dibuka
  useEffect(() => {
    setFavorites(getStoredFavorites());
  }, []);

  // Fungsi untuk menghapus film dari daftar favorit
  const handleRemoveFavorite = (e: React.MouseEvent, movieId: number) => {
    e.stopPropagation(); // Mencegah kepicu-nya fungsi onMovieClick ketika tombol hapus diklik
    const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
    setFavorites(updatedFavorites);
    saveStoredFavorites(updatedFavorites);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER HALAMAN */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-zinc-900 pb-5">
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-wider uppercase">
              Daftar Favorit Saya
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {favorites.length} {favorites.length <= 1 ? 'Film' : 'Film'} tersimpan secara lokal
            </p>
          </div>
          
          <button 
            onClick={onBackToHome}
            className="self-start sm:self-auto flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-400 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Kembali ke Beranda
          </button>
        </div>

        {/* STATE: JIKA DAFTAR FAVORIT KOSONG */}
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
            <div className="bg-zinc-900/50 p-6 rounded-full border border-zinc-800">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-zinc-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-300">Belum ada film favorit</h3>
              <p className="text-zinc-500 text-sm mt-1 max-w-sm">
                Jelajahi halaman utama dan tandai film yang ingin kamu tonton nanti di sini.
              </p>
            </div>
            <button 
              onClick={onBackToHome}
              className="mt-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm px-5 py-2.5 rounded-md transition"
            >
              Cari Film Sekarang
            </button>
          </div>
        ) : (
          
          /* GRID RESPONSIF: Otomatis berubah layout-nya tergantung ukuran layar */
          /* Handphone: 2 kolom | Tablet: 3 kolom | Laptop/Desktop kecil: 4 kolom | Monitor Gede: 5 kolom */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {favorites.map((movie) => (
              <div
                key={movie.id}
                onClick={() => onMovieClick(movie.id)}
                className="bg-zinc-950 rounded-xl overflow-hidden border border-zinc-900 hover:border-zinc-700/80 transition duration-300 cursor-pointer group relative flex flex-col justify-between"
              >
                {/* Tombol Hapus / Quick Action (Muncul di pojok kanan atas poster) */}
                <button
                  onClick={(e) => handleRemoveFavorite(e, movie.id)}
                  className="absolute top-2 right-2 z-20 bg-black/70 hover:bg-red-600 text-gray-300 hover:text-white p-2 rounded-lg border border-white/10 backdrop-blur-sm transition duration-200 shadow-lg"
                  title="Hapus dari Favorit"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>

                {/* Bagian Poster Gambar */}
                <div className="aspect-[2/3] w-full overflow-hidden bg-zinc-900 relative">
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-500 text-xs text-center p-4">
                      Tidak Ada Gambar
                    </div>
                  )}
                  {/* Gradasi halus di atas poster */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
                </div>

                {/* Bagian Informasi Teks */}
                <div className="p-3 md:p-4 bg-zinc-950 flex-grow flex flex-col justify-between gap-1">
                  <h2 className="font-bold text-sm md:text-base tracking-tight text-zinc-100 group-hover:text-red-500 transition line-clamp-1">
                    {movie.title}
                  </h2>
                  <div className="flex items-center justify-between text-xs text-zinc-500 font-medium">
                    <span>{movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}</span>
                    <span className="text-green-500 font-semibold">★ {movie.vote_average?.toFixed(1) || '0.0'}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
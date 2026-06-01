import { useQuery } from '@tanstack/react-query';
import { getPopularMovies, getNowPlayingMovies } from '@/services/movieService';
import MovieCard from '@/components/MovieCard';

export default function HomePage() {
  // Narik data film Populer (Untuk Trending & Hero Banner)
  const { data: popularData, isLoading: loadingPopular } = useQuery({
    queryKey: ['movies', 'popular'],
    queryFn: () => getPopularMovies(),
  });

  // Narik data film Tayang Sekarang (Untuk New Release)
  const { data: nowPlayingData, isLoading: loadingNowPlaying } = useQuery({
    queryKey: ['movies', 'nowPlaying'],
    queryFn: () => getNowPlayingMovies(),
  });

  // Tampilan kalau datanya masih ditarik dari server
  if (loadingPopular || loadingNowPlaying) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="animate-pulse text-xl">Loading film bentar ya Om...</p>
      </div>
    );
  }

  const popularMovies = popularData?.results || [];
  const newReleases = nowPlayingData?.results || [];

  // Ambil 1 film random dari 5 film terpopuler untuk dipajang di Hero Banner
  const randomHeroIndex = Math.floor(Math.random() * Math.min(popularMovies.length, 5));
  const heroMovie = popularMovies[randomHeroIndex];

  return (
    // Background utama sekarang bg-black
    <div className="min-h-screen bg-black text-white pb-20">
      
      {/* 1. HERO BANNER SECTION */}
      {heroMovie && (
        <div className="relative w-full h-[70vh] lg:h-[85vh]">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
              alt={heroMovie.title}
              className="w-full h-full object-cover"
            />
            {/* Gradient biar bawahnya gelap dan teks gampang dibaca */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </div>

          {/* Info Text di Banner */}
          <div className="absolute bottom-0 left-0 w-full p-6 lg:p-16 z-10">
            <h1 className="text-4xl lg:text-7xl font-bold mb-4 shadow-sm">
              {heroMovie.title}
            </h1>
            <p className="text-gray-300 max-w-2xl text-sm lg:text-lg line-clamp-3 mb-8 text-shadow">
              {heroMovie.overview}
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-black px-6 py-2 lg:px-8 lg:py-3 rounded-md font-bold hover:bg-gray-200 transition flex items-center gap-2">
                <span>▶</span> Play
              </button>
              <button className="bg-gray-600/60 text-white px-6 py-2 lg:px-8 lg:py-3 rounded-md font-bold hover:bg-gray-600/80 transition flex items-center gap-2 backdrop-blur-sm">
                <span>+</span> More Info
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. DAFTAR FILM KATEGORI */}
      {/* -mt-20 bikin posisi list agak naik numpuk di atas gradient banner */}
      <div className="px-4 sm:px-6 lg:px-12 -mt-20 relative z-20 space-y-12">
        
        {/* Trending Now */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Trending Now</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {popularMovies.slice(0, 10).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {/* New Releases */}
        <section>
          <h2 className="text-2xl font-bold mb-4">New Releases</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {newReleases.slice(0, 10).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
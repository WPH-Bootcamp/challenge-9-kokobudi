export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null      
  backdrop_path: string | null    
  vote_average: number            
  vote_count: number
  release_date: string            
  genre_ids: number[]            
  popularity: number
  adult: boolean
  original_language: string       
  original_title: string
  video: boolean
}

export interface Genre {
  id: number
  name: string  
}

export interface ProductionCompany {
  id: number
  name: string
  logo_path: string | null
  origin_country: string
}

export interface SpokenLanguage {
  iso_639_1: string      // language code, e.g. "en"
  english_name: string   // e.g. "English"
  name: string
}

export interface MovieDetail extends Omit<Movie, 'genre_ids'> {
  genres: Genre[]                            // full genre objects, not just IDs
  runtime: number | null                     // in minutes
  status: string                             // "Released", "In Production", etc.
  tagline: string
  budget: number
  revenue: number
  homepage: string | null
  imdb_id: string | null
  production_companies: ProductionCompany[]
  spoken_languages: SpokenLanguage[]
}

export interface PaginatedResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export interface CastMember {
  id: number
  name: string
  character: string              // the role they played
  profile_path: string | null    // actor's photo
  order: number                  // 0 = top-billed actor
  cast_id: number
  credit_id: string
  gender: number | null          // TMDB uses 1=female, 2=male, 0=unknown
  popularity: number
  known_for_department: string
}

export interface CrewMember {
  id: number
  name: string
  job: string                    // e.g. "Director", "Producer"
  department: string             // e.g. "Directing", "Writing"
  profile_path: string | null
  credit_id: string
  gender: number | null
  popularity: number
}

export interface MovieCredits {
  id: number
  cast: CastMember[]
  crew: CrewMember[]
}

export interface Video {
  id: string
  key: string          // YouTube video ID — use with youtube.com/watch?v=KEY
  name: string
  site: string         // Usually "YouTube"
  size: number         // Resolution: 360, 720, 1080
  type: string         // "Trailer" | "Teaser" | "Clip" | "Featurette"
  official: boolean
  published_at: string
  iso_639_1: string
  iso_3166_1: string
}

export interface MovieVideos {
  id: number
  results: Video[]
}

export interface MovieListParams {
  page?: number         // defaults to 1
  language?: string     // defaults to "en-US"
  region?: string       // e.g. "US" — filters by release region
}

export interface SearchMoviesParams {
  query: string         // required — the search term
  page?: number
  language?: string
  include_adult?: boolean
}
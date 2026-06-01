import apiClient from '@/lib/axios'
import type {
  Movie,
  MovieDetail,
  MovieCredits,
  MovieVideos,
  PaginatedResponse,
  MovieListParams,
  SearchMoviesParams,
} from '@/types/movie'

const DEFAULTS = {
  language: 'en-US',
  page: 1,
}

export const getPopularMovies = async (
  params: MovieListParams = {}
): Promise<PaginatedResponse<Movie>> => {
  const { data } = await apiClient.get<PaginatedResponse<Movie>>(
    '/movie/popular',
    { params: { ...DEFAULTS, ...params } }
  )
  return data
}


export const getNowPlayingMovies = async (
  params: MovieListParams = {}
): Promise<PaginatedResponse<Movie>> => {
  const { data } = await apiClient.get<PaginatedResponse<Movie>>(
    '/movie/now_playing',
    { params: { ...DEFAULTS, ...params } }
  )
  return data
}


export const getTopRatedMovies = async (
  params: MovieListParams = {}
): Promise<PaginatedResponse<Movie>> => {
  const { data } = await apiClient.get<PaginatedResponse<Movie>>(
    '/movie/top_rated',
    { params: { ...DEFAULTS, ...params } }
  )
  return data
}


export const getMovieDetails = async (
  movieId: number
): Promise<MovieDetail> => {
  const { data } = await apiClient.get<MovieDetail>(`/movie/${movieId}`, {
    params: { language: DEFAULTS.language },
  })
  return data
}

/**
 * Fetches the cast and crew for a single movie.
 */
export const getMovieCredits = async (
  movieId: number
): Promise<MovieCredits> => {
  const { data } = await apiClient.get<MovieCredits>(
    `/movie/${movieId}/credits`,
    { params: { language: DEFAULTS.language } }
  )
  return data
}


export const getMovieVideos = async (
  movieId: number
): Promise<MovieVideos> => {
  const { data } = await apiClient.get<MovieVideos>(
    `/movie/${movieId}/videos`,
    { params: { language: DEFAULTS.language } }
  )
  return data
}

export const getSimilarMovies = async (
  movieId: number,
  params: MovieListParams = {}
): Promise<PaginatedResponse<Movie>> => {
  const { data } = await apiClient.get<PaginatedResponse<Movie>>(
    `/movie/${movieId}/similar`,
    { params: { ...DEFAULTS, ...params } }
  )
  return data
}

export const searchMovies = async (
  params: SearchMoviesParams
): Promise<PaginatedResponse<Movie>> => {
  const { data } = await apiClient.get<PaginatedResponse<Movie>>(
    '/search/movie',
    {
      params: {
        ...DEFAULTS,
        include_adult: false,
        ...params, 
      },
    }
  )
  return data
}
import type { Movie } from '@/types/Movie'
import axios from 'axios'

export const getMovies = async ({
  city,
}: {
  city: string | null
}): Promise<Movie[]> => {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL
  let url
  city ? (url = `/api/movies/${city}`) : (url = `/api/movies`)
  const movies = await axios.get<Movie[]>(url)
  return movies.data
}

export const getMovie = async ({ uuid }: { uuid: string }): Promise<Movie> => {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL
  const url = `/api/movies/movie/${uuid}`
  const movie = await axios.get<Movie>(url)
  return movie.data
}

export const getCinemas = async ({
  city,
}: {
  city: string
}): Promise<string[]> => {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL
  const url = `/api/movies/cinemas/${city}`
  const cinemas = await axios.get<string[]>(url)
  return cinemas.data
}

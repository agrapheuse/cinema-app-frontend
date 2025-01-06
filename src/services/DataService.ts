import { Cinema } from '@/types/Cinema'
import type { Movie } from '@/types/Movie'
import axios from 'axios'
import { User } from 'next-auth'

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
}): Promise<Cinema[]> => {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL
  const url = `/api/cinemas/${city}`
  const cinemas = await axios.get<Cinema[]>(url)
  return cinemas.data
}

export const isUser = async ({
  email,
}: {
  email: string
}): Promise<boolean> => {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL
  const url = `/api/users/userExists/${email}`
  const users = await axios.get<boolean>(url)
  return users.data
}

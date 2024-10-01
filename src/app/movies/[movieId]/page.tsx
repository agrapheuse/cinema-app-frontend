import type { Movie } from '@/types/Movie'
import MovieComponent from '@/components/MovieComponent'
import { getMovie } from '@/services/DataService'

interface MovieRouteProps {
  params: { movieId: string }
}

const MovieRoute = async ({
  params,
}: MovieRouteProps): Promise<JSX.Element> => {
  const { movieId } = params

  const movie = await getMovie({ uuid: movieId })

  return <MovieComponent movie={movie} />
}

export async function generateStaticParams(): Promise<{ movieId: string }[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/movies`,
    )

    if (!response.ok) {
      throw new Error('Failed to fetch movies')
    }

    const movies: Movie[] = (await response.json()) as Movie[]

    return movies.map((movie) => ({ movieId: movie.uuid }))
  } catch (error) {
    return []
  }
}

export default MovieRoute

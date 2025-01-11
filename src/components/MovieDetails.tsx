import {
  getMovieDetails,
  getMovieId,
  getMovieImages,
} from '@/services/DataService'
import type { Movie } from '@/types/Movie'
import { useEffect, type JSX } from 'react'

export const MovieDetail = ({
  movie,
  setMovieDetail,
}: {
  movie: Movie | null
  setMovieDetail: React.Dispatch<React.SetStateAction<Movie | null>>
}): JSX.Element => {
  useEffect(() => {
    const fetchMovieDetails = async (): Promise<void> => {
      if (!movie?.title) {
        return
      }

      try {
        const id = await getMovieId({ title: movie.title })

        const details = await getMovieDetails({ id: id })
        const images = await getMovieImages({ id: id })
      } catch (error) {
        console.error('Error fetching movie details:', error)
      }
    }

    void fetchMovieDetails()
  }, [movie, setMovieDetail])

  return (
    <div className="w-[70%] bg-white flex flex-col">
      <img src={movie?.imageUrl} alt="Movie Background" className="w-max" />

      <button
        className="absolute top-4 left-4 bg-white text-black rounded-full p-2"
        onClick={() => setMovieDetail(null)}
      >
        ✕
      </button>

      <div className="p-6 bg-white">
        <h1 className="text-2xl font-bold">{movie?.title}</h1>
        <div className="text-sm text-gray-700 mt-2">
          <span>Director: {movie?.director}</span> ·{' '}
          <span>Length: placeholder</span>
        </div>
        <p className="mt-4 text-gray-800">{movie?.description}</p>
        <p className="mt-2 text-gray-700">
          <strong>Genre: placeholder</strong>
        </p>
      </div>

      <div className="p-6 bg-gray-100">
        <h2 className="text-xl font-semibold">Showing(s)</h2>
        <ul className="mt-4 space-y-4">
          {movie?.showings.map((s) => (
            <li className="flex items-center">
              <input type="radio" name="availability" className="mr-4" />
              <div className="flex-1">
                <span>{s.dateTime}</span> · <span>{s.dateTime}</span>
              </div>
              <img
                src={movie.cinema.logoUrl}
                alt="Movie Background"
                className="w-16 object-cover"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

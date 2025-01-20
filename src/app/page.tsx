'use client'

import type { JSX } from 'react'
import { useEffect, useState } from 'react'
import { useCinemas, useMovies } from '@/hooks/CustomHooks'
import MovieComponent from '@/components/MovieComponent'
import { CinemaButtons } from '@/components/CinemaButtons'
import type { Movie } from '@/types/Movie'
import { MovieDetail } from '@/components/MovieDetails'

export default function LandingPage(): JSX.Element {
  const [city] = useState('Antwerp')
  const [currentCol, setCurrentCol] = useState(0)
  const [preferredCinemas, setPreferredCinemas] = useState<string[]>([])
  const [movieDetail, setMovieDetail] = useState<Movie | null>(() =>
    JSON.parse(localStorage.getItem('movieDetail') ?? 'null'),
  )

  const { data: movies, refetch: refetchMovies } = useMovies({ city })

  const { data: cinemas, refetch: refetchCinemas } = useCinemas({ city })

  useEffect(() => {
    void refetchMovies()
    void refetchCinemas()
  }, [city, refetchMovies, refetchCinemas])

  useEffect(() => {
    if (cinemas) {
      setPreferredCinemas(cinemas.map((c) => c.uuid).filter(Boolean))
    }
  }, [cinemas])

  useEffect(() => {
    if (movieDetail) {
      localStorage.setItem('movieDetail', JSON.stringify(movieDetail))
    } else {
      localStorage.removeItem('movieDetail')
    }
  }, [movieDetail])

  const handleScroll = (e: React.WheelEvent): void => {
    if (currentCol === 0 && e.deltaY < 0) {
      return
    }

    const newCol = e.deltaY > 0 ? currentCol + 4 : currentCol - 4
    setCurrentCol(newCol)

    setTimeout(() => {
      const col = document.getElementById('col' + newCol)

      if (col) {
        col.scrollIntoView({ behavior: 'smooth' })
      }
    }, 0)
  }

  const filteredMovies =
    movies?.filter((m) => preferredCinemas.includes(m.cinema.uuid)) || []

  return (
    <div className="flex h-screen">
      <div className="w-[30%] bg-gray-200 p-4 flex flex-col"></div>
      {movieDetail === null ? (
        <div className="w-[70%] bg-white pl-4 py-4">
          <div className="flex flex-row flex-wrap">
            <CinemaButtons
              cinemas={cinemas}
              preferredCinemas={preferredCinemas}
              setPreferredCinemas={setPreferredCinemas}
            />
          </div>
          {movies === undefined || movies.length === 0 ? (
            <div>No movies available</div>
          ) : (
            <div
              className="overflow-x-auto h-[93%] pt-2"
              onWheel={handleScroll}
            >
              <div className="grid grid-rows-4 grid-flow-col gap-4">
                {filteredMovies.map((m, index) => (
                  <MovieComponent
                    id={'col' + index}
                    key={index}
                    movie={m}
                    setMovieDetail={setMovieDetail}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <MovieDetail movie={movieDetail} setMovieDetail={setMovieDetail} />
      )}
    </div>
  )
}

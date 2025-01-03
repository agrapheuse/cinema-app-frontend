'use client'

import { useCinemas, useMovies } from '@/hooks/CustomHooks'
import { JSX, useState, useEffect } from 'react'

interface CinemaShowing {
  cinema: string
  showings: DateTime[]
}

interface MovieInfo {
  title: string
  showing: CinemaShowing[]
}

export default function Test(): JSX.Element {
  const [city, setCity] = useState('Antwerp')
  const [movieInfos, setMovieInfos] = useState<MovieInfo[]>([])

  const {
    isLoading: isLoadingMovies,
    isError: isErrorMovies,
    data: movies,
    refetch: refetchMovies,
  } = useMovies({ city })

  const {
    isLoading: isLoadingCinemas,
    isError: isErrorCinemas,
    data: cinemas,
    refetch: refetchCinemas,
  } = useCinemas({ city })

  useEffect(() => {
    if (!movies || !cinemas) return

    const updatedMovieInfos: MovieInfo[] = [
      ...new Set(movies.map((m) => m.title)),
    ].map((uniqueMovie) => {
      const showing: CinemaShowing[] = cinemas
        .map((cinema) => {
          const showings = movies
            .filter(
              (m) => m.title === uniqueMovie && m.cinemaId === cinema.uuid,
            )
            .flatMap((m) => m.dateTime)

          return { cinema: cinema.name, showings }
        })
        .filter((cinemaShowing) => cinemaShowing.showings.length > 0)

      return { title: uniqueMovie, showing }
    })

    setMovieInfos(updatedMovieInfos)
  }, [movies, cinemas])

  console.log(movieInfos)

  return <></>
}

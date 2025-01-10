'use client'

import { JSX, useEffect, useRef, useState } from 'react'
import { useCinemas, useMovies } from '@/hooks/CustomHooks'
import MovieComponent from '@/components/MovieComponent'
import { CinemaButtons } from '@/components/CinemaButtons'

export default function LandingPage(): JSX.Element {
  const [city, setCity] = useState('Antwerp')
  const [currentCol, setCurrentCol] = useState(0)

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
    refetchMovies()
    refetchCinemas()
  }, [city, refetchMovies, refetchCinemas])

  const handleScroll = (e: React.WheelEvent) => {
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

  return (
    <div className="flex h-screen">
      <div className="w-[30%] bg-gray-200 p-4 flex flex-col"></div>
      <div className="w-[70%] bg-white pl-4 py-4">
        <div className="flex flex-row flex-wrap">
          <CinemaButtons cinemas={cinemas} />
        </div>
        {movies === undefined || movies.length === 0 ? (
          <div>No movies available</div>
        ) : (
          <div className="overflow-x-auto h-[93%] pt-2" onWheel={handleScroll}>
            <div className="grid grid-rows-4 grid-flow-col gap-4">
              {movies.map((m, index) => (
                <MovieComponent id={'col' + index} key={index} movie={m} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

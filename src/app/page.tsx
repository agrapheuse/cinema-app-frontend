'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { JSX, useEffect, useState } from 'react'
import { countries } from '@/utils/countryCity'
import { useCinemas, useMovies } from '@/hooks/CustomHooks'
import MovieComponent from '@/components/MovieComponent'

export default function LandingPage(): JSX.Element {
  const [city, setCity] = useState('Antwerp')
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [numCol, setNumCol] = useState(0)

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

  useEffect(() => {
    if (movies && movies.length > 0) {
      const numCol = Math.ceil(movies.slice(0, 9).length / 4)
      setNumCol(numCol)
    }
  }, [movies])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.trim()
    setSearchTerm(term)

    if (term === '') {
      setSuggestions([])
      return
    }

    setSuggestions(
      countries
        .flatMap((country) => country.cities)
        .filter((city) => city.toLowerCase().includes(term.toLowerCase())),
    )
  }

  const handleSetCity = (selectedCity: string) => {
    setCity(selectedCity)
    setSearchTerm(selectedCity)
    setSuggestions([])
  }

  return (
    <div className="flex h-screen">
      <div className="w-[30%] bg-gray-200 p-4 flex flex-col">
        <div className="mb-4">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="pr-10"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <SearchIcon className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
          {suggestions.length > 0 && (
            <div className="mt-2 rounded-md border bg-background shadow-lg">
              <ul className="py-1">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSetCity(suggestion)}
                    className="cursor-pointer px-4 py-2 hover:bg-muted"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex-grow bg-gray-300 rounded-md"></div>
        </div>
      </div>
      <div className="w-[70%] bg-white p-4">
        <div className="flex flex-row flex-wrap">
          {cinemas === undefined || cinemas.length === 0 ? (
            <div>No cinemas</div>
          ) : (
            cinemas.map((cinema) => (
              <Button key={cinema.uuid}>{cinema.name}</Button>
            ))
          )}
        </div>
        {movies === undefined || movies.length === 0 ? (
          <div>No movies available</div>
        ) : (
          <div className="overflow-x-auto h-[95%] p-2">
            <div className="grid grid-rows-4 grid-flow-col gap-4">
              {movies.map((m, index) => (
                <MovieComponent key={m.uuid} movie={m} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

'use client'

import { Button } from '@/components/ui/button'
import SettingsContext from '@/contexts/SettingsContext'
import { useMovies } from '@/hooks/CustomHooks'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import { FaCog, FaUserCircle } from 'react-icons/fa'
import { FaRegHeart, FaHeart } from 'react-icons/fa'

export default function MovieHome(): JSX.Element {
  const { city } = useContext(SettingsContext)
  const { isLoading, isError, data: movies } = useMovies({ city })
  const [liked, setLiked] = useState(false)

  const router = useRouter()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error loading movies.</div>
  }

  return (
    <div>
      <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="text-xl" onClick={() => router.push('/settings')}>
          <FaCog />
        </div>

        <h1 className="text-2xl font-bold">Movies</h1>

        <div className="text-xl">
          <FaUserCircle />
        </div>
      </nav>

      <div className="container mx-auto p-4">
        <div className="space-y-4">
          {movies?.map((movie) => (
            <div
              key={movie.uuid}
              className="relative bg-white rounded-lg shadow-md p-4 flex justify-between items-center"
            >
              <div className="w-1/4 pr-4">
                <Image
                  src={movie.imageUrl}
                  alt={movie.title || ''}
                  width={100}
                  height={100}
                  className="w-full h-40 object-cover rounded-md"
                />
              </div>

              <div className="w-1/4 flex flex-col justify-center text-left pl-4">
                <p className="text-sm text-gray-500 mb-0.5">
                  {new Date(movie.dateTime).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-sm text-gray-500 mb-0.5">
                  {new Date(movie.dateTime).toLocaleDateString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: false,
                  })}
                </p>

                <h2 className="text-xl font-semibold mb-0.5 text-gray-800">
                  {movie.title}
                </h2>
                <p className="text-gray-600 mb-0.5">{movie.director}</p>
              </div>

              <Button
                className="w-1/4 flex flex-col justify-center text-center"
                onClick={() => router.push('/movies/' + movie.uuid)}
              >
                More
              </Button>
              <div className="w-1/4 flex items-center ml-4">
                {liked ? (
                  <FaHeart
                    className="text-red-500 text-6xl"
                    onClick={() => setLiked(false)}
                  />
                ) : (
                  <FaRegHeart
                    className="text-gray-800 text-6xl"
                    onClick={() => setLiked(true)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

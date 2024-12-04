'use client'

import type { Movie } from '@/types/Movie'
import { useRouter } from 'next/navigation'
import { IoArrowBackCircleOutline } from 'react-icons/io5'
import Image from 'next/image'
import { FaRegHeart } from 'react-icons/fa6'
import { Button } from './ui/button'

const MovieComponent = ({ movie }: { movie: Movie }): JSX.Element => {
  const router = useRouter()

  const handleBackClick = (): void => {
    router.back()
  }

  return (
    <div>
      <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="text-4xl cursor-pointer" onClick={handleBackClick}>
          <IoArrowBackCircleOutline />
        </div>

        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold">
          {movie.title}
        </h1>
      </nav>

      <div className="flex flex-col sm:flex-row items-start">
        <div className="sm:w-2/3 mb-4 sm:mb-0 sm:mr-6 pl-6">
          <div className="flex justify-between items-start mb-4 mt-2">
            <div className="w-1/3">
              <p className="text-gray-500 mb-2">
                {new Date(movie.dateTime).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
              <p className="italic text-lg">{movie.director}</p>
            </div>
            <div className="w-2/3 flex justify-start">
              <FaRegHeart className="ml-4 mt-12 text-5xl cursor-pointer" />
            </div>
          </div>

          <p className="text-gray-500 mb-4">
            Language: {movie.language} &nbsp; Subtitles: {movie.subtitles}
          </p>
          <p className="leading-relaxed">{movie.description}</p>
          <div className="w-1/2">
            <Button
              onClick={() => (window.location.href = movie.infoLink)}
            ></Button>
          </div>
          {movie.ticketLink && (
            <div className="w-1/2">
              <Button
                onClick={() => (window.location.href = movie.ticketLink || '')}
              >
                Buy Tickets
              </Button>
            </div>
          )}
        </div>

        <div className="sm:w-1/3">
          <Image
            src={movie.imageUrl}
            alt={movie.title ?? ''}
            width={400}
            height={300}
            className="w-[4] h-[3] object-contain rounded-md"
          />
        </div>
      </div>
    </div>
  )
}

export default MovieComponent

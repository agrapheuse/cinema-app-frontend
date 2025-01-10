import type { Movie } from '@/types/Movie'
import { JSX } from 'react'

const MovieComponent = ({ movie }: { movie: Movie }): JSX.Element => {
  const truncatedDescription =
    movie.description && movie.description.length > 300
      ? movie.description.slice(0, 300) + '...'
      : movie.description

  const truncatedShowings =
    movie.showings && movie.showings.length > 2
      ? movie.showings.slice(0, 1)
      : movie.showings

  return (
    <div className="flex flex-row h-36 w-[45rem]">
      <img
        src={movie.imageUrl}
        alt={movie.title}
        className="h-36 w-64 object-cover rounded-lg flex-none"
      />
      <div className="flex flex-col flex-grow px-4">
        <h3 className="text-sm font-bold mt-4">{movie.title}</h3>
        <p className="text- text-blue-600">{movie.director}</p>
        <p className="block text-xs/[0.7rem] text-gray-700 w-full">
          {truncatedDescription}
        </p>
        <div className="mt-1 space-y-2 flex flex-row">
          <div>
            {truncatedShowings.map((showing, index) => (
              <div key={index} className="flex items-center justify-between">
                <a
                  href={showing.ticketLink}
                  className="text-sm text-blue-500 hover:underline"
                >
                  <p className="text-sm text-gray-700">{showing.dateTime}</p>
                </a>
              </div>
            ))}
          </div>
          <div className="ml-auto">
            <img
              src={movie.cinema.logoUrl}
              alt={movie.title}
              className="h-10 object-cover rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieComponent

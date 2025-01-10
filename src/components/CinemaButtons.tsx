import { Cinema } from '@/types/Cinema'
import { JSX } from 'react'
import { Button } from './ui/button'

export const CinemaButtons = ({
  cinemas,
}: {
  cinemas: Cinema[] | undefined
}): JSX.Element => {
  return (
    <div className="flex-col">
      <h1 className="font-bold text-lg my-1">CINEMAS</h1>
      {cinemas === undefined || cinemas.length === 0 ? (
        <div>No cinemas</div>
      ) : (
        cinemas.map((cinema) => (
          <Button
            key={cinema.uuid}
            className="text-xs px-2 h-5 rounded-full bg-gray-300 text-black mr-5 hover:bg-white"
          >
            {cinema.name.toUpperCase()}
          </Button>
        ))
      )}
    </div>
  )
}

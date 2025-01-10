import type { Cinema } from '@/types/Cinema'
import type { JSX } from 'react'
import { Button } from './ui/button'

export const CinemaButtons = ({
  cinemas,
  preferredCinemas,
  setPreferredCinemas,
}: {
  cinemas: Cinema[] | undefined
  preferredCinemas: string[]
  setPreferredCinemas: React.Dispatch<React.SetStateAction<string[]>>
}): JSX.Element => {
  const handleButtonToggle =
    (uuid: string) =>
    (_event: React.MouseEvent<HTMLButtonElement>): void => {
      if (!uuid) {
        return
      }

      setPreferredCinemas((prev) =>
        prev.includes(uuid)
          ? prev.filter((id) => id !== uuid)
          : [...prev, uuid],
      )
    }

  return (
    <div className="flex-col">
      <h1 className="font-bold text-lg my-1">CINEMAS</h1>
      {cinemas === undefined || cinemas.length === 0 ? (
        <div>No cinemas</div>
      ) : (
        cinemas.map((cinema) => (
          <Button
            onClick={handleButtonToggle(cinema.uuid)}
            key={cinema.uuid}
            className={`text-xs px-2 h-5 rounded-full ${
              preferredCinemas.includes(cinema.uuid)
                ? 'bg-gray-300 text-black'
                : 'bg-white text-black'
            } mr-5 hover:bg-white`}
          >
            {cinema.name.toUpperCase()}
          </Button>
        ))
      )}
    </div>
  )
}

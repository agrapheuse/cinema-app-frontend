'use client'

import CityCountrySelect from '@/components/CityCountrySelect'
import SettingsContext from '@/contexts/SettingsContext'
import { useCinemas } from '@/hooks/CustomHooks'
import { isUser } from '@/services/DataService'
import { Cinema } from '@/types/Cinema'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useMemo, useState } from 'react'

export default function NewUser(): JSX.Element {
  const { data: session } = useSession()

  const [chosenCountry, setChosenCountry] = useState('')
  const [chosenCity, setChosenCity] = useState('')
  const [followedCinemas, setFollowedCinemas] = useState<Cinema[]>([])

  const { setCountry, setCity } = useContext(SettingsContext)

  const {
    isLoading,
    isError,
    data: cinemas,
    refetch,
  } = useCinemas({ city: chosenCity })

  const router = useRouter()

  const cinemaButtons = useMemo(() => {
    return (cinemas || []).map((cinema) => ({
      cinema: cinema,
      followed: true,
    }))
  }, [cinemas])

  useEffect(() => {
    const fetchUser = async () => {
      if (session?.user?.email) {
        try {
          const user = await isUser({ email: session.user.email })
          if (user) {
            router.push('/')
          }
        } catch (error) {
          console.error('Error fetching user:', error)
        }
      } else {
        console.log('no session')
      }
    }

    fetchUser()
  }, [session])

  useEffect(() => {
    if (chosenCity) {
      refetch()
      setFollowedCinemas(cinemas || [])
    }
  }, [chosenCity])

  function handleCinemaToggle(cinema: Cinema, followed: boolean): void {
    if (followed) {
      setFollowedCinemas(followedCinemas.filter((c) => c.name !== cinema.name))
    } else {
      setFollowedCinemas([...followedCinemas, cinema])
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="text-center mb-12">
        <h1 className="font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
          <span className="text-4xl block">Welcome {session?.user?.name}</span>
        </h1>
      </div>

      <CityCountrySelect
        chosenCountry={chosenCountry}
        setChosenCountry={setChosenCountry}
        chosenCity={chosenCity}
        setChosenCity={setChosenCity}
        hideCityButton={true}
      />

      {chosenCountry && chosenCity && (
        <div className="bottom-40 flex flex-col items-center mt-12">
          {isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>Error loading cinemas.</div>
          ) : (
            <>
              <p>Unselect any cinemas you do not wish to see movies from</p>
              <div className="flex flex-wrap justify-center gap-4 w-full">
                {cinemaButtons.map((cinema) => (
                  <div
                    key={cinema.cinema.name}
                    className={`cinema-card p-4 w-72 h-40 rounded-lg shadow-lg transition-transform transform hover:scale-105 bg-white ${cinema.followed ? 'border-2 border-blue-500' : 'border'}`}
                    onClick={() =>
                      handleCinemaToggle(cinema.cinema, cinema.followed)
                    }
                  >
                    <div className="cinema-card-content text-center">
                      <h3 className="cinema-card-title text-lg font-semibold">
                        {cinema.cinema.name}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

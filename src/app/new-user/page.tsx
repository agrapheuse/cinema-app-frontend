'use client'

import CityCountrySelect from '@/components/CityCountrySelect'
import SettingsContext from '@/contexts/SettingsContext'
import { useCinemas } from '@/hooks/CustomHooks'
import { isUser } from '@/services/DataService'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'

export default function NewUser(): JSX.Element {
  const { data: session } = useSession()

  const [chosenCountry, setChosenCountry] = useState('')
  const [chosenCity, setChosenCity] = useState('')

  const { setCountry, setCity } = useContext(SettingsContext)

  const {
    isLoading,
    isError,
    data: cinemas,
    refetch,
  } = useCinemas({ city: chosenCity })

  const router = useRouter()

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
    }
  }, [chosenCountry, chosenCity])

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
        <div className="absolute bottom-40 flex flex-col items-center mt-12">
          {isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>Error loading cinemas.</div>
          ) : (
            <>
              <p>Unselect any cinemas you do not wish to see movies from</p>
              <ul>
                {cinemas?.map((cinema: any, index: number) => (
                  <li key={index} className="my-2">
                    <div className="text-lg font-semibold">{cinema.name}</div>
                    <div className="text-sm">{cinema.address}</div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  )
}

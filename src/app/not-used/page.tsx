'use client'

import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import CityCountrySelect from '@/components/CityCountrySelect'
import SettingsContext from '@/contexts/SettingsContext'
import { Button } from '@/components/ui/button'
import { FaRegCircleUser } from 'react-icons/fa6'
import { useSession } from 'next-auth/react'
import { signIn } from 'next-auth/react'

export default function Home(): JSX.Element {
  const { data: session } = useSession()

  const [chosenCountry, setChosenCountry] = useState('')
  const [chosenCity, setChosenCity] = useState('')

  const { setCountry, setCity } = useContext(SettingsContext)

  const router = useRouter()

  useEffect(() => {
    router.prefetch('/movies')
  }, [router])

  const handleExploreClick = (): void => {
    setCountry(chosenCountry)
    setCity(chosenCity)
    router.push('/movies')
  }

  const profilePage = (): void => {
    if (session) {
      router.push('/auth/profile')
    } else {
      signIn('google', { callbackUrl: `${process.env.NEXTAUTH_URL}/new-user` })
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="absolute top-4 right-4">
        <FaRegCircleUser
          className="text-4xl text-gray-200"
          onClick={profilePage}
        />
      </div>

      <div className="text-center mb-12">
        <h1 className="font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
          <span className="text-4xl block">Welcome to</span>
          <span className="text-6xl block">CineTracker</span>
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
          <p className="text-lg">
            <Button variant="secondary" onClick={handleExploreClick}>
              Explore Films
            </Button>
          </p>
        </div>
      )}
    </div>
  )
}

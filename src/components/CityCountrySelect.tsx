'use client'

import { countries } from '@/utils/countryCity'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import type { JSX } from 'react'

interface CityCountrySelectProps {
  chosenCountry: string
  setChosenCountry: (country: string) => void
  chosenCity: string
  setChosenCity: (city: string) => void
  hideCityButton: boolean
}

export default function CityCountrySelect({
  chosenCountry,
  setChosenCountry,
  chosenCity,
  setChosenCity,
}: CityCountrySelectProps): JSX.Element {
  const handleCountryChange = (value: string): void => {
    setChosenCountry(value)
    setChosenCity('')
  }

  const handleCityChange = (value: string): void => {
    setChosenCity(value)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full mb-5 flex items-center">
        <label className="block text-lg w-1/2 font-medium mr-5">
          Choose a country:
        </label>

        <Select
          value={chosenCountry}
          onValueChange={(e: string) => handleCountryChange(e)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((c) => (
              <SelectItem key={c.name} value={c.name}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full flex items-center">
        <label className="block text-lg w-1/2 font-medium mr-5">
          Choose a city:
        </label>
        <Select
          value={chosenCity}
          onValueChange={(e: string) => handleCityChange(e)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select City" />
          </SelectTrigger>
          <SelectContent>
            {countries
              .find((c) => c.name === chosenCountry)
              ?.cities.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

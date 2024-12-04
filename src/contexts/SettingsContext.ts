import { createContext } from 'react'

export interface ISettingsContext {
  country: string
  setCountry: React.Dispatch<React.SetStateAction<string>>
  city: string
  setCity: React.Dispatch<React.SetStateAction<string>>
  followedCinemas: string[]
  setFollowedCinemas: React.Dispatch<React.SetStateAction<string[]>>
  languageFilters: string[]
  setLanguageFilters: React.Dispatch<React.SetStateAction<string[]>>
}

export default createContext<ISettingsContext>({
  country: '',
  setCountry: () => {},
  city: '',
  setCity: () => {},
  followedCinemas: [],
  setFollowedCinemas: () => {},
  languageFilters: [],
  setLanguageFilters: () => {},
})

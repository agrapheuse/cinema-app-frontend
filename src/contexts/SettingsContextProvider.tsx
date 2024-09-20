"use client";

import { ReactNode, useState } from "react"
import SettingsContext from "./SettingsContext"
import { useLocalStorage } from 'usehooks-ts';

interface WithChildren {
    children: ReactNode | ReactNode[]
}

function SettingsContextProvider({ children }: WithChildren) {
    const [country, setCountry] = useState<string>('');
    const [city, setCity] = useLocalStorage<string>('user-city', '');
    const [followedCinemas, setFollowedCinemas] = useState<string[]>([]);
    const [languageFilters, setLanguageFilters] = useState<string[]>([]);

    const value = {
        country,
        setCountry,
        city,
        setCity,
        followedCinemas,
        setFollowedCinemas,
        languageFilters,
        setLanguageFilters,
    }

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    )
}

export default SettingsContextProvider;
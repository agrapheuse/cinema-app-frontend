"use client";

import { ReactNode, useState } from "react"
import CountryContext from "./CountryContext"

interface WithChildren {
    children: ReactNode | ReactNode[]
}

function CountryContextProvider({ children }: WithChildren) {
    const [country, setCountry] = useState<string>('')
    const [city, setCity] = useState<string>('')

    const value = {
        country,
        setCountry,
        city,
        setCity,
    }

    return (
        <CountryContext.Provider value={value}>
            {children}
        </CountryContext.Provider>
    )
}

export default CountryContextProvider;
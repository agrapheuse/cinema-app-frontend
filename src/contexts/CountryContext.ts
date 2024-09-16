import React, {createContext} from "react";

export interface ICountryContext {
    country: string;
    setCountry: React.Dispatch<React.SetStateAction<string>>;
    city: string;
    setCity: React.Dispatch<React.SetStateAction<string>>;
}

export default createContext<ICountryContext>({
    country: '',
    setCountry: () => {},
    city: '',
    setCity: () => {},
})
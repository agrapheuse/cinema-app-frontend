"use client"

import { countries } from "@/utils/countryCity";

interface CityCountrySelectProps {
    chosenCountry: string;
    setChosenCountry: (country: string) => void;
    chosenCity: string;
    setChosenCity: (city: string) => void;
    hideCityButton: boolean;
}

export default function CityCountrySelect({chosenCountry, setChosenCountry, chosenCity, setChosenCity, hideCityButton}: CityCountrySelectProps) {
    
    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setChosenCountry(e.target.value);
      setChosenCity(""); 
    };
  
    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setChosenCity(e.target.value);
    };
    
    return (
        <div>
            <div className="mt-5">
                <label
                    htmlFor="country-select"
                    className="block text-lg font-medium mb-2"
                >
                Choose a country:
                </label>
                <select
                    id="country-select"
                    value={chosenCountry}
                    onChange={handleCountryChange}
                    className="border border-gray-300 rounded p-2 w-full"
                >
                <option value="">-- Select Country --</option>
                {countries.map((c) => (
                    <option key={c.name} value={c.name}>
                    {c.name}
                    </option>
                ))}
                </select>
            </div>

        {(chosenCountry || !hideCityButton) && (
            <div className="mt-5">
            <label
                htmlFor="city-select"
                className="block text-lg font-medium mb-2"
            >
                Choose a city:
            </label>
            <select
                id="city-select"
                value={chosenCity}
                onChange={handleCityChange}
                className="border border-gray-300 rounded p-2 w-full"
            >
                <option value="">-- Select City --</option>
                {countries
                .find((c) => c.name === chosenCountry)
                ?.cities.map((city) => (
                    <option key={city} value={city}>
                    {city}
                    </option>
                ))}
            </select>
            </div>
        )}
      </div>
    )
}
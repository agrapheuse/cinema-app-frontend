"use client";

import { useContext, useState } from "react";
import CountryContext from "@/contexts/CountryContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const [chosenCountry, setChosenCountry] = useState("");
  const [chosenCity, setChosenCity] = useState("");

  const { setCountry, setCity } = useContext(CountryContext);

  const router = useRouter();

  const countries = [{ name: "Belgium", cities: ["Antwerp", "Brussels"] }];

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChosenCountry(e.target.value);
    setChosenCity(""); 
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChosenCity(e.target.value);
  };

  const handleExploreClick = () => {
    setCountry(chosenCountry);
    setCity(chosenCity);
    router.push('/movies');
  };


  return (
    <div className="p-8 font-sans">
      <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] hidden md:block">
        <span className="block">Welcome to</span>
        <span className="block">Cinema App</span>
      </h1>
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

      {chosenCountry && (
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

      {chosenCountry && chosenCity && (
        <div className="mt-5">
          <p className="text-lg">
          <button className="border border-gray-300 p-2 rounded" onClick={handleExploreClick}>
              Explore Films
            </button>
          </p>
        </div>
      )}
    </div>
  );
}

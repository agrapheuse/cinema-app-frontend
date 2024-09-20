"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import CityCountrySelect from "@/components/CityCountrySelect";
import SettingsContext from "@/contexts/SettingsContext";

export default function Home() {
  const [chosenCountry, setChosenCountry] = useState("");
  const [chosenCity, setChosenCity] = useState("");

  const { setCountry, setCity } = useContext(SettingsContext);
  
  const router = useRouter();

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
      <CityCountrySelect 
        chosenCountry={chosenCountry} 
        setChosenCountry={setChosenCountry} 
        chosenCity={chosenCity} 
        setChosenCity={setChosenCity}
        hideCityButton={true}>
      </CityCountrySelect>

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

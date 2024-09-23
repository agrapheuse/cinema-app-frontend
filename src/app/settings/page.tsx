"use client"

import CityCountrySelect from "@/components/CityCountrySelect";
import { Button } from "@/components/ui/button";
import SettingsContext from "@/contexts/SettingsContext";
import { useCinemas } from "@/hooks/CustomHooks";
import { useRouter } from "next/navigation";
import { useContext, useMemo, useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";

export default function Settings() {
    const { country, setCountry, city, setCity, followedCinemas, setFollowedCinemas} = useContext(SettingsContext);

    const [chosenCountry, setChosenCountry] = useState(country);
    const [chosenCity, setChosenCity] = useState(city);  
    const { isLoading, isError, cinemas } = useCinemas({city});

    const router = useRouter();

    const cinemaButtons = useMemo(() => {
        return cinemas.map((cinema) => ({
            cinemaName: cinema,
            followed: followedCinemas.includes(cinema)
        }));
    }, [cinemas, followedCinemas]);

    const handleSaveChanges = () => {
        setCountry(chosenCountry);
        setCity(chosenCity);
    }

    function handleCinemaToggle(cinema: string, followed: boolean): void {
        if (followed) {
            setFollowedCinemas(followedCinemas.filter((c) => c !== cinema));
        } else {
            setFollowedCinemas([...followedCinemas, cinema]);
        }
    }

    return (
        <div>
            <nav className="bg-gray-800 text-white p-4 relative flex items-center">
                <div className="text-xl" onClick={() => router.back()}>
                    <IoArrowBackCircleOutline />
                </div>
                
                <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold">Settings</h1>
            </nav>
    
            <div className="flex flex-col items-center space-y-4">
                <CityCountrySelect 
                    chosenCountry={chosenCountry} 
                    setChosenCountry={setChosenCountry} 
                    chosenCity={chosenCity} 
                    setChosenCity={setChosenCity}
                    hideCityButton={false}>
                </CityCountrySelect>

                {isLoading && <div>Loading...</div>}
                {isError && <div>Error loading cinemas.</div>}

                <div className="flex flex-wrap justify-center gap-4 w-full">
                    {cinemaButtons.map((cinema) => (
                        <div
                            key={cinema.cinemaName}
                            className={`cinema-card p-4 w-72 h-40 rounded-lg shadow-lg transition-transform transform hover:scale-105 bg-white ${cinema.followed ? 'border-2 border-blue-500' : 'border'}`}
                            onClick={() => handleCinemaToggle(cinema.cinemaName, cinema.followed)}
                        >
                            <div className="cinema-card-content text-center">
                                <h3 className="cinema-card-title text-lg font-semibold">{cinema.cinemaName}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                <Button onClick={handleSaveChanges}>Save Changes</Button>
            </div>
        </div>
    );
}

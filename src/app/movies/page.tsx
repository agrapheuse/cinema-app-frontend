"use client"

import SettingsContext from "@/contexts/SettingsContext";
import { useMovies } from "@/hooks/CustomHooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { FaCog, FaUserCircle } from "react-icons/fa";

export default function MovieHome() {
  const { city } = useContext(SettingsContext);
  const { isLoading, isError, movies } = useMovies({city});

  const router = useRouter();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading movies.</div>;
  }

  console.log(movies)

  return (
    <div>
      <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="text-xl" onClick={() => router.push("/settings")}>
          <FaCog />
        </div>

        <h1 className="text-2xl font-bold">Movies</h1>

        <div className="text-xl">
          <FaUserCircle />
        </div>
      </nav>

      <div className="container mx-auto p-4">
        <div className="space-y-4">
          {movies?.map((movie) => (
            <div
            key={movie.uuid}
            className="relative bg-white rounded-lg shadow-md p-4 flex justify-between items-center"
          >
            <div className="w-1/4 pr-4">
              <Image
                src={movie.imageUrl}
                alt={movie.title || ""}
                width={500}
                height={192}
                className="w-full h-48 object-cover rounded-md"
              />
            </div>

            <div className="w-1/2 flex flex-col justify-center items-center">
              <h2 className="text-xl font-semibold mb-1">{movie.title}</h2>
              <p className="text-gray-600 mb-1">{movie.director}</p>
              <p className="text-gray-600 mb-1">{movie.category}</p>
              <p className="text-gray-600 mb-2">{movie.description}</p>
              
              <div className="absolute inset-x-0 bottom-0 flex justify-center p-4">
                <a
                  href={movie.infoLink}
                  target="_blank"
                  className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
                  rel="noopener noreferrer"
                >
                  More
                </a>
              </div>
            </div>

            <div className="w-1/4 flex flex-col items-end">
              <a
                href={movie.infoLink}
                target="_blank"
                className="text-blue-500 hover:underline mb-2"
                rel="noopener noreferrer"
              >
                More Info
              </a>
              {movie.ticketLink && (
                <a
                  href={movie.ticketLink}
                  target="_blank"
                  className="text-green-500 hover:underline"
                  rel="noopener noreferrer"
                >
                  Buy Tickets
                </a>
              )}
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
}

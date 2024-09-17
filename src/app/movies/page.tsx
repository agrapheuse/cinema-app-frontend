"use client"

import { useMovies } from "@/hooks/CustomHooks";
import Image from "next/image";
import { FaCog, FaUserCircle } from "react-icons/fa";

export default function MovieHome() {
  const { isLoading, isError, movies } = useMovies();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading movies.</div>;
  }

  return (
    <div>
      <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-xl">
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
            className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center"
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

            <div className="w-1/2">
              <h2 className="text-xl font-semibold mb-1">{movie.title}</h2>
              <p className="text-gray-600 mb-1">{movie.director}</p>
              <p className="text-gray-600 mb-1">{movie.category}</p>
              <p className="text-gray-600 mb-2">{movie.description}</p>
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

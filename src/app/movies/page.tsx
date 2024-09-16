"use client"

import { useMovies } from "@/hooks/CustomHooks";
import Image from "next/image";

export default function MovieHome() {
  const { isLoading, isError, movies } = useMovies();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading movies.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies?.map((movie) => (
          <div
            key={movie.uuid}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
          >
            <Image
              src={movie.imageUrl}
              alt={movie.title || ""}
              width={500} 
              height={192}     
              className="w-full h-48 object-cover rounded-t-md mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
            <p className="text-gray-600 mb-2">{movie.director}</p>
            <p className="text-gray-600 mb-2">{movie.category}</p>
            <p className="text-gray-600 mb-4">{movie.description}</p>
            <div className="flex justify-between items-center">
              <a
                href={movie.infoLink}
                target="_blank"
                className="text-blue-500 hover:underline"
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
  );
}

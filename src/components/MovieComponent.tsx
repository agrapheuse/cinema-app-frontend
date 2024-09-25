"use client"

import { Movie } from "@/types/Movie";
import { useRouter } from "next/navigation";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Image from "next/image";

const MovieComponent = ({ movie }: { movie: Movie }) => {
    const router = useRouter();
  
    const handleBackClick = () => {
      router.back(); // You can now use the router to go back
    };
  
    return (
      <div>
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
          <div className="text-xl cursor-pointer" onClick={handleBackClick}>
            <IoArrowBackCircleOutline />
          </div>
          
          <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold">
            {movie.title}
          </h1>
        </nav>
  
        <div className="container mx-auto p-4">
          <Image
            src={movie.imageUrl}
            alt={movie.title ?? ""}
            width={1000}
            height={1000}
            className="w-full h-auto object-cover rounded-md"
          />
          <p>{movie.description}</p>
          {/* Add more movie details here */}
        </div>
      </div>
    );
  };

  export default MovieComponent
  
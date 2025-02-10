import {
  getMovieDetails,
  getMovieId,
  getMovieImages,
} from "@/services/DataService";
import type { Movie } from "@/types/Movie";
import { TMDBMovie } from "@/types/TMDB/TMDBMovie";
import { useEffect, useState, type JSX } from "react";

export const MovieDetail = ({
  movie,
  setMovieDetail,
}: {
  movie: Movie | null;
  setMovieDetail: React.Dispatch<React.SetStateAction<Movie | null>>;
}): JSX.Element => {
  const [images, setImages] = useState<string[]>([]);
  const [movieDetails, setMovieDetails] = useState<TMDBMovie | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async (): Promise<void> => {
      if (!movie?.title) {
        return;
      }

      try {
        const id = await getMovieId({ title: movie.title });

        const details = await getMovieDetails({ id: id });
        const movieImages = await getMovieImages({ id: id }).then((images) =>
          images.slice(0, 6),
        );

        setMovieDetails(details);
        setImages(movieImages);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    void fetchMovieDetails();
  }, [movie]);

  const likeShowing = (id: string) => {
    console.log("like showing" + id);
  };

  return (
    <div className="w-[70%] bg-white flex flex-col">
      <img
        src={images[0]}
        alt="Movie Background"
        className="w-full h-96 object-cover"
      />

      <button
        className="absolute top-4 left-4 bg-white text-black rounded-full p-2"
        onClick={() => setMovieDetail(null)}
      >
        ✕
      </button>

      <div className="flex flex-row">
        <div className="p-6 bg-white w-[50%]">
          <h1 className="text-2xl font-bold">{movie?.title}</h1>
          <div className="text-sm text-gray-700 mt-2">
            <span>Director: {movie?.director}</span> ·{" "}
            <span>Length: {movieDetails?.runtime}"</span>
          </div>
          <p className="mt-4 text-gray-800">{movie?.description}</p>
          <p className="mt-2 text-gray-700">
            <strong>Genre: placeholder</strong>
          </p>
        </div>

        <div className="p-6 bg-gray-100 w-[50%]">
          <h2 className="text-xl font-semibold">Showing(s)</h2>
          <ul className="mt-4 space-y-4">
            {movie?.showings.map((s) => (
              <li key={s.id} className="flex items-center">
                <button
                  className="w-4 h-4 mr-2 rounded-full border-2 border-black bg-transparent hover:bg-black hover:text-white transition-colors"
                  onClick={() => likeShowing(s.id)}
                ></button>
                <div className="flex-1">
                  <span>{s.dateTime}</span> · <span>{s.dateTime}</span>
                </div>
                <img
                  src={movie.cinema.logoUrl}
                  alt="Movie Background"
                  className="w-16 object-cover"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-6 bg-white">
        <h2 className="text-xl font-semibold mb-4">Movie Images</h2>
        <div className="grid grid-cols-3 gap-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Movie Image ${index + 1}`}
              className="w-full h-40 object-cover rounded-md"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

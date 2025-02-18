import {
  getMovieDetails,
  getMovieId,
  getMovieImages,
  likeShowing,
} from "@/services/DataService";
import type { Movie } from "@/types/Movie";
import { TMDBMovie } from "@/types/TMDB/TMDBMovie";
import { useEffect, useState, type JSX } from "react";
import { useSession } from "next-auth/react";

export const MovieDetail = ({
  movie,
  setMovieDetail,
}: {
  movie: Movie | null;
  setMovieDetail: React.Dispatch<React.SetStateAction<Movie | null>>;
}): JSX.Element => {
  const [images, setImages] = useState<string[]>([]);
  const [movieDetails, setMovieDetails] = useState<TMDBMovie | null>(null);

  const { data: session } = useSession();
  console.log(session);

  useEffect(() => {
    const fetchMovieDetails = async (): Promise<void> => {
      if (!movie?.title) {
        return;
      }

      try {
        const id = await getMovieId({ title: movie.title });

        const details = await getMovieDetails({ id: id });
        const movieImages = await getMovieImages({ id: id }).then((images) =>
          images.slice(0, 3),
        );

        setMovieDetails(details);
        setImages(movieImages);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    void fetchMovieDetails();
  }, [movie]);

  const addShowingToCalendar = (showing: string): void => {
    likeShowing({ userId: session?.user?.id, showingId: showing });
  };

  return (
    <div className="w-full bg-white flex flex-col">
      <div className="flex flex-row p-6">
        <div className="w-2/5 flex flex-col space-y-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Movie Image ${index + 1}`}
              className="w-full h-60 object-cover rounded-md"
            />
          ))}
        </div>

        <div className="w-3/5 px-8">
          <text
            className="text-sm text-gray-600 underline cursor-pointer"
            onClick={() => setMovieDetail(null)}
          >
            {"BACK"}
          </text>
          <h1 className="text-4xl font-bold text-blue-600 ">{movie?.title}</h1>
          <p className="text-blue-600 text-lg mt-2">
            Director: {movie?.director}
          </p>
          <p className="text-gray-700 mt-1">
            Duration: {movieDetails?.runtime} min
          </p>
          <p className="mt-4 text-gray-800">{movie?.description}</p>

          <p className="mt-2 text-blue-500">
            <strong>Genre: {movieDetails?.genres.map((g) => g.name)}</strong>
          </p>

          <ul className="mt-3 space-y-3">
            {movie?.showings
              .sort(
                (s1, s2) =>
                  new Date(s1.dateTime).getTime() -
                  new Date(s2.dateTime).getTime(),
              )
              .map((s) => (
                <li key={s.id} className="flex justify-between items-center">
                  <span className="text-gray-800">{s.dateTime.toString()}</span>
                  {session ? (
                    <button
                      className="text-blue-600 font-semibold"
                      onClick={() => addShowingToCalendar(s.id)}
                    >
                      Add to Calendar
                    </button>
                  ) : null}
                </li>
              ))}
          </ul>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-blue-600">
              About CINEMATEK
            </h2>
            <img
              src="/path-to-cinematek-image.jpg"
              alt="Cinematek"
              className="w-full mt-3 rounded-md"
            />
            <p className="text-gray-700 mt-2">
              La Cinémathèque royale, principale archive de cinéma en Belgique,
              a pour mission de préserver non seulement les films mais également
              tout ce qui touche à l’histoire du cinéma...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

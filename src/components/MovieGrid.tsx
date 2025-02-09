import { JSX, useEffect, useState } from "react";
import { CinemaButtons } from "./CinemaButtons";
import MovieComponent from "./MovieComponent";
import { useMovies, useCinemas } from "@/hooks/CustomHooks";
import { Movie } from "@/types/Movie";

export const MovieGrid = ({
  setMovieDetail,
}: {
  setMovieDetail: React.Dispatch<React.SetStateAction<Movie | null>>;
}): JSX.Element => {
  const [city] = useState("Antwerp");
  const [currentCol, setCurrentCol] = useState(0);
  const [preferredCinemas, setPreferredCinemas] = useState<string[]>([]);

  const { data: movies, refetch: refetchMovies } = useMovies({ city });

  const { data: cinemas, refetch: refetchCinemas } = useCinemas({ city });

  useEffect(() => {
    void refetchMovies();
    void refetchCinemas();
  }, [city, refetchMovies, refetchCinemas]);

  useEffect(() => {
    if (cinemas) {
      setPreferredCinemas(cinemas.map((c) => c.uuid).filter(Boolean));
    }
  }, [cinemas]);

  const handleScroll = (e: React.WheelEvent): void => {
    if (currentCol === 0 && e.deltaY < 0) {
      return;
    }

    const newCol = e.deltaY > 0 ? currentCol + 4 : currentCol - 4;
    setCurrentCol(newCol);

    setTimeout(() => {
      const col = document.getElementById("col" + newCol);

      if (col) {
        col.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
  };

  const filteredMovies =
    movies?.filter((m) => preferredCinemas.includes(m.cinema.uuid)) || [];

  return (
    <div className="w-[70%] bg-white pl-4 py-4">
      <div className="flex flex-row flex-wrap">
        <CinemaButtons
          cinemas={cinemas}
          preferredCinemas={preferredCinemas}
          setPreferredCinemas={setPreferredCinemas}
        />
      </div>
      {movies === undefined || movies.length === 0 ? (
        <div>No movies available</div>
      ) : (
        <div className="overflow-x-auto h-[93%] pt-2" onWheel={handleScroll}>
          <div className="grid grid-rows-4 grid-flow-col gap-4">
            {filteredMovies.map((m, index) => (
              <MovieComponent
                id={"col" + index}
                key={index}
                movie={m}
                setMovieDetail={setMovieDetail}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

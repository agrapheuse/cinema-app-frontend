"use client";

import type { JSX } from "react";
import { useEffect, useState } from "react";
import type { Movie } from "@/types/Movie";
import { MovieDetail } from "@/components/MovieDetails";
import { MovieGrid } from "@/components/MovieGrid";

export default function LandingPage(): JSX.Element {
  const [movieDetail, setMovieDetail] = useState<Movie | null>(() =>
    JSON.parse(localStorage.getItem("movieDetail") ?? "null")
  );

  useEffect(() => {
    if (movieDetail) {
      localStorage.setItem("movieDetail", JSON.stringify(movieDetail));
    } else {
      localStorage.removeItem("movieDetail");
    }
  }, [movieDetail]);

  return (
    <div className="flex h-screen">
      <div className="w-[30%] bg-gray-200 p-4 flex flex-col"></div>
      {movieDetail === null ? (
        <MovieGrid setMovieDetail={setMovieDetail} />
      ) : (
        <MovieDetail movie={movieDetail} setMovieDetail={setMovieDetail} />
      )}
    </div>
  );
}

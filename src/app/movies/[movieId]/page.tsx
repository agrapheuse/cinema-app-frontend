import { Movie } from "@/types/Movie";
import MovieComponent from "@/components/MovieComponent";
import { getMovie, getMovies } from "@/services/DataService";

interface MovieRouteProps {
  params: { movieId: string };
}

const MovieRoute = async ({ params }: MovieRouteProps) => {
  const { movieId } = params;
  
  const movie = await getMovie({uuid : movieId})

  return <MovieComponent movie={movie} />;
};

export async function generateStaticParams() {
  const movies = await fetch(`${process.env.URL}/api/movies`)
    .then((res) => res.json());

  return movies.map((movie: Movie) => ({
    movieId: movie.uuid,
  }));
}

export default MovieRoute;

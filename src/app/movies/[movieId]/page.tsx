import { Movie } from "@/types/Movie";
import Image from 'next/image';

interface MovieRouteProps {
  params: { movieId: string };
}

const MovieRoute = async ({ params }: MovieRouteProps) => {
  const { movieId } = params;

  const movie: Movie = await fetch(`${process.env.URL}/api/movies/movie/${movieId}`)
    .then((res) => res.json());

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{movie.title}</h1>
      <Image
        src={movie.imageUrl}
        alt={movie.title}
        width={1000}
        height={1000}
        className="w-full h-auto object-cover rounded-md"
      />
      <p>{movie.description}</p>
      {/* Add more movie details here */}
    </div>
  );
};

export async function generateStaticParams() {
  const movies = await fetch(`${process.env.URL}/api/movies`)
    .then((res) => res.json());

  return movies.map((movie: Movie) => ({
    movieId: movie.uuid,
  }));
}

export default MovieRoute;

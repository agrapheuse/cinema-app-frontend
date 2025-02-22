import type { Cinema } from "@/types/Cinema";
import type { Movie } from "@/types/Movie";
import { TMDBBackdrop } from "@/types/TMDB/TMDBBackdrop";
import { TMDBMovie } from "@/types/TMDB/TMDBMovie";
import { TMDBQueryResult } from "@/types/TMDB/TMDBQueryResult";
import axios from "axios";
import { LikedShowing } from "@/types/Showing";

export const getMovies = async ({
  city,
}: {
  city: string | null;
}): Promise<Movie[]> => {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
  let url;
  city ? (url = `/api/movies/${city}`) : (url = `/api/movies`);
  const movies = await axios.get<Movie[]>(url);
  return movies.data;
};

export const getMovie = async ({ uuid }: { uuid: string }): Promise<Movie> => {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
  const url = `/api/movies/movie/${uuid}`;
  const movie = await axios.get<Movie>(url);
  return movie.data;
};

export const getCinemas = async ({
  city,
}: {
  city: string;
}): Promise<Cinema[]> => {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
  const url = `/api/cinemas/${city}`;
  const cinemas = await axios.get<Cinema[]>(url);
  return cinemas.data;
};

export const isUser = async ({
  email,
}: {
  email: string;
}): Promise<boolean> => {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
  const url = `/api/users/userExists/${email}`;
  const users = await axios.get<boolean>(url);
  return users.data;
};

export const getMovieId = async ({
  title,
}: {
  title: string;
}): Promise<number> => {
  const url = "https://api.themoviedb.org/3/search/movie?query=" + title;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + process.env.NEXT_PUBLIC_TMDB_API_KEY,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const filteredData = data.results.filter(
      (r: TMDBQueryResult) => r.title == title,
    );
    return filteredData[0].id;
  } catch (err) {
    console.error("Error fetching movie ID:", err);
    throw err;
  }
};

export const getMovieDetails = async ({
  id,
}: {
  id: number;
}): Promise<TMDBMovie> => {
  const url = "https://api.themoviedb.org/3/movie/" + id;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + process.env.NEXT_PUBLIC_TMDB_API_KEY,
    },
  };

  try {
    const response = await fetch(url, options);

    return await response.json();
  } catch (err) {
    console.error("Error fetching movie ID:", err);
    throw err;
  }
};

export const getMovieImages = async ({
  id,
}: {
  id: number;
}): Promise<string[]> => {
  const url = "https://api.themoviedb.org/3/movie/" + id + "/images";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + process.env.NEXT_PUBLIC_TMDB_API_KEY,
    },
  };

  try {
    const response = await fetch(url, options);

    const data = await response.json();
    return data.backdrops.map(
      (b: TMDBBackdrop) => process.env.NEXT_PUBLIC_BACKDROP_URL + b.file_path,
    );
  } catch (err) {
    console.error("Error fetching movie ID:", err);
    throw err;
  }
};

export const likeShowing = async ({
  userId,
  showingId,
}: {
  userId: string;
  showingId: string;
}): Promise<void> => {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
  const url = `/api/users/like`;
  const body = {
    userId,
    showingId,
  };
  await axios.post(url, body);
};

export const getUserLikes = async ({
  userId,
}: {
  userId: string;
}): Promise<LikedShowing[]> => {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
  const url = `/api/users/${userId}/likes`;
  const likes = await axios.get<LikedShowing[]>(url);
  return likes.data;
};

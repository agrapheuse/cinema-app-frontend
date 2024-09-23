import { Movie } from "@/types/Movie";
import axios from "axios";

export const getMovies = async ({city}: {city: string | null}) => {
    axios.defaults.baseURL = 'https://localhost:5001'
    let url;
    city ? url = `/api/movies/${city}` : url = `/api/movies`;
    const movies = await axios.get<Movie[]>(url)
    return movies.data
}

export const getCinemas = async ({city} : {city: string}) => {
    axios.defaults.baseURL = 'https://localhost:5001'
    const url = `/api/movies/cinemas/${city}`
    const cinemas = await axios.get<string[]>(url)
    return cinemas.data;
}
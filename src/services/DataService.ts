import { Movie } from "@/types/Movie";
import axios from "axios";

export const getMovies = async () => {
    axios.defaults.baseURL = 'https://localhost:5001'
    const url = `/api/movies`
    const movies = await axios.get<Movie[]>(url)
    return movies.data
} 
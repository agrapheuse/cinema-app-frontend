import { getMovies } from '@/services/DataService'
import { useQuery } from 'react-query'

export function useMovies() {
    const {
        isLoading,
        isError,
        data: movies,
        refetch,
    } = useQuery(['movies'], () => getMovies())

    return {
        isLoading,
        isError,
        movies: movies || [],
        refetch,
    }
}


import { getCinemas, getMovies } from '@/services/DataService'
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

export function useCinemas({city}: {city: string}) {
    const {
        isLoading,
        isError,
        data: cinemas,
        refetch,
    } = useQuery(['cinemas'], () => getCinemas({city}))

    return {
        isLoading,
        isError,
        cinemas: cinemas || [],
        refetch,
    }
}
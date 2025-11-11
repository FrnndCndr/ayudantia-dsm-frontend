import { useQuery } from '@tanstack/react-query';
import { musicService } from '../api/musicService';

export const useSongs = () => {
  const {
    data: songs = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['songs'],
    queryFn: musicService.getAllSongs,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  return {
    songs,
    isLoading,
    error,
    refetch,
  };
};

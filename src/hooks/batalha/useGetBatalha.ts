import {useQuery} from '@tanstack/react-query';
import api from '@/api/api';

export const useGetBatalha = ({id}: {id: string}) => {
  return useQuery({
    queryKey: ['batalha', id],
    queryFn: async () => {
      const response = await api.get(`/batalha/${id}/startups`);
      return response.data;
    }
    ,
    enabled: !!id,
    retry: false,
    refetchOnWindowFocus: true,
    });
}
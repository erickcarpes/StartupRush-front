import {useQuery} from '@tanstack/react-query';
import api from '@/api/api';

export const useGetTorneioEmAndamento = () => {
    return useQuery({
        queryKey: ['torneioEmAndamento'],
        queryFn: async () => {
            const response = await api.get(`/torneios/andamento`);
            return response.data;
        },
        refetchOnWindowFocus: true,
        retry: false,
    });
}
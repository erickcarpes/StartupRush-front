import {useQuery} from '@tanstack/react-query';
import api from '@/api/api';

export const useGetRanking = () => {
    return useQuery({
        queryKey: ['ranking'],
        queryFn: async () => {
        const response = await api.get(`/ranking`);
        return response.data;
        },
        refetchOnWindowFocus: true,
        retry: false,
    });
    }
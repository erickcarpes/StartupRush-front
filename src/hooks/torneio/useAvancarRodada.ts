import {useMutation} from '@tanstack/react-query';
import api from '@/api/api';

export const useAvancarRodada = ({
    onSuccess,
    onError,
    }: {
    onSuccess?: () => void;
    onError?: (error: unknown) => void;
    }) => {
    return useMutation({
        mutationFn: async (id: string) => {
            const response = await api.post(`/torneio/${id}/avancar`);
            console.log('useAvancarRodada', id, response.data);
        return response.data;
        },
        onError: (error) => {
        if (onError) onError(error);
        },
        onSuccess: () => {
        if (onSuccess) onSuccess();
        },
    });
    }
import { useMutation } from "@tanstack/react-query";
import api from "@/api/api";

export const useStartBatalha = ({
    onSuccess,
    onError,
    }: {
    onSuccess?: () => void;
    onError?: (error: unknown) => void;
    }) => {
    return useMutation({
        mutationFn: async (batalha_id: string) => {
        const response = await api.post(`/batalha/${batalha_id}/iniciar`);
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

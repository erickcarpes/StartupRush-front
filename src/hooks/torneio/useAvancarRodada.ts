import { useMutation } from "@tanstack/react-query";
import api from "@/api/api";

export const useAvancarRodada = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}) => {
  return useMutation({
    mutationFn: async () => {
      const response = await api.post(`/torneio/avancar`);
      return response.data;
    },
    onError: (error) => {
      if (onError) onError(error);
    },
    onSuccess: () => {
      if (onSuccess) onSuccess();
    },
  });
};

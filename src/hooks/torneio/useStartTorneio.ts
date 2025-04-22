import { useMutation } from "@tanstack/react-query";
import api from "@/api/api";

export const useStartTorneio = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}) => {
  return useMutation({
    mutationFn: async (torneio_id: string) => {
      const response = await api.post(`/torneio/${torneio_id}/iniciar`);
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

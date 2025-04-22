import { useMutation } from "@tanstack/react-query";
import api from "@/api/api";

interface AdicionarStartupTorneio {
  torneio_id: string;
  startup_id: string;
}

export const useAddStartupTorneio = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}) => {
  return useMutation({
    mutationFn: async ({ torneio_id, startup_id }: AdicionarStartupTorneio) => {
      const response = await api.post(`/torneio/${torneio_id}/startup`, {
        startup_id,
      });
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

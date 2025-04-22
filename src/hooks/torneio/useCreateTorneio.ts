import { useMutation } from "@tanstack/react-query";
import api from "@/api/api";

interface NovoTorneio {
  nome: string;
}

export const useCriarTorneio = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}) => {
  return useMutation({
    mutationFn: async (nome: NovoTorneio) => {
      const response = await api.post(`/torneio`, nome);
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

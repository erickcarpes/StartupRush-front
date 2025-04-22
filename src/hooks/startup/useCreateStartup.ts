import { useMutation } from "@tanstack/react-query";
import api from "@/api/api";

interface NovaStartup {
  nome: string;
  slogan: string;
  anoFundacao: number;
}

export const useCreateStartup = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}) => {
  return useMutation({
    mutationFn: async (startup: NovaStartup) => {
      const response = await api.post(`/startup`, startup);
      return response.data;
    },
    onError: (error) => {
      console.error("Erro ao criar startup:", error);
      if (onError) onError(error);
    },
    onSuccess: () => {
      console.log("Startup criada com sucesso!");
      if (onSuccess) onSuccess();
    },
  });
};

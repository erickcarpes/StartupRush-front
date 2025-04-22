import { useMutation } from "@tanstack/react-query";
import api from "@/api/api";

type Evento = {
  startup_id: string;
  pitchConvincente: boolean;
  produtoComBugs: boolean;
  tracaoUsuarios: boolean;
  investidorIrritado: boolean;
  fakeNews: boolean;
};

type EndBatalhaParams = {
  batalhaId: string;
  eventos: Evento[];
};

export const useEndBatalha = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}) => {
  return useMutation({
    mutationFn: async ({ batalhaId, eventos }: EndBatalhaParams) => {
      const response = await api.post(
        `/batalha/${batalhaId}/encerrar`,
        {eventos}
      );
      console.log("Response:", response.data); // Log the response data
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

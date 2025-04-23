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

interface EndBatalhaResponse {
  message: string;
  vencedor: {
    nome: string;
    slogan: string;
  };
  pontosVencedor: number;
  rodada: string;
  pontuacao: {
    startup_id: string
    nome: string
    pontos: number
  }[]
  empate: boolean;
};

// Define the EndBatalhaParams type
type EndBatalhaParams = {
  batalhaId: string;
  eventos: Evento[];
};

export const useEndBatalha = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: EndBatalhaResponse) => void;
  onError?: (error: unknown) => void;
}) => {
  return useMutation({
    mutationFn: async ({ batalhaId, eventos }: EndBatalhaParams) => {
      const response = await api.post(
        `/batalha/${batalhaId}/encerrar`,
        {eventos}
      );
      return response.data;
    },
    onError: (error) => {
      if (onError) onError(error);
    },
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data);
    },
  });
};

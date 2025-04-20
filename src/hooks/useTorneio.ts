import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

interface NovoTorneio {
  nome: string;
}

interface AdicionarStartupAoTorneio {
  torneioId: string;
  startupId: string;
}

export const useCriarTorneio = () => {
  return useMutation({
    mutationFn: async (nome: NovoTorneio) => {
      const response = await axios.post(`${API_BASE_URL}/torneio`, nome);
      return response.data;
    },
    onError: (error) => {
      console.error("Erro ao criar torneio:", error);
    },
    onSuccess: () => {
      console.log("Torneio criado com sucesso!");
    },
  });
};

export const useBuscarTorneios = () => {
  return useQuery({
    queryKey: ["torneios"],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/torneios`);
      return response.data;
    },
  });
};

export const useAdicionarStartupAoTorneio = () => {
  return useMutation({
    mutationFn: async ({torneioId, startupId}: AdicionarStartupAoTorneio) => {
      const response = await axios.post(
        `${API_BASE_URL}/torneio/${torneioId}/startup`,
        { startupId }
      );
      return response.data;
    },
    onError: (error) => {
      console.error("Erro ao adicionar startup ao torneio:", error);
    },
    onSuccess: () => {
      console.log("Startup adicionada ao torneio com sucesso!");
    },
  });
};

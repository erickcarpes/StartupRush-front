import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

interface NovaStartup {
  nome: string;
  slogan: string;
  anoFundacao: number;
}

export const useCriarStartup = () => {
  return useMutation({
    mutationFn: async (startup: NovaStartup) => {
      const response = await axios.post(`${API_BASE_URL}/startup`, startup);
      return response.data;
    },
    onError: (error) => {
      console.error("Erro ao criar startup:", error);
    },
    onSuccess: () => {
      console.log("Startup criada com sucesso!");
    },
  });
};

export const useBuscarStartups = () => {
  return useQuery({
    queryKey: ["startups"],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/startups`);
      return response.data;
    },
  });
};

import { useQuery } from "@tanstack/react-query";
import api from "@/api/api";

export const useGetTorneioNaoFinalizado = () => {
  return useQuery({
    queryKey: ["torneioNaoFinalizado"],
    queryFn: async () => {
      const response = await api.get(`/torneios/nao-finalizado`);
      return response.data;
    },
    refetchOnWindowFocus: true,
    retry: false,
  });
};


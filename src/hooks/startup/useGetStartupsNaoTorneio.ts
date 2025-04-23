import { useQuery } from "@tanstack/react-query";
import api from "@/api/api";

interface Startup {
  id: string;
  nome: string;
}

export const useGetStartupsNaoTorneio = () => {
  return useQuery<Startup[]>({
    queryKey: ["startupsNaoTorneio"],
    queryFn: async () => {
      const response = await api.get(`/torneios/startupsNaoTorneio`);
      return response.data ?? [];
    },
    refetchOnWindowFocus: true,
    retry: false,
  });
};

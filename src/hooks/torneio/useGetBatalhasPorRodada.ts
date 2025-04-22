import { useQuery } from "@tanstack/react-query";
import api from "@/api/api";

type Startup = {
  startup_id: string;
  nome: string;
};

type BatalhaComStartups = {
  id: string;
  participantes: Startup[];
};

export function useGetBatalhasRodada(torneioId?: string) {
    console.log("useGetBatalhasRodada", torneioId);
  return useQuery<BatalhaComStartups[]>({
    queryKey: ["batalhasRodada", torneioId],
    queryFn: async () => {
      const { data } = await api.get(`/torneio/${torneioId}/batalhas`);
      return data;
    },
    enabled: !!torneioId,
  });
}

import { useQuery } from "@tanstack/react-query";
import api from "@/api/api";

export const useGetTorneioAguardando = () => {
  return useQuery({
    queryKey: ["torneioAguardando"],
    queryFn: async () => {
      const response = await api.get(`/torneios/aguardando`);
      return response.data;
    },
    refetchOnWindowFocus: true,
    retry: false,
  });
};

import { useQuery } from "@tanstack/react-query";
import api from "@/api/api";

export const useGetUltimoTorneio = () => {
  return useQuery({
    queryKey: ["torneio"],
    queryFn: async () => {
      const response = await api.get(`/torneios/ultimo`);
      console.log("useGetTorneio", response.data);
      return response.data;
    },
    refetchOnWindowFocus: true,
    retry: false,
  });
  
};

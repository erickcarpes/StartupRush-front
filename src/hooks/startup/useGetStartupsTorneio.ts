import { useQuery } from "@tanstack/react-query";
import api from "@/api/api";

export const useGetStartupsTorneio = () => {
  return useQuery({
    queryKey: ["startupsRanking"],
    queryFn: async () => {
      const response = await api.get(`/torneio/startups/ranking`);
      return response.data;
    },
    refetchOnWindowFocus: true,
    retry: false,
  });
}
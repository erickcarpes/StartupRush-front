import { useQuery } from "@tanstack/react-query";
import api from "@/api/api";

export const useGetStartupsTorneio = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ["startupsRanking", id],
    queryFn: async () => {
      const response = await api.get(`/torneio/${id}/startupsRanking`);
      return response.data;
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
    retry: false,
  });
}
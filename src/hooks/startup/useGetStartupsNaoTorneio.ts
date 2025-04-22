import { useQuery } from "@tanstack/react-query";
import api from "@/api/api";

export const useGetStartupsNaoTorneio = ({ id }: { id: string; }) => {
  return useQuery({
    queryKey: ["startupsNaoTorneio", id],
    queryFn: async () => {
      const response = await api.get(`/torneio/${id}/startupsNaoTorneio`);
      return response.data;
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

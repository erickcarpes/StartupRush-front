import { useQuery } from "@tanstack/react-query";
import api from "@/api/api";

export const useGetTorneio = () => {
  return useQuery({
    queryKey: ["torneios"],
    queryFn: async () => {
      const response = await api.get(`/torneios`);
      return response.data;
    },
  });
};

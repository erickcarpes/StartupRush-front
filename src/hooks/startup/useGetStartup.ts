import { useQuery } from "@tanstack/react-query";
import api from "@/api/api";

export const useGetStartup = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ["startup", id],
    queryFn: async () => {
      const response = await api.get(`/startup/${id}`);
      return response.data;
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
    retry: false,
  });
}
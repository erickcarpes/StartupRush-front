import { AxiosError } from "axios";

export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data;

    // Caso a mensagem esteja em data.message
    if (data && typeof data === "object" && "message" in data) {
      return (data as { message: string }).message;
    }

    // Caso a mensagem seja uma string direta
    if (typeof data === "string") {
      return data;
    }

    return `Erro do servidor: código ${error.response?.status}`;
  }

  // Se não for erro do Axios
  return "Erro inesperado. Tente novamente.";
}

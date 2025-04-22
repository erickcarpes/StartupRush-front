import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetStartupsTorneio } from "@/hooks/startup/useGetStartupsTorneio";
import { Skeleton } from "@/components/ui/skeleton";
//import { useGetStartup } from "@/hooks/startup/useGetStartup";
//import api from "@/api/api";
//import { useQueries } from "@tanstack/react-query";

interface Startup {
  id: string;
  nome: string;
  pontos: number;
  vitoriasEmBatalha: number;
  pitchConvincente: number;
  produtoComBugs: number;
  tracaoUsuarios: number;
  investidorIrritado: number;
  fakeNews: number;
  startup_id: string;
}

interface Torneio {
  id: string;
  nome: string;
}

export function RankingTorneio({ torneio }: { torneio: Torneio }) {
  const {
    data: startups,
    isLoading,
    isError,
  } = useGetStartupsTorneio({ id: torneio?.id });

  const getMedalEmoji = (index: number) => {
    return ["🥇", "🥈", "🥉"][index] || "";
  };

  return (
    <Table>
      <TableCaption>Ranking do torneio {torneio.nome}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Pontos</TableHead>
          <TableHead className="text-right">Vitórias</TableHead>
          <TableHead className="text-right">Pitch Convincentes</TableHead>
          <TableHead className="text-right">Produtos com Bugs</TableHead>
          <TableHead className="text-right">Tração de Usuários</TableHead>
          <TableHead className="text-right">Investidores Irritados</TableHead>
          <TableHead className="text-right">Fake News</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {isLoading ? (
          Array.from({ length: 8 }, (_, index) => (
            <TableRow key={index}>
              <TableCell className="w-4">
                <Skeleton className="h-4 w-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-32" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-16" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-4 w-16" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-4 w-16" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-4 w-16" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-4 w-16" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-4 w-16" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-4 w-16" />
              </TableCell>
            </TableRow>
          ))
        ) : isError || !startups?.length ? (
          <TableRow>
            <TableCell colSpan={9}>Nenhum torneio disponível.</TableCell>
          </TableRow>
        ) : (
          startups.map((startup: Startup, index: number) => (
            <TableRow key={startup.id}>
              <TableCell>{getMedalEmoji(index) || index + 1}</TableCell>
              <TableCell>{startup.nome}</TableCell>
              <TableCell>{startup.pontos}</TableCell>
              <TableCell className="text-right">
                {startup.vitoriasEmBatalha}
              </TableCell>
              <TableCell className="text-right">
                {startup.pitchConvincente}
              </TableCell>
              <TableCell className="text-right">
                {startup.produtoComBugs}
              </TableCell>
              <TableCell className="text-right">
                {startup.tracaoUsuarios}
              </TableCell>
              <TableCell className="text-right">
                {startup.investidorIrritado}
              </TableCell>
              <TableCell className="text-right">{startup.fakeNews}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

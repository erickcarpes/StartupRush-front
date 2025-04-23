import { createFileRoute } from "@tanstack/react-router";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetRanking } from "@/hooks/ranking/useGetRaking";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/ranking/")({
  component: RouteComponent,
});

interface Startup {
  id: string;
  nome: string;
  pontos: number;
  vitoriasEmBatalhaTotal: number;
  vitoriasEmTorneioTotal: number;
  pitchConvincenteTotal: number;
  produtoComBugsTotal: number;
  tracaoUsuariosTotal: number;
  investidorIrritadoTotal: number;
  fakeNewsTotal: number;
  plusMinus: number;
}

function RouteComponent() {
  const navigate = useNavigate();

  const { data: startups, isLoading, isError } = useGetRanking();

  const getMedalEmoji = (index: number) => {
    return ["🥇", "🥈", "🥉"][index] || "";
  };

  const handleBackClick = () => {
    navigate({ to: "/dashboard" });
  };

  return (
    <main className="flex flex-col items-center justify-center w-full h-full p-4">
      <h1 className="text-4xl">Ranking plusMinus</h1>
      <h2 className="font-light mt-2">*PlusMinus* é a diferença entre todos atributos positivos e negativos, de uma startup, já recebidos em uma batalha</h2>
      <div className="items-center justify-center border-2 overflow-y-scroll max-h-full mt-3 overflow-y-scroll w-full">
        <Table>
          <TableCaption>Ranking startups plusMinus</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead className="text-right">PlusMinus</TableHead>
              <TableHead className="text-right">Vitórias em Torneios</TableHead>
              <TableHead className="text-right">Vitórias em Batalhas</TableHead>
              <TableHead className="text-right">Pitch Convincentes</TableHead>
              <TableHead className="text-right">Produtos com Bugs</TableHead>
              <TableHead className="text-right">Tração de Usuários</TableHead>
              <TableHead className="text-right">
                Investidores Irritados
              </TableHead>
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
                <TableCell colSpan={9}>Nenhuma startup disponível.</TableCell>
              </TableRow>
            ) : (
              startups.map((startup: Startup, index: number) => (
                <TableRow key={startup.id}>
                  <TableCell>{getMedalEmoji(index) || index + 1}</TableCell>
                  <TableCell>{startup.nome}</TableCell>
                  <TableCell className="text-right">
                    {startup.plusMinus}
                  </TableCell>
                  <TableCell className="text-right">
                    {startup.vitoriasEmTorneioTotal}
                  </TableCell>
                  <TableCell className="text-right">
                    {startup.vitoriasEmBatalhaTotal}
                  </TableCell>
                  <TableCell className="text-right">
                    {startup.pitchConvincenteTotal}
                  </TableCell>
                  <TableCell className="text-right">
                    {startup.produtoComBugsTotal}
                  </TableCell>
                  <TableCell className="text-right">
                    {startup.tracaoUsuariosTotal}
                  </TableCell>
                  <TableCell className="text-right">
                    {startup.investidorIrritadoTotal}
                  </TableCell>
                  <TableCell className="text-right">
                    {startup.fakeNewsTotal}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center mt-4">
        <Button className="w-40 h-12 hover:cursor-pointer" onClick={handleBackClick}>Voltar</Button>
      </div>
    </main>
  );
}

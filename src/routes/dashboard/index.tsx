import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { useState } from "react";
import {
  useAdicionarStartupAoTorneio,
  useBuscarTorneios,
  useCriarTorneio,
} from "@/hooks/useTorneio";
import { useBuscarStartups, useCriarStartup } from "@/hooks/useStartup";

// Criando a rota para o componente
export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

// Componente principal da página
function RouteComponent() {
  const [mostrarCriarStartupCard, setMostrarCriarStartupCard] = useState(false);
  const [mostrarCriarTorneioCard, setMostrarCriarTorneioCard] = useState(false);
  const [mostrarAdicionarStartupCard, setMostrarAdicionarStartupCard] =
    useState(false);
  const [nomeTorneio, setNomeTorneio] = useState("");
  const [nomeStartup, setNomeStartup] = useState("");
  const [sloganStartup, setSloganStartup] = useState("");
  const [anoFundacaoStartup, setAnoFundacaoStartup] = useState("");
  const [startupSelecionada, setStartupSelecionada] = useState<string>("");

  const {
    data: startups,
    isLoading: isLoadingStartups,
    error: errorBuscarStartups,
    isError: erroBuscarStartups,
  } = useBuscarStartups();

  const {
    mutate: criarStartup,
    isError: erroCriarStartup,
    error: errorCriarStartup,
    isSuccess: sucessoCriarStartup,
  } = useCriarStartup();

  const handleStartupSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    criarStartup({
      nome: nomeStartup,
      slogan: sloganStartup,
      anoFundacao: Number(anoFundacaoStartup),
    });
  };

  // Hook para buscar torneios
  const {
    data: torneios,
    isLoading: isLoadingTorneio,
    isError: erroBuscarTorneio,
    error: errorBuscarTorneio,
  } = useBuscarTorneios();

  // Hook para criar torneio
  const {
    mutate: criarTorneio,
    isError: erroCriarTorneio,
    error: errorCriarTorneio,
    isSuccess: sucessoCriarTorneio,
  } = useCriarTorneio();

  // Função de submit para criar torneio
  const handleTorneioSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    criarTorneio({ nome: nomeTorneio });
  };

  const {
    mutate: adicionarStartupAoTorneio,
  } = useAdicionarStartupAoTorneio();

  const handleStartupTorneioSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const torneioId = torneios[0].id;
    adicionarStartupAoTorneio({
      torneioId: torneioId,
      startupId: startupSelecionada,
    });
  };

  // Componente para exibir alertas de erro
  function ErroAlert({ mensagem }: { mensagem: string }) {
    return (
      <Alert
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-fit max-w-md"
        variant="destructive"
      >
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Erro</AlertTitle>
        <AlertDescription>{mensagem}</AlertDescription>
      </Alert>
    );
  }

  function SucessoAlert({ mensagem }: { mensagem: string }) {
    return (
      <Alert
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-fit max-w-md text-green-600"
        variant="default"
      >
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>Sucesso</AlertTitle>
        <AlertDescription>{mensagem}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="w-full h-full justify-around items-center flex">
      {erroCriarTorneio && mostrarCriarTorneioCard && (
        <ErroAlert mensagem={(errorCriarTorneio as Error).message} />
      )}
      {sucessoCriarTorneio && mostrarCriarTorneioCard && (
        <SucessoAlert mensagem="Torneio criado com sucesso!" />
      )}
      {erroCriarStartup && mostrarCriarStartupCard && (
        <ErroAlert mensagem={(errorCriarStartup as Error).message} />
      )}
      {sucessoCriarStartup && mostrarCriarStartupCard && (
        <SucessoAlert mensagem="Startup criada com sucesso!" />
      )}

      {/* Botão para criar startup */}
      <Button onClick={() => setMostrarCriarStartupCard(true)}>
        Criar startup
      </Button>

      {/* Card para criar startup */}
      {mostrarCriarStartupCard && (
        <Card className="absolute w-100 z-50">
          <CardHeader>
            <CardTitle>Criar startup</CardTitle>
            <CardDescription>Crie a sua startup</CardDescription>
          </CardHeader>
          <form onSubmit={handleStartupSubmit}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label>Nome</Label>
                  <Input
                    onChange={(e) => setNomeStartup(e.target.value)}
                    type="text"
                    value={nomeStartup}
                    placeholder="Nome da sua startup"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label>Slogan</Label>
                  <Input
                    onChange={(e) => setSloganStartup(e.target.value)}
                    type="text"
                    value={sloganStartup}
                    placeholder="Slogan da sua startup"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label>Ano de fundação</Label>
                  <Input
                    onChange={(e) => setAnoFundacaoStartup(e.target.value)}
                    type="number"
                    min={1900}
                    max={new Date().getFullYear()}
                    value={anoFundacaoStartup}
                    placeholder="Ano de fundação da sua startup"
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between mt-4">
              <Button
                variant="outline"
                onClick={() => setMostrarCriarStartupCard(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">Enviar</Button>
            </CardFooter>
          </form>
        </Card>
      )}

      {/* Botão para criar torneio */}
      <Button onClick={() => setMostrarCriarTorneioCard(true)}>
        Criar torneio
      </Button>

      {/* Card para criar torneio */}
      {mostrarCriarTorneioCard && (
        <Card className="absolute w-100 z-50">
          <CardHeader>
            <CardTitle>Criar torneio</CardTitle>
            <CardDescription>Crie um torneio</CardDescription>
          </CardHeader>
          <form onSubmit={handleTorneioSubmit}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label>Nome</Label>
                  <Input
                    type="text"
                    value={nomeTorneio}
                    onChange={(e) => setNomeTorneio(e.target.value)}
                    placeholder="Nome do torneio"
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between mt-4">
              <Button
                variant="outline"
                onClick={() => setMostrarCriarTorneioCard(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">Enviar</Button>
            </CardFooter>
          </form>
        </Card>
      )}

      {/* Botão para adicionar startup ao torneio */}
      <Button onClick={() => setMostrarAdicionarStartupCard(true)}>
        Adicionar startup a torneio
      </Button>

      {/* Card para adicionar startup ao torneio */}
      {mostrarAdicionarStartupCard && (
        <Card className="absolute w-100 z-50">
          <CardHeader>
            <CardTitle>Adicionar startup a torneio</CardTitle>
            <CardDescription>Adicionar startup a torneio</CardDescription>
          </CardHeader>
          <form onSubmit={handleStartupTorneioSubmit}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label>Nome da startup</Label>
                  <Select onValueChange={(e) => setStartupSelecionada(e)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione a startup" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Startups</SelectLabel>
                        {isLoadingStartups ? (
                          <Input type="text" value={"Carregando..."} readOnly />
                        ) : erroBuscarStartups ? (
                          <Input
                            type="text"
                            value={`Erro: ${errorBuscarStartups.message}`}
                            readOnly
                          />
                        ) : (
                          startups?.map(
                            (startup: { id: string; nome: string }) => (
                              <SelectItem key={startup.id} value={startup.id}>
                                {startup.nome}
                              </SelectItem>
                            )
                          )
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label>Torneio</Label>
                  {isLoadingTorneio ? (
                    <Input type="text" value={"Carregando..."} readOnly />
                  ) : erroBuscarTorneio ? (
                    <Input
                      type="text"
                      value={`Erro: ${errorBuscarTorneio.message}`}
                      readOnly
                    />
                  ) : (
                    <Input type="text" value={torneios[0].nome} readOnly />
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setMostrarAdicionarStartupCard(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">Enviar</Button>
            </CardFooter>
          </form>
        </Card>
      )}

      {/* Botão para ranking */}
      <Button>Ranking top 10 startups</Button>
    </div>
  );
}

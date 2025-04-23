import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCreateStartup } from "../../hooks/startup/useCreateStartup";
import { useCriarTorneio } from "../../hooks/torneio/useCreateTorneio";
import { useGetStartupsNaoTorneio } from "../../hooks/startup/useGetStartupsNaoTorneio";
import { useAddStartupTorneio } from "../../hooks/torneio/useAddStartupTorneio";
import { StartupSelect } from "../../components/StartupSelect";
import { useGetUltimoTorneio } from "@/hooks/torneio/useGetUltimoTorneio";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useStartTorneio } from "@/hooks/torneio/useStartTorneio";
import { getErrorMessage } from "@/api/getErrorMessage";
import { toast, Toaster } from "sonner";
import { RankingTorneio } from "@/components/RankingTorneio";
import { BatalhaSelect } from "@/components/BatalhaSelect";
import { useGetBatalhasRodada } from "@/hooks/torneio/useGetBatalhasPorRodada";
import { useStartBatalha } from "@/hooks/batalha/useStartBatalha";
import { EventCard } from "@/components/EventCard";
import { useEndBatalha } from "@/hooks/batalha/useEndBatalha";
import { useGetBatalha } from "@/hooks/batalha/useGetBatalha";
import { useAvancarRodada } from "@/hooks/torneio/useAvancarRodada";
import { AlertSucess } from "@/components/AlertSucess";
import { useGetTorneioAguardando } from "@/hooks/torneio/useGetTorneioAguardando";
import { useGetTorneioEmAndamento } from "@/hooks/torneio/useGetTorneioEmAndamento";
import { useGetTorneioNaoFinalizado } from "@/hooks/torneio/useGetTorneioNaoFinalizado";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { queryClient } from "@/main";
import { useGetStartupsTorneio } from "@/hooks/startup/useGetStartupsTorneio";

// Criando a rota para o componente
export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [mostrarEventCard, setMostrarEventCard] = useState(false);
  const [startupNome, setStartupNome] = useState("");
  const [slogan, setSlogan] = useState("");
  const [anoFundacao, setAnoFundacao] = useState("");
  const [torneioId, setTorneioId] = useState("");
  const [torneioNome, setTorneioNome] = useState("");
  const [startupIdSelecionada, setStartupIdSelecionada] = useState("");
  const [batalhaIdSelecionada, setBatalhaIdSelecionada] = useState("");
  const [alertInfo, setAlertInfo] = useState<{
    title: string;
    description: string;
  } | null>(null);
  const navigate = useNavigate();

  // Hook para obter o ultimo torneio
  const {
    data: ultimoTorneio,
    isLoading: isUltimoTorneioLoading,
    isError: isUltimoTorneioError,
    error: errorUltimoTorneio,
    refetch: refetchUltimoTorneio,
  } = useGetUltimoTorneio();

  // Hook para obter o torneio aguardando
  const {
    data: torneioAguardando,
    isLoading: isTorneioAguardandoLoading,
    isError: isTorneioAguardandoError,
    refetch: refetchTorneioAguardando,
  } = useGetTorneioAguardando();

  // Hook para obter o torneio em andamento
  const { data: torneioEmAndamento, refetch: refetchTorneioAndamento } =
    useGetTorneioEmAndamento();

  // Hook obter os torneios que não estão finalizados
  const { data: torneioNaoFinalizado, refetch: refetchTorneioNaoFinalizado } =
    useGetTorneioNaoFinalizado();

  // Hook para obter as startups que não estão no torneio
  const {
    data: startups,
    isLoading: isStartupsLoading,
    isError: isStartupsError,
    error: errorStartups,
    refetch: refetchStartupsNaoTorneio,
  } = useGetStartupsNaoTorneio();

  useEffect(() => {
    if (torneioNaoFinalizado?.id) {
      setTorneioId(torneioNaoFinalizado.id);
    }
  }, [torneioNaoFinalizado]);

  // Hook para obter as batalhas da rodada
  const {
    data: batalhas,
    isLoading: isBatalhasLoading,
    isError: isBatalhasError,
    error: errorBatalhas,
    refetch: refetchBatalhas,
  } = useGetBatalhasRodada(torneioId);

  const {
    data: startupsTorneio,
    isLoading: isLoadingStartupsTorneio,
    isError: isErrorStartupsTorneio,
    refetch: refetchStartupsTorneio,
  } = useGetStartupsTorneio();

  // Hook para criar startup
  const { mutate: criarStartup, isPending: isCriarStartupPending } =
    useCreateStartup({
      onSuccess: () => {
        toast.success("Startup criada com sucesso! 🎉");
        setStartupNome("");
        setSlogan("");
        setAnoFundacao("");
        refetchStartupsNaoTorneio();
      },
      onError: (error) => {
        toast.error("Erro ao criar startup!", {
          description: getErrorMessage(error),
        });
      },
    });

  // Hook para criar torneio
  const { mutate: criarTorneio, isPending: isCriarTorneioPending } =
    useCriarTorneio({
      onSuccess: async () => {
        toast.success("Torneio criado com sucesso! 🎉");
        setTorneioNome("");
        refetchTorneioAguardando();
        refetchStartupsNaoTorneio();
        refetchTorneioNaoFinalizado();
        refetchTorneioAndamento();
        refetchUltimoTorneio();
      },
      onError: (error) => {
        toast.error("Erro ao criar torneio!", {
          description: getErrorMessage(error),
        });
      },
    });

  // Hook para adicionar startup ao torneio
  const {
    mutate: adicionarStartupTorneio,
    isPending: isAdicionarStartupAoTorneioPending,
  } = useAddStartupTorneio({
    onSuccess: () => {
      toast.success("Startup adicionada à torneio! 🎉");
      setStartupIdSelecionada("");
      refetchStartupsNaoTorneio();
      refetchStartupsTorneio();
    },
    onError: () => {
      toast.error("Erro ao adicionar startup à torneio!", {
        description: "Startup já está no torneio",
      });
    },
  });

  // Hook para iniciar torneio
  const { mutateAsync: iniciarTorneio, isPending: isIniciarTorneioPending } =
    useStartTorneio({
      onSuccess: () => {
        toast.success("Torneio iniciado com sucesso! 🎉");
        refetchBatalhas();
        refetchTorneioAndamento();
      },
      onError: (error) => {
        toast.error("Erro ao iniciar torneio!", {
          description: getErrorMessage(error),
        });
      },
    });

  // Hook para iniciar batalha
  const { mutate: startBatalha } = useStartBatalha({
    onSuccess: () => {
      toast.success("Batalha iniciada com sucesso! 🎉");
      setMostrarEventCard(true);
      batalhaStartupRefetch();
    },
    onError: (error) => {
      toast.error("Erro ao iniciar batalha!", {
        description: getErrorMessage(error),
      });
    },
  });

  // Hook para avançar rodada
  const { mutateAsync: avancarRodadaMutateAsync } = useAvancarRodada({
    onSuccess: () => {
      toast.success("Rodada avançada! 🎉");
      refetchBatalhas();
    },
  });

  // Hook para encerrar batalha
  const { mutate: endBatalha } = useEndBatalha({
    onSuccess: async (data) => {
      if (data.rodada === "FINAL") {
        setAlertInfo({
          title: `${data.vencedor.slogan}!`,
          description: `A batalha foi encerrada e o torneio foi finalizado! O vencedor é a ${data.vencedor.nome} com ${data.pontosVencedor} pontos!`,
        });
      } else {
        if (data.empate) {
          setAlertInfo({
            title: "SharkFight!",
            description: `As startups empataram e a batalha foi resolvida na SharkFight. O vencedor é a ${data.vencedor.nome}!!`,
          });
        } else {
          setAlertInfo({
            title: "Uhulll!",
            description: `A batalha foi encerrada e o vencedor é a ${data.vencedor.nome} com ${data.pontosVencedor} pontos!
              `,
          });
        }
      }

      try {
        await avancarRodadaMutateAsync();
      } catch (error) {
        console.error("Erro ao avançar rodada:", error);
      }
      refetchBatalhas();
      refetchTorneioAndamento();
      refetchStartupsTorneio();
      queryClient.invalidateQueries({ queryKey: ["ranking"] });

      setTimeout(() => {
        setAlertInfo(null);
      }, 5000);
    },
    onError: (error: unknown) => {
      toast.error("Erro ao finalizar batalha!", {
        description: getErrorMessage(error),
      });
    },
  });

  // Hook para pegar a batalhaStartup?
  const { data: batalhaStartup, refetch: batalhaStartupRefetch } =
    useGetBatalha({ id: batalhaIdSelecionada });

  // Função para lidar com o envio do formulário de criação de startup
  const handleStartupSubmit = async () => {
    criarStartup({
      nome: startupNome,
      slogan,
      anoFundacao: Number(anoFundacao),
    });
  };

  // Função para lidar com o envio do formulário de criação de torneio
  const handleTorneioSubmit = () => {
    criarTorneio({ nome: torneioNome });
  };

  // Função para lidar com o envio do formulário de adicionar startup ao torneio
  const handleAdicionarStartupSubmit = () => {
    if (!torneioAguardando.id) {
      toast.error("Nenhum torneio disponível!");
      return;
    }
    adicionarStartupTorneio({
      torneio_id: torneioAguardando.id,
      startup_id: startupIdSelecionada,
    });
  };

  // Função para lidar com o envio do formulário de iniciar torneio
  const handleIniciarTorneio = () => {
    if (!torneioAguardando.id) {
      toast.error("Nenhum torneio disponível!");
      return;
    }
    iniciarTorneio(torneioAguardando.id);
  };

  // Função para lidar com o envio do formulário de escolher batalha
  const handleEscolherBatalhaSubmit = () => {
    startBatalha(batalhaIdSelecionada);
  };

  // Função para lidar com o clique no botão de rankings PlusMinus
  const handleRankingsClick = () => {
    navigate({ to: "/dashboard/ranking" });
  };

  return (
    <div className="flex flex-col w-full h-full p-5 md:p-10 bg-[#ffffff]">
      {alertInfo && (
        <AlertSucess
          title={alertInfo.title}
          description={alertInfo.description}
        />
      )}
      <div className="flex flex-wrap gap-4 h-[30%] justify-center mb-3">
        {/*Dialog para criar startup*/}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="md:w-50 md:h-15 hover:cursor-pointer">
              {isCriarStartupPending ? "Criando..." : "Criar Startup"}
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogTitle>Criar Startup</DialogTitle>
            <DialogDescription>
              Preencha as informações para criar a sua startup.
            </DialogDescription>

            <Input
              placeholder="Digite o nome da startup"
              value={startupNome}
              onChange={(e) => setStartupNome(e.target.value)}
              required
            />
            <Input
              placeholder="Digite o slogan da startup"
              value={slogan}
              onChange={(e) => setSlogan(e.target.value)}
              required
            />
            <Input
              placeholder="Digite o ano de fundação da startup"
              type="number"
              min={1900}
              max={new Date().getFullYear()}
              value={anoFundacao}
              onChange={(e) => setAnoFundacao(e.target.value)}
              required
            />
            <DialogFooter className="flex justify-between">
              <DialogClose>
                <Button variant={"outline"} type="button">
                  Fechar
                </Button>
              </DialogClose>
              <Button onClick={handleStartupSubmit} type="button">
                Enviar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/*Dialog para criar torneio*/}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              disabled={torneioNaoFinalizado}
              className="md:w-50 md:h-15 hover:cursor-pointer"
            >
              {isCriarTorneioPending ? "Criando..." : "Criar Torneio"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Criar Torneio</DialogTitle>
            <DialogDescription>
              Preencha as informações para criar o torneio.
            </DialogDescription>

            <Input
              placeholder="Digite o nome do torneio"
              value={torneioNome}
              onChange={(e) => setTorneioNome(e.target.value)}
            />
            <DialogClose className="flex justify-between">
              <Button variant={"outline"} type="button">
                Fechar
              </Button>
              <Button onClick={handleTorneioSubmit} type="button">
                Enviar
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>

        {/*Dialog para adicionar startup ao torneio*/}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              disabled={!torneioAguardando}
              className="md:w-50 md:h-15 hover:cursor-pointer"
            >
              {isAdicionarStartupAoTorneioPending
                ? "Adicionando..."
                : "Adicionar Startup ao Torneio"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Adicionar Startup ao Torneio</DialogTitle>
            <DialogDescription>
              Selecione uma startup para adicionar ao torneio.
            </DialogDescription>

            {isStartupsLoading ? (
              <Input type="text" value="Carregando startups..." readOnly />
            ) : isStartupsError || !startups || startups.length === 0 ? (
              <Input type="text" value="Nenhuma startup disponível" readOnly />
            ) : (
              <StartupSelect
                startups={startups ?? []}
                isLoading={isStartupsLoading}
                isError={isStartupsError}
                errorMsg={getErrorMessage(errorStartups)}
                onChange={setStartupIdSelecionada}
              />
            )}
            <div className="flex flex-col space-y-1.5 mt-4">
              <Label>Torneio</Label>
              {isTorneioAguardandoLoading ? (
                <Input type="text" value="Carregando torneio..." readOnly />
              ) : isTorneioAguardandoError ||
                !torneioAguardando ||
                torneioAguardando.length === 0 ? (
                <Input
                  type="text"
                  value={"Nenhum torneio disponível"}
                  readOnly
                />
              ) : (
                <Input type="text" value={torneioAguardando.nome} readOnly />
              )}
            </div>

            <DialogClose className="flex justify-between">
              <Button variant={"outline"} type="button">
                Fechar
              </Button>
              <Button onClick={handleAdicionarStartupSubmit} type="button">
                Enviar
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>

        {/*Button para iniciar torneio*/}
        <Button
          className="md:w-50 md:h-15 hover:cursor-pointer"
          onClick={handleIniciarTorneio}
          disabled={!torneioAguardando}
        >
          {isIniciarTorneioPending ? "Iniciando torneio..." : "Iniciar Torneio"}
        </Button>

        {/*Dialog para escolher batalha*/}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              disabled={!torneioEmAndamento}
              className="md:w-50 md:h-15 hover:cursor-pointer"
            >
              Ver Batalhas
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Escolher Batalha</DialogTitle>
            <DialogDescription>
              Selecione uma batalha para iniciar.
            </DialogDescription>
            {isBatalhasLoading ? (
              <Input type="text" value="Carregando batalhas..." readOnly />
            ) : isBatalhasError || !batalhas || batalhas.length === 0 ? (
              <Input
                type="text"
                value={"Nenhuma batalha disponível"}
                readOnly
              />
            ) : (
              <BatalhaSelect
                batalhas={batalhas ?? []}
                isLoading={isBatalhasLoading}
                isError={isBatalhasError}
                errorMsg={getErrorMessage(errorBatalhas)}
                onChange={setBatalhaIdSelecionada}
              ></BatalhaSelect>
            )}
            <DialogClose className="flex justify-between">
              <Button variant={"outline"} type="button">
                Fechar
              </Button>
              <Button onClick={handleEscolherBatalhaSubmit} type="button">
                Enviar
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>

        {/*Button para ir para o Ranking Plus Minus*/}
        <Button
          className="md:w-50 md:h-15 hover:cursor-pointer"
          onClick={handleRankingsClick}
        >
          Ranking PlusMinus
        </Button>
      </div>

      {/*Renderizando o torneio*/}
      <div className="flex h-[10%] items-center justify-center mb-3">
        <h1 className="text-3xl font-bold">
          {isUltimoTorneioError || !ultimoTorneio || ultimoTorneio.length === 0
            ? "Nenhum torneio disponível"
            : `Torneio ${ultimoTorneio.nome}`}
        </h1>
      </div>
      <div>
        {isUltimoTorneioLoading ? (
          <Input type="text" value="Carregando torneio..." readOnly />
        ) : isUltimoTorneioError ||
          !ultimoTorneio ||
          ultimoTorneio.length === 0 ? (
          <Input
            type="text"
            value={`${getErrorMessage(errorUltimoTorneio) || "Nenhum torneio disponível"}`}
            readOnly
          />
        ) : (
          <RankingTorneio
            torneio={ultimoTorneio}
            startups={startupsTorneio}
            isError={isErrorStartupsTorneio}
            isLoading={isLoadingStartupsTorneio}
          />
        )}
      </div>
      {batalhaStartup?.batalhas.length === 2 &&
        mostrarEventCard &&
        (console.log("salve", batalhaStartup),
        (
          <EventCard
            startup1={{
              id: batalhaStartup.batalhas[0].startup.id,
              nome: batalhaStartup.startup1Torneio.nome,
              pontos: batalhaStartup.startup1Torneio.pontos,
            }}
            startup2={{
              id: batalhaStartup.batalhas[1].startup.id,
              nome: batalhaStartup.startup2Torneio.nome,
              pontos: batalhaStartup.startup2Torneio.pontos,
            }}
            onSubmit={(eventos) => {
              endBatalha({ batalhaId: batalhaIdSelecionada, eventos });
              setMostrarEventCard(false);
            }}
            onClose={() => {
              setMostrarEventCard(false);
            }}
            isVisible={mostrarEventCard}
          />
        ))}
      <Toaster />
    </div>
  );
}

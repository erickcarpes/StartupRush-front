import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCreateStartup } from "../../hooks/startup/useCreateStartup";
import { useCriarTorneio } from "../../hooks/torneio/useCreateTorneio";
import { useGetStartupsNaoTorneio } from "../../hooks/startup/useGetStartupsNaoTorneio";
import { useAddStartupTorneio } from "../../hooks/torneio/useAddStartupTorneio";
import { FormCard } from "../../components/FormCard";
import { StartupSelect } from "../../components/StartupSelect";
import { useGetTorneio } from "@/hooks/torneio/useGetTorneio";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFileRoute } from "@tanstack/react-router";
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

// Criando a rota para o componente
export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [mostrarCriarStartupCard, setMostrarCriarStartupCard] = useState(false);
  const [mostrarCriarTorneioCard, setMostrarCriarTorneioCard] = useState(false);
  const [
    mostrarAdicionarStartupTorneioCard,
    setMostrarAdicionarStartupTorneioCard,
  ] = useState(false);
  const [mostrarVerBatalhasCard, setMostrarVerBatalhasCard] = useState(false);
  const [mostrarBatalhaIniciadaCard, setMostrarBatalhaIniciadaCard] =
    useState(false);
  const [startupNome, setStartupNome] = useState("");
  const [slogan, setSlogan] = useState("");
  const [anoFundacao, setAnoFundacao] = useState("");
  const [torneioNome, setTorneioNome] = useState("");
  const [startupIdSelecionada, setStartupIdSelecionada] = useState("");
  const [batalhaIdSelecionada, setBatalhaIdSelecionada] = useState("");

  const { mutate: criarStartup, isPending: isCriarStartupLoading } =
    useCreateStartup({
      onSuccess: () => {
        toast.success("Startup criada com sucesso! 🎉");
      },
      onError: (error) => {
        toast.error("Erro ao criar startup!", {
          description: getErrorMessage(error),
        });
      },
    });

  const { mutate: criarTorneio, isPending: isCriarTorneioLoading } =
    useCriarTorneio({
      onSuccess: () => {
        toast.success("Torneio criado com sucesso! 🎉");
      },
      onError: (error) => {
        toast.error("Erro ao criar torneio!", {
          description: getErrorMessage(error),
        });
      },
    });

  const {
    data: torneio,
    isLoading: isTorneioLoading,
    isError: isTorneioError,
    error: errorTorneio,
    refetch: refetchTorneio,
  } = useGetTorneio();

  const {
    data: startups,
    isLoading: isStartupsLoading,
    isError: isStartupsError,
    error: errorStartups,
    refetch: refetchStartupsNaoTorneio,
  } = useGetStartupsNaoTorneio({ id: torneio?.[0]?.id });

  const {
    data: batalhas,
    isLoading: isBatalhasLoading,
    isError: isBatalhasError,
    error: errorBatalhas,
    refetch: refetchBatalhas,
  } = useGetBatalhasRodada(torneio?.[0]?.id);

  const { mutate: avancarRodada } = useAvancarRodada({
    onSuccess: () => {
      toast.success("Rodada avançada! 🎉");
      refetchBatalhas();
    },
    onError: (error) => {
      toast.error("Erro ao avançar rodada!", {
        description: getErrorMessage(error),
      });
    },
  });

  useEffect(() => {
    console.log("batalhas", batalhas);
    console.log("torneio", torneio);
    console.log("isBatalhasLoading", isBatalhasLoading);
    if (!isBatalhasLoading && batalhas?.length === 0 && torneio?.[0]?.id) {
      console.log("Avançando rodada");
      avancarRodada(torneio[0].id);
      refetchBatalhas();
    }
  }, [batalhas, isBatalhasLoading, torneio, avancarRodada, refetchBatalhas]);

  const {
    mutate: adicionarStartupTorneio,
    isPending: isAdicionarStartupTorneioLoading,
  } = useAddStartupTorneio({
    onSuccess: () => {
      toast.success("Startup adicionada à torneio! 🎉");
    },
    onError: (error) => {
      toast.error("Erro ao adicionar startup à torneio!", {
        description: getErrorMessage(error),
      });
    },
  });

  const { mutate: iniciarTorneio, isPending: isIniciarTorneioLoading } =
    useStartTorneio({
      onSuccess: () => {
        toast.success("Torneio iniciado com sucesso! 🎉");
      },
      onError: (error) => {
        toast.error("Erro ao iniciar torneio!", {
          description: getErrorMessage(error),
        });
      },
    });

  const { mutate: startBatalha } = useStartBatalha({
    onSuccess: () => {
      toast.success("Batalha iniciada com sucesso! 🎉");
    },
    onError: (error) => {
      toast.error("Erro ao iniciar batalha!", {
        description: getErrorMessage(error),
      });
    },
  });

  const { mutate: endBatalha } = useEndBatalha({
    onSuccess: () => {
      toast.success("Batalha finalizada com sucesso! 🎉");
      console.log(batalhaStartup);
      console.log(batalhaIdSelecionada);
    },
    onError: (error: unknown) => {
      toast.error("Erro ao finalizar batalha!", {
        description: getErrorMessage(error),
      });
      console.log(batalhaStartup);
      console.log(batalhaIdSelecionada);
    },
  });

  const { data: batalhaStartup } = useGetBatalha({ id: batalhaIdSelecionada });

  const handleStartupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await criarStartup({
      nome: startupNome,
      slogan,
      anoFundacao: Number(anoFundacao),
    });
    setStartupNome("");
    setSlogan("");
    setAnoFundacao("");
    refetchStartupsNaoTorneio();
  };

  const handleTorneioSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await criarTorneio({ nome: torneioNome });
    setTorneioNome("");
    refetchStartupsNaoTorneio();
    refetchTorneio();
  };

  const handleAdicionarStartupSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!torneio[0].id) {
      toast.error("Nenhum torneio disponível!");
      return;
    }
    await adicionarStartupTorneio({
      torneio_id: torneio[0].id,
      startup_id: startupIdSelecionada,
    });
    setStartupIdSelecionada("");
    refetchStartupsNaoTorneio();
  };

  const handleIniciarTorneio = async () => {
    if (!torneio[0].id) {
      toast.error("Nenhum torneio disponível!");
      return;
    }
    await iniciarTorneio(torneio[0].id);
    refetchBatalhas();
  };

  const handleEscolherBatalhaSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startBatalha(batalhaIdSelecionada);
    setMostrarBatalhaIniciadaCard(true);
    setMostrarVerBatalhasCard(false);
  };

  return (
    <div className="flex flex-col w-full h-full p-10 bg-[#ffffff]">
      <div className="flex flex-wrap gap-4 h-[30%] itens-center justify-center mb-3">
        <Button
          className="w-50 h-15 hover:cursor-pointer"
          onClick={() => setMostrarCriarStartupCard(true)}
        >
          {isCriarStartupLoading ? "Criando..." : "Criar Startup"}
        </Button>
        <Button
          className="w-50 h-15"
          onClick={() => setMostrarCriarTorneioCard(true)}
        >
          {isCriarTorneioLoading ? "Criando..." : "Criar Torneio"}
        </Button>
        <Button
          className="w-50 h-15 hover:cursor-pointer"
          onClick={() => {
            setMostrarAdicionarStartupTorneioCard(true);
            refetchStartupsNaoTorneio();
          }}
        >
          {isAdicionarStartupTorneioLoading
            ? "Adicionando..."
            : "Adicionar Startup ao torneio"}
        </Button>
        <Button
          className="w-50 h-15 hover:cursor-pointer"
          onClick={handleIniciarTorneio}
          disabled={isIniciarTorneioLoading}
        >
          {isIniciarTorneioLoading ? "Iniciando..." : "Iniciar Torneio"}
        </Button>
        <Button
          className="w-50 h-15 hover:cursor-pointer"
          onClick={() => setMostrarVerBatalhasCard(true)}
        >
          Ver Batalhas
        </Button>
        <Button className="w-50 h-15 hover:cursor-pointer">Ranking top 10</Button>
      </div>
      <div className="flex h-[10%] items-center justify-center mb-3">
        <h1 className="text-3xl font-bold">
          {isTorneioError || !torneio || torneio.length === 0
            ? "Nenhum torneio disponível"
            : `Torneio ${torneio[0].nome}`}
        </h1>
      </div>
      <div>
        {isTorneioLoading ? (
          <Input type="text" value="Carregando torneio..." readOnly />
        ) : isTorneioError || !torneio || torneio.length === 0 ? (
          <Input
            type="text"
            value={`Erro: ${getErrorMessage(errorTorneio) || "Nenhum torneio disponível"}`}
            readOnly
          />
        ) : (
          <RankingTorneio torneio={torneio[0]} />
        )}
      </div>
      <div className="fixed flex items-center justify-center top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl">
        <FormCard
          title="Criar startup"
          description="Crie a sua startup"
          onSubmit={handleStartupSubmit}
          onCancel={() => setMostrarCriarStartupCard(false)}
          isLoading={isCriarStartupLoading}
          isVisible={mostrarCriarStartupCard}
        >
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
        </FormCard>

        <FormCard
          title="Criar torneio"
          description="Crie o torneio"
          onSubmit={handleTorneioSubmit}
          onCancel={() => setMostrarCriarTorneioCard(false)}
          isLoading={isCriarTorneioLoading}
          isVisible={mostrarCriarTorneioCard}
        >
          <Input
            placeholder="Digite o nome do torneio"
            value={torneioNome}
            onChange={(e) => setTorneioNome(e.target.value)}
            required
          />
        </FormCard>

        <FormCard
          title="Adicionar startup ao torneio"
          description="Adicione uma startup ao torneio em andamento"
          onSubmit={handleAdicionarStartupSubmit}
          onCancel={() => setMostrarAdicionarStartupTorneioCard(false)}
          isLoading={isAdicionarStartupTorneioLoading}
          isVisible={mostrarAdicionarStartupTorneioCard}
        >
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
            {isTorneioLoading ? (
              <Input type="text" value="Carregando torneio..." readOnly />
            ) : isTorneioError || !torneio || torneio.length === 0 ? (
              <Input
                type="text"
                value={`Erro: ${getErrorMessage(errorTorneio) || "Nenhum torneio disponível"}`}
                readOnly
              />
            ) : (
              <Input type="text" value={torneio[0].nome} readOnly />
            )}
          </div>
        </FormCard>

        <FormCard
          title="Ver Batalhas"
          description="Escolha uma batalha"
          onSubmit={handleEscolherBatalhaSubmit}
          onCancel={() => setMostrarVerBatalhasCard(false)}
          isLoading={isBatalhasLoading}
          isVisible={mostrarVerBatalhasCard}
        >
          <BatalhaSelect
            batalhas={batalhas ?? []}
            isLoading={isBatalhasLoading}
            isError={isBatalhasError}
            errorMsg={getErrorMessage(errorBatalhas)}
            onChange={setBatalhaIdSelecionada}
          ></BatalhaSelect>
        </FormCard>

        {batalhaStartup?.length === 2 && (
          <EventCard
            startup1={{
              id: batalhaStartup[0].startup.id,
              nome: batalhaStartup[0].startup.nome,
            }}
            startup2={{
              id: batalhaStartup[1].startup.id,
              nome: batalhaStartup[1].startup.nome,
            }}
            onClose={() => setMostrarBatalhaIniciadaCard(false)}
            onSubmit={(eventos) => {
              endBatalha({ batalhaId: batalhaIdSelecionada, eventos });
              setMostrarBatalhaIniciadaCard(false);
            }}
            isVisible={mostrarBatalhaIniciadaCard}
          />
        )}
      </div>
      <Toaster />
    </div>
  );
}

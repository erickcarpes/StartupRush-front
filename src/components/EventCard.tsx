import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type Evento = {
  startup_id: string;
  pitchConvincente: boolean;
  produtoComBugs: boolean;
  tracaoUsuarios: boolean;
  investidorIrritado: boolean;
  fakeNews: boolean;
};

interface Startup {
  id: string;
  nome: string;
  pontos: number;
}

interface EventCardProps {
  startup1: Startup;
  startup2: Startup;
  onClose: () => void;
  onSubmit: (eventos: Evento[]) => void;
  isVisible: boolean;
}

const eventoKeys: (keyof Omit<Evento, "startup_id">)[] = [
  "pitchConvincente",
  "produtoComBugs",
  "tracaoUsuarios",
  "investidorIrritado",
  "fakeNews",
];

export function EventCard({
  startup1,
  startup2,
  onClose,
  onSubmit,
  isVisible,
}: EventCardProps) {
      const [eventos, setEventos] = useState<Evento[]>([
      {
        startup_id: startup1.id,
        pitchConvincente: false,
        produtoComBugs: false,
        tracaoUsuarios: false,
        investidorIrritado: false,
        fakeNews: false,
      },
      {
        startup_id: startup2.id,
        pitchConvincente: false,
        produtoComBugs: false,
        tracaoUsuarios: false,
        investidorIrritado: false,
        fakeNews: false,
      },
    ]);

  if (!isVisible) return null;
  
  const handleCheckboxChange = (
    startupIndex: number,
    key: keyof Omit<Evento, "startup_id">,
    value: boolean
  ) => {
    const novosEventos = [...eventos];
    novosEventos[startupIndex] = {
      ...novosEventos[startupIndex],
      [key]: value,
    };
    setEventos(novosEventos);
  };

  const eventoLabels: Record<(typeof eventoKeys)[number], string> = {
    pitchConvincente: "Pitch Convincente",
    produtoComBugs: "Produto com Bugs",
    tracaoUsuarios: "Boa Atração de Usuários",
    investidorIrritado: "Investidor Irritado",
    fakeNews: "Divulgação de Fake News",
  };

  return (
    <Card className="p-4 w-full max-w-2xl mx-auto mt-4 z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-center mb-6">
        {startup1.nome} vs {startup2.nome}
      </h2>

      <div className="grid grid-cols-2 gap-8">
        {[startup1, startup2].map((startup, index) => (
          <div key={startup.id}>
            <h3 className="font-semibold mb-2 text-center">{`${startup.nome} (${startup.pontos})`}</h3>
            {eventoKeys.map((key) => (
              <div key={key} className="flex items-center space-x-2 mb-2">
                <Checkbox
                  id={`${startup.id}-${key}`}
                  checked={eventos[index][key]}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(index, key, checked as boolean)
                  }
                />
                <label key={`${startup.id}-${key}`} className="text-sm font-medium">
                  {eventoLabels[key]}
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onClose}>
          Voltar
        </Button>
        <Button onClick={() => {onSubmit(eventos)}}>Encerrar Batalha</Button>
      </div>
    </Card>
  );
}

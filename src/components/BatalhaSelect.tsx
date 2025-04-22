import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Batalha {
  id: string;
  participantes: Participantes[];
}

interface Participantes {
  startup_id: string;
  nome: string;
}

interface BatalhaSelectProps {
  batalhas: Batalha[];
  isLoading: boolean;
  isError: boolean;
  errorMsg?: string;
  onChange: (id: string) => void;
}

export function BatalhaSelect({
  batalhas,
  isLoading,
  isError,
  errorMsg,
  onChange,
}: BatalhaSelectProps) {
  return (
    <Select onValueChange={onChange} required>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecione a batalha" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Batalhas</SelectLabel>
          {isLoading ? (
            <SelectItem value={"Carregando..."} disabled />
          ) : isError ? (
            <SelectItem value={`Erro: ${errorMsg}`} disabled />
          ) : batalhas.length === 0 ? (
            <SelectItem value={"Nenhuma startup disponível"} disabled />
          ) : (
            batalhas.map((b) => (
              <SelectItem key={b.id} value={b.id}>
                {b.participantes[0].nome} vs {b.participantes[1].nome}
              </SelectItem>
            ))
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

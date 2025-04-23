import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Startup {
  id: string;
  nome: string;
}

interface StartupSelectProps {
  startups: Startup[];
  isLoading: boolean;
  isError: boolean;
  errorMsg?: string;
  onChange: (id: string) => void;
}

export function StartupSelect({
  startups,
  isLoading,
  isError,
  errorMsg,
  onChange,
}: StartupSelectProps) {
  return (
    console.log("startups", startups),
    <Select onValueChange={onChange} required>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecione a startup" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Startups</SelectLabel>
          {isLoading ? (
            <SelectItem value={"Carregando..."} disabled />
          ) : isError ? (
            <SelectItem value={`Erro: ${errorMsg}`} disabled />
          ) : (startups.length === 0 ? (
            <SelectItem value={"Nenhuma startup disponível"} disabled />
          ) : (
            startups.map((s) => (
              <SelectItem key={s.id} value={s.id}>
                {s.nome} 
              </SelectItem>
            ))
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

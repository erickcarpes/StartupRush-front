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
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [mostrarCriarStartupCard, setMostrarCriarStartupCard] = useState(false);
  const [mostrarCriarTorneioCard, setMostrarCriarTorneioCard] = useState(false);

    
  const [mostrarAdicionarStartupCard, setMostrarAdicionarStartupCard] =
    useState(false);
  return (
    <div className="w-full h-full justify-around items-center flex ">
      <Button onClick={() => setMostrarCriarStartupCard(true)}>
        Criar startup
      </Button>
      {mostrarCriarStartupCard && (
        <Card className="absolute w-100 z-50">
          <CardHeader>
            <CardTitle>Criar startup</CardTitle>
            <CardDescription>Crie a sua startup</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label>Nome</Label>
                  <Input id="nomeStartup" placeholder="Nome da sua startup" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label>Slogan</Label>
                  <Input id="slogan" placeholder="Slogan da sua startup" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label>Ano de fundação</Label>
                  <Input
                    id="anoFundacao"
                    placeholder="Ano de fundação da sua startup"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setMostrarCriarStartupCard(false)}
            >
              Cancelar
            </Button>
            <Button>Enviar</Button>
          </CardFooter>
        </Card>
      )}

      <Button onClick={() => setMostrarCriarTorneioCard(true)}>
        Criar torneio
      </Button>
      {mostrarCriarTorneioCard && (
        <Card className="absolute w-100 z-50">
          <CardHeader>
            <CardTitle>Criar torneio</CardTitle>
            <CardDescription>Crie um torneio</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label>Nome</Label>
                  <Input id="nomeTorneio" placeholder="Nome do torneio" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setMostrarCriarTorneioCard(false)}
            >
              Cancelar
            </Button>
            <Button>Enviar</Button>
          </CardFooter>
        </Card>
      )}

      <Button onClick={() => setMostrarAdicionarStartupCard(true)}>
        Adicionar startup a torneio
      </Button>
      {mostrarAdicionarStartupCard && (
        <Card className="absolute w-100 z-50">
          <CardHeader>
            <CardTitle>Adicionar startup a torneio</CardTitle>
            <CardDescription>Adicionar startup a torneio</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label>Nome</Label>
                  <Input id="nomeStartup" placeholder="Nome da sua startup" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label>Nome do torneio</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o torneio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Selecione o torneio</SelectLabel>
                        <SelectItem value="torneio1">Torneio 1</SelectItem>
                        <SelectItem value="torneio2">Torneio 2</SelectItem>
                        <SelectItem value="torneio3">Torneio 3</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setMostrarAdicionarStartupCard(false)}
            >
              Cancelar
            </Button>
            <Button>Enviar</Button>
          </CardFooter>
        </Card>
      )}
      <Button>Ranking top 10 startups</Button>
    </div>
  );
}

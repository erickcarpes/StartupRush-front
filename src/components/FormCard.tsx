import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface FormCardProps {
  title: string;
  description: string;
  children: ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  isLoading: boolean;
  isVisible: boolean;
}

export function FormCard({
  title,
  description,
  children,
  onSubmit,
  onCancel,
  isLoading,
  isVisible,
}: FormCardProps) {
  if (!isVisible) return null;

  return (
    <Card className="flex w-100 z-50">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">{children}</div>
        </CardContent>
        <CardFooter className="flex justify-between mt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Enviando..." : "Enviar"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

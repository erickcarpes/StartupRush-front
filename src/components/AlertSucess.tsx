import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { PartyPopper } from "lucide-react";

interface AlertSucessProps {
    title: string;
    description: string;
    }

export function AlertSucess({ title, description }: AlertSucessProps){
  return (
    <Alert className="fixed z-50 w-100 top-[10%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
      <PartyPopper className="h-5 w-5" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}

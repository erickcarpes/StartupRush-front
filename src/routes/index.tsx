import { Button } from "@/components/ui/button";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const router = useRouter();
  const [transition,setTransition] = useState(false);

  const onHandleClick = () => {
    setTransition(true);
    setTimeout(() => {
      router.navigate({to:"/dashboard"});
    }, 750);
  }

  return (
    <main className={`flex w-screen h-screen duration-1000 ease-in-out transition-transform ${transition ? "translate-x-[-100%]" : "translate-x-0"}`}>
      <div className="flex justify-center items-center bg-[#ffffff] w-[70%] inset-shadow-2xl shadow-black/20">
        <h1 className="text-5xl font-semibold">Startup Rush</h1>
      </div>
      <div className="flex justify-center items-center bg-[#000000] w-[30%]">
        <Button onClick={onHandleClick} variant={"secondary"} className="w-35 h-17 text-2xl bg-[#ffffff] text-black transition-transform ease-in-out duration-300 hover:scale-115 hover:cursor-pointer">Entrar</Button>
      </div>
    </main>
  );
}

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
    <main className={`flex w-screen h-screen duration-800 ease-in-out transition-opacity ${transition ? "opacity-25" : "opacity-100"}`}>
      <div className="flex justify-center items-center bg-[#88abc2] w-[70%]">
        <h1 className="text-5xl font-semibold">Startup Rush</h1>
      </div>
      <div className="flex justify-center items-center bg-[#d0e0eb] w-[30%]">
        <Button onClick={onHandleClick} className="w-35 h-17 text-2xl bg-[#88abc2] text-black transition-transform ease-in-out duration-300 hover:bg-[#49708a] hover:text-white hover:scale-115 hover:cursor-pointer">Entrar</Button>
      </div>
    </main>
  );
}

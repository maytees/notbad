import Image from "next/image";
import TargetCard from "@/components/TargetCard";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

type Target = {
  name: string;
  blocked: boolean;
};

export default function Home() {
  const [targets, setTargets] = useState<Target[]>([]);

  useEffect(() => {
    const fetchedTargets = async () => {
      const data = await (
        await fetch(
          "https://vizard.matees.net/targets/",
        )
      ).json();

      setTargets(data);
    };

    fetchedTargets();
  }, []);

  return (
    <div className="text-error w-screen h-screen flex flex-col items-center justify-start pt-10">
      <h1 className="text-4xl text-error font-extrabold">Not bad</h1>
      <div className="flex flex-row justify-between items-between w-screen gap-y-10 flex-wrap p-10 mt-5">
        {targets.map((t) => (
          <TargetCard key={t.name} name={t.name} checked={t.blocked} />
        ))}
      </div>
    </div>
  );
}

import Image from "next/image";
import TargetCard from "@/components/TargetCard";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Poppins({
  subsets: ["latin"],
  weight: "700",
});

type Target = {
  name: string;
  blocked: boolean;
};

export default function Home() {
  const [targets, setTargets] = useState<Target[]>([]);
  const [nameField, setNameField] = useState<string>("");
  const [blockedField, setBlockedField] = useState<boolean>(true);

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

  const createNewTarget = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nameField === "") {
      console.log("Name field is empty");
      return;
    }

    const data = await (
      await fetch(
        "https://vizard.matees.net/targets",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: nameField,
            blocked: blockedField,
          }),
        },
      )
    ).json();

    setTargets([data]);
    setNameField("");
    setBlockedField(true);
  };

  return (
    <div
      className={`${inter.className} text-error w-screen h-screen flex flex-col gap-y-10 items-center justify-start pt-10`}
    >
      <h1 className="text-4xl text-error font-extrabold">Not bad</h1>

      <label htmlFor="my-modal-3" className="btn btn-error text-white">
        Create new
      </label>

      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative outline outline-1 outline-red-200 shadow-xl">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-error btn-circle absolute right-2 top-2 text-white"
          >
            ✕
          </label>
          <h1 className="text-xl font-bold">
            Create new target
          </h1>

          <form onSubmit={createNewTarget}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-red-400">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                value={nameField}
                onChange={(e) => setNameField(e.target.value)}
                className="input input-bordered input-error"
              />
            </div>
            {/* Create form control with label for a toggle which toggles blocked or not (daisy ui) */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-red-400">Blocked</span>
              </label>
              <input
                type="checkbox"
                checked={blockedField}
                defaultChecked
                onClick={() => setBlockedField(!blockedField)}
                className="toggle toggle-error"
              />
            </div>
            <div className="form-control mt-6">
              <input
                type="submit"
                value="Create"
                className="btn btn-error text-white"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="flex flex-row justify-between items-between w-screen gap-y-10 flex-wrap px-10">
        {targets.map((t) => (
          <TargetCard key={t.name} name={t.name} checked={t.blocked} />
        ))}
      </div>
    </div>
  );
}

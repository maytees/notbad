import React, { MouseEventHandler, useState } from "react";

interface TargetCardProps {
  checked: boolean;
  name: string;
}

const TargetCard: React.FC<TargetCardProps> = (
  { checked, name }: TargetCardProps,
) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  const toggleChecked = (e: unknown) => {
    fetch(`https://vizard.matees.net/targets/${name}?onoff=${!checked}`, {
      method: "PUT",
    });

    setIsChecked(!isChecked);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-y-2
     w-60 h-28 bg-none outline outline-2 outline-error ring-1 shadow-sm rounded-lg">
      <h1 className="text-left text-2xl font-bold">{name}</h1>
      <input
        type="checkbox"
        className="toggle toggle-error"
        checked={isChecked}
        onClick={toggleChecked}
      />
    </div>
  );
};

export default TargetCard;

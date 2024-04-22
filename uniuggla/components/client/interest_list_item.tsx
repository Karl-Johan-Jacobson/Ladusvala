"use client";

import Interest from "@/types/interest";
import { ChangeEvent, useState } from "react";

interface InterestListItemProps {
  interest: Interest;
  onToggle: (isToggled: boolean, id: string) => void;
}

export default function InterestListItem({ interest, onToggle }: InterestListItemProps) {
  const [isToggled, setIsToggled] = useState<boolean>(false);

  function toggle() {
    setIsToggled(!isToggled);
    onToggle(isToggled, interest.interestId);
  }

  return (
    <div>
      {!isToggled && (
        <button
          className="text-white bg-gradient-to-r from-purple-300 via-purple-400 to-purple-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-3xl text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={() => toggle()}
        >
          {interest.interestTitle}
        </button>
      )}
      {isToggled && (
        <button onClick={() => toggle()} className="interestSelected">
          {interest.interestTitle}
        </button>
      )}
    </div>
  );
}
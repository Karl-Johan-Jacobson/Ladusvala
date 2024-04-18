"use client";

import Interest from "@/types/interest";
import { ChangeEvent, useState } from "react";

interface CustomInterestListItemProps {
  interest: Interest;
  onToggle: (isToggled: boolean, id: string) => void;
}

export default function CustomInterestListItem({ interest, onToggle }: CustomInterestListItemProps) {
    const [isToggled, setIsToggled] = useState<boolean>(true);
  
    function toggle() {
      const newState = !isToggled;
      setIsToggled(newState);
      onToggle(newState, interest.interestId);
    }
  
    return (
      <div>
        <button
          className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-3xl text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={toggle}>
          {interest.interestTitle}
        </button>
      </div>
    );
  }
  
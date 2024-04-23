"use client";

import Interest from "@/types/interest";
import { ChangeEvent, useState } from "react";

interface CustomInterestListItemProps {
  interest: Interest;
  onToggle: (isToggled: boolean, id: string) => void;
}

export default function CustomInterestListItem({
  interest,
  onToggle,
}: CustomInterestListItemProps) {
  const [isToggled, setIsToggled] = useState<boolean>(true);

  function toggle() {
    const newState = !isToggled;
    setIsToggled(newState);
    onToggle(newState, interest.interestId);
  }

  return (
    <div>
      <button className="interestSelected" onClick={toggle}>
        {interest.interestTitle}
      </button>
    </div>
  );
}

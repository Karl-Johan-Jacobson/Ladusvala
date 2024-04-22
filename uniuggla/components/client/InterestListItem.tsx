"use client";

import Interest from "@/types/interest";
import { useState } from "react";

interface InterestListItemProps {
  interest: Interest;
  isSelected: boolean;
  onSelect: (interest: Interest) => void;
}

export default function InterestListItem({ interest, isSelected, onSelect }: InterestListItemProps) {
  return (
    <>
      {isSelected ?
        <button onClick={() => onSelect(interest)} className="interestSelected">
          {interest.interestTitle}
        </button> :
        <button onClick={() => onSelect(interest)} className="">
          {interest.interestTitle}
        </button>
      }
    </>
  );
}

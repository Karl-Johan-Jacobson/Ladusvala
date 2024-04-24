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
    <div>
      {isSelected ?
        <button onClick={() => onSelect(interest)} className="iconButton selectedInterestButton">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="">
            <path fill="#2E0A8E" d="M51.3,-58.6C66.3,-48.4,78.4,-32.2,81.6,-14.3C84.8,3.5,79.2,23,69.7,40.8C60.1,58.7,46.6,74.8,29,82.5C11.3,90.1,-10.4,89.3,-26.2,80.1C-42,70.9,-51.8,53.2,-61.7,35.8C-71.7,18.3,-81.7,1.1,-80.9,-16.2C-80.2,-33.4,-68.6,-50.7,-53.3,-60.8C-38,-70.9,-19,-74,-0.4,-73.5C18.1,-72.9,36.2,-68.8,51.3,-58.6Z" transform="translate(100 100)" />
          </svg>
          <span className="iconText">{interest.interestTitle}</span>
        </button> :
        <button onClick={() => onSelect(interest)} className="iconButton notSelectedInterestButton">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="">
            <path fill="#9ECB98" d="M51.3,-58.6C66.3,-48.4,78.4,-32.2,81.6,-14.3C84.8,3.5,79.2,23,69.7,40.8C60.1,58.7,46.6,74.8,29,82.5C11.3,90.1,-10.4,89.3,-26.2,80.1C-42,70.9,-51.8,53.2,-61.7,35.8C-71.7,18.3,-81.7,1.1,-80.9,-16.2C-80.2,-33.4,-68.6,-50.7,-53.3,-60.8C-38,-70.9,-19,-74,-0.4,-73.5C18.1,-72.9,36.2,-68.8,51.3,-58.6Z" transform="translate(100 100)" />
          </svg>
          <span className="iconText">{interest.interestTitle}</span>
        </button>

      }
    </div>
  );
}

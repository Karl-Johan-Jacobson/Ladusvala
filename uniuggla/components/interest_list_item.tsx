"use client"

import Interest from "@/types/interest"

interface InterestListItemProps {
    interest: Interest
    onSelect: (id: number) => void 
  }

  export default function InterestListItem({ interest, onSelect } : InterestListItemProps) {
    return (
      <div>
        <button onClick={() => onSelect(interest.id)}>{interest.name}</button>
        <p>{interest.description}</p>
      </div>
    )
  }
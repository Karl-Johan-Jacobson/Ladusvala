"use client";

import Interest from "@/types/interest";
import { useState } from "react";
import { RandomBlob, RandomSelectedBlob }  from "../Blob";

interface InterestListItemProps {
  interest: Interest;
  isSelected: boolean;
  mounted: boolean;
  updateParent: (interest: Interest, isMounted: boolean) => void;
}

export default function InterestListItem({ interest, isSelected, mounted, updateParent }: InterestListItemProps) {
  const [isMounted, setIsMounted] = useState<boolean>(mounted);

  // This function is called when an animation has ended, i.e when the component has either faded in or ou
  const handleParentUpdate = () => {
    // We only want to update the parent when the component is unmounted, i.e. should be removed
    if (!isMounted) {
      updateParent(interest, isMounted);
    }
  };

  const handleClick = () => {
    // The state of an unmounted components shouldn't be able to change
    if (isMounted) {
      setIsMounted(!isMounted);
    }
  }

  return (
    <div>
      {isSelected ?
        <button 
          onClick={handleClick}
          className={
            isMounted ?
              "iconButton selectedInterestButton fadeInSelected" :
              "iconButton selectedInterestButton fadeOut"
          }
          onAnimationEnd={handleParentUpdate}
        >
          <RandomSelectedBlob key={interest.interestId}/>
          <span className="iconText">{interest.interestTitle}</span>
        </button> : 
        <button // If not selected
          onClick={handleClick}
          onAnimationEnd={handleParentUpdate}
          className={
            isMounted ?
              "iconButton notSelectedInterestButton fadeInNew" :
              "iconButton notSelectedInterestButton fadeOut"
          }
        >
          <RandomBlob key={interest.interestId}/>
          <span className="iconText">{interest.interestTitle}</span>
        </button>
      }
    </div>
  );
}

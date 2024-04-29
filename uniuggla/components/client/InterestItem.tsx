"use client";

import Interest from "@/types/interest";
import { useState } from "react";
import {RandomAnimatedSelectedBlob, RandomAnimatedBlob, RandomBlob }  from "../server/Blob";

interface InterestListItemProps {
  interest: Interest;
  isSelected: boolean;
  mounted: boolean;
  updateParent: (interest: Interest, isMounted: boolean) => void;
}

export default function InterestListItem({ interest, isSelected, mounted, updateParent }: InterestListItemProps) {
  const [isMounted, setIsMounted] = useState<boolean>(mounted);
  const [isHovered, setIsHovered] = useState<boolean>(false);

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
          <RandomAnimatedSelectedBlob/>
          <span className="iconText">{interest.interestTitle}</span>
        </button> : 
        <button // If not selected
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
          onAnimationEnd={handleParentUpdate}
          className={
            isMounted ?
              "iconButton notSelectedInterestButton fadeInNew" :
              "iconButton notSelectedInterestButton fadeOut"
          }
        >
          {isHovered ? <RandomAnimatedBlob/> : <RandomBlob/> }
          <span className="iconText">{interest.interestTitle}</span>
        </button>
      }
    </div>
  );
}

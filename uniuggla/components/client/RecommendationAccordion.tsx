"use client"

import Program from "@/types/program";
import { useState } from "react";
import RecommendationItemImproved from "./RecommendationItemImproved";

export default function RecommendationAccordion(recommendations: Program[]) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    if (index === selected) {
      setSelected(null);
      return;
    }
    setSelected(index);
  }

  return (
    <>
      <div className="recommendationAccordion">
        {recommendations.map((recommendation, index) => (
          <RecommendationItemImproved
          key={index}
          program={recommendation}
          index={index}
          isToggled={false}
          toggle={handleSelect}
          />
        ))}
      </div>
      <div className="showDescription">
        <button>
          <span>Visa fler program</span>
        </button>
      </div>
    </>
  )
}

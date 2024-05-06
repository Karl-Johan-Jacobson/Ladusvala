"use client"

import Program from "@/types/program";
import { useState } from "react";
import RecommendationItemImproved from "./RecommendationItemImproved";


interface RecommendationAccordionProps {
  recommendations: Program[];
  shownRecommendations: number;
}

export default function RecommendationAccordion({recommendations, shownRecommendations}: RecommendationAccordionProps) {
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
        {recommendations
          .filter((_recommendation, index) => index < shownRecommendations)
          .map((recommendation, index) => (
          <RecommendationItemImproved
            key={index}
            program={recommendation}
            index={index}
            isExpanded={selected === index ? true : false}
            showDescription={handleSelect}
          />
        ))}
      </div>
    </>
  );
}

import Program from "@/types/program";
import { useState } from "react";
import RecommendationItemImproved from "./RecommendationItemImproved";

interface RecommendationAccordionProps {
  recommendations: Program[];
  shownRecommendations: number;
}

export default function RecommendationAccordion({recommendations, shownRecommendations}: RecommendationAccordionProps) {
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
          />
        ))}
      </div>
    </>
  );
}

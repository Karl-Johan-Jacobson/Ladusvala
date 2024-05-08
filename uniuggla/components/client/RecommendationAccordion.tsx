import RecommendationItemImproved from "./RecommendationItemImproved";
import ProgramRecommendation from "@/types/ProgramRecommendation";

interface RecommendationAccordionProps {
  recommendations: ProgramRecommendation[];
}

export default function RecommendationAccordion({recommendations}: RecommendationAccordionProps) {
  return (
    <>
      <div className="recommendationAccordion">
        {recommendations.map((recommendation, index) => (
          <RecommendationItemImproved
            key={index}
            recommendation={recommendation}
            index={index}
          />
        ))}
      </div>
    </>
  );
}
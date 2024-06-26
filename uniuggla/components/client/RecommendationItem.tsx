"use client"

import React, { useState } from "react";
import ProgramRecommendation from "@/types/ProgramRecommendation";
import { formatNumber } from "@/app/utils";

interface RecommendationItemProp {
  recommendation: ProgramRecommendation;
  index: number;
}

export default function RecommendedItem({ recommendation, index }: RecommendationItemProp) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  if (recommendation.program.programTitle_sv && recommendation.program.schoolName && recommendation.program.programPoints && recommendation.program.programLink && recommendation.program.programDescription_sv) {
    return (
      <div className={`recommendedBox ${recommendation.wildcard ? "wildcard" : ""}`}>
        <div className="recommendedHead">
          <p className="titleReq">{recommendation.program.programTitle_sv}</p>
          {recommendation.wildcard && 
            <>
              <p className="wildcardText">WILDCARD?</p>
              <p className="wildcardBubble">Wildcard är en rekommendation som är löst baserat på dina intressen!</p>
            </>
          }
          <p className="schoolReq descriptionReq">{"LÄROSÄTE: "}&nbsp;{recommendation.program.schoolName}</p>
          <p className="degreeReq descriptionReq">{"EXAMEN: "}&nbsp;{recommendation.program.degree}</p>
          <p className="pointsReq descriptionReq">{recommendation.program.programPoints}&nbsp;{"HP"}</p>
          <p className="yearsReq descriptionReq">{(formatNumber(recommendation.program.programPoints as unknown as number))}&nbsp;{"ÅR"}</p>
        </div>
        <div className={`reqDescriptionBox ${isExpanded ? 'show' : ''}`}>
          <a className="reqDescription reqDescriptionLink" href={recommendation.program.programLink}>Till programmets hemsida</a>
          <p className="reqDescription reqDescriptionTitle">{"Programbeskrivning:"}</p>
          <p className="reqDescriptionContent">{recommendation.program.programDescription_sv}</p>
        </div>
        <div onClick={() => setIsExpanded(!isExpanded)} className="recommendedFoot">
          <img src={`${recommendation.wildcard ? "../../arrow_wildcard.svg" : "../../arrow.svg"}`} alt="se mer" className={`recommendationArrow ${isExpanded ? 'rotate' : ''}`}/>
        </div>
      </div>
    );
  } else {
    console.log("Null Recomendation item")
    return (
      <>
      </>
    );
  }
};
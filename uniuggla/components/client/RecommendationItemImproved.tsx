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

  return (
    <div className={`recommendedBox ${recommendation.wildcard ? "wildcard" : ""}`}>
      <p>{recommendation.wildcard}</p>
      <div className="recommendedHead">
        <p className="titleReq">{recommendation.program.programTitle_sv}{","}&nbsp;{recommendation.program.degree}</p>
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
        <img src="../../arrow.svg" alt="" className={`recommendationArrow ${isExpanded ? 'rotate' : ''}`}/>
      </div>
    </div>
  );
};
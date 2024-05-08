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
    <div className={`recommendedItemWrapper ${recommendation.wildcard ? "wildcard" : ""}`}>
      <p>{recommendation.wildcard}</p>
      <div className="recommendedItemHead">
        <p className="titleReq">{recommendation.program.programTitle_sv}{","}&nbsp;{recommendation.program.degree}</p>
        <p className="recommendationProp">{"LÄROSÄTE: "}&nbsp;{recommendation.program.schoolName}</p>
        <p className="recommendationProp">{"EXAMEN: "}&nbsp;{recommendation.program.degree}</p>
        <p className="recommendationProp">{recommendation.program.programPoints}&nbsp;{"HP"}</p>
        <p className="recommendationProp">{(formatNumber(recommendation.program.programPoints as unknown as number))}&nbsp;{"ÅR"}</p>
      </div>
      <div className={`recommendedDropdown ${isExpanded ? 'show' : ''}`}>
        <a className="linkReq" href={recommendation.program.programLink}>Till programmets hemsida</a>
        <p className="descriptionReq">{"Beskrivning: "}</p>
        <p className="dropdownText">{recommendation.program.programDescription_sv}</p>
      </div>
      <div onClick={() => setIsExpanded(!isExpanded)} className="recommendationArrowWrapper">
        <img src="../../arrow.svg" alt="" className={`recommendationArrow ${isExpanded ? 'rotate' : ''}`}/>
      </div>
    </div>
  );
};
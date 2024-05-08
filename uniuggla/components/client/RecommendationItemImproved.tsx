"use client"

import React, { useState } from "react";
import Program from "@/types/program";

interface RecommendationItemProp {
  program: Program;
  index: number;
}

function formatNumber(num: number): string {
	num = num / 60;
	const roundedNum = num.toFixed(2);
	return roundedNum.endsWith(".00") ? roundedNum.slice(0, -3) : roundedNum;
}

export default function RecommendedItem({ program, index }: RecommendationItemProp) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className="recommendedItemWrapper">
      <div className="recommendedItemHead">
        <p className="titleReq">{program.programTitle_sv}{","}&nbsp;{program.degree}</p>
        <p className="descriptionReq">{"LÄROSÄTE: "}&nbsp;{program.schoolName}</p>
        <p className="degreeReq">{"EXAMEN: "}&nbsp;{program.degree}</p>
        <p className="pointsReq">{"POÄNG: "}&nbsp;{program.programPoints}</p>
        <p className="yearsReq">{"ANTAL ÅR: "}&nbsp;{(formatNumber(program.programPoints))}</p>
      </div>
      <div className={`recommendedDropdown ${isExpanded ? 'show' : ''}`}>
      <a className="linkReq" href={program.programLink}>länk till program</a>
        <p className="descriptionReq">{"Beskrivning: "}</p>
        {program.programDesciption_sv}
      </div>
      <div onClick={() => setIsExpanded(!isExpanded)} className="recommendationArrowWrapper">
        <img src="../../arrow.svg" alt="" className={`recommendationArrow ${isExpanded ? 'rotate' : ''}`}/>
      </div>
    </div>
  );
};
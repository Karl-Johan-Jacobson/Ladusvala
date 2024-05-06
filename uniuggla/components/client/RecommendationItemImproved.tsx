"use client"

import React, { useState } from "react";
import Program from "@/types/program";

interface RecommendationItemProp {
  program: Program;
  index: number;
  isExpanded: boolean;
  showDescription: (index: number) => void
}

function formatNumber(num: number): string {
	num = num / 60;
	const roundedNum = num.toFixed(2);
	return roundedNum.endsWith(".00") ? roundedNum.slice(0, -3) : roundedNum;
}

export default function RecommendedItem({ program, index, isExpanded, showDescription }: RecommendationItemProp) {
  return (
    <div className="recommendedItemWrapper" onClick={() => showDescription(index)}>
      <div className="recommendedItemHead">
        <p className="titleReq">{program.programTitle_sv}</p>
        <p className="reqDesctription">{"LÄROSÄTE:" + program.schoolName}</p>
        <p className="degreeReq">{"EXAMEN: " + program.degree}</p>
        <p className="pointsReq">{"POÄNG: " + program.programPoints}</p>
        <p className="yearsReq">{"ANTAL ÅR: " + (formatNumber(program.programPoints))}</p>
      </div>
      <div className={`recommendedItemDescription ${isExpanded ? 'show' : 'hide'}`}>
        {program.programDesciption_sv}
      </div>
      <img className={`recommendationArrow ${isExpanded ? 'rotate' : ''}`} src="../../arrow.svg" alt="" />
    </div>
  );
};
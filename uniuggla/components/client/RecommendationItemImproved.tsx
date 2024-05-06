"use client"

import React, { useState } from "react";
import Program from "@/types/program";

interface RecommendationItemProp {
  program: Program;
  index: number;
  isToggled: boolean;
  toggle: (index: number) => void
}

export default function RecommendedItem({program, index, isToggled, toggle, }: RecommendationItemProp) {

  return (
    <div className="recommendationItem" onClick={() => toggle(index)}>
      <div className="recommendationHeader">
        <p className="">{program.programTitle_sv}</p>
        <p className="">{"LÄROSÄTE:" + program.schoolName}</p>
        <p className="">{"EXAMEN: " + program.degree}</p>
        <p className="">{"POÄNG: " + program.programPoints}</p>
        <p className="">{"ANTAL ÅR: " + (program.programPoints)}</p>
      </div>
      <div className="recommendationDescription">
        {program.description_sv}
      </div>
      <img className={isToggled ? "recommendationArrow" : "recommendationArrow show"} src="../../arrow.svg" alt="" />
    </div>
  );
};

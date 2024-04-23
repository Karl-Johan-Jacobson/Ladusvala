import React from "react";

interface RecommendationProps {}

import { useState } from "react";
import { NextPage } from "next";
import recommendProgramFromInterest from "@/ai/AiHandler";
import { typewriterTest } from "./TypeWriter";

const Recommendation: React.FC<RecommendationProps & {}> = () => {
	//HTML code
	return (
		<div id="recommmendation" className="wrapper recommmendationWrapper recommmendation" style={{ paddingTop: "10vw" }}>
			<div className="tempdDivTypewriter greetingDiv">
				<p className="tempTypewriter" ></p>
			</div>
			<div className="filterContainer ">
				<form className="filterWrapper" action="">
					<div className="filter schoolFilter">
						<input type="text" placeholder="Lärosäte" />
						<div className="filterImgDiv">
							<img className="filterImg" src="../../three_dot.svg" alt="" />
						</div>
					</div>
					<div className="filter yearsFilter">
						<input type="text" placeholder="Antal år" />
						<div className="filterImgDiv">
							<img className="filterImg" src="../../three_dot.svg" alt="" />
						</div>
					</div>
				</form>
			</div>
			<div>
				<p className="aiAnswer">Loading...</p>
			</div>
		</div>
	);
};

export default Recommendation;

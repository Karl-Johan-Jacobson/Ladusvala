import React from "react";
import RecommendedItme from "@/components/client/RecommendationItem";

interface RecommendationProps {}

import { useState } from "react";
import { NextPage } from "next";
import recommendProgramFromInterest from "@/ai/AiHandler";

const Recommendation: React.FC<RecommendationProps & {}> = () => {
	//HTML code
	return (
		<div id="recommmendation" className="wrapper recommmendationWrapper recommmendation">
			<p className="bot titleTypewriter recommmendationText" style={{ paddingTop: "10vh" }}></p>
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
			<div className="recommendedWrapper">
				<div className="loadingGIF">
					<img src="../../uniugglan.gif" alt="" />
				</div>
			</div>
			

		</div>
	);
};

export default Recommendation;

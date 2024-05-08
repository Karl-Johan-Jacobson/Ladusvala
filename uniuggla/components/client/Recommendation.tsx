import React from "react";

interface RecommendationProps {}

import { useState } from "react";
import { NextPage } from "next";
import recommendProgramFromInterest from "@/ai/AiHandler";

const Recommendation: React.FC<RecommendationProps & {}> = () => {
	//HTML code
	return (
		<div id="recommmendation" className="wrapper recommmendationWrapper recommmendation">
			<p className="bot titleTypewriter recommmendationText" style={{ paddingTop: "15vh", top: "0", height: "1.5em" }}></p>
			<div className="recommendedWrapper">
				<div className="loadingGIF">
					<img src="../../uniugglan.gif" alt="Waiting on recomendation." />
				</div>
			</div>
		</div>
	);
};

export default Recommendation;

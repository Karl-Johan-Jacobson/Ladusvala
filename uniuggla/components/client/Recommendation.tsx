import React from "react";

interface RecommendationProps {}

import { useState } from "react";
import { NextPage } from "next";
import recommendProgramFromInterest from "@/ai/AiHandler";

const Recommendation: React.FC<RecommendationProps & {}> = () => {
	//HTML code
	return (
		<div id="recommmendation" className="wrapper recommmendationWrapper recommmendation" style={{ paddingTop: "10vw" }}>
			<div className="typewriter typewriter_greeting greetingDiv">
				<p className="bot greeting"></p>
			</div>
			<div className="typewriter typewriter_question questionDiv" style={{ marginTop: "0vw" }}>
				<p className="bot question"></p>
			</div>
			<div>
				<p className="aiAnswer">Loading...</p>
			</div>
		</div>
	);
};

export default Recommendation;

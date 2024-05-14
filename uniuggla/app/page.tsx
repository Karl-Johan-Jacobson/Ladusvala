"use client"; // Makes it so it is on client side instead of server side because of the function components.

import { useState, useRef, useEffect } from "react";
import interestData from "@/public/dataset/interests.json";
import { modifyOverflow, removeClass, addClass } from "@/app/utils";

import Program from "@/types/program";

// Import for subpages
import Welcome from "@/components/client/Welcome";
import Interest from "@/components/client/Interest";
import Recommendation from "@/components/client/Recommendation";
import { TypewriterForTitle } from "@/components/client/TypeWriter";

// Main function that returns the html and handles the animations
export default function Home() {
	const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
	const [fetchingRecommendations, setFetchingRecommendations] = useState<boolean>(false);
	
	const interestRef = useRef<HTMLDivElement | null>(null);
	const recommendationsRef = useRef<HTMLDivElement | null>(null);
	
	const handleRecommendationButtonClick = (interests: string[]) => {
		setFetchingRecommendations(true);
		setSelectedInterests(interests);

		let titelText: string;
		if (window.innerWidth > 480) {
				titelText = "Tack! Hmm... låt mig se vad jag kan hitta!";
		} else {
				titelText = "Tack! Hmm... låt mig se<br />vad jag kan hitta!";
		}
		TypewriterForTitle(titelText, "recommmendationText", true, false);
		modifyOverflow("visible", "main");
		removeClass("hide", "recommendationContainer");
		//move to recommendations page
		recommendationsRef?.current?.scrollIntoView();
		setTimeout(() => {
				addClass("hide", "interestContainer");
				modifyOverflow("hidden", "main");
		}, 500);
	}

	return (
		<main className="main" style={{ overflow: "hidden" }}>
			<div id="welcomeContainer" className="container welcomeContainer">
				<Welcome yesPageRef={interestRef} />
			</div>
			<div ref={interestRef} id="interestContainer" className="container interestContainer hide">
				<Interest interests={interestData} handleRecommendationButtonClick={handleRecommendationButtonClick} />
			</div>
			<div ref={recommendationsRef} id="recommendationContainer" className="container recommendationContainer hide">
				<Recommendation selectedInterests={selectedInterests} shouldFetch={fetchingRecommendations} />
			</div>
		</main>
	);
}

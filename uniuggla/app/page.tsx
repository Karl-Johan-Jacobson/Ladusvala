"use client"; // Makes it so it is on client side instead of server side because of the function components.
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import InterestList from "@/components/client/Interest";
import { TypewriterForTitle } from "@/components/client/TypeWriter";
import { modifyTopPadding, modifyTopPaddingRelative } from "@/app/utils";

import { handleYesButtonClick, handleRecommendationButtonClick } from "@/app/utils";
// Import for subpages

import Welcome from "@/components/client/Welcome";
import Interest from "@/components/client/Interest";
import Recommendation from "@/components/client/Recommendation";

// Main function that returns the html and handles the animations
export default function Home() {
	const router = useRouter();

	function handleNoButtonClick(): void {
		// Move useRouter inside the function
		router.push("/about");
	}
	// values for js animations
	const speed = 40;
	const extraButtonDelay = 300;
	const moveAnswer = ["8vw", "answers"];

	// Starting animationn
	useEffect(() => {
		let typeWriterInterval: ReturnType<typeof setInterval> | undefined;
		// Typewriteranimationn input string and class of <p> element
		const typeWriter = (textToType: string, htmlClass: string) => {
			let i = 0;
			const elements = document.getElementsByClassName(htmlClass);
			const element = elements[0] as HTMLElement;
			if (element) {
				if (typeWriterInterval) {
					clearInterval(typeWriterInterval);
				}
				typeWriterInterval = setInterval(() => {
					if (i < textToType.length) {
						element.innerHTML += textToType.charAt(i);
						i++;
					} else {
						clearInterval(typeWriterInterval);
					}
				}, speed);
			}
		};
		// Removes parents classes to remove css annimation on parent <div>
		const removeParent = (htmlParenntClass: string, htmlClassRemove: string) => {
			const parentElements = document.getElementsByClassName(htmlParenntClass);
			const parentElement = parentElements[0] as HTMLElement;
			parentElement.classList.remove(htmlClassRemove);
		};
		// Canges top margin from inital top margin
		const modifyTopMargin = (newTopMargin: string, htmlClass: string) => {
			var elements = document.querySelectorAll("." + htmlClass);
			elements.forEach(function (element) {
				(element as HTMLElement).style.marginTop = newTopMargin;
			});
		};
		// Canges top padding from inital top padding
		const modifyTopPadding = (newTopPadding: string, htmlClass: string) => {
			var elements = document.querySelectorAll("." + htmlClass);
			elements.forEach(function (element) {
				(element as HTMLElement).style.paddingTop = newTopPadding;
			});
		};

		// Canges opacity from inital opacity
		const modifyOpacity = (newOpacity: string, htmlClass: string) => {
			var elements = document.querySelectorAll("." + htmlClass);
			elements.forEach(function (element) {
				(element as HTMLElement).style.opacity = newOpacity;
			});
		};
		// Funciton for iniatal js animations
		var typeWriterDelay = TypewriterForTitle("Hej!<br />Vill du gå på högskola eller universitet?", "welcomeText");
		const timeoutId = setTimeout(() => {
			modifyTopMargin(moveAnswer[0], moveAnswer[1]);
			modifyOpacity("1", moveAnswer[1]);
		}, typeWriterDelay + extraButtonDelay);

		return () => {
			if (typeWriterInterval) {
				clearInterval(typeWriterInterval);
			}
			clearTimeout(timeoutId);
		};
	}, []);

	//const interests = await fetchAllInterests()
	const interests = [
		{ interestTitle: "Teknik", interestId: "1", interestDescription: "" },
		{ interestTitle: "Lärare", interestId: "2", interestDescription: "" },
		{ interestTitle: "Medicin", interestId: "3", interestDescription: "" },
		{ interestTitle: "Bilar", interestId: "4", interestDescription: "" },
		{ interestTitle: "Kemi", interestId: "5", interestDescription: "" },
		{ interestTitle: "Biologi", interestId: "6", interestDescription: "" },
		{ interestTitle: "Matematik", interestId: "7", interestDescription: "" },
		{ interestTitle: "Aktier", interestId: "8", interestDescription: "" },
		{ interestTitle: "Ekonomi", interestId: "9", interestDescription: "" },
		{ interestTitle: "Personal ansvar", interestId: "10", interestDescription: "" },
		{ interestTitle: "Fastigheter", interestId: "11", interestDescription: "" },
		{ interestTitle: "Snygga hus", interestId: "12", interestDescription: "" },
		{ interestTitle: "Gillar inte matematik", interestId: "13", interestDescription: "" },
		{ interestTitle: "Redovisning", interestId: "14", interestDescription: "" },
		{ interestTitle: "Dataanalys", interestId: "15", interestDescription: "" },
		{ interestTitle: "Spelutveckling", interestId: "16", interestDescription: "" },
		{ interestTitle: "Forskning", interestId: "17", interestDescription: "" },
		{ interestTitle: "Mjukvaruutveckling", interestId: "18", interestDescription: "" },
		{ interestTitle: "Gym", interestId: "19", interestDescription: "" },
		{ interestTitle: "Resor", interestId: "20", interestDescription: "" },
		{ interestTitle: "Språk", interestId: "21", interestDescription: "" },
		{ interestTitle: "Design", interestId: "22", interestDescription: "" },
		{ interestTitle: "Musik", interestId: "23", interestDescription: "" },
		{ interestTitle: "Måla", interestId: "24", interestDescription: "" },
		{ interestTitle: "Djur", interestId: "25", interestDescription: "" },
		{ interestTitle: "Trädgård", interestId: "26", interestDescription: "" },
		{ interestTitle: "Yoga", interestId: "27", interestDescription: "" },
		{ interestTitle: "Filosofi", interestId: "28", interestDescription: "" },
		{ interestTitle: "Film", interestId: "29", interestDescription: "" },
		{ interestTitle: "Foto", interestId: "30", interestDescription: "" },
		{ interestTitle: "Kaffe", interestId: "31", interestDescription: "" },
		{ interestTitle: "Te", interestId: "32", interestDescription: "" },
		{ interestTitle: "Skidåkning", interestId: "33", interestDescription: "" },
		{ interestTitle: "Klättring", interestId: "34", interestDescription: "" },
		{ interestTitle: "Cykling", interestId: "35", interestDescription: "" },
		{ interestTitle: "Simning", interestId: "36", interestDescription: "" },
		{ interestTitle: "Segling", interestId: "37", interestDescription: "" },
		{ interestTitle: "Dykning", interestId: "38", interestDescription: "" },
		{ interestTitle: "Kampsport", interestId: "39", interestDescription: "" },
		{ interestTitle: "Skateboarding", interestId: "40", interestDescription: "" },
		{ interestTitle: "Spela instrument", interestId: "41", interestDescription: "" },
		{ interestTitle: "Kocka", interestId: "42", interestDescription: "" },
		{ interestTitle: "Bakning", interestId: "43", interestDescription: "" },
		{ interestTitle: "Vin", interestId: "44", interestDescription: "" },
		{ interestTitle: "Whisky", interestId: "45", interestDescription: "" },
		{ interestTitle: "Öl", interestId: "46", interestDescription: "" },
		{ interestTitle: "Vinylskivor", interestId: "47", interestDescription: "" },
		{ interestTitle: "Vintage", interestId: "48", interestDescription: "" },
		{ interestTitle: "Antikviteter", interestId: "49", interestDescription: "" },
		{ interestTitle: "Smycken", interestId: "50", interestDescription: "" },
	];

	// HTML code, within <main>
	return (
		<main className="main" style={{ overflow: "hidden" }}>
			{/*
        Welcome page
      */}
			<section id="welcomeContainer" className="container welcomeContainer">
				<Welcome handleNoButtonClick={handleNoButtonClick} handleYesButtonClick={handleYesButtonClick} />
			</section>
			{/* 
        Interest Page 
      */}
			<section id="interestContainer" className="container interestContainer hide">
				<InterestList interest={interests} handleRecommendationButtonClick={handleRecommendationButtonClick} />
				{/*<Intrest interest={interests} handleRecommendationButtonClick={handleRecommendationButtonClick} />*/}
			</section>
			{/*
        Recommendation page
      */}
			<section id="recommendationContainer" className="container recommendationContainer hide">
				<Recommendation />
			</section>
		</main>
	);
}

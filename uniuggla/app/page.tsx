"use client"; // Makes it so it is on client side instead of server side because of the function components.
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import InterestList from "@/components/client/Interest";
import { TypewriterForTitle } from "@/components/client/TypeWriter";
import { modifyTopPadding, modifyTopPaddingRelative } from "@/app/utils";
import data from "@/public/dataset/interests.json";

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
		var typeWriterDelay = TypewriterForTitle("Hej!<br />Är du redo att hitta din drömutbildning?", "welcomeText");
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

	const recommendationsRef = useRef<HTMLDivElement | null>(null);
	const interestRef = useRef<HTMLDivElement | null>(null);

	// HTML code, within <main>
	return (
		<main className="main" style={{ overflow: "hidden" }}>
			{/*
        Welcome page
      */}
			<section id="welcomeContainer" className="container welcomeContainer">
				<Welcome yesPageRef={interestRef} handleNoButtonClick={handleNoButtonClick} handleYesButtonClick={handleYesButtonClick} />
			</section>
			{/* 
        Interest Page
      */}
			<section ref={interestRef} id="interestContainer" className="container interestContainer hide">
				<InterestList interests={data} nextPageRef={recommendationsRef} handleRecommendationButtonClick={handleRecommendationButtonClick} />
			</section>
			{/*
        Recommendation page
      */}
			<section  ref={recommendationsRef} id="recommendationContainer" className="container recommendationContainer hide">
				<Recommendation />
			</section>
		</main>
	);
}

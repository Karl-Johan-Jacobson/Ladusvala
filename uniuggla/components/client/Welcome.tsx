import React, { RefObject, useEffect } from "react";
import { TypewriterForTitle } from "@/components/client/TypeWriter";
import { addClass, modifyOverflow, modifyTopPadding, modifyTopPaddingRelative, removeClass, scrollToId } from "@/app/utils";
import Link from "next/link";

interface WelcomeProps {
	yesPageRef: RefObject<HTMLDivElement> | null;
}

export default function Welcome({ yesPageRef }: WelcomeProps) {
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

	const handleYesClick = () => {
		TypewriterForTitle("Berätta vad du har för intressen, så föreslår<br />jag ett par program som kan passa dig! :)", "interestText");
		modifyOverflow("visible", "main");
		removeClass("hide", "interestContainer");	
		yesPageRef?.current?.scrollIntoView();
		setTimeout(() => {
			addClass("hide", "welcomeContainer");
			modifyOverflow("hidden", "main");
		}, 500);
	}

	return (
		<div className="wrapper welcomeWrapper">
			<p className="bot titleTypewriter welcomeText" style={{ paddingTop: "15vh" }}></p>
			<div className="answers" style={{ marginTop: "5vw", opacity: "0" }}>
				<button className="yesButton answerButton" onClick={handleYesClick}>
					<p className="user">Ja</p>
				</button>
				<Link href="/about">
					<button className="noButton answerButton" >
						<p className="user">Nej</p>
					</button>
				</Link>
			</div>
		</div>
	);
};
